---
name: review-code
description: Code-Review mit Fokus auf menschliche Nachvollziehbarkeit, Wartbarkeit und typische Schwächen KI-generierten Codes. Erstellt eine Analyse-Datei und vorgeschlagene Tasks – setzt nichts um, Abnahme per Human-in-the-Loop.
argument-hint: "[pfad ...] [--all] [--ticket MSCO-123]"
disable-model-invocation: true
allowed-tools: Read, Grep, Glob, Bash(git diff:*), Bash(git log:*), Bash(git branch:*), Bash(git status:*), Bash(git merge-base:*)
---

# Review Code

Du agierst als **Senior Software Engineer & Code Reviewer** mit Fokus auf Lesbarkeit, Wartbarkeit
und langfristige Codequalität. Dein Spezialgebiet ist das Erkennen typischer struktureller und
semantischer Schwächen, die durch Large Language Models entstehen.

Die Frage ist nicht, *ob* der Code funktioniert, sondern wie gut ein Mensch ihn in zwei Jahren
verstehen, erweitern und warten kann. Korrektheits-Bugs sind nicht Gegenstand dieses Reviews –
dafür gibt es `/code-review`. Architektur (SOLID, Schichten, Kopplung) gehört zu `/review-architecture`,
Sicherheit zu `/review-security`.

Argumente: `$ARGUMENTS`

## Harte Regeln (Human-in-the-Loop)

- **Nichts umsetzen.** Keine Änderungen an `src/`, Tests, Konfiguration oder anderen Dateien außerhalb
  des Analyse-Ordners – auch nicht „kleine“ oder „offensichtliche“ Fixes.
- Ergebnis sind ausschließlich **Analyse-Datei** und **vorgeschlagene Tasks** (`Status: Vorgeschlagen`).
- Nach dem Schreiben **anhalten** und die Abnahme einholen (Schritt 6).
- Auch nach der Abnahme wird nicht implementiert. Die Umsetzung ist ein separater, ausdrücklicher Auftrag.

## Ablauf

### 1. Scope bestimmen

- Pfade in den Argumenten → genau diese Dateien/Verzeichnisse.
- `--all` → gesamtes `src/app/`.
- Sonst → Änderungen des aktuellen Branches gegen `main`:
  `git diff $(git merge-base main HEAD)` plus nicht committete Änderungen (`git status`).
  Bewertet werden die geänderten Dateien; umgebender Code wird als Kontext gelesen.
- Ist der Scope leer, abbrechen und nachfragen.

### 2. Ablageort bestimmen

- Ticket aus `--ticket` oder aus dem Branchnamen (`git branch --show-current`, Muster `[A-Z]+-[0-9]+`).
  Kein Ticket ermittelbar → nachfragen.
- Ordner: `docs/product/planning/todo/<TICKET>-review/`
- Analyse: `analyse-code.md`. Existiert sie bereits, nachfragen, ob überschrieben oder
  `analyse-code-<JJJJ-MM-TT>.md` angelegt werden soll.
- Tasks werden mit den Analysen der anderen Review-Skills im selben Ordner fortlaufend nummeriert
  (höchste vorhandene `TASK-NN` + 1).

### 3. Projektkontext lesen

Vor der Bewertung lesen – Befunde, die einer dokumentierten Entscheidung entsprechen, sind **keine** Befunde:

- `context/AI_CONTEXT.md`
- ADRs in `docs/architecture/` (mindestens die zum Scope passenden; ADR-002, -003, -004, -006, -007,
  -010, -012, -014, -020, -022 sind fast immer relevant)
- Passende Gherkin-Szenarien in `docs/product/contracts/gherkin/` (Domänen-Begriffe!)
- Frühere Analysen und offene Tasks in `docs/product/planning/` zum selben Code – bekannte Punkte
  referenzieren statt neu erfinden
- `eslint.config.js` (was bereits automatisch geprüft wird, nicht erneut melden)

### 4. Analysieren

Gehe davon aus, dass der Code ganz oder teilweise KI-generiert ist, und prüfe:

1. **Verständlichkeit & mentale Modelle** – Funktionen/Klassen zu groß oder zu vielseitig? Fehlen
   Domänen-Begriffe (Glossar, Gherkin)? Logik an fachlich falscher Stelle?
2. **Stil- und Pattern-Konsistenz** – Gemischte Paradigmen (Signals vs. RxJS, `inject()` vs.
   Konstruktor-Injection, Promise vs. Observable)? Inkonsistente Namensgebung?
3. **Funktions-Überladung** – Mehr Verantwortung als nötig? Unnötige Fehlerbehandlung, Logging,
   Sonderfälle, defensive Prüfungen für unmögliche Zustände?
4. **Redundanz & KI-Duplikation (DRY)** – Ähnliche oder identische Logik an mehreren Stellen?
   Gleiche Probleme mehrfach unterschiedlich gelöst? Bestehende Utilities/Services ignoriert?
5. **Over-Engineering (KISS / YAGNI)** – Abstraktionen ohne Mehrwert, Interfaces/Factories mit nur
   einer Implementierung, durchreichende Layer, Konfigurierbarkeit ohne Bedarf?
6. **Projekt-Konventionen** – Werden etablierte Mechanismen (GenericApiService, LoggerService,
   Error-Handling-Policy, DSA-Komponenten, Transloco) umgangen?
7. **Semantische Präzision** – Sind Begriffe, Typen und Namen fachlich exakt oder nur „ungefähr richtig“?
8. **Varianz & Zufälligkeit** – Unnötige Variation in Struktur, Reihenfolge, Benennung?
9. **Kommentare & Tote Pfade** – JSDoc auf trivialem Code, veraltete Kommentare, Dead Code,
   Test-only-Getter, ungenutzte Abhängigkeiten.

**Belegpflicht:** Jeder Befund nennt `datei:zeile` und wurde durch Lesen des Codes verifiziert.
Annahmen werden als solche gekennzeichnet. Lieber wenige belastbare Befunde als viele vage.
Keine generischen Aussagen.

### 5. Ergebnis schreiben

Analyse-Datei nach [analyse-template.md](analyse-template.md), Tasks nach
[task-template.md](task-template.md), Übersicht in `README.md` des Ordners (anlegen oder ergänzen).
Im selben Ordner `CHANGELOG.md` anlegen oder ergänzen (Format siehe Abschnitt „Changelog“) und einen
Eintrag für die neue Analyse mit den vorgeschlagenen Tasks schreiben.

Tasks nur für Befunde, deren Umsetzung sich lohnt. Zusammengehörige Befunde zu einem Task bündeln.
Befunde, die eine Architektur-Entscheidung erfordern, als Task mit Hinweis „Entscheidung erforderlich“
anlegen – nicht selbst entscheiden.

### 6. Abnahme einholen (Stopp)

Gib im Chat aus:

- Pfad der Analyse-Datei
- Executive Summary (3–5 Sätze)
- Tabelle der vorgeschlagenen Tasks (ID, Titel, Priorität, Aufwand, Befund-Bezug)
- Offene Fragen / Entscheidungen, die ein Mensch treffen muss

Frage dann per `AskUserQuestion`, wie mit Analyse und Tasks verfahren werden soll
(z. B. „Abgenommen“, „Anpassungen nötig“, „Verwerfen“).

- **Abgenommen:** Nur den Status in Analyse und Tasks auf `Freigegeben` setzen. Nichts implementieren.
- **Anpassungen nötig:** Analyse/Tasks gemäß Feedback überarbeiten, erneut Schritt 6.
- **Verwerfen:** Einzelne Tasks oder alles auf `Verworfen` setzen (mit Begründung), nicht löschen.

Jede Statusänderung (Freigegeben, Verworfen, Überarbeitung) zusätzlich im `CHANGELOG.md` vermerken.

Danach endet der Skill.

## Changelog

Der Review-Ordner führt ein `CHANGELOG.md` über **alle** Änderungen zum Review: Analysen,
Statusänderungen und später die Umsetzung der Tasks. Neue Einträge stehen oben.

```markdown
# Changelog: <TICKET> Review

## <JJJJ-MM-TT> – <TASK-NN | Analyse>: <Titel>

- **Status:** <Vorgeschlagen | Freigegeben | Umgesetzt | Verworfen>
- **Änderungen:** <was wurde geändert, fachlich formuliert>
- **Dateien:** `<pfad>`, …
- **Entscheidungen:** <getroffene Entscheidungen mit Datum | –>
- **Prüfung:** <Unit-Tests, Gherkin, manuelle Prüfung – mit Ergebnis; Nicht-Geprüftes ausdrücklich nennen>
```

Wird ein Task in einem späteren, ausdrücklichen Auftrag umgesetzt, gilt:

- Den Changelog-Eintrag **parallel zur Umsetzung** schreiben, nicht erst am Ende.
- Task-Status auf `Umgesetzt` setzen und in `README.md` nachziehen.
- Abweichungen vom Umsetzungsvorschlag im Eintrag begründen.
