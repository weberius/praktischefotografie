// Gherkin: docs/contracts/gherkin/setup/web-build.feature (Daten-Sync)
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, mkdirSync, mkdtempSync, readFileSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { syncData } from '../web/tools/sync-data.mjs';
import { validSet } from './helpers.mjs';

const write = (file, value) => {
  mkdirSync(join(file, '..'), { recursive: true });
  writeFileSync(file, typeof value === 'string' ? value : JSON.stringify(value));
};

function repo({ data = validSet(), demo = null } = {}) {
  const root = mkdtempSync(join(tmpdir(), 'pf-repo-'));
  for (const [name, records] of Object.entries(data)) write(join(root, 'data', `${name}.json`), records);
  if (demo) {
    for (const [name, records] of Object.entries(demo)) write(join(root, 'demo', 'data', `${name}.json`), records);
    write(join(root, 'demo', 'content', 'posts', 'demo.md'), '# Demo');
  }
  const out = mkdtempSync(join(tmpdir(), 'pf-out-'));
  return { root, out };
}

const demoPhotographer = (over = {}) => ({ id: 'demo-p', name: '[Demo] Person', ...over });
const demoPost = { id: 'demo-post', slug: 'demo-post', title: '[Demo] Post', date: '2026-10-01', contentFile: 'content/posts/demo.md', linkedVenueIds: ['makk-koeln'] };

test('Szenario: Build kopiert validierte Daten (BLD-EV-1)', () => {
  const { root, out } = repo();
  assert.deepEqual(syncData({ root, out }).errors, []);
  assert.ok(existsSync(join(out, 'data', 'venues.json')));
});

test('Szenario: Build bricht bei ungültigen Daten ab (BLD-UN-1)', () => {
  const data = validSet();
  data.venues[0].address.zip = '1';
  const { root, out } = repo({ data });
  const { errors } = syncData({ root, out });
  assert.ok(errors.length > 0);
  assert.equal(existsSync(join(out, 'data')), false, 'es wird nichts kopiert');
});

test('Szenario: Produktionsbuild ohne Demo-Daten (BLD-UB-3)', () => {
  const { root, out } = repo({ demo: { photographers: [demoPhotographer()] } });
  assert.deepEqual(syncData({ root, out }).errors, []);
  assert.doesNotMatch(readFileSync(join(out, 'data', 'photographers.json'), 'utf8'), /demo-/);
  assert.equal(existsSync(join(out, 'content', 'posts', 'demo.md')), false);
});

test('Szenario: Demo-Modus führt Daten zusammen (BLD-OP-1)', () => {
  const { root, out } = repo({ demo: { photographers: [demoPhotographer()], posts: [demoPost] } });
  assert.deepEqual(syncData({ root, out, demo: true }).errors, []);
  const photographers = JSON.parse(readFileSync(join(out, 'data', 'photographers.json'), 'utf8'));
  assert.deepEqual(photographers.map((p) => p.id), ['martin-parr', 'demo-p']);
  assert.ok(existsSync(join(out, 'content', 'posts', 'demo.md')));
});

test('Szenario: Demo-Datensätze sind gekennzeichnet (BLD-UB-4)', () => {
  for (const bad of [demoPhotographer({ id: 'p-ohne-praefix' }), demoPhotographer({ name: 'Ohne Kennzeichnung' })]) {
    const { root, out } = repo({ demo: { photographers: [bad] } });
    const { errors } = syncData({ root, out, demo: true });
    assert.ok(errors.length > 0, JSON.stringify(bad));
  }
});
