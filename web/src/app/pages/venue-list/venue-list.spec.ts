// Gherkin: web/orte.feature (VNU-UB-1, VNU-UB-5); web/filter.feature (FLT-UB-2, FLT-ST-1); web/veranstalter.feature (ORG-UB-4, Filter im Ortsverzeichnis)
import { TestBed } from '@angular/core/testing';
import { provideRouter, withComponentInputBinding, Router } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { routes } from '../../app.routes';
import { provideTestData } from '../../testing/test-data';

async function open(url: string): Promise<{ harness: RouterTestingHarness; el: HTMLElement }> {
  const harness = await RouterTestingHarness.create();
  await harness.navigateByUrl(url);
  await harness.fixture.whenStable();
  harness.detectChanges();
  return { harness, el: harness.routeNativeElement as HTMLElement };
}

const cards = (el: HTMLElement) => Array.from(el.querySelectorAll<HTMLElement>('ul.card-list > li'));

describe('VenueListPage', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [provideRouter(routes, withComponentInputBinding()), ...provideTestData()] });
  });

  it('Szenario: Verzeichnis listet alle Orte (VNU-UB-1)', async () => {
    const { el } = await open('/venues');
    expect(el.querySelectorAll('h1').length).toBe(1);
    const items = cards(el);
    expect(items.length).toBe(3);
    const lib = items.find((i) => i.textContent?.includes('Haus Köln Bibliothek'))!;
    expect(lib.textContent).toContain('Museum');
    expect(lib.textContent).toContain('Köln');
    expect(lib.textContent).toContain('Präsenzbibliothek');
    expect(lib.textContent).toContain('Ständige Sammlung');
    expect(lib.querySelector('a')?.getAttribute('href')).toBe('/venues/v-koeln-lib');
  });

  it('Szenario: Filter gilt auf allen filterbaren Seiten – Verzeichnis nach Typ und Ort (FLT-UB-1, FLT-UB-2)', async () => {
    const { harness, el } = await open('/venues');
    const tick = async () => { await harness.fixture.whenStable(); harness.detectChanges(); };
    const box = (label: string) => Array.from(el.querySelectorAll('app-global-filter label')).find((l) => l.textContent?.trim() === label)!.querySelector('input')!;
    box('Galerie').click();
    await tick();
    expect(cards(el).map((c) => c.querySelector('h2')!.textContent!.trim())).toEqual(['Galerie Köln']);
    box('Galerie').click();
    box('Museum Essen').click();
    await tick();
    expect(cards(el).length).toBe(1);
    expect(cards(el)[0].textContent).toContain('Museum Essen');
    expect(TestBed.inject(Router).url).toBe('/venues');
    expect(el.querySelector('.filters select')).toBeNull();
  });

  it('Szenario: Kein Treffer – Hinweis mit Zurücksetzen (FLT-ST-1)', async () => {
    const { harness, el } = await open('/venues?organizer=photoszene-koeln');
    const box = (label: string) => Array.from(el.querySelectorAll('app-global-filter label')).find((l) => l.textContent?.trim() === label)!.querySelector('input')!;
    box('Museum Essen').click();
    await harness.fixture.whenStable();
    harness.detectChanges();
    expect(cards(el).length).toBe(0);
    const notice = Array.from(el.querySelectorAll<HTMLElement>('p.notice')).pop()!;
    expect(notice.textContent).toContain('Keine Orte');
    notice.querySelector('button')!.click();
    await harness.fixture.whenStable();
    harness.detectChanges();
    expect(cards(el).length).toBe(2);
  });

  it('Szenario: Typ mit Text und Symbol (VNU-UB-5)', async () => {
    const { el } = await open('/venues');
    const type = cards(el)[0].querySelector('.venue-type') as HTMLElement;
    expect(type.querySelector('[aria-hidden="true"]')?.textContent?.trim().length).toBeGreaterThan(0);
    expect(type.textContent).toMatch(/Museum|Galerie/);
  });

  it('Szenario: Veranstalterfilter zeigt nur Orte mit Ausstellung des Veranstalters (ORG-UB-6)', async () => {
    const { harness, el } = await open('/venues?organizer=photoszene-koeln');
    expect(cards(el).length).toBe(2);
    expect(cards(el).some((c) => c.textContent?.includes('Museum Essen'))).toBeFalse();
    const hint = el.querySelector('#organizer-hint') as HTMLElement;
    expect(hint.textContent).toContain('Gefiltert nach Veranstalter: Photoszene Köln e.V.');
    (hint.querySelector('a') as HTMLElement).click();
    await harness.fixture.whenStable();
    harness.detectChanges();
    expect(cards(el).length).toBe(3);
    expect(el.querySelector('#organizer-hint')).toBeNull();
    expect(TestBed.inject(Router).url).toBe('/venues');
  });

  it('Szenario: Festivalfilter zeigt nur Orte mit Ausstellung des Festivals (FST-UB-5)', async () => {
    const { harness, el } = await open('/venues?festival=photoszene-festival-2026');
    expect(cards(el).length).toBe(2);
    expect(cards(el).some((c) => c.textContent?.includes('Museum Essen'))).toBeFalse();
    const hint = el.querySelector('#festival-hint') as HTMLElement;
    expect(hint.textContent).toContain('Gefiltert nach Festival: Photoszene-Festival 2026');
    (hint.querySelector('a') as HTMLElement).click();
    await harness.fixture.whenStable();
    harness.detectChanges();
    expect(cards(el).length).toBe(3);
    expect(el.querySelector('#festival-hint')).toBeNull();
  });

  it('Szenario: Unbekanntes Festival im Filter – keine Ortskarte, Hinweis (FST-ST-3)', async () => {
    const { el } = await open('/venues?festival=gibt-es-nicht');
    expect(cards(el).length).toBe(0);
    expect(el.querySelector('#festival-hint')?.textContent).toContain('Unbekanntes Festival im Filter: gibt-es-nicht');
  });
});
