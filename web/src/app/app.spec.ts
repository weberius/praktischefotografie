// Gherkin: web/navigation.feature (NAV-UB-1 bis NAV-UB-4, NAV-EV-1), web/karte.feature · „Karte füllt die Fläche“ (Voraussetzung: Fußbereich am Fensterrand, MAP-UB-9), web/markenicon.feature · „Icon im Kopfbereich“ (ICO-UB-6 bis ICO-UB-8)
import { provideRouter, Router, withComponentInputBinding } from '@angular/router';
import { TestBed } from '@angular/core/testing';
import { RouterTestingHarness } from '@angular/router/testing';
import { App } from './app';
import { HEADER_SCROLL_OFFSET_PX, applyHeaderScrollOffset } from './app.config';
import { ViewportScroller } from '@angular/common';
import { routes } from './app.routes';
import { provideTestData } from './testing/test-data';

const ADDRESSES: [string, string][] = [
  ['/', 'Magazin'],
  ['/calendar', 'Kalender'],
  ['/calendar/2026/11', 'Kalender'],
  ['/map', 'Karte'],
  ['/venues', 'Orte'],
  ['/venues/v-koeln-lib', 'Ort'],
  ['/photographers', 'Fotograf:innen'],
  ['/photographers/martin-parr', 'Fotograf:in'],
  ['/exhibitions', 'Ausstellungen'],
  ['/exhibitions/a-laufend', 'Ausstellung'],
  ['/events', 'Events'],
  ['/events/e-talk', 'Event'],
  ['/festivals', 'Festivals'],
  ['/festivals/photoszene-festival-2026', 'Festival'],
  ['/organizers', 'Veranstalter:innen'],
  ['/organizers/photoszene-koeln', 'Veranstalter:in'],
  ['/posts/willkommen', 'Beitrag'],
  ['/impressum', 'Impressum'],
  ['/datenschutz', 'Datenschutz'],
  ['/haftungsausschluss', 'Haftungsausschluss'],
  ['/quellen', 'Quellen & Lizenzen'],
];

describe('App', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [provideRouter(routes, withComponentInputBinding()), ...provideTestData()] });
  });

  it('Szenario: Navigation ist auf jeder Seite vorhanden (NAV-UB-8)', async () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    const labels = Array.from<HTMLElement>(fixture.nativeElement.querySelectorAll('a')).map((a) => a.textContent?.trim());
    for (const label of ['Magazin', 'Kalender', 'Karte', 'Orte', 'Fotograf:innen', 'Ausstellungen', 'Events', 'Festivals', 'Veranstalter:innen', 'Impressum', 'Haftungsausschluss', 'Datenschutz', 'Quellen & Lizenzen']) {
      expect(labels).toContain(label);
    }
  });

  describe('Szenario: Jede Adresse zeigt ihre Seite (NAV-UB-7)', () => {
    for (const [url, heading] of ADDRESSES) {
      it(`${url} zeigt die Seite „${heading}“`, async () => {
        const harness = await RouterTestingHarness.create();
        await harness.navigateByUrl(url);
        harness.detectChanges();
        expect(TestBed.inject(Router).url).toBe(url);
        expect(harness.routeNativeElement?.querySelector('h1')).not.toBeNull();
      });
    }
  });

  describe('Szenario: Jede Seite hat Titel und Beschreibung (NAV-UB-3)', () => {
    const titles = new Set<string>();
    for (const [url] of ADDRESSES.filter(([u]) => !u.includes('/', 1) || u === '/calendar/2026/11')) {
      it(`${url} hat Titel und Meta-Beschreibung`, async () => {
        const harness = await RouterTestingHarness.create();
        await harness.navigateByUrl(url);
        harness.detectChanges();
        expect(document.title.length).toBeGreaterThan(0);
        expect(document.title).toContain('Praktische Fotografie');
        expect(document.querySelector('meta[name=description]')?.getAttribute('content')?.length).toBeGreaterThan(0);
        titles.add(`${url}|${document.title}`);
      });
    }
  });

  describe('Szenario: Unbekannte Adresse oder ID (NAV-EV-1)', () => {
    for (const url of ['/gibt-es-nicht', '/venues/unbekannt', '/photographers/unbekannt', '/posts/unbekannt', '/exhibitions/unbekannt', '/events/unbekannt', '/festivals/unbekannt', '/organizers/unbekannt']) {
      it(`${url} zeigt die Hinweisseite mit Link zur Startseite`, async () => {
        const harness = await RouterTestingHarness.create();
        await harness.navigateByUrl(url);
        await new Promise((r) => setTimeout(r));
        harness.detectChanges();
        const el = harness.routeNativeElement as HTMLElement;
        expect(el.textContent).toContain('nicht gefunden');
        expect(el.querySelector('a[href="/"]')).not.toBeNull();
      });
    }
  });

  it('Szenario: Datenschutzseite nennt Kartenabruf (NAV-UB-4)', async () => {
    const harness = await RouterTestingHarness.create();
    await harness.navigateByUrl('/datenschutz');
    expect((harness.routeNativeElement as HTMLElement).textContent).toContain('OpenStreetMap');
  });

  it('Szenario: Karte füllt die Fläche – Fußbereich steht auch bei kurzem Inhalt am unteren Fensterrand (MAP-UB-9)', async () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    await TestBed.inject(Router).navigateByUrl('/gibt-es-nicht'); // kurze Seite
    await fixture.whenStable();
    fixture.detectChanges();
    const root: HTMLElement = fixture.nativeElement;
    const main = root.querySelector('main') as HTMLElement;
    const footer = root.querySelector('.site-footer') as HTMLElement;
    expect((main.lastElementChild as HTMLElement).getBoundingClientRect().height).toBeLessThan(window.innerHeight / 2); // Inhalt ist kürzer als das Fenster
    // Der Fußbereich endet am Fensterrand oder darunter, nie darüber.
    expect(footer.getBoundingClientRect().bottom).toBeGreaterThanOrEqual(window.innerHeight - 1);
    // main wächst, der Fußbereich schließt direkt an.
    expect(Math.abs(footer.getBoundingClientRect().top - main.getBoundingClientRect().bottom)).toBeLessThanOrEqual(1);
  });

  describe('Szenario: Karte füllt die Fläche (MAP-UB-9)', () => {
    async function openMap(minHeight?: string) {
      const fixture = TestBed.createComponent(App);
      if (minHeight) (fixture.nativeElement as HTMLElement).style.minHeight = minHeight;
      fixture.detectChanges();
      await TestBed.inject(Router).navigateByUrl('/map');
      await fixture.whenStable();
      fixture.detectChanges();
      const root: HTMLElement = fixture.nativeElement;
      const main = root.querySelector('main') as HTMLElement;
      const map = root.querySelector('app-venue-map .map') as HTMLElement;
      const footer = root.querySelector('.site-footer') as HTMLElement;
      const filters = root.querySelector('form.filters') as HTMLElement;
      const rect = (el: HTMLElement) => el.getBoundingClientRect();
      return { main, map, footer, filters, rect };
    }

    it('Karte beginnt unterhalb der Filterleiste und hat die Breite des Inhaltsbereichs (wie die Karten auf /calendar)', async () => {
      const { main, map, filters, rect } = await openMap();
      const style = getComputedStyle(main);
      const content = rect(main).width - parseFloat(style.paddingLeft) - parseFloat(style.paddingRight);
      expect(Math.abs(rect(map).width - content)).toBeLessThanOrEqual(1);
      expect(Math.abs(rect(map).left - (rect(main).left + parseFloat(style.paddingLeft)))).toBeLessThanOrEqual(1);
      expect(rect(map).top).toBeGreaterThanOrEqual(rect(filters).bottom);
    });

    it('Karte reicht in einem hohen Fenster bis zur Trennlinie oberhalb des Fußbereichs', async () => {
      const { map, footer, rect } = await openMap('1400px');
      expect(Math.abs(rect(map).bottom - rect(footer).top)).toBeLessThanOrEqual(1);
      expect(rect(footer).bottom).toBeGreaterThanOrEqual(1400 - 1);
      expect(rect(map).height).toBeGreaterThan(24 * 16 + 100);
    });

    it('Karte ist in einem kleinen Fenster mindestens 24 rem hoch; der Fußbereich steht darunter', async () => {
      const { map, footer, rect } = await openMap();
      expect(rect(map).height).toBeGreaterThanOrEqual(24 * 16 - 1);
      expect(rect(footer).top).toBeGreaterThanOrEqual(rect(map).bottom - 1);
      expect(Math.abs(rect(footer).top - rect(map).bottom)).toBeLessThanOrEqual(1);
    });
  });

  describe('Szenario: Icon im Kopfbereich (ICO-UB-6 bis ICO-UB-8)', () => {
    async function open(url = '/') {
      const fixture = TestBed.createComponent(App);
      fixture.detectChanges();
      await TestBed.inject(Router).navigateByUrl(url);
      await fixture.whenStable();
      fixture.detectChanges();
      const root: HTMLElement = fixture.nativeElement;
      return { root, brand: root.querySelector('.site-header a.brand') as HTMLAnchorElement, header: root.querySelector('.site-header') as HTMLElement };
    }

    it('das Icon steht im Link zur Startseite zuerst, danach der Text „Zentrum für praktische Fotografie“ (ICO-UB-7)', async () => {
      const { brand } = await open();
      expect(brand.getAttribute('href')).toBe('/');
      const nodes = Array.from(brand.childNodes).filter((n) => n.nodeType === Node.ELEMENT_NODE || n.textContent?.trim());
      expect(nodes.length).toBe(2);
      expect((nodes[0] as HTMLElement).tagName).toBe('IMG');
      expect(nodes[1].textContent?.trim()).toBe('Zentrum für praktische Fotografie');
    });

    it('das Icon ist dekorativ: leeres Alt, für Screenreader verborgen; der Link behält den Namen (ICO-UB-8)', async () => {
      const { brand } = await open();
      const img = brand.querySelector('img') as HTMLImageElement;
      expect(img.getAttribute('alt')).toBe('');
      expect(img.getAttribute('aria-hidden')).toBe('true');
      expect(brand.textContent?.trim()).toBe('Zentrum für praktische Fotografie');
      expect(brand.getAttribute('aria-label')).toBeNull();
    });

    it('der Pfad zum Icon ist relativ zum Basispfad (ICO-UB-5)', async () => {
      const { brand } = await open();
      expect((brand.querySelector('img') as HTMLImageElement).getAttribute('src')).toBe('favicon-96x96.png');
    });

    it('das Icon hat feste Breite und Höhe, die Kopfzeile wird kaum höher (ICO-UB-6)', async () => {
      const { brand, header } = await open();
      const img = brand.querySelector('img') as HTMLImageElement;
      expect(img.getAttribute('width')).toBe('32');
      expect(img.getAttribute('height')).toBe('32');
      const rect = img.getBoundingClientRect();
      expect(Math.round(rect.width)).toBe(32);
      expect(Math.round(rect.height)).toBe(32);
      // Das Icon macht die Kopfzeile höchstens wenige Pixel höher als der reine Text (im schmalen Testfenster bricht die Navigation um).
      const withIcon = header.getBoundingClientRect().height;
      img.style.display = 'none';
      const withoutIcon = header.getBoundingClientRect().height;
      img.style.display = '';
      expect(withIcon - withoutIcon).toBeLessThanOrEqual(8);
      expect(img.getAttribute('loading')).toBeNull();
    });

    it('Szenario: Icon auf jeder Seite gleich – dasselbe Icon steht nach der Navigation auf allen geprüften Seiten (ICO-UB-7)', async () => {
      const sources = new Set<string | null>();
      for (const url of ['/', '/calendar', '/map', '/venues', '/impressum']) {
        TestBed.resetTestingModule();
        TestBed.configureTestingModule({ providers: [provideRouter(routes, withComponentInputBinding()), ...provideTestData()] });
        const { brand } = await open(url);
        sources.add(brand.querySelector('img')?.getAttribute('src') ?? null);
        expect(brand.querySelectorAll('img').length).toBe(1);
      }
      expect(Array.from(sources)).toEqual(['favicon-96x96.png']);
    });
  });
  describe('Szenario: Kopf- und Fußbereich (FRM)', () => {
    async function open(url = '/') {
      const fixture = TestBed.createComponent(App);
      fixture.detectChanges();
      await TestBed.inject(Router).navigateByUrl(url);
      await fixture.whenStable();
      fixture.detectChanges();
      const root: HTMLElement = fixture.nativeElement;
      const q = <T extends HTMLElement>(sel: string) => root.querySelector(sel) as T;
      return { fixture, root, q, button: q<HTMLButtonElement>('.nav-toggle'), nav: q('#main-nav') };
    }
    const visible = (el: HTMLElement) => getComputedStyle(el).display !== 'none';

    it('Navigation steht hinter dem Burger-Menü: Schaltfläche sichtbar, Links nicht sichtbar und nicht erreichbar (FRM-UB-1, FRM-ST-1)', async () => {
      const { button, nav } = await open();
      expect(visible(button)).toBeTrue();
      expect(visible(nav)).toBeFalse(); // display: none nimmt die Links aus Tab-Reihenfolge und Zugänglichkeitsbaum
      expect(nav.querySelectorAll('a').length).toBe(9);
      expect(button.getBoundingClientRect().width).toBeGreaterThanOrEqual(2.5 * 16 - 1);
      expect(button.getBoundingClientRect().height).toBeGreaterThanOrEqual(2.5 * 16 - 1);
    });

    it('die Menü-Schaltfläche sitzt am rechten Rand des Kopfs (FRM-UB-1)', async () => {
      const { button, q } = await open();
      const header = q('.site-header').getBoundingClientRect();
      expect(header.right - button.getBoundingClientRect().right).toBeLessThanOrEqual(1.25 * 16 + 1);
    });

    it('Menü öffnen und schließen: Name, Zustand und Feld in voller Breite unter dem Kopf (FRM-EV-1)', async () => {
      const { fixture, button, nav, q } = await open();
      expect(button.tagName).toBe('BUTTON');
      expect(button.getAttribute('aria-label')).toBe('Menü öffnen');
      expect(button.getAttribute('aria-expanded')).toBe('false');
      expect(button.getAttribute('aria-controls')).toBe('main-nav');
      button.click();
      fixture.detectChanges();
      expect(button.getAttribute('aria-label')).toBe('Menü schließen');
      expect(button.getAttribute('aria-expanded')).toBe('true');
      expect(visible(nav)).toBeTrue();
      const header = q('.site-header').getBoundingClientRect();
      const rect = nav.getBoundingClientRect();
      expect(Math.abs(rect.top - header.bottom)).toBeLessThanOrEqual(1);
      expect(Math.abs(rect.width - header.width)).toBeLessThanOrEqual(1);
      expect(getComputedStyle(nav).position).toBe('absolute');
      button.click();
      fixture.detectChanges();
      expect(visible(nav)).toBeFalse();
    });

    it('Menü schließt nach der Auswahl eines Links (FRM-EV-2)', async () => {
      const { fixture, button, nav } = await open();
      button.click();
      fixture.detectChanges();
      (Array.from(nav.querySelectorAll('a')).find((a) => a.textContent?.trim() === 'Kalender') as HTMLAnchorElement).click();
      await fixture.whenStable();
      fixture.detectChanges();
      expect(TestBed.inject(Router).url).toBe('/calendar');
      expect(visible(nav)).toBeFalse();
      expect(button.getAttribute('aria-expanded')).toBe('false');
    });

    it('Menü schließt auch beim Link der aktuellen Seite (FRM-EV-2)', async () => {
      const { fixture, button, nav } = await open('/calendar');
      button.click();
      fixture.detectChanges();
      expect(visible(nav)).toBeTrue();
      (Array.from(nav.querySelectorAll('a')).find((a) => a.textContent?.trim() === 'Kalender') as HTMLAnchorElement).click();
      await fixture.whenStable();
      fixture.detectChanges();
      expect(TestBed.inject(Router).url).toBe('/calendar');
      expect(visible(nav)).toBeFalse();
      expect(button.getAttribute('aria-expanded')).toBe('false');
    });

    it('das Menüfeld ist scrollbar und überragt das Fenster nicht (FRM-UB-1)', async () => {
      const { fixture, button, nav } = await open();
      button.click();
      fixture.detectChanges();
      expect(getComputedStyle(nav).overflowY).toBe('auto');
      expect(nav.getBoundingClientRect().bottom).toBeLessThanOrEqual(window.innerHeight + 1);
      // Bei einem niedrigen Fenster begrenzt die Höhe das Feld, die Links bleiben durch Scrollen erreichbar.
      nav.style.maxHeight = '150px';
      expect(nav.getBoundingClientRect().height).toBeLessThanOrEqual(150);
      expect(nav.scrollHeight).toBeGreaterThan(nav.clientHeight);
      const last = nav.querySelector('li:last-child a') as HTMLElement;
      last.scrollIntoView();
      expect(nav.scrollTop).toBeGreaterThan(0);
    });

    it('Menü schließt mit Escape und der Fokus liegt auf der Schaltfläche (FRM-EV-3)', async () => {
      const { fixture, button, nav } = await open();
      button.click();
      fixture.detectChanges();
      document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
      fixture.detectChanges();
      expect(visible(nav)).toBeFalse();
      expect(document.activeElement).toBe(button);
    });

    it('Escape ohne geöffnetes Menü ändert nichts (FRM-EV-3)', async () => {
      const { fixture, button } = await open();
      document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
      fixture.detectChanges();
      expect(button.getAttribute('aria-expanded')).toBe('false');
      expect(document.activeElement).not.toBe(button);
    });

    it('der Kopfbereich haftet am oberen Rand (sticky) und liegt über dem Inhalt (FRM-UB-2)', async () => {
      const { q } = await open();
      const style = getComputedStyle(q('.site-header'));
      expect(style.position).toBe('sticky');
      expect(style.top).toBe('0px');
      expect(+style.zIndex).toBeGreaterThan(1000); // über den Leaflet-Ebenen (bis 1000)
    });

    it('der Versatz für Router-Anker wird gesetzt und entspricht `scroll-padding-top` (FRM-UB-5)', () => {
      const scroller = jasmine.createSpyObj<ViewportScroller>('ViewportScroller', ['setOffset']);
      applyHeaderScrollOffset(scroller);
      expect(scroller.setOffset).toHaveBeenCalledOnceWith([0, HEADER_SCROLL_OFFSET_PX]);
      expect(parseFloat(getComputedStyle(document.documentElement).scrollPaddingTop)).toBe(HEADER_SCROLL_OFFSET_PX);
    });

    it('Sprungziele und Fokus liegen unterhalb des Kopfbereichs (FRM-UB-5)', async () => {
      const { q } = await open();
      const padding = parseFloat(getComputedStyle(document.documentElement).scrollPaddingTop);
      expect(padding).toBeGreaterThanOrEqual(q('.site-header').getBoundingClientRect().height);
      expect(+getComputedStyle(q('.skip-link')).zIndex).toBeGreaterThan(+getComputedStyle(q('.site-header')).zIndex);
    });

    it('Fußbereich: Linkzeile Rechtliches in Reihenfolge, darunter die Zeile, mit Trennlinie (FRM-UB-4)', async () => {
      const { q } = await open();
      const footer = q('.site-footer');
      const nav = footer.querySelector('nav[aria-label="Rechtliches"]') as HTMLElement;
      expect(Array.from(nav.querySelectorAll('a')).map((a) => a.textContent?.trim())).toEqual(['Impressum', 'Haftungsausschluss', 'Datenschutz', 'Quellen & Lizenzen']);
      expect(Array.from(nav.querySelectorAll('a')).map((a) => a.getAttribute('href'))).toEqual(['/impressum', '/haftungsausschluss', '/datenschutz', '/quellen']);
      const line = footer.querySelector('p') as HTMLElement;
      expect(line.textContent?.trim()).toBe('Zentrum für Praktische Fotografie · Fokus NRW');
      expect(line.getBoundingClientRect().top).toBeGreaterThanOrEqual(nav.getBoundingClientRect().bottom);
      expect(parseFloat(getComputedStyle(footer).borderTopWidth)).toBeGreaterThan(0);
    });

    it('Fußbereich ist nicht fixiert, scrollt mit dem Inhalt und ist im Inhaltsbereich ausgerichtet (FRM-UB-3)', async () => {
      const { q } = await open('/gibt-es-nicht');
      const footer = q('.site-footer');
      expect(['static', 'relative']).toContain(getComputedStyle(footer).position);
      const main = q('main');
      const filler = document.createElement('div');
      filler.style.height = '3000px';
      main.appendChild(filler);
      expect(footer.getBoundingClientRect().top).toBeGreaterThan(window.innerHeight); // bei langem Inhalt nicht im Bild
      expect(footer.getBoundingClientRect().top - main.getBoundingClientRect().bottom).toBeLessThanOrEqual(1);
      filler.remove();
      const inner = footer.querySelector('.footer-inner') as HTMLElement;
      const style = getComputedStyle(main);
      expect(Math.abs(inner.getBoundingClientRect().left + parseFloat(getComputedStyle(inner).paddingLeft) - (main.getBoundingClientRect().left + parseFloat(style.paddingLeft)))).toBeLessThanOrEqual(1);
    });

    it('der Text im Fußbereich hat einen Kontrast von mindestens 4,5:1 (Q-USE-13)', async () => {
      const { q } = await open();
      const footer = q('.site-footer');
      const rgb = (c: string) => (c.match(/[\d.]+/g) ?? []).slice(0, 3).map(Number);
      const lum = (c: number[]) => { const [r, g, b] = c.map((v) => { const x = v / 255; return x <= 0.03928 ? x / 12.92 : ((x + 0.055) / 1.055) ** 2.4; }); return 0.2126 * r + 0.7152 * g + 0.0722 * b; };
      const text = rgb(getComputedStyle(footer).color);
      const bg = rgb(getComputedStyle(footer).backgroundColor);
      const [hi, lo] = [lum(text), lum(bg)].sort((a, b) => b - a);
      expect((hi + 0.05) / (lo + 0.05)).toBeGreaterThanOrEqual(4.5);
    });
  });

  describe('Szenario: Rechtliche Seiten (RCH)', () => {
    async function text(url: string): Promise<{ el: HTMLElement; text: string }> {
      const harness = await RouterTestingHarness.create();
      await harness.navigateByUrl(url);
      harness.detectChanges();
      const el = harness.routeNativeElement as HTMLElement;
      return { el, text: el.textContent ?? '' };
    }
    const pages = ['/impressum', '/haftungsausschluss', '/datenschutz', '/quellen'];

    it('Impressum nennt den Betreiber ohne Platzhalter (RCH-UB-1)', async () => {
      const { text: t } = await text('/impressum');
      for (const part of ['§ 5 DDG', 'Wolfram Eberius', 'Im Bachfeld 21', '51063 Köln', 'Telefon', 'wolfram@eberius.photography', 'wolfram.eberius.photography', 'Redaktionell verantwortlich', 'Streitbeilegung']) expect(t).toContain(part);
      expect(t).not.toMatch(/\[[^\]]+\]/);
      expect(t).not.toContain('fehlen noch');
    });

    it('Haftungsausschluss hat drei Abschnitte und den Hinweis auf sich ändernde Angaben (RCH-UB-2)', async () => {
      const { el, text: t } = await text('/haftungsausschluss');
      expect(Array.from(el.querySelectorAll('h2')).map((h) => h.textContent?.trim())).toEqual(['Haftung für Inhalte', 'Haftung für Links', 'Urheberrecht']);
      expect(t).toContain('können sich ändern');
    });

    it('Datenschutzerklärung entspricht dem Verhalten der Anwendung (RCH-UB-3)', async () => {
      const { el, text: t } = await text('/datenschutz');
      for (const part of ['keine Cookies', 'GitHub Pages', 'OpenStreetMap', 'Rechte']) expect(t.toLowerCase()).toContain(part.toLowerCase());
      expect(el.querySelector('a[href="/impressum"]')).not.toBeNull();
      expect(t).not.toMatch(/\[[^\]]+\]/);
    });

    it('Quellen und Lizenzen nennen alle Quellen (RCH-UB-4)', async () => {
      const { text: t } = await text('/quellen');
      for (const part of ['Wikipedia', 'Wikimedia Commons', 'Wikidata', 'OpenStreetMap', 'Leaflet', 'Orte und Veranstalter', 'CC BY-SA']) expect(t).toContain(part);
    });

    for (const url of pages) {
      it(`${url}: Überschriften lückenlos, eigener Titel und Beschreibung (Q-USE-14, Q-SEO-2)`, async () => {
        const { el } = await text(url);
        const levels = Array.from(el.querySelectorAll('h1, h2, h3, h4')).map((h) => +h.tagName[1]);
        expect(levels[0]).toBe(1);
        levels.slice(1).forEach((l, i) => expect(l - levels[i]).toBeLessThanOrEqual(1));
        expect(document.title.length).toBeGreaterThan(0);
        expect(document.querySelector('meta[name=description]')?.getAttribute('content')?.length).toBeGreaterThan(20);
      });
    }

    it('die rechtlichen Seiten haben vier verschiedene Titel (Q-SEO-2)', async () => {
      const titles = new Set<string>();
      const harness = await RouterTestingHarness.create();
      for (const url of pages) {
        await harness.navigateByUrl(url);
        harness.detectChanges();
        titles.add(document.title);
      }
      expect(titles.size).toBe(pages.length);
    });

    for (const url of pages) {
      it(`${url}: keine Reste von Klangland (RCH-UB-5), genau eine h1, externe Links mit rel="noopener" (Q-USE-14)`, async () => {
        const { el, text: t } = await text(url);
        for (const word of ['Klangland', 'Open Opus', 'Komponist', 'Favoriten']) expect(t).not.toContain(word);
        expect(el.querySelectorAll('h1').length).toBe(1);
        for (const a of Array.from(el.querySelectorAll('a[href^="http"]'))) expect(a.getAttribute('rel')).toContain('noopener');
      });
    }
  });
});
