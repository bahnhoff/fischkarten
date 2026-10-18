import { test } from 'node:test';
import assert from 'node:assert/strict';
import { newRound, tryPair, roundDone } from '../js/match.js';

const all = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'].map(id => ({ id }));

test('Runde hat n verschiedene Arten, Namen sind dieselben Arten', () => {
  const r = newRound(all, all, 6);
  assert.equal(r.pictures.length, 6);
  assert.equal(new Set(r.pictures.map(s => s.id)).size, 6);
  assert.deepEqual(r.names.map(s => s.id).sort(), r.pictures.map(s => s.id).sort());
});

test('zu kleiner Pool wird aus allen Arten aufgefüllt', () => {
  const r = newRound(all.slice(0, 2), all, 4);
  assert.equal(new Set(r.pictures.map(s => s.id)).size, 4);
  assert.ok(r.pictures.some(s => s.id === 'a') && r.pictures.some(s => s.id === 'b'));
});

test('richtiges Paar wird gelöst, falsches zählt als Fehler', () => {
  const r = newRound(all.slice(0, 2), all, 2);
  assert.equal(tryPair(r, 'a', 'b'), false);
  assert.equal(r.mistakes, 1);
  assert.equal(tryPair(r, 'a', 'a'), true);
  assert.equal(tryPair(r, 'a', 'a'), false, 'bereits gelöst');
  assert.equal(roundDone(r), false);
  tryPair(r, 'b', 'b');
  assert.equal(roundDone(r), true);
  assert.equal(r.mistakes, 1);
});

import { addHighscore, loadHighscores, saveHighscores } from '../js/match.js';

const e = (score, date) => ({ score, rounds: 1, pairs: 4, date });

test('Highscore wird nach Punkten einsortiert, Liste auf 10 begrenzt', () => {
  let list = [];
  for (let i = 0; i < 10; i++) list = addHighscore(list, e(i, `2026-10-0${i % 9 + 1}`)).list;
  const top = e(50, '2026-10-18');
  const r = addHighscore(list, top);
  assert.equal(r.rank, 1);
  assert.equal(r.list.length, 10);
  assert.equal(r.list.at(-1).score, 1);
  assert.equal(addHighscore(r.list, e(0, '2026-10-18')).rank, null);
});

test('bei Gleichstand bleibt das ältere Ergebnis vorn', () => {
  const old = e(5, '2026-10-01');
  const r = addHighscore([old], e(5, '2026-10-18'));
  assert.equal(r.list[0], old);
  assert.equal(r.rank, 2);
});

test('kaputte Highscore-Daten ergeben eine leere Liste', () => {
  assert.deepEqual(loadHighscores({ getItem: () => '{kaputt' }), []);
  assert.deepEqual(loadHighscores(null), []);
  const m = {};
  const st = { getItem: k => m[k] ?? null, setItem: (k, v) => { m[k] = v; } };
  saveHighscores(st, [e(3, '2026-10-18')]);
  assert.equal(loadHighscores(st)[0].score, 3);
});
