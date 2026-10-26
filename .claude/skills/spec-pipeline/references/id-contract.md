# ID- & Trace-Vertrag

Verbindlicher Ist-Stand im Repo msco-learn. Führend sind die normativen Dokumente unter `docs/`
(Struktur: `AGENTS.md`). Das ausgecheckte msco-wiki unter `wiki/` ist **Lernquelle**, nicht
Spezifikation, und wird hier **nicht** verändert.

## Kette & IDs

```
Ticket (EPIC) = Jira-Key, z. B. EPIC-01
  └─ EPIC-01-STORY-01
       └─ EPIC-01-STORY-01-TASK-01
```

- **EPIC = der Jira-Key.** Es gibt kein separates `EPIC-NNN`.
- **STORY** und **TASK**: zweistellig, fortlaufend **pro Ticket**.
- Kleines Ticket = genau **eine** Story (das Ticket selbst). Großes Ticket = mehrere `STORY-NN`.
- Status wird über den **Ordner** abgebildet (`backlog` / `todo` / `done`), nicht über den Dateinamen.

### Ticketlos (Service-Arbeiten)

Kein Jira-Ticket vorhanden → lokalen Platzhalter-Key `SERVICE-NN` vergeben (fortlaufend, höchste
vorhandene `SERVICE-NN` + 1 über alle Planning-Ordner). Später durch echten Jira-Key ersetzbar.

## Artefakt-Orte (normativ)

| Artefakt | Ort / Schema |
| --- | --- |
| EPIC-Notiz / Story / Task / Changelog / Closure | `docs/planning/<status>/<TICKET>-<slug>/` (Schema: `docs/templates/benennungskonzept.md`) |
| EARS (Anforderung) | `docs/ears/<bereich>/<faehigkeit>.md` (ohne Ticket-Key) |
| Gherkin (Verhalten) | `docs/contracts/gherkin/<bereich>/<name>.feature` |
| Quality (Qualitätsanforderung, arc42) | `docs/quality/<bereich>/<thema>.md` (bereichsübergreifend: `_global/`) |
| ADR (technische Entscheidung) | `docs/architecture/ADR-NNN-slug.md` |
| PRD / Vision | `docs/product/prd.md` |
| Zustandsdatei | `docs/planning/<status>/<TICKET>-…/PIPELINE.md` |

`<bereich>` folgt der Feature-/Menüstruktur der Webapp bzw. dem Systemteil: `chat`, `studio`,
`wiki`, `content` (kuratierte Inhalte), `setup` (Skripte, Workspace), `server`, … (analog zu bestehenden
`docs/ears/` und `docs/contracts/gherkin/`).

## Granularität je Artefakttyp (wichtig)

„Create-or-update pro Bereich" wirkt je Typ **unterschiedlich**:

- **EARS = pro Fähigkeit eine Datei** im Bereichsordner (`<faehigkeit>.md`, Fachkürzel z. B. `DOC`).
  Ticket ändert bestehende Fähigkeit → dieselbe Datei ergänzen bzw. per Supersede ändern. Neue
  Fähigkeit → neue Datei. Ein Ticket kann mehrere EARS-Dateien berühren.
- **Gherkin = geteilte Datei pro Bereich.** Neues Ticket im selben Bereich → **bestehende**
  `.feature` ergänzen/überarbeiten, vorhandene Szenarien nicht brechen.
- **Quality = pro Thema eine Datei** im Bereichsordner (`<thema>.md`, z. B. `performance.md`,
  `barrierefreiheit.md`), bereichsübergreifende Qualitätsziele unter `quality/_global/`.
  Create-or-update wie bei EARS, Änderungen per Supersede.
- **ADR = geteilt, global nummeriert** (`ADR-NNN`, aktuell fortlaufend bis zur höchsten vorhandenen
  Nummer in `docs/architecture/`). Neue Entscheidung → neuer ADR oder bestehenden auf
  `Deprecated` + „ersetzt durch ADR-NNN".

## EARS-Req-IDs

`<KÜRZEL>-<PATTERN>-n` mit fachlichem Kürzel der Fähigkeit und Pattern-Codes
**UB / EV / ST / OP / UN / CX** (siehe `docs/templates/ears.md`). Beispiele:
`CHAT-EV-1`, `PATH-ST-2`, `CARD-UN-1`. **Kein Ticket-Key in der Req-ID.**

## Quality-IDs

`Q-<MERKMAL>-n` mit Merkmalskürzel nach ISO 25010 / arc42 Kap. 10, z. B. `PERF` (Performance),
`REL` (Zuverlässigkeit), `USE` (Usability/A11y), `SEC` (Sicherheit), `MAIN` (Wartbarkeit),
`I18N`. Beispiele: `Q-PERF-1`, `Q-USE-3`. Fortlaufend pro Merkmal **über alle Bereiche**
(höchste vorhandene Nummer + 1). **Kein Ticket-Key in der Q-ID.**

## Trace-Pflicht

Nur **Planungsartefakte** tragen den `<TICKET>`-Key. **EARS, Gherkin, Quality und ADR sind
ticketunabhängig** – sie nennen keine Ticket-, Story-, Task- oder Review-Befund-IDs (auch keine
Tags wie `@msco-123`). Der Bezug zum Ticket läuft nur von der Planung zur Spezifikation:

- **Story** → listet betroffene EARS-Req-IDs, Q-IDs, Gherkin-Features und ADRs (nach Phase 3).
- **Task** → nennt Story, abgedeckte Req-IDs, Gherkin-Szenarien, Q-IDs und zu beachtende ADRs.
- **Changelog** → nennt Tasks bzw. bei Rückläufen die korrigierte Quelle (ID).
- **EARS** → nennt je Anforderung Gherkin-Datei(en)/Szenario, Q-ID(s) und ADR(s) – keine Story/Ticket.
- **Quality** → nennt je Szenario betroffene EARS-Req-IDs und das Prüfverfahren.
- **Gherkin** → referenziert die zugehörige(n) EARS-Req-ID(s) als Kommentar (`# EARS: CHAT-EV-1`).
- **ADR** → nennt betroffene EARS-Req-IDs, Q-IDs und Features unter „Auswirkungen".

## State-Vokabular

Nur `backlog` / `todo` / `done` (Ordner). Keine `inprogress`/`inarbeit`-Ordner.

## ADR-Ablage

ADRs werden ausschließlich in `docs/architecture/ADR-NNN-slug.md` geführt. Das msco-wiki wird
außerhalb dieses Repos gepflegt; eine Übernahme dorthin ist **nicht** Teil dieser Pipeline.
