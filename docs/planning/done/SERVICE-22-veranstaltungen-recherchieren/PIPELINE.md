# Pipeline: SERVICE-22 – Veranstaltungen und Führungen recherchieren

**Review-Schwelle:** kritisch + hoch lösen Rücklauf aus (Default)  ·  **Modus:** autonom  ·  **Branch:** feature/SERVICE-22-veranstaltungen-recherchieren  ·  **Quelle:** Idee `docs/product/ideen/idee-013-veranstaltungen.md`

| Phase | Artefakt(e) | Status | Datum |
| --- | --- | --- | --- |
| 0 Setup | Ordner, PIPELINE.md, Feature-Branch | Erledigt | 2026-11-10 |
| 1 Vision (H1) | EPIC, Annahmen | Freigegeben (durch Aufruf von spec-pipeline) | 2026-11-10 |
| 2 UserStory | STORY-01, STORY-02, STORY-03 | Erledigt | 2026-11-10 |
| 3 Spezifikation · EARS | setup/veranstaltungen-recherche.md (VRS-UB-1 bis VRS-UB-7, VRS-OP-1, VRS-UN-1, VRS-UN-2, VRS-EV-1, VRS-EV-2); web/events.md (EVT-UB-6); content/datenmodell.md (DAT-UB-8) | Erledigt | 2026-11-10 |
| 3 Spezifikation · Gherkin | setup/veranstaltungen-recherche.feature (18), web/events.feature (+3), content/daten.feature (+1) | Erledigt | 2026-11-10 |
| 3 Spezifikation · Quality | setup/veranstaltungen-recherche.md (Q-SEC-12, Q-DATA-17, Q-REL-3, Q-USE-19) | Erledigt | 2026-11-10 |
| 3 Spezifikation · ADR | ADR-026 (Proposed) | Erledigt | 2026-11-10 |
| 3 Spezifikation · Konsistenz | siehe unten | Erledigt | 2026-11-10 |
| 4 Tasks | STORY-03-TASK-01; STORY-01-TASK-01 bis -03; STORY-02-TASK-01 | Erledigt | 2026-11-10 |
| 5 Implement | Code, Tests, CHANGELOG je Story | Erledigt (Web-Tests nicht ausführbar, siehe Changelog STORY-03) | 2026-11-10 |
| 6 Human in the Loop (H2) | Prüfpaket | Akzeptiert | 2026-11-10 |
| 7 Review | Analysen, Triage | Erledigt (Selbstreview, keine Subagents; keine Befunde ≥ hoch) | 2026-11-10 |

Status: `Offen` · `In Arbeit` · `Erledigt` · `Nicht erforderlich` · `Rücklauf` · `Verworfen`
(an H1: `Entwurf (Intake)` / `Freigegeben`, an H2: `Akzeptiert` / `Abweichung`)

## ADR
ADR-026 (`Accepted`): Veranstaltungsrecherche als eigener Skill auf der bestehenden Pipeline. Geltend: ADR-001, ADR-002, ADR-006, ADR-007, ADR-008, ADR-010.

## Konsistenzcheck (Phase 3)
- STORY-01: 1 → VRS-OP-1, VRS-UN-1; 2 → VRS-EV-1, Q-SEC-12; 3 → VRS-UB-2, VRS-UB-3, Q-DATA-17; 4 → VRS-UB-4; 5 → VRS-UB-5, VRS-UB-6; 6 → VRS-UB-7; 7 → VRS-EV-1, Q-SEC-12.
- STORY-02: 1 → VRS-OP-1; 2 → VRS-UN-2, Q-REL-3; 3 → VRS-EV-2; 4 → VRS-UB-6, Q-REL-3; 5 → VRS-UB-7.
- STORY-03: 1 → DAT-UB-8; 2 und 3 → EVT-UB-6, Q-USE-19.
- Jede VRS-Anforderung hat ein Gherkin-Szenario; Q-SEC-12, Q-DATA-17, Q-REL-3 und Q-USE-19 haben ein Prüfverfahren.
- Supersede: DAT-UB-7 → DAT-UB-8 (Hinweis in `datenmodell.md`); bestehende Szenarien bleiben gültig.
- Befund für Phase 4/5: `check-proposals`/`apply-proposals` kennen den Unterordner `events/` und die Beschränkung auf `events` noch nicht; `fetch-venues` braucht `--events`; Schema, `web/src/app/core/models.ts` und Typfilter brauchen `guided_tour`; Test `test/event-typ.test.mjs` ist zu erweitern.

## Rückläufe
| Datum | Herkunft (H2/Review) | Befund | Klasse | Quelle korrigiert | Neu abgeleitet |
| --- | --- | --- | --- | --- | --- |

## Annahmen (zur Vorlage an H2)
Siehe EPIC `SERVICE-22-veranstaltungen-recherchieren.md`, Abschnitt „Annahmen“ (9 Punkte: Ticket-Key und untracked Ideendatei, „alle Venues“ = Orte ohne Veranstalter, eigener Skill, Modus `--events` mit zehn Seiten ohne `eventsUrl`, Typ `guided_tour`, ein Event je Termin mit Obergrenze 30, Vernissagen bleiben bei `update-venue-data`, Vorschlagsdateien unter `events/`, `isCommercial` nur nach Seitenaussage).
