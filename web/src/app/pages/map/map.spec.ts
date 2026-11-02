// Gherkin: web/karte.feature (MAP-UB-1, MAP-UB-7, MAP-UB-11, MAP-UB-14, MAP-UB-15), web/filter.feature (FLT-UB-2, FLT-UB-4, FLT-ST-1), web/veranstalter.feature · „Veranstalterfilter in der Karte“ (ORG-UB-6) und web/festivals.feature · „Festivalfilter in Karte und Orten“ (FST-UB-5)
import { Location } from '@angular/common';
import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { routes } from '../../app.routes';
import { provideTestData } from '../../testing/test-data';
import { MapPage } from './map';

async function open(url: string): Promise<{ harness: RouterTestingHarness; root: HTMLElement }> {
  const harness = await RouterTestingHarness.create();
  await harness.navigateByUrl(url, MapPage);
  await harness.fixture.whenStable();
  harness.detectChanges();
  return { harness, root: harness.routeNativeElement as HTMLElement };
}

/** Namen der Orte, die als Marker auf der Karte stehen (Textalternative des Markers ist „Name, Typ“, MAP-UB-12). */
const names = (root: HTMLElement) => Array.from(root.querySelectorAll('.leaflet-marker-icon')).map((e) => (e.getAttribute('title') ?? '').replace(/, [^,]+$/, ''));

function select(root: HTMLElement, label: string): HTMLSelectElement {
  const el = Array.from(root.querySelectorAll('label')).find((l) => l.textContent?.trim().startsWith(label));
  return el?.querySelector('select') as HTMLSelectElement;
}

function choose(root: HTMLElement, label: string, value: string): void {
  const s = select(root, label);
  s.value = value;
  s.dispatchEvent(new Event('change'));
}

function toggle(root: HTMLElement, label: string): void {
  const l = Array.from(root.querySelectorAll('app-global-filter label')).find((x) => x.textContent?.trim() === label);
  (l?.querySelector('input') as HTMLInputElement).click();
}

async function until(condition: () => boolean, harness: RouterTestingHarness): Promise<void> {
  // Die Karte startet erst, wenn sie sichtbar wird; je nach Browser und Fenstergröße liegt sie sonst außerhalb des Sichtbereichs.
  (harness.routeNativeElement as HTMLElement).querySelector('app-venue-map')?.scrollIntoView();
  for (let i = 0; i < 150 && !condition(); i++) {
    await new Promise((r) => setTimeout(r, 25));
    harness.detectChanges();
  }
  expect(condition()).toBeTrue();
}

describe('MapPage', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [provideRouter(routes), ...provideTestData()] });
  });

  it('Szenario: Karte zeigt alle Orte – drei Marker', async () => {
    const { harness, root } = await open('/map');
    expect(root.querySelectorAll('h1').length).toBe(1);
    // Die Karte startet erst, wenn sie sichtbar wird (Seitenstart ohne Leaflet-Last).
    root.querySelector('app-venue-map')?.scrollIntoView();
    await until(() => root.querySelectorAll('.leaflet-marker-icon').length === 3, harness);
    harness.detectChanges();
  });

  it('Szenario: Karte ohne Ortsliste – drei Marker, keine Liste der Orte (MAP-UB-7)', async () => {
    const { harness, root } = await open('/map');
    await until(() => root.querySelectorAll('.leaflet-marker-icon').length === 3, harness);
    expect(root.querySelector('ul.card-list')).toBeNull();
    expect(root.querySelector('#list-heading')).toBeNull();
    expect(root.querySelector('a[href^="/venues/"]')).toBeNull();
    expect(root.querySelectorAll('h1').length).toBe(1);
  });

  it('Szenario: Link zur Ortsliste mit Filtern – Veranstalter und Festival gehen in den Link ein (MAP-UB-15)', async () => {
    const { root } = await open('/map?organizer=photoszene-koeln&festival=photoszene-festival-2026');
    const link = root.querySelector('a.list-link') as HTMLAnchorElement;
    expect(link.textContent?.trim()).toBe('Orte als Liste anzeigen');
    expect(link.getAttribute('href')).toBe('/venues?organizer=photoszene-koeln&festival=photoszene-festival-2026');
  });

  it('Szenario: Karte ohne Ortsliste – Seitenbeschreibung und Karten-Beschriftung versprechen keine Liste auf der Seite (MAP-UB-7)', async () => {
    const { root } = await open('/map');
    const description = document.querySelector('meta[name=description]')?.getAttribute('content') ?? '';
    expect(description).toContain('Karte der Foto-Orte');
    expect(description).not.toMatch(/Karte und Liste/);
    const label = root.querySelector('app-venue-map [role="region"]')?.getAttribute('aria-label') ?? '';
    expect(label).not.toContain('auch in der Liste');
    expect(label).toContain('Ortsliste');
  });

  it('Szenario: Link zur Ortsliste mit Filtern – ohne Filter führt er auf /venues (MAP-UB-15)', async () => {
    const { root } = await open('/map');
    expect(root.querySelector('a.list-link')?.getAttribute('href')).toBe('/venues');
  });

  it('Szenario: Link zur Ortsliste mit Filtern – folgt dem geänderten Veranstalter (MAP-UB-15)', async () => {
    const { harness, root } = await open('/map');
    choose(root, 'Veranstalter', 'photoszene-koeln');
    await harness.fixture.whenStable();
    harness.detectChanges();
    expect(root.querySelector('a.list-link')?.getAttribute('href')).toBe('/venues?organizer=photoszene-koeln');
  });

  it('Szenario: Legende der Ortstypen – steht bei der Karte und nennt alle fünf Typen, auch wenn die Filter nur einen Teil zeigen (MAP-UB-11)', async () => {
    const { root } = await open('/map');
    toggle(root, 'Museum');
    const legend = root.querySelector('app-venue-legend') as HTMLElement;
    expect(legend).not.toBeNull();
    expect(Array.from(legend.querySelectorAll('li')).map((li) => li.textContent?.trim())).toEqual(['Museum', 'Galerie', 'Stiftung', 'Off-Space', 'Bibliothek / Archiv']);
    const map = root.querySelector('app-venue-map') as HTMLElement;
    expect(legend.compareDocumentPosition(map) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
  });

  it('Szenario: Karte nur im Browser – Link zur Ortsliste steht im Template, nicht erst nach dem Start der Karte (MAP-UB-13)', async () => {
    const { root } = await open('/map');
    // Der Link gehört nicht zur Karte; er ist beim Vorabrendern vorhanden, auch wenn Leaflet nie startet.
    expect(root.querySelector('app-venue-map a.list-link')).toBeNull();
    expect(root.querySelector('a.list-link')).not.toBeNull();
  });

  it('Szenario: Filter gilt auf allen filterbaren Seiten – Typ und Orte wirken auf die Marker (FLT-UB-1, FLT-UB-2)', async () => {
    const { harness, root } = await open('/map');
    await until(() => names(root).length === 3, harness);
    toggle(root, 'Museum');
    await until(() => names(root).length === 2, harness);
    expect(names(root)).toEqual(['Haus Köln Bibliothek', 'Museum Essen']);
    toggle(root, 'Museum Essen');
    await until(() => names(root).length === 1, harness);
    expect(names(root)).toEqual(['Museum Essen']);
  });

  it('Szenario: Der globale Filter steht nicht in der Adresse (FLT-UB-6, ADR-025)', async () => {
    const { harness, root } = await open('/map');
    toggle(root, 'Museum');
    await harness.fixture.whenStable();
    expect(TestBed.inject(Location).path()).toBe('/map');
  });

  it('Szenario: Veranstalter- und Festivalfilter aus der Adresse – altes city und type werden ignoriert (MAP-UB-14)', async () => {
    const { harness, root } = await open('/map?city=Essen&type=gallery&organizer=photoszene-koeln&festival=photoszene-festival-2026');
    expect(select(root, 'Veranstalter').value).toBe('photoszene-koeln');
    expect(select(root, 'Festival').value).toBe('photoszene-festival-2026');
    expect(root.querySelector('#filter-city')).toBeNull();
    await until(() => names(root).length === 2, harness);
  });

  it('Szenario: Kein Treffer – Hinweis und Schaltfläche zum Zurücksetzen (FLT-ST-1)', async () => {
    const { harness, root } = await open('/map?organizer=photoszene-koeln');
    toggle(root, 'Museum Essen');
    harness.detectChanges();
    expect(names(root)).toEqual([]);
    expect(root.querySelector('.notice')?.textContent).toContain('keinen Ort');
    // Der Hinweis steht oberhalb der (leeren) Karte, die Karte bleibt sichtbar.
    const notice = root.querySelector('.notice') as HTMLElement;
    const map = root.querySelector('app-venue-map') as HTMLElement;
    expect(notice.compareDocumentPosition(map) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
    notice.querySelector('button')!.click();
    await harness.fixture.whenStable();
    harness.detectChanges();
    await until(() => names(root).length === 3, harness);
    expect(TestBed.inject(Location).path()).toBe('/map');
  });

  it('Szenario: Festivalfilter in Karte und Orten – nur die zwei Orte des Festivals auf der Karte (FST-UB-5)', async () => {
    const { harness, root } = await open('/map?festival=photoszene-festival-2026');
    expect(select(root, 'Festival').value).toBe('photoszene-festival-2026');
    await until(() => names(root).length === 2, harness);
    expect(names(root)).toEqual(['Haus Köln Bibliothek', 'Galerie Köln']);
  });

  it('Szenario: Veranstalterfilter in der Karte – nur die zwei Orte über die Festivals des Veranstalters (ORG-UB-6)', async () => {
    const { harness, root } = await open('/map?organizer=photoszene-koeln');
    expect(select(root, 'Veranstalter').value).toBe('photoszene-koeln');
    await until(() => names(root).length === 2, harness);
    expect(names(root)).toEqual(['Haus Köln Bibliothek', 'Galerie Köln']);
  });
});
