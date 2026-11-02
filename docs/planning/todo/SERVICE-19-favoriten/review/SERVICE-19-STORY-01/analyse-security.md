# Security-Analyse: Events favorisieren (SERVICE-19-STORY-01)

**Ticket:** SERVICE-19  
**Analysiert:** 2026-11-02  
**Scope:** `web/src/app/core/favorites.ts`, `web/src/app/shared/favorite-toggle/*` (ts, spec), `web/src/app/pages/event-list/*`, `event-detail/*`, `calendar/*` (nur Favoriten-Änderungen laut `git diff` und nicht versionierte Dateien), `web/src/styles.css`; Spezifikation: `docs/ears/web/favoriten.md`, `docs/quality/web/favoriten.md` (Q-SEC-10), `ADR-023`  
**Methode:** Statische Code-Analyse (SAST) + Konfigurations-Review + `npm audit --omit=dev` (Verzeichnis `web/`)  
**Status:** Entwurf – wartet auf Abnahme  
**Berücksichtigte ADRs / Gherkin:** ADR-023 (Favoriten im Speicher der Sitzung), ADR-002 (Kontext) / `web/favoriten.feature`

Hinweis: Die Pfade des Skills (`context/AI_CONTEXT.md`, OAuth-/Guard-ADRs, `docs/product/...`) existieren in diesem Projekt nicht. Das Projekt ist eine statische SPA ohne Login, Rollen, Interceptoren im Produktivcode oder Backend; die entsprechenden Prüfpunkte sind nicht anwendbar. Die Analyse von SERVICE-18 (`SERVICE-18-STORY-01`) lag ohne offene Befunde vor; keine Regression im gemeinsamen Scope.

---

## Executive Summary

**Gesamtrisiko:** Low

Die Änderung hält die Favoriten als `Set` von Event-IDs in einem Signal im Arbeitsspeicher. Es gibt keine Persistenz, keine Netzanfragen, keine neuen Sinks und keine neuen Abhängigkeiten (`npm audit --omit=dev`: 0 Schwachstellen). Die IDs stammen aus den statischen Daten und werden nur als Set-Schlüssel und als Textinterpolation verwendet. Es gibt einen Befund mit Schweregrad Low (Beweiskraft des Tests für Q-SEC-10); er erfordert keinen Task.

| Schweregrad | Anzahl |
|---|---|
| Critical | 0 |
| High | 0 |
| Medium | 0 |
| Low | 1 |

---

## Identifizierte Sicherheitsrisiken

### SEC-01: Q-SEC-10-Test prüft „keine Netzanfragen“ nicht wirksam

- **Kategorie:** Software & Data Integrity / Prüfnachweis (Defense in Depth)
- **OWASP-Bezug:** A09:2025 – Logging & Monitoring Failures (fehlender Nachweis), A06:2025 – Insecure Design (Datenschutz-Zusage RCH-UB-3)
- **Schweregrad:** Low
- **Exploit-Wahrscheinlichkeit:** Niedrig
- **Betroffene Stelle:** `web/src/app/shared/favorite-toggle/favorite-toggle.spec.ts:86,91,94` (zusätzlich `:88-97`); Anforderung `docs/quality/web/favoriten.md` (Q-SEC-10)
- **Beschreibung des Risikos:** Der Test überwacht `window.fetch`. Die Anwendung greift aber über `HttpClient` zu (`data.service.ts:11`, `app.config.ts:25` mit `withFetch()`); im Test übernimmt ein Fixture-Interceptor die Antworten (`testing/test-data.ts:126-144`), `window.fetch` wird nie aufgerufen. Die Prüfung `fetchSpy.calls.count()` bliebe deshalb auch grün, wenn ein späterer Code beim Markieren per `HttpClient` Daten senden würde. XHR und IndexedDB, die Q-SEC-10 ausdrücklich nennt, werden nicht geprüft (nur `document.cookie`, `localStorage`, `sessionStorage`).
- **Angriffsszenario:** Kein Angriff auf die heutige Implementierung. Eine spätere Änderung (z. B. Synchronisierung oder Analytics beim Favorisieren) könnte Favoriten übertragen oder persistieren, ohne dass der Test rot wird; die Zusage „nichts verlässt das Gerät“ wäre unbemerkt gebrochen.
- **Auswirkung:** Vertraulichkeit (Präferenzdaten, mittelbar) – nur bei künftiger Fehlentwicklung.
- **Begründung:** Heutiger Code verifiziert sauber (`favorites.ts` ohne Web-API, keine HTTP-Nutzung). Das Risiko liegt allein in der Regressionssicherheit; daher Low, kein Task ab Medium erforderlich.
- **Empfohlene Mitigation:** Beim Markieren die HTTP-Anfragen am Fixture-Interceptor bzw. über `HttpTestingController` zählen (zusätzlich zu `fetch`), und `XMLHttpRequest.prototype.open` sowie `indexedDB.databases()` einbeziehen. Optional: Quellcode-Test, der `favorites.ts` auf Web-Speicher-/HTTP-Zugriffe prüft. Kann bei Gelegenheit im Rahmen eines Review-Tasks aus `/review-code` aufgegriffen werden.

---

## Regressionen und bekannte Risiken

Keine offenen Risiken aus früheren Analysen im Scope. SERVICE-18 (Zurück-Link) hatte keine Befunde; `event-detail.html` erhält nur das zusätzliche Element `<app-favorite-toggle>`, der bestehende ICS-Download (Blob-URL, `event-detail.ts:62-65`) ist unverändert. Q-SEC-3 (HTML nur über Angular-Sanitizer) ist nicht berührt. Keine Regression.

---

## Beobachtungen ohne akutes Risiko

- **XSS / Injection (A05) – nicht ausnutzbar.** `favorite-toggle.ts:9-11` gibt `title()` nur als Textinterpolation (`{{ }}`) in einem `visually-hidden`-Span aus, `eventId()` nur als Set-Schlüssel. Kein `innerHTML`, kein `bypassSecurityTrust*`, kein direkter DOM-Zugriff in den geänderten Dateien (per `grep` verifiziert; die vorhandene `document`-Nutzung in `event-detail.ts:62-65` stammt aus dem ICS-Download und gehört nicht zur Änderung). `[attr.aria-pressed]` bindet einen Boolean.
- **Event-Handler im Template.** `event-list.html:15` nutzt `$any($event.target).checked`. Das ist ein reiner Typ-Cast auf ein Boolean-Feld, kein Sicherheitsrisiko (Stilfrage für `/review-code`).
- **Persistenz und Datenabfluss (A04/A02) – ADR-023 eingehalten.** `favorites.ts` verwendet weder `localStorage`/`sessionStorage`/IndexedDB noch Cookies, `HttpClient` oder `fetch`; kein Logging der IDs. Passt zu FAV-UB-3 und RCH-UB-3.
- **Manipulierbarkeit des Zustands (A01).** Favoriten lassen sich über Entwicklerwerkzeuge verändern; sie haben keine Server- oder Berechtigungswirkung und sind nur lokale Darstellung. Eine unbekannte ID führt höchstens zu einem nie angezeigten Eintrag (`count()` kann dann abweichen; kein Sicherheitsbezug). Keine IDOR-Fläche, da kein Backend.
- **Denial of Service (A06) – nicht relevant.** `toggle` kopiert das Set (O(n)); die Größe ist durch die Zahl der Events begrenzt und nur durch Nutzeraktionen im eigenen Browser wachsbar.
- **Vorrendern/Hydration.** Der Zustand ist pro Browserinstanz und nicht im Server-/Prerender-Kontext gemeinsam genutzt, sofern der Dienst pro Anwendungsinstanz erzeugt wird (`providedIn: 'root'`, Annahme: Prerender erzeugt pro Route eine Instanz; keine Nutzerdaten im Prerender). Statisch gelesen, nicht ausgeführt.
- **CSS.** `styles.css`-Änderung enthält nur statische Regeln (kein `url()`, kein `@import`, kein Inhalt aus Daten).

---

## Positive Sicherheitsmaßnahmen

- Zustand ausschließlich im Arbeitsspeicher (Signal mit `ReadonlySet`), Neuladen löscht ihn.
- Keine neuen Abhängigkeiten; `npm audit --omit=dev`: 0 Schwachstellen.
- Ausgabe nur über Angular-Interpolation und Property-/Attribut-Bindings (automatisches Escaping).
- Komponententest prüft Cookies und Web-Speicher (Teilmenge von Q-SEC-10).
- Keine neuen Netzanfragen, keine Drittanbieter.

---

## Abgeleitete Tasks

Keine. Es gibt keinen Befund ab Schweregrad Medium; SEC-01 (Low) ist als Hinweis dokumentiert.

| Task | Titel | Priorität | Aufwand | Befunde |
|---|---|---|---|---|
| – | – | – | – | – |

---

## Nicht bewertbar

- Auslieferung (Security-Header, CSP, Hosting-Konfiguration) liegt nicht im Repository und wurde nicht bewertet; `index.html` enthält keine CSP-`meta`.
- Verhalten im echten Browser (Hydration, Prerender-Instanzen) wurde nur statisch gelesen. Tests, Build und Laufzeit wurden nicht ausgeführt.
