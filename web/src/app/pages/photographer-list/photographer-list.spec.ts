// Gherkin: web/fotografinnen.feature (PHO-UB-1)
import { TestBed } from '@angular/core/testing';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { routes } from '../../app.routes';
import { provideTestData } from '../../testing/test-data';

describe('PhotographerListPage', () => {
  it('Szenario: Übersicht alphabetisch (PHO-UB-1)', async () => {
    TestBed.configureTestingModule({
      providers: [
        provideRouter(routes, withComponentInputBinding()),
        ...provideTestData({
          dataset: {
            photographers: [
              { id: 'parr', name: 'Parr' },
              { id: 'erwitt', name: 'Erwitt' },
              { id: 'kalvar', name: 'Kalvar' },
            ],
          },
        }),
      ],
    });
    const harness = await RouterTestingHarness.create();
    await harness.navigateByUrl('/photographers');
    await harness.fixture.whenStable();
    harness.detectChanges();
    const el = harness.routeNativeElement as HTMLElement;
    expect(el.querySelectorAll('h1').length).toBe(1);
    const links = Array.from(el.querySelectorAll('ul li a'));
    expect(links.map((a) => a.textContent?.trim())).toEqual(['Erwitt', 'Kalvar', 'Parr']);
    expect(links[0].getAttribute('href')).toBe('/photographers/erwitt');
  });
});
