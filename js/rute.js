// Seite „Rutenbau“: Üben, Aufgabenkarten und Vergleichstabelle.
import { GEAR, KIT, TASKS, TOOLS, MAX_POINTS, PASS_POINTS, ORDER_TEXT, kitSolution, toolById,
  EXAM_DAY, TABLE_TIPS, GROUPS, RECOGNIZE, REEL_SIZES, ALSO_OK } from './rigs.js';
import { gearOptions, scoreRig } from './rigquiz.js';
import { shuffle } from './deck.js';

const $ = id => document.getElementById(id);
const el = (tag, cls, text) => {
  const e = document.createElement(tag);
  if (cls) e.className = cls;
  if (text != null) e.textContent = text;
  return e;
};
const taskText = t => `${t.id}: ${t.title} zum Fang von ${t.fish}, mit dem notwendigen Zubehör waidgerecht zusammenbauen.`;

// ---------- Tabs ----------

function showTab(name) {
  for (const s of document.querySelectorAll('.rig-tab')) s.hidden = s.id !== `tab-${name}`;
  for (const b of document.querySelectorAll('[data-tab]')) b.classList.toggle('active', b.dataset.tab === name);
  history.replaceState(null, '', `#${name}`);
}

// ---------- Üben ----------

const quiz = { task: null, answers: {}, tools: [] };

function startQuiz(task) {
  quiz.task = task;
  quiz.answers = {};
  quiz.tools = [];
  $('rig-select').value = task.id;
  $('rig-task').textContent = taskText(task);
  $('rig-gear').replaceChildren(...GEAR.map(p => {
    const box = el('div', 'rig-pos');
    box.append(el('div', 'rig-pos-label', `${p.n}. ${p.label} (${p.max} ${p.max === 1 ? 'Punkt' : 'Punkte'})`));
    const opts = el('div', 'rig-opts');
    for (const text of gearOptions(task, p.key)) {
      const b = el('button', 'rig-opt', text);
      b.type = 'button';
      b.addEventListener('click', () => {
        quiz.answers[p.key] = text;
        for (const o of opts.children) o.classList.toggle('selected', o === b);
      });
      opts.append(b);
    }
    box.append(opts);
    return box;
  }));
  $('rig-tools').replaceChildren(...shuffle(TOOLS).map(t => {
    const b = el('button', 'rig-tool', t.label);
    b.type = 'button';
    b.dataset.id = t.id;
    b.addEventListener('click', () => { if (!quiz.tools.includes(t.id)) { quiz.tools.push(t.id); renderLaid(); } });
    return b;
  }));
  renderLaid();
  $('rig-result').hidden = true;
  $('rig-quiz').hidden = false;
}

function renderLaid() {
  $('rig-laid').replaceChildren(...quiz.tools.map(id => {
    const li = el('li');
    const b = el('button', 'rig-laid-item', `${toolById(id).label} ✕`);
    b.type = 'button';
    b.addEventListener('click', () => { quiz.tools = quiz.tools.filter(x => x !== id); renderLaid(); });
    li.append(b);
    return li;
  }));
  for (const b of $('rig-tools').children) b.disabled = quiz.tools.includes(b.dataset.id);
}

function checkQuiz() {
  const t = quiz.task;
  const res = scoreRig(t, quiz.answers, quiz.tools);
  const kit = kitSolution(t);
  const table = el('table', 'rig-score');
  const head = el('tr');
  for (const h of ['Pos.', 'Deine Wahl', 'Richtig', 'Punkte']) head.append(el('th', null, h));
  table.append(head);
  // Gelegte Teile je Zubehör-Position, damit die Tabelle zeigt, was für diese Position lag.
  const laidIn = group => quiz.tools.map(toolById).filter(x => x.group === group).map(x => x.label).join(', ') || 'nichts gelegt';
  const laidOrder = quiz.tools.map(id => toolById(id).label).join(' → ') || 'nichts gelegt';
  const kitGiven = { 10: laidIn('landehilfe'), 11: laidIn('messen'), 12: laidIn('betaeuben'), 13: laidIn('toeten'),
    14: laidIn('rachensperre'), 15: laidIn('loesen'), 16: laidOrder };
  for (const r of res.rows) {
    const gearPos = GEAR.find(p => p.n === r.n);
    const kitPos = KIT.find(p => p.n === r.n);
    const also = gearPos ? (ALSO_OK[t.id]?.[gearPos.key] ?? []) : [];
    const correct = gearPos ? [t.short[gearPos.key], ...also].join(' oder ') : kit[kitPos.key];
    const given = gearPos ? r.given : kitGiven[r.n];
    const tr = el('tr', r.points === r.max ? 'ok' : 'bad');
    tr.append(el('td', null, `${r.n}. ${r.label}`), el('td', null, given), el('td', null, correct), el('td', null, `${r.points} / ${r.max}`));
    table.append(tr);
    const key = gearPos?.key ?? kitPos?.key;
    const note = [t.why?.[key], t.alt?.[key]].filter(Boolean).join(' ');
    if (r.points < r.max && note) {
      const ntr = el('tr', 'note');
      const td = el('td', null, note);
      td.colSpan = 4;
      ntr.append(td);
      table.append(ntr);
    }
  }
  const box = $('rig-result');
  box.replaceChildren(
    el('p', `rig-total ${res.passed ? 'ok' : 'bad'}`,
      `${res.total} von ${MAX_POINTS} Punkten: ${res.passed ? 'bestanden' : 'nicht bestanden'} (ab ${PASS_POINTS}).`),
    table,
  );
  const again = el('button', 'primary', 'Nächste zufällige Aufgabe');
  again.addEventListener('click', randomTask);
  box.append(again);
  box.hidden = false;
  box.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function randomTask() {
  const pool = TASKS.filter(t => t !== quiz.task);
  startQuiz(pool[Math.floor(Math.random() * pool.length)]);
  window.scrollTo(0, 0);
}

// ---------- Aufgabenkarten ----------

function renderCards() {
  $('rig-cards').replaceChildren(...TASKS.map(t => {
    const card = el('article', 'rig-card');
    const group = GROUPS.find(g => g.tasks.includes(t.id));
    const twin = group.tasks.filter(id => id !== t.id);
    card.append(el('h2', null, `${t.id} ${t.title}`), el('p', 'sub', `Zielfisch: ${t.fish}`),
      el('p', 'rig-group', `Gruppe ${group.name}${twin.length ? `, wie ${twin.join(', ')}` : ''}: ${group.note}`));
    const table = el('table', 'rig-sol');
    const kit = kitSolution(t);
    for (const p of [...GEAR, ...KIT]) {
      const tr = el('tr');
      const td = el('td');
      if (t.short[p.key]) {
        td.append(el('strong', null, t.short[p.key]));
        const also = ALSO_OK[t.id]?.[p.key];
        if (also) td.append(el('span', 'also', ` (auch richtig: ${also.join(', ')})`));
        if (t.gear[p.key] !== t.short[p.key]) td.append(el('span', 'detail', t.gear[p.key]));
      } else td.textContent = kit[p.key];
      tr.append(el('th', null, `${p.n}. ${p.label}`), td, el('td', 'pts', `${p.max}`));
      table.append(tr);
    }
    card.append(table);
    const notes = [...new Set([...Object.values(t.why ?? {}), ...Object.values(t.alt ?? {})])];
    if (notes.length) {
      const ul = el('ul', 'rig-notes');
      for (const n of notes) ul.append(el('li', null, n));
      card.append(ul);
    }
    return card;
  }));
}

// ---------- Vergleich ----------

function renderCompare() {
  const table = $('rig-compare');
  const head = el('tr');
  head.append(el('th', null, 'Position'));
  for (const t of TASKS) head.append(el('th', null, `${t.id} ${t.fish}`));
  table.replaceChildren(head);
  for (const p of [...GEAR, ...KIT.filter(k => k.key !== 'reihenfolge')]) {
    const tr = el('tr');
    tr.append(el('th', null, `${p.n}. ${p.label}`));
    for (const t of TASKS) {
      const v = t.short[p.key] ?? kitSolution(t)[p.key];
      tr.append(el('td', v.toLowerCase().startsWith('entfällt') ? 'none' : null, v));
    }
    table.append(tr);
  }
  const tr = el('tr');
  tr.append(el('th', null, '16. Reihenfolge'));
  const td = el('td', null, ORDER_TEXT);
  td.colSpan = TASKS.length;
  tr.append(td);
  table.append(tr);
}

// ---------- Erkennen ----------

const rec = { item: null, picked: new Set(), right: 0, total: 0, checked: false, order: [] };

function nextRecognize() {
  // Bildfragen zuerst (pop nimmt vom Ende), danach die Textfragen.
  if (rec.order.length === 0) rec.order = [...shuffle(RECOGNIZE.filter(r => !r.img && r.reels == null)), ...shuffle(RECOGNIZE.filter(r => r.img || r.reels != null))];
  rec.item = rec.order.pop();
  rec.picked = new Set();
  rec.checked = false;
  const img = rec.item.img;
  $('rec-img').hidden = !img;
  if (img) $('rec-img').src = `img/geraet/${img}.jpg`;
  const reel = rec.item.reels;
  $('rec-reels').hidden = reel == null;
  if (reel != null) {
    $('rec-reels').replaceChildren(...REEL_SIZES.map((r, i) => {
      const fig = el('figure', i === reel ? 'reel marked' : 'reel');
      const im = el('img');
      im.src = 'img/geraet/stationaerrolle.jpg';
      im.alt = `Stationärrolle ${r.label}`;
      im.style.height = `calc(${r.scale} * min(28vh, 220px))`;
      fig.append(im, el('figcaption', null, `Größe ${r.number}${i === reel ? ' ← diese' : ''}`));
      return fig;
    }));
  }
  $('rec-item').textContent = reel != null ? 'Drei Stationärrollen liegen auf dem Tisch. Zu welcher Aufgabe gehört die markierte?'
    : img ? 'Was ist das, und zu welcher Aufgabe gehört es?' : rec.item.item;
  $('rec-result').textContent = '';
  $('rec-tasks').replaceChildren(...TASKS.map(t => {
    const b = el('button', 'rec-task', `${t.id} ${t.fish}`);
    b.type = 'button';
    b.dataset.id = t.id;
    b.addEventListener('click', () => {
      if (rec.checked) return;
      if (rec.picked.has(t.id)) rec.picked.delete(t.id); else rec.picked.add(t.id);
      b.classList.toggle('selected', rec.picked.has(t.id));
    });
    return b;
  }));
  updateRecScore();
}

function checkRecognize() {
  if (rec.checked) return;
  rec.checked = true;
  const want = new Set(rec.item.tasks);
  const ok = want.size === rec.picked.size && [...want].every(id => rec.picked.has(id));
  rec.total++;
  if (ok) rec.right++;
  for (const b of $('rec-tasks').children) {
    b.classList.toggle('ok', want.has(b.dataset.id));
    b.classList.toggle('bad', rec.picked.has(b.dataset.id) && !want.has(b.dataset.id));
  }
  const name = rec.item.img || rec.item.reels != null ? `${rec.item.item}. ` : '';
  $('rec-result').textContent = name + (ok ? 'Richtig.' : `Richtig wäre: ${rec.item.tasks.join(', ')}.`);
  $('rec-result').className = `rec-result ${ok ? 'ok' : 'bad'}`;
  updateRecScore();
}

function updateRecScore() {
  $('rec-score').textContent = rec.total ? `${rec.right} von ${rec.total} richtig` : '';
}

// ---------- Prüfungstipps ----------

function renderTips() {
  const day = el('article', 'rig-card');
  const ul = el('ul');
  for (const t of EXAM_DAY) ul.append(el('li', null, t));
  day.append(el('h2', null, 'So lief die Prüfung ab'), el('p', 'sub', 'Erfahrungsbericht Herne, Juni 2021'), ul);
  const cards = TABLE_TIPS.map(sec => {
    const c = el('article', 'rig-card');
    const list = el('ul');
    for (const t of sec.items) list.append(el('li', null, t));
    c.append(el('h2', null, sec.title), list);
    return c;
  });
  const groups = el('article', 'rig-card');
  const gl = el('ul');
  for (const g of GROUPS) gl.append(el('li', null, `${g.tasks.join(' + ')}: ${g.name}. ${g.note}`));
  groups.append(el('h2', null, 'Aus 10 mach 6'), el('p', 'sub', 'Gleiche Teile in gleicher Abfolge, nur anders dimensioniert'), gl);
  $('rig-tips').replaceChildren(day, ...cards, groups);
}

// ---------- Start ----------

$('rig-select').append(el('option', null, 'Aufgabe wählen …'), ...TASKS.map(t => {
  const o = el('option', null, `${t.id} ${t.title} (${t.fish})`);
  o.value = t.id;
  return o;
}));
$('rig-select').firstChild.disabled = true;
$('rig-select').addEventListener('change', e => startQuiz(TASKS.find(t => t.id === e.target.value)));
$('rig-random').addEventListener('click', randomTask);
$('rig-check').addEventListener('click', checkQuiz);
$('rig-details').addEventListener('change', e => $('rig-cards').classList.toggle('show-details', e.target.checked));
$('rec-check').addEventListener('click', checkRecognize);
$('rec-next').addEventListener('click', nextRecognize);
for (const b of document.querySelectorAll('[data-tab]')) b.addEventListener('click', () => showTab(b.dataset.tab));

renderCards();
renderCompare();
renderTips();
nextRecognize();
const initial = location.hash.slice(1);
showTab(['uebung', 'erkennen', 'aufgaben', 'vergleich', 'tipps'].includes(initial) ? initial : 'uebung');
randomTask();
