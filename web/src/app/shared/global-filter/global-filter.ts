import { Component, computed, inject } from '@angular/core';
import { DataService } from '../../core/data.service';
import { GlobalFilter } from '../../core/global-filter';
import { VENUE_TYPE_OPTIONS } from '../../core/models';

/** Bedienung des globalen Filters nach Ortstyp und Ort (FLT-UB-4, FLT-UB-7, Q-USE-18): echte Checkboxen in Gruppen, aktive Auswahl als Text, Zurücksetzen. */
@Component({
  selector: 'app-global-filter',
  template: `
    <section class="global-filter" aria-label="Globaler Filter">
      <details>
        <summary>Filter nach Ortstyp und Ort{{ filter.active() ? ' (aktiv)' : '' }}</summary>
        <div class="groups">
          <fieldset>
            <legend>Ortstyp</legend>
            @for (option of typeOptions(); track option.value) {
              <label><input type="checkbox" [checked]="filter.types().includes(option.value)" (change)="filter.toggleType(option.value)" /> {{ option.label }}</label>
            }
          </fieldset>
          <fieldset>
            <legend>Orte</legend>
            @for (venue of venues(); track venue.id) {
              <label><input type="checkbox" [checked]="filter.venueIds().includes(venue.id)" (change)="filter.toggleVenue(venue.id)" /> {{ venue.name }}</label>
            }
          </fieldset>
        </div>
      </details>
      <p class="status" role="status" aria-live="polite">
        @if (filter.active()) {
          Aktiver Filter: {{ summary() }}
          <button type="button" (click)="filter.reset()">Filter zurücksetzen</button>
        }
      </p>
    </section>
  `,
  styles: `
    .global-filter { margin: 0 0 1.25rem; }
    summary { cursor: pointer; font-size: 0.9rem; min-height: 2rem; padding: 0.25rem 0; }
    .groups { display: flex; flex-wrap: wrap; gap: 1rem 2rem; margin: 0.5rem 0; }
    fieldset { border: 1px solid var(--border); border-radius: var(--radius); margin: 0; padding: 0.5rem 0.75rem; max-height: 14rem; overflow: auto; }
    legend { font-weight: 600; font-size: 0.9rem; }
    label { display: flex; align-items: center; gap: 0.4rem; min-height: 2rem; font-size: 0.9rem; }
    .status { margin: 0.25rem 0 0; font-size: 0.9rem; }
    .status:empty { display: none; }
    button { margin-left: 0.5rem; min-height: 2rem; }
  `,
})
export class GlobalFilterControl {
  private readonly data = inject(DataService);
  protected readonly filter = inject(GlobalFilter);

  /** Nur Typen und Orte, die in den Daten vorkommen (FLT-UB-7). */
  protected readonly typeOptions = computed(() => {
    const present = new Set(this.data.venues().map((v) => v.type));
    return VENUE_TYPE_OPTIONS.filter((o) => present.has(o.value));
  });
  protected readonly venues = computed(() => [...this.data.venues()].sort((a, b) => a.name.localeCompare(b.name, 'de')));

  protected readonly summary = computed(() => {
    const types = VENUE_TYPE_OPTIONS.filter((o) => this.filter.types().includes(o.value)).map((o) => o.label);
    const ids = this.filter.venueIds();
    const names = this.venues().filter((v) => ids.includes(v.id)).map((v) => v.name);
    return [types.length ? `Typ: ${types.join(', ')}` : '', names.length ? `Orte: ${names.join(', ')}` : ''].filter(Boolean).join(' · ');
  });
}
