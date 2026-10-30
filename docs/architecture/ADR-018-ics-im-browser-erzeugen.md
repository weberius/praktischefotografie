# ADR-018: Kalenderdatei (.ics) im Browser erzeugen, nach dem Muster von Klangland

**Status:** Accepted (an H2 am 2026-10-30 bestätigt)  ·  **Datum:** 2026-10-30

## Kontext
Besucher:innen sollen einen Termin (Event) von seiner Detailseite in den Kalender ihres Geräts übernehmen können. Die Webanwendung ist eine statische Angular-SPA ohne Backend (ADR-002, ADR-003); die Datenschutzerklärung sagt, dass keine Cookies, kein Tracking und keine externen Dienste außer den Kartenkacheln verwendet werden (RCH-UB-3). Klangland (`../klangland`, US-012, US-026) löst dasselbe Problem mit einer im Browser erzeugten `.ics`-Datei. Die Events dieser Anwendung haben nur Datumsfelder (`startDate`, `endDate`), keine Uhrzeiten.

## Entscheidung
- **Kalenderdatei im Browser.** Eine reine, testbare Funktion `buildEventIcs` (ohne Angular- und Browserabhängigkeit, Datei im Ordner `web/src/app/core/`) erzeugt iCalendar nach RFC 5545 für genau ein Event; die Detailseite bietet sie als Download (`Blob`, `text/calendar;charset=utf-8`, Dateiname `<event-id>.ics`) an. Keine Bibliothek, keine Netzanfrage.
- **Ganztägiger Eintrag.** Weil das Datenmodell keine Uhrzeit kennt, ist der Termin ein ganztägiger Eintrag von `startDate` bis `endDate` einschließlich (`DTEND` am Folgetag, `VALUE=DATE`). Uhrzeit und Anwesenheit stehen im Text der Beschreibung (z. B. bei Vernissagen), nicht in `DTSTART`. Kein `VTIMEZONE` nötig.
- **Stabile `UID`** aus der Event-`id` mit festem Namensteil (`<id>@zentrum-praktische-fotografie`), damit ein erneuter Import aktualisiert. `DTSTAMP` mit injizierbarer Zeit für Tests.
- **Beschriftung** „Termin in Geräte-Kalender speichern“ mit sichtbarem Hinweistext, um die Verwechslung mit dem Kalender der Webanwendung (`/calendar`) von Anfang an zu vermeiden (Erfahrung aus Klangland US-026).
- Nur Events (nicht Ausstellungen), nur nicht beendete.

- **Veröffentlichen, nicht einladen** (Ergänzung 2026-10-30, Review): Die Datei enthält weder `METHOD` noch `ORGANIZER` noch `SEQUENCE` (kein Änderungsstand im Datenmodell; der Import über die `UID` aktualisiert den Eintrag), aber `TRANSP:TRANSPARENT`, damit ein ganztägiger Termin den Tag im Kalender nicht als belegt markiert.
- **Texte neutralisieren** (Ergänzung 2026-10-30, Review): Die Daten stammen teils aus KI-extrahierten Webtexten. Jede Art von Zeilenumbruch wird als `\n` maskiert, übrige Steuerzeichen werden zu Leerzeichen, damit kein Wert die Struktur der Datei verändern kann.
- **Blob-URL verzögert freigeben** (Ergänzung 2026-10-30, Review): Die Freigabe läuft erst nach 10 Sekunden, damit der Download auf Browsern, die ihn asynchron starten (vermutet: iOS Safari), nicht abbricht.

## Alternativen
- **Anbieterspezifische Links** („Zu Google/Outlook hinzufügen“): Sie senden Daten an Dritte (Datenschutz), brauchen Plattformerkennung und lösen Apple Kalender nicht.
- **Serverseitiger Kalender-Feed (Abonnement):** Aktualisiert laufend, braucht aber ein Backend (ADR-002) und ist nicht gefragt.
- **Bibliothek (z. B. `ics`):** Spart wenige Zeilen, erhöht Bundle und Abhängigkeiten (Q-PERF-4); die Datei ist klein und gut testbar.
- **Zeitgebundener Eintrag mit Uhrzeit aus der Beschreibung:** Die Uhrzeit müsste aus Freitext gelesen werden (fehleranfällig); ein strukturiertes Feld `startTime` wäre eine Schemaänderung und ist nicht Teil dieses Vorhabens.

## Konsequenzen
- Der Eintrag im Kalender ist ganztägig; wer die Uhrzeit braucht, liest sie in der Beschreibung. Ein Folgevorhaben (`startTime`/`endTime` im Schema, dann `DTSTART` mit Uhrzeit und `VTIMEZONE`) würde ICS-UB-2 ersetzen.
- Keine neue Abhängigkeit, keine Änderung der Datenschutzerklärung nötig (nichts verlässt das Gerät).
- Die Kompatibilität mit echten Kalender-Apps lässt sich nur per Handprobe prüfen; die Tests sichern die Struktur nach RFC 5545.

## Auswirkungen
- EARS: ICS-UB-1 bis ICS-UB-7, ICS-EV-1, ICS-ST-1, ICS-UN-1
- Features: `web/kalender-export.feature`
- Quality: Q-USE-15, Q-IOP-1, Q-SEC-6, Q-USE-3 (Ergänzung)
- Leitplanken: ADR-002 (statische SPA), ADR-003 (Datensync), ADR-017 (Muster Klangland)
