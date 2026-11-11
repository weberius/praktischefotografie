# Pipeline: SERVICE-27 – Fotografie-Orte in Düsseldorf

**Review-Schwelle:** kritisch + hoch lösen Rücklauf aus (Default, an H1 zu bestätigen)  ·  **Modus:** autonom  ·  **Branch:** feature/SERVICE-27-duesseldorf-venues  ·  **Quelle:** Idee `docs/product/ideen/idee-018-duesseldorf-venues.md`

| Phase | Artefakt(e) | Status | Datum |
| --- | --- | --- | --- |
| 0 Setup | Ordner, PIPELINE.md, Feature-Branch | Erledigt | 2026-11-11 |
| 1 Vision (H1) | EPIC, Annahmen | Freigegeben (Aufruf von `/spec-pipeline`, Schwelle kritisch + hoch) | 2026-11-11 |
| 2 UserStory | STORY-01 bis STORY-04 | Erledigt | 2026-11-11 |
| 3 Spezifikation · EARS | content/venue-erfassung.md (VEN-UB-8 ersetzt VEN-UB-1; VEN-UB-9 bis VEN-UB-11) | Erledigt | 2026-11-11 |
| 3 Spezifikation · Gherkin | content/daten.feature („Datenbestand enthält 20 bis 60 Venues“, „Düsseldorfer Orte sind im Katalog“, „Düsseldorfer Orte liegen in Düsseldorf“) | Erledigt | 2026-11-11 |
| 3 Spezifikation · Quality | content/datenqualitaet.md (Q-DATA-21 ersetzt Bestandsklausel in Q-DATA-2; Q-DATA-22) | Erledigt | 2026-11-11 |
| 3 Spezifikation · ADR | nicht erforderlich | Nicht erforderlich | 2026-11-11 |
| 3 Spezifikation · Konsistenz | siehe unten | Erledigt | 2026-11-11 |
| 4 Tasks | STORY-01-TASK-01, STORY-02-TASK-01, STORY-03-TASK-01, STORY-04-TASK-01 | Erledigt | 2026-11-11 |
| 5 Implement | `data/venues.json` (+12), `test/bestand.test.mjs`, Changelogs; Gate grün | Erledigt | 2026-11-11 |
| 6 Human in the Loop (H2) | Prüfpaket, Annahmen bestätigt | Akzeptiert | 2026-11-11 |
| 7 Review | Code-Review (Daten, Tests): keine Befunde | Erledigt | 2026-11-11 |

Status: `Offen` · `In Arbeit` · `Erledigt` · `Nicht erforderlich` · `Rücklauf` · `Verworfen`
(an H1: `Entwurf (Intake)` / `Freigegeben`, an H2: `Akzeptiert` / `Abweichung`)

## ADR
Nicht erforderlich: reine Datenerfassung im bestehenden Modell; die Bestandsgrenze ist eine fachliche Vorgabe, keine technische Entscheidung. Geltende ADRs als Leitplanken: ADR-001 (Schema-Validierung), ADR-006 (Abruf mit robots.txt, für die Recherche der Seiten).

## Konsistenzcheck (Phase 3)
- STORY-01: 1 und 3 → VEN-UB-8, Q-DATA-21 (VEN-UB-2 bis VEN-UB-5 unverändert); 2 und 4 → Ersetzt-Hinweis in `venue-erfassung.md` und `daten.feature`.
- STORY-02 bis STORY-04: 1 bis 3 → VEN-UB-9, VEN-UB-10, VEN-UB-11, DAT-UB-2/-4, VEN-UB-5, Q-DATA-2; Koordinaten in Düsseldorf → Q-DATA-22, VEN-UB-2.
- Jede neue EARS-Anforderung hat ein Gherkin-Szenario; Q-DATA-21 und Q-DATA-22 haben Maß und Prüfverfahren.
- Supersede: VEN-UB-8 ersetzt VEN-UB-1 (Hinweis an VEN-UB-1; Szenario „20 bis 30 Venues“ durch „20 bis 60 Venues“ ersetzt, Kommentar im Feature); Q-DATA-21 ersetzt die Bestandsklausel in Q-DATA-2 (Q-DATA-2 bleibt für die Herkunftsangaben gültig). Bestehende übrige Szenarien bleiben unverändert gültig.
- Neue Orte liegen in Düsseldorf (VEN-UB-4 bleibt erfüllt; VEN-UB-2: lat 50.3–52.6, lng 5.8–9.5).
- Befund für Phase 4/5: `test/bestand.test.mjs` (Test „20 bis 30 Venues“, Zeile 11, und Grenze der neuen Szenarien), `data/venues.json` (12 Orte, Recherche mit `npm run data:fetch` und Belegen), ggf. weitere Bestandszählungen in Tests (Wert 24); Web-Tests nutzen Fixtures. Die Ausstellungen, Events und Festivals der Orte sind Folgeschritte über `/update-venue-data` und `/research-events` (kein Task).

## Rückläufe
| Datum | Herkunft (H2/Review) | Befund | Klasse | Quelle korrigiert | Neu abgeleitet |
| --- | --- | --- | --- | --- | --- |

## Annahmen (zur Vorlage an H1/H2)
Siehe EPIC `SERVICE-27-duesseldorf-venues.md`, Abschnitt „Annahmen“ (9 Punkte):
- ANNAHME: Obergrenze 60 statt 30 (Supersede von VEN-UB-1 und der Bestandsklausel in Q-DATA-2).
- ANNAHME: K20 und K21 sind zwei Orte; `id`s nach dem Muster `<name>-duesseldorf`.
- ANNAHME: Typen: Museen `museum`; Galerien `gallery`; Philara und plan.d. `off_space`; Gerhart-Hauptmann-Haus und Polnisches Institut `foundation`.
- ANNAHME: Leica Galerie und LUMAS gehören als Ausstellungsräume in den Katalog (PRD 1.3: kein Handel als Gegenstand; keine Verkaufsangebote in der Webanwendung).
- ANNAHME: Websites, Anschriften, Koordinaten und Besonderheiten stammen aus der Recherche der Webseiten; `source.status` ist `recherchiert`.
- ANNAHME: „Schwerpunkt“-Angaben der Idee gehören nicht ins Schema; `hasPermanentCollection` und `hasReferenceLibrary` nur mit Beleg.
- ANNAHME: Ausstellungen und Events der Orte sowie die Aktualisierung von Kunstpalast und NRW-Forum laufen später über die vorhandenen Skills.
- ANNAHME: Nicht erfasst werden `düsseldorf photo+` (Veranstalter), `0211.art` (Plattform) sowie die nur beiläufig genannten Galerien und Projekträume (Clara Maria Sels, Sies + Höke, von fraunberg, The Pool, Piz Palü).
- ANNAHME: Der Branch geht von `main` aus; die geänderten Idee-Dateien 018 bis 020 und `updates/2026-11-11/` waren beim Intake nicht committet.
