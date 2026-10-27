# SERVICE-02 – Angular-Webanwendung

**Status:** Entwurf, an H1 geklärt (Freigabe steht aus)  ·  **Quelle:** [PRD](../../../product/prd.md) Abschnitte 2 und 4, Vorgabe der Projektleitung, Muster `klangland`

## Ziel
Eine statische Angular-Webanwendung stellt die Daten aus `data/` und `content/` dar. Im Zentrum steht die **Blog-Ansicht** mit Neuigkeiten aus `posts.json`. Dazu kommen Kalender, Karte sowie eigene Seiten für Orte, Fotograf:innen, Ausstellungen, Events und Veranstalter:innen.

**Zweck in einem Satz:** Besucher:innen sollen aktuelle Fotokultur in NRW lesen, zeitlich einordnen und räumlich finden können.

**Erfolgskriterien**
- Alle zehn Stories sind akzeptiert, jede Seite hat eine eigene teilbare Adresse.
- Die App läuft als statische Seite ohne Backend und wird beim Build gegen die validierten Daten erzeugt.
- Die Qualitätsziele (Performance, Barrierefreiheit, Datenschutz) sind in der Spezifikation messbar festgelegt und geprüft.

## Kontext
`klangland` ist die Referenz für Stack und Aufbau (Angular, Leaflet, JSON, Datensync, GitHub Pages). Leitplanken: ADR-001 (Daten und Validierung), ADR-002 (Angular), ADR-003 (Datensync, Hosting), ADR-004 (Leaflet/OSM), alle `Proposed`.

## Abgrenzung
**Enthalten:** App in `web/`, Seiten und Routen aus den Stories, Verknüpfungen über IDs, Datensync, Deployment, Impressum/Datenschutz.
**Nicht enthalten:**
- Festival-Modus mit temporärer Umschaltung (PRD Phase 3) bleibt Folgearbeit. Die Festival-Filterung über Veranstalter:innen in STORY-10 ist nur ein Vorläufer.
- Redaktionelle Erfassung von Inhalten (Beiträge, Ausstellungen, Fotograf:innen); dafür gibt es Demo-Daten.
- Suche, Nutzerkonten, Kommentare, Backend, Equipment-Tests, Dienstleister-Verzeichnisse (PRD 1.3).
- Redaktionelles SEO (Texte, Backlinks); nur die technische Auffindbarkeit ist Teil des Tickets.

## Erwarteter Story-Schnitt
1. Gerüst, Navigation, Veröffentlichung
2. Blog-Feed · 3. Beitrag lesen
4. Kalender · 5. Karte
6. Orte · 7. Fotograf:innen · 8. Ausstellungen · 9. Events · 10. Veranstalter:innen
Reihenfolge nach Abhängigkeit: 1, dann 6 und 8 (Basis für Verknüpfungen), dann die übrigen.

## Betroffene Bereiche
`web` (neu), `content`, `setup` (Sync, CI).

## Qualitätserwartungen (zu konkretisieren in Phase 3)
- **Performance:** z. B. Lighthouse-Performance ≥ 90, Initial-Bundle unter Budget aus ADR-002.
- **Barrierefreiheit:** z. B. WCAG 2.1 AA, Karte mit Listenalternative, Tastaturbedienung.
- **SEO/Auffindbarkeit:** Seiteninhalte sind ohne Skriptausführung lesbar (Prerendering), jede Seite hat eigenen Titel und Beschreibung, Sitemap und `robots.txt` liegen vor.
- **Datenschutz:** keine Tracker; Kartenkacheln als einzige Drittanbieter-Ressource, im Datenschutzhinweis genannt.
- **Wartbarkeit:** Tests und Lint wie in `AGENTS.md` und ADR-002.

## Definition of Done
- Spezifikation (EARS, Gherkin, Quality) vorhanden und konsistent; ADR-002 bis ADR-004 bestätigt.
- `ng test`, `ng lint`, `ng build --configuration production` laufen grün.
- Menschliche Abnahme an H2 anhand der laufenden Anwendung.

## Risiken
- **Daten dünn:** Außer 20 Orten sind Beiträge, Ausstellungen, Events, Fotograf:innen und Veranstalter:innen leer. Gegenmaßnahme: ANNAHME Demo-Daten, klar als solche gekennzeichnet und vom Redaktionsbestand getrennt.
- **Prerendering:** Detailseiten mit IDs müssen beim Build vorab erzeugt werden; erhöht Build-Komplexität und erweitert ADR-002/003.
- **OSM-Kacheln:** Nutzungsbedingungen und Datenschutz bei Wachstum erneut prüfen.
- **Umfang:** Zehn Stories sind groß; Reihenfolge nach Abhängigkeit, Review-Rückläufe begrenzt.

## ANNAHMEN
- ANNAHME: Gekennzeichnete, erkennbar fiktive Demo-Daten (H1-Entscheidung) liegen unter `data/demo/` und dienen nur Entwicklung und Tests. Der Produktionsbuild nutzt ausschließlich `data/`; leere Bereiche zeigen Leerzustände, bis die Redaktion Inhalte pflegt.
- ANNAHME: Als Bezugsdatum für „Endet bald“ dient das aktuelle Datum, in Tests ein fester Referenzwert.
- Entschieden an H1: Hosting auf GitHub Pages (ADR-003), Domain später; Qualitätsziele Lighthouse Performance ≥ 90, WCAG 2.1 AA, Datenschutz, SEO/Prerendering; Review-Schwelle kritisch + hoch.
- ANNAHME: Sprache der Oberfläche ist Deutsch.
