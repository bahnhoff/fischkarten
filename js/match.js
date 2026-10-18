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

// ---------- Highscores ----------

const HIGHSCORE_KEY = 'fischkarten.highscores';
export const HIGHSCORE_MAX = 10;

// Fügt ein Ergebnis ein (höhere Punkte zuerst, bei Gleichstand das ältere zuerst).
// Gibt die neue Liste und den Platz (1-basiert) zurück; rank ist null, wenn es nicht in die Liste kommt.
export function addHighscore(list, entry, max = HIGHSCORE_MAX) {
  const next = [...list, entry].sort((a, b) => b.score - a.score || a.date.localeCompare(b.date)).slice(0, max);
  const i = next.indexOf(entry);
  return { list: next, rank: i < 0 ? null : i + 1 };
}

export function loadHighscores(storage) {
  try {
    const list = JSON.parse(storage.getItem(HIGHSCORE_KEY) || '[]');
    return Array.isArray(list) ? list.filter(e => typeof e.score === 'number' && typeof e.date === 'string') : [];
  } catch {
    return [];
  }
}

export function saveHighscores(storage, list) {
  try {
    storage.setItem(HIGHSCORE_KEY, JSON.stringify(list));
  } catch {
    // Speicher nicht verfügbar, Liste gilt nur für diese Sitzung.
  }
}
