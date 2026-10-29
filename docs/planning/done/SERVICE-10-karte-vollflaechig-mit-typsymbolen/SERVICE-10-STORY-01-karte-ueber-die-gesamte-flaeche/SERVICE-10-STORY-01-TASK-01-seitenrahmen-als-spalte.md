# SERVICE-10-STORY-01-TASK-01 – Seitenrahmen als Spalte mit Mindesthöhe
- **Story:** STORY-01
- **EARS:** MAP-UB-9 (Voraussetzung)
- **Gherkin:** `web/karte.feature` · Karte füllt die Fläche (Fußbereich am Fensterrand)
- **Quality:** Q-USE-10
- **ADR:** ADR-016
- **Aufgabe:** `app-root` zur Spalte mit Mindesthöhe des Fensters machen, `main` wächst; Fußbereich steht bei kurzem Inhalt am Fensterrand; übrige Seiten unverändert.
- **Prüfkriterium:** Test: auf kurzer Seite (z. B. `/impressum`) liegt der Fußbereich am unteren Fensterrand (± 1 px), auf langer Seite unterhalb des Inhalts; Build, Tests, Lint grün.
