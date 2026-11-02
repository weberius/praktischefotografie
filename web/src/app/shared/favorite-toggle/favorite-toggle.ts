import { Component, computed, inject, input } from '@angular/core';
import { Favorites } from '../../core/favorites';

/** Umschalter „Favorit“ für ein Event (FAV-UB-1, FAV-EV-1, Q-USE-17): Zustand in Text und Symbol, `aria-pressed`, Event im Namen. */
@Component({
  selector: 'app-favorite-toggle',
  template: `<button type="button" class="favorite-toggle" [attr.aria-pressed]="pressed()" (click)="favorites.toggle(eventId())">
    <span aria-hidden="true">{{ pressed() ? '★' : '☆' }}</span>
    {{ pressed() ? 'Favorit gemerkt' : 'Favorit merken' }}<span class="visually-hidden">: {{ title() }}</span>
  </button>`,
})
export class FavoriteToggle {
  protected readonly favorites = inject(Favorites);

  readonly eventId = input.required<string>();
  readonly title = input.required<string>();

  protected readonly pressed = computed(() => this.favorites.isFavorite(this.eventId()));
}
