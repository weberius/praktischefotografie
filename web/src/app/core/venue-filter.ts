import { Exhibition, Festival, Venue } from './models';

export interface VenueFilter {
  organizer?: string;
  festival?: string;
}

/** Wendet Veranstalter- und Festivalfilter aus der Adresse gemeinsam (UND) an (ORG-UB-6, FST-UB-5, MAP-UB-14). `organizer` gilt über die Festivals des Veranstalters. Der globale Filter (`GlobalFilter`) wirkt zusätzlich. */
export function filterVenues(venues: Venue[], filter: VenueFilter, exhibitions: Exhibition[], festivals: Festival[] = []): Venue[] {
  const organizerFestivals = filter.organizer ? new Set(festivals.filter((f) => f.organizerId === filter.organizer).map((f) => f.id)) : null;
  const venuesOf = (match: (festivalId: string) => boolean) =>
    new Set(exhibitions.filter((e) => e.festivalId && match(e.festivalId)).map((e) => e.venueId));
  const organizerVenues = organizerFestivals ? venuesOf((id) => organizerFestivals.has(id)) : null;
  const festivalVenues = filter.festival ? venuesOf((id) => id === filter.festival) : null;
  return venues.filter((v) => (!organizerVenues || organizerVenues.has(v.id)) && (!festivalVenues || festivalVenues.has(v.id)));
}

/** Query-Parameter für Veranstalter und Festival (MAP-UB-14, MAP-UB-15); nicht gesetzte fehlen. */
export function filterToParams(filter: VenueFilter): Record<string, string> {
  const params: Record<string, string> = {};
  if (filter.organizer) params['organizer'] = filter.organizer;
  if (filter.festival) params['festival'] = filter.festival;
  return params;
}

/** Liest Veranstalter und Festival aus Query-Parametern (MAP-UB-14). */
export function paramsToFilter(params: { get(name: string): string | null }): VenueFilter {
  return { organizer: params.get('organizer') || undefined, festival: params.get('festival') || undefined };
}
