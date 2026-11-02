// Gherkin: web/navigation.feature (NAV-UB-9, NAV-EV-2, NAV-ST-1)
import { TestBed } from '@angular/core/testing';
import { Router, provideRouter, withComponentInputBinding } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { appConfig } from '../../app.config';
import { routes } from '../../app.routes';
import { NAV_HISTORY_INITIALIZER } from '../../core/nav-history';
import { provideTestData } from '../../testing/test-data';
import { targetLabel } from './back-link';

/** Navigiert nacheinander; der Verlauf wird wie beim Anwendungsstart vorab erzeugt, nicht erst vom Link. */
async function harnessAt(...urls: string[]): Promise<{ el: HTMLElement; harness: RouterTestingHarness }> {
  const harness = await RouterTestingHarness.create();
  for (const url of urls) {
    await harness.navigateByUrl(url);
    await harness.fixture.whenStable();
    harness.detectChanges();
  }
  return { el: harness.routeNativeElement as HTMLElement, harness };
}

async function clickBack(harness: RouterTestingHarness): Promise<void> {
  (harness.routeNativeElement!.querySelector('a.back-link') as HTMLAnchorElement).click();
  await harness.fixture.whenStable();
  harness.detectChanges();
}

const backLinkBeforeHeading = (el: HTMLElement): boolean =>
  !!(el.querySelector('a.back-link')!.compareDocumentPosition(el.querySelector('h1')!) & Node.DOCUMENT_POSITION_FOLLOWING);

const DETAILS: [string, string, string][] = [
  ['/posts/willkommen', '/', 'Magazin'],
  ['/venues/v-koeln-lib', '/venues', 'Orte'],
  ['/photographers/martin-parr', '/photographers', 'Fotograf:innen'],
  ['/exhibitions/a-kommend', '/exhibitions', 'Ausstellungen'],
  ['/events/e-talk', '/events', 'Events'],
  ['/festivals/photoszene-festival-2026', '/festivals', 'Festivals'],
  ['/organizers/photoszene-koeln', '/organizers', 'Veranstalter:innen'],
];

describe('BackLink', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [provideRouter(routes, withComponentInputBinding()), NAV_HISTORY_INITIALIZER, ...provideTestData()] });
  });

  it('Der Verlauf wird beim Anwendungsstart erzeugt (NAV-EV-2)', () => {
    expect(appConfig.providers).toContain(NAV_HISTORY_INITIALIZER);
  });

  for (const [url, ziel, label] of DETAILS) {
    it(`Szenario: Zurück-Link auf jeder Detailseite und bei Direktaufruf (NAV-UB-9, NAV-ST-1) – ${url}`, async () => {
      const { el, harness } = await harnessAt(url);
      const links = el.querySelectorAll('a.back-link');
      expect(links.length).toBe(1);
      expect(links[0].getAttribute('href')).toBe(ziel);
      expect(links[0].textContent?.trim()).toBe(`‹ Zurück zu ${label}`);
      expect(backLinkBeforeHeading(el)).toBeTrue();
      await clickBack(harness);
      expect(TestBed.inject(Router).url).toBe(ziel);
    });
  }

  it('Szenario: Zurück zur vorherigen Seite (NAV-EV-2)', async () => {
    const { el, harness } = await harnessAt('/calendar', '/events/e-talk');
    expect(el.querySelector('a.back-link')?.textContent?.trim()).toBe('‹ Zurück zu Kalender');
    await clickBack(harness);
    expect(TestBed.inject(Router).url).toBe('/calendar');
  });

  it('führt nach der Navigation über Kalendermonate zum zuletzt gezeigten Monat (NAV-EV-2)', async () => {
    const { el } = await harnessAt('/calendar/2026/11', '/events/e-talk');
    expect(el.querySelector('a.back-link')?.getAttribute('href')).toBe('/calendar/2026/11');
  });

  it('aktualisiert den Link beim Wechsel zwischen Detailseiten desselben Typs (NAV-EV-2)', async () => {
    const { el } = await harnessAt('/venues/v-koeln-lib', '/venues/v-essen');
    expect(el.querySelector('a.back-link')?.getAttribute('href')).toBe('/venues/v-koeln-lib');
    expect(el.querySelector('a.back-link')?.textContent?.trim()).toBe('‹ Zurück zu Ort');
  });

  it('springt bei einem Zyklus zwischen zwei Seiten hin und her (ADR-022)', async () => {
    const { harness } = await harnessAt('/venues/v-koeln-lib', '/exhibitions/a-kommend');
    await clickBack(harness);
    expect(TestBed.inject(Router).url).toBe('/venues/v-koeln-lib');
    await clickBack(harness);
    expect(TestBed.inject(Router).url).toBe('/exhibitions/a-kommend');
  });

  for (const url of ['/', '/calendar', '/map', '/photographers', '/impressum', '/gibt-es-nicht']) {
    it(`Szenario: Kein Zurück-Link auf Übersichtsseiten (NAV-ST-1) – ${url}`, async () => {
      expect((await harnessAt(url)).el.querySelector('a.back-link')).toBeNull();
    });
  }

  it('benennt Ziele einschließlich rechtlicher Seiten (NAV-UB-9)', () => {
    expect(targetLabel('/calendar/2026/11')).toBe('Kalender');
    expect(targetLabel('/calendarxyz')).toBe('vorherige Seite');
    expect(targetLabel('/impressum')).toBe('Impressum');
    expect(targetLabel('/quellen')).toBe('Quellen & Lizenzen');
    expect(targetLabel('/constructor/x')).toBe('vorherige Seite');
    expect(targetLabel('/gibt-es-nicht')).toBe('vorherige Seite');
  });
});
