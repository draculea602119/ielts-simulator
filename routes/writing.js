const express = require('express');
const db = require('../db/database');
const { requireAuth } = require('../middleware/auth');
const { evaluateWriting } = require('../lib/evaluate-writing');

const router = express.Router();

// POST /api/writing/submit
router.post('/submit', requireAuth, async (req, res) => {
  const { taskType, prompt, essay, timeSpent } = req.body;
  if (!essay || !prompt) return res.status(400).json({ error: '缺少作文或题目' });

  const label = taskType === 'task1' ? 'Task 1' : 'Task 2';
  const feedback = await evaluateWriting(label, prompt, essay);
  const wordCount = essay.trim().split(/\s+/).filter(w => w).length;

  db.prepare(`
    INSERT INTO writing_practice (user_id, task_type, prompt, essay, word_count, ai_feedback, band_score, time_spent_seconds)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `).run(req.user.id, taskType || 'task2', prompt.slice(0, 1000), essay.slice(0, 5000), wordCount,
    JSON.stringify(feedback), feedback.band, timeSpent || 0);

  // Log activity
  try {
    db.prepare('INSERT INTO study_activity (user_id, activity_type, activity_data) VALUES (?, ?, ?)')
      .run(req.user.id, 'writing_practice', `${label} - Band ${feedback.band}`);
  } catch {}

  res.json({ feedback, wordCount });
});

// GET /api/writing/history
router.get('/history', requireAuth, (req, res) => {
  const rows = db.prepare(`
    SELECT id, task_type, prompt, word_count, band_score, time_spent_seconds, created_at
    FROM writing_practice WHERE user_id = ?
    ORDER BY created_at DESC LIMIT 50
  `).all(req.user.id);
  res.json(rows);
});

module.exports = router;
