// Gherkin: web/fotografinnen.feature (PHO-UB-2, PHO-UB-3, PHO-ST-1)
import { TestBed } from '@angular/core/testing';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { routes } from '../../app.routes';
import { provideTestData } from '../../testing/test-data';

async function open(url: string): Promise<HTMLElement> {
  const harness = await RouterTestingHarness.create();
  await harness.navigateByUrl(url);
  await harness.fixture.whenStable();
  harness.detectChanges();
  return harness.routeNativeElement as HTMLElement;
}

describe('PhotographerDetailPage', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [provideRouter(routes, withComponentInputBinding()), ...provideTestData()] });
  });

  it('Szenario: Personenseite zeigt Stammdaten (PHO-UB-2)', async () => {
    const el = await open('/photographers/martin-parr');
    expect(el.querySelectorAll('h1').length).toBe(1);
    expect(el.querySelector('h1')?.textContent).toContain('Martin Parr');
    expect(el.textContent).toContain('Britischer Dokumentarfotograf.');
    const site = el.querySelector('a[href="https://example.org/parr"]')!;
    expect(site.getAttribute('rel')).toContain('noopener');
    expect(document.title).toContain('Martin Parr');
  });

  it('Szenario: Personenseite listet Ausstellungen (PHO-UB-3)', async () => {
    // Elliott Erwitt: a-laufend (Beginn 2026-09-01, Essen) und f-1 (Beginn 2026-11-01, Köln); Reihenfolge nach Beginn absteigend.
    const el = await open('/photographers/elliott-erwitt');
    const items = Array.from(el.querySelectorAll('ul.card-list > li'));
    expect(items.length).toBe(2);
    expect(items[0].textContent).toContain('Ausstellung f-1');
    expect(items[1].textContent).toContain('Ausstellung a-laufend');
    expect(items[1].textContent).toContain('Museum Essen');
    expect(items[1].textContent).toContain('1. September 2026 – 10. Januar 2027');
    expect(items[1].textContent).toContain('Laufend');
    expect(items[1].querySelector('a')?.getAttribute('href')).toBe('/exhibitions/a-laufend');
  });

  it('Szenario: Beendete und laufende Ausstellung erscheinen beide, die neuere zuerst (PHO-UB-3)', async () => {
    TestBed.resetTestingModule();
    TestBed.configureTestingModule({
      providers: [
        provideRouter(routes, withComponentInputBinding()),
        ...provideTestData({
          dataset: {
            exhibitions: [
              { id: 'alt', venueId: 'v-essen', title: 'Alt', startDate: '2026-03-01', endDate: '2026-06-30', type: 'solo', photographerIds: ['martin-parr'] },
              { id: 'neu', venueId: 'v-essen', title: 'Neu', startDate: '2026-09-01', endDate: '2027-01-10', type: 'solo', photographerIds: ['martin-parr'] },
            ],
          },
        }),
      ],
    });
    const el = await open('/photographers/martin-parr');
    const items = Array.from(el.querySelectorAll('ul.card-list > li'));
    expect(items.map((i) => i.querySelector('h3')?.textContent?.trim())).toEqual(['Neu', 'Alt']);
    expect(items[1].textContent).toContain('Beendet');
  });

  it('Szenario: Person ohne Ausstellung (PHO-ST-1)', async () => {
    const el = await open('/photographers/ohne-ausstellung');
    expect(el.querySelector('.notice')?.textContent).toContain('keine Ausstellung');
    expect(el.querySelector('ul.card-list')).toBeNull();
  });

  it('Unbekannte ID zeigt die Hinweisseite (NAV-EV-1)', async () => {
    const el = await open('/photographers/unbekannt');
    expect(el.querySelector('app-not-found')).not.toBeNull();
  });
});
