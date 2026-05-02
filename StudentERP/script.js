/**
 * ============================================================
 * Student Management ERP — Shared JavaScript
 * All logic: CRUD, LocalStorage, UI helpers, validation
 * ============================================================
 */

/* ═══════════════════════════════════════════════════════════
   STORAGE HELPERS
   ═══════════════════════════════════════════════════════════ */

/** Read a JSON key from localStorage, fallback to [] or {} */
function lsGet(key, fallback = []) {
  try {
    const val = localStorage.getItem(key);
    return val ? JSON.parse(val) : fallback;
  } catch { return fallback; }
}

/** Write a value as JSON to localStorage */
function lsSet(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

/* ═══════════════════════════════════════════════════════════
   ROLL NUMBER GENERATOR
   Format: STU2026001, STU2026002, ...
   ═══════════════════════════════════════════════════════════ */

function generateRollNo() {
  const year = new Date().getFullYear();
  let counter = lsGet('rollCounter', { year, count: 0 });

  // Reset counter if year changed
  if (counter.year !== year) {
    counter = { year, count: 0 };
  }

  counter.count += 1;
  lsSet('rollCounter', counter);

  const pad = String(counter.count).padStart(3, '0');
  return `STU${year}${pad}`;
}

/* ═══════════════════════════════════════════════════════════
   TOAST NOTIFICATION SYSTEM
   ═══════════════════════════════════════════════════════════ */

function showToast(message, type = 'info') {
  const icons = { success: '✅', error: '❌', info: 'ℹ️', warning: '⚠️' };

  let container = document.getElementById('toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toast-container';
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = `toast-custom ${type}`;
  toast.innerHTML = `<span>${icons[type] || 'ℹ️'}</span><span>${message}</span>`;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.animation = 'fadeOut 0.3s ease forwards';
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

/* ═══════════════════════════════════════════════════════════
   CONFIRMATION DIALOG
   ═══════════════════════════════════════════════════════════ */

function confirmAction(message, onConfirm) {
  const modal = document.createElement('div');
  modal.style.cssText = `
    position:fixed;inset:0;background:rgba(0,0,0,0.7);
    z-index:9999;display:flex;align-items:center;justify-content:center;padding:20px;
  `;
  modal.innerHTML = `
    <div style="background:#161b22;border:1px solid #21262d;border-radius:12px;
                padding:28px;max-width:380px;width:100%;text-align:center;">
      <div style="font-size:36px;margin-bottom:12px;">⚠️</div>
      <h5 style="color:#e6edf3;font-size:15px;margin-bottom:8px;">Confirm Action</h5>
      <p style="color:#8b949e;font-size:13px;margin-bottom:22px;">${message}</p>
      <div style="display:flex;gap:10px;justify-content:center;">
        <button id="conf-cancel" style="padding:8px 20px;border-radius:8px;border:1px solid #21262d;
          background:transparent;color:#8b949e;cursor:pointer;font-size:13px;font-family:inherit;">
          Cancel
        </button>
        <button id="conf-ok" style="padding:8px 20px;border-radius:8px;border:none;
          background:#f78166;color:white;cursor:pointer;font-size:13px;font-weight:600;font-family:inherit;">
          Delete
        </button>
      </div>
    </div>
  `;
  document.body.appendChild(modal);

  modal.querySelector('#conf-cancel').onclick = () => modal.remove();
  modal.querySelector('#conf-ok').onclick = () => { modal.remove(); onConfirm(); };
  modal.onclick = (e) => { if (e.target === modal) modal.remove(); };
}

/* ═══════════════════════════════════════════════════════════
   SIDEBAR MOBILE TOGGLE
   ═══════════════════════════════════════════════════════════ */

function initSidebar() {
  const toggle = document.getElementById('menu-toggle');
  const sidebar = document.getElementById('sidebar');
  const overlay = document.getElementById('sidebar-overlay');

  if (!toggle || !sidebar) return;

  toggle.onclick = () => {
    sidebar.classList.toggle('open');
    overlay.classList.toggle('show');
  };

  if (overlay) {
    overlay.onclick = () => {
      sidebar.classList.remove('open');
      overlay.classList.remove('show');
    };
  }
}

/* ═══════════════════════════════════════════════════════════
   FORM VALIDATION HELPER
   ═══════════════════════════════════════════════════════════ */

function validateForm(fields) {
  let valid = true;
  fields.forEach(({ el, rule, msg }) => {
    const input = typeof el === 'string' ? document.getElementById(el) : el;
    if (!input) return;
    const val = input.value.trim();
    const ok = rule(val);
    input.classList.toggle('is-invalid', !ok);
    valid = valid && ok;
    // Remove error on input
    input.oninput = () => input.classList.remove('is-invalid');
  });
  return valid;
}

/* ═══════════════════════════════════════════════════════════
   ══════════════════════
   STUDENTS MODULE
   ══════════════════════
   ═══════════════════════════════════════════════════════════ */

/** Get all students */
function getStudents() { return lsGet('students', []); }

/** Save all students */
function saveStudents(arr) { lsSet('students', arr); }

/** Add a student */
function addStudent(data) {
  const students = getStudents();
  const student = {
    id: Date.now(),
    rollNo: generateRollNo(),
    ...data,
    createdAt: new Date().toISOString()
  };
  students.push(student);
  saveStudents(students);
  return student;
}

/** Update a student by id */
function updateStudent(id, data) {
  const students = getStudents();
  const idx = students.findIndex(s => s.id === id);
  if (idx === -1) return false;
  students[idx] = { ...students[idx], ...data };
  saveStudents(students);
  return true;
}

/** Delete a student by id */
function deleteStudent(id) {
  const students = getStudents().filter(s => s.id !== id);
  saveStudents(students);
  // Also clean up related data
  cleanStudentData(id);
}

/** Remove all related data when a student is deleted */
function cleanStudentData(studentId) {
  // Attendance
  const att = lsGet('attendance', {});
  Object.keys(att).forEach(date => {
    delete att[date][studentId];
  });
  lsSet('attendance', att);

  // Fees
  const fees = lsGet('fees', []);
  lsSet('fees', fees.filter(f => f.studentId !== studentId));

  // Exams
  const exams = lsGet('exams', []);
  lsSet('exams', exams.filter(e => e.studentId !== studentId));

  // Leaves
  const leaves = lsGet('leaves', []);
  lsSet('leaves', leaves.filter(l => l.studentId !== studentId));
}

/** Get student by id */
function getStudentById(id) {
  return getStudents().find(s => s.id === id) || null;
}

/* ──────────────────────────────────────
   Students Page Logic
   ────────────────────────────────────── */

let studentEditId = null;

function initStudentsPage() {
  renderStudentsTable();

  // Open add modal
  document.getElementById('btn-add-student')?.addEventListener('click', () => {
    studentEditId = null;
    document.getElementById('student-form').reset();
    document.getElementById('studentModalLabel').textContent = '➕ Add New Student';
    document.querySelectorAll('#student-form .is-invalid').forEach(el => el.classList.remove('is-invalid'));
    const modal = new bootstrap.Modal(document.getElementById('studentModal'));
    modal.show();
  });

  // Save student
  document.getElementById('btn-save-student')?.addEventListener('click', saveStudentHandler);

  // Search
  document.getElementById('student-search')?.addEventListener('input', (e) => {
    renderStudentsTable(e.target.value, document.getElementById('filter-class')?.value);
  });

  // Filter by class
  document.getElementById('filter-class')?.addEventListener('change', (e) => {
    renderStudentsTable(document.getElementById('student-search')?.value, e.target.value);
  });
}

function saveStudentHandler() {
  const fields = [
    { el: 'stu-name',    rule: v => v.length >= 2,   msg: 'Name required' },
    { el: 'stu-class',   rule: v => v !== '',          msg: 'Class required' },
    { el: 'stu-section', rule: v => v !== '',          msg: 'Section required' },
    { el: 'stu-contact', rule: v => /^\d{10}$/.test(v), msg: '10-digit number' },
  ];

  if (!validateForm(fields)) {
    showToast('Please fill all required fields correctly.', 'error');
    return;
  }

  const data = {
    name:    document.getElementById('stu-name').value.trim(),
    class:   document.getElementById('stu-class').value,
    section: document.getElementById('stu-section').value,
    contact: document.getElementById('stu-contact').value.trim(),
    address: document.getElementById('stu-address').value.trim(),
    gender:  document.getElementById('stu-gender').value,
    dob:     document.getElementById('stu-dob').value,
  };

  if (studentEditId) {
    updateStudent(studentEditId, data);
    showToast('Student updated successfully!', 'success');
  } else {
    const s = addStudent(data);
    showToast(`Student added! Roll: ${s.rollNo}`, 'success');
  }

  bootstrap.Modal.getInstance(document.getElementById('studentModal'))?.hide();
  renderStudentsTable();
}

function renderStudentsTable(search = '', filterClass = '') {
  const tbody = document.getElementById('students-tbody');
  if (!tbody) return;

  let students = getStudents();

  if (search) {
    const q = search.toLowerCase();
    students = students.filter(s =>
      s.name.toLowerCase().includes(q) ||
      s.rollNo.toLowerCase().includes(q) ||
      s.contact.includes(q)
    );
  }

  if (filterClass) {
    students = students.filter(s => s.class === filterClass);
  }

  // Update count
  const countEl = document.getElementById('student-count');
  if (countEl) countEl.textContent = students.length;

  if (!students.length) {
    tbody.innerHTML = `
      <tr><td colspan="8">
        <div class="empty-state">
          <div class="empty-icon">👨‍🎓</div>
          <p>No students found. Add your first student!</p>
        </div>
      </td></tr>`;
    return;
  }

  tbody.innerHTML = students.map(s => `
    <tr>
      <td><span class="roll-no">${s.rollNo}</span></td>
      <td>${escHtml(s.name)}</td>
      <td>${escHtml(s.class)}</td>
      <td>${escHtml(s.section)}</td>
      <td>${escHtml(s.gender || '—')}</td>
      <td>${escHtml(s.contact)}</td>
      <td>${escHtml(s.address || '—')}</td>
      <td>
        <div class="action-btns">
          <button class="btn-icon edit" title="Edit" onclick="editStudent(${s.id})">✏️</button>
          <button class="btn-icon del"  title="Delete" onclick="deleteStudentHandler(${s.id})">🗑️</button>
        </div>
      </td>
    </tr>
  `).join('');
}

function editStudent(id) {
  const s = getStudentById(id);
  if (!s) return;

  studentEditId = id;
  document.getElementById('stu-name').value    = s.name;
  document.getElementById('stu-class').value   = s.class;
  document.getElementById('stu-section').value = s.section;
  document.getElementById('stu-contact').value = s.contact;
  document.getElementById('stu-address').value = s.address || '';
  document.getElementById('stu-gender').value  = s.gender || '';
  document.getElementById('stu-dob').value     = s.dob || '';
  document.getElementById('studentModalLabel').textContent = '✏️ Edit Student';

  new bootstrap.Modal(document.getElementById('studentModal')).show();
}

function deleteStudentHandler(id) {
  const s = getStudentById(id);
  confirmAction(`Delete student <strong>${escHtml(s?.name)}</strong>? All related data will also be removed.`, () => {
    deleteStudent(id);
    showToast('Student deleted.', 'info');
    renderStudentsTable();
  });
}

/* ═══════════════════════════════════════════════════════════
   ══════════════════════
   ATTENDANCE MODULE
   ══════════════════════
   ═══════════════════════════════════════════════════════════ */

/** Get attendance object: { "YYYY-MM-DD": { studentId: "P"|"A" } } */
function getAttendance() { return lsGet('attendance', {}); }

/** Mark attendance for a student on a date */
function markAttendance(date, studentId, status) {
  const att = getAttendance();
  if (!att[date]) att[date] = {};
  att[date][studentId] = status; // "P" or "A"
  lsSet('attendance', att);
}

/** Get attendance summary for a student */
function getStudentAttendanceSummary(studentId) {
  const att = getAttendance();
  let present = 0, absent = 0;
  Object.values(att).forEach(dayData => {
    if (dayData[studentId] === 'P') present++;
    else if (dayData[studentId] === 'A') absent++;
  });
  const total = present + absent;
  const pct = total ? Math.round((present / total) * 100) : 0;
  return { present, absent, total, pct };
}

/* ──────────────────────────────────────
   Attendance Page Logic
   ────────────────────────────────────── */

function initAttendancePage() {
  // Set today's date as default
  const dateInput = document.getElementById('att-date');
  if (dateInput) {
    dateInput.value = getTodayStr();
    dateInput.addEventListener('change', () => renderAttendanceTable());
  }

  document.getElementById('btn-save-attendance')?.addEventListener('click', saveAttendanceHandler);
  renderAttendanceTable();
  renderAttendanceSummary();
}

function getTodayStr() {
  return new Date().toISOString().split('T')[0];
}

function renderAttendanceTable() {
  const tbody = document.getElementById('att-tbody');
  if (!tbody) return;

  const date = document.getElementById('att-date')?.value || getTodayStr();
  const att = getAttendance();
  const dayData = att[date] || {};
  const students = getStudents();

  // Update date label
  const lbl = document.getElementById('att-date-label');
  if (lbl) lbl.textContent = formatDate(date);

  if (!students.length) {
    tbody.innerHTML = `<tr><td colspan="5"><div class="empty-state"><div class="empty-icon">📋</div><p>No students added yet.</p></div></td></tr>`;
    return;
  }

  // Count stats
  let pCount = 0, aCount = 0, uCount = 0;
  students.forEach(s => {
    const st = dayData[s.id];
    if (st === 'P') pCount++;
    else if (st === 'A') aCount++;
    else uCount++;
  });

  document.getElementById('att-present-count') && (document.getElementById('att-present-count').textContent = pCount);
  document.getElementById('att-absent-count')  && (document.getElementById('att-absent-count').textContent = aCount);
  document.getElementById('att-unmarked-count') && (document.getElementById('att-unmarked-count').textContent = uCount);

  tbody.innerHTML = students.map(s => {
    const status = dayData[s.id] || '';
    return `
      <tr>
        <td><span class="roll-no">${s.rollNo}</span></td>
        <td>${escHtml(s.name)}</td>
        <td>${escHtml(s.class)} - ${escHtml(s.section)}</td>
        <td>
          <div style="display:flex;gap:6px;">
            <button class="att-btn ${status==='P'?'present-active':''}"
              onclick="toggleAttendance(${s.id},'P','${date}')" id="pBtn-${s.id}">✓ Present</button>
            <button class="att-btn ${status==='A'?'absent-active':''}"
              onclick="toggleAttendance(${s.id},'A','${date}')" id="aBtn-${s.id}">✗ Absent</button>
          </div>
        </td>
        <td>
          ${status === 'P' ? '<span class="badge-custom badge-green">Present</span>' :
            status === 'A' ? '<span class="badge-custom badge-red">Absent</span>' :
            '<span class="badge-custom badge-gray">Unmarked</span>'}
        </td>
      </tr>`;
  }).join('');
}

function toggleAttendance(studentId, status, date) {
  const att = getAttendance();
  const dayData = att[date] || {};

  // Toggle off if same
  if (dayData[studentId] === status) {
    delete (att[date] || {})[studentId];
    lsSet('attendance', att);
  } else {
    markAttendance(date, studentId, status);
  }
  renderAttendanceTable();
}

function saveAttendanceHandler() {
  showToast('Attendance saved successfully!', 'success');
  renderAttendanceSummary();
}

function renderAttendanceSummary() {
  const container = document.getElementById('att-summary-list');
  if (!container) return;
  const students = getStudents();

  if (!students.length) {
    container.innerHTML = '<p style="color:var(--text-muted);text-align:center;padding:20px;font-size:13px;">No student data.</p>';
    return;
  }

  container.innerHTML = students.map(s => {
    const { present, total, pct } = getStudentAttendanceSummary(s.id);
    const colorClass = pct >= 75 ? 'green' : pct >= 50 ? 'yellow' : 'red';
    return `
      <div style="margin-bottom:16px;">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:4px;">
          <div>
            <span style="font-size:13px;font-weight:600;color:var(--text-primary);">${escHtml(s.name)}</span>
            <span class="roll-no" style="margin-left:8px;font-size:11px;">${s.rollNo}</span>
          </div>
          <span style="font-family:var(--font-mono);font-size:13px;color:var(--${colorClass==='green'?'accent2':colorClass==='yellow'?'accent4':'accent3'});">${pct}%</span>
        </div>
        <div class="progress-custom">
          <div class="progress-fill ${colorClass}" style="width:${pct}%"></div>
        </div>
        <div style="font-size:11px;color:var(--text-muted);margin-top:3px;">${present}/${total} days present</div>
      </div>`;
  }).join('');
}

/* ═══════════════════════════════════════════════════════════
   ══════════════════════
   LEAVES MODULE
   ══════════════════════
   ═══════════════════════════════════════════════════════════ */

/** Get all leave applications */
function getLeaves() { return lsGet('leaves', []); }

/** Add a leave application */
function addLeave(data) {
  const leaves = getLeaves();
  const leave = {
    id: Date.now(),
    ...data,
    status: 'Pending',
    appliedOn: new Date().toISOString()
  };
  leaves.push(leave);
  lsSet('leaves', leaves);
  return leave;
}

/** Update leave status */
function updateLeaveStatus(id, status) {
  const leaves = getLeaves();
  const idx = leaves.findIndex(l => l.id === id);
  if (idx === -1) return false;
  leaves[idx].status = status;
  lsSet('leaves', leaves);
  return true;
}

/** Delete a leave */
function deleteLeave(id) {
  lsSet('leaves', getLeaves().filter(l => l.id !== id));
}

/* ──────────────────────────────────────
   Leaves Page Logic
   ────────────────────────────────────── */

function initLeavesPage() {
  populateStudentSelect('leave-student-id');

  document.getElementById('btn-add-leave')?.addEventListener('click', () => {
    document.getElementById('leave-form').reset();
    document.querySelectorAll('#leave-form .is-invalid').forEach(el => el.classList.remove('is-invalid'));
    new bootstrap.Modal(document.getElementById('leaveModal')).show();
  });

  document.getElementById('btn-save-leave')?.addEventListener('click', saveLeaveHandler);

  document.getElementById('leave-filter')?.addEventListener('change', (e) => renderLeavesTable(e.target.value));

  renderLeavesTable();
}

function saveLeaveHandler() {
  const fields = [
    { el: 'leave-student-id', rule: v => v !== '', msg: 'Select student' },
    { el: 'leave-from',       rule: v => v !== '', msg: 'From date required' },
    { el: 'leave-to',         rule: v => v !== '', msg: 'To date required' },
    { el: 'leave-reason',     rule: v => v.length >= 5, msg: 'Reason required' },
  ];

  if (!validateForm(fields)) { showToast('Fill all fields correctly.', 'error'); return; }

  const studentId = parseInt(document.getElementById('leave-student-id').value);
  const student = getStudentById(studentId);

  addLeave({
    studentId,
    studentName: student?.name || 'Unknown',
    rollNo: student?.rollNo || '',
    class: student?.class || '',
    section: student?.section || '',
    from: document.getElementById('leave-from').value,
    to:   document.getElementById('leave-to').value,
    type: document.getElementById('leave-type').value,
    reason: document.getElementById('leave-reason').value.trim(),
  });

  showToast('Leave application submitted!', 'success');
  bootstrap.Modal.getInstance(document.getElementById('leaveModal'))?.hide();
  renderLeavesTable();
}

function renderLeavesTable(filter = '') {
  const tbody = document.getElementById('leaves-tbody');
  if (!tbody) return;

  let leaves = getLeaves();
  if (filter) leaves = leaves.filter(l => l.status === filter);

  // Stats
  const all = getLeaves();
  document.getElementById('leaves-pending-count')  && (document.getElementById('leaves-pending-count').textContent  = all.filter(l => l.status === 'Pending').length);
  document.getElementById('leaves-approved-count') && (document.getElementById('leaves-approved-count').textContent = all.filter(l => l.status === 'Approved').length);
  document.getElementById('leaves-rejected-count') && (document.getElementById('leaves-rejected-count').textContent = all.filter(l => l.status === 'Rejected').length);

  if (!leaves.length) {
    tbody.innerHTML = `<tr><td colspan="9"><div class="empty-state"><div class="empty-icon">📝</div><p>No leave applications found.</p></div></td></tr>`;
    return;
  }

  tbody.innerHTML = leaves.map(l => {
    const statusMap = {
      Pending:  'badge-yellow', 
      Approved: 'badge-green', 
      Rejected: 'badge-red'
    };
    const days = dateDiffDays(l.from, l.to) + 1;
    return `
      <tr>
        <td><span class="roll-no">${l.rollNo}</span></td>
        <td>${escHtml(l.studentName)}</td>
        <td>${escHtml(l.class)} - ${escHtml(l.section)}</td>
        <td><span class="badge-custom badge-blue">${escHtml(l.type)}</span></td>
        <td>${formatDate(l.from)}</td>
        <td>${formatDate(l.to)}</td>
        <td style="font-family:var(--font-mono);font-size:12px;">${days} day${days>1?'s':''}</td>
        <td><span class="badge-custom ${statusMap[l.status]||'badge-gray'}">${l.status}</span></td>
        <td>
          <div class="action-btns">
            ${l.status === 'Pending' ? `
              <button class="btn-icon approve" title="Approve" onclick="changeLeaveStatus(${l.id},'Approved')">✅</button>
              <button class="btn-icon reject"  title="Reject"  onclick="changeLeaveStatus(${l.id},'Rejected')">❌</button>
            ` : `<span style="font-size:11px;color:var(--text-muted);">—</span>`}
            <button class="btn-icon del" title="Delete" onclick="deleteLeaveHandler(${l.id})">🗑️</button>
          </div>
        </td>
      </tr>`;
  }).join('');
}

function changeLeaveStatus(id, status) {
  updateLeaveStatus(id, status);
  showToast(`Leave ${status.toLowerCase()}!`, status === 'Approved' ? 'success' : 'info');
  renderLeavesTable(document.getElementById('leave-filter')?.value);
}

function deleteLeaveHandler(id) {
  confirmAction('Delete this leave application?', () => {
    deleteLeave(id);
    showToast('Leave application deleted.', 'info');
    renderLeavesTable();
  });
}

/* ═══════════════════════════════════════════════════════════
   ══════════════════════
   EXAMS MODULE
   ══════════════════════
   ═══════════════════════════════════════════════════════════ */

/** Get all exam records */
function getExams() { return lsGet('exams', []); }

/** Add exam marks */
function addExam(data) {
  const exams = getExams();
  const exam = { id: Date.now(), ...data, addedOn: new Date().toISOString() };
  exams.push(exam);
  lsSet('exams', exams);
  return exam;
}

/** Delete exam record */
function deleteExam(id) {
  lsSet('exams', getExams().filter(e => e.id !== id));
}

/** Update exam record */
function updateExam(id, data) {
  const exams = getExams();
  const idx = exams.findIndex(e => e.id === id);
  if (idx === -1) return false;
  exams[idx] = { ...exams[idx], ...data };
  lsSet('exams', exams);
  return true;
}

/** Calculate grade from percentage */
function getGrade(pct) {
  if (pct >= 90) return { grade: 'A+', color: 'green' };
  if (pct >= 80) return { grade: 'A',  color: 'green' };
  if (pct >= 70) return { grade: 'B+', color: 'blue' };
  if (pct >= 60) return { grade: 'B',  color: 'blue' };
  if (pct >= 50) return { grade: 'C',  color: 'yellow' };
  if (pct >= 40) return { grade: 'D',  color: 'yellow' };
  return { grade: 'F', color: 'red' };
}

/* ──────────────────────────────────────
   Exams Page Logic
   ────────────────────────────────────── */

let examEditId = null;

function initExamsPage() {
  populateStudentSelect('exam-student-id');

  document.getElementById('btn-add-exam')?.addEventListener('click', () => {
    examEditId = null;
    document.getElementById('exam-form').reset();
    document.querySelectorAll('#exam-form .is-invalid').forEach(el => el.classList.remove('is-invalid'));
    document.getElementById('examModalLabel').textContent = '➕ Add Exam Marks';
    document.getElementById('exam-marks-obtained').oninput = updateExamPercentage;
    document.getElementById('exam-total-marks').oninput    = updateExamPercentage;
    new bootstrap.Modal(document.getElementById('examModal')).show();
  });

  document.getElementById('exam-marks-obtained')?.addEventListener('input', updateExamPercentage);
  document.getElementById('exam-total-marks')?.addEventListener('input', updateExamPercentage);

  document.getElementById('btn-save-exam')?.addEventListener('click', saveExamHandler);

  document.getElementById('exam-filter-type')?.addEventListener('change', renderExamsTable);
  document.getElementById('exam-filter-student')?.addEventListener('change', renderExamsTable);

  populateStudentSelect('exam-filter-student', true);
  renderExamsTable();
}

function updateExamPercentage() {
  const obtained = parseFloat(document.getElementById('exam-marks-obtained')?.value) || 0;
  const total    = parseFloat(document.getElementById('exam-total-marks')?.value) || 1;
  const pct = Math.min(100, Math.round((obtained / total) * 100));
  const pctEl = document.getElementById('exam-percentage-preview');
  if (pctEl) {
    const { grade } = getGrade(pct);
    pctEl.textContent = `${pct}% — Grade: ${grade}`;
  }
}

function saveExamHandler() {
  const fields = [
    { el: 'exam-student-id', rule: v => v !== '',  msg: 'Select student' },
    { el: 'exam-subject',    rule: v => v.length >= 2, msg: 'Subject required' },
    { el: 'exam-type',       rule: v => v !== '',  msg: 'Type required' },
    { el: 'exam-total-marks',    rule: v => parseFloat(v) > 0, msg: 'Total marks required' },
    { el: 'exam-marks-obtained', rule: v => parseFloat(v) >= 0, msg: 'Marks required' },
  ];

  if (!validateForm(fields)) { showToast('Fill all fields correctly.', 'error'); return; }

  const studentId = parseInt(document.getElementById('exam-student-id').value);
  const student   = getStudentById(studentId);
  const obtained  = parseFloat(document.getElementById('exam-marks-obtained').value);
  const total     = parseFloat(document.getElementById('exam-total-marks').value);

  if (obtained > total) {
    showToast('Marks obtained cannot exceed total marks.', 'error');
    return;
  }

  const pct = Math.round((obtained / total) * 100);

  const data = {
    studentId,
    studentName: student?.name || 'Unknown',
    rollNo: student?.rollNo || '',
    class:  student?.class || '',
    section: student?.section || '',
    subject: document.getElementById('exam-subject').value.trim(),
    type:    document.getElementById('exam-type').value,
    date:    document.getElementById('exam-date').value,
    totalMarks:    total,
    marksObtained: obtained,
    percentage:    pct,
    ...getGrade(pct),
  };

  if (examEditId) {
    updateExam(examEditId, data);
    showToast('Exam record updated!', 'success');
  } else {
    addExam(data);
    showToast('Exam marks added!', 'success');
  }

  bootstrap.Modal.getInstance(document.getElementById('examModal'))?.hide();
  renderExamsTable();
}

function renderExamsTable() {
  const tbody = document.getElementById('exams-tbody');
  if (!tbody) return;

  let exams = getExams();
  const filterType    = document.getElementById('exam-filter-type')?.value;
  const filterStudent = document.getElementById('exam-filter-student')?.value;

  if (filterType)    exams = exams.filter(e => e.type === filterType);
  if (filterStudent) exams = exams.filter(e => e.studentId === parseInt(filterStudent));

  if (!exams.length) {
    tbody.innerHTML = `<tr><td colspan="9"><div class="empty-state"><div class="empty-icon">📊</div><p>No exam records found.</p></div></td></tr>`;
    return;
  }

  tbody.innerHTML = exams.map(e => {
    const colorMap = { green: 'badge-green', blue: 'badge-blue', yellow: 'badge-yellow', red: 'badge-red' };
    return `
      <tr>
        <td><span class="roll-no">${e.rollNo}</span></td>
        <td>${escHtml(e.studentName)}</td>
        <td>${escHtml(e.class)}-${escHtml(e.section)}</td>
        <td>${escHtml(e.subject)}</td>
        <td><span class="badge-custom ${e.type==='Internal'?'badge-blue':'badge-yellow'}">${e.type}</span></td>
        <td>${e.marksObtained} / ${e.totalMarks}</td>
        <td>
          <div style="min-width:80px;">
            <div style="font-size:12px;font-family:var(--font-mono);color:var(--text-primary);margin-bottom:2px;">${e.percentage}%</div>
            <div class="progress-custom" style="margin:0;">
              <div class="progress-fill ${e.color}" style="width:${e.percentage}%"></div>
            </div>
          </div>
        </td>
        <td><span class="badge-custom ${colorMap[e.color]||'badge-gray'}">${e.grade}</span></td>
        <td>
          <div class="action-btns">
            <button class="btn-icon edit" title="Edit" onclick="editExam(${e.id})">✏️</button>
            <button class="btn-icon del"  title="Delete" onclick="deleteExamHandler(${e.id})">🗑️</button>
          </div>
        </td>
      </tr>`;
  }).join('');
}

function editExam(id) {
  const e = getExams().find(ex => ex.id === id);
  if (!e) return;
  examEditId = id;
  document.getElementById('exam-student-id').value     = e.studentId;
  document.getElementById('exam-subject').value        = e.subject;
  document.getElementById('exam-type').value           = e.type;
  document.getElementById('exam-date').value           = e.date || '';
  document.getElementById('exam-total-marks').value    = e.totalMarks;
  document.getElementById('exam-marks-obtained').value = e.marksObtained;
  document.getElementById('examModalLabel').textContent = '✏️ Edit Exam Marks';
  updateExamPercentage();
  new bootstrap.Modal(document.getElementById('examModal')).show();
}

function deleteExamHandler(id) {
  confirmAction('Delete this exam record?', () => {
    deleteExam(id);
    showToast('Exam record deleted.', 'info');
    renderExamsTable();
  });
}

/* ═══════════════════════════════════════════════════════════
   ══════════════════════
   FEES MODULE
   ══════════════════════
   ═══════════════════════════════════════════════════════════ */

/** Get all fee records */
function getFees() { return lsGet('fees', []); }

/** Add a fee record */
function addFee(data) {
  const fees = getFees();
  const fee = {
    id: Date.now(),
    ...data,
    pending: data.totalFee - data.paidAmount,
    status: data.paidAmount >= data.totalFee ? 'Paid' :
            data.paidAmount > 0 ? 'Partial' : 'Pending',
    addedOn: new Date().toISOString(),
  };
  fees.push(fee);
  lsSet('fees', fees);
  return fee;
}

/** Update a fee record */
function updateFee(id, data) {
  const fees = getFees();
  const idx = fees.findIndex(f => f.id === id);
  if (idx === -1) return false;
  const updated = {
    ...fees[idx], ...data,
    pending: data.totalFee - data.paidAmount,
    status: data.paidAmount >= data.totalFee ? 'Paid' :
            data.paidAmount > 0 ? 'Partial' : 'Pending',
  };
  fees[idx] = updated;
  lsSet('fees', fees);
  return true;
}

/** Delete a fee record */
function deleteFee(id) {
  lsSet('fees', getFees().filter(f => f.id !== id));
}

/* ──────────────────────────────────────
   Fees Page Logic
   ────────────────────────────────────── */

let feeEditId = null;

function initFeesPage() {
  populateStudentSelect('fee-student-id');

  document.getElementById('btn-add-fee')?.addEventListener('click', () => {
    feeEditId = null;
    document.getElementById('fee-form').reset();
    document.querySelectorAll('#fee-form .is-invalid').forEach(el => el.classList.remove('is-invalid'));
    document.getElementById('feeModalLabel').textContent = '➕ Add Fee Record';
    updateFeePreview();
    new bootstrap.Modal(document.getElementById('feeModal')).show();
  });

  document.getElementById('fee-total')?.addEventListener('input', updateFeePreview);
  document.getElementById('fee-paid')?.addEventListener('input', updateFeePreview);

  document.getElementById('btn-save-fee')?.addEventListener('click', saveFeeHandler);
  document.getElementById('fee-filter-status')?.addEventListener('change', renderFeesTable);
  renderFeesTable();
}

function updateFeePreview() {
  const total = parseFloat(document.getElementById('fee-total')?.value) || 0;
  const paid  = parseFloat(document.getElementById('fee-paid')?.value) || 0;
  const pending = Math.max(0, total - paid);
  const el = document.getElementById('fee-pending-preview');
  if (el) el.textContent = `Pending: ₹${pending.toLocaleString('en-IN')}`;
}

function saveFeeHandler() {
  const fields = [
    { el: 'fee-student-id', rule: v => v !== '',  msg: 'Select student' },
    { el: 'fee-type',       rule: v => v !== '',  msg: 'Fee type required' },
    { el: 'fee-total',      rule: v => parseFloat(v) > 0, msg: 'Total fee required' },
    { el: 'fee-paid',       rule: v => parseFloat(v) >= 0, msg: 'Paid amount required' },
  ];

  if (!validateForm(fields)) { showToast('Fill all fields correctly.', 'error'); return; }

  const studentId = parseInt(document.getElementById('fee-student-id').value);
  const student   = getStudentById(studentId);
  const total     = parseFloat(document.getElementById('fee-total').value);
  const paid      = parseFloat(document.getElementById('fee-paid').value);

  if (paid > total) { showToast('Paid amount cannot exceed total fee.', 'error'); return; }

  const data = {
    studentId,
    studentName: student?.name || 'Unknown',
    rollNo: student?.rollNo || '',
    class:  student?.class || '',
    section: student?.section || '',
    feeType:     document.getElementById('fee-type').value,
    period:      document.getElementById('fee-period').value.trim(),
    totalFee:    total,
    paidAmount:  paid,
    dueDate:     document.getElementById('fee-due-date').value,
  };

  if (feeEditId) {
    updateFee(feeEditId, data);
    showToast('Fee record updated!', 'success');
  } else {
    addFee(data);
    showToast('Fee record added!', 'success');
  }

  bootstrap.Modal.getInstance(document.getElementById('feeModal'))?.hide();
  renderFeesTable();
}

function renderFeesTable() {
  const tbody = document.getElementById('fees-tbody');
  if (!tbody) return;

  let fees = getFees();
  const filterStatus = document.getElementById('fee-filter-status')?.value;
  if (filterStatus) fees = fees.filter(f => f.status === filterStatus);

  // Summary stats
  const allFees = getFees();
  const totalCollected = allFees.reduce((a, f) => a + (f.paidAmount || 0), 0);
  const totalPending   = allFees.reduce((a, f) => a + (f.pending || 0), 0);
  const totalAmount    = allFees.reduce((a, f) => a + (f.totalFee || 0), 0);

  document.getElementById('fees-total-amount')    && (document.getElementById('fees-total-amount').textContent    = '₹' + totalAmount.toLocaleString('en-IN'));
  document.getElementById('fees-collected-amount')&& (document.getElementById('fees-collected-amount').textContent = '₹' + totalCollected.toLocaleString('en-IN'));
  document.getElementById('fees-pending-amount')  && (document.getElementById('fees-pending-amount').textContent   = '₹' + totalPending.toLocaleString('en-IN'));
  document.getElementById('fees-paid-count')      && (document.getElementById('fees-paid-count').textContent       = allFees.filter(f => f.status === 'Paid').length);
  document.getElementById('fees-partial-count')   && (document.getElementById('fees-partial-count').textContent    = allFees.filter(f => f.status === 'Partial').length);
  document.getElementById('fees-unpaid-count')    && (document.getElementById('fees-unpaid-count').textContent     = allFees.filter(f => f.status === 'Pending').length);

  if (!fees.length) {
    tbody.innerHTML = `<tr><td colspan="10"><div class="empty-state"><div class="empty-icon">💰</div><p>No fee records found.</p></div></td></tr>`;
    return;
  }

  tbody.innerHTML = fees.map(f => {
    const statusMap = { Paid: 'badge-green', Partial: 'badge-yellow', Pending: 'badge-red' };
    const pct = f.totalFee ? Math.round((f.paidAmount / f.totalFee) * 100) : 0;
    return `
      <tr>
        <td><span class="roll-no">${f.rollNo}</span></td>
        <td>${escHtml(f.studentName)}</td>
        <td>${escHtml(f.class)}-${escHtml(f.section)}</td>
        <td><span class="badge-custom badge-blue">${escHtml(f.feeType)}</span></td>
        <td>${escHtml(f.period || '—')}</td>
        <td style="font-family:var(--font-mono);font-size:12px;">₹${f.totalFee.toLocaleString('en-IN')}</td>
        <td style="font-family:var(--font-mono);font-size:12px;color:var(--accent2);">₹${f.paidAmount.toLocaleString('en-IN')}</td>
        <td style="font-family:var(--font-mono);font-size:12px;color:var(--accent3);">₹${f.pending.toLocaleString('en-IN')}</td>
        <td><span class="badge-custom ${statusMap[f.status]||'badge-gray'}">${f.status}</span></td>
        <td>
          <div class="action-btns">
            <button class="btn-icon edit" title="Edit" onclick="editFee(${f.id})">✏️</button>
            <button class="btn-icon del"  title="Delete" onclick="deleteFeeHandler(${f.id})">🗑️</button>
          </div>
        </td>
      </tr>`;
  }).join('');
}

function editFee(id) {
  const f = getFees().find(fe => fe.id === id);
  if (!f) return;
  feeEditId = id;
  document.getElementById('fee-student-id').value = f.studentId;
  document.getElementById('fee-type').value        = f.feeType;
  document.getElementById('fee-period').value      = f.period || '';
  document.getElementById('fee-total').value       = f.totalFee;
  document.getElementById('fee-paid').value        = f.paidAmount;
  document.getElementById('fee-due-date').value    = f.dueDate || '';
  document.getElementById('feeModalLabel').textContent = '✏️ Edit Fee Record';
  updateFeePreview();
  new bootstrap.Modal(document.getElementById('feeModal')).show();
}

function deleteFeeHandler(id) {
  confirmAction('Delete this fee record?', () => {
    deleteFee(id);
    showToast('Fee record deleted.', 'info');
    renderFeesTable();
  });
}

/* ═══════════════════════════════════════════════════════════
   ══════════════════════
   DASHBOARD MODULE
   ══════════════════════
   ═══════════════════════════════════════════════════════════ */

function initDashboard() {
  const students = getStudents();
  const fees     = getFees();
  const leaves   = getLeaves();
  const exams    = getExams();
  const att      = getAttendance();

  // Stat cards
  setEl('dash-total-students',  students.length);
  setEl('dash-leave-requests',  leaves.filter(l => l.status === 'Pending').length);
  setEl('dash-fees-pending',    '₹' + fees.reduce((a, f) => a + (f.pending || 0), 0).toLocaleString('en-IN'));

  // Today's attendance
  const todayStr = getTodayStr();
  const todayAtt = att[todayStr] || {};
  const presentToday = Object.values(todayAtt).filter(v => v === 'P').length;
  const totalStudents = students.length;
  const attPct = totalStudents ? Math.round((presentToday / totalStudents) * 100) : 0;
  setEl('dash-attendance-pct', `${attPct}%`);
  setEl('dash-att-sub', `${presentToday}/${totalStudents} present today`);

  // Recent students table
  renderDashboardStudents(students);

  // Recent leaves
  renderDashboardLeaves(leaves);
}

function renderDashboardStudents(students) {
  const tbody = document.getElementById('dash-students-tbody');
  if (!tbody) return;

  const recent = [...students].reverse().slice(0, 5);
  if (!recent.length) {
    tbody.innerHTML = `<tr><td colspan="4"><div class="empty-state" style="padding:30px;"><p style="font-size:13px;">No students yet.</p></div></td></tr>`;
    return;
  }

  tbody.innerHTML = recent.map(s => {
    const { pct } = getStudentAttendanceSummary(s.id);
    const colorClass = pct >= 75 ? 'green' : pct >= 50 ? 'yellow' : 'red';
    return `
      <tr>
        <td><span class="roll-no">${s.rollNo}</span></td>
        <td>${escHtml(s.name)}</td>
        <td>${escHtml(s.class)}-${escHtml(s.section)}</td>
        <td><span class="badge-custom badge-${colorClass}">${pct}%</span></td>
      </tr>`;
  }).join('');
}

function renderDashboardLeaves(leaves) {
  const list = document.getElementById('dash-leaves-list');
  if (!list) return;

  const pending = leaves.filter(l => l.status === 'Pending').slice(0, 5);
  if (!pending.length) {
    list.innerHTML = `<p style="color:var(--text-muted);text-align:center;padding:20px;font-size:13px;">No pending leave requests.</p>`;
    return;
  }

  list.innerHTML = pending.map(l => `
    <div style="display:flex;align-items:center;justify-content:space-between;
                padding:10px 0;border-bottom:1px solid var(--border);">
      <div>
        <div style="font-size:13px;font-weight:600;color:var(--text-primary);">${escHtml(l.studentName)}</div>
        <div style="font-size:11px;color:var(--text-muted);">${escHtml(l.type)} · ${formatDate(l.from)} → ${formatDate(l.to)}</div>
      </div>
      <span class="badge-custom badge-yellow">Pending</span>
    </div>
  `).join('');
}

/* ═══════════════════════════════════════════════════════════
   UTILITY HELPERS
   ═══════════════════════════════════════════════════════════ */

/** Set textContent of element by id */
function setEl(id, val) {
  const el = document.getElementById(id);
  if (el) el.textContent = val;
}

/** HTML escape to prevent XSS */
function escHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g,'&amp;')
    .replace(/</g,'&lt;')
    .replace(/>/g,'&gt;')
    .replace(/"/g,'&quot;');
}

/** Format date string YYYY-MM-DD → "Jan 1, 2026" */
function formatDate(dateStr) {
  if (!dateStr) return '—';
  try {
    const d = new Date(dateStr + 'T00:00:00');
    return d.toLocaleDateString('en-IN', { day:'numeric', month:'short', year:'numeric' });
  } catch { return dateStr; }
}

/** Days between two date strings */
function dateDiffDays(from, to) {
  const a = new Date(from), b = new Date(to);
  return Math.max(0, Math.round((b - a) / 86400000));
}

/** Populate a <select> with student options */
function populateStudentSelect(selectId, withAll = false) {
  const sel = document.getElementById(selectId);
  if (!sel) return;

  const students = getStudents();
  const placeholder = withAll
    ? '<option value="">All Students</option>'
    : '<option value="">-- Select Student --</option>';

  sel.innerHTML = placeholder + students.map(s =>
    `<option value="${s.id}">${escHtml(s.name)} (${s.rollNo})</option>`
  ).join('');
}

/* ═══════════════════════════════════════════════════════════
   PAGE AUTO-INIT
   On DOMContentLoaded, detect which page we're on and init
   ═══════════════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {
  initSidebar();

  const page = document.body.dataset.page;

  switch (page) {
    case 'dashboard':  initDashboard();    break;
    case 'students':   initStudentsPage(); break;
    case 'attendance': initAttendancePage(); break;
    case 'leaves':     initLeavesPage();   break;
    case 'exams':      initExamsPage();    break;
    case 'fees':       initFeesPage();     break;
  }
});
