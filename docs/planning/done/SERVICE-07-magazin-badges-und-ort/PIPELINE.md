# Pipeline: SERVICE-07 – Magazin: Karten mit Badges und Ort im Titel

**Review-Schwelle:** kritisch + hoch lösen Rücklauf aus (an H1 bestätigt)  ·  **Modus:** autonom

| Phase | Artefakt(e) | Status | Datum |
| --- | --- | --- | --- |
| 0 Setup | Ordner, PIPELINE.md | Erledigt | 2026-10-28 |
| 1 Vision (H1) | EPIC, Annahmen | Freigegeben | 2026-10-28 |
| 2 UserStory | STORY-01, STORY-02 | Erledigt | 2026-10-28 |
| 3 Spezifikation · EARS | web/blog.md (BLG-UB-6 bis BLG-UB-8, BLG-ST-2, BLG-UN-3), setup/magazin-neuigkeiten.md (NWS-UB-7) | Erledigt | 2026-10-28 |
| 3 Spezifikation · Gherkin | web/blog.feature (+8 Szenarien), setup/magazin-neuigkeiten.feature (+1) | Erledigt | 2026-10-28 |
| 3 Spezifikation · Quality | Q-DATA-10, Q-USE-6; Ergänzungen Q-USE-2, Q-USE-4, Q-PERF-3 | Erledigt | 2026-10-28 |
| 3 Spezifikation · ADR | ADR-013 (Accepted an H2) | Erledigt | 2026-10-28 |
| 3 Spezifikation · Konsistenz | Querbezüge geprüft (Q-USE-5 war vergeben, daher Q-USE-6) | Erledigt | 2026-10-28 |
| 4 Tasks | STORY-01: 3, STORY-02: 3 | Erledigt | 2026-10-28 |
| 5 Implement | Web (Karten, Badges, Beitragsseite), Neuigkeitenpflege (Titelregel), Skill, Migration, Tests, CHANGELOGs | Erledigt | 2026-10-28 |
| 6 Human in the Loop (H2) | Prüfpaket | Akzeptiert | 2026-10-28 |
| 7 Review | Skills `review-*` nicht vorhanden | Nicht erforderlich (offengelegt) | 2026-10-28 |

Status: `Offen` · `In Arbeit` · `Erledigt` · `Nicht erforderlich` · `Rücklauf` · `Verworfen`

## Rückläufe
| Datum | Herkunft (H2/Review) | Befund | Klasse | Quelle korrigiert | Neu abgeleitet |
| --- | --- | --- | --- | --- | --- |

## Annahmen (zur Vorlage an H2)
- ANNAHME: Ticket-Key `SERVICE-07`, kein Jira-Ticket.
- ANNAHME: Das Anlass-Badge kommt aus der Kennung („Neu“, „Eröffnung“, „Endet bald“, „Beendet“) mit den Farben der Status-Badges (neu = Kommend, Eröffnung = Laufend, Endet bald, Ende = Beendet), nicht aus dem heutigen Status der Ausstellung.
- ANNAHME: Der Titel lautet „Ausstellungstitel in Stadt“ (Stadt der Venue); die Titel der 42 vorhandenen Neuigkeiten wurden danach neu gesetzt.
- ANNAHME: Auf der Beitragsseite stehen die Badges unter dem Datum, die Reihenfolge dort bleibt Titel, Datum, Badges, Text.
- ANNAHME: Stories und Spezifikation wurden vor H1 auf Wunsch der Projektleitung erstellt und nach deren Korrektur des Layouts angepasst.
