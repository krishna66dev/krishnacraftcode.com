/* ══════════════════════════════════════════════════════════════════
   Krishna Pal Portfolio  |  script.js  v3
   Features: Loader, Typed Text, AOS, Counters, Skill Bars,
   Scroll Progress, Active Nav Highlight, Back-to-Top,
   Dark/Light Mode, Smooth Scroll, Contact Form, Mobile Nav Close
══════════════════════════════════════════════════════════════════ */

/* ── Utility: get current navbar height (changes on scroll / resize) ── */
function navH() {
  const n = document.getElementById('mainNav');
  return n ? n.offsetHeight : 70;
}

/* ════════════════════════════
   DOCUMENT READY
════════════════════════════ */
document.addEventListener('DOMContentLoaded', function () {

  /* ── 1. LOADER ─────────────────────────────── */
  const loader = document.getElementById('loader');
  window.addEventListener('load', function () {
    setTimeout(function () {
      if (loader) {
        loader.classList.add('done');
        AOS.refresh();
        tryCounters();
        trySkills();
      }
    }, 1600);
  });

  /* ── 2. AOS (scroll animations) ─────────────── */
  AOS.init({
    duration  : 680,
    easing    : 'ease-out-cubic',
    once      : true,
    offset    : 55,
  });

  /* ── 3. TYPED TEXT ────────────────────────────
     Cycles through role titles with type/delete loop
  ─────────────────────────────────────────────── */
  var typedEl   = document.getElementById('typed-text');
  var roles     = [
    'PHP Developer',
    'Laravel Developer',
    'Backend Developer',
    'API Developer',
    'CodeIgniter Expert',
  ];
  var rIdx   = 0;
  var cIdx   = 0;
  var del    = false;
  var paused = false;

  function tick() {
    if (!typedEl || paused) return;
    var word = roles[rIdx];

    if (!del) {
      typedEl.textContent = word.slice(0, ++cIdx);
      if (cIdx === word.length) {
        paused = true;
        setTimeout(function () { paused = false; del = true; tick(); }, 1900);
        return;
      }
      setTimeout(tick, 82);
    } else {
      typedEl.textContent = word.slice(0, --cIdx);
      if (cIdx === 0) {
        del  = false;
        rIdx = (rIdx + 1) % roles.length;
        setTimeout(tick, 360);
        return;
      }
      setTimeout(tick, 46);
    }
  }
  setTimeout(tick, 2000);   /* start after loader */

  /* ── 4. NAVBAR: SCROLL EFFECT + ACTIVE LINK ──
     • .scrolled class adds shadow when page scrolls
     • active class tracks which section is in view
  ─────────────────────────────────────────────── */
  var nav      = document.getElementById('mainNav');
  var navLinks = document.querySelectorAll('.nav-link');
  var sections = document.querySelectorAll('section[id]');

  function refreshNav() {
    if (!nav) return;
    nav.classList.toggle('scrolled', window.scrollY > 60);

    var current = '';
    sections.forEach(function (sec) {
      /* offset = navH + small buffer so active fires before top of section */
      if (window.scrollY >= sec.offsetTop - navH() - 30) {
        current = sec.id;
      }
    });
    navLinks.forEach(function (a) {
      a.classList.toggle('active', a.getAttribute('href') === '#' + current);
    });
  }
  window.addEventListener('scroll', refreshNav, { passive: true });
  refreshNav();

  /* ── 5. SCROLL PROGRESS BAR ─────────────────── */
  var bar = document.getElementById('scroll-progress');
  function updateBar() {
    if (!bar) return;
    var dh  = document.documentElement.scrollHeight - window.innerHeight;
    bar.style.width = (dh > 0 ? (window.scrollY / dh) * 100 : 0) + '%';
  }
  window.addEventListener('scroll', updateBar, { passive: true });

  /* ── 6. ANIMATED COUNTERS ────────────────────── */
  var counterEls  = document.querySelectorAll('.counter');
  var cDone       = false;

  function tryCounters() {
    if (cDone || !counterEls.length) return;
    var stats = document.querySelector('.hero-stats');
    if (!stats) return;
    if (stats.getBoundingClientRect().top < window.innerHeight - 60) {
      cDone = true;
      counterEls.forEach(function (el) {
        var target   = parseInt(el.dataset.target, 10);
        var duration = 1800;
        var step     = Math.max(1, Math.floor(duration / target));
        var cur      = 0;
        var t = setInterval(function () {
          el.textContent = ++cur;
          if (cur >= target) clearInterval(t);
        }, step);
      });
    }
  }
  window.addEventListener('scroll', tryCounters, { passive: true });

  /* ── 7. SKILL BAR FILL ANIMATION ─────────────── */
  var fills  = document.querySelectorAll('.skill-fill');
  var sDone  = false;

  function trySkills() {
    if (sDone || !fills.length) return;
    var sec = document.getElementById('skills');
    if (!sec) return;
    if (sec.getBoundingClientRect().top < window.innerHeight - 80) {
      sDone = true;
      fills.forEach(function (f, i) {
        setTimeout(function () {
          f.style.width = (f.dataset.w || '0') + '%';
        }, 120 + i * 90);
      });
    }
  }
  window.addEventListener('scroll', trySkills, { passive: true });
  setTimeout(trySkills, 2300);   /* also attempt after loader */

  /* ── 8. BACK TO TOP BUTTON ───────────────────── */
  var btt = document.getElementById('backToTop');
  if (btt) {
    window.addEventListener('scroll', function () {
      btt.classList.toggle('visible', window.scrollY > 400);
    }, { passive: true });
    btt.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ── 9. DARK / LIGHT MODE ────────────────────── */
  var tBtn = document.getElementById('themeToggle');
  var tIco = document.getElementById('themeIcon');
  var html = document.documentElement;

  var saved = localStorage.getItem('kp-theme') || 'dark';
  html.setAttribute('data-theme', saved);
  setIcon(saved);

  if (tBtn) {
    tBtn.addEventListener('click', function () {
      var next = html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      html.setAttribute('data-theme', next);
      localStorage.setItem('kp-theme', next);
      setIcon(next);
    });
  }
  function setIcon(theme) {
    if (!tIco) return;
    tIco.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
  }

  /* ── 10. SMOOTH SCROLL with navbar offset ──────
     Works for every internal anchor link including
     navbar links, hero CTA, scroll-down hint, footer links
  ─────────────────────────────────────────────── */
  document.querySelectorAll('a[href^="#"]').forEach(function (a) {
    a.addEventListener('click', function (e) {
      var href = this.getAttribute('href');
      if (!href || href === '#') return;
      var target = document.querySelector(href);
      if (!target) return;
      e.preventDefault();

      /* close mobile menu if open */
      var menu = document.getElementById('navMenu');
      if (menu && menu.classList.contains('show')) {
        var bs = bootstrap.Collapse.getInstance(menu);
        if (bs) bs.hide();
      }

      /* scroll with offset */
      var top = target.getBoundingClientRect().top + window.scrollY - navH() - 14;
      window.scrollTo({ top: Math.max(0, top), behavior: 'smooth' });
    });
  });

  /* ── 11. MOBILE NAV: close on outside click ─── */
  document.addEventListener('click', function (e) {
    var menu   = document.getElementById('navMenu');
    var burger = document.querySelector('.hamburger');
    if (!menu || !menu.classList.contains('show')) return;
    if (menu.contains(e.target) || (burger && burger.contains(e.target))) return;
    var bs = bootstrap.Collapse.getInstance(menu);
    if (bs) bs.hide();
  });

  /* ── 12. FOOTER YEAR ─────────────────────────── */
  var yr = document.getElementById('year');
  if (yr) yr.textContent = new Date().getFullYear();

  /* ── 13. WINDOW RESIZE: refresh AOS ──────────── */
  var rTimer;
  window.addEventListener('resize', function () {
    clearTimeout(rTimer);
    rTimer = setTimeout(function () { AOS.refresh(); refreshNav(); }, 200);
  });

}); /* end DOMContentLoaded */


/* ════════════════════════════════════════════════
   CONTACT FORM  (global — called from HTML onclick)
════════════════════════════════════════════════ */ 
function handleContactForm() {
  var nameEl = document.getElementById('f-name');
  var mobileEl = document.getElementById('f-mobile');
  var mailEl = document.getElementById('f-email');
  var subjectEl = document.getElementById('f-subject');
  var msgEl  = document.getElementById('f-message');
  var btn    = document.getElementById('sendBtn');
  var ok     = document.getElementById('form-success');

  if (!nameEl || !mobileEl || !mailEl || !subjectEl || !msgEl || !btn) return;

  /* Reset borders */
  [nameEl, mobileEl, mailEl, subjectEl, msgEl].forEach(function (f) { f.style.borderColor = ''; });

  var valid = true;

  if (!nameEl.value.trim()) { nameEl.style.borderColor = '#ef4444'; valid = false; }
  if (!mobileEl.value.trim()) { mobileEl.style.borderColor = '#ef4444'; valid = false; }
  if (!mailEl.value.trim()) { mailEl.style.borderColor = '#ef4444'; valid = false; }
  if (!subjectEl.value.trim()) { subjectEl.style.borderColor = '#ef4444'; valid = false; }
  if (!msgEl.value.trim())  { msgEl.style.borderColor  = '#ef4444'; valid = false; }

  /* Basic email format check */
  var emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (mailEl.value.trim() && !emailRe.test(mailEl.value.trim())) {
    mailEl.style.borderColor = '#ef4444';
    valid = false;
  }

  if (!valid) { shake(btn); return; }

  /* Loading state */
  btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
  btn.disabled  = true;

  /* Simulated async — replace with real fetch() to your backend */

  const templateParams = {
    name: nameEl.value.trim(),
    number: mobileEl.value.trim(),
    email: mailEl.value.trim(),
    subject: subjectEl.value.trim(),
    message: msgEl.value.trim()
  };
  emailjs.send(
      "service_94g327l",   // 🔧 replace
      "template_nuu4f0f",  // 📧 replace
      templateParams
    ).then(function(response) {
      // console.log("SUCCESS!", response.status, response.text);
    
  setTimeout(function () {
    btn.innerHTML            = '<i class="fas fa-check"></i> Sent Successfully!';
    btn.style.background     = 'linear-gradient(135deg,#10b981,#059669)';
    btn.style.color          = '#fff';

    if (ok) {
      ok.classList.remove('d-none');
      ok.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }

    /* Clear fields */
    ['f-name','f-email','f-subject','f-message'].forEach(function (id) {
      var el = document.getElementById(id);
      if (el) { el.value = ''; el.style.borderColor = ''; }
    });

    /* Reset after 4 s */
    setTimeout(function () {
      btn.innerHTML        = '<i class="fas fa-paper-plane"></i> Send Message';
      btn.style.background = '';
      btn.style.color      = '';
      btn.disabled         = false;
      if (ok) ok.classList.add('d-none');
    }, 4000);

  }, 1800);

  }, function(error) {
    // console.log("FAILED...", error);
    btn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
    btn.disabled  = false;
    alert('Failed to send message. Please try again later.');
    });
}

/* Shake animation for invalid submit */
function shake(el) {
  el.style.animation = 'kpShake .42s ease';
  el.addEventListener('animationend', function () { el.style.animation = ''; }, { once: true });
}

/* Inject @keyframes once */
(function () {
  var s = document.createElement('style');
  s.textContent = '@keyframes kpShake{0%,100%{transform:translateX(0)}20%{transform:translateX(-7px)}40%{transform:translateX(7px)}60%{transform:translateX(-4px)}80%{transform:translateX(4px)}}';
  document.head.appendChild(s);
}());
