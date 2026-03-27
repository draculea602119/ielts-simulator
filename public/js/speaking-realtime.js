/**
 * Realtime Speaking Module — Gemini Live API via WebSocket
 * Handles mic capture (16kHz PCM), audio playback (24kHz PCM), transcriptions
 */
(function () {
  'use strict';

  let ws = null;
  let captureCtx = null;
  let playbackCtx = null;
  let micStream = null;
  let workletNode = null;
  let nextPlayTime = 0;
  let scheduledSources = [];
  let active = false;
  let interrupted = false; // true when user interrupted AI, prevents stale audio from playing

  // Callbacks set by app.js
  let onOrbState = null;
  let onAiText = null;
  let onUserText = null;
  let onSetupComplete = null;
  let onTurnComplete = null;
  let onSessionEnd = null;
  let onError = null;

  // Transcription accumulators
  let userMessages = [];
  let aiMessages = [];
  let currentAiText = '';
  let currentUserText = '';

  // ---- Helpers ----
  function arrayBufferToBase64(buffer) {
    const bytes = new Uint8Array(buffer);
    const chunks = [];
    for (let i = 0; i < bytes.length; i += 8192) {
      chunks.push(String.fromCharCode.apply(null, bytes.subarray(i, i + 8192)));
    }
    return btoa(chunks.join(''));
  }

  function base64ToInt16Array(b64) {
    const binary = atob(b64);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
    return new Int16Array(bytes.buffer);
  }

  // ---- Audio Playback (24kHz PCM) ----
  function ensurePlaybackCtx() {
    if (!playbackCtx || playbackCtx.state === 'closed') {
      playbackCtx = new AudioContext({ sampleRate: 24000 });
    }
    if (playbackCtx.state === 'suspended') playbackCtx.resume();
    return playbackCtx;
  }

  function playAudioChunk(base64pcm) {
    const ctx = ensurePlaybackCtx();
    const int16 = base64ToInt16Array(base64pcm);
    const float32 = new Float32Array(int16.length);
    for (let i = 0; i < int16.length; i++) float32[i] = int16[i] / 32768.0;

    const audioBuffer = ctx.createBuffer(1, float32.length, 24000);
    audioBuffer.getChannelData(0).set(float32);

    const source = ctx.createBufferSource();
    source.buffer = audioBuffer;
    source.connect(ctx.destination);

    const now = ctx.currentTime;
    if (nextPlayTime < now) nextPlayTime = now;
    source.start(nextPlayTime);
    nextPlayTime += audioBuffer.duration;

    scheduledSources.push(source);
    source.onended = () => {
      const idx = scheduledSources.indexOf(source);
      if (idx !== -1) scheduledSources.splice(idx, 1);
    };
  }

  function stopPlayback() {
    // Immediately stop all scheduled and playing audio sources
    for (const src of scheduledSources) {
      try { src.stop(0); } catch {}
      try { src.disconnect(); } catch {}
    }
    scheduledSources = [];
    // Reset playback timeline so next audio starts immediately
    if (playbackCtx) {
      nextPlayTime = playbackCtx.currentTime;
      // Suspend and resume to flush any buffered audio in the pipeline
      playbackCtx.suspend().then(() => playbackCtx.resume()).catch(() => {});
    }
  }

  // ---- Mic Capture (16kHz PCM) ----
  async function startMic() {
    micStream = await navigator.mediaDevices.getUserMedia({
      audio: { echoCancellation: true, noiseSuppression: true, autoGainControl: true }
    });

    captureCtx = new AudioContext({ sampleRate: 16000 });
    await captureCtx.audioWorklet.addModule('/js/speaking-worklet.js');

    const source = captureCtx.createMediaStreamSource(micStream);
    workletNode = new AudioWorkletNode(captureCtx, 'mic-processor');

    workletNode.port.onmessage = (e) => {
      if (!active || !ws || ws.readyState !== WebSocket.OPEN) return;
      const b64 = arrayBufferToBase64(e.data);
      ws.send(JSON.stringify({
        realtimeInput: {
          audio: { data: b64, mimeType: 'audio/pcm;rate=16000' }
        }
      }));
    };

    source.connect(workletNode);
    // Don't connect to destination (we don't want to hear ourselves)
  }

  function stopMic() {
    // Send audioStreamEnd to flush cached audio on Gemini side
    if (ws && ws.readyState === WebSocket.OPEN) {
      ws.send(JSON.stringify({ realtimeInput: { audioStreamEnd: true } }));
    }
    if (workletNode) { workletNode.disconnect(); workletNode = null; }
    if (captureCtx && captureCtx.state !== 'closed') { captureCtx.close(); captureCtx = null; }
    if (micStream) { micStream.getTracks().forEach(t => t.stop()); micStream = null; }
  }

  // ---- WebSocket Message Handler ----
  let audioChunksPlayed = 0;

  function handleMessage(data) {
    let msg;
    try { msg = JSON.parse(data); } catch {
      console.warn('[RT] Bad JSON:', data.substring(0, 100));
      return;
    }

    // Setup complete
    if (msg.setupComplete !== undefined) {
      console.log('[RT] ✓ Setup complete');
      if (onSetupComplete) onSetupComplete();
      if (onOrbState) onOrbState('listening');
      return;
    }

    // Server content
    if (msg.serverContent) {
      const sc = msg.serverContent;

      // Interrupted (barge-in) — user spoke while AI was talking
      if (sc.interrupted) {
        console.log('[RT] ⚡ Interrupted');
        interrupted = true;
        stopPlayback();
        if (onOrbState) onOrbState('listening');
        if (currentAiText) {
          aiMessages.push(currentAiText + ' [interrupted]');
          currentAiText = '';
        }
        return;
      }

      // Model audio/text response
      if (sc.modelTurn && sc.modelTurn.parts) {
        if (interrupted) {
          console.log('[RT] ⚠ Skipping stale modelTurn (interrupted)');
          return;
        }
        if (onOrbState) onOrbState('speaking');
        for (const part of sc.modelTurn.parts) {
          if (part.inlineData && part.inlineData.data) {
            audioChunksPlayed++;
            playAudioChunk(part.inlineData.data);
            if (audioChunksPlayed % 20 === 1) {
              console.log(`[RT] 🔊 Audio chunks played: ${audioChunksPlayed} (size: ${part.inlineData.data.length})`);
            }
          }
          if (part.text) {
            console.log(`[RT] ← modelTurn text: "${part.text}"`);
            currentAiText += part.text;
            if (onAiText) onAiText(currentAiText);
          }
        }
      }

      // Input transcription (what user said) — incremental, append
      if (sc.inputTranscription && sc.inputTranscription.text) {
        console.log(`[RT] 🎤 inputTranscription: "${sc.inputTranscription.text}" (accumulated: "${currentUserText + sc.inputTranscription.text}")`);
        currentUserText += sc.inputTranscription.text;
        if (onUserText) onUserText(currentUserText);
      }

      // Output transcription (what AI said) — incremental, append
      if (sc.outputTranscription && sc.outputTranscription.text) {
        console.log(`[RT] 🤖 outputTranscription: "${sc.outputTranscription.text}" (accumulated: "${currentAiText + sc.outputTranscription.text}")`);
        currentAiText += sc.outputTranscription.text;
        if (onAiText) onAiText(currentAiText);
      }

      // Turn complete — reset interrupted flag for next turn
      if (sc.turnComplete) {
        console.log(`[RT] ✓ Turn complete — AI: "${currentAiText}" User: "${currentUserText}" (audio chunks: ${audioChunksPlayed})`);
        interrupted = false;
        if (currentAiText) {
          aiMessages.push(currentAiText);
          currentAiText = '';
        }
        if (currentUserText) {
          userMessages.push(currentUserText);
          currentUserText = '';
        }
        if (onTurnComplete) onTurnComplete();
        if (onOrbState) onOrbState('listening');
      }

      if (sc.generationComplete) {
        console.log('[RT] ✓ Generation complete');
      }
      return;
    }

    // Tool call (if we add function calling later)
    if (msg.toolCall) { return; }

    // Go away (server about to disconnect)
    if (msg.goAway) {
      console.warn('[RT] ⚠ GoAway:', msg.goAway.timeLeft);
      return;
    }

    // Usage metadata
    if (msg.usageMetadata) {
      console.log(`[RT] 📊 Tokens: ${JSON.stringify(msg.usageMetadata)}`);
    }

    // Error from server
    if (msg.error) {
      console.error('[RT] ✗ Error:', msg.error);
      if (onError) onError(msg.error);
      return;
    }

    // Unknown message
    console.log('[RT] ? Unknown msg keys:', Object.keys(msg).join(','));
  }

  // ---- Public API ----
  async function start(token, mode, topic, subPhase, voice, callbacks) {
    if (active) stop();

    onOrbState = callbacks.onOrbState || null;
    onAiText = callbacks.onAiText || null;
    onUserText = callbacks.onUserText || null;
    onSetupComplete = callbacks.onSetupComplete || null;
    onTurnComplete = callbacks.onTurnComplete || null;
    onSessionEnd = callbacks.onSessionEnd || null;
    onError = callbacks.onError || null;

    userMessages = [];
    aiMessages = [];
    currentAiText = '';
    currentUserText = '';
    active = true;

    // Connect WebSocket
    audioChunksPlayed = 0;
    const proto = location.protocol === 'https:' ? 'wss:' : 'ws:';
    const wsUrl = `${proto}//${location.host}/ws/speaking-realtime?token=${encodeURIComponent(token)}`;
    console.log(`[RT] Connecting to ${wsUrl.replace(/token=[^&]+/, 'token=***')}`);
    ws = new WebSocket(wsUrl);

    ws.onopen = () => {
      console.log('[RT] ✓ WS connected, sending setup...');
      ws.send(JSON.stringify({
        type: 'setup',
        mode: mode,
        topic: topic,
        subPhase: subPhase,
        voice: voice || 'Kore'
      }));
      if (onOrbState) onOrbState('thinking');
    };

    ws.onmessage = (e) => handleMessage(e.data);

    ws.onclose = (e) => {
      console.log(`[RT] WS closed: code=${e.code} reason=${e.reason || 'none'} (audio played: ${audioChunksPlayed})`);
      if (active) {
        active = false;
        stopMic();
        stopPlayback();
        if (onSessionEnd) onSessionEnd(getMessages());
      }
    };

    ws.onerror = (e) => {
      console.error('[Realtime] WS error:', e);
      if (onError) onError('WebSocket connection failed');
    };

    // Start mic capture after setup complete
    const origSetupComplete = onSetupComplete;
    onSetupComplete = async () => {
      try {
        await startMic();
        if (origSetupComplete) origSetupComplete();
      } catch (e) {
        if (onError) onError('麦克风权限被拒绝: ' + e.message);
        stop();
      }
    };
  }

  function stop() {
    active = false;
    stopMic();
    stopPlayback();
    if (ws && ws.readyState === WebSocket.OPEN) ws.close();
    ws = null;
    if (playbackCtx && playbackCtx.state !== 'closed') {
      playbackCtx.close().catch(() => {});
      playbackCtx = null;
    }
  }

  function getMessages() {
    // Return messages in the format expected by /api/speaking/score
    const messages = [];
    const maxLen = Math.max(userMessages.length, aiMessages.length);
    for (let i = 0; i < maxLen; i++) {
      if (i < aiMessages.length) messages.push({ role: 'assistant', content: aiMessages[i] });
      if (i < userMessages.length) messages.push({ role: 'user', content: userMessages[i] });
    }
    return messages;
  }

  function isActive() { return active; }

  function sendText(text) {
    if (!ws || ws.readyState !== WebSocket.OPEN) return;
    ws.send(JSON.stringify({
      clientContent: {
        turns: [{ role: 'user', parts: [{ text }] }],
        turnComplete: true
      }
    }));
  }

  // ---- Expose ----
  window.SpeakRealtime = { start, stop, isActive, getMessages, sendText };
})();
