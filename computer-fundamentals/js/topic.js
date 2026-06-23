/* =========================================================
   Computer Fundamentals - Topic Page JavaScript
   ========================================================= */

// ── Language Toggle ───────────────────────────────────────
function initLangToggle() {
  document.querySelectorAll('.lang-toggle').forEach(toggle => {
    const parent = toggle.closest('.content-section') || document;
    const btns   = toggle.querySelectorAll('.lang-btn');
    const contents = parent.querySelectorAll('.lang-content');

    btns.forEach(btn => {
      btn.addEventListener('click', () => {
        btns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const lang = btn.dataset.lang;
        contents.forEach(c => {
          c.classList.toggle('visible', c.dataset.lang === lang);
        });
      });
    });

    // Show English by default
    btns[0]?.click();
  });
}

// ── Interview Q Accordion ─────────────────────────────────
function initInterviewQ() {
  document.querySelectorAll('.interview-q').forEach(q => {
    q.addEventListener('click', () => {
      const wasOpen = q.classList.contains('open');
      // close others in same container
      q.closest('.interview-list')?.querySelectorAll('.interview-q').forEach(other => {
        other.classList.remove('open');
      });
      if (!wasOpen) q.classList.add('open');
    });
  });
}

// ── MCQ Interaction ───────────────────────────────────────
function initMCQ() {
  document.querySelectorAll('.mcq-option').forEach(opt => {
    opt.addEventListener('click', () => {
      const card = opt.closest('.mcq-card');
      if (card.dataset.answered) return; // prevent re-answering

      card.dataset.answered = 'true';
      const isCorrect = opt.dataset.correct === 'true';

      // Mark all options
      card.querySelectorAll('.mcq-option').forEach(o => {
        if (o.dataset.correct === 'true') o.classList.add('correct');
      });

      if (!isCorrect) opt.classList.add('wrong');
    });
  });
}

// ── TOC Active Highlight on Scroll ────────────────────────
function initTOC() {
  const tocLinks = document.querySelectorAll('.toc-list a');
  if (!tocLinks.length) return;

  const sectionIds = [...tocLinks].map(a => a.getAttribute('href').replace('#', ''));

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        tocLinks.forEach(l => l.classList.remove('active'));
        const active = document.querySelector(`.toc-list a[href="#${entry.target.id}"]`);
        active?.classList.add('active');
      }
    });
  }, { rootMargin: '-30% 0px -60% 0px' });

  sectionIds.forEach(id => {
    const el = document.getElementById(id);
    if (el) observer.observe(el);
  });
}

// ── Progress tracking via LocalStorage ───────────────────
function markTopicVisited() {
  const topicId = document.body.dataset.topicId;
  if (!topicId) return;

  try {
    const visited = JSON.parse(localStorage.getItem('cf_visited') || '{}');
    visited[topicId] = { date: new Date().toISOString(), completed: false };
    localStorage.setItem('cf_visited', JSON.stringify(visited));
  } catch(e) { /* ignore */ }
}

// ── Init ─────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  initLangToggle();
  initInterviewQ();
  initMCQ();
  initTOC();
  markTopicVisited();
});
