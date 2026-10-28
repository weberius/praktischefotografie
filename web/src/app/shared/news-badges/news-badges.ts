import { Component, computed, inject, input } from '@angular/core';
import { DataService } from '../../core/data.service';
import { EXHIBITION_TYPE_LABEL, Post } from '../../core/models';
import { OCCASION_BADGE, newsOccasion } from '../../core/news';

/** Badges einer Neuigkeit: Anlass („Endet bald“) und Art der Ausstellung („Gruppenausstellung“) als Text (BLG-UB-6, BLG-UB-8, BLG-UN-3). */
@Component({
  selector: 'app-news-badges',
  template: `
    @if (badges(); as b) {
      <p class="badges">
        <span [class]="'badge status-' + b.status">{{ b.occasion }}</span>
        <span class="badge">{{ b.type }}</span>
      </p>
    }
  `,
  styles: '.badges { margin: 0.25rem 0; display: flex; flex-wrap: wrap; gap: 0.35rem; }',
})
export class NewsBadges {
  readonly post = input.required<Post>();
  private readonly data = inject(DataService);

  protected readonly badges = computed(() => {
    const post = this.post();
    const occasion = newsOccasion(post);
    const exhibition = occasion ? this.data.exhibitionById().get(post.linkedExhibitionIds![0]) : undefined;
    if (!occasion || !exhibition) return null;
    return { occasion: OCCASION_BADGE[occasion].label, status: OCCASION_BADGE[occasion].status, type: EXHIBITION_TYPE_LABEL[exhibition.type] };
  });
}
