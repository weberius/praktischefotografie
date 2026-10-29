# TASK-01: Seitenrahmen ohne Selektor einer Einzelseite steuern

**Priorität:** Low  
**Aufwand:** ~1 h  
**Quelle:** analyse-architecture.md  
**Befund-Bezug:** ARCH-01  
**ADR-Bezug:** ADR-016, ADR-002  
**Status:** Zurückgestellt (2026-10-29, Abnahme: unter der Review-Schwelle, betrifft Struktur statt Verhalten; nicht verworfen)

---

## Problem

`web/src/styles.css:36` (`main:has(> app-map-page)`) bindet die globale Schicht an den Selektor einer einzelnen, lazy geladenen Seite. Jede weitere vollflächige Seite würde diese Datei erweitern; eine Umbenennung der Seitenkomponente bricht die Regel stillschweigend.

## Ziel

Der Seitenrahmen kennt keine Seitenselektoren. Eine Seite erklärt selbst oder über ihre Route, dass sie die Fläche füllt und `main` keinen unteren Abstand haben soll.

## Betroffene Dateien

- `web/src/styles.css`
- `web/src/app/app.ts` und/oder `web/src/app/app.html` (nur falls Route-Variante)
- `web/src/app/app.routes.ts` (nur falls Route-Variante)
- `web/src/app/pages/map/map.css`
- `web/src/app/app.spec.ts`

## Umsetzungsvorschlag

**Entscheidung erforderlich:** (a) `main` immer als Flex-Spalte führen und den unteren Abstand über eine CSS-Variable (z. B. `--main-padding-bottom`) steuern, die die Seite am Host setzt; (b) Routen-Daten `fullBleed` und eine Klasse an `main`, abgeleitet in `App`; (c) Status quo beibehalten und die Entscheidung in ADR-016 als bewusst vermerken. Option (a) ist am kleinsten, ändert aber `main` für alle Seiten (bereits akzeptiert, siehe `PIPELINE.md`); Option (b) kostet TypeScript im Rahmen.

1. Variante wählen.
2. Selektor `main:has(> app-map-page)` entfernen.
3. Layout-Tests in `app.spec.ts` unverändert grün halten.

## Akzeptanzkriterien

- [ ] `styles.css` enthält keinen Selektor auf `app-map-page`
- [ ] Layout-Tests „Karte füllt die Fläche“ unverändert grün
- [ ] Unit-Tests grün
- [ ] Betroffene Gherkin-Szenarien weiterhin erfüllt („Karte füllt die Fläche“)

## Risiko

Niedrig – reine Layoutänderung, durch bestehende Messtests abgedeckt; Variante (a) betrifft alle Seiten.
