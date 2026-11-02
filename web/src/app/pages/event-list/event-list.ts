import { Component, computed, inject, input } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Clock, formatRange } from '../../core/clock';
import { DataService } from '../../core/data.service';
import { isOver } from '../../core/exhibition-status';
import { Favorites } from '../../core/favorites';
import { EVENT_TYPE_LABEL, EventType } from '../../core/models';
import { PageMeta } from '../../core/page-meta';
import { DataGate } from '../../shared/data-gate/data-gate';
import { FavoriteToggle } from '../../shared/favorite-toggle/favorite-toggle';

/** Eventliste `/events`: nach Beginn aufsteigend, filterbar nach Typ (Query-Parameter `type`) und nach Favoriten (Query-Parameter `favorites=1`, FAV-UB-4, FAV-UB-6). */
@Component({
  selector: 'app-event-list-page',
  imports: [RouterLink, DataGate, FavoriteToggle],
  templateUrl: './event-list.html',
})
export class EventListPage {
  private readonly data = inject(DataService);
  private readonly router = inject(Router);
  private readonly store = inject(Favorites);

  readonly type = input<string>();
  readonly favorites = input<string>();

  protected readonly today = inject(Clock).today();
  protected readonly typeLabel = EVENT_TYPE_LABEL;
  protected readonly typeOptions = (Object.keys(EVENT_TYPE_LABEL) as EventType[]).map((value) => ({ value, label: EVENT_TYPE_LABEL[value] }));
  protected readonly formatRange = formatRange;
  protected readonly isOver = (endDate: string) => isOver({ endDate }, this.today);

  protected readonly onlyFavorites = computed(() => this.favorites() === '1');

  /** Unbekannte Typwerte aus der Adresse gelten als „kein Filter“. */
  protected readonly selectedType = computed(() => {
    const t = this.type();
    return t && t in EVENT_TYPE_LABEL ? (t as EventType) : '';
  });

  protected readonly items = computed(() => {
    const type = this.selectedType();
    const venues = this.data.venueById();
    const onlyFavorites = this.onlyFavorites();
    return this.data
      .events()
      .filter((e) => (!type || e.eventType === type) && (!onlyFavorites || this.store.isFavorite(e.id)))
      .sort((a, b) => a.startDate.localeCompare(b.startDate) || a.endDate.localeCompare(b.endDate) || a.title.localeCompare(b.title, 'de'))
      .map((e) => ({ event: e, venue: venues.get(e.venueId)?.name ?? e.city }));
  });

  constructor() {
    inject(PageMeta).set('Events', 'Messen, Talks, Workshops, Symposien, Vernissagen, Finissagen und Lesungen rund um die Fotografie.');
  }

  protected selectOnlyFavorites(checked: boolean): void {
    void this.router.navigate([], { queryParams: { favorites: checked ? '1' : null }, queryParamsHandling: 'merge' });
  }

  protected selectType(value: string): void {
    void this.router.navigate([], { queryParams: { type: value || null }, queryParamsHandling: 'merge' });
  }
}
