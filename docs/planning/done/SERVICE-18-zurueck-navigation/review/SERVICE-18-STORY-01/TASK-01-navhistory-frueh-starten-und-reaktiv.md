# TASK-01: NavHistory beim Start erzeugen und reaktiv halten

**Priorität:** High  
**Aufwand:** ~1,5 h  
**Quelle:** analyse-architecture.md  
**Befund-Bezug:** ARCH-01, ARCH-02  
**ADR-Bezug:** ADR-022  
**Status:** Umgesetzt

---

## Problem

`NavHistory` wird erst beim ersten Rendern eines `BackLink` erzeugt (`web/src/app/core/nav-history.ts:10-16`, `web/src/app/shared/back-link/back-link.ts:42`), also nach dem Laden der Daten innerhalb von `app-data-gate`. Das erste `NavigationEnd` einer Detailseite wird nicht erfasst; der Link zeigt dann auf die Übersicht statt auf die vorherige Seite (NAV-EV-2). `computed` liest zudem nicht reaktive Felder (`back-link.ts:47-48`). Der Test injiziert den Dienst vorab (`back-link.spec.ts:11`) und verdeckt das.

## Ziel

Der Verlauf wird ab dem ersten Navigationsereignis geführt und ist reaktiv. Ein Test bildet den Produktivstart ab.

## Betroffene Dateien

- `web/src/app/core/nav-history.ts`
- `web/src/app/app.config.ts`
- `web/src/app/shared/back-link/back-link.ts`
- `web/src/app/shared/back-link/back-link.spec.ts`

## Umsetzungsvorschlag

1. Den Dienst beim Start erzeugen, z. B. `provideAppInitializer(() => { inject(NavHistory); })` in `app.config.ts` (vor dem ersten Navigationsende) oder Injektion im Wurzelkomponenten-Konstruktor.
2. `current`/`before` als `signal` führen und `previous()`/`previousPath()` darauf lesen, damit `computed` neu berechnet; Router-Subscription gleichzeitig prüfen (kein Mehrfach-Parsen).
3. Test ohne `TestBed.inject(NavHistory)` anpassen: Dienst über denselben Weg wie in `app.config.ts` erzeugen, erste Navigation `/calendar` → `/events/e-talk` prüfen (Ziel `/calendar`), plus Wechsel `/venues/a` → `/venues/b` bei wiederverwendeter Komponente.

**Entscheidung erforderlich:** Falls ein Verlauf über `Navigation.previousNavigation` oder Router-State gewünscht ist, ADR-022 anpassen; sonst bleibt die eigene Verlaufsangabe.

## Akzeptanzkriterien

- [ ] Beim ersten Detailaufruf aus einer anderen App-Seite zeigt der Link auf diese Seite
- [ ] Bei Wechsel zwischen zwei Seiten desselben Typs aktualisiert sich der Link
- [ ] Test ohne manuelles Vorab-Erzeugen des Dienstes grün
- [ ] Unit-Tests grün
- [ ] Betroffene Gherkin-Szenarien (NAV-EV-2, NAV-ST-1, NAV-UB-9) weiterhin erfüllt

## Risiko

Niedrig – kleine Änderung in zwei Dateien; Fallback-Verhalten bleibt unverändert.
