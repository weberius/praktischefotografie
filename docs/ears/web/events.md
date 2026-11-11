# EARS: Events und Messen (Kürzel `EVT`)

**Bereich:** web  ·  **Systemname:** Webanwendung  ·  **Stand:** 2026-10-27

Begriffe: „heute“ ist das aktuelle Datum der Anwendung (in Tests ein fester Referenzwert). Datenfelder siehe `schema/`.

| ID | Anforderung | Gherkin | Quality | ADR |
| --- | --- | --- | --- | --- |
| EVT-UB-1 | Die Webanwendung soll auf `/events` die aktuellen Events (ACT-UB-1) mit Titel, Typ, Ort und Zeitraum aufsteigend nach Beginn auflisten. **Ergänzt durch ACT-UB-1** (vorher: alle Events). | `web/events.feature` · „Liste zeigt Events“ | – | ADR-002 |
| EVT-UB-2 | Die Webanwendung soll die Eventliste nach Typ filterbar machen. | `web/events.feature` · „Liste ist nach Typ filterbar“ | – | ADR-002 |
| EVT-OP-1 | Wo ein Event kommerziell ist, soll die Webanwendung es mit dem Text „Kommerziell“ kennzeichnen. | `web/events.feature` · „Kommerzielles Event“ | – | ADR-002 |
| EVT-UB-3 | Die Webanwendung soll auf `/events/:id` Beschreibung, Highlights, den Ort mit Link und die Website anzeigen. | `web/events.feature` · „Eventdetail“ | – | ADR-002 |
| EVT-UB-4 | Die Webanwendung soll Events, deren Ende vor heute liegt, mit dem Text „Beendet“ kennzeichnen. **Gilt nur noch auf der Detailseite (ACT-UB-3);** die Liste zeigt keine beendeten Events mehr. | `web/events.feature` · „Beendetes Event“ | Q-USE-4 | ADR-002 |
| EVT-UB-5 | Die Webanwendung soll Events vom Typ `vernissage` als „Vernissage“ und vom Typ `finissage` als „Finissage“ in Liste und Detail kennzeichnen und beide Typen in der Typ-Filterliste anbieten. | `web/events.feature` · „Vernissage und Finissage in der Liste“, „Vernissage und Finissage filterbar“, „Vernissage und Finissage in der Detailansicht“ | Q-USE-4 | ADR-002 |
| EVT-UB-6 | Die Webanwendung soll Events vom Typ `guided_tour` als „Führung“ in Liste und Detail kennzeichnen und den Typ in der Typ-Filterliste anbieten. | `web/events.feature` · „Führung in der Liste“, „Führung filterbar“, „Führung in der Detailansicht“ | Q-USE-19 | ADR-002 |
| EVT-UB-7 | Die Webanwendung soll bei einem eintägigen Event mit `startTime` in der Liste und auf der Detailseite die Uhrzeit hinter dem Datum anzeigen: „16:00–18:00 Uhr“ mit `endTime`, „ab 16:00 Uhr“ ohne `endTime`; bei abweichender `timeZone` folgt der Zonenname in Klammern; eine angenommene Dauer wird nicht angezeigt. | `web/events.feature` · „Uhrzeit mit Ende in der Liste“, „Uhrzeit ohne Ende“, „Abweichende Zeitzone“, „Ohne Uhrzeit keine Zeitangabe“ | Q-USE-21 | ADR-027 |
| EVT-UB-8 | Die Webanwendung soll bei einem mehrtägigen Event in der Liste nur den Zeitraum ohne Uhrzeit zeigen und auf der Detailseite „Start 16:00 Uhr“ (am Starttag) und, wenn `endTime` vorhanden ist, „Ende 18:00 Uhr“ (am Endtag) anzeigen. | `web/events.feature` · „Mehrtägiges Event in der Liste“, „Mehrtägiges Event im Detail“ | Q-USE-21 | ADR-027 |
