// Generates the site's Lottie animations (src/animations/*.json) from the Tabler icons and the map SVG
// already in the project, so every animation shares the project's stroke weight and palette.
// Run: node scripts/build-lottie.cjs
const { readFileSync, writeFileSync, mkdirSync } = require('node:fs');
const path = require('node:path');
const svgpath = require('svgpath');

const root = path.join(__dirname, '..');
const outDir = path.join(root, 'src', 'animations');
mkdirSync(outDir, { recursive: true });

const FPS = 60;
const hex = (value) => [1, 3, 5].map((i) => Math.round(parseInt(value.slice(i, i + 2), 16) / 255 * 1000) / 1000);
// Same feel as --ease-fg (cubic-bezier .4,0,.2,1).
const ease = { o: { x: [0.4], y: [0] }, i: { x: [0.2], y: [1] } };
const still = (value) => ({ a: 0, k: value });
const tween = (from, to, start, end) => ({ a: 1, k: [{ t: start, s: from, ...ease }, { t: end, s: to }] });

// SVG path data -> Lottie bezier shapes (one per subpath).
function toShapes(d) {
  const shapes = [];
  let verts = [];
  let ins = [];
  let outs = [];
  let cx = 0;
  let cy = 0;
  let sx = 0;
  let sy = 0;
  const flush = (closed) => {
    if (verts.length > 1) shapes.push({ i: ins, o: outs, v: verts, c: closed });
    verts = []; ins = []; outs = [];
  };
  const add = (x, y, inX = 0, inY = 0) => { verts.push([x, y]); ins.push([inX, inY]); outs.push([0, 0]); };
  const cubic = (x1, y1, x2, y2, x, y) => {
    outs[outs.length - 1] = [x1 - cx, y1 - cy];
    add(x, y, x2 - x, y2 - y);
    cx = x; cy = y;
  };
  for (const [cmd, ...a] of svgpath(d).abs().unarc().unshort().segments) {
    if (cmd === 'M') { flush(false); cx = sx = a[0]; cy = sy = a[1]; add(cx, cy); }
    else if (cmd === 'L') { add(a[0], a[1]); cx = a[0]; cy = a[1]; }
    else if (cmd === 'H') { add(a[0], cy); cx = a[0]; }
    else if (cmd === 'V') { add(cx, a[0]); cy = a[0]; }
    else if (cmd === 'C') cubic(...a);
    else if (cmd === 'Q') cubic(cx + 2 / 3 * (a[0] - cx), cy + 2 / 3 * (a[1] - cy), a[2] + 2 / 3 * (a[0] - a[2]), a[3] + 2 / 3 * (a[1] - a[3]), a[2], a[3]);
    else if (cmd === 'Z') {
      const [fx, fy] = verts[0];
      if (Math.hypot(verts.at(-1)[0] - fx, verts.at(-1)[1] - fy) < 0.001 && verts.length > 2) {
        ins[0] = ins.at(-1); verts.pop(); ins.pop(); outs.pop();
      }
      flush(true);
      cx = sx; cy = sy;
    }
  }
  flush(false);
  return shapes;
}

const transform = (extra = {}) => ({ ty: 'tr', p: still([0, 0]), a: still([0, 0]), s: still([100, 100]), r: still(0), o: still(100), sk: still(0), sa: still(0), ...extra });

// A group that draws its subpaths on with a trim path.
function drawGroup(shapes, { color, width, start, end }) {
  return {
    ty: 'gr',
    nm: 'draw',
    it: [
      ...shapes.map((ks) => ({ ty: 'sh', ks: still(ks) })),
      { ty: 'st', c: still([...hex(color), 1]), o: still(100), w: still(width), lc: 2, lj: 2 },
      { ty: 'tm', s: still(0), e: tween([0], [100], start, end), o: still(0), m: 1 },
      transform(),
    ],
  };
}

function animation({ name, size, layers, frames }) {
  return {
    v: '5.7.0', fr: FPS, ip: 0, op: frames, w: size[0], h: size[1], nm: name, ddd: 0, assets: [],
    layers: [{
      ddd: 0, ind: 1, ty: 4, nm: name, sr: 1, ip: 0, op: frames, st: 0, ao: 0,
      ks: { o: still(100), r: still(0), p: still([0, 0, 0]), a: still([0, 0, 0]), s: still([100, 100, 100]) },
      shapes: layers,
    }],
  };
}

const tabler = (icon) => [...readFileSync(path.join(root, 'node_modules/@tabler/icons/icons/outline', `${icon}.svg`), 'utf8').matchAll(/<path d="([^"]+)"\s*\/>/g)]
  .map((m) => m[1]).filter((d) => !d.startsWith('M0 0h24v24H0z'));

// Draw-on icon: each Tabler subpath starts a few frames after the previous one.
function iconAnimation(name, icon, color, { draw = 36, gap = 8, width = 2 } = {}) {
  const paths = tabler(icon);
  const layers = paths.map((d, index) => drawGroup(toShapes(d), { color, width, start: index * gap, end: index * gap + draw }));
  return animation({ name, size: [24, 24], layers, frames: (paths.length - 1) * gap + draw + 6 });
}

// Map overlay: a line from Misiones to Paraguay and a dot on each end. The map is a linear
// (equirectangular) projection, calibrated on the country outlines themselves: Argentina spans
// lon -73.58..-53.64 / lat -21.78..-55.05 over x 111.6..368.8 / y 207.65..675.5 (Paraguay's own
// extent checks within ~2 px). Misiones is placed by its geographic center; Paraguay by the
// centroid of its main landmass.
function routeAnimation(name, color) {
  const svg = readFileSync(path.join(root, 'src/images/maps/argentina-paraguay.svg'), 'utf8');
  const project = (lon, lat) => [Math.round(111.6 + (lon + 73.58) * 12.9), Math.round(207.65 + (-21.78 - lat) * 14.06)];
  const paraguay = () => {
    const d = svg.match(/<path id="PRY" d="([^"]+)"/)[1];
    let best = null;
    for (const shape of toShapes(d)) {
      const xs = shape.v.map((p) => p[0]);
      const ys = shape.v.map((p) => p[1]);
      const area = (Math.max(...xs) - Math.min(...xs)) * (Math.max(...ys) - Math.min(...ys));
      if (!best || area > best.area) best = { area, x: xs.reduce((s, v) => s + v, 0) / xs.length, y: ys.reduce((s, v) => s + v, 0) / ys.length };
    }
    return [Math.round(best.x), Math.round(best.y)];
  };
  const from = project(-54.7, -27.0);
  const to = paraguay();
  const dx = to[0] - from[0];
  const dy = to[1] - from[1];
  const length = Math.hypot(dx, dy);
  // Control point bows the line away from the border so it reads as a link, not a boundary.
  const mid = [(from[0] + to[0]) / 2 - dy * 0.45, (from[1] + to[1]) / 2 + dx * 0.45];
  const line = toShapes(`M${from[0]} ${from[1]}Q${Math.round(mid[0])} ${Math.round(mid[1])} ${to[0]} ${to[1]}`);
  const dot = (point, delay) => ({
    ty: 'gr',
    nm: 'dot',
    it: [
      { ty: 'el', p: still(point), s: still([16, 16]) },
      { ty: 'fl', c: still([...hex(color), 1]), o: still(100) },
      transform({ p: still(point), a: still(point), s: tween([0, 0], [100, 100], delay, delay + 20) }),
    ],
  });
  const ring = (point, delay) => ({
    ty: 'gr',
    nm: 'ring',
    it: [
      { ty: 'el', p: still(point), s: still([34, 34]) },
      { ty: 'st', c: still([...hex(color), 1]), o: still(100), w: still(2), lc: 2, lj: 2 },
      transform({ p: still(point), a: still(point), s: tween([60, 60], [140, 140], delay, delay + 40), o: tween([70], [0], delay, delay + 40) }),
    ],
  });
  const frames = 150;
  const layers = [
    drawGroup(line, { color, width: 2.5, start: 14, end: 90 }),
    dot(from, 0), dot(to, 84), ring(from, 6), ring(to, 90),
  ];
  return animation({ name, size: [680, 710], layers, frames });
}

const files = {
  'sgc-seguridad': iconAnimation('Seguridad', 'shield-check', '#bde4d4'),
  'sgc-calidad': iconAnimation('Calidad', 'rosette-discount-check', '#bde4d4', { draw: 44 }),
  'sgc-sostenibilidad': iconAnimation('Sostenibilidad', 'leaf', '#bde4d4'),
  'sgc-mejora': iconAnimation('Mejora continua', 'refresh', '#bde4d4', { draw: 40 }),
  'form-success': iconAnimation('Envío aceptado', 'circle-check', '#065f46', { draw: 40, gap: 14, width: 2.2 }),
  'route-ar-py': routeAnimation('Argentina y Paraguay', '#f1eee6'),
};

for (const [file, data] of Object.entries(files)) {
  const target = path.join(outDir, `${file}.json`);
  writeFileSync(target, JSON.stringify(data), 'utf8');
  console.log(`${file}.json`, `${JSON.stringify(data).length} B`);
}
