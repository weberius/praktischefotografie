# Security-Analyse: SERVICE-10-STORY-02 – Ortstypen an Symbol und Farbe erkennen

**Ticket:** SERVICE-10 (Story SERVICE-10-STORY-02)  
**Analysiert:** 2026-10-29  
**Scope:** `web/src/app/core/models.ts` (VENUE_TYPE_INFO, VenueSymbolShape), `core/venue-symbol.ts` (+ spec), `shared/venue-map/venue-map.ts` (Marker, Symbole, Textalternative), `shared/venue-legend/`, `pages/map/map.html` (Legende)  
**Methode:** Statische Code-Analyse (SAST) und Konfigurations-Review; kein `npm audit` (keine Abhängigkeitsänderung in der Story)  
**Status:** Entwurf – wartet auf Abnahme  
**Berücksichtigte ADRs / Gherkin:** ADR-002, ADR-004, ADR-016 / `docs/contracts/gherkin/web/karte.feature`; EARS `docs/ears/web/karte.md`; Quality `Q-SEC-2`, `Q-SEC-3`; PIPELINE.md (Annahmen)

---

## Executive Summary

**Gesamtrisiko:** Low (keine Befunde)

Die Story führt SVG-Symbole als HTML-Markup ein (Legende über `[innerHTML]` mit `bypassSecurityTrustHtml`, Marker über Leaflet-`divIcon`). Der Datenfluss wurde bis zu Quelle und Senke verfolgt: Das Markup entsteht ausschließlich aus Codekonstanten (`VENUE_TYPE_INFO`, `GLYPHS`). Kein Wert aus dem Datensatz (Name, Stadt, ID) fließt in HTML-Strings; die Texte (Marker-Titel, `aria-label`, Popup) werden über DOM-APIs (`setAttribute`, `textContent`, `href` mit `encodeURIComponent`) gesetzt. Die Verwendung von `bypassSecurityTrustHtml` ist als ANNAHME in PIPELINE.md dokumentiert und daher kein Befund. Es werden keine neuen Netzwerkziele, Abhängigkeiten oder Speicherungen eingeführt (Q-SEC-2 unberührt).

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

Keine früheren Security-Analysen zu diesem Scope vorhanden. Q-SEC-3 (schädliches Markdown/HTML im Beitrag) ist von der Story nicht betroffen; der einzige weitere `[innerHTML]`-Einsatz (`post-detail.html:9`) liegt außerhalb des Scopes.

---

## Beobachtungen ohne akutes Risiko

- **OBS-01 – `bypassSecurityTrustHtml` (Hinweis, dokumentierte Annahme):** `web/src/app/shared/venue-legend/venue-legend.ts:21` umgeht die Angular-Bereinigung für `venueSymbolMarkup(type)`. Verifiziert: `type` stammt aus `Object.keys(VENUE_TYPE_INFO)` (Zeile 18), `venueSymbolMarkup` (`core/venue-symbol.ts`, Funktion am Dateiende) setzt nur `shape`, `color` und feste Pfade ein. Die Werte sind typisiert (`VenueSymbolShape`, `color: string`) und stehen als Literale in `models.ts`. Heute nicht ausnutzbar. Defense-in-Depth: Die Sicherheit beruht allein auf der Konvention „nur Konstanten“. Würde `color` später aus Daten oder Konfiguration kommen, wäre es ein XSS-Pfad (Attribut-Ausbruch aus `fill="${color}"`). Ein Kommentar dazu steht schon an der Stelle (`venue-legend.ts:20`); optional könnte `venue-symbol.spec.ts` prüfen, dass Farben dem Muster `^#[0-9a-f]{6}$` entsprechen.
- **OBS-02 – Typ aus Daten als Schlüssel:** `venue-map.ts` (`showMarkers`, `VENUE_TYPE_INFO[venue.type]`) und `venueSymbolMarkup` setzen voraus, dass `venue.type` ein gültiger Typ ist. Ein unbekannter Wert aus dem Datensatz würde zu einem `TypeError` führen (Verfügbarkeit/Robustheit, kein Injection-Pfad, da kein Wert ins Markup gelangt). Die Typprüfung ist Sache der Datenvalidierung (`venue-filter.ts:12` kennt die Liste). Keine Security-Relevanz, nur als Hinweis.
- **OBS-03 – Kein CSP im Repo:** Im Repository ist keine Content-Security-Policy konfiguriert (Treffer nur im Skill selbst). Auslieferungskonfiguration liegt außerhalb der Story; das Inline-SVG benötigt keine Inline-Skripte, eine künftige strikte CSP wäre mit dem Markup verträglich (`style`-Attribute werden nicht erzeugt).

---

## Positive Sicherheitsmaßnahmen

- Markup ausschließlich aus Konstanten; Datenwerte nur über `textContent`, `setAttribute` bzw. Leaflet-`title`/`alt` (DOM-Attribute, kein HTML-Parsing).
- Popup aus DOM-Elementen statt HTML-String; Link mit `encodeURIComponent(venue.id)`; Navigation über den Router.
- SVG mit `aria-hidden`, `focusable="false"`, ohne Skripte, Event-Handler, externe Referenzen (`href`/`xlink`) oder `foreignObject`.
- Keine neuen Abhängigkeiten, Netzwerkaufrufe, Speicherung oder Tokens; Kachel-Host unverändert OpenStreetMap (Q-SEC-2).

---

## Abgeleitete Tasks

Keine (kein Risiko ab Schweregrad Medium; die Beobachtungen sind optional und ohne Task).

| Task | Titel | Priorität | Aufwand | Befunde |
|---|---|---|---|---|
| – | – | – | – | – |

---

## Nicht bewertbar

- Auslieferungs-Header (CSP, `X-Content-Type-Options` usw.) des Hostings: nicht im Repository.
- Datenvalidierung des Feldes `type` im Datensatz: außerhalb des Scopes, nicht geprüft.
