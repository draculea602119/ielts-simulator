// IELTS Simulator — Service Worker
// Bump CACHE_VERSION to force a full cache refresh on deploy.
const CACHE_VERSION = 'v4';
const SHELL_CACHE  = `ielts-shell-${CACHE_VERSION}`;
const DATA_CACHE   = `ielts-data-${CACHE_VERSION}`;
const FONT_CACHE   = `ielts-fonts-${CACHE_VERSION}`;
const DICT_CACHE   = `ielts-dict-${CACHE_VERSION}`;

// ---- App shell: the minimum set of assets needed to render the UI ----
const SHELL_ASSETS = [
  '/',
  '/index.html',
  '/css/style.css',
  '/js/app.js',
  '/js/data.js',
  '/js/novel.js',
  '/js/word-hover.js',
  '/manifest.json',
  '/offline.html',
];

// Novel data files that can be cached lazily (cache-first once fetched)
const NOVEL_DATA_PATTERN = /^\/data\/(novels\/|phrases\.json)/;

// Dictionary API — cache-first (word definitions rarely change)
const DICT_API_PATTERN = /^\/api\/dict\//;

// API routes that must NEVER be served from cache
const NETWORK_ONLY_PATTERNS = [
  /^\/api\/auth\//,
  /^\/api\/tests\//,
  /^\/api\/speaking\//,
  /^\/api\/writing\//,
  /^\/api\/activity\//,
  /^\/api\/vocab\//,
];

// Google Fonts — cache the CSS + woff2 files
const GOOGLE_FONT_ORIGINS = [
  'https://fonts.googleapis.com',
  'https://fonts.gstatic.com',
];

// =========================================================================
// INSTALL — pre-cache the app shell
// =========================================================================
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(SHELL_CACHE).then((cache) => cache.addAll(SHELL_ASSETS))
  );
  // Activate immediately so a new SW doesn't wait for old tabs to close
  self.skipWaiting();
});

// =========================================================================
// ACTIVATE — purge old caches from previous versions
// =========================================================================
self.addEventListener('activate', (event) => {
  const keep = new Set([SHELL_CACHE, DATA_CACHE, FONT_CACHE, DICT_CACHE]);
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys
          .filter((k) => !keep.has(k))
          .map((k) => caches.delete(k))
      )
    )
  );
  // Immediately control all open clients (no reload required)
  self.clients.claim();
});

// =========================================================================
// FETCH — routing strategies
// =========================================================================
self.addEventListener('fetch', (event) => {
  const { request } = event;

  // Only handle GET requests; let POST/PUT/DELETE pass through
  if (request.method !== 'GET') return;

  const url = new URL(request.url);

  // --- 1. Network-only: auth, tests, speaking, writing, activity, vocab APIs ---
  if (NETWORK_ONLY_PATTERNS.some((re) => re.test(url.pathname))) {
    return; // Let the browser handle it normally (network-only)
  }

  // --- 2. Google Fonts — cache-first (they are immutable once fetched) ---
  if (GOOGLE_FONT_ORIGINS.some((origin) => request.url.startsWith(origin))) {
    event.respondWith(cacheFirst(request, FONT_CACHE));
    return;
  }

  // --- 3. Dictionary API — cache-first ---
  if (DICT_API_PATTERN.test(url.pathname)) {
    event.respondWith(cacheFirst(request, DICT_CACHE));
    return;
  }

  // --- 4. Novel / phrases data files — cache-first ---
  if (NOVEL_DATA_PATTERN.test(url.pathname)) {
    event.respondWith(cacheFirst(request, DATA_CACHE));
    return;
  }

  // --- 5. App shell / other same-origin assets — stale-while-revalidate ---
  if (url.origin === self.location.origin) {
    event.respondWith(staleWhileRevalidate(request, SHELL_CACHE));
    return;
  }
});

// =========================================================================
// Strategy helpers
// =========================================================================

/**
 * Cache-first: return cached copy if available; otherwise fetch, cache, and return.
 */
async function cacheFirst(request, cacheName) {
  const cached = await caches.match(request);
  if (cached) return cached;

  try {
    const response = await fetch(request);
    if (response.ok) {
      const cache = await caches.open(cacheName);
      cache.put(request, response.clone());
    }
    return response;
  } catch (err) {
    // If offline and nothing in cache, return offline page for navigations
    if (request.mode === 'navigate') {
      return caches.match('/offline.html');
    }
    return new Response('Network error', { status: 408, statusText: 'Offline' });
  }
}

/**
 * Stale-while-revalidate: return cache immediately, then update cache in background.
 * Falls back to offline page for navigations when both cache + network fail.
 */
async function staleWhileRevalidate(request, cacheName) {
  const cache = await caches.open(cacheName);
  const cached = await cache.match(request);

  const fetchPromise = fetch(request)
    .then((response) => {
      if (response.ok) {
        cache.put(request, response.clone());
      }
      return response;
    })
    .catch(() => null);

  if (cached) {
    // Return the cached version immediately; the fetch updates the cache in background
    return cached;
  }

  // Nothing in cache — must wait for network
  const response = await fetchPromise;
  if (response) return response;

  // Fully offline, no cache hit — serve offline page for navigations
  if (request.mode === 'navigate') {
    return caches.match('/offline.html');
  }
  return new Response('Offline', { status: 503 });
}
