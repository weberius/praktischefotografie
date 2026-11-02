import { Injectable, computed, signal } from '@angular/core';

/** Favorisierte Events der laufenden Sitzung (FAV-EV-1, FAV-UB-2, FAV-UB-3, ADR-023). Nur im Speicher: kein Web-Speicher, keine Cookies, keine Netzanfragen; nach dem Neuladen leer. */
@Injectable({ providedIn: 'root' })
export class Favorites {
  private readonly ids = signal<ReadonlySet<string>>(new Set());

  readonly count = computed(() => this.ids().size);

  isFavorite(id: string): boolean {
    return this.ids().has(id);
  }

  toggle(id: string): void {
    const next = new Set(this.ids());
    if (!next.delete(id)) next.add(id);
    this.ids.set(next);
  }
}
