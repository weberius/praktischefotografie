# Security-Analyse: Projektseite mit Menüeintrag (SERVICE-25-STORY-01)

**Ticket:** SERVICE-25  
**Analysiert:** 2026-11-10  
**Scope:** Branch `feature/SERVICE-25-projekt-seite` (geänderte und neue Dateien ohne `docs/product/ideen/`): `web/src/app/pages/projekt/*`, `web/src/app/app.{ts,html,routes.ts}`, `web/src/styles.css`, `web/src/app/pages/datenschutz/datenschutz.html`, `web/public/assets/*` (sowie Kontext `back-link.ts`)  
**Methode:** Statische Code-Analyse (SAST) + Prüfung der Bild-Metadaten; kein `npm audit` (keine Abhängigkeitsänderung im Scope)  
**Status:** Entwurf – wartet auf Abnahme  
**Berücksichtigte ADRs / Gherkin:** ADR-002 (Angular-SPA), ADR-003 (GitHub Pages) / `web/projekt.feature`

---

## Executive Summary

**Gesamtrisiko:** Low

Die Änderung fügt eine statische Seite ohne Eingaben, Authentifizierung, Backend-Aufrufe oder dynamische Ausgabe hinzu. Alle Inhalte sind feste Templatetexte; es gibt weder `innerHTML` noch DOM-Zugriff oder Netzwerkaufrufe. Externe Links (OK Lab Köln, PayPal) tragen `rel="noopener"` und werden erst per Klick geöffnet. Ein Low-Befund: Das Portraitfoto enthält noch eingebettete XMP-/EXIF-Metadaten (Schlagwörter, Fotostudio-Adresse, Bearbeitungsdatum). Befunde ab Medium gibt es nicht, daher keine Tasks.

| Schweregrad | Anzahl |
|---|---|
| Critical | 0 |
| High | 0 |
| Medium | 0 |
| Low | 1 |

---

## Identifizierte Sicherheitsrisiken

### SEC-01: Eingebettete Metadaten im Portraitfoto

- **Kategorie:** Sensitive Data Exposure (Metadaten in ausgeliefertem Asset)
- **OWASP-Bezug:** A02:2025 – Cryptographic Failures / Sensitive Data Exposure (Datensparsamkeit)
- **Schweregrad:** Low
- **Exploit-Wahrscheinlichkeit:** Hoch (öffentlich abrufbar), Auswirkung gering
- **Betroffene Stelle:** `web/public/assets/wolfram.jpg` (eingebunden in `web/src/app/pages/projekt/projekt.html:3`)
- **Beschreibung des Risikos:** Die Datei enthält EXIF- und XMP-Blöcke. Gelesen wurden u. a. Urheber-/Erstellerangabe mit Name und Geschäftsadresse eines Fotostudios, Bildbeschreibung `DE_JOBAPP_40x60`, automatisch erzeugte Schlagwörter zur Person (u. a. „Brille“, „Männlich“) und die Bearbeitungssoftware samt Zeitstempel. GPS-Daten sind nicht enthalten.
- **Angriffsszenario:** Jede Person lädt `assets/wolfram.jpg` herunter und liest die Metadaten mit einem EXIF-Werkzeug aus. Es entstehen keine Zugriffsmöglichkeiten, nur zusätzliche Informationen über Bildherkunft und Bearbeitungsablauf.
- **Auswirkung:** Vertraulichkeit (gering): Preisgabe nicht benötigter Metadaten. Die Ersteller-Angabe kann zudem auf Bildrechte hinweisen (rechtlich, nicht Teil dieses Reviews).
- **Begründung:** Keine Zugangsdaten oder Standortdaten, die Angaben sind überwiegend unkritisch; Datensparsamkeit spricht dennoch für das Entfernen. Annahme: Das Foto wird mit Einwilligung der abgebildeten Person veröffentlicht.
- **Empfohlene Mitigation:** Beim Einbinden von Bildern Metadaten entfernen (z. B. `exiftool -all= wolfram.jpg`); dies als Schritt für künftige Assets festhalten. Kein Task, da unter Schweregrad Medium (Entscheidung beim Menschen).

---

## Regressionen und bekannte Risiken

Keine früheren Security-Analysen mit offenen Risiken zum Scope (SERVICE-24 hat keinen Befund ab Medium). Die dort erwähnten `[innerHTML]`-Stellen (`post-detail.html:10`, `venue-legend.html:3`) liegen außerhalb dieses Scopes und werden nicht berührt.

---

## Beobachtungen ohne akutes Risiko

- **OBS-01 – Externe Links (A01/A05, ohne Befund).** Beide `target="_blank"`-Links (`projekt.html:8,32`; `datenschutz.html:26`) haben `rel="noopener"`. Der Referrer wird nicht unterdrückt; PayPal und codefor.de erfahren so den Ursprung (Standardverhalten der Browser: nur die Domain bei Seitenwechsel auf fremde Hosts). Unkritisch, da die Seite öffentlich ist; optional `noreferrer` ergänzen.
- **OBS-02 – PayPal-Button-ID im Quelltext.** `hosted_button_id=798…FE` (`projekt.html:32`) ist ein öffentlicher Spendenlink-Bezeichner, kein Geheimnis. Er lässt sich nicht für Zahlungsabbuchungen missbrauchen; Zahlungsempfänger-Änderung ist nur über das PayPal-Konto möglich.
- **OBS-03 – Phishing-Risiko bei Manipulation des Spendenlinks.** Die Seite wird aus dem Repository per GitHub Pages ausgeliefert; ein kompromittierter Commit könnte den Link ändern. Schutz liegt in Branch-Schutz und Review des Repositories (Annahme, nicht im Scope prüfbar). Der Hinweistext „verlässt du die Webapp“ (`projekt.html:29`) hilft Nutzer:innen.
- **OBS-04 – QR-Code.** Das Bild `qr-praktische-fotografie.png` ist ein statisches Asset ohne Metadaten; die kodierte Zieladresse wurde nicht dekodiert (Annahme: Adresse der Webapp, Alternativtext `projekt.html:21`).
- **OBS-05 – Neue Route und Menü.** `app.routes.ts:89` lädt die Komponente per Lazy-Loading; keine Guards erforderlich (öffentliche Seite, keine Rollen). `app.ts:51` und `app.html:18` verwenden feste Pfade und Beschriftungen, keine nutzergesteuerten Werte; `[class.separated]` ist ein boolesches Binding. `styles.css` enthält keine `url()`-Verweise auf fremde Hosts.

---

## Positive Sicherheitsmaßnahmen

- Alle Bilder werden selbst ausgeliefert (relative Pfade `assets/…`); keine Drittanfragen beim Seitenaufruf (Q-SEC-2, per Test abgedeckt in `app.spec.ts`).
- Keine Eingabeparameter, kein `innerHTML`, `bypassSecurityTrust*`, `eval`, direkter DOM-Zugriff oder neue HTTP-Aufrufe; Ausgabe nur über statische Templates.
- `rel="noopener"` an allen neuen externen Links (per Test abgedeckt).
- Datenschutzerklärung nennt den PayPal-Link und stellt klar, dass erst mit dem Klick Daten übertragen werden (`datenschutz.html:24-29`, RCH-UB-6).
- Seitentitel und Beschreibung stammen aus Konstanten (`projekt.ts:12`).

---

## Abgeleitete Tasks

Keine (kein Risiko ab Schweregrad Medium).

---

## Nicht bewertbar

- `npm audit`/Lockfile: nicht Teil des Scopes (keine Abhängigkeitsänderung).
- Security-Header, CSP und Hosting (GitHub Pages, ADR-003): nicht Teil des Diffs und vom Repository nicht steuerbar.
- Dekodierte Zieladresse des QR-Codes und Rechtslage zu Bildrechten/Einwilligung beim Portrait.
- Abnahme per Human-in-the-Loop: im nicht interaktiven Lauf nicht abgefragt, Status bleibt „Entwurf“.
