// Gherkin: web/fotografinnen.feature (PHO-UB-1, PHO-UB-5)
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

  it('Szenario: Übersicht mit Portrait und Lebensdaten (PHO-UB-5, Q-PERF-6)', async () => {
    TestBed.configureTestingModule({ providers: [provideRouter(routes, withComponentInputBinding()), ...provideTestData()] });
    const harness = await RouterTestingHarness.create();
    await harness.navigateByUrl('/photographers');
    await harness.fixture.whenStable();
    harness.detectChanges();
    const el = harness.routeNativeElement as HTMLElement;
    const cards = Array.from(el.querySelectorAll('ul.card-list > li'));
    const parr = cards.find((c) => c.textContent?.includes('Martin Parr')) as HTMLElement;
    const img = parr.querySelector('img.portrait') as HTMLImageElement;
    expect(img.getAttribute('src')).toBe('portraits/martin-parr.jpg');
    expect(img.getAttribute('alt')).toBe('Martin Parr – Portrait');
    expect(img.getAttribute('loading')).toBe('lazy');
    expect([img.getAttribute('width'), img.getAttribute('height')]).toEqual(['400', '300']);
    expect(parr.textContent).toContain('Fotograf');
    expect(parr.textContent).toContain('* 1952');
    const erwitt = cards.find((c) => c.textContent?.includes('Elliott Erwitt')) as HTMLElement;
    expect(erwitt.querySelector('img')).toBeNull();
    expect(erwitt.textContent).toContain('1928–2023');
    const ohne = cards.find((c) => c.textContent?.includes('Person ohne Ausstellung')) as HTMLElement;
    expect(ohne.querySelector('img')).toBeNull();
    expect(ohne.querySelector('.meta')).toBeNull();
    // Das Portrait einer Karte lässt sich ausblenden, wenn es nicht lädt (PHO-UN-1).
    img.dispatchEvent(new Event('error'));
    harness.detectChanges();
    expect(parr.querySelector('img')).toBeNull();
  });
});
