# EARS: Fotograf:innen (Kürzel `PHO`)

**Bereich:** web  ·  **Systemname:** Webanwendung  ·  **Stand:** 2026-10-27

Begriffe: „heute“ ist das aktuelle Datum der Anwendung (in Tests ein fester Referenzwert). Datenfelder siehe `schema/`.

| ID | Anforderung | Gherkin | Quality | ADR |
| --- | --- | --- | --- | --- |
| PHO-UB-1 | Die Webanwendung soll auf `/photographers` alle Fotograf:innen alphabetisch nach Name auflisten. | `web/fotografinnen.feature` · „Übersicht alphabetisch“ | – | ADR-002 |
| PHO-UB-2 | Die Webanwendung soll auf `/photographers/:id` Name, Kurzbiografie und Website der Person anzeigen. | `web/fotografinnen.feature` · „Personenseite zeigt Stammdaten“ | – | ADR-002 |
| PHO-UB-3 | Die Webanwendung soll auf der Personenseite alle Ausstellungen der Person mit Ort und Zeitraum absteigend nach Beginn auflisten. | `web/fotografinnen.feature` · „Personenseite listet Ausstellungen“ | – | ADR-002 |
| PHO-ST-1 | Solange einer Person keine Ausstellung zugeordnet ist, soll die Webanwendung auf der Personenseite einen Hinweis anzeigen. | `web/fotografinnen.feature` · „Person ohne Ausstellung“ | – | ADR-002 |
