# Closure: SERVICE-02 – Angular-Webanwendung

**Datum:** 2026-10-27

## Erreichtes
- Statische Angular-20-App in `web/` (zoneless, vorab gerendert): Blog-Startseite und Beitrag, Kalender, Karte (Leaflet/OSM mit Listenalternative), Orte, Fotograf:innen, Ausstellungen, Events, Veranstalter:innen, Impressum, Datenschutz, Hinweisseite.
- Daten-Sync mit Validierung und getrenntem Demo-Modus (`demo/`), Sitemap, robots.txt, 404, GitHub-Pages-Workflow.
- Spezifikation: 67 EARS-Anforderungen, 67 Gherkin-Szenarien, Quality Q-PERF-3/4, Q-USE-2/3/4, Q-SEC-2/3, Q-SEO-1/2/3, Q-MAIN-1; ADR-002 bis ADR-005 accepted.
- Prüfung: 151 Web-Tests, 58 Daten-Tests, Lint und Build grün; Zeilenabdeckung `core/` 96,7 %; axe 0 Verstöße auf 18 Seiten; Lighthouse mobil 94/94/97 (simuliert).

## Abweichungen
- Phase 7 (Review) nicht durchgeführt: keine `review-*`-Skills vorhanden.
- Impressum mit Platzhaltern; Betreiberangaben fehlen.
- GitHub-Actions-Lauf nicht ausgeführt (kein Remote).

## Rückläufe
Keine über H2. Intern korrigiert: Q-PERF-3 verfehlt (78/59/77) → zoneless, Karte lazy, Liste vor Karte, gzip im Prüfserver (Quelle: ADR-002 ergänzt). Spezifikation um CAL-UB-5 und CAL-UB-6 nachgezogen (Quelle: EARS/Gherkin).

## Erkenntnisse
- Prüfwerkzeuge unter WSL: `chrome-launcher` legt Windows-Pfade als Ordner im Projekt an; Chrome wird deshalb selbst gestartet.
- Beiträge mit Zukunftsdatum erscheinen erst nach neuem Build (kein Server zur Laufzeit).
- Parallele Teilagenten funktionierten mit klar getrennten Dateien; fehlende `withComponentInputBinding()` im Test-Router wurde nachgezogen.

## Follow-ups / empfohlene Tickets
1. Impressum und Datenschutz mit Betreiberangaben füllen, Domain und `SITE_URL`.
2. Redaktionelle Inhalte erfassen: Ausstellungen, Events, Fotograf:innen, Veranstalter, Beiträge; Venues verifizieren.
3. Geplantes Veröffentlichen (täglicher Build per Zeitplan) für Beiträge und „Endet bald“.
4. Festival-Modus (PRD Phase 3).
5. Review-Skills anlegen; Screenreader- und Gerätetests.
6. `web/tools/*.mjs` ins Linting aufnehmen.
