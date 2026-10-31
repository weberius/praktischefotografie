// Berichtsteil der Personen-Websuche für updates/<Datum>/PHOTOGRAPHERS.md (WSP-EV-4, ADR-019).
import { join } from 'node:path';
import { readJson } from '../../scrape/lib/common.mjs';

export const webPlanPath = (root, date) => join(root, 'updates', date, 'photographers-web.json');
export const webSearchPath = (root, date) => join(root, 'updates', date, 'photographers-search.json');
export const webProposalsPath = (root, date) => join(root, 'updates', date, 'photographers-web-proposals.json');
export const linksPath = (root) => join(root, 'updates', 'photographers-links.json');

/** Zeilen des Berichts; leer, wenn an diesem Tag keine Websuche lief. */
export function webReportLines({ root, date }) {
  const plan = readJson(webPlanPath(root, date), null);
  if (!plan) return [];
  const proposals = readJson(webProposalsPath(root, date), { proposals: [] }).proposals;
  const persons = plan.persons ?? [];
  const sum = (key) => persons.reduce((n, p) => n + (p[key] ?? 0), 0);
  const created = proposals.filter((p) => p.appliedAt && p.create).length;
  const updated = proposals.filter((p) => p.appliedAt && p.web).length;
  const lines = [
    '',
    '## Websuche',
    '',
    `- Personen: ${persons.length}`,
    `- Suchanfragen: ${sum('queryCount')}`,
    `- Treffer: ${sum('hitCount')}`,
    `- Neue Links: ${persons.reduce((n, p) => n + (p.newLinks?.length ?? 0), 0)}`,
    `- Angelegte Personen: ${created}`,
    `- Aktualisierte Webkurztexte: ${updated}`,
    '',
  ];
  for (const p of persons) {
    const prop = proposals.find((x) => x.id === p.id);
    const state = !prop ? 'kein Vorschlag' : prop.appliedAt ? 'übernommen' : prop.problems?.length ? `verworfen: ${prop.problems.join('; ')}` : prop.approved ? 'freigegeben' : 'geprüft';
    lines.push(`- \`${p.id}\` (${p.name}${p.isNew ? ', neu' : ''}): ${p.status ?? 'offen'}${p.note ? ` – ${p.note}` : ''}; Suchmaschine: ${p.engine ?? '–'}; Anfragen: ${p.queryCount ?? 0}; Treffer: ${p.hitCount ?? 0}; ${state}`);
    for (const url of p.newLinks ?? []) lines.push(`  - neuer Link: ${url}`);
    for (const url of p.usedLinks ?? []) lines.push(`  - genutzt: ${url}`);
    if (p.pages) {
      lines.push(`  - Seiten: ${p.pages.fetched} abgerufen, ${p.pages.cached} aus dem Zwischenspeicher`);
      for (const n of p.pages.notes ?? []) lines.push(`  - Hinweis: ${n}`);
      for (const e of p.pages.errors ?? []) lines.push(`  - Fehler: ${e.url}: ${e.reason}`);
    }
  }
  return lines;
}
