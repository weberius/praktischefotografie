// Gherkin: web/events.feature · „Liste zeigt Events“, „Liste ist nach Typ filterbar“, „Kommerzielles Event“, „Beendetes Event“, „Vernissage und Finissage in der Liste“, „Vernissage und Finissage filterbar“, „Vernissage und Finissage in der Detailansicht“, „Führung in der Liste“, „Führung filterbar“, „Führung in der Detailansicht“
import { TestBed } from '@angular/core/testing';
import { Router, provideRouter, withComponentInputBinding } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { routes } from '../../app.routes';
import { Favorites } from '../../core/favorites';
import { Dataset } from '../../core/models';
import { provideTestData, TEST_DATASET } from '../../testing/test-data';

async function open(url: string, dataset?: Partial<Dataset>): Promise<{ harness: RouterTestingHarness; el: HTMLElement }> {
  TestBed.configureTestingModule({ providers: [provideRouter(routes, withComponentInputBinding()), ...provideTestData({ dataset })] });
  const harness = await RouterTestingHarness.create();
  await harness.navigateByUrl(url);
  await new Promise((r) => setTimeout(r));
  harness.detectChanges();
  return { harness, el: harness.routeNativeElement as HTMLElement };
}

const cards = (el: HTMLElement) => Array.from(el.querySelectorAll<HTMLElement>('ul.card-list > li'));
const titles = (el: HTMLElement) => cards(el).map((li) => li.querySelector('h2')?.textContent?.trim());
const baseEvent = TEST_DATASET.events[0];

describe('EventListPage', () => {
  it('Szenario: Liste zeigt Events (EVT-UB-1)', async () => {
    const { el } = await open('/events');
    expect(el.querySelectorAll('h1').length).toBe(1);
    expect(titles(el)).toEqual(['Artist Talk', 'Workshop', 'Beispielmesse']);
    const talk = cards(el)[0];
    expect(talk.textContent).toContain('Talk');
    expect(talk.textContent).toContain('Haus Köln Bibliothek');
    expect(talk.textContent).toContain('12. November 2026');
    expect(cards(el)[2].textContent).toContain('Messe');
    expect(cards(el)[2].textContent).toContain('8. Oktober 2027 – 10. Oktober 2027');
    expect(talk.querySelector('a')?.getAttribute('href')).toBe('/events/e-talk');
  });

  it('Szenario: Liste ist nach Typ filterbar (EVT-UB-2)', async () => {
    const { harness, el } = await open('/events');
    const label = Array.from(el.querySelectorAll('label')).find((l) => l.textContent?.includes('Typ'));
    expect(label?.querySelector('select')).not.toBeNull();
    const select = el.querySelector<HTMLSelectElement>('select')!;
    select.value = 'talk';
    select.dispatchEvent(new Event('change'));
    await harness.fixture.whenStable();
    harness.detectChanges();
    expect(titles(el)).toEqual(['Artist Talk']);
  });

  it('Szenario: Typfilter aus der Adresse (EVT-UB-2)', async () => {
    const { el } = await open('/events?type=workshop');
    expect(titles(el)).toEqual(['Workshop']);
    expect(el.querySelector<HTMLSelectElement>('select')?.value).toBe('workshop');
  });

  it('Szenario: Kommerzielles Event (EVT-OP-1)', async () => {
    const { el } = await open('/events');
    const messe = cards(el).find((li) => li.textContent?.includes('Beispielmesse'))!;
    expect(messe.textContent).toContain('Kommerziell');
    const talk = cards(el).find((li) => li.textContent?.includes('Artist Talk'))!;
    expect(talk.textContent).not.toContain('Kommerziell');
  });

  it('Szenario: Listen zeigen nur Aktuelles (ACT-UB-1, Q-REL-4)', async () => {
    const gestern: Partial<Dataset> = {
      events: [{ ...baseEvent, id: 'e-gestern', title: 'Gestern', startDate: '2026-10-26', endDate: '2026-10-26' }, { ...baseEvent, id: 'e-heute', title: 'Heute', startDate: '2026-10-27', endDate: '2026-10-27' }],
    };
    const { el } = await open('/events', gestern);
    expect(titles(el)).toEqual(['Heute']);
    expect(cards(el)[0].textContent).not.toContain('Beendet');
  });

  it('Szenario: Keine aktuellen Einträge (ACT-ST-1)', async () => {
    const { el } = await open('/events', { events: [{ ...baseEvent, id: 'e-gestern', title: 'Gestern', startDate: '2026-10-26', endDate: '2026-10-26' }] });
    expect(titles(el)).toEqual([]);
    expect(el.querySelector('.notice')).not.toBeNull();
  });

  it('zeigt einen Hinweis ohne Treffer', async () => {
    const { el } = await open('/events', { events: [] });
    expect(el.querySelector('.notice')).not.toBeNull();
  });

  describe('Vernissage und Finissage (EVT-UB-5)', () => {
    const termine = [
      { ...baseEvent, id: 'e-eroeffnung', title: 'Eröffnung: Between', eventType: 'vernissage' as const, startDate: '2026-11-07', endDate: '2026-11-07' },
      { ...baseEvent, id: 'e-finissage', title: 'Finissage: Between', eventType: 'finissage' as const, startDate: '2027-02-19', endDate: '2027-02-19' },
    ];

    it('Szenario: Vernissage und Finissage in der Liste', async () => {
      const { el } = await open('/events', { events: termine });
      const [vernissage, finissage] = cards(el);
      expect(vernissage.querySelector('.badge')?.textContent?.trim()).toBe('Vernissage');
      expect(finissage.querySelector('.badge')?.textContent?.trim()).toBe('Finissage');
    });

    it('Szenario: Vernissage und Finissage filterbar', async () => {
      const { el } = await open('/events?type=finissage', { events: termine });
      expect(titles(el)).toEqual(['Finissage: Between']);
      const options = Array.from(el.querySelectorAll('option')).map((o) => o.textContent?.trim());
      expect(options).toContain('Vernissage');
      expect(options).toContain('Finissage');
    });

    it('Szenario: Vernissage und Finissage in der Detailansicht', async () => {
      const { el } = await open('/events/e-finissage', { events: termine });
      expect(el.querySelector('.badge')?.textContent?.trim()).toBe('Finissage');
    });
  });

  describe('Führung (EVT-UB-6)', () => {
    const events = [
      { ...baseEvent, id: 'e-fuehrung', title: 'Öffentliche Führung', eventType: 'guided_tour' as const, startDate: '2026-11-15', endDate: '2026-11-15' },
      { ...baseEvent, id: 'e-vortrag', title: 'Vortrag', eventType: 'talk' as const, startDate: '2026-11-16', endDate: '2026-11-16' },
    ];

    it('Szenario: Führung in der Liste', async () => {
      const { el } = await open('/events', { events });
      expect(cards(el)[0].querySelector('.badge')?.textContent?.trim()).toBe('Führung');
    });

    it('Szenario: Führung filterbar', async () => {
      const { el } = await open('/events?type=guided_tour', { events });
      expect(titles(el)).toEqual(['Öffentliche Führung']);
      expect(Array.from(el.querySelectorAll('option')).map((o) => o.textContent?.trim())).toContain('Führung');
    });

    it('Szenario: Führung in der Detailansicht', async () => {
      const { el } = await open('/events/e-fuehrung', { events });
      expect(el.querySelector('.badge')?.textContent?.trim()).toBe('Führung');
    });
  });

  describe('Nur Favoriten (FAV-UB-4, FAV-UB-6, FAV-ST-1)', () => {
    it('Szenario: Eventliste nur mit Favoriten, Option steht in der Adresse', async () => {
      const { harness, el } = await open('/events');
      TestBed.inject(Favorites).toggle('e-talk');
      const checkbox = Array.from(el.querySelectorAll<HTMLInputElement>('.filters input[type=checkbox]')).find((i) => i.parentElement?.textContent?.includes('Nur Favoriten'))!;
      checkbox.click();
      await harness.fixture.whenStable();
      harness.detectChanges();
      expect(TestBed.inject(Router).url).toBe('/events?favorites=1');
      expect(titles(el)).toEqual(['Artist Talk']);
    });

    it('Szenario: Option bleibt nach Detailseite und Zurück erhalten (FAV-UB-6)', async () => {
      const { harness, el } = await open('/events?favorites=1');
      TestBed.inject(Favorites).toggle('e-talk');
      harness.detectChanges();
      expect(titles(el)).toEqual(['Artist Talk']);
      const router = TestBed.inject(Router);
      await router.navigateByUrl('/events/e-talk');
      await router.navigateByUrl('/events?favorites=1');
      harness.detectChanges();
      expect(titles(el)).toEqual(['Artist Talk']);
      expect(el.querySelector<HTMLInputElement>('.filters input[type=checkbox]')?.checked).toBeTrue();
    });

    it('Szenario: Keine Favoriten, auch zusammen mit dem Typfilter', async () => {
      const { harness, el } = await open('/events?favorites=1');
      expect(titles(el)).toEqual([]);
      expect(el.querySelectorAll('.notice').length).toBe(1);
      expect(el.querySelector('.notice')?.textContent).toContain('Keine Favoriten');
      TestBed.inject(Favorites).toggle('e-talk');
      await TestBed.inject(Router).navigateByUrl('/events?favorites=1&type=workshop');
      harness.detectChanges();
      expect(el.querySelector('.notice')?.textContent).toContain('Keine Favoriten');
    });
  });
});
