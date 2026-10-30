# EARS: Termin in den Gerätekalender übernehmen (Kürzel `ICS`)

**Bereich:** web  ·  **Systemname:** Webanwendung  ·  **Stand:** 2026-10-30

Begriffe: „heute“ ist das aktuelle Datum der Anwendung (in Tests ein fester Referenzwert); „Gerätekalender“ ist die Kalender-App des Smartphones oder Rechners (nicht der Kalender der Webanwendung unter `/calendar`); „Kalenderdatei“ ist eine iCalendar-Datei (`.ics`, RFC 5545) mit genau einem Termin; „beendet“ heißt `endDate` vor heute (EVT-UB-4). Datenfelder siehe `schema/`.

| ID | Anforderung | Gherkin | Quality | ADR |
| --- | --- | --- | --- | --- |
| ICS-UB-1 | Die Webanwendung soll auf `/events/:id` eines nicht beendeten Events eine Schaltfläche „Termin in Geräte-Kalender speichern“ mit einem sichtbaren Hinweistext anbieten, der erklärt, dass eine Kalenderdatei für den Kalender des Smartphones oder Rechners geladen wird und nicht der Kalender dieser Webanwendung gemeint ist. | `web/kalender-export.feature` · „Schaltfläche auf der Eventdetailseite“ | Q-USE-15, Q-USE-3 | ADR-018 |
| ICS-EV-1 | Wenn die Schaltfläche gewählt wird, soll die Webanwendung im Browser eine Kalenderdatei für dieses Event erzeugen und als Download `<event-id>.ics` mit dem Medientyp `text/calendar` anbieten, ohne eine Netzanfrage zu senden. | `web/kalender-export.feature` · „Download der Kalenderdatei“ | Q-SEC-6, Q-IOP-1 | ADR-018 |
| ICS-UB-2 | Die Webanwendung soll in der Kalenderdatei den Titel (`SUMMARY`), den Zeitraum als ganztägigen Eintrag von `startDate` bis `endDate` einschließlich (`DTSTART;VALUE=DATE`, `DTEND;VALUE=DATE` am Folgetag), den Ort (`LOCATION`: Name, Straße, Postleitzahl und Stadt), die Beschreibung (`DESCRIPTION`: Typ, Beschreibung des Events) und die absolute Adresse der Detailseite (`URL`) führen. | `web/kalender-export.feature` · „Inhalt der Kalenderdatei“, „Mehrtägiges Event“ | Q-IOP-1 | ADR-018 |
| ICS-UB-3 | Die Webanwendung soll jedem Termin eine stabile `UID` aus der Event-`id` (`<id>@zentrum-praktische-fotografie`) geben, damit ein erneuter Import den Termin aktualisiert statt zu duplizieren. | `web/kalender-export.feature` · „Stabile Kennung“ | Q-IOP-1 | ADR-018 |
| ICS-UB-4 | Die Webanwendung soll Textwerte der Kalenderdatei nach RFC 5545 maskieren (Backslash, Semikolon, Komma, Zeilenumbruch), Zeilen länger als 75 Oktett falten (ohne Mehrbyte-Zeichen zu trennen) und Zeilen mit CRLF beenden. | `web/kalender-export.feature` · „Maskierung und Faltung“ | Q-IOP-1 | ADR-018 |
| ICS-ST-1 | Solange ein Event beendet ist, soll die Webanwendung keine Schaltfläche zum Speichern im Kalender anzeigen. | `web/kalender-export.feature` · „Beendetes Event ohne Schaltfläche“ | – | ADR-018 |
| ICS-UN-1 | Wenn der Ort eines Events nicht in den Daten gefunden wird, soll die Webanwendung in `LOCATION` nur die Stadt des Events eintragen und die Kalenderdatei trotzdem erzeugen. | `web/kalender-export.feature` · „Ort unbekannt“ | – | ADR-018 |
| ICS-UB-5 | Die Webanwendung soll die Schaltfläche ausschließlich auf `/events/:id` anbieten, nicht in den Listen, der Agenda oder bei Ausstellungen. | `web/kalender-export.feature` · „Nur auf der Eventdetailseite“ | – | ADR-018 |
| ICS-UB-6 | Die Webanwendung soll den Termin in der Kalenderdatei als „frei“ kennzeichnen (`TRANSP:TRANSPARENT`) und weder `METHOD` noch `ORGANIZER` führen, weil die Datei einen Termin zur Übernahme veröffentlicht und keine Einladung ist. | `web/kalender-export.feature` · „Frei und ohne Einladung“ | Q-IOP-1 | ADR-018 |
| ICS-UB-7 | Die Webanwendung soll in Textwerten der Kalenderdatei jede Art von Zeilenumbruch (CR, LF, CRLF, U+0085, U+2028, U+2029) als `\n` maskieren und übrige Steuerzeichen außer Tabulator durch ein Leerzeichen ersetzen, sodass kein Wert die Struktur der Datei verändern kann. | `web/kalender-export.feature` · „Steuerzeichen im Text“ | Q-SEC-6, Q-IOP-1 | ADR-018 |

**Ergänzung 2026-10-30 (Review):** ICS-UB-6 und ICS-UB-7 ergänzen ICS-UB-4; bestehende Anforderungen bleiben gültig.
