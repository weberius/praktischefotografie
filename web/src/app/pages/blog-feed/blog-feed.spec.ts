// Gherkin: web/blog.feature · Startseite (BLG-UB-1, BLG-UB-2, BLG-ST-1, BLG-UN-1)
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
});
