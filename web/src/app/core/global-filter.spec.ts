// Gherkin: web/filter.feature · „Orte und Typen kombinieren“, „Einträge ohne bekannten Ort“, „Neuladen setzt den Filter zurück“
import { TestBed } from '@angular/core/testing';
import { TEST_DATASET } from '../testing/test-data';
import { GlobalFilter } from './global-filter';

const [lib, gal, essen] = TEST_DATASET.venues;

describe('GlobalFilter', () => {
  it('Szenario: Orte und Typen kombinieren (FLT-UB-1)', () => {
    const f = TestBed.inject(GlobalFilter);
    expect([lib, gal, essen].every((v) => f.allows(v))).toBe(true);
    f.toggleVenue(lib.id);
    f.toggleVenue(gal.id);
    expect([lib, gal, essen].filter((v) => f.allows(v))).toEqual([lib, gal]);
    f.toggleType('museum');
    expect([lib, gal, essen].filter((v) => f.allows(v))).toEqual([lib]);
    f.toggleVenue(lib.id);
    f.toggleVenue(gal.id);
    expect([lib, gal, essen].filter((v) => f.allows(v))).toEqual([lib, essen]);
    f.reset();
    expect(f.active()).toBe(false);
  });

  it('Szenario: Einträge ohne bekannten Ort (FLT-UN-1)', () => {
    const f = TestBed.inject(GlobalFilter);
    expect(f.allows(undefined)).toBe(true);
    f.toggleType('gallery');
    expect(f.allows(undefined)).toBe(false);
  });

  it('Szenario: Neuladen setzt den Filter zurück (FLT-UB-6): nichts wird gespeichert oder gesendet', () => {
    const fetchSpy = spyOn(window, 'fetch');
    const xhrSpy = spyOn(XMLHttpRequest.prototype, 'open');
    const cookies = document.cookie;
    const idbSpy = spyOn(indexedDB, 'open');
    TestBed.inject(GlobalFilter).toggleType('museum');
    expect(idbSpy).not.toHaveBeenCalled();
    expect(localStorage.length).toBe(0);
    expect(sessionStorage.length).toBe(0);
    expect(document.cookie).toBe(cookies);
    expect(fetchSpy).not.toHaveBeenCalled();
    expect(xhrSpy).not.toHaveBeenCalled();
    TestBed.resetTestingModule();
    expect(TestBed.inject(GlobalFilter).active()).toBe(false);
  });
});
