import { Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { DataService } from '../../core/data.service';
import { GlobalFilter } from '../../core/global-filter';
import { PageMeta } from '../../core/page-meta';
import { VenueFilter, filterToParams, filterVenues, paramsToFilter } from '../../core/venue-filter';
import { DataGate } from '../../shared/data-gate/data-gate';
import { GlobalFilterControl } from '../../shared/global-filter/global-filter';
import { VenueLegend } from '../../shared/venue-legend/venue-legend';
import { VenueMap } from '../../shared/venue-map/venue-map';

/** Karte der Orte mit globalem Filter (FLT-UB-2) und Link auf die Ortsliste; Veranstalter und Festival liegen in der Adresse (MAP-UB-1, MAP-UB-7, MAP-UB-11, MAP-UB-14, MAP-UB-15, FLT-ST-1, ORG-UB-6, FST-UB-5). */
@Component({
  selector: 'app-map-page',
  imports: [DataGate, GlobalFilterControl, VenueLegend, VenueMap, RouterLink],
  templateUrl: './map.html',
  styleUrl: './map.css',
})
export class MapPage {
  protected readonly data = inject(DataService);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);

  private readonly params = toSignal(this.route.queryParamMap, { initialValue: this.route.snapshot.queryParamMap });
  protected readonly filter = computed(() => paramsToFilter(this.params()));
  protected readonly globalFilter = inject(GlobalFilter);
  protected readonly venues = computed(() =>
    filterVenues(this.data.venues(), this.filter(), this.data.exhibitions(), this.data.festivals()).filter((v) => this.globalFilter.allows(v)),
  );
  /** Query-Parameter für den Link auf die Ortsliste (`/venues`): Veranstalter und Festival wie auf der Karte (MAP-UB-15). */
  protected readonly listParams = computed(() => filterToParams(this.filter()));

  constructor() {
    inject(PageMeta).set('Karte', 'Karte der Foto-Orte in NRW mit Symbolen je Ortstyp, filterbar nach Ortstyp, Ort, Veranstalter:in und Festival; die Orte gibt es auch als Liste.');
  }

  protected update(change: Partial<VenueFilter>): void {
    this.apply({ ...this.filter(), ...change });
  }

  protected readonly hasUrlFilter = computed(() => Object.keys(filterToParams(this.filter())).length > 0);

  protected resetUrlFilter(): void {
    this.apply({});
  }

  protected resetAll(): void {
    this.globalFilter.reset();
    this.apply({});
  }

  private apply(filter: VenueFilter): void {
    void this.router.navigate([], { relativeTo: this.route, queryParams: filterToParams(filter), replaceUrl: true });
  }

  protected value(event: Event): string {
    return (event.target as HTMLSelectElement).value;
  }
}
