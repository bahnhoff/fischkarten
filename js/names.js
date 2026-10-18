// Ordnet Namen aus Baum und Verwechslungslisten den Arten zu.

// "Brasse" passt auf "Brasse (Brachse)", "Groppe" auf "Groppe (Mühlkoppe)".
export function speciesByName(name, species) {
  return species.find(s => s.name === name || s.name.startsWith(`${name} (`)) || null;
}

// "Karausche / Giebel" → zwei Arten, "Döbel (jung)" → Döbel, unbekannte Namen entfallen.
export function speciesForSimilar(name, species) {
  return name
    .replace(/\s*\((jung|Jungfisch)\)/g, '')
    .split(/\s*\/\s*|\s+und\s+/)
    .map(n => speciesByName(n.trim(), species))
    .filter(Boolean);
}
