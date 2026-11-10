# SERVICE-24 – Nur aktuelle Informationen

**Status:** Freigegeben  ·  **Quelle:** Idee [`idee-015-nur-aktuelle-informationen`](../../../product/ideen/idee-015-nur-aktuelle-informationen.md)

> „Es sollen nur aktuellen Informationen angezeigt werden.“ – Events: nur aktuelle oder zukünftige; Magazin: unverändert; Fotograf:innen: alle Ausstellungen und Events, neueste oben, auch vergangene; Orte: nur laufende oder zukünftige Events oder Ausstellungen; Ausstellungen: nur laufende oder kommende; Kalender: nur Aktuelles, Vergangenes einblendbar, „an der Implementierung wird nichts geändert“. „Ich möchte wissen, was dort im Augenblick läuft oder ob es bald einen Termin gibt, zu dem ich hingehen möchte.“

## Ziel
Besucher:innen sehen in den Listen für Events und Ausstellungen nur, was läuft oder kommt. Alle übrigen Seiten behalten ihr gewünschtes Verhalten.

**Zweck in einem Satz:** Besucher:innen finden ohne Aussortieren, was jetzt läuft oder bald stattfindet.

**Erfolgskriterien**
- `/events` und `/exhibitions` zeigen keine beendeten Einträge; der Statusfilter bietet „Beendet“ nicht mehr an.
- Orte, Fotograf:innen, Kalender und Magazin verhalten sich wie in der Idee beschrieben (bereits so umgesetzt, durch Szenarien abgesichert).

## Kontext
Ist-Stand: Eventliste zeigt alle Events und kennzeichnet Beendete (EVT-UB-1, EVT-UB-4); Ausstellungsliste zeigt alle inkl. Status „Beendet“ (EXH-UB-1, EXH-UB-3). Ortsseite (VNU-UB-4), Kalender (CAL-OP-1), Personenseite (PHO-UB-3) und Magazin (BLG-UB-1) erfüllen die Wünsche bereits. Globaler Filter (FLT-UB-2) und Favoritenfilter wirken zusätzlich per UND.

## Story-Schnitt
1. `STORY-01` Aktuelle Events und Ausstellungen in den Listen (echte Änderung)
2. `STORY-02` Fotograf:innen, Orte, Kalender und Magazin bleiben wie gewünscht (Absicherung durch Szenarien, keine Verhaltensänderung)

## Abgrenzung
**Nicht enthalten:** Änderung von Kalender und Magazin, Events auf der Personenseite (Events tragen keine Personen), Löschen alter Daten, Archivansicht für Beendetes, Änderung der Detailseiten, Änderung von Datenschema oder Recherche-Skills.

## Betroffene Bereiche
`web` (`event-list`, `exhibition-list`), Spezifikation `web/aktualitaet`, Supersede in `web/events` und `web/ausstellungen`. ADR: nicht erforderlich.

## Vorbereitete Spezifikation (Phase 3)
- EARS: `web/aktualitaet.md` (ACT-UB-1 bis ACT-UB-4, ACT-UN-1, ACT-ST-1); Supersede-Vermerke EVT-UB-1, EVT-UB-4, EXH-UB-1, EXH-UB-3
- Gherkin: `web/aktualitaet.feature`; angepasst `events.feature`, `ausstellungen.feature`
- Quality: `web/aktualitaet.md` (Q-REL-4); Q-USE-4 bleibt gültig
- ADR: nicht erforderlich; Leitplanken ADR-002, ADR-023, ADR-025

## Annahmen
- ANNAHME: „Aktuell“ heißt Ende ≥ heute (Endtag gilt als laufend), konsistent mit EXH-UB-2 und CAL-OP-1.
- ANNAHME: Ausstellungen mit Status „Endet bald“ sind aktuell.
- ANNAHME: Der Statusfilter der Ausstellungsliste verliert „Beendet“; `?status=beendet` wird wie ein unbekannter Wert behandelt.
- ANNAHME: Detailseiten beendeter Einträge bleiben per Adresse erreichbar und tragen „Beendet“ (Links aus Magazin, Personenseite, Favoriten).
- ANNAHME: „Orte“ und „Ort/Venues“ in der Idee meinen die Ortsseite `/venues/:id`; das Ortsverzeichnis `/venues` zeigt keine Events oder Ausstellungen und bleibt unverändert.
- ANNAHME: Events tragen keine Personen (`photographerIds` nur bei Ausstellungen); die Personenseite zeigt daher nur Ausstellungen, wie bisher.
- ANNAHME: Karte und Favoriten (Seite mit Favoritenfilter) werden nicht ausdrücklich genannt und bleiben unverändert.
- ANNAHME: Die Idee-Datei ist noch nicht committet (`??`); der Branch zweigt von `main` ab.

## Qualitätserwartungen
Q-REL-4; zusätzlich Q-USE-4.

## Definition of Done
- Spezifikation konsistent; Szenarien aus `aktualitaet.feature` als Tests umgesetzt, bestehende Tests zu beendeten Einträgen in den Listen angepasst.
- Build, `npm test`, `npm run web:test`, `npm run lint:all` grün.

## Risiken
- Leere Listen, wenn Daten fehlen oder veraltet sind (Hinweis ACT-ST-1).
- Wegfall der Sicht auf Beendetes in der Liste ist ein Funktionsverlust (an H1 bestätigen); Kalender mit „Beendete anzeigen“ bleibt Ausweg.
- Bestehende Tests und Szenarien (EXH-UB-3, EVT-UB-4) müssen mit angepasst werden.
