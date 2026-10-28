# Pipeline: SERVICE-06 – Profile der Fotograf:innen mit Wikipedia und Portraits

**Review-Schwelle:** kritisch + hoch lösen Rücklauf aus (an H1 bestätigt)  ·  **Modus:** autonom

| Phase | Artefakt(e) | Status | Datum |
| --- | --- | --- | --- |
| 0 Setup | Ordner, PIPELINE.md | Erledigt | 2026-10-28 |
| 1 Vision (H1) | EPIC, Annahmen | Freigegeben | 2026-10-28 |
| 2 UserStory | STORY-01 bis STORY-04 | Erledigt | 2026-10-28 |
| 3 Spezifikation · EARS | content/fotografinnen-profile.md (7), setup/fotografinnen-recherche.md (13), datenaktualisierung.md (+1), update-skill.md (+1), web/fotografinnen.md (+8, 1 ersetzt) | Erledigt | 2026-10-28 |
| 3 Spezifikation · Gherkin | content/fotografinnen-profile.feature (9), setup/fotografinnen-recherche.feature (15), web/fotografinnen.feature (+5), setup/*.feature (+3) | Erledigt | 2026-10-28 |
| 3 Spezifikation · Quality | Q-DATA-7 bis Q-DATA-9, Q-SEC-5, Q-MAIN-4, Q-PERF-6, Q-USE-5 | Erledigt | 2026-10-28 |
| 3 Spezifikation · ADR | ADR-011, ADR-012 (Accepted an H2) | Erledigt | 2026-10-28 |
| 3 Spezifikation · Konsistenz | Querbezüge, Supersede und Änderungen der Umsetzung (Breite/Höhe, thumb-Host, Titelbild-Ersatz) nachgezogen | Erledigt | 2026-10-28 |
| 4 Tasks | STORY-01: 3, STORY-02: 2, STORY-03: 6, STORY-04: 3 | Erledigt | 2026-10-28 |
| 5 Implement | Schema, Validator, Daten, Skripte, Skill, Web, Tests, Doku, CHANGELOGs | Erledigt | 2026-10-28 |
| 6 Human in the Loop (H2) | Prüfpaket | Akzeptiert (Probelauf-Vorschläge freigegeben und übernommen) | 2026-10-28 |
| 7 Review | Skills `review-*` nicht vorhanden | Nicht erforderlich (offengelegt) | 2026-10-28 |

Status: `Offen` · `In Arbeit` · `Erledigt` · `Nicht erforderlich` · `Rücklauf` · `Verworfen`

## Rückläufe
| Datum | Herkunft (H2/Review) | Befund | Klasse | Quelle korrigiert | Neu abgeleitet |
| --- | --- | --- | --- | --- | --- |

## Annahmen (zur Vorlage an H2)
- ANNAHME: Ticket-Key `SERVICE-06`, kein Jira-Ticket.
- ANNAHME: Der Probelauf umfasst fünf Personen (August Sander, Candida Höfer, Tina Barney, Man Ray, Duane Michals); ihre Vorschläge liegen ungenehmigt unter `updates/2026-10-28/` und werden an H2 freigegeben.
- ANNAHME: Wer als Fotograf:in erfasst wird, beurteilt der Skill bzw. ich anhand der Seitentexte; für „Mysterium der Paare“ gelten alle 57 genannten Namen als ausstellende Fotograf:innen.
- ANNAHME: `occupation` ist die kurze deutsche Berufsbezeichnung aus der Wikipedia-Kurzbeschreibung; sie wird vom Modell gewählt und nur auf Länge geprüft.
- ANNAHME: Berufe, die in Wikidata als Fotograf:in oder Künstler:in gelten: Fotograf, Künstler, bildender Künstler, Maler, Bildhauer, Installationskünstler.
- ANNAHME: Ein Portrait ist nur mit Wikidata-Bild (P18) oder Titelbild des ersten Artikels möglich, sofern die Datei auf Commons liegt; Sander und Barney haben deshalb kein Portrait.
- ANNAHME: `portrait.width` und `portrait.height` sind Pflicht (Layout ohne Sprung), `--photographer` nimmt mehrere IDs mit Komma.
- ANNAHME: Stories und Spezifikation wurden vor H1 auf Wunsch der Projektleitung erstellt; die offenen Punkte wurden vor H1 beantwortet (siehe EPIC-Notiz).
