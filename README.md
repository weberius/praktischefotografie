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
│   ├── organizers.json        # Netzwerke, Vereine & Veranstalter ohne eigenen Raum
│   ├── festivals.json         # Festivals (Zeitraum) der Veranstalter
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

Die Blogbeiträge nutzen Frontmatter und verknüpfen flüssig geschriebenen Text mit den Strukturdaten:

```
---
id: post-makk-corbijn-und-bibliothek
title: Fotokultur im MAKK: Anton Corbijn und Stöbern in der Präsenzbibliothek
---

Das MAKK (Museum für Angewandte Kunst Köln) im Herzen der Kölner Innenstadt ist auf den ersten Blick kein reines Fotografie-Museum – und doch einer der spannendsten Orte für visuelle Kultur in der Stadt.

### Die Präsenzbibliothek: Stille Oase für Buchliebhaber
Wer sich vertiefend mit Bildbänden, Designgeschichte und Fotokunst beschäftigen möchte, findet im MAKK eine öffentlich zugängliche **Präsenzbibliothek**. Hier kann man kostenfrei recherchieren, in historischen und zeitgenössischen Fotobänden blättern und abseits des Trubels arbeiten.

### Aktuelle Ausstellungs-Empfehlung
Derzeit lohnt sich der Besuch gleich in doppelter Hinsicht: Noch bis zum **15. November 2026** ist die Sonderausstellung *„A World of Wild Roses“* von Anton Corbijn zu sehen...
```

Die Verknüpfung im Frontend (User Experience)
Wenn eine Leserin oder ein Leser auf praktischefotografie diesen Artikel aufruft, generiert das Frontend automatisch ein passendes Sidebar- / Infobox-Widget:

```
┌────────────────────────────────────────────────────────┐
│ 📍 Erwähnter Ort                                      │
│ MAKK – Museum für Angewandte Kunst Köln                │
│ An der Rechtschule, 50667 Köln                         │
│ 📚 Öffentliche Präsenzbibliothek vorhanden            │
├────────────────────────────────────────────────────────┤
│ 🖼️ Laufende Ausstellung                               │
│ Anton Corbijn – A World of Wild Roses                  │
│ 🗓️ Noch bis 15. November 2026 ⚠️ (Endet bald!)        │
└────────────────────────────────────────────────────────┘
```

So wird das MAKK sowohl als Ort für wechselnde Fotokunst-Ausstellungen als auch als dauerhafter Recherche- und Fotobuch-Ort in deiner Anwendung sichtbar!

### Die Rolle von Messen & Marken-Events auf praktische Fotografie

Messen gehören nicht in die Kategorie der klassischen Kunstmuseen oder Galerien, aber sie passen hervorragend in die Event- & Netzwerk-Ebene der App:

- Vorträge & Symposien: Auf solchen Messen sprechen oft renommierte Dokumentar-, Reportage- oder Kunstfotograf:innen über ihre Arbeit, Buchprojekte und Arbeitsweisen (nicht nur über Technik).
- Community & Begegnung: Für viele (Hobby-)Fotografierende, Bildjournalist:innen und visuelle Gestalter:innen sind diese Events die seltenen Gelegenheiten im Jahr, sich physisch zu treffen, Netzwerke zu pflegen und Erfahrungen auszutauschen.
- Fotobuch- & Print-Areas: Oft gibt es im Rahmen dieser Messen kleinere Ausstellungsflächen, Fotobuch-Stände oder Portfolio-Reviews.

### Integration in die praktischefotografie-Datenstruktur

Um die redaktionelle Ausrichtung von Lichtland (Fokus auf Fotokultur, Orte, Ausstellungen und Diskurse) nicht zu verwässern, empfiehlt sich ein klares Event-Typing in der events.json:

Schema-Erweiterung für Messen/Festivals (events.json)

```
[
  {
    "id": "image-world-photokina-2027",
    "title": "Image World Inspired by Photokina",
    "eventType": "fair_and_convention",
    "categoryTags": ["Messe", "Vorträge", "Community", "Netzwerk"],
    "startDate": "2027-10-08",
    "endDate": "2027-10-10",
    "venueId": "koelnmesse",
    "city": "Köln",
    "website": "https://...",
    "description": "Verkaufs- und Erlebnismesse mit umfangreichem Bühnenprogramm, Fachvorträgen, Portfolio-Talks und Community-Treffpunkten.",
    "isCommercial": true,
    "highlights": [
      "Bühnenprogramm & Vorträge von Profi-Fotograf:innen",
      "Community-Meetups",
      "Print & Fotobuch-Area"
    ]
  }
]
```

### Fotograf:innen Index (`data/photographers.json`)

Ermöglicht die Quervernetzung: "Welche Ausstellungen mit Beteiligung von Barbara Klemm gab oder gibt es in NRW?"

```
[
  {
    "id": "martin-parr",
    "name": "Martin Parr",
    "bio": "Britischer Dokumentarfotograf, Mitglied von Magnum Photos.",
    "website": "https://www.martinparr.com"
  }
]
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

---

## 💻 Webanwendung (`web/`)

Angular 20, statisch vorab gerendert (siehe `docs/architecture/ADR-002` bis `ADR-005`).

```bash
npm install && (cd web && npm install)
cd web
npm start            # synchronisiert data/ + demo/ und startet den Dev-Server
npm test             # Karma/Jasmine (benötigt CHROME_BIN)
npm run lint
npm run build        # Produktionsbuild nur mit data/ (ohne Demo-Daten)
npm run build:demo   # Build mit gekennzeichneten Demo-Daten aus demo/
npm run quality      # axe, Tastatur, Netzwerk, SEO, Lighthouse gegen den Demo-Build
```

`demo/` enthält erkennbar fiktive Beispieldaten (`demo-`-IDs, Titel mit „[Demo]“). Sie erscheinen nie im Produktionsbuild.

---

## 🔄 Daten aus Webseiten aktualisieren

Der Skill `/update-venue-data` (Claude Code) ruft die Webseiten der Orte rücksichtsvoll ab (`robots.txt`, 2 s Abstand, höchstens 6 Seiten je Ort), erstellt Vorschläge mit Fundstelle und übernimmt sie erst nach Freigabe.

```bash
export SCRAPE_CONTACT="redaktion@example.org"   # Kontaktadresse für den User-Agent
/update-venue-data                              # alle Orte (in Claude Code)
/update-venue-data --venue makk-koeln           # ein Ort
```

Die einzelnen Schritte (`npm run data:fetch|check|report|apply`) und das Vorschlagsformat stehen in [`updates/README.md`](updates/README.md). Abgerufene Seitentexte liegen nur lokal unter `.cache/` und werden nicht versioniert.

Der Skill bearbeitet auch die Webseiten von Veranstaltern (Datensatz `organizers` mit `website`) und schlägt Festivals vor, aber nur mit belegtem Zeitraum (ADR-010, Details in [`updates/README.md`](updates/README.md)).

Bei jedem Lauf pflegt der Skill auch das Magazin: Zu neuen, eröffnenden, bald endenden und beendeten Ausstellungen entstehen Beiträge von 60 bis 80 Wörtern (`npm run news:plan|check|apply`). Sie werden vorab mit dem Datum des Anlasses angelegt, das Magazin zeigt sie erst an dem Tag, und sie werden erst nach Freigabe übernommen (Format und Regeln: [`updates/README.md`](updates/README.md)).
