# SERVICE-01 – Phase 1: Datenbasis NRW

**Status:** Entwurf (wartet auf Freigabe an H1)  ·  **Quelle:** [PRD](../../../product/prd.md), Abschnitt 5, Phase 1

## Ziel

Eine geprüfte, versionierte Datenbasis für Foto-Orte in NRW, auf der die spätere statische SPA aufsetzen kann. Die Daten liegen als JSON im Repository und werden im Build gegen ein Schema und auf referenzielle Integrität geprüft.

**Zweck in einem Satz:** Redaktion und spätere SPA sollen sich auf ein verbindliches, validiertes Datenmodell mit belastbaren NRW-Venues stützen können.

**Erfolgskriterien**
- Das JSON-Schema für `venues`, `exhibitions`, `events`, `organizers` und `posts` ist finalisiert und dokumentiert (PRD 3.2).
- 20–30 relevante Venues in NRW (Monschau, Köln, Düsseldorf, Essen, Gelsenkirchen) sind erfasst. Jeder Datensatz nennt Quelle und Prüfstand.
- Eine Validierung mit klarer Fehlermeldung schlägt bei Schema- und Referenzfehlern fehl.

## Kontext

Das Projekt folgt dem Architekturmuster von `klangland`: statische SPA, Inhalte als JSON und Markdown. Dieses Ticket legt nur das Datenfundament.

## Abgrenzung

**Enthalten:** Schema, Validierung, Recherche und Erfassung der Venues, Datenpflege-Konventionen.
**Nicht enthalten:**
- SPA, Karte und Agenda (eigenes Folgeticket, Stack wie `klangland`).
- Magazin-Beiträge (PRD Phase 2) und Festival-Modus (PRD Phase 3).
- Equipment-Tests und Dienstleister-Verzeichnisse (PRD 1.3).
- Vollständige Erfassung von Ausstellungen und Fotograf:innen. Es werden nur so viele Beispiele erfasst, wie zur Schema- und Referenzprüfung nötig sind.

## Erwarteter Story-Schnitt (grob)
1. Datenmodell finalisieren und per Schema validieren.
2. Venues in NRW recherchieren und erfassen.
3. Referenzielle Integrität und Datenqualität im Build absichern.

## Betroffene Bereiche
`content` (Daten), `setup` (Validierungsskript).

## Qualitätserwartungen
- **Datenqualität:** Schema-Validierung und referenzielle Integrität (`venueId`, `festivalId`, `photographerIds`) bei jedem Build. Dazu ein Pflichtfeld für Quelle und Prüfstand.
- **Datenschutz:** Keine personenbezogenen Daten über Fotograf:innen hinaus, die öffentlich dokumentiert sind. Keine Telemetrie.
- **Performance und Barrierefreiheit:** Betreffen die SPA. Für die Datenbasis gilt nur: kompakte Dateien und Adressdaten, die später eine textuelle Listenalternative zur Karte tragen.

## Definition of Done
- Spezifikation (EARS, Gherkin, Quality) liegt vor und ist konsistent.
- Validierung läuft lokal und per `npm test` bzw. gleichwertigem Befehl.
- 20–30 Venues mit Quelle sind erfasst und an H2 stichprobenartig vom Menschen geprüft.

## Risiken
- Recherchierte Daten können veraltet oder falsch sein. Gegenmaßnahme: Quelle und Prüfstand je Datensatz, Verifikation an H2.
- Koordinaten und Adressen aus Web-Recherche sind fehleranfällig. Gegenmaßnahme: Plausibilitätsprüfung (Bounding Box NRW).
- Ohne SPA fehlt die visuelle Abnahme. Gegenmaßnahme: Abnahme an H2 über Validierungsbericht und Datenübersicht.
