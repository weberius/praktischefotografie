// Gherkin: web/karte.feature · „Veranstalter- und Festivalfilter aus der Adresse“;
// web/veranstalter.feature · „Veranstalterfilter in der Karte“; web/festivals.feature · „Festivalfilter in Karte und Orten“
import { TEST_DATASET } from '../testing/test-data';
import { filterToParams, filterVenues, paramsToFilter } from './venue-filter';

const { venues, exhibitions, festivals } = TEST_DATASET;
const ids = (list: { id: string }[]) => list.map((v) => v.id);

describe('venue-filter', () => {
  it('Szenario: Veranstalter- und Festivalfilter aus der Adresse (MAP-UB-14)', () => {
    const params = new URLSearchParams('organizer=photoszene-koeln&festival=photoszene-festival-2026&city=Essen&type=museum');
    expect(paramsToFilter(params)).toEqual({ organizer: 'photoszene-koeln', festival: 'photoszene-festival-2026' });
    expect(filterToParams({ organizer: 'photoszene-koeln', festival: 'photoszene-festival-2026' })).toEqual({ organizer: 'photoszene-koeln', festival: 'photoszene-festival-2026' });
    expect(filterToParams({})).toEqual({});
  });

  it('Szenario: Veranstalterfilter in der Karte (ORG-UB-6) – über die Festivals des Veranstalters', () => {
    expect(ids(filterVenues(venues, { organizer: 'photoszene-koeln' }, exhibitions, festivals))).toEqual(['v-koeln-lib', 'v-koeln-gal']);
    expect(filterVenues(venues, { organizer: 'ohne-programm' }, exhibitions, festivals)).toEqual([]);
    // Eine Veranstalter-ID in festivalId ist kein Treffer mehr (ADR-009).
    expect(filterVenues(venues, { organizer: 'photoszene-koeln' }, exhibitions, [])).toEqual([]);
  });

  it('Szenario: Festivalfilter in Karte und Orten (FST-UB-5, FST-ST-3)', () => {
    expect(ids(filterVenues(venues, { festival: 'photoszene-festival-2026' }, exhibitions, festivals))).toEqual(['v-koeln-lib', 'v-koeln-gal']);
    expect(filterVenues(venues, { festival: 'festival-ohne-programm' }, exhibitions, festivals)).toEqual([]);
    expect(filterVenues(venues, { festival: 'gibt-es-nicht' }, exhibitions, festivals)).toEqual([]);
  });
});
