# Pipeline: SERVICE-30 – Weitere Fotografie-Orte in NRW

**Review-Schwelle:** kritisch + hoch lösen Rücklauf aus (Default, an H1 zu bestätigen)  ·  **Modus:** autonom  ·  **Branch:** feature/SERVICE-30-nrw-venues  ·  **Quelle:** Idee `docs/product/ideen/idee-021-nrw-venues.md`

| Phase | Artefakt(e) | Status | Datum |
| --- | --- | --- | --- |
| 0 Setup | Ordner, PIPELINE.md, Feature-Branch | Erledigt | 2026-11-11 |
| 1 Vision (H1) | EPIC, Annahmen | Freigegeben (Aufruf von `/spec-pipeline`, Schwelle kritisch + hoch) | 2026-11-11 |
| 2 UserStory | STORY-01 | Erledigt | 2026-11-11 |
| 3 Spezifikation · EARS | content/venue-erfassung.md (VEN-UB-17 bis VEN-UB-19) | Erledigt | 2026-11-11 |
| 3 Spezifikation · Gherkin | content/daten.feature („Weitere NRW-Orte sind im Katalog“, „Weitere NRW-Orte liegen in ihrer Stadt“) | Erledigt | 2026-11-11 |
| 3 Spezifikation · Quality | content/datenqualitaet.md (Q-DATA-25) | Erledigt | 2026-11-11 |
| 3 Spezifikation · ADR | nicht erforderlich | Nicht erforderlich | 2026-11-11 |
| 3 Spezifikation · Konsistenz | siehe unten | Erledigt | 2026-11-11 |
| 4 Tasks | STORY-01-TASK-01 | Erledigt | 2026-11-11 |
| 5 Implement | `data/venues.json` (+6), `test/bestand.test.mjs`, Changelog; Build, `npm test`, Lint, `validate:data` grün; `web:test` nicht ausgeführt | Erledigt | 2026-11-11 |
| 6 Human in the Loop (H2) | Prüfpaket, Annahmen bestätigt | Akzeptiert | 2026-11-11 |
| 7 Review | Eigenprüfung Daten und Test: keine Befunde | Erledigt | 2026-11-11 |

Status: `Offen` · `In Arbeit` · `Erledigt` · `Nicht erforderlich` · `Rücklauf` · `Verworfen`
(an H1: `Entwurf (Intake)` / `Freigegeben`, an H2: `Akzeptiert` / `Abweichung`)

## ADR
Nicht erforderlich: reine Datenerfassung im bestehenden Modell. Geltende ADRs als Leitplanken: ADR-001 (Schema-Validierung), ADR-006 (Abruf mit robots.txt, für die Recherche der Seiten), ADR-009 (Veranstalter und Festivals getrennt von Orten).

## Konsistenzcheck (Phase 3)
- STORY-01: 1 bis 5 → VEN-UB-17, VEN-UB-18, VEN-UB-19, VEN-UB-2, VEN-UB-3, VEN-UB-5, VEN-UB-8, DAT-UB-2 bis DAT-UB-4, Q-DATA-2, Q-DATA-25.
- Jede neue EARS-Anforderung hat ein Gherkin-Szenario; Q-DATA-25 hat Maß und Prüfverfahren.
- Kein Supersede: Bestand 41 → 47 liegt in der Grenze 20–60 (VEN-UB-8, Q-DATA-21); bestehende Szenarien bleiben gültig.
- Befund für Phase 4/5: `data/venues.json` (6 Orte, Recherche mit `npm run data:fetch` und Belegen), `test/bestand.test.mjs` (Test analog zu Essen/Dortmund), ggf. weitere Bestandszählungen in Tests (Wert 41). Ausstellungen und Events folgen über `/update-venue-data` und `/research-events` (kein Task).

## Rückläufe
| Datum | Herkunft (H2/Review) | Befund | Klasse | Quelle korrigiert | Neu abgeleitet |
| --- | --- | --- | --- | --- | --- |

## Annahmen (zur Vorlage an H1/H2)
Siehe EPIC `SERVICE-30-nrw-venues.md`, Abschnitt „Annahmen“ (8 Punkte):
- ANNAHME: Keiner der sechs Orte ist bereits erfasst.
- ANNAHME: Typen: Kulturinstitut `foundation`, Gasometer `gallery`, übrige `museum`.
- ANNAHME: Kunstmuseen Krefeld als ein Ort (Hauptstandort Kaiser Wilhelm Museum).
- ANNAHME: IDs nach Muster `<name>-<stadt>`, endgültig in der Umsetzung.
- ANNAHME: Website, Anschrift, Koordinaten aus der Recherche; `source.status` `recherchiert`.
- ANNAHME: Schließzeiten des Gasometers sind ein Befund für H2, kein Ausschlussgrund.
- ANNAHME: Nur Ortsdaten; Ausstellungen und Events später über die vorhandenen Skills.
- ANNAHME: Der Branch geht von `main` aus; keine nicht committeten Änderungen.
