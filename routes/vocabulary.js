const express = require('express');
const router = express.Router();
const db = require('../db/database');
const { requireAuth } = require('../middleware/auth');

router.use(requireAuth);

// Add word to vocabulary
router.post('/add', (req, res) => {
  const { word, phonetic, pos, definition, definition_en, source_context } = req.body;
  if (!word || typeof word !== 'string') return res.status(400).json({ error: '缺少单词' });

  const clean = word.toLowerCase().trim().slice(0, 100);
  try {
    const stmt = db.prepare(`
      INSERT INTO user_vocabulary (user_id, word, phonetic, pos, definition, definition_en, source_context)
      VALUES (?, ?, ?, ?, ?, ?, ?)
      ON CONFLICT(user_id, word) DO UPDATE SET
        phonetic = excluded.phonetic,
        pos = excluded.pos,
        definition = excluded.definition,
        definition_en = excluded.definition_en,
        source_context = excluded.source_context
    `);
    stmt.run(
      req.user.id, clean,
      (phonetic || '').slice(0, 200),
      (pos || '').slice(0, 100),
      (definition || '').slice(0, 500),
      (definition_en || '').slice(0, 500),
      (source_context || '').slice(0, 200)
    );
    res.json({ ok: true });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// Remove word
router.delete('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  if (!id) return res.status(400).json({ error: '无效ID' });
  db.prepare('DELETE FROM user_vocabulary WHERE id = ? AND user_id = ?').run(id, req.user.id);
  res.json({ ok: true });
});

// List all vocabulary (with optional search)
router.get('/list', (req, res) => {
  const search = (req.query.q || '').trim();
  let rows;
  if (search) {
    // Escape LIKE wildcards so literal % and _ are matched, not treated as wildcards
    const escaped = search.replace(/[%_\\]/g, '\\$&');
    rows = db.prepare(
      `SELECT * FROM user_vocabulary WHERE user_id = ? AND word LIKE ? ESCAPE '\\' ORDER BY created_at DESC LIMIT 500`
    ).all(req.user.id, `%${escaped}%`);
  } else {
    rows = db.prepare(
      `SELECT * FROM user_vocabulary WHERE user_id = ? ORDER BY created_at DESC LIMIT 500`
    ).all(req.user.id);
  }
  res.json(rows);
});

// Get words due for review
router.get('/review', (req, res) => {
  const rows = db.prepare(
    `SELECT * FROM user_vocabulary WHERE user_id = ? AND next_review_at <= datetime('now')
     ORDER BY next_review_at ASC LIMIT 20`
  ).all(req.user.id);
  res.json(rows);
});

// Get vocabulary stats
router.get('/stats', (req, res) => {
  const total = db.prepare('SELECT COUNT(*) as c FROM user_vocabulary WHERE user_id = ?').get(req.user.id).c;
  const due = db.prepare(
    `SELECT COUNT(*) as c FROM user_vocabulary WHERE user_id = ? AND next_review_at <= datetime('now')`
  ).get(req.user.id).c;
  const mastered = db.prepare(
    `SELECT COUNT(*) as c FROM user_vocabulary WHERE user_id = ? AND review_count >= 5 AND ease_factor >= 2.5`
  ).get(req.user.id).c;
  res.json({ total, due, mastered });
});

// Submit review result (SM-2 algorithm)
router.post('/review', (req, res) => {
  const { id, quality } = req.body; // quality: 0-5 (0=forgot, 3=hard, 4=good, 5=easy)
  if (!id || quality === undefined) return res.status(400).json({ error: '缺少参数' });

  const q = Math.max(0, Math.min(5, parseInt(quality)));
  const row = db.prepare('SELECT * FROM user_vocabulary WHERE id = ? AND user_id = ?').get(id, req.user.id);
  if (!row) return res.status(404).json({ error: '未找到' });

  let { ease_factor, interval_days, review_count } = row;

  // SM-2 algorithm
  if (q < 3) {
    // Failed: reset interval
    interval_days = 1;
  } else {
    if (review_count === 0) {
      interval_days = 1;
    } else if (review_count === 1) {
      interval_days = 3;
    } else {
      interval_days = Math.round(interval_days * ease_factor);
    }
  }

  // Update ease factor
  ease_factor = ease_factor + (0.1 - (5 - q) * (0.08 + (5 - q) * 0.02));
  if (ease_factor < 1.3) ease_factor = 1.3;

  review_count++;

  db.prepare(`
    UPDATE user_vocabulary SET
      ease_factor = ?, interval_days = ?, review_count = ?,
      next_review_at = datetime('now', '+' || ? || ' days')
    WHERE id = ? AND user_id = ?
  `).run(ease_factor, interval_days, review_count, interval_days, id, req.user.id);

  // Log activity (only once per session — frontend batches reviews)
  try {
    db.prepare('INSERT INTO study_activity (user_id, activity_type, activity_data) VALUES (?, ?, ?)')
      .run(req.user.id, 'vocab_review', row.word);
  } catch {}

  res.json({ ok: true, interval_days, ease_factor, review_count });
});

module.exports = router;
