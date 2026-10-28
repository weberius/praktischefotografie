# SERVICE-05-STORY-01 – Dreistufiges Datenmodell

**Als** Redakteur:in **möchte ich** Venues, Veranstalter und Festivals getrennt erfassen und Ausstellungen einem Festival zuordnen **damit** Orte mit festem Raum, Veranstalter ohne Raum und zeitlich begrenzte Festivals nicht vermischt werden.

## Akzeptanzkriterien
1. Veranstalter lassen sich mit Name, Typ, Stadt und optional Kurzname, Website, Beschreibung und Instagram-Name erfassen.
2. Ein Festival gehört zu einem Veranstalter und hat Titel, Zeitraum und Stadt; Beschreibung und Website sind optional.
3. Eine Ausstellung kann einem Festival zugeordnet werden und als offizieller Festivalpartner gekennzeichnet sein; die Kennzeichnung ohne Festival ist nicht möglich.
4. Ungültige Zeiträume und unbekannte Verweise werden bei der Datenprüfung gemeldet.
5. Die Festivals stehen der Webanwendung nach dem Build zur Verfügung.
6. Bestehende Daten bleiben gültig.

## Beispiel aus der Vorgabe
Veranstalter `photoszene-koeln` (Kurzname „Photoszene Köln“, Instagram `photoszene_koeln`); Festival `photoszene-festival-2027` (`organizerId: photoszene-koeln`); Ausstellung `photoszene-2027-horbach-exhibition` im Ort `michael-horbach-stiftung` mit `festivalId` und `isOfficialFestivalPartner: true`.

## Abhängigkeiten
Keine

## Spezifikation (Phase 3)
- EARS: FES-UB-1 bis FES-UB-4, FES-UN-1 bis FES-UN-3, FES-OP-1
- Gherkin: `content/festivals.feature`
- Quality: Q-DATA-5, Q-DATA-1
- ADR: ADR-009, ADR-010 (Proposed)

**INVEST:** I ✔ N ✔ V ✔ E ✔ S ✔ T ✔
