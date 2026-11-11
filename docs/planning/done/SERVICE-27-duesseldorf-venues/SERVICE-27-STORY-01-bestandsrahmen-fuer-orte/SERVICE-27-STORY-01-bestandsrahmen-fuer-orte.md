# SERVICE-27-STORY-01 – Bestandsrahmen für den Ortskatalog anheben

**Als** Redakteur:in **möchte ich** den Ortskatalog über 30 Orte hinaus pflegen können, **damit** neue Fotografie-Orte aus weiteren Städten erfasst werden können, ohne dass eine nicht begründete Zahl die Erfassung blockiert.

## Akzeptanzkriterien
1. Der Katalog darf mindestens 20 und höchstens 60 Orte enthalten; ein Bestand von 36 Orten besteht die Prüfung.
2. Die Prüfung der Obergrenze ist als Plausibilitätsgrenze beschrieben; die Spezifikation nennt den Grund für 60.
3. Alle übrigen Regeln zu Orten (Koordinaten in NRW, eindeutige `id`, Herkunftsangaben, Kernstädte) gelten unverändert.
4. Die bisherige Fassung (höchstens 30) bleibt als ersetzt dokumentiert.

## Abhängigkeiten
Keine. `STORY-02`, `STORY-03` und `STORY-04` setzen sie voraus, weil der Bestand sonst über 30 steigt.

## Spezifikation (Phase 3, vorab erstellt)
- EARS: VEN-UB-8 (ersetzt VEN-UB-1); unverändert VEN-UB-2 bis VEN-UB-5
- Gherkin: `content/daten.feature` · „Datenbestand enthält 20 bis 60 Venues“
- Quality: Q-DATA-21 (ersetzt die Bestandsklausel in Q-DATA-2)
- ADR: nicht erforderlich; ADR-001

**INVEST:** I ✔ N ✔ V ✔ E ✔ S ✔ T ✔
