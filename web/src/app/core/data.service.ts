import { HttpClient } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';
import { forkJoin } from 'rxjs';
import { Dataset } from './models';

const FILES = ['venues', 'exhibitions', 'events', 'organizers', 'festivals', 'photographers', 'posts'] as const;

/** Lädt die JSON-Daten einmal und stellt sie als Signals bereit (ADR-002). Relationen werden über IDs aufgelöst. */
@Injectable({ providedIn: 'root' })
export class DataService {
  private readonly http = inject(HttpClient);

  private readonly data = signal<Dataset | null>(null);
  readonly error = signal<string | null>(null);
  readonly ready = computed(() => this.data() !== null);

  readonly venues = computed(() => this.data()?.venues ?? []);
  readonly exhibitions = computed(() => this.data()?.exhibitions ?? []);
  readonly events = computed(() => this.data()?.events ?? []);
  readonly organizers = computed(() => this.data()?.organizers ?? []);
  readonly festivals = computed(() => this.data()?.festivals ?? []);
  readonly photographers = computed(() => this.data()?.photographers ?? []);
  readonly posts = computed(() => this.data()?.posts ?? []);

  readonly venueById = computed(() => new Map(this.venues().map((v) => [v.id, v])));
  readonly exhibitionById = computed(() => new Map(this.exhibitions().map((e) => [e.id, e])));
  readonly eventById = computed(() => new Map(this.events().map((e) => [e.id, e])));
  readonly organizerById = computed(() => new Map(this.organizers().map((o) => [o.id, o])));
  readonly festivalById = computed(() => new Map(this.festivals().map((f) => [f.id, f])));
  readonly photographerById = computed(() => new Map(this.photographers().map((p) => [p.id, p])));
  readonly postBySlug = computed(() => new Map(this.posts().map((p) => [p.slug, p])));

  constructor() {
    this.load();
  }

  /** Lädt alle Dateien neu (auch für „Erneut laden“ nach einem Fehler, NAV-UN-1). */
  load(): void {
    this.error.set(null);
    const requests = Object.fromEntries(FILES.map((f) => [f, this.http.get<unknown[]>(`data/${f}.json`)]));
    forkJoin(requests).subscribe({
      next: (result) => this.data.set(result as unknown as Dataset),
      error: () => this.error.set('Die Daten konnten nicht geladen werden.'),
    });
  }
}
