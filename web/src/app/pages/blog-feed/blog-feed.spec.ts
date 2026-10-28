// Gherkin: web/blog.feature · Startseite (BLG-UB-1, BLG-UB-2, BLG-UB-6, BLG-UB-7, BLG-ST-1, BLG-ST-2, BLG-UN-1, BLG-UN-3)
import { provideRouter, Router } from '@angular/router';
import { TestBed } from '@angular/core/testing';
import { RouterTestingHarness } from '@angular/router/testing';
import { routes } from '../../app.routes';
import { TEST_DATASET, provideTestData, TestDataOptions } from '../../testing/test-data';

async function open(options: TestDataOptions = {}) {
  TestBed.configureTestingModule({ providers: [provideRouter(routes), ...provideTestData(options)] });
  const harness = await RouterTestingHarness.create();
  await harness.navigateByUrl('/');
  harness.detectChanges();
  return harness;
}

const post = (id: string, date: string, excerpt?: string) => ({ id, slug: id, title: `Titel ${id}`, date, excerpt, contentFile: `content/posts/${id}.md` });

describe('BlogFeedPage', () => {
  it('Szenario: Startseite listet Beiträge, neueste zuerst', async () => {
    const harness = await open({ dataset: { posts: [post('a', '2026-01-01', 'Vorschau a'), post('b', '2026-03-01', 'Vorschau b'), post('c', '2026-02-01', 'Vorschau c')] } });
    const el = harness.routeNativeElement as HTMLElement;
    const items = Array.from(el.querySelectorAll('ul li'));
    expect(items.map((i) => i.querySelector('time')?.getAttribute('datetime'))).toEqual(['2026-03-01', '2026-02-01', '2026-01-01']);
    expect(items[0].textContent).toContain('Titel b');
    expect(items[0].textContent).toContain('1. März 2026');
    expect(items[0].textContent).toContain('Vorschau b');
    expect(el.querySelectorAll('h1').length).toBe(1);
  });

  it('Szenario: Beitrag in der Liste führt zur Detailseite', async () => {
    const harness = await open({ dataset: { posts: [post('mein-beitrag', '2026-03-01')] } });
    (harness.routeNativeElement as HTMLElement).querySelector<HTMLAnchorElement>('a[href="/posts/mein-beitrag"]')!.click();
    await harness.fixture.whenStable();
    expect(TestBed.inject(Router).url).toBe('/posts/mein-beitrag');
  });

  it('Szenario: Keine Beiträge vorhanden', async () => {
    const harness = await open({ dataset: { posts: [] } });
    const el = harness.routeNativeElement as HTMLElement;
    expect(el.querySelector('ul')).toBeNull();
    expect(el.querySelector('[role=status]')?.textContent).toContain('keine veröffentlichten Beiträge');
  });

  it('Szenario: Beitrag mit Datum in der Zukunft – nicht in der Liste', async () => {
    const harness = await open();
    const el = harness.routeNativeElement as HTMLElement;
    expect(el.textContent).not.toContain('Beitrag aus der Zukunft');
    expect(el.querySelector('a[href="/posts/zukunft"]')).toBeNull();
    expect(el.querySelectorAll('li').length).toBe(TEST_DATASET.posts.filter((p) => p.date <= '2026-10-27').length);
  });

  const newsPost = (id: string, date: string, over = {}) => ({
    id,
    slug: id,
    title: 'Ausstellung a-laufend in Essen',
    date,
    excerpt: 'Die Ausstellung im Museum Essen endet am 10. Januar 2027.',
    linkedVenueIds: ['v-essen'],
    linkedExhibitionIds: ['a-laufend'],
    contentFile: `content/posts/${id}.md`,
    ...over,
  });
  const badgesOf = (item: Element) => Array.from(item.querySelectorAll('.badge-row .badge')).map((b) => b.textContent?.trim());

  it('Szenario: Beitrag zu einer Ausstellung zeigt Badges, zuerst die Art (BLG-UB-9, BDG-UB-2)', async () => {
    const harness = await open({ dataset: { posts: [newsPost('a-laufend-endet-bald', '2026-10-18')] } });
    const item = (harness.routeNativeElement as HTMLElement).querySelector('ul li') as HTMLElement;
    expect(badgesOf(item)).toEqual(['Gruppenausstellung', 'Endet bald']);
    expect(item.querySelector('.badge-row .status-endet-bald')?.textContent).toContain('Endet bald');
    expect(item.querySelector('h2')?.textContent?.trim()).toBe('Ausstellung a-laufend in Essen');
    expect(item.querySelector('h2')?.textContent).not.toContain('Endet bald');
  });

  it('Szenario: Anlass-Badge je Kennung (BLG-UB-9)', async () => {
    const harness = await open({
      dataset: {
        posts: [
          newsPost('a-laufend-neu', '2026-10-04'),
          newsPost('a-laufend-eroeffnung', '2026-10-03'),
          newsPost('a-laufend-endet-bald', '2026-10-02'),
          newsPost('a-laufend-ende', '2026-10-01'),
        ],
      },
    });
    const items = Array.from((harness.routeNativeElement as HTMLElement).querySelectorAll('ul li'));
    expect(items.map((i) => badgesOf(i)[1])).toEqual(['Neu', 'Eröffnung', 'Endet bald', 'Beendet']);
  });

  it('Szenario: Aufbau der Karte (BLG-UB-7, BLG-UB-2) – Datum, Badges, Titel als Link, Kurzvorschau', async () => {
    const harness = await open({ dataset: { posts: [newsPost('a-laufend-endet-bald', '2026-10-18')] } });
    const item = (harness.routeNativeElement as HTMLElement).querySelector('ul li') as HTMLElement;
    const order = Array.from(item.children).map((c) => c.tagName.toLowerCase());
    expect(order).toEqual(['time', 'app-news-badges', 'h2', 'p']);
    expect(item.querySelector('time')?.getAttribute('datetime')).toBe('2026-10-18');
    const link = item.querySelector('h2 a') as HTMLAnchorElement;
    expect(link.getAttribute('href')).toBe('/posts/a-laufend-endet-bald');
    expect(item.querySelector('p')?.textContent).toContain('endet am 10. Januar 2027');
    expect(item.querySelectorAll('a').length).toBe(1);
  });

  it('Szenario: Beitrag ohne Ausstellung (BLG-ST-2) – ohne Badges, Reihenfolge Datum, Titel, Kurzvorschau', async () => {
    const harness = await open({ dataset: { posts: [post('redaktion', '2026-03-01', 'Vorschau'), newsPost('willkommen-endet-bald', '2026-03-02', { linkedExhibitionIds: [] })] } });
    const items = Array.from((harness.routeNativeElement as HTMLElement).querySelectorAll('ul li'));
    expect(items.length).toBe(2);
    for (const item of items) {
      expect(item.querySelector('.badge-row')).toBeNull();
      expect(Array.from(item.children).map((c) => c.tagName.toLowerCase())).toEqual(['time', 'app-news-badges', 'h2', 'p']);
    }
  });

  it('Szenario: Verknüpfung ohne Datensatz (BLG-UN-3)', async () => {
    const harness = await open({ dataset: { posts: [newsPost('gibt-es-nicht-endet-bald', '2026-10-18', { linkedExhibitionIds: ['gibt-es-nicht'] })] } });
    const item = (harness.routeNativeElement as HTMLElement).querySelector('ul li') as HTMLElement;
    expect(item.querySelector('.badge-row')).toBeNull();
    expect(item.querySelector('h2 a')?.textContent).toContain('Ausstellung a-laufend in Essen');
    expect(item.querySelector('time')).not.toBeNull();
    expect(item.textContent).toContain('endet am 10. Januar 2027');
  });
});
