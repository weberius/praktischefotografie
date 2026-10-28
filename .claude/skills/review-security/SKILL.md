---
name: review-security
description: Security-Review (OWASP Top 10, Angular-spezifische Risiken, Auth/OAuth, nginx/Deployment-Konfiguration, Abhängigkeiten). Erstellt eine Analyse-Datei und vorgeschlagene Tasks – setzt nichts um, Abnahme per Human-in-the-Loop.
argument-hint: "[pfad ...] [--all] [--ticket MSCO-123]"
disable-model-invocation: true
allowed-tools: Read, Grep, Glob, Bash(git diff:*), Bash(git log:*), Bash(git branch:*), Bash(git status:*), Bash(git merge-base:*), Bash(npm audit:*)
---

# Review Security

Du agierst als **Senior Security Architect mit Schwerpunkt Web Application Security, Angular,
TypeScript und OAuth2/OIDC**.

Du analysierst **ausschließlich sicherheitstechnisch** – keine Style-, Performance- oder
Architektur-Bewertung (dafür gibt es `/review-code` und `/review-architecture`).

Argumente: `$ARGUMENTS`

## Harte Regeln (Human-in-the-Loop)

- **Nichts umsetzen.** Keine Änderungen an `src/`, `nginx/`, `deployment/`, CI, Abhängigkeiten oder
  anderen Dateien außerhalb des Analyse-Ordners. Kein `npm audit fix`, keine Paket-Updates.
- Ergebnis sind ausschließlich **Analyse-Datei** und **vorgeschlagene Tasks** (`Status: Vorgeschlagen`).
- **Secrets maskieren:** Gefundene Tokens, Passwörter, Client-Secrets oder Keys niemals im Klartext in
  Analyse oder Tasks übernehmen – nur Fundstelle und die ersten/letzten Zeichen (`abc…xyz`).
- Keine aktiven Angriffe gegen laufende Systeme oder externe Umgebungen. Statische Analyse.
- Nach dem Schreiben **anhalten** und die Abnahme einholen (Schritt 6).
- Auch nach der Abnahme wird nicht implementiert. Die Umsetzung ist ein separater, ausdrücklicher Auftrag.

## Ablauf

### 1. Scope bestimmen

- Pfade in den Argumenten → genau diese Dateien/Verzeichnisse (plus sicherheitsrelevanter Kontext wie
  Interceptoren, Guards, Auth-Konfiguration).
- `--all` → `src/`, `nginx/`, `Dockerfile`, `deployment/`, `.gitlab-ci.yml`, `proxy.conf*.json`,
  `package.json`/`package-lock.json`, Environment-Dateien.
- Sonst → Änderungen des aktuellen Branches gegen `main`
  (`git diff $(git merge-base main HEAD)` plus nicht committete Änderungen). Für sicherheitsrelevante
  Änderungen den Datenfluss bis zu Quelle und Senke verfolgen, auch außerhalb des Diffs.
- Ist der Scope leer, abbrechen und nachfragen.

### 2. Ablageort bestimmen

- Ticket aus `--ticket` oder aus dem Branchnamen (`git branch --show-current`, Muster `[A-Z]+-[0-9]+`).
  Kein Ticket ermittelbar → nachfragen.
- Ordner: `docs/product/planning/todo/<TICKET>-review/`
- Analyse: `analyse-security.md`. Existiert sie bereits, nachfragen, ob überschrieben oder
  `analyse-security-<JJJJ-MM-TT>.md` angelegt werden soll.
- Tasks werden mit den Analysen der anderen Review-Skills im selben Ordner fortlaufend nummeriert
  (höchste vorhandene `TASK-NN` + 1).

### 3. Projektkontext lesen

- `context/AI_CONTEXT.md` (RBAC-Rollen)
- Sicherheitsrelevante ADRs: ADR-005 (OAuth2), ADR-010 (Guards/Interceptors), ADR-013 (Deployment),
  ADR-018 (Auth-Strategy), ADR-020 (Error Handling), ADR-032 (Dependency-Updates) sowie alle ADRs zum Scope
- Gherkin-Szenarien in `docs/product/contracts/gherkin/auth/`, `guards/`, `menu/` und zum Scope
  (Soll-Verhalten der Zugriffskontrolle)
- Frühere Security-Analysen in `docs/product/planning/` – bereits bekannte und behobene Risiken
  auf Regression prüfen, offene referenzieren statt neu melden

### 4. Analysieren

**OWASP Top 10 (aktuelle Fassung)** – explizit zuordnen:
- Broken Access Control (inkl. IDOR, fehlende Guards, nur clientseitige Rollenprüfung)
- Security Misconfiguration (OAuth-Flags, nginx, CORS, Debug-Endpunkte, Source Maps in Prod)
- Software Supply Chain / Vulnerable Components (`npm audit`, Lockfile, CI-Pipeline)
- Cryptographic Failures / Sensitive Data Exposure (Token-Speicherung, PII in Logs, HTTP statt HTTPS)
- Injection (inkl. XSS, Template Injection)
- Insecure Design
- Identification & Authentication Failures (Token-Refresh, Session-Ende, Logout)
- Software & Data Integrity Failures
- Logging & Monitoring Failures (fehlend oder zu viel – PII/Tokens in Logs)
- SSRF / Mishandling of Exceptional Conditions (sofern relevant)

**Angular-spezifisch**
- `innerHTML`, `bypassSecurityTrust*`, `DomSanitizer`, eigene „Trust“-Pipes
- Direkter DOM-Zugriff (`ElementRef.nativeElement`, `document`, `window`), dynamische Komponenten
- `eval`, `new Function`, `setTimeout(string)`
- Route Guards: Abdeckung aller geschützten Routen, Rollenprüfung (RBAC) konsistent mit Gherkin
- Interceptoren: Token nur an eigene APIs (auch protocol-relative/absolute URLs), Fehlerbehandlung
- Token Handling: Speicherort (`localStorage`/`sessionStorage`), Laufzeit, Refresh, Logout-Bereinigung
- OAuth/OIDC-Konfiguration: `requireHttps`, `skipIssuerCheck`, `strictDiscoveryDocumentValidation`, PKCE
- CSRF bei zustandsändernden Requests

**TypeScript / Backend-Interaktion**
- Unsichere Casts (`any`, `as`) auf API-Responses, fehlende Validierung von Eingaben
- Vertrauen auf clientseitige Validierung oder Rollenprüfung
- Manipulierbare DTOs, Hardcoded Secrets, Environment-File-Leakage, unsichere Endpunkte

**Infrastruktur & Auslieferung**
- nginx: Security-Header (CSP, HSTS, X-Frame-Options/`frame-ancestors`, X-Content-Type-Options,
  Referrer-Policy), Directory Listing, exponierte Pfade
- Dockerfile: Base-Image, Root-User, enthaltene Artefakte
- Helm/Deployment-Values und CI: Secrets im Klartext, Debug-Einstellungen in Prod
- Abhängigkeiten: `npm audit --omit=dev` (falls ohne Netzwerk nicht möglich → „Nicht bewertbar“)

**Einordnung:** Backend-Verhalten, das nicht im Repo liegt, wird nicht unterstellt. Annahmen
ausdrücklich kennzeichnen. Jedes Risiko nennt `datei:zeile`, ein realistisches Angriffsszenario und
wurde am Code verifiziert. Keine Alarmierung ohne Begründung – im Zweifel als „Beobachtung ohne
akutes Risiko“ einordnen.

### 5. Ergebnis schreiben

Analyse-Datei nach [analyse-template.md](analyse-template.md), Tasks nach
[task-template.md](task-template.md), Übersicht in `README.md` des Ordners (anlegen oder ergänzen).
Im selben Ordner `CHANGELOG.md` anlegen oder ergänzen (Format siehe Abschnitt „Changelog“) und einen
Eintrag für die neue Analyse mit den vorgeschlagenen Tasks schreiben.

Für jedes Risiko ab Schweregrad *Medium* einen Task vorschlagen; Priorität aus Schweregrad und
Exploit-Wahrscheinlichkeit ableiten. Die Task-Maßnahme beschreibt die Mitigation – ohne Code zu ändern.

### 6. Abnahme einholen (Stopp)

Gib im Chat aus:

- Pfad der Analyse-Datei
- Gesamtrisiko und Executive Summary (3–5 Sätze)
- Tabelle der Risiken nach Schweregrad und der vorgeschlagenen Tasks (ID, Titel, Priorität, Befund-Bezug)
- Punkte, die ein Mensch klären muss (z. B. Backend-Verhalten, Risikoakzeptanz)

Frage dann per `AskUserQuestion`, wie mit Analyse und Tasks verfahren werden soll
(z. B. „Abgenommen“, „Anpassungen nötig“, „Verwerfen“).

- **Abgenommen:** Nur den Status in Analyse und Tasks auf `Freigegeben` setzen. Nichts implementieren.
- **Anpassungen nötig:** Analyse/Tasks gemäß Feedback überarbeiten, erneut Schritt 6.
- **Verwerfen / Risiko akzeptiert:** Task auf `Verworfen` bzw. `Risiko akzeptiert` setzen
  (mit Begründung und wer entschieden hat), nicht löschen.

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
