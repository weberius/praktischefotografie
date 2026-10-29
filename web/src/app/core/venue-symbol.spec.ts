// Gherkin: web/karte.feature · „Symbol und Farbe je Typ“ (MAP-UB-10), Q-USE-9
import { VENUE_TYPES, VENUE_TYPE_INFO, VENUE_TYPE_OPTIONS } from './models';
import { MAP_SURFACE_COLORS, venueSymbolMarkup } from './venue-symbol';

const TYPES = VENUE_TYPES;
const BACKGROUNDS = Object.values(MAP_SURFACE_COLORS);

function luminance(hex: string): number {
  const [r, g, b] = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255).map((c) => (c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4));
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function contrast(a: string, b: string): number {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
}

describe('Symbole der Ortstypen', () => {
  it('Reihenfolge der Ortstypen steht an einer Stelle: Filter und Legende folgen ihr', () => {
    expect(VENUE_TYPES).toEqual(['museum', 'gallery', 'foundation', 'off_space', 'library_archive']);
    expect(VENUE_TYPE_OPTIONS.map((o) => o.label)).toEqual(['Museum', 'Galerie', 'Stiftung', 'Off-Space', 'Bibliothek / Archiv']);
  });

  it('Szenario: Symbol und Farbe je Typ – fünf Typen, fünf verschiedene Formen und Farben (MAP-UB-10)', () => {
    expect(TYPES.length).toBe(5);
    expect(new Set(TYPES.map((t) => VENUE_TYPE_INFO[t].shape)).size).toBe(5);
    expect(new Set(TYPES.map((t) => VENUE_TYPE_INFO[t].color)).size).toBe(5);
  });

  it('Szenario: Symbol und Farbe je Typ – Säulenbau, Bilderrahmen, Raute, Tür und Buch in den vereinbarten Farben', () => {
    const shapes = Object.fromEntries(TYPES.map((t) => [t, VENUE_TYPE_INFO[t].shape]));
    expect(shapes).toEqual({ museum: 'columns', gallery: 'frame', foundation: 'diamond', off_space: 'door', library_archive: 'book' });
  });

  for (const type of TYPES) {
    it(`Kontrast der Farbe von „${VENUE_TYPE_INFO[type].label}“ zum Kartenhintergrund ≥ 3:1 (Q-USE-9)`, () => {
      for (const background of BACKGROUNDS) expect(contrast(VENUE_TYPE_INFO[type].color, background)).toBeGreaterThanOrEqual(3);
      expect(contrast(VENUE_TYPE_INFO[type].color, '#ffffff')).toBeGreaterThanOrEqual(3);
    });
  }

  it('Symbol als SVG: Farbe des Typs, für Screenreader verborgen, eine eigene Form je Typ, keine externen Dateien (Q-USE-9)', () => {
    const markups = TYPES.map((t) => venueSymbolMarkup(t));
    expect(new Set(markups).size).toBe(5);
    TYPES.forEach((type, i) => {
      expect(markups[i]).toContain(`data-shape="${VENUE_TYPE_INFO[type].shape}"`);
      expect(markups[i]).toContain(VENUE_TYPE_INFO[type].color);
      expect(markups[i]).toContain('aria-hidden="true"');
      expect(markups[i]).not.toMatch(/(href|src)=/);
    });
  });
});
