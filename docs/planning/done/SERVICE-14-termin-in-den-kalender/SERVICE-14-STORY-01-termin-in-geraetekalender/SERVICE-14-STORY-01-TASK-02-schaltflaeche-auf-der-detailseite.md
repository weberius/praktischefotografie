# SERVICE-14-STORY-01-TASK-02 – Schaltfläche und Download auf der Eventdetailseite

**Story:** SERVICE-14-STORY-01  ·  **Status:** Umgesetzt
**EARS:** ICS-UB-1, ICS-EV-1, ICS-ST-1, ICS-UB-5
**Gherkin:** `web/kalender-export.feature` · Schaltfläche auf der Eventdetailseite, Download der Kalenderdatei, Beendetes Event ohne Schaltfläche, Nur auf der Eventdetailseite
**Quality:** Q-USE-15, Q-USE-3 (Ergänzung), Q-SEC-6, Q-USE-2
**ADR:** ADR-018

## Vorgehen
- `event-detail.html/.ts/.css`: `<button type="button">` „Termin in Geräte-Kalender speichern“ mit sichtbarem Hinweistext (verknüpft per `aria-describedby`), nur wenn das Event nicht beendet ist; Klick baut die Datei (Adresse der Detailseite aus `document.baseURI`), bietet sie per `Blob` und `<a download>` als `<event-id>.ics` an.
- Tests in `event-detail.spec.ts`; Nachweis „nur auf Eventdetail“ über Liste, Agenda und Ausstellungsdetail.

## Prüfkriterium
Alle vier Szenarien als Tests grün, Download-Test mit Blob-Typ und Dateiname, keine Netzanfrage beim Klick; Prüf-Gate grün.
