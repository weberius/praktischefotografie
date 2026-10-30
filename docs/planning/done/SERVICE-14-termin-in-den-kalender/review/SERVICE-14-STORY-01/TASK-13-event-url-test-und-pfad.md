# TASK-13: Event-URL: Test mit anderem `base href`, Pfad nicht doppelt führen

**Priorität:** Low  
**Aufwand:** ~30 min  
**Quelle:** analyse-code.md  
**Befund-Bezug:** CODE-03  
**ADR-Bezug:** ADR-018  
**Status:** Zurückgestellt (2026-10-30, Struktur bzw. niedrig, kein Einfluss auf Verhalten)

---

## Problem

`event-detail.ts:57` baut `events/${e.id}` selbst (Pfad steht auch in `app.routes.ts:54`). `event-detail.spec.ts:81` bildet die Erwartung mit derselben Formel; Unterpfad-Betrieb (`<base href="/unterpfad/">`) ist nicht getestet.

## Ziel

Die URL in der Kalenderdatei ist unabhängig von der Implementierungsformel abgesichert.

## Betroffene Dateien

- `web/src/app/pages/event-detail/event-detail.ts`
- `web/src/app/pages/event-detail/event-detail.spec.ts`

## Umsetzungsvorschlag

**Entscheidung erforderlich:** (a) Pfad über Router/`Location.prepareExternalUrl` bilden; (b) bei `document.baseURI` bleiben und nur testen. Test mit festem `DOCUMENT`-Stub (`baseURI: 'https://example.org/unterpfad/'`) und Erwartung `https://example.org/unterpfad/events/e-talk` als Literal.

## Akzeptanzkriterien

- [ ] Test mit Unterpfad prüft ein festes Literal
- [ ] Unit-Tests grün
- [ ] Betroffene Gherkin-Szenarien weiterhin erfüllt

## Risiko

Niedrig.
