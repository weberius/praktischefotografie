# Pipeline: SERVICE-18 – Zurück zur vorherigen Seite navigieren

**Review-Schwelle:** kritisch + hoch lösen Rücklauf aus (Default, an H1 zu bestätigen)  ·  **Modus:** autonom  ·  **Branch:** feature/SERVICE-18-zurueck-navigation  ·  **Quelle:** Idee `docs/product/ideen/idee-009-navigation.md`

| Phase | Artefakt(e) | Status | Datum |
| --- | --- | --- | --- |
| 0 Setup | Ordner, PIPELINE.md, Feature-Branch | Erledigt | 2026-11-02 |
| 1 Vision (H1) | EPIC, Annahmen | Freigegeben (Aufruf von spec-pipeline) | 2026-11-02 |
| 2 UserStory | STORY-01 | Erledigt | 2026-11-02 |
| 3 Spezifikation · EARS | web/navigation.md (NAV-UB-9, NAV-EV-2, NAV-ST-1) | Erledigt | 2026-11-02 |
| 3 Spezifikation · Gherkin | web/navigation.feature (4 neue Szenarien) | Erledigt | 2026-11-02 |
| 3 Spezifikation · Quality | web/navigation.md (Q-USE-16, Ergänzung Q-USE-3) | Erledigt | 2026-11-02 |
| 3 Spezifikation · ADR | ADR-022 (Accepted) | Erledigt | 2026-11-02 |
| 3 Spezifikation · Konsistenz | siehe unten | Erledigt | 2026-11-02 |
| 4 Tasks | STORY-01: 2 (TASK-01 Verlauf, TASK-02 Zurück-Link) | Erledigt | 2026-11-02 |
| 5 Implement | STORY-01: beide Tasks umgesetzt, Gate grün (Root-Test FET-OP-3 bereits vorher rot), Changelog | Erledigt | 2026-11-02 |
| 6 Human in the Loop (H2) | Prüfpaket | Akzeptiert (2026-11-02; ADR-022 Accepted) | 2026-11-02 |
| 7 Review · Architektur, Code, Security; Compliance nicht verfügbar | `review/SERVICE-18-STORY-01/` (5 Tasks), Triage unten | Erledigt (Abnahme 2026-11-02: alles umsetzen; 5 Tasks umgesetzt) | 2026-11-02 |

Status: `Offen` · `In Arbeit` · `Erledigt` · `Nicht erforderlich` · `Rücklauf` · `Verworfen`
(an H1: `Entwurf (Intake)` / `Freigegeben`, an H2: `Akzeptiert` / `Abweichung`)

## ADR
ADR-022 (`Accepted`): Zurück-Link mit Anwendungsverlauf und Fallback auf die Übersicht. Geltende ADRs als Leitplanken: ADR-002 (statische Angular-SPA), ADR-003 (Vorrendern, Hosting).

## Konsistenzcheck (Phase 3)
- Akzeptanzkriterien der Story: 1 → NAV-UB-9, NAV-ST-1; 2 → NAV-EV-2; 3 → NAV-ST-1; 4 → NAV-UB-9, Q-USE-16; 5 → NAV-UB-9, Q-USE-3; 6 → NAV-UB-9.
- Jede EARS-Anforderung hat ein Gherkin-Szenario; Q-USE-16 hat Maß und Prüfverfahren.
- Bestehendes unverändert: NAV-UB-1 bis NAV-UB-8, NAV-EV-1, NAV-UN-1 (Hinweisseite und Fehlerseite bekommen keinen Zurück-Link, NAV-ST-1 betrifft nur die sieben Detailseitentypen), FRM-UB-1 bis FRM-UB-5 (Kopfbereich unverändert), PHO-UB-3 bis PHO-UB-12 (Personenseite behält Inhalte). Keine Supersede nötig.
- Befund: Der feste Link „‹ Alle Fotograf:innen“ ist bisher unspezifiziert (nur im Komponententest `photographer-detail.spec.ts`); er wird durch NAV-UB-9 ersetzt, der Test ist in der Umsetzung anzupassen.
- Befund: Quality-Datei `web/navigation.md` ist neu; Q-USE-16 ist die nächste freie Nummer.

## Review-Triage (Schwelle: kritisch + hoch)
Befunde: kritisch 0, hoch 1, mittel 2, niedrig 4; Security ohne Befund. Alle 5 Tasks wurden abgenommen und umgesetzt.

| Befund | Schwere | Task | Quelle laut Ursachen-Routing |
| --- | --- | --- | --- |
| ARCH-01/CODE-01: `NavHistory` startet erst mit dem ersten Zurück-Link und verpasst die erste Seite | hoch | TASK-01 | Umsetzungsfehler → Task |
| ARCH-02/CODE-02: nicht reaktive Felder in `computed` | mittel | TASK-01 | Umsetzungsfehler |
| CODE-03: Tests prüfen nur `href` | mittel | TASK-03 | Umsetzungsfehler (Test) |
| ARCH-03/CODE-04/05/06: verteiltes Routenwissen, Lesbarkeit, doppelte API, Importreihenfolge | niedrig | TASK-02, 04, 05 | Umsetzungsfehler |

**Nicht verfügbar:** Compliance-Review (keine MCP-Verbindung). Reviews haben nichts ausgeführt.

## Rückläufe
| Datum | Herkunft | Befund | Klasse | Quelle korrigiert | Neu abgeleitet |
| --- | --- | --- | --- | --- | --- |
| 2026-11-02 | Review (Rücklauf 1 von höchstens 2) | ARCH-01: Verlauf startet zu spät | Umsetzungsfehler | Task (Review-TASK-01) | `app.config.ts`, `nav-history.ts`, Tests |

## Annahmen (zur Vorlage an H1/H2)
- ANNAHME: Ticket-Key `SERVICE-18`; `main` war beim Start sauber (keine uncommitteten Änderungen im Bereich der Spezifikation).
- ANNAHME: Zurück-Link nur auf den sieben Detailseitentypen, nicht auf Übersichts-, Karten-, Kalender- und rechtlichen Seiten.
- ANNAHME: „Vorherige Seite“ = zuletzt besuchte Seite der Webanwendung; ohne sie Fallback auf die zugehörige Übersicht (Magazin bei Beiträgen).
- ANNAHME: Zugänglicher Name „Zurück zu <Ziel>“; der Sonderlink „‹ Alle Fotograf:innen“ geht in dem gemeinsamen Mechanismus auf.
- ANNAHME: Browser-Zurück bleibt unverändert; Filter- und Scrollzustand werden nicht wiederhergestellt.
- ANNAHME: ADR-022 als `Proposed`, weil mehrere gleichwertige Wege bestehen (fester Link, `history.back()`, eigener Verlauf).

- ANNAHME: Sichtbarer Text auch im Fallback „‹ Zurück zu <Übersicht>“ (statt „‹ Alle Fotograf:innen“), damit der Name das Ziel nennt.
- ANNAHME (Umsetzung): Verlauf wird nur in Router-Ereignissen der Sitzung geführt; Zyklen A → B → A springen hin und her.
