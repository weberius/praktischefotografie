// Läuft nur beim Build (Node): liest die synchronisierten Daten aus public/data.
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

function read<T>(file: string): T[] {
  return JSON.parse(readFileSync(join(process.cwd(), 'public', 'data', `${file}.json`), 'utf8')) as T[];
}

const today = () => new Date().toISOString().slice(0, 10);

export const ids = (file: string): string[] => read<{ id: string }>(file).map((r) => r.id);

/** Nur veröffentlichte Beiträge (Datum nicht in der Zukunft, BLG-UN-1). */
export const publishedSlugs = (): string[] =>
  read<{ slug: string; date: string }>('posts').filter((p) => p.date <= today()).map((p) => p.slug);

/** Monate von der ersten Ausstellung/Event bis zur letzten, mindestens der aktuelle Monat. */
export function calendarParams(): { year: string; month: string }[] {
  const dates = [...read<{ startDate: string; endDate: string }>('exhibitions'), ...read<{ startDate: string; endDate: string }>('events')]
    .flatMap((r) => [r.startDate, r.endDate])
    .concat(today());
  const now = today();
  // Begrenzung: höchstens 12 Monate zurück und 24 Monate voraus (Dauerausstellungen sollen nicht Jahrzehnte erzeugen).
  const lowest = `${+now.slice(0, 4) - 1}-${now.slice(5, 7)}`;
  const highest = `${+now.slice(0, 4) + 2}-${now.slice(5, 7)}`;
  const first = [dates.reduce((a, b) => (a < b ? a : b)).slice(0, 7), lowest].reduce((a, b) => (a > b ? a : b));
  const last = [dates.reduce((a, b) => (a > b ? a : b)).slice(0, 7), highest].reduce((a, b) => (a < b ? a : b));
  const result: { year: string; month: string }[] = [];
  let [y, m] = first.split('-').map(Number);
  while (`${y}-${String(m).padStart(2, '0')}` <= last) {
    result.push({ year: String(y), month: String(m) });
    if (++m > 12) { m = 1; y++; }
  }
  return result;
}
