// Gherkin: web/favoriten.feature · „Umschalter auf Liste, Detail, Ort und Agenda“, „Markieren und Aufheben“, „Zustand gilt über Seiten hinweg“, „Neuladen entfernt Favoriten“
import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { Router, provideRouter, withComponentInputBinding } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { routes } from '../../app.routes';
import { provideTestData } from '../../testing/test-data';
import { FavoriteToggle } from './favorite-toggle';

@Component({
  imports: [FavoriteToggle],
  template: `<app-favorite-toggle eventId="e-talk" eventTitle="Artist Talk" /><app-favorite-toggle eventId="e-workshop" eventTitle="Workshop" />`,
})
class Host {}

const buttons = (el: HTMLElement) => Array.from(el.querySelectorAll<HTMLButtonElement>('app-favorite-toggle button'));
const byName = (el: HTMLElement, title: string) => buttons(el).find((b) => b.querySelector('.visually-hidden')?.textContent?.trim() === `: ${title}`)!;
const pressed = (b: HTMLButtonElement) => b.getAttribute('aria-pressed');

async function open(url: string, requests?: string[]): Promise<{ harness: RouterTestingHarness; el: HTMLElement }> {
  TestBed.configureTestingModule({ providers: [provideRouter(routes, withComponentInputBinding()), ...provideTestData({ requests })] });
  const harness = await RouterTestingHarness.create();
  await harness.navigateByUrl(url);
  return { harness, el: await settle(harness) };
}

async function settle(harness: RouterTestingHarness): Promise<HTMLElement> {
  await new Promise((r) => setTimeout(r));
  harness.detectChanges();
  return harness.routeNativeElement as HTMLElement;
}

describe('FavoriteToggle', () => {
  it('Szenario: Markieren und Aufheben (FAV-EV-1, Q-USE-17)', () => {
    const fixture = TestBed.createComponent(Host);
    fixture.detectChanges();
    const el = fixture.nativeElement as HTMLElement;
    const talk = byName(el, 'Artist Talk');
    expect(talk.type).toBe('button');
    expect([pressed(talk), talk.textContent]).toEqual(['false', jasmine.stringContaining('☆ Favorit merken')]);
    talk.click();
    fixture.detectChanges();
    expect([pressed(talk), talk.textContent]).toEqual(['true', jasmine.stringContaining('★ Favorit gemerkt')]);
    expect(pressed(byName(el, 'Workshop'))).toBe('false');
    talk.click();
    fixture.detectChanges();
    expect(pressed(talk)).toBe('false');
  });

  it('Szenario: Tastaturbedienung (Q-USE-17)', () => {
    const fixture = TestBed.createComponent(Host);
    fixture.detectChanges();
    const el = fixture.nativeElement as HTMLElement;
    // Ein nativer `<button>` ist per Tab erreichbar und löst bei Enter und Leertaste `click` aus.
    expect(buttons(el).every((b) => b.tabIndex === 0 && !b.disabled)).toBeTrue();
  });

  describe('auf den Seiten', () => {
    for (const url of ['/events', '/events/e-talk', '/venues/v-koeln-lib', '/calendar']) {
      it(`Szenario: Umschalter auf ${url} (FAV-UB-5)`, async () => {
        const { el } = await open(url);
        const b = byName(el, 'Artist Talk');
        expect(pressed(b)).toBe('false');
        expect(b.textContent).toContain('Favorit merken');
        expect(buttons(el).every((x) => x.querySelector('.visually-hidden')?.textContent?.startsWith(': '))).toBeTrue();
      });
    }

    it('Szenario: Ausstellungen in Agenda und Ort haben keinen Umschalter (FAV-UB-5)', async () => {
      for (const url of ['/calendar', '/venues/v-koeln-lib']) {
        TestBed.resetTestingModule();
        const { el } = await open(url);
        const exhibitionCards = Array.from(el.querySelectorAll<HTMLElement>('li.card')).filter((li) => li.querySelector('a[href^="/exhibitions/"]'));
        expect(exhibitionCards.length).withContext(url).toBeGreaterThan(0);
        expect(exhibitionCards.every((li) => li.querySelector('app-favorite-toggle') === null)).withContext(url).toBeTrue();
      }
    });

    it('Szenario: Zustand gilt über Seiten hinweg (FAV-UB-2)', async () => {
      const { harness, el } = await open('/events');
      byName(el, 'Artist Talk').click();
      const router = TestBed.inject(Router);
      for (const url of ['/events/e-talk', '/venues/v-koeln-lib', '/calendar']) {
        await router.navigateByUrl(url);
        const page = await settle(harness);
        expect(pressed(byName(page, 'Artist Talk'))).withContext(url).toBe('true');
        const workshop = buttons(page).find((b) => b.textContent?.includes(': Workshop'));
        if (workshop) expect(pressed(workshop)).withContext(url).toBe('false');
      }
    });
  });

  it('Szenario: Neuladen entfernt Favoriten, nichts wird gespeichert oder gesendet (FAV-UB-3, Q-SEC-10)', async () => {
    const requests: string[] = [];
    const watched = [spyOn(window, 'fetch'), spyOn(XMLHttpRequest.prototype, 'open'), spyOn(indexedDB, 'open')];
    const cookies = document.cookie;
    const stored = [localStorage.length, sessionStorage.length];
    const { harness, el } = await open('/events', requests);
    const requestsBefore = requests.length;
    byName(el, 'Artist Talk').click();
    await settle(harness);
    expect(pressed(byName(el, 'Artist Talk'))).toBe('true');
    expect(requests.length).toBe(requestsBefore);
    watched.forEach((spy) => expect(spy).not.toHaveBeenCalled());
    expect(document.cookie).toBe(cookies);
    expect([localStorage.length, sessionStorage.length]).toEqual(stored);

    TestBed.resetTestingModule();
    const fresh = await open('/events');
    expect(pressed(byName(fresh.el, 'Artist Talk'))).toBe('false');
  });
});
