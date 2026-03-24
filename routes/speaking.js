const express = require('express');
const { requireAuth } = require('../middleware/auth');
const db = require('../db/database');

const router = express.Router();

const FORMAT = `
RESPONSE FORMAT (CRITICAL — follow exactly):
Write your spoken reply as plain English text, then on a new line write exactly "<<META>>", then a JSON object.

Example:
Hello, welcome to the IELTS speaking test. Tell me about your work.
<<META>>
{"tips":["用完整句子回答","尽量给出具体例子"],"sessionComplete":false,"bandEstimate":null,"cueCard":null}

Rules: No JSON in the spoken part. No prose after <<META>>. Tips must be in 简体中文. Never use --- dashes as separator.`;

function buildSystemPrompt(mode, topic, subPhase) {
  if (mode === 'part1') {
    return `You are a friendly but professional IELTS examiner. Topic: "${topic}". Ask one personal question at a time. After 5-6 exchanges set sessionComplete:true and give a bandEstimate (e.g. 6.5).${FORMAT}`;
  }
  if (mode === 'part2') {
    if (subPhase === 'cue_card') {
      return `You are an IELTS examiner. Generate a Part 2 cue card about "${topic}". Tell the student they have 1 minute to prepare. Put the cue card in the cueCard JSON field.${FORMAT}`;
    }
    if (subPhase === 'monologue') {
      return `You are an IELTS examiner. The student gave their Part 2 talk about "${topic}". Evaluate briefly and ask 1-2 follow-up questions.${FORMAT}`;
    }
    return `You are an IELTS examiner. Wrap up Part 2 about "${topic}" positively. Set sessionComplete:true with a bandEstimate.${FORMAT}`;
  }
  return `You are an IELTS examiner doing Part 3 discussion about "${topic}". Ask analytical questions. After 4-5 exchanges set sessionComplete:true with a bandEstimate.${FORMAT}`;
}

async function callAIStream(apiKey, messages, res) {
  const resp = await fetch('https://generativelanguage.googleapis.com/v1beta/openai/chat/completions', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${apiKey}` },
    body: JSON.stringify({
      model: 'gemini-2.5-flash',
      messages,
      temperature: 0.75,
      max_tokens: 8192,
      stream: true
    }),
    signal: AbortSignal.timeout(60000)
  });

  if (!resp.ok) {
    const errBody = await resp.text().catch(() => '');
    console.error('[Speaking] Gemini API error:', resp.status, errBody.substring(0, 500));
    res.write(`data: ${JSON.stringify({ error: `Gemini API ${resp.status}` })}\n\n`);
    res.end();
    return null;
  }
  return resp;
}

// POST /api/speaking/chat — SSE streaming
router.post('/chat', requireAuth, async (req, res) => {
  const { messages = [], mode = 'part1', topic = 'General', subPhase = 'cue_card' } = req.body;
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return res.status(500).json({ error: 'GEMINI_API_KEY 未配置' });

  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');
  res.flushHeaders();

  // Log activity for new speaking sessions (first message)
  if (messages.length <= 1) {
    try {
      db.prepare('INSERT INTO study_activity (user_id, activity_type, activity_data) VALUES (?, ?, ?)')
        .run(req.user.id, 'speaking_session', `${mode} - ${topic}`);
    } catch {}
  }

  const systemPrompt = buildSystemPrompt(mode, topic, subPhase);
  const userMessages = messages.map(m => ({ role: m.role === 'user' ? 'user' : 'assistant', content: m.content }));
  // Gemini requires at least one user message — add a start prompt if empty
  if (userMessages.length === 0) {
    userMessages.push({ role: 'user', content: 'Please begin the speaking test.' });
  }
  const aiMessages = [
    { role: 'system', content: systemPrompt },
    ...userMessages
  ];

  try {
    const resp = await callAIStream(apiKey, aiMessages, res);
    if (!resp) return;

    const reader = resp.body.getReader();
    const decoder = new TextDecoder();
    let fullText = '';
    let sentUpTo = 0; // track how much text we've already streamed to client

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      const chunk = decoder.decode(value, { stream: true });
      for (const line of chunk.split('\n')) {
        if (!line.startsWith('data: ')) continue;
        const raw = line.slice(6).trim();
        if (raw === '[DONE]') continue;
        try {
          const json = JSON.parse(raw);
          const token = json.choices?.[0]?.delta?.content || '';
          if (token) fullText += token;
        } catch {}
      }

      // Stream only the spoken text (before <<META>>) to client
      const metaIdx = fullText.search(/<<META>>|---META---|META---/);
      const safeEnd = metaIdx !== -1 ? metaIdx : fullText.length;
      if (safeEnd > sentUpTo) {
        const newText = fullText.slice(sentUpTo, safeEnd);
        // Send as individual tokens for frontend TTS
        res.write(`data: ${JSON.stringify({ token: newText })}\n\n`);
        sentUpTo = safeEnd;
      }
    }

    console.log('[Speaking] fullText:', fullText.substring(0, 300));

    // Parse metadata
    const sep = fullText.search(/<<META>>|---META---|META---/);
    let meta = { tips: [], sessionComplete: false, bandEstimate: null, cueCard: null };

    if (sep !== -1) {
      const metaStr = fullText.slice(sep);
      const jsonMatch = metaStr.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        try { meta = { ...meta, ...JSON.parse(jsonMatch[0]) }; } catch (e) {
          console.error('[Speaking] meta parse error:', e.message);
        }
      }
    } else {
      // Gemini may skip separator — try to find meta JSON at end of text
      const jsonMatch = fullText.match(/\{[\s\S]*"tips"[\s\S]*\}/);
      if (jsonMatch) {
        try { meta = { ...meta, ...JSON.parse(jsonMatch[0]) }; } catch {}
      }
      console.warn('[Speaking] no <<META>> separator found');
    }

    console.log('[Speaking] meta:', JSON.stringify(meta));
    res.write(`data: ${JSON.stringify({ done: true, ...meta })}\n\n`);
    res.end();
  } catch (e) {
    console.error('Speaking error:', e.message);
    res.write(`data: ${JSON.stringify({ error: 'AI 服务暂时不可用' })}\n\n`);
    res.end();
  }
});

// POST /api/speaking/score — IELTS band scoring
router.post('/score', requireAuth, async (req, res) => {
  const { messages = [], mode = 'part1', topic = 'General' } = req.body;
  const apiKey = process.env.GEMINI_API_KEY;

  const studentLines = messages.filter(m => m.role === 'user').map(m => m.content);
  if (!apiKey || studentLines.length < 1) {
    return res.json({ overall: 5.5, fc: { score: 5.5, comment: '对话内容不足，分数为估算值。' }, lr: { score: 5.5, comment: '请进行更完整的对话。' }, gr: { score: 5.5, comment: '需要更多样本才能评分。' }, pr: { score: 5.5, comment: '需要语音输入才能评估发音。' }, summary: '对话时间较短，以下为估算评分。', strengths: ['完成了口语练习'], improvements: ['建议进行更长的对话'] });
  }

  const prompt = `You are an IELTS examiner. Evaluate this student's Part ${mode.replace('part', '')} speaking about "${topic}".

Student's responses:
${studentLines.map((t, i) => `${i + 1}. ${t}`).join('\n')}

Score on 4 IELTS speaking criteria (0.5 increments, 1-9). All comments in 简体中文.
Respond ONLY with valid JSON:
{
  "overall": <band>,
  "fc": {"score": <band>, "comment": "<2 sentences in Chinese>"},
  "lr": {"score": <band>, "comment": "<2 sentences in Chinese>"},
  "gr": {"score": <band>, "comment": "<2 sentences in Chinese>"},
  "pr": {"score": <band>, "comment": "<2 sentences in Chinese>"},
  "summary": "<3 sentences Chinese feedback>",
  "strengths": ["<Chinese strength 1>", "<Chinese strength 2>"],
  "improvements": ["<Chinese improvement 1>", "<Chinese improvement 2>"]
}`;

  try {
    const resp = await fetch('https://generativelanguage.googleapis.com/v1beta/openai/chat/completions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${apiKey}` },
      body: JSON.stringify({ model: 'gemini-2.5-flash', messages: [{ role: 'user', content: prompt }], temperature: 0.2, max_tokens: 8192 }),
      signal: AbortSignal.timeout(60000)
    });
    if (!resp.ok) throw new Error(`Gemini ${resp.status}`);
    const data = await resp.json();
    const text = data.choices?.[0]?.message?.content || '';
    const match = text.match(/\{[\s\S]*\}/);
    if (match) return res.json(JSON.parse(match[0]));
    throw new Error('No JSON');
  } catch (e) {
    console.error('Score error:', e.message);
    res.json({ overall: 5.5, fc: { score: 5.5, comment: '评分服务暂时不可用。' }, lr: { score: 5.5, comment: '评分服务暂时不可用。' }, gr: { score: 5.5, comment: '评分服务暂时不可用。' }, pr: { score: 5.5, comment: '评分服务暂时不可用。' }, summary: '评分服务遇到错误，分数为估算值，请稍后重试。', strengths: ['完成了对话练习'], improvements: ['请稍后重新评分'] });
  }
});

module.exports = router;
