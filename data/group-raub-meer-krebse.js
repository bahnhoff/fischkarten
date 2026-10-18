// Artendaten Gruppe raub-meer-krebse, Schema siehe docs/superpowers/plans/2026-10-18-fischkarten.md
export const GROUP = [
  {
    id: 'wels',
    name: 'Wels',
    length: 300,
    img: 'img/wels.jpg',
    path: 'keine Fettflosse → Körper symmetrisch → eine Rückenflosse → Barteln reichen bis hinter den Brustflossenansatz',
    features: [
      { text: 'Nur eine, sehr kleine Rückenflosse', x: 43.5, y: 16, src: 'S25' },
      { text: '6 Barteln: 2 lange am Oberkiefer (reichen bis hinter den Brustflossenansatz), 4 kurze am Unterkiefer', x: 21.7, y: 70.5, src: 'S25, SN-Q 1288' },
      { text: 'Afterflosse sehr lang', x: 70.8, y: 53.5, src: 'S25' },
    ],
    similar: [
      { name: 'Quappe', diff: 'Nur 1 Bartel am Kinn und 2 Rückenflossen, die zweite lang.' },
    ],
    mnemonic: 'Quappe und Wels: „Die Zahl der Barteln entscheidet.“ (fischkompass.de)',
  },
  {
    id: 'quappe',
    name: 'Quappe',
    length: 60,
    img: 'img/quappe.jpg',
    path: 'keine Fettflosse → Körper symmetrisch → zwei Rückenflossen → Kinnbartel',
    features: [
      { text: 'Zwei Rückenflossen, die zweite lang', x: 39, y: 14, src: 'S25' },
      { text: 'Eine einzelne Bartel am Kinn', x: 3, y: 51, src: 'S25, SN-Q 1288' },
      { text: 'Bauchflossen kehlständig', x: 20, y: 74, src: 'MV' },
    ],
    similar: [
      { name: 'Wels', diff: '6 Barteln, die langen reichen bis hinter den Brustflossenansatz; nur eine sehr kleine Rückenflosse.' },
      { name: 'Kabeljau (Dorsch)', diff: '3 Rückenflossen und 2 Afterflossen, Meeresfisch.' },
    ],
    mnemonic: 'Quappe und Wels: „Die Zahl der Barteln entscheidet.“ (fischkompass.de)',
  },
  {
    id: 'flussbarsch',
    name: 'Flussbarsch',
    length: 50,
    img: 'img/flussbarsch.jpg',
    path: 'keine Fettflosse → zwei Rückenflossen → keine Kinnbartel, Schuppen → Echte Barsche → Rückenflossen getrennt → schwarzer Fleck',
    features: [
      { text: 'Zwei getrennte Rückenflossen', x: 70.8, y: 31.9, src: 'S25' },
      { text: 'Schwarzer Fleck am Hinterende der ersten Rückenflosse', x: 67.3, y: 28.3, src: 'S25, SN-Q 1297' },
      { text: '5–7 dunkle Querbinden auf der Flanke', src: 'S25, B11, SN-Q 1303' },
    ],
    similar: [
      { name: 'Zander', diff: 'Erste Rückenflosse ohne schwarzen Fleck, dafür einzeln stehende Hundszähne.' },
      { name: 'Kaulbarsch', diff: 'Rückenflossen zusammenhängend, viele kleine Flecken statt Querbinden.' },
    ],
  },
  {
    id: 'zander',
    name: 'Zander',
    length: 120,
    img: 'img/zander.jpg',
    path: 'keine Fettflosse → zwei Rückenflossen → Echte Barsche → Rückenflossen getrennt → kein Fleck → Maul endständig → große Eckzähne',
    features: [
      { text: 'Zwei getrennte Rückenflossen', x: 51, y: 25.3, src: 'S25' },
      { text: 'Erste Rückenflosse ohne schwarzen Fleck, Punkte wirken wie Längsstreifen', x: 39.2, y: 14.3, src: 'S25, B11' },
      { text: 'Einzeln stehende Hundszähne, Maulspalte bis unter das Auge', x: 5.4, y: 54.6, src: 'S25, B11' },
      { text: '8–10 Querbinden, bei Erwachsenen blasser', x: 50, y: 47.4, src: 'S25, B11' },
    ],
    similar: [
      { name: 'Flussbarsch', diff: 'Schwarzer Fleck am Hinterende der ersten Rückenflosse, 5–7 kräftige Querbinden.' },
    ],
  },
  {
    id: 'kaulbarsch',
    name: 'Kaulbarsch',
    length: 20,
    img: 'img/kaulbarsch.jpg',
    path: 'keine Fettflosse → zweiteilige Rückenflosse → Echte Barsche → Rückenflosse zusammenhängend',
    features: [
      { text: 'Harte und weiche Rückenflosse zusammenhängend (durch Flossenhaut verbunden)', x: 58.75, y: 31.5, src: 'S25, MV' },
      { text: 'Viele kleine, unregelmäßige Flecken, auch auf Rücken- und Schwanzflosse', x: 40, y: 17.4, src: 'S25, B11, SN-Q 1303' },
      { text: 'Flacherer Nacken', x: 16.7, y: 43.4, src: 'S25' },
      { text: 'Kiemendeckel läuft spitz aus', x: 25, y: 45.3, src: 'S25, B11' },
    ],
    similar: [
      { name: 'Flussbarsch', diff: 'Zwei getrennte Rückenflossen, dunkle Querbinden statt kleiner Flecken.' },
    ],
  },
  {
    id: 'makrele',
    name: 'Makrele',
    length: 50,
    img: 'img/makrele.jpg',
    path: 'Meeresfisch (nicht im Süßwasserschlüssel) → Flössel hinter Rücken- und Afterflosse',
    features: [
      { text: 'Je 5 Flössel hinter der zweiten Rückenflosse und hinter der Afterflosse', x: 75.4, y: 37.6, src: 'WP' },
      { text: 'Querstreifen auf dem Rücken', x: 43.3, y: 36.9, src: 'WP' },
    ],
    similar: [],
  },
  {
    id: 'flunder',
    name: 'Flunder',
    length: 50,
    img: 'img/flunder.jpg',
    path: 'keine Fettflosse → keine Einzelstacheln vor der Rückenflosse → Körper asymmetrisch abgeflacht',
    features: [
      { text: 'Keine Fettflosse, keine einzelnen Stacheln vor der Rückenflosse', src: 'S25' },
      { text: 'Körper asymmetrisch abgeflacht (Plattfisch)', x: 45.8, y: 56.3, src: 'S25' },
    ],
    similar: [],
  },
  {
    id: 'kabeljau',
    name: 'Kabeljau (Dorsch)',
    length: 150,
    img: 'img/kabeljau.jpg',
    path: 'Meeresfisch (nicht im Süßwasserschlüssel) → 3 Rückenflossen, 2 Afterflossen → Kinnbartel',
    features: [
      { text: '3 Rückenflossen', x: 57.5, y: 25.6, src: 'WP' },
      { text: '2 Afterflossen', x: 57.5, y: 80.7, src: 'WP' },
      { text: 'Kräftige Kinnbartel', x: 4.6, y: 65, src: 'WP' },
      { text: 'Helle Seitenlinie', src: 'WP' },
    ],
    similar: [
      { name: 'Quappe', diff: 'Ebenfalls Kinnbartel, aber nur 2 Rückenflossen; Süßwasserfisch.' },
    ],
  },
  {
    id: 'edelkrebs',
    name: 'Edelkrebs',
    length: 16,
    img: 'img/edelkrebs.jpg',
    path: 'Krebs → Scheren vergleichen',
    features: [
      { text: 'Scherengelenk rot', x: 25.4, y: 11.6, src: 'WP, SN-Q 2001' },
      { text: 'Scherenunterseite rot (von oben nicht zu sehen)', src: 'WP, SN-Q 2001' },
    ],
    similar: [
      { name: 'Amerikanischer Flusskrebs (Kamberkrebs)', diff: 'Scherenspitzen orange mit dunklem Band, Dornen seitlich vor der Nackenfurche, rostrote Querbinden auf dem Hinterleib.' },
    ],
  },
  {
    id: 'kamberkrebs',
    name: 'Amerikanischer Flusskrebs (Kamberkrebs)',
    length: 12,
    img: 'img/kamberkrebs.jpg',
    path: 'Krebs → Scheren → Panzer → Hinterleib',
    features: [
      { text: 'Scherenspitzen orange mit dunklem Band (Scheren hier verdeckt)', src: 'WP, SN-Q 2001' },
      { text: 'Kräftige Dornen seitlich vor der Nackenfurche (Wangenbereich)', x: 40.25, y: 56.9, src: 'WP' },
      { text: 'Rostrote Querbinden auf dem Hinterleib', x: 68.3, y: 47.2, src: 'WP' },
    ],
    similar: [
      { name: 'Edelkrebs', diff: 'Scherenunterseite und Scherengelenk rot.' },
    ],
  },
];
