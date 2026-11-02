// Gherkin: web/filter.feature · „Filter gilt auf allen filterbaren Seiten“, „Filter bleibt beim Seitenwechsel“,
// „Globaler und lokaler Filter wirken gemeinsam“, „Kein Treffer“, „Einträge ohne bekannten Ort“
import { TestBed } from '@angular/core/testing';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { routes } from '../../app.routes';
import { Favorites } from '../../core/favorites';
import { GlobalFilter } from '../../core/global-filter';
import { provideTestData, TEST_DATASET } from '../../testing/test-data';

async function open(harness: RouterTestingHarness, url: string): Promise<HTMLElement> {
  await harness.navigateByUrl(url);
  await new Promise((r) => setTimeout(r));
  harness.detectChanges();
  return harness.routeNativeElement as HTMLElement;
}

const cards = (el: HTMLElement) => Array.from(el.querySelectorAll<HTMLElement>('ul.card-list > li, ol.card-list > li'));
const headings = (el: HTMLElement) => cards(el).map((li) => li.querySelector('h2, h3')!.textContent!.trim());

describe('Globaler Filter auf den Seiten', () => {
  const unknownVenueEvent = { ...TEST_DATASET.events[0], id: 'e-ohne-ort', title: 'Event ohne Ort', venueId: 'gibt-es-nicht', startDate: '2026-11-15', endDate: '2026-11-15' };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideRouter(routes, withComponentInputBinding()), ...provideTestData({ dataset: { events: [...TEST_DATASET.events, unknownVenueEvent] } })],
    });
  });

  it('Szenario: Filter bleibt beim Seitenwechsel und gilt auf Events, Ausstellungen und Agenda (FLT-UB-2, FLT-UB-3)', async () => {
    const harness = await RouterTestingHarness.create();
    await open(harness, '/events');
    TestBed.inject(GlobalFilter).toggleVenue('v-essen');
    const shown = (el: HTMLElement) => ({
      checked: el.querySelector<HTMLInputElement>('app-global-filter input[type=checkbox]:checked')?.parentElement?.textContent?.trim(),
      status: el.querySelector('app-global-filter .status')?.textContent,
    });
    const events = await open(harness, '/events');
    expect(headings(events)).toEqual(['Beispielmesse']);
    expect(shown(events).checked).toBe('Museum Essen');
    expect(shown(events).status).toContain('Aktiver Filter');
    const exhibitions = await open(harness, '/exhibitions');
    expect(headings(exhibitions)).toEqual(['Ausstellung a-laufend']);
    expect(shown(exhibitions).checked).toBe('Museum Essen');
    const calendar = await open(harness, '/calendar');
    expect(headings(calendar)).toEqual(['Ausstellung a-laufend', 'Beispielmesse']);
    expect(shown(calendar).status).toContain('Aktiver Filter');
    const detail = await open(harness, '/venues/v-koeln-lib');
    expect(detail.textContent).toContain('Artist Talk');
  });

  it('Szenario: Globaler und lokaler Filter wirken gemeinsam (FLT-UB-5)', async () => {
    const harness = await RouterTestingHarness.create();
    TestBed.inject(Favorites).toggle('e-talk');
    TestBed.inject(Favorites).toggle('e-messe');
    TestBed.inject(GlobalFilter).toggleType('gallery');
    expect(headings(await open(harness, '/events?favorites=1'))).toEqual([]);
    TestBed.inject(GlobalFilter).toggleType('gallery');
    TestBed.inject(GlobalFilter).toggleType('museum');
    expect(headings(await open(harness, '/events?favorites=1'))).toEqual(['Artist Talk', 'Beispielmesse']);
    expect(headings(await open(harness, '/events?favorites=1&type=talk'))).toEqual(['Artist Talk']);
  });

  it('Szenario: Einträge ohne bekannten Ort (FLT-UN-1)', async () => {
    const harness = await RouterTestingHarness.create();
    expect(headings(await open(harness, '/events'))).toContain('Event ohne Ort');
    TestBed.inject(GlobalFilter).toggleType('museum');
    expect(headings(await open(harness, '/events'))).not.toContain('Event ohne Ort');
  });

  it('Szenario: Kein Treffer (FLT-ST-1): Hinweis und Zurücksetzen auf Events, Ausstellungen und Agenda', async () => {
    const harness = await RouterTestingHarness.create();
    for (const url of ['/events', '/exhibitions', '/calendar']) {
      const filter = TestBed.inject(GlobalFilter);
      filter.reset();
      filter.toggleType('off_space');
      const el = await open(harness, url);
      expect(cards(el).length).toBe(0);
      const notice = el.querySelector<HTMLElement>('p.notice')!;
      expect(notice.textContent).toMatch(/keine/i);
      notice.querySelector('button')!.click();
      harness.detectChanges();
      expect(filter.active()).toBe(false);
      expect(cards(el).length).toBeGreaterThan(0);
    }
  });
});
