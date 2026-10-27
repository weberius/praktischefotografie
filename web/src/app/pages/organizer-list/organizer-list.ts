import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DataService } from '../../core/data.service';
import { ORGANIZER_TYPE_LABEL } from '../../core/models';
import { PageMeta } from '../../core/page-meta';
import { DataGate } from '../../shared/data-gate/data-gate';

/** Übersicht aller Veranstalter:innen (ORG-UB-1). */
@Component({
  selector: 'app-organizer-list-page',
  imports: [DataGate, RouterLink],
  templateUrl: './organizer-list.html',
})
export class OrganizerListPage {
  protected readonly data = inject(DataService);
  protected readonly typeLabel = ORGANIZER_TYPE_LABEL;

  constructor() {
    inject(PageMeta).set('Veranstalter:innen', 'Netzwerke, Vereine, Stiftungen und Festivals rund um die Fotografie in NRW.');
  }
}
