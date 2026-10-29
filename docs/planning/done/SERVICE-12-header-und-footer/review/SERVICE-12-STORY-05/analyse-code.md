# Code-Review-Analyse: SERVICE-12-STORY-05 Rechtliche Seiten

**Ticket:** SERVICE-12  
**Analysiert:** 2026-10-29  
**Scope:** Branch-Diff gegen main plus nicht committete Änderungen, beschränkt auf Story 05 (`pages/{impressum,datenschutz,haftungsausschluss,quellen}`, `app.routes.ts`, `browser-check.mjs`, Szenario „Rechtliche Seiten (RCH)“ in `app.spec.ts`)  
**Status:** Entwurf – wartet auf Abnahme  
**Berücksichtigte ADRs / Gherkin:** ADR-002, ADR-003, ADR-004, ADR-016, ADR-017 (Rahmen laut Auftrag) / `rechtliches.feature`, `seitenrahmen.feature`

**Betroffene Dateien:**
- `web/src/app/pages/impressum/impressum.{html,ts}`
- `web/src/app/pages/datenschutz/datenschutz.{html,ts}`
- `web/src/app/pages/haftungsausschluss/haftungsausschluss.{html,ts}`
- `web/src/app/pages/quellen/quellen.{html,ts}`
- `web/src/app/app.routes.ts`
- `web/tools/quality/browser-check.mjs`
- `web/src/app/app.spec.ts`

---

## A. Zusammenfassung (Executive Summary)

### Gesamtbewertung der menschlichen Nachvollziehbarkeit

Die Seiten sind kleine, statische Komponenten, die dem bestehenden Muster (`PageMeta` im Konstruktor, `templateUrl`, Lazy-Route) folgen. Es gibt keine Logik, keine Pattern-Mischung und keinen toten Code. Die stillen Fallen liegen in den Inhalten: Betreiberdaten stehen im Impressum doppelt und fest im Test, die Gliederung der vier Seiten ist uneinheitlich, und die Prüfung der Qualitätsszenarios (Q-USE-14) ist nur teilweise automatisiert. Die Impressums-Aussage zur EU-Streitschlichtungsplattform ist möglicherweise veraltet (Entscheidung erforderlich). Die Rechtstexte wurden nicht juristisch bewertet.

- **Nachvollziehbarkeit:** Hoch
- **Einschätzung:** hybrid – konsistent mit der Codebasis, aber Texte und Testdaten sind eher übernommen (Klangland) als an die Seiten angepasst.

---

## B. Konkrete Befunde

### CODE-01: EU-Streitschlichtungsplattform (OS) im Impressum möglicherweise überholt

- **Kategorie:** Semantik
- **Priorität:** Mittel
- **Code-Referenz:** `web/src/app/pages/impressum/impressum.html:20-24` – Abschnitt „EU-Streitschlichtung“
- **Beobachtung:** Der Text verweist auf `https://ec.europa.eu/consumers/odr/` als aktive Plattform. Der Text stammt aus dem Klangland-Impressum (PIPELINE-Annahme). Nach meinem Kenntnisstand wurde die OS-Plattform der EU im Juli 2025 eingestellt (Annahme, nicht verifiziert; kein Netzzugriff).
- **Warum problematisch:** Ein toter bzw. falscher Verweis in einer rechtlichen Pflichtseite bleibt unbemerkt, weil kein Test den Inhalt gegen die Realität prüft. RCH-UB-1 verlangt nur „Hinweise zur Streitbeilegung“.
- **Typisches KI-Ursachenmuster:** Übernahme von Mustertext ohne Aktualitätsprüfung.
- **ADR-/Gherkin-Bezug:** RCH-UB-1, „Impressum nennt den Betreiber“. Bestätigte Annahme betrifft die Betreiberangaben, nicht diesen Absatz.

### CODE-02: Betreiberdaten doppelt im Impressum und fest im Test

- **Kategorie:** Duplikation
- **Priorität:** Niedrig
- **Code-Referenz:** `web/src/app/pages/impressum/impressum.html:3-7` und `:15-19`; `web/src/app/app.spec.ts` (Test „Impressum nennt den Betreiber ohne Platzhalter“)
- **Beobachtung:** Name und Anschrift stehen unter „Angaben gemäß § 5 DDG“ und unter „Redaktionell verantwortlich“ identisch. Der Test wiederholt Name, Straße, Ort, Mail und Domain als Literale. Die Telefonnummer steht unformatiert (`+4917623822294`), der Test prüft nur das Wort „Telefon“, nicht die Nummer.
- **Warum problematisch:** Ändert sich die Anschrift, muss sie an drei Stellen angepasst werden; wird eine vergessen, widersprechen sich zwei Abschnitte derselben Seite. Der Test würde dann nur die geänderte Fassung bestätigen oder bricht an Datenänderungen statt an Fehlern.
- **Typisches KI-Ursachenmuster:** Textübernahme 1:1, Test spiegelt den Text.
- **ADR-/Gherkin-Bezug:** RCH-UB-1

### CODE-03: Q-USE-14 nur teilweise automatisiert geprüft (Überschriftenfolge, Titel, Beschreibung)

- **Kategorie:** Verständlichkeit (Testabsicherung)
- **Priorität:** Mittel
- **Code-Referenz:** `web/src/app/app.spec.ts` – Szenario „Rechtliche Seiten (RCH)“; `haftungsausschluss.ts:11`, `quellen.ts:10`
- **Beobachtung:** Die Schleife über `pages` prüft Klangland-Wörter, genau eine `h1` und `rel="noopener"`. Q-USE-14 nennt zusätzlich „Abschnitte als `h2` in lückenloser Reihenfolge“ (kein `h3` ohne `h2`), eigenen nicht leeren Titel und Meta-Beschreibung. Titel und Beschreibung werden in den vier Seiten zwar gesetzt, aber in der RCH-Gruppe nicht geprüft (nur Heading-Texte in `ADDRESSES` und h2-Liste beim Haftungsausschluss). Die Bezeichnung `target="_blank"` wird nicht geprüft; `rel` ohne `noreferrer` ist laut Q-USE-14 ausreichend.
- **Warum problematisch:** Die Spezifikation verspricht mehr, als der Test absichert; spätere Textänderungen können Titel/Beschreibung entfernen oder Überschriften überspringen, ohne dass ein Test fehlschlägt (`seo-check.mjs` prüft Titel nur nach Build).
- **Typisches KI-Ursachenmuster:** Test deckt die offensichtlichen Gherkin-Zeilen ab, nicht das Quality-Szenario.
- **ADR-/Gherkin-Bezug:** Q-USE-14, Q-SEO-2

### CODE-04: Uneinheitliche Gliederung und Schreibweise der vier Seiten

- **Kategorie:** Varianz
- **Priorität:** Niedrig
- **Code-Referenz:** `datenschutz.html:2,6,19,28,34` (nummerierte Überschriften „1. …“) gegenüber `impressum.html`, `haftungsausschluss.html`, `quellen.html` (ohne Nummern); `quellen.html` (Liste ohne `h2`)
- **Beobachtung:** Nur die Datenschutzerklärung nummeriert ihre `h2`. Der Haftungsausschluss verlangt exakt die Überschriften „Haftung für Inhalte“ usw. (RCH-UB-2), wäre mit Nummern nicht konform; Datenschutz hat keine solche Vorgabe. Die Server-Logfiles werden in Abschnitt 2 und das Hosting in Abschnitt 3 getrennt beschrieben, beide betreffen dieselbe Protokollierung durch GitHub Pages.
- **Warum problematisch:** Gleichartige Seiten folgen zufällig verschiedenen Konventionen; Leser:innen und Wartende können nicht ableiten, welche gilt. Die Doppelung von Logfiles/Hosting kann bei Änderungen auseinanderlaufen.
- **Typisches KI-Ursachenmuster:** Varianz durch Übernahme von Mustertexten aus verschiedenen Quellen.
- **ADR-/Gherkin-Bezug:** RCH-UB-2, RCH-UB-3

### CODE-05: Vier fast identische Seitenkomponenten und lange Seitenliste in `browser-check.mjs`

- **Kategorie:** Duplikation
- **Priorität:** Niedrig
- **Code-Referenz:** `web/src/app/pages/*/{impressum,datenschutz,haftungsausschluss,quellen}.ts`; `web/tools/quality/browser-check.mjs:13`
- **Beobachtung:** Jede Komponente besteht nur aus Selektor, Template und einem `PageMeta.set(...)`-Aufruf. `samplePages` ist eine einzelne Zeile mit 20 Einträgen; die neuen Adressen wurden mitten in die Zeile eingefügt.
- **Warum problematisch:** Gering. Die Komponenten folgen dem Projektmuster (siehe C), die Zeile ist schwer zu diffen und zu erweitern.
- **Typisches KI-Ursachenmuster:** Mechanisches Fortschreiben der Vorlage.
- **ADR-/Gherkin-Bezug:** –

---

## C. Bewusst nicht gemeldet

- Vier eigene Komponenten mit je eigenem `PageMeta`-Aufruf: entspricht dem bestehenden Muster der Seiten (`impressum`, `datenschutz` vorher) und dem Routing mit `loadComponent`; keine Abstraktion nötig (YAGNI).
- Betreiberangaben aus dem Klangland-Impressum, nicht juristisch geprüft, Impressum und Datenschutz „an Klangland angelehnt“: bestätigte Annahmen in `PIPELINE.md`.
- Haftungsausschluss enthält den Hinweis zu recherchierten Angaben; Rücklink „Zum Kalender“ entfällt; Reihenfolge der Fußbereichslinks: bestätigte Annahmen.
- Kein Prerender-/Sitemap-Eintrag in Code: Prerender über `**`-Route und Sitemap aus den Routen (siehe Story-Changelog), von `seo-check.mjs` geprüft.
- Mischung `routerLink` (intern) und `href` mit `target="_blank" rel="noopener"` (extern): sachlich richtig.
- Nicht-juristische Prüfung der Rechtstexte: in den Annahmen vermerkt, kein Befund des Code-Reviews.

---

## D. Abgeleitete Tasks

| Task | Titel | Priorität | Aufwand | Befunde |
|---|---|---|---|---|
| [TASK-21](TASK-21-streitschlichtung-pruefen.md) | Hinweis zur EU-Streitschlichtung im Impressum prüfen und aktualisieren | Medium | ~20 min | CODE-01 |
| [TASK-22](TASK-22-q-use-14-tests-vervollstaendigen.md) | Q-USE-14 im Komponententest vollständig absichern | Medium | ~30 min | CODE-03 |
| [TASK-23](TASK-23-betreiberdaten-und-gliederung-vereinheitlichen.md) | Betreiberdaten und Gliederung der rechtlichen Seiten vereinheitlichen | Low | ~30 min | CODE-02, CODE-04, CODE-05 |

---

## E. Meta-Bewertung

- **Gut automatisiert behebbar:** CODE-03, CODE-05, Teile von CODE-02.
- **Erfordert menschliche Entscheidung:** CODE-01 (Inhalt/Rechtstext), CODE-04 (Nummerierung ja oder nein).
- **Empfehlung für künftige KI-Codegenerierung:** Bei Inhalten aus Vorgängerprojekten das Quality-Szenario Punkt für Punkt in Tests abbilden; Rechtstexte mit Aktualitätsvermerk versehen.

---

## F. Nicht bewertbar

- Aktualität der Rechtsgrundlagen (§ 5 DDG, OS-Plattform) ohne Netzzugriff und juristische Prüfung.
- Vollständigkeit der Quellenliste gegen alle Datenquellen in `data/` (laut Story-Changelog selbst nicht geprüft).
- Laufzeitverhalten (kein Build, kein Test ausgeführt).
