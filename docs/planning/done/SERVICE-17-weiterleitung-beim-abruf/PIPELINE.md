# Pipeline: SERVICE-17 – Weiterleitung beim Abruf

**Review-Schwelle:** kritisch + hoch lösen Rücklauf aus (Default)  ·  **Modus:** autonom  ·  **Branch:** feature/SERVICE-17-weiterleitung-beim-abruf  ·  **Quelle:** Idee `docs/product/ideen/idee-008-weiterleitung-beim-abruf.md`

| Phase | Artefakt(e) | Status | Datum |
| --- | --- | --- | --- |
| 0 Setup | Ordner, PIPELINE.md, Feature-Branch | Erledigt | 2026-11-02 |
| 1 Vision (H1) | EPIC, Annahmen | Freigegeben (durch Aufruf von spec-pipeline) | 2026-11-02 |
| 2 UserStory | STORY-01 | Erledigt | 2026-11-02 |
| 3 Spezifikation · EARS | setup/webseiten-abruf.md (FET-OP-3, FET-UB-6, FET-UB-7, FET-UN-3, FET-EV-2, FET-UB-8; FET-UN-2 ersetzt) | Erledigt | 2026-11-02 |
| 3 Spezifikation · Gherkin | setup/webseiten-abruf.feature (6 neue, 2 präzisiert) | Erledigt | 2026-11-02 |
| 3 Spezifikation · Quality | setup/weiterleitung-beim-abruf.md (Q-SEC-9); Hinweis in Q-SEC-4 | Erledigt | 2026-11-02 |
| 3 Spezifikation · ADR | ADR-021 (Proposed) | Erledigt | 2026-11-02 |
| 3 Spezifikation · Konsistenz | siehe unten | Erledigt | 2026-11-02 |
| 4 Tasks | STORY-01-TASK-01 bis 04 | Erledigt | 2026-11-02 |
| 5 Implement | Code, Tests, CHANGELOG | Erledigt | 2026-11-02 |
| 6 Human in the Loop (H2) | Prüfpaket | Akzeptiert | 2026-11-02 |
| 7 Review | Code-Review: Port/Downgrade, Selbstverweis behoben | Erledigt | 2026-11-02 |

Status: `Offen` · `In Arbeit` · `Erledigt` · `Nicht erforderlich` · `Rücklauf` · `Verworfen`
(an H1: `Entwurf (Intake)` / `Freigegeben`, an H2: `Akzeptiert` / `Abweichung`)

## ADR
ADR-021 (`Proposed`): Weiterleitung beim Abruf nur auf freigegebene Hosts. Geltend: ADR-006 (ergänzt), ADR-007, ADR-010.

## Konsistenzcheck (Phase 3)
- STORY-01: 1 → FET-OP-3; 2 → FET-UB-6, FET-UN-3, FET-UB-8, Q-SEC-9; 3 → FET-UB-6, Q-SEC-9; 4 → FET-UB-7, Q-SEC-9; 5 → FET-UN-3, FET-EV-2; 6 → FET-EV-2.
- Jede neue FET-Anforderung hat ein Gherkin-Szenario; Q-SEC-9 hat ein Prüfverfahren.
- Supersede: FET-UN-2 → FET-UN-3; Maß in Q-SEC-4 („0 Anfragen an andere Hosts“) → Q-SEC-9. Hinweise stehen in den betroffenen Dateien; ADR-006 trägt einen Verweis auf ADR-021.
- Befund: Das Szenario „Weiterleitung auf anderen Host“ bleibt gültig, wurde um „nicht in der Weiterleitungsdatei“ und „Ausgangs- und Zieladresse“ präzisiert.
- Befund: Kein Schema nötig; die Weiterleitungsdatei `scripts/scrape/redirect-hosts.json` wird beim Start geprüft (FET-OP-3). Meta-Refresh und JavaScript zählen zur Grenze von drei (FET-UB-7).

## Rückläufe
| Datum | Herkunft (H2/Review) | Befund | Klasse | Quelle korrigiert | Neu abgeleitet |
| --- | --- | --- | --- | --- | --- |

## Annahmen (zur Vorlage an H2)
Siehe EPIC `SERVICE-17-weiterleitung-beim-abruf.md`, Abschnitt „Annahmen“ (am 2026-11-02 entschieden: Konfigurationsdatei, Zielhost wie eigene Website, höchstens 3 Weiterleitungen, HTTP + Meta-Refresh + JavaScript; bestätigt: Snapshot-URL, Hosts der drei Orte nicht in diesem Ticket, ADR-021 Proposed). Offene ANNAHME: JavaScript wird nicht ausgeführt, nur im Quelltext erkannt und nur auf Seiten ohne weiteren Text (FET-UB-8).
