// Gherkin: web/karte.feature · „Legende der Ortstypen“ (MAP-UB-11), Q-USE-9
import { TestBed } from '@angular/core/testing';
import { VENUE_TYPES, VENUE_TYPE_INFO } from '../../core/models';
import { venueSymbolMarkup } from '../../core/venue-symbol';
import { VenueLegend } from './venue-legend';

describe('VenueLegend', () => {
  function render(): HTMLElement {
    const fixture = TestBed.createComponent(VenueLegend);
    fixture.detectChanges();
    return fixture.nativeElement;
  }

  it('Szenario: Legende der Ortstypen – alle fünf Typen nacheinander als Text', () => {
    const items = Array.from(render().querySelectorAll('li'));
    expect(items.map((li) => li.textContent?.trim())).toEqual(['Museum', 'Galerie', 'Stiftung', 'Off-Space', 'Bibliothek / Archiv']);
  });

  it('Szenario: Legende der Ortstypen – jeder Eintrag zeigt dasselbe Symbol in derselben Farbe wie der Marker', () => {
    const items = Array.from(render().querySelectorAll('li'));
    VENUE_TYPES.forEach((type, i) => {
      const svg = items[i].querySelector('svg') as SVGElement;
      expect(svg).withContext(type).not.toBeNull();
      const marker = document.createElement('div');
      marker.innerHTML = venueSymbolMarkup(type);
      expect(svg.innerHTML).toBe(marker.querySelector('svg')?.innerHTML as string); // dieselbe Zeichnung wie der Marker
      expect(svg.getAttribute('data-shape')).toBe(VENUE_TYPE_INFO[type].shape);
      expect(svg.querySelector('circle')?.getAttribute('fill')).toBe(VENUE_TYPE_INFO[type].color);
    });
  });

  it('Szenario: Legende der Ortstypen – Symbole sind für Screenreader verborgen, der Typ steht als Text; die Liste hat einen Namen (Q-USE-9)', () => {
    const root = render();
    expect(root.querySelector('ul')?.getAttribute('aria-label')).toBe('Legende der Ortstypen');
    expect(root.querySelectorAll('svg[aria-hidden="true"]').length).toBe(5);
  });
});
