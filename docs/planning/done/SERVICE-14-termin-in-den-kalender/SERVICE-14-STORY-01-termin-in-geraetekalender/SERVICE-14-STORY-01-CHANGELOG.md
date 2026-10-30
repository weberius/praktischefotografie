# Changelog: SERVICE-14-STORY-01 – Termin eines Events in den Gerätekalender speichern

## 2026-10-30 – REVIEW-TASK-21/22, 11, 03/04, 12, 07: Härtung nach dem Review

- **Status:** Umgesetzt
- **Änderungen:** Steuerzeichen und Zeilenumbrüche in Texten neutralisiert (ICS-UB-7), Termin als „frei“ ohne `METHOD` (ICS-UB-6), Blob-Adresse verzögert freigegeben, Tests und axe-Stichprobe verbessert; Details im Review-Changelog.
- **Quelle:** EARS ICS-UB-6, ICS-UB-7; Gherkin „Frei und ohne Einladung“, „Steuerzeichen im Text“; Quality Q-IOP-1, Q-SEC-6, Q-USE-15; ADR-018
- **Dateien:** siehe `review/CHANGELOG.md`
- **Prüfung:** Gate grün (227 Skript-Tests, 290 Web-Tests, Lint, Validierung); axe 0 Verstöße auf einer Eventseite mit Schaltfläche.

## 2026-10-30 – TASK-02: Schaltfläche und Download auf der Eventdetailseite

- **Status:** Umgesetzt
- **Änderungen:** `/events/:id` zeigt für nicht beendete Events die Schaltfläche „Termin in Geräte-Kalender speichern“ mit sichtbarem Hinweistext (`aria-describedby`); der Klick baut die Datei, bietet sie per `Blob` und `<a download>` als `<event-id>.ics` an und gibt die Blob-Adresse wieder frei. Die absolute Adresse der Detailseite bildet sich aus `document.baseURI` (berücksichtigt das Base-Href von GitHub Pages).
- **Dateien:** `web/src/app/pages/event-detail/event-detail.ts`, `.html`, `.css`, `.spec.ts`
- **Prüfung:** Tests zu „Schaltfläche auf der Eventdetailseite“, „Download der Kalenderdatei“ (Blob-Typ, Dateiname, Inhalt, kein `fetch`, kein XHR), „Beendetes Event ohne Schaltfläche“, „Nur auf der Eventdetailseite“ (`/events`, `/calendar`, Ausstellungsdetail). Gate wie unten. `npm run quality` (Browserlauf gegen den Build, enthält eine Eventdetailseite): keine axe-Verstöße, keine fremden Hosts. **Nicht geprüft:** Tastaturbedienung im echten Browser (nur `<button>`-Semantik), Download-Verhalten je Browser, Import in Apple/Google/Outlook, Sichtprüfung des Aussehens.

## 2026-10-30 – TASK-01: Kalenderdatei erzeugen (reine Funktion)

- **Status:** Umgesetzt
- **Änderungen:** Neue reine Funktion `buildEventIcs` in `core/ics.ts`: ganztägiger Eintrag (`DTEND` = `endDate` + 1), `UID` `<id>@zentrum-praktische-fotografie`, Maskierung nach RFC 5545, Zeilenfaltung nach 75 Oktett ohne Zeichen zu trennen, CRLF; Ort aus Name, Straße, PLZ und Stadt, sonst nur die Stadt. Keine neue Abhängigkeit.
- **Dateien:** `web/src/app/core/ics.ts`, `web/src/app/core/ics.spec.ts`
- **Prüfung:** 8 Tests (Inhalt, mehrtägig, Monats- und Jahreswechsel, Schaltjahr, stabile Kennung, Maskierung und Faltung mit Umlauten, Zeilenumbruch, Ort unbekannt, ohne Beschreibung), jeweils mit Strukturprüfung (BEGIN/END, CRLF, ≤ 75 Oktett, Pflichtfelder, gültiges UTF-8). Beim Schreiben fiel ein Fehler im Test auf: `'\;'` ist in JavaScript nur `;`; Code und Test wurden auf `'\;'` korrigiert, danach prüft der Test die Maskierung tatsächlich.

## Gate (nach beiden Tasks)
`npm run build`, `npm test` (227, 0 Fehler), `npm run web:test` (284 von 284, vorher 272; Chrome über `CHROME_BIN` aus dem Playwright-Cache), `npm run lint:all`, `npm run validate:data` grün. `npm run quality`: dieselben Befunde wie zuvor (fünf doppelte Magazin-Titel, Lighthouse-Performance `/map` 75 < 90; `/map` wurde nicht verändert, der Wert schwankt, zuvor 82).
