# Code-Review-Analyse: SERVICE-12-STORY-01 Navigation als Burger-Menü

**Ticket:** SERVICE-12  
**Analysiert:** 2026-10-29  
**Scope:** Branch-Diff gegen main plus nicht committete Änderungen, beschränkt auf das Burger-Menü (Story 01)  
**Status:** Entwurf – wartet auf Abnahme  
**Berücksichtigte ADRs / Gherkin:** ADR-002, ADR-003, ADR-004, ADR-016, ADR-017 / `web/seitenrahmen.feature`, `web/navigation.feature`, `web/markenicon.feature`

**Betroffene Dateien:**
- `web/src/app/app.ts`
- `web/src/app/app.html` (Kopf)
- `web/src/styles.css` (`.nav-toggle*`, `.main-nav*`)
- `web/src/app/app.spec.ts` (Szenario „Kopf- und Fußbereich (FRM)“, Menü)

---

## A. Zusammenfassung (Executive Summary)

### Gesamtbewertung der menschlichen Nachvollziehbarkeit

Die Umsetzung ist klein, klar und deckt sich mit Spezifikation und Annahmen: ein Signal, eine Umschaltmethode, Schließen bei `NavigationEnd` und Escape, Zustand nur per Klasse und Attribut (kein Skript-Layout, Q-PERF-8). Kommentare verweisen auf EARS-IDs. Die stillen Fallen liegen nur im Randbereich: die Brand-Regeln in `styles.css` sind über mehrere Stellen verteilt und mit einem Kommentar am falschen Ort versehen, die Testhilfe `open` ist dreimal kopiert, und die Reihenfolge der Klassenmitglieder ist uneinheitlich. Es gibt keine kritischen oder hohen Befunde.

- **Nachvollziehbarkeit:** Hoch
- **Einschätzung:** hybrid – insgesamt konsistent, kleine Kopier- und Anbau-Spuren (nachträglich eingefügte Regeln und Testhilfen).

---

## B. Konkrete Befunde

### CODE-01: Brand-Regeln zerstückelt, Kommentar am falschen Ort, veraltete ID

- **Kategorie:** Verständlichkeit
- **Priorität:** Niedrig
- **Code-Referenz:** `web/src/styles.css:31-38`
- **Beobachtung:** `.brand` ist in Zeile 31 und erneut in Zeile 35 (`.brand { line-height: 1.25; }`) definiert, dazwischen steht `.brand-mark`. Der Kommentar „Burger-Menü in allen Fensterbreiten (FRM-UB-1) …“ (Zeile 34) steht über der `.brand`-Regel, nicht über `.nav-toggle` (Zeile 39 ff.). Der Kommentar in Zeile 32 verweist auf ICO-UB-3, das per Supersede durch ICO-UB-7 ersetzt ist.
- **Warum problematisch:** Wer `.brand` ändert, findet nur eine der beiden Regeln; der Burger-Kommentar führt in die Irre; die ID führt auf eine abgelöste Anforderung.
- **Typisches KI-Ursachenmuster:** Anbau statt Einfügen an der passenden Stelle (additive Edits).
- **ADR-/Gherkin-Bezug:** –

### CODE-02: Testhilfe `open` zum dritten Mal kopiert

- **Kategorie:** Duplikation
- **Priorität:** Niedrig
- **Code-Referenz:** `web/src/app/app.spec.ts:152` (Icon) und `:215` (FRM); ähnlich `:111` (`openMap`)
- **Beobachtung:** Der Block `createComponent`, `detectChanges`, `navigateByUrl`, `whenStable`, `detectChanges` steht wortgleich in den Describe-Blöcken „Icon im Kopfbereich“ und „Kopf- und Fußbereich (FRM)“; nur der Rückgabewert unterscheidet sich.
- **Warum problematisch:** Änderungen am Aufbau (z. B. Bereitstellung weiterer Provider) müssen an mehreren Stellen erfolgen und laufen leicht auseinander.
- **Typisches KI-Ursachenmuster:** Kopieren des Nachbar-Blocks statt Wiederverwenden.
- **ADR-/Gherkin-Bezug:** `web/seitenrahmen.feature`

### CODE-03: Reihenfolge der Mitglieder in `App` uneinheitlich

- **Kategorie:** Varianz
- **Priorität:** Niedrig
- **Code-Referenz:** `web/src/app/app.ts:36-46`
- **Beobachtung:** Das Feld `links` (reine Daten für die Vorlage) steht nach Konstruktor und Methoden, während `menuOpen` und die Injektionen davor stehen. Vorher stand `links` am Anfang der Klasse.
- **Warum problematisch:** Zustand und Daten sind getrennt; beim Lesen der Vorlage sucht man die Felder an zwei Orten.
- **Typisches KI-Ursachenmuster:** Neuer Code wird vor bestehenden Code geschoben, Reihenfolge nicht angeglichen.
- **ADR-/Gherkin-Bezug:** –

---

## C. Bewusst nicht gemeldet

- Burger-Menü in jeder Fensterbreite, `display: none` im geschlossenen Zustand, Menü als absolutes Feld unter dem Kopf: FRM-UB-1, FRM-ST-1, ADR-002.
- Zugänglicher Name wechselt zusätzlich zu `aria-expanded`: von FRM-EV-1 und Q-USE-12 gefordert.
- `@HostListener('document:keydown.escape')` und `takeUntilDestroyed`: im Projekt kein abweichendes Muster vorhanden (kein `host:`-Block, kein `fromEvent`); Signals und RxJS-Router-Events sind hier üblich.
- Die drei Balken des Symbols per CSS ohne Bildbibliothek: Vorgabe in TASK-01.
- Doppelte Höhenkopplung (`scroll-padding-top` und `ViewportScroller`-Offset): als ANNAHME in `PIPELINE.md` dokumentiert, Gegenstand von Story 03.
- Nicht geprüfter axe-Lauf im geöffneten Zustand und Playwright-Tastaturtest: im Changelog der Story als „Nicht geprüft“ dokumentiert (Q-USE-12).

---

## D. Abgeleitete Tasks

| Task | Titel | Priorität | Aufwand | Befunde |
|---|---|---|---|---|
| [TASK-21](TASK-21-menue-code-und-css-aufraeumen.md) | Menü-Code und CSS aufräumen | Low | ~20 min | CODE-01, CODE-03 |
| [TASK-22](TASK-22-testhilfe-open-zusammenfuehren.md) | Testhilfe `open` zusammenführen | Low | ~20 min | CODE-02 |

---

## E. Meta-Bewertung

- **Gut automatisiert behebbar:** alle drei Befunde.
- **Erfordert menschliche Architektur-Entscheidung:** keine.
- **Empfehlung für künftige KI-Codegenerierung:** Neue CSS-Regeln zu einem Selektor an die bestehende Regel anfügen und Kommentare direkt über die betreffende Regel setzen; vorhandene Testhilfen vor dem Kopieren prüfen.

---

## F. Nicht bewertbar

Das Verhalten im Browser (Fokus nach Linkwahl, axe, Tastaturtest) war nicht Gegenstand dieses Reviews und wurde nicht ausgeführt.
