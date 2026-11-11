# SERVICE-26 – Events mit Start- und Endzeit

**Status:** Entwurf (Intake)  ·  **Quelle:** Idee [`idee-017-events-from-to`](../../../product/ideen/idee-017-events-from-to.md)

> „Die Events werden zur Zeit nur mit dem Datum gespeichert. Es steht aber meistens mindestens auch der Start-Zeitpunkt zur Verfügung. Dieser soll mit recherchiert und gespeichert werden. Sofern auch eine End-Zeitpunkt genannt wird, soll dieser recherchiert und gespeichert werden. Steht dieser End-Zeitpunkt nicht zur Verfügung, wird eine Dauer von 2 Stunden angenommen.
> Die Events erlauben es einen Termin im Geräte-Kalender zu speichern. Die zusätzlichen Informationen sollen dafür genutzt werden, damit der Termin auch mit der hinterlegten Uhrzeit gespeichert wird.“

Die Ausgestaltung wurde zuvor im Chat geschärft (Grilling, 14 Entscheidungen); sie ist in den Abschnitten unten festgehalten.

## Ziel
Events führen optional eine Startzeit, eine Endzeit und eine Zeitzone. Die Recherche erfasst sie mit Fundstelle, die Webanwendung zeigt sie an, und der Gerätekalender-Export speichert den Termin mit Uhrzeit.

**Zweck in einem Satz:** Besucher:innen sehen, wann ein Event beginnt, und übernehmen den Termin mit der richtigen Uhrzeit in ihren Kalender, statt die Zeit aus dem Beschreibungstext zu lesen.

**Erfolgskriterien**
- `data/events.json` kennt optional `startTime`, `endTime` und `timeZone`; bestehende Events bleiben gültig.
- Die Recherche (`research-events`, Eröffnungstermine in `update-venue-data`) übernimmt Zeiten nur mit wörtlicher Fundstelle.
- Der Kalender-Export schreibt Events mit Startzeit als zeitgebundenen Termin; ohne Endzeit wird eine Dauer von 2 Stunden angenommen, nur im Export.
- Liste, Detailseite und Agenda zeigen die Uhrzeit.

## Kontext
Heute führen Events nur `startDate`/`endDate` (`schema/events.schema.json`). Uhrzeiten stehen als Freitext in `description` (z. B. „von 16:00 bis 18:00 Uhr“; OPN-UB-2). ADR-018 erzeugt deshalb ganztägige Termine und nennt `startTime`/`endTime` mit `VTIMEZONE` ausdrücklich als Folgevorhaben. `research-events` (ADR-026) schlägt nur neue Events (`op: "add"`) vor.

## Entscheidungen aus dem Grilling
1. Neue optionale Felder `startTime` und `endTime` (`HH:MM`, 24 h) neben `startDate`/`endDate`.
2. Optionales `timeZone` (IANA-Name); fehlt es, gilt `Europe/Berlin`. Die Recherche setzt es nur, wenn der Ort abweicht.
3. Die 2-Stunden-Annahme wird nicht gespeichert, sondern erst beim Export berechnet.
4. Ohne `startTime` bleibt der Termin ganztägig; es wird nie eine Zeit geraten.
5. Mehrtägige Events: `startTime` am Starttag, `endTime` am Endtag; ohne `endTime` bleibt der Termin ganztägig (keine 2 Stunden).
6. Zeiten nur mit wörtlicher Fundstelle; bei mehreren Zeiten zählt die Beginnzeit des Events.
7. ICS: `DTSTART;TZID=…` und `DTEND;TZID=…` mit `VTIMEZONE`.
8. Bestandsevents werden nachrecherchiert: Skill-Erweiterung im Ticket (nur Zeitfelder ergänzen, nie überschreiben), der Lauf selbst folgt danach als eigener Schritt mit Freigabe.
9. Anzeige „16:00–18:00 Uhr“ bzw. „ab 16:00 Uhr“ in Liste, Detail und Agenda; mehrtägige Events zeigen in der Liste keine Uhrzeit, in der Detailansicht „Start …“ und „Ende …“.
10. Agenda sortiert bei gleichem Beginn nach Startzeit, Einträge ohne Zeit zuerst.
11. Validierung: `HH:MM`, `endTime` nur mit `startTime`, bei eintägigen Events `endTime` nach `startTime`, `timeZone` ein gültiger IANA-Name.

## Story-Schnitt
1. `STORY-01` Uhrzeiten erfassen, prüfen und recherchieren
2. `STORY-02` Termin mit Uhrzeit im Gerätekalender speichern
3. `STORY-03` Uhrzeiten in Liste, Detailseite und Agenda sehen

## Abgrenzung
**Nicht enthalten:** die Nachrecherche des Bestands selbst (Folgeschritt nach der Umsetzung, mit Freigabe); Uhrzeiten für Ausstellungen, Festivals und Veranstalter; Öffnungszeiten der Orte; mehrere Termine oder Zeitfenster je Event; Umstellung der Zeitzone nach Besucherstandort (Anzeige bleibt Ortszeit des Events); Erinnerungen (`VALARM`); Migration von Uhrzeiten aus `description` (Text bleibt unverändert).

## Betroffene Bereiche
`content` (Schema, Datenmodell), `setup` (Validator, Vorschlagsprüfung, Skills `research-events` und `update-venue-data`), `web` (Modell, ICS, Liste, Detail, Agenda). Spezifikation: `content/datenmodell`, `setup/datenvalidierung`, `setup/veranstaltungen-recherche`, `setup/eroeffnungstermine`, `web/kalender-export`, `web/events`, `web/kalender`; ADR-027 (Proposed).

## Vorbereitete Spezifikation (Phase 3)
- EARS: `content/datenmodell.md` (DAT-UB-9, DAT-UB-10); `setup/datenvalidierung.md` (VAL-UN-6 bis VAL-UN-8); `setup/veranstaltungen-recherche.md` (VRS-UB-8, VRS-UB-9, VRS-UB-10 ersetzt VRS-UB-2, VRS-EV-3, VRS-UN-3); `setup/eroeffnungstermine.md` (OPN-UB-9, OPN-UN-3); `web/kalender-export.md` (ICS-UB-8 bis ICS-UB-10, ICS-UN-2; ICS-UB-2 eingeschränkt); `web/events.md` (EVT-UB-7, EVT-UB-8); `web/kalender.md` (CAL-UB-8, CAL-UB-9)
- Gherkin: `content/daten.feature`, `setup/datenvalidierung.feature`, `setup/veranstaltungen-recherche.feature`, `setup/eroeffnungstermine.feature`, `web/kalender-export.feature`, `web/events.feature`, `web/kalender.feature`
- Quality: Q-DATA-19, Q-DATA-20, Q-IOP-2, Q-USE-21
- ADR: ADR-027 (Proposed); geltend ADR-001, ADR-002, ADR-006, ADR-007, ADR-018, ADR-026

## Annahmen
- ANNAHME: Ticket-Key `SERVICE-26`. Die Idee trägt im Dateikopf noch `SERVICE-25` (Vorlagenrest; `SERVICE-25` ist die erledigte Projektseite); nächste freie Nummer ist 26.
- ANNAHME: Andere Zeitzonen als `Europe/Berlin` werden im ICS als UTC-Zeit (`DTSTART:…Z`, per `Intl` aus Ortszeit und Zone berechnet) geschrieben; nur `Europe/Berlin` hat einen eingebauten `VTIMEZONE`-Block. Das erfüllt „Zeitzone berücksichtigen“, ohne eine Zeitzonendatenbank zu bündeln (Q-PERF-4); ADR-027.
- ANNAHME: Liegt `startTime` + 2 h nach Mitternacht, endet der Termin am Folgetag (nur beim Export berechnet).
- ANNAHME: Mehrtägiges Event mit `startTime`, aber ohne `endTime`, wird im Export ganztägig (Startzeit entfällt), nicht mit künstlichem Ende.
- ANNAHME: `research-events` ergänzt Bestandsevents aller Typen (auch Vernissage/Finissage) mit `op: "update"`, beschränkt auf die drei Zeitfelder und nur, wo sie fehlen; `update-venue-data` (OPN) trägt bei neuen Terminevents zusätzlich `startTime`/`endTime` ein. `description` bleibt unverändert (OPN-UB-2 gilt weiter).
- ANNAHME: Die Agenda (`/calendar`) ist eine Liste, keine Monatsrasterdarstellung; „Monatsansicht“ meint `/calendar/:year/:month`. Beide zeigen die Uhrzeit im Eintrag.
- ANNAHME: Weicht `timeZone` von `Europe/Berlin` ab, steht der Zonenname hinter der Uhrzeit („16:00–18:00 Uhr (Europe/London)“).
- ANNAHME: Der Typ `fair_and_convention` mit mehreren Tagen folgt der Mehrtagsregel; eine Uhrzeit wird nur erfasst, wenn die Quelle eine Beginn- bzw. Endzeit für Start- bzw. Endtag nennt.

## Qualitätserwartungen
Q-DATA-19, Q-DATA-20, Q-IOP-2, Q-USE-21; weiter Q-IOP-1, Q-SEC-6, Q-DATA-3, Q-DATA-17, Q-PERF-4.

## Definition of Done
- Spezifikation konsistent; ADR-027 an H2 bestätigt.
- Build, `npm test`, `npm run web:test` und `npm run lint:all` grün; Szenarien als Tests umgesetzt.
- `README.md`, `data/README.md`, `updates/README.md` und beide Skills beschreiben die Zeitfelder.
- Folgeschritt (nicht Teil der Tasks): Nachrecherche des Bestands per `/research-events` mit Freigabe.

## Risiken
- Falsch gelesene Zeiten (12-/24-Stunden-Angaben, „4-6pm“, mehrere Zeiten je Seite); Gegenmaßnahme: wörtliche Fundstelle, Prüfung im Skript, Freigabe.
- Sommer-/Winterzeit-Übergänge und Termine über Mitternacht im ICS.
- Zeiten ohne Beleg auf dynamischen Seiten bleiben leer; das Event bleibt dann ganztägig.
- Layout der Liste und der Agenda bei zusätzlicher Zeile.
