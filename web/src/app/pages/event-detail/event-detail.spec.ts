// Gherkin: web/events.feature · „Eventdetail“, „Kommerzielles Event“, „Beendetes Event“; web/navigation.feature · unbekannte ID
import { TestBed } from '@angular/core/testing';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { routes } from '../../app.routes';
import { Dataset } from '../../core/models';
import { provideTestData, TEST_DATASET } from '../../testing/test-data';

async function open(url: string, dataset?: Partial<Dataset>): Promise<HTMLElement> {
  TestBed.configureTestingModule({ providers: [provideRouter(routes, withComponentInputBinding()), ...provideTestData({ dataset })] });
  const harness = await RouterTestingHarness.create();
  await harness.navigateByUrl(url);
  await new Promise((r) => setTimeout(r));
  harness.detectChanges();
  return harness.routeNativeElement as HTMLElement;
}

describe('EventDetailPage', () => {
  it('Szenario: Eventdetail (EVT-UB-3)', async () => {
    const event = { ...TEST_DATASET.events[0], id: 'e-1', title: 'Fotomesse', website: 'https://example.org/e-1', highlights: ['Portfolio-Reviews', 'Vorträge'], description: 'Beschreibungstext.' };
    const el = await open('/events/e-1', { events: [event] });
    expect(el.querySelectorAll('h1').length).toBe(1);
    expect(el.querySelector('h1')?.textContent).toContain('Fotomesse');
    expect(document.title).toContain('Fotomesse');
    expect(el.textContent).toContain('Beschreibungstext.');
    expect(Array.from(el.querySelectorAll('ul li')).map((li) => li.textContent?.trim())).toEqual(['Portfolio-Reviews', 'Vorträge']);
    expect(el.querySelector('a[href="/venues/v-koeln-lib"]')?.textContent).toContain('Haus Köln Bibliothek');
    const web = el.querySelector<HTMLAnchorElement>('a[href="https://example.org/e-1"]')!;
    expect(web.getAttribute('rel')).toContain('noopener');
  });

  it('Szenario: Kommerzielles und beendetes Event (EVT-OP-1, EVT-UB-4)', async () => {
    const el = await open('/events/e-messe');
    expect(el.textContent).toContain('Kommerziell');
    expect(el.textContent).not.toContain('Beendet');
  });

  it('Szenario: Beendetes Event (EVT-UB-4)', async () => {
    const el = await open('/events/e-vergangen');
    expect(el.textContent).toContain('Beendet');
  });

  it('Szenario: Unbekannte ID zeigt die Hinweisseite', async () => {
    const el = await open('/events/unbekannt');
    expect(el.textContent).toContain('nicht gefunden');
    expect(el.querySelector('a[href="/"]')).not.toBeNull();
    expect(document.title).toContain('Nicht gefunden');
  });
});
