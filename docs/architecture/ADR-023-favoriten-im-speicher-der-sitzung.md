# ADR-023: Favoriten im Speicher der Sitzung halten

**Status:** Accepted  ·  **Datum:** 2026-11-02

## Kontext
Besucher:innen sollen Events favorisieren können; die Markierung soll über die Seiten hinweg gelten und beim Neuladen verschwinden. Die Webanwendung ist eine statische Angular-SPA ohne Backend (ADR-002); die Datenschutzerklärung sagt, dass keine Cookies und kein Tracking verwendet werden (RCH-UB-3). Der Seitenwechsel ist clientseitig; Seiten werden vorgerendert und hydriert.

## Entscheidung
- **Ein Dienst im Speicher.** Ein Dienst der Wurzel hält die Menge der favorisierten Event-IDs als Signal. Alle Seiten lesen und ändern sie über denselben Dienst; er überlebt den Seitenwechsel, aber nicht das Neuladen.
- **Keine Persistenz der Favoriten.** Weder `localStorage`, `sessionStorage`, IndexedDB, Cookies noch URL-Parameter; keine Netzanfrage. (Die Filteroption „Nur Favoriten“ steht gemäß ADR-024 in der Adresse, nie die Favoriten selbst.) Die Datenschutzerklärung bleibt wahr.
- **Ein gemeinsamer Umschalter** (Komponente) für Liste, Detail und Agenda mit `aria-pressed`, zugänglichem Namen mit Event und Zustand in Text und Symbol.
- **Nur Events**, identifiziert über die Event-`id`.
- **Filter in der Eventliste** über dieselbe Menge; kein eigener Bereich.

## Alternativen
- **`sessionStorage`:** übersteht das Neuladen, widerspricht dem Wunsch und berührt den Datenschutztext.
- **`localStorage`:** dauerhaft, widerspricht dem Wunsch und ist ein Speicherzugriff, den die Datenschutzerklärung nennen müsste.
- **URL-Parameter:** teilbar und verlinkbar, aber über Seiten hinweg aufwendig und nicht gewünscht.
- **Eigene Favoritenseite:** über den Wunsch hinaus; der Filter reicht für den Zweck.

## Konsequenzen
- Neuladen, neuer Tab und Aufruf per Adresse starten ohne Favoriten.
- Der Zustand ist beim Vorrendern leer; die Umschalter passen zum vorgerenderten HTML.
- Keine neue Abhängigkeit, keine Änderung der Datenschutzerklärung.
- Ein späteres Folgevorhaben mit Persistenz würde FAV-UB-3 und diese Entscheidung ersetzen und RCH-UB-3 berühren.

## Auswirkungen
- EARS: FAV-UB-1, FAV-EV-1, FAV-UB-2, FAV-UB-3, FAV-UB-4, FAV-ST-1
- Features: `web/favoriten.feature`
- Quality: Q-USE-17, Q-SEC-10
- Leitplanken: ADR-002 (statische SPA)
