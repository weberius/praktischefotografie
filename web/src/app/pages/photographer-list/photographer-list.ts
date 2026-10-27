import { Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DataService } from '../../core/data.service';
import { PageMeta } from '../../core/page-meta';
import { DataGate } from '../../shared/data-gate/data-gate';

/** Fotograf:innen-Übersicht, alphabetisch nach Name (PHO-UB-1). */
@Component({
  selector: 'app-photographer-list-page',
  imports: [RouterLink, DataGate],
  templateUrl: './photographer-list.html',
})
export class PhotographerListPage {
  private readonly data = inject(DataService);

  protected readonly photographers = computed(() => [...this.data.photographers()].sort((a, b) => a.name.localeCompare(b.name, 'de')));

  constructor() {
    inject(PageMeta).set('Fotograf:innen', 'Alle Fotograf:innen, deren Werke in Ausstellungen in NRW gezeigt werden.');
  }
}
