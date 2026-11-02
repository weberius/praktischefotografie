# SERVICE-20-STORY-01 – Globaler Filter nach Ort und Ortstyp

**Als** Besucher:in **möchte ich** die gesamte Anwendung auf bestimmte Orte und/oder Ortstypen einschränken, **damit** ich nur sehe, was für mich relevant ist, ohne auf jeder Seite neu zu filtern.

## Akzeptanzkriterien
1. Ich kann mehrere Orte und/oder mehrere Ortstypen wählen; Orte und Typen wirken gemeinsam.
2. Der Filter gilt auf Karte, Ortsverzeichnis, Agenda, Ausstellungsliste und Eventliste; Detailseiten und andere Listen bleiben unberührt.
3. Der Filter bleibt beim Seitenwechsel erhalten; nach dem Neuladen ist er leer; es wird nichts gespeichert.
4. Auf jeder dieser Seiten sehe ich dieselbe Bedienung, die aktive Auswahl als Text und eine Möglichkeit zum Zurücksetzen.
5. Er wirkt zusammen mit den seitenlokalen Filtern (Eventtyp, Status, Nur Favoriten).
6. Passt nichts, erscheint ein Hinweis mit Zurücksetzen; Einträge ohne bekannten Ort erscheinen bei gesetztem Filter nicht.
7. Die alten Filter auf Ortsverzeichnis und Karte (Stadt, Typ, Präsenzbibliothek, Ständige Sammlung) sind entfernt; Veranstalter- und Festivalfilter per Adresse funktionieren weiter.
8. Bedienung per Tastatur und Screenreader, Zustand nicht nur über Farbe.

## Abhängigkeiten
Keine.

## Spezifikation (Phase 3, vorab erstellt)
- EARS: FLT-UB-1, FLT-UB-2, FLT-UB-3, FLT-UB-4, FLT-UB-5, FLT-UB-6, FLT-UB-7, FLT-ST-1, FLT-UN-1; MAP-UB-14, MAP-UB-15 (ersetzen MAP-UB-4, MAP-EV-1, MAP-UB-8); entfallen: VNU-UB-2, MAP-UB-2, MAP-UN-1
- Gherkin: `web/filter.feature` (9 Szenarien), `web/karte.feature` (Veranstalter- und Festivalfilter aus der Adresse; Link zur Ortsliste mit Filtern)
- Quality: Q-USE-18, Q-SEC-11
- ADR: ADR-025 (Proposed); ADR-002, ADR-016, ADR-023

**INVEST:** I ✔ N ✔ V ✔ E ✔ S (groß, aber als Ganzes wertvoll; Schnitt in Phase 4 über Tasks) T ✔
