# Code-Review-Analyse: SERVICE-12-STORY-04 Fußbereich nach Klangland

**Ticket:** SERVICE-12  
**Analysiert:** 2026-10-29  
**Scope:** Branch-Diff gegen main plus nicht committete Änderungen, nur Fußbereich (Story 04)  
**Status:** Entwurf – wartet auf Abnahme  
**Berücksichtigte ADRs / Gherkin:** ADR-002, ADR-003, ADR-004, ADR-016, ADR-017 / `web/seitenrahmen.feature`, `web/karte.feature`

**Betroffene Dateien:**
- `web/src/app/app.html` (footer, Zeilen 30–40)
- `web/src/styles.css` (`.site-footer`, `.footer-*`)
- `web/src/app/app.spec.ts` (Tests zu FRM-UB-3 und FRM-UB-4, Zeilen 303–347)

---

## A. Zusammenfassung (Executive Summary)

### Gesamtbewertung der menschlichen Nachvollziehbarkeit

Der Fußbereich ist klein, semantisch sauber (`footer`, `nav` mit Label, Linkzeile, Absatz) und das CSS ist kurz, kommentiert und nutzt die vorhandenen Variablen. Die stillen Fallen liegen in den Tests: Der FRM-UB-3-Test bündelt drei Aussagen und verwendet eine unerklärte Route, und die Kontrastberechnung ist inline neu geschrieben, obwohl es im Projekt bereits eine gibt. Außerdem ist die Linkliste im Template fest verdrahtet, während der Kopf seine Links aus einer Liste erzeugt. Nichts davon beeinträchtigt das Verhalten.

- **Nachvollziehbarkeit:** Hoch
- **Einschätzung:** hybrid – Template und CSS sind schlicht und konsistent; die Tests zeigen die typische KI-Dichte (Mehrfachassertions, Einzeiler-Helfer, Duplikat).

---

## B. Konkrete Befunde

### CODE-01: Kontrastberechnung im Test dupliziert

- **Kategorie:** Duplikation
- **Priorität:** Niedrig
- **Code-Referenz:** `web/src/app/app.spec.ts:339-343` – Test „der Text im Fußbereich hat einen Kontrast …“
- **Beobachtung:** `rgb`, `lum` und die Kontrastformel stehen als dichte Einzeiler im Test. `web/src/app/core/venue-symbol.spec.ts:8-14` enthält bereits `luminance` und `contrast`.
- **Warum problematisch:** Die WCAG-Formel existiert zweifach (mit leicht unterschiedlichem Schwellwert `0.03928` bzw. der Variante dort); bei Korrekturen driftet sie auseinander. Der Einzeiler `lum` ist schwer lesbar.
- **Typisches KI-Ursachenmuster:** Kontextblindheit gegenüber vorhandenen Hilfsfunktionen.
- **ADR-/Gherkin-Bezug:** Q-USE-13 (Kontrast ≥ 4,5:1)

### CODE-02: Test zu FRM-UB-3 bündelt drei Aussagen und nutzt eine unerklärte Route

- **Kategorie:** Verständlichkeit
- **Priorität:** Niedrig
- **Code-Referenz:** `web/src/app/app.spec.ts:319-334`
- **Beobachtung:** Ein Test prüft (a) `position` statisch, (b) Scrollen aus dem Bild nach 3000 px Zusatzinhalt, (c) Ausrichtung von `.footer-inner` am `main`-Padding. Er öffnet dazu `/gibt-es-nicht` ohne Kommentar, hängt ein Element an `main` und entfernt es wieder (nicht im `finally`; schlägt eine Erwartung fehl, bleibt das Element im geteilten DOM). Das Gherkin-Szenario „Fußbereich bei kurzem Inhalt am Fensterrand“ (FRM-UB-3) hat im FRM-Block keinen eigenen Test; abgedeckt ist es nur durch den MAP-UB-9-Test in Zeile 94.
- **Warum problematisch:** Bei einem Fehlschlag ist unklar, welche Anforderung gebrochen ist; die Ausrichtung gehört zu FRM-UB-4, nicht FRM-UB-3. Der Bezug Szenario zu Test ist nicht auffindbar.
- **Typisches KI-Ursachenmuster:** Funktions-Überladung, Wiederverwendung eines Platzhalters ohne Begründung.
- **ADR-/Gherkin-Bezug:** `web/seitenrahmen.feature` · „Fußbereich scrollt mit dem Inhalt“, „Fußbereich bei kurzem Inhalt am Fensterrand“; ADR-016

### CODE-03: Rechtliche Links im Fußbereich fest im Template, Kopf nutzt eine Liste

- **Kategorie:** Stilbruch
- **Priorität:** Niedrig
- **Code-Referenz:** `web/src/app/app.html:33-36` gegenüber `web/src/app/app.ts:42-52` (`links`) und `app.html:17`
- **Beobachtung:** Der Kopf erzeugt seine Links per `@for` aus `links`; der Fußbereich schreibt vier `<a routerLink>` einzeln. Pfade und Beschriftungen stehen zusätzlich im Test (`app.spec.ts:20-30`, `:317`) und in `app.routes.ts`.
- **Warum problematisch:** Zwei Muster für gleichartige Linklisten; eine fünfte rechtliche Seite verlangt Änderungen an mehreren Stellen. Gering, da die Liste kurz und stabil ist; ein einzelnes Template ist auch lesbarer. Deshalb nur als Hinweis, kein Muss.
- **Typisches KI-Ursachenmuster:** Varianz bei gleichartigen Problemen.

### CODE-04: Redundante Klasse `muted` im Fußbereich

- **Kategorie:** Dead Code
- **Priorität:** Niedrig
- **Code-Referenz:** `web/src/app/app.html:38`, `web/src/styles.css` (`.site-footer { color: var(--muted) }`, `.muted`)
- **Beobachtung:** `.site-footer` setzt bereits `color: var(--muted)`; der Absatz trägt zusätzlich `class="muted"`, was dieselbe Farbe setzt.
- **Warum problematisch:** Die Klasse wirkt wie eine Stilentscheidung, ist aber ohne Effekt und lässt offen, ob sie bewusst ist.
- **Typisches KI-Ursachenmuster:** Beibehalten von Altcode (die Klasse stand schon vor der Änderung) bei geänderter Umgebung.

---

## C. Bewusst nicht gemeldet

- Sticky-Kopf, Burger-Menü, `ViewportScroller.setOffset` und feste `scroll-padding-top` gehören zu den Stories 01 bis 03 (Kontext, nicht Scope); die Kopplung 6 rem ist als ANNAHME in `PIPELINE.md` dokumentiert.
- Fußbereich ohne `position: fixed`, `main` wächst, Spalte aus ADR-016: dokumentierte Entscheidung (FRM-UB-3).
- Keine ADR für den Fußbereich: in `PIPELINE.md` begründet.
- Betreiberangaben und Rechtstexte (Story 05): nicht Scope, Annahmen bestätigt.
- Kontrast muted `#5c5c57` auf `#ffffff` liegt über 4,5:1 und ist durch den Test abgedeckt.

---

## D. Abgeleitete Tasks

| Task | Titel | Priorität | Aufwand | Befunde |
|---|---|---|---|---|
| [TASK-21](TASK-21-fussbereich-tests-entflechten.md) | Fußbereich-Tests entflechten und Kontrast-Helfer wiederverwenden | Low | ~45 min | CODE-01, CODE-02 |
| [TASK-22](TASK-22-fussbereich-template-aufraeumen.md) | Fußbereich-Template: redundante Klasse entfernen | Low | ~10 min | CODE-04 |

CODE-03 ist ein Hinweis ohne Task (Aufwand und Nutzen stehen nicht im Verhältnis).

---

## E. Meta-Bewertung

- **Gut automatisiert behebbar:** CODE-01, CODE-02, CODE-04.
- **Erfordert menschliche Architektur-Entscheidung:** keine.
- **Empfehlung für künftige KI-Codegenerierung:** Gemeinsame Testhelfer (Kontrast, Messungen) an einer Stelle bereitstellen und in den Projektkontext aufnehmen; pro Gherkin-Szenario einen Test mit passendem Titel verlangen.

---

## F. Nicht bewertbar

Das visuelle Ergebnis (Optik, Umbruch der Linkzeile bei 320 px) und die Browser-Messungen wurden nicht ausgeführt (kein Build oder Test in diesem Review).
