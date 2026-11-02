# EARS: Karte der Orte (Kürzel `MAP`)

**Bereich:** web  ·  **Systemname:** Webanwendung  ·  **Stand:** 2026-10-29

Begriffe: „heute“ ist das aktuelle Datum der Anwendung (in Tests ein fester Referenzwert). Datenfelder siehe `schema/`.

| ID | Anforderung | Gherkin | Quality | ADR |
| --- | --- | --- | --- | --- |
| MAP-UB-1 | Die Webanwendung soll auf `/map` jeden Ort an seinen Koordinaten als Marker darstellen, der bei Auswahl Name, Typ und einen Link zur Ortsseite zeigt. | `web/karte.feature` · „Karte zeigt alle Orte“ | Q-PERF-3 | ADR-004 |
| MAP-UB-2 | ~~Die Webanwendung soll die Orte nach Stadt, Typ und den Eigenschaften „Hat Präsenzbibliothek“ und „Ständige Sammlung“ filterbar machen; mehrere Filter wirken gemeinsam (UND) und sofort.~~ **Ersetzt durch FLT-UB-1 und FLT-UB-2** (globaler Filter nach Ort und Ortstyp; die Filter Stadt, Präsenzbibliothek und Ständige Sammlung entfallen). | `web/karte.feature` · „Filter wirken kombiniert“ | Q-USE-3 | ADR-004 |
| MAP-UB-3 | ~~Die Webanwendung soll dieselben Orte mit denselben Filtern auf `/map` zusätzlich als Liste ohne Karte bereitstellen.~~ **Ersetzt durch MAP-UB-7 und MAP-UB-8** (die Liste entfällt auf `/map`; die Listenalternative ist `/venues`, ADR-016). | `web/karte.feature` · „Listenalternative“ | Q-USE-3 | ADR-004 |
| MAP-UB-4 | ~~Die Webanwendung soll den Filterzustand in den Query-Parametern `city`, `type`, `library`, `collection` und `organizer` der Adresse führen.~~ **Ersetzt durch MAP-UB-14** (nur `organizer` und `festival` bleiben in der Adresse). | `web/karte.feature` · „Filterzustand in der Adresse“ | – | ADR-004 |
| MAP-EV-1 | ~~Wenn `/map` mit Query-Parametern aufgerufen wird, soll die Webanwendung die Filter entsprechend vorbelegen.~~ **Ersetzt durch MAP-UB-14.** | `web/karte.feature` · „Filter aus der Adresse“ | – | ADR-004 |
| MAP-UB-5 | Die Webanwendung soll die Attribution „© OpenStreetMap-Mitwirkende“ an der Karte sichtbar anzeigen. | `web/karte.feature` · „Attribution sichtbar“ | – | ADR-004 |
| MAP-UN-1 | ~~Wenn kein Ort zu den Filtern passt, soll die Webanwendung einen Hinweis und eine Möglichkeit zum Zurücksetzen der Filter anzeigen.~~ **Ersetzt durch FLT-ST-1.** | `web/karte.feature` · „Kein Treffer“ | – | ADR-004 |
| MAP-UB-6 | ~~Die Webanwendung soll die Karte nur im Browser initialisieren und beim Vorabrendern die Liste ausgeben.~~ **Ersetzt durch MAP-UB-13** (beim Vorabrendern entsteht keine Liste mehr, ADR-016). | `web/karte.feature` · „Karte nur im Browser“ | Q-SEO-1 | ADR-002, ADR-004 |
| MAP-UB-7 | Die Webanwendung soll die Orte auf `/map` ausschließlich als Marker auf der Karte darstellen und keine Liste der Orte anzeigen. | `web/karte.feature` · „Karte ohne Ortsliste“ | Q-USE-3 | ADR-016 |
| MAP-UB-8 | ~~Die Webanwendung soll auf `/map` einen Link auf `/venues` anbieten, der die gesetzten Filter (`city`, `type`, `library`, `collection`, `organizer`, `festival`) übernimmt.~~ **Ersetzt durch MAP-UB-15** (der Link trägt nur noch `organizer` und `festival`). | `web/karte.feature` · „Link zur Ortsliste mit Filtern“ | Q-USE-3 | ADR-004, ADR-016 |
| MAP-UB-9 | Die Webanwendung soll die Karte auf `/map` unterhalb der Filterleiste in der Breite der Karten anderer Seiten (Inhaltsbereich) und bis zur Trennlinie oberhalb des Fußbereichs darstellen. | `web/karte.feature` · „Karte füllt die Fläche“ | Q-USE-10 | ADR-016 |
| MAP-UB-10 | Die Webanwendung soll jeden Ort auf der Karte mit einem Marker darstellen, dessen Symbol und Farbe vom Typ des Ortes abhängen; jeder der fünf Ortstypen hat eine eigene Kombination aus Symbol und Farbe. | `web/karte.feature` · „Symbol und Farbe je Typ“ | Q-USE-9 | ADR-016 |
| MAP-UB-11 | Die Webanwendung soll auf `/map` eine Legende anzeigen, die für jeden der fünf Ortstypen das Symbol, die Farbe und den Namen des Typs als Text zeigt. | `web/karte.feature` · „Legende der Ortstypen“ | Q-USE-9 | ADR-016 |
| MAP-UB-12 | Die Webanwendung soll jedem Marker den Namen und den Typ des Ortes als Textalternative mitgeben. | `web/karte.feature` · „Symbol und Farbe je Typ“ | Q-USE-9 | ADR-016 |
| MAP-UB-13 | Die Webanwendung soll die Karte nur im Browser initialisieren und beim Vorabrendern anstelle der Karte einen Hinweis mit dem Link aus MAP-UB-8 ausgeben. | `web/karte.feature` · „Karte nur im Browser“ | Q-SEO-1 | ADR-002, ADR-004, ADR-016 |
| MAP-UB-14 | Die Webanwendung soll auf `/map` die Query-Parameter `organizer` und `festival` der Adresse als Filter anwenden und beim Aufruf entsprechend vorbelegen. Ersetzt MAP-UB-4 und MAP-EV-1. | `web/karte.feature` · „Veranstalter- und Festivalfilter aus der Adresse“ | – | ADR-004, ADR-025 |
| MAP-UB-15 | Die Webanwendung soll auf `/map` einen Link auf `/venues` anbieten, der die gesetzten Parameter `organizer` und `festival` übernimmt; der globale Filter gilt dort ohnehin (FLT-UB-3). Ersetzt MAP-UB-8. | `web/karte.feature` · „Link zur Ortsliste mit Filtern“ | Q-USE-3 | ADR-004, ADR-016, ADR-025 |

**Supersede 2026-11-02:** MAP-UB-2, MAP-UB-4, MAP-EV-1, MAP-UN-1 und MAP-UB-8 gelten nicht mehr; der globale Filter (`web/filter.md`, ADR-025) ersetzt sie, MAP-UB-14 und MAP-UB-15 behalten Veranstalter- und Festivalparameter. MAP-UB-13 verweist mit „Link aus MAP-UB-8“ nun auf MAP-UB-15. Alte Fassung durchgestrichen.

**Supersede 2026-10-29:** MAP-UB-3 und MAP-UB-6 beschrieben eine Ortsliste auf `/map` (auch beim Vorabrendern). Mit der vollflächigen Karte ersetzen MAP-UB-7, MAP-UB-8 und MAP-UB-13 sie; alte Fassung oben durchgestrichen. MAP-UB-1, MAP-UB-2, MAP-UB-4, MAP-UB-5, MAP-EV-1 und MAP-UN-1 gelten unverändert; der Hinweis aus MAP-UN-1 steht bei fehlenden Treffern oberhalb der (dann leeren) Karte.
