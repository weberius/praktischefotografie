# TASK-23: UID, URL und Dateiname defensiv absichern (optional)

**Priorität:** Low  
**Aufwand:** ~30 min  
**Quelle:** analyse-security.md  
**Befund-Bezug:** SEC-02  
**ADR-Bezug:** ADR-018  
**Status:** Zurückgestellt (2026-10-30, Struktur bzw. niedrig, kein Einfluss auf Verhalten)

---

## Problem

`web/src/app/core/ics.ts:73,81` und `web/src/app/pages/event-detail/event-detail.ts:56-61` übernehmen `id` und `eventUrl` ungeprüft; der Schutz liegt allein im Schema-Muster (`schema/events.schema.json:11`) im Datenworkflow, nicht im Browser.

## Ziel

Auch bei umgangener Schemaprüfung entstehen keine Steuerzeichen in `UID`, `URL` und Dateiname.

## Betroffene Dateien

- `web/src/app/core/ics.ts`
- `web/src/app/pages/event-detail/event-detail.ts`

## Umsetzungsvorschlag

1. `UID` und `URL` von Steuerzeichen bereinigen; `URL` nur bei Schema `http:`/`https:` ausgeben.
2. `icsFileName`: `id` gegen `^[a-z0-9]+(-[a-z0-9]+)*$` prüfen, sonst Ersatzname.
3. Tests mit abweichender `id`.

**Entscheidung erforderlich:** Umsetzen als Defense-in-Depth oder Risiko akzeptieren, da die Schemaprüfung (`validate:data`) greift.

## Akzeptanzkriterien

- [ ] `id` mit Steuerzeichen oder Schrägstrichen erzeugt weder fremde `UID`/`URL`-Zeilen noch einen unsicheren Dateinamen.
- [ ] Unit-Tests grün
- [ ] Betroffene Gherkin-Szenarien („Stabile Kennung“, „Download der Kalenderdatei“) weiterhin erfüllt

## Risiko

Niedrig – gültige `id` bleiben unverändert.
