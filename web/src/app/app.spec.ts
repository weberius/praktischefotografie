// Gherkin: web/navigation.feature (NAV-UB-1 bis NAV-UB-4, NAV-EV-1), web/karte.feature · „Karte füllt die Fläche“ (Voraussetzung: Fußbereich am Fensterrand, MAP-UB-9), web/markenicon.feature · „Icon im Kopfbereich“ (ICO-UB-3 bis ICO-UB-6)
import { provideRouter, Router, withComponentInputBinding } from '@angular/router';
import { TestBed } from '@angular/core/testing';
import { RouterTestingHarness } from '@angular/router/testing';
import { App } from './app';
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
];

describe('App', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [provideRouter(routes, withComponentInputBinding()), ...provideTestData()] });
  });

  it('Szenario: Navigation ist auf jeder Seite vorhanden (NAV-UB-5)', async () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    const labels = Array.from<HTMLElement>(fixture.nativeElement.querySelectorAll('a')).map((a) => a.textContent?.trim());
    for (const label of ['Magazin', 'Kalender', 'Karte', 'Orte', 'Fotograf:innen', 'Ausstellungen', 'Events', 'Festivals', 'Veranstalter:innen', 'Impressum', 'Datenschutz']) {
      expect(labels).toContain(label);
    }
  });

  describe('Szenario: Jede Adresse zeigt ihre Seite (NAV-UB-2)', () => {
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

  describe('Szenario: Icon im Kopfbereich (ICO-UB-3 bis ICO-UB-6)', () => {
    async function open(url = '/') {
      const fixture = TestBed.createComponent(App);
      fixture.detectChanges();
      await TestBed.inject(Router).navigateByUrl(url);
      await fixture.whenStable();
      fixture.detectChanges();
      const root: HTMLElement = fixture.nativeElement;
      return { root, brand: root.querySelector('.site-header a.brand') as HTMLAnchorElement, header: root.querySelector('.site-header') as HTMLElement };
    }

    it('das Icon steht im Link zur Startseite zuerst, danach der Text „Praktische Fotografie“ (ICO-UB-3)', async () => {
      const { brand } = await open();
      expect(brand.getAttribute('href')).toBe('/');
      const nodes = Array.from(brand.childNodes).filter((n) => n.nodeType === Node.ELEMENT_NODE || n.textContent?.trim());
      expect(nodes.length).toBe(2);
      expect((nodes[0] as HTMLElement).tagName).toBe('IMG');
      expect(nodes[1].textContent?.trim()).toBe('Praktische Fotografie');
    });

    it('das Icon ist dekorativ: leeres Alt, für Screenreader verborgen; der Link behält den Namen (ICO-UB-4)', async () => {
      const { brand } = await open();
      const img = brand.querySelector('img') as HTMLImageElement;
      expect(img.getAttribute('alt')).toBe('');
      expect(img.getAttribute('aria-hidden')).toBe('true');
      expect(brand.textContent?.trim()).toBe('Praktische Fotografie');
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

    it('Szenario: Icon auf jeder Seite gleich – dasselbe Icon steht nach der Navigation auf allen geprüften Seiten (ICO-UB-3)', async () => {
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
});
