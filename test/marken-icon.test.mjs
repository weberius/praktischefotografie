// Gherkin: docs/contracts/gherkin/web/markenicon.feature (ICO-UB-1, ICO-UB-2, ICO-UB-5: Icon-Dateien, Favicon, index.html, Manifest, Pfade) und docs/contracts/gherkin/setup/bildmaterial.feature (IMG-UB-1, IMG-UB-3, IMG-UB-4: Icon-Master, Postkartenmotiv, Befehl, Postkarte nicht im Build); Q-PERF-7, Q-MAIN-5
import assert from 'node:assert/strict';
import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import { dirname, join } from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';
import { decodePng, pngSize } from './png-helpers.mjs';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const pub = (file) => join(ROOT, 'web/public', file);
const kB = (file) => statSync(file).size / 1000;

const ICONS = [
  ['favicon-96x96.png', 96, 30],
  ['apple-touch-icon.png', 180, 60],
  ['web-app-manifest-192x192.png', 192, 80],
  ['web-app-manifest-512x512.png', 512, 400],
];

for (const [file, size, maxKb] of ICONS) {
  test(`Szenario: Icon-Dateien in der geforderten Größe – ${file} hat ${size} × ${size} Pixel und höchstens ${maxKb} kB (ICO-UB-1, ICO-UB-2, Q-PERF-7)`, () => {
    assert.deepEqual(pngSize(readFileSync(pub(file))), { width: size, height: size });
    assert.ok(kB(pub(file)) <= maxKb, `${file}: ${kB(pub(file)).toFixed(1)} kB > ${maxKb} kB`);
  });
}

test('Szenario: Favicon enthält drei Größen – favicon.ico hat PNG-Bilder mit 16, 32 und 48 Pixeln und höchstens 40 kB (ICO-UB-1, Q-PERF-7)', () => {
  const ico = readFileSync(pub('favicon.ico'));
  assert.equal(ico.readUInt16LE(0), 0, 'reserviert');
  assert.equal(ico.readUInt16LE(2), 1, 'Typ Icon');
  const count = ico.readUInt16LE(4);
  assert.equal(count, 3);
  const sizes = [];
  for (let i = 0; i < count; i++) {
    const e = 6 + 16 * i;
    const size = ico.readUInt8(e) || 256;
    const length = ico.readUInt32LE(e + 8);
    const offset = ico.readUInt32LE(e + 12);
    assert.deepEqual(pngSize(ico.subarray(offset, offset + length)), { width: size, height: size }, `Bild ${size} px`);
    sizes.push(size);
  }
  assert.deepEqual(sizes, [16, 32, 48]);
  assert.ok(kB(pub('favicon.ico')) <= 40);
});

test('Das Icon hat transparente Ecken und deckende Mitte (Zuschnitt auf das abgerundete Quadrat, ADR-017)', () => {
  const icon = decodePng(readFileSync(pub('web-app-manifest-192x192.png')));
  assert.equal(icon.at(0, 0)[3], 0, 'Ecke oben links');
  assert.equal(icon.at(191, 0)[3], 0, 'Ecke oben rechts');
  assert.equal(icon.at(0, 191)[3], 0, 'Ecke unten links');
  assert.equal(icon.at(191, 191)[3], 0, 'Ecke unten rechts');
  assert.equal(icon.at(96, 96)[3], 255, 'Mitte');
});

// ---- index.html und Manifest (ICO-UB-1, ICO-UB-2, ICO-UB-5) ----
const INDEX = join(ROOT, 'web/src/index.html');
const DIST = join(ROOT, 'web/dist/web/browser');
const attr = (tag, name) => tag.match(new RegExp(`\\s${name}="([^"]*)"`))?.[1];
const linkTags = (html) => [...html.matchAll(/<link\b[^>]*>/g)].map((m) => m[0]);
const relativePath = (url) => !/^([a-z][a-z0-9+.-]*:|\/)/i.test(url);

test('Szenario: Favicon in jeder Seite – index.html verlinkt Favicon, Apple-Touch-Icon und Manifest relativ zum Basispfad (ICO-UB-1, ICO-UB-2, ICO-UB-5)', () => {
  const html = readFileSync(INDEX, 'utf8');
  const links = linkTags(html);
  const byRel = (rel, predicate = () => true) => links.filter((l) => attr(l, 'rel') === rel && predicate(l));
  const ico = byRel('icon', (l) => attr(l, 'href') === 'favicon.ico')[0];
  const png = byRel('icon', (l) => attr(l, 'href') === 'favicon-96x96.png')[0];
  assert.ok(ico, 'Link auf favicon.ico');
  assert.equal(attr(ico, 'sizes'), '32x32');
  assert.ok(png, 'Link auf favicon-96x96.png');
  assert.equal(attr(png, 'type'), 'image/png');
  assert.equal(attr(png, 'sizes'), '96x96');
  assert.equal(attr(byRel('apple-touch-icon')[0], 'href'), 'apple-touch-icon.png');
  assert.equal(attr(byRel('manifest')[0], 'href'), 'site.webmanifest');
  assert.match(html, /<meta name="theme-color" content="#ffffff">/);
  for (const link of links) {
    const href = attr(link, 'href');
    if (href) assert.ok(relativePath(href), `Verweis ${href} muss relativ zum Basispfad sein`);
  }
  for (const href of ['favicon.ico', 'favicon-96x96.png', 'apple-touch-icon.png', 'site.webmanifest']) assert.ok(existsSync(pub(href)), `${href} liegt in web/public`);
});

test('Szenario: Icon für Startbildschirme – das Manifest nennt Name, Kurzname, Farben und die Icons 192 und 512; alle Verweise sind relativ und führen auf vorhandene Dateien (ICO-UB-2, ICO-UB-5)', () => {
  const manifest = JSON.parse(readFileSync(pub('site.webmanifest'), 'utf8'));
  assert.equal(manifest.name, 'Praktische Fotografie');
  assert.equal(manifest.short_name, 'Praktische Fotografie');
  assert.equal(manifest.theme_color, '#ffffff');
  assert.equal(manifest.background_color, '#fafaf7');
  assert.equal(manifest.display, 'standalone');
  assert.ok(relativePath(manifest.start_url) && relativePath(manifest.scope), 'start_url und scope relativ');
  assert.deepEqual(manifest.icons.map((i) => i.sizes).sort(), ['192x192', '512x512']);
  for (const icon of manifest.icons) {
    assert.equal(icon.type, 'image/png');
    assert.ok(relativePath(icon.src), `${icon.src} relativ`);
    const [w, h] = icon.sizes.split('x').map(Number);
    assert.deepEqual(pngSize(readFileSync(pub(icon.src))), { width: w, height: h });
  }
});

/** Datei im Build, auf die ein Verweis aus einer Seite mit `<base href="base">` zeigt; `null`, wenn der Verweis den Basispfad verlässt (z. B. durch einen führenden Schrägstrich). */
function distFileFor(base, href) {
  const path = new URL(href, `http://host${base}`).pathname;
  return path.startsWith(base) ? path.slice(base.length) : null;
}

test('Szenario: Pfade relativ zum Basispfad – Verweise mit führendem Schrägstrich verlassen den Basispfad und werden erkannt (ICO-UB-5)', () => {
  assert.equal(distFileFor('/pf/', 'favicon.ico'), 'favicon.ico');
  assert.equal(distFileFor('/pf/', 'web-app-manifest-192x192.png'), 'web-app-manifest-192x192.png');
  assert.equal(distFileFor('/pf/', '/favicon.ico'), null, 'absoluter Pfad liegt außerhalb von /pf/');
  assert.equal(distFileFor('/pf/', 'https://example.org/favicon.ico'), null);
});

test('Szenario: Pfade relativ zum Basispfad – im Produktionsbuild (auch mit Basispfad, z. B. /pf/) führen alle Icon-Verweise der Seiten und des Manifests auf vorhandene Dateien unterhalb des Basispfads (ICO-UB-5, Q-USE-11)', { skip: !existsSync(join(DIST, 'index.html')) && 'kein Build vorhanden (npm run build)' }, () => {
  for (const file of ['favicon.ico', 'favicon-96x96.png', 'apple-touch-icon.png', 'site.webmanifest', 'web-app-manifest-192x192.png', 'web-app-manifest-512x512.png']) assert.ok(existsSync(join(DIST, file)), `${file} im Build`);
  for (const page of ['index.html', 'map/index.html', 'venues/index.html']) {
    const html = readFileSync(join(DIST, page), 'utf8');
    const base = html.match(/<base href="([^"]*)"/)?.[1];
    assert.ok(base?.startsWith('/') && base.endsWith('/'), `${page}: <base href> vorhanden (${base})`);
    const hrefs = linkTags(html).map((l) => attr(l, 'href')).filter((h) => /favicon|apple-touch|webmanifest/.test(h ?? ''));
    assert.equal(hrefs.length, 4, `${page}: vier Icon-Verweise`);
    for (const href of hrefs) {
      assert.ok(relativePath(href), `${page}: ${href} relativ`);
      const file = distFileFor(base, href);
      assert.ok(file && existsSync(join(DIST, file)), `${page}: ${href} führt unter ${base} auf eine vorhandene Datei`);
    }
  }
  const manifest = JSON.parse(readFileSync(join(DIST, 'site.webmanifest'), 'utf8'));
  for (const icon of manifest.icons) assert.ok(existsSync(join(DIST, icon.src)), `Manifest-Icon ${icon.src} im Build`);
});

// ---- Befehl und Dokumentation (IMG-UB-3, Q-MAIN-5) ----
test('Szenario: Befehl erzeugt alle Dateien – ein npm-Skript ruft das Skript auf, das README beschreibt es, es kommt keine Bildbibliothek hinzu (IMG-UB-3, Q-MAIN-5)', () => {
  const root = JSON.parse(readFileSync(join(ROOT, 'package.json'), 'utf8'));
  assert.equal(root.scripts['icons:build'], 'node web/tools/make-icons.mjs');
  assert.ok(existsSync(join(ROOT, 'web/tools/make-icons.mjs')));
  const readme = readFileSync(join(ROOT, 'README.md'), 'utf8');
  for (const needle of ['npm run icons:build', 'docs/resources/zfpf.png', 'docs/resources/icon.png', 'docs/resources/postkarte.png', 'CHROME_BIN']) assert.ok(readme.includes(needle), `README nennt ${needle}`);
  const web = JSON.parse(readFileSync(join(ROOT, 'web/package.json'), 'utf8'));
  const deps = Object.keys({ ...web.dependencies, ...web.devDependencies });
  for (const lib of ['sharp', 'jimp', 'pngjs', 'canvas', 'imagemagick', 'png-to-ico']) assert.ok(!deps.includes(lib), `${lib} nicht als Abhängigkeit`);
});

// ---- Icon-Master und Postkartenmotiv (IMG-UB-1, IMG-UB-4; STORY-03) ----
const RESOURCES = join(ROOT, 'docs/resources');
/** Randpixel samt Koordinaten, zeilen- und spaltenweise. */
const edgePixels = (img) => {
  const out = [];
  for (let x = 0; x < img.width; x++) out.push([x, 0, img.at(x, 0)], [x, img.height - 1, img.at(x, img.height - 1)]);
  for (let y = 0; y < img.height; y++) out.push([0, y, img.at(0, y)], [img.width - 1, y, img.at(img.width - 1, y)]);
  return out;
};

test('Szenario: Icon und Postkartenmotiv getrennt – das Postkartenmotiv liegt im Querformat vor, ohne weißen Rand und ohne Transparenz (IMG-UB-1)', () => {
  const card = decodePng(readFileSync(join(RESOURCES, 'postkarte.png')));
  assert.ok(card.width > card.height, 'Querformat');
  assert.ok(card.width >= 1000 && card.height >= 750, `Maße ${card.width} × ${card.height}`);
  // Die Karte hat leicht abgerundete Ecken: nur dort (innerhalb von 6 px) darf der Rand fast weiß sein.
  const nearCorner = (x, y) => (x < 6 || x > card.width - 7) && (y < 6 || y > card.height - 7);
  const white = ([r, g, b]) => r >= 253 && g >= 253 && b >= 253;
  const edge = edgePixels(card);
  assert.ok(edge.every(([, , [, , , a]]) => a === 255), 'jeder Randpixel deckend');
  assert.deepEqual(edge.filter(([x, y, p]) => white(p) && !nearCorner(x, y)).map(([x, y]) => [x, y]), [], 'kein weißer Rand außerhalb der Ecken');
  assert.ok(edge.filter(([, , p]) => white(p)).length <= edge.length * 0.02, 'höchstens 2 % weiße Randpixel');
});

test('Szenario: Icon und Postkartenmotiv getrennt – das Icon ist quadratisch, hat transparente Ecken und transparente Seitenränder (kein Motivrest außerhalb der Form) (IMG-UB-1)', () => {
  // „Ohne Teile des Postkartenmotivs“ gilt hier nur für den Rand: Außerhalb der abgerundeten Form ist alles transparent. Dass im Inneren nichts von der
  // Postkarte steht, sichert die Sichtprüfung und der Zuschnitt-Test mit synthetischem Bild in `make-icons.test.mjs` (kein Datei-Test dafür).
  const icon = decodePng(readFileSync(join(RESOURCES, 'icon.png')));
  assert.equal(icon.width, icon.height);
  assert.ok(icon.width >= 400);
  for (const [x, y] of [[0, 0], [icon.width - 1, 0], [0, icon.height - 1], [icon.width - 1, icon.height - 1]]) assert.equal(icon.at(x, y)[3], 0, `Ecke (${x},${y}) transparent`);
  const STRIP = 8;
  for (let y = 0; y < icon.height; y++) {
    for (let x = 0; x < STRIP; x++) assert.equal(icon.at(x, y)[3], 0, `linker Rand (${x},${y}) transparent`);
    for (let x = icon.width - STRIP; x < icon.width; x++) assert.equal(icon.at(x, y)[3], 0, `rechter Rand (${x},${y}) transparent`);
  }
});

const walk = (dir) => readdirSync(dir, { withFileTypes: true }).flatMap((e) => (e.isDirectory() ? walk(join(dir, e.name)) : [join(dir, e.name)]));
const containsPostcard = (root) => {
  const postcard = readFileSync(join(RESOURCES, 'postkarte.png'));
  for (const file of walk(root)) {
    assert.ok(!/postkarte/i.test(file), `${file}: Dateiname`);
    if (file.endsWith('.png')) assert.ok(!readFileSync(file).equals(postcard), `${file}: gleicher Inhalt wie die Postkarte`);
  }
};

test('Szenario: Postkarte nicht im Build – web/public enthält das Postkartenmotiv nicht (IMG-UB-4, Q-PERF-4)', () => {
  containsPostcard(join(ROOT, 'web/public'));
});

test('Szenario: Postkarte nicht im Build – der Produktionsbuild enthält das Postkartenmotiv nicht (IMG-UB-4, Q-PERF-4)', { skip: !existsSync(join(DIST, 'index.html')) && 'kein Build vorhanden (npm run build)' }, () => {
  containsPostcard(DIST);
});
