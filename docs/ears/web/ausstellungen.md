# EARS: Ausstellungen (Kürzel `EXH`)

**Bereich:** web  ·  **Systemname:** Webanwendung  ·  **Stand:** 2026-10-27

Begriffe: „heute“ ist das aktuelle Datum der Anwendung (in Tests ein fester Referenzwert). Datenfelder siehe `schema/`.

| ID | Anforderung | Gherkin | Quality | ADR |
| --- | --- | --- | --- | --- |
| EXH-UB-1 | Die Webanwendung soll auf `/exhibitions` alle Ausstellungen mit Titel, Ort, Zeitraum und Status auflisten. | `web/ausstellungen.feature` · „Liste zeigt Ausstellungen mit Status“ | – | ADR-002 |
| EXH-UB-2 | Die Webanwendung soll den Status einer Ausstellung zum heutigen Datum bestimmen: „kommend“, wenn der Beginn nach heute liegt; „endet bald“, wenn sie läuft und höchstens 14 Tage später endet; „laufend“, wenn sie läuft und später endet; „beendet“, wenn das Ende vor heute liegt. Beginn- und Endtag gelten als laufend. | `web/ausstellungen.feature` · „Status der Ausstellung“ | Q-USE-4 | ADR-002 |
| EXH-UB-3 | Die Webanwendung soll die Ausstellungsliste nach Status filterbar machen. | `web/ausstellungen.feature` · „Liste ist nach Status filterbar“ | – | ADR-002 |
| EXH-UB-4 | ~~Die Webanwendung soll auf `/exhibitions/:id` Beschreibung, Typ, den Ort mit Link und die beteiligten Fotograf:innen mit Links anzeigen.~~ **Ersetzt durch EXH-UB-9.** | `web/ausstellungen.feature` · „Ausstellungsdetail“ (ersetzt) | – | ADR-002 |
| EXH-OP-1 | ~~Wo eine Ausstellung zu einem Festival gehört, soll die Webanwendung auf der Detailseite den Veranstalter nennen und verlinken.~~ **Ersetzt durch EXH-OP-2** (ADR-009). | `web/ausstellungen.feature` · „Ausstellung eines Festivals“ (ersetzt) | – | ADR-002 |
| EXH-UB-5 | Die Webanwendung soll auf der Detailseite die Beiträge anzeigen, die die Ausstellung verknüpfen. | `web/ausstellungen.feature` · „Verknüpfte Beiträge“ | – | ADR-002 |
| EXH-UB-6 | Die Webanwendung soll den Status einer Ausstellung als Text anzeigen. | `web/ausstellungen.feature` · „Status als Text“ | Q-USE-4 | ADR-002 |
| EXH-OP-2 | Wo eine Ausstellung zu einem Festival gehört, soll die Webanwendung auf der Detailseite das Festival mit Link auf `/festivals/:id` und dessen Veranstalter mit Link auf `/organizers/:id` nennen und bei `isOfficialFestivalPartner` den Text „Offizieller Partner“ ausgeben. | `web/ausstellungen.feature` · „Ausstellung eines Festivals“ | Q-USE-4 | ADR-002, ADR-009 |
| EXH-UB-8 | Die Webanwendung soll in der Ausstellungsliste jede Karte mit der Badge-Zeile (Art, danach Status) oberhalb der Überschrift beginnen lassen. | `web/ausstellungen.feature` · „Badges oben in der Liste“ | Q-USE-4, Q-USE-7 | ADR-014 |
| EXH-UB-9 | Die Webanwendung soll auf `/exhibitions/:id` Beschreibung, die Badge-Zeile (Art, danach Status), den Ort mit Link und die beteiligten Fotograf:innen mit Links anzeigen. | `web/ausstellungen.feature` · „Ausstellungsdetail“ | Q-USE-4, Q-USE-7 | ADR-014 |

**Supersede 2026-10-28:** EXH-OP-1 nannte den Veranstalter über `festivalId`; seit ADR-009 verweist `festivalId` auf ein Festival.
**Supersede 2026-10-28 (Badges):** EXH-UB-4 nannte den gespeicherten Typ nach dem Status; EXH-UB-9 verlangt die Art nach BDG-UB-1 und die Reihenfolge Art, Status. EXH-UB-8 ergänzt EXH-UB-1 um die Lage der Badges.
