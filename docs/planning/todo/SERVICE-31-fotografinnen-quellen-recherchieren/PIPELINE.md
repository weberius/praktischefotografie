# Pipeline: SERVICE-31 – Fotograf:innen aus genannten Quellen recherchieren

**Review-Schwelle:** kritisch + hoch lösen Rücklauf aus (Default)  ·  **Modus:** autonom  ·  **Branch:** feature/SERVICE-31-fotografinnen-quellen-recherchieren  ·  **Quelle:** Idee `docs/product/ideen/idee-022-photographers.md`

| Phase | Artefakt(e) | Status | Datum |
| --- | --- | --- | --- |
| 0 Setup | Ordner, PIPELINE.md, Feature-Branch | Erledigt | 2026-11-12 |
| 1 Vision (H1) | EPIC, Annahmen | Entwurf (Intake) | 2026-11-12 |
| 2 UserStory | STORY-01, STORY-02 | Erledigt | 2026-11-12 |
| 3 Spezifikation · EARS | setup/personen-quellen.md (PQL-UB-3, PQL-EV-3, PQL-UN-2) | Erledigt | 2026-11-12 |
| 3 Spezifikation · Gherkin | setup/personen-quellen.feature (3 neue Szenarien) | Erledigt | 2026-11-12 |
| 3 Spezifikation · Quality | setup/personen-quellen.md (Q-DATA-26) | Erledigt | 2026-11-12 |
| 3 Spezifikation · ADR | nicht erforderlich (geltend ADR-006, ADR-007, ADR-011, ADR-012, ADR-019, ADR-020) | Nicht erforderlich | 2026-11-12 |
| 3 Spezifikation · Konsistenz | siehe unten | Erledigt | 2026-11-12 |
| 4 Tasks | – | Offen | |
| 5 Implement | – | Offen | |
| 6 Human in the Loop (H2) | – | Offen | |
| 7 Review | – | Offen | |

Status: `Offen` · `In Arbeit` · `Erledigt` · `Nicht erforderlich` · `Rücklauf` · `Verworfen`
(an H1: `Entwurf (Intake)` / `Freigegeben`, an H2: `Akzeptiert` / `Abweichung`)

## Konsistenzcheck (Phase 3)
- STORY-01: 1 → PQL-UB-3; 2 → PQL-EV-3 (mit PQL-EV-1, PQL-UB-2); 3 → PQL-UN-2, PQL-UN-1; 4 → PQL-EV-3, PQL-EV-2; 5 → PQL-UB-3.
- STORY-02: nutzt PQL-EV-3 mit bestehendem WSP/PRF/PHO; Datenstand über Q-DATA-26.
- Jede neue PQL-Anforderung hat ein Szenario und eine Q-ID; keine Ticket-IDs in der Spezifikation; bestehende Anforderungen und Szenarien unverändert (nur Ergänzung).

## Rückläufe
| Datum | Herkunft (H2/Review) | Befund | Klasse | Quelle korrigiert | Neu abgeleitet |
| --- | --- | --- | --- | --- | --- |

## Annahmen (zur Vorlage an H2)
Siehe EPIC `SERVICE-31-fotografinnen-quellen-recherchieren.md`, Abschnitt „Annahmen“ (8 Punkte: Ticket-Key und uncommittete Daten, Sammeldatei `--sources`, `id`-Abweichungen, Wikipedia-Adressen, Instagram/leere Punkte, Webkurztext-Umfang, Seitengrenze, keine ADR).
