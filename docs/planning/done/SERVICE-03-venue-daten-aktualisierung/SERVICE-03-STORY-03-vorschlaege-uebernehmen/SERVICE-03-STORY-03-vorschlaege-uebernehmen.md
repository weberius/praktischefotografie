# SERVICE-03-STORY-03 – Vorschläge prüfen und freigegeben übernehmen

**Als** Redakteur:in **möchte ich** Vorschläge prüfen und gezielt freigeben **damit** nur gesicherte Angaben in die Daten gelangen und von mir bestätigte Angaben geschützt bleiben.

## Akzeptanzkriterien
1. Ohne Freigabe ändert sich keine Datei in `data/`.
2. Freigegebene Vorschläge werden übernommen; Quelle und Prüfdatum des Ortes werden aktualisiert.
3. Orte mit Status „verifiziert“ werden nicht automatisch geändert, sondern als Konflikt gemeldet; der Status „verifiziert“ wird nie automatisch vergeben.
4. Führt die Übernahme zu ungültigen Daten, bleibt alles unverändert, und die Fehler werden genannt.
5. Nach jedem Lauf liegt ein Bericht mit Orten, Vorschlägen und Konflikten vor.

## Abhängigkeiten
STORY-02

## Spezifikation (Phase 3, vorab erstellt)
- EARS: UPD-UB-3, UPD-EV-2, UPD-UB-4, UPD-UN-1, UPD-EV-3
- Gherkin: `setup/datenaktualisierung.feature`
- Quality: Q-DATA-3, Q-DATA-1, Q-REL-1
- ADR: ADR-007

**INVEST:** I (abhängig) N ✔ V ✔ E ✔ S ✔ T ✔
