import { Component, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DataService } from '../../core/data.service';
import { PageMeta } from '../../core/page-meta';
import { lifeLabel, portraitUrl } from '../../core/photographer-profile';
import { DataGate } from '../../shared/data-gate/data-gate';

/** Fotograf:innen-Übersicht als Karten, alphabetisch nach Name; Aufbau wie die Komponist:innen in klangland (PHO-UB-1, PHO-UB-5). */
@Component({
  selector: 'app-photographer-list-page',
  imports: [RouterLink, DataGate],
  templateUrl: './photographer-list.html',
  styleUrl: './photographer-list.css',
})
export class PhotographerListPage {
  private readonly data = inject(DataService);
  private readonly failed = signal<ReadonlySet<string>>(new Set());

  protected readonly photographers = computed(() =>
    [...this.data.photographers()]
      .sort((a, b) => a.name.localeCompare(b.name, 'de'))
      .map((person) => ({ person, life: lifeLabel(person.life), portrait: this.failed().has(person.id) ? null : portraitUrl(person) })),
  );

  constructor() {
    inject(PageMeta).set('Fotograf:innen', 'Alle Fotograf:innen, deren Werke in Ausstellungen in NRW gezeigt werden.');
  }

  protected portraitFailed(id: string): void {
    this.failed.update((set) => new Set(set).add(id));
  }
}
