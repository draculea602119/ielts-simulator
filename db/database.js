const Database = require('better-sqlite3');
const path = require('path');
const fs = require('fs');

const dataDir = path.join(__dirname, '../data');
if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });

const db = new Database(path.join(dataDir, 'ielts.db'));
db.pragma('journal_mode = WAL');
db.pragma('foreign_keys = ON');

db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS test_results (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    test_id INTEGER NOT NULL,
    test_topic TEXT,
    score_listening REAL DEFAULT 0,
    score_reading REAL DEFAULT 0,
    score_writing REAL DEFAULT 0,
    score_speaking REAL DEFAULT 0,
    score_overall REAL DEFAULT 0,
    listening_correct INTEGER DEFAULT 0,
    listening_total INTEGER DEFAULT 40,
    reading_correct INTEGER DEFAULT 0,
    reading_total INTEGER DEFAULT 40,
    writing_task1 TEXT DEFAULT '',
    writing_task2 TEXT DEFAULT '',
    ai_feedback_task1 TEXT DEFAULT '{}',
    ai_feedback_task2 TEXT DEFAULT '{}',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
  );
`);

module.exports = db;
