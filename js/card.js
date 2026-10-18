// Zeichnet nummerierte Pfeile über das Fischbild.
// Merkmale mit x/y (Prozent des Bildes) bekommen einen Pfeil, der Pfeilanfang liegt im Rand
// über oder unter dem Bild. Merkmale ohne x/y erscheinen nur in der Liste.

const SVG_NS = 'http://www.w3.org/2000/svg';
const MIN_GAP = 34; // Mindestabstand der Nummernkreise in Pixeln

function el(name, attrs) {
  const node = document.createElementNS(SVG_NS, name);
  for (const [k, v] of Object.entries(attrs)) node.setAttribute(k, v);
  return node;
}

// Verteilt Pfeilanfänge einer Randzeile so, dass sich die Kreise nicht überlappen.
function spread(items, width) {
  items.sort((a, b) => a.tx - b.tx);
  let last = -Infinity;
  for (const it of items) {
    it.lx = Math.max(it.tx, last + MIN_GAP, 16);
    last = it.lx;
  }
  const overflow = last - (width - 16);
  if (overflow > 0) for (const it of items) it.lx -= overflow;
}

export function drawArrows(stage, img, svg, features) {
  svg.replaceChildren();
  const s = stage.getBoundingClientRect();
  const r = img.getBoundingClientRect();
  if (!r.width || !r.height) return;
  svg.setAttribute('viewBox', `0 0 ${s.width} ${s.height}`);

  const defs = el('defs', {});
  const marker = el('marker', { id: 'head', viewBox: '0 0 10 10', refX: '9', refY: '5', markerWidth: '7', markerHeight: '7', orient: 'auto-start-reverse' });
  marker.append(el('path', { d: 'M0,0 L10,5 L0,10 z', class: 'arrow-head' }));
  defs.append(marker);
  svg.append(defs);

  const top = [], bottom = [];
  features.forEach((f, i) => {
    if (f.x == null || f.y == null) return;
    const it = {
      n: i + 1,
      tx: r.left - s.left + (f.x / 100) * r.width,
      ty: r.top - s.top + (f.y / 100) * r.height,
    };
    (f.y < 50 ? top : bottom).push(it);
  });
  spread(top, s.width);
  spread(bottom, s.width);
  const topY = Math.max((r.top - s.top) / 2, 14);
  const bottomY = Math.min(r.bottom - s.top + (s.bottom - r.bottom) / 2, s.height - 14);
  for (const it of top) it.ly = topY;
  for (const it of bottom) it.ly = bottomY;

  for (const it of [...top, ...bottom]) {
    const dx = it.tx - it.lx, dy = it.ty - it.ly;
    const len = Math.hypot(dx, dy) || 1;
    const r0 = 13; // Kreisradius
    svg.append(el('line', {
      x1: it.lx + (dx / len) * r0, y1: it.ly + (dy / len) * r0,
      x2: it.tx, y2: it.ty, class: 'arrow-line', 'marker-end': 'url(#head)',
    }));
    svg.append(el('circle', { cx: it.lx, cy: it.ly, r: r0, class: 'arrow-badge' }));
    const t = el('text', { x: it.lx, y: it.ly + 5, class: 'arrow-num' });
    t.textContent = it.n;
    svg.append(t);
  }
}
