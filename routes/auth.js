const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../db/database');
const { JWT_SECRET } = require('../middleware/auth');

const router = express.Router();

router.post('/register', (req, res) => {
  const { username, password } = req.body || {};
  if (!username || !password) return res.status(400).json({ error: '请填写用户名和密码' });
  if (username.trim().length < 2) return res.status(400).json({ error: '用户名至少2个字符' });
  if (password.length < 6) return res.status(400).json({ error: '密码至少6位' });

  try {
    const hash = bcrypt.hashSync(password, 10);
    const result = db.prepare('INSERT INTO users (username, password_hash) VALUES (?, ?)').run(username.trim(), hash);
    const token = jwt.sign({ id: result.lastInsertRowid, username: username.trim() }, JWT_SECRET, { expiresIn: '30d' });
    res.json({ token, username: username.trim() });
  } catch (e) {
    if (e.message.includes('UNIQUE')) return res.status(400).json({ error: '用户名已被占用' });
    console.error(e);
    res.status(500).json({ error: '注册失败，请稍后重试' });
  }
});

router.post('/login', (req, res) => {
  const { username, password } = req.body || {};
  if (!username || !password) return res.status(400).json({ error: '请填写用户名和密码' });

  const user = db.prepare('SELECT * FROM users WHERE username = ?').get(username.trim());
  if (!user || !bcrypt.compareSync(password, user.password_hash)) {
    return res.status(401).json({ error: '用户名或密码错误' });
  }
  const token = jwt.sign({ id: user.id, username: user.username }, JWT_SECRET, { expiresIn: '30d' });
  res.json({ token, username: user.username });
});

const { requireAuth } = require('../middleware/auth');

router.get('/me', requireAuth, (req, res) => {
  res.json({ id: req.user.id, username: req.user.username });
});

module.exports = router;
