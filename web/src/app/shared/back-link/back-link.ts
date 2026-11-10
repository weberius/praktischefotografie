import { Component, computed, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NavHistory } from '../../core/nav-history';

/** Seitentypen mit Übersicht und Detailseiten: Übersichtsadresse, Name der Übersicht und der einzelnen Seite. */
const KINDS = {
  posts: { overview: '/', plural: 'Magazin', singular: 'Beitrag' },
  venues: { overview: '/venues', plural: 'Orte', singular: 'Ort' },
  photographers: { overview: '/photographers', plural: 'Fotograf:innen', singular: 'Fotograf:in' },
  exhibitions: { overview: '/exhibitions', plural: 'Ausstellungen', singular: 'Ausstellung' },
  events: { overview: '/events', plural: 'Events', singular: 'Event' },
  festivals: { overview: '/festivals', plural: 'Festivals', singular: 'Festival' },
  organizers: { overview: '/organizers', plural: 'Veranstalter:innen', singular: 'Veranstalter:in' },
} as const;

/** Seiten ohne Detailseiten (auch Unterseiten wie `/calendar/2026/11`). */
const OTHER: Record<string, string> = {
  calendar: 'Kalender',
  map: 'Karte',
  impressum: 'Impressum',
  haftungsausschluss: 'Haftungsausschluss',
  datenschutz: 'Datenschutz',
  quellen: 'Quellen & Lizenzen',
  projekt: 'Projekt',
};

export type BackLinkKind = keyof typeof KINDS;

/** Benennt das Ziel anhand des Pfads; unbekannte Seiten heißen „vorherige Seite“. */
export function targetLabel(path: string): string {
  const [first, ...rest] = path.split('/').filter(Boolean);
  if (first === undefined) return KINDS.posts.plural;
  if (Object.hasOwn(OTHER, first)) return OTHER[first];
  if (Object.hasOwn(KINDS, first)) {
    const kind = KINDS[first as BackLinkKind];
    return rest.length === 0 ? kind.plural : kind.singular;
  }
  return 'vorherige Seite';
}

/** Zurück-Link für Detailseiten: führt zur vorherigen Seite der Anwendung, sonst zur Übersicht des Seitentyps (NAV-UB-9, NAV-EV-2, NAV-ST-1). */
@Component({
  selector: 'app-back-link',
  imports: [RouterLink],
  template: `<a class="back-link" [routerLink]="target()">‹ Zurück zu {{ label() }}</a>`,
  styles: `.back-link { display: inline-block; margin-bottom: 0.5rem; }`,
})
export class BackLink {
  private readonly history = inject(NavHistory);

  /** Seitentyp der Detailseite; bestimmt die Übersicht als Fallback. */
  readonly kind = input.required<BackLinkKind>();

  protected readonly target = computed(() => this.history.previous()?.tree ?? KINDS[this.kind()].overview);
  protected readonly label = computed(() => {
    const previous = this.history.previous();
    return previous ? targetLabel(previous.path) : KINDS[this.kind()].plural;
  });
}
