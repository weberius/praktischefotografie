# Pipeline: SERVICE-23 – Profil von Saša Fuis aus eigenen Quellen

**Review-Schwelle:** kritisch + hoch lösen Rücklauf aus (Default)  ·  **Modus:** autonom  ·  **Branch:** feature/SERVICE-23-sasa-fuis-profil  ·  **Quelle:** Idee `docs/product/ideen/idee-014-photographer-sasa-fuis.md`

| Phase | Artefakt(e) | Status | Datum |
| --- | --- | --- | --- |
| 0 Setup | Ordner, PIPELINE.md, Feature-Branch | Erledigt | 2026-11-10 |
| 1 Vision (H1) | EPIC, Annahmen | Freigegeben (durch Aufruf von spec-pipeline) | 2026-11-10 |
| 2 UserStory | STORY-01 | Erledigt | 2026-11-10 |
| 3 Spezifikation · EARS | setup/personen-quellen.md (PQL-UB-1, PQL-EV-1, PQL-UB-2, PQL-UN-1, PQL-EV-2) | Erledigt | 2026-11-10 |
| 3 Spezifikation · Gherkin | setup/personen-quellen.feature (5) | Erledigt | 2026-11-10 |
| 3 Spezifikation · Quality | setup/personen-quellen.md (Q-SEC-13, Q-DATA-18) | Erledigt | 2026-11-10 |
| 3 Spezifikation · ADR | nicht erforderlich (geltend ADR-006, ADR-007, ADR-011, ADR-012, ADR-019, ADR-020) | Nicht erforderlich | 2026-11-10 |
| 3 Spezifikation · Konsistenz | siehe unten | Erledigt | 2026-11-10 |
| 4 Tasks | STORY-01-TASK-01, STORY-01-TASK-02 | Erledigt | 2026-11-10 |
| 5 Implement | Code + Tests + CHANGELOG | Erledigt | 2026-11-10 |
| 6 Human in the Loop (H2) | Prüfpaket, Befunde | Akzeptiert | 2026-11-10 |
| 7 Review | Analysen, Triage | Erledigt (Selbstreview, keine Befunde ≥ hoch) | 2026-11-10 |

Status: `Offen` · `In Arbeit` · `Erledigt` · `Nicht erforderlich` · `Rücklauf` · `Verworfen`
(an H1: `Entwurf (Intake)` / `Freigegeben`, an H2: `Akzeptiert` / `Abweichung`)

## Konsistenzcheck (Phase 3)
- STORY-01: 1 → PQL-UB-1; 2 → PQL-EV-1, Q-DATA-18; 3 → PQL-UB-2, Q-SEC-13; 4 → PQL-UN-1, Q-SEC-13; 5 → PQL-EV-1 mit WSP-EV-3, WSP-UB-6; 6 → PQL-EV-2; 7 → WSP-UB-4 bis WSP-UB-7, PRF-UB-6, PHO-UB-12 (unverändert).
- Jede PQL-Anforderung hat ein Szenario; Q-SEC-13 und Q-DATA-18 haben ein Prüfverfahren; keine Ticket-IDs in der Spezifikation; bestehende Anforderungen bleiben unverändert (nur Ergänzung).

## Rückläufe
| Datum | Herkunft (H2/Review) | Befund | Klasse | Quelle korrigiert | Neu abgeleitet |
| --- | --- | --- | --- | --- | --- |

## Annahmen (zur Vorlage an H2)
Siehe EPIC `SERVICE-23-sasa-fuis-profil.md`, Abschnitt „Annahmen“ (7 Punkte: Ticket-Key und untracked Ideendatei, Lesart als `--url`-Fähigkeit, `manuell` als neuer Link, Abruf auch mit `--no-web`, Webkurztext ohne Portrait/Berufsbezeichnung, Forum für Fotografie, keine ADR).
