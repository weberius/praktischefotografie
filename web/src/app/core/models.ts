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

export interface Photographer {
  id: string;
  name: string;
  bio?: string;
  website?: string;
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

export const VENUE_TYPE_INFO: Record<VenueType, { label: string; icon: string }> = {
  museum: { label: 'Museum', icon: '🏛️' },
  gallery: { label: 'Galerie', icon: '🖼️' },
  foundation: { label: 'Stiftung', icon: '🏛️' },
  off_space: { label: 'Off-Space', icon: '🚪' },
  library_archive: { label: 'Bibliothek / Archiv', icon: '📚' },
};

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
