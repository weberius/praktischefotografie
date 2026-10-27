# EARS: Ausstellungen (Kürzel `EXH`)

**Bereich:** web  ·  **Systemname:** Webanwendung  ·  **Stand:** 2026-10-27

Begriffe: „heute“ ist das aktuelle Datum der Anwendung (in Tests ein fester Referenzwert). Datenfelder siehe `schema/`.

| ID | Anforderung | Gherkin | Quality | ADR |
| --- | --- | --- | --- | --- |
| EXH-UB-1 | Die Webanwendung soll auf `/exhibitions` alle Ausstellungen mit Titel, Ort, Zeitraum und Status auflisten. | `web/ausstellungen.feature` · „Liste zeigt Ausstellungen mit Status“ | – | ADR-002 |
| EXH-UB-2 | Die Webanwendung soll den Status einer Ausstellung zum heutigen Datum bestimmen: „kommend“, wenn der Beginn nach heute liegt; „endet bald“, wenn sie läuft und höchstens 14 Tage später endet; „laufend“, wenn sie läuft und später endet; „beendet“, wenn das Ende vor heute liegt. Beginn- und Endtag gelten als laufend. | `web/ausstellungen.feature` · „Status der Ausstellung“ | Q-USE-4 | ADR-002 |
| EXH-UB-3 | Die Webanwendung soll die Ausstellungsliste nach Status filterbar machen. | `web/ausstellungen.feature` · „Liste ist nach Status filterbar“ | – | ADR-002 |
| EXH-UB-4 | Die Webanwendung soll auf `/exhibitions/:id` Beschreibung, Typ, den Ort mit Link und die beteiligten Fotograf:innen mit Links anzeigen. | `web/ausstellungen.feature` · „Ausstellungsdetail“ | – | ADR-002 |
| EXH-OP-1 | Wo eine Ausstellung zu einem Festival gehört, soll die Webanwendung auf der Detailseite den Veranstalter nennen und verlinken. | `web/ausstellungen.feature` · „Ausstellung eines Festivals“ | – | ADR-002 |
| EXH-UB-5 | Die Webanwendung soll auf der Detailseite die Beiträge anzeigen, die die Ausstellung verknüpfen. | `web/ausstellungen.feature` · „Verknüpfte Beiträge“ | – | ADR-002 |
| EXH-UB-6 | Die Webanwendung soll den Status einer Ausstellung als Text anzeigen. | `web/ausstellungen.feature` · „Status als Text“ | Q-USE-4 | ADR-002 |
