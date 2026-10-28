// Gherkin: web/blog.feature · Beitrag lesen (BLG-UB-3, BLG-UB-4, BLG-UB-5, BLG-UB-8, BLG-UN-1, BLG-UN-2)
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { TestBed } from '@angular/core/testing';
import { RouterTestingHarness } from '@angular/router/testing';
import { routes } from '../../app.routes';
import { provideTestData, TestDataOptions } from '../../testing/test-data';

async function open(url: string, options: TestDataOptions = {}) {
  TestBed.configureTestingModule({ providers: [provideRouter(routes, withComponentInputBinding()), ...provideTestData(options)] });
  const harness = await RouterTestingHarness.create();
  await harness.navigateByUrl(url);
  await harness.fixture.whenStable();
  harness.detectChanges();
  return { harness, el: harness.routeNativeElement as HTMLElement };
}

describe('PostDetailPage', () => {
  it('Szenario: Beitragstext wird dargestellt', async () => {
    const { el } = await open('/posts/willkommen');
    expect(el.querySelectorAll('h1').length).toBe(1);
    expect(el.querySelector('h1')?.textContent).toContain('Willkommen');
    expect(el.querySelector('.post-body h2')?.textContent).toBe('Überschrift');
    expect(el.querySelector('.post-body strong')?.textContent).toBe('Hervorhebung');
    expect(el.textContent).not.toContain('title: X');
    expect(document.title).toContain('Willkommen');
  });

  it('Szenario: Verknüpfte Orte und Ausstellungen', async () => {
    const { el } = await open('/posts/willkommen');
    const venue = el.querySelector<HTMLAnchorElement>('a[href="/venues/v-koeln-lib"]');
    expect(venue?.textContent).toContain('Haus Köln Bibliothek');
    expect(el.textContent).toContain('Teststraße 1, 50667 Köln');
    expect(el.textContent).toContain('Präsenzbibliothek');
    const exh = el.querySelector<HTMLAnchorElement>('a[href="/exhibitions/a-kommend"]');
    expect(exh?.textContent).toContain('Ausstellung a-kommend');
    expect(el.textContent).toContain('20. November 2026 – 14. Februar 2027');
    expect(el.querySelector('app-status-badge')?.textContent).toContain('Kommend');
  });

  it('Szenario: Beitragstext fehlt', async () => {
    const { el } = await open('/posts/willkommen', { content: () => null });
    expect(el.querySelector('h1')?.textContent).toContain('Willkommen');
    expect(el.textContent).toContain('20. Oktober 2026');
    expect(el.querySelector('a[href="/venues/v-koeln-lib"]')).not.toBeNull();
    expect(el.querySelector('a[href="/exhibitions/a-kommend"]')).not.toBeNull();
    expect(el.querySelector('.post-body')).toBeNull();
    expect(el.querySelector('.notice[role=status]')?.textContent).toContain('nicht geladen');
  });

  it('Szenario: Beitrag mit Datum in der Zukunft – Detailseite zeigt Hinweisseite', async () => {
    const { el } = await open('/posts/zukunft');
    expect(el.textContent).toContain('nicht gefunden');
    expect(el.textContent).not.toContain('Beitrag aus der Zukunft');
    expect(document.title).toContain('Nicht gefunden');
  });

  it('unbekannter Slug zeigt Hinweisseite', async () => {
    const { el } = await open('/posts/unbekannt');
    expect(el.textContent).toContain('nicht gefunden');
  });

  describe('Szenario: Beitragstext ist bereinigt (Q-SEC-3)', () => {
    const attacks: [string, string][] = [
      ['script-Element', 'Text\n\n<script>window.__pwned = 1</script>\n'],
      ['onerror-Attribut', '<img src="x" onerror="window.__pwned = 2">\n'],
      ['javascript:-Link', '[Klick](javascript:window.__pwned=3)\n\n<a href="javascript:window.__pwned=3">Link</a>\n'],
      ['iframe', '<iframe src="https://example.org/" onload="window.__pwned = 4"></iframe>\n'],
      ['svg onload', '<svg onload="window.__pwned = 5"><circle r="1"/></svg>\n'],
      ['style/Handler im Block', '<div onclick="window.__pwned = 6" style="x">Block</div>\n<object data="x"></object><embed src="x">\n'],
    ];
    for (const [name, markdown] of attacks) {
      it(`${name}: nichts ausgeführt, nichts im DOM`, async () => {
        delete (window as unknown as Record<string, unknown>)['__pwned'];
        const { el } = await open('/posts/willkommen', { content: () => `---\nid: x\n---\n\n${markdown}` });
        const body = el.querySelector('.post-body') as HTMLElement;
        expect(body).not.toBeNull();
        expect(body.querySelectorAll('script, iframe, svg, object, embed').length).toBe(0);
        for (const node of Array.from(body.querySelectorAll('*'))) {
          for (const attr of Array.from(node.attributes)) {
            expect(attr.name).not.toMatch(/^on/i);
            expect(attr.value).not.toMatch(/^\s*javascript:/i);
          }
        }
        expect((window as unknown as Record<string, unknown>)['__pwned']).toBeUndefined();
      });
    }
  });

  it('Szenario: Beitragsseite zeigt Badges (BLG-UB-8, BLG-UB-9)', async () => {
    const news = { id: 'a-laufend-endet-bald', slug: 'a-laufend-endet-bald', title: 'Ausstellung a-laufend in Essen', date: '2026-10-18', linkedVenueIds: ['v-essen'], linkedExhibitionIds: ['a-laufend'], contentFile: 'content/posts/a-laufend-endet-bald.md' };
    const { el } = await open('/posts/a-laufend-endet-bald', { dataset: { posts: [news] } });
    const badges = Array.from(el.querySelectorAll('.badge-row .badge')).map((b) => b.textContent?.trim());
    expect(badges).toEqual(['Gruppenausstellung', 'Endet bald']);
    const order = Array.from(el.querySelector('article')!.children).map((c) => c.tagName.toLowerCase());
    expect(order.slice(0, 3)).toEqual(['h1', 'p', 'app-news-badges']);
  });

  it('Beitrag ohne Ausstellung zeigt keine Badges (BLG-UB-8, BLG-UB-9)', async () => {
    const { el } = await open('/posts/willkommen');
    expect(el.querySelector('.badge-row')).toBeNull();
  });
});
