# EARS: Veranstalter:innen und Festivals (Kürzel `ORG`)

**Bereich:** web  ·  **Systemname:** Webanwendung  ·  **Stand:** 2026-10-27

Begriffe: „heute“ ist das aktuelle Datum der Anwendung (in Tests ein fester Referenzwert). Datenfelder siehe `schema/`.

| ID | Anforderung | Gherkin | Quality | ADR |
| --- | --- | --- | --- | --- |
| ORG-UB-1 | Die Webanwendung soll auf `/organizers` alle Veranstalter:innen mit Name, Typ und Stadt auflisten. | `web/veranstalter.feature` · „Übersicht der Veranstalter:innen“ | – | ADR-002 |
| ORG-UB-2 | Die Webanwendung soll auf `/organizers/:id` Name, Typ, Stadt und Website anzeigen. | `web/veranstalter.feature` · „Veranstalterseite zeigt Stammdaten“ | – | ADR-002 |
| ORG-UB-3 | Die Webanwendung soll auf der Veranstalterseite alle Ausstellungen auflisten, deren `festivalId` die ID des Veranstalters ist, mit Ort und Zeitraum. | `web/veranstalter.feature` · „Veranstalterseite listet Ausstellungen“ | – | ADR-002 |
| ORG-ST-1 | Solange einem Veranstalter keine Ausstellungen zugeordnet sind, soll die Webanwendung auf der Veranstalterseite einen Hinweis anzeigen. | `web/veranstalter.feature` · „Veranstalter ohne Ausstellung“ | – | ADR-002 |
| ORG-UB-4 | Die Webanwendung soll auf `/map` und im Ortsverzeichnis den Filter `organizer` bereitstellen, der nur Orte mit mindestens einer Ausstellung dieses Veranstalters zeigt. | `web/veranstalter.feature` · „Festivalfilter in der Karte“ | – | ADR-004 |
