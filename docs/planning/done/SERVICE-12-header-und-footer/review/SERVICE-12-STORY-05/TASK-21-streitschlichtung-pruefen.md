# TASK-21: Hinweis zur EU-Streitschlichtung im Impressum prüfen und aktualisieren

**Priorität:** Medium  
**Aufwand:** ~20 min  
**Quelle:** analyse-code.md  
**Befund-Bezug:** CODE-01  
**ADR-Bezug:** –  
**Status:** Zurückgestellt bis zur Entscheidung des Betreibers (Rechtstext)

---

## Problem

`web/src/app/pages/impressum/impressum.html:20-24` verweist auf die EU-OS-Plattform, die nach meinem Kenntnisstand seit Juli 2025 eingestellt ist (nicht verifiziert). RCH-UB-1 fordert Hinweise zur Streitbeilegung.

## Ziel

Der Streitbeilegungsabschnitt entspricht der geltenden Rechtslage und enthält keinen toten Link.

## Betroffene Dateien

- `web/src/app/pages/impressum/impressum.html`
- `web/src/app/app.spec.ts` (Test RCH-UB-1, falls Textbausteine betroffen)

## Umsetzungsvorschlag

1. Aktualität prüfen (Betreiber, ggf. Rechtsberatung).
2. Abschnitt anpassen; Abschnitt „Verbraucherstreitbeilegung/Universalschlichtungsstelle“ beibehalten.

**Entscheidung erforderlich:** Inhalt der Rechtsformulierung trifft der Betreiber; keine automatische Änderung.

## Akzeptanzkriterien

TASK-21-streitschlichtung-pruefen.md0

## Risiko

TASK-21-streitschlichtung-pruefen.md1
