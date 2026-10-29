// Trennt das Quellbild in Icon und Postkartenmotiv und leitet daraus die Icon-Dateien der Webanwendung ab (ADR-017, IMG-UB-1 bis IMG-UB-3).
// Aufruf: node web/tools/make-icons.mjs [--source <png>] [--docs <ordner>] [--public <ordner>]
// Voraussetzung: ein Chromium (Umgebungsvariable CHROME_BIN), das Skript nutzt es zum Dekodieren, Zuschneiden, Skalieren und Schreiben der PNG-Daten.
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '../..');
export const DEFAULTS = {
  source: join(ROOT, 'docs/resources/zfpf.png'),
  docs: join(ROOT, 'docs/resources'),
  public: join(ROOT, 'web/public'),
};

/** Startet Chromium; `playwright-core` wird erst hier geladen, damit Tests ohne `web/node_modules` (CI-Schritt im Wurzelverzeichnis) das Modul trotzdem importieren können. */
async function launch() {
  try {
    const { chromium } = await import('playwright-core');
    return await chromium.launch({ executablePath: process.env.CHROME_BIN || undefined, args: ['--no-sandbox'] });
  } catch (error) {
    throw new Error(`Kein Chromium gefunden. Bitte \`npm install\` in web/ ausführen und die Umgebungsvariable CHROME_BIN auf ein Chrome/Chromium setzen. (${error.message.split('\n')[0]})`);
  }
}

/** Läuft im Browser: findet Icon (links) und Postkartenmotiv (rechts), schneidet beide zu und liefert sie als PNG (Base64). */
async function splitInBrowser(sourceBase64) {
  const NON_WHITE = 12; // Abstand zu Weiß (Summe der drei Kanäle), ab dem ein Pixel zum Motiv zählt
  const img = new Image();
  img.src = `data:image/png;base64,${sourceBase64}`;
  await img.decode();
  const { width, height } = img;
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d', { willReadFrequently: true });
  ctx.drawImage(img, 0, 0);
  const data = ctx.getImageData(0, 0, width, height).data;
  const isMotif = (x, y) => {
    const i = (y * width + x) * 4;
    return 765 - (data[i] + data[i + 1] + data[i + 2]) > NON_WHITE || data[i + 3] < 250;
  };

  // Spalten mit Motivpixeln zu Abschnitten zusammenfassen; kleine Lücken (< 8 px) gehören zum selben Motiv.
  const columns = Array.from({ length: width }, (_, x) => {
    for (let y = 0; y < height; y++) if (isMotif(x, y)) return true;
    return false;
  });
  const runs = [];
  for (let x = 0, gap = 0, start = -1; x <= width; x++) {
    if (x < width && columns[x]) {
      if (start < 0) start = x;
      gap = 0;
    } else if (start >= 0) {
      gap++;
      if (gap >= 8 || x === width) {
        runs.push([start, x - gap]);
        start = -1;
        gap = 0;
      }
    }
  }
  if (runs.length < 2) throw new Error(`Im Quellbild wurden ${runs.length} Motive gefunden, erwartet sind 2 (Icon links, Postkarte rechts).`);
  const [iconRun, cardRun] = [runs[0], runs[runs.length - 1]];

  const boxOf = ([x0, x1]) => {
    let top = height, bottom = -1;
    for (let y = 0; y < height; y++) for (let x = x0; x <= x1; x++) if (isMotif(x, y)) { if (y < top) top = y; if (y > bottom) bottom = y; break; }
    return { x: x0, y: top, w: x1 - x0 + 1, h: bottom - top + 1 };
  };
  const toPng = (c) => c.toDataURL('image/png').split(',')[1];
  const crop = (box) => {
    const c = document.createElement('canvas');
    c.width = box.w;
    c.height = box.h;
    c.getContext('2d').drawImage(img, box.x, box.y, box.w, box.h, 0, 0, box.w, box.h);
    return c;
  };

  // Postkartenmotiv: bis zum Rand des Motivs zugeschnitten.
  const card = crop(boxOf(cardRun));

  // Icon: quadratisch (transparent aufgefüllt); der weiße Hintergrund außerhalb der abgerundeten Ecken wird transparent.
  const iconBox = boxOf(iconRun);
  const iconCanvas = crop(iconBox);
  const ictx = iconCanvas.getContext('2d', { willReadFrequently: true });
  const pixels = ictx.getImageData(0, 0, iconBox.w, iconBox.h);
  const px = pixels.data;
  const WHITE = 244; // Pixel, deren dunkelster Kanal mindestens so hell ist, gelten als Hintergrund
  const isBackground = (i) => Math.min(px[i], px[i + 1], px[i + 2]) >= WHITE;
  const outside = new Uint8Array(iconBox.w * iconBox.h);
  const stack = [];
  const push = (x, y) => {
    const p = y * iconBox.w + x;
    if (!outside[p] && isBackground(p * 4)) { outside[p] = 1; stack.push(p); }
  };
  for (let x = 0; x < iconBox.w; x++) { push(x, 0); push(x, iconBox.h - 1); }
  for (let y = 0; y < iconBox.h; y++) { push(0, y); push(iconBox.w - 1, y); }
  while (stack.length) {
    const p = stack.pop();
    const x = p % iconBox.w, y = (p - x) / iconBox.w;
    if (x > 0) push(x - 1, y);
    if (x < iconBox.w - 1) push(x + 1, y);
    if (y > 0) push(x, y - 1);
    if (y < iconBox.h - 1) push(x, y + 1);
  }
  const edge = [];
  for (let y = 0; y < iconBox.h; y++) for (let x = 0; x < iconBox.w; x++) {
    const p = y * iconBox.w + x;
    if (outside[p]) { px[p * 4 + 3] = 0; continue; }
    if ((x > 0 && outside[p - 1]) || (x < iconBox.w - 1 && outside[p + 1]) || (y > 0 && outside[p - iconBox.w]) || (y < iconBox.h - 1 && outside[p + iconBox.w])) edge.push(p);
  }
  for (const p of edge) px[p * 4 + 3] = 128; // weicher Rand gegen helle Säume
  const side = Math.max(iconBox.w, iconBox.h);
  const square = document.createElement('canvas');
  square.width = side;
  square.height = side;
  const sctx = square.getContext('2d');
  const tmp = document.createElement('canvas');
  tmp.width = iconBox.w;
  tmp.height = iconBox.h;
  tmp.getContext('2d').putImageData(pixels, 0, 0);
  sctx.drawImage(tmp, Math.round((side - iconBox.w) / 2), Math.round((side - iconBox.h) / 2));

  return { icon: toPng(square), card: toPng(card), iconBox, cardBox: boxOf(cardRun) };
}

/** Läuft im Browser: verkleinert das Icon auf die Zielgrößen (in Stufen von höchstens Faktor 2) und liefert PNG (Base64) je Größe. */
async function scaleInBrowser([iconBase64, sizes]) {
  const img = new Image();
  img.src = `data:image/png;base64,${iconBase64}`;
  await img.decode();
  const out = {};
  for (const size of sizes) {
    let current = document.createElement('canvas');
    current.width = img.width;
    current.height = img.height;
    current.getContext('2d').drawImage(img, 0, 0);
    while (current.width > size) {
      const next = document.createElement('canvas');
      const target = Math.max(size, Math.ceil(current.width / 2));
      next.width = target;
      next.height = target;
      const c = next.getContext('2d');
      c.imageSmoothingEnabled = true;
      c.imageSmoothingQuality = 'high';
      c.drawImage(current, 0, 0, target, target);
      current = next;
    }
    if (current.width < size) { // Hochskalieren (512 aus einem kleineren Master) in einem Schritt
      const next = document.createElement('canvas');
      next.width = size;
      next.height = size;
      const c = next.getContext('2d');
      c.imageSmoothingEnabled = true;
      c.imageSmoothingQuality = 'high';
      c.drawImage(current, 0, 0, size, size);
      current = next;
    }
    out[size] = current.toDataURL('image/png').split(',')[1];
  }
  return out;
}

/** ICO-Datei mit PNG-Daten je Größe (ab Windows Vista und in allen Browsern lesbar); Größen bis 255 Pixel. */
export function buildIco(pngs) {
  const sizes = Object.keys(pngs).map(Number).sort((a, b) => a - b);
  if (sizes.some((size) => size < 1 || size > 255)) throw new Error(`ICO-Größen müssen zwischen 1 und 255 Pixeln liegen: ${sizes.join(', ')}`);
  const header = Buffer.alloc(6 + 16 * sizes.length);
  header.writeUInt16LE(0, 0);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(sizes.length, 4);
  let offset = header.length;
  sizes.forEach((size, i) => {
    const data = pngs[size];
    const e = 6 + 16 * i;
    header.writeUInt8(size, e);
    header.writeUInt8(size, e + 1);
    header.writeUInt8(0, e + 2);
    header.writeUInt8(0, e + 3);
    header.writeUInt16LE(1, e + 4);
    header.writeUInt16LE(32, e + 6);
    header.writeUInt32LE(data.length, e + 8);
    header.writeUInt32LE(offset, e + 12);
    offset += data.length;
  });
  return Buffer.concat([header, ...sizes.map((s) => pngs[s])]);
}

function requireFile(file, what) {
  if (!existsSync(file)) throw new Error(`${what} nicht gefunden: ${file}`);
}

/** Schneidet Icon und Postkartenmotiv aus dem Quellbild und schreibt `icon.png` und `postkarte.png` nach `docs` (IMG-UB-1). */
export async function cropSource({ source = DEFAULTS.source, docs = DEFAULTS.docs } = {}) {
  requireFile(source, 'Quellbild');
  const browser = await launch();
  try {
    const page = await browser.newPage();
    const result = await page.evaluate(splitInBrowser, readFileSync(source).toString('base64'));
    mkdirSync(docs, { recursive: true });
    writeFileSync(join(docs, 'icon.png'), Buffer.from(result.icon, 'base64'));
    writeFileSync(join(docs, 'postkarte.png'), Buffer.from(result.card, 'base64'));
    return { iconBox: result.iconBox, cardBox: result.cardBox };
  } finally {
    await browser.close();
  }
}

/** Leitet aus `icon.png` alle Icon-Dateien der Webanwendung ab und schreibt sie nach `publicDir` (IMG-UB-2). */
export async function deriveIcons({ docs = DEFAULTS.docs, publicDir = DEFAULTS.public } = {}) {
  const iconFile = join(docs, 'icon.png');
  requireFile(iconFile, 'Icon-Master');
  const browser = await launch();
  try {
    const page = await browser.newPage();
    const scaled = await page.evaluate(scaleInBrowser, [readFileSync(iconFile).toString('base64'), [16, 32, 48, 96, 180, 192, 512]]);
    const file = (size) => Buffer.from(scaled[size], 'base64');
    mkdirSync(publicDir, { recursive: true });
    writeFileSync(join(publicDir, 'favicon.ico'), buildIco({ 16: file(16), 32: file(32), 48: file(48) }));
    writeFileSync(join(publicDir, 'favicon-96x96.png'), file(96));
    writeFileSync(join(publicDir, 'apple-touch-icon.png'), file(180));
    writeFileSync(join(publicDir, 'web-app-manifest-192x192.png'), file(192));
    writeFileSync(join(publicDir, 'web-app-manifest-512x512.png'), file(512));
  } finally {
    await browser.close();
  }
}

/** Beide Schritte nacheinander (IMG-UB-3). */
export async function makeAll(options = {}) {
  const result = await cropSource(options);
  await deriveIcons(options);
  return result;
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const arg = (name) => { const i = process.argv.indexOf(name); return i > 0 ? resolve(process.argv[i + 1]) : undefined; };
  try {
    const result = await makeAll({ source: arg('--source'), docs: arg('--docs'), publicDir: arg('--public') });
    console.log(`Icon (${result.iconBox.w}×${result.iconBox.h}) und Postkartenmotiv (${result.cardBox.w}×${result.cardBox.h}) zugeschnitten; Icon-Dateien erzeugt.`);
  } catch (error) {
    console.error(error.message);
    process.exitCode = 1;
  }
}
