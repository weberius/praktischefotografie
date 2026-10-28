# Qualität: Darstellung der Fotograf:innen (web)

**Stand:** 2026-10-28. Fortlaufend zu Q-PERF-5 und Q-USE-4.

| ID | Szenario | Maß | Prüfverfahren | EARS |
| --- | --- | --- | --- | --- |
| Q-PERF-6 | Besucher:in öffnet `/photographers` mit allen Portraits auf einem Mobilgerät mit gedrosselter Verbindung. | Portraits werden verzögert geladen (`loading="lazy"`), tragen Breite und Höhe (kein Layoutsprung, CLS ≤ 0,1); jedes Portrait ≤ 200 kB; Lighthouse-Performance ≥ 90 wie Q-PERF-3. | Komponententest auf Attribute, Dateigrößenprüfung im Validator, Lighthouse-Lauf | PHO-UB-5, PRF-UN-1 |
| Q-USE-5 | Besucher:in liest Portrait und Wikipedia-Zusammenfassung mit Screenreader und Tastatur. | 100 % der Portraits haben Alternativtext (Name plus „Portrait“) und einen sichtbaren Bildnachweis als Text (`figcaption`); 0 axe-Verstöße auf Listen- und Personenseite; Links zu Commons und Wikipedia haben einen erkennbaren Zweck und öffnen im neuen Tab mit Hinweis. | Komponententests, axe-Lauf (`tools/quality`) | PHO-UB-7, PHO-UB-8, PHO-UN-1 |
