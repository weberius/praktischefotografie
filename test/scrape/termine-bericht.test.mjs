// Gherkin: docs/contracts/gherkin/setup/eroeffnungstermine.feature · „Bericht zeigt Terminhinweise“, „Bericht ohne Netz“ (OPN-EV-1), Q-DATA-13, Q-MAIN-2
import { test } from 'node:test';
import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import assert from 'node:assert/strict';
import { performance } from 'node:perf_hooks';
import { buildReport } from '../../scripts/scrape/lib/report.mjs';
import { saveSnapshot } from '../../scripts/scrape/lib/snapshots.mjs';
import { venue } from '../helpers.mjs';
import { DATE, URL_PAGE, workspace } from './helpers.mjs';

const OPENING = 'Between Opening: Saturday, 7 November 2026, 4-6pm The artist is present. Finissage: 19 February 2027, 6-8pm.';

test('Szenario: Bericht zeigt Terminhinweise – ohne Vorschlag „zu prüfen“ (OPN-EV-1)', () => {
  const ws = workspace({ venues: [venue({ id: 'zander-galerie-koeln' })], text: OPENING });
  const text = buildReport({ root: ws.root, date: DATE });
  assert.match(text, /## Termine/);
  assert.match(text, /zander-galerie-koeln: Eröffnung: 1 Snapshot\(s\) mit Hinweis, 0 Vorschlag\/Vorschläge, 0 bereits vorhanden – \*\*zu prüfen\*\*/);
  assert.match(text, /zander-galerie-koeln: Finissage: 1 Snapshot\(s\) mit Hinweis, 0 Vorschlag\/Vorschläge, 0 bereits vorhanden – \*\*zu prüfen\*\*/);
});

test('Bericht: Vorschlag und Dublette entfallen aus „zu prüfen“', () => {
  const ws = workspace({ venues: [venue({ id: 'zander-galerie-koeln' })], text: OPENING, proposal: [] });
  const proposal = (changes, rejected) => ({ venueId: 'zander-galerie-koeln', changes, rejected });
  const event = { dataset: 'events', op: 'add', record: { eventType: 'vernissage' } };
  const dup = { dataset: 'events', op: 'add', record: { eventType: 'finissage' }, reason: 'Dublette: Datensatz ist bereits vorhanden' };
  writeJson(ws, proposal([event], [dup]));
  const text = buildReport({ root: ws.root, date: DATE });
  assert.match(text, /Eröffnung: 1 Snapshot\(s\) mit Hinweis, 1 Vorschlag\/Vorschläge, 0 bereits vorhanden\n/);
  assert.match(text, /Finissage: 1 Snapshot\(s\) mit Hinweis, 0 Vorschlag\/Vorschläge, 1 bereits vorhanden\n/);
});

test('Bericht ohne Hinweise (OPN-EV-1)', () => {
  const ws = workspace({ venues: [venue()] });
  assert.match(buildReport({ root: ws.root, date: DATE }), /Keine Eröffnungs- oder Finissagehinweise/);
});

test('Szenario: Bericht ohne Netz; Q-DATA-13: 20 Quellen ≤ 5 s', () => {
  const ws = workspace({ venues: [venue()] });
  for (let i = 0; i < 20; i++) saveSnapshot(`${ws.root}/.cache/snapshots`, `ort-${i}`, { url: `${URL_PAGE}/${i}`, fetchedAt: `${DATE}T10:00:00.000Z`, status: 200, title: 'x', text: OPENING.repeat(50), links: [] });
  const original = globalThis.fetch;
  globalThis.fetch = () => { throw new Error('Netzanfrage im Bericht'); };
  try {
    const start = performance.now();
    const text = buildReport({ root: ws.root, date: DATE });
    assert.ok(performance.now() - start < 5000);
    assert.equal((text.match(/Eröffnung: 1 Snapshot/g) ?? []).length, 20);
  } finally {
    globalThis.fetch = original;
  }
});

function writeJson(ws, proposal) {
  mkdirSync(join(ws.root, 'updates', DATE), { recursive: true });
  writeFileSync(join(ws.root, 'updates', DATE, `${proposal.venueId}.json`), JSON.stringify(proposal));
}
