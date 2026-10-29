# SERVICE-12-STORY-05-TASK-02 – Impressum und Datenschutz überarbeiten
- **Status:** Umgesetzt
- **Story:** STORY-05
- **EARS:** RCH-UB-1, RCH-UB-3, RCH-UB-5, NAV-UB-4
- **Gherkin:** `web/rechtliches.feature` · Impressum nennt den Betreiber, Datenschutzerklärung entspricht dem Verhalten der Anwendung, Keine Reste von Klangland; `web/navigation.feature` · Datenschutzseite nennt Kartenabruf
- **Quality:** Q-USE-14, Q-SEC-2
- **ADR:** ADR-002, ADR-003, ADR-004
- **Aufgabe:** Impressum nach dem Klangland-Impressum mit den Betreiberangaben, ohne Platzhalter und Hinweis auf fehlende Angaben (Hinweis zu Orts- und Veranstaltungsangaben wandert in den Haftungsausschluss); Datenschutz: Datenschutz auf einen Blick, Datenerfassung (Server-Logs, Kartenkacheln nur auf `/map`, keine Cookies/kein Tracking), Hosting GitHub Pages, Rechte, Verantwortlicher mit Verweis auf das Impressum; Meta-Beschreibungen.
- **Prüfkriterium:** Komponententests (Betreiberangaben, keine `[`-Platzhalter, „OpenStreetMap“, Verweis aufs Impressum, keine Klangland-Begriffe); Prüf-Gate grün.
