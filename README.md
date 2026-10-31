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
  * Integration von Einzelveranstaltungen (Vernissagen, Finissagen, Artist Talks, Fotobuch-Readings, Workshops).
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
│   ├── events.json            # Einzel-Events, Vernissagen, Finissagen, Messen
│   ├── organizers.json        # Netzwerke, Vereine & Veranstalter ohne eigenen Raum
│   ├── festivals.json         # Festivals (Zeitraum) der Veranstalter
│   ├── photographers.json     # Fotograf:innen mit optionalem Profil (Wikipedia, Portrait)
│   ├── portraits/             # Portraits von Wikimedia Commons (≤ 400 px, mit Bildnachweis in den Daten)
│   └── posts.json             # Blog-Index & Metadaten
├── content/
│   └── posts/                 # Markdown-Beiträge für das Magazin (.md)
├── web/                       # Angular-Webanwendung (siehe unten)
├── scripts/                   # Abruf, Prüfung und Übernahme (Orte, Fotograf:innen, Magazin)
├── updates/                   # Vorschläge, Berichte und Linksammlung der Skills (siehe updates/README.md)
├── .claude/skills/            # Skills: update-venue-data, research-photographers
└── docs/                      # Spezifikation, ADRs, Planung
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
    "website": "https://www.martinparr.com",
    "occupation": "Fotograf",
    "life": { "from": 1952, "to": null },
    "wikipedia": { "summary": "…40 bis 90 Wörter in eigener Formulierung…", "sources": [{ "lang": "de", "url": "https://de.wikipedia.org/wiki/Martin_Parr" }] },
    "web": { "summary": "…40 bis 90 Wörter aus Webquellen in eigener Formulierung…", "sources": [{ "title": "Titel der Seite", "url": "https://example.org/parr" }] },
    "portrait": { "file": "martin-parr.jpg", "width": 400, "height": 300, "source": "https://commons.wikimedia.org/wiki/File:….jpg", "credit": "Urheber", "license": "CC BY-SA 4.0" }
  }
]
```

`occupation`, `life`, `wikipedia`, `web` und `portrait` sind optional und werden mit `/research-photographers` ergänzt (siehe [`data/README.md`](data/README.md)).

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

### Icon und Postkartenmotiv

Das Quellbild `docs/resources/zfpf.png` zeigt links das Icon und rechts das Motiv einer Postkarte. Im Wurzelverzeichnis erzeugt

```bash
CHROME_BIN=/pfad/zu/chrome npm run icons:build
```

daraus `docs/resources/icon.png` und `docs/resources/postkarte.png` (zugeschnitten; das Postkartenmotiv wird nicht ausgeliefert) sowie die Icon-Dateien der Webanwendung in `web/public/` (`favicon.ico`, `favicon-96x96.png`, `apple-touch-icon.png`, `web-app-manifest-192x192.png`, `web-app-manifest-512x512.png`). Das Skript `web/tools/make-icons.mjs` nutzt das vorhandene `playwright-core` und braucht ein Chromium (`CHROME_BIN`); es läuft nicht im Build, die Ergebnisse sind eingecheckt (`docs/architecture/ADR-017`).

---

## 🔄 Nutzerhinweise: Skills für die Datenpflege

Zwei Skills pflegen die Daten. Beide laufen in Claude Code bzw. GitHub Copilot im Projektordner und arbeiten in vier Schritten: **abrufen → Vorschläge schreiben und prüfen → Freigabe durch dich → übernehmen**. In `data/` wird nichts ohne deine ausdrückliche Freigabe geändert; Zwischenstände liegen unter `updates/<Datum>/`. Details zu Dateiformaten und Einzelbefehlen: [`updates/README.md`](updates/README.md).

### Voraussetzungen

```bash
npm install
export SCRAPE_CONTACT="redaktion@example.org"   # Kontaktadresse für den User-Agent (Pflicht für Abrufe, nicht mit --offline)
```

Abgerufene Seiten und Antworten liegen nur lokal unter `.cache/` und werden nicht versioniert. Alle Abrufe beachten `robots.txt` und halten Abstand (2 s je Website bei Orten, 1 s bei Wikimedia).

### `/update-venue-data` – Orte, Veranstalter, Festivals, Magazin

Aktualisiert Orte, Ausstellungen, Events, Veranstalter und Festivals aus deren Webseiten (höchstens 6 Seiten je Ort) und pflegt das Magazin.

```text
/update-venue-data                      # alle Orte und Veranstalter mit Website
/update-venue-data --venue makk-koeln   # ein Ort oder Veranstalter
/update-venue-data --offline            # nur mit zwischengespeicherten Seiten, ohne Netz
```

Hinweise:
* Jeder Vorschlag nennt seine Fundstelle; Festivals werden nur mit belegtem Zeitraum vorgeschlagen (ADR-010).
* Zu neuen, eröffnenden, bald endenden und beendeten Ausstellungen entstehen Magazinbeiträge (60 bis 80 Wörter, `npm run news:plan|check|apply`). Sie erscheinen erst an dem Tag ihres Anlasses und werden nur nach Freigabe übernommen.
* Prüfe vor der Freigabe Fundstellen und Daten stichprobenartig gegen die Webseite; die Prüfung kann Formfehler finden, aber nicht jede Sachabweichung.

### `/research-photographers` – Profile der Fotograf:innen

Ergänzt Berufsbezeichnung, Lebensdaten, Wikipedia-Zusammenfassung und Portrait (nur Wikimedia Commons, freie Lizenz, mit Bildnachweis).

```text
/research-photographers                              # alle Personen ohne Wikipedia-Text oder Portrait
/research-photographers --photographer august-sander # eine Person (mit --force ein vorhandenes Profil ersetzen)
/research-photographers --offline                    # nur aus dem Zwischenspeicher
```

Mit `--web` recherchiert der Skill eine einzelne Person zusätzlich über eine Suchmaschine – auch Personen ohne Wikipedia-Eintrag oder noch nicht erfasste Personen:

```text
/research-photographers --web --photographer wendy-red-star
/research-photographers --web --name "Wendy Red Star"   # legt die Person nach Freigabe an, falls sie fehlt
```

Hinweise:
* Ohne `--web` entsteht keine Suchanfrage. Mit `--web` sind es höchstens drei Anfragen mit je zehn Treffern; Trefferseiten werden höflich abgerufen (höchstens fünf je Person).
* Die gefundenen Links sammelt `updates/photographers-links.json` über alle Läufe. Ein neuer Kurztext („Aus dem Web“, 40 bis 90 Wörter, 1 bis 5 Quellen) wird nur vorgeschlagen, wenn neue Links dazugekommen sind. Er steht neben der Wikipedia-Zusammenfassung und ersetzt sie nicht.
* Kurztexte sind in eigenen Worten und nur aus den Quellen geschrieben, wörtliche Übernahmen ab acht Wörtern werden verworfen. Bilder aus dem Web werden nie geladen.
* **Prüfe bei der Freigabe**, ob es wirklich die richtige Person ist (Namensgleichheit) und ob der Text sachlich stimmt; das kann kein Skript.
* Vorhandene Profile oder Kurztexte werden nur mit `--force` und ausdrücklicher Freigabe ersetzt. Bei ungültigen Daten bleibt alles unverändert.

### Nach jedem Lauf

```bash
npm run validate:data && npm test && npm run lint
git diff data updates      # Änderungen durchsehen, dann committen
```

Der Bericht des Laufs liegt in `updates/<Datum>/` (`REPORT.md` bzw. `PHOTOGRAPHERS.md`). Beide Skills committen nie von selbst.
