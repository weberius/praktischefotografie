# SERVICE-06-STORY-04 – Darstellung in der Webanwendung nach klangland

**Als** Besucher:in **möchte ich** Fotograf:innen mit Portrait, Lebensdaten, Wikipedia-Zusammenfassung und ihren Ausstellungen sehen **damit** ich die Beteiligten einer Ausstellung kennenlerne, mit sichtbarer Quellen- und Bildangabe.

## Akzeptanzkriterien
1. Die Liste der Fotograf:innen zeigt jede Person als Karte mit Name, Berufsbezeichnung, Lebensdaten und Portrait (soweit vorhanden), alphabetisch.
2. Die Personenseite zeigt Name, Berufsbezeichnung, Lebensdaten, Portrait mit sichtbarem Bildnachweis (Urheber, Lizenz, Link zur Dateiseite), Kurzbiografie, Website, den Abschnitt „Aus der Wikipedia“ mit Zusammenfassung, Quellenlinks je Sprache und CC-BY-SA-Hinweis sowie „Ausstellungen (n)“.
3. Fehlen Portrait oder Zusammenfassung, erscheinen weder Bild, Bildnachweis noch Abschnitt; lädt das Bild nicht, bleibt die Seite ohne Bild.
4. Bilder laden verzögert, haben Alternativtext und feste Maße; die Seiten bleiben barrierefrei und performant.
5. Aufbau und Gestaltung orientieren sich an der Komponist:innen-Seite von klangland.

## Spezifikation (Phase 3, vorab erstellt)
- EARS: PHO-UB-5 bis PHO-UB-9, PHO-ST-2, PHO-UN-1 (ersetzt PHO-UB-2)
- Gherkin: `web/fotografinnen.feature`
- Quality: Q-PERF-6, Q-USE-5, Q-USE-2
- ADR: ADR-011, ADR-002

**INVEST:** I (abhängig von STORY-02) N ✔ V ✔ E ✔ S ✔ T ✔
