# TASK-03: METHOD:PUBLISH ohne ORGANIZER entscheiden

**Priorität:** Medium  
**Aufwand:** ~30 min  
**Quelle:** analyse-architecture.md  
**Befund-Bezug:** ARCH-04  
**ADR-Bezug:** ADR-018  
**Status:** Umgesetzt (2026-10-30, Abnahme: Empfehlung)

---

## Problem

`ics.ts:66` setzt `METHOD:PUBLISH`. RFC 5546 verlangt dafür einen `ORGANIZER` je VEVENT; ohne ihn ist die iTIP-Nachricht unvollständig, manche Clients (Outlook) behandeln sie als Einladung. RFC 5545 verlangt `METHOD` nicht.

## Ziel

Eine dokumentierte, RFC-konforme Wahl.

## Betroffene Dateien

- `web/src/app/core/ics.ts`, `ics.spec.ts`
- `docs/architecture/ADR-018-ics-im-browser-erzeugen.md` (siehe TASK-09)

## Umsetzungsvorschlag

**Entscheidung erforderlich:**
- A: `METHOD` weglassen (Datei zum Speichern; Empfehlung, kein `ORGANIZER` nötig).
- B: `METHOD:PUBLISH` behalten und `ORGANIZER` mit Kontaktadresse ergänzen (erfordert eine veröffentlichte Adresse, Datenschutzfrage).
- C: unverändert lassen und als bekannte Abweichung im ADR festhalten.

## Akzeptanzkriterien

- [ ] Entscheidung im ADR vermerkt
- [ ] Test prüft das gewählte Verhalten
- [ ] Handprobe Apple/Google/Outlook mit der Datei
- [ ] Unit-Tests grün
- [ ] Betroffene Gherkin-Szenarien weiterhin erfüllt

## Risiko

Niedrig – kleine Änderung; Importverhalten nur per Handprobe prüfbar.
