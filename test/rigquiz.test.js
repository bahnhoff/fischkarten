import { test } from 'node:test';
import assert from 'node:assert/strict';
import { GEAR, KIT, TASKS, TOOLS, MAX_POINTS } from '../js/rigs.js';
import { gearOptions, scoreRig, solution } from '../js/rigquiz.js';

test('Bewertungsbogen ergibt 28 Punkte, 10 Aufgaben vollständig', () => {
  assert.equal([...GEAR, ...KIT].reduce((s, p) => s + p.max, 0), MAX_POINTS);
  assert.deepEqual(TASKS.map(t => t.id), ['A1', 'A2', 'A3', 'A4', 'A5', 'A6', 'A7', 'A8', 'A9', 'A10']);
  for (const t of TASKS) {
    for (const p of GEAR) assert.ok(t.gear[p.key], `${t.id}: ${p.key} fehlt`);
    assert.ok(t.kit.loesen.length > 0);
    for (const id of [t.kit.landehilfe, ...t.kit.loesen].filter(Boolean)) assert.ok(TOOLS.some(x => x.id === id), id);
  }
});

test('Musterlösung jeder Aufgabe ergibt 28 Punkte', () => {
  for (const t of TASKS) {
    const { answers, tools } = solution(t);
    assert.equal(scoreRig(t, answers, tools).total, 28, t.id);
  }
});

test('Auswahl enthält die richtige Lösung genau einmal und keine Doppelten', () => {
  for (const t of TASKS) for (const p of GEAR) {
    const opts = gearOptions(t, p.key);
    assert.equal(opts.filter(o => o === t.gear[p.key]).length, 1);
    assert.equal(new Set(opts).size, opts.length);
    assert.ok(opts.length >= 2, `${t.id} ${p.key}: zu wenige Möglichkeiten`);
  }
});

test('falsches Stahlvorfach kostet 3 Punkte, ein Fehler mehr heißt durchgefallen', () => {
  const a5 = TASKS.find(t => t.id === 'A5');
  const { answers, tools } = solution(a5);
  const r1 = scoreRig(a5, { ...answers, vorfach: 'x' }, tools);
  assert.equal(r1.total, 25);
  assert.equal(r1.passed, true);
  const r2 = scoreRig(a5, { ...answers, vorfach: 'x', wirbel: 'x' }, tools);
  assert.equal(r2.passed, false);
});

test('Zubehör: falsche Landehilfe, fehlende Rachensperre, falsche Reihenfolge', () => {
  const a5 = TASKS.find(t => t.id === 'A5');
  const { answers } = solution(a5);
  const pts = tools => Object.fromEntries(scoreRig(a5, answers, tools).rows.filter(r => r.n >= 10).map(r => [r.n, r.points]));
  assert.equal(pts(['gaff', 'metermass', 'schlagholz', 'messer', 'rachensperre', 'loesezange'])[10], 0);
  assert.equal(pts(['unterfangkescher', 'metermass', 'schlagholz', 'messer', 'loesezange'])[14], 0);
  assert.equal(pts(['unterfangkescher', 'schlagholz', 'metermass', 'messer', 'rachensperre', 'loesezange'])[16], 0);
});

test('A6: Rachensperre mit und ohne richtig; A10: Kescher ist falsch', () => {
  const a6 = TASKS.find(t => t.id === 'A6');
  const s6 = solution(a6);
  assert.equal(scoreRig(a6, s6.answers, s6.tools).total, 28);
  const withRs = ['unterfangkescher', 'metermass', 'schlagholz', 'messer', 'rachensperre', 'loesezange'];
  assert.equal(scoreRig(a6, s6.answers, withRs).total, 28);
  const a10 = TASKS.find(t => t.id === 'A10');
  const s10 = solution(a10);
  assert.equal(scoreRig(a10, s10.answers, ['unterfangkescher', ...s10.tools]).total, 27);
});
