// Eröffnungs- und Finissagetermine erkennen (OPN-*, ADR-007). Reine Textfunktionen ohne Netz und Dateizugriff.

const MONTH_NUMBER = {
  januar: 1, january: 1, jan: 1, februar: 2, february: 2, feb: 2, märz: 3, maerz: 3, march: 3, mar: 3, april: 4, apr: 4, mai: 5, may: 5, juni: 6, june: 6, jun: 6,
  juli: 7, july: 7, jul: 7, august: 8, aug: 8, september: 9, sep: 9, sept: 9, oktober: 10, october: 10, oct: 10, november: 11, nov: 11, dezember: 12, december: 12, dec: 12,
};
const MONTHS = Object.keys(MONTH_NUMBER).sort((a, b) => b.length - a.length).join('|');
const num = (value) => (value === undefined ? undefined : Number(value));

/** Datumsformate in der Reihenfolge der Auswertung; `pick` liefert Jahr, Monat und Tag. */
const DATE_FORMATS = [
  { re: /(\d{4})-(\d{2})-(\d{2})/g, pick: (m) => ({ y: num(m[1]), m: num(m[2]), d: num(m[3]) }) }, // 2026-11-07
  { re: /\b(\d{1,2})\.\s?(\d{1,2})\.(?:\s?(\d{4}))?(?!\d)/g, pick: (m) => ({ y: num(m[3]), m: num(m[2]), d: num(m[1]) }) }, // 7.11. / 07.11.2026
  { re: new RegExp(String.raw`\b(\d{1,2})\.?\s?(?:st|nd|rd|th)?\s?(?:of\s+)?(${MONTHS})\b\.?(?:,?\s?(\d{4}))?`, 'gi'), pick: (m) => ({ y: num(m[3]), m: MONTH_NUMBER[m[2].toLowerCase()], d: num(m[1]) }) }, // 7. November 2026
  { re: new RegExp(String.raw`\b(${MONTHS})\.?\s+(\d{1,2})(?!\d)(?:st|nd|rd|th)?(?:,?\s?(\d{4}))?`, 'gi'), pick: (m) => ({ y: num(m[3]), m: MONTH_NUMBER[m[1].toLowerCase()], d: num(m[2]) }) }, // November 7, 2026
];

/** Alle Datumsangaben eines Textes mit Position; `y` fehlt, wenn der Text kein Jahr nennt. Gefundene Stellen werden für die folgenden Formate maskiert. */
export function parseDates(text) {
  let work = String(text ?? '');
  const found = [];
  for (const { re, pick } of DATE_FORMATS) {
    for (const match of work.matchAll(re)) found.push({ index: match.index, ...pick(match) });
    work = work.replace(re, (hit) => ' '.repeat(hit.length));
  }
  return found.filter((d) => d.m >= 1 && d.m <= 12 && d.d >= 1 && d.d <= 31).sort((a, b) => a.index - b.index);
}

const maskDates = (text) => DATE_FORMATS.reduce((work, { re }) => work.replace(re, (hit) => ' '.repeat(hit.length)), String(text ?? ''));

/** Stichwörter je Terminart. */
export const KEYWORDS = {
  vernissage: /vernissage|opening|eröffnung|eroeffnung/i,
  finissage: /finissage|closing|abschlussveranstaltung|abschlussabend/i,
};

export const EVENT_PREFIX = { vernissage: 'Eröffnung: ', finissage: 'Finissage: ' };
export const ID_SUFFIX = { vernissage: 'eroeffnung', finissage: 'finissage' };

const WINDOW = 80;

/** Daten, die höchstens 80 Zeichen nach einem Stichwort der Art stehen. */
export function datesNear(text, kind) {
  const source = String(text ?? '');
  const dates = parseDates(source);
  const near = [];
  for (const match of source.matchAll(new RegExp(KEYWORDS[kind].source, 'gi'))) {
    const end = match.index + match[0].length + WINDOW;
    for (const d of dates) if (d.index >= match.index && d.index < end && !near.includes(d)) near.push(d);
  }
  return near;
}

/** Zeigt der Text einen Termin der Art: Stichwort mit einem Datum in den folgenden 80 Zeichen? */
export const hasHint = (text, kind) => datesNear(text, kind).length > 0;

/** Belegt der Text (Stichwort der Art, danach Datum) genau diesen Tag? Ohne Jahr im Text zählen Tag und Monat. */
export const hasDate = (text, kind, iso) => {
  const [y, m, d] = String(iso).split('-').map(Number);
  return datesNear(text, kind).some((x) => x.m === m && x.d === d && (x.y === undefined || x.y === y));
};

const clock = (hour, minute, suffix) => {
  let h = Number(hour);
  const s = suffix?.toLowerCase();
  if (s === 'pm' && h < 12) h += 12;
  if (s === 'am' && h === 12) h = 0;
  return `${String(h).padStart(2, '0')}:${minute ?? '00'}`;
};

const RANGE = /\b(\d{1,2})(?:[:.](\d{2}))?\s?(?:[-–]|bis|to)\s?(\d{1,2})(?:[:.](\d{2}))?\s?(am|pm|uhr)\b/gi; // 4-6pm, 16-18 Uhr
const SINGLE = /\b(\d{1,2})(?:[:.](\d{2}))?\s?(am|pm|uhr)?(?![\d:.]*\d)\b/gi;

/** Uhrzeiten eines Textes als „HH:MM“; Datumsangaben zählen nicht. Eine Zahl ist nur mit Minuten oder am/pm/Uhr eine Uhrzeit. */
export function timesOf(text) {
  let work = maskDates(text);
  const times = [];
  work = work.replace(RANGE, (hit, h1, m1, h2, m2, suffix) => {
    times.push(clock(h1, m1, suffix), clock(h2, m2, suffix));
    return ' '.repeat(hit.length);
  });
  for (const match of work.matchAll(SINGLE)) {
    const [, hour, minute, suffix] = match;
    if ((minute || suffix) && Number(hour) < 24 && Number(minute ?? 0) < 60) times.push(clock(hour, minute, suffix));
  }
  return [...new Set(times)];
}

export const hasTime = (text) => timesOf(text).length > 0;

/** Terminart eines Event-Vorschlags oder `null`. */
export const terminKind = (record) => (record?.eventType === 'vernissage' || record?.eventType === 'finissage' ? record.eventType : null);
