// Gherkin: web/blog.feature · „Beitragstext wird dargestellt“, „Beitragstext ist bereinigt“
import { TestBed } from '@angular/core/testing';
import { MarkdownService, markdownToHtml, stripFrontmatter } from './markdown.service';
import { provideTestData, TEST_MARKDOWN } from '../testing/test-data';

describe('MarkdownService', () => {
  it('Szenario: Beitragstext wird dargestellt – Frontmatter entfernt, Überschrift und Hervorhebung', () => {
    const html = markdownToHtml(TEST_MARKDOWN);
    expect(html).toContain('<h2>Überschrift</h2>');
    expect(html).toContain('<strong>Hervorhebung</strong>');
    expect(html).not.toContain('title: X');
    expect(html).not.toContain('---');
  });

  it('entfernt Frontmatter nur am Anfang', () => {
    expect(stripFrontmatter('---\na: b\n---\nText\n\n---\n\nRest')).toBe('Text\n\n---\n\nRest');
    expect(stripFrontmatter('Text ohne Frontmatter')).toBe('Text ohne Frontmatter');
    expect(stripFrontmatter('---\r\na: b\r\n---\r\nText')).toBe('Text');
  });

  it('lädt über HttpClient und meldet Ladefehler als Fehler', async () => {
    TestBed.configureTestingModule({ providers: provideTestData({ content: (url) => (url.endsWith('ok.md') ? '**fett**' : null) }) });
    const service = TestBed.inject(MarkdownService);
    const { firstValueFrom } = await import('rxjs');
    expect(await firstValueFrom(service.load('content/posts/ok.md'))).toContain('<strong>fett</strong>');
    await expectAsync(firstValueFrom(service.load('content/posts/fehlt.md'))).toBeRejected();
  });
});
