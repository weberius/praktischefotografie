import { Injectable } from '@angular/core';

/** Liefert das heutige Datum als ISO-Datum (JJJJ-MM-TT). Tests ersetzen den Dienst durch einen festen Wert. */
@Injectable({ providedIn: 'root' })
export class Clock {
  today(): string {
    const d = new Date();
    const pad = (n: number) => String(n).padStart(2, '0');
    return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
  }
}

/** Ganze Tage von `from` bis `to` (ISO-Daten); negativ, wenn `to` vor `from` liegt. */
export function daysBetween(from: string, to: string): number {
  const ms = (iso: string) => Date.UTC(+iso.slice(0, 4), +iso.slice(5, 7) - 1, +iso.slice(8, 10));
  return Math.round((ms(to) - ms(from)) / 86_400_000);
}

const MONTHS = ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'];

/** Deutsches Datum, z. B. „9. August 2026“. */
export function formatDate(iso: string): string {
  return `${+iso.slice(8, 10)}. ${MONTHS[+iso.slice(5, 7) - 1]} ${iso.slice(0, 4)}`;
}

/** Zeitraum; gleicher Tag wird nur einmal genannt. */
export function formatRange(start: string, end: string): string {
  return start === end ? formatDate(start) : `${formatDate(start)} – ${formatDate(end)}`;
}

export function monthName(month: number): string {
  return MONTHS[month - 1];
}
