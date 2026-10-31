// Gherkin: docs/contracts/gherkin/content/fotografinnen-profile.feature (PRF-*), Q-DATA-7, Q-DATA-9
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, mkdirSync, mkdtempSync, readFileSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { syncData } from '../web/tools/sync-data.mjs';
import { validateData } from '../scripts/validate-data.mjs';
import { exhibition, validSet } from './helpers.mjs';

const words = (n) => Array.from({ length: n }, (_, i) => `wort${i}`).join(' ');
const profile = (over = {}) => ({
  occupation: 'Fotografin',
  life: { from: 1944, to: null },
  wikipedia: { summary: words(60), sources: [{ lang: 'de', url: 'https://de.wikipedia.org/wiki/Candida_H%C3%B6fer' }, { lang: 'en', url: 'https://en.wikipedia.org/wiki/Candida_H%C3%B6fer' }] },
  portrait: { file: 'martin-parr.jpg', width: 400, height: 300, source: 'https://commons.wikimedia.org/wiki/File:Parr.jpg', credit: 'Jane Doe', license: 'CC BY-SA 4.0', licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0/' },
  ...over,
});

function validate(set, { portraitBytes = 1000 } = {}) {
  const root = mkdtempSync(join(tmpdir(), 'pf-prf-'));
  mkdirSync(join(root, 'data', 'portraits'), { recursive: true });
  for (const [name, records] of Object.entries(set)) writeFileSync(join(root, 'data', `${name}.json`), JSON.stringify(records));
  if (portraitBytes !== null) writeFileSync(join(root, 'data', 'portraits', 'martin-parr.jpg'), Buffer.alloc(portraitBytes, 1));
  return { root, ...validateData({ dataDir: join(root, 'data'), rootDir: root, today: new Date('2026-10-27') }) };
}
const withPerson = (over = {}) => {
  const s = validSet();
  Object.assign(s.photographers[0], profile(over));
  return s;
};

test('Szenario: Person mit Profil ist gültig (PRF-UB-1)', () => {
  assert.deepEqual(validate(withPerson()).errors, []);
  assert.deepEqual(validate(withPerson({ life: { from: 1900, to: 1980 } })).errors, []);
});

test('Szenario: Wikipedia-Zusammenfassung mit Quellen (PRF-UB-2)', () => {
  const summary = (n) => withPerson({ wikipedia: { summary: words(n), sources: [{ lang: 'de', url: 'https://de.wikipedia.org/wiki/X' }] } });
  assert.match(validate(summary(39)).errors.join('\n'), /wikipedia\/summary – 39 Wörter/);
  assert.deepEqual(validate(summary(40)).errors, []);
  assert.deepEqual(validate(summary(90)).errors, []);
  assert.match(validate(summary(91)).errors.join('\n'), /wikipedia\/summary – 91 Wörter/);
  const wrong = withPerson({ wikipedia: { summary: words(50), sources: [{ lang: 'en', url: 'https://de.wikipedia.org/wiki/X' }] } });
  assert.match(validate(wrong).errors.join('\n'), /gehört nicht zu en\.wikipedia\.org/);
  const none = withPerson({ wikipedia: { summary: words(50), sources: [] } });
  assert.ok(validate(none).errors.length > 0, 'ohne Quelle');
});

test('Szenario: Portrait mit Bildnachweis (PRF-UB-3)', () => {
  const noCredit = profile();
  delete noCredit.portrait.credit;
  assert.ok(validate(withPerson({ portrait: noCredit.portrait })).errors.length > 0);
  const noLicense = profile();
  delete noLicense.portrait.license;
  assert.ok(validate(withPerson({ portrait: noLicense.portrait })).errors.length > 0);
  const foreign = profile().portrait;
  foreign.source = 'https://example.org/File:Parr.jpg';
  assert.match(validate(withPerson({ portrait: foreign })).errors.join('\n'), /commons\.wikimedia\.org/);
  const wide = profile().portrait;
  wide.width = 401;
  assert.ok(validate(withPerson({ portrait: wide })).errors.length > 0, 'Breite über 400 px');
});

test('Szenario: Portraitdatei fehlt oder ist zu groß (PRF-UN-1)', () => {
  assert.match(validate(withPerson(), { portraitBytes: null }).errors.join('\n'), /Datei "data\/portraits\/martin-parr\.jpg" nicht vorhanden/);
  assert.match(validate(withPerson(), { portraitBytes: 201 * 1024 }).errors.join('\n'), /größer als 200 kB/);
  assert.deepEqual(validate(withPerson(), { portraitBytes: 200 * 1024 }).errors, []);
});

test('Szenario: Ungültige Lebensdaten und doppelter Name (PRF-UN-2)', () => {
  assert.match(validate(withPerson({ life: { from: 1980, to: 1900 } })).errors.join('\n'), /life – Todesjahr liegt vor dem Geburtsjahr/);
  const dup = withPerson();
  dup.photographers.push({ id: 'martin-parr-2', name: ' martin  PARR ' });
  assert.match(validate(dup).errors.join('\n'), /doppelter Name/);
});

test('Szenario: Beschreibung nennt alle Fotograf:innen / ohne Namen (PRF-UB-4, Q-DATA-9)', () => {
  const s = validSet();
  s.photographers.push({ id: 'elliott-erwitt', name: 'Elliott Erwitt' });
  s.exhibitions = [exhibition({ type: 'group', photographerIds: ['martin-parr', 'elliott-erwitt'], description: 'Arbeiten von MARTIN  Parr und Elliott Erwitt.' })];
  assert.deepEqual(validate(s, { portraitBytes: null }).errors, []);
  s.exhibitions[0].description = 'Arbeiten von Martin Parr.';
  assert.match(validate(s, { portraitBytes: null }).errors.join('\n'), /description – nennt "Elliott Erwitt" nicht/);
  s.exhibitions[0].description = '';
  assert.match(validate(s, { portraitBytes: null }).errors.join('\n'), /description – fehlt/);
  delete s.exhibitions[0].description;
  assert.match(validate(s, { portraitBytes: null }).errors.join('\n'), /description – fehlt/);
  s.exhibitions[0].photographerIds = [];
  s.exhibitions[0].type = 'solo';
  assert.deepEqual(validate(s, { portraitBytes: null }).errors, [], 'ohne Personen ist keine Beschreibung nötig');
});

test('Szenario: Portraits im Build (PRF-UB-5)', () => {
  const root = mkdtempSync(join(tmpdir(), 'pf-prf-sync-'));
  const out = mkdtempSync(join(tmpdir(), 'pf-prf-out-'));
  mkdirSync(join(root, 'data', 'portraits'), { recursive: true });
  for (const [name, records] of Object.entries(withPerson())) writeFileSync(join(root, 'data', `${name}.json`), JSON.stringify(records));
  writeFileSync(join(root, 'data', 'portraits', 'martin-parr.jpg'), 'bild');
  assert.deepEqual(syncData({ root, out }).errors, []);
  assert.equal(readFileSync(join(out, 'portraits', 'martin-parr.jpg'), 'utf8'), 'bild');
  assert.ok(!existsSync(join(out, 'data', 'portraits')), 'Portraits liegen nicht doppelt unter data/');
});

const bad = {
  'Zusammenfassung zu kurz': () => withPerson({ wikipedia: { summary: words(10), sources: [{ lang: 'de', url: 'https://de.wikipedia.org/x' }] } }),
  'Zusammenfassung zu lang': () => withPerson({ wikipedia: { summary: words(120), sources: [{ lang: 'de', url: 'https://de.wikipedia.org/x' }] } }),
  'Quelle ohne Sprache': () => withPerson({ wikipedia: { summary: words(50), sources: [{ url: 'https://de.wikipedia.org/x' }] } }),
  'Portrait ohne Urheber': () => withPerson({ portrait: { ...profile().portrait, credit: '' } }),
  'Portrait ohne Lizenz': () => withPerson({ portrait: { ...profile().portrait, license: undefined } }),
  'Portrait fremder Host': () => withPerson({ portrait: { ...profile().portrait, source: 'https://example.org/x' } }),
  'Portrait ohne Breite': () => withPerson({ portrait: { ...profile().portrait, width: undefined } }),
  'Lebensdaten umgekehrt': () => withPerson({ life: { from: 2000, to: 1999 } }),
  'Berufsbezeichnung leer': () => withPerson({ occupation: '' }),
};

test('Q-DATA-7: ungültige Profile werden zu 100 % erkannt, gültige ergeben 0 Fehler', async (t) => {
  assert.ok(Object.keys(bad).length >= 8);
  assert.deepEqual(validate(withPerson()).errors, []);
  for (const [name, build] of Object.entries(bad)) await t.test(name, () => assert.ok(validate(build()).errors.length > 0));
});

test('Szenario: Art passt zur Zahl der Personen (PRF-UN-3, Q-DATA-11)', () => {
  const people = (n) => Array.from({ length: n }, (_, i) => ({ id: `person-${i}`, name: `Person ${i}` }));
  const set = (type, n) => {
    const s = validSet();
    s.photographers = people(n);
    s.exhibitions = [exhibition({ type, photographerIds: s.photographers.map((p) => p.id), description: s.photographers.map((p) => p.name).join(', ') || 'Ohne Personen.' })];
    return s;
  };
  const errors = (type, n) => validate(set(type, n), { portraitBytes: null }).errors.join('\n');
  assert.match(errors('solo', 2), /type – "solo" erlaubt höchstens eine Person, verknüpft sind 2/);
  assert.match(errors('group', 1), /type – "group" erfordert mindestens zwei Personen, verknüpft sind 1/);
  assert.match(errors('group', 0), /type – "group" erfordert mindestens zwei Personen, verknüpft sind 0/);
  for (const [type, n] of [['solo', 1], ['solo', 0], ['group', 2], ['group', 57], ['retrospective', 1], ['retrospective', 3], ['permanent', 3], ['permanent', 0]]) {
    assert.deepEqual(validate(set(type, n), { portraitBytes: null }).errors, [], `${type} mit ${n}`);
  }
});

const webSource = (n) => ({ title: `Quelle ${n}`, url: `https://example.org/${n}` });
const web = (summaryWords, sources = [webSource(1), webSource(2)]) => ({ web: { summary: words(summaryWords), sources } });

test('Szenario: Webkurztext mit Quellen (PRF-UB-6)', () => {
  assert.deepEqual(validate(withPerson(web(60))).errors, []);
  assert.deepEqual(validate(withPerson(web(40, [webSource(1)]))).errors, []);
  assert.deepEqual(validate(withPerson(web(90, [1, 2, 3, 4, 5].map(webSource)))).errors, []);
});

test('Szenario: Ungültiger Webkurztext (PRF-UN-4)', () => {
  const bad = {
    'ohne Quelle': web(60, []),
    'elf Quellen': web(60, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map(webSource)),
    '39 Wörter': web(39),
    '91 Wörter': web(91),
    'ftp-Quelle': web(60, [{ title: 'FTP', url: 'ftp://example.org/a' }]),
  };
  for (const [name, over] of Object.entries(bad)) assert.match(validate(withPerson(over)).errors.join('\n'), /web/, name);
});
