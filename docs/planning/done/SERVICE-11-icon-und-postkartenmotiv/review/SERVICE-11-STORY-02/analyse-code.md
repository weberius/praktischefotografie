# Code-Review-Analyse: SERVICE-11-STORY-02 – Icon im Kopfbereich vor dem Namen

**Ticket:** SERVICE-11 (Story SERVICE-11-STORY-02)  
**Analysiert:** 2026-10-29  
**Scope:** Teile der Story im Branch-Diff gegen main: `web/src/app/app.html`, `web/src/styles.css` (`.brand`, `.brand-mark`), `web/src/app/app.spec.ts` (Block „Icon im Kopfbereich“)  
**Status:** Entwurf – wartet auf Abnahme  
**Berücksichtigte ADRs / Gherkin:** ADR-002, ADR-003, ADR-017 / `web/markenicon.feature` (Szenarien „Icon im Kopfbereich“, „Icon auf jeder Seite gleich“, „Pfade relativ zum Basispfad“); EARS ICO-UB-3 bis ICO-UB-6; Projektkontext AGENTS.md, README.md, PRD

**Betroffene Dateien:**
- `web/src/app/app.html`
- `web/src/styles.css`
- `web/src/app/app.spec.ts`

---

## A. Zusammenfassung (Executive Summary)

### Gesamtbewertung der menschlichen Nachvollziehbarkeit

Der Produktivcode ist minimal und klar: ein `<img>` im Brand-Link (`app.html:3`) und zwei CSS-Regeln mit erklärendem Kommentar (`styles.css:29-31`). Es gibt keine Abstraktion, keine tote Logik, keine neue Abhängigkeit; alle Vorgaben aus ADR-017 sind erfüllt (leeres Alt, `aria-hidden`, Breite/Höhe, kein `loading="lazy"`, relativer Pfad). Die stillen Fallen liegen ausschließlich im neuen Testblock: ein vierter Kopier-Aufbau derselben Test-Vorbereitung, ein Test, der bei jeder Route dieselbe Wurzelkomponente prüft, und ein Messtest mit Zauberzahl und DOM-Manipulation. Alles Befunde mit niedriger Priorität.

- **Nachvollziehbarkeit:** Hoch
- **Einschätzung:** hybrid – der Testblock folgt dem Muster des Nachbarblocks „Karte füllt die Fläche“ (lokaler Helfer), übernimmt dabei aber auch dessen Duplikation.

---

## B. Konkrete Befunde

### CODE-01: Dritte Kopie des App-Aufbaus im Testblock

- **Kategorie:** Duplikation
- **Priorität:** Niedrig
- **Code-Referenz:** `web/src/app/app.spec.ts:150-159` (`open`), vergleiche `app.spec.ts:93-98` und `app.spec.ts:110-122` (`openMap`)
- **Beobachtung:** `open(url)` wiederholt die Folge `createComponent` → `detectChanges` → `navigateByUrl` → `whenStable` → `detectChanges` → `nativeElement`, die in der Datei bereits zweimal steht (Test „Fußbereich…“ und `openMap`). Jetzt sind es drei nahezu gleiche Kopien.
- **Warum problematisch:** Ändert sich der Aufbau (z. B. neuer Provider, anderes Warten), müssen drei Stellen angepasst werden; die Kopien können unbemerkt auseinanderlaufen.
- **Typisches KI-Ursachenmuster:** Kontextblindheit – Muster des Nachbarblocks kopiert statt auf Dateiebene gehoben.
- **ADR-/Gherkin-Bezug:** –

### CODE-02: „Icon auf jeder Seite gleich“ prüft jedes Mal dieselbe Komponente und baut TestBed neu auf

- **Kategorie:** Verständlichkeit
- **Priorität:** Niedrig
- **Code-Referenz:** `web/src/app/app.spec.ts:200-210`
- **Beobachtung:** Der Test ruft für fünf URLs `TestBed.resetTestingModule()` auf und konfiguriert das Modul inline neu (Zeile 203, Kopie von `app.spec.ts:33`). Geprüft wird aber immer das Icon in `App` (`app.html:3`), das außerhalb des `router-outlet` liegt und von der Route nicht abhängt. Der Test wirkt wie eine Prüfung über fünf Seiten, belegt aber nur, dass die Hülle bei fünf Navigationen gleich bleibt.
- **Warum problematisch:** Die doppelte Modul-Konfiguration muss bei Änderung von `beforeEach` mitgezogen werden. Zudem ist die Aussagekraft schwerer erkennbar; ein Leser vermutet seitenspezifische Köpfe. Das Gherkin-Szenario („Icon auf jeder Seite gleich“) ist damit zwar erfüllt, der Test kann aber aus einer einzigen Instanz mit mehreren `navigateByUrl`-Aufrufen ohne Reset auskommen.
- **Typisches KI-Ursachenmuster:** Wörtliche Übersetzung des Gherkin-Szenarios in eine Schleife, ohne die Architektur (gemeinsame Hülle) zu berücksichtigen.
- **ADR-/Gherkin-Bezug:** `web/markenicon.feature` · „Icon auf jeder Seite gleich“, ICO-UB-3

### CODE-03: Messtest ICO-UB-6 mit Zauberzahl, DOM-Manipulation und fremder Zusicherung

- **Kategorie:** Verständlichkeit
- **Priorität:** Niedrig
- **Code-Referenz:** `web/src/app/app.spec.ts:183-198`
- **Beobachtung:** Der Test misst die Kopfzeilenhöhe mit und ohne Icon, indem er `img.style.display` umschaltet und zurücksetzt; die Schwelle `8` (Pixel) steht ohne Herleitung im Test (Kommentar „wenige Pixel“). Am Ende steht außerdem `expect(img.getAttribute('loading')).toBeNull()` (Zeile 197), das in ICO-UB-6 und im Gherkin nicht vorkommt (stammt aus ADR-017, „kein lazy“). Die Zusicherung `Math.round(rect.width) === 32` (Zeile 189-190) hängt am Standard-Schriftgrad 16 px, weil CSS `2rem` setzt und das HTML `width="32"`; beides ist zwei Mal derselbe Wert in zwei Quellen (siehe auch Abschnitt C).
- **Warum problematisch:** Bei geändertem Root-Schriftgrad oder Brand-Schrift wird der Test unerwartet rot, ohne dass die Zahl 8 erklärt, was gemessen werden soll. Die Lazy-Prüfung steht an einer Stelle, an der man sie nicht sucht, und ist keinem EARS-Eintrag zugeordnet.
- **Typisches KI-Ursachenmuster:** Gold-Plating im Test (Zusicherungen sammeln, ein Test prüft mehrere Dinge).
- **ADR-/Gherkin-Bezug:** ICO-UB-6, ADR-017 („Kein `loading="lazy"`“)

---

## C. Bewusst nicht gemeldet

- Größe doppelt festgelegt (`width="32"`/`height="32"` in `app.html:3` und `2rem` in `styles.css:31`): ausdrücklich so entschieden in ADR-017 („Darstellungsgröße legt CSS fest, Breite und Höhe stehen als Attribute“) und in der Annahme „etwa 2 rem“ (PIPELINE.md). Nur als Hinweis, siehe CODE-03.
- `favicon-96x96.png` als Quelle für das Kopf-Icon und der relative Pfad ohne `/` (`app.html:3`): ADR-017 und ADR-003, ICO-UB-5.
- `alt=""` zusammen mit `aria-hidden="true"` (`app.html:3`): von ICO-UB-4 ausdrücklich gefordert, auch wenn eines allein genügt.
- `flex: none`, `align-items: center`, `gap: 0.5rem` (`styles.css:29-31`): Annahme „Abstand etwa 0,5 rem“ in PIPELINE.md; `inline-flex` verhindert den Zeilenabstand unter dem Bild und ist durch den Kommentar nachvollziehbar.
- Prefix „Szenario:“ bei einzelnen `it` innerhalb des `describe` (`app.spec.ts:149`, `app.spec.ts:200`): entspricht dem Stil der Datei.
- Inline-Format des `<img>` in einer langen Zeile (`app.html:3`): Annahme: bewusst einzeilig, damit kein Leerraum im Linktext entsteht; kein Befund.

---

## D. Abgeleitete Tasks

| Task | Titel | Priorität | Aufwand | Befunde |
|---|---|---|---|---|
| [TASK-21](TASK-21-testaufbau-app-spec-buendeln.md) | Testaufbau im Spec von `App` bündeln und Seitentest vereinfachen | Low | ~30 min | CODE-01, CODE-02 |
| [TASK-22](TASK-22-icon-groessentest-entschlacken.md) | Größentest des Kopf-Icons entschlacken | Low | ~20 min | CODE-03 |

---

## E. Meta-Bewertung

- **Gut automatisiert behebbar:** CODE-01 bis CODE-03 (reine Testumstrukturierung).
- **Erfordert menschliche Architektur-Entscheidung:** keine.
- **Empfehlung für künftige KI-Codegenerierung:** Bei weiteren Blöcken in `app.spec.ts` zuerst einen gemeinsamen Helfer auf Dateiebene verwenden oder anlegen; Test pro EARS-Eintrag ein Verhalten prüfen lassen.

---

## F. Nicht bewertbar

- Visuelle Wirkung (Ausrichtung, Abstände im Browser) und Verhalten unter einem fremden Basispfad wurden nicht gemessen; die Prüfung betraf nur Code und Spezifikation. Kein Befund hängt davon ab.
