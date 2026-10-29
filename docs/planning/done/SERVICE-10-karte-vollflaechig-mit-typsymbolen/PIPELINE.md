# Pipeline: SERVICE-10 – Karte vollflächig, mit Typ-Symbolen und Legende

**Review-Schwelle:** kritisch + hoch lösen Rücklauf aus (Default, an H1 zu bestätigen)  ·  **Modus:** autonom  ·  **Branch:** feature/SERVICE-10-karte-vollflaechig-mit-typsymbolen  ·  **Quelle:** Idee `docs/product/ideen/20261029-1000 Karte überarbeiten.md`

| Phase | Artefakt(e) | Status | Datum |
| --- | --- | --- | --- |
| 0 Setup | Ordner, PIPELINE.md, Feature-Branch | Erledigt | 2026-10-29 |
| 1 Vision (H1) | EPIC, Annahmen | Freigegeben (Aufruf von spec-pipeline) | 2026-10-29 |
| 2 UserStory | STORY-01, STORY-02 | Erledigt | 2026-10-29 |
| 3 Spezifikation · EARS | web/karte.md (MAP-UB-7 bis MAP-UB-13; ersetzen MAP-UB-3, MAP-UB-6) | Erledigt | 2026-10-29 |
| 3 Spezifikation · Gherkin | web/karte.feature (+6 Szenarien, 2 ersetzt), web/veranstalter.feature, web/festivals.feature (Formulierung) | Erledigt | 2026-10-29 |
| 3 Spezifikation · Quality | web/karte-darstellung.md (Q-USE-9, Q-USE-10); Ergänzungen Q-USE-3, Q-USE-4, Q-PERF-3, Q-SEO-1 | Erledigt | 2026-10-29 |
| 3 Spezifikation · ADR | ADR-016 (Accepted an H2); ADR-004 teilweise ersetzt | Erledigt | 2026-10-29 |
| 3 Spezifikation · Konsistenz | Querbezüge geprüft | Erledigt | 2026-10-29 |
| 4 Tasks | STORY-01: 3, STORY-02: 3 (+ 5 Review-Tasks) | Erledigt | 2026-10-29 |
| 5 Implement | STORY-01 und STORY-02: je TASK-01 bis 03 umgesetzt, Gate grün | Erledigt | 2026-10-29 |
| 6 Human in the Loop (H2) · STORY-01 und STORY-02 | Prüfpaket (gemeinsam, auf Wunsch nach „Wo ist die Legende?“) | Akzeptiert | 2026-10-29 |
| 7 Review · STORY-01 und STORY-02 | `review/` (Architektur, Code, Security je Story; Compliance nicht verfügbar) | Erledigt (Abnahme 2026-10-29: 5 Tasks umgesetzt, 5 zurückgestellt) | 2026-10-29 |

Status: `Offen` · `In Arbeit` · `Erledigt` · `Nicht erforderlich` · `Rücklauf` · `Verworfen`
(an H1: `Entwurf (Intake)` / `Freigegeben`, an H2: `Akzeptiert` / `Abweichung`)

## Rückläufe
| Datum | Herkunft (H2/Review) | Befund | Klasse | Quelle korrigiert | Neu abgeleitet |
| --- | --- | --- | --- | --- | --- |

## Bestätigt (nach Intake, 2026-10-29)
- Fläche: Breite der Boxen auf der Kalenderseite, bis zur Trennlinie oberhalb von Impressum und Datenschutz (MAP-UB-9, Q-USE-10).
- Legende zeigt immer alle fünf Ortstypen (MAP-UB-11).
- Typen unterscheiden sich in Form und Farbe; Vorschlag Säulenbau/Blau, Bilderrahmen/Orange, Raute/Violett, Tür/Rot, Buch/Grün (MAP-UB-10, Gherkin „Symbol und Farbe je Typ“).

## Annahmen (zur Vorlage an H2)
- ANNAHME: Ticket-Key `SERVICE-10`, kein Jira-Ticket.
- ANNAHME: „Die Liste der Orte“ meint die Liste auf `/map`; `/venues` bleibt unverändert und ist die neue Listenalternative (ADR-016, ersetzt in ADR-004 den Punkt „Listenalternative“ teilweise).
- ANNAHME: Die Legende ist HTML-Text bei der Karte (MAP-UB-11); dass sie immer alle fünf Typen zeigt, ist bestätigt.
- ANNAHME: Die Farbwerte der bestätigten Symbole folgen aus dem Kontrast ≥ 3:1 zum Kartenhintergrund.
- ANNAHME: Der Fußbereich steht bei kurzem Inhalt am Fensterrand (Seitenrahmen als Spalte mit Mindesthöhe), damit die Karte bis zur Trennlinie reichen kann (ADR-016).
- ANNAHME: Beim Vorabrendern zeigt `/map` Überschrift, Filter und einen Hinweis mit Link auf `/venues` (MAP-UB-13).
- ANNAHME: Ohne Treffer bleibt die Karte in der Standardansicht sichtbar, der Hinweis aus MAP-UN-1 steht darüber.
- ANNAHME: Die uncommittete Änderung an der Idee-Datei (Status/Ticket) und der neue Idee-Inhalt liegen mit auf dem Feature-Branch.
- ANNAHME: `docs/templates/` fehlt im Repo; Struktur der Artefakte folgt SERVICE-09.
- ANNAHME: Anzahl der Orte und Link zur Ortsliste stehen in einer Zeile oberhalb der Karte (nicht untereinander), damit die Karte auf 1280 × 800 ohne Bildlauf bis zur Trennlinie reicht.
- ANNAHME: `ResizeObserver` in `VenueMap` (Leaflet `invalidateSize`) ist Teil von STORY-01, damit die Karte ihre Größe bei geänderter Höhe behält; stand nicht in der Spezifikation.
- ANNAHME: `main:has(> app-map-page)` (Browser ab Chrome 105 / Firefox 121 / Safari 15.4) ist für die Seitenrahmen-Änderung akzeptiert.
- ANNAHME: Der Seitenrahmen aller Seiten ist jetzt eine Spalte mit Mindesthöhe; bei kurzen Seiten rutscht der Fußbereich an den Fensterrand.
- ANNAHME: Lokal lief Karma mit `CHROME_BIN` auf das Playwright-Chromium (Chrome 130); keine Systeminstallation im Repo-Setup.
- ANNAHME: H2 findet für STORY-01 und STORY-02 gemeinsam statt (Wunsch des Menschen, 2026-10-29); die Reviews (Phase 7) laufen danach je Story auf deren Dateien.
- ANNAHME: Legende steht oberhalb der Karte im Kartenbereich; Symbole 30 px auf der Karte, 24 px in der Legende; Marker-Mittelpunkt liegt auf der Koordinate (kein Pin mit Spitze).
- ANNAHME: `bypassSecurityTrustHtml` für das konstante SVG-Markup der Legende (Angular würde SVG sonst aus `innerHTML` entfernen); kein Datenwert fließt ein.
- Closure: 2026-10-29, Ordner nach `done/` verschoben.
