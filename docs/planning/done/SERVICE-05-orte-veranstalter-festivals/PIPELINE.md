# Pipeline: SERVICE-05 – Weitere Orte, Veranstalter und Festivals

**Review-Schwelle:** kritisch + hoch lösen Rücklauf aus (an H1 bestätigt)  ·  **Modus:** autonom

| Phase | Artefakt(e) | Status | Datum |
| --- | --- | --- | --- |
| 0 Setup | Ordner, PIPELINE.md | Erledigt | 2026-10-28 |
| 1 Vision (H1) | EPIC, Annahmen | Freigegeben | 2026-10-28 |
| 2 UserStory | STORY-01 bis STORY-04 | Erledigt | 2026-10-28 |
| 3 Spezifikation · EARS | content/festivals-veranstalter.md (8), web/festivals.md (8), veranstalter.md (+4, 2 ersetzt), ausstellungen.md (+1, 1 ersetzt), navigation.md (+2, 2 ersetzt), setup/webseiten-abruf.md (+1), datenaktualisierung.md (+5), update-skill.md (+1) | Erledigt | 2026-10-28 |
| 3 Spezifikation · Gherkin | content/festivals.feature (9), web/festivals.feature (7), web/veranstalter.feature (+4), web/ausstellungen.feature, web/navigation.feature, setup/*.feature (+7) | Erledigt | 2026-10-28 |
| 3 Spezifikation · Quality | Q-DATA-5, Q-DATA-6; Ergänzungen zu Q-USE, Q-SEO | Erledigt | 2026-10-28 |
| 3 Spezifikation · ADR | ADR-009, ADR-010 (Accepted an H2) | Erledigt | 2026-10-28 |
| 3 Spezifikation · Konsistenz | Querbezüge und Supersede geprüft | Erledigt | 2026-10-28 |
| 4 Tasks | STORY-01: 2, STORY-02: 3, STORY-03: 4, STORY-04: 3 | Erledigt | 2026-10-28 |
| 5 Implement | Schemas, Validator, Daten, Web (Festivalseiten, Filter), Skripte, Skill, Tests, Doku, CHANGELOGs | Erledigt | 2026-10-28 |
| 6 Human in the Loop (H2) | Prüfpaket | Akzeptiert | 2026-10-28 |
| 7 Review | Skills `review-*` nicht vorhanden | Nicht erforderlich (offengelegt) | 2026-10-28 |

Status: `Offen` · `Erledigt` · `Nicht erforderlich` · `Rücklauf` · `Verworfen`

## Rückläufe
| Datum | Herkunft (H2/Review) | Befund | Klasse | Quelle korrigiert | Neu abgeleitet |
| --- | --- | --- | --- | --- | --- |

## Annahmen (zur Vorlage an H2)
- ANNAHME: Ticket-Key `SERVICE-05`, kein Jira-Ticket.
- ANNAHME: Story 01 und Spezifikation des Datenmodells wurden vor H1 auf Wunsch der Projektleitung vorbereitet; Web- und Skill-Spezifikation entstanden in Phase 3.
- ANNAHME: Der Filter `organizer` bleibt bestehen und gilt über die Festivals des Veranstalters; neu ist der Filter `festival`.
- ANNAHME: Festivalliste aufsteigend nach `startDate`; Status „Offizieller Partner“ als Text.
- ANNAHME: Veranstalter-Websites werden über `--venue <id>` und `updates/<Datum>/<id>.json` mit `organizerId` bearbeitet (ADR-010); IDs von Orten und Veranstaltern müssen verschieden sein.
- ANNAHME: Beim Anlegen entsteht ein Festival (Photoszene-Festival 2027, 14.05.–13.06.2027, belegt auf der Festivalseite); düsseldorf photo+ 2027 hat kein belegtes Datum und bleibt ohne Festivaldatensatz.
- ANNAHME: `festivalId` in bestehenden Ausstellungen ist überall `null`; die Bedeutungsänderung bricht keine Daten.
