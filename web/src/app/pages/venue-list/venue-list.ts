import { Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { DataService } from '../../core/data.service';
import { GlobalFilter } from '../../core/global-filter';
import { VENUE_TYPE_INFO } from '../../core/models';
import { PageMeta } from '../../core/page-meta';
import { VenueFilter, filterToParams, filterVenues, paramsToFilter } from '../../core/venue-filter';
import { DataGate } from '../../shared/data-gate/data-gate';
import { GlobalFilterControl } from '../../shared/global-filter/global-filter';

/** Ortsverzeichnis; es gilt der globale Filter (FLT-UB-2), Veranstalter und Festival liegen in den Query-Parametern (VNU-UB-1, ORG-UB-6, FST-UB-5, FST-ST-3). */
@Component({
  selector: 'app-venue-list-page',
  imports: [RouterLink, DataGate, GlobalFilterControl],
  templateUrl: './venue-list.html',
  styleUrl: './venue-list.css',
})
export class VenueListPage {
  private readonly data = inject(DataService);
  private readonly router = inject(Router);
  private readonly params = toSignal(inject(ActivatedRoute).queryParamMap, { requireSync: true });

  protected readonly typeInfo = VENUE_TYPE_INFO;
  protected readonly globalFilter = inject(GlobalFilter);

  protected readonly filter = computed(() => paramsToFilter(this.params()));
  protected readonly venues = computed(() =>
    filterVenues(this.data.venues(), this.filter(), this.data.exhibitions(), this.data.festivals())
      .filter((v) => this.globalFilter.allows(v))
      .sort((a, b) => a.name.localeCompare(b.name, 'de')),
  );
  protected readonly organizerName = computed(() => {
    const id = this.filter().organizer;
    return id ? (this.data.organizerById().get(id)?.name ?? id) : null;
  });
  protected readonly festivalHint = computed(() => {
    const id = this.filter().festival;
    if (!id) return null;
    const festival = this.data.festivalById().get(id);
    return festival ? `Gefiltert nach Festival: ${festival.title}` : `Unbekanntes Festival im Filter: ${id}`;
  });

  constructor() {
    inject(PageMeta).set('Orte', 'Verzeichnis der Museen, Galerien und weiteren Foto-Orte in NRW mit Adresse, Typ und Besonderheiten.');
  }

  protected clearOrganizer(): void {
    this.apply({ ...this.filter(), organizer: undefined });
  }

  protected clearFestival(): void {
    this.apply({ ...this.filter(), festival: undefined });
  }

  private apply(filter: VenueFilter): void {
    void this.router.navigate([], { queryParams: filterToParams(filter), replaceUrl: true });
  }
}
