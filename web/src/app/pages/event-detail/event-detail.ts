import { Component, computed, effect, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Clock, formatRange } from '../../core/clock';
import { DataService } from '../../core/data.service';
import { isOver } from '../../core/exhibition-status';
import { EVENT_TYPE_LABEL } from '../../core/models';
import { PageMeta } from '../../core/page-meta';
import { DataGate } from '../../shared/data-gate/data-gate';
import { NotFound } from '../../shared/not-found/not-found';

/** Eventdetail `/events/:id`. */
@Component({
  selector: 'app-event-detail-page',
  imports: [RouterLink, DataGate, NotFound],
  templateUrl: './event-detail.html',
  styleUrl: './event-detail.css',
})
export class EventDetailPage {
  private readonly data = inject(DataService);
  private readonly today = inject(Clock).today();

  readonly id = input<string>();

  protected readonly typeLabel = EVENT_TYPE_LABEL;
  protected readonly formatRange = formatRange;

  protected readonly event = computed(() => {
    const id = this.id();
    return id === undefined ? undefined : this.data.eventById().get(id);
  });
  protected readonly venue = computed(() => {
    const e = this.event();
    return e ? this.data.venueById().get(e.venueId) : undefined;
  });
  protected readonly over = computed(() => {
    const e = this.event();
    return !!e && isOver(e, this.today);
  });

  constructor() {
    const meta = inject(PageMeta);
    effect(() => {
      if (!this.data.ready()) return;
      const e = this.event();
      if (e) meta.set(e.title, e.description ?? `${EVENT_TYPE_LABEL[e.eventType]} in ${e.city}: ${formatRange(e.startDate, e.endDate)}.`);
      else meta.set('Nicht gefunden', 'Dieses Event existiert nicht.');
    });
  }
}
