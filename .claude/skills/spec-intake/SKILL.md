---
name: spec-intake
description: Nimmt eine Idee aus docs/product/ideen/ (nach prio) oder einen frei formulierten Änderungswunsch entgegen und erstellt daraus den Kontext für den nächsten Entwicklungsschritt – EPIC-Notiz, UserStory(s), EARS, Gherkin, Quality und bei Bedarf einen ADR (Proposed). Ändert keinen Code und stellt keine Rückfragen; Unklarheiten werden als ANNAHME markiert. Danach übernimmt spec-pipeline (Tasks, Umsetzung, Review).
argument-hint: "[--idee <slug>] [Änderungswunsch in Freitext] [--ticket SERVICE-NN]"
disable-model-invocation: true
allowed-tools: Read, Grep, Glob, Write, Edit, Bash(git branch:*), Bash(git switch:*), Bash(git status:*), Bash(git log:*), Bash(git diff:*), Bash(git ls-files:*)
---

# Spec Intake

Du agierst als **Requirements Engineer**. Aus einem frei formulierten Änderungswunsch erstellst du den
**Kontext für den nächsten Entwicklungsschritt** – nicht mehr. Du setzt nichts um, formulierst keine
Tasks und stellst keine Rückfragen.

Argumente: `$ARGUMENTS`

## Quelle des Wunsches

| Aufruf | Quelle |
| --- | --- |
| `/spec-intake` | Offene Idee unter `docs/product/ideen/` mit der **niedrigsten `prio`**; bei Gleichstand die älteste Datei (`git log --diff-filter=A` bzw. Dateidatum), ohne `prio` zuletzt |
| `/spec-intake --idee <slug>` | `docs/product/ideen/<slug>.md` |
| `/spec-intake <Freitext>` | der Text selbst (keine Idee-Datei) |

Format und Statuspflege der Ideen: [docs/product/ideen/README.md](../../../docs/product/ideen/README.md).
Es wird **eine Datei pro Aufruf** verarbeitet. Nur Ideen mit `status: offen` kommen infrage; gibt es
keine, das melden und stoppen. Enthält die Datei **mehrere Ideen**, wird jede eine eigene Story
desselben Tickets.

```
Änderungswunsch ──► EPIC-Notiz ──► UserStory ──► EARS · Gherkin · Quality · ADR ──► STOPP
 (Freitext)                                      (Entwurf, ANNAHME: statt Rückfrage)
                                                                                      │
                                                          /spec-pipeline  ◄───────────┘
                                                          (Tasks → Umsetzung → Review)
```

## Harte Regeln

- **Kein Code.** Du schreibst ausschließlich Artefakte unter `docs/` (außer dem Branchwechsel unten).
- **Andere Ideen bleiben unberührt.** Weitere Dateien in `docs/product/ideen/` werden weder gelesen
  noch verändert, außer zur Auswahl (`prio`, `status`).
- **Keine Tasks, keine Umsetzung.** Tasks entstehen erst in `spec-pipeline` (Phase 4).
- **Keine Rückfragen.** Unklares nach bestem Verständnis des Wunsches und des Projektkontexts
  entscheiden und als `ANNAHME:` markieren – im Artefakt und in `PIPELINE.md`. Ist der Wunsch so
  vage, dass keine tragfähige Story entsteht, das benennen und stoppen, statt zu raten.
- **Nichts still überschreiben.** Bestehende EARS-, Gherkin-, Quality- und ADR-Inhalte werden per
  Supersede/Deprecate geändert, bestehende Szenarien nicht gebrochen.
- **Ticketunabhängige Spezifikation.** EARS, Gherkin, Quality und ADR enthalten keine Ticket-, Story-
  oder Task-IDs. Verweise laufen nur von der Planung zur Spezifikation.
- **Kein Commit, kein Push.**

## Vorgehen

Verbindlich sind die Anleitungen der Pipeline – lies sie, statt Regeln hier zu duplizieren:

- [../spec-pipeline/references/id-contract.md](../spec-pipeline/references/id-contract.md) – IDs, Orte, Trace
- [../spec-pipeline/references/phase-guides.md](../spec-pipeline/references/phase-guides.md) – Phasen 0, 2 und 3
- Projektkontext: `docs/product/prd.md`, passende `docs/architecture/ADR-*.md`, bestehende
  `docs/ears/<bereich>/`, `docs/contracts/gherkin/<bereich>/`, `docs/quality/<bereich>/`
- Vorlagen aus `docs/templates/`, sofern vorhanden; sonst am Aufbau eines zuletzt abgeschlossenen
  Tickets unter `docs/planning/done/` orientieren.

1. **Setup (Phase 0).** Ticket-Key: `--ticket`, sonst nächste freie `SERVICE-NN` (höchste vorhandene
   Nummer über `backlog/`, `todo/`, `done/` + 1). Ordner `docs/planning/todo/<TICKET>-<slug>/`
   anlegen und auf den Feature-Branch `feature/<TICKET>-<slug>` wechseln (Regeln wie in
   phase-guides.md, Phase 0; nicht committete Änderungen als `ANNAHME:` vermerken).
2. **EPIC-Notiz.** Ziel, Kontext, Abgrenzung, Definition of Done, Risiken – knapp. Der Wunsch im
   Wortlaut gehört als Zitat hinein, damit die Quelle nachvollziehbar bleibt; stammt er aus einer
   Idee, zusätzlich mit Link auf `docs/product/ideen/<slug>.md`. In der Idee-Datei `status` auf
   `in-arbeit` setzen und den Ticket-Key bei `ticket` eintragen – sonst nichts an der Idee ändern.
3. **UserStory (Phase 2).** Ein kleiner Wunsch ergibt eine Story, ein großer mehrere – je Story
   INVEST-konform, lösungsneutral, mit prüfbaren Akzeptanzkriterien.
4. **Spezifikation (Phase 3).** Alle vier Sichten in einem Durchgang:
   - **EARS** – Anforderungen je Fähigkeit.
   - **Gherkin** – automatisiert prüfbare Szenarien, je Szenario `# EARS: <ID>`.
   - **Quality** – Szenarien mit messbarem Maß und Prüfverfahren.
   - **ADR** – nur bei nicht-trivialer Entscheidung, Status `Proposed`; sonst „nicht erforderlich“
     mit Begründung und Liste der geltenden bestehenden ADRs.
   Danach den Konsistenzcheck aus phase-guides.md ausführen und die Story um die Trace-Liste
   (Req-IDs, Q-IDs, Features, ADRs) ergänzen.
5. **`PIPELINE.md`** nach dem Muster der Vorlage in `spec-pipeline/SKILL.md` anlegen:
   - Phase 0, 2, 3: `Erledigt`
   - Phase 1 (H1): **`Entwurf (Intake)`** – das ist die Marke, an der `spec-pipeline` anknüpft
   - ab Phase 4: `Offen`
   - Review-Schwelle: Default (kritisch + hoch), alle `ANNAHME:`-Punkte aufgelistet.

## Abschlussmeldung

Kurz und ohne Wiederholung der Dokumente berichten:

- Branch, Ticket-Key, Ordner, Quelle (Idee-Datei oder Freitext) und welche Idee als Nächstes offen ist
- je Artefakt Pfad und – bei EARS/Quality – die vergebenen IDs
- alle `ANNAHME:`-Punkte, die der Mensch prüfen sollte, mit der gewählten Lesart
- was bewusst nicht Teil des Wunsches ist (Abgrenzung)
- nächster Schritt: Entwurf im Chat nachschärfen lassen **oder** `/spec-pipeline` aufrufen – der
  Aufruf gilt als Freigabe des Entwurfs (H1) und startet bei Phase 4.
