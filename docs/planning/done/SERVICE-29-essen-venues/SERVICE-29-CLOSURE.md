# Closure: SERVICE-29 – Fotografie-Orte in Essen

- **Ergebnis:** Folkwang Universität der Künste (Fachbereich Gestaltung mit Fotografie, Campus Zollverein) in `data/venues.json` (Bestand 40 → 41); Museum Folkwang und Ruhr Museum unverändert und einmalig (VEN-UB-15, VEN-UB-16, Q-DATA-24). H2 akzeptiert, Annahmen bestätigt.
- **Prüfung:** Build, `npm run validate:data`, `npm test`, `npm run lint:all` grün. `npm run web:test` nicht ausgeführt.
- **Review:** Eigenprüfung von Daten und Test, keine Befunde.
- **Offen/schwach belegt:** Studiengang Fotografie nur über die Navigation der Startseite belegt; Hauptsitz Werden nicht als Ort geführt.
- **Folgeschritte:** Ausstellungen und Events über `/update-venue-data` und `/research-events`; offene Idee 021 (weitere NRW-Orte).
