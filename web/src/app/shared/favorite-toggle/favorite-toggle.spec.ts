// Gherkin: web/favoriten.feature · „Umschalter auf Liste, Detail und Agenda“, „Markieren und Aufheben“, „Zustand gilt über Seiten hinweg“,
// „Neuladen entfernt Favoriten“, „Eventliste nur mit Favoriten“, „Keine Favoriten“
import { TestBed } from '@angular/core/testing';
import { Router, provideRouter, withComponentInputBinding } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { routes } from '../../app.routes';
import { Favorites } from '../../core/favorites';
import { provideTestData } from '../../testing/test-data';

async function open(url: string): Promise<{ harness: RouterTestingHarness; el: HTMLElement }> {
  TestBed.configureTestingModule({ providers: [provideRouter(routes, withComponentInputBinding()), ...provideTestData()] });
  const harness = await RouterTestingHarness.create();
  await harness.navigateByUrl(url);
  return { harness, el: await settle(harness) };
}

async function settle(harness: RouterTestingHarness): Promise<HTMLElement> {
  await new Promise((r) => setTimeout(r));
  harness.detectChanges();
  return harness.routeNativeElement as HTMLElement;
}

const toggles = (el: HTMLElement) => Array.from(el.querySelectorAll<HTMLButtonElement>('button.favorite-toggle'));
const toggleOf = (el: HTMLElement, title: string) => toggles(el).find((b) => b.textContent?.includes(`: ${title}`))!;
const cardTitles = (el: HTMLElement) => Array.from(el.querySelectorAll('ul.card-list > li h2')).map((h) => h.textContent?.trim());

describe('FavoriteToggle', () => {
  it('Szenario: Umschalter auf Liste, Detail und Agenda (FAV-UB-1)', async () => {
    for (const url of ['/events', '/events/e-talk', '/calendar']) {
      TestBed.resetTestingModule();
      const { el } = await open(url);
      const b = toggleOf(el, 'Artist Talk');
      expect(b.getAttribute('aria-pressed')).toBe('false');
      expect(b.textContent).toContain('Favorit merken');
      if (url === '/calendar') {
        expect(el.querySelectorAll('ol.agenda > li').length).toBeGreaterThan(toggles(el).length);
        expect(toggles(el).length).toBeGreaterThan(0);
      }
    }
  });

  it('Szenario: Markieren und Aufheben (FAV-EV-1)', async () => {
    const { harness, el } = await open('/events');
    toggleOf(el, 'Artist Talk').click();
    await settle(harness);
    expect(toggleOf(el, 'Artist Talk').getAttribute('aria-pressed')).toBe('true');
    expect(toggleOf(el, 'Artist Talk').textContent).toContain('Favorit gemerkt');
    expect(toggleOf(el, 'Workshop').getAttribute('aria-pressed')).toBe('false');
    toggleOf(el, 'Artist Talk').click();
    await settle(harness);
    expect(toggleOf(el, 'Artist Talk').getAttribute('aria-pressed')).toBe('false');
  });

  it('Szenario: Zustand gilt über Seiten hinweg (FAV-UB-2)', async () => {
    const { harness, el } = await open('/events');
    toggleOf(el, 'Artist Talk').click();
    const router = TestBed.inject(Router);
    await router.navigateByUrl('/events/e-talk');
    expect(toggleOf(await settle(harness), 'Artist Talk').getAttribute('aria-pressed')).toBe('true');
    await router.navigateByUrl('/calendar');
    const agenda = await settle(harness);
    expect(toggleOf(agenda, 'Artist Talk').getAttribute('aria-pressed')).toBe('true');
    expect(toggleOf(agenda, 'Workshop').getAttribute('aria-pressed')).toBe('false');
  });

  it('Szenario: Neuladen entfernt Favoriten, nichts wird gespeichert (FAV-UB-3, Q-SEC-10)', async () => {
    const fetchSpy = spyOn(window, 'fetch').and.callThrough();
    const cookies = document.cookie;
    const local = localStorage.length;
    const session = sessionStorage.length;
    const { harness, el } = await open('/events');
    const fetchesBefore = fetchSpy.calls.count();
    toggleOf(el, 'Artist Talk').click();
    await settle(harness);
    expect(fetchSpy.calls.count()).toBe(fetchesBefore);
    expect(document.cookie).toBe(cookies);
    expect(localStorage.length).toBe(local);
    expect(sessionStorage.length).toBe(session);
    expect(TestBed.inject(Favorites).count()).toBe(1);
    TestBed.resetTestingModule();
    const fresh = await open('/events');
    expect(toggleOf(fresh.el, 'Artist Talk').getAttribute('aria-pressed')).toBe('false');
    expect(TestBed.inject(Favorites).count()).toBe(0);
  });

  it('Szenario: Eventliste nur mit Favoriten und Keine Favoriten (FAV-UB-4, FAV-ST-1)', async () => {
    const { harness, el } = await open('/events');
    const only = () => Array.from(el.querySelectorAll<HTMLInputElement>('.filters input[type=checkbox]')).find((i) => i.parentElement?.textContent?.includes('Nur Favoriten'))!;
    only().click();
    expect(await settle(harness)).toBe(el);
    expect(cardTitles(el)).toEqual([]);
    expect(el.querySelector('.notice')?.textContent).toContain('Keine Favoriten');
    only().click();
    await settle(harness);
    toggleOf(el, 'Artist Talk').click();
    only().click();
    await settle(harness);
    expect(cardTitles(el)).toEqual(['Artist Talk']);
    const select = el.querySelector<HTMLSelectElement>('select')!;
    select.value = 'workshop';
    select.dispatchEvent(new Event('change'));
    await harness.fixture.whenStable();
    await settle(harness);
    expect(el.querySelector('.notice')?.textContent).toContain('Keine Favoriten');
  });
});
