# SERVICE-14 – Termin in den Gerätekalender übernehmen

**Status:** Abgeschlossen am 2026-10-30  ·  **Quelle:** Idee [`idee-005-termin-uebernehmen`](../../../product/ideen/idee-005-termin-uebernehmen.md)

> „Wenn es einen konkreten Termin gibt (Event), möchte ich auf der Detailansicht dieses Events eine Button haben, mit dem ich das Event in meinen Kalender übernehmen kann. Zur Orientierung hilft die Umsetzung von https://github.com/weberius/klangland.“

## Ziel
Auf der Detailseite eines Events gibt es eine Schaltfläche, die eine Kalenderdatei (`.ics`) für diesen Termin zum Download anbietet, sodass er im Kalender des Smartphones oder Rechners landet.

**Zweck in einem Satz:** Besucher:innen sollen einen Termin mit einem Klick in ihren Kalender übernehmen, statt ihn abzutippen.

**Erfolgskriterien**
- Auf `/events/:id` eines nicht beendeten Events gibt es die Schaltfläche „Termin in Geräte-Kalender speichern“ mit Hinweistext.
- Der Klick lädt `<event-id>.ics` mit Titel, Zeitraum, Ort, Beschreibung, Link und stabiler Kennung; es entsteht keine Netzanfrage.
- Die Datei besteht die Strukturprüfung nach RFC 5545 (automatisiert); Import in Apple/Google/Outlook per Handprobe.

## Kontext
Klangland (lokal `../klangland`, US-012 und US-026) erzeugt die `.ics` im Browser (`core/ics.ts`, Download über `Blob`), mit `VTIMEZONE`, Zeilenfaltung nach 75 Oktett, stabiler `UID`, ganztägigem Fallback ohne Uhrzeit und der später klargestellten Beschriftung „Termin in Geräte-Kalender speichern“ samt Hinweis (Verwechslung mit dem App-Kalender). Hier haben Events nur `startDate`/`endDate` (Datum), kein Uhrzeitfeld; Uhrzeit und Anwesenheit stehen bei Vernissagen und Finissagen im Text der `description` (SERVICE-13). Die Webanwendung hat eigene Seiten `/calendar` (Agenda) und `/events/:id` (Detail, `EventDetailPage`).

## Story-Schnitt
1. `STORY-01` Termin eines Events in den Gerätekalender speichern (ein kleiner Wunsch, eine Story)

## Abgrenzung
**Nicht enthalten:** Uhrzeitfelder im Schema und zeitgebundene Kalendereinträge (Folgeidee), Kalenderübernahme bei Ausstellungen, in Listen und in der Agenda, anbieterspezifische Links, Kalender-Feeds/Abonnements, Erinnerungen (`VALARM`), Sammel-Export, Änderung der Datenschutzerklärung (es verlässt nichts das Gerät), Änderung des Klangland-Repositories.

## Betroffene Bereiche
`web` (`event-detail`, neue reine Funktion in `core/`, Tests), Spezifikation `web/kalender-export`, ADR-018 (Proposed).

## Vorbereitete Spezifikation (Phase 3)
- EARS: `web/kalender-export.md` (ICS-UB-1 bis ICS-UB-7, ICS-EV-1, ICS-ST-1, ICS-UN-1)
- Gherkin: `web/kalender-export.feature` (11 Szenarien)
- Quality: `web/kalender-export.md` (Q-USE-15, Q-IOP-1, Q-SEC-6, Ergänzung Q-USE-3)
- ADR: ADR-018 (Proposed); geltend ADR-002, ADR-003, ADR-017

## Annahmen
- ANNAHME: Ticket-Key `SERVICE-14`, kein Jira-Ticket. Die Idee-Datei war beim Start nicht committet (`??`) und wurde nur im Kopf geändert; `main` steht auf `0928042` (SERVICE-13 enthalten).
- ANNAHME: „Event“ meint den Datensatztyp `events` (Vernissage, Finissage, Talk, Messe …); Ausstellungen bekommen die Schaltfläche nicht.
- ANNAHME: Der Termin ist ein **ganztägiger** Eintrag (Datumsbereich), weil es keine Uhrzeitfelder gibt; Uhrzeit steht in der Beschreibung. Ein `startTime`-Feld wäre eine eigene Idee.
- ANNAHME: Für beendete Events erscheint keine Schaltfläche.
- ANNAHME: Beschriftung „Termin in Geräte-Kalender speichern“ mit sichtbarem Hinweistext, übernommen aus der späteren Klarstellung in Klangland (US-026), weil es hier ebenfalls einen eigenen Kalender (`/calendar`) gibt.
- ANNAHME: `UID` `<event-id>@zentrum-praktische-fotografie`; Dateiname `<event-id>.ics`.
- ANNAHME: Die absolute Adresse der Detailseite (`URL`) wird zur Laufzeit aus der aktuellen Adresse und der Basis der Anwendung gebildet; die Umsetzung legt die Quelle fest (kein Hartcodieren der GitHub-Pages-Adresse).
- ANNAHME: ADR-018 als `Proposed`, weil mehrere gleichwertige Wege (Anbieter-Links, Feed, Bibliothek) bestanden.

## Qualitätserwartungen
Q-USE-15, Q-IOP-1, Q-SEC-6; zusätzlich Q-USE-2, Q-USE-3, Q-PERF-4.

## Definition of Done
- Spezifikation konsistent; ADR-018 an H2 bestätigt.
- Build, `npm test`, `npm run web:test`, `npm run lint:all` grün; Szenarien aus `kalender-export.feature` als Tests umgesetzt.
- Handprobe des Imports in mindestens Apple Kalender und Google Kalender (oder als „nicht geprüft“ an H2 genannt).

## Risiken
- Ganztägige Einträge verbergen die Uhrzeit von Vernissagen im Titelbereich des Kalenders; sie steht nur in der Beschreibung.
- Download-Verhalten unterscheidet sich je Browser (iOS öffnet `.ics` direkt im Kalender, andere speichern die Datei); nur Handprobe zeigt das.
- `Blob`-Download über ein erzeugtes `<a download>` im Test der SPA nur eingeschränkt prüfbar.
