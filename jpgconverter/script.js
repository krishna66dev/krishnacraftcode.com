/**
 * PixelShift — Image Converter
 * Full client-side conversion using Canvas API + JSZip
 * Also supports PHP backend fallback via upload.php / convert.php
 */

'use strict';

// ============================================================
// State
// ============================================================
const state = {
  files: [],          // Array of FileEntry objects
  outputFormat: 'jpg',
  quality: 85,
  resize: { enabled: false, width: null, height: null, aspectLock: true },
  prefix: '',
  suffix: '',
  converting: false,
  useBackend: false,  // Set true if PHP backend is available
};

let dragSrcIndex = null;

// ============================================================
// DOM refs
// ============================================================
const $ = id => document.getElementById(id);
const dropZone      = $('dropZone');
const fileInput     = $('fileInput');
const fileGrid      = $('fileGrid');
const queueSection  = $('queueSection');
const queueCount    = $('queueCount');
const convertBtn    = $('convertBtn');
const downloadZipBtn= $('downloadZipBtn');
const overallProgress = $('overallProgress');
const progressFill  = $('progressFill');
const progressText  = $('progressText');
const progressPct   = $('progressPct');
const errorToast    = $('errorToast');
const errorMsg      = $('errorMsg');
const successBanner = $('successBanner');
const successMsg    = $('successMsg');
const qualitySlider = $('qualitySlider');
const qualityVal    = $('qualityVal');
const resizeToggle  = $('resizeToggle');
const resizeInputs  = $('resizeInputs');
const resizeW       = $('resizeW');
const resizeH       = $('resizeH');
const aspectLock    = $('aspectLock');
const prefixInput   = $('prefixInput');
const suffixInput   = $('suffixInput');
const themeToggle   = $('themeToggle');
const themeIcon     = $('themeIcon');
const clearAll      = $('clearAll');

// ============================================================
// Theme
// ============================================================
const savedTheme = localStorage.getItem('pixelshift-theme') || 'dark';
document.documentElement.setAttribute('data-theme', savedTheme);
updateThemeIcon(savedTheme);

themeToggle.addEventListener('click', () => {
  const current = document.documentElement.getAttribute('data-theme');
  const next = current === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', next);
  localStorage.setItem('pixelshift-theme', next);
  updateThemeIcon(next);
});

function updateThemeIcon(theme) {
  themeIcon.className = theme === 'dark' ? 'bi bi-sun-fill' : 'bi bi-moon-stars-fill';
}

// ============================================================
// Quality Slider
// ============================================================
qualitySlider.addEventListener('input', e => {
  state.quality = parseInt(e.target.value);
  qualityVal.textContent = state.quality + '%';
  updateSliderFill(e.target);
});
updateSliderFill(qualitySlider);

function updateSliderFill(slider) {
  const pct = ((slider.value - slider.min) / (slider.max - slider.min)) * 100;
  slider.style.background = `linear-gradient(90deg, var(--accent) ${pct}%, var(--bg-4) ${pct}%)`;
}

// ============================================================
// Format Tabs
// ============================================================
document.querySelectorAll('.fmt-tab').forEach(tab => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.fmt-tab').forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    state.outputFormat = tab.dataset.fmt;
  });
});

// ============================================================
// Resize Toggle
// ============================================================
resizeToggle.addEventListener('change', e => {
  state.resize.enabled = e.target.checked;
  resizeInputs.style.display = e.target.checked ? 'block' : 'none';
});

// Aspect ratio locking
let lastChangedDim = 'w';
resizeW.addEventListener('input', e => {
  lastChangedDim = 'w';
  if (state.resize.aspectLock && state.files.length > 0) {
    const first = state.files[0];
    if (first && first.naturalW && first.naturalH && e.target.value) {
      resizeH.value = Math.round(parseInt(e.target.value) / first.naturalW * first.naturalH) || '';
    }
  }
  state.resize.width = parseInt(e.target.value) || null;
  state.resize.height = parseInt(resizeH.value) || null;
});
resizeH.addEventListener('input', e => {
  lastChangedDim = 'h';
  if (state.resize.aspectLock && state.files.length > 0) {
    const first = state.files[0];
    if (first && first.naturalW && first.naturalH && e.target.value) {
      resizeW.value = Math.round(parseInt(e.target.value) / first.naturalH * first.naturalW) || '';
    }
  }
  state.resize.height = parseInt(e.target.value) || null;
  state.resize.width = parseInt(resizeW.value) || null;
});
aspectLock.addEventListener('change', e => { state.resize.aspectLock = e.target.checked; });

// Rename
prefixInput.addEventListener('input', e => { state.prefix = e.target.value; });
suffixInput.addEventListener('input', e => { state.suffix = e.target.value; });

// ============================================================
// Drag & Drop — upload zone
// ============================================================
// dropZone.addEventListener('click', e => {
//   if (e.target !== dropZone && !dropZone.querySelector('.drop-zone-inner').contains(e.target)) return;
//   fileInput.click();
// });
// dropZone.querySelector('.drop-zone-inner').addEventListener('click', () => fileInput.click());
dropZone.addEventListener('click', () => { 
  fileInput.click();
});

['dragenter', 'dragover'].forEach(evt =>
  dropZone.addEventListener(evt, e => { e.preventDefault(); dropZone.classList.add('drag-over'); })
);
['dragleave', 'drop'].forEach(evt =>
  dropZone.addEventListener(evt, e => { e.preventDefault(); dropZone.classList.remove('drag-over'); })
);
dropZone.addEventListener('drop', e => {
  const files = Array.from(e.dataTransfer.files);
  processFiles(files);
});
fileInput.addEventListener('change', e => {
  processFiles(Array.from(e.target.files));
  e.target.value = '';
});

// ============================================================
// File Processing
// ============================================================
const ACCEPTED_TYPES = ['image/png','image/webp','image/avif','image/jpeg','image/jpg',
                        'image/bmp','image/gif','image/tiff','image/svg+xml'];
const MAX_SIZE = 10 * 1024 * 1024; // 5MB

function processFiles(files) {
  let added = 0;
  files.forEach(file => {
    if (!ACCEPTED_TYPES.includes(file.type)) {
      showError(`"${file.name}" is not a supported format.`);
      return;
    }
    if (file.size > MAX_SIZE) {
      showError(`"${file.name}" exceeds 5MB limit (${formatBytes(file.size)}).`);
      return;
    }
    // Avoid duplicates
    if (state.files.find(f => f.file.name === file.name && f.file.size === file.size)) return;

    const entry = {
      id: crypto.randomUUID(),
      file,
      name: file.name,
      ext: getExt(file.name),
      size: file.size,
      naturalW: null,
      naturalH: null,
      previewUrl: null,
      convertedBlob: null,
      convertedUrl: null,
      status: 'idle', // idle | loading | done | error
      error: null,
    };
    state.files.push(entry);
    added++;

    // Generate preview
    const reader = new FileReader();
    reader.onload = ev => {
      entry.previewUrl = ev.target.result;
      const img = new Image();
      img.onload = () => {
        entry.naturalW = img.naturalWidth;
        entry.naturalH = img.naturalHeight;
        updateCard(entry.id);
      };
      img.src = ev.target.result;
      updateCard(entry.id);
    };
    reader.readAsDataURL(file);
  });

  if (added > 0) {
    renderQueue();
    hideSuccess();
  }
}

function getExt(name) {
  return (name.split('.').pop() || '').toLowerCase();
}

// ============================================================
// Render Queue
// ============================================================
function renderQueue() {
  if (state.files.length === 0) {
    queueSection.style.display = 'none';
    return;
  }
  queueSection.style.display = 'block';
  queueCount.textContent = state.files.length;
  fileGrid.innerHTML = '';
  state.files.forEach((entry, i) => {
    fileGrid.appendChild(buildCard(entry, i));
  });
  updateActionButtons();
}

function buildCard(entry, i) {
  const card = document.createElement('div');
  card.className = 'file-card' +
    (entry.status === 'done' ? ' converted' : '') +
    (entry.status === 'error' ? ' error' : '');
  card.dataset.id = entry.id;
  card.draggable = true;

  // Status badge
  const statusBadge = document.createElement('div');
  statusBadge.className = 'card-status';
  if (entry.status === 'done') {
    statusBadge.classList.add('done');
    statusBadge.innerHTML = '<i class="bi bi-check-lg"></i>';
  } else if (entry.status === 'error') {
    statusBadge.classList.add('err');
    statusBadge.innerHTML = '<i class="bi bi-x-lg"></i>';
  } else if (entry.status === 'loading') {
    statusBadge.classList.add('loading');
    statusBadge.innerHTML = '<div class="spinner"></div>';
  }
  card.appendChild(statusBadge);

  // Thumbnail
  if (entry.previewUrl) {
    const img = document.createElement('img');
    img.className = 'card-thumb';
    img.src = entry.previewUrl;
    img.alt = entry.name;
    img.loading = 'lazy';
    card.appendChild(img);
  } else {
    const ph = document.createElement('div');
    ph.className = 'card-thumb-placeholder';
    ph.innerHTML = '<i class="bi bi-image"></i>';
    card.appendChild(ph);
  }

  // Body
  const body = document.createElement('div');
  body.className = 'card-body';

  const name = document.createElement('div');
  name.className = 'card-name';
  name.title = entry.name;
  name.textContent = entry.name;

  const meta = document.createElement('div');
  meta.className = 'card-meta';
  const sizeEl = document.createElement('span');
  sizeEl.className = 'card-size';
  sizeEl.textContent = formatBytes(entry.size);
  const fmtEl = document.createElement('span');
  fmtEl.className = `card-format fmt-${entry.ext}`;
  fmtEl.textContent = entry.ext.toUpperCase();

  meta.appendChild(sizeEl);
  meta.appendChild(fmtEl);

  // Progress bar
  const prog = document.createElement('div');
  prog.className = 'card-progress';
  const progFill = document.createElement('div');
  progFill.className = 'card-progress-fill';
  progFill.style.width = entry.status === 'done' ? '100%' : '0%';
  prog.appendChild(progFill);

  // Dimension info
  if (entry.naturalW) {
    const dims = document.createElement('div');
    dims.style.cssText = 'font-size:0.68rem;color:var(--text-muted);font-family:"DM Mono",monospace;margin-bottom:8px;';
    dims.textContent = `${entry.naturalW} × ${entry.naturalH}`;
    body.appendChild(name); body.appendChild(meta); body.appendChild(dims); body.appendChild(prog);
  } else {
    body.appendChild(name); body.appendChild(meta); body.appendChild(prog);
  }

  // Actions
  const actions = document.createElement('div');
  actions.className = 'card-actions';

  // Preview btn
  const prevBtn = document.createElement('button');
  prevBtn.className = 'card-btn';
  prevBtn.innerHTML = '<i class="bi bi-eye"></i>';
  prevBtn.title = 'Preview';
  prevBtn.addEventListener('click', () => openPreview(entry));

  // Download individual
  const dlBtn = document.createElement('button');
  dlBtn.className = 'card-btn' + (entry.status === 'done' ? ' success' : '');
  dlBtn.innerHTML = '<i class="bi bi-download"></i>';
  dlBtn.title = 'Download';
  dlBtn.disabled = entry.status !== 'done';
  dlBtn.addEventListener('click', () => downloadSingle(entry));

  // Remove
  const rmBtn = document.createElement('button');
  rmBtn.className = 'card-btn remove-btn';
  rmBtn.innerHTML = '<i class="bi bi-x"></i>';
  rmBtn.title = 'Remove';
  rmBtn.addEventListener('click', () => removeFile(entry.id));

  actions.appendChild(prevBtn);
  actions.appendChild(dlBtn);
  actions.appendChild(rmBtn);
  body.appendChild(actions);

  if (entry.status === 'error' && entry.error) {
    const errEl = document.createElement('div');
    errEl.style.cssText = 'font-size:0.7rem;color:var(--danger);margin-top:6px;';
    errEl.textContent = entry.error;
    body.appendChild(errEl);
  }

  card.appendChild(body);

  // Drag-to-reorder
  card.addEventListener('dragstart', () => {
    dragSrcIndex = state.files.findIndex(f => f.id === entry.id);
    card.classList.add('dragging');
  });
  card.addEventListener('dragend', () => card.classList.remove('dragging'));
  card.addEventListener('dragover', e => { e.preventDefault(); card.classList.add('drag-target'); });
  card.addEventListener('dragleave', () => card.classList.remove('drag-target'));
  card.addEventListener('drop', e => {
    e.preventDefault();
    card.classList.remove('drag-target');
    const targetIndex = state.files.findIndex(f => f.id === entry.id);
    if (dragSrcIndex !== null && dragSrcIndex !== targetIndex) {
      const moved = state.files.splice(dragSrcIndex, 1)[0];
      state.files.splice(targetIndex, 0, moved);
      renderQueue();
    }
    dragSrcIndex = null;
  });

  return card;
}

function updateCard(id) {
  const entry = state.files.find(f => f.id === id);
  if (!entry) return;
  const existing = fileGrid.querySelector(`[data-id="${id}"]`);
  if (existing) {
    const newCard = buildCard(entry, state.files.findIndex(f => f.id === id));
    existing.replaceWith(newCard);
  }
}

// ============================================================
// Convert All
// ============================================================
convertBtn.addEventListener('click', async () => {
  if (state.converting || state.files.length === 0) return;
  state.converting = true;
  convertBtn.disabled = true;
  overallProgress.style.display = 'block';
  hideSuccess();

  const total = state.files.length;
  let done = 0;
  let errors = 0;

  for (const entry of state.files) {
    if (entry.status === 'done') { done++; continue; } // skip already converted
    updateEntryStatus(entry.id, 'loading');
    setProgress(done, total, `Converting ${entry.name}…`);

    try {
      const blob = await convertImage(entry);
      entry.convertedBlob = blob;
      entry.convertedUrl = URL.createObjectURL(blob);
      updateEntryStatus(entry.id, 'done');
      setCardProgress(entry.id, 100);
    } catch (err) {
      entry.error = err.message || 'Conversion failed';
      updateEntryStatus(entry.id, 'error');
      errors++;
    }
    done++;
    setProgress(done, total, done < total ? `Converting…` : 'Done!');
  }

  state.converting = false;
  convertBtn.disabled = false;

  const successCount = state.files.filter(f => f.status === 'done').length;
  if (successCount > 0) {
    downloadZipBtn.disabled = false;
    showSuccess(`✓ ${successCount} image${successCount > 1 ? 's' : ''} converted successfully!${errors ? ` (${errors} failed)` : ''}`);
  }
  if (errors > 0 && successCount === 0) {
    showError(`All conversions failed. Check file formats.`);
  }

  updateActionButtons();
});

// ============================================================
// Canvas-based Client-side Conversion
// ============================================================
async function convertImage(entry) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      try {
        let w = img.naturalWidth;
        let h = img.naturalHeight;

        if (state.resize.enabled) {
          if (state.resize.width && state.resize.height) {
            w = state.resize.width;
            h = state.resize.height;
          } else if (state.resize.width && !state.resize.height) {
            const ratio = state.resize.width / img.naturalWidth;
            w = state.resize.width;
            h = Math.round(img.naturalHeight * ratio);
          } else if (!state.resize.width && state.resize.height) {
            const ratio = state.resize.height / img.naturalHeight;
            h = state.resize.height;
            w = Math.round(img.naturalWidth * ratio);
          }
        }

        const canvas = document.createElement('canvas');
        canvas.width  = w || img.naturalWidth;
        canvas.height = h || img.naturalHeight;
        const ctx = canvas.getContext('2d');

        // Fill white background for JPG (transparent → white)
        if (state.outputFormat === 'jpg' || state.outputFormat === 'jpeg') {
          ctx.fillStyle = '#ffffff';
          ctx.fillRect(0, 0, canvas.width, canvas.height);
        }
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

        const mimeMap = { jpg: 'image/jpeg', jpeg: 'image/jpeg', png: 'image/png', webp: 'image/webp' };
        const mime = mimeMap[state.outputFormat] || 'image/jpeg';
        const quality = state.quality / 100;

        canvas.toBlob(blob => {
          if (!blob) return reject(new Error('Canvas conversion failed'));
          resolve(blob);
        }, mime, quality);
      } catch (err) {
        reject(err);
      }
    };
    img.onerror = () => reject(new Error('Failed to load image'));
    img.src = entry.previewUrl || URL.createObjectURL(entry.file);
  });
}

// ============================================================
// Download
// ============================================================
function getOutputName(entry) {
  const base = entry.name.replace(/\.[^/.]+$/, '');
  return `${state.prefix}${base}${state.suffix}.${state.outputFormat}`;
}

function downloadSingle(entry) {
  if (!entry.convertedBlob) return;
  const url = entry.convertedUrl || URL.createObjectURL(entry.convertedBlob);
  const a = document.createElement('a');
  a.href = url;
  a.download = getOutputName(entry);
  a.click();
}

downloadZipBtn.addEventListener('click', async () => {
  const converted = state.files.filter(f => f.status === 'done' && f.convertedBlob);
  if (converted.length === 0) return;

  downloadZipBtn.disabled = true;
  downloadZipBtn.innerHTML = '<div class="spinner me-2" style="display:inline-block"></div> Zipping…';

  try {
    const zip = new JSZip();
    converted.forEach(entry => {
      zip.file(getOutputName(entry), entry.convertedBlob);
    });
    const blob = await zip.generateAsync({ type: 'blob', compression: 'DEFLATE', compressionOptions: { level: 6 } });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `pixelshift-converted-${Date.now()}.zip`;
    a.click();
    setTimeout(() => URL.revokeObjectURL(url), 10000);
  } catch (err) {
    showError('Failed to create ZIP: ' + err.message);
  }

  downloadZipBtn.disabled = false;
  downloadZipBtn.innerHTML = '<i class="bi bi-archive-fill me-2"></i>Download ZIP';
});

// ============================================================
// Preview Modal
// ============================================================
function openPreview(entry) {
  const modal = new bootstrap.Modal($('previewModal'));
  $('previewModalLabel').textContent = entry.name;
  $('previewOriginal').src = entry.previewUrl || '';
  $('previewConverted').src = entry.convertedUrl || entry.previewUrl || '';
  $('previewConverted').style.opacity = entry.convertedUrl ? '1' : '0.4';
  modal.show();
}

// ============================================================
// Utilities
// ============================================================
function updateEntryStatus(id, status) {
  const entry = state.files.find(f => f.id === id);
  if (entry) { entry.status = status; updateCard(id); }
}

function setCardProgress(id, pct) {
  const card = fileGrid.querySelector(`[data-id="${id}"]`);
  if (card) {
    const fill = card.querySelector('.card-progress-fill');
    if (fill) fill.style.width = pct + '%';
  }
}

function setProgress(done, total, text) {
  const pct = Math.round((done / total) * 100);
  progressFill.style.width = pct + '%';
  progressPct.textContent = pct + '%';
  progressText.textContent = text;
}

function updateActionButtons() {
  const hasFiles = state.files.length > 0;
  const hasDone  = state.files.some(f => f.status === 'done');
  convertBtn.disabled = !hasFiles || state.converting;
  downloadZipBtn.disabled = !hasDone;
}

function removeFile(id) {
  const entry = state.files.find(f => f.id === id);
  if (entry?.convertedUrl) URL.revokeObjectURL(entry.convertedUrl);
  state.files = state.files.filter(f => f.id !== id);
  renderQueue();
  if (state.files.length === 0) {
    overallProgress.style.display = 'none';
    hideSuccess();
  }
}

clearAll.addEventListener('click', () => {
  state.files.forEach(e => { if (e.convertedUrl) URL.revokeObjectURL(e.convertedUrl); });
  state.files = [];
  renderQueue();
  overallProgress.style.display = 'none';
  hideSuccess();
  downloadZipBtn.disabled = true;
});

function formatBytes(bytes) {
  if (bytes < 1024) return bytes + ' B';
  if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB';
  return (bytes / 1048576).toFixed(2) + ' MB';
}

function showError(msg, duration = 5000) {
  errorMsg.textContent = msg;
  errorToast.style.display = 'flex';
  clearTimeout(showError._timer);
  showError._timer = setTimeout(() => { errorToast.style.display = 'none'; }, duration);
}
function showSuccess(msg) {
  successMsg.textContent = msg;
  successBanner.style.display = 'flex';
}
function hideSuccess() {
  successBanner.style.display = 'none';
}

// ============================================================
// PHP Backend Integration (optional — configure endpoint)
// ============================================================
// To use PHP backend: set state.useBackend = true and ensure
// upload.php / convert.php / download.php are on the same server.

async function convertViaBackend(entry) {
  const form = new FormData();
  form.append('image', entry.file);
  form.append('quality', state.quality);
  form.append('format', state.outputFormat);
  if (state.resize.enabled) {
    form.append('resize_w', state.resize.width || '');
    form.append('resize_h', state.resize.height || '');
    form.append('aspect_lock', state.resize.aspectLock ? '1' : '0');
  }
  form.append('prefix', state.prefix);
  form.append('suffix', state.suffix);

  const res = await fetch('convert.php', { method: 'POST', body: form });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: 'Server error' }));
    throw new Error(err.error || 'Backend conversion failed');
  }
  return await res.blob();
}

// ============================================================
// Init
// ============================================================
updateActionButtons();
console.log('%cPixelShift ready.', 'color:#00e5a0;font-family:monospace;font-size:14px');
