import { HttpErrorResponse, HttpInterceptorFn, HttpResponse, provideHttpClient, withInterceptors } from '@angular/common/http';
import { EnvironmentProviders, Provider } from '@angular/core';
import { of, throwError } from 'rxjs';
import { Clock } from '../core/clock';
import { Dataset } from '../core/models';

/** Festes Bezugsdatum aller Tests (entspricht den Beispielen in den Gherkin-Szenarien). */
export const TEST_TODAY = '2026-10-27';

const venue = (id: string, name: string, city: string, type: 'museum' | 'gallery', library: boolean, collection: boolean) => ({
  id,
  name,
  shortName: name,
  type,
  city,
  address: { street: 'Teststraße 1', zip: '50667', city, lat: 50.94, lng: 6.96 },
  website: `https://example.org/${id}`,
  features: { hasPermanentCollection: collection, hasReferenceLibrary: library, ...(library ? { libraryNotes: 'Präsenzbibliothek.' } : {}) },
  source: { url: `https://example.org/${id}`, checkedAt: '2026-10-27', status: 'recherchiert' as const },
});

const exhibition = (id: string, venueId: string, startDate: string, endDate: string, photographerIds: string[], festivalId: string | null = null, isOfficialFestivalPartner?: boolean) => ({
  id,
  venueId,
  festivalId,
  ...(isOfficialFestivalPartner === undefined ? {} : { isOfficialFestivalPartner }),
  title: `Ausstellung ${id}`,
  startDate,
  endDate,
  type: 'group' as const,
  photographerIds,
  description: `Beschreibung ${id}`,
});

/** Kleiner Datensatz mit allen Statusarten, Festival, Präsenzbibliothek und Zukunftsbeitrag. */
export const TEST_DATASET: Dataset = {
  venues: [
    venue('v-koeln-lib', 'Haus Köln Bibliothek', 'Köln', 'museum', true, true),
    venue('v-koeln-gal', 'Galerie Köln', 'Köln', 'gallery', false, false),
    venue('v-essen', 'Museum Essen', 'Essen', 'museum', false, true),
  ],
  photographers: [
    {
      id: 'martin-parr',
      name: 'Martin Parr',
      bio: 'Britischer Dokumentarfotograf.',
      website: 'https://example.org/parr',
      occupation: 'Fotograf',
      life: { from: 1952, to: null },
      wikipedia: {
        summary: 'Martin Parr ist ein britischer Fotograf und für seine farbigen, ironischen Alltagsbilder bekannt.',
        sources: [
          { lang: 'de', url: 'https://de.wikipedia.org/wiki/Martin_Parr' },
          { lang: 'en', url: 'https://en.wikipedia.org/wiki/Martin_Parr' },
        ],
      },
      portrait: { file: 'martin-parr.jpg', width: 400, height: 300, source: 'https://commons.wikimedia.org/wiki/File:Martin_Parr.jpg', credit: 'Jane Doe', license: 'CC BY-SA 4.0', licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0/' },
    },
    { id: 'elliott-erwitt', name: 'Elliott Erwitt', occupation: 'Fotograf', life: { from: 1928, to: 2023 } },
    { id: 'richard-kalvar', name: 'Richard Kalvar' },
    { id: 'ohne-ausstellung', name: 'Person ohne Ausstellung' },
  ],
  organizers: [
    {
      id: 'photoszene-koeln',
      name: 'Photoszene Köln e.V.',
      shortName: 'Photoszene',
      type: 'association',
      city: 'Köln',
      website: 'https://example.org/photoszene',
      description: 'Verein zur Förderung der Fotografie.',
      social: { instagram: 'photoszene_koeln' },
    },
    { id: 'ohne-programm', name: 'Festival ohne Programm', type: 'festival', city: 'Düsseldorf' },
  ],
  festivals: [
    { id: 'photoszene-festival-2026', organizerId: 'photoszene-koeln', title: 'Photoszene-Festival 2026', startDate: '2026-11-01', endDate: '2026-12-15', city: 'Köln', description: 'Stadtweites Festival.', website: 'https://example.org/festival' },
    { id: 'photoszene-nachlese-2027', organizerId: 'photoszene-koeln', title: 'Photoszene Nachlese 2027', startDate: '2027-02-01', endDate: '2027-02-07', city: 'Köln' },
    { id: 'festival-ohne-programm', organizerId: 'ohne-programm', title: 'Festival ohne Programm 2027', startDate: '2027-03-01', endDate: '2027-03-10', city: 'Düsseldorf' },
  ],
  exhibitions: [
    exhibition('a-kommend', 'v-koeln-lib', '2026-11-20', '2027-02-14', ['martin-parr']),
    exhibition('a-laufend', 'v-essen', '2026-09-01', '2027-01-10', ['martin-parr', 'elliott-erwitt']),
    exhibition('a-endet-bald', 'v-koeln-lib', '2026-08-15', '2026-11-05', ['martin-parr']),
    exhibition('a-beendet', 'v-koeln-gal', '2026-03-01', '2026-06-30', ['richard-kalvar']),
    exhibition('f-1', 'v-koeln-lib', '2026-11-01', '2026-12-15', ['elliott-erwitt'], 'photoszene-festival-2026', true),
    exhibition('f-2', 'v-koeln-gal', '2026-11-01', '2026-12-15', ['richard-kalvar'], 'photoszene-festival-2026'),
  ],
  events: [
    { id: 'e-talk', title: 'Artist Talk', eventType: 'talk', startDate: '2026-11-12', endDate: '2026-11-12', venueId: 'v-koeln-lib', city: 'Köln', isCommercial: false, description: 'Gespräch.', highlights: ['Gespräch'] },
    { id: 'e-messe', title: 'Beispielmesse', eventType: 'fair_and_convention', startDate: '2027-10-08', endDate: '2027-10-10', venueId: 'v-essen', city: 'Essen', isCommercial: true, website: 'https://example.org/messe' },
    { id: 'e-vergangen', title: 'Lesung', eventType: 'reading', startDate: '2026-09-15', endDate: '2026-09-26', venueId: 'v-koeln-gal', city: 'Köln', isCommercial: false },
    { id: 'e-workshop', title: 'Workshop', eventType: 'workshop', startDate: '2026-11-28', endDate: '2026-11-29', venueId: 'v-koeln-lib', city: 'Köln', isCommercial: false },
  ],
  posts: [
    { id: 'p-1', slug: 'willkommen', title: 'Willkommen', date: '2026-10-20', excerpt: 'Kurzvorschau eins.', linkedVenueIds: ['v-koeln-lib'], linkedExhibitionIds: ['a-kommend'], contentFile: 'content/posts/willkommen.md' },
    { id: 'p-2', slug: 'endet-bald', title: 'Endet bald', date: '2026-10-25', excerpt: 'Kurzvorschau zwei.', linkedExhibitionIds: ['a-endet-bald'], contentFile: 'content/posts/endet-bald.md' },
    { id: 'p-alt', slug: 'alt', title: 'Ältester Beitrag', date: '2026-01-01', contentFile: 'content/posts/alt.md' },
    { id: 'p-zukunft', slug: 'zukunft', title: 'Beitrag aus der Zukunft', date: '2027-03-01', contentFile: 'content/posts/zukunft.md' },
  ],
};

export const TEST_MARKDOWN = '---\nid: x\ntitle: X\n---\n\n## Überschrift\n\nText mit **Hervorhebung**.\n';

export interface TestDataOptions {
  dataset?: Partial<Dataset>;
  today?: string;
  /** Inhalt je Beitragsdatei; `null` oder fehlender Eintrag antwortet mit 404. Standard: `TEST_MARKDOWN` für jede Datei. */
  content?: (url: string) => string | null;
  /** Datendateien antworten mit 500 (NAV-UN-1). */
  failData?: boolean;
}

/**
 * Providers für Komponententests: fester Zeitpunkt, HttpClient mit Fixture-Antworten für `data/*.json` und `content/**`.
 * Beispiel: `TestBed.configureTestingModule({ providers: [provideRouter(routes), ...provideTestData({ today: '2026-10-27' })] })`
 */
export function provideTestData(options: TestDataOptions = {}): (Provider | EnvironmentProviders)[] {
  const dataset = { ...TEST_DATASET, ...options.dataset };
  const interceptor: HttpInterceptorFn = (req) => {
    const data = /^\/?data\/(\w+)\.json$/.exec(req.url);
    if (data) {
      if (options.failData) return throwError(() => new HttpErrorResponse({ status: 500, url: req.url }));
      return of(new HttpResponse({ status: 200, body: dataset[data[1] as keyof Dataset] }));
    }
    if (/^\/?content\//.test(req.url)) {
      const body = options.content ? options.content(req.url) : TEST_MARKDOWN;
      if (body === null) return throwError(() => new HttpErrorResponse({ status: 404, url: req.url }));
      return of(new HttpResponse({ status: 200, body }));
    }
    return throwError(() => new HttpErrorResponse({ status: 404, url: req.url }));
  };
  return [provideHttpClient(withInterceptors([interceptor])), { provide: Clock, useValue: { today: () => options.today ?? TEST_TODAY } }];
}
