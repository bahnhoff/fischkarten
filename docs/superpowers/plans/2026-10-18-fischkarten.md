# Fischkarten NRW Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Statische Lernseite mit 49 Fischkarten der NRW-Fischerprüfung, Merkmalspfeilen, verdecktem Namen, Ausblenden gelernter Arten, Prüfungsmodus und Bestimmungsbaum.

**Architecture:** Reine HTML/CSS/JS-Seite ohne Build. Reine Logik (Mischen, Filtern, Speichern, Prüfungsauswertung) in `js/deck.js` als ES-Modul, getestet mit `node --test`. UI in `js/app.js`. Artendaten als ES-Modul `data/species.js`, aufgeteilt in vier Gruppendateien. Bilder lokal unter `img/`.

**Tech Stack:** HTML, CSS, JavaScript (ES-Module), Node 25 `node:test` für Logiktests, `sips` für Bildkonvertierung, Chrome headless für Screenshots.

**Spec:** `docs/superpowers/specs/2026-10-18-fischkarten-design.md`

## Global Constraints

- Genau die 49 Arten aus Anlage 3 (Liste: `docs/research/artenliste-laengen-bilder.md`, Abschnitt 2), Namen wie dort.
- Unter dem Bild: `bis <Originallänge> cm`, Werte aus derselben Tabelle. Keine Schonzeiten, keine Mindestmaße.
- Merkmale nur aus `docs/research/merkmale-und-eselsbruecken.md`, jedes mit Quellenkürzel. Nichts erfinden.
- Pfeil nur auf sichtbare Merkmale, sonst Textzeile.
- Layout funktioniert auf Laptop und Smartphone quer (z. B. 844×390) ohne Scrollen in der Kartenansicht.
- Seite läuft über einen einfachen statischen Server (`python3 -m http.server`), ES-Module brauchen kein `file://`.
- Oberflächentexte Deutsch mit echten Umlauten.
- Commit-Nachrichten ohne Trailer, ohne Co-Authored-By, ohne Modellnamen.

## Review Focus

- Alle Arten ausgeblendet: Kartenansicht zeigt Hinweis statt Fehler, Prüfungsmodus nutzt trotzdem alle 49.
- Weiter darf nicht zweimal hintereinander dieselbe Art zeigen, solange mehr als eine Art aktiv ist.
- Kaputter oder fehlender `localStorage`-Eintrag: App startet mit leerer Ausblendliste.
- Pfeile bleiben nach Fenstergrößenänderung auf dem Merkmal (Prozentkoordinaten relativ zum Bild).
- Art ohne Pfeil-Merkmale (nur Text) wird ohne Fehler dargestellt.

---

## Datenschema (gilt für alle Tasks)

```js
// data/species.js exportiert: export const SPECIES = [ ...Species ]
Species = {
  id: 'rotfeder',              // a-z, Bindestrich
  name: 'Rotfeder',
  length: 40,                  // Originallänge cm
  img: 'img/rotfeder.jpg',     // Kopf nach links
  path: 'keine Fettflosse → keine Barteln → Bauchkante gerundet → Maul oberständig',
  features: [                  // nummeriert in Reihenfolge des Bestimmungswegs
    { text: 'Maul oberständig', x: 8, y: 45, src: 'S25' }, // x,y in % des Bildes; ohne x/y = nur Text
  ],
  similar: [ { name: 'Rotauge', diff: 'Rückenflosse beginnt genau über den Bauchflossen' } ],
  mnemonic: '„Fersetzte“ Rückenflosse (Anglerboard)' // optional
}
```

---

### Task 1: Logik `deck.js` mit Tests

**Files:** Create `js/deck.js`, `test/deck.test.js`, `package.json` (`{"type":"module","scripts":{"test":"node --test"}}`), `.gitignore`

**Interfaces – Produces:**
- `activeSpecies(all: Species[], hidden: Set<string>): Species[]`
- `nextSpecies(pool: Species[], currentId: string|null, rand=Math.random): Species|null`  – nie `currentId`, wenn `pool.length > 1`
- `loadHidden(storage): Set<string>` / `saveHidden(storage, hidden: Set<string>)` – Schlüssel `fischkarten.hidden`, bei ungültigem JSON leeres Set
- `drawExam(all: Species[], n=6, rand=Math.random): Species[]` – n verschiedene Arten
- `examPassed(correct: number): boolean` – `correct >= 4`

- [ ] Tests schreiben: Filter; `nextSpecies` 100× ohne Wiederholung; leerer Pool → `null`; `loadHidden` mit `'{kaputt'` → leeres Set; `drawExam` 6 eindeutige IDs; `examPassed(3)===false`, `examPassed(4)===true`.
- [ ] `npm test` → FAIL; implementieren; `npm test` → PASS.
- [ ] `git init`, Commit `Logik für Kartenstapel`.

### Task 2: Bilder laden und normalisieren

**Files:** Create `scripts/fetch-images.sh`, `img/*.jpg`, `img/SOURCES.md`

- [ ] Skript lädt die 49 URLs aus Abschnitt 4 der Bildrecherche (Präfix `https://upload.wikimedia.org/wikipedia/commons/`), `sleep 10` zwischen Abrufen, User-Agent `fischkarten-lernseite/1.0`. Bei 429 einmal nach 60 s wiederholen.
- [ ] Mit `sips` in JPEG umwandeln, auf max. 1200 px Breite, Dateiname `<id>.jpg`. SVG: per Chrome headless rendern.
- [ ] Jedes Bild ansehen; blickt der Fisch nach rechts, mit `sips -f horizontal` spiegeln.
- [ ] `img/SOURCES.md`: Art, Datei-URL, Urheber/Lizenz laut Recherche.
- [ ] Prüfen: `ls img/*.jpg | wc -l` → 49. Commit `Ersatzbilder der 49 Arten`.

### Task 3: Kartenansicht und Prüfungsmodus

**Files:** Create `index.html`, `css/style.css`, `js/app.js`, `data/species.js` (vorläufig mit 2 Beispielarten)

**Interfaces – Consumes:** Task 1, Datenschema.

- [ ] Startbildschirm mit **Start**, **Prüfungsmodus**, **Bestimmungsbaum**, **Fische auswählen**.
- [ ] Karte: Bild in Rahmen, darunter `bis X cm`. Name als `★★★★★`-Feld; Klick deckt auf.
- [ ] Klick auf Bild: SVG-Overlay über dem Bild (`viewBox 0 0 100 100`, `preserveAspectRatio="none"`), pro Merkmal mit x/y Nummernkreis und Pfeil vom Label am oberen/unteren Rand zum Punkt; Labelliste nummeriert neben/unter dem Bild; Text-Merkmale ohne Pfeil in der Liste. Zeile `path` unter der Liste, `mnemonic` falls vorhanden.
- [ ] Button **Ähnliche Fische** klappt `similar` auf, standardmäßig zu.
- [ ] **Weiter** → `nextSpecies`. Alle ausgeblendet → Hinweis „Alle Fische ausgeblendet“ mit Link zur Auswahl.
- [ ] Auswahl-Dialog: Checkbox je Art (alphabetisch), „alle einblenden“; speichert via `saveHidden`.
- [ ] Prüfungsmodus: `drawExam` aus allen 49, Karte ohne Pfeile, Name aufdecken, Buttons **Richtig**/**Falsch**, Ergebnis `x von 6 – bestanden/nicht bestanden`.
- [ ] Layout: Grid Bild links / Bedienung rechts ab Querformat; `@media (max-height: 450px)` kompakte Schrift; Buttons ≥ 44 px.
- [ ] Screenshot per Chrome headless bei 1440×900 und 844×390, ansehen, Commit `Kartenansicht und Prüfungsmodus`.

### Task 4: Artendaten (4 parallele Pakete)

**Files:** Create `data/group-salmoniden.js`, `data/group-weissfische.js`, `data/group-karpfen-boden.js`, `data/group-raub-meer-krebse.js`; Modify `data/species.js` (fügt die vier Arrays zusammen)

Gruppen:
- Salmoniden: Bachforelle, Meerforelle, Lachs, Regenbogenforelle, Bachsaibling, Äsche, Nordseeschnäpel, Hecht, Aal, Bach-/Flussneunauge, Maifisch
- Weißfische: Zährte, Rotauge, Moderlieschen, Hasel, Döbel, Aland, Schneider, Elritze, Rotfeder, Nase, Ukelei, Güster, Brasse, Bitterling, Rapfen
- Karpfen und Boden: Schleie, Gründling, Barbe, Karausche, Giebel, Wildkarpfen, Schmerle, Schlammpeitzger, Steinbeißer, Kessler-Grundel, Groppe, Dreistachliger Stichling, Zwergstichling
- Raubfische, Meer, Krebse: Wels, Quappe, Flussbarsch, Zander, Kaulbarsch, Makrele, Flunder, Kabeljau, Edelkrebs, Amerikanischer Flusskrebs (Kamberkrebs)

- [ ] Pro Art 2–5 Merkmale aus Abschnitt 2 der Merkmal-Recherche; `path` aus Abschnitt 1; `similar` aus Verwechslungspaaren; `mnemonic` nur aus Abschnitt 3.
- [ ] Jedes Bild ansehen und x/y setzen; Merkmal nicht sichtbar → ohne x/y.
- [ ] Test `test/species.test.js`: 49 Einträge, IDs eindeutig, `img` existiert, `length` > 0, x/y in 0–100, jedes Merkmal hat `src`.
- [ ] Screenshot je Art mit Pfeilen prüfen (Kontrollblatt `check.html` rendert alle Karten mit Pfeilen untereinander).
- [ ] `npm test` → PASS. Commit `Artendaten mit Merkmalen`.

### Task 5: Bestimmungsbaum

**Files:** Create `baum.html` (nutzt `css/style.css`)

- [ ] Gekürzter Familienschlüssel (Abschnitt 1A) als verschachtelte Liste mit aufklappbaren `<details>`; Endpunkte nennen die NRW-Arten. Nur Schritte mit NRW-Arten.
- [ ] Link zurück zur Startseite. Screenshot prüfen. Commit `Bestimmungsbaum`.

### Task 6: Abschlussprüfung

- [ ] `npm test` PASS; Server starten, Screenshots Laptop und Handy quer; alle Review-Focus-Punkte manuell prüfen.
- [ ] Code-Review des gesamten Stands; Funde beheben; Commit.
