# Pipeline: SERVICE-08 – Einheitliche Badges bei Ausstellungen

**Review-Schwelle:** kritisch + hoch lösen Rücklauf aus (an H1 bestätigt)  ·  **Modus:** autonom

| Phase | Artefakt(e) | Status | Datum |
| --- | --- | --- | --- |
| 0 Setup | Ordner, PIPELINE.md | Erledigt | 2026-10-28 |
| 1 Vision (H1) | EPIC, Annahmen | Freigegeben | 2026-10-28 |
| 2 UserStory | STORY-01, STORY-02 | Erledigt | 2026-10-28 |
| 3 Spezifikation · EARS | web/badges.md (4), CAL-UB-7, BLG-UB-9, EXH-UB-8, EXH-UB-9, PRF-UN-3 (3 ersetzt) | Erledigt | 2026-10-28 |
| 3 Spezifikation · Gherkin | web/badges.feature (4), kalender-, blog-, ausstellungen-, fotografinnen-profile-Features angepasst | Erledigt | 2026-10-28 |
| 3 Spezifikation · Quality | Q-USE-7, Q-DATA-11 | Erledigt | 2026-10-28 |
| 3 Spezifikation · ADR | ADR-014 (Accepted an H2) | Erledigt | 2026-10-28 |
| 3 Spezifikation · Konsistenz | Querbezüge und Supersede geprüft | Erledigt | 2026-10-28 |
| 4 Tasks | STORY-01: 3, STORY-02: 3 | Erledigt | 2026-10-28 |
| 5 Implement | Validator, Funktion, Komponente, Seiten, Skill-Regel, Tests, CHANGELOGs | Erledigt | 2026-10-28 |
| 6 Human in the Loop (H2) | Prüfpaket | Akzeptiert | 2026-10-28 |
| 7 Review | Skills `review-*` nicht vorhanden | Nicht erforderlich (offengelegt) | 2026-10-28 |

Status: `Offen` · `In Arbeit` · `Erledigt` · `Nicht erforderlich` · `Rücklauf` · `Verworfen`

## Rückläufe
| Datum | Herkunft (H2/Review) | Befund | Klasse | Quelle korrigiert | Neu abgeleitet |
| --- | --- | --- | --- | --- | --- |

## Annahmen (zur Vorlage an H2)
- ANNAHME: Ticket-Key `SERVICE-08`, kein Jira-Ticket.
- ANNAHME: Der Abstand 0,25 em wird als `gap` der Badge-Zeile umgesetzt (Breite eines Leerzeichens der Standardschrift); getestet mit ±0,2 px Toleranz.
- ANNAHME: Events behalten ihren gestrichelten Rahmen im Kalender; die Art-Badge von Ausstellungen ist durchgezogen.
- ANNAHME: Die Testdaten wurden an die neue Regel angepasst (Standardausstellung der Testhilfen ist `solo`).
- ANNAHME: Stories und Spezifikation wurden vor H1 auf Wunsch der Projektleitung erstellt; alle offenen Punkte wurden vor H1 entschieden (siehe EPIC-Notiz).
