// Gherkin: docs/contracts/gherkin/setup/datenaktualisierung.feature (UPD-*), Q-DATA-1, Q-DATA-3
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { applyProposals, checkProposalFile } from '../../scripts/scrape/lib/proposals.mjs';
import { venue } from '../helpers.mjs';
import { URL_PAGE, change, workspace } from './helpers.mjs';

const read = (ws, name = 'venues') => JSON.parse(readFileSync(join(ws.dataDir, `${name}.json`), 'utf8'));
const check = (ws) => checkProposalFile(ws.file, { dataDir: ws.dataDir, snapshotDir: ws.snapshotDir, root: ws.root });
const apply = (ws) => applyProposals([ws.file], { dataDir: ws.dataDir, root: ws.root, now: new Date('2026-10-28') });
const approve = (ws) => {
  const proposal = JSON.parse(readFileSync(ws.file, 'utf8'));
  proposal.changes.forEach((c) => (c.approved = true));
  return proposal;
};
import { writeFileSync } from 'node:fs';
const save = (ws, proposal) => writeFileSync(ws.file, JSON.stringify(proposal, null, 2));

test('Szenario: Vorschlagsdatei wird erzeugt (UPD-EV-1)', () => {
  const ws = workspace({ proposal: [change()] });
  const result = check(ws);
  const [c] = result.changes;
  assert.equal(result.rejected.length, 0);
  assert.equal(c.oldValue, null);
  assert.equal(c.newValue, 'Altstadt-Nord');
  assert.equal(c.kind, 'ergänzt');
  assert.equal(c.evidence.url, URL_PAGE);
  assert.equal(c.evidence.excerpt, 'liegt in der Altstadt-Nord');
  assert.equal(c.approved, false);
  assert.deepEqual(JSON.parse(readFileSync(ws.file, 'utf8')).changes[0].kind, 'ergänzt', 'Datei wurde geschrieben');
});

test('Szenario: Nur schemakonforme Vorschläge (UPD-UB-1, Q-DATA-1)', () => {
  const ws = workspace({
    text: 'Das ist ein Kamerahandel. Zip 12. Ausstellung Neue Schau.',
    proposal: [
      change({ id: 'a', field: 'type', newValue: 'kamerahandel', evidence: { url: URL_PAGE, excerpt: 'ein Kamerahandel' } }),
      change({ id: 'b', field: 'address.zip', newValue: '12', evidence: { url: URL_PAGE, excerpt: 'Zip 12' } }),
    ],
  });
  const result = check(ws);
  assert.equal(result.changes.length, 0);
  assert.equal(result.rejected.length, 2);
  assert.ok(result.rejected.every((r) => r.reason.startsWith('Schema:')));
});

test('Szenario: Vorschlag ohne Fundstelle (UPD-UB-2, Q-DATA-3)', () => {
  const ws = workspace({
    proposal: [
      change({ id: 'a', evidence: { url: URL_PAGE, excerpt: 'liegt in der Neustadt' } }), // Wert fehlt im Auszug
      change({ id: 'b', evidence: { url: URL_PAGE, excerpt: 'Altstadt-Nord liegt hier nicht im Text' } }), // Auszug fehlt im Snapshot
      change({ id: 'c', evidence: { url: 'https://unbekannt.example.org/', excerpt: 'liegt in der Altstadt-Nord' } }), // kein Snapshot
      change({ id: 'd', evidence: undefined }),
    ],
  });
  const result = check(ws);
  assert.equal(result.changes.length, 0);
  assert.deepEqual(result.rejected.map((r) => r.id), ['a', 'b', 'c', 'd']);
});

test('Szenario: Keine Überschreibung ohne Freigabe (UPD-UB-3, Q-DATA-3)', () => {
  const ws = workspace({
    venues: [venue({ address: { ...venue().address, street: 'Alte Straße 1' } })],
    proposal: [change({ field: 'address.street', newValue: 'Neue Straße 2', evidence: { url: URL_PAGE, excerpt: 'Anschrift: Neue Straße 2' } })],
  });
  const [c] = check(ws).changes;
  assert.equal(c.kind, 'geändert');
  assert.equal(c.oldValue, 'Alte Straße 1');
  const before = readFileSync(join(ws.dataDir, 'venues.json'), 'utf8');
  const result = apply(ws);
  assert.equal(result.ok, true);
  assert.equal(result.applied.length, 0);
  assert.equal(result.skipped[0].reason, 'keine Freigabe');
  assert.equal(readFileSync(join(ws.dataDir, 'venues.json'), 'utf8'), before, 'Datei unverändert');
  save(ws, approve(ws));
  assert.equal(apply(ws).applied.length, 1);
  assert.equal(read(ws)[0].address.street, 'Neue Straße 2');
});

test('Szenario: Freigegebene Vorschläge werden übernommen (UPD-EV-2, Q-DATA-3)', () => {
  const ws = workspace({
    proposal: [change({ field: 'features.libraryNotes', newValue: 'Präsenzbibliothek zu Fotokunst', evidence: { url: URL_PAGE, excerpt: 'Präsenzbibliothek zu Fotokunst' } })],
  });
  check(ws);
  save(ws, approve(ws));
  const { applied, ok } = apply(ws);
  assert.equal(ok, true);
  assert.equal(applied.length, 1);
  const [v] = read(ws);
  assert.equal(v.features.libraryNotes, 'Präsenzbibliothek zu Fotokunst');
  assert.equal(v.source.url, URL_PAGE);
  assert.equal(v.source.checkedAt, '2026-10-27');
  assert.equal(v.source.status, 'recherchiert', 'Status bleibt unverändert');
  assert.equal(JSON.parse(readFileSync(ws.file, 'utf8')).changes[0].appliedAt, '2026-10-28');
  assert.equal(apply(ws).applied.length, 0, 'zweite Übernahme ändert nichts');
});

test('Szenario: Verifizierte Orte bleiben geschützt (UPD-UB-4, Q-DATA-3)', () => {
  const verified = venue({ source: { ...venue().source, status: 'verifiziert' } });
  const ws = workspace({ venues: [verified], proposal: [change()] });
  const [c] = check(ws).changes;
  assert.equal(c.conflict, true);
  save(ws, approve(ws));
  const result = apply(ws);
  assert.equal(result.applied.length, 0);
  assert.match(result.skipped[0].reason, /Konflikt/);
  assert.equal(read(ws)[0].district, undefined);
  assert.equal(read(ws)[0].source.status, 'verifiziert');
});

test('Q-DATA-3: source wird nie vorgeschlagen, verifiziert wird nie automatisch gesetzt', () => {
  const ws = workspace({ proposal: [change({ field: 'source.status', newValue: 'verifiziert', evidence: { url: URL_PAGE, excerpt: 'liegt in der Altstadt-Nord' } })] });
  const result = check(ws);
  assert.equal(result.changes.length, 0);
  assert.match(result.rejected[0].reason, /source/);
});

test('Szenario: Übernahme wird zurückgerollt (UPD-UN-1, Q-DATA-1)', () => {
  const ws = workspace({ proposal: [change({ field: 'address.zip', newValue: '1' })] });
  const proposal = JSON.parse(readFileSync(ws.file, 'utf8'));
  // Ein am Prüfer vorbei eingeschleuster, freigegebener Vorschlag, der die Validierung verletzt
  proposal.changes = [{ ...proposal.changes[0], op: 'set', kind: 'geändert', conflict: false, approved: true, oldValue: '50667' }];
  save(ws, proposal);
  const before = readFileSync(join(ws.dataDir, 'venues.json'), 'utf8');
  const result = apply(ws);
  assert.equal(result.ok, false);
  assert.ok(result.errors.length > 0);
  assert.equal(readFileSync(join(ws.dataDir, 'venues.json'), 'utf8'), before, 'Dateien unverändert');
  assert.equal(JSON.parse(readFileSync(ws.file, 'utf8')).changes[0].appliedAt, undefined);
});

test('Szenario: Keine Dubletten (UPD-UB-5, Q-DATA-1)', () => {
  const record = (over) => ({ venueId: 'makk-koeln', title: 'Neue Schau', startDate: '2026-12-01', endDate: '2027-02-01', type: 'solo', photographerIds: ['martin-parr'], ...over });
  const evidence = { url: URL_PAGE, excerpt: 'Ausstellung Neue Schau läuft ab 1. Dezember' };
  const ws = workspace({
    extra: { exhibitions: [record({ id: 'neue-schau-2026' })] },
    proposal: [
      { id: 'dup', dataset: 'exhibitions', op: 'add', record: record(), evidence },
      { id: 'neu', dataset: 'exhibitions', op: 'add', record: record({ startDate: '2027-03-01', endDate: '2027-05-01' }), evidence },
      { id: 'neu2', dataset: 'exhibitions', op: 'add', record: record({ startDate: '2027-06-01', endDate: '2027-07-01' }), evidence },
    ],
  });
  const result = check(ws);
  assert.deepEqual(result.rejected.map((r) => [r.id, r.reason.split(':')[0]]), [['dup', 'Dublette']]);
  const ids = result.changes.map((c) => c.record.id);
  assert.deepEqual(ids, ['neue-schau-2027', 'neue-schau-2027-2']);
  assert.ok(ids.every((id) => /^[a-z0-9]+(-[a-z0-9]+)*$/.test(id)));
  assert.ok(result.changes.every((c) => c.kind === 'ergänzt'));
  save(ws, approve(ws));
  assert.equal(apply(ws).applied.length, 2);
  assert.equal(read(ws, 'exhibitions').length, 3);
});

test('Vorschläge zu anderen Orten oder mit unbekannter Referenz werden verworfen (UPD-UB-1)', () => {
  const ws = workspace({
    proposal: [
      { id: 'fremd', dataset: 'exhibitions', op: 'add', record: { venueId: 'anderer-ort', title: 'Neue Schau', startDate: '2026-12-01', endDate: '2027-01-01', type: 'solo', photographerIds: [] }, evidence: { url: URL_PAGE, excerpt: 'Ausstellung Neue Schau läuft ab 1. Dezember' } },
      { id: 'ref', dataset: 'exhibitions', op: 'add', record: { venueId: 'makk-koeln', title: 'Neue Schau', startDate: '2026-12-01', endDate: '2027-01-01', type: 'solo', photographerIds: ['gibt-es-nicht'] }, evidence: { url: URL_PAGE, excerpt: 'Ausstellung Neue Schau läuft ab 1. Dezember' } },
      change({ id: 'orga', dataset: 'organizers', recordId: 'photoszene-koeln', field: 'city', newValue: 'Köln' }),
    ],
  });
  const result = check(ws);
  assert.equal(result.changes.length, 0);
  assert.deepEqual(result.rejected.map((r) => r.id), ['fremd', 'ref', 'orga']);
});

test('Erneutes Prüfen lässt bereits übernommene Änderungen unverändert (UPD-EV-2)', () => {
  const ws = workspace({ proposal: [change()] });
  check(ws);
  save(ws, approve(ws));
  assert.equal(apply(ws).applied.length, 1);
  const again = check(ws);
  assert.equal(again.rejected.length, 0, 'nicht als Dublette verworfen');
  assert.equal(again.changes.length, 1);
  assert.equal(again.changes[0].appliedAt, '2026-10-28');
});
