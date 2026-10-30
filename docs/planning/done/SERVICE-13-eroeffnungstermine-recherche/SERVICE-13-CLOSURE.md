# Closure: SERVICE-13 – Eröffnung und Finissage bei der Recherche erfassen

**Datum:** 2026-10-30  ·  **Quelle:** Idee `docs/product/ideen/idee-004-recherche.md`  ·  **Analyse:** `docs/discovery/recherche-abruf-und-extraktion.md`

## Erreichtes
- Antwort auf die Frage der Idee: Der Abruf mit Snapshots unter `.cache/` ist bereits das beschriebene Vorgehen; der Termin zu „Between“ stand im Snapshot, die Extraktion hatte kein Ziel dafür. Der Abrufweg bleibt unverändert.
- Eröffnung und Finissage werden als Events (`vernissage`, `finissage`) vorgeschlagen: Titel „Eröffnung: …“ bzw. „Finissage: …“, `id` `<Ausstellung>-eroeffnung|-finissage`, Datum nicht in der Vergangenheit, Beleg im Textauszug (Stichwort und Datum, jede genannte Uhrzeit), Finissage nur bei ausdrücklicher Nennung, Dubletten verworfen.
- `finissage` ist gültiger Event-Typ im Schema und erscheint in der Webanwendung als „Finissage“ in Liste, Detail und Filter.
- `REPORT.md` hat den Abschnitt „Termine“: je Quelle Hinweise, Vorschläge, bereits Vorhandenes, „zu prüfen“. Echtlauf auf den vorhandenen Snapshots: elf Quellen mit Hinweisen.
- Skill `update-venue-data` und `updates/README.md` beschreiben das Extraktionsziel.
- Spezifikation: OPN-UB-1 bis OPN-UB-8, OPN-UN-1, OPN-UN-2, OPN-EV-1, DAT-UB-7, EVT-UB-5; Gherkin `eroeffnungstermine.feature` (15 Szenarien), `daten.feature` (+1), `events.feature` (+3); Q-DATA-12, Q-DATA-13. Kein ADR.
- Prüfung: Build, 227 Skript-Tests, 272 Web-Tests (vorher 261), `lint:all`, `validate:data` grün.
- Review (Architektur, Code, Security; STORY-03 Code): zwei hohe, fünf mittlere, neun niedrige Befunde; zwei hohe und die Spezifikationsfehler umgesetzt, Rest zurückgestellt.

## Abweichungen
- Idee erweitert um die Finissage nach dem Intake (Rückmeldung 2026-10-30); dadurch STORY-03, Schemaänderung (additiv) und Webänderung, die der erste Schnitt ausgeschlossen hatte.
- Alle drei Stories gemeinsam an H2.
- Das Compliance-Review war nicht verfügbar (`gbos-mcp`); Reviewer führten weder Tests noch Build aus; parallele Reviews überschrieben `README.md` und `CHANGELOG.md` im Review-Ordner, die zusammengeführt wurden.
- **Nicht geprüft:** Die Extraktion durch das Modell (Qualität von `description`, Anwesenheit der Künstler:innen); Sichtprüfung der Eventliste im Browser; Zeitformate wie „halb sieben“; Kalender zeigt den Event-Typ nicht (CAL-UB-7). Karma lief über `CHROME_BIN`.
- `data/` blieb unverändert: „Between“ ist noch nicht als Vernissage erfasst.

## Rückläufe
Ein automatischer Review-Rücklauf (von höchstens zwei): Datum und Uhrzeit belegen (EARS OPN-UN-1/OPN-UN-2, Gherkin, Quality Q-DATA-12) sowie Korrektur von `datenmodell.md` und `events.feature`. Keine Rückläufe aus H2.

## Erkenntnisse
- Die Frage „besseres Abrufwerkzeug?“ war der falsche Hebel: Das Snapshot-Verfahren lieferte den Termin schon; es fehlte ein Extraktionsziel und eine Sicht darauf, was ungenutzt in den Snapshots steht.
- Ein Beleg „Stichwort und irgendein Datum“ ist kein Beleg; die Prüfung muss den vorgeschlagenen Wert im Auszug wiederfinden (ADR-007).
- Punktdaten wie `7.11.` sehen wie Uhrzeiten aus; Datumsangaben müssen vor der Uhrzeitsuche entfernt werden.

## Follow-ups / empfohlene Tickets
1. `/update-venue-data --venue zander-galerie-koeln --offline` ausführen und die Vernissage zu „Between“ freigeben; danach die weiteren zehn Quellen mit „zu prüfen“ durchgehen.
2. Entscheidung zu ADR-010: Dürfen Veranstalter-Websites Events vorschlagen? Bis dahin bleiben ihre Hinweise im Bericht „zu prüfen“ (Review-Task STORY-01 TASK-09).
3. Zurückgestellte Review-Tasks: Seitentext als Daten kennzeichnen und `description` prüfen (Security, niedrig), Dubletten nach Typ, Terminart bündeln, Prüfkette strukturieren, Testfixtures und Typliste (`review/`).
4. Strukturiertes Feld für Uhrzeiten (`startTime`) und Anzeige in Liste und Kalender als eigene Idee.
5. Magazin-Beiträge zur Finissage (Anlass) als eigene Idee.
