// Plant Neuigkeiten für das Magazin nach updates/<Datum>/news.json (ADR-008).
// Aufruf: npm run news:plan -- [--venue <id>] [--date JJJJ-MM-TT]
import { fileURLToPath } from 'node:url';
import { ROOT, arg, loadVenues, resolveVenues, today } from '../scrape/lib/common.mjs';
import { runPlan } from './lib/news.mjs';

export function main(argv = process.argv.slice(2), root = ROOT) {
  const date = arg(argv, 'date', today());
  const venueId = arg(argv, 'venue');
  if (venueId) resolveVenues(loadVenues(root), venueId);
  const plan = runPlan({ root, date, venueId: venueId || undefined });
  console.log(`${plan.items.length} Neuigkeiten geplant (updates/${date}/news.json), ${plan.orphans.length} verwaist.`);
  return plan;
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  try {
    main();
  } catch (e) {
    console.error(e.message);
    process.exitCode = 1;
  }
}
