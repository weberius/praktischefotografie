# SERVICE-10-STORY-01-TASK-03 – Karte füllt die Fläche bis zur Trennlinie
- **Story:** STORY-01
- **EARS:** MAP-UB-9
- **Gherkin:** `web/karte.feature` · Karte füllt die Fläche, Karte in kleinem Fenster
- **Quality:** Q-USE-10, Q-PERF-3
- **ADR:** ADR-016
- **Aufgabe:** Karte in Breite des Inhaltsbereichs, unterhalb der Filter bis zur Trennlinie über dem Fußbereich, mindestens 24 rem; unteren Innenabstand von `main` auf `/map` entfernen; feste Höhe 26 rem ablösen.
- **Prüfkriterium:** Layout-Tests (getBoundingClientRect) in 1280 × 800 und 390 × 500: Breite = Breite einer Karte auf `/calendar` (± 1 px), Unterkante = Oberkante Fußbereich (± 1 px) bzw. Höhe ≥ 24 rem; Build, Tests, Lint grün.
