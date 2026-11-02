# CODE-TASK-02: Eventliste: Filterzustand klären, Hinweis vereinfachen

**Priorität:** Low  
**Aufwand:** ~45 min  
**Quelle:** analyse-code.md  
**Befund-Bezug:** CODE-03, CODE-04  
**ADR-Bezug:** ADR-023, ADR-022  
**Status:** Umgesetzt

---

## Problem

`web/src/app/pages/event-list/event-list.ts:23` hält „Nur Favoriten“ als lokales Signal, der Typfilter (`event-list.ts:25,54-56`) liegt in der Adresse; die Option geht bei Navigation verloren, der Typfilter nicht, und das ist nirgends begründet. In `web/src/app/pages/event-list/event-list.html:19-24` ist das `<p class="notice">` für zwei Texte doppelt vorhanden.

## Ziel

Der Filterzustand ist nachvollziehbar und bewusst gewählt; der Hinweis steht nur einmal im Markup.

## Betroffene Dateien

- `web/src/app/pages/event-list/event-list.ts`
- `web/src/app/pages/event-list/event-list.html`
- ggf. `docs/architecture/ADR-023-favoriten-im-speicher-der-sitzung.md`, `docs/ears/web/favoriten.md` (nur bei Entscheidung für die Adresse)

## Umsetzungsvorschlag

1. Hinweis: ein `<p class="notice" role="status">` mit Text per Ausdruck (`onlyFavorites() ? 'Keine Favoriten …' : 'Keine Events …'`).
2. Filterwechsel in eine Methode neben `selectType` legen statt im Template zu setzen.

**Entscheidung erforderlich:** (a) „Nur Favoriten“ bleibt flüchtig; im Code und in ADR-023/FAV-UB-4 als bewusst vermerken, oder (b) „Nur Favoriten“ wird wie `type` ein Query-Parameter (dann Vertrag, Gherkin und ADR-23-Abgrenzung zu „keine URL-Parameter“ prüfen; Spezifikationsänderung über Supersede).

## Akzeptanzkriterien

- [ ] Hinweis nur einmal im Template
- [ ] Entscheidung zum Filterzustand dokumentiert
- [ ] Unit-Tests grün
- [ ] Betroffene Gherkin-Szenarien (`web/favoriten.feature`, „Eventliste nur mit Favoriten“, „Keine Favoriten“) weiterhin erfüllt

## Risiko

Niedrig für Teil 1; Mittel für Option (b), weil Spezifikation und Zurück-Link betroffen wären.
