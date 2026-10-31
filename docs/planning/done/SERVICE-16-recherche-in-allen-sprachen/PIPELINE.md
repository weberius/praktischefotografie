# Pipeline: SERVICE-16 – Recherche in allen Sprachen

**Review-Schwelle:** kritisch + hoch lösen Rücklauf aus (Default)  ·  **Modus:** autonom  ·  **Branch:** feature/SERVICE-16-recherche-in-allen-sprachen  ·  **Quelle:** Idee `docs/product/ideen/idee-007-recherche-in-allen-sprachen.md`

| Phase | Artefakt(e) | Status | Datum |
| --- | --- | --- | --- |
| 0 Setup | Ordner, PIPELINE.md, Feature-Branch | Erledigt | 2026-10-31 |
| 1 Vision (H1) | EPIC, Annahmen | Freigegeben (durch Aufruf von spec-pipeline) | 2026-10-31 |
| 2 UserStory | STORY-01, STORY-02 | Erledigt | 2026-10-31 |
| 3 Spezifikation · EARS | setup/recherche-in-allen-sprachen.md (RAS-UB-1 bis RAS-UB-6, RAS-EV-1); Supersede-Hinweise in RSF, WSP | Erledigt | 2026-10-31 |
| 3 Spezifikation · Gherkin | setup/recherche-in-allen-sprachen.feature (8) | Erledigt | 2026-10-31 |
| 3 Spezifikation · Quality | setup/recherche-in-allen-sprachen.md (Q-SEC-8, Q-DATA-16) | Erledigt | 2026-10-31 |
| 3 Spezifikation · ADR | ADR-020 (Proposed) | Erledigt | 2026-10-31 |
| 3 Spezifikation · Konsistenz | siehe unten | Erledigt | 2026-10-31 |
| 4 Tasks | STORY-01-TASK-01 und 02, STORY-02-TASK-01 und 02 | Erledigt | |
| 5 Implement | Code, Tests, CHANGELOG je Story | Erledigt | Web-Tests (Chrome) nicht gelaufen, kein Webcode geändert |
| 6 Human in the Loop (H2) | Prüfpaket | Erledigt | Akzeptiert |
| 7 Review | Analysen, Triage | Erledigt | Code-Review ohne Befunde |

Status: `Offen` · `In Arbeit` · `Erledigt` · `Nicht erforderlich` · `Rücklauf` · `Verworfen`
(an H1: `Entwurf (Intake)` / `Freigegeben`, an H2: `Akzeptiert` / `Abweichung`)

## ADR
ADR-020 (`Proposed`): Recherche in allen Sprachen im Standardlauf. Geltend: ADR-006, ADR-007, ADR-011, ADR-012, ADR-019, ADR-002.

## Konsistenzcheck (Phase 3)
- STORY-01: 1 → RAS-UB-1; 2 → RAS-UB-1; 3 → RAS-UB-2, Q-DATA-16; 4 → RAS-UB-1; 5 → Q-SEC-5 (unverändert).
- STORY-02: 1 → RAS-UB-3; 2 → RAS-EV-1, Q-SEC-8; 3 → WSP-UB-2, Q-DATA-14 (unverändert); 4 → RAS-UB-4, RAS-UB-5, Q-SEC-8; 5 → RAS-UB-6, Q-DATA-16; 6 → Q-SEC-7.
- Jede RAS-Anforderung hat ein Gherkin-Szenario; Q-SEC-8 und Q-DATA-16 haben ein Prüfverfahren.
- Supersede: RSF-UB-2 → RAS-UB-1; WSP-UB-1 → RAS-UB-3; WSP-EV-1 → RAS-EV-1; Seitenzahl WSP-UB-3 → RAS-UB-4; Quellenzahl WSP-UB-4 → RAS-UB-6. Die Hinweise stehen in den betroffenen EARS-Dateien; bestehende Szenarien „Websuche nur auf Wunsch“ und „Treffer werden festgehalten“ (WSP) gelten nach den neuen Grenzen (Tests werden angepasst, Quelle: RAS).
- Befund: RSF-UB-3 (nur Wikimedia-Hosts) bleibt für den Wikipedia-Teil unverändert; die zusätzlichen Sprachversionen sind `*.wikipedia.org`.
- Befund: Schema `web.sources` braucht `maxItems: 10` (Umsetzung in STORY-02-TASK-01).

## Rückläufe
| Datum | Herkunft (H2/Review) | Befund | Klasse | Quelle korrigiert | Neu abgeleitet |
| --- | --- | --- | --- | --- | --- |

## Annahmen (zur Vorlage an H2)
Siehe EPIC `SERVICE-16-recherche-in-allen-sprachen.md`, Abschnitt „Annahmen“ (8 Punkte: Ticket-Key und uncommittete Sutkus-Änderungen, „alle Sprachen“ Wikipedia = alle als Links / zehn Anfangstexte, Web = sechs Sprachen, Standardlauf mit `--no-web`, Wikipedia-Links nicht über Webabruf, Linksammlung als Speicher, zwei Textfelder, ADR-020 Proposed).
