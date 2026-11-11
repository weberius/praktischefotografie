// Zeitangabe eines Events für Liste, Detailseite und Agenda (EVT-UB-7, EVT-UB-8, CAL-UB-8, Q-USE-21, ADR-027).

export interface EventTimeInput {
  startDate: string;
  endDate: string;
  startTime?: string;
  endTime?: string;
  timeZone?: string;
}

/** Eine Zeile der Zeitangabe: sichtbarer Text und Text für Screenreader („von … bis … Uhr“ statt Gedankenstrich). */
export interface EventTimeLine {
  text: string;
  label: string;
}

const DEFAULT_ZONE = 'Europe/Berlin';

/**
 * Zeitangaben eines Events. Eintägig: „16:00–18:00 Uhr“ bzw. „ab 16:00 Uhr“. Mehrtägig: in Liste und Agenda keine, auf der Detailseite
 * (`detail`) „Start 10:00 Uhr“ und, wenn vorhanden, „Ende 17:00 Uhr“. Eine abweichende Zeitzone steht in Klammern; eine Dauer wird nie angenommen.
 */
export function eventTimeLines(event: EventTimeInput, detail: boolean): EventTimeLine[] {
  const { startTime, endTime, timeZone } = event;
  if (!startTime) return [];
  const zone = timeZone && timeZone !== DEFAULT_ZONE ? ` (${timeZone})` : '';
  if (event.startDate === event.endDate) {
    return endTime
      ? [{ text: `${startTime}–${endTime} Uhr${zone}`, label: `von ${startTime} bis ${endTime} Uhr${zone}` }]
      : [{ text: `ab ${startTime} Uhr${zone}`, label: `ab ${startTime} Uhr${zone}` }];
  }
  if (!detail) return [];
  const lines = [{ text: `Start ${startTime} Uhr${zone}`, label: `Start ${startTime} Uhr${zone}` }];
  if (endTime) lines.push({ text: `Ende ${endTime} Uhr${zone}`, label: `Ende ${endTime} Uhr${zone}` });
  return lines;
}
