# SERVICE-03-STORY-01-TASK-02 – Abrufdienst mit Höflichkeitsregeln
- **Story:** STORY-01
- **EARS:** FET-EV-1, FET-UB-1, FET-UB-2, FET-UB-3, FET-UN-2, FET-UB-5
- **Gherkin:** `setup/webseiten-abruf.feature` · „Abruf von Startseite und Unterseiten“, „robots.txt wird beachtet“, „Höflichkeitsregeln“, „Kennung im User-Agent“, „Weiterleitung auf anderen Host“, „Nur lesende Abrufe“
- **Quality:** Q-SEC-4, Q-PERF-5, Q-MAIN-2
- **ADR:** ADR-006
- **Aufgabe:** `lib/fetcher.mjs`: Linkfindung, robots.txt, Abstand je Host, Zeitlimit, Größenlimit, Seitenlimit, Weiterleitungsregel, nur http(s), Kennung im User-Agent.
- **Prüfkriterium:** Node-Tests mit lokalem Testserver zu den sechs Szenarien grün.
