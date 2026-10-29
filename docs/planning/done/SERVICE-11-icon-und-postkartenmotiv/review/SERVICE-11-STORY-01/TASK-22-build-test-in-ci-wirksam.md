# TASK-22: Build-Test für Icon-Verweise in der CI wirksam machen

**Priorität:** Medium  
**Aufwand:** ~1 h  
**Quelle:** analyse-code.md  
**Befund-Bezug:** CODE-05  
**ADR-Bezug:** ADR-003, ADR-017  
**Status:** Umgesetzt (2026-10-29, Prüf-Gate grün, siehe Story-Changelog)

---

## Problem

`test/marken-icon.test.mjs:101-109` wird ohne `web/dist/web/browser/index.html` übersprungen. Im Deploy-Workflow läuft das Wurzel-`npm test` vor dem Build, der Test läuft dort also nie. Er prüft zudem nur vier relative `href`s auf drei Seiten und nicht den Build mit Basispfad `/pf/` (Gherkin „Pfade relativ zum Basispfad“, Q-USE-11).

## Ziel

ICO-UB-5 wird in der CI tatsächlich gegen einen Build mit Basispfad geprüft, oder die Lücke ist bewusst dokumentiert.

## Betroffene Dateien

- `test/marken-icon.test.mjs`
- `.github/workflows/` (Deploy-Workflow), ggf. `web/package.json`
- `docs/planning/todo/SERVICE-11-icon-und-postkartenmotiv/PIPELINE.md` (Annahme)

## Umsetzungsvorschlag

**Entscheidung erforderlich:**
- Option A: Den Test im Schritt "Webanwendung prüfen und bauen" nach `npm run build -- --base-href ...` ausführen (`node --test ../test/marken-icon.test.mjs`) und den Test auf `href`-Präfix `BASE_HREF` im `<base>`-Tag und relative Icon-Verweise erweitern.
- Option B: Der Test baut selbst (`ng build --base-href /pf/`) – langsam, nur lokal sinnvoll.
- Option C: Skip beibehalten und in der PIPELINE-Annahme dokumentieren; Titel des Tests auf „erzeugte Seiten (nur nach Build)“ ändern.

## Akzeptanzkriterien

- [ ] Entscheidung dokumentiert
- [ ] Bei A/B: Der Test schlägt fehl, wenn ein Icon-Verweis mit `/` beginnt (Gegenprobe)
- [ ] Unit-Tests grün
- [ ] Betroffene Gherkin-Szenarien weiterhin erfüllt

## Risiko

Niedrig – betrifft Test und Workflow; bei Option A verlängert sich der CI-Lauf um wenige Sekunden.
