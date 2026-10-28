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
| BLG-UB-6 | Die Webanwendung soll in der Liste bei einem Beitrag, dessen Kennung auf einen Anlass (`neu`, `eroeffnung`, `endet-bald`, `ende`) endet und der eine vorhandene Ausstellung verknüpft, zwei Badges als Text zeigen: den Anlass („Neu“, „Eröffnung“, „Endet bald“, „Beendet“) und die Art der Ausstellung (z. B. „Gruppenausstellung“). | `web/blog.feature` · „Beitrag zu einer Ausstellung zeigt Badges“ | Q-USE-4 | ADR-002, ADR-013 |
| BLG-UB-7 | Die Webanwendung soll jede Karte in der Liste in der Reihenfolge Datum des Beitrags, Badges, Titel als Link auf die Detailseite und Kurzvorschau aufbauen. | `web/blog.feature` · „Aufbau der Karte“ | Q-USE-6 | ADR-002 |
| BLG-ST-2 | Solange ein Beitrag keine Anlass-Kennung oder keine verknüpfte Ausstellung hat, soll die Webanwendung seine Karte ohne Badges in der Reihenfolge Datum, Titel, Kurzvorschau anzeigen. | `web/blog.feature` · „Beitrag ohne Ausstellung“ | – | ADR-002, ADR-013 |
| BLG-UN-3 | Wenn die verknüpfte Ausstellung eines Beitrags in den Daten nicht vorhanden ist, soll die Webanwendung die Badges weglassen und die übrige Karte unverändert anzeigen. | `web/blog.feature` · „Verknüpfung ohne Datensatz“ | – | ADR-002 |
| BLG-UB-8 | Die Webanwendung soll auf der Detailseite eines Beitrags, der die Bedingungen von BLG-UB-6 erfüllt, unter dem Datum dieselben Badges (Anlass und Art der Ausstellung) zeigen. | `web/blog.feature` · „Beitragsseite zeigt Badges“ | Q-USE-4 | ADR-002, ADR-013 |

**Ergänzung 2026-10-28:** BLG-UB-6 bis BLG-UB-8 ergänzen BLG-UB-1 und BLG-UB-2; die Überschrift der Karte bleibt der Titel des Beitrags als Link auf die Detailseite (BLG-UB-2). Der Titel einer Neuigkeit lautet „Ausstellungstitel in Stadt“ (NWS-UB-7), ein eigener Ortslink in der Karte entfällt; die Venue verlinkt die Beitragsseite (BLG-UB-4). Die Beitragsseite zeigt dieselben Badges (BLG-UB-8). Die Badges nutzen dieselbe Darstellung wie Status und Art in den Ausstellungslisten (EXH-UB-2, EXH-UB-6).
