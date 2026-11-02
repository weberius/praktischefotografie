# Changelog: SERVICE-18-STORY-01 – Von jeder Detailseite zur vorherigen Seite zurückkehren

## 2026-11-02 – RÜCKLAUF (Review): TASK-01 bis TASK-05

- **Status:** Umgesetzt
- **Änderungen:** `NavHistory` wird beim Anwendungsstart erzeugt (`NAV_HISTORY_INITIALIZER`) und führt den Verlauf als Signals (ARCH-01/CODE-01: erster Zurück-Link zeigte sonst auf die Übersicht). Seitentypen in einer Tabelle (`kind` statt `fallback`), lesbares `targetLabel` mit Segmentvergleich, rechtliche Seiten benannt, eine Verlaufs-Methode, Importreihenfolge angeglichen. Tests klicken den Link und prüfen Zyklus, Wechsel gleicher Seitentypen und die Verdrahtung in `app.config.ts`.
- **Quelle:** Umsetzungsfehler → Task (Spezifikation unverändert: NAV-UB-9, NAV-EV-2, NAV-ST-1 gelten)
- **Dateien:** `core/nav-history.ts`, `app.config.ts`, `shared/back-link/back-link.ts`, `back-link.spec.ts`, `pages/*-detail/*-detail.{html,ts}`
- **Prüfung:** `npm run build`, `npm run web:test` (310), `npm run lint:all` grün. Nicht geprüft: axe-Lauf, Playwright-Tastaturtest, Verhalten im echten Browser.

## 2026-11-02 – TASK-02: Gemeinsamer Zurück-Link auf den sieben Detailseiten

- **Status:** Umgesetzt
- **Änderungen:** Komponente `app-back-link`; Einbau in Beitrags-, Orts-, Personen-, Ausstellungs-, Event-, Festival- und Veranstalter:innenseite; Sonderlink der Personenseite ersetzt (Text jetzt „‹ Zurück zu Fotograf:innen“).
- **Dateien:** `web/src/app/shared/back-link/back-link.ts`, `back-link.spec.ts`, `web/src/app/pages/*-detail/*-detail.{html,ts}`, `photographer-detail.css`
- **Prüfung:** `npm run build` grün; `npm run web:test` grün (307 Tests); `npm run lint:all` grün. Nicht geprüft: axe-Lauf und Playwright-Tastaturtest (Q-USE-16), nicht ausgeführt.

## 2026-11-02 – TASK-01: Anwendungsverlauf

- **Status:** Umgesetzt
- **Änderungen:** Dienst `NavHistory` merkt die vorherige Seite per Router-Ereignis, ohne Speicherung.
- **Dateien:** `web/src/app/core/nav-history.ts`
- **Prüfung:** wie TASK-02. `npm test` (Root): 1 bekannter roter Test „Weiterleitungsdatei wird geprüft (FET-OP-3)“, unabhängig von dieser Änderung (vorher bereits rot).
