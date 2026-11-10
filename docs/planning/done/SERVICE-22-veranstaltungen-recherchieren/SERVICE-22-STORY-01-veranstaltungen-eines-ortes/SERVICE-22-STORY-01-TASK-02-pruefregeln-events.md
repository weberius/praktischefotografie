# SERVICE-22-STORY-01-TASK-02 – Prüfregeln und `--events` für check/apply

- **Story:** SERVICE-22-STORY-01
- **Spezifikation:** VRS-UB-2 bis VRS-UB-6, Q-DATA-17
- **Prüfkriterium:** Verworfen werden: andere Datensätze/Operationen, Vernissage/Finissage, Typen außerhalb der Liste, vergangene Termine, nicht im Auszug belegte Daten, Vorschläge über 30 je Ort; Dubletten wie bisher; Wiederholungslauf erzeugt nichts Neues.
- **Dateien:** `scripts/scrape/lib/proposals.mjs`, `scripts/scrape/check-proposals.mjs`, `scripts/scrape/apply-proposals.mjs`
- **Status:** Umgesetzt
