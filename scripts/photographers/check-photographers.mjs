// Prüft updates/<Datum>/photographers.json gegen die Kandidatendatei (ADR-012, RSF-UB-5).
// Aufruf: npm run photographers:check -- [--date JJJJ-MM-TT]
import { fileURLToPath } from 'node:url';
import { ROOT, arg, today } from '../scrape/lib/common.mjs';
import { checkFile } from './lib/research.mjs';

export function main(argv = process.argv.slice(2), root = ROOT) {
  const date = arg(argv, 'date', today());
  const checked = checkFile({ root, date });
  const bad = checked.proposals.filter((p) => p.problems?.length > 0);
  console.log(`${checked.proposals.length - bad.length} von ${checked.proposals.length} Vorschlägen gültig (updates/${date}/PHOTOGRAPHERS.md).`);
  for (const p of bad) console.log(`  ${p.id}: ${p.problems.join('; ')}`);
  return checked;
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  try {
    main();
  } catch (e) {
    console.error(e.message);
    process.exitCode = 1;
  }
}
