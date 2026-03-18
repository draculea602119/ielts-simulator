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
    btn.disabled = false; btn.textContent = '登录';
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
    btn.disabled = false; btn.textContent = '注册账号';
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
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.getElementById('page-' + id).classList.add('active');
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
    card.onclick = () => startTest(test.id);
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
  showPage('exam');
  switchSection('listening');
  startTimer(30 * 60);
  renderListening(test);
  renderReading(test);
  renderWriting(test);
  renderSpeaking(test);
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

// ---- Submit Exam ----
async function submitExam() {
  clearInterval(state.timerInterval);
  stopAudio();

  const t1El = document.getElementById('writing-t1');
  const t2El = document.getElementById('writing-t2');
  if (t1El) state.writingAnswers.task1 = t1El.value;
  if (t2El) state.writingAnswers.task2 = t2El.value;

  const { lScore, lTotal, rScore, rTotal } = scoreLocalLR();
  const test = state.currentTest;

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
        speakingNotes: state.speakingNotes
      })
    });
    hideLoading();
    showResult(result);
  } catch (err) {
    hideLoading();
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
          <span>${label}</span>
          <span class="ai-band-badge">Band ${fb.band}</span>
        </div>
        <div class="ai-criteria">
          ${criteria.map(c => fb[c.key] ? `
            <div class="ai-criterion">
              <div class="ai-criterion-header">
                <span class="ai-criterion-name">${c.name}</span>
                <span class="ai-criterion-score">${fb[c.key].score}</span>
              </div>
              <div class="ai-criterion-comment">${fb[c.key].comment}</div>
            </div>` : '').join('')}
        </div>
        ${fb.overall_feedback ? `<div class="ai-overall"><strong>总体评价：</strong>${fb.overall_feedback}</div>` : ''}
        ${suggestions.length ? `
          <div class="ai-suggestions">
            <strong>改进建议：</strong>
            <ul>${suggestions.map(s => `<li>${s.trim()}</li>`).join('')}</ul>
          </div>` : ''}
      </div>
    `;
  }

  content.innerHTML = taskCard('Writing Task 1', t1) + taskCard('Writing Task 2', t2);
}

// ---- Review ----
function showReview(test) {
  const area = document.getElementById('reviewArea');
  area.style.display = 'block';
  area.innerHTML = '';

  const lDiv = document.createElement('div');
  lDiv.className = 'review-section';
  lDiv.innerHTML = '<h3>🎧 Listening — 答案解析</h3>';
  test.listening.sections.forEach((sec, si) => {
    sec.questions.forEach((q, qi) => {
      const key = `L${si}_${qi}`;
      const userAns = state.answers[key] || '（未作答）';
      const correct = q.answer;
      const isCorrect = userAns.toLowerCase().trim() === correct.toLowerCase().trim() ||
        (q.type === 'mc' && userAns.toLowerCase().trim() === correct.toLowerCase().charAt(0));
      lDiv.innerHTML += `
        <div style="padding:8px 0;border-bottom:1px solid var(--border-light);font-size:0.85rem">
          <strong>Q${q.num}:</strong> ${q.question.replace(/<[^>]+>/g,'').substring(0,80)}...<br>
          <span style="color:var(--text-muted)">你的答案：</span><span style="color:${isCorrect?'var(--accent-green)':'var(--accent-red)'}">${userAns}</span>
          ${!isCorrect ? `<span style="color:var(--text-muted)"> · 正确答案：</span><span style="color:var(--accent-green)">${correct}</span>` : ' ✓'}
        </div>`;
    });
  });
  area.appendChild(lDiv);

  const rDiv = document.createElement('div');
  rDiv.className = 'review-section';
  rDiv.innerHTML = '<h3>📖 Reading — 答案解析</h3>';
  test.reading.passages.forEach((passage, pi) => {
    passage.questions.forEach((q, qi) => {
      const key = `R${pi}_${qi}`;
      const userAns = state.answers[key] || '（未作答）';
      const correct = q.answer;
      const isCorrect = userAns.toLowerCase().trim() === correct.toLowerCase().trim() ||
        (q.type === 'mc' && userAns.toLowerCase().trim() === correct.toLowerCase().charAt(0));
      rDiv.innerHTML += `
        <div style="padding:8px 0;border-bottom:1px solid var(--border-light);font-size:0.85rem">
          <strong>Q${q.num}:</strong> ${q.question.replace(/<[^>]+>/g,'').substring(0,80)}...<br>
          <span style="color:var(--text-muted)">你的答案：</span><span style="color:${isCorrect?'var(--accent-green)':'var(--accent-red)'}">${userAns}</span>
          ${!isCorrect ? `<span style="color:var(--text-muted)"> · 正确答案：</span><span style="color:var(--accent-green)">${correct}</span>` : ' ✓'}
        </div>`;
    });
  });
  area.appendChild(rDiv);
  area.scrollIntoView({ behavior: 'smooth' });
}

// ---- Init ----
document.addEventListener('DOMContentLoaded', async () => {
  initTheme();
  await checkAuth();

  document.getElementById('themeToggle').onclick = toggleTheme;
  document.getElementById('themeToggle2').onclick = toggleTheme;
  document.getElementById('themeToggle3').onclick = toggleTheme;

  document.getElementById('backBtn').onclick = () => {
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
