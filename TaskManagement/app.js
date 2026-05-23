/**
 * app.js — Shared Utilities, Auth, Theme, Toast, Session
 */

// ── THEME ──────────────────────────────────────────────────────
const Theme = (() => {
  const KEY = 'svc_theme';

  function get()  { return localStorage.getItem(KEY) || 'dark'; }
  function apply(t) {
    document.documentElement.setAttribute('data-theme', t);
    localStorage.setItem(KEY, t);
    document.querySelectorAll('.theme-toggle, .theme-toggle-btn').forEach(btn => {
      const icon = btn.querySelector('i') || btn;
      if (icon.tagName === 'I') {
        icon.className = t === 'dark' ? 'bi bi-sun-fill' : 'bi bi-moon-fill';
      }
    });
  }
  function toggle() { apply(get() === 'dark' ? 'light' : 'dark'); }
  function init()   { apply(get()); }

  return { get, apply, toggle, init };
})();

// ── SESSION / AUTH ─────────────────────────────────────────────
const Auth = (() => {
  const KEY = 'svc_session';

  function save(user, remember) {
    const store = remember ? localStorage : sessionStorage;
    store.setItem(KEY, JSON.stringify(user));
  }

  function get() {
    return JSON.parse(localStorage.getItem(KEY) || sessionStorage.getItem(KEY) || 'null');
  }

  function clear() {
    localStorage.removeItem(KEY);
    sessionStorage.removeItem(KEY);
  }

  function require(role) {
    const user = get();
    if (!user) { window.location.href = 'index.html'; return null; }
    if (role && user.role !== role) {
      window.location.href = user.role === 'admin' ? 'admin.html' : 'technician.html';
      return null;
    }
    return user;
  }

  function logout() {
    clear();
    window.location.href = 'index.html';
  }

  return { save, get, clear, require, logout };
})();

// ── TOAST ──────────────────────────────────────────────────────
const Toast = (() => {
  let container;

  function ensureContainer() {
    if (!container) {
      container = document.createElement('div');
      container.className = 'toast-container';
      document.body.appendChild(container);
    }
  }

  const ICONS = { success: 'bi-check-circle-fill', error: 'bi-x-circle-fill', warning: 'bi-exclamation-triangle-fill', info: 'bi-info-circle-fill' };

  function show(message, type = 'info', duration = 3500) {
    ensureContainer();
    const el = document.createElement('div');
    el.className = `toast ${type}`;
    el.innerHTML = `
      <i class="bi ${ICONS[type] || ICONS.info} toast-icon"></i>
      <span class="toast-text">${message}</span>
      <i class="bi bi-x toast-close" onclick="this.parentElement.remove()"></i>
    `;
    container.appendChild(el);
    setTimeout(() => {
      el.classList.add('hiding');
      setTimeout(() => el.remove(), 300);
    }, duration);
  }

  return {
    success: (msg, d) => show(msg, 'success', d),
    error:   (msg, d) => show(msg, 'error', d),
    warning: (msg, d) => show(msg, 'warning', d),
    info:    (msg, d) => show(msg, 'info', d),
  };
})();

// ── CLOCK ──────────────────────────────────────────────────────
function startClock(selector = '.header-clock') {
  const el = document.querySelector(selector);
  if (!el) return;
  function tick() {
    const now = new Date();
    el.textContent = now.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  }
  tick();
  setInterval(tick, 1000);
}

// ── LOADING OVERLAY ────────────────────────────────────────────
const Loader = (() => {
  let el;
  function show(msg = 'Loading…') {
    if (!el) {
      el = document.createElement('div');
      el.className = 'loading-overlay';
      el.innerHTML = `<div class="loading-box"><div class="spinner"></div><p class="loading-text">${msg}</p></div>`;
      document.body.appendChild(el);
    }
    el.style.display = 'flex';
    el.querySelector('.loading-text').textContent = msg;
  }
  function hide() { if (el) el.style.display = 'none'; }
  return { show, hide };
})();

// ── CONFIRM MODAL ──────────────────────────────────────────────
function showConfirm(title, message, onConfirm, type = 'danger') {
  const id = 'confirm-modal-' + Date.now();
  const btnClass = type === 'danger' ? 'btn-danger' : 'btn-primary';
  const html = `
    <div class="modal-overlay" id="${id}" style="display:flex">
      <div class="modal-box" style="max-width:400px">
        <div class="modal-header">
          <span class="modal-title">${title}</span>
          <div class="modal-close" onclick="document.getElementById('${id}').remove()"><i class="bi bi-x"></i></div>
        </div>
        <div class="modal-body">
          <p style="color:var(--text-secondary);font-size:14px;margin:0">${message}</p>
        </div>
        <div class="modal-footer">
          <button class="btn btn-outline-primary btn-sm" onclick="document.getElementById('${id}').remove()">Cancel</button>
          <button class="btn ${btnClass} btn-sm" id="${id}-confirm">Confirm</button>
        </div>
      </div>
    </div>`;
  document.body.insertAdjacentHTML('beforeend', html);
  const overlay = document.getElementById(id);
  setTimeout(() => overlay.classList.add('open'), 10);
  document.getElementById(`${id}-confirm`).onclick = () => { overlay.remove(); onConfirm(); };
}

// ── IMAGE PREVIEW UPLOAD ───────────────────────────────────────
function initUploadArea(areaId, inputId, previewId) {
  const area    = document.getElementById(areaId);
  const input   = document.getElementById(inputId);
  const preview = document.getElementById(previewId);
  if (!area || !input) return;

  area.addEventListener('click', () => input.click());
  area.addEventListener('dragover', e => { e.preventDefault(); area.classList.add('dragging'); });
  area.addEventListener('dragleave', () => area.classList.remove('dragging'));
  area.addEventListener('drop', e => {
    e.preventDefault();
    area.classList.remove('dragging');
    if (e.dataTransfer.files[0]) handleFile(e.dataTransfer.files[0]);
  });
  input.addEventListener('change', () => { if (input.files[0]) handleFile(input.files[0]); });

  function handleFile(file) {
    if (!file.type.startsWith('image/')) { Toast.error('Please select an image file'); return; }
    const reader = new FileReader();
    reader.onload = e => {
      if (preview) {
        preview.innerHTML = `
          <div class="upload-preview">
            <img src="${e.target.result}" alt="Preview">
            <div class="remove-img" onclick="clearUpload('${areaId}','${inputId}','${previewId}')">
              <i class="bi bi-x"></i>
            </div>
          </div>`;
        area.style.display = 'none';
      }
      input.dataset.base64 = e.target.result;
    };
    reader.readAsDataURL(file);
  }
}

window.clearUpload = function(areaId, inputId, previewId) {
  const area  = document.getElementById(areaId);
  const input = document.getElementById(inputId);
  const prev  = document.getElementById(previewId);
  if (area)  area.style.display = '';
  if (input) { input.value = ''; input.dataset.base64 = ''; }
  if (prev)  prev.innerHTML = '';
};

// ── SKELETON LOADER ────────────────────────────────────────────
function showSkeletons(containerId, count = 5, type = 'row') {
  const el = document.getElementById(containerId);
  if (!el) return;
  el.innerHTML = Array.from({ length: count }, () =>
    `<div class="skeleton skeleton-${type}"></div>`
  ).join('');
}

// ── EXPORT CSV ─────────────────────────────────────────────────
function exportCSV(data, filename = 'export.csv') {
  if (!data || !data.length) { Toast.warning('No data to export'); return; }
  const headers = Object.keys(data[0]).join(',');
  const rows    = data.map(r => Object.values(r).map(v => `"${String(v).replace(/"/g,'""')}"`).join(','));
  const blob    = new Blob([headers + '\n' + rows.join('\n')], { type: 'text/csv' });
  const url     = URL.createObjectURL(blob);
  const a       = Object.assign(document.createElement('a'), { href: url, download: filename });
  a.click();
  URL.revokeObjectURL(url);
  Toast.success('CSV exported successfully');
}

// ── PAGINATION ─────────────────────────────────────────────────
class Paginator {
  constructor(data, pageSize = 10) {
    this.data     = data;
    this.pageSize = pageSize;
    this.page     = 1;
    this.total    = Math.ceil(data.length / pageSize);
  }
  setData(data) { this.data = data; this.total = Math.ceil(data.length / this.pageSize); this.page = 1; }
  current()     { const s = (this.page - 1) * this.pageSize; return this.data.slice(s, s + this.pageSize); }
  prev()        { if (this.page > 1) this.page--; }
  next()        { if (this.page < this.total) this.page++; }
  goTo(n)       { this.page = Math.max(1, Math.min(n, this.total || 1)); }

  renderControls(containerId, onPage) {
    const el = document.getElementById(containerId);
    if (!el) return;
    const { page, total } = this;
    let html = `<div class="pagination">`;
    html += `<div class="page-btn" data-p="${page - 1}" ${page === 1 ? 'style="opacity:.4;pointer-events:none"' : ''}><i class="bi bi-chevron-left" style="font-size:11px"></i></div>`;
    for (let i = Math.max(1, page - 2); i <= Math.min(total || 1, page + 2); i++) {
      html += `<div class="page-btn ${i === page ? 'active' : ''}" data-p="${i}">${i}</div>`;
    }
    html += `<div class="page-btn" data-p="${page + 1}" ${page >= total ? 'style="opacity:.4;pointer-events:none"' : ''}><i class="bi bi-chevron-right" style="font-size:11px"></i></div>`;
    html += `<span style="margin-left:8px;font-size:12px;color:var(--text-muted)">${this.data.length} records</span>`;
    html += `</div>`;
    el.innerHTML = html;
    el.querySelectorAll('.page-btn[data-p]').forEach(btn => {
      btn.addEventListener('click', () => { this.goTo(+btn.dataset.p); onPage(); });
    });
  }
}

// ── OFFLINE DETECTION ──────────────────────────────────────────
function initOfflineDetection() {
  const bar = document.querySelector('.offline-bar');
  if (!bar) return;
  function update() { bar.classList.toggle('show', !navigator.onLine); }
  window.addEventListener('online',  update);
  window.addEventListener('offline', update);
  update();
}

// ── SIDEBAR TOGGLE ─────────────────────────────────────────────
function initSidebar() {
  const sidebar  = document.querySelector('.sidebar');
  const overlay  = document.querySelector('.sidebar-overlay');
  const menuBtn  = document.querySelector('.menu-toggle');

  if (!sidebar) return;

  function open()  { sidebar.classList.add('open');  overlay?.classList.add('show'); }
  function close() { sidebar.classList.remove('open'); overlay?.classList.remove('show'); }

  menuBtn?.addEventListener('click', () => sidebar.classList.contains('open') ? close() : open());
  overlay?.addEventListener('click', close);

  // Close on nav item click (mobile)
  sidebar.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('click', () => {
      if (window.innerWidth < 992) close();
    });
  });
}

// ── SECTION NAVIGATION ─────────────────────────────────────────
function initSectionNav(navItems, views, onSwitch) {
  function activate(id) {
    navItems.forEach(el => el.classList.toggle('active', el.dataset.section === id));
    views.forEach(v => v.classList.toggle('active', v.id === id));
    if (onSwitch) onSwitch(id);
  }
  navItems.forEach(el => el.addEventListener('click', () => activate(el.dataset.section)));
  // Activate first
  if (navItems[0]) activate(navItems[0].dataset.section);
}

// ── BADGE HELPERS ──────────────────────────────────────────────
function statusBadge(status) {
  const map = { 'Pending': 'pending', 'In Progress': 'progress', 'Completed': 'completed', 'Cancelled': 'cancelled' };
  return `<span class="badge badge-${map[status] || 'pending'}">${status}</span>`;
}

function priorityBadge(priority) {
  const map = { 'High': 'high', 'Medium': 'medium', 'Low': 'low' };
  return `<span class="badge badge-${map[priority] || 'low'}">${priority}</span>`;
}

// ── DATE HELPERS ───────────────────────────────────────────────
function fmtDate(str) {
  if (!str) return '—';
  const d = new Date(str);
  return d.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
}

function today() {
  return new Date().toISOString().split('T')[0];
}

// ── NOTIFICATION PANEL ─────────────────────────────────────────
function initNotifPanel() {
  const panel  = document.querySelector('.notif-panel');
  const btn    = document.querySelector('.notif-btn');
  if (!panel || !btn) return;

  btn.addEventListener('click', e => {
    e.stopPropagation();
    panel.classList.toggle('open');
  });
  document.addEventListener('click', e => {
    if (!panel.contains(e.target) && e.target !== btn) panel.classList.remove('open');
  });
}

// ── INIT ALL SHARED ────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  Theme.init();
  initOfflineDetection();
  startClock();

  // Theme toggle buttons
  document.querySelectorAll('.theme-toggle, .theme-toggle-btn').forEach(btn => {
    btn.addEventListener('click', Theme.toggle);
  });

  // Logout buttons
  document.querySelectorAll('.logout-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      showConfirm('Logout', 'Are you sure you want to logout?', () => Auth.logout());
    });
  });
});