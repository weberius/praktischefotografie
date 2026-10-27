// Q-DATA-1: >= 10 ungültige Fixtures werden zu 100 % erkannt, gültige Daten ergeben 0 Fehler.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { run, validSet, venue, exhibition } from './helpers.mjs';

const mut = (fn) => () => { const s = validSet(); fn(s); return s; };

const ungueltig = {
  'Pflichtfeld fehlt': mut((s) => { delete s.venues[0].name; }),
  'unbekannter Typ': mut((s) => { s.venues[0].type = 'handel'; }),
  'zip ungültig': mut((s) => { s.venues[0].address.zip = '1'; }),
  'Website ohne http': mut((s) => { s.venues[0].website = 'makk'; }),
  'id nicht kebab-case': mut((s) => { s.venues[0].id = 'MAKK Köln'; }),
  'doppelte id': mut((s) => { s.venues.push(venue()); }),
  'Koordinaten außerhalb NRW': mut((s) => { s.venues[0].address.lat = 48.1; }),
  'Quelle fehlt': mut((s) => { delete s.venues[0].source; }),
  'Prüfdatum in der Zukunft': mut((s) => { s.venues[0].source.checkedAt = '2030-01-01'; }),
  'Bibliothek ohne Hinweis': mut((s) => { delete s.venues[0].features.libraryNotes; }),
  'Referenz auf Venue': mut((s) => { s.exhibitions[0].venueId = 'nix'; }),
  'Referenz auf Fotograf:in': mut((s) => { s.exhibitions[0].photographerIds = ['nix']; }),
  'Referenz auf Festival': mut((s) => { s.exhibitions[0].festivalId = 'nix'; }),
  'Ende vor Beginn': mut((s) => { Object.assign(s.exhibitions[0], exhibition({ startDate: '2026-12-01', endDate: '2026-01-01' })); }),
  'Beitrag mit fehlender Datei': mut((s) => {
    s.posts = [{ id: 'p-1', slug: 'p-1', title: 'T', date: '2026-11-02', linkedVenueIds: ['makk-koeln'], contentFile: 'content/posts/fehlt.md' }];
  }),
  'Beitrag mit unbekannter Venue': mut((s) => {
    s.posts = [{ id: 'p-1', slug: 'p-1', title: 'T', date: '2026-11-02', linkedVenueIds: ['nix'], contentFile: 'content/posts/da.md' }];
  }),
};

test('Q-DATA-1: gültiges Set ergibt 0 Fehlmeldungen', () => {
  assert.deepEqual(run(validSet()).errors, []);
});

test('Beitrag mit vorhandener Datei und gültigen Referenzen ist gültig', () => {
  const s = validSet();
  s.posts = [{ id: 'p-1', slug: 'p-1', title: 'T', date: '2026-11-02', linkedVenueIds: ['makk-koeln'], linkedExhibitionIds: ['ausstellung-1'], contentFile: 'content/posts/da.md' }];
  assert.deepEqual(run(s, { files: ['content/posts/da.md'] }).errors, []);
});

test(`Q-DATA-1: alle ${Object.keys(ungueltig).length} ungültigen Fixtures werden erkannt`, async (t) => {
  assert.ok(Object.keys(ungueltig).length >= 10);
  for (const [name, build] of Object.entries(ungueltig)) {
    await t.test(name, () => assert.ok(run(build()).errors.length > 0));
  }
});
