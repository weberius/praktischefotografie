# Changelog: SERVICE-20-STORY-01 – Globaler Filter nach Ort und Ortstyp

## 2026-11-02 – RÜCKLAUF (Review): Zurücksetzen auf der Karte, Tests, Verweise

- **Status:** Umgesetzt
- **Änderungen:** Karte: „Veranstalter und Festival zurücksetzen“ (nur Adressfilter) und „Alle Filter zurücksetzen“ im Hinweis; die Komponente setzt nur den globalen Filter zurück. Tests: Neustart prüft zusätzlich IndexedDB, Seitenwechsel prüft Anzeige der Auswahl. Hinweise zu ersetzten IDs in ADR-016 und zwei Quality-Dokumenten.
- **Quelle (bei Rücklauf):** Task (Umsetzungsfehler, FLT-UB-4) · ADR-016/Quality-Verweise
- **Dateien:** `web/src/app/pages/map/map.{ts,html}`, `core/global-filter.spec.ts`, `shared/global-filter/global-filter-pages.spec.ts`, `docs/architecture/ADR-016-*.md`, `docs/quality/web/{barrierefreiheit,karte-darstellung}.md`
- **Prüfung:** Build, `web:test` (328), Lint grün; zurückgestellt: C3–C7 (axe, Tastatur, Live-Regionen).

## 2026-11-02 – TASK-04: Agenda, Ausstellungen und Events filtern

- **Status:** Umgesetzt
- **Änderungen:** `calendar`, `exhibition-list` und `event-list` binden die Filterbedienung ein und filtern über `venueId` (`AgendaItem.venueId` neu); Hinweis mit Zurücksetzen, wenn alles ausgeblendet ist; Einträge ohne bekannten Ort entfallen bei gesetztem Filter.
- **Dateien:** `web/src/app/core/agenda.ts`, `pages/{calendar,exhibition-list,event-list}/*`, `shared/global-filter/global-filter-pages.spec.ts`
- **Prüfung:** Komponententests (Seitenwechsel, Kombination mit „Nur Favoriten“ und Eventtyp, unbekannter Ort, Hinweis) grün. Nicht geprüft: axe-Lauf (`tools/quality`) und Tastaturtest im echten Browser.

## 2026-11-02 – TASK-03: Orte und Karte umstellen

- **Status:** Umgesetzt
- **Änderungen:** Auswahlen Stadt, Typ, Präsenzbibliothek und Ständige Sammlung entfernt; globaler Filter eingebunden; Veranstalter und Festival bleiben in der Adresse; Link zur Ortsliste trägt nur noch diese Parameter; alte Parameter werden ignoriert.
- **Quelle:** EARS MAP-UB-14, MAP-UB-15 (ersetzen MAP-UB-4, MAP-EV-1, MAP-UB-8); VNU-UB-2, MAP-UB-2, MAP-UN-1 entfallen
- **Dateien:** `web/src/app/pages/{venue-list,map}/*`, zugehörige Specs
- **Prüfung:** Komponententests der Seiten grün; Tests der entfernten Filter ersetzt.

## 2026-11-02 – TASK-02: Filterkomponente

- **Status:** Umgesetzt
- **Änderungen:** `app-global-filter` mit `details`/`summary`, Checkbox-Gruppen (`fieldset`/`legend`) für Ortstyp und Orte aus den Daten, aktive Auswahl als Text im `role=status`, Zurücksetzen.
- **Dateien:** `web/src/app/shared/global-filter/*`
- **Prüfung:** Komponententests grün. Nicht geprüft: Kontrast und Zielgröße am gerenderten Bild.

## 2026-11-02 – TASK-01: Filterdienst

- **Status:** Umgesetzt
- **Änderungen:** `GlobalFilter` (Wurzeldienst, Signale, `allows`); `venue-filter.ts` auf Veranstalter und Festival reduziert.
- **Dateien:** `web/src/app/core/global-filter.ts`, `core/venue-filter.ts` und Specs
- **Prüfung:** Unit-Tests (UND/ODER, unbekannter Ort, kein Speicher/Cookie/Netz, Neustart leer) grün.

**Prüf-Gate:** `npm run build`, `npm run web:test` (328), `npm run lint:all` grün; `npm test` nur FET-OP-3 rot (bekannt, unabhängig).
