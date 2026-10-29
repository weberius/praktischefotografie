# SERVICE-12-STORY-02-TASK-01 – Name „Zentrum für praktische Fotografie“ im Kopfbereich
- **Status:** Umgesetzt
- **Story:** STORY-02
- **EARS:** ICO-UB-7, ICO-UB-8, ICO-UB-6
- **Gherkin:** `web/markenicon.feature` · Icon im Kopfbereich, Icon auf jeder Seite gleich
- **Quality:** Q-USE-11, Q-USE-13 (Umbruch, kein horizontales Scrollen)
- **ADR:** ADR-017, ADR-002
- **Aufgabe:** Text im Startseiten-Link in `app.html` ändern; Tests in `app.spec.ts` (Reihenfolge, Name, Alt) auf den neuen Namen umstellen; Seitentitel-Test (NAV-UB-3) und `SITE_NAME` unverändert lassen; CSS: Name darf umbrechen, Link schrumpft vor der Schaltfläche (`min-width: 0`, `flex: 1`).
- **Prüfkriterium:** Komponententests wie zuvor mit neuem Namen; Test, dass `document.title` weiter „Praktische Fotografie“ enthält; Sichtprüfung bei 320 und 390 Pixeln; Prüf-Gate grün.
