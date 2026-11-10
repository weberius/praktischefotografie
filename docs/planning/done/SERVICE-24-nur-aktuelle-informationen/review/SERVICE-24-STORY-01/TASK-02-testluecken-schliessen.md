# TASK-02: Testlücken zu ACT-ST-1 und Q-REL-4 schließen

**Priorität:** Medium  
**Aufwand:** ~45 min  
**Quelle:** analyse-code.md  
**Befund-Bezug:** CODE-02  
**ADR-Bezug:** ADR-002  
**Status:** Vorgeschlagen

---

## Problem

`exhibition-list.spec.ts:1` nennt ACT-ST-1, testet es aber nicht. Grenzfälle (Ende gestern/heute/morgen) sind nur für Events getestet (`event-list.spec.ts:62-77`), nicht für Ausstellungen. `event-list.spec.ts:1` verweist auf das entfernte Szenario „Beendetes Event“ statt auf `web/aktualitaet.feature`.

## Ziel

Jedes Szenario aus `aktualitaet.feature` für `/events` und `/exhibitions` ist getestet, Kopfkommentare stimmen.

## Betroffene Dateien

- `web/src/app/pages/exhibition-list/exhibition-list.spec.ts`
- `web/src/app/pages/event-list/event-list.spec.ts`

## Umsetzungsvorschlag

1. Ausstellungs-Test „Keine aktuellen Einträge“ (nur beendete Ausstellung, Hinweis `.notice`).
2. Grenzfalltabelle (gestern/heute/morgen) für beide Listen, ggf. als gemeinsame Tabelle.
3. Kopfkommentar der Event-Spec auf `web/aktualitaet.feature` aktualisieren, entferntes Szenario streichen.

## Akzeptanzkriterien

- [ ] ACT-ST-1 und Q-REL-4 für beide Listen getestet
- [ ] Kopfkommentare nennen nur existierende Szenarien
- [ ] Unit-Tests grün

## Risiko

Niedrig – nur Tests.
