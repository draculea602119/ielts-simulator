require('dotenv').config();
const express = require('express');
const path = require('path');

// Make Node.js built-in fetch use system proxy (for Gemini API access behind proxy)
const proxyUrl = process.env.HTTPS_PROXY || process.env.https_proxy || process.env.HTTP_PROXY || process.env.http_proxy;
if (proxyUrl) {
  try {
    const { ProxyAgent, setGlobalDispatcher } = require('undici');
    setGlobalDispatcher(new ProxyAgent(proxyUrl));
    console.log(`Proxy configured: ${proxyUrl}`);
  } catch (e) {
    console.warn('Failed to set proxy:', e.message);
  }
}

const compression = require('compression');

const app = express();
app.use(compression());
app.use(express.json({ limit: '2mb' }));

// Static files — no strong cache for JS/CSS/HTML (use ETag for revalidation)
app.use(express.static(path.join(__dirname, 'public'), {
  etag: true,
  lastModified: true,
  setHeaders(res, filePath) {
    if (filePath.endsWith('.html') || filePath.endsWith('.js') || filePath.endsWith('.css')) {
      // Always revalidate code files — ETag handles 304 Not Modified
      res.setHeader('Cache-Control', 'no-cache');
    } else if (filePath.includes('/data/') || filePath.endsWith('.json')) {
      res.setHeader('Cache-Control', 'public, max-age=86400'); // 1 day for data
    } else {
      res.setHeader('Cache-Control', 'public, max-age=604800'); // 7 days for images/fonts/icons
    }
  }
}));

app.use('/api/auth', require('./routes/auth'));
app.use('/api/tests', require('./routes/tests'));
app.use('/api/speaking', require('./routes/speaking'));
app.use('/api/dict', require('./routes/dict'));
app.use('/api/vocab', require('./routes/vocabulary'));
app.use('/api/activity', require('./routes/activity'));
app.use('/api/writing', require('./routes/writing'));

// API 404 (don't serve index.html for mistyped API routes)
app.all('/api/*', (req, res) => {
  res.status(404).json({ error: 'Not found' });
});

// SPA fallback
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`IELTS Simulator running on http://localhost:${PORT}`);
});
