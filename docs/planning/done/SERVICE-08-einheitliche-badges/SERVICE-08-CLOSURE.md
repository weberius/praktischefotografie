# Closure: SERVICE-08 – Einheitliche Badges bei Ausstellungen

**Datum:** 2026-10-28

## Erreichtes
- Art der Ausstellung aus der Zahl der Personen („Gruppenausstellung“, „Einzelausstellung“; Retrospektive und Dauerausstellung bleiben) und eine gemeinsame Badge-Zeile (Art zuerst, danach Status bzw. Anlass, Text, Abstand 0,25 em).
- Eingesetzt in Kalender (ohne „Ausstellung“), Magazin (Karte und Beitragsseite), Ausstellungsliste (Badges über der Überschrift) und Ausstellungsdetail.
- Validator prüft die gespeicherte Art gegen die Personenzahl (`solo`, `group`); Skill-Regel und Dokumentation.
- Spezifikation: 8 neue Anforderungen (BDG-UB-1 bis BDG-UB-4, CAL-UB-7, BLG-UB-9, EXH-UB-8, EXH-UB-9, PRF-UN-3), 3 ersetzt, Q-USE-7, Q-DATA-11, ADR-014 accepted.
- Prüfung: 185 Tests im Repo-Root und 201 Web-Tests grün (Chromium 130 und Chrome 127), Lint und Datenvalidierung grün, Build prerendert die Seiten.

## Abweichungen
- Phase 7 (Review) nicht durchgeführt: keine `review-*`-Skills vorhanden.
- Nicht geprüft: Aussehen im Browser, axe- und Lighthouse-Läufe, Chrome 156 der Pipeline.

## Rückläufe
Keine.

## Erkenntnisse
- Eine gemeinsame Komponente für die Badge-Zeile hält Reihenfolge und Abstand an allen Stellen gleich; der berechnete Abstand lässt sich mit `getComputedStyle` testen.
- Die Ableitung der Art zur Laufzeit braucht eine Datenregel, damit gespeichertes `type` und Anzeige nicht auseinanderlaufen; der Bestand war bereits konsistent.
- Testhilfen mit Standardwerten (Art, Personen) müssen zu neuen Datenregeln passen.

## Follow-ups / empfohlene Tickets
1. Die gemeinsame Badge-Zeile auf Orts-, Fotograf:innen-, Veranstalter- und Festivalseiten übernehmen.
2. Aussehen der Badges im Browser, axe- und Lighthouse-Läufe.
3. Review-Skills anlegen.
