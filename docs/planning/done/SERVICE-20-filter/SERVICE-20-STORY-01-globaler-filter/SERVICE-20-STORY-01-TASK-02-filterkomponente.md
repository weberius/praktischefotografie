# SERVICE-20-STORY-01-TASK-02 – Filterkomponente

**Story:** SERVICE-20-STORY-01  ·  **Status:** Umgesetzt
**EARS:** FLT-UB-4, FLT-UB-7
**Gherkin:** `web/filter.feature` · Eine Filterbedienung auf jeder Seite, Auswahl aus den Daten
**Quality:** Q-USE-18
**ADR:** ADR-025

## Vorgehen
- `shared/global-filter/`: Komponente `app-global-filter` mit Checkbox-Gruppen (`fieldset`/`legend`) für Ortstypen und Orte (nur Vorkommende, Orte nach Name), Text der aktiven Auswahl, `aria-live`-Zusammenfassung und Schaltfläche „Filter zurücksetzen“.

## Prüfkriterium
Komponententest: Optionen aus den Daten, Auswahl und Zurücksetzen, zugängliche Namen, Tastatur. Prüf-Gate grün.
