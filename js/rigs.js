// Gerätezusammenstellung für den praktischen Teil (Anlage 2 der Prüfungsverordnung NRW).
// Lösungen: Mehrheitslösung der Quellen ab 2015 laut docs/research/geraetezusammenstellung.md.
// Kein amtliches Lösungsblatt verfügbar; abweichende Angaben stehen in `alt`.

// Positionen und Punkte laut amtlichem Bewertungsbogen.
export const GEAR = [
  { key: 'rute', n: 1, label: 'Rute', max: 3 },
  { key: 'rolle', n: 2, label: 'Rolle', max: 3 },
  { key: 'schnur', n: 3, label: 'Schnur', max: 3 },
  { key: 'biss', n: 4, label: 'Bissanzeiger', max: 1 },
  { key: 'beschwerung', n: 5, label: 'Beschwerung', max: 1 },
  { key: 'vorfach', n: 6, label: 'Vorfach', max: 3 },
  { key: 'wirbel', n: 7, label: 'Wirbel', max: 1 },
  { key: 'haken', n: 8, label: 'Haken', max: 1 },
  { key: 'koeder', n: 9, label: 'Köder', max: 1 },
];

export const KIT = [
  { key: 'landehilfe', n: 10, label: 'Landehilfe', max: 1 },
  { key: 'messen', n: 11, label: 'Messen', max: 2 },
  { key: 'betaeuben', n: 12, label: 'Betäuben', max: 2 },
  { key: 'toeten', n: 13, label: 'Töten', max: 2 },
  { key: 'rachensperre', n: 14, label: 'Rachensperre', max: 1 },
  { key: 'loesen', n: 15, label: 'Haken entfernen', max: 1 },
  { key: 'reihenfolge', n: 16, label: 'Reihenfolge', max: 2 },
];

export const MAX_POINTS = 28;
export const PASS_POINTS = 25;

// Zubehörkiste: step = Platz in der Reihenfolge der Handgriffe nach dem Fang.
export const TOOLS = [
  { id: 'unterfangkescher', label: 'Unterfangkescher', group: 'landehilfe', step: 1 },
  { id: 'watkescher', label: 'Watkescher', group: 'landehilfe', step: 1 },
  { id: 'gaff', label: 'Gaff', group: 'landehilfe', step: 1 },
  { id: 'metermass', label: 'Metermaß', group: 'messen', step: 2 },
  { id: 'schlagholz', label: 'Schlagholz', group: 'betaeuben', step: 3 },
  { id: 'messer', label: 'Messer', group: 'toeten', step: 4 },
  { id: 'rachensperre', label: 'Rachensperre', group: 'rachensperre', step: 5 },
  { id: 'hakenloeser', label: 'Hakenlöser (Stab)', group: 'loesen', step: 6 },
  { id: 'loesezange', label: 'Lösezange', group: 'loesen', step: 6 },
  { id: 'arterienklemme', label: 'Arterienklemme', group: 'loesen', step: 6 },
];

export const ORDER_TEXT = 'Landen → Messen → Betäuben → Töten → Rachensperre → Haken entfernen';

const ENTF = 'entfällt';

export const TASKS = [
  {
    id: 'A1', title: 'Beringte leichte Rute', fish: 'Rotauge, Rotfeder, Brasse',
    gear: {
      rute: 'Beringte Rute (Tele), 4–7 m, Wurfgewicht bis 20 g',
      rolle: 'Kleine Stationärrolle',
      schnur: 'Tragkraft 2–6 kg (Prüfungsrolle 3,6 kg)',
      biss: 'Pose 1–3,5 g',
      beschwerung: 'Bleischrot',
      vorfach: 'Dünner als die Hauptschnur, mit kleinem Haken',
      wirbel: 'Kleiner Wirbel (Gr. 12)',
      haken: 'Größe 10 und kleiner',
      koeder: 'Made (auch Teig, Wurm, Kartoffel)',
    },
    alt: {
      wirbel: 'Ältere Quellen und Prüfer in Rheine: kein Wirbel.',
      biss: 'Nur feststehende Posenmontage.',
    },
    kit: { landehilfe: 'unterfangkescher', rachensperre: false, loesen: ['hakenloeser'] },
  },
  {
    id: 'A2', title: 'Feederrute', fish: 'Rotauge, Rotfeder, Brasse',
    gear: {
      rute: 'Feederrute, 2,7–3,0 m, Wurfgewicht bis 80 g',
      rolle: 'Kleine Stationärrolle',
      schnur: 'Tragkraft 2–6 kg (Prüfungsrolle 3,6 kg)',
      biss: 'Rutenspitze (Feederspitze)',
      beschwerung: 'Futterkorb ca. 20 g (mit Perle)',
      vorfach: 'Dünner als die Hauptschnur, mit kleinem Haken',
      wirbel: 'Kleiner Wirbel (Gr. 12)',
      haken: 'Größe 10 und kleiner',
      koeder: 'Made, Teig (auch Wurm)',
    },
    alt: {
      rute: 'Seit 2015 Feederrute statt Schwingspitzenrute; die alte Rute wird mit eingesteckter Feederspitze weiterverwendet.',
    },
    kit: { landehilfe: 'unterfangkescher', rachensperre: false, loesen: ['hakenloeser'] },
  },
  {
    id: 'A3', title: 'Rute für Karpfen', fish: 'Karpfen',
    gear: {
      rute: 'Beringte Rute (Tele), 3,3–3,9 m, Wurfgewicht 20–60/70 g',
      rolle: 'Große Stationärrolle',
      schnur: 'Tragkraft 9–17 kg (Prüfungsrolle 11,3 kg)',
      biss: 'Pose 5–10 g',
      beschwerung: 'Bleischrot',
      vorfach: 'Dünner als die Hauptschnur, mit mittlerem Haken',
      wirbel: 'Mittlerer Wirbel (Gr. 6)',
      haken: 'Größe 6 und größer',
      koeder: 'Mais (auch Teig, Wurm, Kartoffel)',
    },
    alt: {
      wirbel: 'Ältere Quellen und Prüfer in Rheine: kein Wirbel.',
      biss: 'Eine ältere Kursmitschrift nennt eine Laufpose 7,5–10 g.',
    },
    kit: { landehilfe: 'unterfangkescher', rachensperre: false, loesen: ['hakenloeser', 'loesezange', 'arterienklemme'] },
  },
  {
    id: 'A4', title: 'Grundrute für Aale', fish: 'Aal',
    gear: {
      rute: 'Grundrute (Steck), 2,0–2,7 m, Wurfgewicht 40–80 g',
      rolle: 'Große Stationärrolle',
      schnur: 'Tragkraft 9–17 kg (Prüfungsrolle 11,3 kg)',
      biss: ENTF,
      beschwerung: 'Laufblei mit Perle',
      vorfach: 'Dünner als die Hauptschnur, mit mittlerem Haken',
      wirbel: 'Mittlerer Wirbel (Gr. 6)',
      haken: 'Größe 6 und größer',
      koeder: 'Wurm (auch toter Fisch)',
    },
    alt: {
      biss: 'Eine Aalglocke ist denkbar, wurde laut einem Prüfling aber nicht verlangt.',
      rute: 'Wurfgewichte 60 / 40 / 20 g für A4 / A5 / A6 stammen aus dem Herner Prüfungsset 2021. Eine Vereinstabelle nennt für die Hechtrute ebenfalls 60 g. Sicher ist: A6 ist die kürzeste und leichteste Steckrute.',
    },
    kit: { landehilfe: 'unterfangkescher', rachensperre: false, loesen: ['loesezange', 'hakenloeser'] },
  },
  {
    id: 'A5', title: 'Spinnrute für Hechte', fish: 'Hecht',
    gear: {
      rute: 'Spinnrute, 2,4–3,0 m, Wurfgewicht 40–80 g',
      rolle: 'Große Stationärrolle',
      schnur: 'Tragkraft 9–17 kg (Prüfungsrolle 11,3 kg)',
      biss: ENTF,
      beschwerung: ENTF,
      vorfach: 'Stahlvorfach 40 cm, Tragkraft unter 11,3 kg',
      wirbel: 'Passend zum Stahlvorfach (2 Stück)',
      haken: 'Entfällt (am Köder)',
      koeder: 'Blinker oder großer Spinner',
    },
    why: {
      vorfach: 'Laut LFV gilt „mindestens 40 cm bei Kunstköder“. Im Gerätesatz liegen absichtlich auch 10- und 20-cm-Stahlvorfächer als falsche Lösung.',
      rachensperre: 'Beim Hecht in allen Quellen verlangt; sie kommt vor den Hakenlöser.',
    },
    alt: {
      vorfach: 'Vor 2015 reichten 15 cm.',
      rute: 'Wurfgewicht 40 g laut Herner Prüfungsset 2021, eine Vereinstabelle nennt 60 g (Spanne 40–80 g).',
    },
    kit: { landehilfe: 'unterfangkescher', rachensperre: true, loesen: ['loesezange'] },
  },
  {
    id: 'A6', title: 'Spinnrute für Barsche', fish: 'Barsch',
    gear: {
      rute: 'Spinnrute, bis 2,1 m, Wurfgewicht 10–30 g',
      rolle: 'Mittlere Stationärrolle',
      schnur: 'Tragkraft 5–6 kg (Prüfungsrolle 5,4 kg)',
      biss: ENTF,
      beschwerung: ENTF,
      vorfach: 'Stahlvorfach 40 cm, Tragkraft unter 5,4 kg',
      wirbel: 'Passend zum Stahlvorfach (2 Stück)',
      haken: 'Entfällt (am Köder)',
      koeder: 'Kleiner Spinner',
    },
    why: {
      vorfach: 'Beim Spinnfischen auf Barsch kann ein Hecht beißen.',
    },
    alt: {
      rachensperre: 'Strittig: Quellen ab 2015 verlangen sie (ein Hecht könnte beißen), ältere Quellen und einzelne Prüfer nicht. Hier zählt beides als richtig.',
    },
    kit: { landehilfe: 'unterfangkescher', rachensperre: 'optional', loesen: ['loesezange', 'arterienklemme'] },
  },
  {
    id: 'A7', title: 'Fliegenrute, Trockenfischen', fish: 'Forelle',
    gear: {
      rute: 'Fliegenrute, 2,4–2,7 m',
      rolle: 'Fliegenrolle',
      schnur: 'Schwimmende Fliegenschnur (hell)',
      biss: ENTF,
      beschwerung: ENTF,
      vorfach: 'Fliegenvorfach, schwimmend (hell)',
      wirbel: ENTF,
      haken: 'Entfällt (in der Fliege)',
      koeder: 'Trockenfliege',
    },
    why: {
      wirbel: 'Fliegenschnur und Vorfach werden mit einer Schlaufe verbunden.',
      koeder: 'Die Trockenfliege ist buschiger als die Nassfliege.',
    },
    kit: { landehilfe: 'watkescher', rachensperre: false, loesen: ['arterienklemme'] },
  },
  {
    id: 'A8', title: 'Fliegenrute, Nassfischen', fish: 'Forelle',
    gear: {
      rute: 'Fliegenrute, 2,4–2,7 m',
      rolle: 'Fliegenrolle',
      schnur: 'Sinkende Fliegenschnur (dunkel)',
      biss: ENTF,
      beschwerung: ENTF,
      vorfach: 'Fliegenvorfach, sinkend (dunkel)',
      wirbel: ENTF,
      haken: 'Entfällt (in der Fliege)',
      koeder: 'Nassfliege',
    },
    why: {
      koeder: 'Die Nassfliege wirkt drahtiger, weniger buschig.',
    },
    kit: { landehilfe: 'watkescher', rachensperre: false, loesen: ['arterienklemme'] },
  },
  {
    id: 'A9', title: 'Rute für Dorsche (Pilkrute)', fish: 'Dorsch',
    gear: {
      rute: 'Pilkrute, 2,0–3,0 m, Wurfgewicht 100–200 g',
      rolle: 'Multirolle (oder schwere Stationärrolle)',
      schnur: 'Tragkraft 19–21 kg',
      biss: ENTF,
      beschwerung: 'Entfällt (der Pilker bringt das Gewicht)',
      vorfach: ENTF,
      wirbel: 'Meereswirbel 1/0–3/0',
      haken: 'Entfällt (Drilling am Pilker)',
      koeder: 'Pilker',
    },
    alt: {
      rolle: 'Je nach Prüfungsort Multirolle oder Meeresstationärrolle.',
    },
    kit: { landehilfe: 'gaff', rachensperre: false, loesen: ['loesezange'] },
  },
  {
    id: 'A10', title: 'Brandungsrute', fish: 'Plattfische',
    gear: {
      rute: 'Brandungsrute, 3,6–5,0 m, Wurfgewicht 100–250 g',
      rolle: 'Große (schwere) Stationärrolle',
      schnur: 'Tragkraft 6–14 kg, dazu Schlagschnur 15–20 kg',
      biss: ENTF,
      beschwerung: 'Brandungsblei 100–150 g',
      vorfach: 'Brandungsvorfach mit Schlagschnur',
      wirbel: 'Meereswirbel 1/0–3/0',
      haken: 'Größe 1/0 und größer',
      koeder: 'Wattwurm',
    },
    why: {
      landehilfe: 'Am Strand wird der Fisch mit der Hand gelandet, ein Kescher entfällt.',
    },
    alt: {
      rolle: 'Im Herner Prüfungsset 2021 gab es nur kleine, mittlere und große (schwere) Stationärrollen, für A10 die große. Manche Quellen nennen auch die Multirolle.',
      wirbel: 'Ein Wirbel reicht laut einem Prüfling; im Märkischen Kreis verlangten Prüfer 2015 zwei.',
    },
    kit: { landehilfe: null, rachensperre: false, loesen: ['loesezange'] },
  },
];

export const toolById = id => TOOLS.find(t => t.id === id);

// Text der Zubehör-Lösung für Anzeige.
export function kitSolution(task) {
  const lh = task.kit.landehilfe ? toolById(task.kit.landehilfe).label : ENTF;
  const rs = task.kit.rachensperre === true ? 'ja' : task.kit.rachensperre === 'optional' ? 'strittig (ja oder nein)' : ENTF;
  return {
    landehilfe: lh,
    messen: 'Metermaß',
    betaeuben: 'Schlagholz',
    toeten: 'Messer (Herzstich oder Kiemenschnitt)',
    rachensperre: rs,
    loesen: task.kit.loesen.map(id => toolById(id).label).join(' oder '),
    reihenfolge: ORDER_TEXT,
  };
}

// Merkform: kurze Antworten, so wie man die Teile am Prüfungstisch erkennt.
// Grundlage: Mehrheitslösung (gear) und Erkennungstipps aus dem Herner Erfahrungsbericht 2021.
// Gleiche Texte bei mehreren Aufgaben bedeuten dasselbe Teil.
const E = 'entfällt';
export const SHORT = {
  A1: { rute: 'Teleskoprute, die längste', rolle: 'Kleine Stationärrolle', schnur: 'Dünn (3,6 kg)', biss: 'Kleine Pose (1–3,5 g)',
    beschwerung: 'Bleischrot', vorfach: 'Dünner als die Hauptschnur, kleiner Haken', wirbel: 'Kleiner Wirbel',
    haken: 'Klein (Gr. 10 und kleiner)', koeder: 'Made' },
  A2: { rute: 'Feederrute (weiche, farbige Spitze)', rolle: 'Kleine Stationärrolle', schnur: 'Dünn (3,6 kg)', biss: 'Rutenspitze',
    beschwerung: 'Futterkorb (ca. 20 g)', vorfach: 'Dünner als die Hauptschnur, kleiner Haken', wirbel: 'Kleiner Wirbel',
    haken: 'Klein (Gr. 10 und kleiner)', koeder: 'Made oder Teig' },
  A3: { rute: 'Teleskoprute, die kürzere (kräftiger)', rolle: 'Große Stationärrolle', schnur: 'Dick (11,3 kg)', biss: 'Größere Pose (5–10 g)',
    beschwerung: 'Bleischrot', vorfach: 'Dünner als die Hauptschnur, mittlerer Haken', wirbel: 'Mittlerer Wirbel',
    haken: 'Mittel (Gr. 6 und größer)', koeder: 'Mais' },
  A4: { rute: 'Steckrute, Wurfgewicht 60 g', rolle: 'Große Stationärrolle', schnur: 'Dick (11,3 kg)', biss: E,
    beschwerung: 'Laufblei mit Perle', vorfach: 'Dünner als die Hauptschnur, mittlerer Haken', wirbel: 'Mittlerer Wirbel',
    haken: 'Mittel (Gr. 6 und größer)', koeder: 'Wurm' },
  A5: { rute: 'Steckrute, Wurfgewicht 40 g', rolle: 'Große Stationärrolle', schnur: 'Dick (11,3 kg)', biss: E,
    beschwerung: E, vorfach: 'Stahlvorfach 40 cm', wirbel: '2 Wirbel zum Stahlvorfach',
    haken: 'Entfällt (am Köder)', koeder: 'Großer Spinner oder Blinker' },
  A6: { rute: 'Steckrute, die kürzeste (Wurfgewicht 20 g)', rolle: 'Mittlere Stationärrolle', schnur: 'Mittel (5,4 kg)', biss: E,
    beschwerung: E, vorfach: 'Stahlvorfach 40 cm', wirbel: '2 Wirbel zum Stahlvorfach',
    haken: 'Entfällt (am Köder)', koeder: 'Kleiner Spinner' },
  A7: { rute: 'Fliegenrute', rolle: 'Fliegenrolle', schnur: 'Fliegenschnur hell, schwimmend', biss: E,
    beschwerung: E, vorfach: 'Fliegenvorfach, schwimmend', wirbel: E,
    haken: 'Entfällt (in der Fliege)', koeder: 'Trockenfliege (buschig)' },
  A8: { rute: 'Fliegenrute', rolle: 'Fliegenrolle', schnur: 'Fliegenschnur dunkel, sinkend', biss: E,
    beschwerung: E, vorfach: 'Fliegenvorfach, sinkend', wirbel: E,
    haken: 'Entfällt (in der Fliege)', koeder: 'Nassfliege (drahtig)' },
  A9: { rute: 'Pilkrute (kräftigste, rote Spitze)', rolle: 'Multirolle', schnur: 'Sehr dick (ca. 20 kg)', biss: E,
    beschwerung: 'Entfällt (der Pilker ist schwer genug)', vorfach: E, wirbel: 'Meereswirbel',
    haken: 'Entfällt (am Pilker)', koeder: 'Pilker' },
  A10: { rute: 'Brandungsrute (die längste Steckrute)', rolle: 'Große Stationärrolle', schnur: 'Dick, dazu Schlagschnur', biss: E,
    beschwerung: 'Brandungsblei', vorfach: 'Brandungsvorfach mit Schlagschnur', wirbel: 'Meereswirbel',
    haken: 'Groß (Gr. 1/0 und größer)', koeder: 'Wattwurm' },
};
for (const t of TASKS) t.short = SHORT[t.id];

// Gleichwertige Antworten: Wurm ist laut Vereinstabelle [NB] bei A1–A4 zugelassen.
export const ALSO_OK = {
  A1: { koeder: ['Wurm'] }, A2: { koeder: ['Wurm'] }, A3: { koeder: ['Wurm'] },
};

// Ist die gewählte Merkform-Antwort richtig?
export function isCorrect(task, key, answer) {
  return answer === task.short[key] || (ALSO_OK[task.id]?.[key] ?? []).includes(answer);
}

// ---------- Erfahrungen aus der Prüfung (Herne 2021, docs/research/erfahrungsbericht-herne-2021-rutenbau.md) ----------

export const EXAM_DAY = [
  'Die Aufgabe kommt per Zettel, du liest sie vor.',
  'Alle zehn Ruten mit Zubehör liegen verteilt auf mehreren Tischen. Du suchst die Teile heraus und legst sie auf einen freien Tisch.',
  'Rollen sind nicht bespult: Die Schnur wählst du separat (im Set: 3,6 kg, 5,4 kg, ca. 11,3 kg, 17,4 kg).',
  'Tipp aus dem Bericht: mit dem Zubehör anfangen, dort zählt die Reihenfolge. Bei den Geräteteilen 1–9 zählt sie nicht.',
  'Der Prüfer nennt Fehler erst, wenn du dich fertig meldest. Eine falsche Rollengröße kostete im Bericht alle 3 Punkte (25 von 28, knapp bestanden).',
  'Der praktische Teil dauerte etwa 10 Minuten.',
];

export const TABLE_TIPS = [
  { title: 'Rute durch Ausschluss finden', items: [
    'Fliegenrute: Der Rollenhalter sitzt ganz unten am Griffende, auch ohne Rolle zu erkennen (A7, A8).',
    'Pilkrute: kräftigste Rute mit roter Spitze (A9).',
    'Brandungsrute: längste Rute mit dem höchsten Wurfgewicht (A10).',
    'Feederrute: dreiteilige Steckrute mit farbiger, weicher Spitze und Köcher mit Wechselspitzen (A2).',
    'Zwei Teleskopruten: die sehr lange (ca. 5 m, bis 20 g) für A1, die kürzere grüne (3,6 m, bis 70 g) für A3.',
    'Drei Steckruten über das Wurfgewicht: 60 g für A4, 40 g für A5, 20 g für A6.',
  ] },
  { title: 'Rolle', items: [
    'Kleine Stationärrolle: A1, A2.',
    'Mittlere Stationärrolle: nur A6.',
    'Große Stationärrolle: A3, A4, A5, A10.',
    'Multirolle: nur A9. Fliegenrolle: A7, A8.',
  ] },
  { title: 'Schnur, Vorfach, Wirbel', items: [
    'Das Vorfach ist immer schwächer als die Hauptschnur (Sollbruchstelle).',
    'Vor freilaufender Beschwerung (Futterkorb, Laufblei) schützen Stopper oder Gummiperle den Wirbel.',
    'Stahlvorfach 40 cm bei A5 und A6; zwei Wirbel dazu wurden nicht beanstandet.',
  ] },
  { title: 'Köder', items: [
    'Großer Spinner oder Blinker: A5. Kleiner Spinner: A6. Beide liegen nebeneinander.',
    'Trockenfliege: buschig und voluminös (A7). Nassfliege: drahtig, weniger buschig (A8).',
    'Ein passender Köder reicht, Zusatzpunkte gibt es nicht.',
  ] },
];

// „Aus 10 mach 6“: gleiche Teile in gleicher Abfolge, nur anders dimensioniert.
export const GROUPS = [
  { tasks: ['A1', 'A3'], name: 'Posenangeln', note: 'Gleicher Aufbau, A3 kräftiger (Karpfen).' },
  { tasks: ['A2', 'A4'], name: 'Grundangeln', note: 'Fast gleicher Aufbau: A2 mit Futterkorb, A4 mit Laufblei.' },
  { tasks: ['A5', 'A6'], name: 'Spinnfischen', note: 'Gleicher Aufbau mit Stahlvorfach, A5 kräftiger (Hecht).' },
  { tasks: ['A7', 'A8'], name: 'Fliegenfischen', note: 'Gleicher Aufbau, Unterschied nur bei Schnur, Vorfach und Fliege.' },
  { tasks: ['A9'], name: 'Pilken vom Boot', note: 'Eigene Gruppe.' },
  { tasks: ['A10'], name: 'Brandungsangeln', note: 'Eigene Gruppe.' },
];

// „Am Tisch erkennen“: Zu welcher Aufgabe gehört dieses Teil?
export const RECOGNIZE = [
  { item: 'Teleskoprute, sehr lang (ca. 5 m), Wurfgewicht bis 20 g', tasks: ['A1'] },
  { item: 'Teleskoprute, grün, 3,6 m, Wurfgewicht bis 70 g', tasks: ['A3'] },
  { item: 'Dreiteilige Steckrute mit farbiger, weicher Spitze', tasks: ['A2'] },
  { item: 'Steckrute 2,7 m, Wurfgewicht 60 g', tasks: ['A4'] },
  { item: 'Steckrute 2,4 m, Wurfgewicht 40 g', tasks: ['A5'] },
  { item: 'Kurze Steckrute bis 2,1 m, Wurfgewicht 20 g', tasks: ['A6'] },
  { item: 'Rute mit dem Rollenhalter ganz unten am Griffende', tasks: ['A7', 'A8'] },
  { item: 'Kräftigste Rute mit roter Spitze', tasks: ['A9'] },
  { item: 'Längste Rute mit dem höchsten Wurfgewicht', tasks: ['A10'] },
  { item: 'Kleine Stationärrolle', tasks: ['A1', 'A2'] },
  { item: 'Mittlere Stationärrolle', tasks: ['A6'] },
  { item: 'Große Stationärrolle', tasks: ['A3', 'A4', 'A5', 'A10'] },
  { item: 'Multirolle', tasks: ['A9'] },
  { item: 'Fliegenrolle', tasks: ['A7', 'A8'] },
  { item: 'Schnur mit 3,6 kg Tragkraft', tasks: ['A1', 'A2'] },
  { item: 'Schnur mit 5,4 kg Tragkraft', tasks: ['A6'] },
  { item: 'Schnur mit ca. 11,3 kg Tragkraft', tasks: ['A3', 'A4', 'A5'] },
  { item: 'Helle, schwimmende Fliegenschnur', tasks: ['A7'] },
  { item: 'Dunkle, sinkende Fliegenschnur', tasks: ['A8'] },
  { item: 'Pose 1–3,5 g', tasks: ['A1'] },
  { item: 'Pose 5–10 g', tasks: ['A3'] },
  { item: 'Futterkorb ca. 20 g', tasks: ['A2'] },
  { item: 'Laufblei mit Perle', tasks: ['A4'] },
  { item: 'Brandungsblei 100–150 g', tasks: ['A10'] },
  { item: 'Stahlvorfach 40 cm', tasks: ['A5', 'A6'] },
  { item: 'Brandungsvorfach mit Schlagschnur', tasks: ['A10'] },
  { item: 'Meereswirbel 1/0–3/0', tasks: ['A9', 'A10'] },
  { item: 'Großer Spinner oder Blinker', tasks: ['A5'] },
  { item: 'Kleiner Spinner', tasks: ['A6'] },
  { item: 'Buschige, voluminöse Fliege', tasks: ['A7'] },
  { item: 'Drahtige, wenig buschige Fliege', tasks: ['A8'] },
  { item: 'Pilker', tasks: ['A9'] },
  { item: 'Mais', tasks: ['A3'] },
  { item: 'Wattwurm', tasks: ['A10'] },
  { item: 'Watkescher', tasks: ['A7', 'A8'] },
  { item: 'Gaff', tasks: ['A9'] },
  { item: 'Rachensperre', tasks: ['A5', 'A6'] },
];

// Bilder für „Erkennen“ (Quellen: img/geraet/SOURCES.md). Der Name erscheint erst nach dem Prüfen.
const ALL = TASKS.map(t => t.id);
RECOGNIZE.push(
  { reels: 0, item: 'Kleine Stationärrolle', tasks: ['A1', 'A2'] },
  { reels: 1, item: 'Mittlere Stationärrolle: nur A6', tasks: ['A6'] },
  { reels: 2, item: 'Große Stationärrolle', tasks: ['A3', 'A4', 'A5', 'A10'] },
  { img: 'multirolle', item: 'Multirolle', tasks: ['A9'] },
  { img: 'fliegenrolle', item: 'Fliegenrolle', tasks: ['A7', 'A8'] },
  { img: 'pose', item: 'Posen (klein für A1, größer für A3)', tasks: ['A1', 'A3'] },
  { img: 'bleischrot', item: 'Bleischrot', tasks: ['A1', 'A3'] },
  { img: 'laufblei', item: 'Laufblei (Sargblei, Durchlaufblei)', tasks: ['A4'] },
  { img: 'futterkorb', item: 'Futterkorb', tasks: ['A2'] },
  { img: 'spinner', item: 'Spinner (groß für A5, klein für A6)', tasks: ['A5', 'A6'] },
  { img: 'blinker', item: 'Blinker', tasks: ['A5'] },
  { img: 'pilker', item: 'Pilker', tasks: ['A9'] },
  { img: 'trockenfliege', item: 'Trockenfliege (buschig, aufrechte Flügel)', tasks: ['A7'] },
  { img: 'nassfliege', item: 'Nassfliege (Hechel nach hinten, schlank)', tasks: ['A8'] },
  { img: 'mais', item: 'Mais', tasks: ['A3'] },
  { img: 'tauwurm', item: 'Wurm (Tauwurm): passt zu allen Friedfisch- und Grundruten', tasks: ['A1', 'A2', 'A3', 'A4'] },
  { img: 'made', item: 'Maden', tasks: ['A1', 'A2'] },
  { img: 'wattwurm', item: 'Wattwurm: Meeresköder, nur für die Brandung', tasks: ['A10'] },
  { img: 'gaff', item: 'Gaff', tasks: ['A9'] },
  { img: 'metermass', item: 'Maßband / Messbrett: bei jeder Aufgabe', tasks: ALL },
  { img: 'unterfangkescher', item: 'Unterfangkescher', tasks: ['A1', 'A2', 'A3', 'A4', 'A5', 'A6'] },
  { img: 'rachensperre', item: 'Rachensperre', tasks: ['A5', 'A6'] },
  { img: 'stahlvorfach', item: 'Stahlvorfach', tasks: ['A5', 'A6'] },
);

// Rollen-Vergleich: dasselbe Rollenbild in drei Größen. Die Größenzahlen sind übliche Herstellerangaben
// (allgemeines Anglerwissen, keine Prüfungsquelle); ob die Prüfungsrollen beschriftet sind, ist unbekannt.
export const REEL_SIZES = [
  { label: 'klein', number: '1000', scale: 0.55 },
  { label: 'mittel', number: '2500', scale: 0.75 },
  { label: 'groß', number: '4000', scale: 1 },
];
