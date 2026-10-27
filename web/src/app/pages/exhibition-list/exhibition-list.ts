import { Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Clock, formatRange } from '../../core/clock';
import { DataService } from '../../core/data.service';
import { ExhibitionStatus, STATUS_LABEL, exhibitionStatus } from '../../core/exhibition-status';
import { PageMeta } from '../../core/page-meta';
import { DataGate } from '../../shared/data-gate/data-gate';
import { StatusBadge } from '../../shared/status-badge/status-badge';

const STATUSES: ExhibitionStatus[] = ['kommend', 'endet-bald', 'laufend', 'beendet'];

/** Ausstellungsliste mit Statusfilter (Query-Parameter `status`), neueste zuerst (EXH-UB-1, EXH-UB-3, EXH-UB-6). */
@Component({
  selector: 'app-exhibition-list-page',
  imports: [RouterLink, DataGate, StatusBadge],
  templateUrl: './exhibition-list.html',
})
export class ExhibitionListPage {
  private readonly data = inject(DataService);
  private readonly router = inject(Router);
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
      .map((exhibition) => ({ exhibition, venue: this.data.venueById().get(exhibition.venueId), status: exhibitionStatus(exhibition, this.today) }))
      .filter((item) => !this.statusFilter() || item.status === this.statusFilter())
      .sort((a, b) => b.exhibition.startDate.localeCompare(a.exhibition.startDate)),
  );

  constructor() {
    inject(PageMeta).set('Ausstellungen', 'Fotoausstellungen in NRW mit Ort, Zeitraum und Status: kommend, laufend, endet bald oder beendet.');
  }

  protected setStatus(status: string): void {
    void this.router.navigate([], { queryParams: status ? { status } : {}, replaceUrl: true });
  }
}
