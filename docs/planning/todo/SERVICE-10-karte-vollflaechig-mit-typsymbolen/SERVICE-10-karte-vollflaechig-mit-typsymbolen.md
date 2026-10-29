# SERVICE-10 – Karte vollflächig, mit Typ-Symbolen und Legende

**Status:** Entwurf (Intake, nachgeschärft), Stories und Spezifikation vorbereitet, Freigabe an H1 steht aus  ·  **Quelle:** Idee [`20261029-1000 Karte überarbeiten`](../../../product/ideen/20261029-1000%20Karte%20%C3%BCberarbeiten.md)

> „Die Darstellung der Seite map oder Karte soll überarbeitet werden. Zur Zeit ist das Kartenfenster relativ klein und die Liste der Orte findet sich links daneben. Außerdem werden all Point-Of-Interest durch den Standart Marker dargestellt. Das soll folgendermaßen geändert werden: Die Liste der Orte soll ganz verschwinden. Die Karte soll sich unterhalb des Filters über die gesamte Fläche erstrecken. In Abhängikeit vom Typ sollen eigene Symbole in unterschiedlichen Farben angezeigt werden. Zur Klärung des Typs, soll es eine Legende geben.“

## Ziel
Besucher:innen sehen auf `/map` die Orte großflächig auf der Karte und erkennen am Symbol und an der Farbe des Markers, um welchen Ortstyp es sich handelt; eine Legende erklärt die Typen.

**Zweck in einem Satz:** Die Karte soll das Hauptelement der Seite sein und Orte auf einen Blick nach Typ unterscheidbar machen.

**Erfolgskriterien**
- Auf `/map` gibt es keine Ortsliste; die Karte hat unterhalb der Filter die Breite der Karten auf der Kalenderseite und reicht bis zur Trennlinie oberhalb von Impressum und Datenschutz.
- Jeder der fünf Ortstypen hat ein eigenes Symbol in einer eigenen Farbe; eine Legende nennt alle fünf mit Symbol, Farbe und Text.
- Orte bleiben ohne Karte und per Tastatur erreichbar (Link auf `/venues` mit denselben Filtern).

## Kontext
`/map` zeigt links eine Liste, rechts (ab 60 rem Breite) eine Karte mit 26 rem Höhe und den Standard-Markern von Leaflet. ADR-004 verlangt eine gleichwertige Listenalternative; `/venues` bietet bereits dieselbe Liste mit denselben Filtern.

## Story-Schnitt
1. `STORY-01` Karte über die gesamte Fläche, ohne Ortsliste (inkl. Zugang zur Liste über `/venues`)
2. `STORY-02` Ortstypen an Symbol und Farbe erkennen (Marker und Legende)

## Abgrenzung
**Nicht enthalten:** Änderungen an den Filtern, am Popup, an den Ortsseiten oder an `/venues`; Marker-Cluster; neue Datenfelder oder Ortstypen; Kartenstil oder Kachelanbieter.

## Betroffene Bereiche
`web` (Seite `/map`, Karten-Komponente, `VENUE_TYPE_INFO`, Tests).

## Vorbereitete Spezifikation (Phase 3)
- EARS: `web/karte.md` (MAP-UB-7 bis MAP-UB-13; ersetzen MAP-UB-3 und MAP-UB-6)
- Gherkin: `web/karte.feature`; Formulierungen in `web/veranstalter.feature` und `web/festivals.feature` angepasst
- Quality: `web/karte-darstellung.md` (Q-USE-9, Q-USE-10); Ergänzungen zu Q-USE-3, Q-USE-4, Q-PERF-3, Q-SEO-1
- ADR: ADR-016 (`Proposed`), ersetzt in ADR-004 den Punkt „Listenalternative“ teilweise

## Entschieden (nach Intake, 2026-10-29)
- **Fläche:** Die Karte hat die Breite der Boxen auf der Kalenderseite (Inhaltsbereich) und reicht unterhalb der Filter bis zur Trennlinie oberhalb von Impressum und Datenschutz (Rand des Fußbereichs).
- **Legende:** zeigt immer alle fünf Ortstypen.
- **Typen:** unterscheiden sich in Form und Farbe; der Vorschlag (Säulenbau/Blau, Bilderrahmen/Orange, Raute/Violett, Tür/Rot, Buch/Grün) ist bestätigt.

## Annahmen
- ANNAHME: „Die Liste der Orte“ meint die Liste auf `/map`; die Seite `/venues` bleibt unverändert und ist die neue Listenalternative.
- ANNAHME: Die Legende zeigt immer alle fünf Ortstypen, nicht nur die der gefilterten Orte.
- ANNAHME: Die Legende steht als HTML-Text bei der Karte, nicht als Leaflet-Steuerelement.
- ANNAHME: Die endgültigen Farbwerte der bestätigten Symbole (Museum: Säulenbau/Blau, Galerie: Bilderrahmen/Orange, Stiftung: Raute/Violett, Off-Space: Tür/Rot, Bibliothek/Archiv: Buch/Grün) folgen aus dem Kontrast ≥ 3:1.
- ANNAHME: Beim Vorabrendern und ohne Skript zeigt `/map` einen Hinweis mit Link auf `/venues` statt der Liste.
- ANNAHME: Ist kein Ort zu den Filtern vorhanden, bleibt die Karte in der Standardansicht sichtbar und der Hinweis aus MAP-UN-1 steht darüber.

## Qualitätserwartungen
Q-USE-3, Q-USE-4, Q-USE-9, Q-USE-10, Q-PERF-3, Q-SEO-1.

## Definition of Done
- Spezifikation konsistent, ADR-016 bestätigt.
- Build, `npm test`, `npm run web:test` und `npm run lint:all` grün.

## Risiken
- **Technisch:** Layoutmessung (Karte bis zur Trennlinie) hängt vom Fenster im Test ab; Gegenmaßnahme: feste Fenstergrößen und Toleranz von 1 px. Der Fußbereich am Fensterrand verändert den Seitenrahmen aller Seiten; Gegenmaßnahme: nur die Mindesthöhe des Rahmens, kein Eingriff in `main` anderer Seiten.
- **Fachlich:** Ohne Liste sind Orte ohne Skript nur über `/venues` erreichbar; Gegenmaßnahme: Link mit übernommenen Filtern, ADR-016.
- **Gestalterisch:** Fünf Farben und Formen müssen auch in Graustufen und bei Farbsehschwäche unterscheidbar bleiben; Gegenmaßnahme: Form trägt den Typ (Q-USE-9).
