# Pipeline: SERVICE-13 – Eröffnung und Finissage bei der Recherche erfassen

**Review-Schwelle:** kritisch + hoch lösen Rücklauf aus (Default, an H1 zu bestätigen)  ·  **Modus:** autonom  ·  **Branch:** feature/SERVICE-13-eroeffnungstermine-recherche  ·  **Quelle:** Idee `docs/product/ideen/idee-004-recherche.md`

| Phase | Artefakt(e) | Status | Datum |
| --- | --- | --- | --- |
| 0 Setup | Ordner, PIPELINE.md, Feature-Branch | Erledigt | 2026-10-30 |
| 1 Vision (H1) | EPIC, Annahmen | Freigegeben (Aufruf von spec-pipeline) | 2026-10-30 |
| 2 UserStory | STORY-01, STORY-02, STORY-03 (erweitert 2026-10-30: Finissage) | Erledigt | 2026-10-30 |
| 3 Spezifikation · EARS | setup/eroeffnungstermine.md (OPN-UB-1 bis OPN-UB-8, OPN-UN-1, OPN-EV-1); content/datenmodell.md (DAT-UB-7); web/events.md (EVT-UB-5) | Erledigt | 2026-10-30 |
| 3 Spezifikation · Gherkin | setup/eroeffnungstermine.feature (12 Szenarien); content/daten.feature (1); web/events.feature (2) | Erledigt | 2026-10-30 |
| 3 Spezifikation · Quality | setup/eroeffnungstermine.md (Q-DATA-12 und Q-DATA-13 erweitert); Q-DATA-1, Q-USE-4 unverändert herangezogen | Erledigt | 2026-10-30 |
| 3 Spezifikation · ADR | nicht erforderlich (Begründung unten) | Nicht erforderlich | 2026-10-30 |
| 3 Spezifikation · Konsistenz | siehe unten | Erledigt | 2026-10-30 |
| 4 Tasks | STORY-03: 1, STORY-01: 2, STORY-02: 1 (Reihenfolge 03 → 01 → 02) | Erledigt | 2026-10-30 |
| 5 Implement | STORY-03, STORY-01, STORY-02: alle 4 Tasks umgesetzt, Gate grün, 3 Changelogs | Erledigt | 2026-10-30 |
| 6 Human in the Loop (H2) · alle Stories gemeinsam | Prüfpaket | Akzeptiert (2026-10-30) | 2026-10-30 |
| 7 Review · STORY-01/02 (Architektur, Code, Security), STORY-03 (Code); Compliance nicht verfügbar | `review/SERVICE-13-STORY-01/`, `review/SERVICE-13-STORY-03/`, 16 vorgeschlagene Tasks, Triage unten | Erledigt (Abnahme 2026-10-30: Empfehlung; TASK-07, TASK-08, STORY-03 TASK-01 umgesetzt, übrige zurückgestellt) | 2026-10-30 |

Status: `Offen` · `In Arbeit` · `Erledigt` · `Nicht erforderlich` · `Rücklauf` · `Verworfen`
(an H1: `Entwurf (Intake)` / `Freigegeben`, an H2: `Akzeptiert` / `Abweichung`)

## ADR: nicht erforderlich
Der Abrufweg bleibt (kein `wget`/Python-Wechsel, Analyse in `docs/discovery/recherche-abruf-und-extraktion.md`); neu sind zwei Extraktionsziele (`vernissage`, `finissage`), eine Berichtszeile und ein additiver Wert im Event-Typ-Enum (`finissage`) samt Beschriftung. Kein neues Paket, keine neue Datenquelle, keine Datenmigration; die Erweiterung folgt dem bestehenden Muster (ADR-001 Schema, ADR-002 Anzeige) und braucht keine Abwägung. Geltende ADRs als Leitplanken:
- ADR-001 (JSON-Schema-Validierung; Enum erweitert)
- ADR-002 (Angular-SPA; Typ-Label und Filter)
- ADR-006 (Abruf, Snapshots unter `.cache/`, unverändert)
- ADR-007 (Extraktion als Vorschläge mit Freigabe, deterministische Prüfung)
- ADR-010 (Quellen: Orte und Veranstalter)

## Konsistenzcheck (Phase 3)
- Akzeptanzkriterien STORY-01 durch OPN-UB-1 bis OPN-UB-8, OPN-UN-1 bzw. Q-DATA-12 abgedeckt; STORY-02 durch OPN-EV-1 bzw. Q-DATA-13, Q-MAIN-2; STORY-03 durch DAT-UB-7, EVT-UB-5 bzw. Q-DATA-1, Q-USE-4.
- Jede EARS-Anforderung hat ein Gherkin-Szenario; Q-DATA-12 und Q-DATA-13 haben ein Prüfverfahren.
- Bestehendes unverändert: UPD-UB-5 (Dubletten bei Ausstellungen/Events) bleibt; OPN-UB-4 konkretisiert es für Vernissagen. SKL-Anforderungen bleiben; der Skill erhält in Phase 5 den Schritt „Eröffnungstermine“ (Dokumentation, kein Supersede). `events.schema.json` erhält additiv den Wert `finissage` (DAT-UB-7); bestehende Szenarien in `events.feature` und `daten.feature` bleiben unverändert, neue kommen hinzu. EVT-UB-2 (Filter nach Typ) wird durch EVT-UB-5 konkretisiert, nicht ersetzt.
- Befund (kein Widerspruch): NWS-UB-2 (Anlass `eroeffnung` = `startDate`) kennt weiter keine Uhrzeit; die Magazin-Beiträge bleiben außerhalb des Umfangs.
- Befund: Die Webanwendung leitet Filter und Beschriftung aus `EVENT_TYPE_LABEL` ab; Phase 5 ergänzt `models.ts` (Typ, Label), `event-list.ts` (Meta-Beschreibung nennt Vernissagen), `web/src/app/testing/test-data.ts` und das Schema. Ein Eintrag in `data/events.json` ist nicht nötig.
- Befund: Die Kennung „Eröffnung: <Titel>“ in OPN-UB-3 braucht in Phase 5 ggf. eine Anpassung der Dubletten-Prüfung in `scripts/scrape/lib/proposals.mjs` (UPD-UB-5 vergleicht Ort, Titel, Beginn).

## Review-Triage (Schwelle: kritisch + hoch)
Befunde: kritisch 0, **hoch 2**, mittel 5, niedrig 9. Alle Tasks stehen auf `Vorgeschlagen`; nichts davon ist umgesetzt. TASK-03 (Code) deckt sich inhaltlich mit TASK-07/08 (Architektur) und entfällt bei deren Umsetzung.

| Befund | Schwere | Task | Quelle laut Ursachen-Routing | Empfehlung |
| --- | --- | --- | --- | --- |
| ARCH-01 (= CODE-01): Datum im Textauszug wird nicht mit `startDate` verglichen (`Opening: 14 November` lässt `startDate` 2026-11-07 durch) | hoch | STORY-01/TASK-07 | Verhalten unklar → Gherkin (Szenario „Datum weicht vom Textauszug ab“ ergänzen), dann Umsetzungsfehler → Task | umsetzen |
| ARCH-02 (= CODE-02): Uhrzeit-Erkennung hält Datum (`7.11.`) für Uhrzeit, OPN-UN-1 umgehbar (bestätigt) | hoch | STORY-01/TASK-08 | Umsetzungsfehler → Task | umsetzen |
| ARCH-03/04: „bereits vorhanden“ über Freitext; Veranstalter-Quellen bleiben ewig „zu prüfen“ | mittel | STORY-01/TASK-09 | ARCH-04: technischer Weg (ADR-010) → Entscheidung; ARCH-03: Task | zurückstellen, ARCH-04 an Sie |
| CODE-01 (Story 03): DAT-UB-7 steht außerhalb der Tabelle in `datenmodell.md` | mittel | STORY-03/TASK-01 | Fehler in EARS → Quelle korrigieren | umsetzen (Dokumentation, klein) |
| CODE-02 (Story 03): EVT-UB-5 nennt „Detail“, Gherkin hat kein Detail-Szenario | mittel | STORY-03/TASK-01 | Verhalten unklar → Gherkin | umsetzen (zusammen mit obigem) |

Zurückgestellt (niedrig, begründet: kein Einfluss auf Verhalten, nur Aufräumen oder Härtung): STORY-01 TASK-01, TASK-02 (Security, Low; Freigabe durch den Menschen fängt Prompt-Injection ab), TASK-04, TASK-05, TASK-06, TASK-10; STORY-03 TASK-02.
**Nicht verfügbar:** Compliance-Review (`gbos-mcp` nicht verbunden, Skill offenbar für ein anderes Repository geschrieben). Alle Reviews hatten Tests, Build und Lint nicht ausgeführt.

## Rückläufe
| Datum | Herkunft (H2/Review) | Befund | Klasse | Quelle korrigiert | Neu abgeleitet |
| --- | --- | --- | --- | --- | --- |
| 2026-10-30 | Review (Rücklauf 1 von höchstens 2) | ARCH-01/CODE-01: Datum nicht belegt | Verhalten unklar | Gherkin + EARS OPN-UN-2, Quality Q-DATA-12 | `proposals.mjs`, `termine.mjs`, Tests |
| 2026-10-30 | Review | ARCH-02/CODE-02: Datum als Uhrzeit erkannt | Umsetzungsfehler | EARS OPN-UN-1 präzisiert | `termine.mjs`, Tests |
| 2026-10-30 | Review | STORY-03 CODE-01/02: DAT-UB-7 außerhalb Tabelle, Detail ohne Szenario | Anforderung/Verhalten | EARS `datenmodell.md`, Gherkin `events.feature` | Test umbenannt, README |

## Annahmen (zur Vorlage an H2)
- ANNAHME: Ticket-Key `SERVICE-13`, kein Jira-Ticket; Idee-Datei war beim Start nicht committet und wurde nur im Kopf geändert (`status`, `ticket`).
- ANNAHME: „Recherche“ meint den Skill `update-venue-data` („update-venue-date“ in der Idee); `research-photographers` ist nicht Teil.
- ANNAHME: Die Frage „wget/Python in Temp-Ordner?“ ist beantwortet: das ist der bestehende Ablauf (ADR-006/007); der Abruf bleibt. Ursache war die Extraktion (Information stand im Snapshot).
- ANNAHME (2026-10-30, Rückmeldung): Zusätzlich zur Vernissage wird die Finissage als Event (`finissage`) erkannt und unter Events gezeigt. `finissage` ist ein neuer additiver Enum-Wert im Schema; nur ausdrücklich genannte Finissagen werden vorgeschlagen, das Ausstellungsende allein genügt nicht. Titel „Finissage: <Ausstellungstitel>“, `id` `<Ausstellungs-id>-finissage`. Magazin-Beiträge zur Finissage sind nicht Teil.
- ANNAHME: Eröffnungstermin = Event `vernissage`; Uhrzeit und Anwesenheit stehen in der `description` (Schema hat nur Datumsfelder, keine Schemaänderung).
- ANNAHME: Titel „Eröffnung: <Ausstellungstitel>“, `id` `<Ausstellungs-id>-eroeffnung`.
- ANNAHME: Auch bereits bekannte Ausstellungen werden geprüft; vergangene Eröffnungen werden nicht vorgeschlagen.
- ANNAHME: Der Eröffnungshinweis-Zähler im Bericht ist ein Stichwortzähler (Vernissage, Opening, Eröffnung mit Datum), kein Parser; Fehlalarme sind möglich.

- ANNAHME (Umsetzung Review): Fehlt im Text das Jahr, genügen Tag und Monat; jede in der `description` genannte Uhrzeit muss im Textauszug stehen.

## Closure
Abgeschlossen am 2026-10-30; siehe `SERVICE-13-CLOSURE.md`.
