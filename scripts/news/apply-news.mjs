// Übernimmt freigegebene, gültige Neuigkeiten in data/posts.json und content/posts/ (ADR-008).
// Aufruf: npm run news:apply -- [--date JJJJ-MM-TT]
import { fileURLToPath } from 'node:url';
import { ROOT, arg, today } from '../scrape/lib/common.mjs';
import { runApply } from './lib/news.mjs';

export function main(argv = process.argv.slice(2), root = ROOT) {
  const date = arg(argv, 'date', today());
  const result = runApply({ root, date });
  if (!result.ok) {
    console.error(`Übernahme abgebrochen, Daten unverändert:\n${result.errors.join('\n')}`);
    return result;
  }
  console.log(`${result.applied.length} Neuigkeiten übernommen, ${result.skipped.length} übersprungen.`);
  for (const s of result.skipped) console.log(`  übersprungen ${s.id}: ${s.reason}`);
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
