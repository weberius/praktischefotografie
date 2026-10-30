# Pipeline: SERVICE-14 – Termin in den Gerätekalender übernehmen

**Review-Schwelle:** kritisch + hoch lösen Rücklauf aus (Default, an H1 zu bestätigen)  ·  **Modus:** autonom  ·  **Branch:** feature/SERVICE-14-termin-in-den-kalender  ·  **Quelle:** Idee `docs/product/ideen/idee-005-termin-uebernehmen.md`

| Phase | Artefakt(e) | Status | Datum |
| --- | --- | --- | --- |
| 0 Setup | Ordner, PIPELINE.md, Feature-Branch | Erledigt | 2026-10-30 |
| 1 Vision (H1) | EPIC, Annahmen | Freigegeben (Aufruf von spec-pipeline) | 2026-10-30 |
| 2 UserStory | STORY-01 | Erledigt | 2026-10-30 |
| 3 Spezifikation · EARS | web/kalender-export.md (ICS-UB-1 bis ICS-UB-7, ICS-EV-1, ICS-ST-1, ICS-UN-1) | Erledigt | 2026-10-30 |
| 3 Spezifikation · Gherkin | web/kalender-export.feature (11 Szenarien) | Erledigt | 2026-10-30 |
| 3 Spezifikation · Quality | web/kalender-export.md (Q-USE-15, Q-IOP-1, Q-SEC-6, Ergänzung Q-USE-3) | Erledigt | 2026-10-30 |
| 3 Spezifikation · ADR | ADR-018 (Proposed) | Erledigt | 2026-10-30 |
| 3 Spezifikation · Konsistenz | siehe unten | Erledigt | 2026-10-30 |
| 4 Tasks | STORY-01: 2 (TASK-01 Erzeugung, TASK-02 Schaltfläche) | Erledigt | 2026-10-30 |
| 5 Implement | STORY-01: beide Tasks umgesetzt, Gate grün, Changelog | Erledigt | 2026-10-30 |
| 6 Human in the Loop (H2) | Prüfpaket | Akzeptiert (2026-10-30; ADR-018 Accepted) | 2026-10-30 |
| 7 Review · Architektur, Code, Security; Compliance nicht verfügbar | `review/SERVICE-14-STORY-01/` (16 vorgeschlagene Tasks), Triage oben | Erledigt (Abnahme 2026-10-30: Empfehlung; 7 Tasks umgesetzt, TASK-05 durch TASK-12 abgedeckt, 8 zurückgestellt) | 2026-10-30 |

Status: `Offen` · `In Arbeit` · `Erledigt` · `Nicht erforderlich` · `Rücklauf` · `Verworfen`
(an H1: `Entwurf (Intake)` / `Freigegeben`, an H2: `Akzeptiert` / `Abweichung`)

## ADR
ADR-018 (`Proposed`): Kalenderdatei im Browser erzeugen, ganztägiger Eintrag. Geltende ADRs als Leitplanken: ADR-002 (statische Angular-SPA, kein Backend), ADR-003 (Datensync), ADR-017 (Muster Klangland, Auslieferung ohne neue Abhängigkeit).

## Konsistenzcheck (Phase 3)
- Akzeptanzkriterien der Story: 1 → ICS-UB-1, Q-USE-15; 2 → ICS-EV-1, Q-SEC-6; 3 → ICS-UB-2, ICS-UN-1; 4 → ICS-UB-3; 5 → ICS-UB-4, Q-IOP-1; 6 → ICS-UB-1, Q-USE-3; 7 → ICS-ST-1, ICS-UB-5.
- Jede EARS-Anforderung hat ein Gherkin-Szenario; Q-USE-15, Q-IOP-1, Q-SEC-6 haben ein Prüfverfahren.
- Bestehendes unverändert: EVT-UB-1 bis EVT-UB-5 (Eventdetail zeigt weiter Beschreibung, Highlights, Ort, Website; die Schaltfläche ergänzt), CAL-UB-1 bis CAL-UB-7 (Agenda unverändert, ICS-UB-5), RCH-UB-3 (Datenschutz: nichts Neues, Q-SEC-6). Keine Supersede nötig.
- Befund (kein Widerspruch): `web/events.feature` „Eventdetail“ prüft die Seite ohne die Schaltfläche; das Szenario bleibt gültig.
- Befund: ICS-UB-2 (ganztägig) wird durch ein künftiges Uhrzeitfeld ersetzt (ADR-018, Konsequenzen); bis dahin steht die Uhrzeit nur in der Beschreibung.
- Befund: Die Schaltfläche braucht die Basisadresse der Anwendung für `URL`; Quelle klärt die Umsetzung (Annahme).

## Review-Triage (Schwelle: kritisch + hoch)
Befunde: kritisch 0, hoch 0, mittel 6, niedrig 8. Alle 16 Tasks stehen auf `Vorgeschlagen` (`review/SERVICE-14-STORY-01/`); nichts davon ist umgesetzt. Überschneidungen: TASK-05 = TASK-12 (Blob-URL), TASK-08 ⊃ Teil von TASK-21 (Steuerzeichen), TASK-03/04/09 betreffen dieselben Zeilen in `ics.ts` und ADR-018.

| Befund | Schwere | Task | Quelle laut Ursachen-Routing | Empfehlung |
| --- | --- | --- | --- | --- |
| SEC-01: nur `\n` wird maskiert; `\r`, U+2028 u. a. bleiben im Text (Struktur-Injection über KI-extrahierte Daten) | mittel | TASK-21, TASK-22 | Umsetzungsfehler → Task; Anforderung ICS-UB-4 gilt, Gherkin „Maskierung und Faltung“ ergänzen | umsetzen |
| CODE-01: UTF-8-Prüfung im Test kann nie fehlschlagen; Emoji, Titel mit Zeilenumbruch, Grenzfall 75 Oktett fehlen | mittel | TASK-11 | Umsetzungsfehler → Task (Test) | umsetzen (mit TASK-22) |
| ARCH-04: `METHOD:PUBLISH` ohne `ORGANIZER`; `TRANSP` fehlt (ganztägiger Termin blockiert den Tag) | mittel | TASK-03, TASK-04 (nur `TRANSP`) | technischer Weg → ADR-018 ergänzen, dann Task | umsetzen: `METHOD` weglassen, `TRANSP:TRANSPARENT` ergänzen, ADR-018 ergänzen; `SEQUENCE` weglassen (kein Änderungsstand im Datenmodell) |
| CODE-02/ARCH-03: Blob-URL sofort nach `click()` freigegeben, Download könnte auf iOS Safari ausbleiben (nicht verifiziert) | mittel | TASK-12 (= TASK-05) | Umsetzungsfehler → Task | umsetzen: Freigabe verzögern (Test anpassen) |
| ARCH-06: axe-Lauf nimmt das erste Event, evtl. beendet (ohne Schaltfläche); Q-IOP-1-Fixtures | mittel | TASK-07 | Qualität unzureichend → Quality-Prüfverfahren | umsetzen |
| ARCH-01: Mapping Event → ICS in der Seitenkomponente | mittel | TASK-01 | Umsetzungsfehler (Struktur) | zurückstellen (kein Einfluss auf Verhalten; lohnt bei einem zweiten Export) |

Zurückgestellt (niedrig bzw. Struktur, begründet: kein Einfluss auf Verhalten): TASK-01, TASK-02, TASK-06, TASK-08, TASK-09 (Teil in TASK-03/04), TASK-13, TASK-14, TASK-23.
**Nicht verfügbar:** Compliance-Review (`gbos-mcp` nicht verbunden). Die Reviews haben Build, Tests, Lint und Mutationstests nicht ausgeführt (Code-Review führte die beiden Spezifikationsdateien aus, grün).

## Rückläufe
| Datum | Herkunft (H2/Review) | Befund | Klasse | Quelle korrigiert | Neu abgeleitet |
| --- | --- | --- | --- | --- | --- |
| 2026-10-30 | Review (Rücklauf 1 von höchstens 2) | SEC-01: Steuerzeichen und Zeilenumbrüche nicht neutralisiert | Anforderung fehlt | EARS ICS-UB-7, Gherkin „Steuerzeichen im Text“, Quality Q-SEC-6 | `ics.ts`, Tests |
| 2026-10-30 | Review | ARCH-04: `METHOD` ohne `ORGANIZER`, `TRANSP` fehlt | Technischer Weg | ADR-018 ergänzt, EARS ICS-UB-6, Gherkin „Frei und ohne Einladung“ | `ics.ts`, Tests |
| 2026-10-30 | Review | CODE-01/CODE-02/ARCH-06: Tests wirkungslos, Blob-URL, axe-Stichprobe | Umsetzungsfehler / Qualität | Quality Q-IOP-1, Q-USE-15 (Prüfverfahren) | Tests, `event-detail.ts`, `browser-check.mjs` |

## Annahmen (zur Vorlage an H2)
- ANNAHME: Ticket-Key `SERVICE-14`; Idee-Datei war beim Start nicht committet und wurde nur im Kopf geändert (`status`, `ticket`); `main` steht auf `0928042`.
- ANNAHME: Nur Events (Datensatztyp `events`), nicht Ausstellungen; nicht für beendete Events.
- ANNAHME: Ganztägiger Eintrag, Uhrzeit nur in der Beschreibung (kein Uhrzeitfeld im Schema).
- ANNAHME: Beschriftung „Termin in Geräte-Kalender speichern“ mit sichtbarem Hinweistext (Lehre aus Klangland US-026).
- ANNAHME: `UID` `<event-id>@zentrum-praktische-fotografie`, Dateiname `<event-id>.ics`.
- ANNAHME: Absolute Adresse für `URL` zur Laufzeit gebildet; Quelle legt die Umsetzung fest.
- ANNAHME: ADR-018 `Proposed`; Bestätigung an H2. (Am 2026-10-30 bestätigt: `Accepted`.)
- ANNAHME (Umsetzung Review): Blob-Adresse wird nach 10 Sekunden freigegeben; kein `SEQUENCE`, kein `METHOD`.

## Closure
Abgeschlossen am 2026-10-30; siehe `SERVICE-14-CLOSURE.md`.
