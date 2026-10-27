import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { Component, ElementRef, NgZone, OnDestroy, PLATFORM_ID, afterNextRender, effect, inject, input, signal, viewChild } from '@angular/core';
import { Router } from '@angular/router';
import type * as Leaflet from 'leaflet';
import { VENUE_TYPE_INFO, Venue } from '../../core/models';

type LeafletModule = typeof Leaflet;

const ASSET_PATH = 'assets/leaflet/';
const STYLE_ID = 'leaflet-css';
/** Mittelpunkt und Zoom für eine leere Karte (Nordrhein-Westfalen). */
const DEFAULT_VIEW: [number, number] = [51.43, 7.66];

/**
 * Karte der Orte mit Leaflet und OpenStreetMap-Kacheln (MAP-UB-1, MAP-UB-5, MAP-UB-6, ADR-004).
 * Leaflet wird nur im Browser geladen; beim Vorabrendern entsteht nur der leere Container.
 * Das Leaflet-Stylesheet wird als Asset erst mit der Karte nachgeladen und belastet andere Seiten nicht.
 */
@Component({
  selector: 'app-venue-map',
  templateUrl: './venue-map.html',
  styleUrl: './venue-map.css',
})
export class VenueMap implements OnDestroy {
  readonly venues = input.required<Venue[]>();

  private readonly container = viewChild.required<ElementRef<HTMLElement>>('mapContainer');
  private readonly platformId = inject(PLATFORM_ID);
  private readonly document = inject(DOCUMENT);
  private readonly router = inject(Router);
  private readonly zone = inject(NgZone);

  private leaflet?: LeafletModule;
  private destroyed = false;
  private observer?: IntersectionObserver;
  /** Das Leaflet-Kartenobjekt; nur im Browser vorhanden, nach dem Laden von Leaflet. */
  readonly map = signal<Leaflet.Map | null>(null);
  private layer?: Leaflet.LayerGroup;

  /** Anzahl der aktuell dargestellten Marker (auch für Tests). */
  readonly markerCount = signal(0);

  constructor() {
    if (isPlatformBrowser(this.platformId)) {
      afterNextRender(() => this.initWhenVisible());
    }
    effect(() => {
      const map = this.map();
      const venues = this.venues();
      if (map) this.showMarkers(map, venues);
    });
  }

  ngOnDestroy(): void {
    this.destroyed = true;
    this.observer?.disconnect();
    this.map()?.remove();
  }

  /** Startet Leaflet erst, wenn der Kartenbereich sichtbar wird; so belastet die Karte den Seitenstart nicht, solange sie außerhalb des Fensters liegt. */
  private initWhenVisible(): void {
    if (typeof IntersectionObserver === 'undefined') {
      void this.init();
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          observer.disconnect();
          void this.init();
        }
      },
      { rootMargin: '200px' },
    );
    observer.observe(this.container().nativeElement);
    this.observer = observer;
  }

  private async init(): Promise<void> {
    this.loadStyles();
    const L = await import('leaflet');
    if (this.destroyed) return;
    this.leaflet = (L as unknown as { default?: LeafletModule }).default ?? L;
    const leaflet = this.leaflet;
    const map = this.zone.runOutsideAngular(() => {
      const created = leaflet.map(this.container().nativeElement, { center: DEFAULT_VIEW, zoom: 8 });
      leaflet
        .tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
          maxZoom: 19,
          attribution: '© <a href="https://www.openstreetmap.org/copyright" rel="noopener">OpenStreetMap-Mitwirkende</a>',
        })
        .addTo(created);
      return created;
    });
    this.layer = leaflet.layerGroup().addTo(map);
    this.map.set(map);
  }

  /** Bindet das ausgelieferte Leaflet-Stylesheet nur einmal ein (relative URL wegen base-href). */
  private loadStyles(): void {
    if (this.document.getElementById(STYLE_ID)) return;
    const link = this.document.createElement('link');
    link.id = STYLE_ID;
    link.rel = 'stylesheet';
    link.href = `${ASSET_PATH}leaflet.css`;
    this.document.head.appendChild(link);
  }

  private showMarkers(map: Leaflet.Map, venues: Venue[]): void {
    const L = this.leaflet;
    const layer = this.layer;
    if (!L || !layer) return;
    layer.clearLayers();
    const icon = L.icon({
      iconUrl: `${ASSET_PATH}images/marker-icon.png`,
      iconRetinaUrl: `${ASSET_PATH}images/marker-icon-2x.png`,
      shadowUrl: `${ASSET_PATH}images/marker-shadow.png`,
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41],
    });
    for (const venue of venues) {
      L.marker([venue.address.lat, venue.address.lng], { icon, title: venue.name, alt: venue.name })
        .bindPopup(this.popupContent(venue))
        .addTo(layer);
    }
    this.markerCount.set(venues.length);
    if (venues.length > 0) {
      map.fitBounds(L.latLngBounds(venues.map((v) => [v.address.lat, v.address.lng] as [number, number])), { padding: [30, 30], maxZoom: 14 });
    } else {
      map.setView(DEFAULT_VIEW, 8);
    }
  }

  /** Popup aus DOM-Elementen: Name, Typ-Text und Link zur Ortsseite; kein HTML aus Daten. */
  private popupContent(venue: Venue): HTMLElement {
    const root = this.document.createElement('div');
    const name = this.document.createElement('strong');
    name.textContent = venue.name;
    const type = this.document.createElement('p');
    type.textContent = `${VENUE_TYPE_INFO[venue.type].label}, ${venue.city}`;
    type.style.margin = '0.25rem 0';
    const link = this.document.createElement('a');
    link.textContent = 'Zur Ortsseite';
    link.href = `venues/${encodeURIComponent(venue.id)}`;
    link.addEventListener('click', (event) => {
      if (event.button !== 0 || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
      event.preventDefault();
      this.zone.run(() => void this.router.navigate(['/venues', venue.id]));
    });
    root.append(name, type, link);
    return root;
  }
}
