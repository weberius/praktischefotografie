# Security-Analyse: SERVICE-10-STORY-01 – Karte über die gesamte Fläche, ohne Ortsliste

**Ticket:** SERVICE-10 (Story SERVICE-10-STORY-01)  
**Analysiert:** 2026-10-29  
**Scope:** Dateien der Story: `web/src/app/app.ts`, `app.css`, `app.spec.ts`, `web/src/styles.css`, `pages/map/{map.html,map.ts,map.css,map.spec.ts}`, `shared/venue-map/{venue-map.css,venue-map.ts (ResizeObserver/followContainerSize, Layout),venue-map.spec.ts}`, `web/tools/quality/smoke.mjs` (/map-Abschnitt). Datenfluss bis Quelle und Senke verfolgt (URL-Parameter, `filterToParams`, `routerLink`, Popup).  
**Methode:** Statische Code-Analyse (SAST) + Konfigurations-Review + `npm audit --omit=dev`  
**Status:** Entwurf – wartet auf Abnahme  
**Berücksichtigte ADRs / Gherkin:** ADR-002, ADR-004, ADR-016 / `web/karte.feature`; EARS `web/karte.md`; Quality `karte-darstellung.md`

---

## Executive Summary

**Gesamtrisiko:** Low (keine Befunde)

Die Story ändert fast nur Layout (CSS), entfernt die Ortsliste und fügt einen Link auf `/venues` mit den aktuellen Filtern sowie einen `ResizeObserver` hinzu. Es entstehen keine neuen Senken für unvertrauenswürdige Daten: kein `innerHTML`, kein `bypassSecurityTrust*`, kein `eval`. Der Link wird über `routerLink` mit `queryParams` gebildet (Angular kodiert), Filterwerte aus der Adresse werden nur verglichen, nie als HTML oder URL interpretiert. `npm audit --omit=dev` meldet 0 Schwachstellen. Es gibt keine Befunde, nur Hinweise zur Defense-in-Depth.

| Schweregrad | Anzahl |
|---|---|
| Critical | 0 |
| High | 0 |
| Medium | 0 |
| Low | 0 |

---

## Identifizierte Sicherheitsrisiken

Keine.

---

## Regressionen und bekannte Risiken

Keine früheren Security-Analysen im Repository (`docs/planning/`, `docs/discovery/`); nichts zu prüfen.

Prüfung auf Regression bei den Vorgaben, die Story-Code berühren:
- Popup (`venue-map.ts:149-166`) bleibt aus DOM-Elementen mit `textContent` und `encodeURIComponent` gebaut (ADR-004): unverändert, kein Rückfall.
- Leaflet-Assets weiterhin lokal (`ASSET_PATH`), keine Drittanbieter-Skripte hinzugekommen.

---

## Beobachtungen ohne akutes Risiko

1. **Filterwerte aus der Adresse (OWASP A05/Injection, kein Befund).** `map.ts:26-31` liest `city`, `organizer`, `festival` ungeprüft aus der Query (`venue-filter.ts:48-57`; nur `type` wird gegen eine Liste geprüft). Sie fließen in `filterVenues` (reiner Vergleich) und über `listParams()` in `routerLink [queryParams]` (`map.html:55`). Angular kodiert Query-Parameter, es entsteht kein Schema- oder HTML-Kontext. Ein manipulierter Link kann höchstens zu einem leeren Ergebnis führen (bereits mit Hinweis und Zurücksetzen abgedeckt, `map.html:58-63`). Kein Handlungsbedarf.
2. **`:has()`-Selektor und globales CSS (`styles.css:36`).** Reine Darstellung, ohne Sicherheitswirkung.
3. **`ResizeObserver` (`venue-map.ts:105-109`)** ist mit `typeof`-Prüfung abgesichert (SSR sicher) und wird in `ngOnDestroy` getrennt (`venue-map.ts:61`). Kein Leck, keine Endlosschleife erkennbar: `invalidateSize` ändert die Containerhöhe nicht.
4. **Kein `Content-Security-Policy` im Repository.** Eine Suche über das Repo (ohne `node_modules`) findet keine CSP-Konfiguration; Header werden vermutlich vom Hosting gesetzt. Außerhalb des Story-Scopes, aber relevant für Leaflet (setzt Inline-Styles auf Marker-Elementen, `style-src` müsste das erlauben) und für OSM-Kacheln (`img-src`). Als Hinweis an die Auslieferung, nicht als Befund dieser Story.
5. **`smoke.mjs`** greift nur auf die lokale Vorschau-URL zu und wertet nur DOM-Selektoren aus; keine Secrets, keine externen Ziele.

---

## Positive Sicherheitsmaßnahmen

- Keine HTML-Senken im Story-Code; die Listen- und Marker-Titel werden als Text oder Attribut gesetzt (`title`/`alt` über Leaflet, `aria-label` per `setAttribute`).
- Der Listenlink entsteht über den Router statt durch String-Verkettung.
- Marker-HTML (`venueSymbolMarkup`) besteht aus Konstanten aus `VENUE_TYPE_INFO`, nicht aus Nutzerdaten.
- Leaflet-Initialisierung nur im Browser (`afterNextRender`), keine Zugriffe auf `window`/`document` im SSR-Pfad.
- Keine neuen Abhängigkeiten; `npm audit --omit=dev`: 0 Schwachstellen.

---

## Abgeleitete Tasks

Keine (kein Befund ab Schweregrad Medium).

---

## Nicht bewertbar

- HTTP-Security-Header und CSP der Auslieferung (nicht im Repo; siehe Beobachtung 4).
- Marker-Symbolik und Legende (Story 02) sind nicht Teil dieses Reviews.
