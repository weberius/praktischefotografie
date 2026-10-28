import { Exhibition, Festival, Venue, VenueType } from './models';

export interface VenueFilter {
  city?: string;
  type?: VenueType;
  library?: boolean;
  collection?: boolean;
  organizer?: string;
  festival?: string;
}

const TYPES: VenueType[] = ['museum', 'gallery', 'foundation', 'off_space', 'library_archive'];

/** Wendet alle gesetzten Filter gemeinsam (UND) an (MAP-UB-2, VNU-UB-2, ORG-UB-6, FST-UB-5). `organizer` gilt über die Festivals des Veranstalters. */
export function filterVenues(venues: Venue[], filter: VenueFilter, exhibitions: Exhibition[], festivals: Festival[] = []): Venue[] {
  const organizerFestivals = filter.organizer ? new Set(festivals.filter((f) => f.organizerId === filter.organizer).map((f) => f.id)) : null;
  const venuesOf = (match: (festivalId: string) => boolean) =>
    new Set(exhibitions.filter((e) => e.festivalId && match(e.festivalId)).map((e) => e.venueId));
  const organizerVenues = organizerFestivals ? venuesOf((id) => organizerFestivals.has(id)) : null;
  const festivalVenues = filter.festival ? venuesOf((id) => id === filter.festival) : null;
  return venues.filter(
    (v) =>
      (!filter.city || v.city === filter.city) &&
      (!filter.type || v.type === filter.type) &&
      (!filter.library || v.features.hasReferenceLibrary) &&
      (!filter.collection || v.features.hasPermanentCollection) &&
      (!organizerVenues || organizerVenues.has(v.id)) &&
      (!festivalVenues || festivalVenues.has(v.id)),
  );
}

/** Query-Parameter für den Filterzustand (MAP-UB-4); nicht gesetzte Filter fehlen. */
export function filterToParams(filter: VenueFilter): Record<string, string> {
  const params: Record<string, string> = {};
  if (filter.city) params['city'] = filter.city;
  if (filter.type) params['type'] = filter.type;
  if (filter.library) params['library'] = '1';
  if (filter.collection) params['collection'] = '1';
  if (filter.organizer) params['organizer'] = filter.organizer;
  if (filter.festival) params['festival'] = filter.festival;
  return params;
}

/** Liest den Filterzustand aus Query-Parametern (MAP-EV-1); unbekannte Typen werden ignoriert. */
export function paramsToFilter(params: { get(name: string): string | null }): VenueFilter {
  const type = params.get('type');
  return {
    city: params.get('city') || undefined,
    type: TYPES.includes(type as VenueType) ? (type as VenueType) : undefined,
    library: params.get('library') === '1' || undefined,
    collection: params.get('collection') === '1' || undefined,
    organizer: params.get('organizer') || undefined,
    festival: params.get('festival') || undefined,
  };
}

export function cities(venues: Venue[]): string[] {
  return [...new Set(venues.map((v) => v.city))].sort((a, b) => a.localeCompare(b, 'de'));
}
