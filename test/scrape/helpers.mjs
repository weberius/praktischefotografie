import { mkdirSync, mkdtempSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { saveSnapshot } from '../../scripts/scrape/lib/snapshots.mjs';
import { exhibition, validSet, venue } from '../helpers.mjs';

export const DATE = '2026-10-27';
export const URL_PAGE = 'https://makk.example.org/besuch';

/** Legt ein Arbeitsverzeichnis mit Daten, Snapshot und optionaler Vorschlagsdatei an. */
export function workspace({ venues = [venue()], extra = {}, text = 'Das Haus liegt in der Altstadt-Nord. Bibliothek: Präsenzbibliothek zu Fotokunst. Anschrift: Neue Straße 2, 50667 Köln. Ausstellung Neue Schau läuft ab 1. Dezember.', proposal } = {}) {
  const root = mkdtempSync(join(tmpdir(), 'pf-ws-'));
  const dataDir = join(root, 'data');
  const snapshotDir = join(root, '.cache', 'snapshots');
  mkdirSync(dataDir, { recursive: true });
  const set = { ...validSet(), venues, exhibitions: [exhibition({ venueId: venues[0].id })], ...extra };
  for (const [name, records] of Object.entries(set)) writeFileSync(join(dataDir, `${name}.json`), JSON.stringify(records, null, 2));
  saveSnapshot(snapshotDir, venues[0].id, { url: URL_PAGE, fetchedAt: `${DATE}T10:00:00.000Z`, status: 200, title: 'Besuch', text, links: [] });
  let file = null;
  if (proposal) {
    mkdirSync(join(root, 'updates', DATE), { recursive: true });
    file = join(root, 'updates', DATE, `${venues[0].id}.json`);
    writeFileSync(file, JSON.stringify({ venueId: venues[0].id, fetchedAt: DATE, changes: proposal }, null, 2));
  }
  return { root, dataDir, snapshotDir, file };
}

export const change = (over) => ({ id: 'c1', dataset: 'venues', recordId: 'makk-koeln', field: 'district', newValue: 'Altstadt-Nord', evidence: { url: URL_PAGE, excerpt: 'liegt in der Altstadt-Nord' }, ...over });
