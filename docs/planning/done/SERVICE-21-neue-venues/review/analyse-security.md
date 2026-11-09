# Security-Analyse: SERVICE-21 – neue Venues (Forum für Fotografie Köln, Kunstmuseum Bonn)

**Ticket:** SERVICE-21  
**Analysiert:** 2026-11-09  
**Scope:** `git diff main -- data/venues.json test/bestand.test.mjs docs/ears/content/venue-erfassung.md docs/contracts/gherkin/content/daten.feature` plus Datenfluss bis zur Senke (`web/src/app/pages/venue-detail/venue-detail.html`, `schema/venues.schema.json`)  
**Methode:** Statische Code-Analyse (SAST) + Konfigurations-Review; kein `npm audit` (keine Abhängigkeitsänderung im Scope)  
**Status:** Entwurf – wartet auf Abnahme  
**Berücksichtigte ADRs / Gherkin:** ADR-001 (Schema-Validierung), ADR-021 (Weiterleitung auf freigegebene Hosts) / `content/daten.feature`

---

## Executive Summary

**Gesamtrisiko:** Low

Der Scope besteht aus zwei neuen statischen Datensätzen, einem Test und Spezifikationstexten. Es gibt keinen ausführbaren Code, keine Secrets und keine neuen Abhängigkeiten. Beide neuen URLs (`website`, `source.url`) verwenden `https://` und werden im Frontend über Angular-Property-Binding (`[href]`, automatisch bereinigt) mit `rel="noopener"` ausgegeben. Es wurden keine Risiken ab Schweregrad Medium festgestellt, daher werden keine Tasks vorgeschlagen.

| Schweregrad | Anzahl |
|---|---|
| Critical | 0 |
| High | 0 |
| Medium | 0 |
| Low | 0 |

---

## Identifizierte Sicherheitsrisiken

Keine.

---

## Regressionen und bekannte Risiken

Keine früheren Security-Analysen unter `docs/planning/` vorhanden; keine Regression zu prüfen.

---

## Beobachtungen ohne akutes Risiko

- **Externe Links aus Daten:** `venue-detail.html:12` und `:27` binden `venue.website` bzw. `venue.source.url` per `[href]`. Angular bereinigt `javascript:`-URLs; zusätzlich erzwingt das Schema `^https?://` (`schema/venues.schema.json:28`, `:46`). Die neuen Werte (`data/venues.json:567`, `:573`, `:592`, `:598`) sind `https://`. Das Schema erlaubt weiterhin `http://`; eine Beschränkung auf `https://` wäre reine Defense-in-Depth (Hinweis, kein Task).
- **`target="_blank"` mit `rel="noopener"`:** Reverse Tabnabbing ist ausgeschlossen. `noreferrer` fehlt an diesen Links (anders als in `photographer-detail.html:59`); das betrifft nur den Referrer, nicht die Sicherheit.
- **Test-Zusicherung:** `test/bestand.test.mjs` vergleicht die Website exakt mit dem erwarteten Wert und schützt so vor unbeabsichtigtem Austausch des Link-Ziels.
- **Vertrauensstellung Fremdseiten:** Die Daten stammen aus recherchierten Webseiten (`status: "recherchiert"`). Ein Besitzwechsel der Domains `de.forum-fotografie.info` bzw. `www.kunstmuseum-bonn.de` ist statisch nicht prüfbar; das ist ein generelles, nicht ticketspezifisches Risiko aller Venues.

---

## Positive Sicherheitsmaßnahmen

- Schemavalidierung (`npm run validate:data`, ADR-001) mit URL- und PLZ-Muster.
- Keine Secrets, Tokens oder personenbezogenen Daten in den Änderungen (nur öffentliche Institutionsadressen).
- Keine neuen Abhängigkeiten, keine Änderungen an Build, Deployment oder Auslieferung.

---

## Abgeleitete Tasks

Keine (kein Befund ab Schweregrad Medium).

---

## Nicht bewertbar

- Tatsächlicher Inhalt der Zielseiten und deren Integrität (statische Analyse, keine Abrufe).
- Security-Header (CSP etc.) der ausgelieferten Seite liegen außerhalb des Scopes.
