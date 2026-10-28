// Gherkin: web/blog.feature · „Anlass-Badge je Kennung“, „Beitrag ohne Ausstellung“ (BLG-UB-6, BLG-ST-2)
import { OCCASION_BADGE, newsOccasion } from './news';

describe('news', () => {
  it('Anlass-Badge je Kennung', () => {
    const linked = ['schau-2026'];
    expect(newsOccasion({ id: 'schau-2026-neu', linkedExhibitionIds: linked })).toBe('neu');
    expect(newsOccasion({ id: 'schau-2026-eroeffnung', linkedExhibitionIds: linked })).toBe('eroeffnung');
    expect(newsOccasion({ id: 'schau-2026-endet-bald', linkedExhibitionIds: linked })).toBe('endet-bald');
    expect(newsOccasion({ id: 'schau-2026-ende', linkedExhibitionIds: linked })).toBe('ende');
    expect(Object.values(OCCASION_BADGE).map((b) => b.label)).toEqual(['Neu', 'Eröffnung', 'Endet bald', 'Beendet']);
  });

  it('Beitrag ohne Anlass-Kennung oder ohne Ausstellung hat keinen Anlass (BLG-ST-2)', () => {
    expect(newsOccasion({ id: 'willkommen', linkedExhibitionIds: ['a'] })).toBeNull();
    expect(newsOccasion({ id: 'schau-2026-ende' })).toBeNull();
    expect(newsOccasion({ id: 'schau-2026-ende', linkedExhibitionIds: [] })).toBeNull();
    expect(newsOccasion({ id: 'neu', linkedExhibitionIds: ['a'] })).toBeNull();
  });
});
