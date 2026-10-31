# ADR-019: Personen über eine Suchmaschine recherchieren, Links sammeln, Kurztext aus Webquellen

**Status:** Accepted  ·  **Datum:** 2026-10-31

## Kontext
Die Recherche der Fotograf:innen (ADR-012) beschränkt sich auf Wikidata, Wikipedia und Commons. Personen ohne Wikipedia-Artikel bleiben ohne Profil. Gewünscht ist zusätzlich eine Suche über eine Suchmaschine, eine Datei mit den gefundenen Links, das Anlegen fehlender Personen, die Berücksichtigung neuer Ergebnisse in den Kurztexten und die Beschränkung der Bilder auf Wikimedia Commons (geklärte Nutzungsrechte). Trefferseiten gehören Dritten (ADR-006); Texte sind urheberrechtlich geschützt. Die Wikipedia-Recherche muss unverändert möglich bleiben.

## Entscheidung
- **Erweiterung des Skills statt neuer Skill:** `research-photographers` erhält `--web` mit `--photographer <id>` oder `--name "<Name>"`. Ohne `--web` verhält er sich wie in ADR-012.
- **Suche durch den Skill, Ablage durch Skripte:** Der Skill führt die Suchanfragen mit der Websuche des Agenten aus (höchstens drei je Person, zehn Treffer je Anfrage) und schreibt die Treffer in `updates/<Datum>/photographers-search.json`. Das Skript `npm run photographers:web -- links` prüft und normalisiert sie (nur http/https, ohne Fragment und Tracking-Parameter, ohne Dubletten) und schreibt sie in die kumulative **Linksammlung** `updates/photographers-links.json`. Die Linksammlung ist versioniert, nicht Teil des Builds und nicht Teil von `data/`.
- **Trefferseiten über den Abrufdienst:** Seiteninhalte werden nur nach den Regeln aus ADR-006 abgerufen (`robots.txt`, ≥ 2 s je Website, Kennung `SCRAPE_CONTACT`, keine fremden Weiterleitungen, höchstens fünf Seiten je Person), Snapshots unter `.cache/snapshots/<person-id>/`, nicht versioniert.
- **Neue Personen:** Das Skript schlägt einen Eintrag mit `id` und `name` vor (Umschrift von Umlauten und Sonderzeichen); Dubletten nach Name und `id` werden ausgeschlossen (wie PRF-UN-2). Angelegt wird erst nach Freigabe (ADR-007, ADR-012).
- **Kurztext als eigenes Feld `web`** (`summary` 40–90 Wörter, `sources` 1–5 mit `title` und `url`) neben `wikipedia`. Er wird nur neu vorgeschlagen, wenn die Linksammlung neue Links erhalten hat. Zusammenfassung durch Claude im Skill; die Prüfung verwirft falsche Wortzahlen, wörtliche Folgen ab acht Wörtern, Quellen außerhalb der Linksammlung und mehr als fünf Quellen.
- **Bilder nur von Commons:** unverändert über ADR-012 (Wikidata P18 bzw. Commons-Metadaten, freie Lizenz, Urheber); Bilder von Trefferseiten werden nie geladen oder verlinkt, Vorschläge mit solchen Bildern verworfen.
- **Webanwendung:** Die Personenseite zeigt den Webkurztext unter „Aus dem Web“ mit Hinweis und Quellenlinks (`rel="noopener noreferrer"`); sie lädt dabei nichts von Fremdhosts (Q-SEC-2).
- **Freigabe, Prüfung und Rollback** wie in ADR-012; vorhandene `web`-Werte nur mit `--force` ersetzen.

## Alternativen
- **Eigene Suchmaschinen-API im Skript (Bing, Google, Brave):** Reproduzierbar, braucht aber Schlüssel, Kosten und Nutzungsbedingungen; verworfen zugunsten der Websuche des Agenten, die an die Linksammlung als gemeinsame Schnittstelle gebunden ist.
- **Kurztext direkt in `wikipedia.summary` mischen:** Vermischt Quellen und Lizenzen (CC BY-SA); eigenes Feld hält Herkunft trennbar.
- **Linksammlung in `data/` und in der Webanwendung veröffentlichen:** Mehr Pflege (Schema, Link-Prüfung) und ungeprüfte Trefferlinks; zunächst nur Arbeitsmaterial.
- **Bilder von Trefferseiten:** Nutzungsrechte ungeklärt; ausgeschlossen.
- **Eigener neuer Skill:** Doppelt Freigabe- und Berichtslogik; Erweiterung genügt.

## Konsequenzen
- Die Websuche ist ein Agentenwerkzeug und nicht deterministisch; Reproduzierbarkeit entsteht erst durch Suchdatei, Cache und Linksammlung. Tests laufen gegen einen lokalen Testserver bzw. Fixtures.
- Suchmaschinen-Ergebnisse können falsche oder gleichnamige Personen enthalten; Namensgleichheit prüft der Mensch bei der Freigabe.
- Trefferseiten können nicht freigegeben, gesperrt oder JavaScript-lastig sein; dann arbeitet der Skill nur mit Textauszügen und nennt die Lücke im Bericht.
- Schemaänderung: `schema/photographers.schema.json` bekommt `web`; Webanwendung und Validierung folgen (PRF-UB-6, PRF-UN-4, PHO-UB-11).
- Rechtliche Bewertung der Zusammenfassungen fremder Seiten bleibt Aufgabe der Redaktion (eigene Formulierung, Quellenangabe, Hinweis).

## Auswirkungen
- EARS: WSP-UB-1 bis WSP-UB-7, WSP-EV-1 bis WSP-EV-4, WSP-OP-1, WSP-UN-1, WSP-UN-2, PRF-UB-6, PRF-UN-4, PHO-UB-11, PHO-ST-3
- Features: `setup/personen-websuche.feature`, `content/fotografinnen-profile.feature`, `web/fotografinnen.feature`
- Quality: Q-SEC-7, Q-DATA-14, Q-DATA-15, Q-MAIN-6; berührt Q-USE-5, Q-SEC-2
- Bezüge: ADR-006 (Abruf), ADR-007 (Freigabe), ADR-011 (Profile), ADR-012 (Wikimedia-Recherche); ADR-012 bleibt gültig.
