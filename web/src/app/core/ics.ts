// iCalendar-Erzeugung (RFC 5545) für genau ein Event – reine, testbare Funktion ohne Angular- und
// Browserabhängigkeit (ICS-*, ADR-018). Ganztägiger Eintrag, weil Events keine Uhrzeit führen.

export interface IcsEventInput {
  /** Stabile Event-ID – Basis der UID und des Dateinamens. */
  id: string;
  title: string;
  /** Beginn und Ende als ISO-Datum (JJJJ-MM-TT), das Ende zählt mit. */
  startDate: string;
  endDate: string;
  /** Anzeigename des Typs, z. B. „Vernissage“. */
  typeLabel: string;
  description?: string;
  /** Ort des Events; fehlt er, steht nur die Stadt in LOCATION (ICS-UN-1). */
  venue?: { name: string; street: string; zip: string; city: string };
  city: string;
  /** Absolute Adresse der Detailseite. */
  eventUrl: string;
  /** Erzeugungszeitpunkt für DTSTAMP; injizierbar für Tests. */
  now?: Date;
}

const PRODID = '-//Zentrum fuer Praktische Fotografie//Termine//DE';
const UID_DOMAIN = 'zentrum-praktische-fotografie';

const pad = (n: number, width = 2) => String(n).padStart(width, '0');

/**
 * Neutralisiert und maskiert Textwerte (ICS-UB-4, ICS-UB-7): jede Art von Zeilenumbruch wird zu `\\n`, übrige Steuerzeichen
 * (außer Tabulator) werden zu Leerzeichen; danach Backslash, Semikolon und Komma nach RFC 5545 (Backslash zuerst).
 */
const escapeText = (value: string) =>
  value
    .replace(/\r\n|[\r\n\u0085\u2028\u2029]/g, '\n')
    // eslint-disable-next-line no-control-regex -- Steuerzeichen werden hier bewusst gesucht (ICS-UB-7)
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, ' ')
    .replace(/\\/g, '\\\\')
    .replace(/;/g, '\\;')
    .replace(/,/g, '\\,')
    .replace(/\n/g, '\\n');

const byteLength = (value: string) => new TextEncoder().encode(value).length;

/** Zeilenfaltung: höchstens 75 Oktett je Zeile, Fortsetzung mit Leerzeichen; Zeichen werden nie in der Mitte getrennt. */
function foldLine(line: string): string {
  if (byteLength(line) <= 75) return line;
  const parts: string[] = [];
  let current = '';
  let bytes = 0;
  for (const char of line) {
    const size = byteLength(char);
    const limit = parts.length === 0 ? 75 : 74; // Fortsetzungszeilen tragen ein führendes Leerzeichen
    if (bytes + size > limit) {
      parts.push(current);
      current = char;
      bytes = size;
    } else {
      current += char;
      bytes += size;
    }
  }
  parts.push(current);
  return parts.map((part, i) => (i === 0 ? part : ` ${part}`)).join('\r\n');
}

/** ISO-Datum als JJJJMMTT; `plusDays` verschiebt kalendarisch (UTC, ohne Sommerzeiteffekte). */
function compactDate(iso: string, plusDays = 0): string {
  const d = new Date(Date.UTC(+iso.slice(0, 4), +iso.slice(5, 7) - 1, +iso.slice(8, 10) + plusDays));
  return `${pad(d.getUTCFullYear(), 4)}${pad(d.getUTCMonth() + 1)}${pad(d.getUTCDate())}`;
}

const utcStamp = (d: Date) =>
  `${pad(d.getUTCFullYear(), 4)}${pad(d.getUTCMonth() + 1)}${pad(d.getUTCDate())}T${pad(d.getUTCHours())}${pad(d.getUTCMinutes())}${pad(d.getUTCSeconds())}Z`;

/** Baut die Kalenderdatei für ein Event (CRLF, gefaltet, maskiert). */
export function buildEventIcs(input: IcsEventInput): string {
  const location = input.venue ? `${input.venue.name}, ${input.venue.street}, ${input.venue.zip} ${input.venue.city}` : input.city;
  const description = [input.typeLabel, input.description].filter((part): part is string => !!part).join('\n');
  const lines = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    `PRODID:${PRODID}`,
    'CALSCALE:GREGORIAN',
    'BEGIN:VEVENT',
    `UID:${input.id}@${UID_DOMAIN}`,
    `DTSTAMP:${utcStamp(input.now ?? new Date())}`,
    `DTSTART;VALUE=DATE:${compactDate(input.startDate)}`,
    `DTEND;VALUE=DATE:${compactDate(input.endDate, 1)}`,
    'TRANSP:TRANSPARENT',
    `SUMMARY:${escapeText(input.title)}`,
    `LOCATION:${escapeText(location)}`,
    `DESCRIPTION:${escapeText(description)}`,
    `URL:${input.eventUrl}`,
    'END:VEVENT',
    'END:VCALENDAR',
  ];
  return lines.map(foldLine).join('\r\n') + '\r\n';
}

/** Dateiname des Downloads. */
export const icsFileName = (id: string) => `${id}.ics`;
