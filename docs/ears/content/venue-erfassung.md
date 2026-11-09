# EARS: Venue-Erfassung NRW (Kürzel `VEN`)

**Bereich:** content  ·  **Systemname:** Datenbasis  ·  **Stand:** 2026-10-27

| ID | Anforderung | Gherkin | Quality | ADR |
| --- | --- | --- | --- | --- |
| VEN-UB-1 | Die Datenbasis soll mindestens 20 und höchstens 30 Venues in Nordrhein-Westfalen enthalten. | `content/daten.feature` · „Datenbestand enthält 20 bis 30 Venues“ | Q-DATA-2 | – |
| VEN-UB-2 | Die Datenbasis soll nur Venues mit Koordinaten innerhalb von lat 50.3–52.6 und lng 5.8–9.5 enthalten. | `content/daten.feature` · „Koordinaten liegen in NRW“ | Q-DATA-1 | ADR-001 |
| VEN-UB-3 | Die Datenbasis soll jede Venue mit einer eindeutigen `id` in kebab-case (`^[a-z0-9]+(-[a-z0-9]+)*$`) führen. | `content/daten.feature` · „Venue-IDs sind eindeutig und kebab-case“ | Q-DATA-1 | ADR-001 |
| VEN-UB-4 | Die Datenbasis soll mindestens je eine Venue in Monschau, Köln, Düsseldorf, Essen und Gelsenkirchen enthalten. | `content/daten.feature` · „Kernstädte sind vertreten“ | – | – |
| VEN-UB-5 | Die Datenbasis soll je Venue Quelle und Prüfstand aus der Recherche tragen und keine Venue vom Typ Handel oder Dienstleister (PRD 1.3) enthalten. | `content/daten.feature` · „Jede Venue nennt Quelle und Prüfstand“ | Q-DATA-2 | – |
| VEN-UB-6 | Die Datenbasis soll das Forum für Fotografie Köln (Website `https://de.forum-fotografie.info/`) als Venue mit der `id` `forum-fuer-fotografie-koeln`, dem `type` `gallery` und der Stadt Köln führen. | `content/daten.feature` · „Neue Venues sind im Katalog“ | Q-DATA-1, Q-DATA-2 | – |
| VEN-UB-7 | Die Datenbasis soll das Kunstmuseum Bonn (Website `https://www.kunstmuseum-bonn.de/`) als Venue mit der `id` `kunstmuseum-bonn`, dem `type` `museum` und der Stadt Bonn führen. | `content/daten.feature` · „Neue Venues sind im Katalog“ | Q-DATA-1, Q-DATA-2 | – |

ANNAHME: Adresse und Koordinaten der beiden neuen Venues stammen aus der Recherche der Webseiten in der Umsetzung; der Typ ist eine Lesart (Forum: Ausstellungsraum für Fotografie ohne Sammlung; Museum: Haus mit Sammlung, in dem nicht immer eine Fotoausstellung läuft).

REVIEW REQUIRED: VEN-UB-4 hängt vom Rechercheergebnis ab. Fehlt eine Stadt, ist das ein Befund für H2 (Quelle: Daten, nicht Spezifikation).
