# Analyse Architektur: SERVICE-20-STORY-01

Kein kritischer Befund. Wurzeldienst mit Signals und gemeinsame Komponente folgen ADR-025 und dem Muster aus ADR-023.

| # | Schwere | Befund | Klasse | Vorschlag |
| --- | --- | --- | --- | --- |
| A1 | hoch | „Filter zurücksetzen“ auf der Karte setzt zusätzlich Veranstalter und Festival zurück, die Komponente nur den globalen Filter (`map.ts`, `global-filter.ts`). Uneinheitlich, entfernt ggf. teilbare Parameter. | Umsetzungsfehler | ARCH-TASK-01: Komponente setzt nur den globalen Filter zurück; Karte bietet eigene, eindeutig benannte Schaltfläche für Veranstalter/Festival. |
| A2 | mittel | ADR-016, `quality/web/barrierefreiheit.md`, `quality/web/karte-darstellung.md` und MAP-UB-13 verweisen auf ersetzte IDs/Parameter. | Spezifikation | ARCH-TASK-02: Verweise per Supersede-Hinweis auf ADR-025 und MAP-UB-15 nachziehen. |
