# SERVICE-12-STORY-03 – Kopfbereich bleibt im Vordergrund

**Als** Besucher:in **möchte ich** den Kopfbereich auch nach dem Herunterscrollen am oberen Rand sehen, **damit** ich von jeder Stelle einer langen Seite das Menü und die Startseite erreiche.

## Akzeptanzkriterien
1. Wie im Kopf von Klangland: Beim Herunterscrollen bleibt der Kopfbereich am oberen Fensterrand sichtbar und liegt über dem Inhalt.
2. Das gilt auch auf der Kartenseite: Karte und Karten-Bedienelemente schieben sich nicht über den Kopf.
3. Das geöffnete Menü liegt ebenfalls über dem Inhalt und ist bedienbar.
4. Der Kopfbereich beansprucht auf schmalen Bildschirmen nicht übermäßig Platz.
5. Sprunglink „Zum Inhalt springen“ und Tabulator-Fokus führen nicht dazu, dass Inhalt unter dem Kopf verschwindet.

## Abhängigkeiten
`SERVICE-12-STORY-01` und `STORY-02` bestimmen die Höhe des Kopfs; fachlich unabhängig.

## Spezifikation (Phase 3, vorab erstellt)
- EARS: FRM-UB-2, FRM-UB-5
- Gherkin: `web/seitenrahmen.feature` (Kopfbereich bleibt beim Scrollen im Vordergrund, Kopfbereich verdeckt keinen Inhalt)
- Quality: Q-USE-13, Q-PERF-8
- ADR: nicht erforderlich; ADR-002, ADR-016

**INVEST:** I ✔ (lose Kopplung) N ✔ V ✔ E ✔ S ✔ T ✔
