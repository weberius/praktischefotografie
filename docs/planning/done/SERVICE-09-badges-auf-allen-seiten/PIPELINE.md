# Pipeline: SERVICE-09 – Badge-Zeile auf allen Ausstellungslisten und mehr Abstand

**Review-Schwelle:** kritisch + hoch lösen Rücklauf aus (an H1 bestätigt)  ·  **Modus:** autonom

| Phase | Artefakt(e) | Status | Datum |
| --- | --- | --- | --- |
| 0 Setup | Ordner, PIPELINE.md | Erledigt | 2026-10-28 |
| 1 Vision (H1) | EPIC, Annahmen | Freigegeben | 2026-10-28 |
| 2 UserStory | STORY-01, STORY-02 | Erledigt | 2026-10-28 |
| 3 Spezifikation · EARS | web/badges.md (BDG-UB-5 bis BDG-UB-7), VNU-UB-6, PHO-UB-10, ORG-UB-9, FST-UB-6 | Erledigt | 2026-10-28 |
| 3 Spezifikation · Gherkin | web/badges.feature (+3), orte-, fotografinnen-, veranstalter-, festivals-Features | Erledigt | 2026-10-28 |
| 3 Spezifikation · Quality | Q-USE-8; Ergänzung Q-USE-7 | Erledigt | 2026-10-28 |
| 3 Spezifikation · ADR | ADR-015 (Accepted an H2) | Erledigt | 2026-10-28 |
| 3 Spezifikation · Konsistenz | Querbezüge geprüft | Erledigt | 2026-10-28 |
| 4 Tasks | STORY-01: 2, STORY-02: 1 | Erledigt | 2026-10-28 |
| 5 Implement | Komponente, vier Seiten, Tests, CHANGELOGs | Erledigt | 2026-10-28 |
| 6 Human in the Loop (H2) | Prüfpaket | Akzeptiert | 2026-10-28 |
| 7 Review | Skills `review-*` nicht vorhanden | Nicht erforderlich (offengelegt) | 2026-10-28 |

Status: `Offen` · `In Arbeit` · `Erledigt` · `Nicht erforderlich` · `Rücklauf` · `Verworfen`

## Rückläufe
| Datum | Herkunft (H2/Review) | Befund | Klasse | Quelle korrigiert | Neu abgeleitet |
| --- | --- | --- | --- | --- | --- |

## Annahmen (zur Vorlage an H2)
- ANNAHME: Ticket-Key `SERVICE-09`, kein Jira-Ticket.
- ANNAHME: Der Abstand wird in `rem` (0,75 rem = 12 px bei 16 px Schrift) statt in `em` umgesetzt, damit er unabhängig von der Schriftgröße der Umgebung gleich bleibt.
- ANNAHME: „Am Anfang eines Blocks“ heißt: die Badge-Zeile ist das erste Kindelement ihres Elternelements (z. B. oben in der Karte).
- ANNAHME: Stories und Spezifikation wurden vor H1 auf Wunsch der Projektleitung erstellt; die offenen Punkte wurden vor H1 entschieden (siehe EPIC-Notiz).
