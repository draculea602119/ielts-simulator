/**
 * Dictionary Module — ECDICT (local) + Gemini AI (fallback)
 *
 * Strategy:
 * 1. If data/ecdict.db exists, use it for instant lookups
 * 2. Otherwise, use Gemini AI to generate definitions (cached in word_cache table)
 * 3. All results are cached in ielts.db word_cache table for reuse
 */

const Database = require('better-sqlite3');
const path = require('path');
const fs = require('fs');
const db = require('./database');

// ---- Word Cache Table (in ielts.db) ----
db.exec(`
  CREATE TABLE IF NOT EXISTS word_cache (
    word TEXT PRIMARY KEY,
    phonetic TEXT DEFAULT '',
    pos TEXT DEFAULT '',
    definition TEXT DEFAULT '',
    definition_en TEXT DEFAULT '',
    source TEXT DEFAULT 'gemini',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );
`);

const cacheGet = db.prepare('SELECT * FROM word_cache WHERE word = ?');
const cacheSet = db.prepare(`
  INSERT OR REPLACE INTO word_cache (word, phonetic, pos, definition, definition_en, source)
  VALUES (?, ?, ?, ?, ?, ?)
`);

// ---- ECDICT (optional) ----
let ecdb = null;
let ecLookup = null;
const ecPath = path.join(__dirname, '../data/ecdict.db');

function initEcdict() {
  if (ecdb) return true;
  if (!fs.existsSync(ecPath)) return false;
  try {
    ecdb = new Database(ecPath, { readonly: true });
    ecLookup = ecdb.prepare(
      'SELECT word, phonetic, pos, definition, translation FROM stardict WHERE word = ? COLLATE NOCASE'
    );
    console.log('ECDICT loaded successfully');
    return true;
  } catch (e) {
    console.warn('Failed to load ECDICT:', e.message);
    return false;
  }
}

// Try to init on startup
initEcdict();

// ---- ECDICT POS mapping ----
const POS_MAP = {
  'n': 'n.', 'j': 'adj.', 'v': 'v.', 'r': 'adv.',
  'i': 'prep.', 'c': 'conj.', 'p': 'pron.', 'u': 'art.',
  'e': 'interj.', 'x': 'prefix', 'd': 'det.'
};

function parseEcdictPos(posStr) {
  if (!posStr) return '';
  // Format like "n:100" or "j:80/v:20"
  return posStr.split('/').map(p => {
    const code = p.split(':')[0].trim();
    return POS_MAP[code] || code;
  }).join(' / ');
}

function formatPhonetic(phonetic) {
  if (!phonetic) return '';
  // Add slashes if not present
  if (!phonetic.startsWith('/') && !phonetic.startsWith('[')) {
    return '/' + phonetic + '/';
  }
  return phonetic;
}

function cleanTranslation(translation) {
  if (!translation) return '';
  // Remove redundant POS prefixes (e.g. "vt. ", "n. ") that duplicate the pos field,
  // keep up to 3 lines (covers most multi-sense entries), join with "；"
  const lines = translation.split('\n')
    .map(l => l.replace(/^[a-z]+\.\s*/i, '').trim())
    .filter(l => l);
  if (lines.length === 0) return '';
  return lines.slice(0, 3).join('；');
}

// ---- Simple Stemming (inflected → base form) ----
function getStemCandidates(word) {
  const candidates = [];
  const w = word.toLowerCase();
  // -ing: boasting→boast, running→run, making→make
  if (w.endsWith('ing') && w.length > 4) {
    const base = w.slice(0, -3);
    candidates.push(base);            // boasting → boast
    candidates.push(base + 'e');       // making → make
    if (base.length > 1 && base[base.length - 1] === base[base.length - 2]) {
      candidates.push(base.slice(0, -1)); // running → run
    }
  }
  // -ed: walked→walk, amused→amuse, stopped→stop
  if (w.endsWith('ed') && w.length > 3) {
    const base = w.slice(0, -2);
    candidates.push(base);            // walked → walk
    candidates.push(base.slice(0, -1)); // stopped → stop (if doubled consonant)
    if (w.endsWith('ied')) {
      candidates.push(w.slice(0, -3) + 'y'); // carried → carry
    }
    candidates.push(w.slice(0, -1));   // amused → amuse
  }
  // -s/-es: runs→run, watches→watch, tries→try
  if (w.endsWith('ies') && w.length > 4) {
    candidates.push(w.slice(0, -3) + 'y'); // tries → try
  } else if (w.endsWith('es') && w.length > 3) {
    candidates.push(w.slice(0, -2));   // watches → watch
    candidates.push(w.slice(0, -1));   // amuses → amuse
  } else if (w.endsWith('s') && w.length > 2 && !w.endsWith('ss')) {
    candidates.push(w.slice(0, -1));   // runs → run
  }
  // -er/-est: bigger→big, fastest→fast
  if (w.endsWith('er') && w.length > 3) {
    candidates.push(w.slice(0, -2));
    candidates.push(w.slice(0, -1));
    if (w.length > 4 && w[w.length - 3] === w[w.length - 4]) {
      candidates.push(w.slice(0, -3)); // bigger → big
    }
  }
  if (w.endsWith('est') && w.length > 4) {
    candidates.push(w.slice(0, -3));
    if (w.length > 5 && w[w.length - 4] === w[w.length - 5]) {
      candidates.push(w.slice(0, -4)); // biggest → big
    }
  }
  // -ly: greatly→great
  if (w.endsWith('ly') && w.length > 3) {
    candidates.push(w.slice(0, -2));
    if (w.endsWith('ily')) candidates.push(w.slice(0, -3) + 'y'); // happily → happy
  }
  return [...new Set(candidates)].filter(c => c.length >= 2);
}

// ---- ECDICT Lookup (with stemming fallback) ----
function lookupEcdict(word) {
  if (!ecdb && !initEcdict()) return null;
  try {
    // Direct lookup first
    const row = ecLookup.get(word.toLowerCase());
    if (row) {
      return {
        word: row.word,
        phonetic: formatPhonetic(row.phonetic),
        pos: parseEcdictPos(row.pos),
        definition: cleanTranslation(row.translation),
        definition_en: row.definition || '',
        source: 'ecdict'
      };
    }
    // Try stem candidates
    for (const stem of getStemCandidates(word)) {
      const stemRow = ecLookup.get(stem);
      if (stemRow && stemRow.translation) {
        return {
          word: word.toLowerCase(),
          phonetic: formatPhonetic(stemRow.phonetic),
          pos: parseEcdictPos(stemRow.pos),
          definition: cleanTranslation(stemRow.translation),
          definition_en: stemRow.definition || '',
          source: 'ecdict'
        };
      }
    }
    return null;
  } catch {
    return null;
  }
}

// ---- Gemini AI Lookup (with retry) ----
async function lookupGeminiOnce(word, timeoutMs) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return null;

  const prompt = `You are an English-Chinese dictionary. Look up the English word "${word}".
Return ONLY valid JSON, no other text:
{
  "word": "${word}",
  "phonetic": "<IPA phonetic transcription, e.g. /rɪˈlʌktənt/>",
  "pos": "<part of speech abbreviation, e.g. n. / v. / adj. / adv. — if multiple, separate with />",
  "definition": "<Chinese definition, concise, max 3 meanings separated by ；>",
  "definition_en": "<English definition, concise, max 2 meanings>"
}`;

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
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.1,
        max_tokens: 512
      }),
      signal: AbortSignal.timeout(timeoutMs)
    }
  );
  if (!resp.ok) throw new Error(`Gemini API ${resp.status}`);
  const data = await resp.json();
  const text = data.choices?.[0]?.message?.content || '';
  const match = text.match(/\{[\s\S]*\}/);
  if (!match) throw new Error('No JSON in response');
  const parsed = JSON.parse(match[0]);
  return {
    word: parsed.word || word,
    phonetic: parsed.phonetic || '',
    pos: parsed.pos || '',
    definition: parsed.definition || '',
    definition_en: parsed.definition_en || '',
    source: 'gemini'
  };
}

async function lookupGemini(word) {
  for (let attempt = 0; attempt < 2; attempt++) {
    try {
      return await lookupGeminiOnce(word, attempt === 0 ? 10000 : 20000);
    } catch (e) {
      console.warn(`Gemini dict lookup attempt ${attempt + 1} failed:`, e.message);
    }
  }
  return null;
}

// ---- Main Lookup Function ----
async function lookupWord(word) {
  if (!word || typeof word !== 'string') return null;
  word = word.toLowerCase().trim();
  if (!word || word.length > 50) return null;

  // 1. Check cache first
  const cached = cacheGet.get(word);
  if (cached) return cached;

  // 2. Try ECDICT (re-attempt init if not loaded — covers late download)
  if (!ecdb) initEcdict();
  const ecResult = lookupEcdict(word);
  if (ecResult && ecResult.definition) {
    cacheSet.run(word, ecResult.phonetic, ecResult.pos, ecResult.definition, ecResult.definition_en, ecResult.source);
    return { ...ecResult, word };
  }

  // 3. Fallback to Gemini AI (with retry)
  const aiResult = await lookupGemini(word);
  if (aiResult && aiResult.definition) {
    cacheSet.run(word, aiResult.phonetic, aiResult.pos, aiResult.definition, aiResult.definition_en, aiResult.source);
    return { ...aiResult, word };
  }

  return null;
}

// ---- Batch Lookup (for preloading) ----
async function lookupWords(words) {
  const results = {};
  const pending = [];

  for (const w of words) {
    const word = w.toLowerCase().trim();
    const cached = cacheGet.get(word);
    if (cached) {
      results[word] = cached;
    } else {
      const ecResult = lookupEcdict(word);
      if (ecResult && ecResult.definition) {
        cacheSet.run(ecResult.word, ecResult.phonetic, ecResult.pos, ecResult.definition, ecResult.definition_en, ecResult.source);
        results[word] = ecResult;
      } else {
        pending.push(word);
      }
    }
  }

  // Batch Gemini lookups for remaining words (limited to 10 at a time)
  for (const word of pending.slice(0, 10)) {
    const aiResult = await lookupGemini(word);
    if (aiResult && aiResult.definition) {
      cacheSet.run(aiResult.word, aiResult.phonetic, aiResult.pos, aiResult.definition, aiResult.definition_en, aiResult.source);
      results[word] = aiResult;
    }
  }

  return results;
}

module.exports = { lookupWord, lookupWords };
