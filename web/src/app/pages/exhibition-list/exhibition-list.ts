import { Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Clock, formatRange } from '../../core/clock';
import { DataService } from '../../core/data.service';
import { exhibitionKind } from '../../core/exhibition-kind';
import { ExhibitionStatus, STATUS_LABEL, exhibitionStatus } from '../../core/exhibition-status';
import { GlobalFilter } from '../../core/global-filter';
import { PageMeta } from '../../core/page-meta';
import { DataGate } from '../../shared/data-gate/data-gate';
import { GlobalFilterControl } from '../../shared/global-filter/global-filter';
import { ExhibitionBadges } from '../../shared/exhibition-badges/exhibition-badges';

/** Aktuelle Status (ACT-UB-1, ACT-UB-2): „beendet“ wird in der Liste weder gezeigt noch angeboten. */
const STATUSES: ExhibitionStatus[] = ['kommend', 'endet-bald', 'laufend'];

/** Ausstellungsliste (nur aktuelle, ACT-UB-1) mit Statusfilter (Query-Parameter `status`) und globalem Filter (FLT-UB-2), neueste zuerst (EXH-UB-1, EXH-UB-3, EXH-UB-6, EXH-UB-8). */
@Component({
  selector: 'app-exhibition-list-page',
  imports: [RouterLink, DataGate, GlobalFilterControl, ExhibitionBadges],
  templateUrl: './exhibition-list.html',
})
export class ExhibitionListPage {
  private readonly data = inject(DataService);
  private readonly router = inject(Router);
  protected readonly globalFilter = inject(GlobalFilter);
  private readonly today = inject(Clock).today();
  private readonly params = toSignal(inject(ActivatedRoute).queryParamMap, { requireSync: true });

  protected readonly formatRange = formatRange;
  protected readonly statusOptions = STATUSES.map((value) => ({ value, label: STATUS_LABEL[value] }));

  protected readonly statusFilter = computed(() => {
    const status = this.params().get('status');
    return STATUSES.includes(status as ExhibitionStatus) ? (status as ExhibitionStatus) : null;
  });
  protected readonly items = computed(() =>
    this.data
      .exhibitions()
      .map((exhibition) => {
        const status = exhibitionStatus(exhibition, this.today);
        return { exhibition, venue: this.data.venueById().get(exhibition.venueId), status, kind: exhibitionKind(exhibition), second: { label: STATUS_LABEL[status], status } };
      })
      .filter((item) => item.status !== 'beendet' && (!this.statusFilter() || item.status === this.statusFilter()) && this.globalFilter.allows(item.venue))
      .sort((a, b) => b.exhibition.startDate.localeCompare(a.exhibition.startDate)),
  );

  constructor() {
    inject(PageMeta).set('Ausstellungen', 'Fotoausstellungen in NRW mit Ort, Zeitraum und Status: kommend, laufend, endet bald oder beendet.');
  }

  protected setStatus(status: string): void {
    void this.router.navigate([], { queryParams: status ? { status } : {}, replaceUrl: true });
  }
}
