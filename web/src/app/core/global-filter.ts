import { Injectable, computed, signal } from '@angular/core';
import { Venue, VenueType } from './models';

/** Globaler Filter nach Orten und Ortstypen für die laufende Sitzung (FLT-UB-1, FLT-UB-3, FLT-UB-6, FLT-UN-1, ADR-025). Nur im Speicher: kein Web-Speicher, keine Cookies, keine Netzanfragen; nach dem Neuladen leer. */
@Injectable({ providedIn: 'root' })
export class GlobalFilter {
  readonly venueIds = signal<readonly string[]>([]);
  readonly types = signal<readonly VenueType[]>([]);
  readonly active = computed(() => this.venueIds().length > 0 || this.types().length > 0);

  /** Orte und Typen wirken gemeinsam (UND), innerhalb einer Dimension gilt ODER; ein unbekannter Ort wird bei gesetztem Filter abgewiesen. */
  allows(venue: Venue | undefined): boolean {
    if (!this.active()) return true;
    if (!venue) return false;
    const ids = this.venueIds();
    const types = this.types();
    return (!ids.length || ids.includes(venue.id)) && (!types.length || types.includes(venue.type));
  }

  toggleVenue(id: string): void {
    this.venueIds.update((list) => toggled(list, id));
  }

  toggleType(type: VenueType): void {
    this.types.update((list) => toggled(list, type));
  }

  reset(): void {
    this.venueIds.set([]);
    this.types.set([]);
  }
}

function toggled<T>(list: readonly T[], value: T): readonly T[] {
  return list.includes(value) ? list.filter((v) => v !== value) : [...list, value];
}
