import { Component, computed, effect, inject, input } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';
import { Clock, formatDate, formatRange } from '../../core/clock';
import { DataService } from '../../core/data.service';
import { exhibitionStatus } from '../../core/exhibition-status';
import { MarkdownService } from '../../core/markdown.service';
import { PageMeta } from '../../core/page-meta';
import { DataGate } from '../../shared/data-gate/data-gate';
import { NotFound } from '../../shared/not-found/not-found';
import { StatusBadge } from '../../shared/status-badge/status-badge';

/** Beitragsseite mit Text, verknüpften Orten und Ausstellungen (BLG-UB-3 bis BLG-UB-5, BLG-UN-1, BLG-UN-2). */
@Component({
  selector: 'app-post-detail-page',
  imports: [RouterLink, DataGate, NotFound, StatusBadge],
  templateUrl: './post-detail.html',
  styleUrl: './post-detail.css',
})
export class PostDetailPage {
  readonly slug = input("");

  private readonly data = inject(DataService);
  private readonly clock = inject(Clock);
  private readonly markdown = inject(MarkdownService);
  private readonly pageMeta = inject(PageMeta);

  protected readonly formatDate = formatDate;
  protected readonly formatRange = formatRange;

  /** Nur veröffentlichte Beiträge (Datum nicht nach heute, BLG-UN-1). */
  protected readonly post = computed(() => {
    const p = this.data.postBySlug().get(this.slug());
    return p && p.date <= this.clock.today() ? p : undefined;
  });

  protected readonly venues = computed(() => (this.post()?.linkedVenueIds ?? []).flatMap((id) => this.data.venueById().get(id) ?? []));

  protected readonly exhibitions = computed(() =>
    (this.post()?.linkedExhibitionIds ?? []).flatMap((id) => {
      const e = this.data.exhibitionById().get(id);
      return e ? [{ ...e, status: exhibitionStatus(e, this.clock.today()) }] : [];
    }),
  );

  /** Beitragstext als HTML-Text; Bereinigung erfolgt beim Binden über `[innerHTML]` (Q-SEC-3). */
  protected readonly text = rxResource({
    params: () => this.post()?.contentFile,
    stream: ({ params }) => this.markdown.load(params),
  });

  protected readonly textError = computed(() => this.text.status() === 'error');

  constructor() {
    effect(() => {
      if (!this.data.ready()) return;
      const post = this.post();
      if (post) this.pageMeta.set(post.title, post.excerpt ?? `Beitrag vom ${formatDate(post.date)}.`);
      else this.pageMeta.set('Nicht gefunden', 'Dieser Beitrag existiert nicht (mehr).');
    });
  }
}
