# Security-Analyse: SERVICE-11-STORY-01 – Icon als Anwendungs-Icon

**Ticket:** SERVICE-11 (Story SERVICE-11-STORY-01)  
**Analysiert:** 2026-10-29  
**Scope:** `web/tools/make-icons.mjs`, `test/make-icons.test.mjs`, `test/png-helpers.mjs`, `test/marken-icon.test.mjs` (ohne Postkarten-Tests), `web/src/index.html`, `web/public/site.webmanifest`, `web/public/favicon.ico`, `favicon-96x96.png`, `apple-touch-icon.png`, `web-app-manifest-192x192.png`, `web-app-manifest-512x512.png`, `docs/resources/icon.png`, `package.json` (Skript `icons:build`), `README.md` (Abschnitt Icon und Postkartenmotiv)  
**Methode:** Statische Code-Analyse (SAST) + Konfigurations-Review + `npm audit --omit=dev` (in `web/`) + PNG-Chunk-Prüfung der ausgelieferten Dateien  
**Status:** Entwurf – wartet auf Abnahme  
**Berücksichtigte ADRs / Gherkin:** ADR-003, ADR-017 / `web/markenicon.feature`, `setup/bildmaterial.feature`; Annahmen aus `PIPELINE.md`

---

## Executive Summary

**Gesamtrisiko:** Low (keine Befunde)

Die Story liefert statische Bilddateien, ein Web-App-Manifest, Verweise in `index.html` und ein Entwicklungsskript, das lokal ein Chromium startet. Es gibt keine Benutzereingaben, keine Netzwerkzugriffe, keine Tokens und keinen Angular-Code, der HTML ausgibt. Das Skript läuft nicht im Build und nicht in der CI, es liest nur eingecheckte Dateien. Die ausgelieferten PNG-Dateien enthalten keine Metadaten-Chunks. `npm audit --omit=dev` meldet 0 Schwachstellen. Es wurden keine Risiken gefunden, die einen Task rechtfertigen.

| Schweregrad | Anzahl |
|---|---|
| Critical | 0 |
| High | 0 |
| Medium | 0 |
| Low | 0 |

---

## Identifizierte Sicherheitsrisiken

Keine Befunde.

---

## Regressionen und bekannte Risiken

Keine früheren Security-Analysen zu diesem Scope. Nicht zu SERVICE-11 gehörend und deshalb hier nicht bewertet: `[innerHTML]` mit festen Symbolen in `web/src/app/shared/venue-legend/venue-legend.html:3` (SERVICE-10).

---

## Beobachtungen ohne akutes Risiko

- **Chromium mit `--no-sandbox`** (`web/tools/make-icons.mjs:19`). Das Skript dekodiert ein Bild per `Image.decode()` in einem Chromium ohne Sandbox. Die einzige Eingabe ist die eingecheckte Datei `docs/resources/zfpf.png` (oder ein per `--source` übergebener Pfad, den die ausführende Person selbst wählt). Das Skript ist ein manueller Entwicklungsbefehl (ADR-017, README), die Seite lädt keine Fremdinhalte (Daten-URL). Ein realistisches Angriffsszenario setzt voraus, dass jemand dem Skript ein manipuliertes Bild unterschiebt; dann wäre ein Browser-Exploit ohne Sandbox gefährlicher. Defense-in-Depth: `--no-sandbox` nur setzen, wenn es nötig ist (Container als root), etwa über eine Umgebungsvariable. Kein Task, weil das Quality-Werkzeug im Repo dasselbe Muster nutzt (Annahme, nicht geprüft) und die Eingabe vertrauenswürdig ist.
- **C2PA-Chunk im Quellbild.** `docs/resources/zfpf.png` enthält einen `caBX`-Chunk (Content Credentials, Herkunftsnachweis des Bilderzeugers). Die Datei ist unverändert aus `main` und außerhalb des Scopes. Die abgeleiteten Dateien (`icon.png`, die vier PNG-Icons, die PNG-Daten in `favicon.ico`) enthalten nur `IHDR`, `sRGB`, `IDAT`, `IEND`; es gelangen also keine Metadaten in die Auslieferung. Hinweis für H2: Die Frage der Nutzungsrechte ist bereits als Annahme in `PIPELINE.md` dokumentiert.
- **Manifest** (`web/public/site.webmanifest`). Alle Pfade sind relativ (`start_url: "."`, `scope: "."`, Icons ohne führenden Schrägstrich), passend zu ADR-003. Es gibt keine absoluten oder fremden URLs, keine `related_applications`, keine Shortcuts. Kein Risiko.
- **`index.html:9-13`.** Alle Verweise sind relativ und zeigen auf eigene Dateien; kein Fremd-Host, keine Inline-Skripte, kein `integrity`-Bedarf. Es gibt in diesem Repo keine nginx- oder CSP-Konfiguration (GitHub Pages), daher keine Header zu bewerten.
- **Skript-Parameter** (`web/tools/make-icons.mjs:236-238`). `--source`, `--docs`, `--public` werden per `resolve` zu Pfaden; das Skript schreibt feste Dateinamen (`icon.png`, `postkarte.png`, Icon-Dateien) in diese Ordner. Es gibt keine Pfadzusammensetzung aus Dateiinhalt, keine Shell-Aufrufe (`exec`/`spawn`), kein `eval`. Das Überschreiben vorhandener Dateien im Zielordner ist beabsichtigt und eine Entscheidung der aufrufenden Person.
- **Tests** (`test/make-icons.test.mjs`, `test/png-helpers.mjs`, `test/marken-icon.test.mjs`). Temporäre Ordner kommen von `mkdtempSync(tmpdir())`; die Tests lesen und dekodieren nur eigene Fixtures und die eingecheckten Icons. Der PNG-Dekodierer in `test/png-helpers.mjs:45-80` prüft Längen nicht gegen die Dateigröße. Er läuft nur mit eingecheckten oder selbst erzeugten Dateien, daher kein Risiko.

---

## Positive Sicherheitsmaßnahmen

- Keine neue Abhängigkeit; das Skript nutzt das vorhandene `playwright-core` (`web/package.json:66`). `npm audit --omit=dev` in `web/`: 0 Schwachstellen.
- `playwright-core` wird erst beim Start geladen (`web/tools/make-icons.mjs:18`); die Tests und die CI brauchen es nicht.
- Das Skript läuft weder im Build noch in der CI; die Ergebnisse sind eingecheckt und damit im Review sichtbar (ADR-017).
- Das Skript nutzt keinen Netzwerkzugriff (Daten-URL statt `file://` oder HTTP), keine Shell und keine dynamische Codeauswertung.
- Ausgelieferte PNG-Dateien ohne Metadaten-Chunks (kein EXIF, kein `tEXt`, kein C2PA, keine lokalen Pfade).
- Manifest und `index.html` verwenden nur eigene, relative Ressourcen.

---

## Abgeleitete Tasks

Keine. Es gibt keinen Befund ab Schweregrad Medium.

| Task | Titel | Priorität | Aufwand | Befunde |
|---|---|---|---|---|
| – | – | – | – | – |

---

## Nicht bewertbar

- Auslieferungs-Header (CSP, `X-Content-Type-Options`, Cache-Control für Icons) liegen bei GitHub Pages und nicht im Repo.
- Rechte an den Bildern (Urheberrecht, Lizenz) sind kein Sicherheitsthema und als Annahme in `PIPELINE.md` dem Menschen überlassen.
- Ob das Quality-Werkzeug ebenfalls `--no-sandbox` nutzt, wurde nicht geprüft (nicht im Scope).
