# TASK-21: Testaufbau im Spec von `App` bündeln und Seitentest vereinfachen

**Priorität:** Low  
**Aufwand:** ~30 min  
**Quelle:** analyse-code.md  
**Befund-Bezug:** CODE-01, CODE-02  
**ADR-Bezug:** –  
**Status:** Zurückgestellt (2026-10-29, Abnahme: Refactoring bzw. Stilfrage ohne Verhaltens- oder Testlücke; nicht verworfen)

---

## Problem

Die Folge „App erzeugen, navigieren, stabilisieren, rendern“ steht dreimal in `web/src/app/app.spec.ts` (Zeilen 93-98, 110-122, 150-159). Der Test „Icon auf jeder Seite gleich“ (Zeilen 200-210) konfiguriert das TestBed pro URL neu (Zeile 203, Kopie von Zeile 33), obwohl das Icon in der Hülle `App` steht und nicht von der Route abhängt.

## Ziel

Ein gemeinsamer Helfer auf Dateiebene für den Aufbau; der Seitentest nutzt eine einzige Instanz und mehrere Navigationen, ohne `resetTestingModule`, und benennt im Kommentar, dass die Hülle geprüft wird.

## Betroffene Dateien

- `web/src/app/app.spec.ts`

## Umsetzungsvorschlag

1. Helfer `renderApp(url)` (liefert `fixture`/`root`) auf Dateiebene anlegen und in den drei Stellen verwenden.
2. Seitentest: eine Fixture, Schleife über die URLs mit `navigateByUrl`, `whenStable`, `detectChanges`; Quelle und Anzahl der Bilder je URL prüfen.
3. Gherkin-Verweis im Dateikopf unverändert lassen.

## Akzeptanzkriterien

- [ ] Der Aufbau steht nur noch einmal in der Datei.
- [ ] Kein `resetTestingModule` im Icon-Block.
- [ ] Unit-Tests grün (`cd web && npx ng test --watch=false --include=src/app/app.spec.ts`)
- [ ] Betroffene Gherkin-Szenarien weiterhin erfüllt

## Risiko

Niedrig – reine Testumstrukturierung; die Karten-Tests (Messung) dürfen sich durch den Helfer nicht ändern (Reihenfolge von `minHeight` und `detectChanges` beibehalten).
