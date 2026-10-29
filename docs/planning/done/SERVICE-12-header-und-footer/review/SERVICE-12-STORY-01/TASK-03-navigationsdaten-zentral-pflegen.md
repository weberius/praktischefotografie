# TASK-03: Navigationsdaten für Kopf und Fuß zentral pflegen

**Priorität:** Low  
**Aufwand:** ~1 h  
**Quelle:** analyse-architecture.md  
**Befund-Bezug:** ARCH-03, ARCH-04  
**ADR-Bezug:** ADR-002  
**Status:** Zurückgestellt (niedrig, begründet in PIPELINE.md)

---

## Problem

Kopf-Links stehen als Array in `web/src/app/app.ts:36-46`, Fuß-Links hartkodiert in `web/src/app/app.html:36-41`; zwei Muster für dieselbe Art Daten. Außerdem setzt `.main-nav` (`web/src/styles.css:46`) einen positionierten Kopf voraus, ohne dass das vermerkt ist, und `@HostListener` (`app.ts:29`) ist das einzige im Projekt.

## Ziel

Eine typisierte Quelle für Haupt- und Rechtliches-Links, genutzt von Kopf und Fuß; die Kopplung zwischen Menüfeld und haftendem Kopf ist im CSS vermerkt.

## Betroffene Dateien

- `web/src/app/app.ts`
- `web/src/app/app.html`
- `web/src/app/core/` (neue Datei für die Navigationsdaten, Ort nach ADR-002)
- `web/src/styles.css` (Kommentar)

## Umsetzungsvorschlag

1. Konstante `MAIN_LINKS` und `LEGAL_LINKS` unter `core/` ablegen; `App` und Template lesen daraus.
2. Reihenfolge und Beschriftung unverändert lassen (Story-Kriterium 7, FRM-UB-4).
3. In `styles.css` an `.main-nav` vermerken: benötigt `.site-header` als positionierten Vorfahren (FRM-UB-2).
4. Optional: `@HostListener` durch `host: { '(document:keydown.escape)': 'onEscape()' }` ersetzen.

**Entscheidung erforderlich:** nur Daten zusammenführen (klein) oder zusätzlich den Kopf als `shared`-Komponente extrahieren (größer, lohnt erst bei weiteren Kopf-Funktionen).

## Akzeptanzkriterien

- [ ] Kopf- und Fuß-Links stammen aus einer Quelle; Reihenfolge und Beschriftung unverändert
- [ ] Der Kommentar zur Kopplung steht im CSS
- [ ] Unit-Tests grün
- [ ] Betroffene Gherkin-Szenarien weiterhin erfüllt

## Risiko

Niedrig – Umstrukturierung ohne Verhaltensänderung, Tests prüfen Beschriftungen und Reihenfolge.
