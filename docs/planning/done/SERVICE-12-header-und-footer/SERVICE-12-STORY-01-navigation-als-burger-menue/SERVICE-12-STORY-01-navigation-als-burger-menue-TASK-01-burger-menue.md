# SERVICE-12-STORY-01-TASK-01 – Navigation als Burger-Menü
- **Status:** Umgesetzt
- **Story:** STORY-01
- **EARS:** FRM-UB-1, FRM-ST-1, FRM-EV-1, FRM-EV-2, FRM-EV-3, NAV-UB-8
- **Gherkin:** `web/seitenrahmen.feature` · Navigation steht hinter dem Burger-Menü, Menü öffnen und schließen, Menü schließt nach der Auswahl, Menü schließt mit Escape; `web/navigation.feature` · Navigation ist auf jeder Seite vorhanden
- **Quality:** Q-USE-12 (Attribute, Tab, Escape, Schaltflächengröße), Q-PERF-8 (kein Skript-Layout)
- **ADR:** ADR-002
- **Aufgabe:** `app.ts`: Signal `menuOpen`, Methoden zum Umschalten/Schließen, Schließen bei `NavigationEnd` und bei Escape (Fokus auf die Schaltfläche). `app.html`: `<button>` mit `aria-expanded`, `aria-controls`, Namen „Menü öffnen/schließen“ rechts im Kopf; `<nav id="main-nav">` mit den bisherigen Links, die Klassen `open` und `display: none` im geschlossenen Zustand. CSS: Schaltfläche 2,5 × 2,5 rem mit drei Balken ohne Bildbibliothek, Feld in voller Breite unter dem Kopf über dem Inhalt (wie Klangland), aktiver Link erkennbar.
- **Prüfkriterium:** Komponententests zu den vier Szenarien (Breite 1280 und 390 über Prüfung der berechneten Stile, Attribute, Namen, Tab-Erreichbarkeit im geschlossenen Zustand, Linkwahl, Escape + Fokus); Link-Test in `app.spec.ts` bleibt grün; Prüf-Gate grün.
