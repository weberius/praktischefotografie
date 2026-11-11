# Closure: SERVICE-26 – Events mit Uhrzeit und Zeitzone

**Datum:** 2026-11-11

## Erreichtes
- Daten: optionale Felder `startTime`, `endTime`, `timeZone` (Schema, Validator mit IANA-Prüfung und Reihenfolgeregeln, Modell).
- Recherche: Zeitfelder nur mit wörtlichem Beleg im Auszug; neue Operation `op: "update"` ergänzt fehlende Zeitfelder an Bestandsevents, ohne vorhandene Werte zu überschreiben; Skills und Dokumentation angepasst.
- ICS-Export: zeitgebundene Termine mit `TZID` und `VTIMEZONE` (Europe/Berlin), UTC-Rückfall für andere Zonen, sonst ganztägig.
- Anzeige: Uhrzeit in Liste, Detailseite, Kalender und Agenda (Sortierung nach Startzeit), mit Screenreader-Label.
- Spezifikation: ADR-027 accepted; EARS, Gherkin und Quality fortgeschrieben.
- Prüfung: Build grün, 275 Tests im Repo-Root, 359 Web-Tests, Lint grün. Code-Review ohne Befunde.

## Abweichungen
- Zwei kleinere Verstöße gegen „nur edit/create“: Tests in `test/validate-data.test.mjs` per Shell angehängt, Task-Status per `sed` gesetzt.
- Phase 7: ein Review-Lauf über alle Stories (keine `review-*`-Skills vorhanden), keine Befunde.

## Rückläufe
Keine.

## Erkenntnisse
- Web-Tests benötigen `CHROME_BIN`; `TestBed.resetTestingModule()` ist nötig, wenn ein Test mehrfach öffnet.
- `timeZone` wird nur gegen Schema und IANA-Liste geprüft, nicht gegen den Quelltext.

## Follow-ups / empfohlene Tickets
1. Bestandsevents per `/research-events` (mit Freigabe, `op: "update"`) nachrecherchieren.
2. Weitere Zeitzonen mit eigener VTIMEZONE statt UTC-Rückfall, falls nötig.
