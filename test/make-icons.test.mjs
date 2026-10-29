// Gherkin: docs/contracts/gherkin/setup/bildmaterial.feature · „Icon und Postkartenmotiv getrennt“ (IMG-UB-1), „Icon-Dateien aus dem Master“ (IMG-UB-2), „Befehl erzeugt alle Dateien“ (IMG-UB-3)
import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { existsSync, mkdtempSync, readFileSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';
import { buildIco, cropSource, deriveIcons, makeAll } from '../web/tools/make-icons.mjs';
import { decodePng, encodePng, pngSize, sampleSource } from './png-helpers.mjs';

const SCRIPT = fileURLToPath(new URL('../web/tools/make-icons.mjs', import.meta.url));

const BROWSER_HINT = /Kein Chromium/;
const workdir = () => mkdtempSync(join(tmpdir(), 'icons-'));

/** Führt den Test aus; ohne installiertes Chromium wird er übersprungen (CHROME_BIN setzen). */
async function withBrowser(t, fn) {
  try {
    await fn();
  } catch (error) {
    if (BROWSER_HINT.test(error.message)) return t.skip(error.message);
    throw error;
  }
}

test('Szenario: Icon und Postkartenmotiv getrennt – zwei zugeschnittene Dateien ohne Reste des anderen Motivs (IMG-UB-1)', async (t) => {
  await withBrowser(t, async () => {
    const dir = workdir();
    const source = join(dir, 'quelle.png');
    writeFileSync(source, sampleSource().png);
    const { iconBox, cardBox } = await cropSource({ source, docs: join(dir, 'docs') });
    assert.deepEqual(iconBox, { x: 20, y: 30, w: 43, h: 46 });
    assert.deepEqual(cardBox, { x: 120, y: 20, w: 241, h: 151 });

    const icon = decodePng(readFileSync(join(dir, 'docs/icon.png')));
    assert.equal(icon.width, icon.height, 'Icon ist quadratisch');
    assert.equal(icon.width, 46);
    assert.equal(icon.at(0, 0)[3], 0, 'linke obere Ecke ist transparent');
    assert.equal(icon.at(icon.width - 1, icon.height - 1)[3], 0, 'rechte untere Ecke ist transparent');
    assert.equal(icon.at(0, 20)[3], 0, 'aufgefüllter Rand links ist transparent');
    assert.deepEqual(icon.at(23, 23), [200, 60, 40, 255], 'Mitte des Icons bleibt erhalten');
    assert.deepEqual(icon.at(23, 3).slice(0, 3), [249, 245, 237], 'Cremefläche des Icons bleibt erhalten');
    for (let y = 0; y < icon.height; y++) for (let x = 0; x < icon.width; x++) {
      const [r, g, b, a] = icon.at(x, y);
      assert.ok(!(a > 0 && r < 100 && g < 150 && b > 150), `kein Blau der Postkarte im Icon (${x},${y})`);
    }

    const card = decodePng(readFileSync(join(dir, 'docs/postkarte.png')));
    assert.equal(card.width, 241);
    assert.equal(card.height, 151);
    assert.ok(card.width > card.height, 'Querformat');
    const white = ([r, g, b]) => r >= 253 && g >= 253 && b >= 253;
    for (let x = 0; x < card.width; x++) assert.ok(!white(card.at(x, 0)) && !white(card.at(x, card.height - 1)), 'kein weißer Rand oben/unten');
    for (let y = 0; y < card.height; y++) assert.ok(!white(card.at(0, y)) && !white(card.at(card.width - 1, y)), 'kein weißer Rand links/rechts');
    for (let y = 0; y < card.height; y++) for (let x = 0; x < card.width; x++) {
      const [r, g, b] = card.at(x, y);
      assert.ok(!(r === 200 && g === 60 && b === 40), 'keine rote Icon-Mitte in der Postkarte');
    }
  });
});

test('Szenario: Icon und Postkartenmotiv getrennt – ein Quellbild mit nur einem Motiv bricht mit verständlicher Meldung ab (IMG-UB-1)', async (t) => {
  const width = 80, height = 60;
  const rgba = new Uint8Array(width * height * 4).fill(255);
  for (let y = 10; y < 50; y++) for (let x = 10; x < 70; x++) rgba.set([10, 10, 10, 255], (y * width + x) * 4);
  const dir = workdir();
  const source = join(dir, 'ein-motiv.png');
  writeFileSync(source, encodePng(width, height, rgba));
  await withBrowser(t, async () => {
    await assert.rejects(cropSource({ source, docs: join(dir, 'docs') }), /1 Motive gefunden, erwartet sind 2/);
  });
});

test('Szenario: Icon und Postkartenmotiv getrennt – fehlendes Quellbild wird gemeldet (IMG-UB-1)', async () => {
  await assert.rejects(cropSource({ source: join(workdir(), 'gibt-es-nicht.png'), docs: workdir() }), /Quellbild nicht gefunden/);
});

test('Szenario: Befehl erzeugt alle Dateien – ohne Icon-Master meldet die Ableitung den Fehler (IMG-UB-3)', async () => {
  await assert.rejects(deriveIcons({ docs: workdir(), publicDir: workdir() }), /Icon-Master nicht gefunden/);
});

test('Szenario: Favicon enthält drei Größen – buildIco legt Kopf, Verzeichnis und PNG-Daten ohne Browser korrekt an (ICO-UB-1)', () => {
  const png = (size) => encodePng(size, size, new Uint8Array(size * size * 4).fill(200));
  const pngs = { 48: png(48), 16: png(16), 32: png(32) };
  const ico = buildIco(pngs);
  assert.deepEqual([ico.readUInt16LE(0), ico.readUInt16LE(2), ico.readUInt16LE(4)], [0, 1, 3], 'reserviert, Typ Icon, Anzahl');
  let offset = 6 + 16 * 3;
  [16, 32, 48].forEach((size, i) => {
    const e = 6 + 16 * i;
    assert.equal(ico.readUInt8(e), size, `Breite ${size}`);
    assert.equal(ico.readUInt8(e + 1), size, `Höhe ${size}`);
    assert.equal(ico.readUInt16LE(e + 6), 32, 'Bit pro Pixel');
    assert.equal(ico.readUInt32LE(e + 8), pngs[size].length, `Länge ${size}`);
    assert.equal(ico.readUInt32LE(e + 12), offset, `Offset ${size}`);
    assert.deepEqual(pngSize(ico.subarray(offset, offset + pngs[size].length)), { width: size, height: size });
    offset += pngs[size].length;
  });
  assert.equal(offset, ico.length, 'keine überzähligen Bytes');
});

test('Szenario: Favicon enthält drei Größen – buildIco lehnt Größen über 255 Pixel ab (ICO-UB-1)', () => {
  assert.throws(() => buildIco({ 256: Buffer.alloc(1) }), /zwischen 1 und 255/);
});

/** Prüft die Ergebnisse von `deriveIcons` in einem Ausgabeordner. */
function assertIconFiles(publicDir) {
  const size = (file) => pngSize(readFileSync(join(publicDir, file)));
  assert.deepEqual(size('favicon-96x96.png'), { width: 96, height: 96 });
  assert.deepEqual(size('apple-touch-icon.png'), { width: 180, height: 180 });
  assert.deepEqual(size('web-app-manifest-192x192.png'), { width: 192, height: 192 });
  assert.deepEqual(size('web-app-manifest-512x512.png'), { width: 512, height: 512 });
  const ico = readFileSync(join(publicDir, 'favicon.ico'));
  assert.deepEqual([0, 1, 2].map((i) => ico.readUInt8(6 + 16 * i)), [16, 32, 48]);
  const corner = decodePng(readFileSync(join(publicDir, 'web-app-manifest-192x192.png')));
  assert.equal(corner.at(0, 0)[3], 0, 'Ecke transparent');
  assert.equal(corner.at(96, 96)[3], 255, 'Mitte deckend');
}

test('Szenario: Icon-Dateien aus dem Master und Befehl erzeugt alle Dateien – makeAll liefert Icon, Postkarte und alle fünf Icon-Dateien in temporären Ordnern (IMG-UB-2, IMG-UB-3)', async (t) => {
  await withBrowser(t, async () => {
    const dir = workdir();
    const source = join(dir, 'quelle.png');
    writeFileSync(source, sampleSource().png);
    await makeAll({ source, docs: join(dir, 'docs'), publicDir: join(dir, 'public') });
    for (const file of ['icon.png', 'postkarte.png']) assert.ok(existsSync(join(dir, 'docs', file)), file);
    assertIconFiles(join(dir, 'public'));
  });
});

test('Szenario: Befehl erzeugt alle Dateien – der Aufruf über die Kommandozeile mit --source, --docs und --public erzeugt alle Dateien und meldet es (IMG-UB-3)', async (t) => {
  await withBrowser(t, async () => {
    const dir = workdir();
    const source = join(dir, 'quelle.png');
    writeFileSync(source, sampleSource().png);
    let output;
    try {
      output = execFileSync(process.execPath, [SCRIPT, '--source', source, '--docs', join(dir, 'docs'), '--public', join(dir, 'public')], { encoding: 'utf8', env: process.env });
    } catch (error) {
      const message = `${error.stdout ?? ''}${error.stderr ?? ''}`;
      if (/Kein Chromium/.test(message)) throw new Error(message, { cause: error });
      throw error;
    }
    assert.match(output, /Icon \(43×46\) und Postkartenmotiv \(241×151\) zugeschnitten; Icon-Dateien erzeugt\./);
    assertIconFiles(join(dir, 'public'));
  });
});
