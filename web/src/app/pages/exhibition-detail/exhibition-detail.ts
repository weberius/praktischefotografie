import { Component, computed, effect, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Clock, formatDate, formatRange } from '../../core/clock';
import { DataService } from '../../core/data.service';
import { exhibitionStatus } from '../../core/exhibition-status';
import { EXHIBITION_TYPE_LABEL } from '../../core/models';
import { PageMeta } from '../../core/page-meta';
import { postsLinking } from '../../core/posts';
import { DataGate } from '../../shared/data-gate/data-gate';
import { NotFound } from '../../shared/not-found/not-found';
import { StatusBadge } from '../../shared/status-badge/status-badge';

/** Ausstellungsdetail mit Ort, Fotograf:innen, Veranstalter und Beiträgen (EXH-UB-4, EXH-OP-2, EXH-UB-5). */
@Component({
  selector: 'app-exhibition-detail-page',
  imports: [RouterLink, DataGate, NotFound, StatusBadge],
  templateUrl: './exhibition-detail.html',
})
export class ExhibitionDetailPage {
  private readonly data = inject(DataService);
  private readonly today = inject(Clock).today();

  readonly id = input('');

  protected readonly typeLabel = EXHIBITION_TYPE_LABEL;
  protected readonly formatDate = formatDate;
  protected readonly formatRange = formatRange;

  protected readonly exhibition = computed(() => this.data.exhibitionById().get(this.id()));
  protected readonly status = computed(() => {
    const e = this.exhibition();
    return e ? exhibitionStatus(e, this.today) : null;
  });
  protected readonly venue = computed(() => {
    const e = this.exhibition();
    return e ? this.data.venueById().get(e.venueId) : undefined;
  });
  protected readonly festival = computed(() => {
    const festivalId = this.exhibition()?.festivalId;
    return festivalId ? this.data.festivalById().get(festivalId) : undefined;
  });
  protected readonly organizer = computed(() => {
    const f = this.festival();
    return f ? this.data.organizerById().get(f.organizerId) : undefined;
  });
  protected readonly photographers = computed(() =>
    (this.exhibition()?.photographerIds ?? []).flatMap((id) => this.data.photographerById().get(id) ?? []),
  );
  protected readonly posts = computed(() => postsLinking(this.data.posts(), this.today, { exhibitionId: this.id() }));

  constructor() {
    const meta = inject(PageMeta);
    effect(() => {
      if (!this.data.ready()) return;
      const e = this.exhibition();
      if (e) meta.set(e.title, e.description ?? `${EXHIBITION_TYPE_LABEL[e.type]}: ${formatRange(e.startDate, e.endDate)}.`);
      else meta.set('Nicht gefunden', 'Diese Ausstellung existiert nicht.');
    });
  }
}
