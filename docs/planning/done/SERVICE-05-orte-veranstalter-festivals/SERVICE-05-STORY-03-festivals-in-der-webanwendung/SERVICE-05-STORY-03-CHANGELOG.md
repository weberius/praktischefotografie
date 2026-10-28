# Changelog: SERVICE-05-STORY-03 – Festivals in der Webanwendung

## 2026-10-28 – TASK-04: Testdaten und Bestandstests

- **Status:** Umgesetzt
- **Änderungen:** Testdaten um Festivals (drei) und Partnerkennzeichnung erweitert; bestehende Tests an die neue Bedeutung von `festivalId` angepasst.
- **Dateien:** `web/src/app/testing/test-data.ts`, mehrere `*.spec.ts`
- **Prüfung:** `npm run web:test` 170 von 170 grün (mit `CHROME_BIN`), `npm run web:lint` grün.

## 2026-10-28 – TASK-03: Veranstalter- und Ausstellungsseite anpassen

- **Status:** Umgesetzt
- **Änderungen:** Veranstalterseite: Festivals, Ausstellungen über Festivals, Beschreibung, Instagram-Link. Ausstellungsseite: Festival mit Link, Veranstalter über das Festival, Text „Offizieller Partner“.
- **Dateien:** `web/src/app/pages/organizer-detail/*`, `web/src/app/pages/exhibition-detail/*`
- **Prüfung:** Karma-Tests grün.

## 2026-10-28 – TASK-02: Festivalübersicht, Festivalseite, Navigation und Prerender

- **Status:** Umgesetzt
- **Änderungen:** Seiten `/festivals` und `/festivals/:id`, Routen, Prerender-Parameter, Navigationspunkt „Festivals“, Browserprüfung um die Adressen ergänzt.
- **Dateien:** `web/src/app/pages/festival-list/*`, `web/src/app/pages/festival-detail/*`, `web/src/app/app.routes*.ts`, `web/src/app/app.ts`, `web/tools/quality/browser-check.mjs`
- **Prüfung:** Karma-Tests grün; `npm run build` prerendert `/festivals` und `/festivals/photoszene-festival-2027` (Sitemap 99 Adressen). **Nicht geprüft:** Aussehen im Browser, axe- und Lighthouse-Läufe (`tools/quality`).

## 2026-10-28 – TASK-01: Modelle, Daten und Filter

- **Status:** Umgesetzt
- **Änderungen:** `Festival` im Modell, Datei `festivals` im `DataService`; Filter `festival` und `organizer` (jetzt über Festivals) in Karte und Ortsverzeichnis mit Hinweis bei unbekanntem Festival.
- **Dateien:** `web/src/app/core/*.ts`, `web/src/app/pages/map/*`, `web/src/app/pages/venue-list/*`
- **Prüfung:** Karma-Tests grün.
