// Q-DATA-10: Neuigkeiten im Bestand tragen den Titel „Ausstellungstitel in Stadt“ und verknüpfen Ausstellung und Ort.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { ROOT } from '../../scripts/scrape/lib/common.mjs';
import { OCCASIONS, expectedTitle } from '../../scripts/news/lib/news.mjs';

const read = (name) => JSON.parse(readFileSync(join(ROOT, 'data', `${name}.json`), 'utf8'));
const pattern = new RegExp(`^(.+)-(${OCCASIONS.join('|')})$`);

test('Q-DATA-10: Neuigkeiten haben Anlass-Kennung, Titel mit Stadt und vorhandene Verknüpfungen', () => {
  const exhibitions = new Map(read('exhibitions').map((e) => [e.id, e]));
  const venues = new Map(read('venues').map((v) => [v.id, v]));
  const news = read('posts').filter((p) => pattern.test(p.id) && exhibitions.has(pattern.exec(p.id)[1]));
  assert.ok(news.length > 0);
  for (const post of news) {
    const ex = exhibitions.get(pattern.exec(post.id)[1]);
    assert.deepEqual(post.linkedExhibitionIds, [ex.id], post.id);
    assert.deepEqual(post.linkedVenueIds, [ex.venueId], post.id);
    assert.equal(post.title, expectedTitle(ex, venues.get(ex.venueId)), post.id);
    const md = readFileSync(join(ROOT, post.contentFile), 'utf8');
    assert.match(md, new RegExp(`^---\\ntitle: ${JSON.stringify(post.title).replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\n`), `Frontmatter von ${post.id}`);
  }
});
