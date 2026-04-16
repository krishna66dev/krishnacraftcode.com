/**
 * Advanced Age Calculator — script.js
 * Features: exact age, total stats, birthday countdown, zodiac, planet ages,
 * live counter, dark mode, localStorage persistence.
 */

// ─── Constants ───────────────────────────────────────────────────────────────

const DAYS_IN_WEEK  = 7;
const HOURS_IN_DAY  = 24;
const MINS_IN_HOUR  = 60;
const SECS_IN_MIN   = 60;

/** Orbital periods in Earth days */
const PLANETS = [
  { name: 'Mercury', emoji: '☿', period: 87.97,   color: '#aaa' },
  { name: 'Venus',   emoji: '♀', period: 224.7,   color: '#e8c060' },
  { name: 'Mars',    emoji: '♂', period: 686.97,  color: '#e05030' },
  { name: 'Jupiter', emoji: '♃', period: 4332.59, color: '#c49060' },
  { name: 'Saturn',  emoji: '♄', period: 10759.22,color: '#d4b870' },
  { name: 'Uranus',  emoji: '♅', period: 30688.5, color: '#80c8e0' },
  { name: 'Neptune', emoji: '♆', period: 60182,   color: '#4060d0' },
];

/** Zodiac signs */
const ZODIAC = [
  { name: 'Capricorn', symbol: '♑', start: [12,22], end: [1,19],  trait: 'Disciplined & ambitious' },
  { name: 'Aquarius',  symbol: '♒', start: [1,20],  end: [2,18],  trait: 'Visionary & independent' },
  { name: 'Pisces',    symbol: '♓', start: [2,19],  end: [3,20],  trait: 'Compassionate & creative' },
  { name: 'Aries',     symbol: '♈', start: [3,21],  end: [4,19],  trait: 'Bold & courageous' },
  { name: 'Taurus',    symbol: '♉', start: [4,20],  end: [5,20],  trait: 'Loyal & dependable' },
  { name: 'Gemini',    symbol: '♊', start: [5,21],  end: [6,20],  trait: 'Witty & adaptable' },
  { name: 'Cancer',    symbol: '♋', start: [6,21],  end: [7,22],  trait: 'Intuitive & nurturing' },
  { name: 'Leo',       symbol: '♌', start: [7,23],  end: [8,22],  trait: 'Charismatic & generous' },
  { name: 'Virgo',     symbol: '♍', start: [8,23],  end: [9,22],  trait: 'Analytical & precise' },
  { name: 'Libra',     symbol: '♎', start: [9,23],  end: [10,22], trait: 'Balanced & charming' },
  { name: 'Scorpio',   symbol: '♏', start: [10,23], end: [11,21], trait: 'Intense & perceptive' },
  { name: 'Sagittarius', symbol: '♐', start: [11,22], end: [12,21], trait: 'Adventurous & optimistic' },
];

const WEEKDAYS = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
const MONTHS_LONG = ['January','February','March','April','May','June',
                     'July','August','September','October','November','December'];

// ─── State ───────────────────────────────────────────────────────────────────

let liveTimer = null;     // setInterval handle for live seconds counter
let baseDOB   = null;     // Date object of DOB (kept for live counter)
let baseRef   = null;     // Reference Date for calculations

// ─── Init ─────────────────────────────────────────────────────────────────────

document.addEventListener('DOMContentLoaded', () => {
  // Restrict DOB max to today
  document.getElementById('dob').max = todayString();
  document.getElementById('customDate').max = todayString();

  // Restore from localStorage
  const saved = localStorage.getItem('agecalc_dob');
  if (saved) document.getElementById('dob').value = saved;

  // Dark mode restore
  const savedTheme = localStorage.getItem('agecalc_theme') || 'light';
  applyTheme(savedTheme);

  document.getElementById('themeToggle').addEventListener('click', toggleTheme);
});

// ─── Helpers ─────────────────────────────────────────────────────────────────

/** Returns today as "YYYY-MM-DD" */
function todayString() {
  const t = new Date();
  return `${t.getFullYear()}-${pad(t.getMonth()+1)}-${pad(t.getDate())}`;
}

/** Zero-pad a number to 2 digits */
function pad(n) { return String(n).padStart(2, '0'); }

/** Format a large integer with locale commas */
function fmt(n) { return Math.floor(n).toLocaleString(); }

/** Parse "YYYY-MM-DD" into a Date at midnight local time (avoids UTC shift) */
function parseLocalDate(str) {
  const [y, m, d] = str.split('-').map(Number);
  return new Date(y, m - 1, d);
}

// ─── Core Age Calculation ─────────────────────────────────────────────────────

/**
 * Calculate exact age components using borrow/carry logic.
 * Handles Feb-29 DOBs and varying month lengths correctly.
 * @param {Date} dob - Date of birth
 * @param {Date} ref - Reference "current" date
 * @returns {{ years, months, days, totalDays }}
 */
function calcAge(dob, ref) {
  let y1 = dob.getFullYear(), m1 = dob.getMonth() + 1, d1 = dob.getDate();
  let y2 = ref.getFullYear(), m2 = ref.getMonth() + 1, d2 = ref.getDate();

  // Borrow a month if day of ref < day of DOB
  if (d2 < d1) {
    m2 -= 1;
    // Days in the previous month of ref
    const prevMonth = m2 === 0 ? new Date(y2 - 1, 12, 0) : new Date(y2, m2 - 1, 0);
    d2 += prevMonth.getDate();
  }

  // Borrow a year if month of ref < month of DOB
  if (m2 < m1) {
    y2 -= 1;
    m2 += 12;
  }

  const years  = y2 - y1;
  const months = m2 - m1;
  const days   = d2 - d1;

  // Total elapsed days (ms diff / ms per day)
  const msPerDay = 1000 * 60 * 60 * 24;
  const totalDays = Math.floor((ref - dob) / msPerDay);

  return { years, months, days, totalDays };
}

// ─── Birthday Logic ───────────────────────────────────────────────────────────

/**
 * Compute next birthday date relative to a reference date.
 * Handles Feb-29 DOBs by falling back to Mar-1 on non-leap years.
 * @param {Date} dob
 * @param {Date} ref
 * @returns {{ nextBirthday: Date, daysRemaining: number, progressPct: number }}
 */
function getNextBirthday(dob, ref) {
  const dobM = dob.getMonth(); // 0-based
  const dobD = dob.getDate();
  const refY = ref.getFullYear();

  // Try birthday this year
  let bday = birthdayInYear(dobM, dobD, refY);

  // If already passed today, use next year
  if (bday <= ref) {
    bday = birthdayInYear(dobM, dobD, refY + 1);
  }

  const msPerDay = 1000 * 60 * 60 * 24;
  const daysRemaining = Math.ceil((bday - ref) / msPerDay);

  // Progress between last birthday and next birthday
  const lastBday = new Date(bday);
  lastBday.setFullYear(bday.getFullYear() - 1);
  const totalRange = bday - lastBday;
  const elapsed    = ref - lastBday;
  const progressPct = Math.min(100, Math.max(0, (elapsed / totalRange) * 100));

  return { nextBirthday: bday, daysRemaining, progressPct };
}

/** Get birthday Date in a given year, handling Feb-29 edge case */
function birthdayInYear(month, day, year) {
  // Feb 29 in a non-leap year → Mar 1
  if (month === 1 && day === 29 && !isLeapYear(year)) {
    return new Date(year, 2, 1); // March 1
  }
  return new Date(year, month, day);
}

function isLeapYear(year) {
  return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
}

// ─── Zodiac ───────────────────────────────────────────────────────────────────

function getZodiac(dob) {
  const m = dob.getMonth() + 1;
  const d = dob.getDate();
  for (const z of ZODIAC) {
    const [sm, sd] = z.start;
    const [em, ed] = z.end;
    if ((m === sm && d >= sd) || (m === em && d <= ed)) return z;
  }
  return ZODIAC[0]; // fallback Capricorn
}

// ─── Planet Ages ─────────────────────────────────────────────────────────────

function buildPlanetGrid(totalDays) {
  const grid = document.getElementById('planetGrid');
  grid.innerHTML = '';
  for (const p of PLANETS) {
    const age = (totalDays / p.period).toFixed(2);
    const col = document.createElement('div');
    col.className = 'col-6 col-md-3';
    col.innerHTML = `
      <div class="planet-card">
        <div class="planet-emoji">${p.emoji}</div>
        <div class="planet-name">${p.name}</div>
        <div class="planet-age">${age}</div>
        <div class="planet-unit">planet years</div>
      </div>`;
    grid.appendChild(col);
  }
}

// ─── Display Helpers ─────────────────────────────────────────────────────────

/** Animate a number counting up to target */
function animateNumber(el, target, isFloat = false) {
  const duration = 800;
  const start = performance.now();
  const from = 0;
  const to = target;

  function step(now) {
    const progress = Math.min((now - start) / duration, 1);
    const ease = 1 - Math.pow(1 - progress, 3); // cubic ease-out
    const val = from + (to - from) * ease;
    el.textContent = isFloat ? val.toFixed(2) : fmt(val);
    if (progress < 1) requestAnimationFrame(step);
    else el.textContent = isFloat ? to.toFixed(2) : fmt(to);
  }
  requestAnimationFrame(step);
}

/** Update the live seconds counter every second */
function startLiveCounter() {
  if (liveTimer) clearInterval(liveTimer);
  liveTimer = setInterval(() => {
    if (!baseDOB) return;
    const now = new Date();
    const elapsed = now - baseDOB;
    const secs = Math.floor(elapsed / 1000);

    // Update seconds in exact age
    const msRemainder = elapsed % (1000 * 60 * 60 * 24 * 365.25);
    const ageSeconds = Math.floor((msRemainder % (1000 * 60)) / 1000);
    document.getElementById('ageSeconds').textContent = ageSeconds;

    // Update total seconds
    document.getElementById('totalSeconds').textContent = fmt(secs);
  }, 1000);
}

// ─── Main Calculate Function ──────────────────────────────────────────────────

function calculate() {
  clearError();

  const dobVal    = document.getElementById('dob').value;
  const customVal = document.getElementById('customDate').value;

  // ── Validation ──
  if (!dobVal) {
    showError('Please enter your date of birth.');
    return;
  }

  const dob = parseLocalDate(dobVal);
  const ref = customVal ? parseLocalDate(customVal) : new Date();

  // Set ref time to end-of-day when using today for more natural feel
  if (!customVal) {
    // keep full current time for live accuracy
  } else {
    ref.setHours(23, 59, 59, 0);
  }

  if (dob > ref) {
    showError('Date of birth cannot be in the future!');
    return;
  }

  // Persist DOB
  localStorage.setItem('agecalc_dob', dobVal);
  baseDOB = dob;
  baseRef = ref;

  // ── Calculations ──
  const { years, months, days, totalDays } = calcAge(dob, ref);

  const totalMs      = ref - dob;
  const totalSecs    = Math.floor(totalMs / 1000);
  const totalMins    = Math.floor(totalSecs / 60);
  const totalHours   = Math.floor(totalMins / 60);
  const totalWeeks   = Math.floor(totalDays / 7);
  const totalMonths  = years * 12 + months;

  // Exact age sub-day breakdown
  const msInDay    = 1000 * 60 * 60 * 24;
  const msToday    = totalMs % msInDay;
  const ageHours   = Math.floor(msToday / (1000 * 60 * 60));
  const ageMinutes = Math.floor((msToday % (1000 * 60 * 60)) / (1000 * 60));
  const ageSeconds = Math.floor((msToday % (1000 * 60)) / 1000);

  // ── Render Exact Age ──
  document.getElementById('ageYears').textContent   = years;
  document.getElementById('ageMonths').textContent  = months;
  document.getElementById('ageDays').textContent    = days;
  document.getElementById('ageHours').textContent   = ageHours;
  document.getElementById('ageMinutes').textContent = fmt(ageMinutes);
  document.getElementById('ageSeconds').textContent = ageSeconds;

  // ── Render Stats (with animation) ──
  animateNumber(document.getElementById('totalDays'),    totalDays);
  animateNumber(document.getElementById('totalWeeks'),   totalWeeks);
  animateNumber(document.getElementById('totalMonths'),  totalMonths);
  animateNumber(document.getElementById('totalHours'),   totalHours);
  animateNumber(document.getElementById('totalMinutes'), totalMins);
  animateNumber(document.getElementById('totalSeconds'), totalSecs);

  // ── Birthday ──
  const { nextBirthday, daysRemaining, progressPct } = getNextBirthday(dob, ref);
  const nbDay = nextBirthday.getDate();
  const nbMon = MONTHS_LONG[nextBirthday.getMonth()];
  const nbYr  = nextBirthday.getFullYear();
  const nbDow = WEEKDAYS[nextBirthday.getDay()];

  document.getElementById('nextBirthdayDate').textContent   = `${nbDay} ${nbMon} ${nbYr}`;
  document.getElementById('nextBirthdayDow').textContent    = nbDow;
  document.getElementById('daysUntilBirthday').textContent  = daysRemaining;
  document.getElementById('birthdayProgress').style.width   = progressPct.toFixed(1) + '%';

  // ── Zodiac ──
  const zodiac = getZodiac(dob);
  document.getElementById('zodiacSymbol').textContent = zodiac.symbol;
  document.getElementById('zodiacName').textContent   = zodiac.name;
  document.getElementById('zodiacTrait').textContent  = zodiac.trait;
  const [sm, sd] = zodiac.start, [em, ed] = zodiac.end;
  document.getElementById('zodiacDates').textContent  =
    `${MONTHS_LONG[sm-1].slice(0,3)} ${sd} – ${MONTHS_LONG[em-1].slice(0,3)} ${ed}`;

  // ── Planets ──
  buildPlanetGrid(totalDays);

  // ── Show results ──
  const section = document.getElementById('resultsSection');
  section.classList.remove('d-none');
  section.scrollIntoView({ behavior: 'smooth', block: 'start' });

  // ── Start live counter (only if ref is "now") ──
  if (!customVal) {
    startLiveCounter();
  } else {
    if (liveTimer) clearInterval(liveTimer);
  }
}

// ─── Reset ────────────────────────────────────────────────────────────────────

function resetAll() {
  document.getElementById('dob').value        = '';
  document.getElementById('customDate').value = '';
  document.getElementById('resultsSection').classList.add('d-none');
  clearError();
  if (liveTimer) clearInterval(liveTimer);
  baseDOB = null;
  baseRef = null;
  localStorage.removeItem('agecalc_dob');
}

// ─── Error Handling ───────────────────────────────────────────────────────────

function showError(msg) {
  const el = document.getElementById('errorAlert');
  document.getElementById('errorMsg').textContent = msg;
  el.classList.remove('d-none');
  el.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

function clearError() {
  document.getElementById('errorAlert').classList.add('d-none');
}

// ─── Dark Mode ────────────────────────────────────────────────────────────────

function toggleTheme() {
  const current = document.documentElement.getAttribute('data-theme');
  const next = current === 'dark' ? 'light' : 'dark';
  applyTheme(next);
  localStorage.setItem('agecalc_theme', next);
}

function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  const icon = document.getElementById('themeIcon');
  icon.className = theme === 'dark' ? 'bi bi-sun-fill' : 'bi bi-moon-stars-fill';
}

// ─── Allow Enter key to calculate ─────────────────────────────────────────────

document.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') calculate();
});
