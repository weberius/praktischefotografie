# Qualität: Rechtliche Seiten (web)

**Stand:** 2026-10-29. Fortlaufend zu Q-USE-2, Q-SEC-2 und Q-SEO-2.

| ID | Szenario | Maß | Prüfverfahren | EARS |
| --- | --- | --- | --- | --- |
| Q-USE-14 | Besucher:in liest die rechtlichen Seiten (Impressum, Haftungsausschluss, Datenschutz, Quellen & Lizenzen) mit Screenreader und Tastatur. | Jede Seite hat genau eine `h1`, Abschnitte als `h2` in lückenloser Reihenfolge; externe Links tragen `rel="noopener"`; 0 axe-Verstöße (WCAG 2.1 A/AA); 0 Vorkommen von `[`…`]`-Platzhaltern, „Klangland“, „Open Opus“, „Komponist“ im Text; jede Seite hat eigenen nicht leeren Titel und Meta-Beschreibung (Q-SEO-2), steht in der Sitemap (Q-SEO-3). | Komponententest auf Überschriften und Textinhalt; axe-Lauf (`tools/quality`); Build-Test über die erzeugten HTML-Dateien | RCH-UB-1 bis RCH-UB-5 |

**Ergänzung 2026-10-29 zu Q-SEC-2:** Die Datenschutzerklärung (RCH-UB-3) nennt als Fremdhost nur OpenStreetMap-Kacheln auf `/map`; die Aussage entspricht dem Netzwerkprotokoll des Maßes (kein weiterer Fremdhost). Externe Links auf den rechtlichen Seiten (z. B. zu OpenStreetMap) werden nur durch Klick geladen, nicht beim Seitenaufruf.

**Ergänzung 2026-10-29 zu Q-SEO-2 und Q-SEO-3:** Q-SEO-2 und Q-SEO-3 gelten auch für `/haftungsausschluss` und `/quellen` (NAV-UB-7).
