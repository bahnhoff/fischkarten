// Macht im Bestimmungsbaum die Fischnamen am Ende der Zweige zu Links auf die Karte
// und merkt sich, welche Zweige aufgeklappt sind.
import { SPECIES } from '../data/species.js';

const OPEN_KEY = 'fischkarten.baum.open';

// "Brasse" passt auf "Brasse (Brachse)", "Groppe" auf "Groppe (Mühlkoppe)".
export function speciesForLeaf(leafName, species) {
  return species.find(s => s.name === leafName || s.name.startsWith(`${leafName} (`)) || null;
}

function linkLeaves() {
  for (const leaf of document.querySelectorAll('.leaf')) {
    const text = leaf.textContent;
    const cut = text.lastIndexOf('→ ');
    if (cut < 0) continue;
    const name = text.slice(cut + 2).trim();
    const s = speciesForLeaf(name, SPECIES);
    if (!s) continue;
    const a = document.createElement('a');
    a.href = `index.html?id=${encodeURIComponent(s.id)}&merkmale=1&name=1&von=baum`;
    a.textContent = name;
    leaf.replaceChildren(text.slice(0, cut + 2), a);
  }
}

function restoreOpen() {
  const all = [...document.querySelectorAll('details')];
  try {
    const open = JSON.parse(sessionStorage.getItem(OPEN_KEY) || 'null');
    if (Array.isArray(open)) all.forEach((d, i) => { d.open = open.includes(i); });
  } catch { /* ohne gespeicherten Zustand bleibt die Standardansicht */ }
  for (const d of all) {
    d.addEventListener('toggle', () => {
      try {
        sessionStorage.setItem(OPEN_KEY, JSON.stringify(all.flatMap((x, i) => (x.open ? [i] : []))));
      } catch { /* Speicher nicht verfügbar */ }
    });
  }
}

if (typeof document !== 'undefined') {
  linkLeaves();
  restoreOpen();
}
