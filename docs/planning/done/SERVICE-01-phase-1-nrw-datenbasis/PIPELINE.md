# Pipeline: SERVICE-01 – Phase 1: Datenbasis & Prototyping (NRW)

**Review-Schwelle:** kritisch + hoch lösen Rücklauf aus  ·  **Modus:** autonom

| Phase | Artefakt(e) | Status | Datum |
| --- | --- | --- | --- |
| 0 Setup | Ordner, PIPELINE.md | Erledigt | 2026-10-27 |
| 1 Vision (H1) | EPIC, Annahmen | Freigegeben | 2026-10-27 |
| 2 UserStory | STORY-NN | Erledigt | 2026-10-27 |
| 3 Spezifikation · EARS | ears/<bereich>/<faehigkeit>.md | Erledigt | 2026-10-27 |
| 3 Spezifikation · Gherkin | contracts/gherkin/<bereich>/*.feature | Erledigt | 2026-10-27 |
| 3 Spezifikation · Quality | quality/<bereich>/<thema>.md | Erledigt | 2026-10-27 |
| 3 Spezifikation · ADR | ADR-001 | Erledigt (Accepted an H2) | 2026-10-27 |
| 3 Spezifikation · Konsistenz | Querbezüge geprüft | Erledigt | 2026-10-27 |
| 4 Tasks | TASK-MM | Erledigt | 2026-10-27 |
| 5 Implement | Code + Tests + CHANGELOG | Erledigt | 2026-10-27 |
| 6 Human in the Loop (H2) | Prüfpaket, Befunde | Akzeptiert | 2026-10-27 |
| 7 Review | Skills `review-*` nicht vorhanden: nicht verfügbar | Nicht erforderlich (offengelegt) | 2026-10-27 |

Status: `Offen` · `In Arbeit` · `Erledigt` · `Nicht erforderlich` · `Rücklauf` · `Verworfen`

## Rückläufe
| Datum | Herkunft (H2/Review) | Befund | Klasse | Quelle korrigiert | Neu abgeleitet |
| --- | --- | --- | --- | --- | --- |

## Annahmen (zur Vorlage an H2)
- ANNAHME: Ticket-Key `SERVICE-01`, da der Branch `feat/phase-1-nrw` keinen Key `[A-Z]+-[0-9]+` enthält und kein Ticket existiert (Phase 0).
- ANNAHME: Vision-Quelle ist PRD Abschnitt 5, „Phase 1: Datenbasis & Prototyping (NRW)" (Phase 0).
- HINWEIS: `docs/templates/` existiert nicht, obwohl `AGENTS.md` und der Skill sie voraussetzen. Artefakte folgen vorerst der Struktur aus dem Skill (Phase 0).
- ANNAHME: Review-Schwelle ist der Default (kritisch + hoch); nicht erfragt (Phase 1).
- ANNAHME: Der Stack wie `klangland` betrifft das Folgeticket (SPA); in diesem Ticket nur Node-basierte Validierung. ADR dazu ist vermutlich „nicht erforderlich" bzw. `Proposed` (Phase 1).
- ANNAHME: Ausstellungen, Events, Organizer, Posts und Fotograf:innen werden nur als Beispiele bzw. Minimalbestand erfasst; die Vollerfassung liegt außerhalb des Tickets (Phase 1).
- ANNAHME: Die Abnahme an H2 erfolgt ohne SPA über Validierungsbericht und Datenübersicht (Phase 1).
- ANNAHME: Q-ID-Merkmal `DATA` (Datenqualität, ISO 25012) ergänzt die im ID-Vertrag genannten Merkmale (Phase 3).
- ANNAHME: Die Gherkin-Szenarien werden ohne Cucumber als 1:1-Tests mit Szenarioverweis umgesetzt (ADR-001).
- ANNAHME: Die Venue-Recherche (Phase 5) wurde parallel zur Spezifikation gestartet, damit sie nicht blockiert; sie folgt dem Schema aus PRD/README und wird gegen die finalen Schemas validiert.
- ANNAHME: `docs/templates/` fehlt; Artefakte folgen den Formaten aus dem Skill.
- BEFUND (für H2): Nur 20 statt 20–30 Venues (Untergrenze erreicht), Aachen und Bochum fehlen; MAKK ohne belegte Präsenzbibliothek (`false`); Präsenzbibliothek als eigener Eintrag KMB Köln.
- ANNAHME: `hasPermanentCollection: true` bei eigener Sammlung auch ohne ständige Präsentation (Monschau, PhotoBookMuseum, Rheinisches Bildarchiv, ISG).
- BEFUND (für H2): Koordinaten aus Nominatim; einige PLZ aus OSM; Adressen des Rheinischen Bildarchivs und des ISG nur aus Suchzusammenfassungen; Fotobezug des Museums DKM nur aus Drittquelle; Schloss Moyland mit schwachem Fotobezug.
- HINWEIS: Phase 7 entfällt, weil `.claude/skills/review-{code,quality,security,governance}` nicht existieren; nicht improvisiert. Die Annahmen und ADR-001 sind an H2 bestätigt.
