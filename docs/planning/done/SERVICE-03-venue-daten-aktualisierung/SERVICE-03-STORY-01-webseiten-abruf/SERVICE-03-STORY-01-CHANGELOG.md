# Changelog: SERVICE-03-STORY-01 – Webseiten der Orte abrufen

## 2026-10-27 – TASK-03: Snapshots, Cache, Offline und Ausfälle
- **Status:** Umgesetzt
- **Änderungen:** Snapshots mit URL, Zeit, Status, Hash und bereinigtem Text unter `.cache/snapshots/`; Cache nach Alter, Offline-Modus; Zusammenfassung je Ort; Ausfälle stoppen den Lauf nicht, der alte Snapshot bleibt; CLI `fetch-venues.mjs`.
- **Dateien:** `scripts/scrape/lib/snapshots.mjs`, `scripts/scrape/fetch-venues.mjs`, `test/scrape/fetcher.test.mjs`
- **Prüfung:** Node-Tests grün (Szenarien Snapshot, Cache/Offline, Seite nicht erreichbar, Q-REL-1 mit 20 Orten und 5 Ausfällen).

## 2026-10-27 – TASK-02: Abrufdienst mit Höflichkeitsregeln
- **Status:** Umgesetzt
- **Änderungen:** Linkfindung (≤ 5 Unterseiten, gleicher Host), `robots.txt`, Abstand je Host (zählt ab Antwort), Zeitlimit, Größenlimit, keine Weiterleitung auf andere Hosts, nur http/https, Kennung im User-Agent, Start ohne `SCRAPE_CONTACT` verweigert (außer offline). `robots.txt`, die nicht lesbar ist oder 5xx liefert, sperrt den Host für den Lauf.
- **Dateien:** `scripts/scrape/lib/fetcher.mjs`, `scripts/scrape/lib/common.mjs`
- **Prüfung:** Node-Tests mit lokalem Testserver grün (Q-SEC-4, Q-PERF-5 rechnerisch 280 s, Q-MAIN-2 ohne externes Netz). **Nicht geprüft:** Abruf gegen echte Webseiten (benötigt Ihre Kontaktadresse), JavaScript-lastige Seiten.

## 2026-10-27 – TASK-01: Gerüst und Abhängigkeiten
- **Status:** Umgesetzt
- **Änderungen:** `cheerio`, `robots-parser`; `.cache/` in `.gitignore`; Skripte `data:fetch`, `data:check`, `data:apply`, `data:report`.
- **Dateien:** `package.json`, `package-lock.json`, `.gitignore`
- **Prüfung:** `npm install` ohne Schwachstellen; `.cache` wird von Git ignoriert (Test).
