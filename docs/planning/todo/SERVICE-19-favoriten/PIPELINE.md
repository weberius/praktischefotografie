# Pipeline: SERVICE-19 – Events favorisieren

**Review-Schwelle:** kritisch + hoch lösen Rücklauf aus (Default, an H1 zu bestätigen)  ·  **Modus:** autonom  ·  **Branch:** feature/SERVICE-19-favoriten  ·  **Quelle:** Idee `docs/product/ideen/idee-010-favoriten.md`

| Phase | Artefakt(e) | Status | Datum |
| --- | --- | --- | --- |
| 0 Setup | Ordner, PIPELINE.md, Feature-Branch | Erledigt | 2026-11-02 |
| 1 Vision (H1) | EPIC, Annahmen | Freigegeben (Aufruf von /spec-pipeline) | 2026-11-02 |
| 2 UserStory | STORY-01 | Erledigt | 2026-11-02 |
| 3 Spezifikation · EARS | web/favoriten.md (FAV-UB-1 bis FAV-UB-4, FAV-EV-1, FAV-ST-1) | Erledigt | 2026-11-02 |
| 3 Spezifikation · Gherkin | web/favoriten.feature (6 Szenarien) | Erledigt | 2026-11-02 |
| 3 Spezifikation · Quality | web/favoriten.md (Q-USE-17, Q-SEC-10) | Erledigt | 2026-11-02 |
| 3 Spezifikation · ADR | ADR-023 (Proposed) | Erledigt | 2026-11-02 |
| 3 Spezifikation · Konsistenz | siehe unten | Erledigt | 2026-11-02 |
| 4 Tasks | TASK-01 bis TASK-03 | Erledigt | 2026-11-02 |
| 5 Implement | Code + Tests + CHANGELOG | Erledigt | 2026-11-02 |
| 6 Human in the Loop (H2) | Prüfpaket | Akzeptiert | 2026-11-02 |
| 7 Review | – | Offen | |

Status: `Offen` · `In Arbeit` · `Erledigt` · `Nicht erforderlich` · `Rücklauf` · `Verworfen`
(an H1: `Entwurf (Intake)` / `Freigegeben`, an H2: `Akzeptiert` / `Abweichung`)

## ADR
ADR-023 (`Proposed`): Favoriten im Speicher der Sitzung halten. Geltende ADRs als Leitplanken: ADR-002 (statische Angular-SPA, kein Backend).

## Konsistenzcheck (Phase 3)
- Akzeptanzkriterien der Story: 1 → FAV-UB-1; 2 → FAV-EV-1; 3 → FAV-UB-2; 4 → FAV-UB-3, Q-SEC-10; 5 → FAV-UB-4, FAV-ST-1; 6 → FAV-UB-1, Q-USE-17.
- Jede EARS-Anforderung hat ein Gherkin-Szenario; Q-USE-17 und Q-SEC-10 haben Maß und Prüfverfahren.
- Bestehendes unverändert: EVT-UB-1 bis EVT-UB-5, CAL-UB-1 bis CAL-UB-7, RCH-UB-3 (Datenschutz bleibt wahr), NAV-UB-9 (Zurück-Link unberührt). Keine Supersede nötig.
- Befund: Das Gherkin-Szenario „Neuladen entfernt Favoriten“ ist als Test eine neue Anwendungsinstanz (kein echtes Neuladen); ein Browsertest wäre Handprobe.
- Befund: `web/events.feature` und `web/kalender.feature` bleiben gültig; der Umschalter ergänzt nur.

## Annahmen (zur Vorlage an H1/H2)
- ANNAHME: „Veranstaltungen“ = Events (Datensatztyp `events`), nicht Ausstellungen.
- ANNAHME: Favoriten bleiben bis zum Neuladen erhalten, keine Persistenz in irgendeiner Form (ADR-023).
- ANNAHME: Filter „Nur Favoriten“ in der Eventliste als einzige Anzeige; keine eigene Favoritenseite (über den Wortlaut hinaus, an H1 bestätigen).
- ANNAHME: Umschalter als Button mit `aria-pressed`, Zustand in Text und Symbol; beendete Events sind favorisierbar.
- ANNAHME: Idee 011 (neu, uncommittet, nicht gelesen) ist nicht Teil dieses Tickets.
- ANNAHME: `SERVICE-18` ist committet (`cdd4601`); der Branch geht davon aus.
