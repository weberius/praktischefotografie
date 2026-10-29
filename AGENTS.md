# AGENTS.md

Hinweise für KI-Agenten (Claude Code, Copilot u. a.) in diesem Repository. Projektüberblick: [README.md](README.md).

## Dokumentation (`docs/`)

Die Struktur unter `docs/` ist verbindlich. Lege Dokumente nur in den folgenden Verzeichnissen ab und erfinde keine neuen Top-Level-Ordner. Wenn ein neuer Ordner nötig scheint, frage vorher nach.

```
docs/
├── architecture/        Architekturentscheidungen (ADRs) und Architekturbeschreibung
├── product/             Produktvision, PRD und Ideensammlung
├── contracts/           Verhaltensverträge, z. B. Gherkin und API-Schnittstellen
├── discovery/           Recherchen, Analysen, Interviews, Spikes
├── ears/                Anforderungen in EARS-Notation
├── quality/             Qualitätsanforderungen (arc42)
├── templates/           Vorlagen für alle Artefakte des Vorgehensmodells
└── planning/            Umsetzungsplanung, ein Ordner pro Ticket
    ├── backlog/         Noch nicht eingeplant
    ├── todo/            Eingeplant oder in Arbeit
    └── done/            Abgeschlossen
```

### Ablageregeln

| Artefakt | Ort |
|---|---|
| PRD / Vision | `docs/product/prd.md` |
| Idee | `docs/product/ideen/<slug>.md` (Format: [README](docs/product/ideen/README.md)) |
| ADR | `docs/architecture/ADR-NNN-slug.md` (fortlaufende Nummer) |
| EARS-Anforderung | `docs/ears/<bereich>/<faehigkeit>.md` (ohne Ticket-Key) |
| Gherkin-Feature | `docs/contracts/gherkin/<bereich>/<name>.feature` |
| Qualitätsanforderung | `docs/quality/<bereich>/<thema>.md`, bereichsübergreifend in `docs/quality/_global/` |
| Recherche / Analyse | `docs/discovery/<thema>.md` |
| EPIC-Notiz, Story, Task, Changelog, Closure | `docs/planning/<backlog\|todo\|done>/<TICKET>-<slug>/` ([Benennungskonzept](docs/templates/benennungskonzept.md)) |
| Vorlagen | `docs/templates/` (EPIC, Story, Task, EARS, Gherkin, Quality, ADR, Closure, PRD) |

### Konventionen

- **Status über den Ordner:** Ticket-Ordner wandern von `backlog/` über `todo/` nach `done/`. Den Status nicht zusätzlich im Dateinamen führen.
- **Vorlagen referenzieren:** Vorlagen aus `docs/templates/` als Grundlage verwenden, aber nicht in andere Ordner kopieren und dort pflegen.
- **Normative Dokumente:** `ears/`, `contracts/`, `quality/` und `architecture/` beschreiben den gültigen Stand. Sie werden fortgeschrieben und nicht pro Ticket dupliziert.
- **Sprache:** Dokumentation auf Deutsch, Dateinamen in Kleinbuchstaben mit Bindestrichen (`kebab-case`). Ausnahmen: ADRs und Ticket-Keys.
- **Verlinkung:** Innerhalb von `docs/` relativ verlinken.
- **Leere Ordner:** Leere Ordner enthalten eine `.gitkeep`. Sobald der erste Inhalt dazukommt, wird sie gelöscht.

Der Skill [`spec-pipeline`](.claude/skills/spec-pipeline/SKILL.md) arbeitet nach dieser Struktur. Wenn sich die Struktur ändert, müssen dieses Dokument und der Skill gemeinsam angepasst werden.

## Vorgehensmodell

Neue Funktionen entstehen spezifikationsgetrieben nach dem Skill [`spec-pipeline`](.claude/skills/spec-pipeline/SKILL.md). Die Details stehen im Skill und in seinen [Referenzen](.claude/skills/spec-pipeline/references/). Hier ist der Überblick:

```
Vision ──► UserStory ──► Spezifikation ──► Tasks ──► Implement ──► Human in the Loop ──► Review ──► Closure
(Warum?)   (Wert für     ├─ EARS     (Was muss das System leisten?)
            wen?)        ├─ Gherkin  (Welches Verhalten ist beobachtbar?)
                         ├─ Quality  (Welche Qualität muss gelten?)
                         └─ ADR      (Welche Leitplanken gelten?)
```

**Leitprinzip:** Korrigiere die Quelle einer Abweichung, nicht nur deren Ergebnis.

### Einstieg: `spec-intake`

Änderungswünsche werden als Ideen in `docs/product/ideen/` gesammelt (eine Datei pro Idee, Reihenfolge über `prio` im Dateikopf) und mit dem Skill [`spec-intake`](.claude/skills/spec-intake/SKILL.md) verarbeitet (`/spec-intake`, `/spec-intake --idee <slug>` oder `/spec-intake <Freitext>`). Er erstellt EPIC-Notiz, Story, EARS, Gherkin, Quality und ggf. einen ADR (`Proposed`) als Entwurf, ändert keinen Code und stellt keine Rückfragen. Erst `/spec-pipeline` leitet daraus Tasks ab und setzt sie um; der Aufruf gilt als Freigabe von H1. Ohne laufende Pipeline entstehen keine Codeänderungen.

### Phasen

| # | Phase | Leitfrage | Ergebnis | Modus |
|---|---|---|---|---|
| 0 | Setup | – | Ticket-Ordner unter `docs/planning/`, `PIPELINE.md`, Feature-Branch `feature/<TICKET>-<slug>` | autonom |
| 1 | Vision | Warum und wofür? | EPIC-Notiz, Abgrenzung, Review-Schwelle | **Haltepunkt H1** |
| 2 | UserStory | Welchen Wert für wen? | `STORY-NN` (INVEST, lösungsneutral) | autonom |
| 3 | Spezifikation | Was muss gelten? | EARS, Gherkin, Quality, ADR und Konsistenzcheck | autonom |
| 4 | Tasks | Was ist konkret zu tun? | atomare `TASK-MM` mit Prüfkriterium | autonom |
| 5 | Implement | Umsetzen und prüfen | Code, Tests, Lint, Changelog | autonom |
| 6 | Human in the Loop | Entspricht das Ergebnis der Intention? | Akzeptiert oder Abweichung samt Ursache | **Haltepunkt H2** |
| 7 | Review | Ist das Ergebnis abgesichert? | Reviews, Severity-Triage, Rückläufe | autonom |
| – | Closure | – | `<TICKET>-CLOSURE.md`, Ordner nach `done/` | autonom |

### Regeln

- **Nur zwei Haltepunkte:** Der Mensch wird an H1 (Vision) und H2 (Ergebnis) einbezogen. Alle anderen Phasen laufen ohne Rückfrage. Unklarheiten werden als `ANNAHME:` markiert und an H2 vorgelegt.
- **Feature-Branch:** Phase 0 legt automatisch den Branch `feature/<TICKET>-<slug>` an; auf dem Hauptbranch entstehen keine Artefakte. Commit, Push und Merge erfolgen nur auf Wunsch.
- **Prüf-Gate:** Nach jedem Task müssen `npm run build`, `npm test` / `npm run web:test` und `npm run lint:all` grün sein, bevor der nächste Task beginnt.
- **Review je Story:** Phase 5–7 laufen pro Story. Das Review erzeugt zuerst Analysen und vorgeschlagene Tasks; umgesetzt wird erst nach Abnahme (zweite H2-Runde).
- **Code nur in Phase 5:** Alle anderen Phasen ändern ausschließlich Artefakte unter `docs/`.
- **Vier Sichten in Phase 3:** EARS, Gherkin, Quality und ADR sind parallele Sichten auf dieselbe Veränderung, keine Abfolge. Eine nicht benötigte Sicht wird mit Begründung als „nicht erforderlich“ vermerkt.
- **Tasks aus der ganzen Spezifikation:** Tasks werden aus Story, EARS, Gherkin, Quality und ADR abgeleitet, nicht aus der Story allein.
- **Nichts still überschreiben:** Bestehende EARS-, Gherkin-, Quality- und ADR-Inhalte werden per Supersede oder Deprecate geändert. Neue ADRs starten als `Proposed` und werden an H2 auf `Accepted` gesetzt.
- **Ticketunabhängige Spezifikation:** Nur Planungsartefakte tragen den Ticket-Key. EARS, Gherkin, Quality und ADR enthalten keine Ticket-, Story- oder Task-IDs. Die Verweise laufen von der Planung zur Spezifikation.
- **Review nur nach Akzeptanz:** Phase 7 startet erst, wenn das Ergebnis an H2 akzeptiert ist. Review-Befunde lösen höchstens zwei automatische Rückläufe aus.

### Ursachen-Routing bei Abweichungen

| Befund | Quelle korrigieren | Rücklauf nach |
|---|---|---|
| Wert oder Ziel falsch | User Story | Phase 2 |
| Anforderung fehlt | EARS | Phase 3 |
| Verhalten unklar | Gherkin | Phase 3 |
| Qualität unzureichend | Quality | Phase 3 |
| Technischer Weg falsch | ADR | Phase 3 |
| Umsetzungsfehler | Task | Phase 4 bzw. 5 |

### IDs

| Artefakt | Schema | Beispiel |
|---|---|---|
| EPIC | Ticket-Key, ohne Ticket `SERVICE-NN` | `EPIC-01` |
| Story | `<TICKET>-STORY-NN` | `EPIC-01-STORY-01` |
| Task | `<TICKET>-STORY-NN-TASK-MM` | `EPIC-01-STORY-01-TASK-02` |
| EARS-Anforderung | `<KÜRZEL>-<UB\|EV\|ST\|OP\|UN\|CX>-n` | `CHAT-EV-1` |
| Qualitätsszenario | `Q-<MERKMAL>-n` | `Q-PERF-1` |
| ADR | `ADR-NNN` | `ADR-001` |

Verbindlich ist der [ID- und Trace-Vertrag](.claude/skills/spec-pipeline/references/id-contract.md).
