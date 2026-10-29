# Code-Review-Analyse: SERVICE-10-STORY-01 – Karte über die gesamte Fläche, ohne Ortsliste

**Ticket:** SERVICE-10 (Story SERVICE-10-STORY-01)  
**Analysiert:** 2026-10-29  
**Scope:** Dateien der Story laut Auftrag (Diff gegen main plus nicht committete Änderungen): `web/src/app/app.ts`, `app.css`, `app.spec.ts`, `web/src/styles.css`, `pages/map/map.{html,ts,css,spec.ts}`, `shared/venue-map/venue-map.css`, `venue-map.ts` (ResizeObserver/Layout), `venue-map.spec.ts` (Größentest), `web/tools/quality/smoke.mjs` (/map-Abschnitt)  
**Status:** Entwurf – wartet auf Abnahme  
**Berücksichtigte ADRs / Gherkin:** ADR-002, ADR-004, ADR-016 / `web/karte.feature` (MAP-UB-7, -8, -9, -13), EARS `web/karte.md`, Quality `karte-darstellung.md` (Q-USE-10), PIPELINE.md (Annahmen)

**Betroffene Dateien:**
- `web/src/app/app.ts`, `web/src/app/app.css`, `web/src/app/app.spec.ts`, `web/src/styles.css`
- `web/src/app/pages/map/map.html`, `map.ts`, `map.css`, `map.spec.ts`
- `web/src/app/shared/venue-map/venue-map.css`, `venue-map.ts`, `venue-map.spec.ts`
- `web/tools/quality/smoke.mjs`

---

## A. Zusammenfassung (Executive Summary)

### Gesamtbewertung der menschlichen Nachvollziehbarkeit

Der Umbau ist klein, gut kommentiert und folgt der Spezifikation (Kommentare nennen MAP-UB-IDs und ADR-016). Die Tests prüfen das Layout mit echten Messungen statt mit Klassennamen. Stille Fallen liegen in der Höhenkette, die über fünf Dateien verteilt ist und nur im Zusammenspiel funktioniert, sowie in Resten der Ortsliste, die nach dem Umbau stehen geblieben sind (Meta-Beschreibung, `aria-label`, toter CSS-Selektor). Ein Test zur Größenanpassung ist möglicherweise vom Timing abhängig.

- **Nachvollziehbarkeit:** Hoch
- **Einschätzung:** hybrid – konsistente Struktur und Stil des Projekts; typisch für KI-Änderungen sind die übersehenen Textreste außerhalb der direkt bearbeiteten Dateien.

---

## B. Konkrete Befunde

### CODE-01: Veraltete Verweise auf eine Ortsliste auf /map

- **Kategorie:** Semantik / Dead Code (veraltete Kommentare und Texte)
- **Priorität:** Mittel
- **Code-Referenz:** `web/src/app/pages/map/map.ts:34`, `web/src/app/shared/venue-map/venue-map.html:5`, `web/src/app/shared/venue-map/venue-map.ts:18`
- **Beobachtung:** Meta-Beschreibung: „Karte und Liste der Foto-Orte in NRW …“; `aria-label` der Karte: „… Dieselben Orte stehen auch in der Liste zur Verfügung.“; Klassenkommentar nennt MAP-UB-6 (ersetzt durch MAP-UB-13). Auf `/map` gibt es seit dieser Story keine Liste (MAP-UB-7; Test `map.spec.ts` prüft `ul.card-list` = null).
- **Warum problematisch:** Screenreader-Nutzer:innen wird eine nicht vorhandene Liste angekündigt, Suchergebnisse versprechen eine Liste, Kommentar verweist auf eine ersetzte Anforderung. `venue-map.html` und die Zeile in `venue-map.ts:18` liegen außerhalb der Dateiliste der Story, gehören aber zur selben Änderung.
- **Typisches KI-Ursachenmuster:** Kontextblindheit – nur Dateien angepasst, die der Diff berührte; Textreste in Nachbardateien bleiben.
- **ADR-/Gherkin-Bezug:** MAP-UB-7, MAP-UB-8, ADR-016

### CODE-02: Test zur Größenanpassung kann ohne die Funktion bestehen

- **Kategorie:** Verständlichkeit (Testaussagekraft)
- **Priorität:** Niedrig
- **Code-Referenz:** `web/src/app/shared/venue-map/venue-map.spec.ts` (Test „ändert sich die Höhe des Kartenbereichs …“), `web/src/app/shared/venue-map/venue-map.ts:108-109`
- **Beobachtung:** Der Spy auf `invalidateSize` wird nach dem Warten auf die Marker gesetzt, dann wird die Höhe geändert und auf `calls.count() > 0` gewartet. Ein `ResizeObserver` meldet beim ersten `observe()` immer einmal; trifft diese Erstmeldung nach der Spy-Installation ein, ist der Test grün, ohne dass die Höhenänderung wirkt. ANNAHME: nicht gemessen; abhängig vom Frame-Timing in Karma.
- **Warum problematisch:** Ein Test, der eine Regression nicht sicher erkennt, gibt falsche Sicherheit; Flakiness wäre schwer zu deuten.
- **Typisches KI-Ursachenmuster:** Test bestätigt den Happy Path, ohne die Gegenprobe (Funktion entfernt → Test rot).
- **ADR-/Gherkin-Bezug:** MAP-UB-9, Q-USE-10

### CODE-03: Toter CSS-Selektor `.venue-type` in map.css

- **Kategorie:** Dead Code
- **Priorität:** Niedrig
- **Code-Referenz:** `web/src/app/pages/map/map.css:9`
- **Beobachtung:** `.venue-type { color: var(--muted); }` – das Template `map.html` hat kein Element mit dieser Klasse mehr (Liste entfernt), `typeInfo` aus `map.ts` ebenfalls.
- **Warum problematisch:** Lässt vermuten, dass der Typ auf `/map` noch als Text erscheint; Aufräumrest.
- **Typisches KI-Ursachenmuster:** Entfernen des Templates ohne das zugehörige CSS.
- **ADR-/Gherkin-Bezug:** –

### CODE-04: Höhenkette über fünf Stellen verteilt, Mindesthöhe doppelt

- **Kategorie:** Verständlichkeit / Duplikation
- **Priorität:** Niedrig
- **Code-Referenz:** `web/src/app/app.css:2`, `web/src/styles.css:33,36`, `web/src/app/pages/map/map.css:2-8`, `web/src/app/shared/venue-map/venue-map.css:1-2`
- **Beobachtung:** Das Füllen der Fläche setzt `app.css` (Host-Spalte), `styles.css` (`main` wächst; `main:has(> app-map-page)` – globales CSS nennt eine Seitenkomponente), `map.css` (`display: contents`, Flex-Wachstum) und `venue-map.css` zusammen voraus. `min-height: 24rem` steht in `venue-map.css` am Host und an `.map` (Letzteres ist redundant, `.map` wächst auf die Hosthöhe), die Zahl auch im Kommentar `map.css:1`. Die Tests in `app.spec.ts` fangen Brüche ab, die Ursache findet man aber nur mit Kenntnis der gesamten Kette.
- **Warum problematisch:** Eine Änderung der Mindesthöhe oder des Seitenrahmens braucht Änderungen an mehreren Stellen; der `:has`-Selektor koppelt den globalen Rahmen an eine einzelne Seite.
- **Typisches KI-Ursachenmuster:** Lokale Korrektur je Ebene, bis das Ergebnis stimmt, statt einer zentralen Größe.
- **ADR-/Gherkin-Bezug:** ADR-016 (Layout), Q-USE-10

---

## C. Bewusst nicht gemeldet

- `main:has(> app-map-page)` als Selektor und seine Browser-Voraussetzung (Chrome 105 / Firefox 121 / Safari 15.4): dokumentierte ANNAHME in PIPELINE.md; nur die Kopplung ist in CODE-04 vermerkt.
- `ResizeObserver` in `VenueMap` und die Guard `typeof ResizeObserver === 'undefined'`: dokumentierte ANNAHME (stand nicht in der Spezifikation), im Stil der bestehenden `IntersectionObserver`-Guard in `venue-map.ts:67`.
- Seitenrahmen als Spalte für alle Seiten, `min-height: 100vh` mit `100dvh` als Überschreibung: ADR-016 und PIPELINE.md; die Doppeldeklaration ist ein üblicher Fallback.
- `app-data-gate { display: contents; }`: im Kommentar begründet.
- Leere, 24 rem hohe Karte beim Vorabrendern mit sichtbarem Link statt reinem Hinweistext: entspricht MAP-UB-13 und Q-SEO-1 hinreichend; kein Befund.
- `.list-link` ohne CSS-Regel: dient als Test-/Smoke-Selektor, Link nutzt die globale Linkformatierung.
- Smoke-Test wartet nun auf `a.list-link` statt `ul.card-list li`: passende Anpassung an MAP-UB-7/13.

## D. Abgeleitete Tasks

| Task | Titel | Priorität | Aufwand | Befunde |
|---|---|---|---|---|
| [TASK-21](TASK-21-veraltete-listenverweise-korrigieren.md) | Veraltete Verweise auf eine Ortsliste auf /map korrigieren | Medium | ~15 min | CODE-01 |
| [TASK-22](TASK-22-groessentest-ohne-race.md) | Größentest gegen initialen ResizeObserver-Aufruf absichern | Low | ~20 min | CODE-02 |
| [TASK-23](TASK-23-toten-css-selektor-entfernen.md) | Toten Selektor `.venue-type` entfernen | Low | ~5 min | CODE-03 |
| [TASK-24](TASK-24-layout-kette-und-mindesthoehe.md) | Layout-Kette bündeln (Entscheidung erforderlich) | Low | ~45 min | CODE-04 |

## E. Meta-Bewertung

- **Gut automatisiert behebbar:** CODE-01, CODE-02, CODE-03, Schritt 1 von CODE-04.
- **Erfordert menschliche Entscheidung:** `main:has(> app-map-page)` beibehalten oder ersetzen (TASK-24, Schritt 2).
- **Empfehlung für künftige KI-Codegenerierung:** Beim Entfernen einer Darstellung (hier: Liste) gezielt nach den Begriffen („Liste“, Klassennamen, Meta-Texte, `aria-label`) im ganzen Verzeichnis suchen; Tests nach der Gegenprobe (Funktion entfernen → Test rot) prüfen.

## F. Nicht bewertbar

Nicht gemessen wurde das Layout im Browser (1280 × 800, 390 × 844); die Aussagen zum Layout stützen sich auf den Code und die Layouttests in `app.spec.ts`. Das Timing in CODE-02 wurde nicht empirisch belegt.
