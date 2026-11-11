// Gherkin: web/events.feature · „Uhrzeit mit Ende in der Liste“, „Uhrzeit ohne Ende“, „Abweichende Zeitzone“, „Ohne Uhrzeit keine Zeitangabe“,
// „Mehrtägiges Event in der Liste“, „Mehrtägiges Event im Detail“; Q-USE-21
import { eventTimeLines } from './event-time';

const day = { startDate: '2026-11-07', endDate: '2026-11-07' };
const span = { startDate: '2026-11-12', endDate: '2026-11-14' };

describe('eventTimeLines', () => {
  it('eintägig mit Ende', () => {
    expect(eventTimeLines({ ...day, startTime: '16:00', endTime: '18:00' }, false)).toEqual([{ text: '16:00–18:00 Uhr', label: 'von 16:00 bis 18:00 Uhr' }]);
  });
  it('eintägig ohne Ende nennt keine Dauer', () => {
    expect(eventTimeLines({ ...day, startTime: '16:00' }, true)).toEqual([{ text: 'ab 16:00 Uhr', label: 'ab 16:00 Uhr' }]);
  });
  it('abweichende Zeitzone steht in Klammern, Berlin nicht', () => {
    expect(eventTimeLines({ ...day, startTime: '16:00', endTime: '18:00', timeZone: 'Europe/London' }, true)[0].text).toBe('16:00–18:00 Uhr (Europe/London)');
    expect(eventTimeLines({ ...day, startTime: '16:00', timeZone: 'Europe/Berlin' }, true)[0].text).toBe('ab 16:00 Uhr');
  });
  it('ohne startTime keine Zeitangabe', () => {
    expect(eventTimeLines({ ...day, endTime: '18:00' }, true)).toEqual([]);
  });
  it('mehrtägig: Liste ohne Uhrzeit, Detail mit Start und Ende', () => {
    const e = { ...span, startTime: '10:00', endTime: '17:00' };
    expect(eventTimeLines(e, false)).toEqual([]);
    expect(eventTimeLines(e, true).map((l) => l.text)).toEqual(['Start 10:00 Uhr', 'Ende 17:00 Uhr']);
    expect(eventTimeLines({ ...span, startTime: '10:00' }, true).map((l) => l.text)).toEqual(['Start 10:00 Uhr']);
  });
});
