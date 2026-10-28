// Gherkin: docs/contracts/gherkin/content/festivals.feature (FES-*), Q-DATA-5
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, mkdirSync, mkdtempSync, readFileSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { syncData } from '../web/tools/sync-data.mjs';
import { exhibition, run, validSet, venue } from './helpers.mjs';

const festival = (over = {}) => ({
  id: 'photoszene-festival-2027',
  organizerId: 'photoszene-koeln',
  title: 'Photoszene-Festival 2027',
  startDate: '2027-05-14',
  endDate: '2027-05-23',
  city: 'Köln',
  ...over,
});

const withFestival = (over = {}) => ({ ...validSet(), festivals: [festival(over)] });
const mut = (fn) => () => { const s = withFestival(); fn(s); return s; };

test('Szenario: Veranstalter mit Kurzbeschreibung (FES-UB-1)', () => {
  const s = validSet();
  Object.assign(s.organizers[0], { shortName: 'Photoszene Köln', description: 'Gemeinnütziger Verein.', social: { instagram: 'photoszene_koeln' }, website: 'https://www.photoszene.de' });
  assert.deepEqual(run(s).errors, []);
  s.organizers[0].social.instagram = '@mit leerzeichen';
  assert.ok(run(s).errors.length > 0);
});

test('Szenario: Festival ist vollständig (FES-UB-2)', () => {
  assert.deepEqual(run(withFestival({ description: 'Stadtweites Festival.', website: 'https://festival.photoszene.de' })).errors, []);
  const s = withFestival();
  delete s.festivals[0].title;
  assert.match(run(s).errors.join('\n'), /photoszene-festival-2027 title/);
});

test('Szenario: Festival mit ungültigem Zeitraum oder unbekanntem Veranstalter (FES-UN-1)', () => {
  assert.match(run(withFestival({ startDate: '2027-05-23', endDate: '2027-05-14' })).errors.join('\n'), /festivals\.json: photoszene-festival-2027 endDate/);
  assert.match(run(withFestival({ organizerId: 'gibt-es-nicht' })).errors.join('\n'), /unbekannte Referenz "gibt-es-nicht"/);
});

test('Szenario: Ausstellung gehört zu einem Festival, unbekanntes Festival (FES-UB-3, FES-UN-2)', () => {
  const s = withFestival();
  s.exhibitions = [exhibition({ festivalId: 'photoszene-festival-2027', isOfficialFestivalPartner: true })];
  assert.deepEqual(run(s).errors, []);
  s.exhibitions[0].festivalId = 'gibt-es-nicht';
  assert.match(run(s).errors.join('\n'), /festivalId – unbekannte Referenz "gibt-es-nicht"/);
  // Eine Veranstalter-ID ist kein Festival mehr (ADR-009).
  s.exhibitions[0].festivalId = 'photoszene-koeln';
  assert.match(run(s).errors.join('\n'), /unbekannte Referenz "photoszene-koeln"/);
});

test('Szenario: Offizieller Partner ohne Festival (FES-OP-1)', () => {
  const s = validSet();
  s.exhibitions = [exhibition({ isOfficialFestivalPartner: true })];
  assert.match(run(s).errors.join('\n'), /isOfficialFestivalPartner – erfordert festivalId/);
  s.exhibitions = [exhibition({ festivalId: null, isOfficialFestivalPartner: false })];
  assert.deepEqual(run(s).errors, []);
});

test('Szenario: Gleiche ID bei Ort und Veranstalter (FES-UN-3)', () => {
  const s = validSet();
  s.venues = [venue({ id: 'photoszene-koeln' })];
  s.exhibitions = [];
  const errors = run(s).errors.join('\n');
  assert.match(errors, /venues\.json: photoszene-koeln id – doppelte id/);
  assert.match(errors, /organizers\.json: photoszene-koeln id – doppelte id/);
});

test('Szenario: Festivals im Build (FES-UB-4)', () => {
  const root = mkdtempSync(join(tmpdir(), 'pf-fes-'));
  const out = mkdtempSync(join(tmpdir(), 'pf-fes-out-'));
  mkdirSync(join(root, 'data'), { recursive: true });
  for (const [name, records] of Object.entries(withFestival())) writeFileSync(join(root, 'data', `${name}.json`), JSON.stringify(records));
  assert.deepEqual(syncData({ root, out }).errors, []);
  assert.ok(existsSync(join(out, 'data', 'festivals.json')));
  assert.equal(JSON.parse(readFileSync(join(out, 'data', 'festivals.json'), 'utf8'))[0].id, 'photoszene-festival-2027');
});

const ungueltig = {
  'Zeitraum umgekehrt': mut((s) => { s.festivals[0].startDate = '2027-06-01'; }),
  'unbekannter Veranstalter': mut((s) => { s.festivals[0].organizerId = 'nix'; }),
  'Festival ohne Titel': mut((s) => { delete s.festivals[0].title; }),
  'Festival ohne Enddatum': mut((s) => { delete s.festivals[0].endDate; }),
  'Festival-id nicht kebab-case': mut((s) => { s.festivals[0].id = 'Photoszene 2027'; }),
  'doppelte Festival-id': mut((s) => { s.festivals.push(festival()); }),
  'Website ohne http': mut((s) => { s.festivals[0].website = 'photoszene'; }),
  'Ausstellung mit unbekanntem Festival': mut((s) => { s.exhibitions[0].festivalId = 'nix'; }),
  'Partner ohne Festival': mut((s) => { s.exhibitions[0].isOfficialFestivalPartner = true; }),
  'Partnerkennzeichnung kein Boolean': mut((s) => { s.exhibitions[0].festivalId = 'photoszene-festival-2027'; s.exhibitions[0].isOfficialFestivalPartner = 'ja'; }),
  'gleiche ID bei Ort und Veranstalter': mut((s) => { s.venues[0].id = 'photoszene-koeln'; s.exhibitions[0].venueId = 'photoszene-koeln'; }),
};

test('Q-DATA-5: gültiges Set ergibt 0 Fehlmeldungen und alle ungültigen Fixtures werden erkannt', async (t) => {
  assert.ok(Object.keys(ungueltig).length >= 9);
  assert.deepEqual(run(withFestival()).errors, []);
  for (const [name, build] of Object.entries(ungueltig)) {
    await t.test(name, () => assert.ok(run(build()).errors.length > 0));
  }
});
