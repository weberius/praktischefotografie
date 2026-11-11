# ADR-027: Uhrzeit und Zeitzone als optionale Eventfelder, ICS mit TZID und UTC-Rückfall

**Status:** Accepted (an H2 am 2026-11-11 bestätigt)  ·  **Datum:** 2026-11-11

## Kontext
Events führen nur `startDate` und `endDate`. Uhrzeiten stehen im Freitext `description`; der Kalender-Export (ADR-018) schreibt deshalb ganztägige Termine und nennt `startTime`/`endTime` mit `VTIMEZONE` ausdrücklich als Folgevorhaben. Die Recherche soll Start- und Endzeit erfassen, fehlt das Ende, gilt für den Export eine Dauer von 2 Stunden. Die Zeitzone soll zunächst `Europe/Berlin` sein, aber berücksichtigt werden können. Die Webanwendung ist eine statische SPA ohne Backend (ADR-002); `research-events` schlägt bisher nur neue Events vor (ADR-026).

## Entscheidung
- **Drei optionale Felder** in `schema/events.schema.json`: `startTime` (Beginn am `startDate`) und `endTime` (Ende am `endDate`) als lokale Uhrzeit `HH:MM`, 24 Stunden; `timeZone` als IANA-Name. `startDate`/`endDate` bleiben reine Daten, bestehende Events bleiben gültig.
- **Ortszeit, Standardzone `Europe/Berlin`.** Fehlt `timeZone`, gilt `Europe/Berlin`; die Recherche setzt das Feld nur bei belegter Abweichung. Anzeige in Ortszeit des Events, unabhängig vom Standort der Besucher:innen.
- **Annahmen werden nicht gespeichert.** Die 2-Stunden-Dauer wird nur im Export berechnet; so bleibt unterscheidbar, was belegt und was angenommen ist. Ohne `startTime` und bei mehrtägigen Events ohne `endTime` bleibt der Termin ganztägig (ADR-018), es wird keine Zeit geraten.
- **Validierung** im Validator (nicht im Schema allein): `endTime`/`timeZone` nur mit `startTime`, bei eintägigen Events `endTime` nach `startTime`, `timeZone` ein gültiger IANA-Name (Prüfung per `Intl.DateTimeFormat` ohne Netz). Das Schema prüft das Format `HH:MM`.
- **ICS:** Für `Europe/Berlin` `DTSTART;TZID=Europe/Berlin` / `DTEND;TZID=Europe/Berlin` mit eingebautem `VTIMEZONE`-Block (Normalzeit +0100, Sommerzeit +0200, Umstellung am letzten Sonntag im März bzw. Oktober). Für jede andere Zone werden Beginn und Ende per `Intl` in UTC umgerechnet und als `…Z` geschrieben, ohne `VTIMEZONE`. Damit ist jede gültige Zone korrekt, ohne eine Zeitzonendatenbank zu bündeln; die Kalender-App zeigt die Zeit in der Zone des Geräts.
- **Recherche:** Zeitfelder nur mit wörtlicher Fundstelle (Beginnzeit der Veranstaltung selbst, nicht Einlass oder Einführung). `research-events` erhält neben `op: "add"` die Operation `op: "update"`, die ausschließlich fehlende Zeitfelder eines Bestandsevents (Ort, Titel, `startDate`) ergänzt und nie überschreibt. `update-venue-data` trägt bei neuen Terminevents zusätzlich `startTime`/`endTime` ein; `description` bleibt unverändert.
- **Anzeige:** „16:00–18:00 Uhr“ / „ab 16:00 Uhr“; mehrtägig Liste und Agenda ohne Uhrzeit, Detail „Start …“/„Ende …“; Agenda sortiert bei gleichem Beginndatum nach `startTime`, ohne Zeit zuerst.

## Alternativen
- **`startDate`/`endDate` zu ISO-Datetime erweitern:** Bricht Schema, Bestand und jeden Datumsvergleich (Beendet, Agenda, ICS); Zeit wäre nicht optional.
- **Zeit im Freitext lassen und beim Export parsen:** Fehleranfällig (ADR-018 verwarf das bereits).
- **Dauer speichern (`durationMinutes`) oder 2 Stunden als `endTime` eintragen:** Vermischt Beleg und Annahme; der Bestand wäre nicht mehr prüfbar.
- **Immer UTC im ICS:** Einfach und korrekt, aber der Eintrag trägt keine Ortszeit; Wiederholungen oder Änderungen der Sommerzeit-Regeln wären für Kalender-Apps unsichtbar. Für Berlin gewünscht ist `TZID`.
- **`VTIMEZONE` für alle Zonen aus einer Bibliothek:** Bundle wächst (Q-PERF-4), neue Abhängigkeit; nur Berlin wird heute gebraucht.
- **Zeitzone aus dem Ort (`city`) ableiten:** Verdeckt Ausnahmen; ein optionales Feld ist expliziter.

## Konsequenzen
- Schema, Webmodell (`models.ts`), Validator, Vorschlagsprüfung (`op: "update"`), beide Skills, ICS-Funktion, Liste, Detailseite und Agenda sind betroffen; bestehende Events und Szenarien bleiben gültig.
- ADR-018 gilt weiter für Events ohne `startTime`; sein Hinweis „Uhrzeit nur in der Beschreibung“ entfällt für Events mit Zeitfeldern.
- Der Zeitzonenblock ist fest; neue Regeln für die Sommerzeit der EU würden eine Anpassung nötig machen (gering).
- Der UTC-Rückfall ist für fremde Zonen weniger „schön“, aber korrekt; er ist in Handproben zu prüfen (Q-IOP-2).
- Die Nachrecherche des Bestands ist ein eigener Lauf mit Freigabe nach der Umsetzung.

## Auswirkungen
- EARS: DAT-UB-9, DAT-UB-10, VAL-UN-6 bis VAL-UN-8, VRS-UB-8 bis VRS-UB-10, VRS-EV-3, VRS-UN-3, OPN-UB-9, OPN-UN-3, ICS-UB-8 bis ICS-UB-10, ICS-UN-2, EVT-UB-7, EVT-UB-8, CAL-UB-8, CAL-UB-9
- Features: `content/daten.feature`, `setup/datenvalidierung.feature`, `setup/veranstaltungen-recherche.feature`, `setup/eroeffnungstermine.feature`, `web/kalender-export.feature`, `web/events.feature`, `web/kalender.feature`
- Quality: Q-DATA-19, Q-DATA-20, Q-IOP-2, Q-USE-21
- Bezüge: ADR-001 (Schema), ADR-002 (statische SPA), ADR-007 (Vorschläge mit Freigabe), ADR-018 (ergänzt: ganztägiger Termin nur noch ohne `startTime`), ADR-026 (erweitert um `op: "update"`)
