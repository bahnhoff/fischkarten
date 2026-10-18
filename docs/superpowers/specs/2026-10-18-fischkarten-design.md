# Fischkarten NRW: Design

## Zweck

Der Benutzer bereitet sich in etwa einer Woche auf die Fischerprüfung in Nordrhein-Westfalen (Prüfungsort Dortmund) vor. Im praktischen Teil liegen sechs von 49 Bildtafeln vor, mindestens vier müssen richtig benannt werden.

Ziel ist nicht "Bild = Name" auswendig lernen, sondern ein Bestimmungsweg im Kopf: Grobe Merkmale schließen Gruppen aus (Fettflosse, Barteln, Anzahl Rückenflossen), feinere Merkmale führen zur Art (Flossenstellung, Maulstellung, Schuppengröße, Farbe).

## Ziele

- Lernkarten für genau die 49 Arten der NRW-Prüfung (Anlage 3 der Verordnung über die Fischerprüfung NRW), inklusive Meeresfische und Krebse.
- Bilder: Die echten Tafelbilder (Fischereiverband NRW) sind online nicht verfügbar, der Benutzer kauft das Kartenset nicht. Deshalb Ersatzbilder: freigestellte, farbige Zeichnungen in Seitenansicht, Kopf nach links, laut Liste in `docs/research/artenliste-laengen-bilder.md`, Abschnitt 4. Bilder lokal im Projekt ablegen. Ein späterer Austausch gegen Fotos der echten Karten muss möglich sein (nur Bilddatei und Pfeilkoordinaten ändern).
- Unter dem Bild steht die Originallänge in cm wie auf der Prüfungstafel (Prüfungsverordnung NRW: „mit Angabe der Originallänge in cm“). Werte aus `docs/research/artenliste-laengen-bilder.md`, Abschnitt 2 (Erfahrungsbericht nach den LFV-Karten, Aland mit Kartenfoto bestätigt).
- Merkmale nur aus belegten Quellen. Keine erfundenen Merkmale oder Eselsbrücken. Belegte Eselsbrücken werden genutzt.
- Desktop (Laptop) und Smartphone im Querformat.

## Nicht-Ziele

- Keine Schonzeiten, keine weiteren Fakten zu den Arten. Sie lenken ab.
- Keine Theoriefragen.

## Lernablauf (Kartenansicht)

1. **Start** zeigt einen zufällig gewählten Fisch. Darunter die Originallänge in cm wie auf der Tafel. Der Name ist mit Sternchen verdeckt.
2. Klick auf das Bild: Alle Merkmale erscheinen gleichzeitig als Pfeile mit kurzer Beschriftung am Bild, in der Reihenfolge des Bestimmungswegs nummeriert.
3. Button **Ähnliche Fische**: blendet Verwechslungspartner und das jeweils unterscheidende Merkmal ein. Standardmäßig ausgeblendet.
4. Klick auf die Sternchen deckt den Namen auf.
5. **Weiter** zeigt den nächsten zufälligen Fisch.
6. Checkbox-Liste aller Arten: gelernte Fische ausblenden, sie erscheinen dann nicht mehr. Der Zustand bleibt im Browser gespeichert.

## Entscheidungen des Assistenten (vom Benutzer nicht ausdrücklich bestätigt)

- **Übersichtsseite Bestimmungsbaum:** kleine Zusatzseite mit dem gekürzten Schlüssel nach Stahl et al. 2025. Jede Karte zeigt ihren Weg als eine Zeile.
- **Prüfungsmodus:** sechs zufällige Karten ohne Pfeile, Name eintippen oder aufdecken und selbst bewerten, Auswertung am Ende (mindestens 4 von 6).
- **Technik:** eine statische Seite (HTML, CSS, JavaScript) ohne Build-Schritt. Daten der Arten in einer eigenen Datei. Pfeilpositionen als relative Koordinaten (Prozent) auf dem Bild, damit sie auf jeder Bildschirmgröße passen.

## Inhaltsquellen

- Merkmale, Schlüssel und Eselsbrücken: `docs/research/merkmale-und-eselsbruecken.md`.
- Artenliste (49 Arten, Anlage 3), Originallängen und Bild-URLs: `docs/research/artenliste-laengen-bilder.md`.

## Regeln für Pfeile und Merkmale

- Pfeile: Merkmale, die auf einem Bild nicht sichtbar sind (z. B. schwarzes Bauchfell, Schuppenzahlen), bekommen keinen Pfeil, sondern höchstens eine Textzeile.
- Wo die Ersatzzeichnung ein Merkmal nicht deutlich zeigt, steht das Merkmal als Text, nicht als Pfeil auf eine falsche Stelle.
- Pro Art 2 bis 5 Merkmale, ausgewählt aus Abschnitt 2 der Merkmal-Recherche, nummeriert in der Reihenfolge des Bestimmungswegs (Abschnitt 1). Jedes Merkmal behält seine Quellenangabe in den Daten.
- Pfeilziele werden pro Bild von Hand als Prozent-Koordinaten gesetzt, nachdem das Bild angesehen wurde.
- Belegte Eselsbrücken (z. B. „Rotfeder hat eine fersetzte Rückenflosse“) stehen als Zusatzzeile bei der jeweiligen Art.
