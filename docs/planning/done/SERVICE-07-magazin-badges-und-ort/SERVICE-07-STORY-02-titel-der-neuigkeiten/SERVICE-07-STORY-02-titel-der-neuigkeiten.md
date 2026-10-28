# SERVICE-07-STORY-02 – Titel der Neuigkeiten = „Ausstellungstitel in Stadt“

**Als** Redakteur:in **möchte ich** dass Neuigkeiten einheitlich „Ausstellungstitel in Stadt“ als Titel tragen **damit** der Anlass nur als Badge erscheint und der Titel im Magazin überall gleich aufgebaut ist.

## Akzeptanzkriterien
1. Der Titel jeder neuen Neuigkeit besteht aus dem Titel der Ausstellung, „in“ und der Stadt des Ortes, ohne Anlass (z. B. „MYSTERIUM DER PAARE in Monschau“).
2. Die Prüfung der Neuigkeiten verwirft einen Planeintrag mit abweichendem Titel und nennt den erwarteten Titel.
3. Der Skill `update-venue-data` schreibt Titel nach dieser Regel.
4. Alle bestehenden Neuigkeiten (Beitragsdaten und Frontmatter der Beitragsdateien) sind auf diesen Titel migriert; Kennung, Datum, Kurztext und Text bleiben unverändert.
5. Die Beitragsseite zeigt den neuen Titel.

## Abhängigkeiten
SERVICE-04

## Spezifikation (Phase 3, vorab erstellt)
- EARS: NWS-UB-7 (ergänzt NWS-UB-5), SKL-UB-4 (ergänzt)
- Gherkin: `setup/magazin-neuigkeiten.feature`
- Quality: Q-DATA-10
- ADR: ADR-013, ADR-008

**INVEST:** I ✔ N ✔ V ✔ E ✔ S ✔ T ✔
