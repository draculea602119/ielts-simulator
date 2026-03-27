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

  CREATE INDEX IF NOT EXISTS idx_test_results_user_id ON test_results(user_id, created_at DESC);

  CREATE TABLE IF NOT EXISTS user_vocabulary (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    word TEXT NOT NULL,
    phonetic TEXT DEFAULT '',
    pos TEXT DEFAULT '',
    definition TEXT DEFAULT '',
    definition_en TEXT DEFAULT '',
    source_context TEXT DEFAULT '',
    ease_factor REAL DEFAULT 2.5,
    interval_days INTEGER DEFAULT 1,
    next_review_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    review_count INTEGER DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
  );

  CREATE UNIQUE INDEX IF NOT EXISTS idx_user_vocab_word ON user_vocabulary(user_id, word);
  CREATE INDEX IF NOT EXISTS idx_user_vocab_review ON user_vocabulary(user_id, next_review_at);

  CREATE TABLE IF NOT EXISTS wrong_answers (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    test_id INTEGER NOT NULL,
    section TEXT NOT NULL,
    question_num INTEGER NOT NULL,
    question_text TEXT DEFAULT '',
    question_type TEXT DEFAULT '',
    user_answer TEXT DEFAULT '',
    correct_answer TEXT DEFAULT '',
    mastered INTEGER DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
  );

  CREATE INDEX IF NOT EXISTS idx_wrong_answers_user ON wrong_answers(user_id, mastered);

  CREATE TABLE IF NOT EXISTS study_activity (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    activity_type TEXT NOT NULL,
    activity_data TEXT DEFAULT '',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
  );

  CREATE INDEX IF NOT EXISTS idx_study_activity_user ON study_activity(user_id, created_at DESC);

  CREATE TABLE IF NOT EXISTS writing_practice (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    task_type TEXT NOT NULL,
    prompt TEXT DEFAULT '',
    essay TEXT DEFAULT '',
    word_count INTEGER DEFAULT 0,
    ai_feedback TEXT DEFAULT '{}',
    band_score REAL DEFAULT 0,
    time_spent_seconds INTEGER DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
  );

  CREATE INDEX IF NOT EXISTS idx_writing_practice_user ON writing_practice(user_id, created_at DESC);
`);

module.exports = db;
