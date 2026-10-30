# Changelog: SERVICE-14 Review

## 2026-10-30 – Abnahme (zweite H2-Runde) und Umsetzung

- **Status:** Umgesetzt
- **Abnahme:** „Empfehlung“: TASK-21/22, TASK-11, TASK-03/04, TASK-12 (deckt TASK-05), TASK-07. Übrige zurückgestellt (Triage in `PIPELINE.md`).
- **Quelle (Ursachen-Routing):** EARS neu ICS-UB-6 (frei, ohne Einladung) und ICS-UB-7 (Steuerzeichen); Gherkin „Frei und ohne Einladung“, „Steuerzeichen im Text“; Quality Q-IOP-1 (≥ 9 Fixtures), Q-SEC-6 (keine Einschleusung), Q-USE-15 (Prüfverfahren); ADR-018 ergänzt (kein `METHOD`/`ORGANIZER`/`SEQUENCE`, `TRANSP:TRANSPARENT`, Texte neutralisieren, Blob-URL verzögert freigeben). Danach Code.
- **Änderungen:**
  - `ics.ts`: jede Art von Zeilenumbruch (CR, LF, CRLF, U+0085, U+2028, U+2029) wird `\n` maskiert, übrige Steuerzeichen außer Tab werden zu Leerzeichen; `METHOD:PUBLISH` entfällt, `TRANSP:TRANSPARENT` kommt hinzu.
  - `event-detail.ts`: Blob-Adresse wird erst nach 10 Sekunden freigegeben.
  - Tests: Strukturprüfung ohne die wirkungslose UTF-8-Prüfung, stattdessen Prüfung auf halbe Zeichen, Steuerzeichen und fehlende `METHOD`/`ORGANIZER`; neue Fälle: Steuerzeichen und eingeschleuste Zeilen, 75-Oktett-Grenze (exakt, darüber, Mehrbyte am Rand), Zeichen außerhalb der BMP, sehr langer Titel, doppelte Maskierung; Download-Test mit `jasmine.clock`.
  - `browser-check.mjs`: axe-Stichprobe enthält zusätzlich die erste Eventseite eines noch nicht beendeten Events (dort gibt es die Schaltfläche).
- **Dateien:** `web/src/app/core/ics.ts`, `ics.spec.ts`, `web/src/app/pages/event-detail/event-detail.ts`, `event-detail.spec.ts`, `web/tools/quality/browser-check.mjs`, `docs/ears/web/kalender-export.md`, `docs/contracts/gherkin/web/kalender-export.feature`, `docs/quality/web/kalender-export.md`, `docs/architecture/ADR-018-ics-im-browser-erzeugen.md`
- **Prüfung:** Gate: `npm run build`, `npm test` (227, 0 Fehler), `npm run web:test` (290 von 290, vorher 284), `npm run lint:all`, `npm run validate:data` grün. `npm run quality`: axe 0 Verstöße auf `/events/between-2026-eroeffnung` (mit Schaltfläche), keine fremden Hosts. Lighthouse-Performance in diesem Lauf `/` 77, `/map` 59, `/venues/fotografie-forum-monschau` 79 (< 90, Q-PERF-3); gleiche Seiten lagen im Lauf davor bei `/map` 75 und `/venues/…` über 90 (0 Befunde), früher `/map` 82. Diese Seiten wurden nicht geändert; die Werte streuen stark mit der Auslastung des Rechners. Nicht abschließend geklärt. **Nicht geprüft:** Verhalten der verzögerten Freigabe auf iOS Safari und Android (Annahme), Import in Kalender-Apps, wie tolerante Parser ein einzelnes CR behandeln hätten (die Maskierung macht die Frage gegenstandslos).
