# SERVICE-05-STORY-03-TASK-02 – Festivalübersicht, Festivalseite, Navigation und Prerender
- **Story:** STORY-03
- **EARS:** FST-UB-1 bis FST-UB-4, FST-ST-1, FST-ST-2, NAV-UB-5, NAV-UB-6
- **Gherkin:** `web/festivals.feature` · Übersicht, Stammdaten, Ausstellungen, ohne Ausstellung, Keine Festivals; `web/navigation.feature`
- **Quality:** Q-USE-2 bis Q-USE-4, Q-SEO-1 bis Q-SEO-3
- **ADR:** ADR-002, ADR-009
- **Aufgabe:** Seiten `/festivals` und `/festivals/:id`, Routen, Prerender-Parameter, Navigationspunkt „Festivals“, Browserprüfung.
- **Prüfkriterium:** Karma-Tests grün; Build prerendert Festivalseiten (sofern Festivals vorhanden).
