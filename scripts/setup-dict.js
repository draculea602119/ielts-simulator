#!/usr/bin/env node
/**
 * Download ECDICT SQLite dictionary to data/ecdict.db
 *
 * Usage: node scripts/setup-dict.js
 *
 * Downloads from GitHub: skywind3000/ECDICT release 1.0.28
 * File: ecdict-sqlite-28.zip (~12MB compressed, ~28MB uncompressed)
 */

const https = require('https');
const http = require('http');
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const DATA_DIR = path.join(__dirname, '../data');
const TARGET = path.join(DATA_DIR, 'ecdict.db');
const ZIP_PATH = path.join(DATA_DIR, 'ecdict-sqlite-28.zip');
const DOWNLOAD_URL = 'https://github.com/skywind3000/ECDICT/releases/download/1.0.28/ecdict-sqlite-28.zip';

if (fs.existsSync(TARGET)) {
  console.log('ecdict.db already exists at', TARGET);
  console.log('Delete it first if you want to re-download.');
  process.exit(0);
}

if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });

console.log('Downloading ECDICT from GitHub...');
console.log('URL:', DOWNLOAD_URL);
console.log('This may take a few minutes depending on your network.\n');

function download(url, dest, redirects = 0) {
  return new Promise((resolve, reject) => {
    if (redirects > 10) return reject(new Error('Too many redirects'));
    const proto = url.startsWith('https') ? https : http;
    const req = proto.get(url, { headers: { 'User-Agent': 'IELTS-Simulator/1.0' } }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        console.log(`  Redirect ${res.statusCode} → ${res.headers.location.substring(0, 80)}...`);
        return resolve(download(res.headers.location, dest, redirects + 1));
      }
      if (res.statusCode !== 200) return reject(new Error(`HTTP ${res.statusCode}`));

      const total = parseInt(res.headers['content-length'], 10) || 0;
      let downloaded = 0;
      const file = fs.createWriteStream(dest);

      res.on('data', (chunk) => {
        downloaded += chunk.length;
        if (total) {
          const pct = ((downloaded / total) * 100).toFixed(1);
          process.stdout.write(`\r  Downloaded: ${(downloaded / 1048576).toFixed(1)} MB / ${(total / 1048576).toFixed(1)} MB (${pct}%)`);
        } else {
          process.stdout.write(`\r  Downloaded: ${(downloaded / 1048576).toFixed(1)} MB`);
        }
      });

      res.pipe(file);
      file.on('finish', () => {
        file.close();
        console.log('\n  Download complete.');
        resolve();
      });
    });
    req.on('error', reject);
    req.setTimeout(120000, () => { req.destroy(); reject(new Error('Download timeout')); });
  });
}

async function main() {
  try {
    await download(DOWNLOAD_URL, ZIP_PATH);

    console.log('\nExtracting...');
    // Try to use system unzip
    try {
      if (process.platform === 'win32') {
        execSync(`powershell -Command "Expand-Archive -Path '${ZIP_PATH}' -DestinationPath '${DATA_DIR}' -Force"`, { stdio: 'pipe' });
      } else {
        execSync(`unzip -o "${ZIP_PATH}" -d "${DATA_DIR}"`, { stdio: 'pipe' });
      }
    } catch (e) {
      console.error('Failed to extract zip. Please manually extract', ZIP_PATH, 'to', DATA_DIR);
      console.error('The extracted .db file should be renamed to ecdict.db');
      process.exit(1);
    }

    // Find the extracted .db file and rename if needed
    const files = fs.readdirSync(DATA_DIR);
    const dbFile = files.find(f => f.endsWith('.db') && f !== 'ielts.db' && f !== 'ecdict.db');
    if (dbFile) {
      fs.renameSync(path.join(DATA_DIR, dbFile), TARGET);
    }

    // Clean up zip
    if (fs.existsSync(ZIP_PATH)) fs.unlinkSync(ZIP_PATH);

    if (fs.existsSync(TARGET)) {
      const stats = fs.statSync(TARGET);
      console.log(`\nSuccess! ecdict.db created (${(stats.size / 1048576).toFixed(1)} MB)`);
      console.log('Restart the server to use the local dictionary.');
    } else {
      console.log('\nWarning: ecdict.db not found after extraction.');
      console.log('Please check the data/ directory and rename the .db file to ecdict.db');
    }
  } catch (err) {
    console.error('\nDownload failed:', err.message);
    console.log('\nAlternative: download manually from');
    console.log('  https://github.com/skywind3000/ECDICT/releases/tag/1.0.28');
    console.log('Extract the .db file and place it at:', TARGET);
    if (fs.existsSync(ZIP_PATH)) fs.unlinkSync(ZIP_PATH);
    process.exit(1);
  }
}

main();
