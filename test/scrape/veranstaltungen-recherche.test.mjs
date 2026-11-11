// Gherkin: docs/contracts/gherkin/setup/veranstaltungen-recherche.feature (VRS-*), Q-SEC-12, Q-DATA-17, Q-REL-3
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, mkdirSync, mkdtempSync, readFileSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { main as apply } from '../../scripts/scrape/apply-proposals.mjs';
import { main as check } from '../../scripts/scrape/check-proposals.mjs';
import { main as report } from '../../scripts/scrape/report.mjs';
import { DEFAULTS, fetchVenues } from '../../scripts/scrape/lib/fetcher.mjs';
import { resolveEventVenues } from '../../scripts/scrape/lib/common.mjs';
import { terminEvent, venue } from '../helpers.mjs';
import { DATE, URL_PAGE, workspace } from './helpers.mjs';
import { page, testServer } from './server.mjs';

const ROOT = fileURLToPath(new URL('../..', import.meta.url));
const FAST = { minDelayMs: 0, timeoutMs: 2000, contact: 'redaktion@example.org' };
const ID = 'zander-galerie-koeln';
const EXCERPT = 'Führung durch die Ausstellung am 14. Dezember 2026 um 15 Uhr.';
const TEXT = `Programm. ${EXCERPT} Treffpunkt Kasse.`;

const tour = (over = {}) => ({
  id: 'c1', dataset: 'events', op: 'add',
  record: terminEvent({ id: undefined, title: 'Führung durch die Ausstellung', eventType: 'guided_tour', startDate: '2026-12-14', endDate: '2026-12-14', venueId: ID }),
  evidence: { url: URL_PAGE, excerpt: EXCERPT },
  ...over,
});

function setup(changes, text = TEXT) {
  const ws = workspace({ venues: [venue({ id: ID })], text, proposal: changes });
  const events = join(ws.root, 'updates', DATE, 'events');
  mkdirSync(events, { recursive: true });
  const file = join(events, `${ID}.json`);
  writeFileSync(file, readFileSync(ws.file, 'utf8'));
  return { ...ws, file };
}
const run = (ws) => {
  check(['--date', DATE, '--venue', ID, '--events'], ws.root);
  return JSON.parse(readFileSync(ws.file, 'utf8'));
};
const reasons = (p) => p.rejected.map((r) => r.reason).join('; ');

test('Abrufmodus Veranstaltungen: zehn Seiten, Veranstaltungslinks zuerst, Standard bleibt bei sechs (VRS-EV-1)', async () => {
  assert.equal(DEFAULTS.maxPagesEvents, 10);
  const links = ['<a href="/besuch">Besuch</a>', ...Array.from({ length: 12 }, (_, i) => `<a href="/fuehrung-${i}">Führung ${i}</a>`), ...Array.from({ length: 6 }, (_, i) => `<a href="/programm-${i}">Programm ${i}</a>`)].join('');
  const routes = { '/': { body: page('Start', links) }, '/besuch': { body: page('B') } };
  for (let i = 0; i < 12; i++) routes[`/fuehrung-${i}`] = { body: page(`F${i}`) };
  for (let i = 0; i < 6; i++) routes[`/programm-${i}`] = { body: page(`P${i}`) };
  const s = await testServer(routes);
  try {
    const dir = () => mkdtempSync(join(tmpdir(), 'pf-snap-'));
    const [ev] = await fetchVenues([{ id: 'ort', website: s.url }], { ...FAST, events: true, snapshotDir: dir() });
    assert.equal(ev.pages, 10);
    assert.ok(!s.requests.some((r) => r.path === '/besuch'));
    const before = s.requests.length;
    const [std] = await fetchVenues([{ id: 'ort', website: s.url }], { ...FAST, snapshotDir: dir() });
    assert.equal(std.pages, 6);
    assert.ok(s.requests.length > before);
  } finally {
    await s.close();
  }
});

test('Szenario: --venue mit Veranstalter-ID oder unbekannter ID nennt gültige Orte (VRS-UN-1)', () => {
  assert.ok(resolveEventVenues(ROOT).length > 1);
  assert.throws(() => resolveEventVenues(ROOT, 'gibt-es-nicht'), /Gültige IDs: .*makk-koeln/);
  const organizer = JSON.parse(readFileSync(join(ROOT, 'data', 'organizers.json'), 'utf8'))[0].id;
  assert.throws(() => resolveEventVenues(ROOT, organizer), /Unbekannte Orts-ID/);
});

test('Szenario: Führung mit belegtem Datum wird vorgeschlagen und nach Freigabe übernommen (VRS-UB-1, VRS-UB-6)', () => {
  const ws = setup([tour()]);
  const proposal = run(ws);
  assert.equal(proposal.rejected.length, 0, reasons(proposal));
  proposal.changes[0].approved = true;
  writeFileSync(ws.file, JSON.stringify(proposal));
  assert.equal(apply(['--date', DATE, '--venue', ID, '--events'], ws.root).ok, true);
  const events = JSON.parse(readFileSync(join(ws.dataDir, 'events.json'), 'utf8'));
  assert.ok(events.some((e) => e.eventType === 'guided_tour' && e.startDate === '2026-12-14'));
});

test('Szenario: Datum, das der Auszug nicht belegt, wird verworfen (VRS-UB-3, Q-DATA-17)', () => {
  const proposal = run(setup([tour({ record: { ...tour().record, startDate: '2026-12-15' } })]));
  assert.equal(proposal.changes.length, 0);
  assert.match(reasons(proposal), /Datum nicht belegt/);
});

test('Szenario: vergangene Termine und Vernissagen werden verworfen (VRS-UB-4)', () => {
  const past = tour({ id: 'c2', record: { ...tour().record, startDate: '2020-12-14', endDate: '2020-12-14' } });
  const vern = tour({ id: 'c3', record: { ...tour().record, eventType: 'vernissage' } });
  const proposal = run(setup([past, vern]));
  assert.equal(proposal.changes.length, 0);
  assert.match(reasons(proposal), /Vergangenheit/);
  assert.match(reasons(proposal), /update-venue-data/);
});

test('Szenario: andere Datensätze als neue Events werden verworfen (VRS-UB-2)', () => {
  const other = { id: 'c4', dataset: 'venues', recordId: ID, field: 'district', newValue: 'Altstadt-Nord', evidence: { url: URL_PAGE, excerpt: 'Treffpunkt Kasse' } };
  const proposal = run(setup([other]));
  assert.equal(proposal.changes.length, 0);
  assert.match(reasons(proposal), /nur neue Events/);
});

test('Szenario: Obergrenze von 30 Vorschlägen je Ort (VRS-UB-5)', () => {
  const many = Array.from({ length: 31 }, (_, i) => {
    const day = String((i % 28) + 1).padStart(2, '0');
    const month = i < 28 ? '12' : '11';
    return tour({
      id: `c${i}`,
      record: { ...tour().record, title: `Führung ${i}`, startDate: `2026-${month}-${day}`, endDate: `2026-${month}-${day}` },
      evidence: { url: URL_PAGE, excerpt: `Führung ${i} am ${Number(day)}.${month}.2026` },
    });
  });
  const text = many.map((c) => c.evidence.excerpt).join(' ');
  const proposal = run(setup(many, text));
  assert.equal(proposal.changes.length, 30, reasons(proposal));
  assert.match(reasons(proposal), /Obergrenze/);
});

test('Szenario: wiederholter Lauf erzeugt keine Dubletten (Q-DATA-17)', () => {
  const ws = setup([tour()]);
  const first = run(ws);
  first.changes[0].approved = true;
  writeFileSync(ws.file, JSON.stringify(first));
  apply(['--date', DATE, '--venue', ID, '--events'], ws.root);
  writeFileSync(ws.file, JSON.stringify({ venueId: ID, fetchedAt: DATE, changes: [tour()] }));
  const second = run(ws);
  assert.equal(second.changes.length, 0);
  assert.ok(second.rejected.length >= 1);
});

test('Szenario: Bericht je Ort mit nicht erreichbaren Orten (VRS-EV-2, VRS-UN-2, Q-REL-3)', () => {
  const ws = setup([tour()]);
  run(ws);
  const dir = join(ws.root, 'updates', DATE, 'events');
  const summary = (status, errors) => ({ venueId: ID, status, pages: 3, fetched: 3, cached: 0, errors, notes: [] });
  writeFileSync(join(dir, 'fetch-summary.json'), JSON.stringify({ date: DATE, venues: [summary('abgerufen', []), { ...summary('fehlgeschlagen', [{ url: 'https://x.example/', reason: 'Timeout' }]), venueId: 'anderer-ort', pages: 0 }] }));
  const text = report(['--date', DATE, '--events'], ws.root);
  assert.ok(existsSync(join(dir, 'REPORT.md')));
  assert.match(String(text ?? readFileSync(join(dir, 'REPORT.md'), 'utf8')), /anderer-ort/);
  const md = readFileSync(join(dir, 'REPORT.md'), 'utf8');
  assert.match(md, new RegExp(`${ID}: abgerufen.*1 Vorschläge`));
  assert.match(md, /anderer-ort: https:\/\/x\.example\/ – Timeout/);
});

test('Szenario: Uhrzeit nur mit Beleg (VRS-UB-8, VRS-UN-3)', () => {
  const mit = (record) => tour({ record: { ...tour().record, ...record } });
  const gut = run(setup([mit({ startTime: '15:00' })]));
  assert.equal(gut.changes.length, 1, reasons(gut));
  const zwei = run(setup([mit({ startTime: '15:00', endTime: '16:30' })]));
  assert.match(reasons(zwei), /Uhrzeit nicht belegt/);
  const ohne = run(setup([mit({ startTime: '09:00' })]));
  assert.match(reasons(ohne), /Uhrzeit nicht belegt/);
});

test('Szenario: Bestandsevent erhält fehlende Uhrzeit per update, vorhandene bleibt (VRS-EV-3, VRS-UB-10)', () => {
  const bestand = terminEvent({ id: 'fuehrung-2026', title: 'Führung durch die Ausstellung', eventType: 'guided_tour', startDate: '2026-12-14', endDate: '2026-12-14', venueId: ID });
  const update = (id, values, excerpt = EXCERPT) => ({ id, dataset: 'events', op: 'update', recordId: 'fuehrung-2026', values, evidence: { url: URL_PAGE, excerpt } });
  const build = (events, changes) => {
    const ws = setup(changes);
    writeFileSync(join(ws.dataDir, 'events.json'), JSON.stringify(events));
    return ws;
  };
  const ok = run(build([bestand], [update('u1', { startTime: '15:00' })]));
  assert.equal(ok.changes.length, 1, reasons(ok));
  ok.changes[0].approved = true;
  const ws = build([bestand], [update('u1', { startTime: '15:00' })]);
  const checked = run(ws);
  checked.changes[0].approved = true;
  writeFileSync(ws.file, JSON.stringify(checked));
  assert.equal(apply(['--date', DATE, '--venue', ID, '--events'], ws.root).ok, true);
  const stored = JSON.parse(readFileSync(join(ws.dataDir, 'events.json'), 'utf8'));
  assert.equal(stored[0].startTime, '15:00');
  assert.equal(stored[0].title, bestand.title);

  const vorhanden = run(build([{ ...bestand, startTime: '19:00' }], [update('u2', { startTime: '15:00' })]));
  assert.match(reasons(vorhanden), /nicht überschrieben/);
  const fremd = run(build([bestand], [update('u3', { startTime: '15:00', title: 'X' })]));
  assert.match(reasons(fremd), /ändert nur/);
  const unbelegt = run(build([bestand], [update('u4', { startTime: '20:00' })]));
  assert.match(reasons(unbelegt), /Uhrzeit nicht belegt/);
});

test('Szenario: Skill research-events ist vorhanden und führt den Ablauf aus (VRS-UB-7)', () => {
  const text = readFileSync(join(ROOT, '.claude/skills/research-events/SKILL.md'), 'utf8');
  assert.match(text, /^---\nname: research-events\ndescription: .+\n---/);
  assert.match(text, /\/research-events --venue photographische-sammlung-koeln/);
  const ablauf = text.slice(text.indexOf('## Ablauf'));
  let position = -1;
  for (const step of ['data:fetch -- --events', 'data:check -- --events', 'data:report -- --events', 'AskUserQuestion', 'data:apply -- --events', 'npm run validate:data']) {
    const next = ablauf.indexOf(step, position + 1);
    assert.ok(next > position, `Schritt "${step}" fehlt oder steht in falscher Reihenfolge`);
    position = next;
  }
  assert.match(text, /erst nach ausdrücklicher Freigabe/);
});
