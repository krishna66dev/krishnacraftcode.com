// Laravel Interview Mastery — Application Logic
(function () {
  'use strict';

  const STORAGE_KEY = 'laravelInterviewProgress';
  const THEME_KEY = 'laravelInterviewTheme';
  const TOTAL = questions.length;

  const state = {
    currentId: 1,
    completed: new Set(),
    filter: 'all',
    search: '',
  };

  // ---------- Mount shared sidebar (template -> desktop or mobile host) ----------
  function mountSidebar() {
    const template = document.getElementById('sidebarTemplate');
    const fragment = template.content.cloneNode(true);
    const desktopHost = document.getElementById('sidebarDesktopHost');
    const mobileHost = document.getElementById('sidebarOffcanvasHost');
    const isDesktop = window.matchMedia('(min-width: 992px)').matches;
    const target = isDesktop ? desktopHost : mobileHost;
    target.innerHTML = '';
    target.appendChild(fragment);
  }

  function relocateSidebarIfNeeded() {
    const desktopHost = document.getElementById('sidebarDesktopHost');
    const isDesktop = window.matchMedia('(min-width: 992px)').matches;
    const currentlyInDesktop = desktopHost.contains(document.getElementById('sidebarList'));
    if (isDesktop === currentlyInDesktop) return; // already correctly placed
    // Re-render fresh into the correct host, preserving state
    mountSidebar();
    bindSidebarControls();
    renderSidebar();
  }

  function bindSidebarControls() {
    const searchInput = document.getElementById('searchInput');
    const filterChips = document.getElementById('filterChips');
    if (searchInput) {
      searchInput.value = state.search;
      searchInput.addEventListener('input', (e) => searchQuestions(e.target.value));
    }
    if (filterChips) {
      filterChips.addEventListener('click', (e) => {
        const chip = e.target.closest('.filter-chip');
        if (!chip) return;
        filterQuestions(chip.getAttribute('data-filter'));
      });
      filterChips.querySelectorAll('.filter-chip').forEach((chip) => {
        chip.classList.toggle('active', chip.getAttribute('data-filter') === state.filter);
      });
    }
  }

  // ---------- DOM refs ----------
  const el = {
    progressCount: document.getElementById('progressCount'),
    progressBar: document.getElementById('progressBar'),
    headerProgressBar: document.getElementById('headerProgressBar'),
    headerProgressText: document.getElementById('headerProgressText'),
    questionCounter: document.getElementById('questionCounter'),
    levelBadgeTop: document.getElementById('levelBadgeTop'),
    percentBadge: document.getElementById('percentBadge'),
    content: document.getElementById('questionContent'),
    prevBtn: document.getElementById('prevBtn'),
    nextBtn: document.getElementById('nextBtn'),
    studyBtn: document.getElementById('studyBtn'),
    themeToggle: document.getElementById('themeToggle'),
    themeToggleMobile: document.getElementById('themeToggleMobile'),
  };

  // ---------- Persistence ----------
  function loadProgress() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        state.completed = new Set(parsed.completed || []);
        state.currentId = parsed.currentId || 1;
      }
    } catch (e) {
      console.warn('Could not load saved progress', e);
    }
  }

  function saveProgress() {
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          completed: Array.from(state.completed),
          currentId: state.currentId,
        })
      );
    } catch (e) {
      console.warn('Could not save progress', e);
    }
  }

  function loadTheme() {
    const saved = localStorage.getItem(THEME_KEY);
    const theme = saved || 'dark';
    document.documentElement.setAttribute('data-theme', theme);
    updateThemeIcons(theme);
  }

  function toggleTheme() {
    const current = document.documentElement.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem(THEME_KEY, next);
    updateThemeIcons(next);
  }

  function updateThemeIcons(theme) {
    const icon = theme === 'dark' ? 'bi-sun' : 'bi-moon-stars';
    [el.themeToggle, el.themeToggleMobile].forEach((btn) => {
      if (!btn) return;
      const i = btn.querySelector('i');
      if (i) i.className = 'bi ' + icon;
    });
  }

  // ---------- Helpers ----------
  const levelMeta = {
    basic: { label: 'Basic', emoji: '🟢', cls: 'badge-basic' },
    intermediate: { label: 'Intermediate', emoji: '🟡', cls: 'badge-intermediate' },
    advanced: { label: 'Advanced', emoji: '🔴', cls: 'badge-advanced' },
  };

  function getQuestion(id) {
    return questions.find((q) => q.id === id);
  }

  function escapeHtml(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }

  function highlightCode(code) {
    // Lightweight PHP/Laravel-ish syntax highlighting (no external lib needed)
    let escaped = escapeHtml(code);
    escaped = escaped
      .replace(/(\/\/.*$)/gm, '<span class="tok-comment">$1</span>')
      .replace(/(&#039;.*?&#039;)/g, '<span class="tok-string">$1</span>')
      .replace(
        /\b(public|private|protected|function|class|extends|implements|return|use|static|new|if|else|foreach|as|fn|const|interface|void|array|string|int|bool|float|null|true|false|throw|try|catch)\b/g,
        '<span class="tok-keyword">$1</span>'
      )
      .replace(/(\$[a-zA-Z_][a-zA-Z0-9_]*)/g, '<span class="tok-var">$1</span>')
      .replace(/([A-Z][a-zA-Z0-9_]*)(::)/g, '<span class="tok-class">$1</span>$2');
    return escaped;
  }

  // ---------- Rendering ----------
  function renderSidebar() {
    const sidebarList = document.getElementById('sidebarList');
    if (!sidebarList) return;
    const term = state.search.trim().toLowerCase();
    sidebarList.innerHTML = '';

    const groups = [
      { key: 'basic', title: 'Basic', emoji: '🟢' },
      { key: 'intermediate', title: 'Intermediate', emoji: '🟡' },
      { key: 'advanced', title: 'Advanced', emoji: '🔴' },
    ];

    let anyVisible = false;

    groups.forEach((group) => {
      const groupQuestions = questions.filter((q) => {
        if (q.level !== group.key) return false;
        if (state.filter === 'completed' && !state.completed.has(q.id)) return false;
        if (state.filter === 'pending' && state.completed.has(q.id)) return false;
        if (state.filter !== 'all' && ['basic', 'intermediate', 'advanced'].includes(state.filter) && state.filter !== q.level) return false;
        if (term) {
          const haystack = (q.question + ' ' + q.topic).toLowerCase();
          if (!haystack.includes(term)) return false;
        }
        return true;
      });

      if (groupQuestions.length === 0) return;
      anyVisible = true;

      const groupHeader = document.createElement('div');
      groupHeader.className = 'sidebar-group-title';
      groupHeader.innerHTML = `<span>${group.emoji}</span><span>${group.title}</span>`;
      sidebarList.appendChild(groupHeader);

      groupQuestions.forEach((q) => {
        const item = document.createElement('button');
        item.type = 'button';
        const isDone = state.completed.has(q.id);
        const isActive = q.id === state.currentId;
        item.className =
          'sidebar-item' + (isDone ? ' is-done' : '') + (isActive ? ' is-active' : '');
        item.setAttribute('data-id', q.id);
        item.innerHTML = `
          <span class="sidebar-item-check">${isDone ? '<i class="bi bi-check-circle-fill"></i>' : '<i class="bi bi-circle"></i>'}</span>
          <span class="sidebar-item-text">
            <span class="sidebar-item-num">Q${q.id}</span>
            <span class="sidebar-item-title">${escapeHtml(q.question)}</span>
          </span>
        `;
        item.addEventListener('click', () => {
          goToQuestion(q.id);
          const offcanvasEl = document.getElementById('sidebarOffcanvas');
          const oc = offcanvasEl && bootstrap.Offcanvas.getInstance(offcanvasEl);
          if (oc) oc.hide();
        });
        sidebarList.appendChild(item);
      });
    });

    if (!anyVisible) {
      sidebarList.innerHTML =
        '<div class="sidebar-empty"><i class="bi bi-search"></i><p>No questions match your search/filter.</p></div>';
    }
  }

  function renderQuestion() {
    const q = getQuestion(state.currentId);
    if (!q) return;

    const meta = levelMeta[q.level];
    const isDone = state.completed.has(q.id);

    el.questionCounter.textContent = `Question ${q.id} of ${TOTAL}`;
    el.levelBadgeTop.textContent = `${meta.emoji} ${meta.label}`;
    el.levelBadgeTop.className = 'level-pill ' + meta.cls;
    const pct = Math.round((q.id / TOTAL) * 100);
    el.percentBadge.textContent = pct + '%';

    el.content.classList.remove('fade-in');
    void el.content.offsetWidth; // reflow to restart animation
    el.content.classList.add('fade-in');

    el.content.innerHTML = `
      <div class="q-topic-eyebrow">${escapeHtml(q.topic)}</div>
      <h2 class="q-title">${escapeHtml(q.question)}</h2>

      <section class="q-block">
        <h3 class="q-block-title"><i class="bi bi-lightbulb"></i> Hinglish mein samjho</h3>
        <p class="q-block-text">${escapeHtml(q.explanation)}</p>
      </section>

      <section class="q-block">
        <h3 class="q-block-title"><i class="bi bi-briefcase"></i> Real-World Example</h3>
        <p class="q-block-text">${escapeHtml(q.example)}</p>
      </section>

      <section class="q-block">
        <h3 class="q-block-title"><i class="bi bi-code-slash"></i> Practical Code</h3>
        <pre class="code-block"><code>${highlightCode(q.code)}</code></pre>
        <p class="q-block-text q-code-explain">${escapeHtml(q.codeExplanation)}</p>
      </section>

      <section class="q-block q-block-answer">
        <h3 class="q-block-title"><i class="bi bi-bullseye"></i> Interview Ready Answer</h3>
        <p class="q-block-text">${escapeHtml(q.interviewAnswer)}</p>
      </section>

      <section class="q-block q-block-tip">
        <h3 class="q-block-title"><i class="bi bi-stars"></i> Interview Tip</h3>
        <p class="q-block-text">${escapeHtml(q.tip)}</p>
      </section>
    `;

    // nav buttons
    el.prevBtn.disabled = q.id <= 1;
    el.nextBtn.disabled = q.id >= TOTAL;

    updateStudyButton(isDone);
    updateProgressUI();
    highlightActiveSidebarItem();
  }

  function updateStudyButton(isDone) {
    if (isDone) {
      el.studyBtn.classList.add('is-done');
      el.studyBtn.innerHTML = '<i class="bi bi-check-circle-fill"></i> Studied';
    } else {
      el.studyBtn.classList.remove('is-done');
      el.studyBtn.innerHTML = '<i class="bi bi-bookmark-check"></i> Mark as Studied';
    }
  }

  function highlightActiveSidebarItem() {
    const sidebarList = document.getElementById('sidebarList');
    if (!sidebarList) return;
    const items = sidebarList.querySelectorAll('.sidebar-item');
    items.forEach((item) => {
      const id = parseInt(item.getAttribute('data-id'), 10);
      item.classList.toggle('is-active', id === state.currentId);
    });
    const activeItem = sidebarList.querySelector('.sidebar-item.is-active');
    if (activeItem && typeof activeItem.scrollIntoView === 'function') {
      activeItem.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
    }
  }

  function updateProgressUI() {
    const count = state.completed.size;
    const pct = Math.round((count / TOTAL) * 100);
    el.progressCount.textContent = `${count} / ${TOTAL} Completed`;
    el.progressBar.style.width = pct + '%';
    el.progressBar.setAttribute('aria-valuenow', pct);
    el.headerProgressText.textContent = `${count} / ${TOTAL} Completed`;
    el.headerProgressBar.style.width = pct + '%';
    el.headerProgressBar.setAttribute('aria-valuenow', pct);
  }

  // ---------- Actions ----------
  function goToQuestion(id) {
    if (id < 1 || id > TOTAL) return;
    state.currentId = id;
    saveProgress();
    renderQuestion();
    renderSidebar();
    scrollContentTop();
  }

  function scrollContentTop() {
    const main = document.getElementById('mainContent');
    if (main && typeof main.scrollTo === 'function') {
      main.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (main) {
      main.scrollTop = 0;
    }
  }

  function nextQuestion() {
    goToQuestion(state.currentId + 1);
  }

  function previousQuestion() {
    goToQuestion(state.currentId - 1);
  }

  function markAsStudied() {
    const id = state.currentId;
    const wasCompleted = state.completed.has(id);
    if (wasCompleted) {
      state.completed.delete(id);
    } else {
      state.completed.add(id);
      triggerCompletionPulse();
    }
    saveProgress();
    updateStudyButton(!wasCompleted);
    updateProgressUI();
    renderSidebar();
  }

  function triggerCompletionPulse() {
    el.studyBtn.classList.add('pulse-once');
    setTimeout(() => el.studyBtn.classList.remove('pulse-once'), 500);
  }

  function searchQuestions(term) {
    state.search = term;
    renderSidebar();
  }

  function filterQuestions(filterKey) {
    state.filter = filterKey;
    document.querySelectorAll('.filter-chip').forEach((chip) => {
      chip.classList.toggle('active', chip.getAttribute('data-filter') === filterKey);
    });
    renderSidebar();
  }

  // ---------- Swipe support ----------
  function handleSwipe() {
    const contentArea = document.getElementById('mainContent');
    let touchStartX = 0;
    let touchStartY = 0;
    let touchEndX = 0;
    let touchEndY = 0;

    contentArea.addEventListener(
      'touchstart',
      (e) => {
        touchStartX = e.changedTouches[0].screenX;
        touchStartY = e.changedTouches[0].screenY;
      },
      { passive: true }
    );

    contentArea.addEventListener(
      'touchend',
      (e) => {
        touchEndX = e.changedTouches[0].screenX;
        touchEndY = e.changedTouches[0].screenY;
        const dx = touchEndX - touchStartX;
        const dy = touchEndY - touchStartY;

        // Only treat as horizontal swipe if horizontal movement dominates vertical
        if (Math.abs(dx) > 60 && Math.abs(dx) > Math.abs(dy) * 1.5) {
          if (dx < 0) {
            nextQuestion();
          } else {
            previousQuestion();
          }
        }
      },
      { passive: true }
    );
  }

  // ---------- Event wiring ----------
  function wireEvents() {
    el.prevBtn.addEventListener('click', previousQuestion);
    el.nextBtn.addEventListener('click', nextQuestion);
    el.studyBtn.addEventListener('click', markAsStudied);

    if (el.themeToggle) el.themeToggle.addEventListener('click', toggleTheme);
    if (el.themeToggleMobile) el.themeToggleMobile.addEventListener('click', toggleTheme);

    document.addEventListener('keydown', (e) => {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
      if (e.key === 'ArrowRight') nextQuestion();
      if (e.key === 'ArrowLeft') previousQuestion();
    });
  }

  // ---------- Init ----------
  function init() {
    loadTheme();
    loadProgress();
    if (!getQuestion(state.currentId)) state.currentId = 1;
    mountSidebar();
    bindSidebarControls();
    wireEvents();
    handleSwipe();
    renderSidebar();
    renderQuestion();

    let resizeTimer;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(relocateSidebarIfNeeded, 150);
    });
  }

  document.addEventListener('DOMContentLoaded', init);
})();
