// iCalendar-Erzeugung (RFC 5545) für genau ein Event – reine, testbare Funktion ohne Angular- und
// Browserabhängigkeit (ICS-*, ADR-018, ADR-027). Ganztägiger Eintrag ohne `startTime`, sonst zeitgebundener Termin.

export interface IcsEventInput {
  /** Stabile Event-ID – Basis der UID und des Dateinamens. */
  id: string;
  title: string;
  /** Beginn und Ende als ISO-Datum (JJJJ-MM-TT), das Ende zählt mit. */
  startDate: string;
  endDate: string;
  /** Uhrzeiten `HH:MM` und IANA-Zeitzone (ADR-027); ohne `timeZone` gilt `Europe/Berlin`. */
  startTime?: string;
  endTime?: string;
  timeZone?: string;
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
const DEFAULT_ZONE = 'Europe/Berlin';
const DEFAULT_DURATION_MINUTES = 120; // nur für den Kalendereintrag, wird nie gespeichert (ICS-UB-9)

// Eingebaute Zeitzonendefinition für Europe/Berlin (ICS-UB-10); andere Zonen werden in UTC umgerechnet.
const BERLIN_VTIMEZONE = [
  'BEGIN:VTIMEZONE',
  'TZID:Europe/Berlin',
  'BEGIN:STANDARD',
  'DTSTART:19701025T030000',
  'TZOFFSETFROM:+0200',
  'TZOFFSETTO:+0100',
  'TZNAME:CET',
  'RRULE:FREQ=YEARLY;BYMONTH=10;BYDAY=-1SU',
  'END:STANDARD',
  'BEGIN:DAYLIGHT',
  'DTSTART:19700329T020000',
  'TZOFFSETFROM:+0100',
  'TZOFFSETTO:+0200',
  'TZNAME:CEST',
  'RRULE:FREQ=YEARLY;BYMONTH=3;BYDAY=-1SU',
  'END:DAYLIGHT',
  'END:VTIMEZONE',
];

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

/** Wandzeit (ISO-Datum, `HH:MM`) als UTC-basierter Zeitwert; `plusMinutes` verschiebt kalendarisch. */
const wallMs = (isoDate: string, time: string, plusMinutes = 0) =>
  Date.UTC(+isoDate.slice(0, 4), +isoDate.slice(5, 7) - 1, +isoDate.slice(8, 10), +time.slice(0, 2), +time.slice(3, 5) + plusMinutes);

/** Wandzeit als `JJJJMMTTTHHMMSS` ohne Zonenangabe. */
const wallStamp = (ms: number) => utcStamp(new Date(ms)).slice(0, -1);

/** Rechnet eine Wandzeit in der Zone in den UTC-Zeitpunkt um (Offset über `Intl`, zweimal nachgeführt wegen der Sommerzeit). */
function zonedToUtc(wall: number, zone: string): Date {
  const format = new Intl.DateTimeFormat('en-US', { timeZone: zone, hourCycle: 'h23', year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric' });
  const offsetAt = (instant: number) => {
    const p = Object.fromEntries(format.formatToParts(new Date(instant)).map((part) => [part.type, +part.value]));
    return Date.UTC(p['year'], p['month'] - 1, p['day'], p['hour'], p['minute']) - instant;
  };
  let instant = wall - offsetAt(wall);
  instant = wall - offsetAt(instant);
  return new Date(instant);
}

/** Beginn und Ende als Zeilen (ICS-UB-8 bis ICS-UB-10); `usesBerlinZone` verlangt die VTIMEZONE-Definition. */
function timing(input: IcsEventInput): { lines: string[]; usesBerlinZone: boolean } {
  const { startTime, endTime } = input;
  const timed = !!startTime && (!!endTime || input.startDate === input.endDate);
  if (!startTime || !timed) {
    return { lines: [`DTSTART;VALUE=DATE:${compactDate(input.startDate)}`, `DTEND;VALUE=DATE:${compactDate(input.endDate, 1)}`], usesBerlinZone: false };
  }
  const start = wallMs(input.startDate, startTime);
  const end = endTime ? wallMs(input.endDate, endTime) : start + DEFAULT_DURATION_MINUTES * 60_000;
  const zone = input.timeZone ?? DEFAULT_ZONE;
  if (zone === DEFAULT_ZONE) {
    return { lines: [`DTSTART;TZID=${zone}:${wallStamp(start)}`, `DTEND;TZID=${zone}:${wallStamp(end)}`], usesBerlinZone: true };
  }
  return { lines: [`DTSTART:${utcStamp(zonedToUtc(start, zone))}`, `DTEND:${utcStamp(zonedToUtc(end, zone))}`], usesBerlinZone: false };
}

/** Baut die Kalenderdatei für ein Event (CRLF, gefaltet, maskiert). */
export function buildEventIcs(input: IcsEventInput): string {
  const location = input.venue ? `${input.venue.name}, ${input.venue.street}, ${input.venue.zip} ${input.venue.city}` : input.city;
  const description = [input.typeLabel, input.description].filter((part): part is string => !!part).join('\n');
  const { lines: timingLines, usesBerlinZone } = timing(input);
  const lines = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    `PRODID:${PRODID}`,
    'CALSCALE:GREGORIAN',
    ...(usesBerlinZone ? BERLIN_VTIMEZONE : []),
    'BEGIN:VEVENT',
    `UID:${input.id}@${UID_DOMAIN}`,
    `DTSTAMP:${utcStamp(input.now ?? new Date())}`,
    ...timingLines,
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
