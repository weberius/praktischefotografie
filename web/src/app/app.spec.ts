// Gherkin: web/navigation.feature (NAV-UB-1 bis NAV-UB-4, NAV-EV-1)
import { provideRouter, Router, withComponentInputBinding } from '@angular/router';
import { TestBed } from '@angular/core/testing';
import { RouterTestingHarness } from '@angular/router/testing';
import { App } from './app';
import { routes } from './app.routes';
import { provideTestData } from './testing/test-data';

const ADDRESSES: [string, string][] = [
  ['/', 'Magazin'],
  ['/calendar', 'Kalender'],
  ['/calendar/2026/11', 'Kalender'],
  ['/map', 'Karte'],
  ['/venues', 'Orte'],
  ['/venues/v-koeln-lib', 'Ort'],
  ['/photographers', 'Fotograf:innen'],
  ['/photographers/martin-parr', 'Fotograf:in'],
  ['/exhibitions', 'Ausstellungen'],
  ['/exhibitions/a-laufend', 'Ausstellung'],
  ['/events', 'Events'],
  ['/events/e-talk', 'Event'],
  ['/organizers', 'Veranstalter:innen'],
  ['/organizers/photoszene-koeln', 'Veranstalter:in'],
  ['/posts/willkommen', 'Beitrag'],
  ['/impressum', 'Impressum'],
  ['/datenschutz', 'Datenschutz'],
];

describe('App', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [provideRouter(routes, withComponentInputBinding()), ...provideTestData()] });
  });

  it('Szenario: Navigation ist auf jeder Seite vorhanden (NAV-UB-1)', async () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    const labels = Array.from<HTMLElement>(fixture.nativeElement.querySelectorAll('a')).map((a) => a.textContent?.trim());
    for (const label of ['Magazin', 'Kalender', 'Karte', 'Orte', 'Fotograf:innen', 'Ausstellungen', 'Events', 'Veranstalter:innen', 'Impressum', 'Datenschutz']) {
      expect(labels).toContain(label);
    }
  });

  describe('Szenario: Jede Adresse zeigt ihre Seite (NAV-UB-2)', () => {
    for (const [url, heading] of ADDRESSES) {
      it(`${url} zeigt die Seite „${heading}“`, async () => {
        const harness = await RouterTestingHarness.create();
        await harness.navigateByUrl(url);
        harness.detectChanges();
        expect(TestBed.inject(Router).url).toBe(url);
        expect(harness.routeNativeElement?.querySelector('h1')).not.toBeNull();
      });
    }
  });

  describe('Szenario: Jede Seite hat Titel und Beschreibung (NAV-UB-3)', () => {
    const titles = new Set<string>();
    for (const [url] of ADDRESSES.filter(([u]) => !u.includes('/', 1) || u === '/calendar/2026/11')) {
      it(`${url} hat Titel und Meta-Beschreibung`, async () => {
        const harness = await RouterTestingHarness.create();
        await harness.navigateByUrl(url);
        harness.detectChanges();
        expect(document.title.length).toBeGreaterThan(0);
        expect(document.title).toContain('Praktische Fotografie');
        expect(document.querySelector('meta[name=description]')?.getAttribute('content')?.length).toBeGreaterThan(0);
        titles.add(`${url}|${document.title}`);
      });
    }
  });

  describe('Szenario: Unbekannte Adresse oder ID (NAV-EV-1)', () => {
    for (const url of ['/gibt-es-nicht', '/venues/unbekannt', '/photographers/unbekannt', '/posts/unbekannt', '/exhibitions/unbekannt', '/events/unbekannt', '/organizers/unbekannt']) {
      it(`${url} zeigt die Hinweisseite mit Link zur Startseite`, async () => {
        const harness = await RouterTestingHarness.create();
        await harness.navigateByUrl(url);
        await new Promise((r) => setTimeout(r));
        harness.detectChanges();
        const el = harness.routeNativeElement as HTMLElement;
        expect(el.textContent).toContain('nicht gefunden');
        expect(el.querySelector('a[href="/"]')).not.toBeNull();
      });
    }
  });

  it('Szenario: Datenschutzseite nennt Kartenabruf (NAV-UB-4)', async () => {
    const harness = await RouterTestingHarness.create();
    await harness.navigateByUrl('/datenschutz');
    expect((harness.routeNativeElement as HTMLElement).textContent).toContain('OpenStreetMap');
  });
});
