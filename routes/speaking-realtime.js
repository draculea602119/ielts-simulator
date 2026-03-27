/**
 * Realtime Speaking — WebSocket proxy to Gemini Live API
 * Browser <-> our WS <-> Gemini Live API WS (audio bidirectional)
 */
const { WebSocketServer, WebSocket } = require('ws');
const jwt = require('jsonwebtoken');
const { URL } = require('url');
const { JWT_SECRET } = require('../middleware/auth');

const GEMINI_MODEL = 'models/gemini-2.5-flash-native-audio-preview-12-2025';
const GEMINI_WS_BASE = 'wss://generativelanguage.googleapis.com/ws/google.ai.generativelanguage.v1beta.GenerativeService.BidiGenerateContent';

function buildRealtimePrompt(mode, topic, subPhase) {
  const base = `You are a professional but friendly IELTS speaking examiner. Conduct the test naturally in English. Speak clearly at a moderate pace. After each student response, give brief encouragement then ask the next question. Give tips in 简体中文 when appropriate.`;

  if (mode === 'part1') {
    return `${base}\nYou are conducting IELTS Speaking Part 1 about "${topic}". Ask one personal question at a time. Start by greeting the student and asking the first question. After 5-6 exchanges, wrap up Part 1 naturally.`;
  }
  if (mode === 'part2') {
    if (subPhase === 'cue_card') {
      return `${base}\nGenerate an IELTS Part 2 cue card about "${topic}". Read the task aloud: "Describe..." with 3-4 bullet points. Tell the student they have 1 minute to prepare, then 2 minutes to speak.`;
    }
    if (subPhase === 'monologue') {
      return `${base}\nThe student just gave their Part 2 monologue about "${topic}". Give brief positive feedback and ask 1-2 follow-up questions.`;
    }
    return `${base}\nWrap up Part 2 about "${topic}". Give brief positive feedback.`;
  }
  return `${base}\nYou are conducting IELTS Speaking Part 3: abstract discussion about "${topic}". Ask analytical, thought-provoking questions. After 4-5 exchanges, wrap up the discussion.`;
}

function attachRealtimeWS(server) {
  const wss = new WebSocketServer({ noServer: true });

  server.on('upgrade', (request, socket, head) => {
    const url = new URL(request.url, `http://${request.headers.host}`);
    if (url.pathname !== '/ws/speaking-realtime') return;

    const token = url.searchParams.get('token');
    if (!token) {
      console.log('[Realtime] Rejected: no token');
      socket.write('HTTP/1.1 401 Unauthorized\r\n\r\n');
      socket.destroy();
      return;
    }

    let user;
    try {
      user = jwt.verify(token, JWT_SECRET);
    } catch (e) {
      console.log('[Realtime] Rejected: invalid token -', e.message);
      socket.write('HTTP/1.1 401 Unauthorized\r\n\r\n');
      socket.destroy();
      return;
    }

    wss.handleUpgrade(request, socket, head, (clientWs) => {
      wss.emit('connection', clientWs, request, user);
    });
  });

  wss.on('connection', (clientWs, request, user) => {
    let geminiWs = null;
    let setupDone = false;
    let audioChunksFromClient = 0;
    let audioChunksFromGemini = 0;
    let sessionStart = Date.now();

    console.log(`[Realtime] ✓ User ${user.username} (id:${user.id}) connected`);

    clientWs.on('message', (raw) => {
      let msg;
      try { msg = JSON.parse(raw.toString()); } catch (e) {
        console.warn(`[Realtime] ✗ Bad JSON from client:`, raw.toString().substring(0, 100));
        return;
      }

      // Handle setup from client
      if (msg.type === 'setup' && !setupDone) {
        const { mode = 'part1', topic = 'General', subPhase = 'cue_card', voice = 'Kore' } = msg;
        console.log(`[Realtime] → Setup: mode=${mode} topic=${topic} subPhase=${subPhase} voice=${voice}`);

        const apiKey = process.env.GEMINI_API_KEY;
        if (!apiKey) {
          console.error('[Realtime] ✗ GEMINI_API_KEY not set');
          clientWs.send(JSON.stringify({ error: 'GEMINI_API_KEY not configured' }));
          clientWs.close();
          return;
        }

        const geminiUrl = `${GEMINI_WS_BASE}?key=${apiKey}`;

        // Proxy support
        const proxyUrl = process.env.HTTPS_PROXY || process.env.https_proxy || process.env.HTTP_PROXY || process.env.http_proxy;
        let wsOpts = {};
        if (proxyUrl) {
          try {
            const { HttpsProxyAgent } = require('https-proxy-agent');
            wsOpts.agent = new HttpsProxyAgent(proxyUrl);
            console.log(`[Realtime] → Using proxy: ${proxyUrl}`);
          } catch (e) {
            console.warn('[Realtime] ⚠ https-proxy-agent not available, connecting directly');
          }
        }

        console.log('[Realtime] → Connecting to Gemini Live API...');
        geminiWs = new WebSocket(geminiUrl, wsOpts);

        geminiWs.on('open', () => {
          console.log('[Realtime] ✓ Gemini WS connected, sending setup...');
          const systemPrompt = buildRealtimePrompt(mode, topic, subPhase);
          const setupMsg = {
            setup: {
              model: GEMINI_MODEL,
              generationConfig: {
                responseModalities: ['AUDIO'],
                speechConfig: {
                  voiceConfig: {
                    prebuiltVoiceConfig: { voiceName: voice }
                  }
                }
              },
              systemInstruction: {
                parts: [{ text: systemPrompt }]
              },
              realtimeInputConfig: {
                automaticActivityDetection: {
                  disabled: false,
                  startOfSpeechSensitivity: 'START_SENSITIVITY_HIGH',
                  endOfSpeechSensitivity: 'END_SENSITIVITY_HIGH',
                  prefixPaddingMs: 20,
                  silenceDurationMs: 300
                },
                activityHandling: 'START_OF_ACTIVITY_INTERRUPTS',
                turnCoverage: 'TURN_INCLUDES_ONLY_ACTIVITY'
              },
              inputAudioTranscription: {},
              outputAudioTranscription: {},
              contextWindowCompression: {
                slidingWindow: {},
                triggerTokens: 100000
              }
            }
          };
          geminiWs.send(JSON.stringify(setupMsg));
        });

        geminiWs.on('message', (data) => {
          if (clientWs.readyState !== WebSocket.OPEN) return;

          const str = data.toString();
          let parsed;
          try { parsed = JSON.parse(str); } catch {
            console.warn('[Realtime] ⚠ Non-JSON from Gemini:', str.substring(0, 200));
            clientWs.send(str);
            return;
          }

          // Log every message type from Gemini
          if (parsed.setupComplete !== undefined) {
            setupDone = true;
            console.log(`[Realtime] ✓ Gemini setup complete for ${user.username}`);
            clientWs.send(JSON.stringify({ setupComplete: true }));
            return;
          }

          if (parsed.serverContent) {
            const sc = parsed.serverContent;
            if (sc.modelTurn?.parts) {
              const hasAudio = sc.modelTurn.parts.some(p => p.inlineData);
              const hasText = sc.modelTurn.parts.some(p => p.text);
              if (hasAudio) audioChunksFromGemini++;
              if (hasText) {
                const text = sc.modelTurn.parts.filter(p => p.text).map(p => p.text).join('');
                console.log(`[Realtime] ← modelTurn text: "${text}"`);
              }
              // Log audio stats every 50 chunks
              if (audioChunksFromGemini % 50 === 1) {
                console.log(`[Realtime] ← Audio chunks from Gemini: ${audioChunksFromGemini}`);
              }
            }
            if (sc.inputTranscription) {
              console.log(`[Realtime] ← inputTranscription: "${sc.inputTranscription.text}"`);
            }
            if (sc.outputTranscription) {
              console.log(`[Realtime] ← outputTranscription: "${sc.outputTranscription.text}"`);
            }
            if (sc.interrupted) {
              console.log(`[Realtime] ⚡ Interrupted (barge-in detected)`);
            }
            if (sc.turnComplete) {
              console.log(`[Realtime] ✓ Turn complete`);
            }
            if (sc.generationComplete) {
              console.log(`[Realtime] ✓ Generation complete`);
            }
          }

          if (parsed.toolCall) {
            console.log(`[Realtime] ← toolCall:`, JSON.stringify(parsed.toolCall).substring(0, 200));
          }

          if (parsed.goAway) {
            console.log(`[Realtime] ⚠ GoAway: timeLeft=${parsed.goAway.timeLeft}`);
          }

          if (parsed.usageMetadata) {
            console.log(`[Realtime] 📊 Tokens: prompt=${parsed.usageMetadata.promptTokenCount} response=${parsed.usageMetadata.responseTokenCount} total=${parsed.usageMetadata.totalTokenCount}`);
          }

          // Forward to client
          clientWs.send(str);
        });

        geminiWs.on('close', (code, reason) => {
          const elapsed = ((Date.now() - sessionStart) / 1000).toFixed(1);
          console.log(`[Realtime] Gemini WS closed: code=${code} reason=${reason || 'none'} after ${elapsed}s (audio: client→${audioChunksFromClient} gemini→${audioChunksFromGemini})`);
          if (clientWs.readyState === WebSocket.OPEN) {
            clientWs.send(JSON.stringify({ error: 'AI session ended' }));
            clientWs.close();
          }
        });

        geminiWs.on('error', (e) => {
          console.error(`[Realtime] ✗ Gemini WS error: ${e.message}`);
          if (clientWs.readyState === WebSocket.OPEN) {
            clientWs.send(JSON.stringify({ error: 'AI connection error: ' + e.message }));
          }
        });

        return;
      }

      // Forward audio/text messages to Gemini
      if (setupDone && geminiWs && geminiWs.readyState === WebSocket.OPEN) {
        // Count audio chunks from client
        if (msg.realtimeInput?.audio) {
          audioChunksFromClient++;
          if (audioChunksFromClient % 50 === 1) {
            console.log(`[Realtime] → Audio chunks from client: ${audioChunksFromClient}`);
          }
        }
        if (msg.realtimeInput?.text) {
          console.log(`[Realtime] → Client text: "${msg.realtimeInput.text}"`);
        }
        if (msg.realtimeInput?.audioStreamEnd) {
          console.log(`[Realtime] → audioStreamEnd (mic paused)`);
        }
        if (msg.clientContent) {
          console.log(`[Realtime] → clientContent:`, JSON.stringify(msg.clientContent).substring(0, 200));
        }
        geminiWs.send(raw.toString());
      } else if (!setupDone) {
        console.warn(`[Realtime] ⚠ Message before setup:`, JSON.stringify(msg).substring(0, 100));
      } else {
        console.warn(`[Realtime] ⚠ Gemini WS not ready (state=${geminiWs?.readyState})`);
      }
    });

    clientWs.on('close', (code) => {
      const elapsed = ((Date.now() - sessionStart) / 1000).toFixed(1);
      console.log(`[Realtime] User ${user.username} disconnected: code=${code} after ${elapsed}s (audio: client→${audioChunksFromClient} gemini→${audioChunksFromGemini})`);
      if (geminiWs && geminiWs.readyState === WebSocket.OPEN) {
        geminiWs.close();
      }
    });

    clientWs.on('error', (e) => {
      console.error(`[Realtime] ✗ Client WS error: ${e.message}`);
      if (geminiWs && geminiWs.readyState === WebSocket.OPEN) {
        geminiWs.close();
      }
    });
  });

  console.log('Realtime speaking WebSocket attached at /ws/speaking-realtime');
}

module.exports = { attachRealtimeWS };
