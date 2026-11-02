import { EnvironmentProviders, Injectable, computed, inject, provideAppInitializer, signal } from '@angular/core';
import { NavigationEnd, Router, UrlTree } from '@angular/router';

/** Die vorherige Seite der Anwendung als Adresse und als Pfad ohne Query und Fragment. */
export interface PreviousPage {
  tree: UrlTree;
  path: string;
}

/** Merkt sich die zuletzt besuchte Seite der Anwendung für den Zurück-Link (NAV-EV-2, NAV-ST-1, ADR-022). Wird beim Start erzeugt (`app.config.ts`); kein Speicher über das Neuladen hinaus. */
@Injectable({ providedIn: 'root' })
export class NavHistory {
  private readonly router = inject(Router);
  private readonly current = signal<string | null>(null);
  private readonly before = signal<string | null>(null);

  /** Die vorherige Seite oder `null`, wenn es keine gibt. */
  readonly previous = computed<PreviousPage | null>(() => {
    const url = this.before();
    return url === null ? null : { tree: this.router.parseUrl(url), path: url.split(/[?#]/)[0] };
  });

  constructor() {
    this.router.events.subscribe((e) => {
      if (!(e instanceof NavigationEnd) || e.urlAfterRedirects === this.current()) return;
      this.before.set(this.current());
      this.current.set(e.urlAfterRedirects);
    });
  }
}

/** Erzeugt den Verlauf vor der ersten Navigation (NAV-EV-2); sonst entsteht er erst mit dem ersten Zurück-Link und verpasst die erste Seite. */
export const NAV_HISTORY_INITIALIZER: EnvironmentProviders = provideAppInitializer(() => void inject(NavHistory));
