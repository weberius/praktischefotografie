# Pipeline: SERVICE-26 – Events mit Start- und Endzeit

**Review-Schwelle:** kritisch + hoch lösen Rücklauf aus (Default, an H1 zu bestätigen)  ·  **Modus:** autonom  ·  **Branch:** feature/SERVICE-26-events-mit-uhrzeit  ·  **Quelle:** Idee `docs/product/ideen/idee-017-events-from-to.md`

| Phase | Artefakt(e) | Status | Datum |
| --- | --- | --- | --- |
| 0 Setup | Ordner, PIPELINE.md, Feature-Branch | Erledigt | 2026-11-11 |
| 1 Vision (H1) | EPIC, Annahmen | Freigegeben (durch Aufruf von /spec-pipeline) | 2026-11-11 |
| 2 UserStory | STORY-01, STORY-02, STORY-03 | Erledigt | 2026-11-11 |
| 3 Spezifikation · EARS | content/datenmodell.md (DAT-UB-9, DAT-UB-10); setup/datenvalidierung.md (VAL-UN-6 bis VAL-UN-8); setup/veranstaltungen-recherche.md (VRS-UB-8, VRS-UB-9, VRS-UB-10 ersetzt VRS-UB-2, VRS-EV-3, VRS-UN-3); setup/eroeffnungstermine.md (OPN-UB-9, OPN-UN-3); web/kalender-export.md (ICS-UB-8 bis ICS-UB-10, ICS-UN-2, ICS-UB-2 eingeschränkt); web/events.md (EVT-UB-7, EVT-UB-8); web/kalender.md (CAL-UB-8, CAL-UB-9) | Erledigt | 2026-11-11 |
| 3 Spezifikation · Gherkin | content/daten.feature (+3), setup/datenvalidierung.feature (+3), setup/veranstaltungen-recherche.feature (+6), setup/eroeffnungstermine.feature (+3), web/kalender-export.feature (+9), web/events.feature (+6), web/kalender.feature (+2) | Erledigt | 2026-11-11 |
| 3 Spezifikation · Quality | content/datenqualitaet.md (Q-DATA-19); setup/veranstaltungen-recherche.md (Q-DATA-20); web/kalender-export.md (Q-IOP-2); web/uhrzeiten.md (Q-USE-21) | Erledigt | 2026-11-11 |
| 3 Spezifikation · ADR | ADR-027 (Accepted); ADR-018 mit Hinweis ergänzt | Erledigt | 2026-11-11 |
| 3 Spezifikation · Konsistenz | siehe unten | Erledigt | 2026-11-11 |
| 4 Tasks | STORY-01 TASK-01 bis 03, STORY-02 TASK-01, STORY-03 TASK-01 und 02 | Erledigt | 2026-11-11 |
| 5 Implement | Code, Tests, Doku, 3 Changelogs; Gate grün (Build, npm test 275, web:test 359, lint:all) | Erledigt | 2026-11-11 |
| 6 Human in the Loop (H2) | Prüfpaket | Akzeptiert | 2026-11-11 |
| 7 Review | Review ohne Befunde | Erledigt | 2026-11-11 |

Status: `Offen` · `In Arbeit` · `Erledigt` · `Nicht erforderlich` · `Rücklauf` · `Verworfen`
(an H1: `Entwurf (Intake)` / `Freigegeben`, an H2: `Akzeptiert` / `Abweichung`)

## ADR
ADR-027 (`Accepted`): Uhrzeit und Zeitzone als optionale Eventfelder, ICS mit TZID und UTC-Rückfall. Geltend: ADR-001, ADR-002, ADR-006, ADR-007, ADR-018 (teilweise ergänzt), ADR-026 (um `op: "update"` erweitert).

## Konsistenzcheck (Phase 3)
- STORY-01: 1 → DAT-UB-9, Q-DATA-19; 2 → DAT-UB-10; 3 → VAL-UN-6, VAL-UN-7, VAL-UN-8, Q-DATA-19; 4 → VRS-UB-8, VRS-UB-9, Q-DATA-20; 5 → OPN-UB-9, OPN-UN-3; 6 → VRS-EV-3, VRS-UB-10, Q-DATA-20; 7 → VRS-UN-3, OPN-UN-3 (Freigabe und Validierung: VRS-UB-7 unverändert).
- STORY-02: 1 → ICS-UB-8; 2 → ICS-UB-9; 3 → ICS-UB-9, ICS-UB-2; 4 → ICS-UB-8, ICS-UB-2; 5 → ICS-UB-10, ICS-UN-2, Q-IOP-2; 6 → ICS-UB-3 bis ICS-UB-7, Q-IOP-1, Q-SEC-6 (unverändert gültig).
- STORY-03: 1 und 2 → EVT-UB-7, Q-USE-21; 3 → EVT-UB-8, CAL-UB-8; 4 → CAL-UB-8, CAL-UB-9; 5 → Q-USE-21.
- Jede neue EARS-Anforderung hat ein Gherkin-Szenario; Q-DATA-19, Q-DATA-20, Q-IOP-2 und Q-USE-21 haben ein Prüfverfahren.
- Supersede: VRS-UB-10 ersetzt VRS-UB-2 (Hinweis in `veranstaltungen-recherche.md`, Szenario „Nur Veranstaltungen werden vorgeschlagen“ im Wortlaut angepasst); ICS-UB-2 eingeschränkt (Hinweis in `kalender-export.md`); bestehende Szenarien bleiben gültig, da kein Bestandsevent Zeitfelder trägt.
- Konflikt: Richtwert ≤ 3 kB aus Q-IOP-1 steigt für zeitgebundene Termine auf ≤ 5 kB (in `kalender-export.md` benannt); Q-PERF-4 bleibt maßgeblich.
- Befund für Phase 4/5: Schema, `models.ts`, Validator (IANA-Prüfung, Reihenfolge), `check-proposals`/`apply-proposals` (`op: "update"`, Zeitbeleg im Auszug), beide Skills, `core/ics`, Event-Liste, Event-Detail, Kalender, `data/README.md`, `updates/README.md`, README. Die Nachrecherche des Bestands ist ein Folgeschritt (kein Task).

## Rückläufe
| Datum | Herkunft (H2/Review) | Befund | Klasse | Quelle korrigiert | Neu abgeleitet |
| --- | --- | --- | --- | --- | --- |

## Annahmen (zur Vorlage an H2)
Siehe EPIC `SERVICE-26-events-mit-uhrzeit.md`, Abschnitt „Annahmen“ (8 Punkte: Ticket-Key SERVICE-26 statt des Vorlagenrests SERVICE-25 in der Idee; UTC-Rückfall für Zonen außer Europe/Berlin; Termine über Mitternacht; mehrtägig ohne Endzeit ganztägig; Bestandsevents aller Typen per `op: "update"` und Zeitfelder auch bei Vernissagen; Agenda ist eine Liste; Zonenname in der Anzeige bei Abweichung; mehrtägige Messen).
