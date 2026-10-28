// Gherkin: web/kalender.feature · „Agenda zeigt Einträge chronologisch“, „Eintrag führt zur Detailseite“,
// „Endet bald in der Agenda“, „Einträge sind als Ausstellung oder Event beschriftet“, „Beendete sind standardmäßig ausgeblendet“,
// „Monatsansicht“, „Keine Einträge in der Auswahl“, „Ungültiger Monat“
import { TestBed } from '@angular/core/testing';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { routes } from '../../app.routes';
import { Dataset } from '../../core/models';
import { provideTestData, TEST_DATASET } from '../../testing/test-data';

async function open(url: string, dataset?: Partial<Dataset>): Promise<{ harness: RouterTestingHarness; el: HTMLElement }> {
  TestBed.configureTestingModule({ providers: [provideRouter(routes, withComponentInputBinding()), ...provideTestData({ dataset })] });
  const harness = await RouterTestingHarness.create();
  await harness.navigateByUrl(url);
  await new Promise((r) => setTimeout(r));
  harness.detectChanges();
  return { harness, el: harness.routeNativeElement as HTMLElement };
}

const entries = (el: HTMLElement) => Array.from(el.querySelectorAll<HTMLElement>('ol.agenda > li'));
const titles = (el: HTMLElement) => entries(el).map((li) => li.querySelector('h3')?.textContent?.trim());

describe('CalendarPage', () => {
  it('Szenario: Agenda zeigt Einträge chronologisch (CAL-UB-1)', async () => {
    const { el } = await open('/calendar');
    expect(el.querySelectorAll('h1').length).toBe(1);
    expect(titles(el)).toEqual([
      'Ausstellung a-endet-bald',
      'Ausstellung a-laufend',
      'Ausstellung f-1',
      'Ausstellung f-2',
      'Artist Talk',
      'Ausstellung a-kommend',
      'Workshop',
      'Beispielmesse',
    ]);
    const first = entries(el)[1];
    expect(first.textContent).toContain('Ausstellung a-laufend');
    expect(first.textContent).toContain('Museum Essen');
    expect(first.textContent).toContain('1. September 2026 – 10. Januar 2027');
  });

  it('Szenario: Eintrag führt zur Detailseite (CAL-UB-2)', async () => {
    const { el } = await open('/calendar');
    const href = (title: string) => entries(el).find((li) => li.querySelector('h3')?.textContent?.trim() === title)?.querySelector('a')?.getAttribute('href');
    expect(href('Ausstellung a-laufend')).toBe('/exhibitions/a-laufend');
    expect(href('Artist Talk')).toBe('/events/e-talk');
  });

  it('Szenario: Endet bald in der Agenda (CAL-UB-3)', async () => {
    const { el } = await open('/calendar');
    const li = entries(el).find((e) => e.textContent?.includes('Ausstellung a-endet-bald'))!;
    expect(li.textContent).toContain('Endet bald');
    const laufend = entries(el).find((e) => e.textContent?.includes('Ausstellung a-laufend'))!;
    expect(laufend.textContent).not.toContain('Endet bald');
  });

  it('Szenario: Einträge tragen Art und Status (CAL-UB-7, BDG-UB-1, BDG-UB-2)', async () => {
    const { el } = await open('/calendar');
    const badges = (title: string) =>
      Array.from(entries(el).find((li) => li.querySelector('h3')?.textContent?.trim() === title)?.querySelectorAll('.badge-row .badge') ?? []).map((b) => b.textContent?.trim());
    // a-laufend: zwei Personen → Gruppenausstellung; kein Statusbadge (laufend)
    expect(badges('Ausstellung a-laufend')).toEqual(['Gruppenausstellung']);
    // a-endet-bald: eine Person → Einzelausstellung, danach Endet bald
    expect(badges('Ausstellung a-endet-bald')).toEqual(['Einzelausstellung', 'Endet bald']);
    expect(badges('Artist Talk')).toEqual(['Event']);
    const kinds = Array.from(el.querySelectorAll('.badge-row .badge.kind')).map((b) => b.textContent?.trim());
    expect(kinds).not.toContain('Ausstellung'); // die allgemeine Beschriftung „Ausstellung“ entfällt
  });

  it('Szenario: Abstand zwischen Badges (BDG-UB-3, Q-USE-7) – 0,25 em in der Agenda', async () => {
    const { el } = await open('/calendar');
    const row = entries(el).find((li) => li.textContent?.includes('Ausstellung a-endet-bald'))!.querySelector('.badge-row') as HTMLElement;
    const style = getComputedStyle(row);
    expect(row.querySelectorAll('.badge').length).toBe(2);
    expect(Math.abs(parseFloat(style.columnGap) - parseFloat(style.fontSize) * 0.25)).toBeLessThan(0.2);
  });

  it('Szenario: Beendete sind standardmäßig ausgeblendet (CAL-OP-1)', async () => {
    const { harness, el } = await open('/calendar');
    expect(titles(el)).toContain('Ausstellung a-kommend');
    expect(titles(el)).not.toContain('Ausstellung a-beendet');
    expect(titles(el)).not.toContain('Lesung');
    const box = el.querySelector<HTMLInputElement>('input[type=checkbox]')!;
    expect(el.querySelector('label')?.textContent).toContain('Beendete anzeigen');
    box.click();
    await harness.fixture.whenStable();
    harness.detectChanges();
    expect(titles(el)).toContain('Ausstellung a-kommend');
    expect(titles(el)).toContain('Ausstellung a-beendet');
    expect(titles(el)).toContain('Lesung');
    expect(el.textContent).toContain('Beendet');
  });

  it('Szenario: Beendete anzeigen aus der Adresse (CAL-OP-1)', async () => {
    const { el } = await open('/calendar?ended=1');
    expect(titles(el)).toContain('Ausstellung a-beendet');
    expect(el.querySelector<HTMLInputElement>('input[type=checkbox]')?.checked).toBeTrue();
  });

  it('Szenario: Monatsansicht (CAL-EV-1)', async () => {
    const dataset: Partial<Dataset> = {
      exhibitions: [{ ...TEST_DATASET.exhibitions[0], id: 'a-1', title: 'Herbstschau', startDate: '2026-10-20', endDate: '2026-11-05' }],
      events: [{ ...TEST_DATASET.events[0], id: 'e-1', title: 'Dezembertalk', startDate: '2026-12-01', endDate: '2026-12-01' }],
    };
    const { el } = await open('/calendar/2026/11', dataset);
    expect(titles(el)).toEqual(['Herbstschau']);
    expect(el.querySelector('h2')?.textContent).toContain('November 2026');
    const links = Array.from(el.querySelectorAll('nav a')).map((a) => a.getAttribute('href'));
    expect(links).toContain('/calendar/2026/10');
    expect(links).toContain('/calendar/2026/12');
  });

  it('Szenario: Monatsansicht zeigt auch beendete Einträge (CAL-EV-1)', async () => {
    const { el } = await open('/calendar/2026/6');
    expect(titles(el)).toContain('Ausstellung a-beendet');
  });

  it('Szenario: Keine Einträge in der Auswahl (CAL-ST-1)', async () => {
    const { el } = await open('/calendar/2030/1');
    expect(entries(el).length).toBe(0);
    expect(el.querySelector('.notice')?.textContent).toContain('keine Einträge');
  });

  it('Szenario: Leere Agenda zeigt einen Hinweis (CAL-ST-1)', async () => {
    const { el } = await open('/calendar', { exhibitions: [], events: [] });
    expect(el.querySelector('.notice')).not.toBeNull();
  });

  describe('Szenario: Ungültiger Monat (CAL-UN-1)', () => {
    for (const url of ['/calendar/2026/13', '/calendar/2026/0', '/calendar/26/5', '/calendar/abcd/5']) {
      it(`${url} zeigt die Hinweisseite`, async () => {
        const { el } = await open(url);
        expect(el.textContent).toContain('nicht gefunden');
        expect(el.querySelector('a[href="/"]')).not.toBeNull();
        expect(document.title).toContain('Nicht gefunden');
      });
    }
  });

  it('setzt Titel und Beschreibung', async () => {
    await open('/calendar/2026/11');
    expect(document.title).toContain('Kalender November 2026');
    expect(document.querySelector('meta[name=description]')?.getAttribute('content')).toContain('November 2026');
  });
});
