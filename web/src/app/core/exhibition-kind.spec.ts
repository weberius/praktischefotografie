// Gherkin: web/badges.feature · „Art der Ausstellung nach Zahl der Personen“ (BDG-UB-1)
import { ExhibitionType } from './models';
import { exhibitionKind } from './exhibition-kind';

const ids = (n: number) => Array.from({ length: n }, (_, i) => `p${i}`);

describe('exhibitionKind', () => {
  const cases: [ExhibitionType, number, string][] = [
    ['group', 2, 'Gruppenausstellung'],
    ['solo', 1, 'Einzelausstellung'],
    ['group', 57, 'Gruppenausstellung'],
    ['retrospective', 1, 'Retrospektive'],
    ['permanent', 3, 'Dauerausstellung'],
    ['solo', 0, 'Einzelausstellung'],
    ['group', 0, 'Gruppenausstellung'],
    ['solo', 3, 'Gruppenausstellung'],
    ['group', 1, 'Einzelausstellung'],
  ];
  for (const [type, people, label] of cases) {
    it(`${type} mit ${people} Personen → ${label}`, () => {
      expect(exhibitionKind({ type, photographerIds: ids(people) })).toBe(label);
    });
  }
});
