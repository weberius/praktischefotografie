import { Component, computed, input } from '@angular/core';
import { EventTimeInput, eventTimeLines } from '../../core/event-time';

/** Zeitangabe eines Events (EVT-UB-7, EVT-UB-8, CAL-UB-8); der zugängliche Name nennt „von … bis … Uhr“ statt des Gedankenstrichs (Q-USE-21). */
@Component({
  selector: 'app-event-time',
  template: `
    @for (line of lines(); track line.text) {
      {{ separator() }}<span aria-hidden="true">{{ line.text }}</span><span class="visually-hidden">{{ line.label }}</span>
    }
  `,
})
export class EventTime {
  readonly event = input.required<EventTimeInput>();
  /** Mehrtägige Events zeigen nur auf der Detailseite Start und Ende (EVT-UB-8). */
  readonly detail = input(false);
  /** Trenner vor jeder Zeile, wenn die Angabe hinter dem Datum steht. */
  readonly separator = input('');
  protected readonly lines = computed(() => eventTimeLines(this.event(), this.detail()));
}
