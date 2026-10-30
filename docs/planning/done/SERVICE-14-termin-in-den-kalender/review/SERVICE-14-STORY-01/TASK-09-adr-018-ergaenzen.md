# TASK-09: ADR-018 um RFC-Details und UID-Vertrag ergänzen

**Priorität:** Low  
**Aufwand:** ~30 min  
**Quelle:** analyse-architecture.md  
**Befund-Bezug:** ARCH-08, ARCH-04  
**ADR-Bezug:** ADR-018  
**Status:** Zurückgestellt (2026-10-30, Struktur bzw. niedrig, kein Einfluss auf Verhalten)

---

## Problem

ADR-018 legt `PRODID`, `METHOD`, `TRANSP`, `SEQUENCE` und die Form der `UID` (`ics.ts:12-13`) nicht fest. Eine spätere Änderung von `UID` oder `PRODID` dupliziert importierte Termine. Neue Entscheidungen dürfen nicht still überschrieben werden (AGENTS.md).

## Ziel

ADR-018 hält diese Festlegungen fest.

## Betroffene Dateien

- `docs/architecture/ADR-018-ics-im-browser-erzeugen.md` (Ergänzung bzw. Folge-ADR; Entscheidung des Menschen)

## Umsetzungsvorschlag

**Entscheidung erforderlich:** Ergänzung im bestehenden ADR oder neuer ADR (Supersede). Inhalt: Ergebnis aus TASK-03/-04/-06, `UID`-Format als stabiler Vertrag (Domainform nicht nachträglich ändern), `PRODID`.

## Akzeptanzkriterien

- [ ] ADR benennt `METHOD`, `TRANSP`, `SEQUENCE`, `UID`-Vertrag
- [ ] EARS/Quality bei Bedarf per Supersede angepasst
- [ ] Betroffene Gherkin-Szenarien weiterhin erfüllt

## Risiko

Niedrig – reine Dokumentation.
