# SERVICE-11-STORY-02-TASK-01 – Icon im Kopfbereich vor dem Namen
- **Story:** STORY-02
- **EARS:** ICO-UB-3, ICO-UB-4, ICO-UB-5, ICO-UB-6
- **Gherkin:** `web/markenicon.feature` · Icon im Kopfbereich, Icon auf jeder Seite gleich, Pfade relativ zum Basispfad
- **Quality:** Q-USE-11, Q-PERF-7
- **ADR:** ADR-017, ADR-002
- **Aufgabe:** `app.html`: `<img src="favicon-96x96.png" alt="" aria-hidden="true" width height>` im Startseiten-Link vor dem Text; CSS: Flex, Abstand, Größe 2 rem; keine Verdrängung der Navigation auf schmalen Bildschirmen.
- **Prüfkriterium:** Komponententest: Reihenfolge Icon/Text, leeres Alt und aria-hidden, Link-Name, relative `src`, Breite/Höhe-Attribute, Kopfzeilenhöhe ≤ 4 rem, auf mehreren Seiten gleich; Sichtprüfung 1280 und 390 px; Build, Tests, Lint grün.
