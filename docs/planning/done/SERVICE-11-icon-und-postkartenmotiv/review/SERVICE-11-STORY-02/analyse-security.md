# Security-Analyse: SERVICE-11-STORY-02 – Icon im Kopfbereich vor dem Namen

**Ticket:** SERVICE-11 (Story SERVICE-11-STORY-02)  
**Analysiert:** 2026-10-29  
**Scope:** `web/src/app/app.html`, `web/src/styles.css` (`.brand`, `.brand-mark`), `web/src/app/app.spec.ts` (Block „Icon im Kopfbereich“); Kontext: `web/src/index.html`, `web/public/favicon-96x96.png`  
**Methode:** Statische Code-Analyse (SAST) + Konfigurations-Review; kein `npm audit` (keine Abhängigkeitsänderung in der Story)  
**Status:** Entwurf – wartet auf Abnahme  
**Berücksichtigte ADRs / Gherkin:** ADR-002, ADR-003, ADR-017 / `web/markenicon.feature` (ICO-UB-3 bis ICO-UB-6); PIPELINE.md-Annahmen

---

## Executive Summary

**Gesamtrisiko:** Low

Die Story fügt in `app.html:3` ein statisches `<img>` mit festem, relativem Pfad auf ein eingechecktes PNG ein, dazu zwei CSS-Regeln. Es gibt keine Nutzereingaben, keine Datenbindung (`[src]`, `[innerHTML]`), keine Skripte, keine Token, keine externen Hosts und keine Abhängigkeiten. Daraus ergibt sich keine Angriffsfläche. Es wurden keine Sicherheitsrisiken festgestellt; es bleiben nur zwei Defense-in-Depth-Beobachtungen.

| Schweregrad | Anzahl |
|---|---|
| Critical | 0 |
| High | 0 |
| Medium | 0 |
| Low | 0 |

---

## Identifizierte Sicherheitsrisiken

Keine Befunde.

Geprüft und am Code verifiziert:

- **Injection/XSS (A05:2025):** Das `src` ist ein Literal (`app.html:3`), keine Interpolation, kein `bypassSecurityTrust*`, kein `innerHTML`. Der Pfad kommt nicht aus Daten oder Routenparametern.
- **Externe Ressourcen / Datenabfluss:** `favicon-96x96.png` ist relativ zum `<base href>` (`index.html`), also derselbe Ursprung. Es werden keine Drittanbieter-Hosts kontaktiert; kein Referrer-/IP-Abfluss.
- **Sicherheitsrelevante Konfiguration:** `alt=""` und `aria-hidden="true"` sind reine Barrierefreiheitsattribute. `routerLink="/"` ist statisch, kein offener Redirect.
- **CSS:** `.brand`/`.brand-mark` enthalten keine `url()`-Referenzen, kein `@import`, keine `attr()`-Konstrukte.
- **Test-Code:** Der Block „Icon im Kopfbereich“ ändert nur im Test-DOM `img.style.display` und schreibt keine Dateien; keine Netzwerkzugriffe, keine Secrets. `TestBed.resetTestingModule()` bleibt im Test.
- **Asset:** `web/public/favicon-96x96.png` ist ein echtes PNG (96 × 96, RGBA, 20 kB laut `file`), kein SVG und damit ohne eingebettete Skripte.

---

## Regressionen und bekannte Risiken

Frühere Security-Analysen (SERVICE-10) meldeten keine offenen Risiken, die diese Story berühren. OBS-03 aus SERVICE-10 (kein CSP im Repository) besteht unverändert; siehe Beobachtung unten. Die dokumentierten Annahmen in PIPELINE.md (Quellbild, Nutzungsrechte außerhalb des Tickets) sind keine Sicherheitsbefunde.

---

## Beobachtungen ohne akutes Risiko

- **OBS-01 – Kein CSP im Repository (bekannt):** Im Repository ist weiterhin keine Content-Security-Policy konfiguriert (Auslieferung über GitHub Pages, ADR-003, Header dort nicht steuerbar). Das neue `<img src>` auf denselben Ursprung wäre mit einer künftigen strikten CSP (`img-src 'self'`) verträglich. Kein Handlungsbedarf aus dieser Story.
- **OBS-02 – Bildherkunft:** Das ausgelieferte PNG wird aus `docs/resources/icon.png` per Skript erzeugt (ADR-017) und ist eingecheckt. Ein PNG kann beim Austausch Metadaten (z. B. EXIF/Textchunks) enthalten; ob solche vorhanden sind, wurde in dieser Story-Analyse nicht bewertet (liegt im Umfang von STORY-01). Reiner Hinweis.

---

## Positive Sicherheitsmaßnahmen

- Vollständig statisches Markup, kein dynamisches `src`.
- Same-Origin-Ressource, keine Drittanbieter.
- Raster-PNG statt SVG, keine aktiven Inhalte.
- Feste Breite/Höhe (`width="32" height="32"`, `.brand-mark`) verhindert Layout-Sprünge und Missbrauch durch übergroße Darstellung.

---

## Abgeleitete Tasks

Keine (kein Befund ab Schweregrad Medium).

---

## Nicht bewertbar

- Auslieferungs-Header des Hostings (CSP, `X-Content-Type-Options`, Caching): nicht im Repository.
- Inhalt der PNG-Metadaten und Rechte am Bild: außerhalb des Story-Umfangs.
