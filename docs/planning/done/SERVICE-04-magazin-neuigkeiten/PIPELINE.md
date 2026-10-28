# Pipeline: SERVICE-04 – Magazin-Neuigkeiten bei der Datenpflege

**Review-Schwelle:** kritisch + hoch lösen Rücklauf aus (Default, an H1 vorgelegt)  ·  **Modus:** autonom

| Phase | Artefakt(e) | Status | Datum |
| --- | --- | --- | --- |
| 0 Setup | Ordner, PIPELINE.md | Erledigt | 2026-10-28 |
| 1 Vision (H1) | EPIC, Annahmen | Freigegeben | 2026-10-28 |
| 2 UserStory | STORY-01 | Erledigt | 2026-10-28 |
| 3 Spezifikation · EARS | ears/setup/magazin-neuigkeiten.md (13 Anforderungen), update-skill.md (SKL-UB-4, SKL-UB-5) | Erledigt | 2026-10-28 |
| 3 Spezifikation · Gherkin | contracts/gherkin/setup/magazin-neuigkeiten.feature (16 Szenarien), update-skill.feature (2 Szenarien) | Erledigt | 2026-10-28 |
| 3 Spezifikation · Quality | quality/setup/magazin-neuigkeiten.md (Q-DATA-4, Q-REL-2, Q-MAIN-3) | Erledigt | 2026-10-28 |
| 3 Spezifikation · ADR | ADR-008 | Erledigt (Accepted an H2) | 2026-10-28 |
| 3 Spezifikation · Konsistenz | Szenario- und ID-Abdeckung geprüft | Erledigt | 2026-10-28 |
| 4 Tasks | TASK-01 bis TASK-05 | Erledigt | 2026-10-28 |
| 5 Implement | scripts/news/, Skill, Tests, Doku, CHANGELOG | Erledigt | 2026-10-28 |
| 6 Human in the Loop (H2) | Prüfpaket | Akzeptiert | 2026-10-28 |
| 7 Review | Skills `review-*` nicht vorhanden | Nicht erforderlich (offengelegt) | 2026-10-28 |

Status: `Offen` · `In Arbeit` · `Erledigt` · `Nicht erforderlich` · `Rücklauf` · `Verworfen`

## Rückläufe
| Datum | Herkunft (H2/Review) | Befund | Klasse | Quelle korrigiert | Neu abgeleitet |
| --- | --- | --- | --- | --- | --- |

## Annahmen (zur Vorlage an H2)
- ANNAHME: Ticket-Key `SERVICE-04`, kein Jira-Ticket.
- ANNAHME: Die Story wurde vor H1 von der Projektleitung angefordert und an H1 nachgeschärft.
- ANNAHME: Die Texte werden in einem zweiten Freigabeschritt nach der Übernahme der Ortsdaten freigegeben (Skill-Schritt 9), da `neu` erst danach planbar ist.
- ANNAHME: „Neu gefunden“ nur für im Lauf aufgenommene Ausstellungen; verwaiste Beiträge werden nur gemeldet.
- ANNAHME: Mit „alles nachtragen“ entstehen beim ersten Lauf 39 Beiträge (13 Ausstellungen × Eröffnung, Endet bald, Ende), auch vergangene.
- ANNAHME: Der Beitragstitel und der Text stammen vom Modell im Skill; automatisch geprüft wird nur die Form.
- Weitere ANNAHMEN stehen in der EPIC-Notiz.
