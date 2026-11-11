# Pipeline: SERVICE-29 – Fotografie-Orte in Essen

**Review-Schwelle:** kritisch + hoch lösen Rücklauf aus (Default, an H1 zu bestätigen)  ·  **Modus:** autonom  ·  **Branch:** feature/SERVICE-29-essen-venues  ·  **Quelle:** Idee `docs/product/ideen/idee-020-essen-veneus.md`

| Phase | Artefakt(e) | Status | Datum |
| --- | --- | --- | --- |
| 0 Setup | Ordner, PIPELINE.md, Feature-Branch | Erledigt | 2026-11-11 |
| 1 Vision (H1) | EPIC, Annahmen | Freigegeben (Aufruf von `/spec-pipeline`, Schwelle kritisch + hoch) | 2026-11-11 |
| 2 UserStory | STORY-01 | Erledigt | 2026-11-11 |
| 3 Spezifikation · EARS | content/venue-erfassung.md (VEN-UB-15, VEN-UB-16) | Erledigt | 2026-11-11 |
| 3 Spezifikation · Gherkin | content/daten.feature („Essener Orte sind im Katalog“, „Essener Orte liegen in Essen“) | Erledigt | 2026-11-11 |
| 3 Spezifikation · Quality | content/datenqualitaet.md (Q-DATA-24) | Erledigt | 2026-11-11 |
| 3 Spezifikation · ADR | nicht erforderlich | Nicht erforderlich | 2026-11-11 |
| 3 Spezifikation · Konsistenz | siehe unten | Erledigt | 2026-11-11 |
| 4 Tasks | STORY-01-TASK-01 | Erledigt | 2026-11-11 |
| 5 Implement | `data/venues.json` (+1), `test/bestand.test.mjs`, Changelog; Build, `npm test`, Lint, `validate:data` grün; `web:test` nicht ausgeführt | Erledigt | 2026-11-11 |
| 6 Human in the Loop (H2) | Prüfpaket, Annahmen bestätigt | Akzeptiert | 2026-11-11 |
| 7 Review | Eigenprüfung Daten und Test: keine Befunde | Erledigt | 2026-11-11 |

Status: `Offen` · `In Arbeit` · `Erledigt` · `Nicht erforderlich` · `Rücklauf` · `Verworfen`
(an H1: `Entwurf (Intake)` / `Freigegeben`, an H2: `Akzeptiert` / `Abweichung`)

## ADR
Nicht erforderlich: reine Datenerfassung im bestehenden Modell. Geltende ADRs als Leitplanken: ADR-001 (Schema-Validierung), ADR-006 (Abruf mit robots.txt, für die Recherche der Seiten), ADR-009 (Veranstalter und Festivals getrennt von Orten).

## Konsistenzcheck (Phase 3)
- STORY-01: 1 bis 5 → VEN-UB-15, VEN-UB-16, VEN-UB-2, VEN-UB-3, VEN-UB-5, VEN-UB-8, DAT-UB-2 bis DAT-UB-4, Q-DATA-2, Q-DATA-24.
- Jede neue EARS-Anforderung hat ein Gherkin-Szenario; Q-DATA-24 hat Maß und Prüfverfahren.
- Kein Supersede: Bestand 40 → 41 liegt in der Grenze 20–60 (VEN-UB-8, Q-DATA-21); bestehende Szenarien bleiben gültig.
- Befund für Phase 4/5: `data/venues.json` (1 Ort, Recherche mit `npm run data:fetch` und Belegen), `test/bestand.test.mjs` (Test für Essener Orte analog zu Dortmund), ggf. weitere Bestandszählungen in Tests (Wert 40). Ausstellungen und Events folgen über `/update-venue-data` und `/research-events` (kein Task).

## Rückläufe
| Datum | Herkunft (H2/Review) | Befund | Klasse | Quelle korrigiert | Neu abgeleitet |
| --- | --- | --- | --- | --- | --- |

## Annahmen (zur Vorlage an H1/H2)
Siehe EPIC `SERVICE-29-essen-venues.md`, Abschnitt „Annahmen“ (7 Punkte):
- ANNAHME: Museum Folkwang und Ruhr Museum bereits erfasst, nicht doppelt.
- ANNAHME: Zentrum für Fotografie, Pixelprojekt Ruhrgebiet und Zollverein sind keine eigenen Orte.
- ANNAHME: Folkwang Universität der Künste als ein Ort, Typ `foundation`, `id` `folkwang-universitaet-der-kuenste-essen`; Hauptstandort laut Recherche.
- ANNAHME: Websites, Anschriften, Koordinaten und Besonderheiten aus der Recherche; `source.status` `recherchiert`.
- ANNAHME: Platzhalter (`EntityCard`, `googleusercontent`) der Idee werden ignoriert.
- ANNAHME: Nur Ortsdaten; Ausstellungen und Events später über die vorhandenen Skills.
- ANNAHME: Der Branch geht von `main` aus; keine nicht committeten Änderungen.
