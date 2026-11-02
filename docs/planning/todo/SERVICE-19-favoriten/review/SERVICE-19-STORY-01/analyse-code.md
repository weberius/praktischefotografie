# Code-Review-Analyse: Events favorisieren (SERVICE-19-STORY-01)

**Ticket:** SERVICE-19  
**Analysiert:** 2026-11-02  
**Scope:** `web/src/app/core/favorites.ts`, `web/src/app/shared/favorite-toggle/*`, Favoriten-Änderungen in `web/src/app/pages/{event-list,event-detail,calendar}/*` (laut `git diff` und nicht versionierten Dateien) und `web/src/styles.css`; Spezifikation `docs/ears/web/favoriten.md`, `docs/contracts/gherkin/web/favoriten.feature`, `docs/quality/web/favoriten.md`, `docs/architecture/ADR-023-favoriten-im-speicher-der-sitzung.md`.  
**Status:** Entwurf – wartet auf Abnahme  
**Berücksichtigte ADRs / Gherkin:** ADR-023 (ADR-002, ADR-022 als Kontext) / `web/favoriten.feature`

**Betroffene Dateien:**
- `web/src/app/core/favorites.ts`
- `web/src/app/shared/favorite-toggle/favorite-toggle.ts`, `favorite-toggle.spec.ts`
- `web/src/app/pages/event-list/event-list.{html,ts}`
- `web/src/app/pages/event-detail/event-detail.{html,ts}`
- `web/src/app/pages/calendar/calendar.{html,ts}`
- `web/src/styles.css`

Hinweis: Die im Skill genannten Pfade (`context/AI_CONTEXT.md`, `docs/product/...`) existieren hier nicht. Gelesen wurden `docs/architecture/ADR-023`, die Spezifikation zu Favoriten, `web/src/app/shared/back-link/*` als Vergleich und die Review-Ablage von SERVICE-18 (Vorbild für Befund CODE-05). Frühere Code-Analysen zu diesem Code liegen nicht vor. Der Review-Ordner wird mit ausdrücklicher Anweisung unter `docs/planning/todo/SERVICE-19-favoriten/review/SERVICE-19-STORY-01/` geführt; `README.md` und `CHANGELOG.md` wurden auftragsgemäß nicht angelegt. Build, Tests und Lint wurden nicht ausgeführt.

---

## A. Zusammenfassung (Executive Summary)

### Gesamtbewertung der menschlichen Nachvollziehbarkeit

Die Änderung ist klein, konsistent und folgt ADR-023: ein Dienst mit einem Signal, ein gemeinsamer Umschalter, drei einheitliche Einbindungen, der Filter nutzt dieselbe Menge. Der Dienst ist knapp und gut lesbar. Die stillen Fallen liegen in der Eventliste (Filterzustand lebt anders als der Typfilter, doppelt verschachtelter Hinweis) und im Test, der drei Seiten in einer Datei prüft und Elemente über Textfragmente findet. Außerdem gibt es einen nur für Tests vorhandenen Getter und kleine Unstimmigkeiten bei Benennung und Importreihenfolge.

- **Nachvollziehbarkeit:** Hoch
- **Einschätzung:** hybrid – die Struktur ist diszipliniert, Kommentare nennen Anforderungs-IDs; Reste typischer KI-Muster sind der Test-only-Getter, die Varianz bei Imports und die Spiegelung der Implementierung im Test.

---

## B. Konkrete Befunde

### CODE-01: `Favorites.count` wird nur vom Test gelesen

- **Kategorie:** Dead Code (Test-only-Getter)
- **Priorität:** Niedrig
- **Code-Referenz:** `web/src/app/core/favorites.ts:8`, `web/src/app/shared/favorite-toggle/favorite-toggle.spec.ts:79,83`
- **Beobachtung:** `readonly count = computed(() => this.ids().size)` hat im Produktivcode keinen Leser (`grep` über `web/src` findet `.count()` nur im Test). Der Test nutzt ihn, um den Dienstzustand zu prüfen, statt die sichtbare Anzeige.
- **Warum problematisch:** Öffentliche API ohne Verbraucher suggeriert eine Anzeige „n Favoriten“, die es nicht gibt (YAGNI); der Test koppelt sich an Interna.
- **Typisches KI-Ursachenmuster:** Vorsorglich angelegter Zugriff, damit sich der Test bequem schreiben lässt.
- **ADR-/Gherkin-Bezug:** FAV-UB-3 („nach dem Neuladen keine Favoriten“), prüfbar über die Umschalter.

### CODE-02: Test prüft über Textfragmente und deckt Q-USE-17/Q-SEC-10 nur teilweise ab

- **Kategorie:** Verständlichkeit (Tests)
- **Priorität:** Mittel
- **Code-Referenz:** `web/src/app/shared/favorite-toggle/favorite-toggle.spec.ts:24,29,66-84,90,103-106`
- **Beobachtung:**
  - `toggleOf` findet den Umschalter über `textContent?.includes(': ${title}')`; der Test hängt damit an der Formatierung des versteckten Textes (`: Titel`, `favorite-toggle.ts:7`), nicht am zugänglichen Namen.
  - Die Datei liegt bei der Komponente, testet aber über `RouterTestingHarness` drei Seiten plus Filter der Eventliste (Zeile 85-106 betreffen `EventListPage`). Ein Fehler im Filter erscheint als „FavoriteToggle“-Fehler.
  - „Neuladen“ (Zeile 66-84) ist `resetTestingModule()`, was eine neue Anwendungsinstanz ist, aber kein Beleg, dass Daten nicht aus einem Speicher kommen; `fetch` wird überwacht, XHR, IndexedDB und Tastaturbedienung (Tab, Enter, Leertaste) aus Q-USE-17/Q-SEC-10 werden nicht geprüft. Der `fetch`-Spy zählt nur Aufrufe nach dem Öffnen (Zeile 67-75).
  - Zeile 90 `expect(await settle(harness)).toBe(el)` prüft nur, dass das Routenelement gleich bleibt, ohne dass der Zweck im Test erkennbar ist.
  - Szenario 1 (Zeile 29-39) prüft bei `/calendar` zusätzlich Agenda-Länge gegen Anzahl der Umschalter (Zeile 36-37), nicht aber explizit, dass die Ausstellung keinen hat.
- **Warum problematisch:** Ein Umbenennen des versteckten Textes oder der Liste bricht Tests ohne Verhaltensänderung; umgekehrt bleiben Qualitätsmaße unbelegt.
- **Typisches KI-Ursachenmuster:** Test spiegelt die Implementierung (Textfragment) statt der Spezifikation (zugänglicher Name).
- **ADR-/Gherkin-Bezug:** „Umschalter auf Liste, Detail und Agenda“, „Neuladen entfernt Favoriten“, Q-USE-17, Q-SEC-10; ADR-023 („Ein gemeinsamer Umschalter“).

### CODE-03: Filterzustand „Nur Favoriten“ lebt anders als der Typfilter

- **Kategorie:** Stilbruch / Semantik
- **Priorität:** Niedrig
- **Code-Referenz:** `web/src/app/pages/event-list/event-list.ts:23,25,34-37,42,54-56`, `web/src/app/pages/event-list/event-list.html:13-16`
- **Beobachtung:** Der Typfilter ist ein Query-Parameter (`type`, `input()`, Navigation in `selectType`), „Nur Favoriten“ ist ein lokales `signal(false)`, das im Template per `$any($event.target).checked` gesetzt wird. Die Option geht beim Wechsel zur Detailseite und zurück verloren, der Typfilter nicht. ADR-023 schließt URL-Parameter für die Favoriten-*Menge* aus, äußert sich aber nicht zum Zustand der Filteroption. Das Setzen im Template steht neben der Methode `selectType` im Klassenkörper (zwei Wege für dasselbe Muster „Filter ändern“).
- **Warum problematisch:** Wartende erwarten, dass beide Filter gleich funktionieren; die Unterscheidung ist nirgends begründet. Annahme: Ob der Verlust beim Zurück-Link (ADR-022) gewollt ist, wurde nicht geprüft.
- **Typisches KI-Ursachenmuster:** Pattern-Mischung (URL-Zustand neben lokalem Signal), kürzester Weg ohne Blick auf den Nachbarfilter.
- **ADR-/Gherkin-Bezug:** FAV-UB-4, FAV-ST-1; ADR-023 (offen), ADR-022 (Rückkehr)

### CODE-04: Hinweis in der Eventliste als verschachtelte Fallunterscheidung

- **Kategorie:** Verständlichkeit / Duplikation
- **Priorität:** Niedrig
- **Code-Referenz:** `web/src/app/pages/event-list/event-list.html:19-24`
- **Beobachtung:** Innerhalb von `@if (items().length === 0)` wiederholt ein inneres `@if (onlyFavorites())` das gesamte `<p class="notice" role="status">`; nur der Text unterscheidet sich. Der Text „Keine Favoriten für diese Auswahl.“ trifft zudem auch zu, wenn der Typfilter nichts hergibt, obwohl Favoriten existieren (FAV-ST-1 deckt das ab).
- **Warum problematisch:** Doppelte Markup-Zeile, die bei Änderungen (z. B. Klasse oder `role`) an zwei Stellen gepflegt werden muss.
- **Typisches KI-Ursachenmuster:** Additives Erweitern statt Umformen des bestehenden Blocks.
- **ADR-/Gherkin-Bezug:** FAV-ST-1, „Keine Favoriten“

### CODE-05: Importreihenfolge weicht von der bestehenden Sortierung ab

- **Kategorie:** Varianz
- **Priorität:** Niedrig
- **Code-Referenz:** `web/src/app/pages/event-list/event-list.ts:8` (`core/favorites` nach `core/page-meta`), `web/src/app/pages/event-detail/event-detail.ts:11` (`favorite-toggle` zwischen `back-link` und `data-gate`), `web/src/app/pages/event-detail/event-detail.ts:21` (`imports: [BackLink, FavoriteToggle, RouterLink, DataGate, NotFound]`)
- **Beobachtung:** Die Imports der Nachbarzeilen sind nach Pfad sortiert (`clock`, `data.service`, `exhibition-status`, `models`, `page-meta`; `back-link`, `data-gate`, `not-found`); die neuen Zeilen stehen an wechselnden Positionen. Gleiches Muster wurde bereits bei SERVICE-18 gemeldet.
- **Warum problematisch:** Unnötige Varianz; Diffs und Suche werden unruhiger.
- **Typisches KI-Ursachenmuster:** Einfügen an der nächstliegenden Stelle statt in der Ordnung der Datei.
- **ADR-/Gherkin-Bezug:** –

### CODE-06: Eingabe `title` kollidiert begrifflich mit dem HTML-Attribut; Zustand dreimal abgefragt

- **Kategorie:** Semantik / Varianz
- **Priorität:** Niedrig
- **Code-Referenz:** `web/src/app/shared/favorite-toggle/favorite-toggle.ts:15,7`
- **Beobachtung:** Der Input heißt `title` und meint den Eventtitel; `title` ist zugleich ein globales HTML-Attribut (Tooltip). Eine statische Verwendung `title="…"` auf `<app-favorite-toggle>` würde Angular als Input binden und stillschweigend ein Attribut am Host setzen. Im Template wird `pressed()` dreimal ausgewertet (Symbol, Text, `aria-pressed`).
- **Warum problematisch:** Der Name ist „ungefähr richtig“ (Titel *des Events*), der Konflikt mit dem Attribut wird erst beim Debuggen sichtbar; `eventId` und `title` benennen zwei verschiedene Bezugsgrößen unterschiedlich präzise.
- **Typisches KI-Ursachenmuster:** Naheliegendster Name ohne Prüfung auf Kollision.
- **ADR-/Gherkin-Bezug:** Q-USE-17 (Event im zugänglichen Namen)

---

## C. Bewusst nicht gemeldet

- **Favoritenmenge als `Set` im Signal mit Kopie pro Umschalten** (`favorites.ts:6,14-18`): ADR-023 verlangt „ein Dienst der Wurzel … Signal“; die Kopie ist für immutable Signals nötig.
- **Keine Persistenz, kein Web-Speicher:** ADR-023, FAV-UB-3.
- **`$any($event.target)`** im Template: bestehendes Muster der Seite (`event-list.html:6`); das Projekt hat keine abweichende Regel.
- **Globale CSS-Regeln statt Komponentenstyles** (`styles.css:79-80`): Bestehende gemeinsam genutzte Bausteine wie `.badge` und `.visually-hidden` stehen ebenfalls dort.
- **Hartkodierte deutsche Texte** in `favorite-toggle.ts:7`: In diesem Scope gibt es keine Übersetzungsschicht.
- **Kommentar mit Anforderungs-IDs in `favorites.ts`/`favorite-toggle.ts`:** Verweise auf Spezifikation sind im Projekt üblich (Vergleich `back-link.spec.ts`).
- **`item.kind === 'Event'` im Kalender** (`calendar.html:43`): Das Muster steht im Template bereits (`[dashed]="item.kind === 'Event'"`).

---

## D. Abgeleitete Tasks

| Task | Titel | Priorität | Aufwand | Befunde |
|---|---|---|---|---|
| [CODE-TASK-01](CODE-TASK-01-favoriten-tests-schaerfen.md) | Favoriten-Tests an Verhalten und Qualitätsmaße binden | Medium | ~1,5 h | CODE-02 |
| [CODE-TASK-02](CODE-TASK-02-eventliste-filter-und-hinweis.md) | Eventliste: Filterzustand klären, Hinweis vereinfachen | Low | ~45 min | CODE-03, CODE-04 |
| [CODE-TASK-03](CODE-TASK-03-favoriten-aufraeumen.md) | `count` entfernen, Importreihenfolge angleichen | Low | ~20 min | CODE-01, CODE-05 |
| [CODE-TASK-04](CODE-TASK-04-umschalter-eingabe-benennen.md) | Umschalter: Eingabe präzise benennen, Zustand einmal auswerten | Low | ~20 min | CODE-06 |

---

## E. Meta-Bewertung

- **Gut automatisiert behebbar:** CODE-01, CODE-04, CODE-05, CODE-06 (mechanisch). Importreihenfolge könnte eine ESLint-Regel prüfen (nicht geprüft, ob vorhanden).
- **Erfordert menschliche Entscheidung:** CODE-03 (soll „Nur Favoriten“ in der Adresse stehen oder bewusst flüchtig sein? ggf. ADR-023 ergänzen).
- **Empfehlung für künftige KI-Codegenerierung:** Tests sollen über zugängliche Namen (`getByRole`-artige Abfragen) statt Textfragmenten arbeiten und die Maße der zugehörigen Quality-Szenarien einzeln abdecken. Neue Zustände in Seiten mit Filtern sollen an den vorhandenen Filtermechanismus der Seite angelehnt oder die Abweichung dokumentiert werden.

---

## F. Nicht bewertbar

- Laufzeitverhalten im Browser, axe-Lauf (Q-USE-17), Kontrast und Fokusdarstellung des Umschalters: nicht ausgeführt.
- Ob der Verlust der Option „Nur Favoriten“ beim Zurück-Link gewünscht ist (CODE-03): Produktentscheidung.
- Lint-Konfiguration (`web/eslint.config.js`) wurde nicht vollständig gegengeprüft.
