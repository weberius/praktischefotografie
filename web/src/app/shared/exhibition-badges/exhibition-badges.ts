import { Component, input } from '@angular/core';
import { ExhibitionStatus } from '../../core/exhibition-status';

/** Zweites Badge einer Badge-Zeile: Status oder Anlass; die Farbe folgt dem Statusstil (BDG-UB-2). */
export interface SecondBadge {
  label: string;
  status: ExhibitionStatus;
}

/**
 * Einheitliche Badge-Zeile für Ausstellungen in Kalender, Magazin und Ausstellungsseiten:
 * zuerst die Art, danach Status bzw. Anlass, als Text, mit einem Leerzeichen breitem Abstand zwischen den Badges und 0,75 rem Abstand
 * zur vorhergehenden und nachfolgenden Zeile (BDG-UB-2 bis BDG-UB-5, BDG-UB-7, ADR-014, ADR-015).
 */
@Component({
  selector: 'app-exhibition-badges',
  template: `
    <span class="badge-row">
      <span class="badge kind" [class.kind-event]="dashed()">{{ kind() }}</span>
      @if (second(); as s) {
        <span [class]="'badge status-' + s.status">{{ s.label }}</span>
      }
      @for (label of extra(); track label) {
        <span class="badge partner">{{ label }}</span>
      }
    </span>
  `,
  styles: `
    :host { display: block; margin: 0.75rem 0; }
    :host(:first-child) { margin-top: 0; }
    .badge-row { display: flex; flex-wrap: wrap; gap: 0.25em; }
    .kind { color: var(--fg); }
    .kind-event { border-style: dashed; }
  `,
})
export class ExhibitionBadges {
  readonly kind = input.required<string>();
  readonly second = input<SecondBadge | null>(null);
  /** Weitere Kennzeichnungen nach dem Status, z. B. „Offizieller Partner“ (BDG-UB-7). */
  readonly extra = input<string[]>([]);
  /** Events werden gestrichelt gerahmt (wie bisher im Kalender). */
  readonly dashed = input(false);
}
