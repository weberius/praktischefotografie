# SERVICE-09-STORY-02-TASK-01 – Vertikaler Abstand in der Komponente
- **Story:** STORY-02
- **EARS:** BDG-UB-5
- **Gherkin:** `web/badges.feature` · Abstand zur vorhergehenden und nachfolgenden Zeile
- **Quality:** Q-USE-8
- **ADR:** ADR-015
- **Aufgabe:** `:host { margin: 0.75rem 0 }`, `:host(:first-child) { margin-top: 0 }`; Test auf berechnete Außenabstände.
- **Prüfkriterium:** Karma-Tests grün (0,75 rem, am Blockanfang 0).
