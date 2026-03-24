const express = require('express');
const db = require('../db/database');
const { requireAuth } = require('../middleware/auth');
const { evaluateWriting } = require('../lib/evaluate-writing');

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

// POST /api/tests/submit
router.post('/submit', requireAuth, async (req, res) => {
  const {
    testId, testTopic,
    lScore, lTotal, rScore, rTotal,
    writingAnswers, writingPrompts,
    speakingNotes,
    wrongAnswers
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

  // Save wrong answers if provided
  if (Array.isArray(wrongAnswers) && wrongAnswers.length > 0) {
    const insertWA = db.prepare(`
      INSERT OR IGNORE INTO wrong_answers (user_id, test_id, section, question_num, question_text, question_type, user_answer, correct_answer)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `);
    const insertMany = db.transaction((items) => {
      // Clear previous wrong answers for this test (re-submission)
      db.prepare('DELETE FROM wrong_answers WHERE user_id = ? AND test_id = ?').run(req.user.id, testId);
      for (const w of items) {
        insertWA.run(req.user.id, testId, w.section, w.questionNum, (w.questionText || '').slice(0, 500), w.questionType || '', (w.userAnswer || '').slice(0, 200), (w.correctAnswer || '').slice(0, 200));
      }
    });
    try { insertMany(wrongAnswers); } catch (e) { console.error('Wrong answers save error:', e.message); }
  }

  // Log study activity
  try {
    db.prepare('INSERT INTO study_activity (user_id, activity_type, activity_data) VALUES (?, ?, ?)')
      .run(req.user.id, 'test_complete', `Test ${testId} - Band ${overall}`);
  } catch {}

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

// GET /api/tests/wrong-answers
router.get('/wrong-answers', requireAuth, (req, res) => {
  const section = req.query.section; // optional: 'listening' or 'reading'
  const mastered = req.query.mastered; // optional: '0' or '1'
  let sql = 'SELECT * FROM wrong_answers WHERE user_id = ?';
  const params = [req.user.id];
  if (section) { sql += ' AND section = ?'; params.push(section); }
  if (mastered !== undefined && mastered !== '') { sql += ' AND mastered = ?'; params.push(parseInt(mastered)); }
  sql += ' ORDER BY created_at DESC LIMIT 500';
  res.json(db.prepare(sql).all(...params));
});

// GET /api/tests/wrong-answers/stats (must be before :id routes)
router.get('/wrong-answers/stats', requireAuth, (req, res) => {
  const total = db.prepare('SELECT COUNT(*) as c FROM wrong_answers WHERE user_id = ?').get(req.user.id).c;
  const unmastered = db.prepare('SELECT COUNT(*) as c FROM wrong_answers WHERE user_id = ? AND mastered = 0').get(req.user.id).c;
  const mastered = total - unmastered;
  res.json({ total, unmastered, mastered });
});

// POST /api/tests/wrong-answers/:id/master
router.post('/wrong-answers/:id/master', requireAuth, (req, res) => {
  const id = parseInt(req.params.id);
  if (!id) return res.status(400).json({ error: '无效ID' });
  db.prepare('UPDATE wrong_answers SET mastered = 1 WHERE id = ? AND user_id = ?').run(id, req.user.id);
  res.json({ ok: true });
});

// GET /api/tests/analytics
router.get('/analytics', requireAuth, (req, res) => {
  const rows = db.prepare(`
    SELECT test_id, score_listening, score_reading, score_writing, score_speaking, score_overall,
           ai_feedback_task1, ai_feedback_task2, created_at
    FROM test_results WHERE user_id = ?
    ORDER BY created_at ASC LIMIT 50
  `).all(req.user.id);
  res.json(rows);
});

module.exports = router;
