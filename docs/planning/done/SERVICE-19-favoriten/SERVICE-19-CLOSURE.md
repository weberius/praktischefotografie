# Closure: SERVICE-19 – Events favorisieren

**Datum:** 2026-11-02  ·  **Quelle:** Idee `docs/product/ideen/idee-010-favoriten.md`

## Erreichtes
Besucher:innen können Events mit dem Umschalter „Favorit“ markieren – auf Eventliste, Eventdetail, Ortsdetailseite und in der Agenda. Die Eventliste lässt sich mit „Nur Favoriten“ einschränken (in der Adresse als `favorites=1`). Favoriten liegen nur im Speicher der Sitzung. Spezifikation: FAV-UB-2 bis FAV-UB-6, FAV-EV-1, FAV-ST-1 (FAV-UB-1 Deprecated), `web/favoriten.feature` (8 Szenarien), Q-USE-17, Q-SEC-10, ADR-023 (Accepted), ADR-024 (Proposed).

## Abweichungen
Keine am H2 (akzeptiert). Der Filter „Nur Favoriten“ und die Ortsdetailseite gehen über den Wortlaut der Idee hinaus.

## Rückläufe und korrigierte Quellen
Ein Review-Rücklauf: Die Ortsdetailseite fehlte (Widerspruch FAV-UB-1/FAV-UB-2) → EARS FAV-UB-5 ersetzt FAV-UB-1. Die Filteroption ging beim Zurückkehren verloren → FAV-UB-6 und ADR-024. Sonst Umsetzungsfehler an Tests und Aufbau.

## Erkenntnisse
- Eine Anforderung mit Seitenliste (FAV-UB-1) und eine mit „allen Seiten“ (FAV-UB-2) widersprachen sich; Seiten, die ein Objekt zeigen, beim Spezifizieren suchen.
- Ein Test mit `window.fetch`-Spion belegt bei `HttpClient` nichts; die Anfragen am Interceptor zu zählen ist wirksam.

## Nicht geprüft
axe-Lauf, Playwright-Tastaturtest, Kontrast, Antwortzeit ≤ 100 ms und Echtbrowser/Vorrendern zu Q-USE-17; Compliance-Review (GBOS-MCP nicht verfügbar). Root-`npm test` hat 1 bereits vorher roten Test (FET-OP-3).

## Follow-ups
- ADR-024 bestätigen (`Accepted`).
- Idee 011 „Filter“ ist die nächste offene Idee und berührt die Filteroption der Eventliste.
- Persistenz der Favoriten oder Favoritenseite wären eigene Vorhaben (würden FAV-UB-3 und ADR-023 ersetzen).
