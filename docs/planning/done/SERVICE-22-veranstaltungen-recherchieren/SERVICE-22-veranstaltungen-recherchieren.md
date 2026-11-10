# SERVICE-22 – Veranstaltungen und Führungen recherchieren

**Status:** Entwurf (Intake)  ·  **Quelle:** Idee [`idee-013-veranstaltungen`](../../../product/ideen/idee-013-veranstaltungen.md)

> „Es werden nicht alle Führungen und Veranstaltungen berücksichtigt. Z.b. die Die Photographische Sammlung/SK Stiftung Kultur bietet einige Veranstaltungen an, die noch nicht in der Webapp zu finden sind. Es soll ein Skill erstellt werden, der für alle Venues die konkreten Veranstaltungen recherchiert. Dabei soll es möglich sein die Veranstaltungen nur einer Venue zu ermitteln oder auch auch eine Aktualisierung über alle Venues durchzuführen.“
> (Beispiel: https://photographie-stiftungkultur.de/programm/fuehrungen-und-veranstaltungen)

## Ziel
Ein Skill `research-events` recherchiert die konkreten Führungen und Veranstaltungen der Orte auf deren Webseiten, schlägt sie mit Fundstelle vor und übernimmt sie nach Freigabe in `data/events.json` – wahlweise für einen Ort (`--venue`) oder für alle Orte.

**Zweck in einem Satz:** Besucher:innen finden in der Webanwendung die tatsächlich angebotenen Führungen und Veranstaltungen der Orte, nicht nur Eröffnungen und wenige Einzeltermine.

**Erfolgskriterien**
- Der Skill ermittelt Veranstaltungen eines Ortes oder aller Orte mit `website`.
- Führungen sind als eigener Typ „Führung“ erfasst und in `/events` erkennbar und filterbar.
- Jede Veranstaltung hat einen belegten Termin ab heute und eine Fundstelle; keine Dubletten.
- Abruf bleibt rücksichtsvoll (ADR-006); `data/` ändert sich nur nach Freigabe.

## Kontext
`update-venue-data` (SKL, UPD, FET; ADR-006/007) ruft je Ort nur sechs Seiten ab und konzentriert sich auf Orte und Ausstellungen; Vernissagen und Finissagen laufen über OPN. `data/events.json` enthält heute 5 Events. Das Schema kennt keinen Typ „Führung“.

## Story-Schnitt
1. `STORY-01` Veranstaltungen und Führungen eines Ortes recherchieren und übernehmen
2. `STORY-02` Veranstaltungen aller Orte in einem Lauf aktualisieren
3. `STORY-03` Führungen in der Webanwendung als eigener Typ zeigen

## Abgrenzung
**Nicht enthalten:** Ortsdaten, Ausstellungen, Personen, Veranstalter und Festivals (bleiben bei `update-venue-data`); Vernissagen/Finissagen (OPN); Veranstaltungen von Veranstalter-Websites (z. B. Photoszene Köln) und Festivals; Magazin-Neuigkeiten zu Veranstaltungen; Ticketing und Buchungslinks als eigene Funktion; wiederkehrende Führungen ohne einzelne belegte Termine; Pflege eines `eventsUrl`-Feldes je Ort; automatische Ausführung (Cron).

## Betroffene Bereiche
`setup` (Skill, Abrufmodus, Vorschlagsprüfung), `content` (Schema `eventType`), `web` (Typ „Führung“); Spezifikation `setup/veranstaltungen-recherche`, `web/events`, `content/datenmodell`; ADR-026 (Proposed).

## Vorbereitete Spezifikation (Phase 3)
- EARS: `setup/veranstaltungen-recherche.md` (VRS-UB-1 bis VRS-UB-7, VRS-OP-1, VRS-UN-1, VRS-UN-2, VRS-EV-1, VRS-EV-2); `web/events.md` (EVT-UB-6); `content/datenmodell.md` (DAT-UB-8 ersetzt DAT-UB-7)
- Gherkin: `setup/veranstaltungen-recherche.feature`, `web/events.feature`, `content/daten.feature`
- Quality: Q-SEC-12, Q-DATA-17, Q-REL-3, Q-USE-19
- ADR: ADR-026 (Proposed); geltend ADR-006, ADR-007, ADR-002, ADR-001

## Annahmen
- ANNAHME: Ticket-Key `SERVICE-22`. Beim Start lag nur die Ideendatei `idee-013-veranstaltungen.md` uncommittet vor (untracked); sie wird mit Status `in-arbeit` fortgeschrieben.
- ANNAHME: „Alle Venues“ = alle Orte (`venues.json`) mit `website`; Veranstalter-Websites werden nicht abgerufen, weil Events eine `venueId` brauchen.
- ANNAHME: Eigener Skill `research-events` statt Erweiterung von `update-venue-data` (ADR-026, Proposed).
- ANNAHME: Der Standardabruf (sechs Seiten) reicht für tiefe Programmseiten nicht; ein Modus `--events` ruft bis zu zehn Seiten mit Vorrang für Veranstaltungslinks ab. Ein Feld `eventsUrl` je Ort wird nicht eingeführt.
- ANNAHME: „Führung“ braucht einen neuen Event-Typ `guided_tour` (Anzeige „Führung“); er ersetzt DAT-UB-7 additiv. Weitere Typen (`talk`, `workshop`, `reading`, `symposium`) bestehen schon.
- ANNAHME: Je belegtem Termin ein Event, höchstens 30 je Ort und Lauf, nur Termine ab heute mit belegtem Datum; Reihen ohne Einzeltermine werden nicht vorgeschlagen.
- ANNAHME: Vernissagen und Finissagen bleiben bei `update-venue-data` (OPN); der neue Skill schlägt sie nicht vor.
- ANNAHME: Vorschlagsdateien liegen getrennt unter `updates/<Datum>/events/<venue-id>.json`, damit sie nicht mit den Ortsvorschlägen kollidieren.
- ANNAHME: Der Skill darf Events nur mit `isCommercial` nach Seitenaussage kennzeichnen; ohne Hinweis `false`.

## Qualitätserwartungen
Q-SEC-12, Q-DATA-17, Q-REL-3, Q-USE-19; weiter Q-SEC-4, Q-DATA-3, Q-REL-1.

## Definition of Done
- Spezifikation konsistent; ADR-026 an H2 bestätigt.
- Build, `npm test`, `npm run web:test` und `npm run lint:all` grün; Szenarien als Tests umgesetzt.
- Skill, `updates/README.md` und README dokumentieren Aufruf, `--venue` und `--events`.
- Ein Probelauf für `photographische-sammlung-koeln` liefert die Führungen der genannten Seite als Vorschläge.

## Risiken
- Seiten sind dynamisch oder ohne einzelne Daten; dann bleiben Vorschläge aus (Text ohne JavaScript).
- Längere Läufe über alle Orte; Belastung der Betreiber – Abstand, `robots.txt`, Cache bleiben bindend.
- Dubletten zu Eröffnungsterminen oder zu manuell gepflegten Events.
- Falsch erkannte Termine (Zeitzone, Datumsformate); Prüfung durch Fundstelle und Freigabe.
