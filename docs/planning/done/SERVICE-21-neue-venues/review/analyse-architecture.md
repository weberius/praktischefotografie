# Architektur-Analyse: Neue Venues (Forum für Fotografie Köln, Kunstmuseum Bonn)

**Ticket:** SERVICE-21  
**Analysiert:** 2026-11-09  
**Scope:** Branch-Diff gegen `main` für `data/venues.json`, `test/bestand.test.mjs`, `docs/ears/content/venue-erfassung.md`, `docs/contracts/gherkin/content/daten.feature` (`docs/product/ideen/` ausgenommen)  
**Status:** Entwurf – wartet auf Abnahme  
**Berücksichtigte ADRs / Gherkin:** ADR-001, ADR-003, ADR-005, ADR-006, ADR-007, ADR-016 (alle ADRs gesichtet; Angular-Kriterien betreffen diesen Scope nicht) / `content/daten.feature`

---

## 1. Executive Summary

| Kriterium | Bewertung |
|---|---|
| Gesamtarchitektur-Score | 8 / 10 |
| Architektur-Reifegrad | Hoch |
| Komponentenorientierung | Nicht anwendbar (kein `src/`-Code im Scope) |
| Wartbarkeit | Mittel |
| Testbarkeit | Hoch |
| Technische Schuld | Gering |
| ADR-Konformität | vollständig konform (0 Verstöße) |

Der Diff ist reine Datenerfassung im bestehenden Modell (ADR-001): zwei Datensätze, keine Schema- und keine Codeänderung, Validierung und Build laufen laut Changelog grün. Die Datensätze sind strukturgleich zu den 22 Bestandsvenues, IDs sind kebab-case und eindeutig, Koordinaten liegen in NRW, `source` ist gesetzt, Spezifikation und Test verweisen sauber aufeinander. Die Schwächen liegen nicht im Datenmodell, sondern im Skalierungsmuster der Spezifikation: Einzelne Venues werden mit ID, Typ, Stadt und Website fest in EARS, Gherkin und Test verdrahtet (ARCH-01). Außerdem ist die Bestandsgrenze von 30 Venues mit jetzt 24 Einträgen absehbar (ARCH-02). Beides ist heute unkritisch, wird aber mit jeder weiteren Venue-Aufnahme teurer.

### Überblick Architektur (Scope)

```mermaid
graph TD
    V[data/venues.json<br/>24 Venues] --> VAL[scripts/validate-data.mjs<br/>ADR-001]
    V --> SYNC[web/tools/sync-data.mjs<br/>ADR-003]
    V --> BT[test/bestand.test.mjs]
    EARS[venue-erfassung.md<br/>VEN-UB-6/7] -. verweist .-> GH[daten.feature<br/>Neue Venues]
    GH -. 1:1 .-> BT
    BT -. dupliziert id/type/city/website .-> V
    BT -. Grenze 20..30 .-> V
    style BT fill:#fdd
    style EARS fill:#fdd
```

---

## 2. Analyse nach Kategorien

### Komponentenarchitektur
- **Bewertung:** Nicht bewertbar (kein Angular-Code im Scope).

### State Management & Reaktivität
- **Bewertung:** Nicht bewertbar (kein Angular-Code im Scope).

### Service-Schicht
- **Bewertung:** Nicht bewertbar. Die Venues werden unverändert über Validator und Sync (ADR-001, ADR-003) konsumiert; der Diff berührt keine Schicht.

### Struktur & Abhängigkeiten
- **Bewertung:** Stark
- **Beobachtungen:** Beide Datensätze (`data/venues.json:553-577`, `579-603`) folgen dem Bestandsmuster (Felder, `features`, `source`); das Pflichtfeld `district` ist gesetzt. Keine neue Abhängigkeit, kein neues Feld, kein Eingriff in Schema oder Demo-Daten (ADR-005). Der Datenbestand bleibt weit unter dem 100-KB-Limit (16,9 KB, `test/bestand.test.mjs:59`).
- **Architektur-Risiko:** Gering.
- **Skalierungsrisiko:** Die Bestandsgrenze von 30 (ARCH-02).
- **Wartbarkeitsauswirkung:** Gering.

### Kopplung & Kohäsion
- **Bewertung:** Mittel
- **Beobachtungen:** Der Test `test/bestand.test.mjs:39-52` hält die Sollwerte (`id`, `type`, `city`, `website`) als zweite Kopie der Daten; dieselben Werte stehen in `docs/ears/content/venue-erfassung.md:12-13` und `docs/contracts/gherkin/content/daten.feature:103-105`. Dieselbe Tatsache lebt damit an vier Orten (Daten, EARS, Gherkin, Test).
- **Architektur-Risiko:** Änderung einer Website oder eines Typs bricht Test und verlangt Änderung von Spezifikation und Gherkin (ARCH-01).
- **Skalierungsrisiko:** Pro neuer Venue wächst jedes der drei Dokumente um einen Eintrag.
- **Wartbarkeitsauswirkung:** Mittel.

---

## 3. Prinzipien

### SRP – Score 8
- **Eingehalten:** `venues.json` hält Daten, Validator die Regeln (ADR-001), `bestand.test.mjs` die Bestandsprüfungen.
- **Verletzt:** Der neue Test vermischt Existenz, Soll-Attribute und Quellenprüfung in einem Szenario (`test/bestand.test.mjs:39-52`); die Quellenprüfung deckt `VEN-UB-5` bereits ab (Zeilen 31-37).
- **Auswirkung:** Testbarkeit, geringfügig.

### OCP – Score 6
- **Eingehalten:** Neue Venue ohne Codeänderung möglich.
- **Verletzt:** Jede Venue erzwingt Änderung von EARS, Gherkin und Test (ARCH-01).
- **Auswirkung:** Erweiterbarkeit.

### LSP – Score –
- Nicht anwendbar.

### ISP – Score –
- Nicht anwendbar.

### DIP – Score –
- Nicht anwendbar (kein Code).

### Separation of Concerns – Score 7
- **Eingehalten:** Daten, Spezifikation, Test getrennt; Spezifikation enthält keine Ticket-IDs (Vorgabe AGENTS.md).
- **Verletzt:** `docs/ears/content/venue-erfassung.md:15` enthält eine Prozessnotiz („in der Umsetzung“) in einem normativen Dokument (ARCH-03).
- **Auswirkung:** Kognitive Komplexität, Lesbarkeit der Norm.

### Law of Demeter – Score –
- Nicht anwendbar.

---

## 4. Identifizierte Architektur-Schwächen

### ARCH-01: Venue-spezifische Anforderungen und Tests pro Einzelvenue

- **Priorität:** Mittel
- **Betroffene Stelle:** `docs/ears/content/venue-erfassung.md:12-13`, `docs/contracts/gherkin/content/daten.feature:96-106`, `test/bestand.test.mjs:39-52`
- **Beschreibung:** VEN-UB-6 und VEN-UB-7 sind je eine Anforderung pro Venue und nageln `id`, `type`, Stadt und Website fest. Gherkin und Test spiegeln dieselbe Tabelle. Bestehende Anforderungen (VEN-UB-1 bis VEN-UB-5) beschreiben dagegen Eigenschaften des Bestands, nicht einzelne Einträge.
- **Verletztes Prinzip / ADR:** OCP, DRY auf Strukturebene; kein ADR-Verstoß.
- **Konsequenz:** Jede weitere Venue erzeugt EARS-ID, Gherkin-Zeile und Testzeile; Datenänderungen (z. B. neue Website-URL) brechen den Test, obwohl der Bestand valide ist.
- **Langfristiges Risiko:** Bei Ausbau Richtung 30 Venues wachsen drei Dokumente parallel; die Spezifikation wird zum Datenspiegel statt zum Vertrag.

### ARCH-02: Bestandsobergrenze von 30 Venues nähert sich

- **Priorität:** Mittel
- **Betroffene Stelle:** `test/bestand.test.mjs:11-13`, `docs/ears/content/venue-erfassung.md:7` (VEN-UB-1), Q-DATA-2
- **Beschreibung:** Mit 24 Venues sind noch 6 Aufnahmen bis zur harten Obergrenze möglich. 12 von 24 Venues liegen in Köln (`data/venues.json`). ADR-001 vermerkt bereits, dass die Grenzen bei der Expansion (PRD Phase 4) anzupassen sind. Dass die Venues durch Ideen wie `idee-012` wachsen, zeigt, dass die Grenze im Normalbetrieb erreicht wird.
- **Verletztes Prinzip / ADR:** Kein Verstoß; Skalierungsrisiko (ADR-001, Konsequenzen).
- **Konsequenz:** Die 31. Venue lässt den Test scheitern; dann wird eine Spezifikationsänderung zum Blocker für reine Datenerfassung.
- **Langfristiges Risiko:** Obergrenze als Qualitätsziel (Q-DATA-2) ohne Begründung wirkt willkürlich. Entscheidung nötig, ob sie ein Schutz (Performance, Kuratierung) oder ein Planungsstand aus der Anfangsphase ist.

### ARCH-03: Prozessnotiz in normativem EARS-Dokument

- **Priorität:** Niedrig
- **Betroffene Stelle:** `docs/ears/content/venue-erfassung.md:15`
- **Beschreibung:** Die `ANNAHME:` spricht von „der Umsetzung“ und von der „Recherche“ und beschreibt Herkunft der Daten und eine Typ-Lesart. Das ist ein Planungs-/Datenherkunftsthema; `source` im Datensatz trägt es bereits (Q-DATA-2). Laut AGENTS.md sind `ears/` normative Dokumente ohne Ticketbezug und werden fortgeschrieben.
- **Verletztes Prinzip / ADR:** Separation of Concerns (Spezifikation vs. Planung); AGENTS.md-Konvention „Normative Dokumente“.
- **Konsequenz:** Die Notiz bleibt nach Abnahme (H2) als veralteter Hinweis im gültigen Stand stehen.
- **Langfristiges Risiko:** Gering; Rauschen in der Norm.

### ARCH-04: `source.url` verweist auf flüchtige Ausstellungsseite (ohne Task)

- **Priorität:** Niedrig
- **Betroffene Stelle:** `data/venues.json:598` (Kunstmuseum Bonn, Einzelausstellung „Herlinde Koelbl“); `data/venues.json:573` stabiler (Ausstellungsübersicht)
- **Beschreibung:** Die Quelle des Kunstmuseums ist eine zeitlich begrenzte Ausstellungsseite. Das entspricht dem Bestandsmuster (`fotografie-forum-monschau`, `data/venues.json:21`), ist also kein Neuverstoß.
- **Verletztes Prinzip / ADR:** Kein Verstoß; ADR-006/007 behandeln `source.url` als Fundstelle, nicht als Dauerlink.
- **Konsequenz:** Die URL kann nach Ausstellungsende ins Leere laufen; `/update-venue-data` ersetzt sie beim nächsten Lauf.
- **Langfristiges Risiko:** Gering; bewusst nicht als Task geführt.

---

## 5. Skalierbarkeit & Risiken

- **Wachsende Feature-Anforderungen:** Weitere Venues sind datengetrieben ohne Codeänderung möglich, laufen aber in die Grenze 30 (ARCH-02) und vermehren Spezifikationszeilen (ARCH-01).
- **Team-Wachstum:** Mehrere Personen pflegen `venues.json`; ein Test mit Sollwerten je Venue erzeugt Merge-Konflikte in drei Dateien (ARCH-01).
- **Zunehmende fachliche Komplexität:** Typ als „Lesart“ (`ANNAHME`) zeigt, dass die Typzuordnung (Museum/Galerie) nicht immer eindeutig ist; eine Typisierungsregel fehlt (Hinweis, nicht als Befund geführt, ADR-016 koppelt Kartensymbole an den Typ).

### Top 5 architektonische Risiken

1. Obergrenze 30 blockiert die Aufnahme – ARCH-02
2. Spezifikation spiegelt Daten je Venue – ARCH-01
3. Köln-Konzentration (12/24) verzerrt Kartendarstellung und Auswahl – ARCH-02
4. Prozessnotizen in normativen Dokumenten – ARCH-03
5. Flüchtige `source.url` – ARCH-04

### Alternative Ansätze (optional)

- **Eigenschaft statt Einzelvenue:** Eine EARS-Anforderung „jede in Ideen/Anforderungen genannte Venue ist im Katalog“ lässt sich nicht automatisiert prüfen. Stattdessen: ein Erwartungs-Fixture `test/fixtures/` oder gar kein venue-spezifischer Test, wenn Validator (ADR-001) und VEN-UB-1 bis VEN-UB-5 den Bestand ausreichend schützen. Trade-off: weniger Regressionsschutz gegen versehentliches Löschen einer Venue.

---

## 6. Positive Aspekte

- Strukturgleiche, validierbare Datensätze ohne Schemaänderung (ADR-001 eingehalten).
- Spezifikation ticketunabhängig, Verweiskette EARS → Gherkin → Test vollständig (`# EARS: VEN-UB-6, VEN-UB-7`, Testtitel mit IDs).
- Abgrenzung zum `fotografie-forum-monschau` ist sauber über eigene ID gelöst.
- Prüfstand und Quelle (`source`) vollständig, Datum nicht in der Zukunft.

## 7. Bewusst nicht gemeldet

- Kein DSA-/Signals-/OnPush-Bezug: Der Scope enthält keinen Angular-Code.
- Kein Befund zu Sync und Demo-Daten: Neue Venues liegen in `data/`, Demo-Daten bleiben getrennt (ADR-005); Kopie nach `web/public` ist Build-Artefakt (ADR-003).
- Handpflege der JSON-Datei und Validierung per Ajv sind durch ADR-001 gedeckt.
- Koordinaten aus OSM/Nominatim statt eigener Messung: im Bestand üblich, durch `source`/NRW-Prüfung abgesichert.

## 8. Abgeleitete Tasks (Top-Maßnahmen)

| Task | Titel | Priorität | Aufwand | Befunde | Erwartete Wirkung |
|---|---|---|---|---|---|
| [TASK-01](TASK-01-venue-spezifikation-entkoppeln.md) | Venue-spezifische Spezifikation und Test entkoppeln | Medium | ~1 h | ARCH-01, ARCH-03 | Spezifikation bleibt Vertrag über den Bestand, weniger Mehrfachpflege |
| [TASK-02](TASK-02-bestandsobergrenze-klaeren.md) | Entscheidung zur Obergrenze von 30 Venues | Medium | ~30 min | ARCH-02 | Datenerfassung wird nicht durch Testgrenze blockiert |

## 9. Nicht bewertbar

- Darstellung der neuen Venues in Web-App und Karte: `npm run web:test` lief laut Story-Changelogs mangels Chrome nicht; die Wirkung auf Seiten, Karte (ADR-016) und Sitemap wurde nicht geprüft (nur über Changelog, Sitemap 176 Adressen).
- Fachliche Richtigkeit von Adresse, Koordinaten und Typ (Webrecherche nicht Teil des Reviews).
- Frühere Analysen und `context/AI_CONTEXT.md`: nicht vorhanden bzw. keine früheren Review-Ordner.
