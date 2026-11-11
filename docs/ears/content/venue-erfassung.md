# EARS: Venue-Erfassung NRW (Kürzel `VEN`)

**Bereich:** content  ·  **Systemname:** Datenbasis  ·  **Stand:** 2026-10-27

| ID | Anforderung | Gherkin | Quality | ADR |
| --- | --- | --- | --- | --- |
| VEN-UB-1 | **Ersetzt durch VEN-UB-8.** Die Datenbasis soll mindestens 20 und höchstens 30 Venues in Nordrhein-Westfalen enthalten. | `content/daten.feature` · „Datenbestand enthält 20 bis 30 Venues“ (ersetzt, siehe VEN-UB-8) | Q-DATA-2 | – |
| VEN-UB-2 | Die Datenbasis soll nur Venues mit Koordinaten innerhalb von lat 50.3–52.6 und lng 5.8–9.5 enthalten. | `content/daten.feature` · „Koordinaten liegen in NRW“ | Q-DATA-1 | ADR-001 |
| VEN-UB-3 | Die Datenbasis soll jede Venue mit einer eindeutigen `id` in kebab-case (`^[a-z0-9]+(-[a-z0-9]+)*$`) führen. | `content/daten.feature` · „Venue-IDs sind eindeutig und kebab-case“ | Q-DATA-1 | ADR-001 |
| VEN-UB-4 | Die Datenbasis soll mindestens je eine Venue in Monschau, Köln, Düsseldorf, Essen und Gelsenkirchen enthalten. | `content/daten.feature` · „Kernstädte sind vertreten“ | – | – |
| VEN-UB-5 | Die Datenbasis soll je Venue Quelle und Prüfstand aus der Recherche tragen und keine Venue vom Typ Handel oder Dienstleister (PRD 1.3) enthalten. | `content/daten.feature` · „Jede Venue nennt Quelle und Prüfstand“ | Q-DATA-2 | – |
| VEN-UB-6 | Die Datenbasis soll das Forum für Fotografie Köln (Website `https://de.forum-fotografie.info/`) als Venue mit der `id` `forum-fuer-fotografie-koeln`, dem `type` `gallery` und der Stadt Köln führen. | `content/daten.feature` · „Neue Venues sind im Katalog“ | Q-DATA-1, Q-DATA-2 | – |
| VEN-UB-7 | Die Datenbasis soll das Kunstmuseum Bonn (Website `https://www.kunstmuseum-bonn.de/de/`) als Venue mit der `id` `kunstmuseum-bonn`, dem `type` `museum` und der Stadt Bonn führen. | `content/daten.feature` · „Neue Venues sind im Katalog“ | Q-DATA-1, Q-DATA-2 | – |
| VEN-UB-8 | **Ersetzt VEN-UB-1.** Die Datenbasis soll mindestens 20 und höchstens 60 Venues in Nordrhein-Westfalen enthalten. | `content/daten.feature` · „Datenbestand enthält 20 bis 60 Venues“ | Q-DATA-21 | – |
| VEN-UB-9 | Die Datenbasis soll die Düsseldorfer Museen K20 (`k20-duesseldorf`), K21 (`k21-duesseldorf`), Stadtmuseum (`stadtmuseum-duesseldorf`) und Filmmuseum (`filmmuseum-duesseldorf`) mit dem `type` `museum` und der Stadt Düsseldorf führen. | `content/daten.feature` · „Düsseldorfer Orte sind im Katalog“ | Q-DATA-1, Q-DATA-2, Q-DATA-22 | – |
| VEN-UB-10 | Die Datenbasis soll die Düsseldorfer Galerien Leica Galerie (`leica-galerie-duesseldorf`), Galerie noir blanche (`galerie-noir-blanche-duesseldorf`), Galerie Voss (`galerie-voss-duesseldorf`) und LUMAS (`lumas-duesseldorf`) mit dem `type` `gallery` und der Stadt Düsseldorf führen. | `content/daten.feature` · „Düsseldorfer Orte sind im Katalog“ | Q-DATA-1, Q-DATA-2, Q-DATA-22 | – |
| VEN-UB-11 | Die Datenbasis soll die Sammlung Philara (`sammlung-philara-duesseldorf`) und plan.d. (`plan-d-produzentengalerie-duesseldorf`) mit dem `type` `off_space` sowie die Stiftung Gerhart-Hauptmann-Haus (`gerhart-hauptmann-haus-duesseldorf`) und das Polnische Institut (`polnisches-institut-duesseldorf`) mit dem `type` `foundation` und der Stadt Düsseldorf führen. | `content/daten.feature` · „Düsseldorfer Orte sind im Katalog“ | Q-DATA-1, Q-DATA-2, Q-DATA-22 | – |

**Ersetzt (Bestandsgrenze):** VEN-UB-8 ersetzt VEN-UB-1 (Obergrenze 30 war ein Anfangsstand ohne Begründung und blockierte die Erfassung weiterer Orte; 60 deckt den Bestand nach den Düsseldorf-, Dortmund- und Essen-Erweiterungen ab und bleibt als Plausibilitätsgrenze bestehen). VEN-UB-2 bis VEN-UB-5 gelten unverändert; VEN-UB-5 schließt Händler und Dienstleister weiter aus (die Leica Galerie und LUMAS sind als Ausstellungsräume erfasst, die Webanwendung zeigt keine Verkaufsangebote).

ANNAHME: Website, Adresse und Koordinaten der Düsseldorfer Orte stammen aus der Recherche der Webseiten in der Umsetzung; die Typen von Sammlung Philara, plan.d., Gerhart-Hauptmann-Haus und Polnischem Institut sind Lesarten im festen Typenschema (`foundation` ist der nächstliegende Typ für beide Institute).

ANNAHME: Adresse und Koordinaten der beiden neuen Venues stammen aus der Recherche der Webseiten in der Umsetzung; der Typ ist eine Lesart (Forum: Ausstellungsraum für Fotografie ohne Sammlung; Museum: Haus mit Sammlung, in dem nicht immer eine Fotoausstellung läuft).

REVIEW REQUIRED: VEN-UB-4 hängt vom Rechercheergebnis ab. Fehlt eine Stadt, ist das ein Befund für H2 (Quelle: Daten, nicht Spezifikation).
