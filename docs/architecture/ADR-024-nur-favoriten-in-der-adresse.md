# ADR-024: Option „Nur Favoriten“ in der Adresse führen

**Status:** Proposed  ·  **Datum:** 2026-11-02

## Kontext
ADR-023 hält die Favoriten selbst im Speicher und schließt URL-Parameter als Speicherort für die Favoriten aus. Der Typfilter der Eventliste liegt als Query-Parameter in der Adresse; der Zurück-Link (ADR-022) stellt die vorherige Adresse inklusive Query wieder her. Die Option „Nur Favoriten“ ging als Seitenzustand beim Wechsel auf eine Detailseite und zurück verloren.

## Entscheidung
- Die Option „Nur Favoriten“ wird wie der Typfilter als Query-Parameter `favorites=1` geführt.
- In der Adresse steht ausschließlich die Option, nie Favoriten oder Event-IDs. ADR-023 gilt unverändert für die Favoriten selbst; der Abschnitt „keine URL-Parameter“ betrifft deren Speicherung.

## Alternativen
- **Signal im Wurzeldienst:** bleibt im Speicher, aber nicht teilbar und nicht mit dem Typfilter einheitlich.
- **Flüchtiger Seitenzustand (bisher):** Option geht beim Zurückkehren verloren.

## Konsequenzen
- Die Option überlebt Zurück-Link und Neuladen der Adresse; ohne Favoriten zeigt die Liste dann den Hinweis „Keine Favoriten“.
- Eine geteilte Adresse mit `favorites=1` zeigt bei Empfänger:innen die leere Auswahl samt Hinweis.
- Keine neue Abhängigkeit; Datenschutz unverändert (Q-SEC-10).

## Auswirkungen
- EARS: FAV-UB-6 (ergänzt FAV-UB-4, FAV-ST-1)
- Features: `web/favoriten.feature`
- Quality: Q-USE-17, Q-SEC-10
- Verwandt: ADR-022, ADR-023
