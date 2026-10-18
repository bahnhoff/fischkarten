import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { SPECIES } from '../data/species.js';
import { speciesByName as speciesForLeaf, speciesForSimilar } from '../js/names.js';

const html = readFileSync(new URL('../baum.html', import.meta.url), 'utf8');
const leafNames = [...html.matchAll(/class="leaf">[^<]*→ ([^<]+)</g)].map(m => m[1].trim());

test('jeder Zweig im Baum führt zu genau einer Art, alle 49 Arten kommen vor', () => {
  const ids = leafNames.map(n => {
    const s = speciesForLeaf(n, SPECIES);
    assert.ok(s, `keine Art für "${n}"`);
    return s.id;
  });
  assert.equal(new Set(ids).size, 49);
});

test('Kurzname findet Art mit Zusatz in Klammern', () => {
  assert.equal(speciesForLeaf('Brasse', SPECIES).id, 'brasse');
  assert.equal(speciesForLeaf('Gibt es nicht', SPECIES), null);
});

test('Verwechslungsnamen werden aufgelöst', () => {
  assert.deepEqual(speciesForSimilar('Karausche / Giebel', SPECIES).map(s => s.id), ['karausche', 'giebel']);
  assert.deepEqual(speciesForSimilar('Döbel (jung)', SPECIES).map(s => s.id), ['doebel']);
  assert.deepEqual(speciesForSimilar('Forellen und Lachs', SPECIES).map(s => s.id), ['lachs']);
});
