# TASK-01: EARS-Tabelle reparieren, Detail-Szenario ergänzen

**Priorität:** Medium  
**Aufwand:** ~20 min  
**Quelle:** analyse-code.md  
**Befund-Bezug:** CODE-01, CODE-02, CODE-05  
**ADR-Bezug:** ADR-002  
**Status:** Umgesetzt (2026-10-30, Abnahme: Empfehlung)

---

## Problem

- `docs/ears/content/datenmodell.md:18`: DAT-UB-7 steht nach dem Absatz „Ergänzung (Beitragsvorschau)“ und wird nicht als Tabellenzeile gerendert.
- `docs/ears/web/events.md:14`: EVT-UB-5 verlangt Kennzeichnung „in Liste und Detail“, aber `web/events.feature` hat kein Detail-Szenario; der Test `event-list.spec.ts:98` heißt „Szenario: …“ ohne Gegenstück.
- `README.md:40`, `README.md:17`: Finissagen fehlen in der Beschreibung.

## Ziel

DAT-UB-7 ist Teil der Tabelle; EVT-UB-5 und Gherkin decken dasselbe ab; README nennt Finissagen.

## Betroffene Dateien

- `docs/ears/content/datenmodell.md`
- `docs/contracts/gherkin/web/events.feature`
- `docs/ears/web/events.md` (nur falls Option B)
- `web/src/app/pages/event-list/event-list.spec.ts` (Kopfkommentar, Verweis)
- `README.md`

## Umsetzungsvorschlag

1. DAT-UB-7 direkt unter DAT-UB-6 in die Tabelle verschieben; den Ergänzungsvermerk darunter belassen und um DAT-UB-7 erweitern.
2. **Entscheidung erforderlich:** (A) Szenario „Vernissage und Finissage in der Detailansicht“ in `web/events.feature` ergänzen, EVT-UB-5 verlinken, Test dorthin binden (ggf. in `event-detail.spec.ts` verschieben); oder (B) EVT-UB-5 auf Liste und Filter kürzen und den Detail-Test umbenennen.
3. README an den beiden Stellen „Finissagen“ ergänzen.

## Akzeptanzkriterien

- [ ] `datenmodell.md` rendert DAT-UB-7 als Tabellenzeile
- [ ] Jede Aussage in EVT-UB-5 hat ein Gherkin-Szenario und einen Test
- [ ] Unit-Tests grün
- [ ] Betroffene Gherkin-Szenarien weiterhin erfüllt

## Risiko

Niedrig – reine Dokumentation, ggf. Test verschieben.
