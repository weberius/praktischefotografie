# SERVICE-16 – Recherche in allen Sprachen

**Status:** Entwurf (Intake)  ·  **Quelle:** Idee [`idee-007-recherche-in-allen-sprachen`](../../../product/ideen/idee-007-recherche-in-allen-sprachen.md)

> „Passe den Skill research-photographers so an, dass sowohl in der Wikipedia in allen Sprachen, als auch im Internet in allen Sprachen gesucht wird. Die Ergebnisse werden in Form von Links abgespeichert. Die Webseiten hinter den Links werden zur Erstellung des Textes zum Fotografen herangezogen.“

## Ziel
Ein Lauf des Skills `research-photographers` recherchiert eine Person **in einem Zug** in der Wikipedia (alle Sprachversionen) und im Web (mehrere Sprachen), speichert alle Fundstellen als Links und schreibt den knappen Text über die Person aus den Wikipedia-Anfangstexten **und** den Seiten hinter den Links.

**Zweck in einem Satz:** Der Text über eine Person beruht auf möglichst vielen, nachvollziehbaren Quellen in verschiedenen Sprachen statt auf einem ein- oder zweizeiligen Wikipedia-Anfang.

**Erfolgskriterien**
- Alle Wikipedia-Sprachversionen einer Person stehen als Links in der Linksammlung; Anfangstexte werden für bis zu zehn Sprachversionen herangezogen.
- Die Websuche läuft im Standardlauf mit (abschaltbar mit `--no-web`) und fragt in sechs Sprachen.
- Seiten hinter neuen Links werden (rücksichtsvoll) abgerufen und fließen in den Text ein.
- Alle Fundstellen stehen in `updates/photographers-links.json`, ohne Dubletten und ohne Verlust.
- Bestehende Schutzregeln bleiben: Freigabe, Prüfung, Rollback, Bilder nur Commons, keine internen Adressen.

## Kontext
`RSF-*` (ADR-012) recherchiert Wikipedia (heute höchstens drei Artikel je Person), `WSP-*` (ADR-019) die Websuche nur mit `--web` (heute drei deutsche Suchanfragen, fünf Seiten, bis fünf Quellen). Linksammlung, Webkurztext (`web`), Prüfregeln und Anzeige bestehen (SERVICE-15).

## Story-Schnitt
1. `STORY-01` Wikipedia in allen Sprachen recherchieren und als Links speichern
2. `STORY-02` Websuche mehrsprachig im Standardlauf und Seiteninhalte für den Text nutzen

## Abgrenzung
**Nicht enthalten:** Zusammenführen von `wikipedia.summary` und `web.summary` zu einem Feld, Anzeige der Linksammlung in der Webanwendung, Übernahme der Links nach `data/`, Bilder aus anderen Quellen als Commons, Suchmaschinen-APIs, Übersetzung der Quellen durch Dienste (der Skill übersetzt beim Schreiben selbst).

## Betroffene Bereiche
`setup` (Skill, Skripte `scripts/photographers/`), `content` (Schema: Quellenzahl), Spezifikation `setup/recherche-in-allen-sprachen`; ADR-020 (Proposed).

## Vorbereitete Spezifikation (Phase 3)
- EARS: `setup/recherche-in-allen-sprachen.md` (RAS-UB-1 bis RAS-UB-6, RAS-EV-1); ersetzt Teile von RSF-UB-2, WSP-UB-1, WSP-EV-1, WSP-UB-3, WSP-UB-4
- Gherkin: `setup/recherche-in-allen-sprachen.feature`
- Quality: Q-SEC-8, Q-DATA-16
- ADR: ADR-020 (Proposed); geltend ADR-006, ADR-007, ADR-011, ADR-012, ADR-019

## Annahmen
- ANNAHME: Ticket-Key `SERVICE-16`. Beim Start lagen uncommittete Änderungen vor (Übernahme Antanas Sutkus in `data/`, `data/portraits/`, `updates/2026-10-31/`); sie gehören nicht zu diesem Ticket und bleiben unberührt.
- ANNAHME: „Alle Sprachen“ der Wikipedia = alle Sprachversionen, die Wikidata kennt (als Links); Anfangstexte werden für höchstens zehn Sprachversionen geladen (Reihenfolge wie RSF-UB-2), um Wikimedia nicht zu belasten.
- ANNAHME: „Alle Sprachen“ im Web = sechs Suchanfragen in Deutsch, Englisch, Französisch, Spanisch, Italienisch, Niederländisch (Berufswort in der jeweiligen Sprache). Eine Suche in wirklich allen Sprachen ist weder sinnvoll noch höflich.
- ANNAHME: Die Websuche gehört zum Standardlauf; `--no-web` schaltet sie ab, `--web` bleibt als unschädlicher Alias. Obergrenzen je Person: 6 Anfragen, 10 Treffer je Anfrage, 10 Seiten, 10 Quellen.
- ANNAHME: Die Wikipedia-Seiten selbst werden nicht über den Webabruf geladen, sondern über die Wikimedia-API (RSF-UB-3); ihre Adressen stehen aber in der Linksammlung.
- ANNAHME: „Speichern in Form von Links“ = die bestehende Linksammlung `updates/photographers-links.json`; keine Übernahme nach `data/`.
- ANNAHME: Es bleiben zwei Textfelder (`wikipedia.summary`, `web.summary`); ein zusammengeführter Text ist ein eigenes Vorhaben.
- ANNAHME: ADR-020 als `Proposed`, weil Obergrenzen und Standardlauf mehrere vertretbare Alternativen haben.

## Qualitätserwartungen
Q-SEC-8, Q-DATA-16; weiter Q-SEC-4, Q-SEC-5, Q-SEC-7, Q-DATA-14, Q-DATA-15, Q-MAIN-6.

## Definition of Done
- Spezifikation konsistent; ADR-020 an H2 bestätigt.
- Build, `npm test`, `npm run web:test`, `npm run lint:all`, `npm run validate:data` grün; Szenarien als Tests umgesetzt.
- Skill, `updates/README.md` und README dokumentieren den Standardlauf und `--no-web`.

## Risiken
- Mehr Anfragen an Wikimedia (bis zu zehn Artikel) und an Dritte (bis zu zehn Seiten): Abstände und `robots.txt` bleiben bindend.
- Mehrsprachige Quellen: Übersetzungsfehler und widersprüchliche Angaben; Prüfung liegt bei der Freigabe, Widersprüche werden weggelassen.
- Namensgleiche Personen in den Treffern.
- Die Websuche des Agenten ist nicht deterministisch und in Tests nicht verfügbar; Tests laufen gegen Fixtures.
