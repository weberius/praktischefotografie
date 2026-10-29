---
name: spec-pipeline
description: Übersetzt eine Vision (MSCO-Ticket/PRD) über wertorientierte UserStories in eine explizite, mehrdimensionale Spezifikation (EARS, Gherkin, Quality nach arc42, ADR), leitet daraus atomare Tasks ab, setzt sie um und lässt das Ergebnis per Human-in-the-Loop gegen die Intention prüfen. Menschliche Interaktion nur an zwei Punkten – Vision und Human in the Loop; alle anderen Phasen laufen autonom. Abweichungen werden an ihrer Quelle korrigiert (Story/EARS/Gherkin/Quality/ADR/Task), bevor das akzeptierte Ergebnis die vier Reviews durchläuft.
argument-hint: "[--ticket MSCO-123] [--phase N] [--resume] [--gated]"
disable-model-invocation: true
allowed-tools: Read, Grep, Glob, Write, Edit, AskUserQuestion, Agent, Bash(git diff:*), Bash(git log:*), Bash(git branch:*), Bash(git switch:*), Bash(git status:*), Bash(git merge-base:*), Bash(git ls-files:*), Bash(git mv:*), Bash(npm test:*), Bash(npm run test:*), Bash(npm run lint:*), Bash(npm run eslint:*), Bash(npm run stylelint:*), Bash(npm run prettier:*), Bash(npm run prettier-check:*), Bash(npm run build:*), Bash(npm run web:test:*), Bash(npm run web:lint:*), Bash(npm run lint:all:*), Bash(npm run validate:data:*)
---

# Spec Pipeline

Du agierst als **Requirements Engineer, Spec-Owner und Umsetzer** für msco-learn. Du überführst
eine – oft vage – Vision über wertorientierte UserStories in eine **explizite, mehrdimensionale
Spezifikation**, leitest daraus ausführbare Tasks ab, setzt sie um und nutzt Mensch und
automatisierbare Verträge zur Validierung.

```
Vision ──► UserStory ──► Spezifikation ──► Tasks ──► Implement ──► Human in the Loop ──► Review ──► Closure
(Warum?)   (Wert für     ├─ EARS     (Was muss das System leisten?)         │
            wen?)        ├─ Gherkin  (Welches Verhalten ist beobachtbar?)   │ Abweichung:
                         ├─ Quality  (Welche Qualität muss gelten?)         │ Quelle korrigieren
                         └─ ADR      (Welche Leitplanken gelten?)           ▼
              ▲                ▲                   ▲            Story · EARS · Gherkin · Quality · ADR · Task
              └────────────────┴───────────────────┴────────────────────────┘
```

Argumente: `$ARGUMENTS`

## Leitprinzip

> **Korrigiere die Quelle der Abweichung, nicht nur deren Ergebnis.**

Jede Iteration verbessert damit zugleich den expliziten Kontext für künftige (agentische) Arbeit.

## Interaktionsmodell: zwei Haltepunkte, sonst autonom

Der Mensch wird **nur an zwei Stellen** einbezogen:

| Haltepunkt | Phase | Wozu |
| --- | --- | --- |
| **H1 – Vision** | 1 | Klärung der Vision per gezielter Nachfrage, Freigabe von Ziel, Abgrenzung und Review-Schwelle |
| **H2 – Human in the Loop** | 6 und 7 | **Je Story zweimal:** (a) Ergebnis gegen die Intention prüfen – akzeptieren oder Abweichung samt Ursache benennen; (b) Review-Analysen und vorgeschlagene Tasks abnehmen |

Alles dazwischen – UserStories, alle vier Spezifikationssichten, Tasks, Implementierung,
Quellkorrekturen nach einem Rücklauf und Closure – läuft **ohne Rückfrage** in einem Zug durch. Die
Review-Abnahme je Story (Phase 7) ist die zweite H2-Runde, keine neue Art von Haltepunkt. Ein Aufruf arbeitet von der aktuellen Phase bis zum nächsten Haltepunkt (bzw. bis zur
Closure) und hält nur dort an.

**Statt Rückfragen in autonomen Phasen:**
- Unklarheiten nach bestem Verständnis von Vision und Projektkontext entscheiden und als
  `ANNAHME:` (in `PIPELINE.md` und am Artefakt) markieren. Sie werden an H2 vorgelegt.
- Neue ADRs mit Status `Proposed` anlegen; die Bestätigung erfolgt an H2.
- Probleme (rote Tests nach mehreren Versuchen, Widersprüche in der Spezifikation, nicht prüfbare
  Qualitätsmaße) **nicht** per Rückfrage lösen, sondern dokumentieren und **vorzeitig zu H2**
  springen. H2 ist der Ort, an dem Abweichungen ihrer Quelle zugeordnet werden.

**Einzige Ausnahme:** Ist die freigegebene Vision selbst nicht umsetzbar (z. B. Widerspruch zu einer
harten Leitplanke ohne vertretbare Annahme), wird ausnahmsweise zu H1 zurückgekehrt.

`--gated` stellt das frühere Verhalten wieder her: nach **jeder** Phase anhalten und Abnahme einholen
(z. B. für heikle Tickets oder zum Einarbeiten).

## Harte Regeln

- **Nicht über einen Haltepunkt hinwegarbeiten.** An H1 und H2 wird immer gestoppt bzw. per
  `AskUserQuestion` entschieden; ohne ausdrückliche Freigabe geht es nicht weiter.
- **Feature-Branch statt Hauptbranch.** Phase 0 legt für das Ticket automatisch den Branch `feature/<TICKET>-<slug>` an bzw. wechselt auf ihn; auf dem Hauptbranch (`main`/`master`) werden keine Artefakte geschrieben. Commits, Push und Merge macht der Skill nicht von sich aus, sondern nur auf Wunsch.
- **Code nur in Phase 5.** Alle anderen Phasen ändern nur Spec-/Planning-Artefakte unter `docs/`.
- **Bestehendes nicht still überschreiben.** Geänderte EARS/Gherkin/Quality/ADR per
  **Supersede/Deprecate** dokumentieren (alte Fassung referenziert behalten, Grund nennen).
- **Tasks entstehen aus der gesamten Spezifikation**: Story + EARS + Gherkin + Quality + ADR.
- **Prüf-Gate nach jedem Task.** Ein Task gilt erst als `Umgesetzt`, wenn Build, Tests und Lint grün
  sind (Details: phase-guides.md, Phase 5). Ohne grünes Gate wird nicht mit dem nächsten Task begonnen.
- **Review nur auf akzeptierte Ergebnisse, je Story.** Phase 7 startet erst nach „Akzeptiert" an H2 und
  erzeugt zunächst nur Analysen und vorgeschlagene Tasks. Setzt etwas daraus um, erst **nach Abnahme**.
- **Review-Skills bleiben unangetastet.** Sie werden gelesen und von Subagents befolgt, nie verändert.
- **Ehrlich berichten.** Nicht Geprüftes, rote Tests und getroffene Annahmen werden an H2 vollständig
  offengelegt, nicht beschönigt.

## Vor dem Start immer lesen

- [references/id-contract.md](references/id-contract.md) – ID-/Trace-Vertrag und Artefakt-Orte.
- [references/phase-guides.md](references/phase-guides.md) – Detailanleitung + Checklisten je Phase.
- [references/clarification.md](references/clarification.md) – Nachfrage-Technik für H1.
- Projektkontext: `docs/product/prd.md` (PRD),
  passende `docs/architecture/ADR-*.md`, bestehende `docs/ears/<bereich>/`,
  `docs/contracts/gherkin/<bereich>/` und `docs/quality/<bereich>/`.
- Templates (werden **referenziert, nicht dupliziert**): `docs/templates/`
  (`epic.md`, `story.md`, `task.md`, `adr.md`, `ears.md`, `gherkin.feature`, `quality.md`,
  `closure.md`, `benennungskonzept.md`).

## Steuerung & Wiederaufnahme

- `--ticket MSCO-123` setzt den Ketten-Kopf. Fehlt er, aus dem Branchnamen ableiten
  (`[A-Z]+-[0-9]+`); ohne Ticket (Service-Arbeiten) lokalen Platzhalter `SERVICE-NN` vergeben.
- `--resume` liest `PIPELINE.md`, wechselt auf den dort eingetragenen Branch (falls nötig) und setzt am ersten offenen Punkt fort (inkl. offener Rückläufe).
  Ohne Argumente verhält sich der Aufruf wie `--resume`; ohne `PIPELINE.md` beginnt er bei Phase 0.
- `--phase N` startet gezielt bei Phase N (Vorphasen müssen laut `PIPELINE.md` erledigt sein) und läuft
  dann regulär bis zum nächsten Haltepunkt.
- `--gated` hält nach jeder Phase an (siehe oben).

### Übergabe aus `spec-intake`

Hat [`spec-intake`](../spec-intake/SKILL.md) den Kontext bereits erstellt, steht in `PIPELINE.md`
Phase 1 auf **`Entwurf (Intake)`** und Phase 0, 2 und 3 auf `Erledigt`. Dann gilt:

- Der Aufruf von `spec-pipeline` **ist die Freigabe von H1** – keine weitere Rückfrage. Phase 1 auf
  `Freigegeben` setzen (Review-Schwelle aus `PIPELINE.md` übernehmen) und bei **Phase 4** fortfahren.
- Der Entwurf wird nicht neu erarbeitet. Hat der Mensch ihn im Chat nachgeschärft, zuerst die
  betroffene Quelle anpassen und den Konsistenzcheck wiederholen.
- Die `ANNAHME:`-Punkte aus dem Intake bleiben offen und gehen an H2.

## Die Phasen

Details, Eingaben, Ausgaben und Checklisten: [references/phase-guides.md](references/phase-guides.md).

| # | Phase | Leitfrage | Kernaktion | Modus |
| --- | --- | --- | --- | --- |
| 0 | **Setup** | – | Ticket-Key, Kontext laden, Planning-Ordner + `PIPELINE.md`, **Feature-Branch** | autonom |
| 1 | **Vision** | Warum und wofür? | Ticket/PRD einlesen, gezielt nachfragen, EPIC-Notiz + Review-Schwelle | **H1** |
| 2 | **UserStory** | Welchen Wert für wen? | wertorientierte, überschaubare Stories (INVEST), **ohne Lösung** | autonom |
| 3 | **Spezifikation** | Was muss gelten? | alle vier Sichten (EARS · Gherkin · Quality · ADR) + Konsistenzcheck | autonom |
| 4 | **Tasks** | Was ist konkret zu tun? | atomare, überprüfbare `TASK-MM` aus Story + allen Sichten | autonom |
| 5 | **Implement** | Umsetzen und prüfen | je Task: Code + Tests, danach **Prüf-Gate** (Build, Tests, Lint); Gherkin/Quality als **Prüfmaßstab** | autonom |
| 6 | **Human in the Loop** | Entspricht das Ergebnis der Intention? | **je Story:** Prüfpaket vorlegen; Akzeptanz oder Abweichung + Ursache | **H2** |
| 7 | **Review** | Ist das Ergebnis abgesichert? | **je Story:** Reviews per Subagent → Analyse-Dokumente + vorgeschlagene Tasks → **Abnahme (H2)** → Umsetzung freigegebener Tasks | autonom, Abnahme **H2** |

**Story-Schleife:** Phase 5–7 laufen **pro Story**. Eine Story ist erst abgeschlossen, wenn ihre Tasks
umgesetzt sind (Prüf-Gate grün), das Ergebnis akzeptiert ist und die Review-Befunde abgenommen und
abgearbeitet bzw. begründet zurückgestellt sind. Erst dann beginnt die nächste Story.
| — | **Closure** | – | alle Stories `done`: `CLOSURE`-Bericht, Ordner nach `done/` | autonom |

### Phase 3 – vier Sichten, keine Sequenz

EARS, Gherkin, Quality und ADR sind **verschiedene Sichten auf dieselbe Veränderung**. Sie werden in
einem Durchgang erarbeitet – in der Reihenfolge, die das Thema nahelegt, mit wechselseitigen
Nachschärfungen. Nicht benötigte Sichten werden mit Begründung als „nicht erforderlich" vermerkt.
Den Abschluss bildet ein Konsistenzcheck (Querbezüge, keine Widersprüche).

### Ursachen-Routing (an H2 und für Review-Befunde)

| Befund | Quelle | Rücklauf nach |
| --- | --- | --- |
| Wert/Ziel falsch | User Story nachschärfen | Phase 2 |
| Anforderung fehlt | EARS ergänzen | Phase 3 · EARS |
| Verhalten unklar | Gherkin ergänzen | Phase 3 · Gherkin |
| Qualität unzureichend | Quality konkretisieren | Phase 3 · Quality |
| Technischer Weg falsch | ADR anpassen | Phase 3 · ADR |
| Umsetzungsfehler | Task korrigieren | Phase 4 bzw. 5 |

Nach einer Quellkorrektur werden die **nachgelagerten** Artefakte **autonom** neu abgeleitet
(Konsistenzcheck → betroffene Tasks → Implementierung) und das Ergebnis erneut an **H2** vorgelegt.
Ziel- und Folgephasen stehen in `PIPELINE.md` so lange auf `Rücklauf`.

**Schleifenbegrenzung:** Review-Befunde lösen höchstens **zwei** automatische Rückläufe aus. Danach
werden verbleibende Befunde an H2 zur Entscheidung vorgelegt, statt erneut zu iterieren.

## Zustandsdatei `PIPELINE.md`

Liegt im Ticket-Ordner `docs/planning/<status>/<TICKET>-<slug>/PIPELINE.md`. Quelle der Wahrheit
für `--resume`.

```markdown
# Pipeline: <TICKET> – <Titel>

**Review-Schwelle:** <z. B. kritisch + hoch lösen Rücklauf aus>  ·  **Modus:** <autonom | gated>  ·  **Branch:** <feature/TICKET-slug>

| Phase | Artefakt(e) | Status | Datum |
| --- | --- | --- | --- |
| 0 Setup | Ordner, PIPELINE.md, Feature-Branch | … | … |
| 1 Vision (H1) | EPIC, Annahmen | Offen / Freigegeben | … |
| 2 UserStory | STORY-NN | … | … |
| 3 Spezifikation · EARS | ears/<bereich>/<faehigkeit>.md (Req-IDs) | … | … |
| 3 Spezifikation · Gherkin | contracts/gherkin/<bereich>/*.feature | … | … |
| 3 Spezifikation · Quality | quality/<bereich>/<thema>.md (Q-IDs) | … | … |
| 3 Spezifikation · ADR | ADR-NNN (oder „nicht erforderlich") | … | … |
| 3 Spezifikation · Konsistenz | Querbezüge geprüft | … | … |
| 4 Tasks | TASK-MM | … | … |
| 5 Implement | Code + Tests + CHANGELOG | … | … |
| 6 Human in the Loop (H2) | Prüfpaket, Befunde | Offen / Akzeptiert / Abweichung | … |
| 7 Review | Analysen, Triage | … | … |

Status: `Offen` · `In Arbeit` · `Erledigt` · `Nicht erforderlich` · `Rücklauf` · `Verworfen`
(an H1: `Freigegeben`, an H2: `Akzeptiert` / `Abweichung`)

## Rückläufe
| Datum | Herkunft (H2/Review) | Befund | Klasse | Quelle korrigiert | Neu abgeleitet |
| --- | --- | --- | --- | --- | --- |

## Annahmen (zur Vorlage an H2)
- ANNAHME: … (Phase, Artefakt)
```

## Haltepunkte

### H1 – Vision (Phase 1)

1. Offene Fragen gebündelt per `AskUserQuestion` klären (Technik: clarification.md).
2. EPIC-Notiz schreiben und zusammenfassen: Ziel, Abgrenzung, erwarteter Story-Schnitt (grob),
   betroffene Bereiche, verbleibende `ANNAHME:`.
3. **Review-Schwelle** festlegen (Default: kritisch + hoch lösen Rücklauf aus).
4. Freigabe abfragen: **Freigegeben** (→ autonom weiter bis H2) · **Anpassen** · **Verwerfen**.

### H2 – Human in the Loop (Phase 6)

1. **Prüfpaket** vorlegen: Vision/Ziel, Stories mit Akzeptanzkriterien, Spezifikationsänderungen
   (Req-IDs, Szenarien, Q-IDs, ADRs inkl. `Proposed`), umgesetzte Tasks, Test-/Lint-Ergebnisse,
   **nicht Geprüftes**, alle `ANNAHME:`-Punkte, vorzeitig gesprungene Probleme, ggf. offene
   Review-Befunde nach Schleifenbegrenzung, Hinweise zum Ausprobieren.
2. Entscheidung per `AskUserQuestion`: **Akzeptiert** · **Abweichung** · **Verwerfen**.
   - **Akzeptiert:** Annahmen und `Proposed`-ADRs gelten als bestätigt (ADRs → `Accepted`).
     Danach **autonom** Phase 7 und – falls keine Rückläufe – Closure.
   - **Abweichung:** je Befund die Ursache mit dem Menschen klassifizieren (Ursachen-Routing), in
     „Rückläufe" eintragen, dann **autonom** Quelle korrigieren und neu ableiten → erneut H2.
   - **Verwerfen:** Artefakte als `Verworfen` markieren (mit Begründung), nicht löschen.

### Abschlussmeldung eines Laufs

Endet ein Lauf (an H1, H2 oder nach der Closure), kurz berichten: Branch, geschriebene/geänderte Dateien
(mit Pfad), was autonom entschieden wurde, offene Annahmen, nächster Schritt (bei der Closure: Commit und Merge des Branches anbieten).

## Changelog

Die Umsetzung (Phase 5) und Quellkorrekturen aus Rückläufen werden **pro Story** in
`<TICKET>-STORY-NN-CHANGELOG.md` festgehalten (neue Einträge oben):

```markdown
# Changelog: <TICKET>-STORY-NN – <Titel>

## <JJJJ-MM-TT> – <TASK-MM | RÜCKLAUF>: <Titel>

- **Status:** <Offen | Umgesetzt | Verworfen>
- **Änderungen:** <fachlich, was geändert wurde>
- **Quelle (bei Rücklauf):** <Story | EARS <ID> | Gherkin <Szenario> | Quality <Q-ID> | ADR-NNN | Task>
- **Dateien:** `<pfad>`, …
- **Prüfung:** <Unit-Tests / Gherkin / Quality-Maß / Lint – mit Ergebnis; Nicht-Geprüftes ausdrücklich nennen>
```
