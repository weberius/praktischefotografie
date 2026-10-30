# Closure: SERVICE-14 – Termin in den Gerätekalender übernehmen

**Datum:** 2026-10-30  ·  **Quelle:** Idee `docs/product/ideen/idee-005-termin-uebernehmen.md`

## Erreichtes
- Auf `/events/:id` nicht beendeter Events gibt es die Schaltfläche „Termin in Geräte-Kalender speichern“ mit sichtbarem Hinweistext (Abgrenzung zum Kalender der Webseite, Lehre aus Klangland US-026). Ein Klick erzeugt `<event-id>.ics` im Browser, ohne Netzanfrage und ohne neue Bibliothek.
- Die Datei enthält Titel, Zeitraum als ganztägigen Eintrag (Ende zählt mit), Ort mit Adresse, Typ und Beschreibung, Link auf die Detailseite, stabile `UID`, `TRANSP:TRANSPARENT`, kein `METHOD`/`ORGANIZER`; Texte sind maskiert, Zeilenumbrüche und Steuerzeichen neutralisiert, Zeilen nach 75 Oktett gefaltet.
- Spezifikation: ICS-UB-1 bis ICS-UB-7, ICS-EV-1, ICS-ST-1, ICS-UN-1; Gherkin `kalender-export.feature` (11 Szenarien); Q-USE-15, Q-IOP-1, Q-SEC-6; ADR-018 (`Accepted`).
- Prüfung: Build, 227 Skript-Tests, 290 Web-Tests (vorher 272), `lint:all`, `validate:data` grün; axe 0 Verstöße auf einer Eventseite mit Schaltfläche.
- Review (Architektur, Code, Security): kein Befund kritisch oder hoch; sechs mittlere, acht niedrige; sieben Tasks umgesetzt (Steuerzeichen, Tests, `METHOD`/`TRANSP`, Blob-URL, axe-Stichprobe), Rest zurückgestellt.

## Abweichungen
- Der Eintrag ist ganztägig, weil Events keine Uhrzeit führen; bei Vernissagen steht die Uhrzeit nur in der Beschreibung.
- Ein Fehler im ersten Test blieb zunächst unbemerkt (`'\;'` ist in JavaScript nur `;`); Code und Test wurden korrigiert, das Review ergänzte Fälle, die solche Fehler fangen.
- Compliance-Review nicht verfügbar (`gbos-mcp`); die Reviews führten Build, Tests und Lint nicht aus (außer dem Code-Review mit den beiden Spezifikationsdateien); parallele Reviews schrieben diesmal in getrennte Dateien, README und Changelog schrieb der Aufrufer.
- **Nicht geprüft:** Import in Apple Kalender, Google Kalender und Outlook; Download-Verhalten je Browser (iOS Safari, Android); Tastaturbedienung im echten Browser; Aussehen (keine Sichtprüfung); Wirkung der verzögerten Blob-Freigabe auf iOS (Annahme).
- `npm run quality`: fünf doppelte Magazin-Titel wie zuvor; Lighthouse-Performance zeigte im letzten Lauf `/` 77, `/map` 59 und `/venues/fotografie-forum-monschau` 79 (< 90). Diese Seiten wurden nicht geändert, die Werte streuen mit der Rechnerauslastung (`/map` früher 82 und 75); ob die neue Funktion messbar beiträgt, ist nicht abschließend geklärt.

## Rückläufe
Ein automatischer Review-Rücklauf (von höchstens zwei): Steuerzeichen (EARS ICS-UB-7), `METHOD`/`TRANSP` (ICS-UB-6, ADR-018 ergänzt), Prüfverfahren in Q-IOP-1 und Q-USE-15. Keine Rückläufe aus H2.

## Erkenntnisse
- Ein Test, der mit denselben Ersetzungen erwartet wie der Code, fängt Fehler in diesen Ersetzungen nicht; Erwartungen müssen ausgeschrieben sein.
- Daten aus KI-Extraktion gelangen in Dateiformate mit Zeilenstruktur (iCalendar); Zeilenumbrüche jeder Art und Steuerzeichen müssen dort neutralisiert werden, nicht nur `\n`.
- Ein ganztägiger Termin ohne `TRANSP:TRANSPARENT` markiert den Tag im Kalender als belegt.
- Die axe-Stichprobe musste eine Seite mit der Schaltfläche enthalten, sonst bleibt Q-USE-15 ungeprüft.

## Follow-ups / empfohlene Tickets
1. Handprobe: `.ics` in Apple Kalender (iOS/macOS) und Google Kalender importieren und auf iOS Safari den Download prüfen.
2. Uhrzeitfelder (`startTime`/`endTime`) im Schema und zeitgebundene Kalendereinträge (ersetzt ICS-UB-2); bis dahin steht die Uhrzeit nur in der Beschreibung.
3. Zurückgestellte Review-Tasks: Mapping nach `core` auslagern (lohnt bei einem zweiten Export), Basis-URL als Konstante, Eingabevalidierung, Download-Hilfsfunktion (`review/`).
4. Lighthouse-Performance auf `/`, `/map` und Ortsseiten (< 90) mit ruhigem Rechner nachmessen; Ursache klären.
5. Doppelte Magazin-Titel (Q-SEO-2).
