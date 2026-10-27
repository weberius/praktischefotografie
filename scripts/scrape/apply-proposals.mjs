// Übernimmt freigegebene Vorschläge (`approved: true`) in data/*.json (ADR-007). Bei ungültigem Ergebnis bleibt alles unverändert.
// Aufruf: npm run data:apply -- [--date JJJJ-MM-TT] [--venue <id>]
import { existsSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { ROOT, arg, loadVenues, resolveVenues, today } from './lib/common.mjs';
import { applyProposals } from './lib/proposals.mjs';

export function main(argv = process.argv.slice(2), root = ROOT) {
  const date = arg(argv, 'date', today());
  const venues = resolveVenues(loadVenues(root), arg(argv, 'venue'));
  const files = venues.map((v) => join(root, 'updates', date, `${v.id}.json`)).filter(existsSync);
  const result = applyProposals(files, { dataDir: join(root, 'data'), root });
  if (!result.ok) {
    console.error(`Übernahme abgebrochen, Daten unverändert:\n${result.errors.join('\n')}`);
    return result;
  }
  console.log(`${result.applied.length} Änderungen übernommen, ${result.skipped.length} übersprungen.`);
  for (const s of result.skipped) console.log(`  übersprungen ${s.venueId} ${s.id}: ${s.reason}`);
  return result;
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  try {
    if (!main().ok) process.exitCode = 1;
  } catch (e) {
    console.error(e.message);
    process.exitCode = 1;
  }
}
