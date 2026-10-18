import { SPECIES } from '../data/species.js';
import { activeSpecies, nextSpecies, loadHidden, saveHidden, drawExam, examPassed } from './deck.js';
import { drawArrows } from './card.js';
import { speciesForSimilar } from './names.js';

const $ = id => document.getElementById(id);
const storage = (() => { try { return window.localStorage; } catch { return null; } })();
const byName = [...SPECIES].sort((a, b) => a.name.localeCompare(b.name, 'de'));

const state = {
  hidden: loadHidden(storage),
  current: null,
  showFeatures: false,
  exam: null, // { cards, index, correct, results }
  returnTo: null, // 'select' oder 'baum': wohin „Zurück“ auf der Karte führt
};

function show(viewId) {
  for (const v of document.querySelectorAll('.view')) v.hidden = v.id !== viewId;
}

function goHome() {
  state.exam = null;
  const n = activeSpecies(SPECIES, state.hidden).length;
  $('home-count').textContent = `${n} von ${SPECIES.length} Arten werden abgefragt.`;
  show('home');
}

// ---------- Karte ----------

function renderCard(species) {
  state.current = species;
  state.showFeatures = false;
  const inExam = Boolean(state.exam);

  $('fish-img').src = species.img;
  $('length').textContent = `bis ${species.length} cm`;
  $('name').textContent = '★★★★★★';
  $('name').classList.remove('revealed');
  $('arrows').replaceChildren();
  $('features').hidden = true;
  $('hint').hidden = inExam;
  $('stage').classList.toggle('clickable', !inExam);

  $('feature-list').replaceChildren(...species.features.map(f => {
    const li = document.createElement('li');
    li.textContent = f.text;
    if (f.x == null) li.classList.add('text-only');
    return li;
  }));
  $('path').textContent = species.path ? `Weg: ${species.path}` : '';
  $('mnemonic').textContent = species.mnemonic ? `Merkhilfe: ${species.mnemonic}` : '';
  $('mnemonic').hidden = !species.mnemonic;

  const similar = species.similar || [];
  $('btn-similar').hidden = inExam || similar.length === 0;
  $('similar').hidden = true;
  $('similar').replaceChildren(...similar.map(s => {
    const li = document.createElement('li');
    const targets = speciesForSimilar(s.name, SPECIES);
    if (targets.length === 0) {
      const b = document.createElement('strong');
      b.textContent = s.name;
      li.append(b);
    }
    targets.forEach((t, i) => {
      if (i > 0) li.append(' / ');
      const b = document.createElement('button');
      b.type = 'button';
      b.className = 'similar-name';
      b.dataset.id = t.id;
      b.textContent = targets.length > 1 ? t.name : s.name;
      b.title = 'Zum Vergleich unter dem Bild anzeigen';
      b.addEventListener('click', () => toggleCompare(t, s.diff));
      li.append(b);
    });
    li.append(`: ${s.diff}`);
    return li;
  }));
  $('compare').replaceChildren();
  $('card').classList.remove('has-compare');

  $('hide-wrap').hidden = inExam;
  $('hide-current').checked = state.hidden.has(species.id);
  $('exam-rate').hidden = true;
  $('btn-next').hidden = inExam;
  $('progress').textContent = inExam ? `Karte ${state.exam.index + 1} von ${state.exam.cards.length}` : '';
  show('card');
}

// Vergleichsbilder unter dem Hauptbild ein- und ausblenden.
function toggleCompare(species, diff) {
  const box = $('compare');
  const existing = box.querySelector(`[data-id="${species.id}"]`);
  if (existing) existing.remove();
  else {
    const fig = document.createElement('figure');
    fig.className = 'compare-item';
    fig.dataset.id = species.id;
    fig.title = 'Klicken entfernt den Vergleich';
    const img = document.createElement('img');
    img.src = species.img;
    img.alt = species.name;
    const cap = document.createElement('figcaption');
    const b = document.createElement('strong');
    b.textContent = species.name;
    cap.append(b, ` (bis ${species.length} cm): ${diff}`);
    fig.append(img, cap);
    fig.addEventListener('click', () => toggleCompare(species, diff));
    box.append(fig);
  }
  const active = new Set([...box.children].map(c => c.dataset.id));
  for (const b of document.querySelectorAll('.similar-name')) b.classList.toggle('active', active.has(b.dataset.id));
  $('card').classList.toggle('has-compare', active.size > 0);
  redrawArrows();
  if (!existing) box.lastElementChild.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

function toggleFeatures() {
  if (state.exam || !state.current) return;
  state.showFeatures = !state.showFeatures;
  $('features').hidden = !state.showFeatures;
  $('hint').hidden = state.showFeatures;
  redrawArrows();
}

function redrawArrows() {
  if (state.showFeatures && state.current) {
    drawArrows($('stage'), $('fish-img'), $('arrows'), state.current.features);
  } else {
    $('arrows').replaceChildren();
  }
}

function revealName() {
  if (!state.current) return;
  $('name').textContent = state.current.name;
  $('name').classList.add('revealed');
  if (state.exam) $('exam-rate').hidden = false;
}

// ---------- Lernmodus ----------

function learnNext() {
  const pool = activeSpecies(SPECIES, state.hidden);
  const next = nextSpecies(pool, state.current && state.current.id);
  if (!next) { show('empty'); return; }
  renderCard(next);
}

function setHidden(id, hide) {
  if (hide) state.hidden.add(id); else state.hidden.delete(id);
  saveHidden(storage, state.hidden);
}

// ---------- Prüfungsmodus ----------

function startExam() {
  state.exam = { cards: drawExam(SPECIES, 6), index: 0, correct: 0, results: [] };
  state.current = null;
  renderCard(state.exam.cards[0]);
}

function rateExam(right) {
  const ex = state.exam;
  ex.results.push({ name: ex.cards[ex.index].name, right });
  if (right) ex.correct++;
  ex.index++;
  if (ex.index < ex.cards.length) { renderCard(ex.cards[ex.index]); return; }
  const passed = examPassed(ex.correct);
  $('result-title').textContent = passed ? 'Bestanden' : 'Nicht bestanden';
  $('result-text').textContent = `${ex.correct} von ${ex.cards.length} richtig. Zum Bestehen sind mindestens 4 nötig.`;
  $('result-list').replaceChildren(...ex.results.map(r => {
    const li = document.createElement('li');
    li.textContent = `${r.right ? '✓' : '✗'} ${r.name}`;
    li.className = r.right ? 'ok' : 'bad';
    return li;
  }));
  state.exam = null;
  show('result');
}

// ---------- Auswahl ----------

function renderSelect() {
  $('select-list').replaceChildren(...byName.map(s => {
    const label = document.createElement('label');
    const cb = document.createElement('input');
    cb.type = 'checkbox';
    cb.checked = !state.hidden.has(s.id);
    cb.addEventListener('change', () => setHidden(s.id, !cb.checked));
    cb.setAttribute('aria-label', `${s.name} abfragen`);
    const name = document.createElement('button');
    name.type = 'button';
    name.className = 'sel-name';
    name.textContent = s.name;
    name.addEventListener('click', () => openFrom('select', s));
    const row = document.createElement('div');
    row.className = 'sel-row';
    row.append(cb, name);
    return row;
  }));
  show('select');
}

// Karte aus Auswahl oder Baum öffnen: Merkmale und Name gleich sichtbar.
function openFrom(origin, species) {
  state.returnTo = origin;
  state.selectScroll = window.scrollY;
  $('btn-home').textContent = origin === 'select' ? '← Auswahl' : '← Bestimmungsbaum';
  renderCard(species);
  toggleFeatures();
  revealName();
}

function backFromCard() {
  const origin = state.returnTo;
  state.returnTo = null;
  $('btn-home').textContent = '← Menü';
  if (origin === 'select') { renderSelect(); window.scrollTo(0, state.selectScroll || 0); }
  else if (origin === 'baum') {
    if (document.referrer.includes('baum.html') && history.length > 1) history.back();
    else location.href = 'baum.html';
  } else goHome();
}

// ---------- Ereignisse ----------

$('btn-start').addEventListener('click', () => { state.current = null; learnNext(); });
$('btn-exam').addEventListener('click', startExam);
$('btn-exam-again').addEventListener('click', startExam);
$('btn-select').addEventListener('click', renderSelect);
$('btn-empty-select').addEventListener('click', renderSelect);
$('btn-show-all').addEventListener('click', () => { state.hidden.clear(); saveHidden(storage, state.hidden); renderSelect(); });
$('btn-home').addEventListener('click', backFromCard);
for (const b of document.querySelectorAll('.go-home')) b.addEventListener('click', goHome);
$('stage').addEventListener('click', toggleFeatures);
$('fish-img').addEventListener('load', redrawArrows);
$('name').addEventListener('click', revealName);
$('btn-similar').addEventListener('click', () => { $('similar').hidden = !$('similar').hidden; });
$('btn-next').addEventListener('click', learnNext);
$('hide-current').addEventListener('change', e => setHidden(state.current.id, e.target.checked));
$('btn-right').addEventListener('click', () => rateExam(true));
$('btn-wrong').addEventListener('click', () => rateExam(false));
window.addEventListener('resize', redrawArrows);
document.addEventListener('keydown', e => {
  if ($('card').hidden) return;
  if (e.key === 'ArrowRight' && !state.exam) learnNext();
  else if (e.key === ' ') { e.preventDefault(); toggleFeatures(); }
  else if (e.key === 'Enter') revealName();
});

goHome();

// Für Kontrollseite und Tests: ?id=<art>&merkmale=1 öffnet direkt eine Karte.
const params = new URLSearchParams(location.search);
const direct = SPECIES.find(s => s.id === params.get('id'));
if (direct) {
  if (params.get('von') === 'baum') openFrom('baum', direct);
  else {
    renderCard(direct);
    if (params.get('merkmale')) toggleFeatures();
    if (params.get('name')) revealName();
  }
}
