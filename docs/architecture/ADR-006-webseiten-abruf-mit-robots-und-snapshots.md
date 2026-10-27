# ADR-006: Webseiten der Orte rücksichtsvoll abrufen und als Snapshot speichern

**Status:** Accepted (an H2 am 2026-10-27 bestätigt)  ·  **Datum:** 2026-10-27

## Kontext
Die Daten der Orte sollen aus deren eigenen Webseiten vervollständigt werden. Die Betreiber sind Dritte; Abrufe müssen zurückhaltend sein. Seiteninhalte sind urheberrechtlich geschützt und dürfen nicht veröffentlicht werden. Tests müssen ohne Netz laufen.

## Entscheidung
- Ein Node-Skript `scripts/scrape/fetch-venues.mjs` mit dem eingebauten `fetch`; `cheerio` für Links und Text, `robots-parser` für `robots.txt`. Kein Headless-Browser: Nur statisch ausgelieferte Seiten werden ausgewertet; Seiten, die ohne Skript keinen Inhalt liefern, werden im Bericht genannt.
- Regeln: `robots.txt` beachten, ≥ 2 s Abstand je Host, Zeitüberschreitung 15 s, Antworten ≤ 2 MB, ≤ 6 Seiten je Ort (Startseite + ≤ 5 Unterseiten derselben Website), keine Weiterleitung auf andere Websites, keine Formulare, keine Anmeldung, nur http/https.
- `User-Agent` mit Projektname und Kontaktadresse aus `SCRAPE_CONTACT`; ohne Adresse startet der Abruf nicht.
- Snapshots (URL, Abrufzeit, Status, Hash, bereinigter Text) unter `.cache/snapshots/<venue-id>/`, nicht versioniert, nicht im Build. Cache-Alter `--max-age` (7 Tage), `--offline` für Läufe ohne Netz.
- Abruffehler brechen den Lauf nicht ab; sie stehen im Bericht.

**Dieselbe Website:** Gleicher Host, ein führendes `www.` zählt nicht als Unterschied (Befund im ersten Live-Lauf: `www.makk.de` verlinkt auf `makk.de`). Der Abstand von 2 s gilt je Website; `robots.txt` wird je Ursprung (Schema, Host, Port) gelesen.

## Alternativen
- **Headless-Browser (Playwright):** Erfasst JavaScript-Seiten, ist aber schwerer, langsamer und erhöht die Last bei den Betreibern.
- **Snapshots im Repository:** Nachvollziehbar, aber Urheberrecht und Repository-Größe sprechen dagegen.
- **Ohne `robots.txt`-Prüfung:** Einfacher, verletzt aber die Regeln der Betreiber.

## Konsequenzen
- JavaScript-lastige Seiten liefern ggf. wenig Text; sie erscheinen als „leer“ im Bericht und brauchen eine manuelle Quelle.
- Zwei neue Abhängigkeiten (`cheerio`, `robots-parser`).
- Rechtliche Bewertung (AGB der Betreiber) bleibt Aufgabe der Redaktion.

## Auswirkungen
- EARS: FET-EV-1, FET-UB-1 bis FET-UB-5, FET-UN-1, FET-UN-2, FET-OP-1
- Features: `setup/webseiten-abruf.feature`
- Quality: Q-SEC-4, Q-REL-1, Q-MAIN-2, Q-PERF-5, Q-DATA-3
