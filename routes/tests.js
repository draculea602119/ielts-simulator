const express = require('express');
const db = require('../db/database');
const { requireAuth } = require('../middleware/auth');

const router = express.Router();

// Band score from raw score
function rawToBand(score, total) {
  if (!total) return 4;
  const pct = score / total;
  if (pct >= 0.90) return 9;
  if (pct >= 0.80) return 8;
  if (pct >= 0.70) return 7;
  if (pct >= 0.60) return 6.5;
  if (pct >= 0.50) return 6;
  if (pct >= 0.40) return 5.5;
  if (pct >= 0.30) return 5;
  if (pct >= 0.20) return 4.5;
  return 4;
}

// Gemini writing evaluation
async function evaluateWriting(taskLabel, prompt, essay) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || !essay || essay.trim().length < 30) {
    const wordCount = (essay || '').trim().split(/\s+/).filter(w => w).length;
    const band = wordCount >= 400 ? 6.5 : wordCount >= 250 ? 6 : wordCount >= 150 ? 5.5 : 5;
    return {
      band,
      task_achievement: { score: band, comment: '未配置AI评分，根据字数估算。' },
      coherence:        { score: band, comment: '未配置AI评分。' },
      lexical:          { score: band, comment: '未配置AI评分。' },
      grammar:          { score: band, comment: '未配置AI评分。' },
      overall_feedback: apiKey ? '评分服务暂时不可用，已按字数估算分数。' : '请联系管理员配置 GEMINI_API_KEY 以启用 AI 评分。',
      suggestions: '建议配置 GEMINI_API_KEY 获取详细写作反馈。'
    };
  }

  const userPrompt = `You are a certified IELTS examiner. Evaluate this IELTS Academic Writing ${taskLabel} response.

Task prompt: "${prompt}"

Student's essay:
"${essay}"

Evaluate strictly on 4 IELTS criteria. Respond ONLY with valid JSON, no other text:
{
  "band": <overall band 1-9, use 0.5 increments>,
  "task_achievement": {"score": <1-9>, "comment": "<2 sentences in Chinese>"},
  "coherence":        {"score": <1-9>, "comment": "<2 sentences in Chinese>"},
  "lexical":          {"score": <1-9>, "comment": "<2 sentences in Chinese>"},
  "grammar":          {"score": <1-9>, "comment": "<2 sentences in Chinese>"},
  "overall_feedback": "<3-4 sentences overall assessment in Chinese>",
  "suggestions":      "<3 bullet-point improvement suggestions in Chinese, separated by |>"
}`;

  try {
    const resp = await fetch(
      'https://generativelanguage.googleapis.com/v1beta/openai/chat/completions',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model: 'gemini-2.5-flash',
          messages: [{ role: 'user', content: userPrompt }],
          temperature: 0.2,
          max_tokens: 8192
        }),
        signal: AbortSignal.timeout(60000)
      }
    );
    if (!resp.ok) throw new Error(`Gemini API ${resp.status}`);
    const data = await resp.json();
    const text = data.choices?.[0]?.message?.content || '';
    const match = text.match(/\{[\s\S]*\}/);
    if (match) return JSON.parse(match[0]);
    throw new Error('No JSON in response');
  } catch (e) {
    console.error('Gemini error:', e.message);
    const wordCount = essay.trim().split(/\s+/).filter(w => w).length;
    const band = wordCount >= 400 ? 6 : wordCount >= 250 ? 5.5 : 5;
    return {
      band,
      task_achievement: { score: band, comment: 'AI评分暂时不可用，已按字数估算。' },
      coherence:        { score: band, comment: 'AI评分暂时不可用。' },
      lexical:          { score: band, comment: 'AI评分暂时不可用。' },
      grammar:          { score: band, comment: 'AI评分暂时不可用。' },
      overall_feedback: '当前AI评分服务遇到错误，分数为估算值，请稍后重试。',
      suggestions: '请稍后重新提交以获取详细AI评分。'
    };
  }
}

// POST /api/tests/submit
router.post('/submit', requireAuth, async (req, res) => {
  const {
    testId, testTopic,
    lScore, lTotal, rScore, rTotal,
    writingAnswers, writingPrompts,
    speakingNotes
  } = req.body;

  // Band scores for L/R
  const lBand = rawToBand(lScore || 0, lTotal || 40);
  const rBand = rawToBand(rScore || 0, rTotal || 40);

  // AI writing evaluation
  const [t1, t2] = await Promise.all([
    evaluateWriting('Task 1', writingPrompts?.task1 || '', writingAnswers?.task1 || ''),
    evaluateWriting('Task 2', writingPrompts?.task2 || '', writingAnswers?.task2 || '')
  ]);

  const wBand = Math.round(((t1.band + t2.band) / 2) * 2) / 2;

  // Speaking (notes-based)
  const spWords = Object.values(speakingNotes || {}).join(' ').trim().split(/\s+/).filter(w => w).length;
  const sBand = spWords >= 150 ? 7 : spWords >= 80 ? 6.5 : spWords >= 40 ? 6 : 5.5;

  const overall = Math.round(((lBand + rBand + wBand + sBand) / 4) * 2) / 2;

  // Save to DB
  const row = db.prepare(`
    INSERT INTO test_results
      (user_id, test_id, test_topic,
       score_listening, score_reading, score_writing, score_speaking, score_overall,
       listening_correct, listening_total, reading_correct, reading_total,
       writing_task1, writing_task2, ai_feedback_task1, ai_feedback_task2)
    VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)
  `).run(
    req.user.id, testId, testTopic,
    lBand, rBand, wBand, sBand, overall,
    lScore || 0, lTotal || 40, rScore || 0, rTotal || 40,
    writingAnswers?.task1 || '', writingAnswers?.task2 || '',
    JSON.stringify(t1), JSON.stringify(t2)
  );

  res.json({
    resultId: row.lastInsertRowid,
    lScore: lScore || 0, lTotal: lTotal || 40,
    rScore: rScore || 0, rTotal: rTotal || 40,
    lBand, rBand, wBand, sBand, overall,
    t1Feedback: t1,
    t2Feedback: t2
  });
});

// GET /api/tests/history
router.get('/history', requireAuth, (req, res) => {
  const rows = db.prepare(`
    SELECT id, test_id, test_topic, score_overall, score_listening, score_reading,
           score_writing, score_speaking, created_at
    FROM test_results
    WHERE user_id = ?
    ORDER BY created_at DESC
    LIMIT 100
  `).all(req.user.id);
  res.json(rows);
});

module.exports = router;
