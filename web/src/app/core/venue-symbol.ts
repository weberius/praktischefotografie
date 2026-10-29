import { VENUE_TYPE_INFO, VenueSymbolShape, VenueType } from './models';

/** Weiß der Zeichnung und des Randes um die farbige Scheibe. */
const WHITE = '#fff';

/**
 * Flächenfarben der Karte, auf denen die Symbole liegen: Land der OSM-Standardkarte und Platzhalter vor dem Laden der Kacheln
 * (`.map` in `venue-map.css`, vom Test auf dieselbe Farbe geprüft). Die Typfarben haben zu beiden ≥ 3:1 Kontrast (Q-USE-9).
 */
export const MAP_SURFACE_COLORS = { land: '#f2efe9', placeholder: '#e8e6df' } as const;

/** Weiße Zeichnung der Form auf der farbigen Scheibe (Koordinaten im Feld 32 × 32). `color` sticht Details aus (Türknauf, Buchrücken). */
const GLYPHS: Record<VenueSymbolShape, (color: string) => string> = {
  columns: () =>
    '<path d="M8 13 L16 8 L24 13 Z"/><rect x="9.5" y="14.5" width="3" height="8"/><rect x="14.5" y="14.5" width="3" height="8"/><rect x="19.5" y="14.5" width="3" height="8"/><rect x="8" y="23" width="16" height="2"/>',
  frame: () => `<rect x="9" y="10" width="14" height="12" fill="none" stroke="${WHITE}" stroke-width="2"/><rect x="13" y="14" width="6" height="4"/>`,
  diamond: () => '<path d="M16 7.5 L24.5 16 L16 24.5 L7.5 16 Z"/>',
  door: (color) => `<path d="M11 24 V14 a5 5 0 0 1 10 0 V24 Z"/><circle cx="18.5" cy="19.5" r="1.1" fill="${color}"/>`,
  book: (color) => `<path d="M7.5 11 Q12 9 16 12 Q20 9 24.5 11 V23 Q20 21 16 24 Q12 21 7.5 23 Z"/><path d="M16 12.5 V23" stroke="${color}" stroke-width="1.2" fill="none"/>`,
};

/**
 * SVG-Symbol eines Ortstyps als konstantes Markup (nicht aus Daten gebildet): farbige Scheibe mit weißem Rand und weißer Form.
 * Gemeinsame Quelle für den Karten-Marker und die Legende (MAP-UB-10, MAP-UB-11, ADR-016); der Text steht jeweils außerhalb des Symbols.
 */
export function venueSymbolMarkup(type: VenueType): string {
  const { shape, color } = VENUE_TYPE_INFO[type];
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="100%" height="100%" aria-hidden="true" focusable="false" data-shape="${shape}"><circle cx="16" cy="16" r="14.5" fill="${color}" stroke="${WHITE}" stroke-width="2"/><g fill="${WHITE}">${GLYPHS[shape](color)}</g></svg>`;
}
