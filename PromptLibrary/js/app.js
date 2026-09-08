/**
 * app.js — AI Prompt Library
 *
 * Responsibilities:
 *  - Merge all loaded prompt-data files (promptData01, promptData02, ...)
 *  - Validate prompt records
 *  - Render sidebar list + single-prompt main view
 *  - Handle search / category / type / difficulty filtering (combined)
 *  - Handle read/unread state via localStorage
 *  - Handle previous/next navigation + keyboard shortcuts
 *  - Handle copy-to-clipboard
 *  - Handle progress tracking + reset
 *
 * Nothing here is aware of how many prompt files exist or how many
 * prompts are in each — everything derives from allPrompts.length.
 */

(function () {
  "use strict";

  const STORAGE_KEY = "aiPromptLibraryRead";
  const THEME_KEY = "aiPromptLibraryTheme";

  /** @type {Array<Object>} every valid prompt from every loaded prompt-data file */
  let allPrompts = [];

  /** @type {Array<Object>} allPrompts after search + filters are applied */
  let filteredPrompts = [];

  /** @type {Set<number>} ids of prompts marked as read */
  let readIds = new Set();

  /** id of the prompt currently shown in the main area (not an array index —
   *  ids stay stable while filteredPrompts changes shape) */
  let currentId = null;

  // Cached DOM references, filled in initializeApp()
  const dom = {};

  // ---------------------------------------------------------------
  // Bootstrapping
  // ---------------------------------------------------------------

  function initializeApp() {
    cacheDom();
    allPrompts = loadPrompts();
    readIds = loadReadStatus();

    // The inline head script already set data-theme before first paint
    // (to avoid a flash of the wrong theme) — just sync the toggle button.
    applyTheme(getCurrentTheme());

    populateCategoryFilter();
    filterPrompts({ preserveCurrent: false });

    bindEvents();
  }

  function cacheDom() {
    dom.navStats = document.getElementById("navStats");
    dom.statTotal = document.getElementById("statTotal");
    dom.statRead = document.getElementById("statRead");
    dom.statPercent = document.getElementById("statPercent");
    dom.navProgressBar = document.getElementById("navProgressBar");

    dom.searchInput = document.getElementById("searchInput");
    dom.categoryFilter = document.getElementById("categoryFilter");
    dom.typeFilter = document.getElementById("typeFilter");
    dom.difficultyFilter = document.getElementById("difficultyFilter");
    dom.resultsCount = document.getElementById("resultsCount");
    dom.clearFiltersBtn = document.getElementById("clearFiltersBtn");

    dom.promptList = document.getElementById("promptList");
    dom.resetProgressBtn = document.getElementById("resetProgressBtn");
    dom.confirmResetBtn = document.getElementById("confirmResetBtn");

    dom.promptCard = document.getElementById("promptCard");
    dom.emptyState = document.getElementById("emptyState");
    dom.emptyClearBtn = document.getElementById("emptyClearBtn");

    dom.promptIndexLabel = document.getElementById("promptIndexLabel");
    dom.metaCategory = document.getElementById("metaCategory");
    dom.metaDifficulty = document.getElementById("metaDifficulty");
    dom.metaType = document.getElementById("metaType");
    dom.promptTitle = document.getElementById("promptTitle");
    dom.promptTags = document.getElementById("promptTags");
    dom.promptContent = document.getElementById("promptContent");

    dom.copyBtn = document.getElementById("copyBtn");
    dom.copyBtnLabel = document.getElementById("copyBtnLabel");
    dom.copyToast = document.getElementById("copyToast");

    dom.markReadBtn = document.getElementById("markReadBtn");
    dom.markReadLabel = document.getElementById("markReadLabel");
    dom.prevBtn = document.getElementById("prevBtn");
    dom.nextBtn = document.getElementById("nextBtn");

    dom.sidebarOffcanvasEl = document.getElementById("promptSidebar");

    dom.themeToggle = document.getElementById("themeToggle");
  }

  // ---------------------------------------------------------------
  // Theme (light / dark), persisted separately from reading progress
  // ---------------------------------------------------------------

  function getCurrentTheme() {
    return document.documentElement.getAttribute("data-theme") === "dark" ? "dark" : "light";
  }

  function applyTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);
    if (dom.themeToggle) {
      const isDark = theme === "dark";
      dom.themeToggle.setAttribute("aria-pressed", String(isDark));
      dom.themeToggle.setAttribute(
        "aria-label",
        isDark ? "Switch to light mode" : "Switch to dark mode"
      );
    }
    try {
      localStorage.setItem(THEME_KEY, theme);
    } catch (e) {
      console.warn("Could not save theme preference:", e);
    }
  }

  function toggleTheme() {
    applyTheme(getCurrentTheme() === "dark" ? "light" : "dark");
  }

  // ---------------------------------------------------------------
  // Prompt loading / validation
  // ---------------------------------------------------------------

  /**
   * Collects every promptDataNN global that exists in this page, validates
   * each record, and returns one flat, sorted array. Adding prompts-02.js,
   * prompts-03.js, etc. to index.html is the only change ever required —
   * this loop picks them up automatically without touching this file.
   */
  function loadPrompts() {
    const sources = [];
    for (let n = 1; n <= 20; n++) {
      const key = "promptData" + String(n).padStart(2, "0");
      if (typeof window[key] !== "undefined" && Array.isArray(window[key])) {
        sources.push(window[key]);
      }
    }

    const merged = [];
    const seenIds = new Set();
    const requiredFields = ["id", "category", "title", "difficulty", "promptType", "tags", "prompt"];

    sources.forEach((batch) => {
      batch.forEach((entry) => {
        const missing = requiredFields.filter((f) => !(f in entry));
        if (missing.length > 0) {
          console.warn("Skipping invalid prompt (missing " + missing.join(", ") + "):", entry);
          return;
        }
        if (seenIds.has(entry.id)) {
          console.warn("Skipping duplicate prompt id:", entry.id);
          return;
        }
        seenIds.add(entry.id);
        merged.push(entry);
      });
    });

    merged.sort((a, b) => a.id - b.id);
    return merged;
  }

  // ---------------------------------------------------------------
  // Read-state persistence
  // ---------------------------------------------------------------

  function loadReadStatus() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return new Set();
      const arr = JSON.parse(raw);
      return Array.isArray(arr) ? new Set(arr) : new Set();
    } catch (e) {
      console.warn("Could not read saved progress:", e);
      return new Set();
    }
  }

  function saveReadStatus() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify([...readIds]));
    } catch (e) {
      console.warn("Could not save progress:", e);
    }
  }

  // ---------------------------------------------------------------
  // Filtering / search
  // ---------------------------------------------------------------

  function populateCategoryFilter() {
    const categories = [...new Set(allPrompts.map((p) => p.category))].sort();
    categories.forEach((cat) => {
      const opt = document.createElement("option");
      opt.value = cat;
      opt.textContent = cat;
      dom.categoryFilter.appendChild(opt);
    });
  }

  function filterPrompts(options) {
    const preserveCurrent = !options || options.preserveCurrent !== false;
    const query = dom.searchInput.value.trim().toLowerCase();
    const category = dom.categoryFilter.value;
    const type = dom.typeFilter.value;
    const difficulty = dom.difficultyFilter.value;

    filteredPrompts = allPrompts.filter((p) => {
      if (category && p.category !== category) return false;
      if (type && p.promptType !== type) return false;
      if (difficulty && p.difficulty !== difficulty) return false;

      if (query) {
        const haystack = (
          p.title + " " + p.category + " " + p.tags.join(" ") + " " + p.prompt
        ).toLowerCase();
        if (!haystack.includes(query)) return false;
      }
      return true;
    });

    dom.resultsCount.textContent =
      filteredPrompts.length + (filteredPrompts.length === 1 ? " result" : " results");

    const stillVisible = preserveCurrent && filteredPrompts.some((p) => p.id === currentId);
    if (!stillVisible) {
      currentId = filteredPrompts.length > 0 ? filteredPrompts[0].id : null;
    }

    renderSidebar();
    renderPrompt();
  }

  function clearFilters() {
    dom.searchInput.value = "";
    dom.categoryFilter.value = "";
    dom.typeFilter.value = "";
    dom.difficultyFilter.value = "";
    filterPrompts({ preserveCurrent: true });
  }

  // ---------------------------------------------------------------
  // Rendering — sidebar
  // ---------------------------------------------------------------

  function renderSidebar() {
    dom.promptList.innerHTML = "";

    if (filteredPrompts.length === 0) {
      return;
    }

    const fragment = document.createDocumentFragment();

    filteredPrompts.forEach((p) => {
      const isRead = readIds.has(p.id);
      const isActive = p.id === currentId;

      const item = document.createElement("button");
      item.type = "button";
      item.className =
        "prompt-list__item" + (isRead ? " is-read" : "") + (isActive ? " is-active" : "");
      item.setAttribute("data-id", String(p.id));
      item.setAttribute("aria-current", isActive ? "true" : "false");

      const num = document.createElement("span");
      num.className = "prompt-list__num";
      num.textContent = String(p.id).padStart(2, "0");

      const title = document.createElement("span");
      title.className = "prompt-list__title";
      title.textContent = p.title;

      const check = document.createElement("i");
      check.className = "bi bi-check-circle-fill prompt-list__check";

      item.appendChild(num);
      item.appendChild(title);
      item.appendChild(check);

      item.addEventListener("click", () => {
        selectPrompt(p.id);
        closeMobileSidebar();
      });

      fragment.appendChild(item);
    });

    dom.promptList.appendChild(fragment);
  }

  function scrollActiveIntoView() {
    const activeEl = dom.promptList.querySelector(".prompt-list__item.is-active");
    if (activeEl) {
      activeEl.scrollIntoView({ block: "nearest" });
    }
  }

  // ---------------------------------------------------------------
  // Rendering — main prompt area
  // ---------------------------------------------------------------

  function getCurrentPrompt() {
    if (currentId === null) return null;
    return allPrompts.find((p) => p.id === currentId) || null;
  }

  function getCurrentPosition() {
    const idx = filteredPrompts.findIndex((p) => p.id === currentId);
    return { idx, total: filteredPrompts.length };
  }

  function renderPrompt() {
    const prompt = getCurrentPrompt();

    if (!prompt) {
      dom.promptCard.classList.add("d-none");
      dom.emptyState.classList.remove("d-none");
      return;
    }

    dom.promptCard.classList.remove("d-none");
    dom.emptyState.classList.add("d-none");

    const { idx, total } = getCurrentPosition();
    dom.promptIndexLabel.textContent =
      "Prompt " + (idx >= 0 ? idx + 1 : "?") + " of " + total + " (#" + prompt.id + " of " + allPrompts.length + ")";

    dom.metaCategory.textContent = prompt.category;
    dom.metaDifficulty.textContent = prompt.difficulty;
    dom.metaType.textContent = prompt.promptType;

    dom.promptTitle.textContent = prompt.title;

    dom.promptTags.innerHTML = "";
    prompt.tags.forEach((tag) => {
      const span = document.createElement("span");
      span.className = "mini-tag";
      span.textContent = "#" + tag;
      dom.promptTags.appendChild(span);
    });

    // textContent (not innerHTML) — placeholders like [PROJECT_NAME] must
    // render literally and never be interpreted as markup.
    dom.promptContent.textContent = prompt.prompt;

    const isRead = readIds.has(prompt.id);
    dom.markReadBtn.classList.toggle("is-read", isRead);
    dom.markReadLabel.textContent = isRead ? "Read" : "Mark as read";
    dom.markReadBtn.querySelector("i").className = isRead ? "bi bi-check-circle-fill" : "bi bi-check-lg";

    dom.prevBtn.disabled = idx <= 0;
    dom.nextBtn.disabled = idx === -1 || idx >= total - 1;

    resetCopyButton();
    scrollActiveIntoView();
  }

  function selectPrompt(id) {
    currentId = id;
    renderSidebar();
    renderPrompt();
  }

  // ---------------------------------------------------------------
  // Read / unread
  // ---------------------------------------------------------------

  function toggleReadStatus() {
    const prompt = getCurrentPrompt();
    if (!prompt) return;

    if (readIds.has(prompt.id)) {
      readIds.delete(prompt.id);
    } else {
      readIds.add(prompt.id);
    }
    saveReadStatus();
    updateProgress();
    renderSidebar();
    renderPrompt();
  }

  function updateProgress() {
    const total = allPrompts.length;
    const readCount = allPrompts.filter((p) => readIds.has(p.id)).length;
    const percent = total > 0 ? Math.round((readCount / total) * 100) : 0;

    dom.statTotal.textContent = String(total);
    dom.statRead.textContent = String(readCount);
    dom.statPercent.textContent = percent + "%";
    dom.navProgressBar.style.width = percent + "%";
  }

  function resetProgress() {
    readIds = new Set();
    saveReadStatus();
    updateProgress();
    renderSidebar();
    renderPrompt();
  }

  // ---------------------------------------------------------------
  // Navigation
  // ---------------------------------------------------------------

  function goToPreviousPrompt() {
    const { idx } = getCurrentPosition();
    if (idx > 0) selectPrompt(filteredPrompts[idx - 1].id);
  }

  function goToNextPrompt() {
    const { idx, total } = getCurrentPosition();
    if (idx >= 0 && idx < total - 1) selectPrompt(filteredPrompts[idx + 1].id);
  }

  // ---------------------------------------------------------------
  // Copy to clipboard
  // ---------------------------------------------------------------

  let copyResetTimer = null;

  function copyPrompt() {
    const prompt = getCurrentPrompt();
    if (!prompt) return;

    const text = prompt.prompt;
    const onSuccess = () => showCopiedState();
    const onFailure = () => fallbackCopy(text, onSuccess);

    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(text).then(onSuccess, onFailure);
    } else {
      fallbackCopy(text, onSuccess);
    }
  }

  function fallbackCopy(text, onSuccess) {
    try {
      const textarea = document.createElement("textarea");
      textarea.value = text;
      textarea.setAttribute("readonly", "");
      textarea.style.position = "fixed";
      textarea.style.opacity = "0";
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      onSuccess();
    } catch (e) {
      console.warn("Copy failed:", e);
    }
  }

  function showCopiedState() {
    dom.copyBtn.classList.add("is-copied");
    dom.copyBtnLabel.textContent = "Copied!";
    dom.copyBtn.querySelector("i").className = "bi bi-clipboard-check";

    dom.copyToast.classList.add("is-visible");
    clearTimeout(copyResetTimer);
    copyResetTimer = setTimeout(() => {
      resetCopyButton();
      dom.copyToast.classList.remove("is-visible");
    }, 1800);
  }

  function resetCopyButton() {
    dom.copyBtn.classList.remove("is-copied");
    dom.copyBtnLabel.textContent = "Copy prompt";
    dom.copyBtn.querySelector("i").className = "bi bi-clipboard";
  }

  // ---------------------------------------------------------------
  // Mobile sidebar helper
  // ---------------------------------------------------------------

  function closeMobileSidebar() {
    if (window.innerWidth >= 992) return; // lg breakpoint: sidebar is static, not an offcanvas
    if (!dom.sidebarOffcanvasEl || typeof bootstrap === "undefined") return;
    const instance = bootstrap.Offcanvas.getInstance(dom.sidebarOffcanvasEl);
    if (instance) instance.hide();
  }

  // ---------------------------------------------------------------
  // Event binding
  // ---------------------------------------------------------------

  function bindEvents() {
    dom.themeToggle.addEventListener("click", toggleTheme);

    dom.searchInput.addEventListener("input", debounce(() => filterPrompts(), 150));
    dom.categoryFilter.addEventListener("change", () => filterPrompts());
    dom.typeFilter.addEventListener("change", () => filterPrompts());
    dom.difficultyFilter.addEventListener("change", () => filterPrompts());
    dom.clearFiltersBtn.addEventListener("click", clearFilters);
    dom.emptyClearBtn.addEventListener("click", clearFilters);

    dom.copyBtn.addEventListener("click", copyPrompt);
    dom.markReadBtn.addEventListener("click", toggleReadStatus);
    dom.prevBtn.addEventListener("click", goToPreviousPrompt);
    dom.nextBtn.addEventListener("click", goToNextPrompt);

    dom.resetProgressBtn.addEventListener("click", () => {
      const modalEl = document.getElementById("resetModal");
      if (typeof bootstrap !== "undefined") {
        bootstrap.Modal.getOrCreateInstance(modalEl).show();
      }
    });
    dom.confirmResetBtn.addEventListener("click", () => {
      resetProgress();
      const modalEl = document.getElementById("resetModal");
      if (typeof bootstrap !== "undefined") {
        const instance = bootstrap.Modal.getInstance(modalEl);
        if (instance) instance.hide();
      }
    });

    document.addEventListener("keydown", (e) => {
      const tag = (e.target && e.target.tagName) || "";
      if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT") return;

      if (e.key === "ArrowLeft") {
        e.preventDefault();
        goToPreviousPrompt();
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        goToNextPrompt();
      } else if (e.code === "Space" || e.key === " ") {
        e.preventDefault();
        toggleReadStatus();
      }
    });

    updateProgress();
  }

  function debounce(fn, delay) {
    let timer = null;
    return function (...args) {
      clearTimeout(timer);
      timer = setTimeout(() => fn.apply(this, args), delay);
    };
  }

  // ---------------------------------------------------------------
  // Boot
  // ---------------------------------------------------------------

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initializeApp);
  } else {
    initializeApp();
  }
})();
