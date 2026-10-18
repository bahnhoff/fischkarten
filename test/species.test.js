import { test } from 'node:test';
import assert from 'node:assert/strict';
import { existsSync } from 'node:fs';
import { SPECIES } from '../data/species.js';

test('genau 49 Arten mit eindeutigen IDs', () => {
  assert.equal(SPECIES.length, 49);
  assert.equal(new Set(SPECIES.map(s => s.id)).size, 49);
});

test('jede Art ist vollständig', () => {
  for (const s of SPECIES) {
    assert.ok(s.name, `${s.id}: name fehlt`);
    assert.ok(s.length > 0, `${s.id}: length fehlt`);
    assert.ok(existsSync(new URL(`../${s.img}`, import.meta.url)), `${s.id}: Bild ${s.img} fehlt`);
    assert.ok(s.features.length >= 2 && s.features.length <= 5, `${s.id}: 2 bis 5 Merkmale`);
    for (const f of s.features) {
      assert.ok(f.text && f.src, `${s.id}: Merkmal ohne Text oder Quelle`);
      if (f.x != null || f.y != null) {
        assert.ok(f.x >= 0 && f.x <= 100 && f.y >= 0 && f.y <= 100, `${s.id}: Koordinate außerhalb 0-100`);
      }
    }
  }
});
