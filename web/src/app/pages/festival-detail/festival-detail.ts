import { Component, computed, effect, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { map } from 'rxjs';
import { Clock, formatRange } from '../../core/clock';
import { DataService } from '../../core/data.service';
import { exhibitionStatus } from '../../core/exhibition-status';
import { PageMeta } from '../../core/page-meta';
import { DataGate } from '../../shared/data-gate/data-gate';
import { NotFound } from '../../shared/not-found/not-found';
import { StatusBadge } from '../../shared/status-badge/status-badge';

/** Festival mit Stammdaten, Veranstalter und allen zugeordneten Ausstellungen (FST-UB-2 bis FST-UB-4, FST-ST-2). */
@Component({
  selector: 'app-festival-detail-page',
  imports: [DataGate, NotFound, RouterLink, StatusBadge],
  templateUrl: './festival-detail.html',
})
export class FestivalDetailPage {
  private readonly route = inject(ActivatedRoute);
  protected readonly id = toSignal(this.route.paramMap.pipe(map((p) => p.get('id') ?? '')), { initialValue: this.route.snapshot.paramMap.get('id') ?? '' });

  private readonly data = inject(DataService);
  private readonly clock = inject(Clock);
  private readonly meta = inject(PageMeta);

  protected readonly festival = computed(() => this.data.festivalById().get(this.id()));
  protected readonly organizer = computed(() => {
    const f = this.festival();
    return f ? this.data.organizerById().get(f.organizerId) : undefined;
  });
  protected readonly range = computed(() => {
    const f = this.festival();
    return f ? formatRange(f.startDate, f.endDate) : '';
  });
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
        partner: e.isOfficialFestivalPartner === true,
      }));
  });

  constructor() {
    this.meta.set('Festival', 'Ein Festival der Fotografie.');
    effect(() => {
      if (!this.data.ready()) return;
      const f = this.festival();
      if (f) this.meta.set(f.title, f.description ?? `${f.title}: ${this.range()} in ${f.city} mit allen zugeordneten Ausstellungen.`);
      else this.meta.set('Nicht gefunden', 'Dieses Festival existiert nicht.');
    });
  }
}
