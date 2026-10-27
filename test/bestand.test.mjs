// Gherkin: docs/contracts/gherkin/content/daten.feature (Bestandsszenarien), Q-DATA-2, Q-PERF-1, Q-PERF-2, Q-USE-1
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, statSync, readdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { validateData, NRW_BBOX } from '../scripts/validate-data.mjs';

const dataDir = fileURLToPath(new URL('../data/', import.meta.url));
const venues = JSON.parse(readFileSync(`${dataDir}venues.json`, 'utf8'));

test('Szenario: Datenbestand enthält 20 bis 30 Venues (VEN-UB-1)', () => {
  assert.ok(venues.length >= 20 && venues.length <= 30, `Anzahl: ${venues.length}`);
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
