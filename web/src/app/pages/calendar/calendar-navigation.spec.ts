// Gherkin: web/kalender.feature · „Monatsnavigation“, „Beendete sind gekennzeichnet“ (CAL-UB-5, CAL-UB-6, CAL-OP-1)
import { TestBed } from '@angular/core/testing';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { routes } from '../../app.routes';
import { provideTestData } from '../../testing/test-data';

async function open(url: string): Promise<HTMLElement> {
  TestBed.configureTestingModule({ providers: [provideRouter(routes, withComponentInputBinding()), ...provideTestData()] });
  const harness = await RouterTestingHarness.create();
  await harness.navigateByUrl(url);
  await new Promise((r) => setTimeout(r));
  harness.detectChanges();
  return harness.routeNativeElement as HTMLElement;
}

const hrefs = (el: HTMLElement) => Array.from(el.querySelectorAll('nav.month-nav a')).map((a) => a.getAttribute('href'));

describe('Kalender: Navigation und Beendete', () => {
  it('Szenario: Monatsnavigation – Links zum vorherigen und nächsten Monat (CAL-UB-5)', async () => {
    const el = await open('/calendar/2026/11');
    expect(hrefs(el)).toContain('/calendar/2026/10');
    expect(hrefs(el)).toContain('/calendar/2026/12');
  });

  it('Szenario: Monatsnavigation – Jahreswechsel (CAL-UB-5)', async () => {
    expect(hrefs(await open('/calendar/2026/12'))).toContain('/calendar/2027/1');
    TestBed.resetTestingModule();
    expect(hrefs(await open('/calendar/2027/1'))).toContain('/calendar/2026/12');
  });

  it('Szenario: Beendete sind gekennzeichnet (CAL-UB-6)', async () => {
    const el = await open('/calendar?ended=1');
    const ended = Array.from(el.querySelectorAll<HTMLElement>('ol.agenda > li')).filter((li) => li.textContent?.includes('Beendet'));
    const titles = ended.map((li) => li.querySelector('h3')?.textContent?.trim());
    expect(titles).toContain('Ausstellung a-beendet');
    expect(titles).toContain('Lesung');
  });
});
