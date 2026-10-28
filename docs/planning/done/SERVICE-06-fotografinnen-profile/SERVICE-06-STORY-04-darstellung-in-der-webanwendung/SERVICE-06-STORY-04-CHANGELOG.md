# Changelog: SERVICE-06-STORY-04 – Darstellung in der Webanwendung

## 2026-10-28 – TASK-03: Personenseite nach klangland

- **Status:** Umgesetzt
- **Änderungen:** Zurück-Link, Kopf mit Berufsbezeichnung und Lebensdaten, Portrait mit Bildnachweis (Urheber, Lizenz, Commons-Link), „Aus der Wikipedia“ mit Quellenlinks je Sprache und CC-BY-SA-Hinweis, „Ausstellungen (n)“; Portrait-Fehler blendet Bild und Nachweis aus.
- **Dateien:** `web/src/app/pages/photographer-detail/*`
- **Prüfung:** Karma-Tests grün, `ng lint` grün, Build prerendert 159 Adressen.

## 2026-10-28 – TASK-02: Liste als Karten

- **Status:** Umgesetzt
- **Änderungen:** Karten mit Portrait (lazy, Maße, Alternativtext), Berufsbezeichnung, Lebensdaten.
- **Dateien:** `web/src/app/pages/photographer-list/*`
- **Prüfung:** Karma-Tests grün.

## 2026-10-28 – TASK-01: Modelle, Hilfsfunktionen und Testdaten

- **Status:** Umgesetzt
- **Änderungen:** `Photographer`-Modell, `photographer-profile.ts`, Testdaten.
- **Dateien:** `web/src/app/core/*`, `web/src/app/testing/test-data.ts`
- **Prüfung:** Karma-Tests grün (178 von 178). **Nicht geprüft:** Aussehen im Browser, axe- und Lighthouse-Läufe.
