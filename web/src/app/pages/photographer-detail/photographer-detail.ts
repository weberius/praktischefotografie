import { Component, computed, effect, inject, input, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Clock, formatRange } from '../../core/clock';
import { DataService } from '../../core/data.service';
import { exhibitionStatus } from '../../core/exhibition-status';
import { PageMeta } from '../../core/page-meta';
import { languageLabel, lifeLabel, portraitUrl } from '../../core/photographer-profile';
import { DataGate } from '../../shared/data-gate/data-gate';
import { NotFound } from '../../shared/not-found/not-found';
import { StatusBadge } from '../../shared/status-badge/status-badge';

/** Personenseite nach dem Vorbild der Komponist:innen-Seite von klangland: Stammdaten, Portrait mit Bildnachweis, Wikipedia, Ausstellungen (PHO-UB-3, PHO-UB-6 bis PHO-UB-9, PHO-ST-1, PHO-ST-2, PHO-UN-1). */
@Component({
  selector: 'app-photographer-detail-page',
  imports: [RouterLink, DataGate, NotFound, StatusBadge],
  templateUrl: './photographer-detail.html',
  styleUrl: './photographer-detail.css',
})
export class PhotographerDetailPage {
  private readonly data = inject(DataService);
  private readonly today = inject(Clock).today();

  readonly id = input('');

  protected readonly formatRange = formatRange;

  protected readonly languageLabel = languageLabel;
  protected readonly portraitFailed = signal<string | null>(null);

  protected readonly person = computed(() => this.data.photographerById().get(this.id()));
  protected readonly life = computed(() => lifeLabel(this.person()?.life));
  protected readonly portrait = computed(() => {
    const person = this.person();
    return person && this.portraitFailed() !== person.id ? portraitUrl(person) : null;
  });
  protected readonly exhibitions = computed(() =>
    this.data
      .exhibitions()
      .filter((e) => e.photographerIds.includes(this.id()))
      .sort((a, b) => b.startDate.localeCompare(a.startDate))
      .map((e) => ({ exhibition: e, venue: this.data.venueById().get(e.venueId), status: exhibitionStatus(e, this.today) })),
  );

  constructor() {
    const meta = inject(PageMeta);
    effect(() => {
      if (!this.data.ready()) return;
      const person = this.person();
      if (person) meta.set(person.name, person.bio ?? `Ausstellungen von ${person.name} in NRW.`);
      else meta.set('Nicht gefunden', 'Diese Person existiert nicht.');
    });
  }
}
