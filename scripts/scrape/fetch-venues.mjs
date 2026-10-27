// Ruft die Webseiten der Orte ab und legt Snapshots ab (ADR-006).
// Aufruf: npm run data:fetch -- [--venue <id>] [--offline] [--max-age <Tage>] [--date JJJJ-MM-TT]
// Voraussetzung (außer --offline): Umgebungsvariable SCRAPE_CONTACT mit einer Kontaktadresse.
import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { ROOT, arg, loadVenues, resolveVenues, today } from './lib/common.mjs';
import { fetchVenues } from './lib/fetcher.mjs';

export async function main(argv = process.argv.slice(2), env = process.env) {
  const offline = arg(argv, 'offline', false) === true;
  const date = arg(argv, 'date', today());
  const venues = resolveVenues(loadVenues(), arg(argv, 'venue'));
  const summaries = await fetchVenues(venues, {
    contact: env.SCRAPE_CONTACT,
    offline,
    maxAgeDays: Number(arg(argv, 'max-age', 7)),
    snapshotDir: join(ROOT, '.cache', 'snapshots'),
  });
  const dir = join(ROOT, 'updates', date);
  mkdirSync(dir, { recursive: true });
  writeFileSync(join(dir, 'fetch-summary.json'), JSON.stringify({ date, offline, venues: summaries }, null, 2));
  for (const s of summaries) console.log(`${s.venueId}: ${s.status} (${s.fetched} abgerufen, ${s.cached} aus Cache, ${s.errors.length} Fehler)`);
  return summaries;
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  main().catch((e) => {
    console.error(e.message);
    process.exitCode = 1;
  });
}
