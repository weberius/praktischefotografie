// Gherkin: docs/contracts/gherkin/setup/eroeffnungstermine.feature (OPN-UB-1 bis OPN-UB-8, OPN-UN-1), Q-DATA-12, Q-DATA-3
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, writeFileSync } from 'node:fs';
import { main as apply } from '../../scripts/scrape/apply-proposals.mjs';
import { main as check } from '../../scripts/scrape/check-proposals.mjs';
import { hasDate, hasHint, hasTime, timesOf } from '../../scripts/scrape/lib/termine.mjs';
import { exhibition, terminEvent, venue } from '../helpers.mjs';
import { DATE, URL_PAGE, workspace } from './helpers.mjs';

const OPENING = 'Candida Höfer Between November 7, 2026 - February 19, 2027 Opening: Saturday, 7 November 2026, 4-6pm The artist is present. Introduction by Prof. Burkert at 4:30 pm. Finissage: Friday, 19 February 2027, 6-8pm Artist talk.';
const BASE = { venues: [venue({ id: 'zander-galerie-koeln' })], text: OPENING };
const between = exhibition({ id: 'between-2026', venueId: 'zander-galerie-koeln', title: 'Between', startDate: '2026-11-07', endDate: '2027-02-19', description: 'Farbfotografien von Martin Parr.' });
const EXCERPT_OPEN = 'Opening: Saturday, 7 November 2026, 4-6pm The artist is present.';
const EXCERPT_FIN = 'Finissage: Friday, 19 February 2027, 6-8pm Artist talk.';

const vernissage = (over = {}) => ({
  id: 'c1', dataset: 'events', op: 'add',
  record: terminEvent({ id: undefined, venueId: 'zander-galerie-koeln', description: 'Eröffnung am 7. November 2026 von 16:00 bis 18:00 Uhr. Candida Höfer ist anwesend.' }),
  evidence: { url: URL_PAGE, excerpt: EXCERPT_OPEN },
  ...over,
});
const finissage = (over = {}) => ({
  id: 'c2', dataset: 'events', op: 'add',
  record: terminEvent({ id: undefined, title: 'Finissage: Between', eventType: 'finissage', startDate: '2027-02-19', endDate: '2027-02-19', venueId: 'zander-galerie-koeln', description: 'Finissage am 19. Februar 2027 von 18:00 bis 20:00 Uhr.' }),
  evidence: { url: URL_PAGE, excerpt: EXCERPT_FIN },
  ...over,
});

function setup(changes, extra = {}) {
  const ws = workspace({ ...BASE, extra: { exhibitions: [between], ...extra }, proposal: changes });
  const result = check(['--date', DATE, '--venue', 'zander-galerie-koeln'], ws.root)[0];
  const proposal = JSON.parse(readFileSync(ws.file, 'utf8'));
  return { ws, result, proposal };
}
const reasons = (p) => p.rejected.map((r) => r.reason);

test('Szenario: Vernissage aus Eröffnungshinweis (OPN-UB-1, OPN-UB-3)', () => {
  const { proposal } = setup([vernissage()]);
  assert.equal(proposal.rejected.length, 0, reasons(proposal).join('; '));
  const [c] = proposal.changes;
  assert.equal(c.record.eventType, 'vernissage');
  assert.equal(c.record.startDate, '2026-11-07');
  assert.equal(c.record.endDate, '2026-11-07');
  assert.equal(c.record.venueId, 'zander-galerie-koeln');
  assert.equal(c.record.city, 'Köln');
  assert.equal(c.record.title, 'Eröffnung: Between');
  assert.equal(c.record.id, 'between-2026-eroeffnung');
  assert.equal(c.kind, 'ergänzt');
});

test('Szenario: Uhrzeit und Anwesenheit der Künstlerin – Übernahme nach Freigabe (OPN-UB-2)', () => {
  const { ws, proposal } = setup([vernissage()]);
  proposal.changes[0].approved = true;
  writeFileSync(ws.file, JSON.stringify(proposal));
  const applied = apply(['--date', DATE, '--venue', 'zander-galerie-koeln'], ws.root);
  assert.equal(applied.ok, true);
  const events = JSON.parse(readFileSync(`${ws.dataDir}/events.json`, 'utf8'));
  assert.match(events[0].description, /16:00 bis 18:00 Uhr/);
  assert.match(events[0].description, /Candida Höfer ist anwesend/);
});

test('Szenario: Finissage aus Finissagehinweis (OPN-UB-6, OPN-UB-8, OPN-UB-3)', () => {
  const { proposal } = setup([finissage()]);
  assert.equal(proposal.rejected.length, 0, reasons(proposal).join('; '));
  const [c] = proposal.changes;
  assert.equal(c.record.eventType, 'finissage');
  assert.equal(c.record.startDate, '2027-02-19');
  assert.equal(c.record.title, 'Finissage: Between');
  assert.equal(c.record.id, 'between-2026-finissage');
});

test('Szenario: Titel und Kennung – falsche id und falscher Titel werden verworfen (OPN-UB-3)', () => {
  const falscheId = setup([vernissage({ record: { ...vernissage().record, id: 'irgendwas' } })]);
  assert.match(reasons(falscheId.proposal)[0], /id muss "between-2026-eroeffnung" lauten/);
  const ohnePraefix = setup([vernissage({ record: { ...vernissage().record, title: 'Between' } })]);
  assert.match(reasons(ohnePraefix.proposal)[0], /Titel muss mit "Eröffnung:" beginnen/);
  const ohneAusstellung = setup([vernissage({ record: { ...vernissage().record, title: 'Eröffnung: Unbekannt' } })]);
  assert.match(reasons(ohneAusstellung.proposal)[0], /Ausstellung zum Titel nicht gefunden/);
});

test('Szenario: Keine doppelte Vernissage und keine doppelte Finissage (OPN-UB-4)', () => {
  const vorhanden = [terminEvent({ id: 'between-2026-eroeffnung', venueId: 'zander-galerie-koeln' }), terminEvent({ id: 'between-2026-finissage', title: 'Finissage: Between', eventType: 'finissage', startDate: '2027-02-19', endDate: '2027-02-19', venueId: 'zander-galerie-koeln' })];
  const { proposal } = setup([vernissage(), finissage()], { events: vorhanden });
  assert.equal(proposal.changes.length, 0);
  assert.equal(proposal.rejected.length, 2);
  for (const reason of reasons(proposal)) assert.match(reason, /Dublette/);
});

test('Szenario: Keine Finissage ohne Beleg (OPN-UB-7)', () => {
  // Ausstellungsende steht im Text, eine Finissage nicht
  const { proposal } = setup([finissage({ evidence: { url: URL_PAGE, excerpt: 'Between November 7, 2026 - February 19, 2027' } })]);
  assert.equal(proposal.changes.length, 0);
  assert.match(reasons(proposal)[0], /Finissage nicht belegt/);
});

test('Szenario: Vergangener Termin (OPN-UB-5)', () => {
  const { proposal } = setup([vernissage({ record: { ...vernissage().record, startDate: '2026-10-26', endDate: '2026-10-26' } })]);
  assert.equal(proposal.changes.length, 0);
  assert.match(reasons(proposal)[0], /Vergangenheit \(2026-10-26\)/);
});

test('Szenario: Uhrzeit ohne Beleg (OPN-UN-1)', () => {
  const ohneUhrzeit = 'Opening: Saturday, 7 November 2026 The artist is present.';
  const ws = workspace({ ...BASE, text: `${ohneUhrzeit} ${OPENING}`, extra: { exhibitions: [between] }, proposal: [vernissage({ evidence: { url: URL_PAGE, excerpt: ohneUhrzeit } })] });
  check(['--date', DATE, '--venue', 'zander-galerie-koeln'], ws.root);
  const p = JSON.parse(readFileSync(ws.file, 'utf8'));
  assert.equal(p.changes.length, 0);
  assert.equal(reasons(p)[0], 'Uhrzeit nicht belegt');
});

test('Szenario: Datum weicht vom Textauszug ab (OPN-UN-2)', () => {
  const anderes = 'Opening: Saturday, 14 November 2026, 4-6pm The artist is present.';
  const ws = workspace({ ...BASE, text: `${anderes} ${OPENING}`, extra: { exhibitions: [between] }, proposal: [vernissage({ evidence: { url: URL_PAGE, excerpt: anderes } })] });
  check(['--date', DATE, '--venue', 'zander-galerie-koeln'], ws.root);
  const p = JSON.parse(readFileSync(ws.file, 'utf8'));
  assert.equal(p.changes.length, 0);
  assert.match(reasons(p)[0], /Datum nicht belegt: Textauszug nennt 2026-11-07 nicht/);
});

test('Szenario: Uhrzeit ohne Beleg – ein Punktdatum im Auszug ersetzt keine Uhrzeit (OPN-UN-1)', () => {
  const nurDatum = 'Vernissage am 07.11.2026 mit der Künstlerin.';
  const ws = workspace({ ...BASE, text: `${nurDatum} ${OPENING}`, extra: { exhibitions: [between] }, proposal: [vernissage({ evidence: { url: URL_PAGE, excerpt: nurDatum } })] });
  check(['--date', DATE, '--venue', 'zander-galerie-koeln'], ws.root);
  const p = JSON.parse(readFileSync(ws.file, 'utf8'));
  assert.equal(p.changes.length, 0);
  assert.equal(reasons(p)[0], 'Uhrzeit nicht belegt');
});

test('Szenario: jede genannte Uhrzeit muss belegt sein (OPN-UN-1)', () => {
  const nurStart = 'Opening: Saturday, 7 November 2026, 4pm The artist is present.';
  const ws = workspace({ ...BASE, text: `${nurStart} ${OPENING}`, extra: { exhibitions: [between] }, proposal: [vernissage({ evidence: { url: URL_PAGE, excerpt: nurStart } })] });
  check(['--date', DATE, '--venue', 'zander-galerie-koeln'], ws.root);
  assert.equal(reasons(JSON.parse(readFileSync(ws.file, 'utf8')))[0], 'Uhrzeit nicht belegt');
});

test('Q-DATA-12: Erkennung von Uhrzeit, Datum und Hinweisen (Fixtures)', () => {
  for (const t of ['16:00 Uhr', '4-6pm', '18 Uhr', '16.30', 'am 7.11. ab 18 Uhr']) assert.ok(hasTime(t), t);
  for (const t of ['7 November 2026', 'Eröffnung am 07.11.2026', 'Vernissage am 7.11.2026', 'November 7, 2026', 'Eröffnung', '']) assert.ok(!hasTime(t), t);
  assert.deepEqual(timesOf('4-6pm'), ['16:00', '18:00']);
  assert.deepEqual(timesOf('Eröffnung am 7. November 2026 von 16:00 bis 18:00 Uhr'), ['16:00', '18:00']);
  assert.ok(hasHint(OPENING, 'vernissage'));
  assert.ok(hasHint(OPENING, 'finissage'));
  assert.ok(hasHint('Vernissage am 07.11.2026 um 18 Uhr', 'vernissage'));
  assert.ok(hasHint('Eröffnung: 7. November 2026', 'vernissage'));
  assert.ok(!hasHint('Between November 7, 2026 - February 19, 2027', 'finissage'));
  assert.ok(!hasHint('Die Eröffnung des Hauses war ein Erfolg.', 'vernissage'));
  assert.ok(hasDate(OPENING, 'vernissage', '2026-11-07'));
  assert.ok(!hasDate(OPENING, 'vernissage', '2026-11-14'));
  assert.ok(hasDate(OPENING, 'finissage', '2027-02-19'));
  assert.ok(hasDate('Vernissage am 07.11.2026', 'vernissage', '2026-11-07'));
  assert.ok(hasDate('Opening: 7 November', 'vernissage', '2026-11-07'), 'ohne Jahr zählen Tag und Monat');
  assert.ok(!hasDate('Opening: 7 November 2025', 'vernissage', '2026-11-07'));
});
