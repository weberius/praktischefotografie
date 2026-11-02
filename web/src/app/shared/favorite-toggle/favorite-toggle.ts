import { Component, computed, inject, input } from '@angular/core';
import { Favorites } from '../../core/favorites';

/** Umschalter „Favorit“ für ein Event (FAV-UB-5, FAV-EV-1, Q-USE-17): Zustand in Text und Symbol, `aria-pressed`, Event im Namen. */
@Component({
  selector: 'app-favorite-toggle',
  template: `@let on = pressed();
    <button type="button" [attr.aria-pressed]="on" (click)="favorites.toggle(eventId())">
      <span aria-hidden="true">{{ on ? '★' : '☆' }}</span>
      {{ on ? 'Favorit gemerkt' : 'Favorit merken' }}<span class="visually-hidden">: {{ eventTitle() }}</span>
    </button>`,
  styles: `
    button { min-height: 2rem; min-width: 2rem; margin-top: 0.25rem; }
    button[aria-pressed='true'] { font-weight: 600; border-color: var(--fg); }
  `,
})
export class FavoriteToggle {
  protected readonly favorites = inject(Favorites);

  readonly eventId = input.required<string>();
  readonly eventTitle = input.required<string>();

  protected readonly pressed = computed(() => this.favorites.isFavorite(this.eventId()));
}
