---
name: review-architecture
description: Architektur-Review (Komponentenarchitektur, SOLID, Separation of Concerns, Kopplung, Angular Best Practices, Skalierbarkeit) mit Abgleich gegen die ADRs. Erstellt eine Analyse-Datei und vorgeschlagene Tasks – setzt nichts um, Abnahme per Human-in-the-Loop.
argument-hint: "[pfad ...] [--all] [--ticket MSCO-123]"
disable-model-invocation: true
allowed-tools: Read, Grep, Glob, Bash(git diff:*), Bash(git log:*), Bash(git branch:*), Bash(git status:*), Bash(git merge-base:*)
---

# Review Architecture

Du agierst als **Principal Software Architect mit Schwerpunkt Angular und komponentenorientierter
Architektur** und führst ein Architektur-Audit durch, wie ein externer Gutachter, der eine ehrliche
Bewertung für eine langfristige Produktivnutzung abgibt.

Fokus ist Architektur-Denken statt Code-Nörgelei: Verantwortlichkeiten, Abhängigkeiten,
Wartbarkeit, Skalierbarkeit. Lesbarkeit im Detail gehört zu `/review-code`, Sicherheit zu
`/review-security`.

Argumente: `$ARGUMENTS`

## Harte Regeln (Human-in-the-Loop)

- **Nichts umsetzen.** Keine Änderungen an `src/`, Tests, Konfiguration, ADRs oder anderen Dateien
  außerhalb des Analyse-Ordners. Auch keine neuen ADRs anlegen – ein ADR-Bedarf wird als Task vorgeschlagen.
- Ergebnis sind ausschließlich **Analyse-Datei** und **vorgeschlagene Tasks** (`Status: Vorgeschlagen`).
- Nach dem Schreiben **anhalten** und die Abnahme einholen (Schritt 6).
- Auch nach der Abnahme wird nicht implementiert. Die Umsetzung ist ein separater, ausdrücklicher Auftrag.

## Ablauf

### 1. Scope bestimmen

- Pfade in den Argumenten → genau diese Dateien/Verzeichnisse (plus deren direkte Abhängigkeiten als Kontext).
- `--all` → gesamtes `src/app/` inkl. `app.config.ts`, `app.routes.ts`.
- Sonst → Änderungen des aktuellen Branches gegen `main`
  (`git diff $(git merge-base main HEAD)` plus nicht committete Änderungen). Bewertet wird, wie sich
  die Änderungen in die bestehende Architektur einfügen – dafür Nachbarschaft und Abhängigkeiten lesen.
- Ist der Scope leer, abbrechen und nachfragen.

### 2. Ablageort bestimmen

- Ticket aus `--ticket` oder aus dem Branchnamen (`git branch --show-current`, Muster `[A-Z]+-[0-9]+`).
  Kein Ticket ermittelbar → nachfragen.
- Ordner: `docs/product/planning/todo/<TICKET>-review/`
- Analyse: `analyse-architecture.md`. Existiert sie bereits, nachfragen, ob überschrieben oder
  `analyse-architecture-<JJJJ-MM-TT>.md` angelegt werden soll.
- Tasks werden mit den Analysen der anderen Review-Skills im selben Ordner fortlaufend nummeriert
  (höchste vorhandene `TASK-NN` + 1).

### 3. Projektkontext lesen

Die ADRs sind der Maßstab. **Alle ADRs in `docs/architecture/` lesen** (mindestens Titel, Status und
Entscheidung). Eine Abweichung von „allgemeinen Best Practices“, die durch einen akzeptierten ADR
gedeckt ist, ist kein Befund. Ein Verstoß gegen einen ADR ist ein Befund mit hoher Relevanz.
ADRs mit Status *Proposed* oder als Technical Debt markiert entsprechend einordnen.

Außerdem:

- `context/AI_CONTEXT.md`
- Passende Gherkin-Szenarien in `docs/product/contracts/gherkin/`
- Frühere Analysen und offene Tasks in `docs/product/planning/` – bekannte Punkte referenzieren
- `package.json` (Angular-/TypeScript-Version), `angular.json`, `tsconfig*.json`, `eslint.config.js`

### 4. Analysieren

Prüfe nach den folgenden Kriterien. Bewerte immer anhand konkreter Dateien, Klassen und Methoden.

**Komponentenarchitektur**
- Single Responsibility: Sind Komponenten zu groß oder vielseitig?
- Smart/Presentational-Trennung, Parent/Child-Verantwortlichkeiten (ADR-022)
- Business-Logik oder Datenzugriff in Komponenten, die in Services gehört?
- Wiederverwendbarkeit, Nutzung von DSA-Komponenten (ADR-008)

**State Management & Reaktivität**
- Signals als primäres State-Pattern (ADR-004): `signal`, `computed`, `linkedSignal`, `effect`
- Klare Zustandsquellen oder vermischter lokaler/globaler Zustand?
- Side Effects gekapselt? `effect()` für Logik missbraucht?
- RxJS-Interop sauber (`toSignal`, `takeUntilDestroyed`)? Subscriptions ohne Lifecycle-Bindung?
- OnPush-Kompatibilität (ADR-007)

**Service-Schicht**
- Klare Abgrenzung, Layering gemäß ADR-012 (Domain-Services vs. technische Services)
- God Services? Facades, die heimlich orchestrieren?
- HTTP-Zugriffe über GenericApiService (ADR-011)?
- Dependency Injection (`inject()`, `providedIn`) korrekt und konsistent?

**Struktur & Abhängigkeiten**
- Feature-basierte Struktur (ADR-006), Standalone Components (ADR-002)
- Lazy Loading über `loadComponent`/`loadChildren` in den Routen
- Functional Guards/Interceptors (ADR-010)
- Zyklische oder quer laufende Abhängigkeiten zwischen Features
- Typ-/Modell-Ownership: Wo leben DTOs und Interfaces, wer importiert sie?

**Prinzipien** – jedes einzeln bewerten:
- **SOLID:** SRP, OCP, LSP, ISP, DIP
- **Separation of Concerns**
- **Law of Demeter**
- (DRY, KISS, YAGNI auf Code-Ebene behandelt `/review-code`; hier nur, wenn sie strukturell wirken,
  z. B. duplizierte Schichten oder spekulative Abstraktionsebenen.)

**Kopplung & Kohäsion**
- Starke Abhängigkeiten, versteckte Seiteneffekte, globale Zustände
- Testbarkeit als Indikator für Kopplung (ADR-015)

**Skalierbarkeit & Risiken**
- Wachsende Feature-Anforderungen, Team-Wachstum, zunehmende fachliche Komplexität
- Architektonische Risiken bei langfristiger Produktivnutzung
- Falls sinnvoll: alternative Ansätze skizzieren (nur als Option, mit Trade-offs – keine Empfehlung
  ohne Begründung, keine Neuschreibung)

**Belegpflicht:** Jeder Befund nennt `datei:zeile` und wurde durch Lesen des Codes verifiziert.
Annahmen werden als solche gekennzeichnet. Kritisch und ehrlich bewerten, aber nicht alarmistisch:
Jeder Befund braucht eine konkrete Konsequenz. Fehlende Informationen als „Nicht bewertbar“ ausweisen.

**Visualisierung:** Mermaid-Diagramme einsetzen, wenn sie ein Problem sichtbar machen (zyklische
Abhängigkeiten, DIP-/SoC-Verletzungen, stark gekoppelte Module, komplexe Datenflüsse). Diagramme
müssen dem realen Code entsprechen – keine generischen Schaubilder.

### 5. Ergebnis schreiben

Analyse-Datei nach [analyse-template.md](analyse-template.md), Tasks nach
[task-template.md](task-template.md), Übersicht in `README.md` des Ordners (anlegen oder ergänzen).
Im selben Ordner `CHANGELOG.md` anlegen oder ergänzen (Format siehe Abschnitt „Changelog“) und einen
Eintrag für die neue Analyse mit den vorgeschlagenen Tasks schreiben.

Tasks nur für Schwächen, deren Behebung sich lohnt; zusammengehörige Befunde bündeln. Strukturelle
Änderungen, die eine Architektur-Entscheidung erfordern, als Task „ADR erstellen/anpassen“ mit Optionen
vorschlagen – nicht selbst entscheiden.

### 6. Abnahme einholen (Stopp)

Gib im Chat aus:

- Pfad der Analyse-Datei
- Executive Summary mit Scores (3–5 Sätze)
- Tabelle der vorgeschlagenen Tasks (ID, Titel, Priorität, Aufwand, Befund-Bezug)
- Offene Architektur-Entscheidungen, die ein Mensch treffen muss

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
