# EARS: Events und Messen (Kürzel `EVT`)

**Bereich:** web  ·  **Systemname:** Webanwendung  ·  **Stand:** 2026-10-27

Begriffe: „heute“ ist das aktuelle Datum der Anwendung (in Tests ein fester Referenzwert). Datenfelder siehe `schema/`.

| ID | Anforderung | Gherkin | Quality | ADR |
| --- | --- | --- | --- | --- |
| EVT-UB-1 | Die Webanwendung soll auf `/events` alle Events mit Titel, Typ, Ort und Zeitraum aufsteigend nach Beginn auflisten. | `web/events.feature` · „Liste zeigt Events“ | – | ADR-002 |
| EVT-UB-2 | Die Webanwendung soll die Eventliste nach Typ filterbar machen. | `web/events.feature` · „Liste ist nach Typ filterbar“ | – | ADR-002 |
| EVT-OP-1 | Wo ein Event kommerziell ist, soll die Webanwendung es mit dem Text „Kommerziell“ kennzeichnen. | `web/events.feature` · „Kommerzielles Event“ | – | ADR-002 |
| EVT-UB-3 | Die Webanwendung soll auf `/events/:id` Beschreibung, Highlights, den Ort mit Link und die Website anzeigen. | `web/events.feature` · „Eventdetail“ | – | ADR-002 |
| EVT-UB-4 | Die Webanwendung soll Events, deren Ende vor heute liegt, mit dem Text „Beendet“ kennzeichnen. | `web/events.feature` · „Beendetes Event“ | Q-USE-4 | ADR-002 |
