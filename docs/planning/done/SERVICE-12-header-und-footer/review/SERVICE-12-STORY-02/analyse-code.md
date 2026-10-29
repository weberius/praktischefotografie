# Code-Review-Analyse: SERVICE-12-STORY-02 – Name im Kopfbereich

**Ticket:** SERVICE-12  
**Analysiert:** 2026-10-29  
**Scope:** Branch-Diff gegen main plus nicht committete Änderungen, beschränkt auf STORY-02 (Link `.brand`, Media-Queries für schmale Bildschirme, Szenario „Icon im Kopfbereich“)  
**Status:** Entwurf – wartet auf Abnahme  
**Berücksichtigte ADRs / Gherkin:** ADR-002, ADR-003, ADR-004, ADR-016, ADR-017 / `markenicon.feature`, `seitenrahmen.feature`, `navigation.feature`

**Betroffene Dateien:**
- `web/src/app/app.html` (Zeile 4, Link `.brand`)
- `web/src/styles.css` (Zeilen 28 bis 38)
- `web/src/app/app.spec.ts` (Szenario „Icon im Kopfbereich“)

---

## A. Zusammenfassung (Executive Summary)

### Gesamtbewertung der menschlichen Nachvollziehbarkeit

Die Änderung ist klein und klar: ein geänderter Linktext, ein schrumpfender, umbrechender `.brand` und zwei Media-Queries. Tests und Namen sind auf ICO-UB-7/8 umgestellt, der Seitentitel-Test bleibt. Stille Fallen liegen in `styles.css`: `.brand` ist auf zwei Regeln verteilt, ein Kommentar steht an der falschen Stelle, ein weiterer verweist auf eine ersetzte Anforderung. Die für den Umbruch entscheidende Kopfhöhe (Q-USE-13) hängt an handgesetzten Schriftgrößen und wird nur manuell, nicht automatisiert geprüft.

- **Nachvollziehbarkeit:** Hoch
- **Einschätzung:** hybrid – die Änderung selbst ist konsistent, die CSS-Reihenfolge zeigt aber nachträgliches Anflicken (zweite `.brand`-Regel nach dem Messen).

---

## B. Konkrete Befunde

### CODE-01: `.brand` auf zwei Regeln verteilt, Kommentare an falscher Stelle bzw. veraltet

- **Kategorie:** Verständlichkeit / Dead Code (veralteter Kommentar)
- **Priorität:** Niedrig
- **Code-Referenz:** `web/src/styles.css:31`, `:32`, `:34`, `:35`
- **Beobachtung:** `.brand` steht in Zeile 31 und erneut in Zeile 35 (`.brand { line-height: 1.25; }`). Der Kommentar „Burger-Menü in allen Fensterbreiten (FRM-UB-1) …“ (Zeile 34) steht über dieser `line-height`-Regel und den Media-Queries; die Burger-Regeln beginnen erst in Zeile 39. Der Kommentar in Zeile 32 nennt „ICO-UB-3, ICO-UB-6“, ICO-UB-3 ist durch ICO-UB-7 ersetzt.
- **Warum problematisch:** Wer `.brand` ändert, findet nur eine der beiden Regeln; der falsche Kommentar führt beim Suchen der Burger-Regeln in die Irre; der Verweis auf die ersetzte ID verfehlt beim Rückverfolgen die gültige Anforderung.
- **Typisches KI-Ursachenmuster:** Anhängen statt Einfügen an der passenden Stelle (inkrementelle Korrektur nach der Messung).
- **ADR-/Gherkin-Bezug:** ADR-017; `markenicon.feature` · „Icon im Kopfbereich“

### CODE-02: Kopfhöhe (Q-USE-13) hängt an handgesetzten Werten und ist nicht automatisiert abgesichert

- **Kategorie:** Verständlichkeit / Varianz (Magic Numbers) und Testlücke
- **Priorität:** Mittel
- **Code-Referenz:** `web/src/styles.css:36`–`:38` (Schriftgrößen 1,15 / 1 / 0,95 rem; Haltepunkte 480 px und 360 px, Padding 0,5 rem 1 rem); `web/src/app/app.spec.ts` (Szenario „Kopf- und Fußbereich“, kein Test zu Kopfhöhe und Scrollbreite); `web/tools/quality/browser-check.mjs` (keine Höhenmessung)
- **Beobachtung:** Die Grenzen „≤ 5 rem bei 390 px, ≤ 6 rem bei 320 px, kein horizontales Scrollen“ wurden laut Changelog einmalig von Hand mit Playwright gemessen (3,56 rem). Im Code finden sich weder Messung noch Kommentar, welche Werte aus der Messung stammen. Die Haltepunkte sind in `px`, im Projekt steht sonst `rem` (`photographer-detail.css:10`: `40rem`). `scroll-padding-top: 6rem` (Zeile 30) und `setOffset([0, 96])` hängen an derselben Kopfhöhe und brechen still, wenn Schrift oder Padding wieder geändert werden.
- **Warum problematisch:** Eine spätere Änderung an Schrift, Padding oder Namen kann Q-USE-13 verletzen, ohne dass ein Test rot wird; die Begründung der Zahlen liegt nur im Changelog.
- **Typisches KI-Ursachenmuster:** Wert so lange justieren, bis die einmalige Messung passt, ohne die Messung festzuhalten.
- **ADR-/Gherkin-Bezug:** Q-USE-13, `seitenrahmen.feature`. In PIPELINE.md als Umsetzungsannahme dokumentiert (kein Verstoß gegen die Annahme; Gegenstand ist die fehlende Absicherung).

---

## C. Bewusst nicht gemeldet

- Längerer Name im Kopf, `<title>`/`SITE_NAME`/Manifest unverändert: bestätigte Annahme, NAV-UB-3 und ICO-UB-2 (PIPELINE.md).
- Umbruch des Namens statt Kürzung: bestätigte Annahme, Q-USE-13 begrenzt die Folge.
- Dekoratives Icon mit `alt=""` und `aria-hidden`, relative `src`: ADR-017, ICO-UB-5/8.
- `routerLink` und Linktext im Template ohne Transloco: im Projekt nicht in Gebrauch, Texte stehen direkt im Template.
- `scroll-padding-top`, `ViewportScroller`-Offset, Sticky-Kopf, Menü und Fußbereich: Story 03/01/04, nur Kontext; Kopplung an die Kopfhöhe nur unter CODE-02 erwähnt.
- Eine Zeile je Media-Query: entspricht dem dichten CSS-Stil der Datei.

---

## D. Abgeleitete Tasks

| Task | Titel | Priorität | Aufwand | Befunde |
|---|---|---|---|---|
| [TASK-21](TASK-21-brand-css-ordnen.md) | `.brand`-CSS bündeln, Kommentare korrigieren | Low | ~15 min | CODE-01 |
| [TASK-22](TASK-22-kopfhoehe-automatisch-pruefen.md) | Kopfhöhe und Scrollbreite in der Browserprüfung messen | Medium | ~1 h | CODE-02 |

---

## E. Meta-Bewertung

- **Gut automatisiert behebbar:** CODE-01 (reine Umordnung), CODE-02 (Messung in `browser-check.mjs`).
- **Erfordert menschliche Architektur-Entscheidung:** keine.
- **Empfehlung für künftige KI-Codegenerierung:** Bei Maßvorgaben aus der Qualitätsspezifikation (rem-Grenzen) die Messung als Test mitliefern; nachträgliche Korrekturen in die bestehende Regel einarbeiten statt eine zweite Regel anzuhängen.

---

## F. Nicht bewertbar

Das Rendering bei 320 und 390 Pixeln wurde nicht ausgeführt (Review ohne Build/Test); die Messwerte stammen aus dem Changelog.
