/* =========================================================
   Computer Fundamentals - Search System
   ========================================================= */

const SEARCH_INDEX = [
  { title:'What is a Computer?',      tags:['computer','ipo','cpu','eniac','babbage','binary','basic'], href:'pages/topic-computer.html',       level:'Basic' },
  { title:'Hardware vs Software',      tags:['hardware','software','system software','application','firmware','rom','ram','bios','driver'], href:'pages/topic-hardware-software.html', level:'Basic' },
  { title:'Input & Output Devices',    tags:['keyboard','mouse','monitor','printer','scanner','vdu','touchscreen','input','output','io'], href:'pages/topic-io-devices.html',    level:'Basic' },
  { title:'Memory: RAM & ROM',         tags:['ram','rom','cache','sram','dram','ddr','volatile','eprom','eeprom','memory','hierarchy'], href:'pages/topic-memory.html',         level:'Intermediate' },
  { title:'Storage Devices',           tags:['hdd','ssd','cd','dvd','pen drive','storage','blu-ray','nvme','sata','rpm','flash'], href:'pages/topic-storage.html',          level:'Intermediate' },
  { title:'Number Systems',            tags:['binary','decimal','octal','hexadecimal','ascii','bits','bytes','conversion','base'], href:'pages/topic-number-systems.html',   level:'Intermediate' },
  { title:'Operating System',          tags:['os','kernel','process','scheduling','fcfs','round robin','booting','ntfs','linux','windows','android'], href:'pages/topic-os.html', level:'Advanced' },
  { title:'CPU Architecture',          tags:['cpu','alu','control unit','registers','pc','ir','acc','fetch decode execute','risc','cisc','ghz','arm','intel'], href:'pages/topic-cpu.html', level:'Advanced' },
  { title:'Computer Generations',      tags:['vacuum tube','transistor','ic','microprocessor','vlsi','ulsi','ai','eniac','moore','generation'], href:'pages/topic-generations.html', level:'Advanced' },
  { title:'Computer Networks',         tags:['lan','wan','man','pan','topology','bus','star','ring','mesh','osi','tcp','udp','router','switch','hub','dns','ip'], href:'pages/topic-networks.html', level:'Advanced' },
  { title:'Database Fundamentals',     tags:['database','sql','dbms','rdbms','primary key','foreign key','normalization','1nf','2nf','3nf','acid','mysql','mongodb','nosql'], href:'pages/topic-database.html', level:'Advanced' },
  { title:'Software Engineering',      tags:['sdlc','waterfall','agile','spiral','testing','black box','white box','sprint','srs','regression','rad'], href:'pages/topic-software-eng.html', level:'Advanced' },
  { title:'Internet & Web Technologies',tags:['internet','http','https','dns','cloud','html','css','javascript','iaas','paas','saas','url','ip','www','ipv4','ipv6'], href:'pages/topic-internet.html', level:'Advanced' },
  { title:'Cyber Security',            tags:['security','cia','encryption','aes','rsa','firewall','ids','ips','malware','phishing','ransomware','ddos','hacking','vpn','ssl','tls'], href:'pages/topic-cybersecurity.html', level:'Advanced' },
  { title:'Quiz Center',               tags:['quiz','mcq','test','exam','score','grade','pdf'], href:'pages/quiz.html', level:'All' },
];

const LEVEL_COLORS = { Basic:'var(--accent-emerald)', Intermediate:'var(--accent-amber)', Advanced:'var(--accent-rose)', All:'var(--accent-blue)' };

// ── Search Modal ──────────────────────────────────────────
function initSearch() {
  const trigger    = document.getElementById('searchTrigger');
  const modal      = document.getElementById('searchModal');
  const overlay    = document.getElementById('searchOverlay');
  const input      = document.getElementById('searchInput');
  const results    = document.getElementById('searchResults');
  const closeBtn   = document.getElementById('searchClose');

  if (!trigger || !modal) return;

  function openSearch() {
    modal.classList.add('open');
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
    setTimeout(() => input?.focus(), 100);
    renderSearchResults('');
  }

  function closeSearch() {
    modal.classList.remove('open');
    overlay.classList.remove('open');
    document.body.style.overflow = '';
    if (input) input.value = '';
  }

  trigger.addEventListener('click', openSearch);
  closeBtn?.addEventListener('click', closeSearch);
  overlay?.addEventListener('click', closeSearch);

  // Keyboard shortcut Ctrl+K / Cmd+K
  document.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') { e.preventDefault(); openSearch(); }
    if (e.key === 'Escape') closeSearch();
  });

  input?.addEventListener('input', () => renderSearchResults(input.value.trim().toLowerCase()));
}

function renderSearchResults(query) {
  const results = document.getElementById('searchResults');
  if (!results) return;

  let filtered;
  if (!query) {
    filtered = SEARCH_INDEX;
  } else {
    filtered = SEARCH_INDEX.filter(item =>
      item.title.toLowerCase().includes(query) ||
      item.tags.some(tag => tag.includes(query))
    );
  }

  if (filtered.length === 0) {
    results.innerHTML = `
      <div style="text-align:center;padding:40px 20px;color:var(--text-muted)">
        <div style="font-size:2.5rem;margin-bottom:12px">🔍</div>
        <div style="font-weight:700;margin-bottom:4px">No results found</div>
        <div style="font-size:0.82rem">Try searching for "RAM", "SQL", "OSI", "binary"…</div>
      </div>`;
    return;
  }

  const isRoot = !window.location.pathname.includes('/pages/');
  const prefix = isRoot ? '' : '../';

  results.innerHTML = `
    <div style="font-size:0.72rem;font-weight:700;color:var(--text-muted);text-transform:uppercase;letter-spacing:0.08em;padding:0 4px;margin-bottom:10px">
      ${query ? `${filtered.length} result${filtered.length !== 1 ? 's' : ''} for "${query}"` : 'All Topics'}
    </div>
    ${filtered.map(item => {
      const color = LEVEL_COLORS[item.level] || 'var(--accent-blue)';
      const matchedTags = query ? item.tags.filter(t => t.includes(query)).slice(0, 3) : [];
      return `
      <a href="${prefix}${item.href}" style="display:flex;align-items:center;gap:14px;padding:13px 14px;border-radius:var(--radius-md);text-decoration:none;color:inherit;border:1px solid transparent;transition:all 0.18s;margin-bottom:6px;background:var(--bg-primary)"
         onmouseover="this.style.borderColor='${color}';this.style.background='${color}14'"
         onmouseout="this.style.borderColor='transparent';this.style.background='var(--bg-primary)'">
        <div style="width:36px;height:36px;border-radius:var(--radius-sm);background:${color}18;display:flex;align-items:center;justify-content:center;flex-shrink:0;font-size:1rem;color:${color}">
          <i class="bi bi-journals"></i>
        </div>
        <div style="flex:1;min-width:0">
          <div style="font-weight:700;font-size:0.9rem;color:var(--text-primary);margin-bottom:3px">${highlightMatch(item.title, query)}</div>
          <div style="display:flex;gap:6px;align-items:center;flex-wrap:wrap">
            <span style="font-size:0.67rem;font-weight:700;padding:1px 8px;border-radius:100px;background:${color}18;color:${color}">${item.level}</span>
            ${matchedTags.map(t => `<span style="font-size:0.67rem;color:var(--text-muted);background:var(--bg-card);padding:1px 7px;border-radius:100px;border:1px solid var(--border-color)">${t}</span>`).join('')}
          </div>
        </div>
        <i class="bi bi-arrow-right" style="color:var(--text-muted);font-size:0.85rem;flex-shrink:0"></i>
      </a>`;
    }).join('')}`;
}

function highlightMatch(text, query) {
  if (!query) return text;
  const re = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
  return text.replace(re, '<mark style="background:rgba(59,91,219,0.2);color:var(--accent-blue);border-radius:2px;padding:0 2px">$1</mark>');
}

document.addEventListener('DOMContentLoaded', initSearch);
