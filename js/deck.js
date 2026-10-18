// Reine Logik für Kartenstapel, Ausblendliste und Prüfungsmodus.

const HIDDEN_KEY = 'fischkarten.hidden';

export function activeSpecies(all, hidden) {
  return all.filter(s => !hidden.has(s.id));
}

export function nextSpecies(pool, currentId, rand = Math.random) {
  if (pool.length === 0) return null;
  const candidates = pool.length > 1 ? pool.filter(s => s.id !== currentId) : pool;
  return candidates[Math.floor(rand() * candidates.length)];
}

export function loadHidden(storage) {
  try {
    const ids = JSON.parse(storage.getItem(HIDDEN_KEY) || '[]');
    return new Set(Array.isArray(ids) ? ids : []);
  } catch {
    return new Set();
  }
}

export function saveHidden(storage, hidden) {
  try {
    storage.setItem(HIDDEN_KEY, JSON.stringify([...hidden]));
  } catch {
    // Speicher nicht verfügbar, Auswahl gilt nur für diese Sitzung.
  }
}

export function shuffle(list, rand = Math.random) {
  const a = [...list];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function drawExam(all, n = 6, rand = Math.random) {
  return shuffle(all, rand).slice(0, n);
}

export function examPassed(correct) {
  return correct >= 4;
}
