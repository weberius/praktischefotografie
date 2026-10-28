# Product Requirements Document (PRD)

## Project: `praktischefotografie`
**Sub-line / Dachmarke:** *Zentrum für Praktische Fotografie*  
**Dokumenten-Version:** 1.0  
**Status:** In Konzeption / Initialer Prototyp  

---

## 1. Produkt-Vision & Zielsetzung

### 1.1 Vision
`praktischefotografie` ist das digitale Portal und der Kultur-Guide zur Erkundung der Fotografie-Landschaft – mit initialem Fokus auf Nordrhein-Westfalen (NRW) und geplanter Skalierung auf ganz Deutschland. 

Das Projekt versteht sich als Gegenentwurf zu kommerziellen Kamera-Testportalen (*Gear-Reviews*) oder rein elitären Kunstkritik-Plattformen. Es rückt die **Praxis des Sehens, Flanierens (Promenadologie), Entdeckens und der Begegnung** in den Mittelpunkt.

### 1.2 Zielgruppen
* **Kultur- & Fotografie-Begeisterte:** Personen, die gezielt nach Fotoausstellungen, Werkschauen, Fotobuch-Orten und Präsenzbibliotheken suchen.
* **(Hobby-)Fotograf:innen & Kunstschaffende:** Personen, die sich vernetzen, Inspiration suchen, an Artist Talks/Workshops teilnehmen oder Community-Events/Messen (z. B. *Image World*, *Fujikina*) besuchen möchten.
* **Kultur-Touristen & Lokal-Flaneure:** Menschen, die strukturierte Routen oder Ausflugstipps für Wochenenden in Städten (z. B. Kölner Südstadt, Düsseldorfer Kunstszene, Eifel) oder Regionen suchen.

### 1.3 Abgrenzung (Out of Scope)
* **Kein Kamera-/Equipment-Handel:** Keine Testberichte über Kameras, Objektive oder Hardware.
* **Kein Dienstleister-Verzeichnis:** Keine Listung von kommerziellen Passbild-, Hochzeits- oder Mietstudios.

---

## 2. Kernfunktionen & User Stories

### 2.1 Magazin / Blog-First Einstieg
* **Konzept:** Der Startbereich der Anwendung bietet redaktionell aufbereiteten Content (Guides, Rezensionen, Ortsporträts, Monats-Highlights).
* **Feature:** Direkte Einbettung von Ausstellungs-Widgets und Orts-Karten innerhalb der Artikel.
* **User Story:** *„Als Fotofan möchte ich beim Öffnen der Seite aktuelle Tipps und fundierte Berichte lesen, damit ich weiß, welche Ausstellungen sich aktuell besonders lohnen.“*

### 2.2 Ausstellungs-Kalender & Agenda
* **Konzept:** Übersicht über laufende und anstehende Ausstellungen sowie Einzelveranstaltungen.
* **Dringlichkeits-Logik:** Automatisierte Kennzeichnung von Ausstellungen, die innerhalb der nächsten 7–14 Tage enden (**„Endet bald“**-Badge).
* **User Story:** *„Als Ausstellungsbesucher möchte ich sehen, welche Fotoschau in meiner Nähe demnächst schließt, damit ich sie nicht verpasse.“*

### 2.3 Interaktive Karte & Ortssystem
* **Konzept:** OpenStreetMap-basierte Karte mit detaillierter Typisierung der Orte (Museen, Stiftungen, Spezialgalerien, Off-Spaces, Präsenzbibliotheken/Archive).
* **Feature:** Filtermöglichkeit nach Ortseigenschaften (z. B. *„Hat Präsenzbibliothek“*, *„Ständige Sammlung“*).
* **User Story:** *„Als Buch- und Recherche-Interessierter möchte ich Orte filtern können, die eine öffentlich zugängliche Fotobuch-Präsenzbibliothek besitzen (z. B. MAKK Köln, PhotoBookMuseum).“*

### 2.4 Meta-Ebene für Netzwerke & Festivals
* **Konzept:** Erfassung von Dachorganisationen und Netzwerken ohne festen Ausstellungsraum (z. B. *Internationale Photoszene Köln*, *Düsseldorf Photo+*).
* **Festival-Modus:** Temporäre Umschaltung der Karte/Agenda, um alle teilnehmenden Venues eines Stadt-Festivals auf einen Blick zu filtern.
* **User Story:** *„Als Festivalbesucher der Photoszene möchte ich alle Partner-Ausstellungen auf einer spezifischen Festival-Karte sehen, um mir eine Tagesroute zusammenzustellen.“*

### 2.5 Fotograf:innen-Index
* **Konzept:** Quervernetzung der Datenbank über Beteiligungen.
* **User Story:** *„Als Fan von Martin Parr möchte ich sehen, in welchen vergangenen oder aktuellen Ausstellungen in NRW Werke von ihm gezeigt werden.“*

---

## 3. Technische Architektur & Daten-Design

### 3.1 Architektur-Prinzip
In Anlehnung an das Architekturmuster von [`klangland`](https://github.com/weberius/klangland) wird `praktischefotografie` als **statisch gehostete Single-Page-Application (SPA)** entwickelt.
* **Statische Datenpflege:** Alle Inhalte liegen lokal in strukturierten JSON-Dateien.
* **Redaktionelle Inhalte:** Blogbeiträge werden als Markdown-Dateien (`.md`) mit YAML-Frontmatter verfasst.
* **Performance & Wartung:** Hohe Ladegeschwindigkeit, kein komplexes Datenbank-Server-Backend erforderlich, einfaches Hosting über GitHub Pages / Vercel / Netlify.

### 3.2 Datenmodelle (JSON-Schemata)

#### A. `venues.json` (Orte)
```json
{
  "id": "makk-koeln",
  "name": "MAKK – Museum für Angewandte Kunst Köln",
  "shortName": "MAKK Köln",
  "type": "museum",
  "city": "Köln",
  "district": "Innenstadt",
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
    "libraryNotes": "Öffentlich zugängliche Präsenzbibliothek mit Bestand zu Fotokunst & Design."
  }
}
```

#### B. `exhibitions.json` (Ausstellungen)
```json
{
  "id": "mysterium-der-paare-2026",
  "venueId": "fotografie-forum-monschau",
  "festivalId": null,
  "title": "Mysterium der Paare",
  "startDate": "2026-08-09",
  "endDate": "2026-11-01",
  "type": "group",
  "photographerIds": ["elliott-erwitt", "martin-parr", "richard-kalvar"],
  "description": "Rund 130 Arbeiten erforschen flüchtige Momente des Zusammenkommens."
}
```

#### C. `events.json` (Einzel-Events & Messen)
```json
{
  "id": "image-world-2027",
  "title": "Image World Inspired by Photokina",
  "eventType": "fair_and_convention",
  "startDate": "2027-10-08",
  "endDate": "2027-10-10",
  "venueId": "koelnmesse",
  "city": "Köln",
  "isCommercial": true,
  "highlights": ["Fachvorträge", "Community-Meetups", "Print & Fotobuch-Area"]
}
```

#### D. `organizers.json` (Netzwerke/Festivals)
```json
{
  "id": "photoszene-koeln",
  "name": "Internationale Photoszene Köln e.V.",
  "type": "association",
  "city": "Köln",
  "website": "https://www.photoszene.de"
}
```

#### D2. `festivals.json` (Festivals, ergänzt 2026-10-28, ADR-009)
```json
{
  "id": "photoszene-festival-2027",
  "organizerId": "photoszene-koeln",
  "title": "Photoszene-Festival 2027",
  "startDate": "2027-05-14",
  "endDate": "2027-06-13",
  "city": "Köln",
  "website": "https://www.photoszene.de/de/festival/"
}
```
`festivalId` einer Ausstellung verweist auf ein Festival; `isOfficialFestivalPartner` kennzeichnet offizielle Partner. Veranstalter ohne eigenen Ausstellungsraum stehen in `organizers.json`, nicht in `venues.json`.

#### E. `posts.json` (Magazin-Index)
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

## 4. Benutzeroberfläche (UI) & Taxonomy

### 4.1 Kategorisierung von Events & Orten
Um Verwechslungen zwischen reinen Kunstausstellungen und kommerziellen Events zu vermeiden, nutzt das System klare UI-Badges:
* 🏛️ **Museum / Galerie** (Fokus: Kunst, Dokumentar- & Bildarchitektur)
* 📚 **Fotobuch / Bibliothek / Archiv** (Fokus: Literatur & Forschung)
* 🗣️ **Talk / Symposium / Diskurs** (Fokus: Vortrag & Diskussion)
* 🤝 **Messe / Community-Event** (Fokus: Vernetzung, Vorträge, Produkte)

### 4.2 Seitenstruktur
1. **Magazin (`/`)**: Chronologischer Feed aller Artikel mit integrierten Kalender-Widgets.
2. **Karte (`/map`)**: Interaktive Map mit Filterleiste (Stadt, Typ, Feature).
3. **Agenda (`/calendar`)**: Zeitstrahl-Ansicht aller Ausstellungen und Tagesevents.
4. **Orte (`/venues`)**: Verzeichnis aller erfassten Institutionen und Räume.
5. **Fotografen (`/photographers`)**: Index der Urheber:innen.

---

## 5. Roadmap & Meilensteine

* **Phase 1: Datenbasis & Prototyping (NRW)**
  * Finalisierung des JSON-Schemas.
  * Ersterfassung von 20–30 relevanten Venues in NRW (Monschau, Köln, Düsseldorf, Essen, Gelsenkirchen).
  * Aufbau der statischen Grundanwendung (Karte + einfache Agenda).
* **Phase 2: Magazin-Einbindung & Launch**
  * Veröffentlichung der ersten 5–10 Redaktionsbeiträge.
  * Implementierung der Querverlinkung zwischen Blogbeiträgen, Venues und Ausstellungen.
  * Go-Live unter `praktischefotografie.de` / `.app`.
* **Phase 3: Festival-Module & Kooperationen**
  * Bereitstellung des Festival-Kartenmodus (z. B. für die *Photoszene Köln*).
  * Entwicklung von Import-Skripten für Programmdaten von Partnern.
* **Phase 4: Ausweitung**
  * Geografische Expansion auf ganz Deutschland (DACH-Region).
  * Ausbau als digitale Plattform des *Zentrums für Praktische Fotografie*.
