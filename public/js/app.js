/* ================================================
   IELTS Simulator v2 — App Logic (Full Stack)
   ================================================ */

// ---- State ----
const state = {
  currentTest: null,
  answers: {},
  writingAnswers: {},
  speakingNotes: {},
  timerInterval: null,
  timerSeconds: 0,
  activeSection: 'listening',
  scores: {}
};

// ---- Audio (Web Speech API) ----
const audio = { utterance: null, btn: null };

function getEnVoice() {
  const voices = window.speechSynthesis.getVoices();
  // Prefer Microsoft neural voices (Edge) for natural sound
  const preferred = [
    'Microsoft Aria Online (Natural) - English (United States)',
    'Microsoft Jenny Online (Natural) - English (United States)',
    'Microsoft Guy Online (Natural) - English (United States)',
    'Microsoft Zira - English (United States)',
    'Google UK English Female',
    'Google US English',
  ];
  for (const name of preferred) {
    const v = voices.find(v => v.name === name);
    if (v) return v;
  }
  return voices.find(v => v.lang === 'en-GB') ||
         voices.find(v => v.lang === 'en-US') ||
         voices.find(v => v.lang.startsWith('en')) || null;
}

function playTranscript(si) {
  if (!window.speechSynthesis) { alert('浏览器不支持语音合成'); return; }
  const btn = document.getElementById('audio-btn-' + si);
  if (audio.btn === btn) { stopAudio(); return; }
  stopAudio();
  const el = document.getElementById('transcript-' + si);
  el.style.display = 'block';
  const u = new SpeechSynthesisUtterance(el.textContent.trim());
  const voice = getEnVoice();
  if (voice) u.voice = voice;
  u.rate = 0.88;
  btn.innerHTML = '⏹ 停止播放';
  btn.classList.add('audio-playing');
  audio.btn = btn;
  audio.utterance = u;
  u.onend = u.onerror = () => resetAudioBtn(btn);
  window.speechSynthesis.speak(u);
}

function stopAudio() {
  window.speechSynthesis.cancel();
  if (audio.btn) resetAudioBtn(audio.btn);
}

function resetAudioBtn(btn) {
  btn.innerHTML = '🔊 播放录音';
  btn.classList.remove('audio-playing');
  audio.btn = null;
  audio.utterance = null;
}

// ---- Auth State ----
const authState = {
  get token() { return localStorage.getItem('ielts_token'); },
  set token(v) { v ? localStorage.setItem('ielts_token', v) : localStorage.removeItem('ielts_token'); },
  get username() { return localStorage.getItem('ielts_user'); },
  set username(v) { v ? localStorage.setItem('ielts_user', v) : localStorage.removeItem('ielts_user'); }
};

// ---- API Helper ----
async function apiCall(path, opts = {}) {
  const headers = { 'Content-Type': 'application/json' };
  if (authState.token) headers['Authorization'] = 'Bearer ' + authState.token;
  const res = await fetch(path, { ...opts, headers: { ...headers, ...(opts.headers || {}) } });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error || `HTTP ${res.status}`);
  return data;
}

// ---- Auth Functions ----
async function checkAuth() {
  if (!authState.token) { showPage('auth'); return; }
  try {
    const user = await apiCall('/api/auth/me');
    authState.username = user.username;
    document.getElementById('userBadge').textContent = '👤 ' + user.username;
    showPage('home');
    renderHome();
  } catch {
    authState.token = null;
    authState.username = null;
    showPage('auth');
  }
}

function showAuthTab(tab) {
  document.getElementById('form-login').style.display = tab === 'login' ? 'flex' : 'none';
  document.getElementById('form-register').style.display = tab === 'register' ? 'flex' : 'none';
  document.getElementById('tab-login').classList.toggle('active', tab === 'login');
  document.getElementById('tab-register').classList.toggle('active', tab === 'register');
  document.getElementById('login-error').textContent = '';
  document.getElementById('reg-error').textContent = '';
}

async function handleLogin(e) {
  e.preventDefault();
  const btn = document.getElementById('login-btn');
  const errEl = document.getElementById('login-error');
  errEl.textContent = '';
  btn.disabled = true; btn.textContent = '登录中...';
  try {
    const data = await apiCall('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({
        username: document.getElementById('login-username').value,
        password: document.getElementById('login-password').value
      })
    });
    authState.token = data.token;
    authState.username = data.username;
    document.getElementById('userBadge').textContent = '👤 ' + data.username;
    showPage('home');
    renderHome();
  } catch (err) {
    errEl.textContent = err.message;
  } finally {
    btn.disabled = false; btn.textContent = '登录账号';
  }
}

async function handleRegister(e) {
  e.preventDefault();
  const btn = document.getElementById('reg-btn');
  const errEl = document.getElementById('reg-error');
  errEl.textContent = '';
  const pw = document.getElementById('reg-password').value;
  const pw2 = document.getElementById('reg-password2').value;
  if (pw !== pw2) { errEl.textContent = '两次密码不一致'; return; }
  btn.disabled = true; btn.textContent = '注册中...';
  try {
    const data = await apiCall('/api/auth/register', {
      method: 'POST',
      body: JSON.stringify({
        username: document.getElementById('reg-username').value,
        password: pw
      })
    });
    authState.token = data.token;
    authState.username = data.username;
    document.getElementById('userBadge').textContent = '👤 ' + data.username;
    showPage('home');
    renderHome();
  } catch (err) {
    errEl.textContent = err.message;
  } finally {
    btn.disabled = false; btn.textContent = '创建账号';
  }
}

function logout() {
  authState.token = null;
  authState.username = null;
  state.scores = {};
  showPage('auth');
}

// ---- Loading Overlay ----
function showLoading(msg = '正在提交，请稍候...') {
  document.getElementById('loadingMsg').textContent = msg;
  document.getElementById('loadingOverlay').style.display = 'flex';
}
function hideLoading() {
  document.getElementById('loadingOverlay').style.display = 'none';
}

// ---- Theme ----
function initTheme() {
  const saved = localStorage.getItem('ielts_theme') || 'light';
  setTheme(saved);
}
function setTheme(mode) {
  document.body.className = mode === 'dark' ? 'dark-mode' : 'light-mode';
  const icon = mode === 'dark' ? '☀️' : '🌙';
  document.querySelectorAll('[class^="theme-icon"]').forEach(el => el.textContent = icon);
  localStorage.setItem('ielts_theme', mode);
}
function toggleTheme() {
  setTheme(document.body.classList.contains('dark-mode') ? 'light' : 'dark');
}

// ---- Page Navigation ----
function showPage(id) {
  document.querySelectorAll('.page').forEach(p => {
    p.classList.remove('active');
    p.setAttribute('aria-hidden', 'true');
  });
  const target = document.getElementById('page-' + id);
  target.classList.add('active');
  target.removeAttribute('aria-hidden');
  window.scrollTo(0, 0);
}

// ---- Home ----
async function renderHome() {
  // Load history from API
  try {
    const history = await apiCall('/api/tests/history');
    state.scores = {};
    history.forEach(r => { state.scores['test_' + r.test_id] = r.score_overall; });
  } catch (e) {
    console.warn('Could not load history:', e.message);
  }

  const grid = document.getElementById('testsGrid');
  grid.innerHTML = '';
  TESTS.forEach(test => {
    const score = state.scores['test_' + test.id];
    const card = document.createElement('div');
    card.className = 'test-card';
    card.innerHTML = `
      <div class="test-num">Test ${test.id}</div>
      <div class="test-topic">${test.topic}</div>
      <div class="test-status">${score ? `<span class="test-done">✓ Band ${score}</span>` : '<span style="color:var(--text-muted)">未开始</span>'}</div>
      ${score ? '<div class="test-badge badge-done">✓</div>' : ''}
    `;
    card.setAttribute('role', 'button');
    card.setAttribute('tabindex', '0');
    card.onclick = () => startTest(test.id);
    card.onkeydown = (e) => { if (e.key === 'Enter') startTest(test.id); };
    grid.appendChild(card);
  });

  const completed = Object.keys(state.scores).length;
  if (completed > 0) {
    const avg = (Object.values(state.scores).reduce((a, b) => a + parseFloat(b), 0) / completed).toFixed(1);
    document.getElementById('scoreSummary').style.display = 'inline-block';
    document.getElementById('summaryText').textContent = `已完成 ${completed} 套 · 平均分 ${avg}`;
  } else {
    document.getElementById('scoreSummary').style.display = 'none';
  }

  // Load streak
  loadStreak();
}

async function loadStreak() {
  try {
    const s = await apiCall('/api/activity/streak');
    const row = document.getElementById('streakRow');
    if (s.streak > 0 || s.todayCount > 0) {
      row.style.display = '';
      document.getElementById('streakNum').textContent = s.streak;

      // Render week progress rings
      const rings = document.getElementById('weekRings');
      const items = [
        { label: '做题', val: s.weekTests, max: 3, color: 'var(--c-listen)' },
        { label: '口语', val: s.weekSpeaking, max: 3, color: 'var(--c-speak)' },
        { label: '词汇', val: s.weekVocab, max: 10, color: 'var(--c-write)' },
      ];
      rings.innerHTML = items.map(it => {
        const pct = Math.min(it.val / it.max, 1);
        const dashLen = 100.5;  // 2 * PI * 16
        const offset = dashLen * (1 - pct);
        return `<div class="hp-ring-item">
          <svg class="hp-ring-svg" viewBox="0 0 40 40">
            <circle cx="20" cy="20" r="16" fill="none" stroke="var(--bd)" stroke-width="3"/>
            <circle cx="20" cy="20" r="16" fill="none" stroke="${it.color}" stroke-width="3"
              stroke-dasharray="${dashLen}" stroke-dashoffset="${offset}"
              stroke-linecap="round" transform="rotate(-90 20 20)"/>
          </svg>
          <span class="hp-ring-val">${it.val}</span>
          <span class="hp-ring-label">${it.label}</span>
        </div>`;
      }).join('');
    } else {
      row.style.display = 'none';
    }
  } catch {}
}

// ---- Start Test ----
function startTest(testId) {
  const test = TESTS.find(t => t.id === testId);
  if (!test) return;
  state.currentTest = test;
  state.answers = {};
  state.writingAnswers = { task1: '', task2: '' };
  state.speakingNotes = {};
  document.getElementById('examTitle').textContent = `Test ${test.id} — ${test.topic}`;
  submitting = false;
  showPage('exam');
  document.getElementById('submitBtn').disabled = false;
  window.onbeforeunload = () => '你有未提交的答案，确定要离开吗？';
  switchSection('listening');
  startTimer(30 * 60);
  renderListening(test);
  renderReading(test);
  renderWriting(test);
  renderSpeaking(test);
  // Enable click-to-lookup on all exam text
  if (window.WordHover) {
    WordHover.processTextNodes(document.getElementById('listening-content'));
    WordHover.processTextNodes(document.getElementById('reading-content'));
    WordHover.processTextNodes(document.getElementById('writing-content'));
    WordHover.processTextNodes(document.getElementById('speaking-content'));
  }
}

// ---- Quick Start by Section ----
function quickStartSection(section) {
  if (section === 'speaking') { goToSpeakPage(); return; }
  startTest(TESTS[0].id);
  if (section !== 'listening') switchSection(section);
}

// ---- Timer ----
function startTimer(seconds) {
  clearInterval(state.timerInterval);
  state.timerSeconds = seconds;
  updateTimerDisplay();
  state.timerInterval = setInterval(() => {
    state.timerSeconds--;
    updateTimerDisplay();
    if (state.timerSeconds <= 0) {
      clearInterval(state.timerInterval);
      submitExam();
    }
  }, 1000);
}
function updateTimerDisplay() {
  const m = Math.floor(state.timerSeconds / 60).toString().padStart(2, '0');
  const s = (state.timerSeconds % 60).toString().padStart(2, '0');
  const el = document.getElementById('timerValue');
  el.textContent = `${m}:${s}`;
  el.className = 'timer-value' + (state.timerSeconds < 300 ? ' timer-warning' : '');
}

// ---- Section Switching ----
function switchSection(sectionName) {
  stopAudio();
  state.activeSection = sectionName;
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.section === sectionName);
  });
  document.querySelectorAll('.section-panel').forEach(p => p.classList.remove('active'));
  document.getElementById('panel-' + sectionName).classList.add('active');
  const times = { listening: 30 * 60, reading: 60 * 60, writing: 60 * 60, speaking: 15 * 60 };
  if (times[sectionName]) startTimer(times[sectionName]);
}

// ---- Render Listening ----
function renderListening(test) {
  const container = document.getElementById('listening-content');
  container.innerHTML = '';
  test.listening.sections.forEach((sec, si) => {
    const div = document.createElement('div');
    div.className = 'listening-section';
    div.innerHTML = `
      <div class="ls-header">
        <h3>Section ${si + 1}</h3>
        <span class="ls-desc">${sec.description}</span>
      </div>
      <div class="ls-toolbar">
        <button class="transcript-toggle" onclick="toggleTranscript(${si})">📄 显示/隐藏录音文本</button>
        <button class="audio-btn" id="audio-btn-${si}" onclick="playTranscript(${si})">🔊 播放录音</button>
      </div>
      <div class="ls-transcript" id="transcript-${si}" style="display:none">${sec.transcript}</div>
      <button class="answer-toggle" onclick="toggleAnswers('answers-L${si}')">📋 显示/隐藏答案</button>
      <div class="answers-panel answers-panel-listening" id="answers-L${si}" style="display:none">
        ${sec.questions.map(q => `<span class="answer-row"><span class="ar-num">Q${q.num}</span><span class="ar-ans">${q.answer}</span></span>`).join('')}
      </div>
      <div class="ls-questions" id="ls-qs-${si}"></div>
    `;
    container.appendChild(div);
    const qContainer = div.querySelector(`#ls-qs-${si}`);
    sec.questions.forEach((q, qi) => qContainer.appendChild(renderQuestion(q, `L${si}_${qi}`)));
  });
}

function toggleTranscript(si) {
  const el = document.getElementById('transcript-' + si);
  el.style.display = el.style.display === 'none' ? 'block' : 'none';
  // Process text for word hover when transcript is first shown
  if (el.style.display === 'block' && window.WordHover) {
    WordHover.processTextNodes(el);
  }
}
function toggleAnswers(id) {
  const el = document.getElementById(id);
  el.style.display = el.style.display === 'none' ? 'block' : 'none';
}

// ---- Render Reading ----
function renderReading(test) {
  const container = document.getElementById('reading-content');
  container.innerHTML = '';
  test.reading.passages.forEach((passage, pi) => {
    const div = document.createElement('div');
    div.className = 'reading-passage';
    div.innerHTML = `
      <div class="rp-header">
        <h3>Passage ${pi + 1}</h3>
        <div class="rp-title">${passage.title}</div>
      </div>
      <div class="rp-text">${passage.text}</div>
      <button class="answer-toggle answer-toggle-reading" onclick="toggleAnswers('answers-R${pi}')">📋 显示/隐藏答案</button>
      <div class="answers-panel answers-panel-reading" id="answers-R${pi}" style="display:none">
        ${passage.questions.map(q => `<span class="answer-row"><span class="ar-num">Q${q.num}</span><span class="ar-ans">${q.answer}</span></span>`).join('')}
      </div>
      <div class="rp-questions" id="rp-qs-${pi}"></div>
    `;
    container.appendChild(div);
    const qContainer = div.querySelector(`#rp-qs-${pi}`);
    passage.questions.forEach((q, qi) => qContainer.appendChild(renderQuestion(q, `R${pi}_${qi}`)));
  });
}

// ---- Render Writing ----
function renderWriting(test) {
  const container = document.getElementById('writing-content');
  container.innerHTML = '';
  const tasks = test.writing;
  const t1 = document.createElement('div');
  t1.className = 'writing-task';
  t1.innerHTML = `
    <div class="wt-header">
      <h3>Writing Task 1</h3>
      <span class="wt-badge">至少 150 字 · 建议 20 分钟</span>
    </div>
    <div class="wt-body">
      <div class="chart-desc">📊 ${tasks.task1.chart}</div>
      <div class="wt-prompt">${tasks.task1.prompt}</div>
      <textarea class="writing-textarea" id="writing-t1" placeholder="在此写作..." onInput="updateWordCount(this,'wc1')">${state.writingAnswers.task1}</textarea>
      <div class="word-count" id="wc1">字数：0</div>
      <div class="wt-tips">💡 描述主要趋势和数据特点，进行数据对比，不要给出个人观点。</div>
    </div>
  `;
  container.appendChild(t1);

  const t2 = document.createElement('div');
  t2.className = 'writing-task';
  t2.innerHTML = `
    <div class="wt-header">
      <h3>Writing Task 2</h3>
      <span class="wt-badge">至少 250 字 · 建议 40 分钟</span>
    </div>
    <div class="wt-body">
      <div class="wt-prompt"><strong>题目：</strong>${tasks.task2.prompt}</div>
      <textarea class="writing-textarea" id="writing-t2" style="min-height:280px" placeholder="在此写作..." onInput="updateWordCount(this,'wc2')">${state.writingAnswers.task2}</textarea>
      <div class="word-count" id="wc2">字数：0</div>
      <div class="wt-tips">💡 清晰表达立场，提供论据和例子，逻辑结构清晰（引言→主体段×2→结论）。</div>
    </div>
  `;
  container.appendChild(t2);
}

function updateWordCount(textarea, counterId) {
  const words = textarea.value.trim().split(/\s+/).filter(w => w.length > 0);
  document.getElementById(counterId).textContent = `字数：${words.length}`;
  if (textarea.id === 'writing-t1') state.writingAnswers.task1 = textarea.value;
  if (textarea.id === 'writing-t2') state.writingAnswers.task2 = textarea.value;
}

// ---- Render Speaking ----
function renderSpeaking(test) {
  const container = document.getElementById('speaking-content');
  container.innerHTML = '';
  const sp = test.speaking;

  const p1 = document.createElement('div');
  p1.className = 'speaking-part';
  p1.innerHTML = `
    <div class="sp-header">
      <h3>Part 1 — 介绍与提问</h3>
      <div class="sp-desc">时长约 4–5 分钟 · 回答关于个人日常生活的问题</div>
    </div>
    <div class="sp-body">
      <ul class="speaking-q-list">
        ${sp.part1.questions.map((q, i) => `<li class="speaking-q-item"><span class="q-num">Q${i+1}</span><span>${q}</span></li>`).join('')}
      </ul>
      <textarea class="speaking-notes" placeholder="练习笔记（可选）..." onInput="state.speakingNotes.p1=this.value">${state.speakingNotes.p1 || ''}</textarea>
    </div>
  `;
  container.appendChild(p1);

  const p2 = document.createElement('div');
  p2.className = 'speaking-part';
  p2.innerHTML = `
    <div class="sp-header">
      <h3>Part 2 — 个人陈述</h3>
      <div class="sp-desc">时长约 3–4 分钟</div>
    </div>
    <div class="sp-body">
      <div class="cue-card">
        <h4>题目卡：${sp.part2.topic}</h4>
        <ul>${sp.part2.points.map(p => `<li>${p}</li>`).join('')}</ul>
        <div class="cue-note">考官可能追问：${sp.part2.followUp}</div>
      </div>
      <textarea class="speaking-notes" placeholder="练习笔记（可选）..." onInput="state.speakingNotes.p2=this.value">${state.speakingNotes.p2 || ''}</textarea>
    </div>
  `;
  container.appendChild(p2);

  const p3 = document.createElement('div');
  p3.className = 'speaking-part';
  p3.innerHTML = `
    <div class="sp-header">
      <h3>Part 3 — 深入讨论</h3>
      <div class="sp-desc">时长约 4–5 分钟</div>
    </div>
    <div class="sp-body">
      <ul class="speaking-q-list">
        ${sp.part3.questions.map((q, i) => `<li class="speaking-q-item"><span class="q-num">Q${i+1}</span><span>${q}</span></li>`).join('')}
      </ul>
      <textarea class="speaking-notes" placeholder="练习笔记（可选）..." onInput="state.speakingNotes.p3=this.value">${state.speakingNotes.p3 || ''}</textarea>
    </div>
  `;
  container.appendChild(p3);
}

// ---- Render Question ----
function renderQuestion(q, key) {
  const div = document.createElement('div');
  div.className = 'question-block';
  div.id = 'qblock-' + key;
  if (q.type === 'mc') {
    div.innerHTML = `
      <div class="q-label">Question ${q.num} · Multiple Choice</div>
      <div class="q-text">${q.question}</div>
      <div class="q-options">
        ${q.options.map((opt, i) => `
          <label class="q-option" id="opt-${key}-${i}">
            <input type="radio" name="q_${key}" value="${opt.charAt(0)}" onchange="recordAnswer('${key}', '${opt.charAt(0)}')">
            ${opt}
          </label>`).join('')}
      </div>
      <div class="q-feedback" id="fb-${key}"></div>
    `;
  } else {
    div.innerHTML = `
      <div class="q-label">Question ${q.num} · Fill in the Blank</div>
      <div class="q-text">${q.question}</div>
      <input class="q-input" type="text" placeholder="请输入答案..."
        onchange="recordAnswer('${key}', this.value)"
        value="${state.answers[key] || ''}">
      <div class="q-feedback" id="fb-${key}"></div>
    `;
  }
  return div;
}

function recordAnswer(key, value) {
  state.answers[key] = value.trim();
}

// ---- Score locally (L/R) ----
function scoreLocalLR() {
  const test = state.currentTest;
  let lScore = 0, lTotal = 0, rScore = 0, rTotal = 0;
  test.listening.sections.forEach((sec, si) => {
    sec.questions.forEach((q, qi) => {
      const key = `L${si}_${qi}`;
      lTotal++;
      const userAns = (state.answers[key] || '').toLowerCase().trim();
      const correct = q.answer.toLowerCase().trim();
      if (userAns === correct || (q.type === 'mc' && userAns === correct.charAt(0).toLowerCase())) lScore++;
    });
  });
  test.reading.passages.forEach((passage, pi) => {
    passage.questions.forEach((q, qi) => {
      const key = `R${pi}_${qi}`;
      rTotal++;
      const userAns = (state.answers[key] || '').toLowerCase().trim();
      const correct = q.answer.toLowerCase().trim();
      if (userAns === correct || (q.type === 'mc' && userAns === correct.charAt(0).toLowerCase())) rScore++;
    });
  });
  return { lScore, lTotal, rScore, rTotal };
}

function collectWrongAnswers(test) {
  const wrong = [];
  let qNum = 0;
  test.listening.sections.forEach((sec, si) => {
    sec.questions.forEach((q, qi) => {
      qNum++;
      const key = `L${si}_${qi}`;
      const userAns = (state.answers[key] || '').toLowerCase().trim();
      const correct = q.answer.toLowerCase().trim();
      const isCorrect = userAns === correct || (q.type === 'mc' && userAns === correct.charAt(0).toLowerCase());
      if (!isCorrect && userAns) {
        wrong.push({ section: 'listening', questionNum: qNum, questionText: q.question, questionType: q.type, userAnswer: state.answers[key] || '', correctAnswer: q.answer });
      }
    });
  });
  qNum = 0;
  test.reading.passages.forEach((passage, pi) => {
    passage.questions.forEach((q, qi) => {
      qNum++;
      const key = `R${pi}_${qi}`;
      const userAns = (state.answers[key] || '').toLowerCase().trim();
      const correct = q.answer.toLowerCase().trim();
      const isCorrect = userAns === correct || (q.type === 'mc' && userAns === correct.charAt(0).toLowerCase());
      if (!isCorrect && userAns) {
        wrong.push({ section: 'reading', questionNum: qNum, questionText: q.question, questionType: q.type, userAnswer: state.answers[key] || '', correctAnswer: q.answer });
      }
    });
  });
  return wrong;
}

// ---- Submit Exam ----
let submitting = false;
async function submitExam() {
  if (submitting) return;
  submitting = true;
  document.getElementById('submitBtn').disabled = true;
  clearInterval(state.timerInterval);
  stopAudio();

  const t1El = document.getElementById('writing-t1');
  const t2El = document.getElementById('writing-t2');
  if (t1El) state.writingAnswers.task1 = t1El.value;
  if (t2El) state.writingAnswers.task2 = t2El.value;

  const { lScore, lTotal, rScore, rTotal } = scoreLocalLR();
  const test = state.currentTest;

  // Collect wrong answers for L/R
  const wrongAnswers = collectWrongAnswers(test);

  showLoading('AI 正在批改写作，请稍候（约10-20秒）...');

  try {
    const result = await apiCall('/api/tests/submit', {
      method: 'POST',
      body: JSON.stringify({
        testId: test.id,
        testTopic: test.topic,
        lScore, lTotal, rScore, rTotal,
        writingAnswers: state.writingAnswers,
        writingPrompts: {
          task1: test.writing.task1.prompt,
          task2: test.writing.task2.prompt
        },
        speakingNotes: state.speakingNotes,
        wrongAnswers
      })
    });
    hideLoading();
    submitting = false;
    window.onbeforeunload = null;
    showResult(result);
  } catch (err) {
    hideLoading();
    submitting = false;
    document.getElementById('submitBtn').disabled = false;
    alert('提交失败：' + err.message + '\n请检查网络连接后重试。');
  }
}

// ---- Show Result ----
function showResult(data) {
  const { lScore, lTotal, rScore, rTotal, lBand, rBand, wBand, sBand, overall, t1Feedback, t2Feedback } = data;

  showPage('result');
  document.getElementById('aiFeedbackSection').style.display = 'none';
  document.getElementById('reviewArea').style.display = 'none';

  document.getElementById('resultBand').textContent = overall;

  const desc = overall >= 8 ? '优秀 Expert' : overall >= 7 ? '良好 Good' :
               overall >= 6 ? '中等 Competent' : overall >= 5 ? '基础 Modest' : '有限 Limited';

  document.getElementById('resultBreakdown').innerHTML = `
    <div class="breakdown-item">
      <div class="bd-label">🎧 Listening</div>
      <div class="bd-score bd-listening">${lBand}</div>
      <div style="font-size:0.75rem;color:var(--text-muted)">${lScore}/${lTotal}</div>
    </div>
    <div class="breakdown-item">
      <div class="bd-label">📖 Reading</div>
      <div class="bd-score bd-reading">${rBand}</div>
      <div style="font-size:0.75rem;color:var(--text-muted)">${rScore}/${rTotal}</div>
    </div>
    <div class="breakdown-item">
      <div class="bd-label">✍️ Writing</div>
      <div class="bd-score bd-writing">${wBand}</div>
      <div style="font-size:0.75rem;color:var(--text-muted)">AI评分</div>
    </div>
    <div class="breakdown-item">
      <div class="bd-label">🎤 Speaking</div>
      <div class="bd-score bd-speaking">${sBand}</div>
      <div style="font-size:0.75rem;color:var(--text-muted)">估分</div>
    </div>
    <div style="width:100%;text-align:center;margin-top:8px;font-size:0.85rem;color:var(--text-secondary)">${desc}</div>
  `;

  // AI writing feedback
  if (t1Feedback || t2Feedback) {
    renderAIFeedback(t1Feedback, t2Feedback);
  }

  document.getElementById('reviewBtn').onclick = () => showReview(state.currentTest);
  document.getElementById('homeBtn').onclick = () => { showPage('home'); renderHome(); };
}

// ---- Render AI Feedback ----
function renderAIFeedback(t1, t2) {
  const section = document.getElementById('aiFeedbackSection');
  const content = document.getElementById('aiFeedbackContent');
  section.style.display = 'block';

  function taskCard(label, fb) {
    if (!fb) return '';
    const criteria = [
      { key: 'task_achievement', name: 'Task Achievement' },
      { key: 'coherence',        name: 'Coherence & Cohesion' },
      { key: 'lexical',          name: 'Lexical Resource' },
      { key: 'grammar',          name: 'Grammar Range' }
    ];
    const suggestions = (fb.suggestions || '').split('|').filter(s => s.trim());
    return `
      <div class="ai-task-card">
        <div class="ai-task-header">
          <span>${escapeHtml(label)}</span>
          <span class="ai-band-badge">Band ${fb.band}</span>
        </div>
        <div class="ai-criteria">
          ${criteria.map(c => fb[c.key] ? `
            <div class="ai-criterion">
              <div class="ai-criterion-header">
                <span class="ai-criterion-name">${c.name}</span>
                <span class="ai-criterion-score">${fb[c.key].score}</span>
              </div>
              <div class="ai-criterion-comment">${escapeHtml(fb[c.key].comment)}</div>
            </div>` : '').join('')}
        </div>
        ${fb.overall_feedback ? `<div class="ai-overall"><strong>总体评价：</strong>${escapeHtml(fb.overall_feedback)}</div>` : ''}
        ${suggestions.length ? `
          <div class="ai-suggestions">
            <strong>改进建议：</strong>
            <ul>${suggestions.map(s => `<li>${escapeHtml(s.trim())}</li>`).join('')}</ul>
          </div>` : ''}
      </div>
    `;
  }

  content.innerHTML = taskCard('Writing Task 1', t1) + taskCard('Writing Task 2', t2);
}

// ---- Utility ----
function escapeHtml(s) {
  if (!s) return '';
  return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}

// ---- Review ----

function showReview(test) {
  const area = document.getElementById('reviewArea');
  area.style.display = 'block';
  area.innerHTML = '';

  function buildReviewHtml(title, sections) {
    let html = `<h3>${title}</h3>`;
    sections.forEach(({ questions, prefix }) => {
      questions.forEach((q, qi) => {
        const key = `${prefix}_${qi}`;
        const userAns = state.answers[key] || '（未作答）';
        const correct = q.answer;
        const isCorrect = userAns.toLowerCase().trim() === correct.toLowerCase().trim() ||
          (q.type === 'mc' && userAns.toLowerCase().trim() === correct.toLowerCase().charAt(0));
        html += `
          <div style="padding:8px 0;border-bottom:1px solid var(--border-light);font-size:0.85rem">
            <strong>Q${q.num}:</strong> ${q.question.replace(/<[^>]+>/g,'').substring(0,80)}...<br>
            <span style="color:var(--text-muted)">你的答案：</span><span style="color:${isCorrect?'var(--accent-green)':'var(--accent-red)'}">${escapeHtml(userAns)}</span>
            ${!isCorrect ? `<span style="color:var(--text-muted)"> · 正确答案：</span><span style="color:var(--accent-green)">${escapeHtml(correct)}</span>` : ' ✓'}
          </div>`;
      });
    });
    return html;
  }

  const lSections = test.listening.sections.map((sec, si) => ({ questions: sec.questions, prefix: `L${si}` }));
  const lDiv = document.createElement('div');
  lDiv.className = 'review-section';
  lDiv.innerHTML = buildReviewHtml('🎧 Listening — 答案解析', lSections);
  area.appendChild(lDiv);

  const rSections = test.reading.passages.map((p, pi) => ({ questions: p.questions, prefix: `R${pi}` }));
  const rDiv = document.createElement('div');
  rDiv.className = 'review-section';
  rDiv.innerHTML = buildReviewHtml('📖 Reading — 答案解析', rSections);
  area.appendChild(rDiv);
  area.scrollIntoView({ behavior: 'smooth' });
}

// ---- Init ----
document.addEventListener('DOMContentLoaded', async () => {
  try {
    initTheme();
    await checkAuth();
  } catch (e) {
    console.error('Init error during checkAuth:', e);
    // Ensure auth page is always reachable even if checkAuth fails
    showPage('auth');
  }

  // Hook up ALL theme toggles (IDs themeToggle, themeToggle2 ... themeToggle11)
  document.querySelectorAll('[id^="themeToggle"]').forEach(el => {
    el.onclick = toggleTheme;
  });

  document.getElementById('backBtn').onclick = () => {
    const hasAnswers = Object.keys(state.answers).length > 0 ||
      state.writingAnswers.task1 || state.writingAnswers.task2 ||
      Object.values(state.speakingNotes).some(v => v);
    if (hasAnswers && !confirm('你有未提交的答案，确定要离开吗？')) return;
    window.onbeforeunload = null;
    clearInterval(state.timerInterval);
    stopAudio();
    showPage('home');
    renderHome();
  };

  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.onclick = () => switchSection(btn.dataset.section);
  });

  document.getElementById('submitBtn').onclick = submitExam;
});

// ================================================================
//  SPEAKING AI PRACTICE
// ================================================================

const SPEAK_TOPICS = [
  'Work & Career', 'Education', 'Technology', 'Travel & Tourism',
  'Family & Relationships', 'Health & Fitness', 'Environment', 'Food & Cooking',
  'Arts & Culture', 'Sports & Hobbies', 'Media & Entertainment', 'Cities & Housing'
];

const speakState = {
  messages: [],
  mode: 'part1',
  topic: '',
  subPhase: 'cue_card',
  recognition: null,
  isListening: false,
  isSpeaking: false,
  sessionActive: false,
  timerInterval: null,
  timerSeconds: 0,
  selectedTopic: null
};

function goToSpeakPage() {
  showPage('speak');
  initSpeakPage();
}

function goToNovelPage() {
  if (window.Novel) Novel.showNovelPage();
}

function leaveSpeakPage() {
  endSpeakSession();
  showPage('home');
  renderHome();
}

function initSpeakPage() {
  // Reset state
  speakState.messages = [];
  speakState.mode = 'part1';
  speakState.topic = '';
  speakState.subPhase = 'cue_card';
  speakState.selectedTopic = null;
  speakState.sessionActive = false;

  // Show setup, hide body
  document.getElementById('saSetup').style.display = '';
  document.getElementById('saBody').style.display = 'none';
  document.getElementById('saTimer').style.display = 'none';

  // Reset start button
  const startBtn = document.getElementById('saStartBtn');
  startBtn.disabled = true;
  startBtn.textContent = '请先选择话题';

  // Render mode buttons
  const modeGroup = document.getElementById('saModeGroup');
  modeGroup.querySelectorAll('.sa-mode-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.mode === 'part1');
    btn.onclick = () => {
      speakState.mode = btn.dataset.mode;
      modeGroup.querySelectorAll('.sa-mode-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
    };
  });

  // Render topic grid
  const grid = document.getElementById('saTopicGrid');
  grid.innerHTML = '';
  SPEAK_TOPICS.forEach(topic => {
    const btn = document.createElement('button');
    btn.className = 'sa-topic-btn';
    btn.textContent = topic;
    btn.onclick = () => {
      speakState.topic = topic;
      speakState.selectedTopic = topic;
      grid.querySelectorAll('.sa-topic-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      startBtn.disabled = false;
      startBtn.textContent = '开始练习 →';
    };
    grid.appendChild(btn);
  });

  // Check Speech API
  const hasRecognition = 'webkitSpeechRecognition' in window || 'SpeechRecognition' in window;
  document.getElementById('saBrowserWarn').style.display = hasRecognition ? 'none' : '';
}

function startSpeakSession() {
  if (!speakState.selectedTopic) return;

  document.getElementById('saSetup').style.display = 'none';
  document.getElementById('saBody').style.display = '';
  document.getElementById('saTimer').style.display = '';

  // Set session info
  const modeNames = { part1: 'Part 1 — 个人话题', part2: 'Part 2 — 长篇独白', part3: 'Part 3 — 抽象讨论' };
  document.getElementById('saSessionInfo').textContent =
    `${modeNames[speakState.mode]} · ${speakState.topic}`;

  // Reset chat
  document.getElementById('saChat').innerHTML = '';
  document.getElementById('saTipsList').innerHTML = '';
  document.getElementById('saScoreBox').style.display = 'none';

  // Show/hide text input based on browser support
  const hasRecognition = 'webkitSpeechRecognition' in window || 'SpeechRecognition' in window;
  document.getElementById('saTextInputWrap').style.display = hasRecognition ? 'none' : '';

  speakState.sessionActive = true;
  speakState.messages = [];
  speakState.timerSeconds = 0;
  startSpeakTimer();

  // Part 2 starts with cue_card subPhase
  if (speakState.mode === 'part2') speakState.subPhase = 'cue_card';

  setOrbState('thinking');
  sendSpeakMessage('[SESSION_START]');
}

// ---- TTS Queue (sentence-by-sentence) ----
const ttsQueue = [];
let ttsActive = false;

function enqueueTTS(sentence) {
  if (!sentence.trim()) return;
  ttsQueue.push(sentence.trim());
  if (!ttsActive) processTTS();
}

function processTTS() {
  if (!ttsQueue.length) { ttsActive = false; return; }
  ttsActive = true;
  const text = ttsQueue.shift();
  const u = new SpeechSynthesisUtterance(text);
  const voice = getEnVoice();
  if (voice) u.voice = voice;
  u.rate = 0.88; u.pitch = 1.05; u.volume = 1.0;
  u.onend = u.onerror = processTTS;
  window.speechSynthesis.speak(u);
}

function stopTTS() {
  ttsQueue.length = 0;
  ttsActive = false;
  window.speechSynthesis && window.speechSynthesis.cancel();
}

function extractSentences(text) {
  const re = /[^.!?。！？]+[.!?。！？]+\s*/g;
  const complete = [];
  let match;
  let last = 0;
  while ((match = re.exec(text)) !== null) {
    complete.push(match[0].trim());
    last = match.index + match[0].length;
  }
  return { complete, remaining: text.slice(last) };
}

// ---- Orb state ----
function setOrbState(orbMode) {
  const pg = document.getElementById('page-speak');
  if (!pg) return;
  pg.classList.remove('sp-speaking', 'sp-listening', 'sp-thinking');
  if (orbMode !== 'idle') pg.classList.add('sp-' + orbMode);
}

// ---- Streaming sendSpeakMessage ----
async function sendSpeakMessage(text) {
  if (!speakState.sessionActive) return;
  disableMicBtn(true);
  setOrbState('thinking');
  document.getElementById('saStatus').textContent = 'AI 思考中…';

  if (text !== '[SESSION_START]') {
    speakState.messages.push({ role: 'user', content: text });
    appendSpeakBubble('user', text);
  }

  try {
    const res = await fetch('/api/speaking/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + authState.token
      },
      body: JSON.stringify({
        messages: speakState.messages,
        mode: speakState.mode,
        topic: speakState.topic,
        subPhase: speakState.subPhase
      })
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);

    const reader = res.body.getReader();
    const dec = new TextDecoder();
    let replyText = '';
    let ttsBuffer = '';
    let inMeta = false;
    let aiDiv = null;
    let metaDone = false;

    setOrbState('speaking');
    document.getElementById('saStatus').textContent = 'AI 说话中…';

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      const lines = dec.decode(value, { stream: true }).split('\n');
      for (const line of lines) {
        if (!line.startsWith('data: ')) continue;
        const raw = line.slice(6).trim();
        if (!raw) continue;
        try {
          const msg = JSON.parse(raw);
          if (msg.error) throw new Error(msg.error);

          if (msg.done) {
            metaDone = true;
            // Flush any remaining TTS buffer (only if not already flushed by meta detection)
            if (!inMeta && ttsBuffer.trim()) { enqueueTTS(ttsBuffer); ttsBuffer = ''; }
            // Save full reply to messages
            if (replyText) speakState.messages.push({ role: 'assistant', content: replyText });
            // Enable word hover on completed AI bubble
            if (aiDiv && window.WordHover) WordHover.processTextNodes(aiDiv);
            if (msg.cueCard) renderCueCard(msg.cueCard);
            if (msg.tips && msg.tips.length) showSpeakTips(msg.tips);

            if (msg.sessionComplete) {
              speakState.sessionActive = false;
              disableMicBtn(true);
              setOrbState('idle');
              document.getElementById('saStatus').textContent = '练习完毕，正在评分…';
              document.getElementById('saScoreBox').style.display = '';
              requestScore();
              return;
            }
            // Advance Part 2 subPhase
            if (speakState.mode === 'part2') {
              if (speakState.subPhase === 'cue_card') speakState.subPhase = 'monologue';
              else if (speakState.subPhase === 'monologue') speakState.subPhase = 'followup';
            }
            break;
          }

          if (msg.token && !inMeta) {
            replyText += msg.token;
            ttsBuffer += msg.token;

            // Detect separator in accumulated text — <<META>> (new) or ---META--- / META--- (old/malformed)
            const metaMatch = replyText.search(/<<META>>|---META---|META---/);
            if (metaMatch !== -1) {
              inMeta = true;
              // Walk back past any leading dashes to get the clean cut point
              let cutAt = metaMatch;
              while (cutAt > 0 && replyText[cutAt - 1] === '-') cutAt--;
              replyText = replyText.slice(0, cutAt).trimEnd();
              ttsBuffer = replyText; // sync ttsBuffer to clean text
              if (aiDiv) aiDiv.textContent = replyText;
              // Flush remaining TTS buffer
              if (ttsBuffer.trim()) { enqueueTTS(ttsBuffer); ttsBuffer = ''; }
            } else {
              // Update bubble in real-time
              if (!aiDiv) {
                aiDiv = document.createElement('div');
                aiDiv.className = 'sa-bubble sa-bubble-ai';
                document.getElementById('saChat').appendChild(aiDiv);
              }
              aiDiv.textContent = replyText;
              document.getElementById('saChat').scrollTop = 99999;
              // Enqueue complete sentences for TTS
              const s = extractSentences(ttsBuffer);
              s.complete.forEach(enqueueTTS);
              ttsBuffer = s.remaining;
            }
          }
        } catch (e) {
          if (!metaDone) { document.getElementById('saStatus').textContent = '错误：' + e.message; setOrbState('idle'); disableMicBtn(false); return; }
        }
      }
    }

    // Wait for TTS to finish then re-enable mic
    const waitTTS = () => new Promise(r => {
      const check = setInterval(() => { if (!ttsActive && !ttsQueue.length) { clearInterval(check); r(); } }, 200);
    });
    await waitTTS();
    setOrbState('idle');
    disableMicBtn(false);
    // Auto-start listening after AI finishes speaking
    setTimeout(() => {
      if (speakState.sessionActive && !speakState.isListening) {
        document.getElementById('saStatus').textContent = '正在聆听…';
        startListening();
      }
    }, 600);

  } catch (err) {
    document.getElementById('saStatus').textContent = '错误：' + err.message;
    setOrbState('idle');
    disableMicBtn(false);
  }
}

// ---- IELTS Scoring ----
async function requestScore() {
  try {
    const data = await apiCall('/api/speaking/score', {
      method: 'POST',
      body: JSON.stringify({
        messages: speakState.messages,
        mode: speakState.mode,
        topic: speakState.topic
      })
    });
    showScoreCard(data);
  } catch (e) {
    document.getElementById('saScoreBandVal').textContent = '评分失败';
  }
}

function showScoreCard(d) {
  const bandEl = document.getElementById('saScoreBandVal');
  bandEl.textContent = d.overall || '--';

  const criteria = [
    { key: 'fc', label: '流利 & 连贯' },
    { key: 'lr', label: '词汇资源' },
    { key: 'gr', label: '语法精度' },
    { key: 'pr', label: '发音' }
  ];
  const grid = document.getElementById('spScoreGrid');
  grid.innerHTML = criteria.map(c => `
    <div class="sp-sc-criterion">
      <div class="sp-sc-cr-label">${c.label}</div>
      <div class="sp-sc-cr-score">${d[c.key]?.score || '--'}</div>
      <div class="sp-sc-cr-comment">${escapeHtml(d[c.key]?.comment || '')}</div>
    </div>
  `).join('');

  document.getElementById('spScoreSummary').textContent = d.summary || '';

  const lists = document.getElementById('spScoreLists');
  const mkList = (title, items) => `
    <div>
      <div class="sp-sc-col-title">${title}</div>
      ${(items || []).map(i => `<div class="sp-sc-list-item">${escapeHtml(i)}</div>`).join('')}
    </div>`;
  lists.innerHTML = mkList('✓ 优势', d.strengths) + mkList('→ 改进', d.improvements);
}

function disableMicBtn(disabled) {
  const btn = document.getElementById('saMicBtn');
  if (btn) btn.disabled = disabled;
}

function toggleListening() {
  if (speakState.isListening) {
    stopListening();
  } else {
    startListening();
  }
}

function startListening() {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SpeechRecognition) {
    document.getElementById('saTextInputWrap').style.display = '';
    return;
  }

  const recognition = new SpeechRecognition();
  recognition.lang = 'en-US';
  recognition.continuous = false;
  recognition.interimResults = true;
  speakState.recognition = recognition;
  speakState.isListening = true;

  const micBtn = document.getElementById('saMicBtn');
  micBtn.classList.add('sa-mic-active');
  document.getElementById('saStatus').textContent = '正在聆听...';
  const page = document.getElementById('page-speak');
  if (page) page.classList.add('sp-listening');

  let finalTranscript = '';

  recognition.onresult = (e) => {
    let interim = '';
    for (let i = e.resultIndex; i < e.results.length; i++) {
      if (e.results[i].isFinal) {
        finalTranscript += e.results[i][0].transcript;
      } else {
        interim += e.results[i][0].transcript;
      }
    }
    document.getElementById('saStatus').textContent = '识别中：' + (finalTranscript || interim);
  };

  recognition.onerror = (e) => {
    console.warn('Speech recognition error:', e.error);
    stopListening();
    document.getElementById('saStatus').textContent = '语音识别出错，请重试';
  };

  recognition.onend = () => {
    speakState.isListening = false;
    document.getElementById('saMicBtn').classList.remove('sa-mic-active');
    if (finalTranscript.trim()) {
      sendSpeakMessage(finalTranscript.trim());
    } else {
      document.getElementById('saStatus').textContent = '未检测到语音，请重试';
      disableMicBtn(false);
    }
  };

  recognition.start();
}

function stopListening() {
  if (speakState.recognition) {
    speakState.recognition.stop();
    speakState.recognition = null;
  }
  speakState.isListening = false;
  document.getElementById('saMicBtn').classList.remove('sa-mic-active');
  const page = document.getElementById('page-speak');
  if (page) page.classList.remove('sp-listening');
}


function appendSpeakBubble(role, text) {
  const chat = document.getElementById('saChat');
  const div = document.createElement('div');
  div.className = `sa-bubble sa-bubble-${role}`;
  div.textContent = text;
  chat.appendChild(div);
  chat.scrollTop = chat.scrollHeight;
  if (window.WordHover) WordHover.processTextNodes(div);
}

function renderCueCard(card) {
  const chat = document.getElementById('saChat');
  const div = document.createElement('div');
  div.className = 'sa-cue-card';
  div.innerHTML = `
    <div class="sa-cue-task">${escapeHtml(card.task || '')}</div>
    <ul class="sa-cue-prompts">
      ${(card.prompts || []).map(p => `<li>${escapeHtml(p)}</li>`).join('')}
    </ul>
    ${card.followUpHint ? `<div class="sa-cue-hint">💡 ${escapeHtml(card.followUpHint)}</div>` : ''}
  `;
  chat.appendChild(div);
  chat.scrollTop = chat.scrollHeight;
  if (window.WordHover) WordHover.processTextNodes(div);
}

function showSpeakTips(tips) {
  const list = document.getElementById('saTipsList');
  const empty = list.querySelector('.sa-tips-empty');
  if (empty) empty.remove();
  tips.forEach(tip => {
    const div = document.createElement('div');
    div.className = 'sa-tip-item';
    div.textContent = tip;
    list.appendChild(div);
  });
}

function endSpeakSession() {
  stopListening();
  stopTTS();
  window.speechSynthesis && window.speechSynthesis.cancel();
  clearInterval(speakState.timerInterval);
  speakState.sessionActive = false;
  speakState.isSpeaking = false;
  setOrbState('idle');
}

function sendSpeakText() {
  const input = document.getElementById('saTextInput');
  const text = input.value.trim();
  if (!text || !speakState.sessionActive) return;
  input.value = '';
  sendSpeakMessage(text);
}

function startSpeakTimer() {
  speakState.timerSeconds = 0;
  clearInterval(speakState.timerInterval);
  speakState.timerInterval = setInterval(() => {
    speakState.timerSeconds++;
    const m = String(Math.floor(speakState.timerSeconds / 60)).padStart(2, '0');
    const s = String(speakState.timerSeconds % 60).padStart(2, '0');
    document.getElementById('saTimerValue').textContent = `${m}:${s}`;
  }, 1000);
}

// ================ VOCABULARY PAGE ================
const vocabState = { words: [], reviewQueue: [], reviewIdx: 0, flipped: false };

function goToVocabPage() {
  showPage('vocab');
  vocabSwitchView('list');
  vocabLoadStats();
  vocabLoadList();
}

async function vocabLoadStats() {
  try {
    const s = await apiCall('/api/vocab/stats');
    document.getElementById('vocTotal').textContent = s.total;
    document.getElementById('vocDue').textContent = s.due;
    document.getElementById('vocMastered').textContent = s.mastered;
  } catch {}
}

async function vocabLoadList(q) {
  try {
    const url = q ? '/api/vocab/list?q=' + encodeURIComponent(q) : '/api/vocab/list';
    vocabState.words = await apiCall(url);
    vocabRenderList();
  } catch {}
}

function vocabRenderList() {
  const el = document.getElementById('vocList');
  if (!vocabState.words.length) {
    el.innerHTML = '<div class="voc-empty">暂无生词，在阅读或考试中点击单词上的 ☆ 即可收藏</div>';
    return;
  }
  el.innerHTML = vocabState.words.map(w => `
    <div class="voc-item" data-id="${w.id}">
      <div class="voc-item-main">
        <span class="voc-item-word">${escapeHtml(w.word)}</span>
        <span class="voc-item-phonetic">${escapeHtml(w.phonetic)}</span>
        <span class="voc-item-pos">${escapeHtml(w.pos)}</span>
      </div>
      <div class="voc-item-def">${escapeHtml(w.definition)}</div>
      ${w.definition_en ? `<div class="voc-item-def-en">${escapeHtml(w.definition_en)}</div>` : ''}
      <div class="voc-item-meta">
        ${w.source_context ? `<span class="voc-item-ctx">${escapeHtml(w.source_context)}</span>` : ''}
        <span class="voc-item-date">${new Date(w.created_at).toLocaleDateString()}</span>
        <button class="voc-item-del" onclick="vocabDelete(${w.id})" title="删除">✕</button>
      </div>
    </div>
  `).join('');
}

let vocabSearchTimer;
function vocabSearch() {
  clearTimeout(vocabSearchTimer);
  vocabSearchTimer = setTimeout(() => {
    vocabLoadList(document.getElementById('vocSearch').value.trim());
  }, 300);
}

async function vocabDelete(id) {
  try {
    await apiCall('/api/vocab/' + id, { method: 'DELETE' });
    vocabState.words = vocabState.words.filter(w => w.id !== id);
    vocabRenderList();
    vocabLoadStats();
  } catch {}
}

function vocabSwitchView(view) {
  document.querySelectorAll('.voc-tab').forEach(t => t.classList.toggle('active', t.dataset.view === view));
  document.getElementById('vocListView').classList.toggle('active', view === 'list');
  document.getElementById('vocReviewView').classList.toggle('active', view === 'review');
  if (view === 'review') vocabStartReview();
}

async function vocabStartReview() {
  try {
    vocabState.reviewQueue = await apiCall('/api/vocab/review');
    vocabState.reviewIdx = 0;
    vocabState.flipped = false;
    if (vocabState.reviewQueue.length === 0) {
      document.getElementById('vocReviewWrap').style.display = 'none';
      document.getElementById('vocReviewEmpty').style.display = '';
    } else {
      document.getElementById('vocReviewWrap').style.display = '';
      document.getElementById('vocReviewEmpty').style.display = 'none';
      vocabShowCard();
    }
  } catch {}
}

function vocabShowCard() {
  const q = vocabState.reviewQueue;
  const i = vocabState.reviewIdx;
  if (i >= q.length) {
    document.getElementById('vocReviewWrap').style.display = 'none';
    document.getElementById('vocReviewEmpty').style.display = '';
    document.querySelector('.voc-review-empty-text').textContent = '本轮复习完成！';
    document.querySelector('.voc-review-empty-sub').textContent = `共复习了 ${q.length} 个单词`;
    vocabLoadStats();
    return;
  }
  const w = q[i];
  vocabState.flipped = false;
  document.getElementById('vocCard').classList.remove('voc-card-flipped');
  document.getElementById('vocCardWord').textContent = w.word;
  document.getElementById('vocCardPhonetic').textContent = w.phonetic || '';
  document.getElementById('vocCardPos').textContent = w.pos || '';
  document.getElementById('vocCardDef').textContent = w.definition || '';
  document.getElementById('vocCardDefEn').textContent = w.definition_en || '';
  document.getElementById('vocCardCtx').textContent = w.source_context ? '来源: ' + w.source_context : '';
  document.getElementById('vocReviewBtns').style.display = 'none';
  document.getElementById('vocReviewProgress').textContent = `${i + 1} / ${q.length}`;
}

function vocabFlipCard() {
  if (vocabState.flipped) return;
  vocabState.flipped = true;
  document.getElementById('vocCard').classList.add('voc-card-flipped');
  document.getElementById('vocReviewBtns').style.display = '';
}

async function vocabRate(quality) {
  const w = vocabState.reviewQueue[vocabState.reviewIdx];
  if (!w) return;
  try {
    await apiCall('/api/vocab/review', { method: 'POST', body: JSON.stringify({ id: w.id, quality }) });
  } catch {}
  vocabState.reviewIdx++;
  vocabShowCard();
}

// ================ WRONG ANSWERS PAGE ================
const waState = { items: [], filter: 'all' };

function goToWrongPage() {
  showPage('wrong');
  waState.filter = 'all';
  document.querySelectorAll('.wa-filter').forEach(b => b.classList.toggle('active', b.dataset.f === 'all'));
  waLoadStats();
  waLoadList();
}

async function waLoadStats() {
  try {
    const s = await apiCall('/api/tests/wrong-answers/stats');
    document.getElementById('waTotal').textContent = s.total;
    document.getElementById('waUnmastered').textContent = s.unmastered;
    document.getElementById('waMastered').textContent = s.mastered;
  } catch {}
}

async function waLoadList() {
  try {
    const f = waState.filter;
    let url = '/api/tests/wrong-answers?';
    if (f === 'listening' || f === 'reading') url += 'section=' + f;
    else if (f === 'mastered') url += 'mastered=1';
    else if (f === 'unmastered') url += 'mastered=0';
    waState.items = await apiCall(url);
    waRenderList();
  } catch {}
}

function waFilter(f) {
  waState.filter = f;
  document.querySelectorAll('.wa-filter').forEach(b => b.classList.toggle('active', b.dataset.f === f));
  waLoadList();
}

function waRenderList() {
  const el = document.getElementById('waList');
  if (!waState.items.length) {
    el.innerHTML = '<div class="wa-empty">暂无错题记录，完成模拟考试后错题会自动收集</div>';
    return;
  }
  // Group by test
  const groups = {};
  waState.items.forEach(w => {
    const key = w.test_id;
    if (!groups[key]) groups[key] = [];
    groups[key].push(w);
  });

  el.innerHTML = Object.entries(groups).map(([testId, items]) => `
    <div class="wa-group">
      <div class="wa-group-hd">Test ${testId} <span class="wa-group-count">${items.length} 题</span></div>
      ${items.map(w => `
        <div class="wa-item ${w.mastered ? 'wa-item-mastered' : ''}" data-id="${w.id}">
          <div class="wa-item-top">
            <span class="wa-item-badge wa-badge-${w.section}">${w.section === 'listening' ? '听力' : '阅读'}</span>
            <span class="wa-item-qnum">Q${w.question_num}</span>
            <span class="wa-item-type">${w.question_type === 'mc' ? '选择' : '填空'}</span>
            ${w.mastered ? '<span class="wa-item-mastered-tag">✓ 已掌握</span>' : ''}
          </div>
          <div class="wa-item-q">${escapeHtml(w.question_text)}</div>
          <div class="wa-item-answers">
            <span class="wa-item-wrong">你的答案: ${escapeHtml(w.user_answer)}</span>
            <span class="wa-item-correct">正确答案: ${escapeHtml(w.correct_answer)}</span>
          </div>
          ${!w.mastered ? `<button class="wa-master-btn" onclick="waMaster(${w.id})">标记已掌握</button>` : ''}
        </div>
      `).join('')}
    </div>
  `).join('');
}

async function waMaster(id) {
  try {
    await apiCall('/api/tests/wrong-answers/' + id + '/master', { method: 'POST' });
    waState.items = waState.items.map(w => w.id === id ? { ...w, mastered: 1 } : w);
    waRenderList();
    waLoadStats();
  } catch {}
}

// ================ ANALYTICS PAGE ================
function goToAnalyticsPage() {
  showPage('analytics');
  loadAnalytics();
}

async function loadAnalytics() {
  try {
    const rows = await apiCall('/api/tests/analytics');
    if (!rows.length) {
      document.getElementById('anEmpty').style.display = '';
      document.querySelector('.an-charts').style.display = 'none';
      document.getElementById('anSummary').innerHTML = '';
      return;
    }
    document.getElementById('anEmpty').style.display = 'none';
    document.querySelector('.an-charts').style.display = '';

    // Summary
    const latest = rows[rows.length - 1];
    const avgL = (rows.reduce((s, r) => s + r.score_listening, 0) / rows.length).toFixed(1);
    const avgR = (rows.reduce((s, r) => s + r.score_reading, 0) / rows.length).toFixed(1);
    const avgW = (rows.reduce((s, r) => s + r.score_writing, 0) / rows.length).toFixed(1);
    const avgS = (rows.reduce((s, r) => s + r.score_speaking, 0) / rows.length).toFixed(1);
    const scores = [{ label: '听力', val: avgL, color: 'var(--c-listen)' }, { label: '阅读', val: avgR, color: 'var(--c-read)' }, { label: '写作', val: avgW, color: 'var(--c-write)' }, { label: '口语', val: avgS, color: 'var(--c-speak)' }];
    const best = scores.reduce((a, b) => parseFloat(a.val) >= parseFloat(b.val) ? a : b);
    const worst = scores.reduce((a, b) => parseFloat(a.val) <= parseFloat(b.val) ? a : b);
    document.getElementById('anSummary').innerHTML = `
      <div class="an-sum-row">
        <div class="an-sum-item"><span class="an-sum-num">${rows.length}</span><span class="an-sum-lbl">完成考试</span></div>
        <div class="an-sum-item"><span class="an-sum-num">${latest.score_overall}</span><span class="an-sum-lbl">最新总分</span></div>
        <div class="an-sum-item an-sum-best"><span class="an-sum-num">${best.label}</span><span class="an-sum-lbl">最强项 ${best.val}</span></div>
        <div class="an-sum-item an-sum-worst"><span class="an-sum-num">${worst.label}</span><span class="an-sum-lbl">最弱项 ${worst.val}</span></div>
      </div>`;

    drawTrendChart(rows);
    drawRadarChart(parseFloat(avgL), parseFloat(avgR), parseFloat(avgW), parseFloat(avgS));
  } catch (e) {
    console.warn('Analytics error:', e.message);
  }
}

function drawTrendChart(rows) {
  const canvas = document.getElementById('anTrendChart');
  const ctx = canvas.getContext('2d');
  const dpr = window.devicePixelRatio || 1;
  canvas.width = canvas.clientWidth * dpr;
  canvas.height = canvas.clientHeight * dpr;
  ctx.scale(dpr, dpr);
  const W = canvas.clientWidth, H = canvas.clientHeight;
  const pad = { top: 20, right: 20, bottom: 30, left: 36 };
  const gW = W - pad.left - pad.right, gH = H - pad.top - pad.bottom;

  ctx.clearRect(0, 0, W, H);

  // Y-axis (bands 4-9)
  const yMin = 4, yMax = 9;
  ctx.strokeStyle = getComputedStyle(document.body).getPropertyValue('--bd').trim() || '#e0d9cf';
  ctx.lineWidth = 0.5;
  ctx.font = '11px "DM Sans", sans-serif';
  ctx.fillStyle = getComputedStyle(document.body).getPropertyValue('--tx-3').trim() || '#7a90a4';
  for (let b = yMin; b <= yMax; b++) {
    const y = pad.top + gH - ((b - yMin) / (yMax - yMin)) * gH;
    ctx.beginPath(); ctx.moveTo(pad.left, y); ctx.lineTo(W - pad.right, y); ctx.stroke();
    ctx.fillText(b.toString(), pad.left - 20, y + 4);
  }

  const series = [
    { key: 'score_overall', color: '#18273a', label: 'Overall', width: 2.5 },
    { key: 'score_listening', color: '#2563eb', label: 'L', width: 1.5 },
    { key: 'score_reading', color: '#059669', label: 'R', width: 1.5 },
    { key: 'score_writing', color: '#d97706', label: 'W', width: 1.5 },
    { key: 'score_speaking', color: '#7c3aed', label: 'S', width: 1.5 },
  ];

  const toX = i => pad.left + (i / Math.max(rows.length - 1, 1)) * gW;
  const toY = v => pad.top + gH - ((v - yMin) / (yMax - yMin)) * gH;

  series.forEach(s => {
    ctx.strokeStyle = s.color;
    ctx.lineWidth = s.width;
    ctx.lineJoin = 'round';
    ctx.beginPath();
    rows.forEach((r, i) => {
      const x = toX(i), y = toY(r[s.key]);
      i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
    });
    ctx.stroke();
    // Last point dot
    if (rows.length > 0) {
      const last = rows[rows.length - 1];
      ctx.fillStyle = s.color;
      ctx.beginPath();
      ctx.arc(toX(rows.length - 1), toY(last[s.key]), 3, 0, Math.PI * 2);
      ctx.fill();
    }
  });

  // X-axis labels (test numbers)
  ctx.fillStyle = getComputedStyle(document.body).getPropertyValue('--tx-3').trim() || '#7a90a4';
  ctx.font = '10px "DM Mono", monospace';
  const step = Math.max(1, Math.floor(rows.length / 8));
  rows.forEach((r, i) => {
    if (i % step === 0 || i === rows.length - 1) {
      ctx.fillText('T' + r.test_id, toX(i) - 6, H - 6);
    }
  });

  // Legend
  ctx.font = '11px "DM Sans", sans-serif';
  let lx = pad.left;
  series.forEach(s => {
    ctx.fillStyle = s.color;
    ctx.fillRect(lx, 4, 14, 3);
    ctx.fillText(s.label, lx + 18, 10);
    lx += ctx.measureText(s.label).width + 32;
  });
}

function drawRadarChart(l, r, w, s) {
  const canvas = document.getElementById('anRadarChart');
  const ctx = canvas.getContext('2d');
  const dpr = window.devicePixelRatio || 1;
  canvas.width = canvas.clientWidth * dpr;
  canvas.height = canvas.clientHeight * dpr;
  ctx.scale(dpr, dpr);
  const W = canvas.clientWidth, H = canvas.clientHeight;
  const cx = W / 2, cy = H / 2, R = Math.min(W, H) / 2 - 40;

  ctx.clearRect(0, 0, W, H);

  const labels = ['Listening', 'Reading', 'Writing', 'Speaking'];
  const values = [l, r, w, s];
  const colors = ['#2563eb', '#059669', '#d97706', '#7c3aed'];
  const n = 4;
  const angleStep = (Math.PI * 2) / n;

  // Grid rings (4-9)
  ctx.strokeStyle = getComputedStyle(document.body).getPropertyValue('--bd').trim() || '#e0d9cf';
  ctx.lineWidth = 0.5;
  for (let ring = 1; ring <= 5; ring++) {
    const rr = (ring / 5) * R;
    ctx.beginPath();
    for (let i = 0; i <= n; i++) {
      const a = -Math.PI / 2 + i * angleStep;
      const x = cx + rr * Math.cos(a), y = cy + rr * Math.sin(a);
      i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
    }
    ctx.stroke();
  }

  // Axis lines
  for (let i = 0; i < n; i++) {
    const a = -Math.PI / 2 + i * angleStep;
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.lineTo(cx + R * Math.cos(a), cy + R * Math.sin(a));
    ctx.stroke();
  }

  // Data polygon
  const norm = v => Math.max(0, Math.min(1, (v - 4) / 5)); // 4-9 → 0-1
  ctx.fillStyle = 'rgba(40,120,106,0.15)';
  ctx.strokeStyle = 'var(--v-teal)';
  ctx.lineWidth = 2;
  ctx.beginPath();
  values.forEach((v, i) => {
    const a = -Math.PI / 2 + i * angleStep;
    const rr = norm(v) * R;
    const x = cx + rr * Math.cos(a), y = cy + rr * Math.sin(a);
    i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
  });
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  // Data points & labels
  ctx.font = '12px "DM Sans", sans-serif';
  values.forEach((v, i) => {
    const a = -Math.PI / 2 + i * angleStep;
    const rr = norm(v) * R;
    // Point
    ctx.fillStyle = colors[i];
    ctx.beginPath();
    ctx.arc(cx + rr * Math.cos(a), cy + rr * Math.sin(a), 4, 0, Math.PI * 2);
    ctx.fill();
    // Label
    const lr = R + 22;
    const lx = cx + lr * Math.cos(a), ly = cy + lr * Math.sin(a);
    ctx.fillStyle = getComputedStyle(document.body).getPropertyValue('--tx').trim() || '#18273a';
    ctx.textAlign = Math.abs(Math.cos(a)) < 0.1 ? 'center' : Math.cos(a) > 0 ? 'left' : 'right';
    ctx.textBaseline = Math.abs(Math.sin(a)) < 0.1 ? 'middle' : Math.sin(a) > 0 ? 'top' : 'bottom';
    ctx.fillText(`${labels[i]} ${v}`, lx, ly);
  });
  ctx.textAlign = 'left';
  ctx.textBaseline = 'alphabetic';
}

// ================ WRITING PRACTICE PAGE ================
const wpState = { type: 'task1', prompt: '', timerInterval: null, seconds: 0 };

function goToWritingPage() {
  showPage('writing');
  document.getElementById('wpSetup').style.display = '';
  document.getElementById('wpEditor').style.display = 'none';
  document.getElementById('wpFeedback').style.display = 'none';
  wpSelectType('task1');
  wpLoadHistory();
}

function wpSelectType(type) {
  wpState.type = type;
  document.querySelectorAll('.wp-type-btn').forEach(b => b.classList.toggle('active', b.dataset.type === type));
  // Build topic list from TESTS
  const el = document.getElementById('wpTopics');
  el.innerHTML = TESTS.map(t => {
    const w = type === 'task1' ? t.writing.task1 : t.writing.task2;
    const prompt = w.prompt || '';
    const preview = prompt.length > 80 ? prompt.slice(0, 80) + '...' : prompt;
    return `<div class="wp-topic-card" onclick='wpStartWrite(${t.id}, ${JSON.stringify(type)})'>
      <span class="wp-topic-num">Test ${t.id}</span>
      <span class="wp-topic-preview">${escapeHtml(preview)}</span>
    </div>`;
  }).join('');
}

function wpStartWrite(testId, type) {
  const test = TESTS.find(t => t.id === testId);
  if (!test) return;
  const w = type === 'task1' ? test.writing.task1 : test.writing.task2;
  wpState.prompt = w.prompt;
  wpState.type = type;

  document.getElementById('wpSetup').style.display = 'none';
  document.getElementById('wpEditor').style.display = '';
  document.getElementById('wpFeedback').style.display = 'none';

  const label = type === 'task1' ? 'Task 1 (至少 150 词)' : 'Task 2 (至少 250 词)';
  document.getElementById('wpPromptBox').innerHTML = `<div class="wp-prompt-label">${label}</div><div class="wp-prompt-text">${escapeHtml(w.prompt)}</div>`;
  if (w.chart) {
    document.getElementById('wpPromptBox').innerHTML += `<div class="wp-prompt-chart">📊 ${escapeHtml(w.chart)}</div>`;
  }

  document.getElementById('wpTextarea').value = '';
  document.getElementById('wpWordCount').textContent = '0 words';
  document.getElementById('wpSubmitBtn').disabled = false;

  // Start timer
  wpState.seconds = 0;
  clearInterval(wpState.timerInterval);
  wpState.timerInterval = setInterval(() => {
    wpState.seconds++;
    const m = String(Math.floor(wpState.seconds / 60)).padStart(2, '0');
    const s = String(wpState.seconds % 60).padStart(2, '0');
    document.getElementById('wpTimer').textContent = `${m}:${s}`;
  }, 1000);
}

function wpWordCount() {
  const text = document.getElementById('wpTextarea').value.trim();
  const count = text ? text.split(/\s+/).filter(w => w).length : 0;
  document.getElementById('wpWordCount').textContent = count + ' words';
}

async function wpSubmit() {
  const essay = document.getElementById('wpTextarea').value.trim();
  if (!essay) return;
  clearInterval(wpState.timerInterval);
  document.getElementById('wpSubmitBtn').disabled = true;
  showLoading('AI 正在评分，请稍候...');

  try {
    const result = await apiCall('/api/writing/submit', {
      method: 'POST',
      body: JSON.stringify({
        taskType: wpState.type,
        prompt: wpState.prompt,
        essay,
        timeSpent: wpState.seconds
      })
    });
    hideLoading();
    wpShowFeedback(result.feedback, result.wordCount);
  } catch (err) {
    hideLoading();
    document.getElementById('wpSubmitBtn').disabled = false;
    alert('提交失败: ' + err.message);
  }
}

function wpShowFeedback(fb, wordCount) {
  document.getElementById('wpEditor').style.display = 'none';
  document.getElementById('wpFeedback').style.display = '';
  const el = document.getElementById('wpFeedbackContent');
  const criteria = [
    { label: 'Task Achievement', data: fb.task_achievement },
    { label: 'Coherence & Cohesion', data: fb.coherence },
    { label: 'Lexical Resource', data: fb.lexical },
    { label: 'Grammar Range & Accuracy', data: fb.grammar }
  ];
  el.innerHTML = `
    <div class="wp-fb-band">Band ${fb.band}</div>
    <div class="wp-fb-wc">${wordCount} words · ${Math.floor(wpState.seconds / 60)} min</div>
    <div class="wp-fb-criteria">
      ${criteria.map(c => `
        <div class="wp-fb-crit">
          <div class="wp-fb-crit-hd"><span>${c.label}</span><span class="wp-fb-crit-score">${c.data?.score || '-'}</span></div>
          <div class="wp-fb-crit-comment">${escapeHtml(c.data?.comment || '')}</div>
        </div>
      `).join('')}
    </div>
    <div class="wp-fb-overall">${escapeHtml(fb.overall_feedback || '')}</div>
    ${fb.suggestions ? `<div class="wp-fb-suggestions"><strong>改进建议：</strong><ul>${fb.suggestions.split('|').map(s => `<li>${escapeHtml(s.trim())}</li>`).join('')}</ul></div>` : ''}
  `;
}

function wpReset() {
  document.getElementById('wpSetup').style.display = '';
  document.getElementById('wpEditor').style.display = 'none';
  document.getElementById('wpFeedback').style.display = 'none';
  wpLoadHistory();
}

function wpBack() {
  clearInterval(wpState.timerInterval);
  if (document.getElementById('wpEditor').style.display !== 'none') {
    wpReset();
  } else {
    showPage('home');
  }
}

async function wpLoadHistory() {
  try {
    const rows = await apiCall('/api/writing/history');
    const el = document.getElementById('wpHistoryList');
    if (!rows.length) { el.innerHTML = '<div class="wp-history-empty">暂无写作记录</div>'; return; }
    el.innerHTML = rows.slice(0, 10).map(r => `
      <div class="wp-history-item">
        <span class="wp-history-type">${r.task_type === 'task1' ? 'T1' : 'T2'}</span>
        <span class="wp-history-band">Band ${r.band_score}</span>
        <span class="wp-history-wc">${r.word_count} 词</span>
        <span class="wp-history-date">${new Date(r.created_at).toLocaleDateString()}</span>
      </div>
    `).join('');
  } catch {}
}

// ================ DICTATION PAGE ================
const dcState = { sentences: [], idx: 0, rate: 0.88, totalCorrect: 0, totalWords: 0 };

function goToDictationPage() {
  showPage('dictation');
  document.getElementById('dcSetup').style.display = '';
  document.getElementById('dcSession').style.display = 'none';
  document.getElementById('dcResult').style.display = 'none';
  // Build test/section selector
  const el = document.getElementById('dcTests');
  el.innerHTML = TESTS.map(t => `
    <div class="dc-test-card">
      <div class="dc-test-title">Test ${t.id} — ${escapeHtml(t.topic)}</div>
      <div class="dc-test-sections">
        ${t.listening.sections.map((sec, si) => `
          <button class="dc-sec-btn" onclick="dcStart(${t.id}, ${si})">Section ${si + 1}</button>
        `).join('')}
      </div>
    </div>
  `).join('');
}

function dcSetRate(r) {
  dcState.rate = r;
  document.querySelectorAll('.dc-speed-btn').forEach(b => b.classList.toggle('active', parseFloat(b.dataset.rate) === r));
}

function dcStart(testId, sectionIdx) {
  const test = TESTS.find(t => t.id === testId);
  if (!test) return;
  const sec = test.listening.sections[sectionIdx];
  if (!sec || !sec.transcript) return;

  // Split transcript into sentences
  const raw = sec.transcript.replace(/\s+/g, ' ').trim();
  dcState.sentences = raw.match(/[^.!?]+[.!?]+/g) || [raw];
  dcState.sentences = dcState.sentences.map(s => s.trim()).filter(s => s.length > 5);
  dcState.idx = 0;
  dcState.totalCorrect = 0;
  dcState.totalWords = 0;

  document.getElementById('dcSetup').style.display = 'none';
  document.getElementById('dcSession').style.display = '';
  document.getElementById('dcResult').style.display = 'none';
  dcShowSentence();

  // Log activity
  apiCall('/api/activity/log', { method: 'POST', body: JSON.stringify({ type: 'dictation', data: `Test ${testId} S${sectionIdx + 1}` }) }).catch(() => {});
}

function dcShowSentence() {
  const total = dcState.sentences.length;
  const i = dcState.idx;
  document.getElementById('dcSentNum').textContent = `${i + 1} / ${total}`;
  document.getElementById('dcProgressFill').style.width = `${((i) / total) * 100}%`;
  document.getElementById('dcInput').value = '';
  document.getElementById('dcDiff').style.display = 'none';
  document.getElementById('dcNextBtn').style.display = 'none';
  document.getElementById('dcCheckBtn').style.display = '';
  document.getElementById('dcInput').focus();
}

function dcPlaySentence() {
  if (!window.speechSynthesis) return;
  window.speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(dcState.sentences[dcState.idx]);
  const voice = getEnVoice();
  if (voice) u.voice = voice;
  u.rate = dcState.rate;
  u.pitch = 1;
  window.speechSynthesis.speak(u);
}

function dcCheckSentence() {
  const original = dcState.sentences[dcState.idx];
  const userText = document.getElementById('dcInput').value.trim();
  if (!userText) return;

  const origWords = original.replace(/[^\w\s'-]/g, '').toLowerCase().split(/\s+/).filter(w => w);
  const userWords = userText.replace(/[^\w\s'-]/g, '').toLowerCase().split(/\s+/).filter(w => w);

  // Simple word-by-word comparison using LCS
  const diff = diffWords(origWords, userWords);
  dcState.totalWords += origWords.length;
  dcState.totalCorrect += diff.correct;

  // Render diff
  const el = document.getElementById('dcDiff');
  el.innerHTML = `
    <div class="dc-diff-label">原文对比 (${diff.correct}/${origWords.length} 正确)</div>
    <div class="dc-diff-words">${diff.html}</div>
  `;
  el.style.display = '';
  document.getElementById('dcCheckBtn').style.display = 'none';
  document.getElementById('dcNextBtn').style.display = '';
}

function diffWords(orig, user) {
  // LCS-based diff: find longest common subsequence, then mark matches/misses
  const m = orig.length, n = user.length;
  const dp = Array.from({ length: m + 1 }, () => new Uint16Array(n + 1));
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      dp[i][j] = orig[i - 1] === user[j - 1] ? dp[i - 1][j - 1] + 1 : Math.max(dp[i - 1][j], dp[i][j - 1]);
    }
  }
  // Backtrack to find which orig words are matched
  const matched = new Set();
  let i = m, j = n;
  while (i > 0 && j > 0) {
    if (orig[i - 1] === user[j - 1]) { matched.add(i - 1); i--; j--; }
    else if (dp[i - 1][j] >= dp[i][j - 1]) i--;
    else j--;
  }
  const correct = matched.size;
  const html = orig.map((w, idx) => {
    if (matched.has(idx)) return `<span class="dc-w-ok">${escapeHtml(w)}</span>`;
    return `<span class="dc-w-miss">${escapeHtml(w)}</span>`;
  }).join(' ');
  return { correct, html };
}

function dcNextSentence() {
  dcState.idx++;
  if (dcState.idx >= dcState.sentences.length) {
    dcShowResult();
  } else {
    dcShowSentence();
  }
}

function dcShowResult() {
  document.getElementById('dcSession').style.display = 'none';
  document.getElementById('dcResult').style.display = '';
  const pct = dcState.totalWords > 0 ? Math.round((dcState.totalCorrect / dcState.totalWords) * 100) : 0;
  document.getElementById('dcAccuracy').textContent = `正确率: ${pct}%`;
  document.getElementById('dcStats').textContent = `共 ${dcState.sentences.length} 句 · ${dcState.totalCorrect}/${dcState.totalWords} 词正确`;
}

function dcBack() {
  window.speechSynthesis && window.speechSynthesis.cancel();
  if (document.getElementById('dcSession').style.display !== 'none') {
    document.getElementById('dcSetup').style.display = '';
    document.getElementById('dcSession').style.display = 'none';
  } else {
    showPage('home');
  }
}

// ================ TIMED READING PAGE ================
const trState = { passage: '', wordCount: 0, timerInterval: null, seconds: 0, questions: [] };

function goToTimedReadPage() {
  showPage('timed-read');
  document.getElementById('trSetup').style.display = '';
  document.getElementById('trReading').style.display = 'none';
  document.getElementById('trQuiz').style.display = 'none';
  document.getElementById('trResult').style.display = 'none';
  document.getElementById('trTimer').style.display = 'none';

  const el = document.getElementById('trPassages');
  el.innerHTML = TESTS.map(t => `
    <div class="tr-test-card">
      <div class="tr-test-title">Test ${t.id} — ${escapeHtml(t.topic)}</div>
      <div class="tr-test-passages">
        ${t.reading.passages.map((p, pi) => {
          const wc = p.text.split(/\s+/).length;
          return `<button class="tr-pass-btn" onclick="trStartReading(${t.id}, ${pi})">
            Passage ${pi + 1} <span class="tr-pass-wc">${wc} words</span>
          </button>`;
        }).join('')}
      </div>
    </div>
  `).join('');
}

function trStartReading(testId, passageIdx) {
  const test = TESTS.find(t => t.id === testId);
  if (!test) return;
  const p = test.reading.passages[passageIdx];
  trState.passage = p.text;
  trState.wordCount = p.text.split(/\s+/).length;
  trState.questions = p.questions.slice(0, 5); // Use first 5 existing questions

  document.getElementById('trSetup').style.display = 'none';
  document.getElementById('trReading').style.display = '';
  document.getElementById('trTimer').style.display = '';

  document.getElementById('trPassageBox').innerHTML = `
    <h3 class="tr-pass-title">${escapeHtml(p.title || 'Passage ' + (passageIdx + 1))}</h3>
    <div class="tr-pass-text">${p.text.split('\n').map(para => `<p>${escapeHtml(para)}</p>`).join('')}</div>
  `;

  // Start timer
  trState.seconds = 0;
  clearInterval(trState.timerInterval);
  trState.timerInterval = setInterval(() => {
    trState.seconds++;
    const m = String(Math.floor(trState.seconds / 60)).padStart(2, '0');
    const s = String(trState.seconds % 60).padStart(2, '0');
    document.getElementById('trTimer').textContent = `${m}:${s}`;
  }, 1000);
}

function trFinishReading() {
  clearInterval(trState.timerInterval);
  document.getElementById('trReading').style.display = 'none';
  document.getElementById('trQuiz').style.display = '';

  const wpm = Math.round(trState.wordCount / (trState.seconds / 60));

  // Show questions from the existing test data
  const el = document.getElementById('trQuizContent');
  if (trState.questions.length > 0) {
    el.innerHTML = `
      <div class="tr-quiz-info">用时 ${Math.floor(trState.seconds / 60)}分${trState.seconds % 60}秒 · ${trState.wordCount} 词 · <strong>${wpm} WPM</strong></div>
      <div class="tr-quiz-qs">
        ${trState.questions.map((q, i) => `
          <div class="tr-q-item">
            <div class="tr-q-text">Q${i + 1}. ${escapeHtml(q.question)}</div>
            ${q.type === 'mc' ? `
              <div class="tr-q-opts">
                ${q.options.map(opt => `
                  <label class="tr-q-opt">
                    <input type="radio" name="trq_${i}" value="${opt.charAt(0)}"> ${escapeHtml(opt)}
                  </label>
                `).join('')}
              </div>
            ` : `
              <input class="tr-q-input" type="text" placeholder="答案..." data-idx="${i}">
            `}
          </div>
        `).join('')}
      </div>
      <button class="tr-quiz-submit" onclick="trSubmitQuiz()">提交答案</button>
    `;
  } else {
    trShowResult(wpm, 0, 0);
  }
}

function trSubmitQuiz() {
  let correct = 0;
  trState.questions.forEach((q, i) => {
    let userAns = '';
    if (q.type === 'mc') {
      const checked = document.querySelector(`input[name="trq_${i}"]:checked`);
      userAns = checked ? checked.value.toLowerCase() : '';
    } else {
      const inp = document.querySelector(`.tr-q-input[data-idx="${i}"]`);
      userAns = inp ? inp.value.trim().toLowerCase() : '';
    }
    const correctAns = q.answer.toLowerCase().trim();
    if (userAns === correctAns || (q.type === 'mc' && userAns === correctAns.charAt(0).toLowerCase())) {
      correct++;
    }
  });
  const wpm = Math.round(trState.wordCount / (trState.seconds / 60));
  trShowResult(wpm, correct, trState.questions.length);
}

function trShowResult(wpm, correct, total) {
  document.getElementById('trQuiz').style.display = 'none';
  document.getElementById('trResult').style.display = '';

  const level = wpm >= 250 ? 'Band 7+' : wpm >= 200 ? 'Band 6+' : wpm >= 150 ? 'Band 5.5' : 'Band 5 以下';
  const pct = total > 0 ? Math.round((correct / total) * 100) : '-';

  document.getElementById('trResultContent').innerHTML = `
    <div class="tr-res-wpm">${wpm}</div>
    <div class="tr-res-wpm-label">WPM (每分钟词数)</div>
    <div class="tr-res-level">${level}</div>
    <div class="tr-res-bar">
      <div class="tr-res-bar-fill" style="width: ${Math.min(wpm / 300 * 100, 100)}%"></div>
      <div class="tr-res-bar-target" style="left: ${200/300*100}%"><span>200</span></div>
    </div>
    <div class="tr-res-bar-labels">
      <span>0</span><span>100</span><span>200</span><span>300</span>
    </div>
    ${total > 0 ? `<div class="tr-res-comp">理解正确率: ${correct}/${total} (${pct}%)</div>` : ''}
    <div class="tr-res-time">阅读时间: ${Math.floor(trState.seconds / 60)}分${trState.seconds % 60}秒 · ${trState.wordCount} 词</div>
    <div class="tr-res-actions">
      <button class="tr-res-btn" onclick="goToTimedReadPage()">再练一篇</button>
      <button class="tr-res-btn tr-res-btn-sec" onclick="showPage('home')">返回首页</button>
    </div>
  `;

  // Log activity
  apiCall('/api/activity/log', { method: 'POST', body: JSON.stringify({ type: 'reading_drill', data: `${wpm} WPM` }) }).catch(() => {});
}

function trBack() {
  clearInterval(trState.timerInterval);
  if (document.getElementById('trReading').style.display !== 'none' || document.getElementById('trQuiz').style.display !== 'none') {
    goToTimedReadPage();
  } else {
    showPage('home');
  }
}
