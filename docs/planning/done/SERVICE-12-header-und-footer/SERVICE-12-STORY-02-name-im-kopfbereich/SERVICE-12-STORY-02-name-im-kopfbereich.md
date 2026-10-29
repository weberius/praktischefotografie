# SERVICE-12-STORY-02 – Name „Zentrum für praktische Fotografie“ im Kopfbereich

**Als** Besucher:in **möchte ich** im Kopfbereich den vollen Namen „Zentrum für praktische Fotografie“ lesen, **damit** ich weiß, wessen Angebot ich vor mir habe.

## Akzeptanzkriterien
1. Auf jeder Seite steht im Kopfbereich neben dem Icon der Text „Zentrum für praktische Fotografie“.
2. Icon und Text bleiben ein Link zur Startseite; Screenreader lesen ihn als „Zentrum für praktische Fotografie“ vor, das Icon wird nicht zusätzlich angesagt.
3. Auf schmalen Bildschirmen bricht der Name bei Bedarf um, ohne die Menü-Schaltfläche zu verdrängen oder horizontales Scrollen zu verursachen.
4. Seitentitel im Browser-Tab und der Name auf dem Startbildschirm bleiben wie bisher.

## Abhängigkeiten
`SERVICE-12-STORY-01` (Platz neben der Menü-Schaltfläche; fachlich unabhängig).

## Spezifikation (Phase 3, vorab erstellt)
- EARS: ICO-UB-7 (ersetzt ICO-UB-3), ICO-UB-8 (ersetzt ICO-UB-4), ICO-UB-6 (unverändert)
- Gherkin: `web/markenicon.feature` (Icon im Kopfbereich, Icon auf jeder Seite gleich); `web/navigation.feature` (Jede Seite hat Titel und Beschreibung, unverändert)
- Quality: Q-USE-11 (angepasst), Q-USE-13
- ADR: nicht erforderlich; ADR-017, ADR-002

**INVEST:** I ✔ (lose Kopplung an STORY-01) N ✔ V ✔ E ✔ S ✔ T ✔
