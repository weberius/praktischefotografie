// Gherkin: web/ausstellungen.feature (EXH-UB-4, EXH-OP-1, EXH-UB-5)
import { TestBed } from '@angular/core/testing';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { routes } from '../../app.routes';
import { provideTestData } from '../../testing/test-data';

async function open(url: string): Promise<HTMLElement> {
  const harness = await RouterTestingHarness.create();
  await harness.navigateByUrl(url);
  await harness.fixture.whenStable();
  harness.detectChanges();
  return harness.routeNativeElement as HTMLElement;
}

describe('ExhibitionDetailPage', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [provideRouter(routes, withComponentInputBinding()), ...provideTestData()] });
  });

  it('Szenario: Ausstellungsdetail (EXH-UB-4)', async () => {
    // a-laufend: Ort Museum Essen, Fotograf:innen Parr und Erwitt
    const el = await open('/exhibitions/a-laufend');
    expect(el.querySelectorAll('h1').length).toBe(1);
    expect(el.querySelector('h1')?.textContent).toContain('Ausstellung a-laufend');
    expect(el.textContent).toContain('Beschreibung a-laufend');
    expect(el.textContent).toContain('Gruppenausstellung');
    expect(el.textContent).toContain('Laufend');
    expect(el.querySelector('a[href="/venues/v-essen"]')?.textContent).toContain('Museum Essen');
    expect(el.querySelector('a[href="/photographers/martin-parr"]')?.textContent).toContain('Martin Parr');
    expect(el.querySelector('a[href="/photographers/elliott-erwitt"]')?.textContent).toContain('Elliott Erwitt');
    expect(document.title).toContain('Ausstellung a-laufend');
  });

  it('Szenario: Ausstellung eines Festivals (EXH-OP-2) – Festival, Veranstalter und Partnerkennzeichnung', async () => {
    const el = await open('/exhibitions/f-1');
    expect(el.querySelector('a[href="/festivals/photoszene-festival-2026"]')?.textContent).toContain('Photoszene-Festival 2026');
    expect(el.querySelector('a[href="/organizers/photoszene-koeln"]')?.textContent).toContain('Photoszene Köln e.V.');
    expect(el.textContent).toContain('Offizieller Partner');
  });

  it('Ausstellung eines Festivals ohne Partnerkennzeichnung nennt den Partnerstatus nicht (EXH-OP-2)', async () => {
    const el = await open('/exhibitions/f-2');
    expect(el.querySelector('a[href="/festivals/photoszene-festival-2026"]')).not.toBeNull();
    expect(el.textContent).not.toContain('Offizieller Partner');
  });

  it('Ausstellung ohne Festival nennt weder Festival noch Veranstalter (EXH-OP-2)', async () => {
    const el = await open('/exhibitions/a-laufend');
    expect(el.querySelector('a[href^="/organizers/"]')).toBeNull();
    expect(el.querySelector('a[href^="/festivals/"]')).toBeNull();
  });

  it('Szenario: Verknüpfte Beiträge (EXH-UB-5)', async () => {
    const el = await open('/exhibitions/a-kommend');
    expect(el.querySelector('a[href="/posts/willkommen"]')?.textContent).toContain('Willkommen');
  });

  it('Szenario: Status als Text (EXH-UB-6)', async () => {
    const el = await open('/exhibitions/a-endet-bald');
    expect(el.querySelector('.badge.status-endet-bald')?.textContent?.trim()).toBe('Endet bald');
  });

  it('Unbekannte ID zeigt die Hinweisseite (NAV-EV-1)', async () => {
    const el = await open('/exhibitions/unbekannt');
    expect(el.querySelector('app-not-found')).not.toBeNull();
  });
});
