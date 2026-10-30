import { DOCUMENT } from '@angular/common';
import { Component, computed, effect, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Clock, formatRange } from '../../core/clock';
import { DataService } from '../../core/data.service';
import { isOver } from '../../core/exhibition-status';
import { buildEventIcs, icsFileName } from '../../core/ics';
import { EVENT_TYPE_LABEL } from '../../core/models';
import { PageMeta } from '../../core/page-meta';
import { DataGate } from '../../shared/data-gate/data-gate';
import { NotFound } from '../../shared/not-found/not-found';

/** So lange bleibt die Blob-Adresse der Kalenderdatei gültig, bevor sie freigegeben wird. */
const BLOB_URL_LIFETIME_MS = 10_000;

/** Eventdetail `/events/:id`. */
@Component({
  selector: 'app-event-detail-page',
  imports: [RouterLink, DataGate, NotFound],
  templateUrl: './event-detail.html',
  styleUrl: './event-detail.css',
})
export class EventDetailPage {
  private readonly data = inject(DataService);
  private readonly today = inject(Clock).today();
  private readonly document = inject(DOCUMENT);

  readonly id = input<string>();

  protected readonly typeLabel = EVENT_TYPE_LABEL;
  protected readonly formatRange = formatRange;

  protected readonly event = computed(() => {
    const id = this.id();
    return id === undefined ? undefined : this.data.eventById().get(id);
  });
  protected readonly venue = computed(() => {
    const e = this.event();
    return e ? this.data.venueById().get(e.venueId) : undefined;
  });
  protected readonly over = computed(() => {
    const e = this.event();
    return !!e && isOver(e, this.today);
  });

  /** Erzeugt die Kalenderdatei im Browser und bietet sie als Download an; sendet nichts (ICS-EV-1, ADR-018). */
  protected saveToCalendar(): void {
    const e = this.event();
    if (!e) return;
    const v = this.venue();
    const ics = buildEventIcs({
      id: e.id,
      title: e.title,
      startDate: e.startDate,
      endDate: e.endDate,
      typeLabel: EVENT_TYPE_LABEL[e.eventType],
      description: e.description,
      venue: v ? { name: v.name, street: v.address.street, zip: v.address.zip, city: v.address.city } : undefined,
      city: e.city,
      eventUrl: new URL(`events/${e.id}`, this.document.baseURI).href,
    });
    const url = URL.createObjectURL(new Blob([ics], { type: 'text/calendar;charset=utf-8' }));
    const link = this.document.createElement('a');
    link.href = url;
    link.download = icsFileName(e.id);
    link.click();
    // Verzögert freigeben: Browser, die den Download asynchron starten, brauchen die Adresse noch (ADR-018).
    setTimeout(() => URL.revokeObjectURL(url), BLOB_URL_LIFETIME_MS);
  }

  constructor() {
    const meta = inject(PageMeta);
    effect(() => {
      if (!this.data.ready()) return;
      const e = this.event();
      if (e) meta.set(e.title, e.description ?? `${EVENT_TYPE_LABEL[e.eventType]} in ${e.city}: ${formatRange(e.startDate, e.endDate)}.`);
      else meta.set('Nicht gefunden', 'Dieses Event existiert nicht.');
    });
  }
}
