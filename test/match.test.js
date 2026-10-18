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
