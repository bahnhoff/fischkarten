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
      rolle: 'Schwere Stationärrolle (oder Multirolle)',
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
