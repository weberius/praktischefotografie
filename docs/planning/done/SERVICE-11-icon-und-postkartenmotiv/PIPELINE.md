# Pipeline: SERVICE-11 – Icon für die Webanwendung und Postkartenmotiv

**Review-Schwelle:** kritisch + hoch lösen Rücklauf aus (Default, an H1 zu bestätigen)  ·  **Modus:** autonom  ·  **Branch:** feature/SERVICE-11-icon-und-postkartenmotiv  ·  **Quelle:** Idee `docs/product/ideen/20261029-1100 image and icon.md`

| Phase | Artefakt(e) | Status | Datum |
| --- | --- | --- | --- |
| 0 Setup | Ordner, PIPELINE.md, Feature-Branch | Erledigt | 2026-10-29 |
| 1 Vision (H1) | EPIC, Annahmen | Freigegeben (Aufruf von spec-pipeline) | 2026-10-29 |
| 2 UserStory | STORY-01, STORY-02, STORY-03 | Erledigt | 2026-10-29 |
| 3 Spezifikation · EARS | web/markenicon.md (ICO-UB-1 bis ICO-UB-6), setup/bildmaterial.md (IMG-UB-1 bis IMG-UB-4) | Erledigt | 2026-10-29 |
| 3 Spezifikation · Gherkin | web/markenicon.feature (7 Szenarien), setup/bildmaterial.feature (4 Szenarien) | Erledigt | 2026-10-29 |
| 3 Spezifikation · Quality | web/markenicon.md (Q-USE-11, Q-PERF-7, Q-MAIN-5); Ergänzungen Q-USE-4, Q-SEO-2 | Erledigt | 2026-10-29 |
| 3 Spezifikation · ADR | ADR-017 (Accepted an H2) | Erledigt | 2026-10-29 |
| 3 Spezifikation · Konsistenz | Querbezüge geprüft | Erledigt | 2026-10-29 |
| 4 Tasks | STORY-01: 4, STORY-02: 1, STORY-03: 1 (+ 6 Review-Tasks) | Erledigt | 2026-10-29 |
| 5 Implement | STORY-01: TASK-01 bis 04, STORY-02: TASK-01, STORY-03: TASK-01 umgesetzt, Gate grün | Erledigt | 2026-10-29 |
| 6 Human in the Loop (H2) · alle Stories gemeinsam | Prüfpaket | Akzeptiert | 2026-10-29 |
| 7 Review · STORY-01, STORY-02 (Architektur, Code, Security), STORY-03 (Code) | `review/` | Erledigt (Abnahme 2026-10-29: 6 Tasks umgesetzt, 5 zurückgestellt) | 2026-10-29 |

Status: `Offen` · `In Arbeit` · `Erledigt` · `Nicht erforderlich` · `Rücklauf` · `Verworfen`
(an H1: `Entwurf (Intake)` / `Freigegeben`, an H2: `Akzeptiert` / `Abweichung`)

## Rückläufe
| Datum | Herkunft (H2/Review) | Befund | Klasse | Quelle korrigiert | Neu abgeleitet |
| --- | --- | --- | --- | --- | --- |

## Annahmen (zur Vorlage an H2)
- ANNAHME: Ticket-Key `SERVICE-11`, kein Jira-Ticket.
- ANNAHME: Zuschnitt des Icons auf das abgerundete Quadrat, Ecken transparent; Postkartenmotiv bis zum Kartenrand (ohne weißen Hintergrund).
- ANNAHME: Ablage `docs/resources/icon.png` und `docs/resources/postkarte.png` (nicht ausgeliefert). `docs/resources/` fehlt in der Ablagestruktur von `AGENTS.md`; es gilt als Quellmaterial.
- ANNAHME: Dateien, Größen und Verlinkung wie in Klangland; Manifest mit `display: standalone`, `theme-color` `#ffffff`, `background_color` `#fafaf7`, Name und Kurzname „Praktische Fotografie“.
- ANNAHME: Icon im Kopf etwa 2 rem groß, Abstand zum Namen etwa 0,5 rem, Quelle `favicon-96x96.png`.
- ANNAHME: Erzeugung per Skript mit dem vorhandenen `playwright-core` (ADR-017, `Proposed`); Ergebnisdateien eingecheckt, Skript nicht im Build.
- ANNAHME: Nutzungsrechte an den Bildern sind nicht Teil dieses Tickets (Klärung durch den Menschen).
- ANNAHME: Die Idee-Datei beginnt mit einer Leerzeile vor dem Dateikopf; unverändert gelassen.
- ANNAHME: Die uncommittete Änderung an der Idee-Datei (Status/Ticket) liegt mit auf dem Feature-Branch.
- ANNAHME: H2 findet für alle drei Stories gemeinsam statt (wie bei SERVICE-10 auf Wunsch des Menschen); die Reviews laufen danach je Story auf deren Dateien.
- ANNAHME: Q-PERF-7 angepasst (Umsetzung): Manifest-Icons ≤ 80 kB (192) und ≤ 400 kB (512) statt ≤ 60 kB und ≤ 200 kB; das Foto-Motiv ergibt 65 kB und 357 kB, die Dateien werden nur beim Anlegen einer Verknüpfung geladen.
- ANNAHME: 512 × 512 wird aus dem 450 × 450 großen Master hochskaliert (leicht weicher); die Quelle gibt keine größere Auflösung her.
- ANNAHME: `favicon.ico` enthält PNG-Daten (16, 32, 48 px), lesbar ab Windows Vista und in allen Browsern.
- ANNAHME: Skript und die zwei Browser-Tests in `test/make-icons.test.mjs` brauchen ein Chromium (`CHROME_BIN`); ohne Chromium werden diese Tests mit einer Meldung übersprungen. In der CI läuft `npm test` im Wurzelverzeichnis ohne `CHROME_BIN` (der Schritt in `web/` setzt es nur dort); die Zuschnitt-Tests laufen dort also nicht, die Datei-Tests (Größen, ICO, Manifest, Verweise, Postkarte) laufen immer.
- ANNAHME: Das Quality-Werkzeug (`npm run quality`) meldet auf `main` wie mit dem Icon dieselben 8 Befunde (5 doppelte Titel der Magazinbeiträge, Lighthouse-Performance < 90 für `/`, `/map` und eine Ortsseite); sie sind nicht durch SERVICE-11 verursacht (Werte schwanken: mit Icon 83/70/79, ohne 80/75/84).
- ANNAHME: Die CI-Zeile `npm run build -- --base-href …` ist im Workflow mit `working-directory: web` gesetzt; im Wurzelverzeichnis würde `npm run build -- --base-href` die Argumente nicht an `ng build` weiterreichen. Unverändert gelassen.
- Closure: 2026-10-29, Ordner nach `done/` verschoben.
