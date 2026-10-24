// Seite „Rutenbau“: Üben, Aufgabenkarten und Vergleichstabelle.
import { GEAR, KIT, TASKS, TOOLS, MAX_POINTS, PASS_POINTS, ORDER_TEXT, kitSolution, toolById } from './rigs.js';
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
    const correct = gearPos ? t.gear[gearPos.key] : kit[kitPos.key];
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
    card.append(el('h2', null, `${t.id} ${t.title}`), el('p', 'sub', `Zielfisch: ${t.fish}`));
    const table = el('table', 'rig-sol');
    const kit = kitSolution(t);
    for (const p of [...GEAR, ...KIT]) {
      const tr = el('tr');
      tr.append(el('th', null, `${p.n}. ${p.label}`), el('td', null, t.gear[p.key] ?? kit[p.key]), el('td', 'pts', `${p.max}`));
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
      const v = t.gear[p.key] ?? kitSolution(t)[p.key];
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
for (const b of document.querySelectorAll('[data-tab]')) b.addEventListener('click', () => showTab(b.dataset.tab));

renderCards();
renderCompare();
const initial = location.hash.slice(1);
showTab(['uebung', 'aufgaben', 'vergleich'].includes(initial) ? initial : 'uebung');
randomTask();
