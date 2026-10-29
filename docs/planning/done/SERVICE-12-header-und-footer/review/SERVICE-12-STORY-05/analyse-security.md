# Security-Analyse: SERVICE-12-STORY-05 Rechtliche Seiten

**Ticket:** SERVICE-12  
**Analysiert:** 2026-10-29  
**Scope:** `web/src/app/pages/{impressum,datenschutz,haftungsausschluss,quellen}/`, `web/src/app/app.routes.ts`, `web/tools/quality/browser-check.mjs`, `web/src/app/app.spec.ts` (Szenario RCH); Kontext: `index.html`, `venue-map.ts`, Fußbereich  
**Methode:** Statische Code-Analyse (SAST) + Konfigurations-Review; kein `npm audit` (Auftrag: kein Build/Test, kein Netzwerk)  
**Status:** Entwurf – wartet auf Abnahme  
**Berücksichtigte ADRs / Gherkin:** ADR-002, ADR-003, ADR-004, ADR-016, ADR-017 / `rechtliches.feature`, `seitenrahmen.feature`, `navigation.feature`

---

## Executive Summary

**Gesamtrisiko:** Low

Die Story fügt vier statische Textseiten mit festen Inhalten, zwei lazy geladene Routen und eine Erweiterung der Prüfliste hinzu. Es gibt keine Eingaben, keine Datenbindung an Nutzerdaten, kein `innerHTML`, keine `bypassSecurityTrust*`-Aufrufe, keinen Token- oder Storage-Zugriff und keine neuen Abhängigkeiten. Alle externen Links tragen `rel="noopener"`. Die Aussagen der Datenschutzerklärung (keine Cookies, kein Storage, einziger Fremdhost `tile.openstreetmap.org` nur auf `/map`) stimmen mit dem Code überein. Es bleiben nur Beobachtungen ohne akutes Risiko; kein Befund erreicht Medium, daher werden keine Tasks vorgeschlagen.

| Schweregrad | Anzahl |
|---|---|
| Critical | 0 |
| High | 0 |
| Medium | 0 |
| Low | 1 |

---

## Identifizierte Sicherheitsrisiken

### SEC-01: Datenschutzerklärung nennt Referrer-Weitergabe an OpenStreetMap nicht

- **Kategorie:** Sensitive Data Exposure (Transparenz)
- **OWASP-Bezug:** A02:2025 – Cryptographic Failures / Sensitive Data Exposure (nur Randbezug)
- **Schweregrad:** Low
- **Exploit-Wahrscheinlichkeit:** Niedrig
- **Betroffene Stelle:** `web/src/app/pages/datenschutz/datenschutz.html:18-23`, `web/src/index.html` (keine Referrer-Policy)
- **Beschreibung des Risikos:** Die Seite benennt IP-Adresse als an OSM übermittelte Angabe. Der Browser sendet beim Kachelabruf standardmäßig zusätzlich den Referrer (Ursprung `https://…/`; Pfad `/map` wird bei `strict-origin-when-cross-origin` nicht übermittelt). Die Erklärung erwähnt das nicht, und es ist keine explizite Referrer-Policy gesetzt.
- **Angriffsszenario:** Kein Angriff; OSM erfährt mit der Kachelanfrage die Herkunftsdomain. Das ist für die Tile-Nutzungsbedingungen üblich und zugleich erforderlich.
- **Auswirkung:** Vertraulichkeit minimal (nur Domain, ohne Pfad/Query).
- **Begründung:** Browser-Standard, keine personenbezogenen Daten im Referrer. Annahme: Hosting (GitHub Pages) setzt keine abweichende Referrer-Policy; der Header ist nicht im Repo steuerbar.
- **Empfohlene Mitigation:** Optional `<meta name="referrer" content="strict-origin-when-cross-origin">` in `index.html` und Datenschutztext um „Browsertyp, Referrer“ bei der Kartennutzung ergänzen. Kein Task, da unter Medium.

---

## Regressionen und bekannte Risiken

Keine früheren Security-Analysen zu SERVICE-12 vorhanden. Q-SEC-2 (kein Fremdhost außer OSM-Kacheln) bleibt erfüllt: Die vier Seiten laden nichts nach; Portraits liegen lokal unter `web/public/portraits`. Externe Links werden nur durch Klick geladen.

---

## Beobachtungen ohne akutes Risiko

- **Externe Links:** `target="_blank"` mit `rel="noopener"` (impressum.html:12, 23; datenschutz.html:19; quellen.html:12, 17). `noreferrer` fehlt; moderne Browser sind bei `noopener` ausreichend abgesichert, Referrer an Impressum-Ziele sind unkritisch.
- **Öffentliche personenbezogene Daten:** Anschrift, Telefon und E-Mail (`impressum.html:4-12`) stehen im Klartext (Spam-/Scraping-Risiko). Das ist für die Anbieterkennzeichnung nach § 5 DDG verpflichtend und durch die bestätigte Annahme in `PIPELINE.md` gedeckt; die E-Mail ist nicht verschleiert. Keine Aktion.
- **Datenschutz-Inhalt (Compliance, kein Sicherheitsbefund):** Rechtsgrundlagen (Art. 6 DSGVO), Beschwerderecht bei der Aufsichtsbehörde (Art. 77) und Speicherdauer der Logs fehlen. Texte sind laut `PIPELINE.md` nicht juristisch geprüft; Klärung beim Betreiber.
- **Dynamische Routen:** `**`-Route/Prerender für `404`; neue Routen sind feste Pfade, keine Parameter, daher keine Open-Redirect- oder IDOR-Fläche.
- **`PageMeta.set`:** Feste Strings; keine Nutzereingabe in Titel oder Meta.
- **Prüfwerkzeug:** `browser-check.mjs` ergänzt nur Adressen; `ALLOWED_HOST` (nur `tile.openstreetmap.org`) bleibt unverändert und prüft damit weiter, dass auf den neuen Seiten kein Fremdhost geladen wird.

---

## Positive Sicherheitsmaßnahmen

- Reine Templates mit statischem Text; Angular-Escaping aktiv, `&#64;`/`&amp;` als Entities.
- Keine Cookies, kein Storage, keine Skripte Dritter, keine Webfonts oder CDN-Includes (`index.html` verlinkt nur lokale Dateien).
- Lazy Routen per `loadComponent`, vorab gerendert (ADR-002): Seiten sind ohne Skript lesbar.
- Fremdhost-Prüfung im Browser-Check erfasst jede Abweichung von der Datenschutzaussage.

---

## Abgeleitete Tasks

Keine (kein Befund ab Schweregrad Medium).

| Task | Titel | Priorität | Aufwand | Befunde |
|---|---|---|---|---|
| – | – | – | – | – |

---

## Nicht bewertbar

- HTTP-Security-Header von GitHub Pages (CSP, Referrer-Policy, HSTS) liegen nicht im Repo (ADR-003).
- `npm audit`: nicht ausgeführt (Auftrag ohne Build/Test/Netzwerk); keine neuen Abhängigkeiten in dieser Story.
- Rechtliche Richtigkeit der Texte (kein Sicherheitsthema).
