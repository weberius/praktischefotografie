# TASK-05: ADR zum Stichtag („heute“) bei vorab erzeugten Seiten

**Priorität:** Medium  
**Aufwand:** ~2 h (ADR); Umsetzung je nach Option separat  
**Quelle:** analyse-architecture.md  
**Befund-Bezug:** ARCH-02  
**ADR-Bezug:** ADR-002 (Prerendering, Zoneless)  
**Status:** Vorgeschlagen

---

## Problem

Alle Routen werden vorab erzeugt (`app.routes.server.ts:16`); `Clock.today()` (`clock.ts:7`) liefert beim Build das Build-Datum, im Browser das Besuchsdatum. Die Liste beendeter Einträge ist damit im statischen HTML bis zum nächsten Deploy veraltet, die Hydration kann abweichen, und die Zeitzone ist nicht festgelegt. Seit SERVICE-24 entscheidet das über Sichtbarkeit (ACT-UB-1). Ein zeitgesteuerter Build wurde im Repository nicht gefunden (Annahme).

## Ziel

Eine dokumentierte Entscheidung, wie „heute“ für vorab erzeugte Seiten bestimmt wird und wie Aktualität im statischen HTML gewährleistet wird.

## Betroffene Dateien

- `docs/architecture/ADR-0NN-stichtag-bei-prerendering.md` (neu, Status `Proposed`)
- ggf. `docs/quality/web/aktualitaet.md` (Q-REL-4 um Zeitpunkt/Zeitzone ergänzen)
- spätere Umsetzung: `web/src/app/core/clock.ts`, `.github/workflows/*`

## Umsetzungsvorschlag

**Entscheidung erforderlich:**
- **A:** täglicher, zeitgesteuerter Deploy kurz nach Mitternacht (Europe/Berlin); geringer Aufwand, Restlücke bis zum Build.
- **B:** Listen erst nach Hydration clientseitig auswerten; immer korrekt, aber Listeninhalt fehlt im HTML (SEO).
- **C:** feste Zeitzone Europe/Berlin in `Clock` zusätzlich zu A; beseitigt Zeitzonenabweichungen.

Nach Entscheidung: ADR als `Proposed` anlegen, Q-REL-4 und EARS ggf. per Supersede ergänzen, Umsetzung als eigener Task.

## Akzeptanzkriterien

- [ ] ADR mit Optionen, Entscheidung und Folgen liegt vor (Status `Proposed`, Abnahme an H2)
- [ ] Zeitzone und Zeitpunkt der Aktualitätsprüfung sind in Q-REL-4 benannt
- [ ] Unit-Tests grün (bei späterer Umsetzung)
- [ ] Betroffene Gherkin-Szenarien weiterhin erfüllt

## Risiko

Niedrig für das ADR; Mittel für die spätere Umsetzung (Build-Pipeline, Hydration).
