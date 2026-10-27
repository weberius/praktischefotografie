# Qualität: Datenschutz und Sicherheit (web)

**Stand:** 2026-10-27. Ergänzt `content/datenschutz.md`.

| ID | Szenario | Maß | Prüfverfahren | EARS |
| --- | --- | --- | --- | --- |
| Q-SEC-2 | Besucher:in ruft eine beliebige Seite im Browser auf. | 0 Requests an fremde Hosts außer `*.tile.openstreetmap.org` und nur auf `/map`; keine Tracking- oder Analytics-Abhängigkeit in `web/package.json`; kein Demo-Datensatz im Produktionsbuild. | Playwright-Netzwerkprotokoll; Prüfung von `package.json` und Build-Ausgabe | NAV-UB-4, BLD-UB-3 |
| Q-SEC-3 | Redaktion veröffentlicht einen Beitrag mit schädlichem Markdown oder HTML. | Von ≥ 5 Angriffsmustern (script, onerror, javascript:-Link, iframe, svg onload) wird 0 ausgeführt und 0 verbleibt im DOM. | Komponententest mit Fixtures | BLG-UB-5 |
