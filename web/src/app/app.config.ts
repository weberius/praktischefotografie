import { provideHttpClient, withFetch } from '@angular/common/http';
import { ViewportScroller } from '@angular/common';
import { ApplicationConfig, inject, provideAppInitializer, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideRouter, withComponentInputBinding, withInMemoryScrolling } from '@angular/router';

import { routes } from './app.routes';

/** Versatz für Anker-Sprünge in Pixeln; entspricht `scroll-padding-top: 6rem` in styles.css (ein Test erzwingt die Übereinstimmung, FRM-UB-5). */
export const HEADER_SCROLL_OFFSET_PX = 96;

/** Setzt den Versatz, damit Router-Anker unter dem haftenden Kopf landen (FRM-UB-5). */
export function applyHeaderScrollOffset(scroller: ViewportScroller): void {
  scroller.setOffset([0, HEADER_SCROLL_OFFSET_PX]);
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(routes, withComponentInputBinding(), withInMemoryScrolling({ scrollPositionRestoration: 'enabled', anchorScrolling: 'enabled' })),
    provideAppInitializer(() => applyHeaderScrollOffset(inject(ViewportScroller))),
    provideHttpClient(withFetch()),
    provideClientHydration(withEventReplay()),
  ],
};
