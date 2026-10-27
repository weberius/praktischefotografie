# Changelog: SERVICE-03-STORY-03 – Vorschläge prüfen und freigegeben übernehmen

## 2026-10-27 – TASK-02: Bericht am Laufende
- **Status:** Umgesetzt
- **Änderungen:** `REPORT.md` mit Orten (abgerufen, Cache, fehlgeschlagen, übersprungen), Vorschlägen je Art, Verworfenen, Übernommenen und Konflikten.
- **Dateien:** `scripts/scrape/lib/report.mjs`, `scripts/scrape/report.mjs`
- **Prüfung:** Node-Test grün.

## 2026-10-27 – TASK-01: Übernahme mit Freigabe und Rollback
- **Status:** Umgesetzt
- **Änderungen:** Nur `approved: true`, Quelle und Prüfdatum des Ortes, Status unverändert, Konflikte und veraltete Vorschläge übersprungen, Validierung vor dem Schreiben (sonst nichts geändert), `appliedAt` verhindert doppelte Übernahme; CLI `apply-proposals.mjs`. Die Dateien in `data/` werden mit 2 Leerzeichen eingerückt neu geschrieben; die erste Übernahme formatiert `venues.json` daher einmalig um.
- **Dateien:** `scripts/scrape/lib/proposals.mjs`, `scripts/scrape/apply-proposals.mjs`
- **Prüfung:** Node-Tests grün (Freigabe, Übernahme, Konflikt, Rollback).
