// Artendaten Gruppe weissfische, Schema siehe docs/superpowers/plans/2026-10-18-fischkarten.md
// Quellen der Merkmale: docs/research/merkmale-und-eselsbruecken.md, Bilder: img/SOURCES-weissfische.md
const WF = 'keine Fettflosse → keine Barteln → kein Längsband am Schwanzstiel → Weißfisch';

export const GROUP = [
  {
    id: 'zaehrte',
    name: 'Zährte',
    length: 50,
    img: 'img/zaehrte.jpg',
    path: `${WF} → Bauchkante gekielt → Afterflosse 11–23½ Strahlen → Seitenlinie vollständig → dunkler, nasenartiger Schnauzenfortsatz`,
    features: [
      { text: 'Schnauze mit dunklem, nasenartigem Vorsprung (dunkler Schnauzenbug)', x: 4, y: 53, src: 'S25, SN-A' },
      { text: 'Afterflosse lang, reicht fast bis zur Schwanzflosse (3/17–20 Strahlen)', x: 66, y: 72, src: 'SN-A' },
      { text: 'Lippen ohne Hornüberzug', src: 'SN-A' },
    ],
    similar: [
      { name: 'Nase', diff: 'Unterlippe verhornt und scharfkantig, Afterflosse kurz (3/10–12 Strahlen).' },
    ],
  },
  {
    id: 'rotauge',
    name: 'Rotauge',
    length: 40,
    img: 'img/rotauge.jpg',
    path: `${WF} → Bauchkante gerundet → Maul endständig → Afterflosse konkav → 41–46 Seitenlinienschuppen`,
    features: [
      { text: 'Maul endständig', x: 3.6, y: 57, src: 'SN-A, B11, S25' },
      { text: 'Bauchflossen setzen genau unter …', x: 43.6, y: 72, src: 'SN-A, B11, MV' },
      { text: '… dem Beginn der Rückenflosse an', x: 42.9, y: 25.5, src: 'SN-A, B11, MV' },
      { text: 'Iris rot (Farbe nur zur Bestätigung)', x: 7.1, y: 57.3, src: 'SN-A, B11' },
      { text: 'Etwa 41–46 Schuppen in der Seitenlinie', src: 'S25, B11' },
    ],
    similar: [
      { name: 'Rotfeder', diff: 'Rückenflosse beginnt hinter dem Bauchflossenansatz, Maul oberständig.' },
      { name: 'Aland', diff: 'Mehr als 55 Schuppen in der Seitenlinie (Rotauge etwa 45).' },
    ],
    mnemonic: '„Schau auf das Maul“, dazu die Senkrechte vom Bauchflossenansatz nach oben (Faustregel fischkompass.de).',
  },
  {
    id: 'moderlieschen',
    name: 'Moderlieschen',
    length: 12,
    img: 'img/moderlieschen.jpg',
    path: `${WF} → Bauchkante gekielt → Afterflosse 11–23½ Strahlen → Seitenlinie unvollständig`,
    features: [
      { text: 'Seitenlinie kurz, nur über 7–12 Schuppen hinter dem Kiemendeckel (unvollständig)', x: 26, y: 55, src: 'B11, S25' },
      { text: 'Maul oberständig, Maulspalte steil nach oben', x: 5, y: 53, src: 'B11' },
      { text: 'Blau schimmernder Längsstreifen', x: 65, y: 53, src: 'B11' },
      { text: 'Körper schlank (Bitterling hochrückig)', src: 'S25, B11' },
    ],
    similar: [
      { name: 'Bitterling', diff: 'Ebenfalls kurze Seitenlinie, aber hochrückig und mit blaugrünem Band auf dem Schwanzstiel.' },
    ],
  },
  {
    id: 'hasel',
    name: 'Hasel',
    length: 30,
    img: 'img/hasel.jpg',
    path: `${WF} → Bauchkante gerundet → Afterflosse konkav → Maul leicht unterständig → 8–10½ Afterflossenstrahlen`,
    features: [
      { text: 'Maul unterständig, sehr enge Maulspalte, reicht nur bis vor das Auge', x: 5, y: 56, src: 'SN-A, S25, SN-Q 1211' },
      { text: 'Afterflossenrand nach innen gewölbt (konkav)', x: 68, y: 76, src: 'SN-A, B06' },
      { text: '48–54 Schuppen in der Seitenlinie', x: 50, y: 52, src: 'SN-A, B11' },
    ],
    similar: [
      { name: 'Döbel', diff: 'Afterflossenrand nach außen gewölbt (konvex), Maul groß und endständig.' },
      { name: 'Aland', diff: 'Maul endständig, 55–60 Schuppen in der Seitenlinie.' },
    ],
  },
  {
    id: 'doebel',
    name: 'Döbel',
    length: 60,
    img: 'img/doebel.jpg',
    path: `${WF} → Bauchkante gerundet → Maul endständig → Afterflosse konvex → große Schuppen, Rückenflosse über den Bauchflossen`,
    features: [
      { text: 'Maul endständig, groß und breit', x: 5, y: 56, src: 'SN-A, B06' },
      { text: 'Afterflossenrand nach außen gewölbt (konvex)', x: 68.5, y: 80, src: 'SN-A, S25, B06' },
      { text: 'Große, dunkel umrandete Schuppen (Netzmuster), 44–46 in der Seitenlinie', x: 50, y: 50, src: 'SN-A, B06' },
      { text: 'Rückenflosse beginnt etwa über dem Bauchflossenansatz', x: 44, y: 30.5, src: 'S25' },
    ],
    similar: [
      { name: 'Hasel', diff: 'Afterflossenrand konkav, Maul unterständig mit enger Maulspalte.' },
      { name: 'Aland', diff: 'Afterflossenrand konkav, deutlich kleinere Schuppen (55–60).' },
      { name: 'Rapfen', diff: 'Kleinere Schuppen als der Döbel, Maulspalte bis unter das Auge.' },
      { name: 'Elritze', diff: 'Kleine Schuppen, Rückenflosse beginnt weit hinter den Bauchflossen.' },
    ],
  },
  {
    id: 'aland',
    name: 'Aland',
    length: 80,
    img: 'img/aland.jpg',
    path: `${WF} → Bauchkante gerundet → Maul endständig → Afterflosse konkav → 55–62 Seitenlinienschuppen`,
    features: [
      { text: 'Maul endständig, klein', x: 4, y: 57, src: 'SN-A, B06' },
      { text: 'Afterflossenrand nach innen gewölbt (konkav)', x: 69.8, y: 80, src: 'SN-A, SN-Q 1187' },
      { text: 'Schuppen deutlich kleiner, 55–60 in der Seitenlinie', x: 50, y: 57, src: 'SN-A, B11, S25' },
    ],
    similar: [
      { name: 'Döbel', diff: 'Afterflossenrand konvex, große Schuppen (44–46).' },
      { name: 'Rotauge', diff: 'Nur etwa 45 Schuppen in der Seitenlinie.' },
      { name: 'Hasel', diff: 'Maul unterständig mit sehr enger Maulspalte.' },
    ],
  },
  {
    id: 'schneider',
    name: 'Schneider',
    length: 16,
    img: 'img/schneider.jpg',
    path: `${WF} → Bauchkante gekielt → Afterflosse 11–23½ Strahlen → Seitenlinie vollständig → Seitenlinie schwarz eingefasst`,
    features: [
      { text: 'Seitenlinie mit schwarzen Pigmenten doppelt eingefasst', x: 45, y: 58.5, src: 'S25' },
      { text: 'Ansätze von Brust-, Bauch- und Afterflosse rötlich', x: 21, y: 61.5, src: 'S25' },
      { text: 'Maul endständig', x: 4, y: 55, src: 'FK' },
    ],
    similar: [
      { name: 'Ukelei', diff: 'Maul oberständig mit steiler Maulspalte, Seitenlinie nicht schwarz eingefasst.' },
      { name: 'Moderlieschen', diff: 'Seitenlinie kurz, nur über 7–12 Schuppen.' },
    ],
  },
  {
    id: 'elritze',
    name: 'Elritze',
    length: 14,
    img: 'img/elritze.jpg',
    path: `${WF} → Bauchkante gerundet → Maul endständig → Afterflosse konvex → kleine Schuppen, Rückenflosse weit hinter den Bauchflossen`,
    features: [
      { text: 'Bauchflossen setzen deutlich vor …', x: 41, y: 74, src: 'S25' },
      { text: '… dem Beginn der Rückenflosse an', x: 46, y: 33, src: 'S25' },
      { text: 'Dunkle Flecken bzw. Tupfen auf der Flanke', x: 53, y: 48, src: 'S25, WP' },
      { text: 'Kleine Schuppen', x: 35.5, y: 66, src: 'S25, WP' },
    ],
    similar: [
      { name: 'Döbel (jung)', diff: 'Große Schuppen, Rückenflosse beginnt über den Bauchflossen.' },
    ],
  },
  {
    id: 'rotfeder',
    name: 'Rotfeder',
    length: 40,
    img: 'img/rotfeder.jpg',
    path: `${WF} → Maul oberständig`,
    features: [
      { text: 'Maul oberständig (schräg nach oben)', x: 4, y: 56, src: 'S25, SN-A, B11' },
      { text: 'Bauchflossen setzen weiter vorn an …', x: 43, y: 84, src: 'SN-A, B11' },
      { text: '… als die Rückenflosse beginnt (Rückenflosse nach hinten versetzt)', x: 49, y: 27, src: 'SN-A, B11' },
      { text: 'Iris messingfarben bis goldgelb, nicht rot', x: 10.3, y: 56, src: 'SN-A' },
      { text: 'Flossen kräftig blutrot (Farbe nur zur Bestätigung)', x: 66, y: 82, src: 'SN-A, B11' },
    ],
    similar: [
      { name: 'Rotauge', diff: 'Rückenflosse beginnt genau über den Bauchflossen, Maul endständig, Iris rot.' },
    ],
    mnemonic: 'Die RotFeder hat eine „fersetzte“ Rückenflosse (Anglerboard).',
  },
  {
    id: 'nase',
    name: 'Nase',
    length: 50,
    img: 'img/nase.jpg',
    path: `${WF} → Maul gerade, Unterlippe verhornt, Schnauze nasenartig`,
    features: [
      { text: 'Schnauze nasenartig vorgewölbt', x: 3.5, y: 52, src: 'S25' },
      { text: 'Maul stark unterständig, gerade, Unterlippe verhornt und scharfkantig', x: 6, y: 57.5, src: 'S25, SN-A, B11' },
      { text: 'Afterflosse kurz (3/10–12 Strahlen)', x: 70, y: 74, src: 'SN-A' },
      { text: 'Bauchfell schwarz (innen, nicht sichtbar)', src: 'SN-A' },
    ],
    similar: [
      { name: 'Zährte', diff: 'Ohne verhornte Lippen, dunkler Schnauzenbug, lange Afterflosse (3/17–20 Strahlen).' },
    ],
  },
  {
    id: 'ukelei',
    name: 'Ukelei',
    length: 20,
    img: 'img/ukelei.jpg',
    path: `${WF} → Bauchkante gekielt → Afterflosse 17–20½ Strahlen`,
    features: [
      { text: 'Maul oberständig mit steiler Maulspalte', x: 4.5, y: 51, src: 'B11, MV' },
      { text: 'Großes Auge', x: 9.5, y: 48.5, src: 'B11' },
      { text: 'Bauchkante zwischen Bauch- und Afterflosse scharf und schuppenlos', x: 51, y: 72, src: 'B11, S25' },
      { text: 'Afterflosse beginnt unter der Rückenflosse', x: 54.5, y: 71, src: 'B11' },
    ],
    similar: [
      { name: 'Schneider', diff: 'Seitenlinie schwarz doppelt eingefasst, Maul endständig.' },
      { name: 'Moderlieschen', diff: 'Seitenlinie kurz, nur über 7–12 Schuppen.' },
    ],
    mnemonic: 'Oberständiges Maul: Der Fisch frisst eher an der Oberfläche (Eselsbrücke zur Maulstellung, Blinker).',
  },
  {
    id: 'guester',
    name: 'Güster',
    length: 35,
    img: 'img/guester.jpg',
    path: `${WF} → Bauchkante gekielt → Afterflosse 11–23½ Strahlen → hochrückig, Ansätze der paarigen Flossen orange-rötlich`,
    features: [
      { text: 'Auge groß: Durchmesser so groß wie die Schnauzenlänge oder größer', x: 6, y: 46, src: 'SN-A, B06' },
      { text: 'Brust- und Bauchflossen am Ansatz rötlich', x: 17.5, y: 57, src: 'SN-A, S25' },
      { text: 'Brustflosse reicht nicht bis zum Bauchflossenansatz', x: 30, y: 61, src: 'SN-A' },
      { text: 'Afterflosse mit 3/19–23 Strahlen', src: 'SN-A, S25' },
    ],
    similar: [
      { name: 'Brasse (Brachse)', diff: 'Auge kleiner als die Schnauzenlänge, paarige Flossen grau bis schwarz, Brustflosse reicht bis zur Bauchflosse.' },
    ],
    mnemonic: '„Ist der Augendurchmesser etwa so groß wie der Abstand vom Auge zur Schnauzenspitze, hast du eine Güster vor dir.“ (Faustregel fischkompass.de)',
  },
  {
    id: 'brasse',
    name: 'Brasse (Brachse)',
    length: 70,
    img: 'img/brasse.jpg',
    path: `${WF} → Bauchkante gekielt → Afterflosse 23–48½ Strahlen → 23–30½ Strahlen, Maul vorstülpbar`,
    features: [
      { text: 'Auge klein: Durchmesser kleiner als die Schnauzenlänge', x: 10.5, y: 49, src: 'SN-A, B06' },
      { text: 'Brustflosse reicht bis zum Bauchflossenansatz', x: 36.5, y: 64, src: 'SN-A' },
      { text: 'Paarige Flossen grau bis schwarz', x: 41, y: 86, src: 'SN-A' },
      { text: 'Afterflosse lang (3/23–28 Strahlen)', x: 63, y: 82, src: 'SN-A, S25' },
      { text: 'Maul vorstülpbar', src: 'SN-A, S25' },
    ],
    similar: [
      { name: 'Güster', diff: 'Auge so groß wie die Schnauzenlänge, Flossenansätze rötlich, Brustflosse reicht nicht bis zur Bauchflosse.' },
    ],
  },
  {
    id: 'bitterling',
    name: 'Bitterling',
    length: 9,
    img: 'img/bitterling.jpg',
    path: 'keine Fettflosse → eine Rückenflosse → keine Barteln → bläulich graues Längsband auf dem Schwanzstiel',
    features: [
      { text: 'Hochrückig, keine Barteln', x: 40, y: 22.5, src: 'S25, B11' },
      { text: 'Bläulich graues bis blaugrünes Längsband auf dem Schwanzstiel', x: 68, y: 50.5, src: 'S25' },
      { text: 'Seitenlinie nur über 5–6 Schuppen', src: 'S25' },
    ],
    similar: [
      { name: 'Moderlieschen', diff: 'Ebenfalls kurze Seitenlinie, aber schlanker Körper und oberständiges Maul.' },
    ],
  },
  {
    id: 'rapfen',
    name: 'Rapfen',
    length: 100,
    img: 'img/rapfen.jpg',
    path: `${WF} → Bauchkante gekielt → Afterflosse 11–23½ Strahlen → Seitenlinie vollständig → Höcker auf dem Unterkiefer, Maulspalte bis unter das Auge`,
    features: [
      { text: 'Maul oberständig, extrem weite Maulspalte bis unter das Auge', x: 7, y: 58.5, src: 'B11, S25' },
      { text: 'Höcker auf dem Unterkiefer', src: 'S25' },
      { text: '65–73 Schuppen in der Seitenlinie (kleiner als beim Döbel)', x: 45, y: 50, src: 'B11' },
    ],
    similar: [
      { name: 'Döbel', diff: 'Größere Schuppen (44–46 in der Seitenlinie).' },
    ],
  },
];
