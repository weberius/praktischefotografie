# EARS: Orte (Kürzel `VNU`)

**Bereich:** web  ·  **Systemname:** Webanwendung  ·  **Stand:** 2026-10-27

Begriffe: „heute“ ist das aktuelle Datum der Anwendung (in Tests ein fester Referenzwert). Datenfelder siehe `schema/`.

| ID | Anforderung | Gherkin | Quality | ADR |
| --- | --- | --- | --- | --- |
| VNU-UB-1 | Die Webanwendung soll auf `/venues` alle Orte mit Name, Typ, Stadt und Besonderheiten auflisten. | `web/orte.feature` · „Verzeichnis listet alle Orte“ | – | ADR-002 |
| VNU-UB-2 | Die Webanwendung soll das Ortsverzeichnis nach Stadt und Typ filterbar machen. | `web/orte.feature` · „Verzeichnis ist filterbar“ | – | ADR-002 |
| VNU-UB-3 | Die Webanwendung soll auf `/venues/:id` Adresse, Website, Eigenschaften sowie Quelle und Prüfstand des Ortes anzeigen. | `web/orte.feature` · „Ortsdetail zeigt Stammdaten“ | – | ADR-002 |
| VNU-UB-4 | Die Webanwendung soll auf der Ortsseite die laufenden und kommenden Ausstellungen und Events des Ortes sowie die verlinkten Beiträge anzeigen. | `web/orte.feature` · „Ortsdetail zeigt Programm und Beiträge“ | – | ADR-002 |
| VNU-UB-5 | Die Webanwendung soll den Typ eines Ortes mit Text und Symbol anzeigen. | `web/orte.feature` · „Typ mit Text und Symbol“ | Q-USE-4 | ADR-002 |
| VNU-ST-1 | Solange ein Ort keine laufenden oder kommenden Ausstellungen und Events hat, soll die Webanwendung auf der Ortsseite einen Hinweis anzeigen. | `web/orte.feature` · „Ort ohne Programm“ | – | ADR-002 |
| VNU-UB-6 | Die Webanwendung soll auf der Ortsseite jede Ausstellung in den laufenden und kommenden Ausstellungen mit der Badge-Zeile (Art, danach Status) oberhalb der Überschrift zeigen. | `web/orte.feature` · „Ausstellungen der Ortsseite tragen Badges“ | Q-USE-4, Q-USE-7 | ADR-015 |

**Ergänzung 2026-10-28:** VNU-UB-6 ergänzt VNU-UB-4; der Status steht in der Badge-Zeile statt unter dem Zeitraum.
