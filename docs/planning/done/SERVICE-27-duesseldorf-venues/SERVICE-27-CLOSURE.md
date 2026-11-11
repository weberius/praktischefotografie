# Closure: SERVICE-27 – Fotografie-Orte in Düsseldorf

- **Ergebnis:** 12 Düsseldorfer Orte in `data/venues.json` (Bestand 24 → 36); Bestandsgrenze 20–60 (VEN-UB-8 bis VEN-UB-11, Q-DATA-21, Q-DATA-22).
- **Prüfung:** Build, `npm test` (276), `npm run web:test`, `npm run lint:all` grün; Code-Review ohne Befunde. H2 akzeptiert, Annahmen bestätigt.
- **Offen/schwach belegt:** Foto-Bezug von Galerie Voss, Philara, Filmmuseum; Bibliotheksangabe Polnisches Institut (Website zuletzt nicht erreichbar); LUMAS-Anschrift Grünstraße 8 statt 15.
- **Folgeschritte:** Ausstellungen und Events der neuen Orte über `/update-venue-data` und `/research-events`; offene Ideen 019 (Dortmund) und 020 (Essen).
