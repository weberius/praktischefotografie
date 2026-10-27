// Gherkin: web/karte.feature · „Karte zeigt alle Orte“, „Attribution sichtbar“, „Karte nur im Browser“ (MAP-UB-1, MAP-UB-5, MAP-UB-6)
import { Component, PLATFORM_ID } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
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

  it('Marker-Icons kommen aus den ausgelieferten Assets, nicht von einem CDN', async () => {
    TestBed.configureTestingModule({ providers: [provideRouter([])] });
    const fixture = TestBed.createComponent(Host);
    fixture.detectChanges();
    const map = fixture.debugElement.children[0].componentInstance as VenueMap;
    await until(() => map.markerCount() === 3, () => fixture.detectChanges());
    const src = (fixture.nativeElement.querySelector('.leaflet-marker-icon') as HTMLImageElement).getAttribute('src');
    expect(src).toBe('assets/leaflet/images/marker-icon.png');
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
