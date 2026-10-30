# TASK-06: Quelle der absoluten Event-URL entscheiden

**Priorität:** Low  
**Aufwand:** ~30 min  
**Quelle:** analyse-architecture.md  
**Befund-Bezug:** ARCH-05  
**ADR-Bezug:** ADR-003, ADR-018  
**Status:** Zurückgestellt (2026-10-30, Struktur bzw. niedrig, kein Einfluss auf Verhalten)

---

## Problem

`URL` wird aus `document.baseURI` gebildet (`event-detail.ts:58`). Bei Vorschau- oder Spiegel-Auslieferung landen Adressen im Kalender der Nutzer:innen, die später nicht mehr gelten. PIPELINE.md lässt die Quelle als Annahme offen.

## Ziel

Entschiedene, dokumentierte Quelle der Basisadresse.

## Betroffene Dateien

- `web/src/app/pages/event-detail/event-detail.ts`
- `docs/architecture/ADR-018-ics-im-browser-erzeugen.md`

## Umsetzungsvorschlag

**Entscheidung erforderlich:**
- A: `document.baseURI` beibehalten (einfach, folgt dem Deployment).
- B: kanonische Basisadresse als Build-Konstante/Konfiguration (stabil, braucht Pflege bei Domainwechsel).

## Akzeptanzkriterien

- [ ] Entscheidung im ADR
- [ ] Test für die gewählte Quelle
- [ ] Unit-Tests grün
- [ ] Betroffene Gherkin-Szenarien weiterhin erfüllt

## Risiko

Niedrig.
