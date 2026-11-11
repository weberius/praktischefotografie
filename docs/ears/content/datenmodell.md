# EARS: Datenmodell (Kürzel `DAT`)

**Bereich:** content  ·  **Systemname:** Datenbasis  ·  **Stand:** 2026-10-27

Das Datenmodell folgt [PRD 3.2](../../product/prd.md) und README. Felddetails stehen verbindlich in den Schemas unter `schema/`.

| ID | Anforderung | Gherkin | Quality | ADR |
| --- | --- | --- | --- | --- |
| DAT-UB-1 | Die Datenbasis soll für Venues, Ausstellungen, Events, Organizer, Fotograf:innen und Beiträge je ein JSON-Schema unter `schema/` bereitstellen. | `content/daten.feature` · „Jeder Datensatztyp hat ein Schema“ | Q-DATA-1 | ADR-001 |
| DAT-UB-2 | Die Datenbasis soll jeden Venue-Datensatz mit den Feldern `id`, `name`, `shortName`, `type`, `city`, `address` (`street`, `zip`, `city`, `lat`, `lng`), `website`, `features` und `source` führen. | `content/daten.feature` · „Venue-Datensatz ist vollständig“ | Q-USE-1 | ADR-001 |
| DAT-UB-3 | Die Datenbasis soll für `type` eines Venues nur die Werte `museum`, `gallery`, `foundation`, `off_space` und `library_archive` zulassen. | `content/daten.feature` · „Venue-Typ ist ein erlaubter Wert“ | – | ADR-001 |
| DAT-UB-4 | Die Datenbasis soll je Venue eine `source` mit `url`, `checkedAt` (Datum) und `status` (`recherchiert` oder `verifiziert`) führen. | `content/daten.feature` · „Venue-Datensatz ist vollständig“ | Q-DATA-2 | ADR-001 |
| DAT-OP-1 | Wo `features.hasReferenceLibrary` wahr ist, soll die Datenbasis einen nicht leeren `features.libraryNotes` führen. | `content/daten.feature` · „Präsenzbibliothek erfordert Hinweistext“ | – | ADR-001 |
| DAT-UN-1 | Wenn bei einer Ausstellung oder einem Event `endDate` vor `startDate` liegt, soll die Validierung den Datensatz als fehlerhaft melden. | `content/daten.feature` · „Ausstellung endet nicht vor Beginn“ (umgesetzt durch VAL-UN-5) | Q-DATA-1 | ADR-001 |
| DAT-UB-6 | Die Datenbasis soll je Beitrag optional eine Kurzvorschau `excerpt` (1 bis 300 Zeichen) führen. | `content/daten.feature` · „Beitrag mit Kurzvorschau“ | – | ADR-001 |
| DAT-UB-7 | Die Datenbasis soll für `eventType` eines Events die Werte `fair_and_convention`, `talk`, `symposium`, `workshop`, `vernissage`, `finissage` und `reading` zulassen; `finissage` ergänzt die bisherige Liste. | `content/daten.feature` · „Event-Typ Finissage ist gültig“ | Q-DATA-1 | ADR-001 |
| DAT-UB-8 | **Ersetzt DAT-UB-7.** Die Datenbasis soll für `eventType` eines Events die Werte `fair_and_convention`, `talk`, `symposium`, `workshop`, `vernissage`, `finissage`, `reading` und `guided_tour` zulassen; `guided_tour` ergänzt die bisherige Liste (Führung). | `content/daten.feature` · „Event-Typ Führung ist gültig“ | Q-DATA-1 | ADR-001 |
| DAT-UB-9 | Die Datenbasis soll für ein Event die optionalen Felder `startTime` (Beginn am `startDate`) und `endTime` (Ende am `endDate`) als lokale Uhrzeit im Format `HH:MM` (24 Stunden) und `timeZone` als IANA-Zeitzonenname zulassen; `endTime` und `timeZone` setzen `startTime` voraus (VAL-UN-6). | `content/daten.feature` · „Event mit Uhrzeit ist gültig“, „Uhrzeitfelder sind optional“ | Q-DATA-19 | ADR-001, ADR-027 |
| DAT-UB-10 | Die Datenbasis soll als Zeitzone eines Events ohne `timeZone` `Europe/Berlin` annehmen und eine angenommene Dauer (2 Stunden bei fehlendem `endTime`) nicht speichern. | `content/daten.feature` · „Zeitzone und Dauer werden nicht gespeichert“ | Q-DATA-19 | ADR-027 |

Ergänzung (Beitragsvorschau): DAT-UB-6 erweitert das Datenmodell um ein optionales Feld; bestehende Anforderungen bleiben gültig.

Ergänzung 2026-10-30 (Finissage): DAT-UB-7 ergänzt den Event-Typ `finissage` additiv; bestehende Events bleiben gültig.

Ergänzung 2026-11-10 (Führung): DAT-UB-8 ersetzt DAT-UB-7 und ergänzt den Event-Typ `guided_tour` additiv; bestehende Events und Szenarien bleiben gültig.

Ergänzung (Uhrzeiten): DAT-UB-9 und DAT-UB-10 ergänzen optionale Felder additiv; bestehende Events und Anforderungen bleiben gültig.
