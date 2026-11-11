# Closure: SERVICE-28 – Fotografie-Orte in Dortmund

- **Ergebnis:** 4 Dortmunder Orte in `data/venues.json` (Bestand 36 → 40): Projektraum Fotografie, Kulturort Depot, Kunsthalle Dortmund (ehemals HMKV), FH Dortmund Fachbereich Design (VEN-UB-12 bis VEN-UB-14, Q-DATA-23). H2 akzeptiert, Annahmen bestätigt.
- **Prüfung:** Build, `npm run validate:data`, `npm test` (277), `npm run lint:all` grün. `npm run web:test` nicht lauffähig (kein Chrome); Webtests nutzen Fixtures.
- **Spezifikationskorrektur:** HMKV und Kunsthalle Dortmund sind ein Ort (5 → 4 Orte).
- **Offen/schwach belegt:** Foto-Bezug des Depots; Ausstellungsbetrieb der FH nicht belegt, PLZ 44139; f² Fotofestival nicht erfasst (kein Zeitraum, kein Veranstalter).
- **Folgeschritte:** Ausstellungen und Events über `/update-venue-data` und `/research-events`; offene Idee 020 (Essen).
