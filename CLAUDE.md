# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm start      # Production server (Express on port 3000)
npm run dev    # Development with --watch (auto-restarts on file changes)
```

Requires a `.env` file — copy `.env.example` and fill in:
- `JWT_SECRET` — long random string (≥64 chars)
- `GEMINI_API_KEY` — Google Gemini API key, used for writing evaluation and speaking AI
- `HTTPS_PROXY` / `HTTP_PROXY` — optional, routes all Node.js `fetch` through a proxy via `undici`

The SQLite database (`data/ielts.db`) is auto-created on first start. The `data/` directory is gitignored.

## Architecture

**Backend** (`server.js` → `routes/` → `db/`):
- Express serves `public/` as static files and falls back to `public/index.html` for SPA routing.
- Three API route files: `routes/auth.js` (JWT register/login/me), `routes/tests.js` (submit + history), `routes/speaking.js` (SSE streaming chat + scoring).
- `db/database.js` initialises the SQLite connection and creates the `users` and `test_results` tables.
- Auth middleware is inlined in `routes/tests.js` and `routes/speaking.js` (not a shared middleware module).
- Gemini API (`gemini-2.5-flash`) via OpenAI-compatible endpoint is the AI backend for both writing evaluation (JSON response) and speaking (SSE token stream with `<<META>>` delimiter for metadata).

**Frontend** (`public/`):
- Single-page app — all pages (`auth`, `home`, test modules) are hidden `<div>` elements toggled by `showPage()`.
- All frontend logic lives in `public/js/app.js`. Test question data (25 Academic mock tests) is in `public/js/data.js`.
- Auth tokens and username are persisted to `localStorage` (`ielts_token`, `ielts_user`).
- Listening audio uses the Web Speech API (TTS), preferring Microsoft Neural voices on Edge.
- The speaking page uses SSE: the backend streams tokens, then sends a final `{done:true,...meta}` event containing tips, band estimate, and cue card data.

## Key data shapes

**Writing feedback** (stored as JSON in `test_results.ai_feedback_task1/2`):
```json
{ "band": 6.5, "task_achievement": {"score":6.5,"comment":"..."}, "coherence": {...}, "lexical": {...}, "grammar": {...}, "overall_feedback": "...", "suggestions": "...|...|..." }
```

**Speaking SSE final event**:
```json
{ "done": true, "tips": ["..."], "sessionComplete": false, "bandEstimate": null, "cueCard": null }
```
