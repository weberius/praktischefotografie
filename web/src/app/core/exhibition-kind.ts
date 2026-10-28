import { STATUS_LABEL, exhibitionStatus } from './exhibition-status';
import { EXHIBITION_TYPE_LABEL, Exhibition } from './models';

/**
 * Art einer Ausstellung für die Anzeige (BDG-UB-1): „Gruppenausstellung“ bei mehr als einer Person,
 * „Einzelausstellung“ bei genau einer; Retrospektive und Dauerausstellung bleiben erhalten;
 * ohne Person gilt die gespeicherte Art.
 */
export function exhibitionKind(exhibition: Pick<Exhibition, 'type' | 'photographerIds'>): string {
  if (exhibition.type === 'retrospective' || exhibition.type === 'permanent') return EXHIBITION_TYPE_LABEL[exhibition.type];
  const people = exhibition.photographerIds.length;
  if (people > 1) return EXHIBITION_TYPE_LABEL.group;
  if (people === 1) return EXHIBITION_TYPE_LABEL.solo;
  return EXHIBITION_TYPE_LABEL[exhibition.type];
}

/** Daten der Badge-Zeile einer Ausstellung für `app-exhibition-badges`: Art, danach Status (BDG-UB-2, BDG-UB-6). */
export function exhibitionBadgeData(exhibition: Exhibition, today: string): { kind: string; second: { label: string; status: ReturnType<typeof exhibitionStatus> } } {
  const status = exhibitionStatus(exhibition, today);
  return { kind: exhibitionKind(exhibition), second: { label: STATUS_LABEL[status], status } };
}
