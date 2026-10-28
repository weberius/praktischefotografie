// Gherkin: web/karte.feature (MAP-UB-1 bis MAP-UB-4, MAP-EV-1, MAP-UN-1) und web/veranstalter.feature · „Festivalfilter in der Karte“ (ORG-UB-4)
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

const names = (root: HTMLElement) => Array.from(root.querySelectorAll('ul.card-list h3')).map((e) => e.textContent?.trim());

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
  const l = Array.from(root.querySelectorAll('label')).find((x) => x.textContent?.includes(label));
  (l?.querySelector('input') as HTMLInputElement).click();
}

async function until(condition: () => boolean, harness: RouterTestingHarness): Promise<void> {
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

  it('Szenario: Listenalternative – Liste mit denselben drei Orten, Typ als Text, Link zur Ortsseite', async () => {
    const { root } = await open('/map');
    expect(names(root)).toEqual(['Haus Köln Bibliothek', 'Galerie Köln', 'Museum Essen']);
    const first = root.querySelector('ul.card-list li') as HTMLElement;
    expect(first.textContent).toContain('Museum');
    expect(first.textContent).toContain('Köln');
    expect(first.querySelector('a')?.getAttribute('href')).toBe('/venues/v-koeln-lib');
  });

  it('Szenario: Filter wirken kombiniert – Köln und Präsenzbibliothek; Karte und Liste gleich', async () => {
    const { harness, root } = await open('/map');
    choose(root, 'Stadt', 'Köln');
    await harness.fixture.whenStable();
    harness.detectChanges();
    expect(names(root)).toEqual(['Haus Köln Bibliothek', 'Galerie Köln']);
    toggle(root, 'Hat Präsenzbibliothek');
    await harness.fixture.whenStable();
    harness.detectChanges();
    expect(names(root)).toEqual(['Haus Köln Bibliothek']);
    await until(() => root.querySelectorAll('.leaflet-marker-icon').length === 1, harness);
  });

  it('Szenario: Filterzustand in der Adresse – city=Köln', async () => {
    const { harness, root } = await open('/map');
    choose(root, 'Stadt', 'Köln');
    await harness.fixture.whenStable();
    expect(TestBed.inject(Location).path()).toContain('city=K%C3%B6ln');
    toggle(root, 'Ständige Sammlung');
    await harness.fixture.whenStable();
    expect(TestBed.inject(Location).path()).toContain('collection=1');
  });

  it('Szenario: Filter aus der Adresse – Stadt Essen und Typ museum vorbelegt', async () => {
    const { root } = await open('/map?city=Essen&type=museum');
    expect(select(root, 'Stadt').value).toBe('Essen');
    expect(select(root, 'Typ').value).toBe('museum');
    expect(names(root)).toEqual(['Museum Essen']);
  });

  it('Szenario: Kein Treffer – Hinweis und Schaltfläche zum Zurücksetzen', async () => {
    const { harness, root } = await open('/map?city=Essen&type=gallery');
    expect(names(root)).toEqual([]);
    expect(root.querySelector('.notice')?.textContent).toContain('keinen Ort');
    const reset = Array.from(root.querySelectorAll('button')).filter((b) => b.textContent?.trim() === 'Filter zurücksetzen');
    expect(reset.length).toBe(1);
    reset[0].click();
    await harness.fixture.whenStable();
    harness.detectChanges();
    expect(names(root).length).toBe(3);
    expect(TestBed.inject(Location).path()).toBe('/map');
  });

  it('Szenario: Festivalfilter in Karte und Orten – nur die zwei Orte des Festivals in Karte und Liste (FST-UB-5)', async () => {
    const { harness, root } = await open('/map?festival=photoszene-festival-2026');
    expect(select(root, 'Festival').value).toBe('photoszene-festival-2026');
    expect(names(root)).toEqual(['Haus Köln Bibliothek', 'Galerie Köln']);
    await until(() => root.querySelectorAll('.leaflet-marker-icon').length === 2, harness);
  });

  it('Szenario: Veranstalterfilter in der Karte – nur die zwei Orte über die Festivals des Veranstalters (ORG-UB-6)', async () => {
    const { harness, root } = await open('/map?organizer=photoszene-koeln');
    expect(select(root, 'Veranstalter').value).toBe('photoszene-koeln');
    expect(names(root)).toEqual(['Haus Köln Bibliothek', 'Galerie Köln']);
    await until(() => root.querySelectorAll('.leaflet-marker-icon').length === 2, harness);
  });
});
