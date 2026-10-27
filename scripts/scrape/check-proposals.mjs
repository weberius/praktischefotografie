// Prüft Vorschlagsdateien unter updates/<Datum>/ (ADR-007): Schema, Fundstelle im Snapshot, Dubletten, Konflikte.
// Aufruf: npm run data:check -- [--date JJJJ-MM-TT] [--venue <id>]
import { existsSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { ROOT, arg, loadVenues, resolveVenues, today } from './lib/common.mjs';
import { checkProposalFile } from './lib/proposals.mjs';

export function main(argv = process.argv.slice(2), root = ROOT) {
  const date = arg(argv, 'date', today());
  const venues = resolveVenues(loadVenues(root), arg(argv, 'venue'));
  const results = [];
  for (const venue of venues) {
    const file = join(root, 'updates', date, `${venue.id}.json`);
    if (!existsSync(file)) continue;
    const result = checkProposalFile(file, { dataDir: join(root, 'data'), snapshotDir: join(root, '.cache', 'snapshots'), root });
    results.push({ venueId: venue.id, accepted: result.changes.length, rejected: result.rejected.length });
    console.log(`${venue.id}: ${result.changes.length} Vorschläge, ${result.rejected.length} verworfen`);
  }
  if (results.length === 0) console.log(`Keine Vorschlagsdateien in updates/${date}/`);
  return results;
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  try {
    main();
  } catch (e) {
    console.error(e.message);
    process.exitCode = 1;
  }
}
