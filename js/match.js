// Logik des Zuordnungsspiels: Bilder und Namen paarweise zuordnen.
import { shuffle } from './deck.js';

// Zieht n verschiedene Arten; reicht der Pool nicht, wird mit den übrigen Arten aufgefüllt.
export function newRound(pool, all, n, rand = Math.random) {
  const picked = shuffle(pool, rand).slice(0, n);
  if (picked.length < n) {
    const ids = new Set(picked.map(s => s.id));
    picked.push(...shuffle(all.filter(s => !ids.has(s.id)), rand).slice(0, n - picked.length));
  }
  return { pictures: picked, names: shuffle(picked, rand), solved: new Set(), mistakes: 0 };
}

// Prüft ein Paar und aktualisiert die Runde. Gibt true zurück, wenn es passt.
export function tryPair(round, pictureId, nameId) {
  if (round.solved.has(pictureId) || round.solved.has(nameId)) return false;
  if (pictureId === nameId) {
    round.solved.add(pictureId);
    return true;
  }
  round.mistakes++;
  return false;
}

export function roundDone(round) {
  return round.solved.size === round.pictures.length;
}
