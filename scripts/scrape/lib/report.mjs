// Bericht über einen Aktualisierungslauf (UPD-EV-3): updates/<Datum>/REPORT.md.
import { existsSync, readdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { readJson } from './common.mjs';

export function buildReport({ root, date }) {
  const dir = join(root, 'updates', date);
  const fetchSummary = existsSync(join(dir, 'fetch-summary.json')) ? readJson(join(dir, 'fetch-summary.json')) : null;
  const venues = fetchSummary?.venues ?? [];
  const count = (status) => venues.filter((v) => v.status === status);
  const proposals = existsSync(dir)
    ? readdirSync(dir).filter((f) => f.endsWith('.json') && f !== 'fetch-summary.json').map((f) => readJson(join(dir, f)))
    : [];
  const changes = proposals.flatMap((p) => (p.changes ?? []).map((c) => ({ ...c, venueId: p.venueId })));
  const rejected = proposals.flatMap((p) => (p.rejected ?? []).map((c) => ({ ...c, venueId: p.venueId })));
  const conflicts = changes.filter((c) => c.conflict);
  const lines = [
    `# Bericht zur Datenaktualisierung ${date}`,
    '',
    '## Abruf',
    '',
    fetchSummary ? `- Orte abgerufen: ${count('abgerufen').length}` : '- Kein Abruf in diesem Lauf (keine `fetch-summary.json`).',
    ...(fetchSummary
      ? [
          `- Orte aus dem Cache: ${count('zwischengespeichert').length}`,
          `- Orte fehlgeschlagen: ${count('fehlgeschlagen').length}`,
          `- Orte übersprungen: ${count('übersprungen').length}`,
          ...count('fehlgeschlagen').flatMap((v) => v.errors.map((e) => `  - ${v.venueId}: ${e.url} – ${e.reason}`)),
          ...venues.flatMap((v) => v.notes.map((n) => `  - Hinweis ${v.venueId}: ${n}`)),
        ]
      : []),
    '',
    '## Vorschläge',
    '',
    `- Ergänzt: ${changes.filter((c) => c.kind === 'ergänzt').length}`,
    `- Geändert: ${changes.filter((c) => c.kind === 'geändert').length}`,
    `- Verworfen: ${rejected.length}`,
    `- Übernommen: ${changes.filter((c) => c.appliedAt).length}`,
    `- Konflikte: ${conflicts.length}`,
    ...conflicts.map((c) => `  - ${c.venueId}: ${c.dataset} ${c.recordId ?? c.record?.id ?? ''} ${c.field ?? ''} (Ort ist verifiziert)`),
    ...rejected.map((c) => `  - verworfen ${c.venueId} ${c.id ?? ''}: ${c.reason}`),
    '',
  ];
  return lines.join('\n');
}

export function writeReport({ root, date }) {
  const text = buildReport({ root, date });
  writeFileSync(join(root, 'updates', date, 'REPORT.md'), text);
  return text;
}
