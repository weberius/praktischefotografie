import { Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { formatRange } from '../../core/clock';
import { DataService } from '../../core/data.service';
import { PageMeta } from '../../core/page-meta';
import { DataGate } from '../../shared/data-gate/data-gate';

/** Übersicht aller Festivals, aufsteigend nach Beginn (FST-UB-1, FST-ST-1). */
@Component({
  selector: 'app-festival-list-page',
  imports: [DataGate, RouterLink],
  templateUrl: './festival-list.html',
})
export class FestivalListPage {
  private readonly data = inject(DataService);

  protected readonly festivals = computed(() =>
    [...this.data.festivals()]
      .sort((a, b) => a.startDate.localeCompare(b.startDate) || a.title.localeCompare(b.title, 'de'))
      .map((f) => ({ ...f, organizerName: this.data.organizerById().get(f.organizerId)?.name ?? 'Unbekannter Veranstalter', range: formatRange(f.startDate, f.endDate) })),
  );

  constructor() {
    inject(PageMeta).set('Festivals', 'Festivals der Fotografie in NRW mit Zeitraum, Veranstalter und beteiligten Ausstellungen.');
  }
}
