const express = require('express');
const { lookupWord, lookupWords } = require('../db/dictionary');

const router = express.Router();

// Single word lookup
router.get('/word/:word', async (req, res) => {
  try {
    const result = await lookupWord(req.params.word);
    if (!result) return res.status(404).json({ error: 'Word not found' });
    res.json(result);
  } catch (e) {
    console.error('Dict lookup error:', e.message);
    res.status(500).json({ error: 'Lookup failed' });
  }
});

// Batch lookup (POST body: { words: ["word1", "word2", ...] })
router.post('/batch', async (req, res) => {
  try {
    const words = req.body.words;
    if (!Array.isArray(words) || words.length === 0) {
      return res.status(400).json({ error: 'Provide an array of words' });
    }
    // Limit to 50 words per request
    const limited = words.slice(0, 50);
    const results = await lookupWords(limited);
    res.json(results);
  } catch (e) {
    console.error('Dict batch error:', e.message);
    res.status(500).json({ error: 'Batch lookup failed' });
  }
});

module.exports = router;
