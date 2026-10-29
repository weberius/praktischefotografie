# Qualität: Barrierefreiheit (web)

**Stand:** 2026-10-27. Ziel: WCAG 2.1 AA.

| ID | Szenario | Maß | Prüfverfahren | EARS |
| --- | --- | --- | --- | --- |
| Q-USE-2 | Besucher:in nutzt Screenreader und Browser-Standardeinstellungen auf allen Seitentypen. | 0 axe-Verstöße (WCAG 2.1 A/AA) auf je einer Seite jedes Seitentyps aus NAV-UB-2 sowie auf Hinweis- und Fehlerseite. | axe-core im Browser (Playwright) gegen den Produktionsbuild | NAV-EV-1, NAV-UN-1 |
| Q-USE-3 | Besucher:in bedient die Anwendung nur mit der Tastatur. | Navigation, Filter, Listen und Links sind per Tab und Enter erreichbar; Fokus ist sichtbar; Karteninhalte sind vollständig über die Liste erreichbar. | Playwright-Tastaturtest und Review der Komponenten | NAV-UB-1, MAP-UB-2, MAP-UB-3 |
| Q-USE-4 | Besucher:in mit Farbsehschwäche liest Status und Typen. | 100 % der Status-, Typ- und Kennzeichnungsanzeigen enthalten Text; Kontrast ≥ 4,5:1 (axe `color-contrast`). | Komponententests auf Textinhalt; axe | CAL-UB-4, VNU-UB-5, EXH-UB-2, EXH-UB-6, EVT-UB-4 |

**Ergänzung 2026-10-28:** Q-USE-2 bis Q-USE-4 gelten auch für die Festivalseiten (FST-UB-1 bis FST-UB-3); die Partnerkennzeichnung „Offizieller Partner“ ist Text, nicht nur Farbe.

**Ergänzung 2026-10-28:** Q-USE-2 und Q-USE-4 gelten auch für die Karten im Magazin (BLG-UB-6 bis BLG-UB-8; Q-USE-6): Anlass und Art stehen als Text im Badge, jede Karte hat einen Link (die Überschrift).

**Ergänzung 2026-10-29:** Q-USE-3 gilt für die Navigation im Burger-Menü (FRM-UB-1); Prüfung, Maße und Zusatzanforderungen in `seitenrahmen.md` (Q-USE-12, Q-USE-13).

**Ergänzung 2026-10-29:** Q-USE-2 gilt auch für `/haftungsausschluss` und `/quellen` (NAV-UB-7); die rechtlichen Seiten werden zusätzlich nach Q-USE-14 geprüft.
