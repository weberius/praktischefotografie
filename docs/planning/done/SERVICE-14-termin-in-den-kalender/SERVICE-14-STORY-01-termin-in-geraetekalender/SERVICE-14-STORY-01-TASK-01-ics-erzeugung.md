# SERVICE-14-STORY-01-TASK-01 – Kalenderdatei erzeugen (reine Funktion)

**Story:** SERVICE-14-STORY-01  ·  **Status:** Umgesetzt
**EARS:** ICS-UB-2, ICS-UB-3, ICS-UB-4, ICS-UN-1
**Gherkin:** `web/kalender-export.feature` · Inhalt der Kalenderdatei, Mehrtägiges Event, Stabile Kennung, Maskierung und Faltung, Ort unbekannt
**Quality:** Q-IOP-1 (Strukturprüfung, ≥ 6 Fixtures), Q-SEC-6 (keine Bibliothek)
**ADR:** ADR-018

## Vorgehen
- `web/src/app/core/ics.ts`: `buildEventIcs(input)` und `icsFileName(id)` ohne Angular- und Browserabhängigkeit; ganztägig (`VALUE=DATE`, `DTEND` = `endDate` + 1 Tag), `UID` `<id>@zentrum-praktische-fotografie`, `DTSTAMP` injizierbar, Maskierung, Faltung nach 75 Oktett zeichenweise, CRLF.
- `web/src/app/core/ics.spec.ts`: Szenario-Tests und Strukturprüfung (BEGIN/END ausgewogen, CRLF, ≤ 75 Oktett, Pflichtfelder).

## Prüfkriterium
Alle fünf Szenarien als Tests grün; Strukturprüfung über ≥ 6 Fixtures ohne Befund; Prüf-Gate grün.
