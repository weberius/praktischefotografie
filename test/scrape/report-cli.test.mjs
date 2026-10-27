// Gherkin: docs/contracts/gherkin/setup/datenaktualisierung.feature (Bericht, Einzelner Ort oder alle, Unbekannte Ort-ID), Q-MAIN-2
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { main as check } from '../../scripts/scrape/check-proposals.mjs';
import { resolveVenues } from '../../scripts/scrape/lib/common.mjs';
import { writeReport } from '../../scripts/scrape/lib/report.mjs';
import { venue } from '../helpers.mjs';
import { DATE, change, workspace } from './helpers.mjs';

const ROOT = fileURLToPath(new URL('../..', import.meta.url));

test('Szenario: Bericht am Laufende (UPD-EV-3, Q-REL-1)', () => {
  const verified = venue({ source: { ...venue().source, status: 'verifiziert' } });
  const ws = workspace({ venues: [verified], proposal: [change(), change({ id: 'x', field: 'type', newValue: 'handel' })] });
  check(['--date', DATE], ws.root);
  const dir = join(ws.root, 'updates', DATE);
  writeFileSync(
    join(dir, 'fetch-summary.json'),
    JSON.stringify({
      date: DATE,
      venues: [
        { venueId: 'a', status: 'abgerufen', errors: [], notes: [] },
        { venueId: 'b', status: 'abgerufen', errors: [], notes: ['https://x/y: laut robots.txt nicht erlaubt'] },
        { venueId: 'c', status: 'fehlgeschlagen', errors: [{ url: 'https://c.example.org/', reason: 'HTTP 503' }], notes: [] },
        { venueId: 'd', status: 'übersprungen', errors: [], notes: [] },
      ],
    }),
  );
  const text = writeReport({ root: ws.root, date: DATE });
  assert.equal(readFileSync(join(dir, 'REPORT.md'), 'utf8'), text);
  assert.match(text, /Orte abgerufen: 2/);
  assert.match(text, /Orte fehlgeschlagen: 1/);
  assert.match(text, /Orte übersprungen: 1/);
  assert.match(text, /Ergänzt: 1/);
  assert.match(text, /Geändert: 0/);
  assert.match(text, /Verworfen: 1/);
  assert.match(text, /Konflikte: 1/);
  assert.match(text, /c\.example\.org.*HTTP 503/);
  assert.match(text, /robots\.txt nicht erlaubt/);
});

test('Szenario: Einzelner Ort oder alle (UPD-OP-1)', () => {
  const venues = Array.from({ length: 20 }, (_, i) => ({ id: `ort-${i}` }));
  assert.equal(resolveVenues(venues).length, 20);
  assert.deepEqual(resolveVenues(venues, 'ort-3'), [{ id: 'ort-3' }]);
});

test('Einzelner Ort: nur dessen Vorschlagsdatei wird geprüft (UPD-OP-1)', () => {
  const ws = workspace({ proposal: [change()] });
  const other = join(ws.root, 'updates', DATE, 'anderer-ort.json');
  mkdirSync(join(ws.root, 'updates', DATE), { recursive: true });
  writeFileSync(other, JSON.stringify({ venueId: 'anderer-ort', changes: [] }));
  const results = check(['--date', DATE, '--venue', 'makk-koeln'], ws.root);
  assert.deepEqual(results.map((r) => r.venueId), ['makk-koeln']);
});

test('Szenario: Unbekannte Ort-ID (UPD-UN-2, Q-MAIN-2)', () => {
  assert.throws(() => resolveVenues([{ id: 'a' }, { id: 'b' }], 'gibt-es-nicht'), /Gültige IDs: a, b/);
  for (const script of ['check-proposals', 'apply-proposals', 'fetch-venues']) {
    const r = spawnSync('node', [`scripts/scrape/${script}.mjs`, '--venue', 'gibt-es-nicht', '--offline'], { cwd: ROOT, encoding: 'utf8', env: { ...process.env, SCRAPE_CONTACT: 'x@example.org' } });
    assert.equal(r.status, 1, script);
    assert.match(r.stderr, /Gültige IDs: .*makk-koeln/, script);
  }
});
