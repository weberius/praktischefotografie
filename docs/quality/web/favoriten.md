# Qualität: Favoriten (web)

**Stand:** 2026-11-02. Ergänzt `barrierefreiheit.md` (Q-USE-2 bis Q-USE-4) und `datenschutz.md`.

| ID | Szenario | Maß | Prüfverfahren | EARS |
| --- | --- | --- | --- | --- |
| Q-USE-17 | Besucher:in markiert Events mit Tastatur, Screenreader oder ohne Farbwahrnehmung auf Liste, Detail und Agenda. | 100 % der Umschalter sind echte `<button>` mit `aria-pressed` passend zum Zustand und einem zugänglichen Namen, der das Event nennt; der Zustand steht zusätzlich als Text und Symbol (nicht nur Farbe); per Tab erreichbar, mit Enter und Leertaste bedienbar, Fokus sichtbar, Zielgröße ≥ 2 × 2 rem; Kontrast ≥ 4,5:1; 0 axe-Verstöße (WCAG 2.1 A/AA) auf `/events`, `/events/:id`, `/venues/:id` und `/calendar` (Seite Ort ergänzt, siehe FAV-UB-5); der Zustand eines Events ist auf allen vier Seiten identisch (0 Abweichungen); ein Wechsel dauert höchstens 100 ms bis zur Anzeige. | Komponententests (Attribute, Namen, Tastatur, Zustand über Seiten), axe-Lauf (`tools/quality`), Playwright-Tastaturtest | FAV-UB-5, FAV-EV-1, FAV-UB-2, FAV-UB-4, FAV-ST-1, FAV-UB-6 |
| Q-SEC-10 | Besucher:in markiert Favoriten; es soll nichts das Gerät verlassen oder darauf zurückbleiben. | 0 Cookies, 0 Einträge in `localStorage`/`sessionStorage`/IndexedDB, 0 Netzanfragen beim Markieren; nach dem Neuladen 0 Favoriten; 0 neue Abhängigkeiten. | Komponententest mit überwachtem `fetch`/XHR und Web-Speicher; Test des Neustarts (neue Anwendungsinstanz); Durchsicht der Abhängigkeiten | FAV-UB-3 |
