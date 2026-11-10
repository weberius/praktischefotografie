// Schreibt updates/<Datum>/REPORT.md (UPD-EV-3).
// Aufruf: npm run data:report -- [--date JJJJ-MM-TT] [--events]  (--events: Veranstaltungsrecherche, updates/<Datum>/events/REPORT.md)
import { fileURLToPath } from 'node:url';
import { ROOT, arg, today } from './lib/common.mjs';
import { writeEventsReport, writeReport } from './lib/report.mjs';

export function main(argv = process.argv.slice(2), root = ROOT) {
  const date = arg(argv, 'date', today());
  const text = arg(argv, 'events', false) === true ? writeEventsReport({ root, date }) : writeReport({ root, date });
  console.log(text);
  return text;
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  try {
    main();
  } catch (e) {
    console.error(e.message);
    process.exitCode = 1;
  }
}
