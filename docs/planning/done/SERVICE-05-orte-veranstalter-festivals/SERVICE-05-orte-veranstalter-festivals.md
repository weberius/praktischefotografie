# SERVICE-05 – Weitere Orte, Veranstalter und Festivals

**Status:** Entwurf, an H1 geklärt (Freigabe steht aus)  ·  **Quelle:** Vorgabe der Projektleitung, [Recherche](../../../discovery/weitere-orte-fotografie-nrw.md), [PRD](../../../product/prd.md) 2.4

## Ziel
Die Datenbasis unterscheidet drei Ebenen: Venues (Räume mit fester Adresse), Organizer (Veranstalter ohne eigenen Ausstellungsraum) und Festivals (zeitlich begrenzte Ausgaben, die viele Venues bündeln). Weitere Orte, Veranstalter und Festivals aus NRW werden erfasst.

**Zweck in einem Satz:** Besucher:innen sollen Festival-Ausstellungen und deren Veranstalter finden, und die Redaktion soll Orte wie fotoraum köln, Veranstalter wie die Internationale Photoszene Köln und Festivals wie das Photoszene-Festival 2027 sauber trennen können.

## Story-Schnitt
1. `STORY-01` Dreistufiges Datenmodell (Festival-Datensatz, Veranstalterfelder, Festivalbezug der Ausstellung)
2. `STORY-02` Neue Orte und Veranstalter erfassen (fotoraum köln, Michael Horbach Stiftung, Photoszene Köln, düsseldorf photo+)
3. `STORY-03` Festivals in der Webanwendung sichtbar machen
4. `STORY-04` Festivals per Update-Skill pflegen

## Abgrenzung
**Nicht enthalten:** Festival-Kartenmodus mit Tagesroute (PRD Phase 3), Mallorca-Ableger der Horbach Stiftung, Kamerahandel und Dienstleister, Weiterentwicklung der Recherche zu den weiteren Kandidaten (siehe Recherche), automatische Läufe.

## Betroffene Bereiche
`content` (Schemas, Daten), `web` (Veranstalterseiten, Filter, Festivalseite), `setup` (Update-Skill, Vorschlagsformat).

## Abweichungen zwischen Vorgabe und Recherche (an H1 zu klären)
- Photoszene Köln nennt auf der Seite die Rechtsform **gUG**, nicht e.V.
- Photoszene-Festival 2027: die Festivalseite nennt **14. Mai bis 13. Juni 2027** (Berichtigung gegenüber der ersten Recherche); die Vorgabe nennt 14.–23. Mai und „über 80 Ausstellungen“ (nicht belegt).
- düsseldorf photo+: Termin „Mitte Februar 2027“, Träger und Anschrift nicht ermittelt.
- Die Webanwendung liest `festivalId` heute als Veranstalter-ID; das ändert sich (ADR-009).

## Vorbereitete Spezifikation (Phase 3, nur Datenmodell)
EARS `content/festivals-veranstalter.md`, Gherkin `content/festivals.feature`, Quality Q-DATA-5, ADR-009 (`Proposed`). Spezifikation für Web (Supersede ORG-UB-3, ORG-UB-4) und Update-Skill entsteht in Phase 3.

## Entschieden (vor H1)
- Ein Festival ohne belegten Zeitraum wird nicht berücksichtigt: Es entsteht kein Festivaldatensatz, bis `startDate` und `endDate` mit Fundstelle belegt sind (2026-10-28). Das Photoszene-Festival 2027 ist mit 14. Mai bis 13. Juni 2027 belegt und wird erfasst; düsseldorf photo+ 2027 (nur „Mitte Februar 2027“) bleibt ohne Festivaldatensatz.

- Umfang: **alle vier Stories** in diesem Ticket.
- Photoszene: Name **nach Webseite** („Internationale Photoszene Köln gUG“), `type: association` mangels passenden Werts; Abweichung zur Vorgabe (e.V.) wird im Nachweis dokumentiert.
- Erfassung: neue Orte und Veranstalter **von Hand aus der Recherche** mit Fundstelle; Koordinaten aus einer öffentlichen Adresssuche (OpenStreetMap) mit Quellenangabe; der Update-Skill prüft die Webseiten beim nächsten Lauf.
- Review-Schwelle: kritisch + hoch lösen Rücklauf aus.

## ANNAHMEN
- ANNAHME: `source.url` der neuen Venues ist die Seite, auf der Anschrift und Typ belegt sind (Impressum bzw. Verzeichnis); der Status ist `recherchiert`.
- ANNAHME: Für die Horbach Stiftung gilt die Anschrift der Kunsträume (Wormser Str. 23); der Mallorca-Ableger entfällt.
- ANNAHME: Der Veranstalter düsseldorf photo+ wird mit Name, Stadt, Website und `type: festival` ohne Rechtsform erfasst, bis Träger belegt sind.
- ANNAHME: Gibt die Adresssuche keine eindeutigen Koordinaten, wird der Ort nicht angelegt und im Prüfpaket genannt.

## Qualitätserwartungen
Q-DATA-5, Q-DATA-3 (Fundstelle), Q-MAIN-2 (offline testbar); für die Webanwendung Q-USE und Q-PERF wie bisher.

## Risiken
- **Fachlich:** Festivaldaten ohne belegte Termine; Gegenmaßnahme: Festival erst mit belegtem Zeitraum erfassen.
- **Technisch:** Bedeutungswechsel von `festivalId` in Daten, Web und Tests; Gegenmaßnahme: Migration und Supersede in einer Story.
- **Rechtlich:** Seiteninhalte der Betreiber; Regeln aus ADR-006 gelten weiter.
