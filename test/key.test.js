import { test } from 'node:test';
import assert from 'node:assert/strict';
import { SPECIES } from '../data/species.js';
import { KEY, START, validPath } from '../js/key.js';

const byId = Object.fromEntries(SPECIES.map(s => [s.id, s]));

test('jede Antwort zeigt auf eine Frage oder eine Art, Beispielbild und Markierung existieren', () => {
  for (const [id, node] of Object.entries(KEY)) {
    for (const o of node.options) {
      assert.ok(Boolean(o.next) !== Boolean(o.species), `${id}: "${o.label}" braucht next oder species`);
      if (o.next) assert.ok(KEY[o.next], `${id}: Frage ${o.next} fehlt`);
      if (o.species) assert.ok(byId[o.species], `${id}: Art ${o.species} fehlt`);
      assert.ok(byId[o.ex], `${id}: Beispielart ${o.ex} fehlt`);
      if (o.f != null) assert.ok(byId[o.ex].features[o.f]?.x != null, `${id}: Merkmal ${o.ex}[${o.f}] ohne Punkt`);
    }
  }
});

test('jede der 49 Arten ist genau einmal erreichbar, jede Frage wird benutzt', () => {
  const seen = [], visited = new Set();
  (function walk(id) {
    visited.add(id);
    for (const o of KEY[id].options) o.species ? seen.push(o.species) : walk(o.next);
  })(START);
  assert.equal(seen.length, 49);
  assert.equal(new Set(seen).size, 49);
  assert.equal(visited.size, Object.keys(KEY).length);
});

test('validPath schneidet ungültige Wege ab', () => {
  assert.deepEqual(validPath(['sonderfall', 'kiemendeckel', 'saum']), ['sonderfall', 'kiemendeckel', 'saum']);
  assert.deepEqual(validPath(['sonderfall', 'saum']), ['sonderfall']);
  assert.deepEqual(validPath(['sonderfall', 'gibtsnicht']), ['sonderfall']);
});
