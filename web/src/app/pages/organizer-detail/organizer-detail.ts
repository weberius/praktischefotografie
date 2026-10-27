import { Component, computed, effect, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { map } from 'rxjs';
import { Clock, formatRange } from '../../core/clock';
import { DataService } from '../../core/data.service';
import { exhibitionStatus } from '../../core/exhibition-status';
import { ORGANIZER_TYPE_LABEL } from '../../core/models';
import { PageMeta } from '../../core/page-meta';
import { DataGate } from '../../shared/data-gate/data-gate';
import { NotFound } from '../../shared/not-found/not-found';
import { StatusBadge } from '../../shared/status-badge/status-badge';

/** Veranstalter:in mit Stammdaten und allen zugehörigen Ausstellungen (ORG-UB-2, ORG-UB-3, ORG-ST-1, ORG-UB-4). */
@Component({
  selector: 'app-organizer-detail-page',
  imports: [DataGate, NotFound, RouterLink, StatusBadge],
  templateUrl: './organizer-detail.html',
})
export class OrganizerDetailPage {
  private readonly route = inject(ActivatedRoute);
  /** Routenparameter `:id`; unabhängig vom Component Input Binding, damit die Seite auch ohne es funktioniert. */
  protected readonly id = toSignal(this.route.paramMap.pipe(map((p) => p.get('id') ?? '')), { initialValue: this.route.snapshot.paramMap.get('id') ?? '' });

  private readonly data = inject(DataService);
  private readonly clock = inject(Clock);
  private readonly meta = inject(PageMeta);

  protected readonly typeLabel = ORGANIZER_TYPE_LABEL;
  protected readonly organizer = computed(() => this.data.organizerById().get(this.id()));
  protected readonly exhibitions = computed(() => {
    const today = this.clock.today();
    const venues = this.data.venueById();
    return this.data
      .exhibitions()
      .filter((e) => e.festivalId === this.id())
      .sort((a, b) => a.startDate.localeCompare(b.startDate) || a.title.localeCompare(b.title, 'de'))
      .map((e) => ({
        id: e.id,
        title: e.title,
        venueName: venues.get(e.venueId)?.name ?? 'Unbekannter Ort',
        range: formatRange(e.startDate, e.endDate),
        status: exhibitionStatus(e, today),
      }));
  });

  constructor() {
    this.meta.set('Veranstalter:in', 'Ein Veranstalter oder Festival.');
    effect(() => {
      if (!this.data.ready()) return;
      const organizer = this.organizer();
      if (organizer) {
        this.meta.set(organizer.name, `${organizer.name}: ${ORGANIZER_TYPE_LABEL[organizer.type]} in ${organizer.city} mit allen zugehörigen Ausstellungen.`);
      } else {
        this.meta.set('Nicht gefunden', 'Diese Veranstalterseite existiert nicht.');
      }
    });
  }
}
