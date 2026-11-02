# Closure: SERVICE-18 – Zurück zur vorherigen Seite navigieren

**Datum:** 2026-11-02  ·  **Quelle:** Idee `docs/product/ideen/idee-009-navigation.md`

## Erreichtes
Alle sieben Detailseitentypen zeigen oben den gemeinsamen Zurück-Link „‹ Zurück zu <Ziel>“. Er führt zur vorherigen Seite der Anwendung, sonst zur Übersicht des Seitentyps. Spezifikation: NAV-UB-9, NAV-EV-2, NAV-ST-1, `web/navigation.feature` (4 neue Szenarien), Q-USE-16, ADR-022 (Accepted).

## Abweichungen
Keine am H2 (akzeptiert). Beschriftung auch im Fallback „Zurück zu <Übersicht>“ statt „‹ Alle Fotograf:innen“.

## Rückläufe und korrigierte Quellen
Ein Review-Rücklauf: `NavHistory` startete erst mit dem ersten Zurück-Link und verpasste die erste Seite. Korrigiert in der Umsetzung (Initialisierung beim Start, Signals); die Spezifikation blieb unverändert.

## Erkenntnisse
- Ein Test, der einen Dienst vorab erzeugt, verdeckt Startfehler; die Verdrahtung gehört in einen eigenen Test.
- Der Befund war beim Schreiben der Tests bereits absehbar, wurde aber erst vom Review gefunden.

## Nicht geprüft
axe-Lauf und Playwright-Tastaturtest zu Q-USE-16; Verhalten im echten Browser nach dem Vorrendern. Root-`npm test` hat 1 bereits vorher roten Test (FET-OP-3).

## Follow-ups
- Idee 010 „Favoriten“ ist die nächste offene Idee.
- Wiederherstellung von Filtern und Scrollposition der Zielseite (bewusst ausgeklammert).
- Compliance-Review nachholen, sobald verfügbar.
