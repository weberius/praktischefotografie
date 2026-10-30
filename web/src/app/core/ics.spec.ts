// Gherkin: web/kalender-export.feature · „Inhalt der Kalenderdatei“, „Mehrtägiges Event“, „Stabile Kennung“, „Maskierung und Faltung“, „Ort unbekannt“,
// „Frei und ohne Einladung“, „Steuerzeichen im Text“; Q-IOP-1, Q-SEC-6
import { buildEventIcs, icsFileName, IcsEventInput } from './ics';

const NOW = new Date(Date.UTC(2026, 9, 30, 12, 0, 0));
const URL = 'https://example.org/events/between-2026-eroeffnung';
const base: IcsEventInput = {
  id: 'between-2026-eroeffnung',
  title: 'Eröffnung: Between',
  startDate: '2026-11-07',
  endDate: '2026-11-07',
  typeLabel: 'Vernissage',
  description: 'Eröffnung am 7. November 2026 von 16:00 bis 18:00 Uhr.',
  venue: { name: 'Zander Galerie', street: 'Schönhauser Straße 8', zip: '50968', city: 'Köln' },
  city: 'Köln',
  eventUrl: URL,
  now: NOW,
};

const octets = (line: string) => new TextEncoder().encode(line).length;
const unfold = (ics: string) => ics.replace(/\r\n /g, '');

/** Strukturprüfung nach RFC 5545 (Q-IOP-1). */
function expectValid(ics: string): void {
  expect(ics.endsWith('\r\n')).toBeTrue();
  expect(ics.replace(/\r\n/g, '')).not.toMatch(/[\r\n]/);
  const lines = ics.split('\r\n').slice(0, -1);
  for (const line of lines) expect(octets(line)).toBeLessThanOrEqual(75);
  const logical = unfold(ics).split('\r\n').slice(0, -1);
  expect(logical[0]).toBe('BEGIN:VCALENDAR');
  expect(logical[logical.length - 1]).toBe('END:VCALENDAR');
  const count = (text: string) => logical.filter((l) => l === text).length;
  expect(count('BEGIN:VEVENT')).toBe(1);
  expect(count('END:VEVENT')).toBe(1);
  for (const field of ['VERSION:2.0', 'PRODID:', 'UID:', 'DTSTAMP:', 'DTSTART;VALUE=DATE:', 'DTEND;VALUE=DATE:', 'SUMMARY:']) {
    expect(logical.some((l) => l.startsWith(field))).withContext(field).toBeTrue();
  }
  // Kein Zeichen ist durch die Faltung getrennt (auch Zeichen außerhalb der BMP) und nach CRLF gibt es keine Steuerzeichen
  for (const line of lines) {
    expect(line).withContext(`Zeile endet mit halbem Zeichen: ${line}`).not.toMatch(/[\uD800-\uDBFF]$/);
    expect(line.replace(/^ /, '')).withContext(`Zeile beginnt mit halbem Zeichen: ${line}`).not.toMatch(/^[\uDC00-\uDFFF]/);
    // eslint-disable-next-line no-control-regex
    expect(line).withContext(`Steuerzeichen in Zeile: ${line}`).not.toMatch(/[\u0000-\u0008\u000A-\u001F\u007F\u0085\u2028\u2029]/);
  }
  expect(logical.some((l) => l.startsWith('METHOD'))).toBeFalse();
  expect(logical.some((l) => l.startsWith('ORGANIZER'))).toBeFalse();
}

describe('buildEventIcs', () => {
  it('Szenario: Inhalt der Kalenderdatei (ICS-UB-2)', () => {
    const ics = unfold(buildEventIcs(base));
    expect(ics).toContain('SUMMARY:Eröffnung: Between\r\n');
    expect(ics).toContain('DTSTART;VALUE=DATE:20261107\r\n');
    expect(ics).toContain('DTEND;VALUE=DATE:20261108\r\n');
    expect(ics).toContain('LOCATION:Zander Galerie\\, Schönhauser Straße 8\\, 50968 Köln\r\n');
    expect(ics).toContain('DESCRIPTION:Vernissage\\nEröffnung am 7. November 2026 von 16:00 bis 18:00 Uhr.\r\n');
    expect(ics).toContain(`URL:${URL}\r\n`);
    expect(ics).toContain('DTSTAMP:20261030T120000Z\r\n');
    expect(ics).toContain('TRANSP:TRANSPARENT\r\n');
    expectValid(buildEventIcs(base));
  });

  it('Szenario: Mehrtägiges Event (ICS-UB-2)', () => {
    const ics = buildEventIcs({ ...base, startDate: '2026-11-12', endDate: '2026-11-14' });
    expect(ics).toContain('DTSTART;VALUE=DATE:20261112\r\n');
    expect(ics).toContain('DTEND;VALUE=DATE:20261115\r\n');
    expectValid(ics);
  });

  it('Ende am Monats- und Jahreswechsel zählt den Folgetag', () => {
    expect(buildEventIcs({ ...base, startDate: '2026-12-31', endDate: '2026-12-31' })).toContain('DTEND;VALUE=DATE:20270101\r\n');
    expect(buildEventIcs({ ...base, startDate: '2028-02-28', endDate: '2028-02-28' })).toContain('DTEND;VALUE=DATE:20280229\r\n');
  });

  it('Szenario: Stabile Kennung (ICS-UB-3)', () => {
    const first = buildEventIcs({ ...base, now: new Date(Date.UTC(2026, 9, 30)) });
    const second = buildEventIcs({ ...base, now: new Date(Date.UTC(2026, 10, 15)) });
    for (const ics of [first, second]) expect(ics).toContain('UID:between-2026-eroeffnung@zentrum-praktische-fotografie\r\n');
    expect(icsFileName('between-2026-eroeffnung')).toBe('between-2026-eroeffnung.ics');
  });

  it('Szenario: Maskierung und Faltung (ICS-UB-4)', () => {
    const long = 'Ärger über Übergänge und Öffnungen – schöne Fotografien aus Köln, Düsseldorf; Essen. '.repeat(4);
    const ics = buildEventIcs({ ...base, title: 'A; B, C\\D', description: long });
    const flat = unfold(ics);
    expect(flat).toContain('SUMMARY:A\\; B\\, C\\\\D\r\n');
    expect(flat).toContain(`DESCRIPTION:Vernissage\\n${long.replace(/,/g, '\\,').replace(/;/g, '\\;')}\r\n`);
    expect(ics.split('\r\n').some((line) => line.startsWith(' '))).toBeTrue();
    expectValid(ics);
  });

  it('Zeilenumbrüche im Text werden maskiert', () => {
    const ics = buildEventIcs({ ...base, description: 'Zeile 1\nZeile 2' });
    expect(unfold(ics)).toContain('Vernissage\\nZeile 1\\nZeile 2\r\n');
    expectValid(ics);
  });

  it('Szenario: Ort unbekannt (ICS-UN-1)', () => {
    const ics = buildEventIcs({ ...base, venue: undefined });
    expect(ics).toContain('LOCATION:Köln\r\n');
    expectValid(ics);
  });

  it('Ohne Beschreibung steht nur der Typ in der Beschreibung', () => {
    const ics = buildEventIcs({ ...base, description: undefined });
    expect(ics).toContain('DESCRIPTION:Vernissage\r\n');
    expectValid(ics);
  });

  it('Szenario: Frei und ohne Einladung (ICS-UB-6)', () => {
    const ics = buildEventIcs(base);
    expect(ics).toContain('TRANSP:TRANSPARENT\r\n');
    expect(ics).not.toContain('METHOD');
    expect(ics).not.toContain('ORGANIZER');
    expect(ics).not.toContain('SEQUENCE');
  });

  it('Szenario: Steuerzeichen im Text (ICS-UB-7)', () => {
    const hostile = 'a\rEND:VEVENT\rBEGIN:VALARM\u2028ACTION:DISPLAY\u0085URL:https://evil.example\u000B\u000C\u0000b\tc';
    const ics = buildEventIcs({ ...base, title: hostile, description: hostile, venue: { ...base.venue!, name: hostile } });
    expectValid(ics);
    const flat = unfold(ics).split('\r\n');
    expect(flat.filter((l) => l === 'BEGIN:VEVENT').length).toBe(1);
    expect(flat.filter((l) => l === 'END:VEVENT').length).toBe(1);
    expect(flat.filter((l) => l.startsWith('BEGIN:VALARM') || l.startsWith('ACTION') || l.startsWith('URL:https://evil'))).toEqual([]);
    expect(flat.find((l) => l.startsWith('SUMMARY:'))).toBe('SUMMARY:a\\nEND:VEVENT\\nBEGIN:VALARM\\nACTION:DISPLAY\\nURL:https://evil.example   b\tc');
  });

  it('Faltung an der Grenze von 75 Oktett (ICS-UB-4)', () => {
    const exact = buildEventIcs({ ...base, title: 'x'.repeat(67) }); // SUMMARY: + 67 = 75 Oktett
    expect(exact).toContain(`SUMMARY:${'x'.repeat(67)}\r\n`);
    const over = buildEventIcs({ ...base, title: 'x'.repeat(68) });
    expect(over).toContain(`SUMMARY:${'x'.repeat(67)}\r\n x\r\n`);
    const multibyte = buildEventIcs({ ...base, title: `${'x'.repeat(66)}ä` }); // 8 + 66 + 2 = 76 Oktett: ä beginnt die Fortsetzung
    expect(multibyte).toContain(`SUMMARY:${'x'.repeat(66)}\r\n ä\r\n`);
    for (const ics of [exact, over, multibyte]) expectValid(ics);
  });

  it('Zeichen außerhalb der BMP werden nicht getrennt (ICS-UB-4)', () => {
    for (let pad = 0; pad < 4; pad++) {
      const title = `${'x'.repeat(62 + pad)}${'📷'.repeat(10)}`;
      const ics = buildEventIcs({ ...base, title });
      expectValid(ics);
      expect(unfold(ics)).toContain(`SUMMARY:${title}\r\n`);
    }
  });

  it('Sehr langer Titel wird gefaltet und bleibt unverändert lesbar (ICS-UB-4)', () => {
    const title = 'Lange Überschrift ohne Ende '.repeat(40);
    const ics = buildEventIcs({ ...base, title });
    expectValid(ics);
    expect(unfold(ics)).toContain(`SUMMARY:${title}\r\n`);
  });

  it('Eingabe mit maskierten Zeichen wird doppelt maskiert (ICS-UB-4)', () => {
    expect(unfold(buildEventIcs({ ...base, title: 'a\\;b' }))).toContain('SUMMARY:a\\\\\\;b\r\n');
  });
});
