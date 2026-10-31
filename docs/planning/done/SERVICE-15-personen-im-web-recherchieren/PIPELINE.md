# Pipeline: SERVICE-15 – Personen im Web recherchieren

**Review-Schwelle:** kritisch + hoch lösen Rücklauf aus (Default, an H1 zu bestätigen)  ·  **Modus:** autonom  ·  **Branch:** feature/SERVICE-15-personen-im-web-recherchieren  ·  **Quelle:** Idee `docs/product/ideen/idee-006-personen-recherchieren.md`

| Phase | Artefakt(e) | Status | Datum |
| --- | --- | --- | --- |
| 0 Setup | Ordner, PIPELINE.md, Feature-Branch | Erledigt | 2026-10-31 |
| 1 Vision (H1) | EPIC, Annahmen | Freigegeben (durch Aufruf von spec-pipeline) | 2026-10-31 |
| 2 UserStory | STORY-01 bis STORY-03 | Erledigt | 2026-10-31 |
| 3 Spezifikation · EARS | setup/personen-websuche.md (WSP-UB-1 bis WSP-UB-7, WSP-EV-1 bis WSP-EV-4, WSP-OP-1, WSP-UN-1, WSP-UN-2); content/fotografinnen-profile.md (PRF-UB-6, PRF-UN-4); web/fotografinnen.md (PHO-UB-11, PHO-ST-3) | Erledigt | 2026-10-31 |
| 3 Spezifikation · Gherkin | setup/personen-websuche.feature (15), content/fotografinnen-profile.feature (+2), web/fotografinnen.feature (+2) | Erledigt | 2026-10-31 |
| 3 Spezifikation · Quality | setup/personen-websuche.md (Q-SEC-7, Q-DATA-14, Q-DATA-15, Q-MAIN-6) | Erledigt | 2026-10-31 |
| 3 Spezifikation · ADR | ADR-019 (Accepted) | Erledigt | 2026-10-31 |
| 3 Spezifikation · Konsistenz | siehe unten | Erledigt | 2026-10-31 |
| 4 Tasks | STORY-01-TASK-01 bis 04, STORY-02-TASK-01 und 02, STORY-03-TASK-01 | Erledigt | 2026-10-31 |
| 5 Implement | Code, Tests, CHANGELOG je Story; Gate grün | Erledigt | 2026-10-31 |
| 6 Human in the Loop (H2) | Prüfpaket | Akzeptiert | 2026-10-31 |
| 7 Review | Code-Review per Subagent: 1 Befund (mittel, SSRF) | Erledigt | 2026-10-31 |

Status: `Offen` · `In Arbeit` · `Erledigt` · `Nicht erforderlich` · `Rücklauf` · `Verworfen`
(an H1: `Entwurf (Intake)` / `Freigegeben`, an H2: `Akzeptiert` / `Abweichung`)

## ADR
ADR-019 (`Accepted`): Websuche über den Skill, Linksammlung, Webkurztext als eigenes Feld, Bilder nur Commons. Geltende ADRs als Leitplanken: ADR-006 (höflicher Abruf), ADR-007 (Freigabe), ADR-011 (Profile), ADR-012 (Wikimedia-Recherche, bleibt gültig), ADR-002 (statische SPA).

## Konsistenzcheck (Phase 3)
- Akzeptanzkriterien STORY-01: 1 → WSP-UB-1; 2 → WSP-EV-1, Q-SEC-7; 3 → WSP-UB-2, Q-DATA-14; 4 → WSP-UB-3, Q-SEC-7; 5 → WSP-EV-2, WSP-UN-2; 6 → WSP-UN-1; 7 → WSP-OP-1, Q-MAIN-6; 8 → WSP-EV-4.
- STORY-02: 1 → WSP-EV-3; 2 → WSP-UB-7, WSP-UB-4; 3 → WSP-UB-4, Q-DATA-15; 4 → WSP-UB-5; 5 → WSP-UB-6; 6 → PRF-UB-6, PRF-UN-4.
- STORY-03: 1 → PHO-UB-11; 2 → PHO-UB-11, Q-USE-5; 3 → PHO-ST-3; 4 → Q-SEC-2.
- Jede EARS-Anforderung hat ein Gherkin-Szenario; Q-SEC-7, Q-DATA-14, Q-DATA-15, Q-MAIN-6 haben ein Prüfverfahren.
- Supersede: PHO-ST-3 ersetzt PHO-ST-2 (Szenario „Person ohne Portrait und Wikipedia“ bleibt gültig und ist in PHO-ST-3 aufgeführt). Sonst bleibt Bestehendes unverändert: RSF-* (Wikimedia-Recherche), FET-* (Abrufdienst), PRF-UB-1 bis PRF-UN-3, PHO-UB-8, Q-SEC-5.
- Befund (kein Widerspruch): `RSF-UB-3` beschränkt die Netzanfragen der Wikipedia-Recherche auf Wikimedia-Hosts; das gilt unverändert für `photographers:fetch`. Die Websuche nutzt eigene Regeln (WSP-UB-3, Q-SEC-7), `--web` ändert RSF-UB-3 nicht.
- Befund: Schema `photographers.schema.json` braucht `web`; das gehört zur Umsetzung (Phase 5). Umgesetzt in STORY-02-TASK-01.
- Befund: `PRF-UB-4`/`PRF-UN-2` (Dubletten nach Name) gelten für neu angelegte Personen sinngemäß (WSP-UN-2).

## Rückläufe
| Datum | Herkunft (H2/Review) | Befund | Klasse | Quelle korrigiert | Neu abgeleitet |
| --- | --- | --- | --- | --- | --- |
| 2026-10-31 | Review (Code) | Trefferseiten könnten interne Adressen sein (SSRF), mittel | Anforderung fehlt | EARS WSP-UB-3, Q-SEC-7 | `isInternalHost` in `websearch.mjs`, Test, Gate |

## Annahmen (zur Vorlage an H2)
- ANNAHME: Ticket-Key `SERVICE-15`; Idee-Datei: Status stand auf `offen.` (mit Punkt), jetzt `in-arbeit`; `main` steht auf `80eb4a5`. Nicht committete Änderungen beim Start: siehe `git status` (nur die neuen Artefakte).
- ANNAHME: Erweiterung des Skills `research-photographers` um `--web`, kein neuer Skill.
- ANNAHME: Suchmaschine = Websuche des Agenten, anbieterneutral; Anbieter im Bericht genannt.
- ANNAHME: Linksdatei = `updates/photographers-links.json` (kumulativ, versioniert, nicht im Build).
- ANNAHME: Websuche nur für benannte Person (`--photographer <id>` oder `--name`).
- ANNAHME: „Kurztext“ aus Webquellen = neues Feld `web` (40–90 Wörter, 1–5 Quellen), Anzeige „Aus dem Web“; `wikipedia.summary` bleibt unangetastet.
- ANNAHME: „Neue Ergebnisse“ = neue Links gegenüber der Linksammlung.
- ANNAHME: Neue Person nur mit `id` und `name`; Rest über bestehenden Wikimedia-Weg.
- ANNAHME: Bilder nur über den bestehenden Weg (Wikidata P18/Titelbild auf Commons), keine Commons-Bildsuche.
- ANNAHME: Trefferseiten nach ADR-006 (≤ 5 je Person); Textauszüge genügen bei Sperre.
- ANNAHME: ADR-019 `Proposed`; Bestätigung an H2.
- ANNAHME (Umsetzung): Befehle als `npm run photographers:web -- plan|links|pages|check|apply` (ADR-019 entsprechend angepasst); der Skill führt die Suche, die Skripte verarbeiten die Suchdatei.
- ANNAHME (Umsetzung): Die Grenze „höchstens fünf Seiten“ zählt die ersten fünf neuen Links; gesperrte oder weitergeleitete Seiten verbrauchen davon einen Platz.
- ANNAHME (Umsetzung): Ein Vorschlag mit `image` von Wikimedia gilt als gültig, das Bild selbst wird nicht in diesem Ablauf geladen (Portraits nur über `photographers:fetch`); jeder andere Host wird verworfen.
- ANNAHME (Umsetzung): Der Test „Websuche nur auf Wunsch“ prüft `web.mjs` (nur mit `--web`) und dass `photographers:fetch` keine Suchmaschine anspricht; die Skill-Regel „ohne `--web` keine Suche“ ist eine Textregel (Skill-Test).
- Nicht geprüft: echte Suchmaschine, Handtest des Skills, Sachrichtigkeit der Kurztexte, Darstellung im Browser (nur Komponententests).
- Tooling: `web/node_modules` und eine Headless-Chrome-Installation (außerhalb des Repos) wurden für die Web-Tests eingerichtet.
