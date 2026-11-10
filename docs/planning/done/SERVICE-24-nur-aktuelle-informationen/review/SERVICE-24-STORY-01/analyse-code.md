# Code-Review-Analyse: SERVICE-24-STORY-01 – Nur aktuelle Events und Ausstellungen

**Ticket:** SERVICE-24  
**Analysiert:** 2026-11-10  
**Scope:** Änderungen der Story SERVICE-24-STORY-01 gegen `main` (ohne `docs/product/ideen/`)  
**Status:** Entwurf – wartet auf Abnahme  
**Berücksichtigte ADRs / Gherkin:** ADR-002 / `web/aktualitaet.feature`, `web/events.feature`, `web/ausstellungen.feature`

**Betroffene Dateien:**
- `web/src/app/pages/event-list/event-list.ts`, `.html`, `.spec.ts`
- `web/src/app/pages/exhibition-list/exhibition-list.ts`, `.spec.ts`
- `docs/ears/web/aktualitaet.md`
- `docs/contracts/gherkin/web/aktualitaet.feature`
- `docs/quality/web/aktualitaet.md`

Hinweis: Der Skill nennt `context/AI_CONTEXT.md` und `docs/product/…`-Pfade; beides existiert im Repository nicht (siehe F). Der Ausgabeordner wurde auftragsgemäß überschrieben.

---

## A. Zusammenfassung (Executive Summary)

### Gesamtbewertung der menschlichen Nachvollziehbarkeit

Die Änderung ist klein, gut rückverfolgbar (ACT-IDs in Kommentaren und Testnamen) und folgt dem bestehenden Stil. Die stille Falle ist, dass „aktuell“ in den beiden Listen auf zwei verschiedene Arten berechnet wird (`isOver` in der Eventliste, `status !== 'beendet'` in der Ausstellungsliste), obwohl Q-REL-4 ausdrücklich „keine zweite Berechnung“ fordert. Daneben gibt es einen veralteten Seitenbeschreibungstext, Lücken bei der Testabdeckung der Spezifikation (Ausstellungs-Hinweis, Grenzfälle) und kleinere Pflegeschulden in Kommentaren und Gherkin-Formatierung.

- **Nachvollziehbarkeit:** Hoch
- **Einschätzung:** hybrid – konsistent mit der Umgebung, mit kleinen Spuren von Nachziehen nach Muster („Filter einfach angehängt“).

---

## B. Konkrete Befunde

### CODE-01: Zwei Berechnungen für „aktuell“ (Q-REL-4)

- **Kategorie:** Duplikation / Semantik
- **Priorität:** Mittel
- **Code-Referenz:** `web/src/app/pages/event-list/event-list.ts:48` – `!isOver(e, this.today)`; `web/src/app/pages/exhibition-list/exhibition-list.ts:44` – `item.status !== 'beendet'`
- **Beobachtung:** Die Eventliste prüft `isOver` (`exhibition-status.ts`), die Ausstellungsliste leitet den Status ab und vergleicht mit dem String `'beendet'`. Beide sind heute gleichwertig (`endDate < today`), aber an zwei Stellen formuliert. `docs/quality/web/aktualitaet.md` (Q-REL-4) fordert „dieselbe Regel … keine zweite Berechnung“. Zudem steht „beendet“ als Stringliteral im Filter (neben der Konstante `STATUSES` in Zeile 15), und der Filter läuft nach dem `map`, das für beendete Einträge unnötig `kind`/`second` berechnet.
- **Warum problematisch:** Ändert sich die Definition von „aktuell“, müssen zwei Stellen angepasst werden; die Qualitätsvorgabe ist nur dem Wortlaut nach erfüllt. Eine dritte Liste (z. B. Story 02) würde vermutlich eine dritte Variante erzeugen.
- **Typisches KI-Ursachenmuster:** Lokale Lösung je Datei statt Wiederverwendung (Kontextblindheit).
- **ADR-/Gherkin-Bezug:** ACT-UB-1, Q-REL-4

### CODE-02: Testabdeckung der Spezifikation lückenhaft

- **Kategorie:** Verständlichkeit
- **Priorität:** Mittel
- **Code-Referenz:** `web/src/app/pages/exhibition-list/exhibition-list.spec.ts:1` (Kopfkommentar nennt ACT-ST-1), `web/src/app/pages/event-list/event-list.spec.ts:62-77`
- **Beobachtung:** Der Kopfkommentar der Ausstellungs-Spec nennt ACT-ST-1, es gibt aber keinen Test dafür (nur `ACT-UN-1`, `ACT-UB-1` über den Standarddatensatz). Das Szenario „Keine aktuellen Einträge“ ist nur für `/events` (Zeile 74) umgesetzt. Die Grenzfälle aus Q-REL-4 (Ende = gestern/heute/morgen je Liste) sind nur für Events geprüft; für Ausstellungen fehlen sie. Der Kopfkommentar der Event-Spec (Zeile 1) verweist weiter auf das entfernte Szenario „Beendetes Event“ und nicht auf `web/aktualitaet.feature`.
- **Warum problematisch:** Die Rückverfolgbarkeit (Kommentar ↔ Test) stimmt nicht; Q-REL-4 nennt „0 Abweichungen in 3 Grenzfällen je Liste“, belegt ist es nur für eine Liste.
- **Typisches KI-Ursachenmuster:** Spiegelung nur eines der beiden Zwillingsdateien.
- **ADR-/Gherkin-Bezug:** ACT-ST-1, Q-REL-4

### CODE-03: Veralteter Seitenbeschreibungstext

- **Kategorie:** Semantik
- **Priorität:** Niedrig
- **Code-Referenz:** `web/src/app/pages/exhibition-list/exhibition-list.ts:49` – `PageMeta.set(…, '… kommend, laufend, endet bald oder beendet.')`
- **Beobachtung:** Die Meta-Beschreibung bewirbt „beendet“, obwohl die Liste beendete Ausstellungen nun nicht mehr zeigt.
- **Warum problematisch:** Suchmaschinen und Nutzer erhalten eine Aussage, die der Seite widerspricht.
- **Typisches KI-Ursachenmuster:** Nur den unmittelbaren Codepfad angepasst, abhängige Texte übersehen.
- **ADR-/Gherkin-Bezug:** ACT-UB-1/ACT-UB-2

### CODE-04: Nur noch intern genutzte Eigenschaft `today` bleibt `protected`

- **Kategorie:** Dead Code
- **Priorität:** Niedrig
- **Code-Referenz:** `web/src/app/pages/event-list/event-list.ts:29` – `protected readonly today`
- **Beobachtung:** `today` wurde für das Template (`isOver(...)`) `protected`; das Template nutzt es nicht mehr (Verifiziert per Suche in `event-list.html`). Die Ausstellungsliste hält dasselbe Feld `private`.
- **Warum problematisch:** Stilbruch zwischen Zwillingsdateien; suggeriert Template-Nutzung.
- **Typisches KI-Ursachenmuster:** Restbestand nach Entfernen eines Verwenders.

### CODE-05: Gherkin-Datei: Tabellenformat und unscharfe Schritte

- **Kategorie:** Varianz
- **Priorität:** Niedrig
- **Code-Referenz:** `docs/contracts/gherkin/web/aktualitaet.feature:11-17` (Spalten „nicht zu sehen“ nicht ausgerichtet), `:21-24`, `:49-55` (Platzhalter `e-1`, `a-1` ohne Datenbezug)
- **Beobachtung:** Die Beispieltabelle ist uneinheitlich eingerückt; „ein Eintrag mit Ende … in der Liste“ bleibt unscharf; Detailadressen sind feste Platzhalter ohne Datenbeschreibung.
- **Warum problematisch:** Schlechtere Lesbarkeit und Automatisierbarkeit des Vertrags.
- **Typisches KI-Ursachenmuster:** Tabellen von Hand erzeugt, ohne Formatierung.
- **ADR-/Gherkin-Bezug:** ACT-UB-1, ACT-UB-3

---

## C. Bewusst nicht gemeldet

- Überschreiben/Ersetzen von EVT-UB-1, EXH-UB-1, EXH-UB-3 und EVT-UB-4 im Fließtext von `aktualitaet.md`: entspricht dem Supersede-Verfahren aus AGENTS.md.
- Die Kopfkommentare mit Anforderungs-IDs in `.ts`/Specs: projektüblicher Stil.
- Beibehaltung von `.status-beendet` in `styles.css` und `event-detail.html:12`: weiterhin genutzt (ACT-UB-3).
- Doppelte Aufrufe von `statusFilter()` im Filter: bereits zuvor so, nicht Teil der Änderung.
- Korrektheit der Datumsgrenze: Gegenstand von `/code-review`.

---

## D. Abgeleitete Tasks

| Task | Titel | Priorität | Aufwand | Befunde |
|---|---|---|---|---|
| [TASK-01](TASK-01-gemeinsame-aktuell-regel.md) | Eine gemeinsame Regel für „aktuell“ | Medium | ~30 min | CODE-01, CODE-04 |
| [TASK-02](TASK-02-testluecken-schliessen.md) | Testlücken zu ACT-ST-1 und Q-REL-4 schließen | Medium | ~45 min | CODE-02 |
| [TASK-03](TASK-03-texte-und-gherkin-pflegen.md) | Meta-Beschreibung und Gherkin-Format bereinigen | Low | ~20 min | CODE-03, CODE-05 |

---

## E. Meta-Bewertung

- **Gut automatisiert behebbar:** CODE-03, CODE-04, CODE-05, Tests aus CODE-02.
- **Erfordert menschliche Architektur-Entscheidung:** CODE-01 nur insoweit, als der Ort der Regel (`exhibition-status.ts` vs. neues Modul) festzulegen ist – Vorschlag im Task, kleine Entscheidung.
- **Empfehlung für künftige KI-Codegenerierung:** Q-REL-4-artige Vorgaben („keine zweite Berechnung“) im Task als konkretes Prüfkriterium formulieren; bei Zwillingsdateien (Event-/Ausstellungsliste) Änderungen und Tests spiegeln lassen.

---

## F. Nicht bewertbar

- `context/AI_CONTEXT.md` und `eslint.config.js` im Wurzelverzeichnis existieren nicht bzw. wurden nicht gefunden; Lint-Regeln wurden nicht berücksichtigt.
- Skill-Pfade `docs/product/planning`/`docs/product/contracts` existieren nicht; es wurden `docs/planning` und `docs/contracts` gelesen.
- Tests wurden nicht ausgeführt.
