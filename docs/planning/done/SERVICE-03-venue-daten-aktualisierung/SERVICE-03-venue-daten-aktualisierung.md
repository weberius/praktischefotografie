# SERVICE-03 – Orts-Daten aus Webseiten aktualisieren

**Status:** Entwurf, an H1 geklärt (Freigabe steht aus)  ·  **Quelle:** Vorgabe der Projektleitung, [PRD](../../../product/prd.md) 3.2, Ergebnis von SERVICE-01

## Ziel
Die Webseiten der erfassten Orte werden rücksichtsvoll abgerufen, daraus entstehen prüfbare Vorschläge zur Vervollständigung der Daten, und ein Skill `update-venue-data` ermöglicht jederzeit einen Aktualisierungslauf.

**Zweck in einem Satz:** Die Redaktion soll Ortsdaten, Ausstellungen und Events aus offiziellen Quellen ergänzen und aktuell halten, ohne alles von Hand zu recherchieren und ohne gesicherte Angaben zu gefährden.

**Erfolgskriterien**
- Ein Aufruf des Skills führt von Abruf bis Übernahme und endet mit einem Bericht.
- Jeder übernommene Wert hat eine Fundstelle; nichts wird ohne Freigabe geändert; `verifiziert` bleibt geschützt.
- Alle Tests laufen ohne Netz; ein Lauf über 20 Orte dauert höchstens 10 Minuten.

## Kontext
20 Orte sind erfasst (`status: recherchiert`). Es fehlen u. a. Stadtteile, Besonderheiten und das aktuelle Programm. Die Datenhaltung folgt ADR-001; Spezifikation und Leitplanken sind bereits vorbereitet: EARS `setup/webseiten-abruf.md`, `setup/datenaktualisierung.md`, `setup/update-skill.md`, Gherkin dazu, Quality `quality/setup/datenaktualisierung.md`, ADR-006 und ADR-007 (`Proposed`).

## Abgrenzung
**Enthalten:** Abruf, Snapshots, Extraktion zu Vorschlägen, Prüfung, freigegebene Übernahme, Bericht, Skill.
**Nicht enthalten:**
- Veröffentlichung oder Versionierung von Seitentexten (Urheberrecht).
- JavaScript-Rendering (Headless-Browser) und Bilder.
- Neue Datenfelder wie Öffnungszeiten, Eintrittspreise oder Barrierefreiheitsangaben (eigenes Schema-Ticket).
- Automatische, zeitgesteuerte Läufe und CI-Anbindung.
- Automatische Vergabe des Status `verifiziert`.
- Rechtliche Prüfung der Nutzungsbedingungen einzelner Betreiber.

## Erwarteter Story-Schnitt
1. Webseiten der Orte abrufen
2. Vorschläge aus den Seiten gewinnen
3. Vorschläge prüfen und freigegeben übernehmen
4. Update-Skill für jederzeitige Aktualisierung

## Betroffene Bereiche
`setup` (Skripte, Skill), `content` (Daten, nur nach Freigabe).

## Qualitätserwartungen
Q-SEC-4 (Höflichkeit), Q-REL-1 (Ausfälle), Q-DATA-3 (Nachvollziehbarkeit), Q-MAIN-2 (offline testbar), Q-PERF-5 (Laufzeit); siehe `docs/quality/setup/datenaktualisierung.md`.

## Definition of Done
- Spezifikation konsistent, ADR-006 und ADR-007 bestätigt.
- `npm test` und `npm run lint` grün, Tests ohne Netz.
- Ein Probelauf für einen Ort liefert Vorschläge mit Fundstelle; die Übernahme ist an H2 vom Menschen geprüft.

## Risiken
- **Rechtlich:** AGB und Urheberrecht der Betreiber; Gegenmaßnahmen: `robots.txt`, geringe Last, keine Weitergabe der Texte, Bewertung durch die Redaktion.
- **Fachlich:** Modellfehler bei der Extraktion; Gegenmaßnahme: Fundstellenpflicht mit Prüfung im Snapshot und menschliche Freigabe.
- **Technisch:** JavaScript-Seiten liefern wenig Text; Gegenmaßnahme: Bericht und manuelle Ergänzung.
- **Prozess:** Der Live-Abruf lässt sich nur eingeschränkt automatisiert testen; Tests nutzen einen lokalen Testserver.

## ANNAHMEN
- ANNAHME: „Daten vervollständigen“ meint die vorhandenen Felder: Stammdaten der Orte (Stadtteil, Adresse, Besonderheiten, Bibliothekshinweis) sowie Ausstellungen, Events und die damit verknüpften Fotograf:innen.
- ANNAHME: „Update-Skill“ ist ein Claude-Code-Skill unter `.claude/skills/update-venue-data/`, der Skripte unter `scripts/scrape/` aufruft.
- ANNAHME: Die Extraktion liest der Skill selbst (kein API-Schlüssel im Projekt).
- ANNAHME: Vorschläge und Berichte werden unter `updates/` versioniert; Snapshots nicht.
- ANNAHME: Bei Ausstellungen werden `photographerIds` nur für vorhandene Personen vorgeschlagen; neue Personen sind eigene Vorschläge mit Fundstelle.
- ANNAHME: Die Kontaktadresse für den User-Agent liefert die Redaktion in `SCRAPE_CONTACT`.

## Entschieden an H1
- Umfang: vorhandene Felder (Stammdaten der Orte, Ausstellungen, Events, verknüpfte Fotograf:innen); Schema unverändert.
- Extraktion: Claude im Skill, mit deterministischer Prüfung der Fundstelle; kein API-Schlüssel im Projekt.
- Ablage: `updates/` (Vorschläge, Berichte) versioniert; Snapshots nicht.
- Review-Schwelle: kritisch + hoch.
