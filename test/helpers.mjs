import { mkdtempSync, mkdirSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { validateData } from '../scripts/validate-data.mjs';

export const venue = (over = {}) => ({
  id: 'makk-koeln',
  name: 'MAKK – Museum für Angewandte Kunst Köln',
  shortName: 'MAKK Köln',
  type: 'museum',
  city: 'Köln',
  address: { street: 'An der Rechtschule', zip: '50667', city: 'Köln', lat: 50.9385, lng: 6.9558 },
  website: 'https://makk.stadt-koeln.de',
  features: { hasPermanentCollection: true, hasReferenceLibrary: true, libraryNotes: 'Präsenzbibliothek.' },
  source: { url: 'https://makk.stadt-koeln.de', checkedAt: '2026-10-27', status: 'recherchiert' },
  ...over,
});

export const exhibition = (over = {}) => ({
  id: 'ausstellung-1',
  venueId: 'makk-koeln',
  festivalId: null,
  title: 'Test',
  startDate: '2026-08-09',
  endDate: '2026-11-01',
  type: 'group',
  photographerIds: ['martin-parr'],
  description: 'Ausstellung mit Arbeiten von Martin Parr.',
  ...over,
});

export const validSet = () => ({
  venues: [venue()],
  exhibitions: [exhibition()],
  events: [],
  organizers: [{ id: 'photoszene-koeln', name: 'Internationale Photoszene Köln e.V.', type: 'association', city: 'Köln' }],
  festivals: [],
  photographers: [{ id: 'martin-parr', name: 'Martin Parr' }],
  posts: [],
});

/** Schreibt ein Datenset in ein temporäres Verzeichnis und validiert es. */
export function run(set, { files = [] } = {}) {
  const root = mkdtempSync(join(tmpdir(), 'pf-'));
  const dataDir = join(root, 'data');
  mkdirSync(dataDir);
  for (const [name, records] of Object.entries(set)) {
    writeFileSync(join(dataDir, `${name}.json`), JSON.stringify(records));
  }
  for (const f of files) {
    mkdirSync(join(root, f, '..'), { recursive: true });
    writeFileSync(join(root, f), '# Test\n');
  }
  return validateData({ dataDir, rootDir: root, today: new Date('2026-10-27') });
}

export const withVenues = (venues) => ({ ...validSet(), exhibitions: [], venues });
