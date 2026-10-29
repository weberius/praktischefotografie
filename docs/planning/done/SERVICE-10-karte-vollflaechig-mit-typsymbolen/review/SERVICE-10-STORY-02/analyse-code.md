# Code-Review-Analyse: SERVICE-10-STORY-02 – Ortstypen an Symbol und Farbe erkennen

**Ticket:** SERVICE-10 (Story SERVICE-10-STORY-02)  
**Analysiert:** 2026-10-29  
**Scope:** Dateien der Story (Typdefinition, Symbol-Markup, Marker/Textalternative in `VenueMap`, `VenueLegend`, Legende in der Kartenseite) auf dem Feature-Branch, einschließlich nicht committeter Änderungen  
**Status:** Entwurf – wartet auf Abnahme  
**Berücksichtigte ADRs / Gherkin:** ADR-002, ADR-004, ADR-016 / `web/karte.feature` (Symbol und Farbe je Typ, Legende der Ortstypen); EARS MAP-UB-10 bis MAP-UB-12; Q-USE-9

**Betroffene Dateien:**
- `web/src/app/core/models.ts` (`VENUE_TYPE_INFO`, `VenueSymbolShape`)
- `web/src/app/core/venue-symbol.ts`, `venue-symbol.spec.ts`
- `web/src/app/shared/venue-map/venue-map.ts` (Marker, Textalternative), `venue-map.spec.ts` (Symbol-Tests)
- `web/src/app/shared/venue-legend/` (ts, html, css, spec)
- `web/src/app/pages/map/map.html`, `map.ts`, `map.spec.ts` (Legende)

---

## A. Zusammenfassung (Executive Summary)

### Gesamtbewertung der menschlichen Nachvollziehbarkeit

Der Teil ist klein, klar geschnitten und gut kommentiert: Eine Quelle (`VENUE_TYPE_INFO`) und eine Funktion (`venueSymbolMarkup`) speisen Marker und Legende, die Tests prüfen genau diese Gleichheit. Die Kommentare nennen Anforderungs-IDs und begründen die Ausnahme (`bypassSecurityTrustHtml`). Stille Fallen sind gering: Die Liste der Ortstypen wird an mehreren Stellen jeweils neu aus den Schlüsseln abgeleitet, eine Marker-Option ist wirkungslos, und einige Zahlen- und Farbwerte stehen mehrfach als Literal. Keine kritischen oder hohen Befunde.

- **Nachvollziehbarkeit:** Hoch
- **Einschätzung:** hybrid – konsistenter Stil und gute Kommentare, aber kleine KI-typische Reste (wirkungslose Option, redundanter Cast, wiederholte Ableitungen).

---

## B. Konkrete Befunde

### CODE-01: Typliste wird an mehreren Stellen neu aus den Schlüsseln abgeleitet

- **Kategorie:** Duplikation
- **Priorität:** Mittel
- **Code-Referenz:** `web/src/app/shared/venue-legend/venue-legend.ts:18`, `web/src/app/pages/map/map.ts:28`, `web/src/app/pages/venue-list/venue-list.ts:23`; ebenso in `venue-symbol.spec.ts:13`, `venue-legend.spec.ts:24`, `venue-map.spec.ts` (`Object.keys(VENUE_TYPE_INFO) as VenueType[]`)
- **Beobachtung:** `(Object.keys(VENUE_TYPE_INFO) as VenueType[])` steht in drei Produktivdateien und mehreren Specs; `map.ts` und `venue-list.ts` bauen zusätzlich dieselbe Liste `{ value, label }`. Die Story fügt die Legende als dritte Stelle hinzu. Der Cast `as VenueType[]` umgeht die Typprüfung jeweils einzeln.
- **Warum problematisch:** Die Reihenfolge der Typen (Legende, Filter) hängt implizit von der Schlüsselreihenfolge des Objektliterals ab; wer sie ändern oder einen Typ ausblenden will, muss mehrere Stellen finden. Der wiederholte Cast ist ein Muster, das sich weiter vermehrt.
- **Typisches KI-Ursachenmuster:** Kontextblindheit – bestehendes Muster wird kopiert statt in einen Helfer gehoben.
- **ADR-/Gherkin-Bezug:** MAP-UB-11 verlangt „alle fünf Typen“; die Reihenfolge ist in der Spezifikation nicht festgelegt, der Test `venue-legend.spec.ts:15` hängt aber an ihr.

### CODE-02: Wirkungslose Marker-Option `alt`

- **Kategorie:** Dead Code
- **Priorität:** Niedrig
- **Code-Referenz:** `web/src/app/shared/venue-map/venue-map.ts:136` – `showMarkers`
- **Beobachtung:** `L.marker(..., { icon, title: text, alt: text })`. Leaflet 1.9.4 setzt `alt` nur für `<img>`-Icons (`node_modules/leaflet/src/layer/marker/Marker.js:230`, innerhalb der `IMG`-Prüfung); der Marker ist ein `divIcon`. Die Textalternative entsteht tatsächlich durch `title` und das nachträgliche `aria-label` (Zeile 138).
- **Warum problematisch:** Der Leser nimmt an, `alt` trage die Textalternative (MAP-UB-12); tatsächlich ist es ohne Wirkung. Der Kommentar in Zeile 137 nennt den eigentlichen Mechanismus, die Option widerspricht ihm leise.
- **Typisches KI-Ursachenmuster:** Übernahme einer API-Option aus dem `<img>`-Fall ohne Prüfung der Wirkung.
- **ADR-/Gherkin-Bezug:** MAP-UB-12, Q-USE-9.

### CODE-03: Redundanter Cast `as SafeHtml`

- **Kategorie:** Dead Code
- **Priorität:** Niedrig
- **Code-Referenz:** `web/src/app/shared/venue-legend/venue-legend.ts:20`
- **Beobachtung:** `this.sanitizer.bypassSecurityTrustHtml(...) as SafeHtml` – die Methode liefert bereits `SafeHtml`; der Cast und der Import `SafeHtml` (Zeile 2) sind überflüssig.
- **Warum problematisch:** Ein Cast an einer Sicherheitsgrenze suggeriert, hier würde ein Typ erzwungen. Er verdeckt nichts, verwirrt aber beim Lesen.
- **Typisches KI-Ursachenmuster:** Defensive Überabsicherung.
- **ADR-/Gherkin-Bezug:** Der Einsatz von `bypassSecurityTrustHtml` selbst ist als Annahme in `PIPELINE.md` dokumentiert (siehe C).

### CODE-04: Magische Farbwerte in Markup und Tests ohne gemeinsame Benennung

- **Kategorie:** Duplikation
- **Priorität:** Niedrig
- **Code-Referenz:** `web/src/app/core/venue-symbol.ts:7` und `:19` (`#fff` als Strich-, Rand- und Füllfarbe), `web/src/app/core/venue-symbol.spec.ts:7` und `:36` (`#e8e6df`, `#f2efe9`, `#ffffff`), `web/src/app/shared/venue-map/venue-map.css:2` (`#e8e6df`)
- **Beobachtung:** Das Weiß der Zeichnung steht als Literal an drei Stellen im Markup, der Kartenhintergrund `#e8e6df` im CSS und (als Annahme „hellste/dunkelste OSM-Fläche“) im Test. Ändert sich eine Stelle, prüft der Kontrasttest still gegen einen veralteten Wert.
- **Warum problematisch:** Der Test bildet den Hintergrund nur nach; die Kopplung zum CSS ist nicht erkennbar und nicht erzwungen.
- **Typisches KI-Ursachenmuster:** Literale statt benannter Konstanten.
- **ADR-/Gherkin-Bezug:** Q-USE-9 (Kontrast ≥ 3:1).

---

## C. Bewusst nicht gemeldet

- Farbe und Symbolform in `core/models.ts` neben Beschriftung und Emoji: ADR-016 („`VENUE_TYPE_INFO` erhält Farbe und Symbolform je Typ“, eine Quelle für Marker und Legende).
- `bypassSecurityTrustHtml` für konstantes SVG-Markup: Annahme in `PIPELINE.md` („kein Datenwert fließt ein“); das Markup wird aus Konstanten gebildet, `type` ist auf `VenueType` begrenzt.
- Emoji `icon` bleibt neben dem Symbol: ADR-016 („Emojis bleiben in den Textlisten“); `icon` wird in `venue-list.html:41` und `venue-detail.html:4` weiter genutzt.
- Marker ohne Pin-Spitze, 30 px / 24 px Symbolgröße, Legende oberhalb der Karte: Annahme in `PIPELINE.md`.
- Zusätzliches `aria-label` neben `title` am Marker: Leaflet vergibt `role="button"` und `tabindex`; `title` allein ist als Name unzuverlässig, MAP-UB-12 verlangt die Textalternative.
- Glyph-Funktionen mit teils ungenutztem Parameter `color` (`venue-symbol.ts:5-11`): einheitliche Signatur, kein Befund.

---

## D. Abgeleitete Tasks

| Task | Titel | Priorität | Aufwand | Befunde |
|---|---|---|---|---|
| [TASK-21](TASK-21-ortstypen-liste-zentral.md) | Liste der Ortstypen einmal zentral ableiten | Medium | ~30 min | CODE-01 |
| [TASK-22](TASK-22-kleine-aufraeumungen-symbol-und-legende.md) | Wirkungslose Option, Cast und Farb-Literale bereinigen | Low | ~20 min | CODE-02, CODE-03, CODE-04 |

---

## E. Meta-Bewertung

- **Gut automatisiert behebbar:** CODE-01 bis CODE-04.
- **Erfordert menschliche Architektur-Entscheidung:** keine.
- **Empfehlung für künftige KI-Codegenerierung:** Beim Ableiten von Listen aus Record-Schlüsseln auf vorhandene Muster prüfen und einen benannten Helfer bevorzugen; Optionen von Bibliotheken am Quelltext der verwendeten Version gegenprüfen.

---

## F. Nicht bewertbar

- Die tatsächliche Erkennbarkeit der Symbole in Graustufen (Q-USE-9, „Review der Symbole in Graustufen“) und der Kontrast auf allen OSM-Flächen (Wasser, Park) sind nicht Gegenstand dieses Reviews; sie wurden nicht gemessen.
- Tests wurden nicht ausgeführt; das Review beruht auf Lesen des Codes.
