# TASK-21: Kopfhöhe für Anker-Versatz aus einer Quelle ableiten

**Priorität:** Medium  
**Aufwand:** ~45 min  
**Quelle:** analyse-code.md  
**Befund-Bezug:** CODE-01  
**ADR-Bezug:** ADR-016  
**Status:** Umgesetzt (2026-10-29)

---

## Problem

`web/src/styles.css:30` (`scroll-padding-top: 6rem`) und `web/src/app/app.config.ts:15` (`setOffset([0, 96])`) müssen übereinstimmen; nur ein Kommentar sichert das. `96` nimmt 16 px je rem an.

## Ziel

Ein Wert steuert beide Stellen.

## Betroffene Dateien

- `web/src/styles.css`
- `web/src/app/app.config.ts`

## Umsetzungsvorschlag

**Entscheidung erforderlich:** (a) CSS-Eigenschaft `--header-offset: 6rem` auf `:root`; der Initializer liest sie per `getComputedStyle` in Pixel (nur im Browser, ohne Layoutmessung des Kopfs, Q-PERF-8); oder (b) beide Werte bleiben, ein Test (TASK-22) erzwingt die Übereinstimmung.

## Akzeptanzkriterien

- [ ] Eine Änderung des Versatzes genügt an einer Stelle (oder ein Test schlägt bei Abweichung fehl)
- [ ] Router-Anker und Sprunglink liegen unterhalb des Kopfs (Browserprüfung)
- [ ] Unit-Tests grün
- [ ] Betroffene Gherkin-Szenarien weiterhin erfüllt

## Risiko

Niedrig – Lesen von `getComputedStyle` beim Start muss auf dem Server entfallen (Vorabrendern, ADR-002).
