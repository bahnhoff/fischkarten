// Logik der Übung „Rute bauen“: Auswahlmöglichkeiten erzeugen und nach dem Bewertungsbogen werten.
import { GEAR, TASKS, TOOLS, PASS_POINTS, toolById } from './rigs.js';
import { shuffle } from './deck.js';

// Richtige Lösung plus bis zu `n - 1` verschiedene falsche Werte derselben Position aus anderen Aufgaben.
export function gearOptions(task, key, rand = Math.random, n = 4, tasks = TASKS) {
  const correct = task.gear[key];
  const others = [...new Set(tasks.map(t => t.gear[key]).filter(v => v !== correct))];
  return shuffle([correct, ...shuffle(others, rand).slice(0, n - 1)], rand);
}

// answers: { [gearKey]: gewählter Text }, tools: Liste der Zubehör-IDs in der gelegten Reihenfolge.
export function scoreRig(task, answers, tools) {
  const rows = GEAR.map(p => {
    const ok = answers[p.key] === task.gear[p.key];
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
  const answers = Object.fromEntries(GEAR.map(p => [p.key, task.gear[p.key]]));
  const tools = [task.kit.landehilfe, 'metermass', 'schlagholz', 'messer',
    task.kit.rachensperre === true ? 'rachensperre' : null, task.kit.loesen[0]].filter(Boolean);
  return { answers, tools };
}

export { TOOLS };
