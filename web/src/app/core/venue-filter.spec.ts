// Gherkin: web/karte.feature · „Filter wirken kombiniert“, „Filterzustand in der Adresse“, „Filter aus der Adresse“;
// web/veranstalter.feature · „Festivalfilter in der Karte“; web/orte.feature · „Verzeichnis ist filterbar“
import { TEST_DATASET } from '../testing/test-data';
import { cities, filterToParams, filterVenues, paramsToFilter } from './venue-filter';

const { venues, exhibitions } = TEST_DATASET;
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
    expect(filterToParams({ city: 'Köln', library: true, organizer: 'photoszene-koeln' })).toEqual({ city: 'Köln', library: '1', organizer: 'photoszene-koeln' });
    expect(filterToParams({})).toEqual({});
  });

  it('Szenario: Filter aus der Adresse (MAP-EV-1)', () => {
    const params = new URLSearchParams('city=Essen&type=museum&library=1');
    expect(paramsToFilter(params)).toEqual({ city: 'Essen', type: 'museum', library: true, collection: undefined, organizer: undefined });
    expect(paramsToFilter(new URLSearchParams('type=kamerahandel')).type).toBeUndefined();
  });

  it('Szenario: Festivalfilter in der Karte (ORG-UB-4)', () => {
    expect(ids(filterVenues(venues, { organizer: 'photoszene-koeln' }, exhibitions))).toEqual(['v-koeln-lib', 'v-koeln-gal']);
    expect(filterVenues(venues, { organizer: 'ohne-programm' }, exhibitions)).toEqual([]);
  });
});
