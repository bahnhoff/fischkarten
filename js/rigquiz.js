// Logik der Übung „Rute bauen“: Auswahlmöglichkeiten erzeugen und nach dem Bewertungsbogen werten.
import { GEAR, TASKS, TOOLS, PASS_POINTS, toolById, isCorrect, ALSO_OK } from './rigs.js';
import { shuffle } from './deck.js';

// Richtige Lösung (Merkform) plus bis zu `n - 1` verschiedene falsche Werte derselben Position aus anderen Aufgaben.
export function gearOptions(task, key, rand = Math.random, n = 4, tasks = TASKS) {
  const correct = task.short[key];
  const others = [...new Set(tasks.map(t => t.short[key]).filter(v => !isCorrect(task, key, v)))];
  return shuffle([correct, ...shuffle(others, rand).slice(0, n - 1)], rand);
}

// answers: { [gearKey]: gewählter Text }, tools: Liste der Zubehör-IDs in der gelegten Reihenfolge.
export function scoreRig(task, answers, tools) {
  const rows = GEAR.map(p => {
    const ok = isCorrect(task, p.key, answers[p.key]);
    return { n: p.n, label: p.label, max: p.max, points: ok ? p.max : 0, given: answers[p.key] ?? '–' };
  });

  const chosen = tools.map(toolById);
  const has = id => tools.includes(id);
  const inGroup = g => chosen.filter(t => t.group === g).map(t => t.id);

  const landing = inGroup('landehilfe');
  const landingOk = task.kit.landehilfe ? landing.length === 1 && landing[0] === task.kit.landehilfe : landing.length === 0;
  const rs = task.kit.rachensperre;
  const rsOk = rs === 'optional' || (rs ? has('rachensperre') : !has('rachensperre'));
  const removers = inGroup('loesen');
  const removerOk = removers.length > 0 && removers.every(id => task.kit.loesen.includes(id));
  const steps = chosen.map(t => t.step);
  const orderOk = steps.length >= 4 && steps.every((s, i) => i === 0 || steps[i - 1] <= s);

  const kitRows = [
    { n: 10, label: 'Landehilfe', max: 1, ok: landingOk },
    { n: 11, label: 'Messen', max: 2, ok: has('metermass') },
    { n: 12, label: 'Betäuben', max: 2, ok: has('schlagholz') },
    { n: 13, label: 'Töten', max: 2, ok: has('messer') },
    { n: 14, label: 'Rachensperre', max: 1, ok: rsOk },
    { n: 15, label: 'Haken entfernen', max: 1, ok: removerOk },
    { n: 16, label: 'Reihenfolge', max: 2, ok: orderOk },
  ].map(r => ({ n: r.n, label: r.label, max: r.max, points: r.ok ? r.max : 0 }));

  const all = [...rows, ...kitRows];
  const total = all.reduce((s, r) => s + r.points, 0);
  return { rows: all, total, passed: total >= PASS_POINTS };
}

// Volle Musterlösung einer Aufgabe (für Tests und „Lösung zeigen“).
export function solution(task) {
  const answers = Object.fromEntries(GEAR.map(p => [p.key, task.short[p.key]]));
  const tools = [task.kit.landehilfe, 'metermass', 'schlagholz', 'messer',
    task.kit.rachensperre === true ? 'rachensperre' : null, task.kit.loesen[0]].filter(Boolean);
  return { answers, tools };
}

export { TOOLS };

// ---------- Tisch decken: alle Teile als Karten, passende auf den Tisch legen ----------

const CATS = [
  { key: 'rute', label: 'Ruten' }, { key: 'rolle', label: 'Rollen' }, { key: 'schnur', label: 'Schnüre' },
  { key: 'biss', label: 'Montage' }, { key: 'beschwerung', label: 'Montage' }, { key: 'vorfach', label: 'Montage' },
  { key: 'wirbel', label: 'Montage' }, { key: 'haken', label: 'Montage' }, { key: 'koeder', label: 'Köder' },
];
const isNone = v => v.toLowerCase().startsWith('entfällt');

// Bild zur Karte, wenn eines in img/geraet/ vorhanden ist.
const IMG_RULES = [
  [/Multirolle/, 'multirolle'], [/Fliegenrolle/, 'fliegenrolle'], [/Stationärrolle/, 'stationaerrolle'],
  [/Pose/, 'pose'], [/Bleischrot/, 'bleischrot'], [/Laufblei/, 'laufblei'], [/Futterkorb/, 'futterkorb'],
  [/Stahlvorfach/, 'stahlvorfach'], [/Blinker/, 'blinker'], [/Spinner/, 'spinner'], [/^Pilker$/, 'pilker'],
  [/Trockenfliege/, 'trockenfliege'], [/Nassfliege/, 'nassfliege'], [/^Mais$/, 'mais'], [/^Wurm$/, 'tauwurm'],
  [/^Made/, 'made'], [/Wattwurm/, 'wattwurm'], [/Gaff/, 'gaff'], [/Metermaß/, 'metermass'],
  [/Unterfangkescher/, 'unterfangkescher'], [/Rachensperre/, 'rachensperre'],
  [/Hakenlöser/, 'stabhakenloeser'], [/Lösezange/, 'loesezange'], [/Arterienklemme/, 'arterienklemme'],
];
const imgFor = label => IMG_RULES.find(([re]) => re.test(label))?.[1] ?? null;

// Alle unterschiedlichen Teile: Geräte aus der Merkform aller Aufgaben plus Zubehör.
export function cardPool(tasks = TASKS) {
  const cards = [];
  const seen = new Set();
  for (const c of CATS) {
    for (const t of tasks) {
      const label = t.short[c.key];
      if (isNone(label) || seen.has(label)) continue;
      seen.add(label);
      const scale = /^Kleine Stationär/.test(label) ? 0.55 : /^Mittlere Stationär/.test(label) ? 0.75 : 1;
      cards.push({ id: `g:${label}`, label, group: c.label, img: imgFor(label), scale });
    }
  }
  for (const tool of TOOLS) cards.push({ id: `t:${tool.id}`, label: tool.label, group: 'Zubehör', img: imgFor(tool.label) });
  return cards;
}

// Pflichtkarten einer Aufgabe; `any` = eine der genannten Karten genügt.
export function requiredCards(task) {
  const req = GEAR.filter(p => !isNone(task.short[p.key])).map(p => {
    const also = (ALSO_OK[task.id]?.[p.key] ?? []).map(v => `g:${v}`);
    return { any: [`g:${task.short[p.key]}`, ...also], label: task.short[p.key] };
  });
  const k = task.kit;
  if (k.landehilfe) req.push({ any: [`t:${k.landehilfe}`], label: toolById(k.landehilfe).label });
  for (const id of ['metermass', 'schlagholz', 'messer']) req.push({ any: [`t:${id}`], label: toolById(id).label });
  if (k.rachensperre === true) req.push({ any: ['t:rachensperre'], label: 'Rachensperre' });
  req.push({ any: k.loesen.map(id => `t:${id}`), label: k.loesen.map(id => toolById(id).label).join(' oder ') });
  return req;
}

// Vergleicht die gelegten Karten mit den Pflichtkarten.
export function checkTable(task, laid, pool = cardPool()) {
  const req = requiredCards(task);
  const missing = req.filter(r => !r.any.some(id => laid.includes(id)));
  const allowed = new Set(req.flatMap(r => r.any));
  if (task.kit.rachensperre === 'optional') allowed.add('t:rachensperre');
  const label = id => pool.find(c => c.id === id)?.label ?? id;
  const wrong = laid.filter(id => !allowed.has(id)).map(label);
  return { missing: missing.map(r => r.label), wrong, ok: req.length - missing.length, total: req.length };
}
