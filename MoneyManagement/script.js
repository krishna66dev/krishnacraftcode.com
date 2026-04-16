/* ============================================================
   UdharBook — Money Management App
   script.js — All logic, data handling, UI rendering
   Uses: localStorage (JSON), Vanilla JS, Bootstrap 5, jsPDF
   ============================================================ */

/* ===========================
   DATA LAYER — localStorage
   =========================== */

const STORAGE_KEYS = {
  persons:      'udharbook_persons',
  transactions: 'udharbook_transactions'
};

// Load data from localStorage (returns [] if nothing stored)
function loadData(key) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : [];
  } catch(e) {
    console.error('Load error:', e);
    return [];
  }
}

// Save data to localStorage
function saveData(key, data) {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch(e) {
    console.error('Save error:', e);
  }
}

// Convenience getters/setters
const getPersons      = ()     => loadData(STORAGE_KEYS.persons);
const getTransactions = ()     => loadData(STORAGE_KEYS.transactions);
const savePersons     = (data) => saveData(STORAGE_KEYS.persons, data);
const saveTransactions= (data) => saveData(STORAGE_KEYS.transactions, data);

// Generate unique ID
function genId() {
  return '_' + Math.random().toString(36).substr(2, 9) + Date.now();
}

/* ===========================
   SECTION NAVIGATION
   =========================== */

function showSection(name) {
  // Hide all sections
  document.querySelectorAll('section[id^="section-"]').forEach(s => {
    s.classList.add('d-none');
  });
  // Show target
  const target = document.getElementById(`section-${name}`);
  if (target) target.classList.remove('d-none');

  // Update active nav pill
  document.querySelectorAll('.nav-pill').forEach(l => l.classList.remove('active'));

  // Re-render relevant section
  switch(name) {
    case 'dashboard':
      renderDashboard();
      break;
    case 'persons':
      renderPersonsList();
      break;
    case 'transactions':
      populatePersonFilter();
      applyFilters();
      break;
    case 'add-transaction':
      populateTxnPersonDropdown();
      setTodayDate();
      break;
  }
}

/* ===========================
   PERSON MANAGEMENT
   =========================== */

function addPerson() {
  const nameEl  = document.getElementById('personName');
  const phoneEl = document.getElementById('personPhone');

  const name  = nameEl.value.trim();
  const phone = phoneEl.value.trim();

  if (!name) {
    showToast('⚠️ Person ka naam zaroor bharein!', 'warn');
    nameEl.focus();
    return;
  }

  // Check duplicate
  const persons = getPersons();
  if (persons.some(p => p.name.toLowerCase() === name.toLowerCase())) {
    showToast('⚠️ Yeh naam pehle se exist karta hai!', 'warn');
    return;
  }

  const newPerson = {
    id:    genId(),
    name:  name,
    phone: phone,
    addedOn: new Date().toISOString()
  };

  persons.push(newPerson);
  savePersons(persons);

  nameEl.value  = '';
  phoneEl.value = '';

  renderPersonsList();
  showToast(`✅ "${name}" ko add kar diya!`);
}

function deletePerson(id) {
  showConfirm('Is person ko delete karein? Unke saare transactions bhi hat jaayenge!', () => {
    let persons = getPersons().filter(p => p.id !== id);
    let txns    = getTransactions().filter(t => t.personId !== id);
    savePersons(persons);
    saveTransactions(txns);
    renderPersonsList();
    showToast('🗑️ Person delete ho gaya');
  });
}

function renderPersonsList() {
  const persons = getPersons();
  const search  = document.getElementById('personSearch')?.value.toLowerCase() || '';
  const txns    = getTransactions();
  const container = document.getElementById('personsList');
  if (!container) return;

  const filtered = persons.filter(p => p.name.toLowerCase().includes(search));

  if (filtered.length === 0) {
    container.innerHTML = `<div class="empty-state text-center py-5 col-span-all">
      <i class="bi bi-person-x fs-1 opacity-25 d-block mb-3"></i>
      <p class="opacity-50">${search ? 'Koi result nahi mila' : 'Koi person nahi hai. Upar se add karein.'}</p>
    </div>`;
    return;
  }

  container.innerHTML = filtered.map(p => {
    const { totalGiven, totalTaken, balance } = calcPersonBalance(p.id, txns);
    const initial = p.name.charAt(0).toUpperCase();
    let balanceHTML = '';
    if (balance > 0)      balanceHTML = `<span class="person-balance-positive">↑ ₹${fmt(balance)} lena hai</span>`;
    else if (balance < 0) balanceHTML = `<span class="person-balance-negative">↓ ₹${fmt(Math.abs(balance))} dena hai</span>`;
    else                  balanceHTML = `<span class="person-balance-zero">✓ Settled</span>`;

    return `<div class="person-card" onclick="viewPersonDetail('${p.id}')">
      <div class="d-flex align-items-center gap-3 mb-3">
        <div class="person-avatar">${initial}</div>
        <div class="flex-fill">
          <div class="person-name">${escHtml(p.name)}</div>
          <div class="person-phone">${p.phone ? '📞 ' + escHtml(p.phone) : 'No phone'}</div>
        </div>
        <button class="person-delete-btn" onclick="event.stopPropagation(); deletePerson('${p.id}')" title="Delete">
          <i class="bi bi-trash3"></i>
        </button>
      </div>
      <div class="d-flex justify-content-between align-items-center">
        ${balanceHTML}
        <small class="text-muted">${countPersonTxns(p.id, txns)} txns</small>
      </div>
    </div>`;
  }).join('');
}

function countPersonTxns(personId, txns) {
  return txns.filter(t => t.personId === personId).length;
}

function viewPersonDetail(personId) {
  const persons = getPersons();
  const person  = persons.find(p => p.id === personId);
  if (!person) return;

  const txns = getTransactions().filter(t => t.personId === personId);
  const { totalGiven, totalTaken, balance } = calcPersonBalance(personId, getTransactions());

  document.getElementById('personDetailTitle').innerHTML = `<i class="bi bi-person-circle me-2"></i>${escHtml(person.name)}`;

  let statusMsg = '';
  if (balance > 0)      statusMsg = `<span class="badge-receive">Aapko ₹${fmt(balance)} milne chahiye</span>`;
  else if (balance < 0) statusMsg = `<span class="badge-pay">Aapko ₹${fmt(Math.abs(balance))} dene hain</span>`;
  else                  statusMsg = `<span class="badge-settled">Hisaab barabar hai</span>`;

  const txnRows = txns.length === 0
    ? `<tr><td colspan="5" class="text-center py-3 empty-row">Koi transaction nahi</td></tr>`
    : txns.sort((a,b) => new Date(b.date) - new Date(a.date)).map(t => `
      <tr>
        <td>${formatDate(t.date)}</td>
        <td><span class="badge-${t.type}">${t.type === 'given' ? 'Diya' : 'Liya'}</span></td>
        <td class="amount-${t.type}">₹${fmt(t.amount)}</td>
        <td>${escHtml(t.note || '—')}</td>
        <td><span class="badge-status badge-${t.status}">${t.status}</span></td>
      </tr>`).join('');

  document.getElementById('personDetailBody').innerHTML = `
    <div class="row g-3 mb-4">
      <div class="col-4">
        <div class="balance-box">
          <div class="balance-label">Total Diya</div>
          <div class="balance-value amount-given">₹${fmt(totalGiven)}</div>
        </div>
      </div>
      <div class="col-4">
        <div class="balance-box">
          <div class="balance-label">Total Liya</div>
          <div class="balance-value amount-taken">₹${fmt(totalTaken)}</div>
        </div>
      </div>
      <div class="col-4">
        <div class="balance-box">
          <div class="balance-label">Balance</div>
          <div class="balance-value" style="color:${balance>=0?'var(--green)':'var(--red)'}">₹${fmt(Math.abs(balance))}</div>
          <div class="mt-1">${statusMsg}</div>
        </div>
      </div>
    </div>
    <h6 class="mb-3" style="font-family:'Syne',sans-serif;font-size:0.85rem;text-transform:uppercase;letter-spacing:0.08em;color:var(--text-secondary)">Transactions</h6>
    <div class="table-responsive">
      <table class="table custom-table">
        <thead><tr><th>Date</th><th>Type</th><th>Amount</th><th>Note</th><th>Status</th></tr></thead>
        <tbody>${txnRows}</tbody>
      </table>
    </div>`;

  new bootstrap.Modal(document.getElementById('personDetailModal')).show();
}

/* ===========================
   TRANSACTION MANAGEMENT
   =========================== */

function setTodayDate() {
  const dateEl = document.getElementById('txnDate');
  if (dateEl && !dateEl.value) {
    dateEl.value = new Date().toISOString().split('T')[0];
  }
}

function populateTxnPersonDropdown() {
  const persons = getPersons();
  const sel = document.getElementById('txnPerson');
  if (!sel) return;
  sel.innerHTML = '<option value="">-- Person chunein --</option>' +
    persons.map(p => `<option value="${p.id}">${escHtml(p.name)}</option>`).join('');
}

function saveTransaction() {
  const personId = document.getElementById('txnPerson').value;
  const type     = document.querySelector('input[name="txnType"]:checked')?.value;
  const amount   = parseFloat(document.getElementById('txnAmount').value);
  const date     = document.getElementById('txnDate').value;
  const note     = document.getElementById('txnNote').value.trim();
  const status   = document.querySelector('input[name="txnStatus"]:checked')?.value || 'pending';

  // Validation
  if (!personId) { showToast('⚠️ Person chunein!', 'warn'); return; }
  if (!type)     { showToast('⚠️ Type chunein!', 'warn'); return; }
  if (!amount || amount <= 0 || isNaN(amount)) { showToast('⚠️ Sahi amount bharein!', 'warn'); return; }
  if (!date)     { showToast('⚠️ Date chunein!', 'warn'); return; }

  const txns = getTransactions();
  const newTxn = {
    id: genId(),
    personId,
    type,
    amount,
    date,
    note,
    status,
    createdAt: new Date().toISOString()
  };

  txns.push(newTxn);
  saveTransactions(txns);
  resetForm();
  showToast('✅ Transaction save ho gaya!');

  // Go to dashboard to show update
  showSection('dashboard');
}

function resetForm() {
  document.getElementById('txnPerson').value = '';
  document.getElementById('txnAmount').value = '';
  document.getElementById('txnDate').value   = '';
  document.getElementById('txnNote').value   = '';
  document.getElementById('typeGiven').checked   = true;
  document.getElementById('statusPending').checked = true;
  setTodayDate();
}

function deleteTransaction(id) {
  showConfirm('Is transaction ko delete karein?', () => {
    const txns = getTransactions().filter(t => t.id !== id);
    saveTransactions(txns);
    applyFilters();
    renderDashboard();
    showToast('🗑️ Transaction delete ho gaya');
  });
}

function markAsPaid(id) {
  const txns = getTransactions();
  const t = txns.find(tx => tx.id === id);
  if (t) {
    t.status = 'paid';
    saveTransactions(txns);
    applyFilters();
    renderDashboard();
    showToast('✅ Transaction paid mark ho gaya!');
  }
}

function openEditModal(id) {
  const txns = getTransactions();
  const t = txns.find(tx => tx.id === id);
  if (!t) return;

  const persons = getPersons();
  const editPersonSel = document.getElementById('editTxnPerson');
  editPersonSel.innerHTML = persons.map(p =>
    `<option value="${p.id}" ${p.id === t.personId ? 'selected' : ''}>${escHtml(p.name)}</option>`
  ).join('');

  document.getElementById('editTxnId').value         = t.id;
  document.getElementById('editTxnAmount').value      = t.amount;
  document.getElementById('editTxnDate').value        = t.date;
  document.getElementById('editTxnNote').value        = t.note || '';
  document.getElementById(t.type === 'given' ? 'editTypeGiven' : 'editTypeTaken').checked = true;
  document.getElementById(t.status === 'paid' ? 'editStatusPaid' : 'editStatusPending').checked = true;

  new bootstrap.Modal(document.getElementById('editModal')).show();
}

function updateTransaction() {
  const id       = document.getElementById('editTxnId').value;
  const personId = document.getElementById('editTxnPerson').value;
  const type     = document.querySelector('input[name="editTxnType"]:checked')?.value;
  const amount   = parseFloat(document.getElementById('editTxnAmount').value);
  const date     = document.getElementById('editTxnDate').value;
  const note     = document.getElementById('editTxnNote').value.trim();
  const status   = document.querySelector('input[name="editTxnStatus"]:checked')?.value;

  if (!personId || !type || !amount || amount <= 0 || !date) {
    showToast('⚠️ Saari zaroori fields bharein!', 'warn');
    return;
  }

  const txns = getTransactions();
  const idx  = txns.findIndex(t => t.id === id);
  if (idx === -1) return;

  txns[idx] = { ...txns[idx], personId, type, amount, date, note, status };
  saveTransactions(txns);

  bootstrap.Modal.getInstance(document.getElementById('editModal')).hide();
  applyFilters();
  renderDashboard();
  showToast('✅ Transaction update ho gaya!');
}

/* ===========================
   FILTERS & SEARCH
   =========================== */

function populatePersonFilter() {
  const persons = getPersons();
  const sel = document.getElementById('filterPerson');
  if (!sel) return;
  sel.innerHTML = '<option value="">All Persons</option>' +
    persons.map(p => `<option value="${p.id}">${escHtml(p.name)}</option>`).join('');
}

function applyFilters() {
  const search     = (document.getElementById('filterSearch')?.value || '').toLowerCase();
  const personId   = document.getElementById('filterPerson')?.value  || '';
  const typeFilter = document.getElementById('filterType')?.value    || '';
  const statusFilter = document.getElementById('filterStatus')?.value || '';

  const txns    = getTransactions();
  const persons = getPersons();

  let filtered = txns.filter(t => {
    const person = persons.find(p => p.id === t.personId);
    const nameMatch   = !search     || (person?.name.toLowerCase().includes(search));
    const personMatch = !personId   || t.personId === personId;
    const typeMatch   = !typeFilter || t.type === typeFilter;
    const statusMatch = !statusFilter || t.status === statusFilter;
    return nameMatch && personMatch && typeMatch && statusMatch;
  });

  // Sort newest first
  filtered.sort((a, b) => new Date(b.date) - new Date(a.date));

  const tbody = document.getElementById('txnTableBody');
  const countEl = document.getElementById('txnCount');
  if (countEl) countEl.textContent = `${filtered.length} entries`;

  if (filtered.length === 0) {
    tbody.innerHTML = `<tr><td colspan="8" class="text-center py-4 empty-row"><i class="bi bi-inbox fs-3 d-block mb-2 opacity-50"></i>Koi transaction nahi mili</td></tr>`;
    return;
  }

  tbody.innerHTML = filtered.map((t, i) => {
    const person = persons.find(p => p.id === t.personId);
    const paidBtn = t.status === 'pending'
      ? `<button class="btn-action paid" onclick="markAsPaid('${t.id}')" title="Mark as Paid"><i class="bi bi-check-lg"></i></button>`
      : '';
    return `<tr>
      <td class="text-muted">${i+1}</td>
      <td>${formatDate(t.date)}</td>
      <td><span class="fw-600">${person ? escHtml(person.name) : 'Unknown'}</span></td>
      <td><span class="badge-${t.type}">${t.type === 'given' ? 'Diya ↑' : 'Liya ↓'}</span></td>
      <td class="amount-${t.type}">₹${fmt(t.amount)}</td>
      <td class="text-muted" style="max-width:150px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap" title="${escHtml(t.note||'')}">${escHtml(t.note || '—')}</td>
      <td><span class="badge-status badge-${t.status}">${t.status}</span></td>
      <td>
        <div class="d-flex gap-1">
          ${paidBtn}
          <button class="btn-action edit" onclick="openEditModal('${t.id}')" title="Edit"><i class="bi bi-pencil"></i></button>
          <button class="btn-action del"  onclick="deleteTransaction('${t.id}')" title="Delete"><i class="bi bi-trash3"></i></button>
        </div>
      </td>
    </tr>`;
  }).join('');
}

/* ===========================
   DASHBOARD
   =========================== */

function calcPersonBalance(personId, txns) {
  const personTxns = txns.filter(t => t.personId === personId);
  const totalGiven = personTxns.filter(t => t.type === 'given').reduce((s, t) => s + Number(t.amount), 0);
  const totalTaken = personTxns.filter(t => t.type === 'taken').reduce((s, t) => s + Number(t.amount), 0);
  return { totalGiven, totalTaken, balance: totalGiven - totalTaken };
}

function renderDashboard() {
  const persons = getPersons();
  const txns    = getTransactions();

  // Calculate totals
  let totalReceivable = 0; // sum of all positive balances
  let totalPayable    = 0; // sum of all negative balances

  persons.forEach(p => {
    const { balance } = calcPersonBalance(p.id, txns);
    if (balance > 0) totalReceivable += balance;
    else if (balance < 0) totalPayable += Math.abs(balance);
  });

  document.getElementById('totalReceivable').textContent  = `₹${fmt(totalReceivable)}`;
  document.getElementById('totalPayable').textContent     = `₹${fmt(totalPayable)}`;
  document.getElementById('totalPersons').textContent     = persons.length;
  document.getElementById('totalTransactions').textContent = txns.length;

  renderDashboardTable();
  renderRecentTransactions();
}

function renderDashboardTable() {
  const persons = getPersons();
  const txns    = getTransactions();
  const search  = document.getElementById('dashSearchInput')?.value.toLowerCase() || '';

  const filtered = persons.filter(p => p.name.toLowerCase().includes(search));
  const tbody = document.getElementById('dashboardTableBody');

  if (filtered.length === 0) {
    tbody.innerHTML = `<tr><td colspan="8" class="text-center py-4 empty-row"><i class="bi bi-inbox fs-3 d-block mb-2 opacity-50"></i>Koi data nahi hai abhi</td></tr>`;
    return;
  }

  tbody.innerHTML = filtered.map((p, i) => {
    const { totalGiven, totalTaken, balance } = calcPersonBalance(p.id, txns);
    let statusBadge = '';
    if (balance > 0)      statusBadge = `<span class="badge-receive">Lena Hai</span>`;
    else if (balance < 0) statusBadge = `<span class="badge-pay">Dena Hai</span>`;
    else                  statusBadge = `<span class="badge-settled">Settled</span>`;

    const balanceColor = balance > 0 ? 'var(--green)' : balance < 0 ? 'var(--red)' : 'var(--text-muted)';

    return `<tr>
      <td class="text-muted">${i+1}</td>
      <td>
        <div class="d-flex align-items-center gap-2">
          <div class="person-avatar" style="width:32px;height:32px;font-size:0.75rem">${p.name.charAt(0).toUpperCase()}</div>
          <span class="fw-600">${escHtml(p.name)}</span>
        </div>
      </td>
      <td class="text-muted">${p.phone || '—'}</td>
      <td class="amount-given">₹${fmt(totalGiven)}</td>
      <td class="amount-taken">₹${fmt(totalTaken)}</td>
      <td style="color:${balanceColor};font-weight:700">₹${fmt(Math.abs(balance))}</td>
      <td>${statusBadge}</td>
      <td><button class="btn-action view" onclick="viewPersonDetail('${p.id}')" title="View Details"><i class="bi bi-eye"></i></button></td>
    </tr>`;
  }).join('');
}

function renderRecentTransactions() {
  const txns    = getTransactions();
  const persons = getPersons();
  const tbody   = document.getElementById('recentTxBody');

  const recent = [...txns].sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 8);

  if (recent.length === 0) {
    tbody.innerHTML = `<tr><td colspan="6" class="text-center py-4 empty-row"><i class="bi bi-inbox fs-3 d-block mb-2 opacity-50"></i>Koi recent transaction nahi</td></tr>`;
    return;
  }

  tbody.innerHTML = recent.map(t => {
    const person = persons.find(p => p.id === t.personId);
    return `<tr>
      <td>${formatDate(t.date)}</td>
      <td>${person ? escHtml(person.name) : 'Unknown'}</td>
      <td><span class="badge-${t.type}">${t.type === 'given' ? 'Diya' : 'Liya'}</span></td>
      <td class="amount-${t.type}">₹${fmt(t.amount)}</td>
      <td class="text-muted">${escHtml(t.note || '—')}</td>
      <td><span class="badge-status badge-${t.status}">${t.status}</span></td>
    </tr>`;
  }).join('');
}

/* ===========================
   CLEAR ALL DATA
   =========================== */

function confirmClearAll() {
  showConfirm('Saara data permanently delete ho jaayega! Kya aap sure hain?', () => {
    localStorage.removeItem(STORAGE_KEYS.persons);
    localStorage.removeItem(STORAGE_KEYS.transactions);
    showSection('dashboard');
    showToast('🗑️ Saara data clear ho gaya');
  });
}

/* ===========================
   PDF EXPORT
   =========================== */

function exportToPDF() {
  const { jsPDF } = window.jspdf;
  if (!jsPDF) { showToast('⚠️ PDF library load nahi hui', 'warn'); return; }

  const doc     = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
  const persons = getPersons();
  const txns    = getTransactions();

  if (persons.length === 0 && txns.length === 0) {
    showToast('⚠️ Export karne ke liye koi data nahi!', 'warn');
    return;
  }

  const pageW = doc.internal.pageSize.getWidth();
  const margin = 14;
  let y = 20;

  // ---- Header ----
  doc.setFillColor(20, 23, 32);
  doc.rect(0, 0, pageW, 35, 'F');

  doc.setTextColor(245, 158, 11);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(20);
  doc.text('UdharBook', margin, 16);

  doc.setTextColor(180, 185, 200);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.text('Money Borrow & Lend Manager', margin, 23);
  doc.text(`Report generated: ${new Date().toLocaleString('en-IN')}`, margin, 29);

  y = 45;

  // ---- Summary Section ----
  doc.setTextColor(60, 60, 80);
  doc.setFillColor(245, 247, 252);
  doc.roundedRect(margin, y, pageW - margin*2, 30, 3, 3, 'F');

  let totalReceivable = 0, totalPayable = 0;
  persons.forEach(p => {
    const { balance } = calcPersonBalance(p.id, txns);
    if (balance > 0) totalReceivable += balance;
    else if (balance < 0) totalPayable += Math.abs(balance);
  });

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(100, 100, 120);
  doc.text('TOTAL TO RECEIVE', margin + 5, y + 9);
  doc.text('TOTAL TO PAY', margin + 55, y + 9);
  doc.text('TOTAL PERSONS', margin + 110, y + 9);
  doc.text('TRANSACTIONS', margin + 155, y + 9);

  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(16, 185, 129);
  doc.text(`Rs ${fmt(totalReceivable)}`, margin + 5, y + 22);
  doc.setTextColor(239, 68, 68);
  doc.text(`Rs ${fmt(totalPayable)}`, margin + 55, y + 22);
  doc.setTextColor(245, 158, 11);
  doc.text(`${persons.length}`, margin + 110, y + 22);
  doc.setTextColor(139, 92, 246);
  doc.text(`${txns.length}`, margin + 155, y + 22);

  y += 40;

  // ---- Person Balance Table ----
  if (persons.length > 0) {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    doc.setTextColor(30, 30, 50);
    doc.text('Person-wise Balance Summary', margin, y);
    y += 6;

    const personRows = persons.map((p, i) => {
      const { totalGiven, totalTaken, balance } = calcPersonBalance(p.id, txns);
      const status = balance > 0 ? 'Lena Hai' : balance < 0 ? 'Dena Hai' : 'Settled';
      return [i + 1, p.name, p.phone || '—', `Rs ${fmt(totalGiven)}`, `Rs ${fmt(totalTaken)}`, `Rs ${fmt(Math.abs(balance))}`, status];
    });

    doc.autoTable({
      startY: y,
      head: [['#', 'Name', 'Phone', 'Given', 'Taken', 'Balance', 'Status']],
      body: personRows,
      margin: { left: margin, right: margin },
      headStyles: { fillColor: [20, 23, 32], textColor: [245, 158, 11], fontStyle: 'bold', fontSize: 8 },
      bodyStyles: { fontSize: 8, textColor: [40, 40, 60] },
      alternateRowStyles: { fillColor: [248, 249, 252] },
      columnStyles: {
        0: { cellWidth: 8 },
        3: { textColor: [16, 185, 129] },
        4: { textColor: [239, 68, 68] },
        6: { fontStyle: 'bold' }
      }
    });

    y = doc.lastAutoTable.finalY + 12;
  }

  // ---- Transactions Table ----
  if (txns.length > 0) {
    // Check if we need a new page
    if (y > 220) { doc.addPage(); y = 20; }

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    doc.setTextColor(30, 30, 50);
    doc.text('All Transactions', margin, y);
    y += 6;

    const sorted = [...txns].sort((a, b) => new Date(b.date) - new Date(a.date));
    const txnRows = sorted.map((t, i) => {
      const person = persons.find(p => p.id === t.personId);
      return [
        i + 1,
        formatDate(t.date),
        person ? person.name : 'Unknown',
        t.type === 'given' ? 'Diya (Given)' : 'Liya (Taken)',
        `Rs ${fmt(t.amount)}`,
        t.note || '—',
        t.status.toUpperCase()
      ];
    });

    doc.autoTable({
      startY: y,
      head: [['#', 'Date', 'Person', 'Type', 'Amount', 'Note', 'Status']],
      body: txnRows,
      margin: { left: margin, right: margin },
      headStyles: { fillColor: [20, 23, 32], textColor: [245, 158, 11], fontStyle: 'bold', fontSize: 8 },
      bodyStyles: { fontSize: 7.5, textColor: [40, 40, 60] },
      alternateRowStyles: { fillColor: [248, 249, 252] },
      columnStyles: {
        0: { cellWidth: 8 },
        3: { fontStyle: 'bold' },
        4: { fontStyle: 'bold' },
        6: { fontStyle: 'bold' }
      },
      didDrawCell: (data) => {
        if (data.column.index === 3 && data.section === 'body') {
          const val = data.cell.raw;
          data.cell.styles.textColor = val.includes('Diya') ? [16, 185, 129] : [239, 68, 68];
        }
        if (data.column.index === 6 && data.section === 'body') {
          const val = data.cell.raw;
          data.cell.styles.textColor = val === 'PAID' ? [16, 185, 129] : [245, 158, 11];
        }
      }
    });
  }

  // ---- Footer on each page ----
  const pageCount = doc.internal.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFontSize(7);
    doc.setTextColor(160, 165, 180);
    doc.text(`UdharBook — Page ${i} of ${pageCount}`, margin, doc.internal.pageSize.getHeight() - 8);
    doc.text('Generated by UdharBook App', pageW - margin, doc.internal.pageSize.getHeight() - 8, { align: 'right' });
  }

  doc.save(`UdharBook_Report_${new Date().toISOString().split('T')[0]}.pdf`);
  showToast('📄 PDF export ho gaya!');
}

/* ===========================
   UTILITY FUNCTIONS
   =========================== */

// Format number to Indian comma style
function fmt(num) {
  const n = parseFloat(num) || 0;
  return n.toLocaleString('en-IN', { maximumFractionDigits: 2 });
}

// Format date nicely
function formatDate(dateStr) {
  if (!dateStr) return '—';
  try {
    const d = new Date(dateStr + 'T00:00:00');
    return d.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
  } catch { return dateStr; }
}

// Escape HTML to prevent XSS
function escHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

// Show toast notification
function showToast(msg, type = 'success') {
  const toastEl = document.getElementById('appToast');
  const toastMsg = document.getElementById('toastMsg');
  toastMsg.textContent = msg;

  toastEl.style.borderLeft = `3px solid ${
    type === 'warn' ? 'var(--accent)' : type === 'error' ? 'var(--red)' : 'var(--green)'
  }`;

  const toast = new bootstrap.Toast(toastEl, { delay: 3000 });
  toast.show();
}

// Show confirmation modal
function showConfirm(message, onYes) {
  document.getElementById('confirmText').textContent = message;
  const modal = new bootstrap.Modal(document.getElementById('confirmModal'));
  modal.show();
  const yesBtn = document.getElementById('confirmYesBtn');
  // Remove previous listener
  const newBtn = yesBtn.cloneNode(true);
  yesBtn.parentNode.replaceChild(newBtn, yesBtn);
  newBtn.addEventListener('click', () => {
    modal.hide();
    onYes();
  });
}

/* ===========================
   APP INITIALIZATION
   =========================== */

document.addEventListener('DOMContentLoaded', () => {
  // Default to dashboard
  showSection('dashboard');

  // Set today's date in add-transaction form
  const dateEl = document.getElementById('txnDate');
  if (dateEl) dateEl.value = new Date().toISOString().split('T')[0];
});
