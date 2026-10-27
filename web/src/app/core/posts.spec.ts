// Gherkin: web/blog.feature · „Startseite listet Beiträge, neueste zuerst“, „Beitrag mit Datum in der Zukunft“
import { TEST_DATASET, TEST_TODAY } from '../testing/test-data';
import { postsLinking, publishedPosts } from './posts';

describe('posts', () => {
  it('Szenario: Startseite listet Beiträge, neueste zuerst (BLG-UB-1)', () => {
    expect(publishedPosts(TEST_DATASET.posts, TEST_TODAY).map((p) => p.slug)).toEqual(['endet-bald', 'willkommen', 'alt']);
  });
  it('Szenario: Beitrag mit Datum in der Zukunft (BLG-UN-1)', () => {
    expect(publishedPosts(TEST_DATASET.posts, TEST_TODAY).some((p) => p.slug === 'zukunft')).toBeFalse();
    expect(publishedPosts(TEST_DATASET.posts, '2027-03-01').some((p) => p.slug === 'zukunft')).toBeTrue();
  });
  it('findet Beiträge zu Ort und Ausstellung', () => {
    expect(postsLinking(TEST_DATASET.posts, TEST_TODAY, { venueId: 'v-koeln-lib' }).map((p) => p.slug)).toEqual(['willkommen']);
    expect(postsLinking(TEST_DATASET.posts, TEST_TODAY, { exhibitionId: 'a-endet-bald' }).map((p) => p.slug)).toEqual(['endet-bald']);
    expect(postsLinking(TEST_DATASET.posts, TEST_TODAY, { venueId: 'v-essen' })).toEqual([]);
  });
});
