# SERVICE-04-STORY-01 – Magazin-Neuigkeiten bei der Datenpflege

**Als** Redakteur:in **möchte ich** bei jeder Pflege der Kalenderdaten (`/update-venue-data`) automatisch Neuigkeiten für das Magazin erhalten **damit** Besucher:innen über neue, eröffnende und bald endende Ausstellungen informiert werden, ohne dass ich dafür einen weiteren Schritt aufrufen muss.

## Anlässe für Neuigkeiten
1. **Neue Ausstellung gefunden:** Die Datenpflege hat die Ausstellung neu aufgenommen.
2. **Eröffnung:** Am Tag der Ausstellungseröffnung (Beginn = heute) erscheint eine Meldung.
3. **Endet bald:** Eine Ausstellung trägt den Status „Endet bald“.
4. **Ende:** Eine Ausstellung ist zu Ende gegangen.

## Akzeptanzkriterien
1. Ein Aufruf der Datenpflege deckt auch die Magazinpflege ab; es ist kein zusätzliches Kommando nötig.
2. Zu jedem Anlass entsteht höchstens eine Neuigkeit je Ausstellung. Wiederholte Läufe erzeugen keine Dubletten.
3. Jede Neuigkeit hat einen Text von **60 bis 80 Wörtern**. Er geht auf die Ausstellung, die beteiligten Künstler:innen und die Galerie bzw. das Museum ein.
4. Der Text enthält nur Angaben, die in den Daten oder auf den Webseiten der Orte belegt sind. Fehlen Angaben zu Künstler:innen oder Ort, wird nichts erfunden.
5. Die Neuigkeit ist mit der Ausstellung und dem Ort verknüpft und erscheint im Magazin mit dem Datum des Anlasses.
   Beim ersten Lauf werden auch für die vorhandenen Ausstellungen alle Anlässe nachgetragen, auch vergangene.
6. Neuigkeiten erscheinen am Tag ihres Anlasses, auch wenn an diesem Tag kein Lauf stattfindet.
7. Der Bericht der Datenpflege nennt, welche Neuigkeiten entstanden sind.
8. Die Neuigkeiten werden wie die Datenänderungen vor der Übernahme zur Freigabe vorgelegt.

## Abgrenzung
- Keine Änderung an Darstellung und Aufbau des Magazins, soweit nicht für die Verknüpfung nötig.
- Keine Neuigkeiten zu Events, Orten oder Fotograf:innen.

## Abhängigkeiten
SERVICE-02-STORY-02 (Magazin), SERVICE-03-STORY-04 (Update-Skill)

## Entscheidungen an H1
- Beiträge entstehen beim Fund vorab mit Zukunftsdatum: Eröffnung (Beginn), „Endet bald“ (Ende minus 14 Tage), Ende (Enddatum plus 1).
- Für den Bestand werden alle Anlässe nachgetragen, auch vergangene, mit ihrem Datum.
- Die Texte werden im Freigabeschritt des Skills freigegeben.
- Die Story bleibt ungeteilt.

## ANNAHMEN
- ANNAHME: „Neu gefunden“ gilt nur für neu aufgenommene Ausstellungen (Datum = Fundtag); für den Bestand entfällt dieser Anlass.
- ANNAHME: Die Texte werden in einem zweiten Freigabeschritt nach der Übernahme der Ortsdaten gezeigt, weil „neu“ erst nach der Übernahme der Ausstellung planbar ist.
- ANNAHME: Verwaiste Beiträge werden nur gemeldet, nicht gelöscht.
- ANNAHME: Ändern sich Termine einer Ausstellung, werden die zugehörigen Beiträge beim nächsten Lauf angepasst (mit Freigabe).

## Spezifikation (Phase 3)
- EARS: NWS-UB-1 bis NWS-UB-6, NWS-EV-1 bis NWS-EV-3, NWS-UN-1 bis NWS-UN-3, NWS-OP-1, SKL-UB-4, SKL-UB-5
- Gherkin: `setup/magazin-neuigkeiten.feature`, `setup/update-skill.feature`
- Quality: Q-DATA-4, Q-REL-2, Q-MAIN-3
- ADR: ADR-008 (Proposed)

**INVEST:** I (abhängig) N ✔ V ✔ E ✔ S (grenzwertig, vier Anlässe über einen Mechanismus) T ✔
