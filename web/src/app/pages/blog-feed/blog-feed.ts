import { Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Clock, formatDate } from '../../core/clock';
import { DataService } from '../../core/data.service';
import { PageMeta } from '../../core/page-meta';
import { publishedPosts } from '../../core/posts';
import { DataGate } from '../../shared/data-gate/data-gate';
import { NewsBadges } from '../../shared/news-badges/news-badges';

/** Startseite: veröffentlichte Beiträge, neueste zuerst; Karte aus Datum, Badges, Titel und Kurzvorschau (BLG-UB-1, BLG-UB-2, BLG-UB-6, BLG-UB-7, BLG-ST-1, BLG-UN-1). */
@Component({
  selector: 'app-blog-feed-page',
  imports: [RouterLink, DataGate, NewsBadges],
  templateUrl: './blog-feed.html',
  styleUrl: './blog-feed.css',
})
export class BlogFeedPage {
  private readonly data = inject(DataService);
  private readonly clock = inject(Clock);
  protected readonly formatDate = formatDate;
  protected readonly posts = computed(() => publishedPosts(this.data.posts(), this.clock.today()));

  constructor() {
    inject(PageMeta).set('Magazin', 'Neuigkeiten und Beiträge zur Fotokultur in NRW.');
  }
}
