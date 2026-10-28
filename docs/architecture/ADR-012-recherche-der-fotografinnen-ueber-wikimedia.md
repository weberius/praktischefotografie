# ADR-012: Recherche der Fotograf:innen über Wikipedia, Wikidata und Commons

**Status:** Accepted (an H2 am 2026-10-28 bestätigt)  ·  **Datum:** 2026-10-28

## Kontext
Profile (ADR-011) sollen aus den Wikipedia-Ausgaben mehrerer Sprachen und Bildern von Wikimedia Commons entstehen und durch einen eigenen Skill ausgelöst werden. klangland arbeitet mit Python-Skripten, nur der deutschen Wikipedia, einem blinden ersten Suchtreffer und kennt weder Sprache noch Lizenz. Dieses Projekt nutzt Node-Skripte und Skills mit Freigabe (ADR-006, ADR-007).

## Entscheidung
- **Eigener Skill `research-photographers`** (`.claude/skills/research-photographers/SKILL.md`) und Node-Skripte `npm run photographers:fetch`, `photographers:check`, `photographers:apply` unter `scripts/photographers/`.
- **Identifikation über Wikidata.** Suche nach dem Namen (Wikidata `wbsearchentities` in Deutsch und Englisch, ergänzend Wikipedia-Suche); infrage kommen nur Einträge, deren Beruf (P106) Fotograf:in oder (bildende:r, Medien-) Künstler:in ist; die Berufsbezeichnung (Label des Berufs) wird als `occupation` übernommen und folgt damit der Wikipedia. Mehrere gleich gute Treffer sind „mehrdeutig“, kein Treffer „nicht gefunden“; beides ändert nichts. Das ersetzt den blinden ersten Suchtreffer.
- **Sprachen über Sitelinks.** Alle Sprachversionen aus den Sitelinks des Wikidata-Eintrags; bevorzugt Deutsch, Englisch, Französisch, Spanisch, Italienisch, Niederländisch, danach alphabetisch; bis zu drei Artikel mit Anfangstext (REST-Summary der jeweiligen Wikipedia).
- **Stammdaten aus Wikidata:** Lebensjahre (P569, P570) und Bild (P18, ersatzweise das Titelbild der Wikipedia-Summary, sofern die Datei auf Commons liegt; lokale Dateien einer Sprachversion sind unzulässig).
- **Bild von Commons:** Metadaten über die Commons-API (`imageinfo` mit `extmetadata`: Urheber, Lizenzkürzel, Lizenz-URL, Dateiseite), Download des Vorschaubilds mit 400 px Breite (`iiurlwidth`), Ablage unter `.cache/portraits/`; nur frei lizenziert und mit Urheber.
- **Zusammenfassung durch Claude im Skill** (wie ADR-007): Der Skill liest die Kandidatendatei und schreibt `updates/<Datum>/photographers.json` mit `summary`, `sources`, `life`, `portrait`. Die deterministische Prüfung verwirft Wortzahlen außerhalb 40–90, wörtliche Folgen ab acht Wörtern aus den Anfangstexten, fremde Quellen und unfreie oder zu große Bilder.
- **Freigabe vor Übernahme:** `photographers:apply` übernimmt nur Freigegebenes, kopiert die Bilder nach `data/portraits/`, validiert und rollt bei Fehlern zurück; Vorhandenes nur mit `--force`.
- **Höflicher Abruf:** nur Wikimedia-Hosts (Wikipedia-Sprachversionen, Wikidata, Commons, `upload` und `thumb`; Weiterleitungen werden einzeln geprüft), ≥ 1 s Abstand, `User-Agent` mit Kontakt (`SCRAPE_CONTACT`), Cache `.cache/wikipedia/` (30 Tage), Wiederholungen bei 429/5xx, kein Abruf offline.
- **Berichte und Vorschläge** liegen versioniert unter `updates/`; Cache und Rohantworten nicht.

## Alternativen
- **Wikipedia-Suche mit erstem Treffer (klangland):** Fehleranfällig bei Namensgleichheit.
- **SPARQL gegen Wikidata:** Mächtig, aber komplexer und mit eigenen Limits; die Entity-API genügt.
- **Bilder per eigenem Skript verkleinern:** Braucht Bildbibliotheken; das Commons-Vorschaubild liefert dieselbe Verkleinerung ohne Abhängigkeit.
- **Kein Skill, manuelle Pflege:** Widerspricht der Vorgabe.

## Konsequenzen
- Die Qualität der Zusammenfassungen hängt vom Modell ab; Form, Quellen und Bildrechte sind automatisch geprüft, die Sachrichtigkeit prüft der Mensch.
- Mehrsprachige Quellen erfordern, dass der Skill übersetzt bzw. zusammenführt; die Wortgrenze und das Verbot wörtlicher Folgen begrenzen das Risiko.
- Wikidata-Berufe sind eine Heuristik: Personen ohne passenden Berufseintrag werden nicht gefunden und bleiben unverändert; die Berufsbezeichnung ist so gut wie die Wikipedia/Wikidata-Angabe.

## Auswirkungen
- EARS: RSF-UB-1 bis RSF-UB-7, RSF-EV-1, RSF-EV-2, RSF-UN-1, RSF-UN-2, RSF-OP-1, RSF-OP-2
- Features: `setup/fotografinnen-recherche.feature`
- Quality: Q-SEC-5, Q-MAIN-4, Q-DATA-7, Q-DATA-8
