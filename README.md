# praktischefotografie

> **Zentrum für Praktische Fotografie** – Der Guide für Ausstellungen, Orte, Fotobücher und Begegnungen (Fokus NRW & Deutschland).

**`praktischefotografie`** ist eine statische, datengetriebene Webapplikation zur Kartierung und redaktionellen Aufbereitung der Fotokulturlandschaft. Die Anwendung bündelt Ausstellungsorte, laufende und kommende Fotografie-Ausstellungen, Festivals, Fotobuch-Archive, Talks und Community-Events.

Das Projekt versteht sich als Gegenentwurf zu kommerziellen Kamera-Testportalen oder abstrakten Kunstkritik-Plattformen: Es stellt die **Praxis des Sehens, Flanierens (Promenadologie), Entdeckens und Begegnens** in den Mittelpunkt.

---

## 📸 Core Features & Konzept

* **Blog & Magazin-First:** Redaktioneller Einstieg mit kuratierten Guides, Ausstellungsberichten, Ortsporträts und Event-Highlights.
* **Interaktive Karte (OSM / Leaflet):** Geografische Übersicht aller Foto-Orte (Museen, Galerien, Off-Spaces, Präsenzbibliotheken, Stiftungen).
* **Agenda & Ausstellungs-Kalender:**
  * Visualisierung von Ausstellungszeiträumen.
  * Integration von Einzelveranstaltungen (Vernissagen, Artist Talks, Fotobuch-Readings, Workshops).
  * **„Endet bald“-Indikator:** Hebt Ausstellungen hervor, die in den nächsten Tagen schließen.
* **Typisierung & Filter:**
  * 🏛️ *Museum / Galerie*
  * 📚 *Fotobuch / Präsenzbibliothek / Archiv* (z. B. MAKK Bibliothek, PhotoBookMuseum)
  * 🗣️ *Talk / Symposium / Diskurs*
  * 🤝 *Messe / Community-Event* (z. B. Image World, Fujikina)
* **Meta-Ebene für Netzwerke & Festivals:** Spezieller *Festival-Kartenmodus* für Stadt-Events wie die *Internationale Photoszene Köln* oder *Düsseldorf Photo+*.
* **Fotograf:innen-Index:** Quervernetzung aller Ausstellungen und Beiträge nach beteiligten Urheber:innen.

---

## 🏗️ Architektur & Datenmodell (JSON-first)

In Anlehnung an das Architekturmuster von [`klangland`](https://github.com/weberius/klangland) arbeitet **`praktischefotografie`** als statische Single-Page-Application (SPA). Die Daten werden offline in strukturierten JSON-Dateien gepflegt und über Markdown-Dateien für den Blog ergänzt.

### Verzeichnisstruktur

```text
praktischefotografie/
├── data/
│   ├── venues.json            # Permanente Orte (Museen, Stiftungen, Bibliotheken)
│   ├── exhibitions.json       # Ausstellungen & Laufzeiten
│   ├── events.json            # Einzel-Events, Vernissagen, Messen
│   ├── organizers.json        # Netzwerke, Vereine & Festival-Organisatoren
│   ├── photographers.json     # Index beteiligter Fotograf:innen
│   └── posts.json             # Blog-Index & Metadaten
├── content/
│   └── posts/                 # Markdown-Beiträge für das Magazin (.md)
├── public/
│   └── assets/                # Bilder (Cover, Venues, Ausstellungen)
└── src/                       # Frontend-Quellcode (App-Logik, Map, Agenda)
```

---

## 📊 Daten-Beispiele (Schemata)

### 1. Venue (`data/venues.json`)
```json
{
  "id": "makk-koeln",
  "name": "MAKK – Museum für Angewandte Kunst Köln",
  "shortName": "MAKK Köln",
  "type": "museum",
  "city": "Köln",
  "address": {
    "street": "An der Rechtschule",
    "zip": "50667",
    "city": "Köln",
    "lat": 50.9385,
    "lng": 6.9558
  },
  "website": "https://makk.stadt-koeln.de",
  "features": {
    "hasPermanentCollection": true,
    "hasReferenceLibrary": true,
    "libraryNotes": "Öffentlich zugängliche Präsenzbibliothek für Design & Fotokunst."
  }
}
```

### 2. Exhibition (`data/exhibitions.json`)
```json
{
  "id": "mysterium-der-paare-2026",
  "venueId": "fotografie-forum-monschau",
  "title": "Mysterium der Paare",
  "startDate": "2026-08-09",
  "endDate": "2026-11-01",
  "type": "group",
  "photographerIds": ["elliott-erwitt", "martin-parr", "richard-kalvar"],
  "description": "Rund 130 Arbeiten erforschen flüchtige Momente des Zusammenkommens."
}
```

### 3. Blogpost (`data/posts.json`)
```json
{
  "id": "post-makk-corbijn-und-bibliothek",
  "slug": "makk-koeln-corbijn-und-praesenzbibliothek",
  "title": "Fotokultur im MAKK: Anton Corbijn und Stöbern in der Präsenzbibliothek",
  "date": "2026-11-02",
  "linkedVenueIds": ["makk-koeln"],
  "linkedExhibitionIds": ["anton-corbijn-world-of-wild-roses-2026"],
  "contentFile": "content/posts/2026-11-02-makk-bibliothek-und-corbijn.md"
}
```

---

## 🚀 Vision & Fahrplan

1. **Phase 1 (NRW-Fokus):** Erfassung der Kernregion NRW (Köln, Düsseldorf, Ruhrgebiet, Aachen/Eifel).
2. **Phase 2 (Redaktioneller Ausbau):** Etablierung wiederkehrender Magazin-Formate (Monatsausblick, Fotobuch-Tipps, Stadtteil-Rundgänge).
3. **Phase 3 (Expansion):** Ausweitung der Orte und Ausstellungen auf ganz Deutschland (und DACH-Raum).
4. **Zentrum für Praktische Fotografie:** Ausbau der Plattform als digitales Dach für kuratierte Routen, Diskurse und Community-Treffpunkte.

---

## 📄 Lizenz & Contribution

* **Content & Daten:** CC BY-NC-SA 4.0 (sofern nicht anders angegeben)
* **Code:** MIT License
