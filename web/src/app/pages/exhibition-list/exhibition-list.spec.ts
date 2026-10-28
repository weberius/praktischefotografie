// Gherkin: web/ausstellungen.feature (EXH-UB-1, EXH-UB-3, EXH-UB-6)
import { TestBed } from '@angular/core/testing';
import { provideRouter, withComponentInputBinding, Router } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { routes } from '../../app.routes';
import { TEST_DATASET, provideTestData } from '../../testing/test-data';

async function open(url: string): Promise<{ harness: RouterTestingHarness; el: HTMLElement }> {
  const harness = await RouterTestingHarness.create();
  await harness.navigateByUrl(url);
  await harness.fixture.whenStable();
  harness.detectChanges();
  return { harness, el: harness.routeNativeElement as HTMLElement };
}

const cards = (el: HTMLElement) => Array.from(el.querySelectorAll<HTMLElement>('ul.card-list > li'));

describe('ExhibitionListPage', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideRouter(routes, withComponentInputBinding()),
        ...provideTestData({ dataset: { exhibitions: TEST_DATASET.exhibitions.filter((e) => ['a-kommend', 'a-endet-bald', 'a-beendet'].includes(e.id)) } }),
      ],
    });
  });

  it('Szenario: Liste zeigt Ausstellungen mit Status (EXH-UB-1, EXH-UB-6)', async () => {
    const { el } = await open('/exhibitions');
    expect(el.querySelectorAll('h1').length).toBe(1);
    const items = cards(el);
    expect(items.length).toBe(3);
    // Sortierung nach Beginn absteigend
    expect(items.map((i) => i.querySelector('h2')?.textContent?.trim())).toEqual(['Ausstellung a-kommend', 'Ausstellung a-endet-bald', 'Ausstellung a-beendet']);
    const soon = items[1];
    expect(soon.textContent).toContain('Haus Köln Bibliothek');
    expect(soon.querySelector('a[href="/venues/v-koeln-lib"]')).not.toBeNull();
    expect(soon.textContent).toContain('15. August 2026 – 5. November 2026');
    expect(soon.textContent).toContain('Endet bald');
    expect(items[0].textContent).toContain('Kommend');
    expect(items[2].textContent).toContain('Beendet');
  });

  it('Szenario: Badges oben in der Liste (EXH-UB-8, BDG-UB-2) – zuerst die Art, danach der Status, vor der Überschrift', async () => {
    const { el } = await open('/exhibitions');
    const items = cards(el);
    for (const item of items) {
      const children = Array.from(item.children).map((c) => c.tagName.toLowerCase());
      expect(children[0]).toBe('app-exhibition-badges');
      expect(children[1]).toBe('h2');
    }
    const badges = (i: Element) => Array.from(i.querySelectorAll('.badge-row .badge')).map((b) => b.textContent?.trim());
    expect(badges(items[0])).toEqual(['Einzelausstellung', 'Kommend']);
    expect(badges(items[1])).toEqual(['Einzelausstellung', 'Endet bald']);
    expect(badges(items[2])).toEqual(['Einzelausstellung', 'Beendet']);
  });

  it('Szenario: Liste ist nach Status filterbar (EXH-UB-3)', async () => {
    const { harness, el } = await open('/exhibitions');
    const select = el.querySelector('select') as HTMLSelectElement;
    expect(el.querySelector('label')?.textContent).toContain('Status');
    expect(Array.from(select.options).map((o) => o.textContent?.trim())).toEqual(['Alle', 'Kommend', 'Endet bald', 'Laufend', 'Beendet']);
    select.value = 'kommend';
    select.dispatchEvent(new Event('change'));
    await harness.fixture.whenStable();
    harness.detectChanges();
    expect(cards(el).length).toBe(1);
    expect(cards(el)[0].textContent).toContain('Ausstellung a-kommend');
    expect(TestBed.inject(Router).url).toBe('/exhibitions?status=kommend');
  });

  it('Filterzustand wird aus der Adresse gelesen (EXH-UB-3)', async () => {
    const { el } = await open('/exhibitions?status=beendet');
    expect(cards(el).length).toBe(1);
    expect((el.querySelector('select') as HTMLSelectElement).value).toBe('beendet');
  });

  it('Szenario: Status als Text (EXH-UB-6)', async () => {
    const { el } = await open('/exhibitions');
    expect(el.querySelector('.badge.status-endet-bald')?.textContent?.trim()).toBe('Endet bald');
  });
});
