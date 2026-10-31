// Gherkin: web/fotografinnen.feature (PHO-UB-3, PHO-UB-6 bis PHO-UB-9, PHO-ST-1, PHO-ST-2, PHO-UN-1)
import { TestBed } from '@angular/core/testing';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { routes } from '../../app.routes';
import { provideTestData } from '../../testing/test-data';

async function open(url: string): Promise<HTMLElement> {
  const harness = await RouterTestingHarness.create();
  await harness.navigateByUrl(url);
  await harness.fixture.whenStable();
  harness.detectChanges();
  return harness.routeNativeElement as HTMLElement;
}

describe('PhotographerDetailPage', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [provideRouter(routes, withComponentInputBinding()), ...provideTestData()] });
  });

  it('Szenario: Personenseite zeigt Stammdaten (PHO-UB-6) – Name, Berufsbezeichnung, Lebensdaten, Kurzbiografie, Website', async () => {
    const el = await open('/photographers/martin-parr');
    expect(el.querySelectorAll('h1').length).toBe(1);
    expect(el.querySelector('h1')?.textContent).toContain('Martin Parr');
    expect(el.querySelector('.profile-head .meta')?.textContent?.replace(/\s+/g, ' ').trim()).toBe('Fotograf, * 1952');
    expect(el.querySelector('a.back-link')?.getAttribute('href')).toBe('/photographers');
    expect(el.textContent).toContain('Britischer Dokumentarfotograf.');
    const site = el.querySelector('a[href="https://example.org/parr"]')!;
    expect(site.getAttribute('rel')).toContain('noopener');
    expect(document.title).toContain('Martin Parr');
  });

  it('Szenario: Portrait mit Bildnachweis (PHO-UB-7, Q-USE-5)', async () => {
    const el = await open('/photographers/martin-parr');
    const img = el.querySelector('figure img.portrait') as HTMLImageElement;
    expect(img.getAttribute('src')).toBe('portraits/martin-parr.jpg');
    expect(img.getAttribute('alt')).toBe('Martin Parr – Portrait');
    expect([img.getAttribute('width'), img.getAttribute('height')]).toEqual(['400', '300']);
    const caption = el.querySelector('figure figcaption') as HTMLElement;
    expect(caption.textContent).toContain('Jane Doe');
    expect(caption.textContent).toContain('CC BY-SA 4.0');
    const commons = caption.querySelector('a[href="https://commons.wikimedia.org/wiki/File:Martin_Parr.jpg"]');
    expect(commons?.getAttribute('rel')).toContain('noopener');
    expect(commons?.getAttribute('target')).toBe('_blank');
    expect(caption.querySelector('a[href="https://creativecommons.org/licenses/by-sa/4.0/"]')).not.toBeNull();
  });

  it('Szenario: Wikipedia-Zusammenfassung mit Quellen (PHO-UB-8)', async () => {
    const el = await open('/photographers/martin-parr');
    const section = el.querySelector('section.wiki-section') as HTMLElement;
    expect(section.querySelector('h2')?.textContent).toBe('Aus der Wikipedia');
    expect(section.textContent).toContain('farbigen, ironischen Alltagsbilder');
    expect(section.textContent).toContain('Zusammenfassung auf Basis der Wikipedia (CC BY-SA)');
    const links = Array.from(section.querySelectorAll('ul.wiki-sources a'));
    expect(links.map((a) => a.getAttribute('href'))).toEqual(['https://de.wikipedia.org/wiki/Martin_Parr', 'https://en.wikipedia.org/wiki/Martin_Parr']);
    expect(links[0].textContent).toContain('Wikipedia (Deutsch)');
    expect(links[1].textContent).toContain('Wikipedia (Englisch)');
    expect(links.every((a) => a.getAttribute('rel')?.includes('noopener'))).toBeTrue();
  });

  it('Szenario: Webkurztext mit Quellen (PHO-UB-11)', async () => {
    const el = await open('/photographers/richard-kalvar');
    const section = el.querySelector('section.web-section') as HTMLElement;
    expect(section.querySelector('h2')?.textContent).toBe('Aus dem Web');
    expect(section.textContent).toContain('Straßenfotografie');
    expect(section.textContent).toContain('frei zugänglichen Webseiten');
    const links = Array.from(section.querySelectorAll('ul.web-sources a'));
    expect(links.map((a) => a.getAttribute('href'))).toEqual(['https://example.org/a', 'https://www.example.com/b']);
    expect(links[0].textContent).toContain('Porträt von Richard Kalvar');
    expect(section.querySelectorAll('li')[0].textContent).toContain('(example.org)');
    expect(section.querySelectorAll('li')[1].textContent).toContain('(www.example.com)');
    expect(links.every((a) => a.getAttribute('target') === '_blank' && a.getAttribute('rel') === 'noopener noreferrer')).toBeTrue();
  });

  it('Szenario: Person ohne Webkurztext (PHO-ST-3) – Wikipedia ja, „Aus dem Web“ nein', async () => {
    const el = await open('/photographers/martin-parr');
    expect(el.querySelector('section.wiki-section:not(.web-section)')).not.toBeNull();
    expect(el.querySelector('section.web-section')).toBeNull();
    expect(el.textContent).not.toContain('Aus dem Web');
  });

  it('Szenario: Person ohne Portrait und Wikipedia (PHO-ST-3) – weder Bild noch Bildnachweis noch Abschnitt', async () => {
    const el = await open('/photographers/elliott-erwitt');
    expect(el.querySelector('figure')).toBeNull();
    expect(el.querySelector('img')).toBeNull();
    expect(el.textContent).not.toContain('Wikimedia Commons');
    expect(el.querySelector('section.wiki-section')).toBeNull();
    expect(el.textContent).not.toContain('Aus der Wikipedia');
    expect(el.textContent).not.toContain('Aus dem Web');
    expect(el.querySelector('.profile-head .meta')?.textContent?.replace(/\s+/g, ' ').trim()).toBe('Fotograf, 1928–2023');
  });

  it('Szenario: Portrait nicht ladbar (PHO-UN-1) – Seite bleibt, ohne Bild und ohne Bildnachweis', async () => {
    const harness = await RouterTestingHarness.create();
    await harness.navigateByUrl('/photographers/martin-parr');
    await harness.fixture.whenStable();
    harness.detectChanges();
    const el = harness.routeNativeElement as HTMLElement;
    (el.querySelector('figure img.portrait') as HTMLImageElement).dispatchEvent(new Event('error'));
    harness.detectChanges();
    expect(el.querySelector('figure')).toBeNull();
    expect(el.textContent).not.toContain('Jane Doe');
    expect(el.querySelector('h1')?.textContent).toContain('Martin Parr');
    expect(el.querySelector('section.wiki-section')).not.toBeNull();
  });

  it('Szenario: Personenseite listet Ausstellungen (PHO-UB-3, PHO-UB-9)', async () => {
    // Elliott Erwitt: a-laufend (Beginn 2026-09-01, Essen) und f-1 (Beginn 2026-11-01, Köln); Reihenfolge nach Beginn absteigend.
    const el = await open('/photographers/elliott-erwitt');
    expect(el.querySelector('h2:last-of-type')?.textContent).toContain('Ausstellungen (2)');
    const items = Array.from(el.querySelectorAll('ul.card-list > li'));
    expect(items.length).toBe(2);
    expect(items[0].textContent).toContain('Ausstellung f-1');
    expect(items[1].textContent).toContain('Ausstellung a-laufend');
    expect(items[1].textContent).toContain('Museum Essen');
    expect(items[1].textContent).toContain('1. September 2026 – 10. Januar 2027');
    expect(items[1].textContent).toContain('Laufend');
    expect(items[1].querySelector('a')?.getAttribute('href')).toBe('/exhibitions/a-laufend');
  });

  it('Szenario: Beendete und laufende Ausstellung erscheinen beide, die neuere zuerst (PHO-UB-3)', async () => {
    TestBed.resetTestingModule();
    TestBed.configureTestingModule({
      providers: [
        provideRouter(routes, withComponentInputBinding()),
        ...provideTestData({
          dataset: {
            exhibitions: [
              { id: 'alt', venueId: 'v-essen', title: 'Alt', startDate: '2026-03-01', endDate: '2026-06-30', type: 'solo', photographerIds: ['martin-parr'] },
              { id: 'neu', venueId: 'v-essen', title: 'Neu', startDate: '2026-09-01', endDate: '2027-01-10', type: 'solo', photographerIds: ['martin-parr'] },
            ],
          },
        }),
      ],
    });
    const el = await open('/photographers/martin-parr');
    const items = Array.from(el.querySelectorAll('ul.card-list > li'));
    expect(items.map((i) => i.querySelector('h3')?.textContent?.trim())).toEqual(['Neu', 'Alt']);
    expect(items[1].textContent).toContain('Beendet');
  });

  it('Szenario: Person ohne Ausstellung (PHO-ST-1)', async () => {
    const el = await open('/photographers/ohne-ausstellung');
    expect(el.textContent).toContain('Ausstellungen (0)');
    expect(el.querySelector('.notice')?.textContent).toContain('keine Ausstellung');
    expect(el.querySelector('ul.card-list')).toBeNull();
  });

  it('Unbekannte ID zeigt die Hinweisseite (NAV-EV-1)', async () => {
    const el = await open('/photographers/unbekannt');
    expect(el.querySelector('app-not-found')).not.toBeNull();
  });

  it('Szenario: Ausstellungen der Person tragen Badges (PHO-UB-10, BDG-UB-6)', async () => {
    const el = await open('/photographers/elliott-erwitt');
    const cards = Array.from(el.querySelectorAll('ul.card-list > li'));
    const gruppe = cards.find((c) => c.textContent?.includes('Ausstellung a-laufend')) as HTMLElement;
    const einzel = cards.find((c) => c.textContent?.includes('Ausstellung f-1')) as HTMLElement;
    const texts = (c: Element) => Array.from(c.querySelectorAll('.badge-row .badge')).map((b) => b.textContent?.trim());
    expect(texts(gruppe)).toEqual(['Gruppenausstellung', 'Laufend']);
    expect(texts(einzel)).toEqual(['Einzelausstellung', 'Kommend']);
    for (const c of cards) expect(Array.from(c.children).map((x) => x.tagName.toLowerCase()).slice(0, 2)).toEqual(['app-exhibition-badges', 'h3']);
    expect(el.querySelectorAll('app-status-badge').length).toBe(0);
  });
});
