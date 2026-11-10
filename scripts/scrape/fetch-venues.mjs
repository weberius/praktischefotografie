// Ruft die Webseiten der Orte und Veranstalter ab und legt Snapshots ab (ADR-006, ADR-010).
// Aufruf: npm run data:fetch -- [--venue <ort-oder-veranstalter-id>] [--offline] [--max-age <Tage>] [--date JJJJ-MM-TT] [--events]
// --events: Veranstaltungsmodus (VRS-EV-1, ADR-026): nur Orte, bis zu zehn Seiten, Veranstaltungslinks zuerst; Ergebnis unter updates/<Datum>/events/.
// Voraussetzung (außer --offline): Umgebungsvariable SCRAPE_CONTACT mit einer Kontaktadresse.
import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { ROOT, arg, loadRedirectHosts, loadSources, resolveEventVenues, resolveVenues, today } from './lib/common.mjs';
import { fetchVenues } from './lib/fetcher.mjs';

export async function main(argv = process.argv.slice(2), env = process.env, root = ROOT) {
  const offline = arg(argv, 'offline', false) === true;
  const date = arg(argv, 'date', today());
  const sources = loadSources(root);
  const redirectHosts = loadRedirectHosts(sources, root); // vor der ersten Anfrage prüfen (FET-OP-3)
  const events = arg(argv, 'events', false) === true;
  const venues = events ? resolveEventVenues(root, arg(argv, 'venue')) : resolveVenues(sources, arg(argv, 'venue'));
  const summaries = await fetchVenues(venues, {
    contact: env.SCRAPE_CONTACT,
    redirectHosts,
    offline,
    events,
    maxAgeDays: Number(arg(argv, 'max-age', 7)),
    snapshotDir: join(root, '.cache', 'snapshots'),
  });
  const dir = join(root, 'updates', date, ...(events ? ['events'] : []));
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
