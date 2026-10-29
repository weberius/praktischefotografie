# SERVICE-10-STORY-01-TASK-02 – Ortsliste auf /map entfernen, Link zur Ortsliste mit Filtern
- **Story:** STORY-01
- **EARS:** MAP-UB-7, MAP-UB-8, MAP-UB-13; unverändert MAP-UB-2, MAP-UB-4, MAP-EV-1, MAP-UN-1
- **Gherkin:** `web/karte.feature` · Karte ohne Ortsliste, Link zur Ortsliste mit Filtern, Karte nur im Browser, Kein Treffer; `web/veranstalter.feature`, `web/festivals.feature` (Karte zeigt nur diese Orte)
- **Quality:** Q-USE-3, Q-SEO-1
- **ADR:** ADR-016, ADR-004
- **Aufgabe:** Liste und Überschrift „Orte als Liste“ aus `map.html` entfernen; Link auf `/venues` mit den gesetzten Filtern (direkt nach den Filtern, vor der Karte); bei fehlenden Treffern Hinweis mit Schaltfläche oberhalb der Karte; Spec-Tests auf Marker statt Liste umstellen.
- **Prüfkriterium:** Tests zu den genannten Szenarien grün; keine `ul.card-list` auf `/map`; Link trägt alle sechs Filterparameter; Build prerendert `/map` mit Link; Build, Tests, Lint grün.
