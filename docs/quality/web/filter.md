# Qualität: Globaler Filter (web)

**Stand:** 2026-11-02. Ergänzt `barrierefreiheit.md` (Q-USE-2 bis Q-USE-4) und `datenschutz.md`.

| ID | Szenario | Maß | Prüfverfahren | EARS |
| --- | --- | --- | --- | --- |
| Q-USE-18 | Besucher:in wählt Orte und Typen mit Tastatur oder Screenreader und sieht auf jeder filterbaren Seite, dass gefiltert wird. | Alle Auswahlelemente sind echte Formularelemente (Checkbox-Gruppen in `fieldset`/`legend` oder gleichwertig) mit zugänglichem Namen; per Tab erreichbar, Fokus sichtbar, Zielgröße ≥ 2 × 2 rem, Kontrast ≥ 4,5:1; aktive Auswahl steht als Text (nicht nur Farbe); die Trefferzahl bzw. der Hinweis wird per `aria-live="polite"` angesagt; 0 axe-Verstöße (WCAG 2.1 A/AA) auf `/map`, `/venues`, `/calendar`, `/exhibitions`, `/events` mit gesetztem Filter; Anzeige der gefilterten Liste höchstens 100 ms nach der Auswahl bei 500 Einträgen; Filterzustand auf allen fünf Seiten identisch (0 Abweichungen). | Komponententests (Attribute, Namen, Tastatur, Zustand über Seiten), axe-Lauf (`tools/quality`), Playwright-Tastaturtest | FLT-UB-1, FLT-UB-2, FLT-UB-3, FLT-UB-4, FLT-UB-5, FLT-ST-1 |
| Q-SEC-11 | Besucher:in setzt Filter; es soll nichts das Gerät verlassen oder darauf zurückbleiben. | 0 Cookies, 0 Einträge in `localStorage`/`sessionStorage`/IndexedDB, 0 Netzanfragen beim Filtern; nach dem Neuladen 0 gesetzte Filter; 0 neue Abhängigkeiten. | Komponententest mit überwachtem `fetch`/XHR und Web-Speicher; Test des Neustarts (neue Anwendungsinstanz); Durchsicht der Abhängigkeiten | FLT-UB-6 |
