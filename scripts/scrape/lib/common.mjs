// Gemeinsame Hilfen der Skripte zur Datenaktualisierung (ADR-006, ADR-007).
import { readFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

export const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '../../..');
export const today = () => new Date().toISOString().slice(0, 10);

export function readJson(file, fallback) {
  try {
    return JSON.parse(readFileSync(file, 'utf8'));
  } catch (e) {
    if (e.code === 'ENOENT' && fallback !== undefined) return fallback;
    throw e;
  }
}

export const loadVenues = (root = ROOT) => readJson(join(root, 'data', 'venues.json'));

/** Quellen der Aktualisierung: Orte und Veranstalter mit `website` (ADR-010). IDs sind über beide Datensätze eindeutig (FES-UN-3). */
export const loadSources = (root = ROOT) => [
  ...loadVenues(root),
  ...readJson(join(root, 'data', 'organizers.json'), []).filter((o) => o.website),
];

/** Wählt eine Quelle (Ort oder Veranstalter) oder alle (UPD-OP-1, UPD-OP-2); unbekannte IDs werden mit den gültigen IDs gemeldet (UPD-UN-2). */
export function resolveVenues(venues, venueId) {
  if (!venueId) return venues;
  const found = venues.filter((v) => v.id === venueId);
  if (found.length === 0) {
    throw new Error(`Unbekannte Ort- oder Veranstalter-ID "${venueId}". Gültige IDs: ${venues.map((v) => v.id).join(', ')}`);
  }
  return found;
}

/** Liest ein Kommandozeilenargument: --name wert; Flags ohne Wert ergeben true. */
export function arg(argv, name, fallback) {
  const i = argv.indexOf(`--${name}`);
  if (i === -1) return fallback;
  const next = argv[i + 1];
  return next === undefined || next.startsWith('--') ? true : next;
}

export const normalizeSpace = (text) => String(text).replace(/\s+/g, ' ').trim();
