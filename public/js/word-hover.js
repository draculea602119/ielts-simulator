/**
 * Word Hover Module — Click any English word to see definition, phonetics, POS, and pronunciation
 */

(function () {
  'use strict';

  // ---- Phrase Database ----
  let phrasesDB = null;
  let phrasesLoading = false;

  async function loadPhrases() {
    if (phrasesDB || phrasesLoading) return;
    phrasesLoading = true;
    try {
      const resp = await fetch('/data/phrases.json');
      if (resp.ok) phrasesDB = await resp.json();
    } catch (e) {
      console.warn('Failed to load phrases:', e.message);
    }
    phrasesLoading = false;
  }

  /**
   * Given a clicked word element, check surrounding context for phrase/idiom matches.
   * Returns the matched phrase entry or null.
   */
  function detectPhrase(wordEl) {
    if (!phrasesDB) return null;

    // Collect surrounding hw-word elements (up to 5 before and 5 after)
    const words = [];
    const els = [];
    let idx = -1;

    // Walk siblings to collect nearby words
    const parent = wordEl.parentElement;
    if (!parent) return null;

    // Gather all hw-word spans in the same parent block
    // Walk up to find a block-level container
    let container = parent;
    while (container && !['P', 'DIV', 'LI', 'TD', 'SPAN', 'SECTION'].includes(container.tagName)) {
      container = container.parentElement;
    }
    if (!container) container = parent;

    const allWords = container.querySelectorAll('.hw-word');
    allWords.forEach((el, i) => {
      words.push(el.dataset.word);
      els.push(el);
      if (el === wordEl) idx = i;
    });

    if (idx === -1) return null;

    // Generate n-grams (2 to 6 words) that include the clicked word
    let bestMatch = null;
    let bestLen = 0;
    let bestStart = 0;
    let bestEnd = 0;

    for (let n = 6; n >= 2; n--) {
      for (let start = Math.max(0, idx - n + 1); start <= Math.min(idx, words.length - n); start++) {
        const end = start + n;
        const phrase = words.slice(start, end).join(' ');
        if (phrasesDB[phrase]) {
          if (n > bestLen) {
            bestMatch = phrasesDB[phrase];
            bestLen = n;
            bestStart = start;
            bestEnd = end;
          }
        }
      }
    }

    if (bestMatch) {
      // Highlight all words in the phrase
      for (let i = bestStart; i < bestEnd; i++) {
        els[i].classList.add('hw-word-phrase');
      }
      return {
        match: bestMatch,
        phraseEls: els.slice(bestStart, bestEnd)
      };
    }
    return null;
  }

  function clearPhraseHighlight() {
    document.querySelectorAll('.hw-word-phrase').forEach(el => el.classList.remove('hw-word-phrase'));
  }

  // ---- LRU Cache ----
  const CACHE_MAX = 500;
  const cache = new Map();

  function cacheGet(key) {
    if (!cache.has(key)) return null;
    const val = cache.get(key);
    // Move to end (most recent)
    cache.delete(key);
    cache.set(key, val);
    return val;
  }

  function cacheSet(key, val) {
    if (cache.size >= CACHE_MAX) {
      // Remove oldest entry
      const oldest = cache.keys().next().value;
      cache.delete(oldest);
    }
    cache.set(key, val);
  }

  // ---- Tooltip Element ----
  let tooltip = null;
  let currentWordEl = null;

  function createTooltip() {
    if (tooltip) return;
    tooltip = document.createElement('div');
    tooltip.id = 'hw-tooltip';
    tooltip.className = 'hw-tooltip';
    tooltip.style.display = 'none';
    tooltip.innerHTML = `
      <div class="hw-tt-phrase-section" style="display:none">
        <div class="hw-tt-phrase-badge">短语 / 俚语</div>
        <div class="hw-tt-phrase-text"></div>
        <div class="hw-tt-phrase-def"></div>
      </div>
      <div class="hw-tt-divider" style="display:none"></div>
      <div class="hw-tt-header">
        <span class="hw-tt-word"></span>
        <button class="hw-tt-audio" title="播放发音">🔊</button>
      </div>
      <div class="hw-tt-phonetic"></div>
      <div class="hw-tt-pos"></div>
      <div class="hw-tt-def"></div>
      <div class="hw-tt-def-en"></div>
      <div class="hw-tt-loading" style="display:none">查词中...</div>
    `;
    document.body.appendChild(tooltip);

    // Audio button handler
    tooltip.querySelector('.hw-tt-audio').addEventListener('click', (e) => {
      e.stopPropagation();
      const word = tooltip.querySelector('.hw-tt-word').textContent;
      if (word) pronounceWord(word);
    });

    // Prevent tooltip clicks from closing it
    tooltip.addEventListener('click', (e) => e.stopPropagation());
  }

  function showTooltip(el, data, phraseData) {
    if (!tooltip) createTooltip();

    // Phrase section
    const phraseSection = tooltip.querySelector('.hw-tt-phrase-section');
    const divider = tooltip.querySelector('.hw-tt-divider');
    if (phraseData) {
      phraseSection.querySelector('.hw-tt-phrase-text').textContent = phraseData.phrase || '';
      phraseSection.querySelector('.hw-tt-phrase-def').textContent = phraseData.definition || '';
      phraseSection.style.display = '';
      divider.style.display = '';
    } else {
      phraseSection.style.display = 'none';
      divider.style.display = 'none';
    }

    // Word section
    tooltip.querySelector('.hw-tt-word').textContent = data.word || '';
    tooltip.querySelector('.hw-tt-phonetic').textContent = data.phonetic || '';
    tooltip.querySelector('.hw-tt-pos').textContent = data.pos || '';
    tooltip.querySelector('.hw-tt-def').textContent = data.definition || '';

    const defEn = tooltip.querySelector('.hw-tt-def-en');
    if (data.definition_en) {
      defEn.textContent = data.definition_en;
      defEn.style.display = '';
    } else {
      defEn.style.display = 'none';
    }

    tooltip.querySelector('.hw-tt-loading').style.display = 'none';
    tooltip.querySelector('.hw-tt-header').style.display = '';
    tooltip.querySelector('.hw-tt-phonetic').style.display = '';
    tooltip.querySelector('.hw-tt-pos').style.display = '';
    tooltip.querySelector('.hw-tt-def').style.display = '';

    positionTooltip(el);
    tooltip.style.display = '';
    tooltip.classList.add('hw-tt-visible');
  }

  function showTooltipLoading(el) {
    if (!tooltip) createTooltip();
    tooltip.querySelector('.hw-tt-loading').style.display = '';
    tooltip.querySelector('.hw-tt-header').style.display = 'none';
    tooltip.querySelector('.hw-tt-phonetic').style.display = 'none';
    tooltip.querySelector('.hw-tt-pos').style.display = 'none';
    tooltip.querySelector('.hw-tt-def').style.display = 'none';
    tooltip.querySelector('.hw-tt-def-en').style.display = 'none';
    positionTooltip(el);
    tooltip.style.display = '';
    tooltip.classList.add('hw-tt-visible');
  }

  function positionTooltip(el) {
    const rect = el.getBoundingClientRect();
    const ttWidth = 300; // max-width from CSS
    const margin = 8;

    // Horizontal: center on word, clamp to viewport
    let left = rect.left + rect.width / 2 - ttWidth / 2;
    left = Math.max(margin, Math.min(left, window.innerWidth - ttWidth - margin));

    // Vertical: prefer above, fall back to below
    let top = rect.top - margin;
    tooltip.style.left = left + 'px';
    tooltip.style.top = top + 'px';
    tooltip.style.transform = 'translateY(-100%)';

    // Check if tooltip goes above viewport
    requestAnimationFrame(() => {
      const ttRect = tooltip.getBoundingClientRect();
      if (ttRect.top < margin) {
        tooltip.style.top = (rect.bottom + margin) + 'px';
        tooltip.style.transform = 'translateY(0)';
      }
    });
  }

  function hideTooltip() {
    if (!tooltip) return;
    tooltip.classList.remove('hw-tt-visible');
    tooltip.style.display = 'none';
    clearPhraseHighlight();
    if (currentWordEl) {
      currentWordEl.classList.remove('hw-word-active');
      currentWordEl = null;
    }
  }

  // ---- Pronunciation (Web Speech API) ----
  function pronounceWord(word) {
    if (!window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(word);
    // Reuse the app's getEnVoice if available
    if (typeof getEnVoice === 'function') {
      const voice = getEnVoice();
      if (voice) u.voice = voice;
    }
    u.rate = 0.9;
    u.pitch = 1;
    window.speechSynthesis.speak(u);
  }

  // ---- API Lookup ----
  let pendingRequest = null;

  async function fetchWordDef(word) {
    // Cancel previous pending request
    if (pendingRequest) {
      pendingRequest.abort();
      pendingRequest = null;
    }

    const controller = new AbortController();
    pendingRequest = controller;

    try {
      const resp = await fetch('/api/dict/word/' + encodeURIComponent(word), {
        signal: controller.signal
      });
      if (!resp.ok) return null;
      return await resp.json();
    } catch (e) {
      if (e.name === 'AbortError') return null;
      console.warn('Word lookup failed:', e.message);
      return null;
    } finally {
      if (pendingRequest === controller) pendingRequest = null;
    }
  }

  // ---- Word Click Handler ----
  async function handleWordClick(e) {
    const el = e.target;
    if (!el.classList.contains('hw-word')) return;

    e.stopPropagation();
    const word = el.dataset.word;
    if (!word) return;

    // If clicking the same word, toggle off
    if (currentWordEl === el) {
      hideTooltip();
      return;
    }

    // Deactivate previous
    if (currentWordEl) currentWordEl.classList.remove('hw-word-active');
    clearPhraseHighlight();
    currentWordEl = el;
    el.classList.add('hw-word-active');

    // Detect phrase/idiom in surrounding context
    const phraseResult = detectPhrase(el);
    const phraseData = phraseResult ? phraseResult.match : null;

    // Check cache for the single word
    const cached = cacheGet(word);
    if (cached) {
      showTooltip(el, cached, phraseData);
      return;
    }

    // Show loading state
    showTooltipLoading(el);

    // Fetch definition
    const data = await fetchWordDef(word);
    if (data && currentWordEl === el) {
      cacheSet(word, data);
      showTooltip(el, data, phraseData);
    } else if (!data && currentWordEl === el) {
      // Show "not found" for word, but phrase may still be shown
      showTooltip(el, {
        word: word,
        phonetic: '',
        pos: '',
        definition: phraseData ? '' : '未找到释义',
        definition_en: ''
      }, phraseData);
    }
  }

  // ---- Text Node Processing ----
  // Skip these elements (don't process text inside them)
  const SKIP_TAGS = new Set(['SCRIPT', 'STYLE', 'TEXTAREA', 'INPUT', 'SELECT', 'BUTTON', 'CODE', 'PRE']);
  const SKIP_CLASSES = new Set(['hw-word', 'hw-tooltip', 'para-label', 'q-num', 'ar-num', 'ar-ans', 'timer-value', 'sp-mode-num']);

  function shouldSkip(node) {
    if (SKIP_TAGS.has(node.tagName)) return true;
    if (node.classList) {
      for (const cls of SKIP_CLASSES) {
        if (node.classList.contains(cls)) return true;
      }
    }
    // Skip already-processed containers
    if (node.dataset && node.dataset.hwProcessed) return true;
    return false;
  }

  /**
   * Process all text nodes inside a container, wrapping English words in clickable <span> elements.
   * @param {HTMLElement} container - The DOM element to process
   */
  function processTextNodes(container) {
    if (!container) return;
    // Don't re-process
    if (container.dataset && container.dataset.hwProcessed) return;

    const walker = document.createTreeWalker(
      container,
      NodeFilter.SHOW_TEXT,
      {
        acceptNode(node) {
          // Skip if parent should be skipped
          let parent = node.parentElement;
          while (parent && parent !== container) {
            if (shouldSkip(parent)) return NodeFilter.FILTER_REJECT;
            parent = parent.parentElement;
          }
          // Skip empty text
          if (!node.textContent.trim()) return NodeFilter.FILTER_REJECT;
          // Skip if already inside a hw-word span
          if (node.parentElement && node.parentElement.classList.contains('hw-word')) return NodeFilter.FILTER_REJECT;
          return NodeFilter.FILTER_ACCEPT;
        }
      }
    );

    const textNodes = [];
    while (walker.nextNode()) textNodes.push(walker.currentNode);

    for (const textNode of textNodes) {
      const text = textNode.textContent;
      // Only process if contains English letters
      if (!/[a-zA-Z]/.test(text)) continue;

      const fragment = document.createDocumentFragment();
      // Split into tokens: words (with possible surrounding punctuation) and whitespace
      const regex = /([a-zA-Z](?:[a-zA-Z'''-]*[a-zA-Z])?)|([^a-zA-Z]+)/g;
      let match;
      let hasWords = false;

      while ((match = regex.exec(text)) !== null) {
        if (match[1]) {
          // English word
          const span = document.createElement('span');
          span.className = 'hw-word';
          span.textContent = match[1];
          span.dataset.word = match[1].toLowerCase().replace(/['']/g, "'");
          fragment.appendChild(span);
          hasWords = true;
        } else if (match[2]) {
          // Non-word text (whitespace, punctuation, Chinese chars, etc.)
          fragment.appendChild(document.createTextNode(match[2]));
        }
      }

      if (hasWords) {
        textNode.parentNode.replaceChild(fragment, textNode);
      }
    }

    container.dataset.hwProcessed = '1';
  }

  /**
   * Reset processing flag so container can be re-processed after content change
   */
  function resetProcessed(container) {
    if (!container) return;
    delete container.dataset.hwProcessed;
    // Also remove hw-word spans and restore text (for full re-render scenarios, not needed if innerHTML is replaced)
  }

  // ---- Global Event Listeners ----
  function init() {
    createTooltip();

    // Delegate click on hw-word spans
    document.addEventListener('click', (e) => {
      if (e.target.classList.contains('hw-word')) {
        // Lazy-load phrases on first click
        if (!phrasesDB && !phrasesLoading) loadPhrases();
        handleWordClick(e);
      } else {
        // Click outside tooltip → close
        hideTooltip();
      }
    });

    // Keyboard: Esc to close tooltip
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') hideTooltip();
    });
  }

  // ---- Expose globally ----
  window.WordHover = {
    init,
    processTextNodes,
    resetProcessed,
    hideTooltip,
    pronounceWord
  };

  // Auto-init when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
