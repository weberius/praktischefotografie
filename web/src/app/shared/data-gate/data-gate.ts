import { Component, inject } from '@angular/core';
import { DataService } from '../../core/data.service';

/** Zeigt Inhalte erst, wenn die Daten geladen sind; sonst Ladehinweis oder Fehler mit „Erneut laden“ (NAV-UN-1). */
@Component({
  selector: 'app-data-gate',
  template: `
    @if (data.error(); as message) {
      <div class="notice notice-error" role="alert">
        <p>{{ message }}</p>
        <button type="button" (click)="data.load()">Erneut laden</button>
      </div>
    } @else if (data.ready()) {
      <ng-content />
    } @else {
      <p class="muted" role="status">Daten werden geladen …</p>
    }
  `,
})
export class DataGate {
  protected readonly data = inject(DataService);
}
