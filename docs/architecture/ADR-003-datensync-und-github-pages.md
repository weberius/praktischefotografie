# ADR-003: Datensync als Build-Artefakt und Hosting auf GitHub Pages

**Status:** Accepted (an H2 am 2026-10-27 bestätigt)  ·  **Datum:** 2026-10-27

## Kontext
Die Quelle der Wahrheit liegt in `data/` und `content/` im Repository (siehe ADR-001). Die Angular-App liefert nur Dateien unter `web/public/` aus. Die Daten sollen nicht doppelt gepflegt werden. Deep-Links wie `/photographers/martin-parr` müssen auf statischem Hosting funktionieren.

## Entscheidung
- Ein Node-Skript `web/tools/sync-data.mjs` kopiert vor `start` und `build` (`prestart`, `prebuild`) `data/` nach `web/public/data` und `content/` nach `web/public/content`. Die Kopien sind Build-Artefakte, stehen in `.gitignore` und werden nicht bearbeitet.
- Vor dem Kopieren läuft die Datenvalidierung aus ADR-001; bei Fehlern bricht der Build ab.
- Der Build erzeugt je Route eine vorab gerenderte `index.html` (ADR-002). Für unbekannte Adressen wird die Hinweisseite als `404.html` ausgeliefert.
- Deployment auf **GitHub Pages** per GitHub Actions bei Push auf `main`, Build mit `--base-href` des Repositorys. Netlify oder Vercel bleiben mögliche Alternativen.
- Kein Backend, keine Datenbank, keine serverseitige Konfiguration.

## Alternativen
- **Daten direkt in `web/public/` pflegen:** Kein Sync nötig, aber die Pfade aus README und ADR-001 würden sich ändern.
- **Symlink statt Kopie:** Funktioniert unter Windows und in CI unzuverlässig.
- **Netlify/Vercel:** Bequemere Redirects, aber zusätzlicher Dienst ohne Bedarf.

## Konsequenzen
- Fehlerhafte Daten erreichen nie die veröffentlichte Seite.
- Ein Basis-Pfad auf GitHub Pages erfordert relative bzw. `base-href`-bewusste Datenpfade.
- Eine eigene Domain (`praktischefotografie.de`) lässt sich später ohne Codeänderung ergänzen.

## Auswirkungen
- Betrifft Build, CI und Datenladen der gesamten App.
- Ergänzt ADR-001 um den Ort, an dem die Validierung im Build läuft.
