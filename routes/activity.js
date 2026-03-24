const express = require('express');
const router = express.Router();
const db = require('../db/database');
const { requireAuth } = require('../middleware/auth');

router.use(requireAuth);

// Log an activity (called internally by other routes or frontend)
router.post('/log', (req, res) => {
  const { type, data } = req.body;
  if (!type) return res.status(400).json({ error: '缺少活动类型' });
  db.prepare('INSERT INTO study_activity (user_id, activity_type, activity_data) VALUES (?, ?, ?)')
    .run(req.user.id, type.slice(0, 50), (data || '').slice(0, 200));
  res.json({ ok: true });
});

// Get streak info
router.get('/streak', (req, res) => {
  // Get distinct active days (in UTC)
  const days = db.prepare(`
    SELECT DISTINCT date(created_at) as d FROM study_activity
    WHERE user_id = ? ORDER BY d DESC LIMIT 365
  `).all(req.user.id).map(r => r.d);

  let streak = 0;
  if (days.length > 0) {
    const today = new Date().toISOString().slice(0, 10);
    const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10);
    // Streak counts from today or yesterday backward
    if (days[0] === today || days[0] === yesterday) {
      streak = 1;
      for (let i = 1; i < days.length; i++) {
        const prev = new Date(days[i - 1]);
        const curr = new Date(days[i]);
        const diff = (prev - curr) / 86400000;
        if (diff === 1) streak++;
        else break;
      }
    }
  }

  // Today's activity count
  const todayCount = db.prepare(`
    SELECT COUNT(*) as c FROM study_activity
    WHERE user_id = ? AND date(created_at) = date('now')
  `).get(req.user.id).c;

  // This week's activities (for goal tracking)
  const weekActivities = db.prepare(`
    SELECT activity_type, COUNT(*) as c FROM study_activity
    WHERE user_id = ? AND created_at >= date('now', 'weekday 0', '-7 days')
    GROUP BY activity_type
  `).all(req.user.id);

  const weekMap = {};
  weekActivities.forEach(r => { weekMap[r.activity_type] = r.c; });

  res.json({
    streak,
    todayCount,
    weekTests: weekMap['test_complete'] || 0,
    weekSpeaking: weekMap['speaking_session'] || 0,
    weekVocab: weekMap['vocab_review'] || 0,
    weekWriting: weekMap['writing_practice'] || 0,
    activeDays: days.slice(0, 30) // Last 30 active days
  });
});

module.exports = router;
