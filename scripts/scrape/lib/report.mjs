// Bericht über einen Aktualisierungslauf (UPD-EV-3): updates/<Datum>/REPORT.md.
import { existsSync, readdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { readJson } from './common.mjs';
import { listSnapshots } from './snapshots.mjs';
import { hasHint, terminKind } from './termine.mjs';

const KINDS = [['vernissage', 'Eröffnung'], ['finissage', 'Finissage']];

/** Termine je Quelle (OPN-EV-1): Snapshots mit Hinweis, Vorschläge, bereits Vorhandenes; nur aus Dateien, ohne Netz. */
export function termineSummary({ root, proposals }) {
  const snapshotDir = join(root, '.cache', 'snapshots');
  const sources = existsSync(snapshotDir) ? readdirSync(snapshotDir).sort() : [];
  return sources
    .map((id) => {
      const snapshots = listSnapshots(snapshotDir, id);
      const own = proposals.filter((p) => (p.venueId ?? p.organizerId) === id);
      const row = { id, kinds: {} };
      for (const [kind] of KINDS) {
        const hints = snapshots.filter((snap) => hasHint(snap.text, kind)).length;
        const isKind = (c) => c.dataset === 'events' && terminKind(c.record) === kind;
        const proposed = own.flatMap((p) => p.changes ?? []).filter(isKind).length;
        const existing = own.flatMap((p) => p.rejected ?? []).filter((c) => isKind(c) && /Dublette/.test(c.reason)).length;
        row.kinds[kind] = { hints, proposed, existing, review: hints > 0 && proposed + existing === 0 };
      }
      return row;
    })
    .filter((row) => KINDS.some(([kind]) => row.kinds[kind].hints > 0));
}

function termineLines(rows) {
  if (rows.length === 0) return ['- Keine Eröffnungs- oder Finissagehinweise in den Snapshots.'];
  return rows.flatMap((row) =>
    KINDS.filter(([kind]) => row.kinds[kind].hints > 0).map(([kind, label]) => {
      const k = row.kinds[kind];
      return `- ${row.id}: ${label}: ${k.hints} Snapshot(s) mit Hinweis, ${k.proposed} Vorschlag/Vorschläge, ${k.existing} bereits vorhanden${k.review ? ' – **zu prüfen**' : ''}`;
    }),
  );
}

export function buildReport({ root, date }) {
  const dir = join(root, 'updates', date);
  const fetchSummary = existsSync(join(dir, 'fetch-summary.json')) ? readJson(join(dir, 'fetch-summary.json')) : null;
  const venues = fetchSummary?.venues ?? [];
  const count = (status) => venues.filter((v) => v.status === status);
  const proposals = existsSync(dir)
    ? readdirSync(dir).filter((f) => f.endsWith('.json') && f !== 'fetch-summary.json').map((f) => readJson(join(dir, f)))
    : [];
  const changes = proposals.flatMap((p) => (p.changes ?? []).map((c) => ({ ...c, venueId: p.venueId ?? p.organizerId })));
  const rejected = proposals.flatMap((p) => (p.rejected ?? []).map((c) => ({ ...c, venueId: p.venueId ?? p.organizerId })));
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
    '## Termine (Eröffnung und Finissage)',
    '',
    ...termineLines(termineSummary({ root, proposals })),
    '',
  ];
  return lines.join('\n');
}

export function writeReport({ root, date }) {
  const text = buildReport({ root, date });
  writeFileSync(join(root, 'updates', date, 'REPORT.md'), text);
  return text;
}
