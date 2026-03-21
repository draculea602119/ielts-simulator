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

const app = express();
app.use(express.json({ limit: '2mb' }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/auth', require('./routes/auth'));
app.use('/api/tests', require('./routes/tests'));
app.use('/api/speaking', require('./routes/speaking'));

// SPA fallback
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`IELTS Simulator running on http://localhost:${PORT}`);
});
