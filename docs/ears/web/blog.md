# EARS: Blog: Magazin und Beitrag (Kürzel `BLG`)

**Bereich:** web  ·  **Systemname:** Webanwendung  ·  **Stand:** 2026-10-27

Begriffe: „heute“ ist das aktuelle Datum der Anwendung (in Tests ein fester Referenzwert). Datenfelder siehe `schema/`.

| ID | Anforderung | Gherkin | Quality | ADR |
| --- | --- | --- | --- | --- |
| BLG-UB-1 | Die Webanwendung soll auf der Startseite alle veröffentlichten Beiträge mit Titel, Datum und Kurzvorschau absteigend nach Datum auflisten. | `web/blog.feature` · „Startseite listet Beiträge, neueste zuerst“ | Q-PERF-3 | ADR-002 |
| BLG-UB-2 | Die Webanwendung soll jeden Beitrag in der Liste mit der Detailseite `/posts/:slug` verlinken. | `web/blog.feature` · „Beitrag in der Liste führt zur Detailseite“ | – | ADR-002 |
| BLG-ST-1 | Solange keine veröffentlichten Beiträge vorhanden sind, soll die Webanwendung auf der Startseite einen Hinweis anzeigen. | `web/blog.feature` · „Keine Beiträge vorhanden“ | – | ADR-002 |
| BLG-UN-1 | Wenn das Datum eines Beitrags nach dem heutigen Datum liegt, soll die Webanwendung den Beitrag weder in der Liste noch auf seiner Detailseite anzeigen. | `web/blog.feature` · „Beitrag mit Datum in der Zukunft“ | – | ADR-002 |
| BLG-UB-3 | Die Webanwendung soll auf der Detailseite den Text des Beitrags ohne Frontmatter mit Überschriften und Hervorhebungen darstellen. | `web/blog.feature` · „Beitragstext wird dargestellt“ | – | ADR-002 |
| BLG-UB-4 | Die Webanwendung soll auf der Detailseite die verknüpften Orte mit Name, Adresse und Hinweis auf eine Präsenzbibliothek sowie die verknüpften Ausstellungen mit Titel und Laufzeit anzeigen und auf deren Seiten verlinken. | `web/blog.feature` · „Verknüpfte Orte und Ausstellungen“ | – | ADR-002 |
| BLG-UN-2 | Wenn der Text eines Beitrags nicht geladen werden kann, soll die Webanwendung die Beitragsdaten anzeigen und anstelle des Textes einen Hinweis ausgeben. | `web/blog.feature` · „Beitragstext fehlt“ | – | ADR-002 |
| BLG-UB-5 | Die Webanwendung soll im Beitragstext enthaltenes HTML, Skripte und Ereignisattribute nicht ausführen. | `web/blog.feature` · „Beitragstext ist bereinigt“ | Q-SEC-3 | ADR-002 |
