// Artendaten Gruppe salmoniden, Schema siehe docs/superpowers/plans/2026-10-18-fischkarten.md
const LACHSFISCHE = 'Fettflosse → keine Barteln → Rückenflosse nicht länger als der Kopf → Seitenlinie vollständig → auffälliges Muster (Lachsfische)';

export const GROUP = [
  {
    id: 'bachforelle',
    name: 'Bachforelle',
    length: 60,
    img: 'img/bachforelle.jpg',
    path: `${LACHSFISCHE} → Schwanzflosse ohne oder mit wenigen Punkten → Forelle`,
    features: [
      { text: 'Fettflosse vorhanden (Lachsfisch)', x: 73.3, y: 37.4, src: 'S25' },
      { text: 'Maulspalte reicht bis unter die Augenmitte oder weiter', x: 12.9, y: 61.3, src: 'S25' },
      { text: 'Schwanzflosse ohne oder mit nur wenigen Punkten', x: 90.8, y: 53.5, src: 'S25, B11' },
      { text: 'Rote, hell umrandete Flecken neben schwarzen', x: 46.7, y: 53.9, src: 'B11' },
    ],
    similar: [
      { name: 'Regenbogenforelle', diff: 'Viele schwarze Punkte auf der Schwanzflosse, rosaroter Streifen auf der Flanke.' },
      { name: 'Lachs', diff: 'Maulspalte höchstens bis unter die Augenmitte, Schwanzflosse stärker eingebuchtet, Punkte meist oberhalb der Seitenlinie.' },
      { name: 'Bachsaibling', diff: 'Weißer, dahinter schwarz abgesetzter Saum an den bauchseitigen Flossen.' },
    ],
  },
  {
    id: 'meerforelle',
    name: 'Meerforelle',
    length: 100,
    img: 'img/meerforelle.jpg',
    path: `${LACHSFISCHE} → Schwanzflosse ohne oder mit wenigen Punkten → Forelle`,
    features: [
      { text: 'Maulspalte reicht bis unter die Augenmitte oder weiter', x: 13, y: 64, src: 'S25, B11' },
      { text: 'Kiemendeckel läuft eckig aus', x: 22.5, y: 60, src: 'B11' },
      { text: 'Punkte auch unterhalb der Seitenlinie, Körper silbrig', x: 40, y: 64, src: 'S25, B11' },
      { text: 'Breite, dicke Schwanzwurzel', x: 84, y: 57, src: 'S25, B11' },
      { text: 'Schwanzflosse fast gerade', x: 96, y: 56, src: 'S25, B11' },
    ],
    similar: [
      { name: 'Lachs', diff: 'Schlanke Schwanzwurzel, eingebuchtete Schwanzflosse, Maulspalte höchstens bis unter die Augenmitte.' },
      { name: 'Bachforelle', diff: 'Rote, hell umrandete Flecken neben schwarzen statt silbriger Flanke.' },
    ],
  },
  {
    id: 'lachs',
    name: 'Lachs',
    length: 150,
    img: 'img/lachs.jpg',
    path: `${LACHSFISCHE} → Schwanzflosse ohne oder mit wenigen Punkten → Lachs`,
    features: [
      { text: 'Maulspalte reicht höchstens bis unter die Augenmitte', x: 8.6, y: 63, src: 'S25' },
      { text: 'Kiemendeckel gerundet', x: 19.3, y: 61.4, src: 'B11' },
      { text: 'Punkte meist oberhalb der Seitenlinie', x: 39.2, y: 49.9, src: 'S25, B11' },
      { text: 'Schlanke Schwanzwurzel', x: 82.5, y: 55, src: 'S25, B11' },
      { text: 'Schwanzflosse deutlich eingebuchtet', x: 94, y: 57.5, src: 'S25, B11' },
    ],
    similar: [
      { name: 'Meerforelle', diff: 'Breite Schwanzwurzel, fast gerade Schwanzflosse, Punkte auch unterhalb der Seitenlinie.' },
      { name: 'Bachforelle', diff: 'Maulspalte bis unter die Augenmitte oder weiter, rote hell umrandete Flecken.' },
    ],
  },
  {
    id: 'regenbogenforelle',
    name: 'Regenbogenforelle',
    length: 70,
    img: 'img/regenbogenforelle.jpg',
    path: `${LACHSFISCHE} → Schwanzflosse mit vielen schwarzen Punkten`,
    features: [
      { text: 'Schwanzflosse mit vielen kleinen schwarzen Punkten', x: 90.8, y: 51, src: 'S25, B11' },
      { text: 'Punkte auch auf Rücken- und Fettflosse', x: 51.7, y: 18, src: 'B11' },
      { text: 'Rosaroter Streifen auf der Flanke', x: 37.5, y: 51, src: 'B11, SN-Q' },
    ],
    similar: [
      { name: 'Bachforelle', diff: 'Schwanzflosse ohne oder mit nur wenigen Punkten, kein rosaroter Streifen.' },
    ],
  },
  {
    id: 'bachsaibling',
    name: 'Bachsaibling',
    length: 45,
    img: 'img/bachsaibling.jpg',
    path: `${LACHSFISCHE} → Seitenlinienschuppen elliptisch (Saibling) → Kiefer reicht weit hinter das Auge`,
    features: [
      { text: 'Seitenlinienschuppen elliptisch, wenig überlappend', src: 'S25' },
      { text: 'Maulspalte reicht bis hinter das Auge', x: 17.6, y: 63.5, src: 'S25, B11' },
      { text: 'Bauchseitige Flossen mit weißem, dahinter schwarz abgesetztem Saum', x: 32.5, y: 64.3, src: 'B11, S25, SN-Q' },
    ],
    similar: [
      { name: 'Bachforelle', diff: 'Keine weiß-schwarz gesäumten Bauch-, Brust- und Afterflossen.' },
    ],
  },
  {
    id: 'aesche',
    name: 'Äsche',
    length: 60,
    img: 'img/aesche.jpg',
    path: 'Fettflosse → keine Barteln → Rückenflosse sehr groß, länger als der Kopf',
    features: [
      { text: 'Fettflosse vorhanden', x: 75.4, y: 44.6, src: 'S25' },
      { text: 'Rückenflosse sehr groß, länger als der Kopf', x: 50, y: 24.6, src: 'S25' },
      { text: 'Beim Männchen als „Äschenfahne“ ausgezogen', src: 'WP, SN-Q' },
      { text: 'Pupille birnenförmig, nach vorn spitz zulaufend', src: 'WP' },
    ],
    similar: [
      { name: 'Nordseeschnäpel', diff: 'Rückenflosse klein, nicht länger als der Kopf.' },
    ],
  },
  {
    id: 'nordseeschnaepel',
    name: 'Nordseeschnäpel',
    length: 50,
    img: 'img/nordseeschnaepel.jpg',
    path: 'Fettflosse → keine Barteln → Rückenflosse nicht länger als der Kopf → Seitenlinie vollständig → Muster unauffällig (Renken)',
    features: [
      { text: 'Fettflosse vorhanden', x: 74.5, y: 38, src: 'S25' },
      { text: 'Flanke ohne auffälliges Muster', x: 50, y: 54, src: 'S25' },
      { text: 'Schnauze auffallend nasenartig verlängert', x: 4, y: 54, src: 'WP' },
    ],
    similar: [
      { name: 'Forellen und Lachs', diff: 'Deutliches Muster aus Punkten oder Flecken.' },
      { name: 'Äsche', diff: 'Rückenflosse sehr groß, länger als der Kopf.' },
    ],
  },
  {
    id: 'hecht',
    name: 'Hecht',
    length: 150,
    img: 'img/hecht.jpg',
    path: 'keine Fettflosse → keine Stacheln vor der Rückenflosse → eine Rückenflosse → keine Barteln → Maul entenschnabelförmig',
    features: [
      { text: 'Maul lang, entenschnabelförmig', x: 7.5, y: 54, src: 'S25' },
      { text: 'Rückenflosse weit hinten …', x: 73.3, y: 24.4, src: 'S25 (Abbildung)' },
      { text: '… genau über der Afterflosse', x: 75, y: 73, src: 'S25 (Abbildung)' },
    ],
    similar: [],
  },
  {
    id: 'aal',
    name: 'Aal',
    length: 150,
    img: 'img/aal.jpg',
    path: 'Kiemendeckel vorhanden → Schwanzflosse homocerk → Rücken-, Schwanz- und Afterflosse zu einem Saum verwachsen',
    features: [
      { text: 'Rücken-, Schwanz- und Afterflosse zu einem Saum verwachsen', x: 91.3, y: 91, src: 'S25' },
      { text: 'Keine Bauchflossen', src: 'MV' },
    ],
    similar: [
      { name: 'Bach-/Flussneunauge', diff: 'Kein Kiemendeckel, stattdessen 7 runde Kiemenöffnungen, Mundscheibe statt Kiefer.' },
    ],
  },
  {
    id: 'neunauge',
    name: 'Bach-/Flussneunauge',
    length: 40,
    img: 'img/neunauge.jpg',
    path: 'kein Kiemendeckel, stattdessen eine Reihe Kiemenöffnungen → Neunaugen',
    features: [
      { text: 'Kein Kiemendeckel, Reihe aus 7 runden Kiemenöffnungen', x: 25, y: 71.5, src: 'S25, WP' },
      { text: 'Mundscheibe statt Kiefer', x: 5.5, y: 73, src: 'S25, WP' },
      { text: 'Bach- und Flussneunauge nur über Lebensraum und Länge trennbar (Bach bis etwa 19 cm, Fluss bis etwa 45 cm)', src: 'S25' },
    ],
    similar: [
      { name: 'Aal', diff: 'Hat einen Kiemendeckel und Kiefer, Rücken-, Schwanz- und Afterflosse zu einem Saum verwachsen.' },
    ],
  },
  {
    id: 'maifisch',
    name: 'Maifisch',
    length: 70,
    img: 'img/maifisch.jpg',
    path: 'Kiemendeckel vorhanden → Flossen getrennt → Seitenlinie fehlt → Bauchflossen getrennt (Heringsartige)',
    features: [
      { text: 'Seitenlinie fehlt', src: 'S25' },
      { text: 'Bauchflossen getrennt (nicht zur Saugscheibe verwachsen)', x: 42.1, y: 85.3, src: 'S25' },
      { text: 'Großer dunkler Fleck hinter dem Kiemendeckel, manchmal bis zu 6 kleinere dahinter', x: 24.3, y: 41.7, src: 'FK' },
    ],
    similar: [],
  },
];
