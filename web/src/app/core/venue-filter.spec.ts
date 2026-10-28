// Gherkin: web/karte.feature · „Filter wirken kombiniert“, „Filterzustand in der Adresse“, „Filter aus der Adresse“;
// web/veranstalter.feature · „Veranstalterfilter in der Karte“; web/festivals.feature · „Festivalfilter in Karte und Orten“; web/orte.feature · „Verzeichnis ist filterbar“
import { TEST_DATASET } from '../testing/test-data';
import { cities, filterToParams, filterVenues, paramsToFilter } from './venue-filter';

const { venues, exhibitions, festivals } = TEST_DATASET;
const ids = (list: { id: string }[]) => list.map((v) => v.id);

describe('venue-filter', () => {
  it('Szenario: Filter wirken kombiniert (MAP-UB-2)', () => {
    expect(ids(filterVenues(venues, { city: 'Köln' }, exhibitions))).toEqual(['v-koeln-lib', 'v-koeln-gal']);
    expect(ids(filterVenues(venues, { city: 'Köln', library: true }, exhibitions))).toEqual(['v-koeln-lib']);
    expect(ids(filterVenues(venues, { collection: true }, exhibitions))).toEqual(['v-koeln-lib', 'v-essen']);
    expect(ids(filterVenues(venues, { type: 'gallery' }, exhibitions))).toEqual(['v-koeln-gal']);
    expect(filterVenues(venues, { city: 'Essen', library: true }, exhibitions)).toEqual([]);
  });

  it('Szenario: Verzeichnis ist filterbar (VNU-UB-2)', () => {
    expect(ids(filterVenues(venues, { city: 'Essen' }, exhibitions))).toEqual(['v-essen']);
    expect(cities(venues)).toEqual(['Essen', 'Köln']);
  });

  it('Szenario: Filterzustand in der Adresse (MAP-UB-4)', () => {
    expect(filterToParams({ city: 'Köln', library: true, organizer: 'photoszene-koeln', festival: 'photoszene-festival-2026' })).toEqual({ city: 'Köln', library: '1', organizer: 'photoszene-koeln', festival: 'photoszene-festival-2026' });
    expect(filterToParams({})).toEqual({});
  });

  it('Szenario: Filter aus der Adresse (MAP-EV-1)', () => {
    const params = new URLSearchParams('city=Essen&type=museum&library=1');
    expect(paramsToFilter(params)).toEqual({ city: 'Essen', type: 'museum', library: true, collection: undefined, organizer: undefined, festival: undefined });
    expect(paramsToFilter(new URLSearchParams('type=kamerahandel')).type).toBeUndefined();
  });

  it('Szenario: Veranstalterfilter in der Karte (ORG-UB-6) – über die Festivals des Veranstalters', () => {
    expect(ids(filterVenues(venues, { organizer: 'photoszene-koeln' }, exhibitions, festivals))).toEqual(['v-koeln-lib', 'v-koeln-gal']);
    expect(filterVenues(venues, { organizer: 'ohne-programm' }, exhibitions, festivals)).toEqual([]);
    // Eine Veranstalter-ID in festivalId ist kein Treffer mehr (ADR-009).
    expect(filterVenues(venues, { organizer: 'photoszene-koeln' }, exhibitions, [])).toEqual([]);
  });

  it('Szenario: Festivalfilter in Karte und Orten (FST-UB-5, FST-ST-3)', () => {
    expect(ids(filterVenues(venues, { festival: 'photoszene-festival-2026' }, exhibitions, festivals))).toEqual(['v-koeln-lib', 'v-koeln-gal']);
    expect(ids(filterVenues(venues, { festival: 'photoszene-festival-2026', city: 'Köln', library: true }, exhibitions, festivals))).toEqual(['v-koeln-lib']);
    expect(filterVenues(venues, { festival: 'festival-ohne-programm' }, exhibitions, festivals)).toEqual([]);
    expect(filterVenues(venues, { festival: 'gibt-es-nicht' }, exhibitions, festivals)).toEqual([]);
  });
});
