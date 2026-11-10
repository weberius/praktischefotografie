# Pipeline: SERVICE-24 – Nur aktuelle Informationen

**Review-Schwelle:** kritisch + hoch lösen Rücklauf aus (Default, an H1 zu bestätigen)  ·  **Modus:** autonom  ·  **Branch:** feature/SERVICE-24-nur-aktuelle-informationen  ·  **Quelle:** Idee `docs/product/ideen/idee-015-nur-aktuelle-informationen.md`

| Phase | Artefakt(e) | Status | Datum |
| --- | --- | --- | --- |
| 0 Setup | Ordner, PIPELINE.md, Feature-Branch | Erledigt | 2026-11-10 |
| 1 Vision (H1) | EPIC, Annahmen | Freigegeben (Aufruf von /spec-pipeline) | 2026-11-10 |
| 2 UserStory | STORY-01, STORY-02 | Erledigt | 2026-11-10 |
| 3 Spezifikation · EARS | web/aktualitaet.md (ACT-UB-1 bis ACT-UB-4, ACT-UN-1, ACT-ST-1); Vermerke in web/events.md, web/ausstellungen.md | Erledigt | 2026-11-10 |
| 3 Spezifikation · Gherkin | web/aktualitaet.feature; Anpassungen events.feature, ausstellungen.feature | Erledigt | 2026-11-10 |
| 3 Spezifikation · Quality | web/aktualitaet.md (Q-REL-4) | Erledigt | 2026-11-10 |
| 3 Spezifikation · ADR | nicht erforderlich (einfache Listenfilterung; Leitplanken ADR-002, ADR-023, ADR-025) | Nicht erforderlich | 2026-11-10 |
| 3 Spezifikation · Konsistenz | siehe unten | Erledigt | 2026-11-10 |
| 4 Tasks | STORY-01 TASK-01, TASK-02; STORY-02 TASK-01 | Erledigt | 2026-11-10 |
| 5 Implement | Code + Tests + CHANGELOG | Erledigt (Gate grün) | 2026-11-10 |
| 6 Human in the Loop (H2) | Prüfpaket | Akzeptiert | 2026-11-10 |
| 7 Review | review/SERVICE-24-STORY-01/analyse-{architecture,code,security}.md; Compliance nicht verfügbar (kein Skill) | Erledigt; nichts oberhalb der Schwelle, TASK-01 bis TASK-05 zurückgestellt | 2026-11-10 |

Status: `Offen` · `In Arbeit` · `Erledigt` · `Nicht erforderlich` · `Rücklauf` · `Verworfen`
(an H1: `Entwurf (Intake)` / `Freigegeben`, an H2: `Akzeptiert` / `Abweichung`)

## Konsistenzcheck (Phase 3)
- STORY-01: AK 1, 2 → ACT-UB-1, Q-REL-4; AK 3 → ACT-UB-2, ACT-UN-1; AK 4 → ACT-ST-1; AK 5 → ACT-UB-3, Q-USE-4; AK 6 → FLT-UB-5, EVT-UB-2, FAV-UB-4 (unverändert, UND).
- STORY-02: AK 1–4 → ACT-UB-4 (bestehend: PHO-UB-3/-9/-10, VNU-UB-4, CAL-OP-1, BLG-UB-1).
- Jede ACT-Anforderung hat ein Szenario in `aktualitaet.feature`; Q-REL-4 hat Maß und Prüfverfahren.
- Angepasste Altszenarien: `events.feature` „Beendetes Event“ (jetzt Detailseite), `ausstellungen.feature` „Liste ist nach Status filterbar“ (ohne beendete). „Liste zeigt Ausstellungen mit Status“ und „Liste zeigt Events“ setzen aktuelle Beispieldaten voraus (in Phase 5 prüfen).
- Keine Widersprüche zu FLT-UB-2, FAV-UB-4, VNU-UB-4, CAL-OP-1, PHO-UB-3.

## ADR
Nicht erforderlich. Geltende ADRs: ADR-002 (Angular-SPA), ADR-023 (Favoriten), ADR-025 (globaler Filter).

## Annahmen (zur Vorlage an H1/H2)
- ANNAHME: „Aktuell“ = Ende ≥ heute; „Endet bald“ zählt als aktuell.
- ANNAHME: Statusfilter verliert „Beendet“; `?status=beendet` wird wie unbekannter Wert behandelt.
- ANNAHME: Detailseiten beendeter Einträge bleiben per Adresse erreichbar und tragen „Beendet“.
- ANNAHME: „Orte“/„Ort/Venues“ meint die Ortsseite `/venues/:id` (bereits konform); `/venues` unverändert.
- ANNAHME: Events tragen keine Personen; die Personenseite zeigt nur Ausstellungen.
- ANNAHME: Karte und Favoriten nicht genannt, unverändert.
- ANNAHME: STORY-02 ist reine Absicherung ohne Verhaltensänderung.
- ANNAHME: Idee-Datei ist nicht committet; Branch von `main`.

## Rückläufe
| Datum | Herkunft (H2/Review) | Befund | Klasse | Quelle korrigiert | Neu abgeleitet |
| --- | --- | --- | --- | --- | --- |

## Review-Triage (Phase 7, Schwelle kritisch + hoch)
Keine Befunde kritisch oder hoch. Zurückgestellt (Mittel/Niedrig, nicht gelöscht): ARCH-01/CODE-01 gemeinsames „aktuell“-Prädikat; CODE-02 Testlücken; CODE-03/-04/-05 Aufräumen; ARCH-02 Stichtag bei vorab erzeugten Seiten (ADR-Entscheidung); Security: nur Beobachtungen. Vorgeschlagene Tasks TASK-01 bis TASK-05 bleiben `Vorgeschlagen` im Review-Ordner als Follow-ups.
