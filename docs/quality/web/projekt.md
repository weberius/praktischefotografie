# Qualität: Projektseite (web)

**Stand:** 2026-11-10. Fortlaufend zu Q-USE-4, Q-USE-12, Q-SEC-2, Q-SEO-2 und Q-SEO-3.

| ID | Szenario | Maß | Prüfverfahren | EARS |
| --- | --- | --- | --- | --- |
| Q-USE-20 | Besucher:in liest die Projektseite mit Screenreader und Tastatur, in Fensterbreiten von 320 bis 1280 Pixeln. | Genau eine `h1`, Abschnitte als `h2` in lückenloser Reihenfolge; Portrait und QR-Code tragen einen nicht leeren Alternativtext; beide Bilder haben `width`/`height` und laufen in 320 Pixeln Breite nicht über den Inhaltsbereich hinaus (kein horizontales Scrollen); externe Links tragen `rel="noopener"` und sind per Tab erreichbar mit sichtbarem Fokus; der Menüeintrag „Projekt“ ist per Tab erreichbar; 0 axe-Verstöße (WCAG 2.1 A/AA); 0 Vorkommen von „Klangland“ im Text. | Komponententests (Chrome Headless) mit axe wie in Q-USE-4; Playwright-Prüfung der Breiten 320 und 1280 | PRJ-UB-1 bis PRJ-UB-8, PRJ-UB-10 |

**Ergänzung zu Q-SEC-2:** Portrait und QR-Code werden von der Webanwendung selbst ausgeliefert (0 Requests an fremde Hosts beim Aufruf von `/projekt`). Der Link zu PayPal und der Link zum OK Lab Köln werden nur durch Klick geöffnet, nicht beim Seitenaufruf; die Ausnahmeliste des Maßes (`*.tile.openstreetmap.org` auf `/map`) bleibt unverändert.

**Ergänzung zu Q-SEO-2 und Q-SEO-3:** Beide gelten auch für `/projekt` (PRJ-UB-9).
