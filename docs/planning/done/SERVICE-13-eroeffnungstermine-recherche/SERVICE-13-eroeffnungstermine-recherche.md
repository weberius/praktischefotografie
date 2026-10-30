# SERVICE-13 – Eröffnung und Finissage bei der Recherche erfassen

**Status:** Entwurf (Intake), erweitert um Finissage am 2026-10-30; Freigabe an H1 steht aus  ·  **Quelle:** Idee [`idee-004-recherche`](../../../product/ideen/idee-004-recherche.md)  ·  **Analyse:** [recherche-abruf-und-extraktion](../../../discovery/recherche-abruf-und-extraktion.md)

> „Die Frage ist: Wie erfolgt die Recherche? Es gibt zur Zeit zwei Skills, die im Internet recherchieren: research-photographers, update-venue-date. Mir geht es erstmal um ‚update-venue-date‘. Wenn ich es richtig verstanden habe, fragt Claude die Webseiten ab. Um sich zu erkennen zu geben, wird meine E-Mail Adresse verwendet. Jetzt ist es z.B. bei der Ausstellung ‚Between‘ so, dass sie auf der Webseite von Zander gefunden wurde. Was allerdings nicht gefunden wird, ist, dass Candida Höfer am 07.11.2026 von 16:00 - 18:00 Uhr beim Opening präsent sein wird. Vor diesem Hintergrund frage ich mich, ob die Abfrage überarbeitet wird. Bitte prüfe, ob es besser ist, die Webseite per wget bzw. python in ein temporäres Verzeichnis herunterzuladen, diesen Download nach Aktualisierungen zu untersuchen, die entsprechenden Einträge zu machen und dann die temporären Daten wieder zu löschen.“

**Erweiterung (Rückmeldung 2026-10-30):** „Neben der Ausstellungseröffnung, der Vernissage, ist auch das Ende einer Ausstellung von Bedeutung, die Finissage. Beides muss als Event erkannt und unter Events berücksichtigt werden.“

## Ziel
Die Recherche übernimmt Eröffnungs- und Finissagetermine einer Ausstellung (Datum, Uhrzeit, Anwesenheit der Künstler:innen) als Events (`vernissage`, `finissage`) in die Daten, die Webanwendung zeigt beide unter Events, und der Bericht macht sichtbar, ob Hinweise in den abgerufenen Seiten unbeachtet blieben.

**Zweck in einem Satz:** Besucher:innen sollen Eröffnung und Finissage einer Ausstellung samt Uhrzeit und Anwesenheit der Künstler:innen unter Events finden, wenn die Webseite des Ortes sie nennt.

**Antwort auf die Frage der Idee:** Das vorgeschlagene Vorgehen (herunterladen, auswerten, Einträge machen, Daten löschen) ist bereits der Ablauf aus ADR-006/007 (Snapshots unter `.cache/`). Die Information zu „Between“ stand im Snapshot; die Extraktion hatte kein Ziel dafür. Ein anderes Abrufwerkzeug ändert daran nichts (siehe Analyse). Der Abruf bleibt daher unverändert.

**Erfolgskriterien**
- Für „Between“ liegt nach einem Lauf ein Vernissage-Vorschlag mit 2026-11-07, 16:00 bis 18:00 Uhr und dem Hinweis auf die Anwesenheit der Künstlerin vor.
- Der Bericht nennt je Quelle Zahl der Snapshots mit Eröffnungshinweis und Zahl der daraus entstandenen Vorschläge.
- Der Typ `finissage` ist im Schema gültig und erscheint in der Webanwendung als „Finissage“ in Liste, Detail und Filter.
- Keine Änderung am Abrufdienst.

## Kontext
Skill `update-venue-data` (ADR-006, ADR-007), Events mit `eventType: vernissage` sind im Schema und in der Webanwendung vorgesehen, `data/events.json` enthält keine. Magazin-Anlass `eroeffnung` kennt nur das Datum (NWS-UB-2).

## Story-Schnitt
1. `STORY-01` Eröffnung und Finissage als Event erfassen
2. `STORY-02` Abdeckung der Terminhinweise im Bericht sichtbar machen
3. `STORY-03` Vernissage und Finissage unter Events anzeigen (Datenmodell und Webanwendung)

## Abgrenzung
**Nicht enthalten:** Wechsel des Abrufwerkzeugs (`wget`, Python), mehr Seiten oder Headless-Browser, Löschen der Snapshots nach dem Lauf, ein `startTime`-Feld, Magazin-Beiträge (auch zur Finissage; Anlass `ende` bleibt), der Skill `research-photographers`, weitere Termine außer Eröffnung und Finissage (z. B. Künstlergespräche), Filter oder Hervorhebung außer dem Typ-Filter.

## Betroffene Bereiche
`setup` (Skill `update-venue-data`, Vorschlagsprüfung, Bericht), `content` (Schema `events`), `web` (Events, `models.ts`, Eventliste); Spezifikation `setup/eroeffnungstermine`, `content/datenmodell`, `web/events`.

## Vorbereitete Spezifikation (Phase 3)
- EARS: `setup/eroeffnungstermine.md` (OPN-UB-1 bis OPN-UB-8, OPN-UN-1, OPN-EV-1); `content/datenmodell.md` (DAT-UB-7); `web/events.md` (EVT-UB-5)
- Gherkin: `setup/eroeffnungstermine.feature` (12 Szenarien); `content/daten.feature` (1); `web/events.feature` (2)
- Quality: `setup/eroeffnungstermine.md` (Q-DATA-12, Q-DATA-13); Q-DATA-1, Q-USE-4
- ADR: nicht erforderlich; geltend ADR-001, ADR-002, ADR-006, ADR-007, ADR-010

## Annahmen
- ANNAHME: Ticket-Key `SERVICE-13`, kein Jira-Ticket. Die Idee-Datei war beim Start nicht committet (`??`) und wurde nur im Kopf geändert.
- ANNAHME: „Recherche“ meint den Skill `update-venue-data` (Schreibweise „update-venue-date“ in der Idee); `research-photographers` ist nicht Teil.
- ANNAHME: Die Frage „wget/Python?“ ist mit der Analyse beantwortet (Abruf unverändert); der eigentliche Änderungswunsch ist, dass Eröffnungstermine erfasst werden.
- ANNAHME: Ein Eröffnungstermin wird als Event `eventType: vernissage` erfasst; die Uhrzeit steht in der `description`, weil das Schema nur Datumsfelder kennt.
- ANNAHME: `finissage` wird als neuer Wert in `schema/events.schema.json` ergänzt (Schemaänderung, nur additiv; bestehende Daten bleiben gültig) und in der Webanwendung als „Finissage“ geführt. Eine Finissage wird nur vorgeschlagen, wenn die Seite sie ausdrücklich nennt; das Ausstellungsende allein genügt nicht.
- ANNAHME: Titel der Events „Eröffnung: <Ausstellungstitel>“ bzw. „Finissage: <Ausstellungstitel>“; vorher: Titel des Events „Eröffnung: <Ausstellungstitel>“; Ort und Stadt wie die Ausstellung.
- ANNAHME: Bereits bekannte Ausstellungen werden beim nächsten Lauf ebenfalls auf Eröffnungstermine geprüft, nicht nur neue.
- ANNAHME: Nur Eröffnungen, die heute oder später liegen, werden vorgeschlagen.

## Qualitätserwartungen
Q-DATA-12, Q-DATA-13; zusätzlich Q-DATA-1, Q-DATA-3 (Fundstelle), Q-USE-4, Q-SEC-4 (unverändert).

## Definition of Done
- Spezifikation konsistent; kein neuer ADR nötig (an H2 bestätigt).
- Build, `npm test`, `npm run web:test`, `npm run lint:all` grün; Szenarien aus `eroeffnungstermine.feature`, `daten.feature` und `events.feature` als Tests umgesetzt; `npm run validate:data` grün.

## Risiken
- Seiten nennen Eröffnungen uneinheitlich („Opening“, „Vernissage“, „Eröffnung“); der Stichwort-Zähler findet nicht alle Formulierungen und liefert Fehlalarme.
- Nur bei sieben Quellen gibt es Eröffnungstreffer, Finissagen sind selten angegeben; der Nutzen hängt von deren Pflege ab.
