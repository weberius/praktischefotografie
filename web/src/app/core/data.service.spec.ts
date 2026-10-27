// Gherkin: web/navigation.feature · „Daten nicht ladbar“ (NAV-UN-1)
import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { provideTestData } from '../testing/test-data';
import { DataGate } from '../shared/data-gate/data-gate';
import { DataService } from './data.service';

@Component({ imports: [DataGate], template: '<app-data-gate><p id="inhalt">Inhalt</p></app-data-gate>' })
class Host {}

describe('DataService', () => {
  it('lädt alle Dateien und löst Relationen über IDs auf', () => {
    TestBed.configureTestingModule({ providers: provideTestData() });
    const data = TestBed.inject(DataService);
    expect(data.ready()).toBeTrue();
    expect(data.venues().length).toBe(3);
    expect(data.venueById().get('v-essen')?.city).toBe('Essen');
    expect(data.postBySlug().get('willkommen')?.id).toBe('p-1');
  });

  it('Szenario: Daten nicht ladbar (NAV-UN-1)', () => {
    TestBed.configureTestingModule({ imports: [Host], providers: provideTestData({ failData: true }) });
    const fixture = TestBed.createComponent(Host);
    fixture.detectChanges();
    const el: HTMLElement = fixture.nativeElement;
    expect(TestBed.inject(DataService).error()).toBeTruthy();
    expect(el.querySelector('[role=alert]')).not.toBeNull();
    expect(el.querySelector('button')?.textContent).toContain('Erneut laden');
    expect(el.querySelector('#inhalt')).toBeNull();
  });

  it('zeigt den Inhalt, wenn die Daten geladen sind', () => {
    TestBed.configureTestingModule({ imports: [Host], providers: provideTestData() });
    const fixture = TestBed.createComponent(Host);
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('#inhalt')).not.toBeNull();
  });
});
