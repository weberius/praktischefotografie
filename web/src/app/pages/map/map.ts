import { Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { DataService } from '../../core/data.service';
import { VENUE_TYPE_INFO, VenueType } from '../../core/models';
import { PageMeta } from '../../core/page-meta';
import { VenueFilter, cities, filterToParams, filterVenues, paramsToFilter } from '../../core/venue-filter';
import { DataGate } from '../../shared/data-gate/data-gate';
import { VenueMap } from '../../shared/venue-map/venue-map';

/** Karte und Liste der Orte mit Filtern; der Filterzustand liegt in der Adresse (MAP-UB-1 bis MAP-UB-4, MAP-EV-1, MAP-UN-1, ORG-UB-6, FST-UB-5). */
@Component({
  selector: 'app-map-page',
  imports: [DataGate, VenueMap, RouterLink],
  templateUrl: './map.html',
  styleUrl: './map.css',
})
export class MapPage {
  protected readonly data = inject(DataService);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);

  private readonly params = toSignal(this.route.queryParamMap, { initialValue: this.route.snapshot.queryParamMap });
  protected readonly filter = computed(() => paramsToFilter(this.params()));
  protected readonly venues = computed(() => filterVenues(this.data.venues(), this.filter(), this.data.exhibitions(), this.data.festivals()));
  protected readonly cities = computed(() => cities(this.data.venues()));
  protected readonly types = (Object.keys(VENUE_TYPE_INFO) as VenueType[]).map((value) => ({ value, label: VENUE_TYPE_INFO[value].label }));
  protected readonly typeInfo = VENUE_TYPE_INFO;
  protected readonly hasFilter = computed(() => Object.keys(filterToParams(this.filter())).length > 0);

  constructor() {
    inject(PageMeta).set('Karte', 'Karte und Liste der Foto-Orte in NRW, filterbar nach Stadt, Typ, Präsenzbibliothek, Sammlung, Veranstalter:in und Festival.');
  }

  protected update(change: Partial<VenueFilter>): void {
    this.apply({ ...this.filter(), ...change });
  }

  protected reset(): void {
    this.apply({});
  }

  private apply(filter: VenueFilter): void {
    void this.router.navigate([], { relativeTo: this.route, queryParams: filterToParams(filter), replaceUrl: true });
  }

  protected value(event: Event): string {
    return (event.target as HTMLSelectElement).value;
  }

  protected checked(event: Event): boolean {
    return (event.target as HTMLInputElement).checked;
  }

  protected asType(value: string): VenueType | undefined {
    return (this.types.find((t) => t.value === value)?.value);
  }
}
