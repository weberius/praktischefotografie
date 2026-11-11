// Gherkin: docs/contracts/gherkin/content/daten.feature (Bestandsszenarien), Q-DATA-2, Q-PERF-1, Q-PERF-2, Q-USE-1
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, statSync, readdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { validateData, NRW_BBOX } from '../scripts/validate-data.mjs';

const dataDir = fileURLToPath(new URL('../data/', import.meta.url));
const venues = JSON.parse(readFileSync(`${dataDir}venues.json`, 'utf8'));

test('Szenario: Datenbestand enthält 20 bis 60 Venues (VEN-UB-8, Q-DATA-21)', () => {
  assert.ok(venues.length >= 20 && venues.length <= 60, `Anzahl: ${venues.length}`);
});

test('Szenario: Düsseldorfer Orte sind im Katalog und liegen in Düsseldorf (VEN-UB-9 bis VEN-UB-11, Q-DATA-22)', () => {
  const erwartet = {
    'k20-duesseldorf': 'museum',
    'k21-duesseldorf': 'museum',
    'stadtmuseum-duesseldorf': 'museum',
    'filmmuseum-duesseldorf': 'museum',
    'leica-galerie-duesseldorf': 'gallery',
    'galerie-noir-blanche-duesseldorf': 'gallery',
    'galerie-voss-duesseldorf': 'gallery',
    'lumas-duesseldorf': 'gallery',
    'sammlung-philara-duesseldorf': 'off_space',
    'plan-d-produzentengalerie-duesseldorf': 'off_space',
    'gerhart-hauptmann-haus-duesseldorf': 'foundation',
    'polnisches-institut-duesseldorf': 'foundation',
  };
  for (const [id, type] of Object.entries(erwartet)) {
    const v = venues.find((x) => x.id === id);
    assert.ok(v, `fehlt: ${id}`);
    assert.equal(v.type, type, id);
    assert.equal(v.city, 'Düsseldorf', id);
    assert.ok(v.address.lat >= 51.12 && v.address.lat <= 51.36 && v.address.lng >= 6.65 && v.address.lng <= 6.95, id);
    assert.ok(v.website && v.source.url && v.source.checkedAt && v.source.status, id);
  }
});

test('Szenario: Dortmunder Orte sind im Katalog und liegen in Dortmund (VEN-UB-12 bis VEN-UB-14, Q-DATA-23)', () => {
  const erwartet = {
    'projektraum-fotografie-dortmund': 'off_space',
    'kulturort-depot-dortmund': 'off_space',
    'kunsthalle-dortmund': 'gallery',
    'fh-dortmund-design-dortmund': 'foundation',
  };
  for (const [id, type] of Object.entries(erwartet)) {
    const v = venues.find((x) => x.id === id);
    assert.ok(v, `fehlt: ${id}`);
    assert.equal(v.type, type, id);
  }
  assert.equal(venues.filter((v) => v.id === 'museum-ostwall-dortmund').length, 1);
  const dortmund = venues.filter((v) => v.city === 'Dortmund');
  for (const v of dortmund) {
    assert.ok(v.address.lat >= 51.4 && v.address.lat <= 51.62 && v.address.lng >= 7.3 && v.address.lng <= 7.66, v.id);
    assert.ok(v.website && v.source.url && v.source.checkedAt && ['recherchiert', 'verifiziert'].includes(v.source.status), v.id);
  }
});

test('Szenario: Koordinaten liegen in NRW (VEN-UB-2)', () => {
  for (const { id, address: a } of venues) {
    assert.ok(a.lat >= NRW_BBOX.latMin && a.lat <= NRW_BBOX.latMax && a.lng >= NRW_BBOX.lngMin && a.lng <= NRW_BBOX.lngMax, id);
  }
});

test('Szenario: Venue-IDs sind eindeutig und kebab-case (VEN-UB-3)', () => {
  const ids = venues.map((v) => v.id);
  assert.equal(new Set(ids).size, ids.length);
  for (const id of ids) assert.match(id, /^[a-z0-9]+(-[a-z0-9]+)*$/);
});

test('Szenario: Kernstädte sind vertreten (VEN-UB-4)', () => {
  const cities = new Set(venues.map((v) => v.city));
  for (const c of ['Monschau', 'Köln', 'Düsseldorf', 'Essen', 'Gelsenkirchen']) assert.ok(cities.has(c), `fehlt: ${c}`);
});

test('Szenario: Jede Venue nennt Quelle und Prüfstand (VEN-UB-5, Q-DATA-2)', () => {
  for (const v of venues) {
    assert.ok(v.source.url && v.source.checkedAt && v.source.status, v.id);
    assert.ok(new Date(v.source.checkedAt) <= new Date(), v.id);
  }
});

test('Szenario: Neue Venues sind im Katalog (VEN-UB-6, VEN-UB-7)', () => {
  const erwartet = [
    { id: 'forum-fuer-fotografie-koeln', type: 'gallery', city: 'Köln', website: 'https://de.forum-fotografie.info/' },
    { id: 'kunstmuseum-bonn', type: 'museum', city: 'Bonn', website: 'https://www.kunstmuseum-bonn.de/de/' },
  ];
  for (const e of erwartet) {
    const v = venues.find((x) => x.id === e.id);
    assert.ok(v, `fehlt: ${e.id}`);
    assert.equal(v.type, e.type);
    assert.equal(v.city, e.city);
    assert.equal(v.website, e.website);
    assert.ok(v.source.url && v.source.checkedAt && v.source.status, e.id);
  }
});

test('Q-USE-1: Adresse als Text vollständig', () => {
  for (const { id, address: a } of venues) assert.ok(a.street && a.zip && a.city, id);
});

test('Q-PERF-1: Dateigrößen', () => {
  assert.ok(statSync(`${dataDir}venues.json`).size <= 100 * 1024);
  const total = readdirSync(dataDir).reduce((sum, f) => sum + statSync(`${dataDir}${f}`).size, 0);
  assert.ok(total <= 250 * 1024);
});

test('Gesamter Datenbestand ist gültig, Q-PERF-2: Laufzeit < 5 s', () => {
  const start = performance.now();
  const { errors } = validateData();
  const ms = performance.now() - start;
  assert.deepEqual(errors, []);
  assert.ok(ms < 5000, `${ms.toFixed(0)} ms`);
});
