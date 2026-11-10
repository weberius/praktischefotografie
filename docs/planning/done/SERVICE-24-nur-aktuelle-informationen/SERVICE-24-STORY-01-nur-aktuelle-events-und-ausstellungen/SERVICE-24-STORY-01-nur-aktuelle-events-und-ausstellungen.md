# SERVICE-24-STORY-01 – Nur aktuelle Events und Ausstellungen in den Listen

**Als** Besucher:in **möchte ich** in den Listen für Events und Ausstellungen nur laufende und kommende Einträge sehen, **damit** ich schnell erkenne, was jetzt läuft oder bald stattfindet.

## Akzeptanzkriterien
1. Die Eventliste zeigt nur Events, die heute laufen oder später beginnen; das Ende heute gilt als laufend.
2. Die Ausstellungsliste zeigt nur laufende, endet-bald- und kommende Ausstellungen.
3. Der Statusfilter der Ausstellungsliste bietet „Beendet“ nicht an; eine Adresse mit `status=beendet` zeigt alle aktuellen Ausstellungen.
4. Gibt es nichts Aktuelles, erscheint ein Hinweis statt einer leeren Seite.
5. Detailseiten beendeter Events und Ausstellungen sind per Adresse weiter erreichbar und mit „Beendet“ gekennzeichnet.
6. Globaler Filter, Eventtyp, Status und „Nur Favoriten“ wirken weiter zusätzlich.

## Abhängigkeiten
Keine.

## Spezifikation (Phase 3, vorab erstellt)
- EARS: ACT-UB-1, ACT-UB-2, ACT-UN-1, ACT-ST-1, ACT-UB-3 (ergänzen/ändern EVT-UB-1, EVT-UB-4, EXH-UB-1, EXH-UB-3)
- Gherkin: `web/aktualitaet.feature` („Listen zeigen nur Aktuelles“, „Statusfilter ohne Beendet“, „Statuswert beendet in der Adresse“, „Keine aktuellen Einträge“, „Detailseite beendeter Einträge“); angepasst `events.feature`, `ausstellungen.feature`
- Quality: Q-REL-4, Q-USE-4
- ADR: nicht erforderlich; ADR-002

**INVEST:** I ✔ N ✔ V ✔ E ✔ S ✔ T ✔
