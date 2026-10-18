import { test } from 'node:test';
import assert from 'node:assert/strict';
import { activeSpecies, nextSpecies, loadHidden, saveHidden, drawExam, examPassed } from '../js/deck.js';

const all = ['a', 'b', 'c', 'd', 'e', 'f', 'g'].map(id => ({ id }));

function memStorage(init = {}) {
  const m = { ...init };
  return { getItem: k => (k in m ? m[k] : null), setItem: (k, v) => { m[k] = String(v); }, m };
}

test('activeSpecies filtert ausgeblendete Arten', () => {
  assert.deepEqual(activeSpecies(all, new Set(['a', 'c'])).map(s => s.id), ['b', 'd', 'e', 'f', 'g']);
});

test('nextSpecies wiederholt nie die aktuelle Art', () => {
  let cur = null;
  for (let i = 0; i < 100; i++) {
    const s = nextSpecies(all, cur);
    assert.notEqual(s.id, cur);
    cur = s.id;
  }
});

test('nextSpecies mit einer Art liefert diese Art', () => {
  assert.equal(nextSpecies([{ id: 'a' }], 'a').id, 'a');
});

test('nextSpecies mit leerem Pool liefert null', () => {
  assert.equal(nextSpecies([], null), null);
});

test('loadHidden mit kaputtem JSON liefert leeres Set', () => {
  assert.equal(loadHidden(memStorage({ 'fischkarten.hidden': '{kaputt' })).size, 0);
});

test('loadHidden ohne Storage liefert leeres Set', () => {
  assert.equal(loadHidden(null).size, 0);
});

test('saveHidden und loadHidden ergeben dasselbe Set', () => {
  const st = memStorage();
  saveHidden(st, new Set(['a', 'b']));
  assert.deepEqual([...loadHidden(st)].sort(), ['a', 'b']);
});

test('drawExam liefert 6 verschiedene Arten', () => {
  const ex = drawExam(all, 6);
  assert.equal(ex.length, 6);
  assert.equal(new Set(ex.map(s => s.id)).size, 6);
});

test('examPassed ab 4 richtigen', () => {
  assert.equal(examPassed(3), false);
  assert.equal(examPassed(4), true);
});
