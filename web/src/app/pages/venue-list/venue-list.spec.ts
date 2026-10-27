// Gherkin: web/orte.feature (VNU-UB-1, VNU-UB-2, VNU-UB-5); web/veranstalter.feature (ORG-UB-4, Filter im Ortsverzeichnis)
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

async function choose(harness: RouterTestingHarness, label: string, value: string): Promise<HTMLElement> {
  const el = harness.routeNativeElement as HTMLElement;
  const select = Array.from(el.querySelectorAll('label')).find((l) => l.textContent?.trim().startsWith(label))?.querySelector('select') as HTMLSelectElement;
  select.value = value;
  select.dispatchEvent(new Event('change'));
  await harness.fixture.whenStable();
  harness.detectChanges();
  return el;
}

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

  it('Szenario: Verzeichnis ist filterbar (VNU-UB-2)', async () => {
    const { harness, el } = await open('/venues');
    expect(el.querySelector('label select')).not.toBeNull();
    await choose(harness, 'Stadt', 'Essen');
    const items = cards(el);
    expect(items.length).toBe(1);
    expect(items[0].textContent).toContain('Museum Essen');
    expect(TestBed.inject(Router).url).toBe('/venues?city=Essen');
  });

  it('Szenario: Filter nach Typ und Filterzustand aus der Adresse (VNU-UB-2)', async () => {
    const { harness, el } = await open('/venues?city=K%C3%B6ln');
    expect(cards(el).length).toBe(2);
    await choose(harness, 'Typ', 'gallery');
    expect(cards(el).length).toBe(1);
    expect(cards(el)[0].textContent).toContain('Galerie Köln');
    expect(TestBed.inject(Router).url).toContain('type=gallery');
  });

  it('Szenario: Typ mit Text und Symbol (VNU-UB-5)', async () => {
    const { el } = await open('/venues');
    const type = cards(el)[0].querySelector('.venue-type') as HTMLElement;
    expect(type.querySelector('[aria-hidden="true"]')?.textContent?.trim().length).toBeGreaterThan(0);
    expect(type.textContent).toMatch(/Museum|Galerie/);
  });

  it('Szenario: Veranstalterfilter zeigt nur Orte mit Ausstellung des Veranstalters (ORG-UB-4)', async () => {
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
});
