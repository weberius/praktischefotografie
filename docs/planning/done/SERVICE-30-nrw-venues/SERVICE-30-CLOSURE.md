# Closure: SERVICE-30 – Weitere Fotografie-Orte in NRW

- **Ergebnis:** Sechs Orte in `data/venues.json` (Bestand 41 → 47): Japanisches Kulturinstitut Köln, Gasometer Oberhausen, Camera Obscura Mülheim, Von der Heydt-Museum Wuppertal, Kunstmuseen Krefeld, LWL-Museum Münster (VEN-UB-17 bis VEN-UB-19, Q-DATA-25). H2 akzeptiert, Annahmen bestätigt.
- **Prüfung:** Build, `npm run validate:data`, `npm test` (279 von 279), `npm run lint:all` grün. `npm run web:test` nicht ausgeführt.
- **Review:** Eigenprüfung von Daten und Test, keine Befunde.
- **Offen/schwach belegt:** Gasometer-Adresse nur über die Tourismusseite Oberhausen belegt; Fotografiebezug von Krefeld, Münster, Gasometer und Institut stützt sich auf die Idee; Saal des Instituts bis November 2026 geschlossen.
- **Folgeschritte:** Ausstellungen und Events über `/update-venue-data` und `/research-events`; Festivalbeteiligung des Instituts an der Internationalen Photoszene Köln möglich.
