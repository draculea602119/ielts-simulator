/**
 * Novel Reading Module — Library + Reader + TTS + Progress
 */

(function () {
  'use strict';

  const NOVELS_INDEX_URL = '/data/novels/index.json';
  const PROGRESS_KEY = 'ielts_novel_progress'; // localStorage key

  let novelIndex = null;   // Array of novel metadata
  let currentNovel = null;  // Full novel data (with chapters)
  let currentChapter = 0;   // Current chapter index
  let ttsActive = false;
  let ttsPaused = false;
  let ttsParaIndex = -1;
  let ttsUtterance = null;

  // ---- Progress persistence ----
  function getProgress() {
    try { return JSON.parse(localStorage.getItem(PROGRESS_KEY) || '{}'); } catch { return {}; }
  }
  function saveProgress(novelId, chapterIndex) {
    const p = getProgress();
    p[novelId] = { chapter: chapterIndex, ts: Date.now() };
    localStorage.setItem(PROGRESS_KEY, JSON.stringify(p));
  }
  function getNovelProgress(novelId) {
    return getProgress()[novelId] || null;
  }

  // ---- Library View ----
  async function loadIndex() {
    if (novelIndex) return novelIndex;
    try {
      const resp = await fetch(NOVELS_INDEX_URL);
      if (!resp.ok) throw new Error('Failed to load index');
      novelIndex = await resp.json();
      return novelIndex;
    } catch (e) {
      console.error('Novel index load error:', e);
      return [];
    }
  }

  async function renderLibrary() {
    const container = document.getElementById('novel-library');
    if (!container) return;
    container.innerHTML = '<div class="nv-loading">Loading...</div>';

    const novels = await loadIndex();
    if (!novels.length) {
      container.innerHTML = '<div class="nv-empty">No novels available</div>';
      return;
    }

    const progress = getProgress();
    const diffColors = { beginner: '#059669', intermediate: '#d97706', advanced: '#dc2626' };

    container.innerHTML = novels.map(n => {
      const prog = progress[n.id];
      const progText = prog ? `Chapter ${prog.chapter + 1}` : 'Not started';
      const progPct = prog && n.totalChapters ? Math.round(((prog.chapter + 1) / n.totalChapters) * 100) : 0;
      const diffColor = diffColors[n.difficulty] || '#7c3aed';

      return `
        <div class="nv-card" onclick="Novel.openNovel('${n.id}')">
          <div class="nv-card-cover" style="background:linear-gradient(135deg, ${diffColor}22, ${diffColor}08)">
            <div class="nv-card-emoji">${n.emoji || '📖'}</div>
          </div>
          <div class="nv-card-body">
            <div class="nv-card-diff" style="color:${diffColor}">${n.difficulty.toUpperCase()} · IELTS ${n.ieltsLevel}</div>
            <div class="nv-card-title">${n.title}</div>
            <div class="nv-card-author">${n.author}</div>
            <div class="nv-card-desc">${n.descriptionZh || n.description}</div>
            <div class="nv-card-meta">
              <span>${n.totalChapters} chapters</span>
              <span class="nv-card-prog">${progText}${progPct > 0 ? ' (' + progPct + '%)' : ''}</span>
            </div>
          </div>
        </div>
      `;
    }).join('');
  }

  // ---- Open Novel ----
  async function openNovel(novelId) {
    const container = document.getElementById('novel-reader');
    const library = document.getElementById('novel-library-wrap');
    const readerWrap = document.getElementById('novel-reader-wrap');

    if (!container) return;

    // Show reader, hide library
    library.style.display = 'none';
    readerWrap.style.display = '';

    container.innerHTML = '<div class="nv-loading">Loading novel...</div>';

    try {
      const resp = await fetch(`/data/novels/${novelId}.json`);
      if (!resp.ok) throw new Error('Novel not found');
      currentNovel = await resp.json();
    } catch (e) {
      container.innerHTML = `<div class="nv-empty">Failed to load novel: ${e.message}</div>`;
      return;
    }

    // Resume from saved progress
    const prog = getNovelProgress(novelId);
    currentChapter = prog ? Math.min(prog.chapter, currentNovel.totalChapters - 1) : 0;

    // Update header
    document.getElementById('novel-title').textContent = currentNovel.title;
    document.getElementById('novel-reader-nav').style.display = '';
    renderChapter();
  }

  function renderChapter() {
    if (!currentNovel) return;
    const container = document.getElementById('novel-reader');
    const ch = currentNovel.chapters[currentChapter];
    if (!ch) return;

    stopTTS();

    // Build chapter HTML
    const paragraphs = ch.paragraphs.map((p, i) =>
      `<p class="nv-para" data-idx="${i}">${escapeHtml(p)}</p>`
    ).join('');

    const moral = ch.moral ? `
      <div class="nv-moral">
        <div class="nv-moral-badge">Moral / 寓意</div>
        <div class="nv-moral-en">${escapeHtml(ch.moral)}</div>
        ${ch.moralZh ? `<div class="nv-moral-zh">${escapeHtml(ch.moralZh)}</div>` : ''}
      </div>
    ` : '';

    container.innerHTML = `
      <div class="nv-ch-header">
        <div class="nv-ch-num">Chapter ${ch.id}</div>
        <h2 class="nv-ch-title">${escapeHtml(ch.title)}</h2>
        <div class="nv-ch-meta">${ch.wordCount || '—'} words</div>
      </div>
      <div class="nv-ch-text" id="nv-text">
        ${paragraphs}
      </div>
      ${moral}
    `;

    // Update nav buttons
    updateChapterNav();

    // Save progress
    saveProgress(currentNovel.id, currentChapter);

    // Process text for word hover
    if (window.WordHover) {
      WordHover.processTextNodes(document.getElementById('nv-text'));
      if (ch.moral) {
        const moralEl = container.querySelector('.nv-moral');
        if (moralEl) WordHover.processTextNodes(moralEl);
      }
    }

    // Scroll to top
    container.scrollTop = 0;
  }

  function updateChapterNav() {
    if (!currentNovel) return;
    const prevBtn = document.getElementById('nv-prev');
    const nextBtn = document.getElementById('nv-next');
    const chInfo = document.getElementById('nv-ch-info');

    if (prevBtn) prevBtn.disabled = currentChapter <= 0;
    if (nextBtn) nextBtn.disabled = currentChapter >= currentNovel.totalChapters - 1;
    if (chInfo) chInfo.textContent = `${currentChapter + 1} / ${currentNovel.totalChapters}`;
  }

  function prevChapter() {
    if (currentChapter > 0) {
      currentChapter--;
      renderChapter();
    }
  }

  function nextChapter() {
    if (currentNovel && currentChapter < currentNovel.totalChapters - 1) {
      currentChapter++;
      renderChapter();
    }
  }

  function backToLibrary() {
    stopTTS();
    if (!currentNovel) {
      // Already in library view → go home
      if (typeof showPage === 'function') showPage('home');
      return;
    }
    currentNovel = null;
    currentChapter = 0;
    document.getElementById('novel-library-wrap').style.display = '';
    document.getElementById('novel-reader-wrap').style.display = 'none';
    document.getElementById('novel-reader-nav').style.display = 'none';
    document.getElementById('novel-title').textContent = 'Novel Reading';
    renderLibrary(); // Refresh progress
  }

  // ---- TTS (paragraph-by-paragraph) ----
  function startTTS() {
    if (!currentNovel || !window.speechSynthesis) return;
    const ch = currentNovel.chapters[currentChapter];
    if (!ch) return;

    if (ttsPaused) {
      // Resume
      ttsPaused = false;
      window.speechSynthesis.resume();
      updateTTSButton(true);
      return;
    }

    stopTTS();
    ttsActive = true;
    ttsParaIndex = 0;
    updateTTSButton(true);
    speakNextParagraph();
  }

  function speakNextParagraph() {
    if (!ttsActive || !currentNovel) return;
    const ch = currentNovel.chapters[currentChapter];
    if (!ch || ttsParaIndex >= ch.paragraphs.length) {
      stopTTS();
      return;
    }

    // Highlight current paragraph
    highlightParagraph(ttsParaIndex);

    const u = new SpeechSynthesisUtterance(ch.paragraphs[ttsParaIndex]);
    if (typeof getEnVoice === 'function') {
      const voice = getEnVoice();
      if (voice) u.voice = voice;
    }
    u.rate = 0.88;
    u.pitch = 1;

    u.onend = () => {
      if (!ttsActive) return;
      ttsParaIndex++;
      if (ttsParaIndex < ch.paragraphs.length) {
        speakNextParagraph();
      } else {
        stopTTS();
      }
    };

    u.onerror = () => {
      stopTTS();
    };

    ttsUtterance = u;
    window.speechSynthesis.speak(u);
  }

  function pauseTTS() {
    if (!ttsActive) return;
    ttsPaused = true;
    window.speechSynthesis.pause();
    updateTTSButton(false);
  }

  function toggleTTS() {
    if (ttsActive && !ttsPaused) {
      pauseTTS();
    } else {
      startTTS();
    }
  }

  function stopTTS() {
    ttsActive = false;
    ttsPaused = false;
    ttsParaIndex = -1;
    ttsUtterance = null;
    window.speechSynthesis.cancel();
    clearParagraphHighlight();
    updateTTSButton(false);
  }

  function highlightParagraph(idx) {
    clearParagraphHighlight();
    const para = document.querySelector(`.nv-para[data-idx="${idx}"]`);
    if (para) {
      para.classList.add('nv-para-active');
      para.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }

  function clearParagraphHighlight() {
    document.querySelectorAll('.nv-para-active').forEach(el => el.classList.remove('nv-para-active'));
  }

  function updateTTSButton(playing) {
    const btn = document.getElementById('nv-tts-btn');
    if (!btn) return;
    if (playing && !ttsPaused) {
      btn.innerHTML = '⏸ Pause';
      btn.classList.add('nv-tts-playing');
    } else {
      btn.innerHTML = '🔊 Read Aloud';
      btn.classList.remove('nv-tts-playing');
    }
  }

  // ---- Utility ----
  function escapeHtml(s) {
    const d = document.createElement('div');
    d.textContent = s;
    return d.innerHTML;
  }

  // ---- Navigation (called from app.js) ----
  function showNovelPage() {
    if (typeof showPage === 'function') showPage('novel');
    renderLibrary();
  }

  // ---- Keyboard shortcuts ----
  document.addEventListener('keydown', (e) => {
    // Only active when novel page is visible
    const novelPage = document.getElementById('page-novel');
    if (!novelPage || !novelPage.classList.contains('active')) return;
    if (!currentNovel) return; // Only in reader mode

    // Don't trigger when typing in an input
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

    if (e.code === 'Space' && !e.ctrlKey && !e.metaKey) {
      e.preventDefault();
      toggleTTS();
    } else if (e.key === 'ArrowLeft' && !e.ctrlKey) {
      prevChapter();
    } else if (e.key === 'ArrowRight' && !e.ctrlKey) {
      nextChapter();
    }
  });

  // ---- Expose globally ----
  window.Novel = {
    showNovelPage,
    renderLibrary,
    openNovel,
    prevChapter,
    nextChapter,
    backToLibrary,
    toggleTTS,
    stopTTS
  };
})();
