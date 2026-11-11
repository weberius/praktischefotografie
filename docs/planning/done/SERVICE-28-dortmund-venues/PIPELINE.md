# Pipeline: SERVICE-28 – Fotografie-Orte in Dortmund

**Review-Schwelle:** kritisch + hoch lösen Rücklauf aus (Default, an H1 zu bestätigen)  ·  **Modus:** autonom  ·  **Branch:** feature/SERVICE-28-dortmund-venues  ·  **Quelle:** Idee `docs/product/ideen/idee-019-dortmund-veneus.md`

| Phase | Artefakt(e) | Status | Datum |
| --- | --- | --- | --- |
| 0 Setup | Ordner, PIPELINE.md, Feature-Branch | Erledigt | 2026-11-11 |
| 1 Vision (H1) | EPIC, Annahmen | Freigegeben (Aufruf von `/spec-pipeline`, Schwelle kritisch + hoch) | 2026-11-11 |
| 2 UserStory | STORY-01, STORY-02 | Erledigt | 2026-11-11 |
| 3 Spezifikation · EARS | content/venue-erfassung.md (VEN-UB-12 bis VEN-UB-14) | Erledigt | 2026-11-11 |
| 3 Spezifikation · Gherkin | content/daten.feature („Dortmunder Orte sind im Katalog“, „Dortmunder Orte liegen in Dortmund“) | Erledigt | 2026-11-11 |
| 3 Spezifikation · Quality | content/datenqualitaet.md (Q-DATA-23) | Erledigt | 2026-11-11 |
| 3 Spezifikation · ADR | nicht erforderlich | Nicht erforderlich | 2026-11-11 |
| 3 Spezifikation · Konsistenz | siehe unten | Erledigt | 2026-11-11 |
| 4 Tasks | STORY-01-TASK-01, STORY-02-TASK-01 | Erledigt | 2026-11-11 |
| 5 Implement | `data/venues.json` (+4), `test/bestand.test.mjs`, Changelogs; Build, `npm test` (277), Lint grün; `web:test` nicht lauffähig (kein Chrome) | Erledigt | 2026-11-11 |
| 6 Human in the Loop (H2) | Prüfpaket, Annahmen bestätigt | Akzeptiert | 2026-11-11 |
| 7 Review | Eigenprüfung Daten und Test: keine Befunde (Belege und Koordinaten stichprobenartig gegen Webseiten geprüft) | Erledigt | 2026-11-11 |

Status: `Offen` · `In Arbeit` · `Erledigt` · `Nicht erforderlich` · `Rücklauf` · `Verworfen`
(an H1: `Entwurf (Intake)` / `Freigegeben`, an H2: `Akzeptiert` / `Abweichung`)

## ADR
Nicht erforderlich: reine Datenerfassung im bestehenden Modell. Geltende ADRs als Leitplanken: ADR-001 (Schema-Validierung), ADR-006 (Abruf mit robots.txt, für die Recherche der Seiten), ADR-009 (Veranstalter und Festivals getrennt von Orten).

## Konsistenzcheck (Phase 3)
- STORY-01: 1 bis 4 → VEN-UB-12, VEN-UB-2, VEN-UB-3, VEN-UB-5, DAT-UB-2 bis DAT-UB-4, Q-DATA-2, Q-DATA-23.
- STORY-02: 1 bis 5 → VEN-UB-13, VEN-UB-14 (und wie STORY-01); Museum Ostwall unverändert (Q-DATA-23).
- Jede neue EARS-Anforderung hat ein Gherkin-Szenario; Q-DATA-23 hat Maß und Prüfverfahren.
- Kein Supersede: Bestand 36 → 40 liegt in der Grenze 20–60 (VEN-UB-8, Q-DATA-21); bestehende Szenarien bleiben unverändert gültig.
- Befund für Phase 4/5: `data/venues.json` (4 Orte, Recherche mit `npm run data:fetch` und Belegen), `test/bestand.test.mjs` (Test für Dortmunder Orte analog zu Düsseldorf), ggf. weitere Bestandszählungen in Tests (Wert 36). Ausstellungen, Events und Festival f² folgen über `/update-venue-data` und `/research-events` (kein Task).

## Rückläufe
| Datum | Herkunft (H2/Review) | Befund | Klasse | Quelle korrigiert | Neu abgeleitet |
| --- | --- | --- | --- | --- | --- |
| 2026-11-11 | Phase 5 (Recherche) | HMKV ist die Kunsthalle Dortmund (zwei Einträge der Idee = ein Ort); EARS VEN-UB-13, Gherkin, Quality, Story, EPIC angepasst (5 → 4 Orte) | Spezifikation (Idee veraltet) | EARS, Gherkin, Quality, Story | Task STORY-02-TASK-01 |

## Annahmen (zur Vorlage an H1/H2)
Siehe EPIC `SERVICE-28-dortmund-venues.md`, Abschnitt „Annahmen“ (9 Punkte):
- ANNAHME: Museum Ostwall bereits erfasst, nicht doppelt; HMKV ist inzwischen die Kunsthalle Dortmund (ein Ort), Dortmunder U kein Ort.
- ANNAHME: `id`s nach dem Muster `<name>-dortmund`.
- ANNAHME: Typen: Projektraum und DEPOT `off_space`; Kunsthalle `gallery`; FH-Fachbereich `foundation`.
- ANNAHME: f² Fotofestival wird nicht erfasst (kein Zeitraum, kein Veranstalter in der Idee).
- ANNAHME: FH-Eintrag folgt dem, was die Recherche belegt (Fachbereich Design bzw. Fotografie).
- ANNAHME: Websites, Anschriften, Koordinaten und Besonderheiten aus der Recherche; `source.status` `recherchiert`.
- ANNAHME: „Schwerpunkt“-Angaben gehören nicht ins Schema; Sammlung/Bibliothek nur mit Beleg.
- ANNAHME: Ausstellungen und Events später über die vorhandenen Skills; „Düsseldorf“ in der Einleitung der Idee ist ein Schreibfehler.
- ANNAHME: Der Branch geht von `main` aus; die Idee-Dateien 019 (Statuspflege) und 020 waren beim Intake nicht committet.
