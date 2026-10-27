# EARS: Datenvalidierung (Kürzel `VAL`)

**Bereich:** setup  ·  **Systemname:** Validator  ·  **Stand:** 2026-10-27

Aufruf: `npm run validate:data`.

| ID | Anforderung | Gherkin | Quality | ADR |
| --- | --- | --- | --- | --- |
| VAL-EV-1 | Wenn die Validierung gestartet wird, soll der Validator jede JSON-Datei in `data/` gegen das zugehörige Schema aus `schema/` prüfen. | `setup/datenvalidierung.feature` · „Gültige Daten bestehen die Validierung“ | Q-PERF-2 | ADR-001 |
| VAL-EV-2 | Wenn alle Prüfungen bestanden sind, soll der Validator eine Zusammenfassung mit Anzahl je Datei ausgeben und mit Exit-Code 0 enden. | `setup/datenvalidierung.feature` · „Gültige Daten bestehen die Validierung“ | – | ADR-001 |
| VAL-UN-1 | Wenn ein Datensatz sein Schema verletzt, soll der Validator Datei, Datensatz-ID, Pfad im Datensatz und verletzte Regel melden und mit Exit-Code 1 enden. | `setup/datenvalidierung.feature` · „Schemaverstoß wird gemeldet“ | Q-DATA-1 | ADR-001 |
| VAL-UN-2 | Wenn ein Verweis (`venueId`, `festivalId`, `photographerIds`, `linkedVenueIds`, `linkedExhibitionIds`, `contentFile`) auf ein nicht vorhandenes Ziel zeigt, soll der Validator Datei, Datensatz-ID und Verweisfeld melden und mit Exit-Code 1 enden. | `setup/datenvalidierung.feature` · „Unbekannte Referenz wird gemeldet“ | Q-DATA-1 | ADR-001 |
| VAL-UN-3 | Wenn eine `id` innerhalb einer Datei mehrfach vorkommt, soll der Validator die doppelte `id` melden und mit Exit-Code 1 enden. | `setup/datenvalidierung.feature` · „Doppelte ID wird gemeldet“ | Q-DATA-1 | ADR-001 |
| VAL-UN-4 | Wenn die Koordinaten einer Venue außerhalb der NRW-Grenzen aus VEN-UB-2 liegen, soll der Validator die Venue melden und mit Exit-Code 1 enden. | `setup/datenvalidierung.feature` · „Koordinaten außerhalb NRW werden gemeldet“ | Q-DATA-1 | ADR-001 |
| VAL-UN-5 | Wenn `endDate` vor `startDate` liegt (DAT-UN-1), soll der Validator Datei und Datensatz-ID melden und mit Exit-Code 1 enden. | `content/daten.feature` · „Ausstellung endet nicht vor Beginn“ | Q-DATA-1 | ADR-001 |
| VAL-UB-1 | Der Validator soll keine Netzwerkzugriffe ausführen. | `setup/datenvalidierung.feature` · „Validierung greift nicht auf das Netz zu“ | Q-SEC-1 | ADR-001 |
