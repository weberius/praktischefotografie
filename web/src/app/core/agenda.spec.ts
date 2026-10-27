// Gherkin: web/kalender.feature · „Agenda zeigt Einträge chronologisch“, „Beendete sind standardmäßig ausgeblendet“,
// „Monatsansicht“, „Ungültiger Monat“
import { TEST_DATASET, TEST_TODAY } from '../testing/test-data';
import { buildAgenda, filterByMonth, filterFromToday, parseMonth, shiftMonth } from './agenda';

const { exhibitions, events, venues } = TEST_DATASET;
const venueById = new Map(venues.map((v) => [v.id, v]));
const agenda = buildAgenda(exhibitions, events, venueById, TEST_TODAY);
const ids = (list: { id: string }[]) => list.map((i) => i.id);

describe('agenda', () => {
  it('Szenario: Agenda zeigt Einträge chronologisch (CAL-UB-1)', () => {
    const starts = agenda.map((i) => i.startDate);
    expect(starts).toEqual([...starts].sort());
    expect(agenda.length).toBe(exhibitions.length + events.length);
    const item = agenda.find((i) => i.id === 'e-talk')!;
    expect(item).toEqual(jasmine.objectContaining({ kind: 'Event', title: 'Artist Talk', venue: 'Haus Köln Bibliothek', link: '/events/e-talk' }));
    const exhibition = agenda.find((i) => i.id === 'a-laufend')!;
    expect(exhibition).toEqual(jasmine.objectContaining({ kind: 'Ausstellung', link: '/exhibitions/a-laufend', status: 'laufend' }));
  });

  it('Szenario: Agenda ordnet gleichen Beginn nach Ende und Titel (CAL-UB-1)', () => {
    const order = ids(agenda.filter((i) => i.startDate === '2026-11-01'));
    expect(order).toEqual(['f-1', 'f-2']);
  });

  it('Szenario: Beendete sind standardmäßig ausgeblendet (CAL-OP-1)', () => {
    expect(ids(filterFromToday(agenda, TEST_TODAY, false))).not.toContain('a-beendet');
    expect(ids(filterFromToday(agenda, TEST_TODAY, false))).not.toContain('e-vergangen');
    expect(ids(filterFromToday(agenda, TEST_TODAY, true))).toContain('a-beendet');
    expect(ids(filterFromToday(agenda, '2026-06-30', false))).toContain('a-beendet');
  });

  it('Szenario: Monatsansicht (CAL-EV-1)', () => {
    const november = ids(filterByMonth(agenda, 2026, 11));
    expect(november).toContain('a-endet-bald');
    expect(november).toContain('a-laufend');
    expect(november).not.toContain('a-beendet');
    expect(ids(filterByMonth(agenda, 2026, 6))).toContain('a-beendet');
    expect(filterByMonth(agenda, 2030, 1)).toEqual([]);
  });

  it('Szenario: Ungültiger Monat (CAL-UN-1)', () => {
    expect(parseMonth('2026', '11')).toEqual({ year: 2026, month: 11 });
    expect(parseMonth('2026', '1')).toEqual({ year: 2026, month: 1 });
    expect(parseMonth('2026', '13')).toBeNull();
    expect(parseMonth('2026', '0')).toBeNull();
    expect(parseMonth('26', '5')).toBeNull();
    expect(parseMonth('20261', '5')).toBeNull();
    expect(parseMonth('abcd', '5')).toBeNull();
    expect(parseMonth('2026', 'x')).toBeNull();
    expect(parseMonth(undefined, undefined)).toBeNull();
  });

  it('Monatsnavigation springt über Jahresgrenzen', () => {
    expect(shiftMonth(2026, 12, 1)).toEqual({ year: 2027, month: 1 });
    expect(shiftMonth(2026, 1, -1)).toEqual({ year: 2025, month: 12 });
    expect(shiftMonth(2026, 5, 1)).toEqual({ year: 2026, month: 6 });
  });
});
