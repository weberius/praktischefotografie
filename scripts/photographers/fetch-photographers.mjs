// Recherchiert Fotograf:innen über Wikidata, Wikipedia und Commons und schreibt updates/<Datum>/photographers-candidates.json (ADR-012).
// Aufruf: npm run photographers:fetch -- [--photographer <id>[,<id>…]] [--force] [--offline] [--max-age <Tage>] [--date JJJJ-MM-TT]
// Voraussetzung (außer --offline): Umgebungsvariable SCRAPE_CONTACT mit einer Kontaktadresse.
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { ROOT, arg, today } from '../scrape/lib/common.mjs';
import { fetchCandidates } from './lib/research.mjs';
import { createClient } from './lib/wikimedia.mjs';

export async function main(argv = process.argv.slice(2), env = process.env, root = ROOT, clientOptions = {}) {
  const date = arg(argv, 'date', today());
  const photographerId = arg(argv, 'photographer');
  const client = createClient({
    contact: env.SCRAPE_CONTACT,
    offline: arg(argv, 'offline', false) === true,
    maxAgeDays: Number(arg(argv, 'max-age', 30)),
    cacheDir: join(root, '.cache', 'wikipedia'),
    ...clientOptions,
  });
  const file = await fetchCandidates({ root, date, client, photographerId: photographerId || undefined, force: arg(argv, 'force', false) === true });
  for (const r of file.results) console.log(`${r.id}: ${r.status}${r.note ? ` (${r.note})` : ''}${r.articles ? `, Artikel: ${r.articles.map((a) => a.lang).join('/') || '–'}` : ''}${r.portrait ? `, Bild: ${r.portrait.license}` : r.portraitNote ? `, kein Bild (${r.portraitNote})` : ''}`);
  console.log(`${file.results.length} Personen bearbeitet, ${client.stats.requests} Anfragen, ${client.stats.cached} aus dem Cache.`);
  return file;
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  main().catch((e) => {
    console.error(e.message);
    process.exitCode = 1;
  });
}
