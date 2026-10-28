# SERVICE-04-STORY-01-TASK-01 – Planung
- **Story:** STORY-01
- **EARS:** NWS-UB-1 bis NWS-UB-4, NWS-UN-1, NWS-UN-3, NWS-EV-1, NWS-OP-1
- **Gherkin:** `setup/magazin-neuigkeiten.feature` · Kennung, Datum, Plan, neu, kurze Ausstellung, Termin, zweiter Lauf, verwaist, Ort
- **Quality:** Q-REL-2, Q-MAIN-3
- **ADR:** ADR-008
- **Aufgabe:** `scripts/news/lib/news.mjs` und `news:plan`: Plan nach `updates/<Datum>/news.json` mit Kontext je Eintrag; bereits vorhandene Texte im Plan bleiben erhalten.
- **Prüfkriterium:** Node-Tests zu den Szenarien grün.
