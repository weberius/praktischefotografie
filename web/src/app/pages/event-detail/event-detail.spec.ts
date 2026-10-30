// Gherkin: web/events.feature · „Eventdetail“, „Kommerzielles Event“, „Beendetes Event“; web/navigation.feature · unbekannte ID;
// web/kalender-export.feature · „Schaltfläche auf der Eventdetailseite“, „Download der Kalenderdatei“, „Beendetes Event ohne Schaltfläche“, „Nur auf der Eventdetailseite“
import { TestBed } from '@angular/core/testing';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { routes } from '../../app.routes';
import { Dataset } from '../../core/models';
import { provideTestData, TEST_DATASET } from '../../testing/test-data';

async function open(url: string, dataset?: Partial<Dataset>): Promise<HTMLElement> {
  TestBed.configureTestingModule({ providers: [provideRouter(routes, withComponentInputBinding()), ...provideTestData({ dataset })] });
  const harness = await RouterTestingHarness.create();
  await harness.navigateByUrl(url);
  await new Promise((r) => setTimeout(r));
  harness.detectChanges();
  return harness.routeNativeElement as HTMLElement;
}

describe('EventDetailPage', () => {
  it('Szenario: Eventdetail (EVT-UB-3)', async () => {
    const event = { ...TEST_DATASET.events[0], id: 'e-1', title: 'Fotomesse', website: 'https://example.org/e-1', highlights: ['Portfolio-Reviews', 'Vorträge'], description: 'Beschreibungstext.' };
    const el = await open('/events/e-1', { events: [event] });
    expect(el.querySelectorAll('h1').length).toBe(1);
    expect(el.querySelector('h1')?.textContent).toContain('Fotomesse');
    expect(document.title).toContain('Fotomesse');
    expect(el.textContent).toContain('Beschreibungstext.');
    expect(Array.from(el.querySelectorAll('ul li')).map((li) => li.textContent?.trim())).toEqual(['Portfolio-Reviews', 'Vorträge']);
    expect(el.querySelector('a[href="/venues/v-koeln-lib"]')?.textContent).toContain('Haus Köln Bibliothek');
    const web = el.querySelector<HTMLAnchorElement>('a[href="https://example.org/e-1"]')!;
    expect(web.getAttribute('rel')).toContain('noopener');
  });

  it('Szenario: Kommerzielles und beendetes Event (EVT-OP-1, EVT-UB-4)', async () => {
    const el = await open('/events/e-messe');
    expect(el.textContent).toContain('Kommerziell');
    expect(el.textContent).not.toContain('Beendet');
  });

  it('Szenario: Beendetes Event (EVT-UB-4)', async () => {
    const el = await open('/events/e-vergangen');
    expect(el.textContent).toContain('Beendet');
  });

  it('Szenario: Unbekannte ID zeigt die Hinweisseite', async () => {
    const el = await open('/events/unbekannt');
    expect(el.textContent).toContain('nicht gefunden');
    expect(el.querySelector('a[href="/"]')).not.toBeNull();
    expect(document.title).toContain('Nicht gefunden');
  });

  describe('Termin in den Gerätekalender (ICS-*)', () => {
    const LABEL = 'Termin in Geräte-Kalender speichern';
    const button = (el: HTMLElement) => Array.from(el.querySelectorAll('button')).find((b) => b.textContent?.trim() === LABEL);

    it('Szenario: Schaltfläche auf der Eventdetailseite (ICS-UB-1)', async () => {
      const el = await open('/events/e-talk');
      const b = button(el)!;
      expect(b).toBeDefined();
      expect(b.type).toBe('button');
      const hint = el.querySelector<HTMLElement>(`#${b.getAttribute('aria-describedby')}`)!;
      expect(hint.textContent).toContain('Smartphones oder Rechners');
      expect(hint.textContent).toContain('Kalenderdatei');
      expect(hint.textContent).toContain('nicht der Kalender dieser Webseite');
      expect(getComputedStyle(hint).display).not.toBe('none');
    });

    it('Szenario: Download der Kalenderdatei (ICS-EV-1)', async () => {
      const el = await open('/events/e-talk');
      jasmine.clock().install();
      let blob: Blob | undefined;
      spyOn(URL, 'createObjectURL').and.callFake((b: Blob | MediaSource) => {
        blob = b as Blob;
        return 'blob:test';
      });
      const revoke = spyOn(URL, 'revokeObjectURL');
      let download = '';
      spyOn(HTMLAnchorElement.prototype, 'click').and.callFake(function (this: HTMLAnchorElement) {
        download = this.download;
      });
      const fetchSpy = spyOn(window, 'fetch');
      const xhrSpy = spyOn(XMLHttpRequest.prototype, 'open');
      button(el)!.click();
      expect(download).toBe('e-talk.ics');
      expect(blob?.type).toBe('text/calendar;charset=utf-8');
      expect(revoke).not.toHaveBeenCalled(); // der Download darf die Adresse noch brauchen
      jasmine.clock().tick(9_999);
      expect(revoke).not.toHaveBeenCalled();
      jasmine.clock().tick(1);
      jasmine.clock().uninstall();
      expect(revoke).toHaveBeenCalledOnceWith('blob:test');
      const text = await blob!.text();
      expect(text).toContain('SUMMARY:Artist Talk');
      expect(text).toContain('DTSTART;VALUE=DATE:20261112');
      expect(text).toContain('UID:e-talk@zentrum-praktische-fotografie');
      expect(text).toContain('LOCATION:Haus Köln Bibliothek\\, ');
      expect(text).toContain(`URL:${new URL('events/e-talk', document.baseURI).href}`);
      expect(fetchSpy).not.toHaveBeenCalled();
      expect(xhrSpy).not.toHaveBeenCalled();
    });

    it('Szenario: Beendetes Event ohne Schaltfläche (ICS-ST-1)', async () => {
      const el = await open('/events/e-vergangen');
      expect(el.textContent).toContain('Beendet');
      expect(button(el)).toBeUndefined();
    });

    it('Szenario: Nur auf der Eventdetailseite (ICS-UB-5)', async () => {
      for (const url of ['/events', '/calendar', '/exhibitions/a-laufend']) {
        TestBed.resetTestingModule();
        const el = await open(url);
        expect(button(el)).withContext(url).toBeUndefined();
      }
    });
  });
});
