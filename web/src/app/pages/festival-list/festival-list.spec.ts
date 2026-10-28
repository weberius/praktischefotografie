// Gherkin: web/festivals.feature · „Übersicht der Festivals“, „Keine Festivals erfasst“ (FST-UB-1, FST-ST-1)
import { TestBed } from '@angular/core/testing';
import { Title } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { routes } from '../../app.routes';
import { provideTestData } from '../../testing/test-data';
import { FestivalListPage } from './festival-list';

async function open(): Promise<HTMLElement> {
  const harness = await RouterTestingHarness.create();
  await harness.navigateByUrl('/festivals', FestivalListPage);
  await harness.fixture.whenStable();
  harness.detectChanges();
  return harness.routeNativeElement as HTMLElement;
}

describe('FestivalListPage', () => {
  it('Szenario: Übersicht der Festivals – Titel, Veranstalter, Zeitraum, Stadt, früher beginnendes zuerst, mit Link', async () => {
    TestBed.configureTestingModule({ providers: [provideRouter(routes), ...provideTestData()] });
    const root = await open();
    expect(root.querySelectorAll('h1').length).toBe(1);
    const items = Array.from(root.querySelectorAll('ul li'));
    expect(items.length).toBe(3);
    expect(items[0].textContent).toContain('Photoszene-Festival 2026');
    expect(items[0].textContent).toContain('Photoszene Köln e.V.');
    expect(items[0].textContent).toContain('1. November 2026 – 15. Dezember 2026');
    expect(items[0].textContent).toContain('Köln');
    expect(items.map((i) => i.querySelector('a')?.getAttribute('href'))).toEqual([
      '/festivals/photoszene-festival-2026',
      '/festivals/photoszene-nachlese-2027',
      '/festivals/festival-ohne-programm',
    ]);
    expect(TestBed.inject(Title).getTitle()).toContain('Festivals');
  });

  it('Szenario: Keine Festivals erfasst – Hinweis', async () => {
    TestBed.configureTestingModule({ providers: [provideRouter(routes), ...provideTestData({ dataset: { festivals: [] } })] });
    const root = await open();
    expect(root.querySelector('.notice')?.textContent).toContain('keine Festivals');
    expect(root.querySelectorAll('ul li').length).toBe(0);
  });
});
