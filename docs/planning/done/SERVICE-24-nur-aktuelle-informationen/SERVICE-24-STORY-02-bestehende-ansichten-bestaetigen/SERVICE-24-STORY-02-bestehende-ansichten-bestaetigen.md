# SERVICE-24-STORY-02 – Fotograf:innen, Orte, Kalender und Magazin bleiben wie gewünscht

**Als** Besucher:in **möchte ich** auf Personenseiten die gesamte Ausstellungshistorie, auf Ortsseiten nur Aktuelles, im Kalender standardmäßig nur Aktuelles mit einblendbarem Vergangenen und im Magazin alle Beiträge sehen, **damit** jede Seite ihren Zweck (Rückblick oder aktueller Überblick) erfüllt.

## Akzeptanzkriterien
1. Die Personenseite zeigt alle Ausstellungen der Person, auch beendete, neueste Beginndaten zuerst.
2. Die Ortsseite zeigt nur laufende und kommende Ausstellungen und Events.
3. Der Kalender zeigt standardmäßig nur Aktuelles; Vergangenes ist einblendbar; sein Verhalten bleibt unverändert.
4. Das Magazin zeigt weiterhin alle veröffentlichten Beiträge; seine Implementierung bleibt unverändert.

## Abhängigkeiten
Keine (Absicherung des Ist-Stands; ändert kein Verhalten).

## Spezifikation (Phase 3, vorab erstellt)
- EARS: ACT-UB-4 (verweist auf PHO-UB-3, PHO-UB-9, PHO-UB-10, VNU-UB-4, CAL-OP-1, BLG-UB-1)
- Gherkin: `web/aktualitaet.feature` („Andere Seiten bleiben unverändert“)
- Quality: Q-REL-4
- ADR: nicht erforderlich; ADR-002

**INVEST:** I ✔ N ✔ V ✔ E ✔ S ✔ T ✔
