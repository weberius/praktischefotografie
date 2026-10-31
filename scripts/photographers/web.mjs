// Websuche nach Personen (ADR-019, WSP-*). Die Suche selbst führt der Skill aus und schreibt photographers-search.json.
// Aufruf: npm run photographers:web -- plan   … (--photographer <id> | --name "<Name>") [--offline] [--max-age <Tage>] [--date JJJJ-MM-TT]
//         npm run photographers:web -- links  [--date …]   (Suchdatei in Linksammlung übernehmen)
//         npm run photographers:web -- pages  [--offline] [--date …]   (Seiten neuer Links abrufen; braucht SCRAPE_CONTACT)
//         npm run photographers:web -- check  [--date …]
//         npm run photographers:web -- apply  [--photographer <id>] [--force] [--date …]
import { fileURLToPath } from 'node:url';
import { ROOT, arg, today } from '../scrape/lib/common.mjs';
import { applyWebFile, checkWebFile, fetchPages, ingestSearch, planWeb } from './lib/websearch.mjs';

export async function main(argv = process.argv.slice(2), env = process.env, root = ROOT, options = {}) {
  const [command] = argv;
  const rest = argv.slice(1);
  const date = arg(rest, 'date', today());
  const offline = arg(rest, 'offline', false) === true;
  const maxAgeDays = Number(arg(rest, 'max-age', 30));
  if (command === 'plan') {
    const { person } = planWeb({ root, date, photographerId: arg(rest, 'photographer') || undefined, name: arg(rest, 'name') || undefined, offline, maxAgeDays });
    console.log(`${person.id}${person.isNew ? ' (neu)' : ''}: ${person.useCache ? 'Suche aus dem Zwischenspeicher' : `Suchanfragen: ${person.queries.join(' | ')}`}`);
    return person;
  }
  if (command === 'links') {
    const plan = ingestSearch({ root, date });
    for (const p of plan.persons) console.log(`${p.id}: ${p.status}${p.note ? ` (${p.note})` : ''}, Treffer: ${p.hitCount}, neue Links: ${p.newLinks.length}`);
    return plan;
  }
  if (command === 'pages') {
    const plan = await fetchPages({ root, date, contact: env.SCRAPE_CONTACT, offline, maxAgeDays, fetchOptions: options.fetchOptions, allowInternal: options.allowInternal });
    for (const p of plan.persons) if (p.pages) console.log(`${p.id}: ${p.pages.status}, ${p.pages.fetched} abgerufen, ${p.pages.cached} aus dem Zwischenspeicher`);
    return plan;
  }
  if (command === 'check') {
    const checked = checkWebFile({ root, date });
    const bad = checked.proposals.filter((p) => p.problems?.length > 0);
    console.log(`${checked.proposals.length - bad.length} von ${checked.proposals.length} Vorschlägen gültig (updates/${date}/PHOTOGRAPHERS.md).`);
    for (const p of bad) console.log(`  ${p.id}: ${p.problems.join('; ')}`);
    return checked;
  }
  if (command === 'apply') {
    const result = applyWebFile({ root, date, force: arg(rest, 'force', false) === true, photographerId: arg(rest, 'photographer') || undefined });
    if (!result.ok) {
      console.error(`Übernahme abgebrochen, Daten unverändert:\n${result.errors.join('\n')}`);
      return result;
    }
    console.log(`${result.applied.length} Vorschläge übernommen, ${result.skipped.length} übersprungen.`);
    for (const s of result.skipped) console.log(`  übersprungen ${s.id}: ${s.reason}`);
    return result;
  }
  throw new Error('Unbekannter Befehl. Erlaubt: plan, links, pages, check, apply.');
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  main()
    .then((r) => {
      if (r?.ok === false) process.exitCode = 1;
    })
    .catch((e) => {
      console.error(e.message);
      process.exitCode = 1;
    });
}
