# Phasenanleitung

Menschliche Interaktion gibt es nur an **H1 (Phase 1)** und **H2 (Phase 6)** – siehe `SKILL.md`.
Alle anderen Phasen laufen **autonom** und gehen ohne Rückfrage in die nächste Phase über.
Unklarheiten werden dort als `ANNAHME:` markiert und an H2 vorgelegt. Mit `--gated` wird nach jeder
Phase angehalten.

Ein Lauf endet am nächsten Haltepunkt bzw. nach der Closure.

---

## Phase 0 – Setup

**Ziel:** Ketten-Kopf und Arbeitsumgebung festlegen.

1. Ticket-Key bestimmen: `--ticket` → sonst Branchname (`[A-Z]+-[0-9]+`) → sonst `SERVICE-NN`.
2. Kontext laden: PRD, passende ADRs, bestehende EARS/Gherkin/Quality der voraussichtlich
   betroffenen Bereiche, frühere Planning-Ordner zum selben Thema.
3. Planning-Ordner anlegen: `docs/planning/todo/<TICKET>-<slug>/` (neue Arbeit darf auch
   zunächst in `backlog/` liegen – mit dem Menschen klären).
4. `PIPELINE.md` aus der Vorlage in `SKILL.md` anlegen.

**Modus:** autonom → direkt weiter mit Phase 1. Ticket-Key, Ablageort und betroffene Bereiche werden
an H1 mit vorgelegt.

---

## Phase 1 – Vision: Warum?  · Haltepunkt H1

**Ziel:** Zweck und angestrebtes Ergebnis des Vorhabens eindeutig machen.
**Artefakt:** EPIC-Notiz (bzw. PRD-Abschnitt). Leitfrage: *Warum und wofür entwickeln wir etwas?*

1. Ticketinhalt beschaffen (eingefügter Text bzw. bereitgestellte Jira-/GitHub-Quelle). Kein
   Inhalt → beim Menschen anfordern.
2. Mehrdeutigkeiten, Lücken und implizite Annahmen aufdecken – Technik: [clarification.md](clarification.md).
3. Offene Punkte per `AskUserQuestion` klären; Ungeklärtes als `ANNAHME:` in `PIPELINE.md`.
4. EPIC-Notiz nach `templates/epic.md` (Ziel, Kontext, Abgrenzung, Definition of Done, Risiken)
   als `<TICKET>-<slug>.md` im Ticket-Ordner. EPIC-ID = Ticket-Key. Bezug zum PRD herstellen.
5. Review-Schwelle vereinbaren (Default: kritisch + hoch lösen Rücklauf aus) und in `PIPELINE.md`
   eintragen.
6. **H1:** Freigabe einholen (siehe `SKILL.md`). Bei „Freigegeben" ohne weiteren Halt mit Phase 2
   fortfahren.

H1 ist die **letzte Gelegenheit für Rückfragen vor H2** – deshalb hier gründlich klären: Akteure,
Wert, Abgrenzung, Qualitätserwartungen und harte Leitplanken.

**Checkliste:** Zweck in einem Satz? Angestrebtes Ergebnis/Erfolgskriterium benannt? Abgrenzung
geklärt? Alle `ANNAHME:` markiert?

---

## Phase 2 – UserStory: Welchen Wert wollen wir liefern?  · autonom

**Ziel:** Aus der Vision **wertorientierte, überschaubare Veränderungen** ableiten. Die Story ist die
Brücke zwischen Vision und Spezifikation – sie beschreibt bewusst **noch nicht die Lösung**.

1. Vision in Stories schneiden. **Kleines Ticket = eine Story**; **großes Ticket = mehrere `STORY-NN`**.
2. Je Story nach `templates/story.md`: „Als … möchte ich … damit …", Akzeptanzkriterien (fachlich,
   lösungsneutral), Abhängigkeiten. Keine Task-Liste und keine technischen Festlegungen – die
   entstehen in Phase 3/4.
3. Ablage im Ticket-Ordner: `docs/planning/<backlog|todo>/<TICKET>-<slug>/<TICKET>-STORY-NN-<slug>/<TICKET>-STORY-NN-<slug>.md`.

**INVEST-Checkliste je Story:**
- [ ] **I**ndependent – möglichst unabhängig umsetzbar
- [ ] **N**egotiable – beschreibt Bedarf, nicht die Lösung
- [ ] **V**aluable – klarer Wert für eine benannte Rolle („damit")
- [ ] **E**stimable – Aufwand grob schätzbar
- [ ] **S**mall – überschaubare Veränderung
- [ ] **T**estable – Akzeptanzkriterien prüfbar

> **Rücklauf „Wert/Ziel falsch"** (aus H2 bzw. Review) landet hier: bestehende Story nachschärfen
> (Änderung im Changelog als `RÜCKLAUF` dokumentieren) bzw. – bei neuem Wert – neue Story anlegen.

---

## Phase 3 – Spezifikation: Was muss gelten?  · autonom

**Ziel:** Die Story aus vier Perspektiven präzisieren. Die Sichten sind **keine Sequenz**, sondern
verschiedene Sichten auf dieselbe Veränderung. Alle vier werden in einem Durchgang erarbeitet und
gegenseitig nachgeschärft. Nicht benötigte Sichten werden mit Begründung als „nicht erforderlich"
vermerkt. Bei einem Rücklauf wird gezielt die betroffene Sicht überarbeitet; die übrigen werden nur
auf Konsistenz nachgezogen.

Gemeinsam für alle Sichten:
- Artefakte sind **ticketunabhängig** (keine Ticket-/Story-/Task-IDs, siehe id-contract).
- **Create-or-update:** bestehende Dateien lesen, Änderungen per Supersede/Deprecate.
- Querbezüge zu den anderen Sichten setzen, sobald sie existieren.

### 3 · EARS – Was muss das System leisten?

1. Bereich und Fähigkeit(en) bestimmen. Datei: `docs/ears/<bereich>/<faehigkeit>.md`.
2. Vorlage und Pattern-Codes aus `templates/ears.md` (UB/EV/ST/OP/UN/CX; Req-ID `<KÜRZEL>-<PATTERN>-n`).
3. Bestehende Anforderungen per **Supersede** ändern („`<neu>` ersetzt `<alt>`", Grund).
4. Trace: je Anforderung → Gherkin-Szenario, Quality-Szenario (falls relevant), ADR.

**Checkliste:** ein Systemname, Pattern korrekt, testbar, ≤ 3 Vorbedingungen, Qualitätsanforderungen
**nicht** hier, sondern in der Quality-Sicht; Trace gesetzt; Supersede dokumentiert.

### 3 · Gherkin – Welches beobachtbare Verhalten wird erwartet?

1. Geteilte `.feature` pro Bereich unter `docs/contracts/gherkin/<bereich>/` nach `templates/gherkin.feature`.
2. **Bestehende Szenarien schützen:** nur ändern, wenn die Anforderung sie wirklich ändert.
   Neues Verhalten → neue Szenarien.
3. Jedes Szenario per Kommentar auf EARS-Req-ID(s) beziehen (`# EARS: CHAT-EV-1`).
4. Szenarien so formulieren, dass sie **automatisiert prüfbar** sind (Cucumber/Step-Definitions
   bzw. 1:1 in Tests übersetzbar) – sie sind in Phase 5 Prüfmaßstab.

**Checkliste:** Jede neue/geänderte EARS-Anforderung hat ≥ 1 Szenario? Keine stillen Regressionen?
Given/When/Then sauber getrennt? Automatisierbarkeit gegeben?

### 3 · Quality – Welche Qualitätsanforderungen muss die Lösung erfüllen?

1. Relevante Qualitätsmerkmale bestimmen (ISO 25010 / arc42 Kap. 10: z. B. Performance,
   Zuverlässigkeit, Usability/A11y, Sicherheit, Wartbarkeit, i18n).
2. Datei: `docs/quality/<bereich>/<thema>.md` nach `templates/quality.md`.
3. Je Anforderung ein **Qualitätsszenario** (Quelle, Stimulus, Umgebung, Artefakt, Antwort,
   **messbares Antwortmaß**). Q-ID `Q-<MERKMAL>-n` (z. B. `Q-PERF-1`).
4. Bereichsübergreifende Qualitätsziele: `docs/quality/_global/`.
5. Trace: betroffene EARS-Req-IDs, Prüfverfahren (Test, Lighthouse, axe, Messung, Review).

**Checkliste:** Jedes Szenario hat ein **messbares** Maß? Prüfverfahren genannt? Keine Dopplung mit
EARS? Konflikte mit bestehenden Qualitätszielen benannt?

### 3 · ADR – Welche technischen Entscheidungen und Leitplanken gelten?

1. Ereignisgetrieben: nur bei nicht-trivialer Entscheidung. Neue ADRs autonom mit Status
   **`Proposed`** anlegen; die Bestätigung (`Accepted`) erfolgt an H2. Sonst „nicht erforderlich" begründen
   und relevante **bestehende** ADRs als Leitplanken auflisten.
2. Neue Entscheidung → `docs/architecture/ADR-NNN-slug.md` (nächste freie `NNN`) nach `templates/adr.md`.
3. Invalidiert sie einen bestehenden ADR: alten behalten, `Deprecated`, „ersetzt durch ADR-NNN";
   im neuen rückverweisen.
4. Unter „Auswirkungen" betroffene EARS-Req-IDs, Features und Quality-Szenarien (Q-IDs) nennen.

**Checkliste:** Entscheidung begründet, Alternativen genannt, Konsequenzen, Bezug auf
Qualitätsziele, Supersede verlinkt?

### 3 · Konsistenzcheck (Abschluss der Phase)

Wenn alle vier Sichten erledigt/„nicht erforderlich" sind:
- Jedes Akzeptanzkriterium der Story ist durch EARS **oder** Quality abgedeckt.
- Jede EARS-Anforderung hat ein Gherkin-Szenario; jede Quality-Anforderung ein Prüfverfahren.
- Keine Widersprüche zwischen EARS, Gherkin, Quality und ADRs (inkl. bestehender ADRs).
- Story listet alle betroffenen Req-IDs, Q-IDs, Features und ADRs.

Ergebnis in `PIPELINE.md` („3 Spezifikation · Konsistenz") festhalten. Nicht auflösbare
Widersprüche als Befund notieren (für H2) und mit der plausibelsten Lesart weiterarbeiten.

---

## Phase 4 – Tasks: Was muss konkret getan werden?  · autonom

**Ziel:** Möglichst **atomare und überprüfbare** Tasks – abgeleitet aus **Story + EARS + Gherkin +
Quality + ADR**, nicht aus der Story allein.

1. Je Story Tasks nach `templates/task.md`: `<TICKET>-STORY-NN-TASK-MM-<slug>.md` im Story-Ordner.
2. So klein wie möglich, für sich stehend, aufeinander aufbauend sortiert.
3. Jeder Task nennt: Story, abgedeckte EARS-Req-IDs, umzusetzende/automatisierende Gherkin-Szenarien,
   einzuhaltende Q-IDs (mit Maß), zu beachtende ADRs – und sein **Prüfkriterium** (woran ist der Task
   erledigt?).
4. Fehlt eine Entscheidung, zur ADR-Sicht zurückkehren und dort autonom einen `Proposed`-ADR anlegen
   (oder als `ANNAHME:` festhalten) – nicht implizit im Task entscheiden.

**Checkliste:** Jede EARS- und Q-Anforderung von ≥ 1 Task abgedeckt? Jedes Gherkin-Szenario einem
Task zugeordnet? Prüfkriterium je Task? Reihenfolge baut auf? Kein Task zu groß?

---

## Phase 5 – Implement: Umsetzen und prüfen  · autonom

**Ziel:** Alle Tasks in Reihenfolge umsetzen. **Einzige Phase, die Code (`app/`, `server/`, Skripte) und Tests ändert.**
Die Spezifikation ist hier nicht nur Input, sondern teilweise **Prüfmaßstab**.

Pro Task:
1. Umsetzen (minimal, projektkonform – ADRs/Konventionen beachten).
2. **Gherkin-Szenarien** des Tasks als automatisierte Tests umsetzen bzw. gegen sie prüfen
   (Cucumber/Step-Definitions, wo vorhanden; sonst 1:1 abgeleitete Tests mit Szenarioverweis).
3. **Quality-Maße** prüfen, soweit lokal möglich (Messung, a11y-Check, …); nicht Prüfbares nennen.
4. Unit-Tests (`npm test`) und Lint (`npm run lint`, ESLint mit angular-eslint) im Repo-Root
   **ausführen**, Ergebnisse festhalten.
   E2E-Tests (Playwright) benötigen laufendes Backend/Frontend – nur ausführen,
   wenn verfügbar, sonst als „nicht geprüft" vermerken.
5. Changelog fortschreiben (Format in `SKILL.md`), Task-Status `Umgesetzt`.
6. Ohne Halt mit dem nächsten Task weitermachen; nach dem letzten Task direkt zu Phase 6.

> **Fehlschläge:** Rote Tests/Lint selbstständig beheben, sofern es ein Umsetzungsfehler ist
> (höchstens drei Anläufe je Task). Liegt die Ursache in der Spezifikation (z. B. Szenario
> widerspricht EARS) oder bleibt es rot, **nicht** im Code umgehen und **nicht** nachfragen, sondern
> als Befund dokumentieren und – falls weitere Tasks darauf aufbauen – **vorzeitig zu H2** springen.

---

## Phase 6 – Human in the Loop: Ergebnis gegen Intention prüfen  · Haltepunkt H2

**Ziel:** Der Mensch bewertet das Arbeitsergebnis nicht nur auf Code-Ebene, sondern gegen die
ursprüngliche **Intention** (Vision + Story). Erst ein hier akzeptiertes Ergebnis geht ins Review.

1. Prüfpaket zusammenstellen (vollständige Liste in `SKILL.md` → H2). Da alles seit H1 autonom
   entstanden ist, gehören **alle `ANNAHME:`-Punkte**, `Proposed`-ADRs, nicht Geprüftes und
   vorzeitig gesprungene Probleme ausdrücklich dazu.
2. Per `AskUserQuestion` abfragen: **Akzeptiert** · **Abweichung** · **Verwerfen**.
3. Bei **Abweichung** je Befund die Ursache klassifizieren (gemeinsam mit dem Menschen, nicht raten):

   | Befund | Quelle | Rücklauf nach |
   | --- | --- | --- |
   | Wert/Ziel falsch | User Story nachschärfen | Phase 2 |
   | Anforderung fehlt | EARS ergänzen | Phase 3 · ears |
   | Verhalten unklar | Gherkin ergänzen | Phase 3 · gherkin |
   | Qualität unzureichend | Quality konkretisieren | Phase 3 · quality |
   | Technischer Weg falsch | ADR anpassen | Phase 3 · adr |
   | Umsetzungsfehler | Task korrigieren | Phase 4 bzw. 5 |

4. Befund in `PIPELINE.md` → „Rückläufe" eintragen; Zielphase und nachfolgende Phasen auf `Rücklauf`.
5. **Autonom weiter:** Quelle korrigieren, nachgelagerte Artefakte neu ableiten (Konsistenzcheck →
   Tasks → Implement), dann erneut H2. Bei **Akzeptiert** autonom weiter mit Phase 7.

> **Grundsatz:** Möglichst **nicht einfach den Code korrigieren**. Nur echte Umsetzungsfehler werden
> direkt im Task behoben; alles andere wird zuerst an der Quelle korrigiert.

**Checkliste:** Gegen Vision/Story geprüft (nicht nur Code)? Jeder Befund klassifiziert und einer
Quelle zugeordnet? Rücklauf in `PIPELINE.md` dokumentiert?

---

## Phase 7 – Review: Ergebnis absichern  · autonom

**Ziel:** Übergreifende Absicherung des in Phase 6 akzeptierten Ergebnisses hinsichtlich Code,
Quality, Security und Governance.

1. Voraussetzung prüfen: Phase 6 = `Akzeptiert`. Sonst abbrechen und darauf hinweisen.
2. Die vier Reviews **parallel per Subagent** ausführen (Agent-Tool, ein Subagent je Review, in
   einer Nachricht gestartet). Die Review-Skills sind nicht modell-aufrufbar
   (`disable-model-invocation`); jeder Subagent erhält daher den Auftrag, die jeweilige
   `.claude/skills/review-<art>/SKILL.md` (`<art>` = `code`, `quality`, `security`, `governance`) zu
   lesen und **exakt zu befolgen** – mit `--ticket <TICKET>` als Argument und der dort definierten
   Ausgabedatei unter `docs/planning/todo/<TICKET>-<slug>/review/`. Die Skill-Dateien selbst werden
   nicht verändert. **Existiert ein Review-Skill (noch) nicht**, dieses Review als „nicht verfügbar"
   in `PIPELINE.md` vermerken und an H2 bzw. in der Closure offenlegen – nicht improvisieren.
3. Analyse-Dateien lesen – **nicht** verändern.
4. Findings nach **Severity** triagieren (kritisch/hoch/mittel/niedrig). Die an H1 vereinbarte
   **Review-Schwelle** ist die Abbruchbedingung: nur Findings oberhalb lösen einen Rücklauf aus; der
   Rest wird als „akzeptiert/zurückgestellt" begründet dokumentiert (nicht gelöscht).
5. Rücklauf-relevante Findings mit derselben **Ursachen-Tabelle** wie in Phase 6 einer Quelle
   zuordnen (z. B. fehlende Sicherheitsanforderung → Quality/EARS, Architekturverstoß → ADR/Task).
   Erfordert ein Finding einen **neuen Wert** (über die Story hinaus) → neue Folge-Story (Phase 2).
6. Rückläufe autonom abarbeiten (Quelle korrigieren → neu ableiten → umsetzen), danach erneut **H2**,
   da sich das Ergebnis geändert hat. Höchstens **zwei** automatische Review-Rückläufe; danach
   verbleibende Befunde an H2 zur Entscheidung vorlegen.
7. Keine Findings oberhalb der Schwelle → Review abgeschlossen, autonom weiter mit Closure.

**Checkliste:** Alle vier Reviews berücksichtigt? Severity + Abbruchbedingung dokumentiert?
Findings quellgerecht zugeordnet? Zurückgestellte Findings begründet?

---

## Closure  · autonom

Sind alle Stories eines Tickets `done`:
1. `<TICKET>-CLOSURE.md` nach `templates/closure.md` (Erreichtes, Abweichungen, **Rückläufe und
   korrigierte Quellen**, Erkenntnisse, Follow-ups, empfohlene neue Tickets).
2. Ticket-Ordner nach `docs/planning/done/` verschieben.
3. `PIPELINE.md` abschließen.
