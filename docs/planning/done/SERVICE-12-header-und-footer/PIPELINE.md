# Pipeline: SERVICE-12 – Header und Footer überarbeiten

**Review-Schwelle:** kritisch + hoch lösen Rücklauf aus (Default, an H1 zu bestätigen)  ·  **Modus:** autonom  ·  **Branch:** feature/SERVICE-12-header-und-footer  ·  **Quelle:** Idee `docs/product/ideen/idee-003-header-and-footer.md`

| Phase | Artefakt(e) | Status | Datum |
| --- | --- | --- | --- |
| 0 Setup | Ordner, PIPELINE.md, Feature-Branch | Erledigt | 2026-10-29 |
| 1 Vision (H1) | EPIC, Annahmen (nachgeschärft 2026-10-29) | Freigegeben (Aufruf von spec-pipeline) | 2026-10-29 |
| 2 UserStory | STORY-01 bis STORY-05 | Erledigt | 2026-10-29 |
| 3 Spezifikation · EARS | web/seitenrahmen.md (FRM-UB-1 bis FRM-UB-5, FRM-ST-1, FRM-EV-1 bis FRM-EV-3); web/markenicon.md (ICO-UB-7 ersetzt ICO-UB-3, ICO-UB-8 ersetzt ICO-UB-4); web/rechtliches.md (RCH-UB-1 bis RCH-UB-5); web/navigation.md (NAV-UB-7 ersetzt NAV-UB-6, NAV-UB-8 ersetzt NAV-UB-5) | Erledigt | 2026-10-29 |
| 3 Spezifikation · Gherkin | web/seitenrahmen.feature (9 Szenarien/Grundrisse); web/markenicon.feature (2 Szenarien angepasst); web/rechtliches.feature (5); web/navigation.feature (angepasst) | Erledigt | 2026-10-29 |
| 3 Spezifikation · Quality | web/seitenrahmen.md (Q-USE-12, Q-USE-13, Q-PERF-8); web/rechtliches.md (Q-USE-14); Ergänzungen Q-USE-2, Q-USE-3, Q-USE-4, Q-USE-11 (angepasst), Q-SEC-2, Q-SEO-2, Q-SEO-3 | Erledigt | 2026-10-29 |
| 3 Spezifikation · ADR | nicht erforderlich (Begründung unten) | Nicht erforderlich | 2026-10-29 |
| 3 Spezifikation · Konsistenz | Querbezüge geprüft (siehe unten) | Erledigt | 2026-10-29 |
| 4 Tasks | STORY-01: 1, STORY-02: 1, STORY-03: 1, STORY-04: 1, STORY-05: 3 | Erledigt | 2026-10-29 |
| 5 Implement | STORY-01 bis STORY-05: alle Tasks umgesetzt, Gate grün, 5 Changelogs | Erledigt | 2026-10-29 |
| 6 Human in the Loop (H2) · alle Stories gemeinsam | Prüfpaket | Akzeptiert | 2026-10-29 |
| 7 Review · STORY-01 (Architektur, Code), STORY-02 (Code), STORY-03 (Architektur, Code), STORY-04 (Code), STORY-05 (Code, Security; Compliance nicht verfügbar) | `review/` (Analysen, 17 vorgeschlagene Tasks), Triage unten | Erledigt (Abnahme 2026-10-29: 7 mittlere Tasks freigegeben, 6 umgesetzt, 1 beim Betreiber, übrige zurückgestellt) | 2026-10-29 |

Status: `Offen` · `In Arbeit` · `Erledigt` · `Nicht erforderlich` · `Rücklauf` · `Verworfen`
(an H1: `Entwurf (Intake)` / `Freigegeben`, an H2: `Akzeptiert` / `Abweichung`)

## ADR: nicht erforderlich
Sticky-Kopf, Burger-Menü und Fußbereich sind Darstellungsänderungen im bestehenden Seitenrahmen mit reinem CSS und einem Zustandssignal; es gibt keine Wahl zwischen technisch gleichwertigen Wegen mit Folgen für andere Teile (kein neues Paket, keine neue Datenquelle). Geltende ADRs als Leitplanken:
- ADR-002 (Angular-SPA, Vorabrendern; Menüzustand nur im Browser, Seiten bleiben ohne Skript lesbar – die Links stehen im vorab gerenderten HTML)
- ADR-016 (Seite als Spalte, Fußbereich am Fensterrand, `main` wächst; bleibt gültig, Kopf `sticky` statt `fixed`, damit die Spalte nicht gestört wird)
- ADR-017 (Marken-Icon im Link zur Startseite im Kopf)
- ADR-003 (GitHub Pages: Hosting-Angabe im Datenschutz), ADR-004 (OpenStreetMap-Kacheln), ADR-011/ADR-012 (Wikimedia-Quellen)

## Konsistenzcheck (Phase 3)
- Akzeptanzkriterien STORY-01 bis STORY-05: durch FRM-*, ICO-UB-7/8, RCH-*, NAV-UB-7/8 bzw. Q-USE-12/13/14, Q-PERF-8 abgedeckt.
- Jede EARS-Anforderung (FRM-*, ICO-UB-7, ICO-UB-8, RCH-*) hat ein Gherkin-Szenario; Q-USE-12, Q-USE-13, Q-USE-14 und Q-PERF-8 haben ein Prüfverfahren.
- Bestehende Anforderungen: MAP-UB-9 bleibt unverändert (Gherkin „Karte füllt die Fläche“ nennt weiter Impressum und Datenschutz, die in der Linkzeile bleiben); NAV-UB-5 und NAV-UB-6 per Supersede durch NAV-UB-8 und NAV-UB-7 ersetzt (Szenarien in `navigation.feature` angepasst); ICO-UB-3/ICO-UB-4 per Supersede durch ICO-UB-7/ICO-UB-8 ersetzt (Szenarien „Icon im Kopfbereich“ und „Icon auf jeder Seite gleich“ angepasst, Q-USE-11 mit Änderungsvermerk). NAV-UB-3 (Seitentitel) und ICO-UB-2 (Manifest-Name) bleiben.
- Hinweis zu bestehendem Test: `web/src/app/app.spec.ts` prüft bisher den Text „Praktische Fotografie“ im Link (ICO-UB-3/4); wird in der Umsetzung angepasst. Der Seitentitel-Test (NAV-UB-3, `SITE_NAME`) bleibt.
- Befund (kein Widerspruch): Q-USE-13 (Kopf ≤ 5 rem bei 390 Pixeln) begrenzt die Folge des längeren Namens; siehe „Konflikt zu benennen“ in `quality/web/seitenrahmen.md`.

## Review-Triage (Schwelle: kritisch + hoch)
Befunde: kritisch 0, hoch 0 – nichts oberhalb der Schwelle. Unterhalb: 7 mittlere, übrige niedrige Befunde (Tasks in `review/SERVICE-12-STORY-NN/`).

| Story | Befund (mittel) | Task | Quelle laut Ursachen-Routing |
| --- | --- | --- | --- |
| 01 | ARCH-01: Menü bleibt offen, wenn der Link der aktuellen Seite gewählt wird (widerspricht FRM-EV-2) | TASK-01 | Umsetzungsfehler → Task (Phase 5) |
| 01 | ARCH-02: Menüfeld bei niedrigen Fenstern nicht scrollbar, untere Links unerreichbar | TASK-02 | Qualität unzureichend → Quality (Q-USE-12/13 um Höhenmaß ergänzen) |
| 02 | CODE-02: Kopfhöhe und Scrollbreite (Q-USE-13) nur von Hand gemessen | TASK-22 | Umsetzungsfehler → Task (Test) |
| 03 | ARCH-01/CODE-01: Kopfversatz doppelt (`6rem` CSS, `96` TS) | TASK-01 / TASK-21 (überschneiden sich) | Umsetzungsfehler → Task |
| 03 | CODE-02: kein Test für den Router-Versatz, Testtitel versprechen mehr | TASK-03 / TASK-22 (überschneiden sich) | Umsetzungsfehler → Task (Test) |
| 05 | CODE-01: Hinweis zur EU-Streitschlichtung (OS-Plattform) möglicherweise überholt, Betreiber-Entscheidung nötig | TASK-21 | Anforderung fehlt/Inhalt → EARS RCH-UB-1 und Story |
| 05 | CODE-02: Q-USE-14 im Test nicht vollständig abgesichert (Überschriftenfolge, Titel, Beschreibung) | TASK-22 | Umsetzungsfehler → Task (Test) |

Zurückgestellt (niedrig, begründet: kein Einfluss auf Verhalten, Lesbarkeit): Story-01 TASK-03, TASK-21, TASK-22; Story-02 TASK-21; Story-03 TASK-02, TASK-23; Story-04 TASK-21, TASK-22; Story-05 TASK-23; SEC-01 (Referrer bei Kartenkacheln, kein Task).
**Nicht verfügbar:** Compliance-Review (STORY-05): `gbos-mcp` ist nicht verbunden, im Repo gibt es keine MCP-Konfiguration; der Skill ist offenbar für ein anderes Repository geschrieben. Review-Reihen für Architektur und Security der Stories 02, 04, 05 wurden nicht ausgeführt (Umfang an H1/H2 klein gehalten, wie bei SERVICE-11).

## Rückläufe
| Datum | Herkunft (H2/Review) | Befund | Klasse | Quelle korrigiert | Neu abgeleitet |
| --- | --- | --- | --- | --- | --- |

## Annahmen (zur Vorlage an H2)
Alle folgenden `ANNAHME:`-Punkte (Betreiberangaben, Datenschutz, Quellen & Lizenzen, Haftungsausschluss, Rücklink) am 2026-10-29 vom Menschen im Chat bestätigt; Phase 1 bleibt bis zum Aufruf von `/spec-pipeline` auf `Entwurf (Intake)`. Bestätigt am 2026-10-29 (Rückmeldung zum Intake): haftender Kopf und Fußbereich im Verhalten wie Klangland, Fußbereich als eigener Teil, Burger-Menü in allen Fensterbreiten, nur sichtbarer Name im Kopf, Umbruch des längeren Namens erlaubt (andere Lösung nur über neue Formulierung), Fußbereich nicht fixiert. SERVICE-11 liegt bereits in `main` (kein Merge nötig; `main` = `c73baa9`).
- ANNAHME: Ticket-Key `SERVICE-12`, kein Jira-Ticket.
- ANNAHME: Kopf `position: sticky` über dem Inhalt (auch über der Karte), Schaltfläche rechts, Menüfeld in voller Breite unter dem Kopf; Schließen per Schaltfläche, Linkwahl, Routenwechsel und Escape.
- ANNAHME: Nur der sichtbare Name im Kopf und dessen zugänglicher Name ändern sich; `<title>`, `SITE_NAME`, Manifest-Name und die Fußzeile „Zentrum für Praktische Fotografie · Fokus NRW“ bleiben.
- ANNAHME: Der längere Name darf umbrechen (Q-USE-13: Kopf ≤ 5 rem bei 390 Pixeln, ≤ 6 rem bei 320 Pixeln, kein horizontales Scrollen); ist das nicht erreichbar, wird eine andere Lösung formuliert (Rücklauf, H2).
- ANNAHME: Rechtliche Seiten: Haftungsausschluss und Quellen & Lizenzen neu (`/haftungsausschluss`, `/quellen`), Impressum und Datenschutz überarbeitet, an Klangland angelehnt, aber auf diese Anwendung zugeschnitten (keine Open-Opus-, Favoriten- oder Klangland-Aussagen).
- ANNAHME: Betreiberangaben im Impressum (Wolfram Eberius, Im Bachfeld 21, 51063 Köln, Telefon, E-Mail, Internetadresse) werden aus dem Klangland-Impressum übernommen (derselbe Betreiber angenommen); an H2 bestätigen. Die Texte sind keine Rechtsberatung.
- ANNAHME: „Quellen & Lizenzen“ listet Wikipedia/Wikimedia Commons/Wikidata, OpenStreetMap, Leaflet und die Webseiten der Orte und Veranstalter; Abgleich mit `data/` und `package.json` bei der Umsetzung.
- ANNAHME: Haftungsausschluss enthält zusätzlich den bisherigen Hinweis aus dem Impressum (recherchierte Angaben können sich ändern).
- ANNAHME: Fußbereich-Reihenfolge: Impressum, Haftungsausschluss, Datenschutz, Quellen & Lizenzen; die Zeile „Zentrum für Praktische Fotografie · Fokus NRW“ bleibt darunter.
- ANNAHME: Der Rücklink „‹ Zum Kalender“ der Klangland-Seiten entfällt.
- ANNAHME: Die Karte darf den Kopf nicht überdecken (Stapelreihenfolge der Leaflet-Ebenen; Q-USE-13).
- ANNAHME: Suche, Filterknopf und weitere Klangland-Bedienelemente im Kopf sind nicht Teil des Wunsches.
- ANNAHME: `app.spec.ts` prüft bisher den Linktext „Praktische Fotografie“ und wird angepasst; die Icon-Tests aus SERVICE-11 bleiben gültig.
- ANNAHME (Umsetzung): Beim ersten Messen war der Kopf bei 390 Pixeln 5,01 rem und bei 320 Pixeln 6,74 rem hoch (Maß ≤ 5 bzw. ≤ 6 rem). Behoben mit kleinerer Schrift auf schmalen Bildschirmen und engerem Padding (jetzt 3,56 rem); keine Änderung der Spezifikation nötig.
- ANNAHME (Umsetzung): Der Router-Anker-Sprung ignoriert `scroll-padding`; deshalb setzt `app.config.ts` zusätzlich `ViewportScroller.setOffset([0, 96])` (entspricht 6 rem; bei geänderter Kopfhöhe beides anpassen).
- ANNAHME (Umsetzung): Der Sprunglink „Zum Inhalt springen“ verweist mit `<base href="/">` auf `/#inhalt`; das war vorher so und bleibt (Angular löst den Anker über den Router).
- ANNAHME (Umsetzung): Die Lighthouse-/Qualitätsbefunde (5 doppelte Titel, `/map` Performance 82) bestehen schon vor diesem Ticket (siehe SERVICE-11); axe meldet nichts, CLS 0.
- ANNAHME (Umsetzung): Impressum, Datenschutz, Haftungsausschluss und Quellen sind nicht juristisch geprüft; die Betreiberangaben stammen aus dem Klangland-Impressum.
- Closure: 2026-10-29, Ordner nach `done/` verschoben.
