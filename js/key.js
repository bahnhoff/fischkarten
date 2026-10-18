// Grafischer Bestimmungsschlüssel: Jede Frage zeigt Antwortkarten mit Beispielbild.
// ex = Art für das Beispielbild, f = Index des Merkmals dieser Art, dessen Punkt markiert wird.
// zoom = Vergrößerung des Ausschnitts (Standard 3, 1 = ganzes Bild).
// next = nächste Frage, species = Ergebnis.
// Grundlage: Stahl et al. 2025 (Museum Koenig), gekürzt auf die NRW-Arten, wie baum.html.

export const START = 'sonderfall';

export const KEY = {
  sonderfall: {
    q: 'Zuerst die Sonderfälle: Trifft eines davon zu?',
    options: [
      { label: 'Nichts davon, ein „normaler“ Fisch', ex: 'rotauge', next: 'kiemendeckel' },
      { label: 'Krebs mit Scheren', ex: 'edelkrebs', next: 'krebse' },
      { label: 'Körper asymmetrisch abgeflacht (Plattfisch)', ex: 'flunder', f: 1, zoom: 1, species: 'flunder' },
      { label: 'Kleine Flössel hinter Rücken- und Afterflosse', ex: 'makrele', f: 0, zoom: 2, species: 'makrele' },
      { label: '3 Rückenflossen, 2 Afterflossen, Kinnbartel', ex: 'kabeljau', f: 0, zoom: 1.3, species: 'kabeljau' },
    ],
  },
  krebse: {
    q: 'Welcher Krebs?',
    options: [
      { label: 'Scherenunterseite und Scherengelenk rot', ex: 'edelkrebs', f: 0, zoom: 2.5, species: 'edelkrebs' },
      { label: 'Dornen seitlich vor der Nackenfurche, rostrote Querbinden', ex: 'kamberkrebs', f: 1, zoom: 2, species: 'kamberkrebs' },
    ],
  },
  kiemendeckel: {
    q: 'Ist ein Kiemendeckel vorhanden?',
    options: [
      { label: 'Ja, Kiemendeckel vorhanden', ex: 'meerforelle', f: 1, next: 'saum' },
      { label: 'Nein, Reihe runder Kiemenöffnungen und Mundscheibe', ex: 'neunauge', f: 0, species: 'neunauge' },
    ],
  },
  saum: {
    q: 'Sind Rücken-, Schwanz- und Afterflosse zu einem Saum verwachsen?',
    options: [
      { label: 'Nein, die Flossen sind getrennt', ex: 'rotauge', next: 'seitenlinie' },
      { label: 'Ja, ein durchgehender Flossensaum', ex: 'aal', f: 0, species: 'aal' },
    ],
  },
  seitenlinie: {
    q: 'Ist eine Seitenlinie vorhanden?',
    options: [
      { label: 'Ja, Seitenlinie vorhanden', ex: 'schneider', f: 0, next: 'fettflosse' },
      { label: 'Nein, keine Seitenlinie', ex: 'maifisch', next: 'ohneSeitenlinie' },
    ],
  },
  ohneSeitenlinie: {
    q: 'Wie sehen die Bauchflossen aus?',
    options: [
      { label: 'Zur Saugscheibe verwachsen', ex: 'kessler-grundel', f: 1, species: 'kessler-grundel' },
      { label: 'Getrennt, dunkler Fleck hinter dem Kiemendeckel', ex: 'maifisch', f: 2, species: 'maifisch' },
    ],
  },
  fettflosse: {
    q: 'Gibt es eine Fettflosse (kleine Flosse zwischen Rücken- und Schwanzflosse)?',
    options: [
      { label: 'Ja, Fettflosse vorhanden', ex: 'bachforelle', f: 0, next: 'mitFettflosse' },
      { label: 'Nein, keine Fettflosse', ex: 'rotauge', next: 'stacheln' },
    ],
  },
  mitFettflosse: {
    q: 'Was fällt an Rückenflosse und Flanke auf?',
    options: [
      { label: 'Rückenflosse sehr groß, länger als der Kopf', ex: 'aesche', f: 1, zoom: 1.6, species: 'aesche' },
      { label: 'Flanke ohne Muster, Schnauze nasenartig', ex: 'nordseeschnaepel', f: 2, species: 'nordseeschnaepel' },
      { label: 'Auffälliges Muster aus Punkten oder Flecken (Lachsfische)', ex: 'bachforelle', f: 3, next: 'lachsfische' },
    ],
  },
  lachsfische: {
    q: 'Welcher Lachsfisch?',
    options: [
      { label: 'Weißer, schwarz abgesetzter Saum an den bauchseitigen Flossen', ex: 'bachsaibling', f: 2, species: 'bachsaibling' },
      { label: 'Viele schwarze Punkte auf der Schwanzflosse, rosa Längsband', ex: 'regenbogenforelle', f: 0, species: 'regenbogenforelle' },
      { label: 'Rote, hell umrandete Flecken neben schwarzen', ex: 'bachforelle', f: 3, species: 'bachforelle' },
      { label: 'Silbrig', ex: 'lachs', next: 'silbrig' },
    ],
  },
  silbrig: {
    q: 'Silbriger Lachsfisch: Wie sehen Schwanzstiel und Schwanzflosse aus?',
    options: [
      { label: 'Dicker Schwanzstiel, Schwanzflosse fast gerade, Punkte auch unter der Seitenlinie', ex: 'meerforelle', f: 3, zoom: 2, species: 'meerforelle' },
      { label: 'Schlanker Schwanzstiel, Schwanzflosse eingebuchtet, Punkte meist über der Seitenlinie', ex: 'lachs', f: 3, zoom: 2, species: 'lachs' },
    ],
  },
  stacheln: {
    q: 'Stehen einzelne Stacheln vor der Rückenflosse?',
    options: [
      { label: 'Nein', ex: 'rotauge', next: 'rueckenflossen' },
      { label: 'Ja, einzelne freie Stacheln (Stichlinge)', ex: 'dreistachliger-stichling', f: 0, zoom: 2, next: 'stichlinge' },
    ],
  },
  stichlinge: {
    q: 'Wie viele Stacheln?',
    options: [
      { label: '2–3 Stacheln', ex: 'dreistachliger-stichling', f: 1, zoom: 2, species: 'dreistachliger-stichling' },
      { label: '7–11 Stacheln', ex: 'zwergstichling', f: 1, zoom: 1.6, species: 'zwergstichling' },
    ],
  },
  rueckenflossen: {
    q: 'Wie viele Rückenflossen?',
    options: [
      { label: 'Eine Rückenflosse', ex: 'rotauge', f: 2, zoom: 1.6, next: 'barteln' },
      { label: 'Zwei Rückenflossen (oder eine zweiteilige)', ex: 'flussbarsch', f: 0, zoom: 1.6, next: 'zweiRueckenflossen' },
    ],
  },
  zweiRueckenflossen: {
    q: 'Zwei Rückenflossen: Was passt?',
    options: [
      { label: 'Eine Bartel am Kinn', ex: 'quappe', f: 1, species: 'quappe' },
      { label: 'Keine Schuppen, breiter Kopf, große Brustflossen', ex: 'groppe', f: 2, species: 'groppe' },
      { label: 'Schuppen, harte Stachelstrahlen (Echte Barsche)', ex: 'zander', f: 0, zoom: 1.6, next: 'barsche' },
    ],
  },
  barsche: {
    q: 'Welcher Barsch?',
    options: [
      { label: 'Schwarzer Fleck am Ende der ersten Rückenflosse, Querbinden', ex: 'flussbarsch', f: 1, zoom: 2, species: 'flussbarsch' },
      { label: 'Große Hundszähne, Maulspalte bis unter das Auge', ex: 'zander', f: 2, species: 'zander' },
      { label: 'Rückenflossen zusammenhängend, viele kleine Flecken', ex: 'kaulbarsch', f: 0, zoom: 1.6, species: 'kaulbarsch' },
    ],
  },
  barteln: {
    q: 'Eine Rückenflosse: Wie viele Barteln am Maul?',
    options: [
      { label: 'Keine Barteln', ex: 'rotauge', f: 0, next: 'ohneBarteln' },
      { label: '2 Barteln (1 Paar)', ex: 'schleie', f: 0, next: 'zweiBarteln' },
      { label: '4 Barteln (2 Paare)', ex: 'wildkarpfen', f: 0, next: 'vierBarteln' },
      { label: '6 sehr lange Barteln, sehr lange Afterflosse', ex: 'wels', f: 1, zoom: 1.5, species: 'wels' },
      { label: '6 oder mehr kurze Barteln (Schmerlen, Steinbeißer)', ex: 'schmerle', f: 0, next: 'schmerlen' },
    ],
  },
  zweiBarteln: {
    q: '2 Barteln: Was passt?',
    options: [
      { label: 'Sehr kleine Schuppen, hochrückig, gerade Schwanzflosse', ex: 'schleie', f: 1, zoom: 2, species: 'schleie' },
      { label: 'Große Schuppen, langgestreckt, dunkle Fleckenreihe', ex: 'gruendling', f: 2, zoom: 2, species: 'gruendling' },
    ],
  },
  vierBarteln: {
    q: '4 Barteln: Wie lang ist die Rückenflosse?',
    options: [
      { label: 'Rückenflosse lang', ex: 'wildkarpfen', f: 1, zoom: 1.8, species: 'wildkarpfen' },
      { label: 'Rückenflosse kurz, Maul unterständig', ex: 'barbe', f: 2, zoom: 2, species: 'barbe' },
    ],
  },
  schmerlen: {
    q: 'Viele kurze Barteln: Welche Zeichnung?',
    options: [
      { label: '6 Barteln am Oberkiefer, dunkel marmoriert', ex: 'schmerle', f: 1, zoom: 2, species: 'schmerle' },
      { label: '6 kurze Barteln, Reihen aus Punkten und Flecken, seitlich stark zusammengedrückt', ex: 'steinbeisser', f: 1, zoom: 2, species: 'steinbeisser' },
      { label: '10 Barteln, breite Längsstreifen', ex: 'schlammpeitzger', f: 1, zoom: 2, species: 'schlammpeitzger' },
    ],
  },
  ohneBarteln: {
    q: 'Keine Barteln: Was fällt auf?',
    options: [
      { label: 'Maul entenschnabelförmig, Rückenflosse weit hinten', ex: 'hecht', f: 0, zoom: 2, species: 'hecht' },
      { label: 'Blaugrünes Längsband auf dem Schwanzstiel, hochrückig', ex: 'bitterling', f: 1, zoom: 1.6, species: 'bitterling' },
      { label: 'Hochrückig, lange Rückenflosse (Karausche, Giebel)', ex: 'karausche', f: 1, zoom: 1.4, next: 'karauscheGiebel' },
      { label: 'Nichts davon (Weißfische)', ex: 'rotauge', next: 'weissfische' },
    ],
  },
  karauscheGiebel: {
    q: 'Wie ist der Rand der Rückenflosse gewölbt?',
    options: [
      { label: 'Nach außen gewölbt (konvex)', ex: 'karausche', f: 1, species: 'karausche' },
      { label: 'Nach innen gewölbt (konkav), silbrig', ex: 'giebel', f: 1, species: 'giebel' },
    ],
  },
  weissfische: {
    q: 'Weißfisch: Wie sehen Schnauze und Unterlippe aus?',
    options: [
      { label: 'Maul gerade, Unterlippe verhornt und scharfkantig, Schnauze nasenartig', ex: 'nase', f: 1, species: 'nase' },
      { label: 'Anders', ex: 'rotauge', f: 0, next: 'bauchkante' },
    ],
  },
  bauchkante: {
    q: 'Wie ist die Bauchkante zwischen Bauch- und Afterflosse?',
    options: [
      { label: 'Scharf gekielt', ex: 'ukelei', f: 2, next: 'gekielt' },
      { label: 'Gerundet', ex: 'rotauge', next: 'gerundet' },
    ],
  },
  gekielt: {
    q: 'Bauchkante gekielt: Welcher Fisch?',
    options: [
      { label: 'Seitenlinie nur über wenige Schuppen, Maul oberständig', ex: 'moderlieschen', f: 0, species: 'moderlieschen' },
      { label: 'Maulspalte extrem weit, bis unter das Auge', ex: 'rapfen', f: 0, species: 'rapfen' },
      { label: 'Dunkle, nasenartige Schnauze, lange Afterflosse', ex: 'zaehrte', f: 0, zoom: 2.5, species: 'zaehrte' },
      { label: 'Seitenlinie doppelt schwarz eingefasst', ex: 'schneider', f: 0, species: 'schneider' },
      { label: 'Hochrückig, Ansätze der paarigen Flossen rötlich, großes Auge', ex: 'guester', f: 0, species: 'guester' },
      { label: 'Schlank, Maul oberständig, silbrig', ex: 'ukelei', f: 0, species: 'ukelei' },
      { label: 'Hochrückig, Flossen grau, kleines Auge', ex: 'brasse', f: 0, species: 'brasse' },
    ],
  },
  gerundet: {
    q: 'Bauchkante gerundet: Welcher Fisch?',
    options: [
      { label: 'Maul oberständig, Rückenflosse hinter den Bauchflossen', ex: 'rotfeder', f: 0, species: 'rotfeder' },
      { label: 'Kleine Schuppen, Rückenflosse weit hinter den Bauchflossen', ex: 'elritze', f: 1, species: 'elritze' },
      { label: 'Afterflosse nach außen gewölbt, große Schuppen, großes Maul', ex: 'doebel', f: 1, zoom: 2.5, species: 'doebel' },
      { label: 'Afterflosse nach innen gewölbt, Maul unterständig, schlank', ex: 'hasel', f: 0, species: 'hasel' },
      { label: 'Maul endständig, Rückenflosse genau über den Bauchflossen', ex: 'rotauge', f: 2, species: 'rotauge' },
      { label: 'Maul endständig, kleinere Schuppen, Afterflosse nach innen gewölbt', ex: 'aland', f: 1, zoom: 2.5, species: 'aland' },
    ],
  },
};

// Weg vom Start zu einer Frage als Liste von Fragen-IDs; ungültige Wege werden abgeschnitten.
export function validPath(ids) {
  const path = [START];
  for (const id of ids.slice(1)) {
    const prev = KEY[path[path.length - 1]];
    if (!KEY[id] || !prev.options.some(o => o.next === id)) break;
    path.push(id);
  }
  return path;
}
