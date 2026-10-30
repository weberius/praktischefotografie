# TASK-08: Eingabevalidierung in ics.ts

**Priorität:** Low  
**Aufwand:** ~45 min  
**Quelle:** analyse-architecture.md  
**Befund-Bezug:** ARCH-07  
**ADR-Bezug:** ADR-018  
**Status:** Zurückgestellt (2026-10-30, Struktur bzw. niedrig, kein Einfluss auf Verhalten)

---

## Problem

`compactDate` (`ics.ts:44-48`) prüft das Format nicht (Folge: `NaN` in der Datei), `endDate < startDate` wird nicht erkannt, ein einzelnes `\r` wird nicht maskiert (`ics.ts:29-30`), `id` fließt ungeprüft in Dateiname und `UID`.

## Ziel

Ungültige Eingaben führen zu einem klaren Fehler statt zu einer stillen Fehlerdatei.

## Betroffene Dateien

- `web/src/app/core/ics.ts`, `ics.spec.ts`

## Umsetzungsvorschlag

1. Datumsformat und Reihenfolge prüfen, bei Verstoß Fehler werfen.
2. `\r` beim Maskieren wie Zeilenumbruch behandeln.
3. Dateiname auf `[a-z0-9-]` begrenzen.
4. **Entscheidung erforderlich:** Fehler werfen oder Schaltfläche still unterdrücken; da das Schema die Daten validiert, ist auch "nichts tun" vertretbar.

## Akzeptanzkriterien

- [ ] Tests für ungültiges Datum, vertauschte Daten, `\r`
- [ ] Unit-Tests grün
- [ ] Betroffene Gherkin-Szenarien weiterhin erfüllt

## Risiko

Niedrig.
