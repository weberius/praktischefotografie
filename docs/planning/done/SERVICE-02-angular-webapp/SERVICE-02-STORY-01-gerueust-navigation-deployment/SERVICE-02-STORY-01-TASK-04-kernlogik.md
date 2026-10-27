# SERVICE-02-STORY-01-TASK-04 – Modelle, Daten-Service, Status-Logik, Venue-Filter
- **Story:** STORY-01
- **EARS:** EXH-UB-2, NAV-UN-1, MAP-UB-2, MAP-UB-4, ORG-UB-4, VNU-UB-2
- **Gherkin:** `web/ausstellungen.feature` · „Status der Ausstellung“; `web/karte.feature` · „Filter wirken kombiniert“, „Filterzustand in der Adresse“; `web/veranstalter.feature` · „Festivalfilter in der Karte“; `web/navigation.feature` · „Daten nicht ladbar“
- **Quality:** Q-MAIN-1, Q-USE-4
- **ADR:** ADR-002
- **Aufgabe:** `core/`: Typen zu den Schemas, `DataService` (HttpClient, Signals, Fehlerzustand), `Clock` (injizierbar), `exhibition-status.ts`, `venue-filter.ts` (Stadt, Typ, library, collection, organizer; Query-Parameter-Abbildung), `shared/status-badge`.
- **Prüfkriterium:** Jasmine-Tests zu den Szenarien grün, Abdeckung `core/` ≥ 80 %.
