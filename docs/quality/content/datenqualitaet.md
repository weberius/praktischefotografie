# Qualität: Datenqualität (content)

**Stand:** 2026-10-27

| ID | Szenario (Quelle · Stimulus · Umgebung · Artefakt · Antwort) | Maß | Prüfverfahren | EARS |
| --- | --- | --- | --- | --- |
| Q-DATA-1 | Redaktion ändert Dateien in `data/`; im lokalen Lauf und im Build prüft der Validator die Daten; er meldet Schema-, Referenz-, ID-, Datums- und Koordinatenfehler vollständig. | Von ≥ 10 ungültigen Fixtures werden 100 % erkannt, bei gültigen Daten gibt es 0 Fehlmeldungen. | Automatisierte Tests mit Fixtures (`npm test`) | DAT-UN-1, VEN-UB-2, VEN-UB-3, VAL-UN-1 bis VAL-UN-5 |
| Q-DATA-2 | Redaktion erfasst Venues aus Recherche; jede Venue weist ihre Herkunft aus. | 100 % der Venues haben `source.url`, `source.checkedAt` (nicht in der Zukunft) und `source.status`; Bestand 20–30 Venues. | Automatisierte Tests auf `data/venues.json` | DAT-UB-4, VEN-UB-1, VEN-UB-5 |
