# Code-Review-Analyse: Zurück-Link auf Detailseiten (SERVICE-18-STORY-01)

**Ticket:** SERVICE-18  
**Analysiert:** 2026-11-02  
**Scope:** `web/src/app/core/nav-history.ts`, `web/src/app/shared/back-link/*`, `web/src/app/pages/*-detail/*-detail.{html,ts,css}` (Änderungen gegen `main` und nicht versionierte Dateien); Spezifikation `docs/ears/web/navigation.md`, `docs/contracts/gherkin/web/navigation.feature`, `docs/quality/web/navigation.md`. Nicht im Scope: `docs/product/ideen`.  
**Status:** Entwurf – wartet auf Abnahme  
**Berücksichtigte ADRs / Gherkin:** ADR-022, ADR-002, ADR-003 / `web/navigation.feature`

**Betroffene Dateien:**
- `web/src/app/core/nav-history.ts`
- `web/src/app/shared/back-link/back-link.ts`, `back-link.spec.ts`
- `web/src/app/pages/{event,exhibition,festival,organizer,photographer,post,venue}-detail/*.{html,ts}`, `photographer-detail.css`
- `docs/ears/web/navigation.md`, `docs/contracts/gherkin/web/navigation.feature`, `docs/quality/web/navigation.md`

Hinweis: Die im Skill genannten Pfade (`context/AI_CONTEXT.md`, `docs/product/...`) existieren hier nicht; gelesen wurden `docs/architecture/`, `docs/contracts/`, `docs/ears/`, `docs/quality/`, `web/eslint.config.js` und `app.config.ts`. Frühere Code-Analysen liegen nicht vor. Parallel entstand `analyse-architecture.md` mit TASK-01 und TASK-02; CODE-01, CODE-02 und CODE-04 (Duplikation) überschneiden sich mit ARCH-01 bis ARCH-03 und werden auf diese Tasks verwiesen statt neu angelegt. `analyse-security.md` ohne Befunde.

---

## A. Zusammenfassung (Executive Summary)

### Gesamtbewertung der menschlichen Nachvollziehbarkeit

Die Änderung ist klein, konsistent und folgt ADR-022: eine gemeinsame Komponente, sieben identische Einbindungen, Sonderlink und CSS auf der Fotograf:innen-Seite sauber entfernt. Die stillen Fallen liegen im Dienst: `NavHistory` wird nur von der Komponente selbst angefordert und hält nicht-reaktiven Zustand, der in einem `computed` gelesen wird. Der Test verdeckt das durch ein manuelles `TestBed.inject`. Die Zielbenennung dupliziert Routenwissen aus `app.ts` und ist schwer lesbar.

- **Nachvollziehbarkeit:** Mittel
- **Einschätzung:** hybrid – die Seiten-Einbindungen sind einheitlich, die Zustandslogik zeigt die typische Kontextblindheit (Test grün, Laufzeit-Verdrahtung ungeprüft).

---

## B. Konkrete Befunde

### CODE-01: `NavHistory` wird erst nach dem ersten Seitenwechsel instanziiert – Verlauf blind für die erste Seite

- **Kategorie:** Semantik (Verdrahtung; Grenzfall zu Korrektheit, daher Abgleich mit `/code-review` empfohlen)
- **Priorität:** Hoch
- **Code-Referenz:** `web/src/app/core/nav-history.ts:11-17`, `web/src/app/shared/back-link/back-link.ts:42`, `web/src/app/shared/back-link/back-link.spec.ts:11`
- **Beobachtung:** Der Konstruktor abonniert `router.events`. `grep` findet `NavHistory` nur in `back-link.ts` (und im Test); weder `app.ts` noch `app.config.ts` (`provideAppInitializer`) fordern ihn an. Er entsteht also erst, wenn die erste `BackLink`-Instanz gerendert wird, also nach dem `NavigationEnd` der ersten Detailseite. Annahme (nicht im Browser ausgeführt): Aufruf `/calendar` → Klick auf ein Event ergibt `before = null`, der Link zeigt auf `/events` statt `/calendar` (NAV-EV-2 verletzt). Der Test umgeht das mit `TestBed.inject(NavHistory)` vor der Navigation (`back-link.spec.ts:11`).
- **Warum problematisch:** Der Hauptfall der Story fehlt im echten Betrieb, während die Tests grün sind. Wer den Test liest, erkennt die Abhängigkeit von einer Initialisierung nicht, die der Produktivcode nirgends leistet.
- **Typisches KI-Ursachenmuster:** Kontextblindheit – Test baut die Voraussetzung selbst auf, statt die Verdrahtung der App zu prüfen.
- **ADR-/Gherkin-Bezug:** ADR-022; „Zurück zur vorherigen Seite“, Q-USE-16 (100 % Rückführung zur vorherigen Seite)

### CODE-02: Nicht-reaktiver Zustand in `computed` (Signals-Konvention gebrochen)

- **Kategorie:** Stilbruch / Verständlichkeit
- **Priorität:** Mittel
- **Code-Referenz:** `web/src/app/core/nav-history.ts:8-9`, `web/src/app/shared/back-link/back-link.ts:47-48`
- **Beobachtung:** `current`/`before` sind einfache Felder; `target` und `label` sind `computed`, lesen aber nur diese Felder. Ein `computed` ohne Signal-Abhängigkeit wird einmal berechnet und nie invalidiert. `previous()` erzeugt zudem bei jedem Aufruf einen neuen `UrlTree`.
- **Warum problematisch:** Das Projekt arbeitet zoneless mit Signals (`app.config.ts`, `provideZonelessChangeDetection`). Der Zustand sieht reaktiv aus, ist es aber nicht. Wird die Komponente bei einem Wechsel zwischen zwei Detailseiten desselben Typs wiederverwendet (Angular-Standard bei gleicher Route; ob im Datenmodell solche Links vorkommen, wurde nicht geprüft), bleibt das Ziel veraltet. Wartende erwarten bei `computed` Aktualisierung.
- **Typisches KI-Ursachenmuster:** Pattern-Mischung (Signals-Syntax über imperativem Zustand).
- **ADR-/Gherkin-Bezug:** ADR-022 („Zurück-Link zeigt auf die vorherige Seite“)

### CODE-03: Tests prüfen nur das `href`, nicht die Navigation selbst

- **Kategorie:** Verständlichkeit (Testabdeckung der Gherkin-Szenarien)
- **Priorität:** Mittel
- **Code-Referenz:** `web/src/app/shared/back-link/back-link.spec.ts:47-58`
- **Beobachtung:** Das Szenario „Zurück zur vorherigen Seite“ (Gherkin: „Wenn der Zurück-Link gewählt wird, Dann zeigt die Anwendung `/calendar`“) wird nur über `getAttribute('href')` geprüft; ein Klick und die erreichte Adresse fehlen. Direktaufruf-Szenarien laufen nur auf der Ausgangsseite; der Zyklus (A → B → A) und der Wechsel zwischen zwei Seiten desselben Typs (CODE-02) sind nicht abgedeckt. Der Zeilenvergleich `compareDocumentPosition` (Zeile 43) ist für den Leser kryptisch.
- **Warum problematisch:** Ein Test, der eine Zeile `href` prüft, hätte CODE-01 und CODE-02 nicht gefunden; Gherkin und Test weichen im „Wenn“-Schritt ab.
- **Typisches KI-Ursachenmuster:** Tests spiegeln die Implementierung statt das Verhalten.
- **ADR-/Gherkin-Bezug:** „Zurück zur vorherigen Seite“, „Zurück bei Direktaufruf“; Q-USE-16 nennt zusätzlich axe- und Playwright-Tastaturtest (nicht Teil des Scopes, siehe F).

### CODE-04: Routenwissen doppelt, `targetLabel` schwer lesbar

- **Kategorie:** Duplikation / Verständlichkeit
- **Priorität:** Niedrig
- **Code-Referenz:** `web/src/app/shared/back-link/back-link.ts:5-32`, `web/src/app/app.ts:46-50`; Aufrufer `*-detail.html` (`fallback="/venues"` usw.)
- **Beobachtung:** `OVERVIEWS` wiederholt Pfade und Bezeichnungen der Hauptnavigation aus `app.ts`. Jede der sieben Seiten übergibt den Fallback-Pfad als Zeichenkette, während `DETAILS` dieselbe Zuordnung Pfadsegment → Seitentyp nochmals führt. In `targetLabel` mischt Zeile 31 `??`, Ternär und `split` (zweimal) in einem Ausdruck; `startsWith('/calendar')` träfe auch `/calendarxyz`. Eine vorherige Seite wie `/impressum` oder die Hinweisseite heißt „vorherige Seite“ und nennt damit nicht das Ziel (NAV-UB-9: „zugänglicher Name nennt das Ziel“; der Test legt dies in Zeile 66-69 bewusst fest).
- **Warum problematisch:** Neue Seitentypen oder umbenannte Navigationspunkte müssen an drei Stellen gepflegt werden, ohne dass etwas die Abweichung meldet.
- **Typisches KI-Ursachenmuster:** Bestehende Datenstruktur (`app.ts`-Navigationsliste) ignoriert; Kompaktheit vor Lesbarkeit.
- **ADR-/Gherkin-Bezug:** NAV-UB-9, NAV-EV-2; ADR-022

### CODE-05: Zwei Zugriffsmethoden mit doppeltem Parsen in `NavHistory`

- **Kategorie:** Over-Engineering (geringfügig)
- **Priorität:** Niedrig
- **Code-Referenz:** `web/src/app/core/nav-history.ts:21-28`
- **Beobachtung:** `previous()` (UrlTree) und `previousPath()` (String per Regex) leiten aus demselben Feld ab; `previousPath()` wird nur für die Beschriftung genutzt. Der UrlTree könnte den Pfad liefern, oder eine Methode liefert beides.
- **Warum problematisch:** Zwei Wege zur selben Information; der zweite parst von Hand (`split(/[?#]/)`), obwohl der Router geparst hat.
- **Typisches KI-Ursachenmuster:** Nachträglich ergänzte Hilfsfunktion statt Anpassung der vorhandenen.
- **ADR-/Gherkin-Bezug:** –

### CODE-06: Uneinheitliche Importreihenfolge

- **Kategorie:** Varianz
- **Priorität:** Niedrig
- **Code-Referenz:** `web/src/app/pages/*-detail/*-detail.ts:1` (alle sieben)
- **Beobachtung:** `import { BackLink } …` steht jeweils als erste Zeile vor den `@angular/*`-Imports, im Rest der Dateien stehen Fremdpakete vor relativen Imports (z. B. `venue-detail.ts:2-13`). Auch in `imports: [...]` steht `BackLink` an wechselnder Stelle relativ zu den Nachbarn.
- **Warum problematisch:** Kleine Unruhe im Diff; kein Funktionsproblem. ESLint prüft das nicht (`web/eslint.config.js` ohne Import-Regel).
- **Typisches KI-Ursachenmuster:** Automatisches Einfügen am Dateianfang.
- **ADR-/Gherkin-Bezug:** –

---

## C. Bewusst nicht gemeldet

- **Einbindung in jede Detailseite statt einer Layout-Lösung:** ADR-022 verlangt eine gemeinsame Komponente, kein Layout; sieben Einzeilen-Einbindungen sind gewollt.
- **Kein `sessionStorage`, Verlauf leer nach Neuladen:** ADR-022 / NAV-ST-1.
- **Zielwechsel zwischen zwei Detailseiten springt zurück und vor:** ADR-022, Konsequenzen („Zyklen“).
- **Fehlende Filter-/Scrollwiederherstellung:** ADR-022, ausdrücklich Folgevorhaben.
- **Echter `<a>` mit `routerLink`:** ADR-022.
- **Link nur im Zustand mit geladenem Datensatz (innerhalb `@if`), nicht auf der Hinweisseite:** entspricht NAV-ST-1 (keine Zurück-Verlinkung außerhalb von Detailseiten); Hinweisseite hat laut NAV-EV-1 einen Startseitenlink.
- **Zeichen „‹“ im Linktext:** übernimmt das bestehende Muster der Fotograf:innen-Seite und der Kalenderkopfzeile (`calendar.html:6`).
- **Inline-`styles` in `BackLink`:** auch in `exhibition-badges.ts:28` genutzt.
- **Doppelte Konstante `DETAILS` in Test und Komponente:** getrennte Module mit unterschiedlicher Bedeutung; nur beiläufig, kein Befund.
- **Frühere Sicherheitsanalyse:** `analyse-security.md` ohne Befunde, keine Überschneidung.

---

## D. Abgeleitete Tasks

| Task | Titel | Priorität | Aufwand | Befunde |
|---|---|---|---|---|
| [TASK-01](TASK-01-navhistory-frueh-starten-und-reaktiv.md) (aus `analyse-architecture.md`, deckt beide ab) | NavHistory beim Start erzeugen und reaktiv halten | High | ~1,5 h | CODE-01, CODE-02 (= ARCH-01, ARCH-02) |
| [TASK-02](TASK-02-routenwissen-buendeln.md) (aus `analyse-architecture.md`) | Routenwissen für Zurück-Ziele bündeln | Low | ~1 h | CODE-04 (Duplikation; = ARCH-03) |
| [TASK-03](TASK-03-zurueck-link-tests-verhalten.md) | Zurück-Link-Tests auf Verhalten (Klick, Verdrahtung) umstellen | Medium | ~1 h | CODE-03 |
| [TASK-04](TASK-04-targetlabel-und-verlaufs-api.md) | `targetLabel` lesbar machen und Verlaufs-API vereinfachen | Low | ~30 min | CODE-04 (Lesbarkeit), CODE-05 |
| [TASK-05](TASK-05-importreihenfolge-angleichen.md) | Importreihenfolge in den Detailseiten angleichen | Low | ~10 min | CODE-06 |

---

## E. Meta-Bewertung

- **Gut automatisiert behebbar:** CODE-06; Signal-Umstellung (CODE-02) und Importanforderung (CODE-01) sind kleine, lokale Änderungen.
- **Erfordert menschliche Entscheidung:** TASK-04 – Beschriftung für rechtliche Seiten und Hinweisseite (Entscheidung erforderlich; ggf. Spezifikationsfrage). Die Tabellenfrage liegt bei TASK-02.
- **Empfehlung für künftige KI-Codegenerierung:** Dienste mit Router-Abonnement gehören in `provideAppInitializer` bzw. `app.ts`; Tests sollen Verdrahtung nicht per `TestBed.inject` vorwegnehmen. Eine Regel in `AGENTS.md` („Zustand, der aus Router-Ereignissen entsteht, wird beim Start initialisiert und als Signal geführt“) würde das lenken.

---

## F. Nicht bewertbar

- Laufzeitverhalten im Browser (CODE-01, CODE-02 sind durch Code-Lesen begründet, nicht ausgeführt; Tests/Build wurden nicht gestartet, da das Review nur liest).
- Axe-Lauf und Playwright-Tastaturtest aus Q-USE-16 (liegen nicht im Scope; es wurden keine solchen Tests zum Zurück-Link gefunden).
- Ob in den Daten Verknüpfungen zwischen zwei Seiten desselben Detailtyps vorkommen (relevant für die Gewichtung von CODE-02).
