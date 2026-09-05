// script.js — PHP Interview Master application logic

// ---------- Combine question sets ----------
const allQuestions = [
  ...basicQuestions,
  ...intermediateQuestions,
  ...advancedQuestions,
  ...expertQuestions
];

// ---------- State ----------
const STORAGE_KEYS = {
  read: "phpInterviewReadQuestions",
  theme: "phpInterviewTheme",
  lastQuestion: "phpInterviewLastQuestion"
};

let state = {
  readIds: [],
  currentId: 1,
  searchTerm: "",
  activeCategory: "All",
  theme: "light"
};

const CATEGORY_ORDER = ["Basic", "Intermediate", "Advanced", "Expert"];
const CATEGORY_DOT_CLASS = {
  Basic: "dot-basic",
  Intermediate: "dot-intermediate",
  Advanced: "dot-advanced",
  Expert: "dot-expert"
};
const CATEGORY_BADGE_CLASS = {
  Basic: "badge-basic",
  Intermediate: "badge-intermediate",
  Advanced: "badge-advanced",
  Expert: "badge-expert"
};

// ---------- LocalStorage helpers ----------
function loadReadQuestions() {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.read);
    state.readIds = raw ? JSON.parse(raw) : [];
  } catch (e) {
    state.readIds = [];
  }
}

function saveReadQuestions() {
  localStorage.setItem(STORAGE_KEYS.read, JSON.stringify(state.readIds));
}

function loadTheme() {
  const saved = localStorage.getItem(STORAGE_KEYS.theme);
  state.theme = saved === "dark" ? "dark" : "light";
  applyTheme();
}

function applyTheme() {
  if (state.theme === "dark") {
    document.documentElement.setAttribute("data-theme", "dark");
  } else {
    document.documentElement.removeAttribute("data-theme");
  }
  const icon = document.getElementById("themeIcon");
  if (icon) {
    icon.className = state.theme === "dark" ? "bi bi-sun" : "bi bi-moon-stars";
  }
}

function toggleTheme() {
  state.theme = state.theme === "dark" ? "light" : "dark";
  localStorage.setItem(STORAGE_KEYS.theme, state.theme);
  applyTheme();
}

function saveLastQuestion(id) {
  localStorage.setItem(STORAGE_KEYS.lastQuestion, String(id));
}

function restoreLastQuestion() {
  const raw = localStorage.getItem(STORAGE_KEYS.lastQuestion);
  const id = raw ? parseInt(raw, 10) : 1;
  return allQuestions.some(q => q.id === id) ? id : 1;
}

// ---------- Derived data ----------
function getFilteredQuestions() {
  const term = state.searchTerm.trim().toLowerCase();
  return allQuestions.filter(q => {
    const matchesCategory = state.activeCategory === "All" || q.category === state.activeCategory;
    if (!matchesCategory) return false;
    if (!term) return true;
    return (
      q.question.toLowerCase().includes(term) ||
      q.category.toLowerCase().includes(term) ||
      String(q.id).includes(term)
    );
  });
}

function getQuestionById(id) {
  return allQuestions.find(q => q.id === id);
}

function isRead(id) {
  return state.readIds.includes(id);
}

// ---------- Rendering: Sidebar ----------
function renderSidebar() {
  const list = getFilteredQuestions();
  const containers = [document.getElementById("sidebarList"), document.getElementById("sidebarListMobile")];

  containers.forEach(container => {
    if (!container) return;
    container.innerHTML = "";

    if (list.length === 0) {
      container.innerHTML = `<div class="sidebar-empty">No questions match your search.</div>`;
      return;
    }

    list.forEach(q => {
      const item = document.createElement("button");
      const readCls = isRead(q.id) ? "read" : "";
      const activeCls = q.id === state.currentId ? "active" : "";
      item.type = "button";
      item.className = `sidebar-item ${readCls} ${activeCls}`.trim();
      item.setAttribute("aria-label", `Question ${q.id}: ${q.question}`);
      item.dataset.id = q.id;
      item.innerHTML = `
        <span class="q-check"><i class="bi bi-check-circle-fill"></i></span>
        <span class="q-number">${String(q.id).padStart(2, "0")}</span>
        <span class="q-cat-dot ${CATEGORY_DOT_CLASS[q.category]}"></span>
        <span class="q-title">${escapeHtml(q.question)}</span>
      `;
      item.addEventListener("click", () => {
        loadQuestion(q.id);
        const offcanvasEl = document.getElementById("sidebarOffcanvas");
        if (offcanvasEl) {
          const instance = bootstrap.Offcanvas.getInstance(offcanvasEl);
          if (instance) instance.hide();
        }
      });
      container.appendChild(item);
    });
  });
}

function scrollSidebarToActive() {
  document.querySelectorAll(".sidebar-item.active").forEach(el => {
    el.scrollIntoView({ block: "nearest" });
  });
}

// ---------- Rendering: Category filter chips ----------
function renderCategoryChips() {
  document.querySelectorAll(".cat-chip").forEach(chip => {
    chip.classList.toggle("active", chip.dataset.cat === state.activeCategory);
  });
}

// ---------- Rendering: Progress ----------
function updateProgress() {
  const total = allQuestions.length;
  const readCount = state.readIds.length;
  const pct = Math.round((readCount / total) * 100);

  document.querySelectorAll(".header-progress-count").forEach(el => {
    el.textContent = `${readCount} / ${total}`;
  });
  document.querySelectorAll(".header-progress-bar").forEach(el => {
    el.style.width = `${pct}%`;
    el.setAttribute("aria-valuenow", pct);
  });
  document.querySelectorAll(".header-progress-pct").forEach(el => {
    el.textContent = `${pct}%`;
  });

  updateCategoryProgress();
}

function updateCategoryProgress() {
  const wrap = document.getElementById("categoryProgressList");
  if (!wrap) return;
  wrap.innerHTML = "";

  const colorMap = {
    Basic: "var(--cat-basic)",
    Intermediate: "var(--cat-intermediate)",
    Advanced: "var(--cat-advanced)",
    Expert: "var(--cat-expert)"
  };

  CATEGORY_ORDER.forEach(cat => {
    const catQuestions = allQuestions.filter(q => q.category === cat);
    const readInCat = catQuestions.filter(q => isRead(q.id)).length;
    const pct = Math.round((readInCat / catQuestions.length) * 100);
    const row = document.createElement("div");
    row.className = "progress-summary-row";
    row.innerHTML = `
      <span class="cat-label">${cat}</span>
      <span class="mini-bar"><span class="mini-bar-fill" style="width:${pct}%; background:${colorMap[cat]}"></span></span>
      <span class="cat-count">${readInCat}/${catQuestions.length}</span>
    `;
    wrap.appendChild(row);
  });
}

// ---------- Rendering: Question content ----------
function renderQuestion() {
  const q = getQuestionById(state.currentId);
  if (!q) return;

  const total = allQuestions.length;
  const index = allQuestions.findIndex(item => item.id === q.id) + 1;

  setText("questionIndexLabel", `Question #${q.id} of ${total}`);
  setHtml("categoryBadge", `<span class="category-badge ${CATEGORY_BADGE_CLASS[q.category]}">${q.category}</span>`);
  setText("questionTitle", q.question);
  setText("shortAnswerText", q.shortAnswer);
  setText("explanationText", q.explanation);
  setText("exampleText", q.example);
  setText("mistakesText", q.mistakes);
  setText("interviewDefinitionText", q.interviewDefinition);

  const codeBody = document.getElementById("codeBlockBody");
  if (codeBody) codeBody.textContent = q.code || "// No code example for this question";

  const outputBody = document.getElementById("outputBlockBody");
  if (outputBody) outputBody.textContent = q.output || "(no output)";

  // Reset copy button states
  document.querySelectorAll(".copy-btn").forEach(btn => {
    btn.classList.remove("copied");
    const label = btn.querySelector(".copy-label");
    if (label) label.textContent = "Copy";
  });

  updateMarkReadButton();
  updateNavButtons();
  updateDocumentTitle(q);

  saveLastQuestion(q.id);
  renderSidebar();
  updateProgress();
  scrollSidebarToActive();

  document.getElementById("mainContent")?.scrollTo({ top: 0, behavior: "instant" });
}

function updateDocumentTitle(q) {
  document.title = `Q${q.id}: ${q.question} — PHP Interview Master`;
}

function updateMarkReadButton() {
  const btn = document.getElementById("markReadBtn");
  if (!btn) return;
  const readNow = isRead(state.currentId);
  btn.classList.toggle("is-read", readNow);
  btn.innerHTML = readNow
    ? `<i class="bi bi-check-circle-fill"></i> Read`
    : `<i class="bi bi-check2"></i> Mark as Read`;
}

function updateNavButtons() {
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");
  if (prevBtn) prevBtn.disabled = state.currentId <= 1;
  if (nextBtn) nextBtn.disabled = state.currentId >= allQuestions.length;
}

// ---------- Actions ----------
function loadQuestion(id) {
  if (!getQuestionById(id)) return;
  state.currentId = id;
  renderQuestion();
}

function goToNextQuestion() {
  if (state.currentId < allQuestions.length) loadQuestion(state.currentId + 1);
}

function goToPreviousQuestion() {
  if (state.currentId > 1) loadQuestion(state.currentId - 1);
}

function toggleReadStatus() {
  const id = state.currentId;
  if (isRead(id)) {
    state.readIds = state.readIds.filter(x => x !== id);
  } else {
    state.readIds.push(id);
  }
  saveReadQuestions();
  updateMarkReadButton();
  renderSidebar();
  updateProgress();
}

function searchQuestions(term) {
  state.searchTerm = term;
  renderSidebar();
}

function filterByCategory(cat) {
  state.activeCategory = cat;
  renderCategoryChips();
  renderSidebar();
}

function resetProgress() {
  state.readIds = [];
  saveReadQuestions();
  renderSidebar();
  updateProgress();
  updateMarkReadButton();
}

function copyCode() {
  const q = getQuestionById(state.currentId);
  copyToClipboard(q.code, document.getElementById("copyCodeBtn"));
}

function copyDefinition() {
  const q = getQuestionById(state.currentId);
  copyToClipboard(q.interviewDefinition, document.getElementById("copyDefinitionBtn"));
}

function copyToClipboard(text, btnEl) {
  if (!text) return;
  navigator.clipboard.writeText(text).then(() => {
    if (!btnEl) return;
    btnEl.classList.add("copied");
    const label = btnEl.querySelector(".copy-label");
    const original = label ? label.textContent : null;
    if (label) label.textContent = "Copied!";
    setTimeout(() => {
      btnEl.classList.remove("copied");
      if (label && original !== null) label.textContent = original;
    }, 1500);
  }).catch(() => {
    /* Clipboard write failed silently; no further action needed */
  });
}

// ---------- Utility ----------
function setText(id, value) {
  const el = document.getElementById(id);
  if (el) el.textContent = value ?? "";
}
function setHtml(id, value) {
  const el = document.getElementById(id);
  if (el) el.innerHTML = value ?? "";
}
function escapeHtml(str) {
  const div = document.createElement("div");
  div.textContent = str;
  return div.innerHTML;
}

// ---------- Keyboard navigation ----------
function handleKeydown(e) {
  const tag = (e.target.tagName || "").toLowerCase();
  if (tag === "input" || tag === "textarea") return;

  if (e.key === "ArrowLeft") goToPreviousQuestion();
  else if (e.key === "ArrowRight") goToNextQuestion();
  else if (e.key === "m" || e.key === "M") toggleReadStatus();
}

// ---------- Init ----------
function init() {
  loadTheme();
  loadReadQuestions();
  state.currentId = restoreLastQuestion();

  renderCategoryChips();
  renderQuestion();

  // Search inputs (desktop + mobile)
  document.querySelectorAll(".search-input").forEach(input => {
    input.addEventListener("input", e => searchQuestions(e.target.value));
  });

  // Category chips
  document.querySelectorAll(".cat-chip").forEach(chip => {
    chip.addEventListener("click", () => filterByCategory(chip.dataset.cat));
  });

  // Nav buttons
  document.getElementById("prevBtn")?.addEventListener("click", goToPreviousQuestion);
  document.getElementById("nextBtn")?.addEventListener("click", goToNextQuestion);
  document.getElementById("markReadBtn")?.addEventListener("click", toggleReadStatus);

  // Copy buttons
  document.getElementById("copyCodeBtn")?.addEventListener("click", copyCode);
  document.getElementById("copyDefinitionBtn")?.addEventListener("click", copyDefinition);

  // Theme toggle
  document.getElementById("themeToggleBtn")?.addEventListener("click", toggleTheme);

  // Reset progress
  document.getElementById("confirmResetBtn")?.addEventListener("click", () => {
    resetProgress();
    const modalEl = document.getElementById("resetModal");
    const instance = bootstrap.Modal.getInstance(modalEl);
    if (instance) instance.hide();
  });

  // Keyboard shortcuts
  document.addEventListener("keydown", handleKeydown);
}

document.addEventListener("DOMContentLoaded", init);
