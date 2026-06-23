/* =========================================================
   Computer Fundamentals - Main JavaScript
   ========================================================= */

// ── Theme Management ──────────────────────────────────────
const ThemeManager = (() => {
  const STORAGE_KEY = 'cf_theme';
  const btn = document.getElementById('themeToggle');
  const root = document.documentElement;

  function getStored() {
    return localStorage.getItem(STORAGE_KEY) || 'dark';
  }

  function apply(theme) {
    root.setAttribute('data-theme', theme);
    const icon = btn?.querySelector('i');
    if (icon) {
      icon.className = theme === 'dark' ? 'bi bi-sun-fill' : 'bi bi-moon-stars-fill';
    }
    localStorage.setItem(STORAGE_KEY, theme);
  }

  function toggle() {
    const current = root.getAttribute('data-theme') || 'dark';
    apply(current === 'dark' ? 'light' : 'dark');
  }

  function init() {
    apply(getStored());
    btn?.addEventListener('click', toggle);
  }

  return { init };
})();

// ── Reading Progress Bar ──────────────────────────────────
const ProgressBar = (() => {
  const bar = document.getElementById('progressBar');

  function update() {
    if (!bar) return;
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    bar.style.width = pct + '%';
  }

  function init() {
    window.addEventListener('scroll', update, { passive: true });
    update();
  }

  return { init };
})();

// ── Loading Screen ────────────────────────────────────────
const LoadingScreen = (() => {
  const screen = document.getElementById('loadingScreen');

  function hide() {
    if (!screen) return;
    screen.classList.add('hidden');
    setTimeout(() => screen.remove(), 400);
  }

  function init() {
    window.addEventListener('load', () => setTimeout(hide, 600));
  }

  return { init };
})();

// ── Scroll Reveal (Intersection Observer) ────────────────
const ScrollReveal = (() => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        // Stagger children inside a grid
        const delay = entry.target.dataset.delay || 0;
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, delay);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  function init() {
    document.querySelectorAll('.reveal').forEach((el, i) => {
      el.dataset.delay = (i % 4) * 80; // stagger within rows
      observer.observe(el);
    });
  }

  return { init };
})();

// ── Sticky Navbar ─────────────────────────────────────────
const Navbar = (() => {
  const nav = document.getElementById('mainNav');

  function onScroll() {
    if (!nav) return;
    if (window.scrollY > 60) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  }

  function init() {
    window.addEventListener('scroll', onScroll, { passive: true });
    // Active link on scroll
    const sections = document.querySelectorAll('section[id]');
    const links = document.querySelectorAll('.nav-link');

    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          links.forEach(l => l.classList.remove('active'));
          const active = document.querySelector(`.nav-link[href="#${entry.target.id}"]`);
          active?.classList.add('active');
        }
      });
    }, { threshold: 0.4 });

    sections.forEach(s => sectionObserver.observe(s));
  }

  return { init };
})();

// ── Level Tab Filter ──────────────────────────────────────
const LevelFilter = (() => {
  function init() {
    const tabs = document.querySelectorAll('.level-tab');
    const cards = document.querySelectorAll('.topic-card-wrap');

    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        tabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');

        const filter = tab.dataset.filter;

        cards.forEach(card => {
          const level = card.dataset.level;
          if (filter === 'all' || level === filter) {
            card.style.display = '';
            // re-trigger reveal animation
            const inner = card.querySelector('.reveal');
            inner?.classList.remove('visible');
            setTimeout(() => inner?.classList.add('visible'), 50);
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
  }

  return { init };
})();

// ── Animated Counter ──────────────────────────────────────
const Counter = (() => {
  function animate(el) {
    const target = parseInt(el.dataset.target, 10);
    const duration = 1400;
    const step = target / (duration / 16);
    let current = 0;

    const tick = () => {
      current += step;
      if (current >= target) {
        el.textContent = target.toLocaleString() + (el.dataset.suffix || '');
        return;
      }
      el.textContent = Math.floor(current).toLocaleString() + (el.dataset.suffix || '');
      requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }

  function init() {
    const counters = document.querySelectorAll('.stat-number[data-target]');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animate(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    counters.forEach(c => observer.observe(c));
  }

  return { init };
})();

// ── Mobile Menu auto-close ────────────────────────────────
function initMobileMenu() {
  const links = document.querySelectorAll('.navbar-nav .nav-link');
  const collapse = document.getElementById('navbarNav');

  links.forEach(link => {
    link.addEventListener('click', () => {
      if (window.innerWidth < 992 && collapse) {
        const bsCollapse = bootstrap.Collapse.getInstance(collapse);
        bsCollapse?.hide();
      }
    });
  });
}

// ── Bootstrap Tooltip Init ────────────────────────────────
function initTooltips() {
  const tooltipTriggers = document.querySelectorAll('[data-bs-toggle="tooltip"]');
  tooltipTriggers.forEach(el => new bootstrap.Tooltip(el));
}

// ── INIT ALL ─────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  ThemeManager.init();
  ProgressBar.init();
  LoadingScreen.init();
  ScrollReveal.init();
  Navbar.init();
  LevelFilter.init();
  Counter.init();
  initMobileMenu();
  initTooltips();
});
