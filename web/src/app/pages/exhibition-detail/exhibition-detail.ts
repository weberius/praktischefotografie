import { Component, computed, effect, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Clock, formatDate, formatRange } from '../../core/clock';
import { DataService } from '../../core/data.service';
import { exhibitionKind } from '../../core/exhibition-kind';
import { STATUS_LABEL, exhibitionStatus } from '../../core/exhibition-status';
import { PageMeta } from '../../core/page-meta';
import { postsLinking } from '../../core/posts';
import { DataGate } from '../../shared/data-gate/data-gate';
import { NotFound } from '../../shared/not-found/not-found';
import { ExhibitionBadges } from '../../shared/exhibition-badges/exhibition-badges';

/** Ausstellungsdetail mit Ort, Fotograf:innen, Veranstalter und Beiträgen (EXH-UB-9, EXH-OP-2, EXH-UB-5). */
@Component({
  selector: 'app-exhibition-detail-page',
  imports: [RouterLink, DataGate, NotFound, ExhibitionBadges],
  templateUrl: './exhibition-detail.html',
})
export class ExhibitionDetailPage {
  private readonly data = inject(DataService);
  private readonly today = inject(Clock).today();

  readonly id = input('');

  protected readonly formatDate = formatDate;
  protected readonly formatRange = formatRange;

  protected readonly exhibition = computed(() => this.data.exhibitionById().get(this.id()));
  protected readonly status = computed(() => {
    const e = this.exhibition();
    return e ? exhibitionStatus(e, this.today) : null;
  });
  protected readonly kind = computed(() => {
    const e = this.exhibition();
    return e ? exhibitionKind(e) : '';
  });
  protected readonly second = computed(() => {
    const status = this.status();
    return status ? { label: STATUS_LABEL[status], status } : null;
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
      if (e) meta.set(e.title, e.description ?? `${exhibitionKind(e)}: ${formatRange(e.startDate, e.endDate)}.`);
      else meta.set('Nicht gefunden', 'Diese Ausstellung existiert nicht.');
    });
  }
}
