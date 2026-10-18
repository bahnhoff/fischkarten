// Artendaten Gruppe weissfische, Schema siehe docs/superpowers/plans/2026-10-18-fischkarten.md
export const GROUP = [
  {
    id: 'rotfeder',
    name: 'Rotfeder',
    length: 40,
    img: 'img/rotfeder.jpg',
    path: 'keine Fettflosse → keine Barteln → Weißfisch → Maul oberständig',
    features: [
      { text: 'Maul oberständig (schräg nach oben)', x: 7, y: 48, src: 'S25, SN-A, B11' },
      { text: 'Bauchflossen setzen weiter vorn an …', x: 40, y: 78, src: 'SN-A, B11' },
      { text: '… als die Rückenflosse beginnt (Rückenflosse nach hinten versetzt)', x: 51, y: 24, src: 'SN-A, B11' },
      { text: 'Iris messingfarben bis goldgelb, nicht rot', x: 14, y: 45, src: 'SN-A' },
      { text: 'Flossen kräftig blutrot (Farbe nur zur Bestätigung)', src: 'SN-A, B11' },
    ],
    similar: [
      { name: 'Rotauge', diff: 'Rückenflosse beginnt genau über den Bauchflossen, Maul endständig, Iris rot.' },
    ],
    mnemonic: 'Die RotFeder hat eine „fersetzte“ Rückenflosse (Anglerboard).',
  },
];
