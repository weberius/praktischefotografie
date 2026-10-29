import { Component, inject } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { VENUE_TYPES, VENUE_TYPE_INFO } from '../../core/models';
import { venueSymbolMarkup } from '../../core/venue-symbol';

/**
 * Legende der Ortstypen auf der Karte: Symbol, Farbe und Name als Text, immer alle Typen (MAP-UB-11, ADR-016).
 * Symbole und Farben kommen aus `VENUE_TYPE_INFO` und `venueSymbolMarkup`, wie bei den Markern.
 */
@Component({
  selector: 'app-venue-legend',
  templateUrl: './venue-legend.html',
  styleUrl: './venue-legend.css',
})
export class VenueLegend {
  private readonly sanitizer = inject(DomSanitizer);

  protected readonly entries = VENUE_TYPES.map((type) => ({
    label: VENUE_TYPE_INFO[type].label,
    // Das Markup ist eine Konstante aus dem Code (keine Daten); Angular würde das SVG sonst aus dem HTML entfernen.
    symbol: this.sanitizer.bypassSecurityTrustHtml(venueSymbolMarkup(type)),
  }));
}
