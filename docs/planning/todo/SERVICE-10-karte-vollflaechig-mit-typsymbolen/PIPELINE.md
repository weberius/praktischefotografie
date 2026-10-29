# Pipeline: SERVICE-10 – Karte vollflächig, mit Typ-Symbolen und Legende

**Review-Schwelle:** kritisch + hoch lösen Rücklauf aus (Default, an H1 zu bestätigen)  ·  **Modus:** autonom  ·  **Branch:** feature/SERVICE-10-karte-vollflaechig-mit-typsymbolen  ·  **Quelle:** Idee `docs/product/ideen/20261029-1000 Karte überarbeiten.md`

| Phase | Artefakt(e) | Status | Datum |
| --- | --- | --- | --- |
| 0 Setup | Ordner, PIPELINE.md, Feature-Branch | Erledigt | 2026-10-29 |
| 1 Vision (H1) | EPIC, Annahmen | Entwurf (Intake) | 2026-10-29 |
| 2 UserStory | STORY-01, STORY-02 | Erledigt | 2026-10-29 |
| 3 Spezifikation · EARS | web/karte.md (MAP-UB-7 bis MAP-UB-13; ersetzen MAP-UB-3, MAP-UB-6) | Erledigt | 2026-10-29 |
| 3 Spezifikation · Gherkin | web/karte.feature (+6 Szenarien, 2 ersetzt), web/veranstalter.feature, web/festivals.feature (Formulierung) | Erledigt | 2026-10-29 |
| 3 Spezifikation · Quality | web/karte-darstellung.md (Q-USE-9, Q-USE-10); Ergänzungen Q-USE-3, Q-USE-4, Q-PERF-3, Q-SEO-1 | Erledigt | 2026-10-29 |
| 3 Spezifikation · ADR | ADR-016 (Proposed); ADR-004 teilweise ersetzt | Erledigt | 2026-10-29 |
| 3 Spezifikation · Konsistenz | Querbezüge geprüft | Erledigt | 2026-10-29 |
| 4 Tasks | – | Offen | |
| 5 Implement | – | Offen | |
| 6 Human in the Loop (H2) | – | Offen | |
| 7 Review | – | Offen | |

Status: `Offen` · `In Arbeit` · `Erledigt` · `Nicht erforderlich` · `Rücklauf` · `Verworfen`
(an H1: `Entwurf (Intake)` / `Freigegeben`, an H2: `Akzeptiert` / `Abweichung`)

## Rückläufe
| Datum | Herkunft (H2/Review) | Befund | Klasse | Quelle korrigiert | Neu abgeleitet |
| --- | --- | --- | --- | --- | --- |

## Bestätigt (nach Intake, 2026-10-29)
- Fläche: Breite der Boxen auf der Kalenderseite, bis zur Trennlinie oberhalb von Impressum und Datenschutz (MAP-UB-9, Q-USE-10).
- Legende zeigt immer alle fünf Ortstypen (MAP-UB-11).
- Typen unterscheiden sich in Form und Farbe; Vorschlag Säulenbau/Blau, Bilderrahmen/Orange, Raute/Violett, Tür/Rot, Buch/Grün (MAP-UB-10, Gherkin „Symbol und Farbe je Typ“).

## Annahmen (zur Vorlage an H2)
- ANNAHME: Ticket-Key `SERVICE-10`, kein Jira-Ticket.
- ANNAHME: „Die Liste der Orte“ meint die Liste auf `/map`; `/venues` bleibt unverändert und ist die neue Listenalternative (ADR-016, ersetzt in ADR-004 den Punkt „Listenalternative“ teilweise).
- ANNAHME: Die Legende ist HTML-Text bei der Karte (MAP-UB-11); dass sie immer alle fünf Typen zeigt, ist bestätigt.
- ANNAHME: Die Farbwerte der bestätigten Symbole folgen aus dem Kontrast ≥ 3:1 zum Kartenhintergrund.
- ANNAHME: Der Fußbereich steht bei kurzem Inhalt am Fensterrand (Seitenrahmen als Spalte mit Mindesthöhe), damit die Karte bis zur Trennlinie reichen kann (ADR-016).
- ANNAHME: Beim Vorabrendern zeigt `/map` Überschrift, Filter und einen Hinweis mit Link auf `/venues` (MAP-UB-13).
- ANNAHME: Ohne Treffer bleibt die Karte in der Standardansicht sichtbar, der Hinweis aus MAP-UN-1 steht darüber.
- ANNAHME: Die uncommittete Änderung an der Idee-Datei (Status/Ticket) und der neue Idee-Inhalt liegen mit auf dem Feature-Branch.
- ANNAHME: `docs/templates/` fehlt im Repo; Struktur der Artefakte folgt SERVICE-09.
