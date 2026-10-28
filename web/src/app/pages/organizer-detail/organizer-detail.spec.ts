// Gherkin: web/veranstalter.feature · „Veranstalterseite zeigt Stammdaten“, „… listet Ausstellungen über Festivals“, „… listet Festivals“, „… zeigt Beschreibung und Instagram“, „Veranstalter ohne Ausstellung“ (ORG-UB-2, ORG-UB-5, ORG-UB-7, ORG-UB-8, ORG-ST-1)
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

describe('OrganizerDetailPage', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [provideRouter(routes), ...provideTestData()] });
  });

  it('Szenario: Veranstalterseite zeigt Stammdaten – Name, Typ, Stadt, Website', async () => {
    const root = await open('/organizers/photoszene-koeln');
    expect(root.querySelector('h1')?.textContent).toContain('Photoszene Köln e.V.');
    expect(root.textContent).toContain('Verein');
    expect(root.textContent).toContain('Köln');
    const site = root.querySelector('a[href="https://example.org/photoszene"]');
    expect(site).not.toBeNull();
    expect(site?.getAttribute('rel')).toContain('noopener');
    expect(TestBed.inject(Title).getTitle()).toContain('Photoszene Köln e.V.');
  });

  it('Szenario: Veranstalterseite listet Ausstellungen über Festivals (ORG-UB-5) – genau die zwei mit Ort, Zeitraum und Status', async () => {
    const root = await open('/organizers/photoszene-koeln');
    const items = Array.from(root.querySelectorAll('ul.card-list li'));
    expect(items.length).toBe(2);
    const text = items.map((i) => i.textContent).join(' ');
    expect(text).toContain('Ausstellung f-1');
    expect(text).toContain('Ausstellung f-2');
    expect(text).not.toContain('Ausstellung a-');
    expect(text).toContain('Haus Köln Bibliothek');
    expect(text).toContain('Galerie Köln');
    expect(text).toContain('1. November 2026 – 15. Dezember 2026');
    expect(items[0].querySelector('.badge')).not.toBeNull();
    expect(items[0].querySelector('a')?.getAttribute('href')).toBe('/exhibitions/f-1');
  });

  it('Szenario: Veranstalterseite listet Festivals (ORG-UB-7) – genau die zwei mit Titel, Zeitraum und Link', async () => {
    const root = await open('/organizers/photoszene-koeln');
    const items = Array.from(root.querySelectorAll('#organizer-festivals li'));
    expect(items.map((i) => i.querySelector('a')?.getAttribute('href'))).toEqual(['/festivals/photoszene-festival-2026', '/festivals/photoszene-nachlese-2027']);
    expect(items[0].textContent).toContain('Photoszene-Festival 2026');
    expect(items[0].textContent).toContain('1. November 2026 – 15. Dezember 2026');
    expect(root.querySelector('a[href="/festivals/festival-ohne-programm"]')).toBeNull();
  });

  it('Szenario: Veranstalterseite zeigt Beschreibung und Instagram (ORG-UB-8)', async () => {
    const root = await open('/organizers/photoszene-koeln');
    expect(root.textContent).toContain('Verein zur Förderung der Fotografie.');
    const link = root.querySelector('a[href="https://www.instagram.com/photoszene_koeln/"]');
    expect(link).not.toBeNull();
    expect(link?.getAttribute('rel')).toContain('noopener');
  });

  it('Veranstalter ohne Instagram-Namen zeigt keinen Instagram-Link (ORG-UB-8)', async () => {
    const root = await open('/organizers/ohne-programm');
    expect(root.querySelector('a[href^="https://www.instagram.com/"]')).toBeNull();
  });

  it('Links zu Karte und Liste mit Veranstalterfilter (ORG-UB-6)', async () => {
    const root = await open('/organizers/photoszene-koeln');
    const hrefs = Array.from(root.querySelectorAll('a')).map((a) => a.getAttribute('href'));
    expect(hrefs).toContain('/map?organizer=photoszene-koeln');
    expect(hrefs).toContain('/venues?organizer=photoszene-koeln');
  });

  it('Szenario: Veranstalter ohne Ausstellung – Hinweis', async () => {
    const root = await open('/organizers/ohne-programm');
    expect(root.querySelector('h1')?.textContent).toContain('Festival ohne Programm');
    expect(root.querySelector('.notice')?.textContent).toContain('keine Ausstellungen');
    expect(root.querySelectorAll('ul.card-list li').length).toBe(0);
  });

  it('unbekannte ID zeigt den Hinweis „nicht gefunden“', async () => {
    const root = await open('/organizers/gibt-es-nicht');
    expect(root.querySelector('app-not-found')).not.toBeNull();
    expect(TestBed.inject(Title).getTitle()).toContain('Nicht gefunden');
  });

  it('Szenario: Ausstellungen des Veranstalters tragen Badges (ORG-UB-9, BDG-UB-6)', async () => {
    const root = await open('/organizers/photoszene-koeln');
    const cards = Array.from(root.querySelectorAll('ul.card-list li'));
    expect(cards.length).toBe(2);
    for (const c of cards) {
      expect(Array.from(c.querySelectorAll('.badge-row .badge')).map((b) => b.textContent?.trim())).toEqual(['Einzelausstellung', 'Kommend']);
      expect(Array.from(c.children).map((x) => x.tagName.toLowerCase()).slice(0, 2)).toEqual(['app-exhibition-badges', 'h3']);
    }
    expect(root.querySelectorAll('app-status-badge').length).toBe(0);
  });
});
