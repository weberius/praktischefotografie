// Prüft die Texte im Plan der Neuigkeiten und schreibt den Bericht NEWS.md (ADR-008).
// Aufruf: npm run news:check -- [--date JJJJ-MM-TT]
import { fileURLToPath } from 'node:url';
import { ROOT, arg, today } from '../scrape/lib/common.mjs';
import { runCheck } from './lib/news.mjs';

export function main(argv = process.argv.slice(2), root = ROOT) {
  const date = arg(argv, 'date', today());
  const plan = runCheck({ root, date });
  const bad = plan.items.filter((i) => i.problems?.length > 0);
  console.log(`${plan.items.length - bad.length} von ${plan.items.length} Neuigkeiten gültig (updates/${date}/NEWS.md).`);
  for (const i of bad) console.log(`  ${i.id}: ${i.problems.join('; ')}`);
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
