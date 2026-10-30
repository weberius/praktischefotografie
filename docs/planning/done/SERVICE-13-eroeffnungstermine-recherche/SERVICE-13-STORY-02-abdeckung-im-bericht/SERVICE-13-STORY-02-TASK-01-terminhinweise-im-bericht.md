# SERVICE-13-STORY-02-TASK-01-terminhinweise-im-bericht – Terminhinweise im Bericht zählen

**Story:** SERVICE-13-STORY-02  ·  **Status:** Umgesetzt
**EARS:** OPN-EV-1
**Gherkin:** setup/eroeffnungstermine.feature · Bericht zeigt Terminhinweise, Bericht ohne Netz
**Quality:** Q-DATA-13, Q-MAIN-2
**ADR:** ADR-007

## Vorgehen
- `report.mjs`: Abschnitt „Termine“ je Quelle mit Snapshots (aus `.cache/snapshots/`): Zahl Snapshots mit Eröffnungs- bzw. Finissagehinweis (Modul `termine.mjs`), Zahl der Vernissage- bzw. Finissage-Vorschläge, bereits vorhandene (als Dublette verworfen); „zu prüfen“ bei Hinweisen ohne Vorschlag und ohne vorhandenen Termin.
- Keine Netzanfrage. Tests mit Snapshot-Fixtures und Zeitmessung (20 Quellen ≤ 5 s).

## Prüfkriterium
Beide Szenarien als Tests grün; Q-DATA-13 gemessen; Prüf-Gate grün.
