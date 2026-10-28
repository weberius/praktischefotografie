// Gherkin: docs/contracts/gherkin/setup/datenaktualisierung.feature (UPD-UB-6 bis UPD-UB-8, UPD-UN-3, UPD-OP-2),
// setup/webseiten-abruf.feature (FET-OP-2), Q-DATA-6, Q-MAIN-2
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { mkdirSync, mkdtempSync, readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { main as apply } from '../../scripts/scrape/apply-proposals.mjs';
import { main as check } from '../../scripts/scrape/check-proposals.mjs';
import { loadSources, resolveVenues } from '../../scripts/scrape/lib/common.mjs';
import { fetchVenues } from '../../scripts/scrape/lib/fetcher.mjs';
import { buildReport } from '../../scripts/scrape/lib/report.mjs';
import { saveSnapshot } from '../../scripts/scrape/lib/snapshots.mjs';
import { exhibition, validSet, venue } from '../helpers.mjs';
import { testServer, page } from './server.mjs';
import { DATE } from './helpers.mjs';

const ORG_URL = 'https://photoszene.example.org/festival';
const TEXT = 'Das Photoszene-Festival 2027 findet vom 14. Mai bis 13. Juni 2027 in Köln statt. Der Verein Photoszene Köln lädt ein. Ausstellung Neue Positionen im MAKK.';
const evidence = (excerpt) => ({ url: ORG_URL, excerpt });

const festival = (over = {}) => ({ organizerId: 'photoszene-koeln', title: 'Photoszene-Festival 2027', startDate: '2027-05-14', endDate: '2027-06-13', city: 'Köln', ...over });
const add = (id, dataset, record, excerpt = 'Photoszene-Festival 2027 findet vom 14. Mai') => ({ id, dataset, op: 'add', record, evidence: evidence(excerpt) });

function workspace({ source = 'organizer', changes, set = {} }) {
  const root = mkdtempSync(join(tmpdir(), 'pf-fes-ws-'));
  mkdirSync(join(root, 'data'), { recursive: true });
  const data = { ...validSet(), organizers: [{ id: 'photoszene-koeln', name: 'Internationale Photoszene Köln gUG', type: 'association', city: 'Köln', website: 'https://photoszene.example.org/' }], ...set };
  for (const [name, records] of Object.entries(data)) writeFileSync(join(root, 'data', `${name}.json`), JSON.stringify(records, null, 2));
  const id = source === 'organizer' ? 'photoszene-koeln' : 'makk-koeln';
  saveSnapshot(join(root, '.cache', 'snapshots'), id, { url: ORG_URL, fetchedAt: `${DATE}T10:00:00.000Z`, status: 200, title: 'Festival', text: TEXT, links: [] });
  mkdirSync(join(root, 'updates', DATE), { recursive: true });
  const file = join(root, 'updates', DATE, `${id}.json`);
  writeFileSync(file, JSON.stringify({ ...(source === 'organizer' ? { organizerId: id } : { venueId: id }), fetchedAt: DATE, changes }, null, 2));
  return { root, file, id };
}
const run = (ws) => check(['--date', DATE, '--venue', ws.id], ws.root);
const proposal = (ws) => JSON.parse(readFileSync(ws.file, 'utf8'));
const approveAll = (ws) => {
  const p = proposal(ws);
  p.changes.forEach((c) => (c.approved = true));
  writeFileSync(ws.file, JSON.stringify(p, null, 2));
};
const data = (ws, name) => JSON.parse(readFileSync(join(ws.root, 'data', `${name}.json`), 'utf8'));

test('Szenario: Veranstalter und Festivals als Vorschläge – id, Art, Übernahme ohne source (UPD-UB-7, UPD-OP-2)', () => {
  const ws = workspace({ changes: [add('f1', 'festivals', festival())] });
  const result = run(ws)[0];
  assert.deepEqual(result, { venueId: 'photoszene-koeln', accepted: 1, rejected: 0 });
  const [c] = proposal(ws).changes;
  assert.equal(c.record.id, 'photoszene-festival-2027');
  assert.equal(c.kind, 'ergänzt');
  approveAll(ws);
  const applied = apply(['--date', DATE, '--venue', 'photoszene-koeln'], ws.root);
  assert.equal(applied.ok, true);
  assert.deepEqual(applied.applied, [{ venueId: 'photoszene-koeln', id: 'f1' }]);
  assert.equal(data(ws, 'festivals')[0].title, 'Photoszene-Festival 2027');
  assert.equal(data(ws, 'organizers')[0].source, undefined, 'Veranstalter erhalten kein source');
  assert.match(buildReport({ root: ws.root, date: DATE }), /Übernommen: 1/);
});

test('Festival ohne Jahr im Titel erhält Titel und Jahr als id (UPD-UB-7)', () => {
  const ws = workspace({ changes: [add('f1', 'festivals', festival({ title: 'Photoszene Festival' }), 'Photoszene-Festival 2027')] });
  const p = proposal(ws);
  p.changes[0].evidence.excerpt = 'Photoszene Festival';
  writeFileSync(ws.file, JSON.stringify(p));
  saveSnapshot(join(ws.root, '.cache', 'snapshots'), 'photoszene-koeln', { url: ORG_URL, fetchedAt: `${DATE}T10:00:00.000Z`, status: 200, title: 'F', text: `${TEXT} Photoszene Festival`, links: [] });
  run(ws);
  assert.equal(proposal(ws).changes[0].record.id, 'photoszene-festival-2027');
});

test('Szenario: Vorschläge von Veranstaltern bleiben im eigenen Bereich (UPD-UB-6, Q-DATA-6)', () => {
  const ws = workspace({
    set: { organizers: [{ id: 'photoszene-koeln', name: 'Internationale Photoszene Köln gUG', type: 'association', city: 'Köln', website: 'https://photoszene.example.org/' }, { id: 'anderer', name: 'Anderer Veranstalter', type: 'association', city: 'Essen' }] },
    changes: [
      add('eigen', 'festivals', festival()),
      add('fremd', 'festivals', festival({ organizerId: 'anderer', title: 'Fremdes Festival 2027' }), 'Photoszene-Festival 2027 findet'),
      { id: 'ort', dataset: 'venues', recordId: 'makk-koeln', field: 'district', newValue: 'Altstadt', evidence: evidence('Photoszene Köln') },
      add('ohnefestival', 'exhibitions', { venueId: 'makk-koeln', title: 'Neue Positionen', startDate: '2027-05-14', endDate: '2027-06-15', type: 'solo', photographerIds: [] }, 'Ausstellung Neue Positionen'),
      add('mitfestival', 'exhibitions', { venueId: 'makk-koeln', festivalId: 'photoszene-festival-2027', isOfficialFestivalPartner: true, title: 'Neue Positionen', startDate: '2027-05-14', endDate: '2027-06-15', type: 'solo', photographerIds: [] }, 'Ausstellung Neue Positionen'),
      add('event', 'events', { venueId: 'makk-koeln', title: 'Neue Positionen', eventType: 'talk', startDate: '2027-05-14', endDate: '2027-05-14', city: 'Köln', isCommercial: false }, 'Neue Positionen'),
    ],
  });
  run(ws);
  const p = proposal(ws);
  assert.deepEqual(p.changes.map((c) => c.id), ['eigen', 'mitfestival']);
  assert.deepEqual(p.rejected.map((c) => c.id), ['fremd', 'ort', 'ohnefestival', 'event']);
  assert.match(p.rejected.find((c) => c.id === 'fremd').reason, /gehört nicht zu diesem Veranstalter/);
});

test('Ort-Website darf Veranstalter und Festivals ergänzen, aber nicht ändern (UPD-UB-6)', () => {
  const ws = workspace({
    source: 'venue',
    changes: [
      add('org', 'organizers', { name: 'Neuer Verein', type: 'association', city: 'Köln' }, 'Verein Photoszene Köln'),
      add('fest', 'festivals', festival(), 'Photoszene-Festival 2027 findet'),
      { id: 'aendern', dataset: 'organizers', recordId: 'photoszene-koeln', field: 'city', newValue: 'Bonn', evidence: evidence('Photoszene Köln') },
      { id: 'festaendern', dataset: 'festivals', recordId: 'x', field: 'city', newValue: 'Bonn', evidence: evidence('Photoszene Köln') },
    ],
  });
  // Der Textauszug für den neuen Verein muss dessen Namen enthalten.
  const p = proposal(ws);
  p.changes[0].evidence.excerpt = 'Verein Photoszene Köln';
  p.changes[0].record.name = 'Verein Photoszene Köln';
  writeFileSync(ws.file, JSON.stringify(p));
  run(ws);
  const result = proposal(ws);
  assert.deepEqual(result.changes.map((c) => c.id), ['org', 'fest']);
  assert.equal(result.changes[0].record.id, 'verein-photoszene-koeln');
  assert.deepEqual(result.rejected.map((c) => c.id), ['aendern', 'festaendern']);
});

test('Szenario: Keine Dubletten bei Veranstaltern und Festivals (UPD-UB-8)', () => {
  const ws = workspace({
    set: { festivals: [{ id: 'photoszene-festival-2027', ...festival() }], organizers: [{ id: 'photoszene-koeln', name: 'Photoszene Köln', type: 'association', city: 'Köln', website: 'https://photoszene.example.org/' }] },
    changes: [add('f', 'festivals', festival({ title: 'PHOTOSZENE-festival 2027' }), 'Photoszene-Festival 2027'), add('o', 'organizers', { name: ' photoszene  köln ', type: 'association', city: 'Köln' }, 'Photoszene Köln')],
  });
  run(ws);
  const p = proposal(ws);
  assert.deepEqual(p.rejected.map((c) => c.id), ['f', 'o']);
  assert.ok(p.rejected.every((c) => c.reason.startsWith('Dublette')));
});

test('Szenario: Festival ohne belegten Zeitraum (UPD-UN-3, Q-DATA-6)', () => {
  const noEnd = festival();
  delete noEnd.endDate;
  const ws = workspace({
    changes: [
      add('ohne-ende', 'festivals', noEnd),
      add('kein-datum', 'festivals', festival({ startDate: 'Mai 2027' })),
      add('ohne-titel-im-auszug', 'festivals', festival(), 'Der Verein Photoszene Köln lädt ein'),
    ],
  });
  run(ws);
  const p = proposal(ws);
  assert.equal(p.changes.length, 0);
  assert.deepEqual(p.rejected.map((c) => c.id), ['ohne-ende', 'kein-datum', 'ohne-titel-im-auszug']);
  assert.match(p.rejected[0].reason, /ohne gültigen Zeitraum/);
  assert.match(p.rejected[2].reason, /Textauszug enthält/);
  assert.match(buildReport({ root: ws.root, date: DATE }), /verworfen photoszene-koeln ohne-ende: Festival ohne gültigen Zeitraum/);
});

test('Szenario: Abruf der Website eines Veranstalters (FET-OP-2, Q-SEC-4)', async () => {
  const s = await testServer({ '/': { body: page('Start', '<a href="/festival">Festival</a>') }, '/festival': { body: page('Festival', 'Das Festival') } });
  try {
    const root = mkdtempSync(join(tmpdir(), 'pf-src-'));
    mkdirSync(join(root, 'data'));
    writeFileSync(join(root, 'data', 'venues.json'), JSON.stringify([venue()]));
    writeFileSync(join(root, 'data', 'organizers.json'), JSON.stringify([
      { id: 'photoszene-koeln', name: 'Photoszene', type: 'association', city: 'Köln', website: s.url },
      { id: 'ohne-website', name: 'Ohne Website', type: 'association', city: 'Köln' },
    ]));
    const sources = loadSources(root);
    assert.deepEqual(sources.map((x) => x.id), ['makk-koeln', 'photoszene-koeln']);
    const [only] = resolveVenues(sources, 'photoszene-koeln');
    const snapshotDir = join(root, '.cache', 'snapshots');
    const [summary] = await fetchVenues([only], { minDelayMs: 0, timeoutMs: 2000, contact: 'redaktion@example.org', snapshotDir });
    assert.equal(summary.venueId, 'photoszene-koeln');
    assert.equal(summary.status, 'abgerufen');
    assert.equal(s.requests[0].path, '/robots.txt', 'robots.txt zuerst, wie bei Orten');
    const files = readdirSync(join(snapshotDir, 'photoszene-koeln'));
    assert.ok(files.length >= 1, 'Snapshots liegen unter .cache/snapshots/<organizer-id>/');
    assert.throws(() => resolveVenues(sources, 'gibt-es-nicht'), /Unbekannte Ort- oder Veranstalter-ID "gibt-es-nicht". Gültige IDs: makk-koeln, photoszene-koeln/);
  } finally {
    await s.close();
  }
});

test('Quelle, die weder Ort noch Veranstalter ist, ergibt einen Fehler', () => {
  const ws = workspace({ changes: [] });
  writeFileSync(ws.file, JSON.stringify({ organizerId: 'gibt-es-nicht', changes: [] }));
  assert.throws(() => run(ws), /existiert weder als Ort noch als Veranstalter/);
});

test('Ausstellung, die ein Festival referenziert, bleibt nach Übernahme valide (UPD-UB-6)', () => {
  const ws = workspace({
    changes: [
      add('fest', 'festivals', festival()),
      add('ausst', 'exhibitions', { venueId: 'makk-koeln', festivalId: 'photoszene-festival-2027', isOfficialFestivalPartner: true, title: 'Neue Positionen', startDate: '2027-05-14', endDate: '2027-06-15', type: 'solo', photographerIds: [] }, 'Ausstellung Neue Positionen'),
    ],
    set: { exhibitions: [exhibition()] },
  });
  run(ws);
  approveAll(ws);
  const result = apply(['--date', DATE, '--venue', 'photoszene-koeln'], ws.root);
  assert.equal(result.ok, true, result.errors?.join('\n'));
  assert.equal(result.applied.length, 2);
  assert.equal(data(ws, 'exhibitions').at(-1).festivalId, 'photoszene-festival-2027');
});
