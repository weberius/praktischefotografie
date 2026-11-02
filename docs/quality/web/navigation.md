# Qualität: Zurücknavigation (web)

**Stand:** 2026-11-02. Ergänzt `barrierefreiheit.md` (Q-USE-2, Q-USE-3).

| ID | Szenario | Maß | Prüfverfahren | EARS |
| --- | --- | --- | --- | --- |
| Q-USE-16 | Besucher:in öffnet eine Detailseite aus der App oder direkt und will mit Tastatur oder Screenreader zurück. | 100 % der 7 Detailseitentypen haben genau einen Zurück-Link an gleicher Stelle (erstes Element im Inhalt, vor der `h1`) mit zugänglichem Namen „Zurück zu <Ziel>“ bzw. dem Ziel der Übersicht; Aktivierung führt in 100 % der Fälle zur vorherigen Seite der Anwendung in genau 1 Navigationsschritt (keine Vollneuladung); beim Direktaufruf in 100 % zur zugehörigen Übersicht; 0 Zurück-Links auf Übersichts-, Karten-, Kalender- und rechtlichen Seiten; 0 axe-Verstöße (WCAG 2.1 A/AA) auf je einer Detailseite jedes Typs; Kontrast ≥ 4,5:1. | Komponententests je Detailseite (Vorhandensein, Name, Ziel mit und ohne Verlauf), axe-Lauf (`tools/quality`), Playwright-Tastaturtest | NAV-UB-9, NAV-EV-2, NAV-ST-1 |
| Q-USE-3 (Ergänzung) | Besucher:in bedient den Zurück-Link nur mit der Tastatur. | Der Link ist ein echtes `<a>` mit Ziel, per Tab erreichbar und mit Enter auslösbar; Fokus sichtbar. | Komponententest, axe | NAV-UB-9 |
