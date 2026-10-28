---
name: review-compliance
description: Compliance-Review gegen das GBOS (REWE Group Book of Standards) über die gbos-mcp-Schnittstelle. Ermittelt die anwendbaren Kapitel und Regeln (MUST/SHOULD/MAY), prüft deren Compliance-Kriterien gegen Code, Konfiguration und Dokumentation und erstellt eine Analyse-Datei mit Konformität pro Kapitel und vorgeschlagenen Tasks – setzt nichts um, Abnahme per Human-in-the-Loop.
argument-hint: "[pfad ...] [--all] [--ticket MSCO-123] [--chapters gbos-fe,gbos-iam,...]"
disable-model-invocation: true
allowed-tools: Read, Grep, Glob, ToolSearch, mcp__gbos-mcp__listGbosChapters, mcp__gbos-mcp__getGbosChapter, Bash(git diff:*), Bash(git log:*), Bash(git branch:*), Bash(git status:*), Bash(git merge-base:*), Bash(git ls-files:*)
---

# Review Compliance (GBOS)

Du agierst als **Compliance- und IT-Governance-Auditor mit technischem Hintergrund in Angular,
TypeScript, OAuth2/OIDC und Container-Deployments**.

Du prüfst **ausschließlich die Konformität mit dem GBOS (REWE Group Book of Standards)**, das du über
die `gbos-mcp`-Schnittstelle abrufst. Allgemeine Code-, Architektur- oder Security-Bewertungen gehören
zu `/review-code`, `/review-architecture` und `/review-security` und werden dort referenziert, nicht
dupliziert.

Argumente: `$ARGUMENTS`

## Schnittstelle

Server `gbos-mcp` (`https://gbos-mcp.rewe-group.com/mcp`, eingetragen in `.mcp.json`):

| Tool | Zweck |
|---|---|
| `mcp__gbos-mcp__listGbosChapters` | Alle Kapitel mit `chapterId`, Titel, Kurzbeschreibung |
| `mcp__gbos-mcp__getGbosChapter` (`chapterId`) | Vollständiger Kapitelinhalt inkl. aller Regeln |

Aufbau eines Kapitels: Frontmatter mit `id` (z. B. `GBOS-FE-B2B-B2E`), Regelübersicht als Liste
`**MUST|SHOULD|MAY** [Titel](<regel-id>.md)`, danach je Regel ein Abschnitt mit `> [!NOTE]`
(Kernaussage), `Rationale`, optional `Exceptions`, **`Compliance`** (Unterabschnitte **Automated** und
**Manual**) und `References`. Die Regel-ID ist der Link-Name ohne `.md` in Großbuchstaben
(`gbos-fe-framework.md` → `GBOS-FE-FRAMEWORK`).

Sind die Tools nur als „deferred“ gelistet, per `ToolSearch` mit `+gbos` laden. Bietet der Server
weitere Tools an, gilt die Regel „nur lesend“ unten.

## Harte Regeln (Human-in-the-Loop)

- **Nichts umsetzen.** Keine Änderungen an `src/`, `nginx/`, `deployment/`, CI, Abhängigkeiten oder
  anderen Dateien außerhalb des Analyse-Ordners.
- **gbos-mcp nur lesend nutzen.** Nur `listGbosChapters` und `getGbosChapter` (bzw. weitere
  ausschließlich abfragende Tools). Nichts aufrufen, das etwas anlegt, ändert oder einreicht.
- **Keine Regeln erfinden.** Jede bewertete Regel stammt nachweislich aus einer `getGbosChapter`-Antwort
  (Regel-ID, Stufe, Kapitel). Liefert die Schnittstelle nichts oder einen Fehler, wird das als „Nicht
  bewertbar“ dokumentiert, nicht durch eigenes Wissen ersetzt. Verweist eine Regel auf eine andere, die
  in keinem abgerufenen Kapitel steht, wird das unter „Klärungsbedarf“ vermerkt.
- **Secrets maskieren:** Gefundene Tokens, Passwörter, Client-Secrets oder Keys niemals im Klartext in
  Analyse oder Tasks übernehmen – nur Fundstelle und die ersten/letzten Zeichen (`abc…xyz`).
- Ergebnis sind ausschließlich **Analyse-Datei** und **vorgeschlagene Tasks** (`Status: Vorgeschlagen`).
- Nach dem Schreiben **anhalten** und die Abnahme einholen (Schritt 7).
- Auch nach der Abnahme wird nicht implementiert. Die Umsetzung ist ein separater, ausdrücklicher Auftrag.

## Ablauf

### 1. Verbindung prüfen

- `listGbosChapters` aufrufen. Ist der Server nicht verbunden oder schlägt der Aufruf fehl:
  **abbrechen** und den Nutzer bitten, `gbos-mcp` über `/mcp` zu verbinden. Keine Analyse ohne GBOS.

### 2. Scope bestimmen

- Pfade in den Argumenten → genau diese Dateien/Verzeichnisse (plus Kontext, den die
  Compliance-Kriterien verlangen, z. B. `package.json`, `src/index.html`, CI-Konfiguration).
- `--all` → gesamtes Repository (`git ls-files`), Schwerpunkt `src/`, `package.json`, `angular.json`,
  `nginx/`, `Dockerfile`, `deployment/`, `.gitlab-ci.yml`, `docs/`.
- Sonst → Änderungen des aktuellen Branches gegen `main`
  (`git diff $(git merge-base main HEAD)` plus nicht committete Änderungen). Bewertet werden nur Regeln,
  die vom Diff berührt werden; repository-weite Kriterien (z. B. Abhängigkeiten) nur, wenn der Diff sie
  ändert.
- Ist der Scope leer, abbrechen und nachfragen.

### 3. Ablageort bestimmen

- Ticket aus `--ticket` oder aus dem Branchnamen (`git branch --show-current`, Muster `[A-Z]+-[0-9]+`).
  Kein Ticket ermittelbar → nachfragen.
- Ordner: `docs/product/planning/todo/<TICKET>-review/`
- Analyse: `analyse-compliance.md`. Existiert sie bereits, nachfragen, ob überschrieben oder
  `analyse-compliance-<JJJJ-MM-TT>.md` angelegt werden soll.
- Tasks werden mit den Analysen der anderen Review-Skills im selben Ordner fortlaufend nummeriert
  (höchste vorhandene `TASK-NN` + 1).

### 4. Anwendbare Kapitel und Regeln ermitteln

- `--chapters` gesetzt → genau diese `chapterId`s.
- Sonst Kapitel anhand der Kurzbeschreibungen und des Projekttyps auswählen. Das Control Panel ist eine
  **Angular-B2E-Webanwendung** mit OAuth2/OIDC, die REST-Backends konsumiert und per Container/Helm
  ausgeliefert wird. Typischerweise relevant: `gbos-fe`, `gbos-fe-b2b-b2e`, `gbos-ux`, `gbos-iam`,
  `gbos-qa`, `gbos-sde`, `gbos-arch`, `gbos-int`, `gbos-int-rest`, `gbos-ai-swe` sowie Security-Kapitel,
  sofern sie Frontends betreffen. Nicht relevant sind z. B. Vue-, B2C-, Mobile-, Go-, Java/Kotlin-,
  Kafka- oder Data-Kapitel – diese mit Kurzbegründung unter „Nicht anwendbar“ listen. Die Auswahl gegen
  die aktuelle Kapitelliste prüfen, nicht blind übernehmen.
- Jedes ausgewählte Kapitel mit `getGbosChapter` vollständig laden.
- Je Kapitel den Prüfkatalog bilden: Regel-ID, Titel, Stufe (MUST/SHOULD/MAY), Compliance-Kriterien
  (Automated/Manual), Ausnahmen. Regeln, die den Scope nicht betreffen (z. B. reine
  Backend-Anforderungen in einem Querschnittskapitel), als „Nicht anwendbar im Scope“ markieren.

### 5. Projektkontext lesen und prüfen

Kontext:

- `context/AI_CONTEXT.md` (RBAC-Rollen)
- `msco-wiki/operations/informationssicherheit.md`, `berechtigungskonzept.md`,
  `mosaic-governance-und-sicherheit.md`
- ADRs zu den geprüften Themen (u. a. ADR-005 OAuth2, ADR-010 Guards/Interceptors, ADR-013 Deployment,
  ADR-018 Auth-Strategy, ADR-032 Dependency-Updates) – dokumentierte bewusste Abweichungen von einer
  Regel gelten als begründete Abweichung, nicht als stiller Verstoß
- Gherkin-Szenarien in `docs/product/contracts/gherkin/` zum Scope
- Frühere Analysen in `docs/product/planning/` (`analyse-compliance*.md`) – bekannte Abweichungen auf
  Regression prüfen, offene referenzieren statt neu melden

Prüfung je Regel:

- **Automated**-Kriterien wörtlich am Repo prüfen (z. B. Eintrag in `dependencies` der `package.json`,
  Existenz einer Datei) und mit `datei:zeile` belegen.
- **Manual**-Kriterien durch Code-Analyse prüfen, soweit statisch möglich (z. B. hartcodierte Strings,
  Nutzung von DSA-Komponenten). Stichproben als solche kennzeichnen. Was nur im laufenden System
  prüfbar ist (Browser-Devtools, externe Plattformen wie Lokalise), ist „Nicht bewertbar“ mit Hinweis,
  wer es prüfen kann.
- Bewertung:
  - **Erfüllt** – alle Kriterien nachweislich erfüllt
  - **Teilweise erfüllt** – Kriterien nur teilweise oder nur für Teile des Scopes erfüllt
  - **Nicht erfüllt** – Verstoß am Code/an der Konfiguration verifiziert
  - **Begründete Abweichung** – Verstoß, aber durch ADR oder in der Regel genannte Ausnahme gedeckt
  - **Nicht bewertbar** – Nachweis liegt außerhalb des Repos
  - **Nicht anwendbar im Scope**
- Backend- oder Betriebsverhalten, das nicht im Repo liegt, wird nicht unterstellt. Annahmen
  ausdrücklich kennzeichnen. Im Zweifel „Nicht bewertbar“ statt „Nicht erfüllt“.

Konformität pro Kapitel (in Prozent):

- Basis sind die bewertbaren Regeln (ohne „Nicht bewertbar“ und „Nicht anwendbar“).
- Gewichtung: MUST = 3, SHOULD = 2, MAY = 1. Erfüllt und Begründete Abweichung zählen voll,
  Teilweise erfüllt halb, Nicht erfüllt null.
- Zusätzlich die MUST-Quote (erfüllte MUST-Regeln / bewertbare MUST-Regeln) angeben – ein einziger
  verletzter MUST-Eintrag ist auch bei hoher Gesamtquote hervorzuheben.

### 6. Ergebnis schreiben

Analyse-Datei nach [analyse-template.md](analyse-template.md), Tasks nach
[task-template.md](task-template.md), Übersicht in `README.md` des Ordners (anlegen oder ergänzen).
Im selben Ordner `CHANGELOG.md` anlegen oder ergänzen (Format siehe Abschnitt „Changelog“) und einen
Eintrag für die neue Analyse mit den vorgeschlagenen Tasks schreiben.

Projektdateien relativ verlinken (`[src/app/app.config.ts:12](../../../../src/app/app.config.ts)`),
Regeln mit Regel-ID und Kapitel benennen sowie die in der Regel genannten References übernehmen.
Erfüllt mit 🟢, Teilweise erfüllt / Nicht bewertbar mit 🟡, Nicht erfüllt mit 🔴 kennzeichnen.

Kritikalität einer Abweichung: MUST → High (Critical, wenn sicherheits- oder IAM-relevant),
SHOULD → Medium, MAY → Low. Für jede Abweichung ab *Medium* einen Task vorschlagen. Für „Nicht
bewertbar“ bei MUST-Regeln einen Klärungs-Task (Nachweis einholen) vorschlagen, keinen
Umsetzungs-Task.

### 7. Abnahme einholen (Stopp)

Gib im Chat aus:

- Pfad der Analyse-Datei
- Tabelle Konformität pro Kapitel (Prozent, MUST-Quote) und Executive Summary (3–5 Sätze)
- Tabelle der Abweichungen nach Kritikalität und der vorgeschlagenen Tasks (ID, Titel, Priorität,
  Befund-Bezug, Regel-ID)
- Punkte, die ein Mensch klären muss (Nachweise außerhalb des Repos, Ausnahmen beim GBOS-Kapitel-Owner)

Frage dann per `AskUserQuestion`, wie mit Analyse und Tasks verfahren werden soll
(z. B. „Abgenommen“, „Anpassungen nötig“, „Verwerfen“).

- **Abgenommen:** Nur den Status in Analyse und Tasks auf `Freigegeben` setzen. Nichts implementieren.
- **Anpassungen nötig:** Analyse/Tasks gemäß Feedback überarbeiten, erneut Schritt 7.
- **Verwerfen / Ausnahme beantragt:** Task auf `Verworfen` bzw. `Ausnahme beantragt` setzen
  (mit Begründung und wer entschieden hat), nicht löschen.

Jede Statusänderung (Freigegeben, Verworfen, Überarbeitung) zusätzlich im `CHANGELOG.md` vermerken.

Danach endet der Skill.

## Changelog

Der Review-Ordner führt ein `CHANGELOG.md` über **alle** Änderungen zum Review: Analysen,
Statusänderungen und später die Umsetzung der Tasks. Neue Einträge stehen oben.

```markdown
# Changelog: <TICKET> Review

## <JJJJ-MM-TT> – <TASK-NN | Analyse>: <Titel>

- **Status:** <Vorgeschlagen | Freigegeben | Umgesetzt | Verworfen | Ausnahme beantragt>
- **Änderungen:** <was wurde geändert, fachlich formuliert>
- **Dateien:** `<pfad>`, …
- **Entscheidungen:** <getroffene Entscheidungen mit Datum | –>
- **Prüfung:** <Unit-Tests, Gherkin, manuelle Prüfung – mit Ergebnis; Nicht-Geprüftes ausdrücklich nennen>
```

Wird ein Task in einem späteren, ausdrücklichen Auftrag umgesetzt, gilt:

- Den Changelog-Eintrag **parallel zur Umsetzung** schreiben, nicht erst am Ende.
- Task-Status auf `Umgesetzt` setzen und in `README.md` nachziehen.
- Abweichungen vom Umsetzungsvorschlag im Eintrag begründen.
