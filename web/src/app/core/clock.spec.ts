import { daysBetween, formatDate, formatRange } from './clock';

describe('Datumshilfen', () => {
  it('zählt Tage über Monatsgrenzen', () => {
    expect(daysBetween('2026-10-27', '2026-11-10')).toBe(14);
    expect(daysBetween('2026-10-27', '2026-10-26')).toBe(-1);
  });
  it('formatiert deutsche Daten und Zeiträume', () => {
    expect(formatDate('2026-08-09')).toBe('9. August 2026');
    expect(formatRange('2026-08-09', '2026-08-09')).toBe('9. August 2026');
    expect(formatRange('2026-08-09', '2026-11-01')).toBe('9. August 2026 – 1. November 2026');
  });
});
