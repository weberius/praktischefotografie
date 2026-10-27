import { Component, computed, effect, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Clock, formatDate, formatRange } from '../../core/clock';
import { DataService } from '../../core/data.service';
import { exhibitionStatus } from '../../core/exhibition-status';
import { VENUE_TYPE_INFO } from '../../core/models';
import { PageMeta } from '../../core/page-meta';
import { postsLinking } from '../../core/posts';
import { DataGate } from '../../shared/data-gate/data-gate';
import { NotFound } from '../../shared/not-found/not-found';
import { StatusBadge } from '../../shared/status-badge/status-badge';

/** Ortsdetail mit Stammdaten, Programm und verlinkten Beiträgen (VNU-UB-3, VNU-UB-4, VNU-ST-1). */
@Component({
  selector: 'app-venue-detail-page',
  imports: [RouterLink, DataGate, NotFound, StatusBadge],
  templateUrl: './venue-detail.html',
})
export class VenueDetailPage {
  private readonly data = inject(DataService);
  private readonly today = inject(Clock).today();

  readonly id = input('');

  protected readonly typeInfo = VENUE_TYPE_INFO;
  protected readonly formatDate = formatDate;
  protected readonly formatRange = formatRange;

  protected readonly venue = computed(() => this.data.venueById().get(this.id()));
  protected readonly exhibitions = computed(() =>
    this.data
      .exhibitions()
      .filter((e) => e.venueId === this.id())
      .map((e) => ({ exhibition: e, status: exhibitionStatus(e, this.today) }))
      .filter((e) => e.status !== 'beendet')
      .sort((a, b) => a.exhibition.startDate.localeCompare(b.exhibition.startDate)),
  );
  protected readonly events = computed(() =>
    this.data
      .events()
      .filter((e) => e.venueId === this.id() && e.endDate >= this.today)
      .sort((a, b) => a.startDate.localeCompare(b.startDate)),
  );
  protected readonly posts = computed(() => postsLinking(this.data.posts(), this.today, { venueId: this.id() }));

  constructor() {
    const meta = inject(PageMeta);
    effect(() => {
      if (!this.data.ready()) return;
      const venue = this.venue();
      if (venue) meta.set(venue.name, `${VENUE_TYPE_INFO[venue.type].label} in ${venue.city}: Adresse, Website und aktuelles Programm.`);
      else meta.set('Nicht gefunden', 'Dieser Ort existiert nicht.');
    });
  }
}
