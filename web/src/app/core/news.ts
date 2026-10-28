import { ExhibitionStatus } from './exhibition-status';
import { Post } from './models';

export type NewsOccasion = 'neu' | 'eroeffnung' | 'endet-bald' | 'ende';

/** Anlass-Badges der Neuigkeiten; die Farbe folgt dem Status der Ausstellungslisten (BLG-UB-6, Q-USE-4). */
export const OCCASION_BADGE: Record<NewsOccasion, { label: string; status: ExhibitionStatus }> = {
  neu: { label: 'Neu', status: 'kommend' },
  eroeffnung: { label: 'Eröffnung', status: 'laufend' },
  'endet-bald': { label: 'Endet bald', status: 'endet-bald' },
  ende: { label: 'Beendet', status: 'beendet' },
};

const OCCASIONS = Object.keys(OCCASION_BADGE) as NewsOccasion[];

/**
 * Anlass einer Neuigkeit aus dem Ende der Kennung `<Ausstellungs-id>-<Anlass>` (ADR-013, BLG-UB-6).
 * Beiträge ohne Anlass-Kennung oder ohne verknüpfte Ausstellung haben keinen Anlass (BLG-ST-2).
 */
export function newsOccasion(post: Pick<Post, 'id' | 'linkedExhibitionIds'>): NewsOccasion | null {
  if (!post.linkedExhibitionIds?.length) return null;
  return OCCASIONS.find((o) => post.id.length > o.length + 1 && post.id.endsWith(`-${o}`)) ?? null;
}
