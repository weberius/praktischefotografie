# SERVICE-06-STORY-03 – Skill research-photographers

**Als** Redakteur:in **möchte ich** die Recherche der Fotograf:innen über Wikipedia (mehrere Sprachen), Wikidata und Wikimedia Commons mit einem Skill auslösen **damit** Profile entstehen, ohne dass ich Artikel und Bilder von Hand suche.

## Akzeptanzkriterien
1. Ein Aufruf des Skills führt durch Abruf, Zusammenfassung, Prüfung, Freigabe und Übernahme; er lässt sich auf eine Person beschränken.
2. Die Recherche findet den Eintrag der Person eindeutig (Beruf Fotograf:in oder Künstler:in laut Wikipedia/Wikidata) und übernimmt die Berufsbezeichnung und nutzt Wikipedia-Artikel in mehreren Sprachen, nicht nur Deutsch; nicht gefundene oder mehrdeutige Personen bleiben unverändert und stehen im Bericht.
3. Lebensdaten stammen aus Wikidata, Zusammenfassungen sind eigenständig formuliert (40 bis 90 Wörter) und nennen ihre Quellen; wörtliche Übernahmen größerer Passagen werden verworfen.
4. Ein Bild wird nur geladen, wenn es frei lizenziert ist und Urheber und Dateiseite bekannt sind; es wird auf höchstens 400 Pixel Breite verkleinert gespeichert, Attribution wird erfasst.
5. Daten ändern sich erst nach Freigabe; bei Fehlern bleibt alles unverändert; Vorhandenes wird nur mit `--force` ersetzt.
6. Abrufe gehen nur an Wikimedia, höflich (Abstand, Kennung, Cache) und sind offline testbar.
7. Ein Bericht nennt Funde, Lücken, Sprache und Lizenz je Person.

## Spezifikation (Phase 3, vorab erstellt)
- EARS: RSF-UB-1 bis RSF-UB-7, RSF-EV-1, RSF-EV-2, RSF-UN-1, RSF-UN-2, RSF-OP-1, RSF-OP-2
- Gherkin: `setup/fotografinnen-recherche.feature`
- Quality: Q-SEC-5, Q-MAIN-4, Q-DATA-7, Q-DATA-8
- ADR: ADR-012, ADR-011

**INVEST:** I (abhängig von STORY-02) N ✔ V ✔ E ✔ S (grenzwertig, ggf. Abruf und Prüfung/Übernahme trennen) T ✔
