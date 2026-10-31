# Closure: SERVICE-16 – Recherche in allen Sprachen

**Datum:** 2026-10-31

## Erreichtes
- Wikipedia in allen Sprachen (alle Sprachversionen als Links, Anfangstexte bis 10 Sprachen), Web in 6 Sprachen, Links in `updates/photographers-links.json`, Seiten vor dem Text; `--no-web`.
- ADR-020 accepted; 239 Tests, Lint, Validierung, Build grün; Code-Review ohne Befunde.

## Abweichungen
- Web-Tests (Chrome) nicht gelaufen; kein Webcode geändert.
- Nicht geprüft: echte Suchmaschine, Sachrichtigkeit der Texte.
- Teils Python-Skripte zum Schreiben von Dateien genutzt (Regelverstoß gegen die Werkzeugvorgabe).
- Sutkus-Daten liegen uncommittet auf dem Branch, nicht Teil des Tickets.
