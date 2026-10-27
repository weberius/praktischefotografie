// Gherkin: docs/contracts/gherkin/setup/datenvalidierung.feature und content/daten.feature (Validierungsszenarien)
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { execFileSync, spawnSync } from 'node:child_process';
import { existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { run, validSet, venue, exhibition, withVenues } from './helpers.mjs';
import { DATASETS } from '../scripts/validate-data.mjs';

const script = fileURLToPath(new URL('../scripts/validate-data.mjs', import.meta.url));
const schemaDir = fileURLToPath(new URL('../schema/', import.meta.url));

test('Szenario: Jeder Datensatztyp hat ein Schema (DAT-UB-1)', () => {
  for (const name of DATASETS) assert.ok(existsSync(`${schemaDir}${name}.schema.json`), name);
});

test('Szenario: Gültige Daten bestehen die Validierung (VAL-EV-1, VAL-EV-2)', () => {
  const { errors, counts } = run(validSet());
  assert.deepEqual(errors, []);
  assert.equal(counts.venues, 1);
});

test('Szenario: CLI endet mit Exit-Code 0 und nennt Anzahl je Datei (VAL-EV-2)', () => {
  const out = execFileSync('node', [script], { encoding: 'utf8' });
  assert.match(out, /venues\.json: \d+ Datensätze/);
  assert.match(out, /Validierung bestanden/);
});

test('Szenario: CLI endet bei Fehlern mit Exit-Code 1 (VAL-UN-1)', () => {
  const r = spawnSync('node', [script, '--data-dir', '/nonexistent/data'], { encoding: 'utf8' });
  assert.equal(r.status, 1);
  assert.match(r.stderr, /venues\.json: Datei fehlt/);
});

test('Szenario: Venue-Datensatz ist vollständig (DAT-UB-2, DAT-UB-4)', async (t) => {
  for (const feld of ['id', 'name', 'shortName', 'type', 'city', 'address', 'website', 'features', 'source']) {
    await t.test(feld, () => {
      const v = venue();
      delete v[feld];
      const { errors } = run(withVenues([v]));
      assert.ok(errors.some((e) => e.includes(feld)), errors.join('\n'));
    });
  }
});

test('Szenario: Venue-Typ ist ein erlaubter Wert (DAT-UB-3)', () => {
  assert.deepEqual(run(withVenues([venue({ type: 'library_archive' })])).errors, []);
  assert.ok(run(withVenues([venue({ type: 'kamerahandel' })])).errors.length > 0);
});

test('Szenario: Präsenzbibliothek erfordert Hinweistext (DAT-OP-1)', () => {
  const v = venue({ features: { hasPermanentCollection: true, hasReferenceLibrary: true } });
  const { errors } = run(withVenues([v]));
  assert.ok(errors.some((e) => e.includes('libraryNotes')), errors.join('\n'));
  const ohne = venue({ features: { hasPermanentCollection: true, hasReferenceLibrary: false } });
  assert.deepEqual(run(withVenues([ohne])).errors, []);
});

test('Szenario: Ausstellung endet nicht vor Beginn (DAT-UN-1, VAL-UN-5)', () => {
  const set = { ...validSet(), exhibitions: [exhibition({ id: 'a-1', startDate: '2026-11-01', endDate: '2026-10-01' })] };
  assert.ok(run(set).errors.some((e) => e.startsWith('exhibitions.json: a-1 endDate')));
});

test('Szenario: Schemaverstoß wird gemeldet (VAL-UN-1)', () => {
  const v = venue({ id: 'x-test', address: { ...venue().address, zip: '12' } });
  const { errors } = run(withVenues([v]));
  assert.ok(errors.some((e) => e.startsWith('venues.json: x-test address/zip – ')), errors.join('\n'));
});

test('Szenario: Unbekannte Referenz wird gemeldet (VAL-UN-2)', () => {
  const set = { ...validSet(), exhibitions: [exhibition({ id: 'a-1', venueId: 'gibt-es-nicht' })] };
  const { errors } = run(set);
  assert.ok(errors.some((e) => e.includes('exhibitions.json: a-1 venueId')), errors.join('\n'));
});

test('Szenario: Doppelte ID wird gemeldet (VAL-UN-3)', () => {
  const { errors } = run(withVenues([venue({ id: 'doppelt' }), venue({ id: 'doppelt' })]));
  assert.ok(errors.some((e) => e.includes('doppelt') && e.includes('doppelte id')));
});

test('Szenario: Koordinaten außerhalb NRW werden gemeldet (VAL-UN-4)', () => {
  const v = venue({ id: 'muenchen', address: { ...venue().address, lat: 48.1, lng: 11.6 } });
  assert.ok(run(withVenues([v])).errors.some((e) => e.includes('muenchen') && e.includes('außerhalb NRW')));
});

test('Szenario: Validierung greift nicht auf das Netz zu (VAL-UB-1, Q-SEC-1)', () => {
  const realFetch = globalThis.fetch;
  globalThis.fetch = () => { throw new Error('Netzwerkzugriff verboten'); };
  try {
    assert.deepEqual(run(validSet()).errors, []);
  } finally {
    globalThis.fetch = realFetch;
  }
});

test('Q-SEC-1: keine Telemetrie-Abhängigkeit in package.json', async () => {
  const { default: pkg } = await import('../package.json', { with: { type: 'json' } });
  const deps = Object.keys({ ...pkg.dependencies, ...pkg.devDependencies });
  assert.deepEqual(deps.filter((d) => /sentry|analytics|segment|telemetry|mixpanel/i.test(d)), []);
});

test('Szenario: Beitrag mit Kurzvorschau (DAT-UB-6)', () => {
  const post = (excerpt) => ({ id: 'p-1', slug: 'p-1', title: 'T', date: '2026-11-02', excerpt, contentFile: 'content/posts/da.md' });
  const files = ['content/posts/da.md'];
  assert.deepEqual(run({ ...validSet(), posts: [post('Kurzer Text.')] }, { files }).errors, []);
  assert.ok(run({ ...validSet(), posts: [post('')] }, { files }).errors.some((e) => e.includes('excerpt')));
  assert.ok(run({ ...validSet(), posts: [post('x'.repeat(301))] }, { files }).errors.some((e) => e.includes('excerpt')));
  const ohne = post('x'); delete ohne.excerpt;
  assert.deepEqual(run({ ...validSet(), posts: [ohne] }, { files }).errors, []);
});
