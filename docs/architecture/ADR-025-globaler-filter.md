# ADR-025: Globalen Filter im Speicher der Sitzung halten

**Status:** Accepted  ·  **Datum:** 2026-11-02

## Kontext
Karte und Ortsverzeichnis haben je einen eigenen Filter im Query-Parameter (ADR-004); Events, Ausstellungen und Agenda haben nur lokale Filter. Gewünscht ist ein Filter nach Orten und Ortstypen, der für die gesamte Anwendung gilt und die alten Filter ablöst. Die Anwendung ist eine statische SPA ohne Backend (ADR-002); Favoriten liegen bereits im Speicher eines Wurzeldienstes (ADR-023), die Navigation ist clientseitig.

## Entscheidung
- Ein Wurzeldienst hält die Auswahl (Orte, Ortstypen) als Signale im Speicher; alle filterbaren Seiten lesen daraus und berechnen ihre Ansicht (Filterfunktion für Orte und für Einträge über `venueId`).
- Eine gemeinsame Komponente stellt die Bedienung auf allen filterbaren Seiten bereit.
- Der Filter steht nicht in der Adresse und wird nicht gespeichert. Festival- und Veranstalterfilter bleiben Query-Parameter.
- Die Filter nach Stadt, Präsenzbibliothek und Ständiger Sammlung entfallen mit den alten Filtern. Dies ersetzt die Filteranteile von ADR-004 („Filterzustand in der URL“, Filter-Listenalternative).

## Alternativen
- **Query-Parameter auf jeder Seite:** teilbar, aber Zustand müsste bei jedem Link mitgeführt werden und gilt nicht „global“.
- **`localStorage`/`sessionStorage`:** überlebt das Neuladen; widerspricht der Datenschutzlinie (RCH-UB-3) und dem Muster von ADR-023.
- **Filter im Seitenkopf:** wäre überall sichtbar, belegt aber Platz auf Seiten ohne Filterwirkung und kollidiert mit der vollflächigen Karte (ADR-016).

## Konsequenzen
- Filter gelten über Seiten hinweg, gehen beim Neuladen verloren; Adressen mit Filterstand sind nicht mehr teilbar (außer Festival/Veranstalter).
- Bestehende Adressen mit `city`, `type`, `library`, `collection` werden ignoriert.
- Keine neue Abhängigkeit; Datenschutz unverändert (Q-SEC-11).

## Auswirkungen
- EARS: FLT-UB-1 bis FLT-UB-7, FLT-ST-1, FLT-UN-1; Supersede VNU-UB-2, MAP-UB-2, MAP-UB-4, MAP-EV-1, MAP-UN-1, MAP-UB-8
- Features: `web/filter.feature`, `web/karte.feature`, `web/orte.feature`
- Quality: Q-USE-18, Q-SEC-11
- Verwandt: ADR-002, ADR-004 (teilweise ersetzt), ADR-016, ADR-023
