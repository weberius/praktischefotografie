# Pipeline: SERVICE-20 – Globaler Filter

**Review-Schwelle:** kritisch + hoch lösen Rücklauf aus (Default, an H1 zu bestätigen)  ·  **Modus:** autonom  ·  **Branch:** feature/SERVICE-20-filter  ·  **Quelle:** Idee `docs/product/ideen/idee-011-filter.md`

| Phase | Artefakt(e) | Status | Datum |
| --- | --- | --- | --- |
| 0 Setup | Ordner, PIPELINE.md, Feature-Branch | Erledigt | 2026-11-02 |
| 1 Vision (H1) | EPIC, Annahmen | Freigegeben (Aufruf von /spec-pipeline) | 2026-11-02 |
| 2 UserStory | STORY-01 | Erledigt | 2026-11-02 |
| 3 Spezifikation · EARS | web/filter.md (FLT-UB-1 bis FLT-UB-7, FLT-ST-1, FLT-UN-1); Supersede in web/karte.md, web/orte.md (neu MAP-UB-14, MAP-UB-15) | Erledigt | 2026-11-02 |
| 3 Spezifikation · Gherkin | web/filter.feature (9 Szenarien); Anpassungen karte.feature, orte.feature | Erledigt | 2026-11-02 |
| 3 Spezifikation · Quality | web/filter.md (Q-USE-18, Q-SEC-11) | Erledigt | 2026-11-02 |
| 3 Spezifikation · ADR | ADR-025 (Proposed); ADR-004 teilweise ersetzt | Erledigt | 2026-11-02 |
| 3 Spezifikation · Konsistenz | siehe unten | Erledigt | 2026-11-02 |
| 4 Tasks | TASK-01 bis TASK-04 | Erledigt | 2026-11-02 |
| 5 Implement | Code + Tests + CHANGELOG | Erledigt | 2026-11-02 |
| 6 Human in the Loop (H2) | Prüfpaket | Akzeptiert | 2026-11-02 |
| 7 Review | review/analyse-*.md | Erledigt | 2026-11-02 |

Status: `Offen` · `In Arbeit` · `Erledigt` · `Nicht erforderlich` · `Rücklauf` · `Verworfen`
(an H1: `Entwurf (Intake)` / `Freigegeben`, an H2: `Akzeptiert` / `Abweichung`)

## ADR
ADR-025 (`Proposed`): globaler Filter im Speicher der Sitzung. Geltende ADRs als Leitplanken: ADR-002, ADR-016, ADR-023; ADR-004 in den Filteranteilen ersetzt.

## Konsistenzcheck (Phase 3)
- Akzeptanzkriterien: 1 → FLT-UB-1, FLT-UB-7; 2 → FLT-UB-2; 3 → FLT-UB-3, FLT-UB-6, Q-SEC-11; 4 → FLT-UB-4; 5 → FLT-UB-5; 6 → FLT-ST-1, FLT-UN-1; 7 → Supersede VNU-UB-2, MAP-UB-2/-4/-8, MAP-EV-1, MAP-UN-1, MAP-UB-14/-15; 8 → Q-USE-18.
- Jede EARS-Anforderung hat ein Gherkin-Szenario; Q-USE-18 und Q-SEC-11 haben Maß und Prüfverfahren.
- Alte Szenarien (MAP-UB-2, -4, -8, MAP-EV-1, MAP-UN-1, VNU-UB-2) sind als „Entfallen“ vermerkt, nicht still gelöscht; MAP-UB-1, -3 bis -7, -9 bis -13 unverändert.
- Bestehende Tests zu den entfernten Filtern müssen in Phase 5 mit angepasst werden (Supersede).
- Unverändert: FST-UB-4/5, FST-ST-3, ORG-UB-6, EVT-UB-2, EXH-UB-3, FAV-UB-4/6, RCH-UB-3.

## Annahmen (zur Vorlage an H1/H2)
- ANNAHME: „Typen“ sind Ortstypen; Events und Ausstellungen werden über ihren Ort gefiltert.
- ANNAHME: Mehrfachauswahl; UND zwischen, ODER innerhalb der Dimensionen.
- ANNAHME: Geltungsbereich Karte, Ortsverzeichnis, Agenda, Ausstellungs- und Eventliste; nicht Detailseiten, Fotograf:innen, Festivals, Veranstalter:innen, Magazin.
- ANNAHME: Bedienung auf den fünf Seiten statt im Seitenkopf.
- ANNAHME: Zustand nur im Speicher, nicht in der Adresse; Filteradressen nicht mehr teilbar, alte Parameter werden ignoriert.
- ANNAHME: Filter Stadt, Präsenzbibliothek, Ständige Sammlung entfallen.
- ANNAHME: Festival-/Veranstalterfilter per Query bleiben.
- ANNAHME: Einträge ohne bekannten Ort werden bei gesetztem Filter ausgeblendet.
- ANNAHME: Globaler und lokale Filter wirken per UND.
- ANNAHME: Klangland nicht einsehbar; Bedienung ist eigene Lesart.
- ANNAHME: Keine weitere offene Idee; `SERVICE-19` ist committet, Branch von `main`.

## Rückläufe
| Datum | Herkunft (H2/Review) | Befund | Klasse | Quelle korrigiert | Neu abgeleitet |
| --- | --- | --- | --- | --- | --- |
| 2026-11-02 | Review | A1 Reset auf der Karte uneinheitlich; A2 Verweise auf ersetzte IDs; C1/C2 schwache Tests | Umsetzungsfehler / Spezifikation | Task; Hinweise in ADR-016 und Quality | Karte, Tests |
