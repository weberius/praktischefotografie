import { Exhibition, PhotoEvent, Venue } from './models';
import { ExhibitionStatus, exhibitionStatus } from './exhibition-status';

export type AgendaKind = 'Ausstellung' | 'Event';

/** Ein Eintrag der Agenda: Ausstellung oder Event in gemeinsamer Form (CAL-UB-1). */
export interface AgendaItem {
  kind: AgendaKind;
  id: string;
  title: string;
  /** Name des Ortes (aus `venueId`); leer, wenn der Ort unbekannt ist. */
  venue: string;
  startDate: string;
  endDate: string;
  /** Pfad der Detailseite (CAL-UB-2). */
  link: string;
  /** Nur bei Ausstellungen. */
  status?: ExhibitionStatus;
}

/** Führt Ausstellungen und Events zusammen und sortiert nach Beginn aufsteigend (Ende und Titel als Tiebreaker). */
export function buildAgenda(
  exhibitions: Exhibition[],
  events: PhotoEvent[],
  venueById: Map<string, Venue>,
  today: string,
): AgendaItem[] {
  const venueName = (id: string) => venueById.get(id)?.name ?? '';
  const items: AgendaItem[] = [
    ...exhibitions.map((e) => ({
      kind: 'Ausstellung' as const,
      id: e.id,
      title: e.title,
      venue: venueName(e.venueId),
      startDate: e.startDate,
      endDate: e.endDate,
      link: `/exhibitions/${e.id}`,
      status: exhibitionStatus(e, today),
    })),
    ...events.map((e) => ({
      kind: 'Event' as const,
      id: e.id,
      title: e.title,
      venue: venueName(e.venueId),
      startDate: e.startDate,
      endDate: e.endDate,
      link: `/events/${e.id}`,
    })),
  ];
  return items.sort(
    (a, b) => a.startDate.localeCompare(b.startDate) || a.endDate.localeCompare(b.endDate) || a.title.localeCompare(b.title, 'de'),
  );
}

const pad = (n: number) => String(n).padStart(2, '0');

/** Einträge, deren Zeitraum den Monat berührt – auch beendete (CAL-EV-1). */
export function filterByMonth(items: AgendaItem[], year: number, month: number): AgendaItem[] {
  const first = `${year}-${pad(month)}-01`;
  const last = `${year}-${pad(month)}-31`; // ISO-Vergleich als Text; „-31“ liegt in jedem Monat über dem letzten Tag
  return items.filter((i) => i.startDate <= last && i.endDate >= first);
}

/** Standardansicht: ab heute laufende und kommende Einträge; optional zusätzlich beendete (CAL-OP-1). */
export function filterFromToday(items: AgendaItem[], today: string, showEnded: boolean): AgendaItem[] {
  return showEnded ? items : items.filter((i) => i.endDate >= today);
}

/** Prüft Jahr (vierstellig) und Monat (1–12) aus der Adresse; sonst `null` (CAL-UN-1). */
export function parseMonth(year: string | undefined, month: string | undefined): { year: number; month: number } | null {
  if (year === undefined || month === undefined) return null;
  if (!/^\d{4}$/.test(year) || !/^\d{1,2}$/.test(month)) return null;
  const m = +month;
  return m >= 1 && m <= 12 ? { year: +year, month: m } : null;
}

/** Verschiebt einen Monat um `delta` Monate. */
export function shiftMonth(year: number, month: number, delta: number): { year: number; month: number } {
  const index = year * 12 + (month - 1) + delta;
  return { year: Math.floor(index / 12), month: (index % 12) + 1 };
}
