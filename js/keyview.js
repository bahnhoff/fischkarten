// Zeigt den grafischen Bestimmungsschlüssel: eine Frage, Antwortkarten mit Beispielbild.
// Der Weg steht im Adress-Anker (#weg=...), damit „Zurück“ im Browser und von der Karte funktioniert.
import { SPECIES } from '../data/species.js';
import { KEY, START, validPath } from './key.js';

const byId = Object.fromEntries(SPECIES.map(s => [s.id, s]));
const $ = id => document.getElementById(id);
const ZOOM = 3; // Standardvergrößerung des Ausschnitts

function currentPath() {
  const m = location.hash.match(/weg=([\w,-]+)/);
  return validPath(m ? m[1].split(',') : [START]);
}

function go(path) {
  location.hash = `weg=${path.join(',')}`;
}

function optionCard(o, path) {
  const ex = byId[o.ex];
  const btn = document.createElement('button');
  btn.type = 'button';
  btn.className = 'key-option';
  const pic = document.createElement('span');
  pic.className = 'key-pic';
  const img = document.createElement('img');
  img.src = ex.img;
  img.alt = '';
  pic.append(img);
  const f = o.f != null ? ex.features[o.f] : null;
  const zoom = o.zoom ?? ZOOM;
  if (f && f.x != null && zoom > 1) {
    // Nur den Ausschnitt um das Merkmal zeigen: Bild vergrößern und so verschieben,
    // dass der Merkmalspunkt in der Mitte des Rahmens liegt.
    pic.classList.add('zoom');
    img.addEventListener('load', () => {
      const ratio = img.naturalHeight / img.naturalWidth;
      const frame = pic.clientHeight / pic.clientWidth;
      img.style.width = `${zoom * 100}%`;
      img.style.left = `${50 - f.x * zoom}%`;
      img.style.top = `${50 - (f.y * zoom * ratio) / frame}%`;
    });
    const ring = document.createElement('span');
    ring.className = 'key-ring';
    pic.append(ring);
  }
  const label = document.createElement('span');
  label.className = 'key-label';
  label.textContent = o.label;
  const note = document.createElement('span');
  note.className = 'key-example';
  note.textContent = o.species ? `→ ${byId[o.species].name}` : `Beispiel: ${ex.name}`;
  btn.append(pic, label, note);
  btn.addEventListener('click', () => {
    if (o.next) go([...path, o.next]);
    else location.href = `index.html?id=${encodeURIComponent(o.species)}&von=baum`;
  });
  return btn;
}

function render() {
  const path = currentPath();
  const node = KEY[path[path.length - 1]];

  const crumbs = [];
  for (let i = 1; i < path.length; i++) {
    const chosen = KEY[path[i - 1]].options.find(o => o.next === path[i]);
    const b = document.createElement('button');
    b.type = 'button';
    b.className = 'crumb';
    b.textContent = chosen.label;
    b.addEventListener('click', () => go(path.slice(0, i)));
    crumbs.push(b);
  }
  $('key-path').replaceChildren(...crumbs);
  $('key-path').hidden = crumbs.length === 0;
  $('key-path').scrollLeft = $('key-path').scrollWidth;
  window.scrollTo(0, 0);
  $('key-back').disabled = path.length === 1;
  $('key-q').textContent = node.q;
  $('key-options').replaceChildren(...node.options.map(o => optionCard(o, path)));
}

$('key-back').addEventListener('click', () => go(currentPath().slice(0, -1)));
$('key-restart').addEventListener('click', () => go([START]));
window.addEventListener('hashchange', render);
render();
