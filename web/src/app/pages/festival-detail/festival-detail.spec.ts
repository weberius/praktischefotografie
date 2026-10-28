// Gherkin: web/festivals.feature · „Festivalseite zeigt Stammdaten“, „… listet Ausstellungen“, „Festival ohne Ausstellung“, „Festivalfilter in Karte und Orten“ (FST-UB-2 bis FST-UB-4, FST-ST-2)
import { Title } from '@angular/platform-browser';
import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { routes } from '../../app.routes';
import { provideTestData } from '../../testing/test-data';

async function open(url: string): Promise<HTMLElement> {
  const harness = await RouterTestingHarness.create();
  await harness.navigateByUrl(url);
  await harness.fixture.whenStable();
  harness.detectChanges();
  expect(harness.routeNativeElement).not.toBeNull();
  return harness.routeNativeElement as HTMLElement;
}

describe('FestivalDetailPage', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [provideRouter(routes), ...provideTestData()] });
  });

  it('Szenario: Festivalseite zeigt Stammdaten – Titel, Zeitraum, Stadt, Beschreibung, Website, Veranstalter', async () => {
    const root = await open('/festivals/photoszene-festival-2026');
    expect(root.querySelector('h1')?.textContent).toContain('Photoszene-Festival 2026');
    expect(root.textContent).toContain('1. November 2026 – 15. Dezember 2026');
    expect(root.textContent).toContain('Köln');
    expect(root.textContent).toContain('Stadtweites Festival.');
    const site = root.querySelector('a[href="https://example.org/festival"]');
    expect(site?.getAttribute('rel')).toContain('noopener');
    expect(root.querySelector('a[href="/organizers/photoszene-koeln"]')?.textContent).toContain('Photoszene Köln e.V.');
    expect(TestBed.inject(Title).getTitle()).toContain('Photoszene-Festival 2026');
  });

  it('Szenario: Festivalseite listet Ausstellungen – genau die zwei mit Ort, Zeitraum, Status; nur der Partner ist gekennzeichnet', async () => {
    const root = await open('/festivals/photoszene-festival-2026');
    const items = Array.from(root.querySelectorAll('ul.card-list li'));
    expect(items.length).toBe(2);
    expect(items[0].querySelector('a')?.getAttribute('href')).toBe('/exhibitions/f-1');
    expect(items[0].textContent).toContain('Haus Köln Bibliothek');
    expect(items[0].textContent).toContain('1. November 2026 – 15. Dezember 2026');
    expect(items[0].querySelector('.badge')).not.toBeNull();
    expect(items[0].textContent).toContain('Offizieller Partner');
    expect(items[1].textContent).toContain('Galerie Köln');
    expect(items[1].textContent).not.toContain('Offizieller Partner');
    expect(root.textContent).not.toContain('Ausstellung a-');
  });

  it('Szenario: Festivalfilter in Karte und Orten – Links mit festival-Parameter', async () => {
    const root = await open('/festivals/photoszene-festival-2026');
    const hrefs = Array.from(root.querySelectorAll('a')).map((a) => a.getAttribute('href'));
    expect(hrefs).toContain('/map?festival=photoszene-festival-2026');
    expect(hrefs).toContain('/venues?festival=photoszene-festival-2026');
  });

  it('Szenario: Festival ohne Ausstellung – Hinweis und keine Filterlinks', async () => {
    const root = await open('/festivals/festival-ohne-programm');
    expect(root.querySelector('h1')?.textContent).toContain('Festival ohne Programm 2027');
    expect(root.querySelector('.notice')?.textContent).toContain('keine Ausstellungen');
    expect(root.querySelector('a[href^="/map"]')).toBeNull();
    expect(root.querySelector('a[href^="/venues"]')).toBeNull();
  });

  it('unbekannte ID zeigt den Hinweis „nicht gefunden“', async () => {
    const root = await open('/festivals/gibt-es-nicht');
    expect(root.querySelector('app-not-found')).not.toBeNull();
    expect(TestBed.inject(Title).getTitle()).toContain('Nicht gefunden');
  });
});
