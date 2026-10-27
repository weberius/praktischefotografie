// Gherkin: web/veranstalter.feature · „Übersicht der Veranstalter:innen“ (ORG-UB-1)
import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { routes } from '../../app.routes';
import { provideTestData } from '../../testing/test-data';
import { OrganizerListPage } from './organizer-list';

describe('OrganizerListPage', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [provideRouter(routes), ...provideTestData()] });
  });

  it('Szenario: Übersicht der Veranstalter:innen – beide mit Name, Typ und Stadt', async () => {
    const harness = await RouterTestingHarness.create();
    await harness.navigateByUrl('/organizers', OrganizerListPage);
    await harness.fixture.whenStable();
    harness.detectChanges();
    const root = harness.routeNativeElement as HTMLElement;
    expect(root.querySelectorAll('h1').length).toBe(1);
    const items = Array.from(root.querySelectorAll('ul li'));
    expect(items.length).toBe(2);
    expect(items[0].textContent).toContain('Photoszene Köln e.V.');
    expect(items[0].textContent).toContain('Verein');
    expect(items[0].textContent).toContain('Köln');
    expect(items[0].querySelector('a')?.getAttribute('href')).toBe('/organizers/photoszene-koeln');
    expect(items[1].textContent).toContain('Festival ohne Programm');
    expect(items[1].textContent).toContain('Festival');
    expect(items[1].textContent).toContain('Düsseldorf');
  });
});
