import { Component, computed, effect, inject, input } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Clock, formatRange, monthName } from '../../core/clock';
import { AgendaItem, buildAgenda, filterByMonth, filterFromToday, parseMonth, shiftMonth } from '../../core/agenda';
import { DataService } from '../../core/data.service';
import { PageMeta } from '../../core/page-meta';
import { DataGate } from '../../shared/data-gate/data-gate';
import { NotFound } from '../../shared/not-found/not-found';
import { StatusBadge } from '../../shared/status-badge/status-badge';

/** Kalender und Agenda: `/calendar` (ab heute) und `/calendar/:year/:month` (Monatsansicht). */
@Component({
  selector: 'app-calendar-page',
  imports: [RouterLink, DataGate, NotFound, StatusBadge],
  templateUrl: './calendar.html',
  styleUrl: './calendar.css',
})
export class CalendarPage {
  private readonly data = inject(DataService);
  private readonly clock = inject(Clock);
  private readonly router = inject(Router);

  readonly year = input<string>();
  readonly month = input<string>();
  /** Query-Parameter `ended=1`: beendete Einträge in der Agenda anzeigen. */
  readonly ended = input<string>();

  protected readonly today = this.clock.today();
  protected readonly formatRange = formatRange;

  /** `null` bei ungültiger Adresse; `isMonthView` ist falsch in der Agenda ab heute (dann gilt der heutige Monat für die Navigation). */
  protected readonly period = computed(() => {
    if (this.year() === undefined && this.month() === undefined) return { year: +this.today.slice(0, 4), month: +this.today.slice(5, 7), isMonthView: false };
    const parsed = parseMonth(this.year(), this.month());
    return parsed ? { ...parsed, isMonthView: true } : null;
  });

  protected readonly showEnded = computed(() => this.ended() === '1');

  protected readonly label = computed(() => {
    const p = this.period();
    return p?.isMonthView ? `${monthName(p.month)} ${p.year}` : 'Ab heute';
  });

  protected readonly items = computed<AgendaItem[]>(() => {
    const p = this.period();
    if (!p) return [];
    const all = buildAgenda(this.data.exhibitions(), this.data.events(), this.data.venueById(), this.today);
    return p.isMonthView ? filterByMonth(all, p.year, p.month) : filterFromToday(all, this.today, this.showEnded());
  });

  protected readonly nav = computed(() => {
    const p = this.period();
    if (!p) return null;
    const link = (delta: number) => {
      const s = shiftMonth(p.year, p.month, delta);
      return { commands: ['/calendar', String(s.year), String(s.month)], text: `${monthName(s.month)} ${s.year}` };
    };
    return { prev: link(-1), next: link(1) };
  });

  constructor() {
    const meta = inject(PageMeta);
    effect(() => {
      const p = this.period();
      if (!p) meta.set('Nicht gefunden', 'Diese Seite existiert nicht.');
      else if (p.isMonthView) meta.set(`Kalender ${this.label()}`, `Ausstellungen und Events im ${this.label()}.`);
      else meta.set('Kalender', 'Laufende und kommende Ausstellungen und Events.');
    });
  }

  protected toggleEnded(checked: boolean): void {
    void this.router.navigate([], { queryParams: { ended: checked ? '1' : null }, queryParamsHandling: 'merge' });
  }
}
