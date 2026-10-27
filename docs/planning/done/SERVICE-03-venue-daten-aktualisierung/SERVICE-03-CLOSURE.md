# Closure: SERVICE-03 – Orts-Daten aus Webseiten aktualisieren

**Datum:** 2026-10-27

## Erreichtes
- Abrufdienst (`scripts/scrape/`): `robots.txt`, 2 s Abstand je Host, Zeit- und Größenlimit, ≤ 6 Seiten je Ort, keine fremden Hosts, Kennung im User-Agent, Snapshots unter `.cache/`, Cache und Offline-Modus.
- Prüfer und Übernahme: Vorschläge mit Fundstelle (Textauszug im Snapshot), Schema- und Referenzprüfung, Dublettenschutz, Freigabe vor Übernahme, Schutz verifizierter Orte, Rollback, Bericht.
- Skill `/update-venue-data` mit Ablauf, Extraktionsregeln und Freigabe; Dokumentation in `updates/README.md` und `README.md`.
- Spezifikation: 24 Anforderungen, 24 Szenarien, Q-SEC-4, Q-REL-1, Q-DATA-3, Q-MAIN-2, Q-PERF-5; ADR-006 und ADR-007 accepted.
- Prüfung: 93 Tests im Repo-Root grün (alle offline), Lint grün.

## Abweichungen
- Phase 7 (Review) nicht durchgeführt: keine `review-*`-Skills vorhanden.
- Kein Abruf gegen echte Webseiten und keine Extraktion mit echten Seiten (benötigt `SCRAPE_CONTACT`).

## Rückläufe
Keine.

## Erkenntnisse
- Der Abstand je Host muss ab Antwort gezählt werden; ab Absenden gemessene Abstände schwankten im Test (instabiler Test), nach der Änderung stabil.
- Ein nicht lesbares `robots.txt` wird als Fehler des Ortes berichtet, nicht still übersprungen.
- Der Prüfer kann bei Datums- und Wahrheitswerten die Fundstelle nur im Snapshot, nicht im Wert belegen.

## Follow-ups / empfohlene Tickets
1. Ersten echten Lauf mit einem Ort durchführen (`SCRAPE_CONTACT` setzen), Ergebnis prüfen, Nutzungsbedingungen der Betreiber bewerten.
2. Neue Felder (Öffnungszeiten, Eintritt, Barrierefreiheit) per Schemaänderung und SPA-Anzeige.
3. Seiten mit JavaScript-Inhalt (Headless-Browser) bei Bedarf.
4. Zeitgesteuerte Läufe und Hinweis auf veraltete `checkedAt`-Daten.
5. Konflikte bei verifizierten Orten mit eigenem Freigabeweg (`--allow-conflicts`).
6. Review-Skills anlegen.
