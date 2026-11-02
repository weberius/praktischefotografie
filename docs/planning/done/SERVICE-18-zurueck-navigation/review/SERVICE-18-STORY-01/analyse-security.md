# Security-Analyse: Zurück-Link auf Detailseiten (SERVICE-18-STORY-01)

**Ticket:** SERVICE-18  
**Analysiert:** 2026-11-02  
**Scope:** `web/src/app/core/nav-history.ts`, `web/src/app/shared/back-link/*`, `web/src/app/pages/*-detail/*-detail.{html,ts,css}` (Änderungen gegen `main` und nicht versionierte Dateien); Kontext: `markdown.service.ts`, `post-detail`. Nicht im Scope: `docs/product/ideen`.  
**Methode:** Statische Code-Analyse (SAST) + Konfigurations-Review + `npm audit --omit=dev` (Verzeichnis `web/`)  
**Status:** Entwurf – wartet auf Abnahme  
**Berücksichtigte ADRs / Gherkin:** ADR-022 (Zurück-Link mit Anwendungsverlauf), ADR-002, ADR-003, ADR-021 (Kontext) / `web/navigation.feature`

Hinweis: Die Pfade des Skills (`context/AI_CONTEXT.md`, OAuth-/Guard-ADRs, `docs/product/...`) existieren in diesem Projekt nicht. Das Projekt ist eine statische SPA ohne Login, Rollen, Interceptoren oder Backend; die entsprechenden Prüfpunkte sind nicht anwendbar. Frühere Security-Analysen liegen nicht vor.

---

## Executive Summary

**Gesamtrisiko:** Low

Die Änderung führt einen rein clientseitigen Verlauf im Speicher ein. Die Zieladresse stammt ausschließlich aus Router-Ereignissen (`NavigationEnd.urlAfterRedirects`) und wird als `UrlTree` über `routerLink` gerendert. Es gibt keinen Weg, eine externe oder `javascript:`-Adresse einzuschleusen, keine Persistenz, keine neuen Sinks und keine neuen Abhängigkeiten. `npm audit --omit=dev` meldet 0 Schwachstellen. Es gibt keine Befunde ab Schweregrad Low und daher keine vorgeschlagenen Tasks.

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

Keine früheren Security-Analysen vorhanden. Q-SEC-3 (Beitragstext nur über `[innerHTML]` mit Angular-Sanitizer, `markdown.service.ts`, `post-detail.html:10`) ist durch die Änderung nicht berührt; `post-detail.html` erhält nur das Element `<app-back-link>`. Keine Regression.

---

## Beobachtungen ohne akutes Risiko

- **Open Redirect / Link-Injektion (A01, A05) – nicht ausnutzbar.** `nav-history.ts:11-16` übernimmt nur `urlAfterRedirects` interner Router-Navigationen. `previous()` (`nav-history.ts:22`) parst sie mit `router.parseUrl` zu einem `UrlTree`, `back-link.ts:38` bindet ihn über `routerLink`. Ein `javascript:`- oder `https://`-Ziel kann so nicht entstehen; Angular stellt interne Router-Adressen immer relativ zur App dar. Der Fallback `fallback` ist in allen sieben Detailseiten eine feste Zeichenkette (`/events`, `/exhibitions`, `/festivals`, `/organizers`, `/photographers`, `/`, `/venues`).
- **XSS (A05) – nicht ausnutzbar.** Die Beschriftung (`back-link.ts:28-32`, `:38`) entsteht aus festen Tabellen oder dem Text „vorherige Seite“ und wird als Text interpoliert (Angular-Escaping). Pfadanteile aus der URL gelangen nie ungefiltert in die Ausgabe. Randfall ohne Sicherheitsbezug: `DETAILS[first]` (`back-link.ts:31`) ist ein Objektliteral; ein Pfad wie `/constructor/x` würde den geerbten Wert statt „vorherige Seite“ liefern (nur Text, kein Skript). Das ist ein Qualitätsthema für `/review-code`.
- **Datenschutz (A04/A09) – unkritisch.** Der Verlauf (`nav-history.ts:8-9`) hält nur die letzten zwei Router-URLs im Speicher, ohne `sessionStorage`, Cookies, Logging oder Übertragung; das deckt sich mit ADR-022 und RCH-UB-3. Query-Parameter bleiben im `UrlTree` erhalten; es gibt in der Anwendung keine sensiblen Daten in URLs (kein Login, keine Nutzerdaten – Annahme anhand der Codebasis).
- **Denial of Service (A06) – nicht relevant.** Kein unbegrenztes Wachstum (zwei Strings), kein Rekursionspotenzial; wiederholte Navigation auf dieselbe URL wird ignoriert (`nav-history.ts:12`).
- **Lebenszyklus.** Die Router-Subscription (`nav-history.ts:11`) wird nie gekündigt; der Dienst ist `providedIn: 'root'` und lebt so lange wie die Anwendung. Kein Leck mit Sicherheitsbezug.

---

## Positive Sicherheitsmaßnahmen

- Keine neuen Sinks (`innerHTML`, `bypassSecurityTrust*`, `eval`, direkter DOM-Zugriff) im Scope.
- Ziel ausschließlich über Router-API (`UrlTree`/`routerLink`) statt Stringverkettung oder `window.location`.
- Verlauf nur im Arbeitsspeicher, keine Persistenz.
- Keine neue Abhängigkeit; `npm audit --omit=dev`: 0 Schwachstellen.
- Bestehende HTML-Ausgabe des Beitragstexts bleibt über den Angular-Sanitizer geführt.

---

## Abgeleitete Tasks

Keine. Es gibt keinen Befund ab Schweregrad Medium; die Beobachtungen erfordern keine Maßnahme.

| Task | Titel | Priorität | Aufwand | Befunde |
|---|---|---|---|---|
| – | – | – | – | – |

---

## Nicht bewertbar

- Auslieferung (Security-Header, CSP, Hosting-Konfiguration von GitHub Pages) liegt nicht im Repository und wurde nicht bewertet.
- Browserverhalten bei Vorrendern/Hydration des Zurück-Links wurde nur statisch gelesen, nicht ausgeführt.
