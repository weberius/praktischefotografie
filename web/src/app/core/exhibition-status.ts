import { daysBetween } from './clock';
import { Exhibition, PhotoEvent } from './models';

export type ExhibitionStatus = 'kommend' | 'endet-bald' | 'laufend' | 'beendet';

export const ENDING_SOON_DAYS = 14;

export const STATUS_LABEL: Record<ExhibitionStatus, string> = {
  kommend: 'Kommend',
  'endet-bald': 'Endet bald',
  laufend: 'Laufend',
  beendet: 'Beendet',
};

/** Status zum Datum `today` (EXH-UB-2). Beginn- und Endtag gelten als laufend. */
export function exhibitionStatus(exhibition: Pick<Exhibition, 'startDate' | 'endDate'>, today: string): ExhibitionStatus {
  if (exhibition.startDate > today) return 'kommend';
  if (exhibition.endDate < today) return 'beendet';
  return daysBetween(today, exhibition.endDate) <= ENDING_SOON_DAYS ? 'endet-bald' : 'laufend';
}

export function isOver(item: Pick<PhotoEvent | Exhibition, 'endDate'>, today: string): boolean {
  return item.endDate < today;
}
