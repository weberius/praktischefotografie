// Gherkin: web/ausstellungen.feature · „Status der Ausstellung“ (EXH-UB-2)
import { exhibitionStatus } from './exhibition-status';

describe('Szenario: Status der Ausstellung (EXH-UB-2)', () => {
  const today = '2026-10-27';
  const cases: [string, string, string][] = [
    ['2026-11-01', '2026-12-01', 'kommend'],
    ['2026-10-01', '2026-12-31', 'laufend'],
    ['2026-10-01', '2026-11-10', 'endet-bald'],
    ['2026-10-01', '2026-11-11', 'laufend'],
    ['2026-10-27', '2026-10-27', 'endet-bald'],
    ['2026-10-27', '2026-12-31', 'laufend'],
    ['2026-09-01', '2026-10-26', 'beendet'],
  ];
  for (const [startDate, endDate, expected] of cases) {
    it(`${startDate} bis ${endDate} ist ${expected}`, () => {
      expect(exhibitionStatus({ startDate, endDate }, today)).toBe(expected as never);
    });
  }
});
