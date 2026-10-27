import { Component, computed, input } from '@angular/core';
import { ExhibitionStatus, STATUS_LABEL } from '../../core/exhibition-status';

/** Zeigt den Status einer Ausstellung als Text (EXH-UB-6, Q-USE-4). */
@Component({
  selector: 'app-status-badge',
  template: `<span class="badge" [class]="'badge status-' + status()">{{ label() }}</span>`,
})
export class StatusBadge {
  readonly status = input.required<ExhibitionStatus>();
  protected readonly label = computed(() => STATUS_LABEL[this.status()]);
}
