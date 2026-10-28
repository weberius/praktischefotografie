# EARS: Festivals in der Webanwendung (Kürzel `FST`)

**Bereich:** web  ·  **Systemname:** Webanwendung  ·  **Stand:** 2026-10-28

Begriffe: „heute“ ist das aktuelle Datum der Anwendung (in Tests ein fester Referenzwert). Ein Festival gehört über `organizerId` zu einem Veranstalter; eine Ausstellung gehört über `festivalId` zu einem Festival und ist über `isOfficialFestivalPartner` als offizieller Partner gekennzeichnet. Datenfelder siehe `schema/`.

| ID | Anforderung | Gherkin | Quality | ADR |
| --- | --- | --- | --- | --- |
| FST-UB-1 | Die Webanwendung soll auf `/festivals` alle Festivals mit Titel, Veranstalter, Zeitraum und Stadt aufsteigend nach `startDate` auflisten und jedes mit `/festivals/:id` verlinken. | `web/festivals.feature` · „Übersicht der Festivals“ | Q-USE-3 | ADR-002, ADR-009 |
| FST-ST-1 | Solange keine Festivals erfasst sind, soll die Webanwendung auf `/festivals` einen Hinweis anzeigen. | `web/festivals.feature` · „Keine Festivals erfasst“ | – | ADR-002 |
| FST-UB-2 | Die Webanwendung soll auf `/festivals/:id` Titel, Zeitraum, Stadt, den Veranstalter mit Link auf `/organizers/:id` sowie, soweit vorhanden, Beschreibung und Website anzeigen. | `web/festivals.feature` · „Festivalseite zeigt Stammdaten“ | Q-SEO-2 | ADR-002, ADR-009 |
| FST-UB-3 | Die Webanwendung soll auf der Festivalseite alle Ausstellungen auflisten, deren `festivalId` die ID des Festivals ist, mit Ort, Zeitraum und Status, und offizielle Partner mit dem Text „Offizieller Partner“ kennzeichnen. | `web/festivals.feature` · „Festivalseite listet Ausstellungen“ | Q-USE-4 | ADR-002, ADR-009 |
| FST-ST-2 | Solange einem Festival keine Ausstellungen zugeordnet sind, soll die Webanwendung auf der Festivalseite einen Hinweis anzeigen. | `web/festivals.feature` · „Festival ohne Ausstellung“ | – | ADR-002 |
| FST-UB-4 | Die Webanwendung soll auf der Festivalseite, wenn Ausstellungen zugeordnet sind, Links auf `/map?festival=<id>` und `/venues?festival=<id>` anbieten. | `web/festivals.feature` · „Festivalfilter in Karte und Orten“ | – | ADR-004 |
| FST-UB-5 | Die Webanwendung soll auf `/map` und `/venues` den Filter `festival` bereitstellen, der nur Orte mit mindestens einer Ausstellung dieses Festivals zeigt. | `web/festivals.feature` · „Festivalfilter in Karte und Orten“ | – | ADR-004 |
| FST-ST-3 | Wenn das Festival bei einem Filteraufruf unbekannt ist, soll die Webanwendung die Liste ohne Orte mit einem Hinweis auf den unbekannten Filter zeigen. | `web/festivals.feature` · „Unbekanntes Festival im Filter“ | – | ADR-004 |
