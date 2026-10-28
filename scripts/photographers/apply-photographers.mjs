// Übernimmt freigegebene Vorschläge in data/photographers.json und data/portraits/ (ADR-012, RSF-UB-6).
// Aufruf: npm run photographers:apply -- [--date JJJJ-MM-TT] [--photographer <id>] [--force]
import { fileURLToPath } from 'node:url';
import { ROOT, arg, today } from '../scrape/lib/common.mjs';
import { applyFile } from './lib/research.mjs';

export function main(argv = process.argv.slice(2), root = ROOT) {
  const date = arg(argv, 'date', today());
  const result = applyFile({ root, date, force: arg(argv, 'force', false) === true, photographerId: arg(argv, 'photographer') || undefined });
  if (!result.ok) {
    console.error(`Übernahme abgebrochen, Daten unverändert:\n${result.errors.join('\n')}`);
    return result;
  }
  console.log(`${result.applied.length} Profile übernommen, ${result.skipped.length} übersprungen.`);
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
