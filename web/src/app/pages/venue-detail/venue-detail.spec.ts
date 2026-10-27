// Gherkin: web/orte.feature (VNU-UB-3, VNU-UB-4, VNU-ST-1)
import { TestBed } from '@angular/core/testing';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { routes } from '../../app.routes';
import { TEST_DATASET, provideTestData } from '../../testing/test-data';

async function open(url: string): Promise<HTMLElement> {
  const harness = await RouterTestingHarness.create();
  await harness.navigateByUrl(url);
  await harness.fixture.whenStable();
  harness.detectChanges();
  return harness.routeNativeElement as HTMLElement;
}

function setup(options: Parameters<typeof provideTestData>[0] = {}): void {
  TestBed.configureTestingModule({ providers: [provideRouter(routes, withComponentInputBinding()), ...provideTestData(options)] });
}

describe('VenueDetailPage', () => {
  it('Szenario: Ortsdetail zeigt Stammdaten (VNU-UB-3)', async () => {
    setup({
      dataset: {
        venues: TEST_DATASET.venues.map((v) => (v.id === 'v-koeln-lib' ? { ...v, id: 'makk-koeln', name: 'MAKK Köln' } : v)),
      },
    });
    const el = await open('/venues/makk-koeln');
    expect(el.querySelectorAll('h1').length).toBe(1);
    expect(el.querySelector('h1')?.textContent).toContain('MAKK Köln');
    expect(el.querySelector('address')?.textContent).toContain('Teststraße 1');
    expect(el.querySelector('address')?.textContent).toContain('50667 Köln');
    const links = Array.from(el.querySelectorAll<HTMLAnchorElement>('a[target=_blank]'));
    const website = links.find((a) => a.getAttribute('href') === 'https://example.org/v-koeln-lib')!;
    expect(website.getAttribute('rel')).toContain('noopener');
    expect(el.textContent).toContain('Präsenzbibliothek');
    expect(el.textContent).toContain('Ständige Sammlung');
    expect(el.textContent).toContain('Prüfstand: recherchiert');
    expect(el.textContent).toContain('27. Oktober 2026');
    expect(document.title).toContain('MAKK Köln');
  });

  it('Szenario: Ortsdetail zeigt Programm und Beiträge (VNU-UB-4)', async () => {
    setup({
      dataset: { exhibitions: TEST_DATASET.exhibitions.map((e) => (e.id === 'a-beendet' ? { ...e, venueId: 'v-koeln-lib' } : e)) },
    });
    const el = await open('/venues/v-koeln-lib');
    const text = el.textContent!;
    expect(text).toContain('Ausstellung a-endet-bald');
    expect(text).toContain('Ausstellung a-kommend');
    expect(text).not.toContain('Ausstellung a-beendet');
    expect(el.textContent).toContain('Kommend');
    expect(el.querySelector('a[href="/exhibitions/a-kommend"]')).not.toBeNull();
    expect(el.querySelector('a[href="/events/e-talk"]')).not.toBeNull();
    expect(el.querySelector('a[href="/posts/willkommen"]')?.textContent).toContain('Willkommen');
  });

  it('Szenario: Ort ohne Programm (VNU-ST-1)', async () => {
    setup({ dataset: { exhibitions: [], events: [] } });
    const el = await open('/venues/v-koeln-gal');
    expect(el.querySelector('.notice')?.textContent).toContain('keine laufenden oder kommenden Ausstellungen und Events');
  });

  it('Unbekannte ID zeigt die Hinweisseite (NAV-EV-1)', async () => {
    setup();
    const el = await open('/venues/unbekannt');
    expect(el.querySelector('app-not-found')).not.toBeNull();
  });
});
