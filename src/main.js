import './style.css';
import { PROJECTS, SKILLS, EXPERIENCE, DIAG_LINES, WARNINGS } from './data.js';
import { initSkillsThree, destroySkillsThree } from './three-scene.js';

// ===== BOOT SEQUENCE =====
let bootDone = false;

function runBoot() {
  const entries = document.querySelectorAll('.boot-entry');
  const fill = document.getElementById('boot-progress-fill');
  const pct = document.getElementById('boot-percent');
  const enterBtn = document.getElementById('boot-enter-btn');

  entries.forEach((el, i) => {
    const delay = parseInt(el.dataset.delay);
    setTimeout(() => el.classList.add('visible'), delay);
  });

  let progress = 0;
  const interval = setInterval(() => {
    progress = Math.min(progress + Math.random() * 8, 100);
    fill.style.width = progress + '%';
    pct.textContent = Math.floor(progress) + '%';
    if (progress >= 100) {
      clearInterval(interval);
      setTimeout(() => {
        enterBtn.style.display = 'block';
        enterBtn.addEventListener('click', enterDesktop);
        document.addEventListener('keydown', (e) => { if (e.key === 'Enter' && !bootDone) enterDesktop(); });
      }, 400);
    }
  }, 80);
}

function enterDesktop() {
  if (bootDone) return;
  bootDone = true;
  const boot = document.getElementById('boot-screen');
  boot.classList.add('fade-out');
  setTimeout(() => { boot.style.display = 'none'; startDesktop(); }, 800);
}

// ===== CLOCK =====
function updateClock() {
  const el = document.getElementById('taskbar-clock');
  const now = new Date();
  const h = now.getHours().toString().padStart(2, '0');
  const m = now.getMinutes().toString().padStart(2, '0');
  el.textContent = `${h}:${m}`;
}

// ===== WINDOW MANAGEMENT =====
const openWindows = new Set();
let topZ = 200;

function bringToFront(id) {
  topZ++;
  document.getElementById(`win-${id}`).style.zIndex = topZ;
}

function openWindow(id) {
  const win = document.getElementById(`win-${id}`);
  if (!win) return;
  win.classList.remove('hidden');
  bringToFront(id);
  openWindows.add(id);
  updateTaskbar();
  if (id === 'skills') setTimeout(initSkillsWindow, 50);
}

function closeWindow(id) {
  const win = document.getElementById(`win-${id}`);
  if (!win) return;
  win.classList.add('hidden');
  openWindows.delete(id);
  updateTaskbar();
  if (id === 'skills') destroySkillsThree();
}

function minimizeWindow(id) {
  const win = document.getElementById(`win-${id}`);
  if (!win) return;
  win.classList.add('hidden');
  updateTaskbar();
}

function updateTaskbar() {
  const bar = document.getElementById('taskbar-windows');
  bar.innerHTML = '';
  openWindows.forEach(id => {
    const btn = document.createElement('button');
    const win = document.getElementById(`win-${id}`);
    btn.className = 'taskbar-win-btn' + (win && !win.classList.contains('hidden') ? ' active' : '');
    btn.textContent = getWinLabel(id);
    btn.addEventListener('click', () => {
      if (win && win.classList.contains('hidden')) {
        win.classList.remove('hidden');
        bringToFront(id);
      } else {
        win.classList.add('hidden');
      }
      updateTaskbar();
    });
    bar.appendChild(btn);
  });
}

function getWinLabel(id) {
  const map = { about: '👤 About_Me.exe', projects: '📁 Projects.sys', skills: '🧬 Skills.dll', experience: '📜 Experience.log', contact: '📡 Contact.exe', mystery: '⚙️ ???.exe', 'project-detail': '🔓 Project_Detail' };
  return map[id] || id;
}

// ===== DRAG =====
function makeDraggable(win) {
  const titlebar = win.querySelector('.win-titlebar');
  if (!titlebar) return;
  let dragging = false, startX, startY, origLeft, origTop;

  titlebar.addEventListener('mousedown', e => {
    if (e.target.classList.contains('win-btn')) return;
    dragging = true;
    startX = e.clientX; startY = e.clientY;
    origLeft = parseInt(win.style.left) || win.offsetLeft;
    origTop  = parseInt(win.style.top)  || win.offsetTop;
    bringToFront(win.id.replace('win-', ''));
  });

  document.addEventListener('mousemove', e => {
    if (!dragging) return;
    win.style.left = (origLeft + e.clientX - startX) + 'px';
    win.style.top  = Math.max(0, origTop + e.clientY - startY) + 'px';
  });

  document.addEventListener('mouseup', () => { dragging = false; });
}

// ===== PROJECTS =====
function buildProjects() {
  const grid = document.getElementById('projects-grid');
  if (!grid) return;
  grid.innerHTML = '';
  PROJECTS.forEach(proj => {
    const card = document.createElement('div');
    card.className = 'project-card';
    card.innerHTML = `
      <div class="project-filename">${proj.filename}</div>
      <div class="project-status">STATUS: ${proj.status}</div>
      <div class="project-lock">🔒</div>
      <div class="project-decrypt-hint">[ CLICK TO DECRYPT ]</div>
    `;
    card.addEventListener('click', () => openProjectDetail(proj));
    grid.appendChild(card);
  });
}

let decryptInterval = null;

function openProjectDetail(proj) {
  const win = document.getElementById('win-project-detail');
  const title = document.getElementById('proj-detail-title');
  const body  = document.getElementById('proj-detail-body');
  title.textContent = proj.filename + ' — DECRYPTION PORTAL';

  body.innerHTML = `
    <div class="decrypt-screen" id="decrypt-screen-${proj.id}">
      <div style="color:var(--pink);font-size:0.75rem;margin-bottom:8px;">⚠ ENCRYPTED ARCHIVE — LEVEL ${proj.specs.Clearance || '3'} CLEARANCE</div>
      <div class="decrypt-matrix" id="decrypt-matrix-${proj.id}"></div>
      <button class="btn-decrypt" id="btn-decrypt-${proj.id}">🔓 DECRYPT ARCHIVE</button>
    </div>
    <div class="project-detail-content" id="proj-content-${proj.id}">
      <div class="proj-detail-title">${proj.name}</div>
      <div class="proj-detail-desc">${proj.desc}</div>
      <div>${proj.tags.map(t => `<span class="proj-tag">${t}</span>`).join('')}</div>
      <div class="proj-specs" style="margin-top:14px;">
        ${Object.entries(proj.specs).map(([k,v])=>`<div class="proj-spec-row"><span class="proj-spec-key">${k}:</span><span class="proj-spec-val">${v}</span></div>`).join('')}
      </div>
      <div class="proj-links">
        <button class="btn-launch" onclick="window.open('${proj.demo}','_blank')">🚀 LAUNCH DEMO</button>
        <button class="btn-source" onclick="window.open('${proj.source}','_blank')">💾 VIEW SOURCE</button>
      </div>
    </div>
  `;

  openWindow('project-detail');
  bringToFront('project-detail');

  // Glitchy matrix chars on hover
  const matrixEl = document.getElementById(`decrypt-matrix-${proj.id}`);
  const chars = '01█▓▒░#@%&*ABCDEFabcdef';
  let mInterval = setInterval(() => {
    matrixEl.textContent = Array.from({length:120},()=>chars[Math.floor(Math.random()*chars.length)]).join('');
  }, 60);

  document.getElementById(`btn-decrypt-${proj.id}`).addEventListener('click', () => {
    clearInterval(mInterval);
    let count = 0;
    const decryptAnim = setInterval(() => {
      count++;
      matrixEl.textContent = Array.from({length:120},()=>chars[Math.floor(Math.random()*chars.length)]).join('');
      if (count > 18) {
        clearInterval(decryptAnim);
        document.getElementById(`decrypt-screen-${proj.id}`).style.display = 'none';
        const content = document.getElementById(`proj-content-${proj.id}`);
        content.classList.add('revealed');
        showNotif('🔓 ARCHIVE DECRYPTED — ACCESS GRANTED');
      }
    }, 60);
  });
}

// ===== SKILLS =====
function buildSkills() {
  const list = document.getElementById('skills-list');
  if (!list) return;
  list.innerHTML = '';
  SKILLS.forEach((sk, i) => {
    const item = document.createElement('div');
    item.className = 'skill-item';
    item.innerHTML = `
      <div class="skill-item-name">${sk.name}</div>
      <div class="skill-item-cat">${sk.cat} — ${sk.power}</div>
      <div class="skill-mini-bar"><div class="skill-mini-fill" style="width:${sk.level}%"></div></div>
    `;
    item.addEventListener('click', (e) => showSkillPopup(sk, e));
    list.appendChild(item);
  });
}

function showSkillPopup(sk, e) {
  const popup = document.getElementById('skill-popup');
  document.getElementById('skill-popup-title').textContent = sk.name;
  document.getElementById('skill-popup-level').textContent = `LVL ${sk.level} — ${sk.power}`;
  document.getElementById('skill-popup-desc').textContent = sk.desc;
  const bar = document.getElementById('skill-popup-bar');
  bar.style.width = '0%';
  popup.classList.remove('hidden');
  popup.style.left = Math.min(e.clientX, window.innerWidth - 280) + 'px';
  popup.style.top  = Math.min(e.clientY, window.innerHeight - 200) + 'px';
  setTimeout(() => { bar.style.width = sk.level + '%'; }, 50);
}

document.addEventListener('click', e => {
  const popup = document.getElementById('skill-popup');
  if (!popup.contains(e.target) && !e.target.closest('.skill-item')) {
    popup.classList.add('hidden');
  }
});

function initSkillsWindow() {
  const container = document.getElementById('skills-three-container');
  if (!container || container.childElementCount > 0) return;
  initSkillsThree(container);
  buildSkills();
}

// ===== EXPERIENCE =====
function buildExperience() {
  const body = document.getElementById('experience-body');
  if (!body) return;
  body.innerHTML = `<div class="quest-log">${EXPERIENCE.map(e => `
    <div class="quest-entry">
      <div class="quest-version">${e.version}</div>
      <div class="quest-title">${e.title} @ ${e.company}</div>
      <div class="quest-period">⏱ ${e.period}</div>
      <div class="quest-desc">${e.desc}</div>
      <div class="quest-rewards">${e.rewards.map(r=>`<span class="reward-badge">+${r}</span>`).join('')}</div>
      <div class="quest-status">${e.status}</div>
    </div>
  `).join('')}</div>`;
}

// ===== ABOUT ACTIONS =====
function setupAbout() {
  const diagBtn = document.getElementById('btn-run-diag');
  const magicBtn = document.getElementById('btn-inject-magic');
  const diagLog = document.getElementById('diag-log');

  diagBtn.addEventListener('click', () => {
    diagLog.classList.remove('hidden');
    diagLog.innerHTML = '';
    DIAG_LINES.forEach((line, i) => {
      setTimeout(() => {
        diagLog.innerHTML += line + '\n';
        diagLog.scrollTop = diagLog.scrollHeight;
      }, i * 200);
    });
  });

  magicBtn.addEventListener('click', () => {
    document.body.classList.add('glitch-active');
    setTimeout(() => document.body.classList.remove('glitch-active'), 1600);
    showNotif('✨ MAGIC INJECTED — Reality destabilized momentarily.');
    spawnFloatingWarning({ msg: 'MAGIC_OVERFLOW', sub: 'Too much magic detected.\nSystem stability: 73%' });
  });
}

// ===== CONTACT TERMINAL =====
function setupContact() {
  const btn = document.getElementById('btn-transmit');
  if (!btn) return;
  btn.addEventListener('click', () => {
    const name = document.getElementById('contact-name').value.trim();
    const subj = document.getElementById('contact-subject').value.trim();
    const msg  = document.getElementById('contact-message').value.trim();
    if (!name || !subj || !msg) { showNotif('⚠ ALL FIELDS REQUIRED — Transmission aborted.'); return; }

    document.getElementById('contact-form').classList.add('hidden');
    const success = document.getElementById('contact-success');
    success.classList.remove('hidden');
    const lines = document.getElementById('success-lines');
    lines.innerHTML = '';
    const output = [
      `> Verifying identity: ${name}...`,
      `> Purpose defined: ${subj}`,
      `> Encoding message payload...`,
      `> Establishing quantum uplink...`,
      `> [████████████████████] 100%`,
      `> `,
      `> UPLINK ESTABLISHED.`,
      `> MESSAGE TRANSMITTED TO THE CORE.`,
      `> Expect response within 24 system cycles.`,
    ];
    output.forEach((l, i) => {
      setTimeout(() => { lines.innerHTML += l + '\n'; }, i * 200);
    });
  });
}

// ===== FLOATING WARNING =====
let warningIndex = 0;
function spawnFloatingWarning(override) {
  const w = override || WARNINGS[warningIndex % WARNINGS.length];
  warningIndex++;
  document.getElementById('fw-msg').textContent = w.msg;
  document.getElementById('fw-sub').innerHTML = w.sub.replace('\n', '<br>');
  const fw = document.getElementById('floating-warning');
  fw.style.display = 'block';
}

document.getElementById('fw-close').addEventListener('click', () => {
  document.getElementById('floating-warning').style.display = 'none';
});

// ===== NOTIFICATION =====
function showNotif(msg) {
  const el = document.getElementById('sys-notif');
  el.textContent = msg;
  el.classList.remove('hidden');
  clearTimeout(el._timeout);
  el._timeout = setTimeout(() => el.classList.add('hidden'), 3500);
}

// ===== MYSTERY WINDOW =====
let mysteryCount = 0;
function openMystery() {
  mysteryCount++;
  document.getElementById('mystery-count').textContent = mysteryCount;
  openWindow('mystery');
}

// ===== DESKTOP START =====
function startDesktop() {
  buildProjects();
  buildSkills();
  buildExperience();
  setupAbout();
  setupContact();

  // Animate gauges after boot
  setTimeout(() => {
    document.querySelectorAll('.gauge-fill').forEach(el => {
      el.style.width = el.style.getPropertyValue('--target') || el.dataset.target || '0%';
    });
  }, 300);

  // Clock
  updateClock();
  setInterval(updateClock, 1000);

  // Random warnings
  setTimeout(() => spawnFloatingWarning(), 4000);
  setInterval(() => {
    if (Math.random() < 0.3) spawnFloatingWarning();
  }, 25000);

  // Desktop icons
  document.querySelectorAll('.desktop-icon').forEach(icon => {
    const action = () => {
      const id = icon.dataset.window;
      if (id === 'mystery') openMystery();
      else openWindow(id);
    };
    icon.addEventListener('dblclick', action);
    icon.addEventListener('click', action); // single click also works
  });

  // Start menu
  const startBtn = document.getElementById('start-btn');
  const startMenu = document.getElementById('start-menu');
  startBtn.addEventListener('click', e => { e.stopPropagation(); startMenu.classList.toggle('hidden'); });
  document.addEventListener('click', () => startMenu.classList.add('hidden'));
  document.querySelectorAll('.start-menu-item[data-window]').forEach(item => {
    item.addEventListener('click', () => {
      const id = item.dataset.window;
      if (id === 'mystery') openMystery();
      else openWindow(id);
      startMenu.classList.add('hidden');
    });
  });
  document.getElementById('shutdown-btn').addEventListener('click', () => {
    document.body.innerHTML = '<div style="background:#000;color:#8b5cf6;font-family:Space Mono,monospace;display:flex;align-items:center;justify-content:center;height:100vh;font-size:1.2rem;">DREAM_OS is shutting down... <span style="color:#ff6ec7">♥</span></div>';
  });

  // Window controls
  document.querySelectorAll('.win-close').forEach(btn => {
    btn.addEventListener('click', () => closeWindow(btn.dataset.win));
  });
  document.querySelectorAll('.win-min').forEach(btn => {
    btn.addEventListener('click', () => minimizeWindow(btn.dataset.win));
  });
  document.querySelectorAll('.win-max').forEach(btn => {
    btn.addEventListener('click', () => {
      const win = document.getElementById(`win-${btn.dataset.win}`);
      if (!win) return;
      const isMax = win.dataset.maximized === 'true';
      if (isMax) {
        win.style.cssText = win.dataset.prevStyle || '';
        win.dataset.maximized = 'false';
      } else {
        win.dataset.prevStyle = win.style.cssText;
        win.style.left = '0px'; win.style.top = '0px';
        win.style.width = '100vw'; win.style.height = 'calc(100vh - 52px)';
        win.dataset.maximized = 'true';
      }
    });
  });

  // Drag
  document.querySelectorAll('.os-window').forEach(win => makeDraggable(win));

  // Focus on click
  document.querySelectorAll('.os-window').forEach(win => {
    win.addEventListener('mousedown', () => bringToFront(win.id.replace('win-', '')));
  });

  // Open about by default after a short delay
  setTimeout(() => openWindow('about'), 500);
}

// ===== INIT =====
runBoot();
