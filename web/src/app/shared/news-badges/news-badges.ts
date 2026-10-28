import { Component, computed, inject, input } from '@angular/core';
import { DataService } from '../../core/data.service';
import { exhibitionKind } from '../../core/exhibition-kind';
import { Post } from '../../core/models';
import { OCCASION_BADGE, newsOccasion } from '../../core/news';
import { ExhibitionBadges } from '../exhibition-badges/exhibition-badges';

/** Badges einer Neuigkeit: zuerst die Art der Ausstellung („Gruppenausstellung“), danach der Anlass („Endet bald“) (BLG-UB-9, BDG-UB-2, BLG-UN-3). */
@Component({
  selector: 'app-news-badges',
  imports: [ExhibitionBadges],
  template: `
    @if (badges(); as b) {
      <app-exhibition-badges [kind]="b.kind" [second]="b.second" />
    }
  `,
})
export class NewsBadges {
  readonly post = input.required<Post>();
  private readonly data = inject(DataService);

  protected readonly badges = computed(() => {
    const post = this.post();
    const occasion = newsOccasion(post);
    const exhibition = occasion ? this.data.exhibitionById().get(post.linkedExhibitionIds![0]) : undefined;
    if (!occasion || !exhibition) return null;
    return { kind: exhibitionKind(exhibition), second: { label: OCCASION_BADGE[occasion].label, status: OCCASION_BADGE[occasion].status } };
  });
}
