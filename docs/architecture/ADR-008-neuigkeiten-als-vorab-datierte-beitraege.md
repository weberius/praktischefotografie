# ADR-008: Neuigkeiten als vorab datierte Beiträge mit deterministischer Kennung

**Status:** Accepted (an H2 am 2026-10-28 bestätigt)  ·  **Datum:** 2026-10-28

## Kontext
Der Skill `update-venue-data` soll bei jeder Datenpflege Neuigkeiten für das Magazin erzeugen (neu, Eröffnung, „Endet bald“, Ende), jeweils als Text von 60 bis 80 Wörtern. Eröffnungen und Enden fallen auf Tage, an denen kein Lauf stattfindet. Das Magazin zeigt Beiträge mit zukünftigem Datum erst am Tag selbst (BLG-UN-1). Das Datenmodell der Beiträge (`posts.json`, ADR-001) soll unverändert bleiben.

## Entscheidung
- **Neuigkeit = regulärer Beitrag.** Eintrag in `data/posts.json` mit `linkedVenueIds`, `linkedExhibitionIds`, `excerpt` und `contentFile` (`content/posts/<id>.md`, Markdown mit Frontmatter `title` und `date`).
- **Deterministische Kennung.** `id` und `slug` lauten `<Ausstellungs-id>-<Anlass>` mit Anlass `neu`, `eroeffnung`, `endet-bald`, `ende`. Daraus folgen Dublettenschutz und Wiedererkennung ohne neues Schemafeld.
- **Vorab datiert.** Beim Fund werden alle noch fehlenden Anlässe angelegt, auch zukünftige. Das Magazin blendet sie bis zum Datum aus. Änderungen der Ausstellungstermine führen zu „angepasst“ (neuer Text, neues Datum) beim nächsten Lauf.
- **Planen, prüfen, übernehmen in Skripten.** `news:plan` schreibt `updates/<Datum>/news.json` (ohne Text), der Skill ergänzt die Texte (Claude, aus Daten und Snapshots), `news:check` prüft Form (Wortzahl, Namen, Länge) und schreibt `NEWS.md`, `news:apply` übernimmt nur freigegebene, gültige Einträge, validiert und rollt bei Fehlern zurück. Das folgt ADR-007.
- **Kein Löschen.** Verwaiste Beiträge werden nur gemeldet.

## Alternativen
- **Neuigkeiten im Frontend aus den Ausstellungsdaten erzeugen:** Kein Redaktionsaufwand und immer aktuell, liefert aber keine 60–80 Wörter langen Texte zu Künstler:innen und Ort und fügt sich nicht ins Magazin der Beiträge.
- **Neues Schemafeld `occasion`:** Expliziter, verlangt aber eine Schemaänderung in Daten, Web und Tests ohne zusätzlichen Nutzen, da die Kennung den Anlass trägt.
- **Beiträge erst am Tag des Anlasses anlegen:** Erfordert einen Lauf an genau diesem Tag; Meldungen würden verpasst.

## Konsequenzen
- Die Textqualität hängt vom Modell ab; automatisch prüfbar sind nur Form und Namen, die Sachrichtigkeit prüft der Mensch bei der Freigabe.
- Vorab geschriebene Texte können durch Terminänderungen veralten; der nächste Lauf erkennt das über das Datum.
- Texte nennen absolute Daten, nicht „heute“ oder „morgen“, weil der Beitrag später angezeigt wird.
- `posts.json` wächst mit bis zu vier Beiträgen je Ausstellung.

## Auswirkungen
- EARS: NWS-UB-1 bis NWS-UB-6, NWS-EV-1 bis NWS-EV-3, NWS-UN-1 bis NWS-UN-3, NWS-OP-1, SKL-UB-4, SKL-UB-5
- Features: `setup/magazin-neuigkeiten.feature`, `setup/update-skill.feature`
- Quality: Q-DATA-4, Q-REL-2, Q-MAIN-3
