# SERVICE-08-STORY-01 – Art der Ausstellung und gemeinsame Badge-Zeile

**Als** Besucher:in **möchte ich** bei jeder Ausstellung eine genaue Art („Gruppenausstellung“, „Einzelausstellung“) und einheitlich aufgebaute Badges sehen **damit** ich Ausstellungen überall gleich lesen kann.

## Akzeptanzkriterien
1. Eine Ausstellung mit mehreren verknüpften Personen heißt „Gruppenausstellung“, mit genau einer Person „Einzelausstellung“; Retrospektiven und Dauerausstellungen behalten ihre Art.
2. Die Badge-Zeile zeigt zuerst die Art, danach Status bzw. Anlass, jeweils als Text.
3. Zwischen mehreren Badges steht ein Abstand in der Breite eines Leerzeichens.
4. Die Datenprüfung meldet eine gespeicherte Art `solo` bei mehreren Personen und `group` bei weniger als zwei Personen.
5. Alle Seiten nutzen dieselbe Badge-Zeile, damit Abweichungen nicht entstehen.

## Abhängigkeiten
Keine

## Spezifikation (Phase 3, vorab erstellt)
- EARS: BDG-UB-1 bis BDG-UB-4, PRF-UN-3
- Gherkin: `web/badges.feature`, `content/fotografinnen-profile.feature`
- Quality: Q-USE-4, Q-USE-7, Q-DATA-11
- ADR: ADR-014

**INVEST:** I ✔ N ✔ V ✔ E ✔ S ✔ T ✔
