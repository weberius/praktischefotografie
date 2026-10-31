# ADR-020: Recherche in allen Sprachen im Standardlauf

**Status:** Accepted  ·  **Datum:** 2026-10-31

## Kontext
ADR-012 begrenzt die Wikipedia-Recherche auf drei Artikel je Person, ADR-019 macht die Websuche zu einem Sonderfall (`--web`) mit drei deutschen Suchanfragen, fünf Seiten und fünf Quellen. Für viele Personen geben drei Anfangstexte nur ein oder zwei Sätze her (Beispiel: Antanas Sutkus); der Text bleibt dünn. Gewünscht ist die Recherche in allen Sprachen in der Wikipedia und im Web, die Fundstellen als Links und die Seiten hinter den Links als Grundlage des Textes.

## Entscheidung
- **Wikipedia:** Alle Sprachversionen aus Wikidata stehen in der Kandidatendatei (`sitelinks`) und in der Linksammlung; Anfangstexte werden für bis zu zehn Sprachversionen geladen (feste Reihenfolge). Die Wikimedia-Regeln aus ADR-012 (Hosts, Abstand, Cache) bleiben.
- **Web:** Sechs Suchanfragen je Person in sechs Sprachen (de, en, fr, es, it, nl), je bis zu zehn Treffer. Bis zu zehn Seiten je Person werden nach ADR-006 abgerufen; Wikimedia-Adressen laufen nicht über den Webabruf.
- **Standardlauf:** Die Websuche gehört zum Lauf des Skills; `--no-web` schaltet sie ab, `--web` bleibt als Alias. Der Skill ruft die Seiten ab, bevor er den Text schreibt.
- **Links:** Die bestehende Linksammlung (ADR-019) ist der Speicher; Wikipedia-Links lösen keinen neuen Webkurztext aus.
- **Text:** Bleibt in zwei Feldern (`wikipedia.summary`, `web.summary`); `web.summary` darf bis zu zehn Quellen nennen.
- Freigabe, Prüfung, Rollback, Bilder nur Commons, Schutz vor internen Adressen bleiben unverändert (ADR-007, ADR-012, ADR-019).

## Alternativen
- **Literal alle Sprachen im Web:** Hunderte Anfragen je Person; unhöflich und nicht nötig; verworfen zugunsten sechs häufiger Sprachen.
- **Anfangstexte aller Sprachversionen:** Viele Anfragen an Wikimedia bei kaum zusätzlichem Inhalt; Obergrenze zehn.
- **Websuche weiter nur mit `--web`:** Der Redaktion ist der Text aus beiden Quellen wichtiger als der Sonderfall; Standardlauf mit Abschalter.
- **Ein zusammengeführtes Textfeld:** Berührt Schema, Daten, Anzeige und Lizenzfragen (CC BY-SA); eigenes Vorhaben.
- **Links nach `data/`:** Mehr Pflege (Schema, Link-Prüfung); die Linksammlung genügt als Arbeitsmaterial.

## Konsequenzen
- Mehr Anfragen je Lauf (bis zu zehn Wikimedia-Artikel, sechs Suchanfragen, zehn Seiten je Person); Läufe für viele Personen dauern länger.
- Mehrsprachige Quellen erhöhen das Risiko von Übersetzungsfehlern und Namensgleichheit; die Prüfung liegt beim Menschen an der Freigabe.
- Prüfregeln und Tests (Quellenzahl, Seitenzahl, Anfragen) ändern sich; Schema `web.sources` steigt auf höchstens zehn.
- ADR-019 bleibt gültig, die Grenzen und `--web` werden durch diesen ADR ersetzt.

## Auswirkungen
- EARS: RAS-UB-1 bis RAS-UB-6, RAS-EV-1; ersetzt Teile von RSF-UB-2, WSP-UB-1, WSP-EV-1, WSP-UB-3, WSP-UB-4
- Feature: `setup/recherche-in-allen-sprachen.feature`
- Quality: Q-SEC-8, Q-DATA-16; berührt Q-SEC-5, Q-SEC-7, Q-DATA-14, Q-DATA-15
- Bezüge: ADR-006, ADR-007, ADR-011, ADR-012, ADR-019
