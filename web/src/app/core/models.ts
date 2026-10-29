export type VenueType = 'museum' | 'gallery' | 'foundation' | 'off_space' | 'library_archive';

export interface Venue {
  id: string;
  name: string;
  shortName: string;
  type: VenueType;
  city: string;
  district?: string;
  address: { street: string; zip: string; city: string; lat: number; lng: number };
  website: string;
  features: { hasPermanentCollection: boolean; hasReferenceLibrary: boolean; libraryNotes?: string };
  source: { url: string; checkedAt: string; status: 'recherchiert' | 'verifiziert' };
}

export type ExhibitionType = 'solo' | 'group' | 'retrospective' | 'permanent';

export interface Exhibition {
  id: string;
  venueId: string;
  festivalId?: string | null;
  title: string;
  startDate: string;
  endDate: string;
  type: ExhibitionType;
  photographerIds: string[];
  description?: string;
  isOfficialFestivalPartner?: boolean;
}

export type EventType = 'fair_and_convention' | 'talk' | 'symposium' | 'workshop' | 'vernissage' | 'reading';

export interface PhotoEvent {
  id: string;
  title: string;
  eventType: EventType;
  categoryTags?: string[];
  startDate: string;
  endDate: string;
  venueId: string;
  city: string;
  website?: string;
  description?: string;
  isCommercial: boolean;
  highlights?: string[];
}

export type OrganizerType = 'association' | 'festival' | 'network' | 'foundation';

export interface Organizer {
  id: string;
  name: string;
  shortName?: string;
  type: OrganizerType;
  city: string;
  website?: string;
  description?: string;
  social?: { instagram?: string };
}

export interface Festival {
  id: string;
  organizerId: string;
  title: string;
  startDate: string;
  endDate: string;
  city: string;
  description?: string;
  website?: string;
}

export interface WikipediaSource {
  lang: string;
  url: string;
}

export interface Portrait {
  file: string;
  width: number;
  height: number;
  source: string;
  credit: string;
  license: string;
  licenseUrl?: string;
}

export interface Photographer {
  id: string;
  name: string;
  bio?: string;
  website?: string;
  occupation?: string;
  life?: { from: number; to: number | null };
  wikipedia?: { summary: string; sources: WikipediaSource[] };
  portrait?: Portrait;
}

export interface Post {
  id: string;
  slug: string;
  title: string;
  date: string;
  excerpt?: string;
  linkedVenueIds?: string[];
  linkedExhibitionIds?: string[];
  contentFile: string;
}

export interface Dataset {
  venues: Venue[];
  exhibitions: Exhibition[];
  events: PhotoEvent[];
  organizers: Organizer[];
  festivals: Festival[];
  photographers: Photographer[];
  posts: Post[];
}

/** Form des Symbols eines Ortstyps auf Karte und Legende (MAP-UB-10, ADR-016). */
export type VenueSymbolShape = 'columns' | 'frame' | 'diamond' | 'door' | 'book';

/**
 * Anzeige je Ortstyp. `icon` (Emoji) steht in Textlisten; `shape` und `color` bestimmen das Symbol auf der Karte und in der Legende (eine Quelle für beide).
 * Die Farben haben ≥ 3:1 Kontrast zum Kartenhintergrund (Q-USE-9); der Typ ist allein an der Form erkennbar.
 */
export const VENUE_TYPE_INFO: Record<VenueType, { label: string; icon: string; shape: VenueSymbolShape; color: string }> = {
  museum: { label: 'Museum', icon: '🏛️', shape: 'columns', color: '#1b5fa8' },
  gallery: { label: 'Galerie', icon: '🖼️', shape: 'frame', color: '#b45309' },
  foundation: { label: 'Stiftung', icon: '🏛️', shape: 'diamond', color: '#7b3fa0' },
  off_space: { label: 'Off-Space', icon: '🚪', shape: 'door', color: '#b3261e' },
  library_archive: { label: 'Bibliothek / Archiv', icon: '📚', shape: 'book', color: '#1d7a3a' },
};

/** Alle Ortstypen in der Reihenfolge von `VENUE_TYPE_INFO` – für Filter und Legende (eine Stelle statt je Verbraucher). */
export const VENUE_TYPES = Object.keys(VENUE_TYPE_INFO) as VenueType[];

/** Ortstypen als Auswahlliste (Wert und Beschriftung) für die Typfilter. */
export const VENUE_TYPE_OPTIONS = VENUE_TYPES.map((value) => ({ value, label: VENUE_TYPE_INFO[value].label }));

export const EXHIBITION_TYPE_LABEL: Record<ExhibitionType, string> = {
  solo: 'Einzelausstellung',
  group: 'Gruppenausstellung',
  retrospective: 'Retrospektive',
  permanent: 'Dauerausstellung',
};

export const EVENT_TYPE_LABEL: Record<EventType, string> = {
  fair_and_convention: 'Messe',
  talk: 'Talk',
  symposium: 'Symposium',
  workshop: 'Workshop',
  vernissage: 'Vernissage',
  reading: 'Lesung',
};

export const ORGANIZER_TYPE_LABEL: Record<OrganizerType, string> = {
  association: 'Verein',
  festival: 'Festival',
  network: 'Netzwerk',
  foundation: 'Stiftung',
};
