// Gherkin: web/karte.feature · „Karte zeigt alle Orte“, „Symbol und Farbe je Typ“, „Attribution sichtbar“, „Karte nur im Browser“ (MAP-UB-1, MAP-UB-5, MAP-UB-10, MAP-UB-12, MAP-UB-13)
import { Component, PLATFORM_ID } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { VENUE_TYPES, VENUE_TYPE_INFO, Venue } from '../../core/models';
import { MAP_SURFACE_COLORS } from '../../core/venue-symbol';
import { TEST_DATASET } from '../../testing/test-data';
import { VenueMap } from './venue-map';

@Component({ imports: [VenueMap], template: '<app-venue-map [venues]="venues" />' })
class Host {
  venues = TEST_DATASET.venues;
}

/** Wartet (mit Change Detection), bis Leaflet geladen ist und die Bedingung gilt. */
async function until(condition: () => boolean, tick: () => void): Promise<void> {
  for (let i = 0; i < 150 && !condition(); i++) {
    await new Promise((r) => setTimeout(r, 25));
    tick();
  }
  expect(condition()).toBeTrue();
}

/** Ein Ort je Ortstyp, von Köln bis Bochum verteilt. */
@Component({ imports: [VenueMap], template: '<app-venue-map [venues]="venues" />' })
class AllTypesHost {
  venues: Venue[] = VENUE_TYPES.map((type, i) => ({
    ...TEST_DATASET.venues[0],
    id: `v-${type}`,
    name: `Ort ${VENUE_TYPE_INFO[type].label}`,
    type,
    address: { ...TEST_DATASET.venues[0].address, lat: 51 + i * 0.1, lng: 7 + i * 0.1 },
  }));
}

describe('VenueMap', () => {
  it('Szenario: Karte zeigt alle Orte – drei Orte ergeben drei Marker mit Popup', async () => {
    TestBed.configureTestingModule({ providers: [provideRouter([])] });
    const fixture = TestBed.createComponent(Host);
    fixture.detectChanges();
    const map = fixture.debugElement.children[0].componentInstance as VenueMap;
    await until(() => map.markerCount() === 3, () => fixture.detectChanges());
    fixture.detectChanges();

    const root: HTMLElement = fixture.nativeElement;
    expect(root.querySelectorAll('.leaflet-marker-icon').length).toBe(3);
    expect(root.querySelector('[role="region"]')?.getAttribute('aria-label')).toContain('Karte');

    // Auswahl eines Markers öffnet das Popup mit Name, Typ-Text und Link zur Ortsseite.
    (root.querySelector('.leaflet-marker-icon') as HTMLElement).click();
    const popup = root.querySelector('.leaflet-popup-content') as HTMLElement;
    expect(popup).not.toBeNull();
    expect(popup.textContent).toContain('Haus Köln Bibliothek');
    expect(popup.textContent).toContain('Museum');
    expect(popup.querySelector('a')?.getAttribute('href')).toBe('venues/v-koeln-lib');
  });

  it('Szenario: Symbol und Farbe je Typ – jeder Typ zeigt sein Symbol in seiner Farbe, ohne Bilddatei (MAP-UB-10)', async () => {
    TestBed.configureTestingModule({ providers: [provideRouter([])] });
    const fixture = TestBed.createComponent(AllTypesHost);
    fixture.detectChanges();
    const map = fixture.debugElement.children[0].componentInstance as VenueMap;
    await until(() => map.markerCount() === 5, () => fixture.detectChanges());

    const root: HTMLElement = fixture.nativeElement;
    const markers = Array.from(root.querySelectorAll<HTMLElement>('.leaflet-marker-icon'));
    expect(markers.length).toBe(5);
    expect(root.querySelectorAll('.leaflet-marker-icon img').length).toBe(0);
    const seen = new Set<string>();
    for (const type of VENUE_TYPES) {
      const info = VENUE_TYPE_INFO[type];
      const marker = markers.find((m) => m.getAttribute('title')?.endsWith(`, ${info.label}`)) as HTMLElement;
      expect(marker).withContext(info.label).toBeDefined();
      const svg = marker.querySelector('svg') as SVGElement;
      expect(svg.getAttribute('data-shape')).toBe(info.shape);
      expect(svg.querySelector('circle')?.getAttribute('fill')).toBe(info.color);
      seen.add(`${info.shape}|${info.color}`);
    }
    expect(seen.size).toBe(5);
  });

  it('Szenario: Symbol und Farbe je Typ – der Marker hat „Name, Typ“ als Textalternative und ist per Tastatur erreichbar (MAP-UB-12)', async () => {
    TestBed.configureTestingModule({ providers: [provideRouter([])] });
    const fixture = TestBed.createComponent(Host);
    fixture.detectChanges();
    const map = fixture.debugElement.children[0].componentInstance as VenueMap;
    await until(() => map.markerCount() === 3, () => fixture.detectChanges());
    const markers = Array.from(fixture.nativeElement.querySelectorAll('.leaflet-marker-icon')) as HTMLElement[];
    expect(markers.map((m) => m.getAttribute('title'))).toEqual(['Haus Köln Bibliothek, Museum', 'Galerie Köln, Galerie', 'Museum Essen, Museum']);
    expect(markers.map((m) => m.getAttribute('aria-label'))).toEqual(['Haus Köln Bibliothek, Museum', 'Galerie Köln, Galerie', 'Museum Essen, Museum']);
    expect(markers.every((m) => m.tabIndex === 0)).toBeTrue();
    expect(markers[0].querySelector('svg')?.getAttribute('aria-hidden')).toBe('true');
  });

  it('Szenario: Karte füllt die Fläche – ändert sich die Höhe des Kartenbereichs, passt Leaflet seine Größe an (MAP-UB-9)', async () => {
    TestBed.configureTestingModule({ providers: [provideRouter([])] });
    const fixture = TestBed.createComponent(Host);
    fixture.detectChanges();
    const map = fixture.debugElement.children[0].componentInstance as VenueMap;
    await until(() => map.markerCount() === 3, () => fixture.detectChanges());
    const spy = spyOn(map.map()!, 'invalidateSize').and.callThrough();
    // Ein ResizeObserver meldet beim ersten `observe()` einmal; diese Meldung abwarten und verwerfen, damit nur die Höhenänderung zählt.
    await new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)));
    await new Promise((r) => setTimeout(r, 50));
    spy.calls.reset();
    ((fixture.nativeElement as HTMLElement).querySelector('.map') as HTMLElement).style.height = '600px';
    await until(() => spy.calls.count() > 0, () => fixture.detectChanges());
  });

  it('Der Kartenhintergrund vor dem Laden der Kacheln entspricht der Farbe, gegen die der Symbolkontrast geprüft wird (Q-USE-9)', async () => {
    TestBed.configureTestingModule({ providers: [provideRouter([])] });
    const fixture = TestBed.createComponent(Host);
    fixture.detectChanges();
    const [r, g, b] = [1, 3, 5].map((i) => parseInt(MAP_SURFACE_COLORS.placeholder.slice(i, i + 2), 16));
    expect(getComputedStyle(fixture.nativeElement.querySelector('.map')).backgroundColor).toBe(`rgb(${r}, ${g}, ${b})`);
  });

  it('Szenario: Attribution sichtbar', async () => {
    TestBed.configureTestingModule({ providers: [provideRouter([])] });
    const fixture = TestBed.createComponent(Host);
    fixture.detectChanges();
    const map = fixture.debugElement.children[0].componentInstance as VenueMap;
    await until(() => map.markerCount() === 3, () => fixture.detectChanges());
    const attribution = fixture.nativeElement.querySelector('.leaflet-control-attribution') as HTMLElement;
    expect(attribution.textContent).toContain('© OpenStreetMap-Mitwirkende');
    expect(attribution.querySelector('a[href="https://www.openstreetmap.org/copyright"]')).not.toBeNull();
  });

  it('Szenario: Karte nur im Browser – ohne Browser-Plattform entsteht kein Kartenobjekt', async () => {
    TestBed.configureTestingModule({ providers: [provideRouter([]), { provide: PLATFORM_ID, useValue: 'server' }] });
    const fixture = TestBed.createComponent(Host);
    fixture.detectChanges();
    await new Promise((r) => setTimeout(r, 300));
    fixture.detectChanges();
    const map = fixture.debugElement.children[0].componentInstance as VenueMap;
    expect(map.map()).toBeNull();
    expect(map.markerCount()).toBe(0);
    expect(fixture.nativeElement.querySelector('.leaflet-container')).toBeNull();
  });
});
