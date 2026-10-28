# Closure: SERVICE-07 – Magazin: Karten mit Badges und Ort im Titel

**Datum:** 2026-10-28

## Erreichtes
- Magazin-Karten mit Datum, Badges (Anlass und Art der Ausstellung), Titel als Link und Kurztext; Badges als Text mit den Farben der Status-Badges; Beitragsseite zeigt dieselben Badges.
- Titel der Neuigkeiten einheitlich „Ausstellungstitel in Stadt“ ohne Anlass; Titelregel in Planung, Prüfung und Skill; 42 vorhandene Neuigkeiten migriert (Daten und Frontmatter); Bestandstest.
- Spezifikation: 6 neue Anforderungen (BLG-UB-6 bis BLG-UB-8, BLG-ST-2, BLG-UN-3, NWS-UB-7), 9 Szenarien, Q-DATA-10, Q-USE-6, ADR-013 accepted.
- Prüfung: 183 Tests im Repo-Root und 187 Web-Tests grün (Chromium 130 und Chrome 127), Lint und Datenvalidierung grün, Build prerendert das Magazin mit Badges.

## Abweichungen
- Phase 7 (Review) nicht durchgeführt: keine `review-*`-Skills vorhanden.
- Nicht geprüft: Aussehen im Browser, axe- und Lighthouse-Läufe, Chrome 156 der Pipeline.
- Das Layout wurde vor H1 von der Projektleitung korrigiert (Ort im Titel statt eigener Ortszeile); Spezifikation und Stories wurden angepasst, Q-USE-5 war vergeben (daher Q-USE-6).

## Rückläufe
Keine.

## Erkenntnisse
- Der Anlass lässt sich ohne Schemafeld aus der Kennung `<Ausstellungs-id>-<Anlass>` lesen; die Kennungsregel aus ADR-008 trägt damit auch die Darstellung.
- Ein deterministischer Titel („Ausstellungstitel in Stadt“) macht die Titelregel prüfbar und die Karten einheitlich; die frühere freie Formulierung führte zu uneinheitlichen Ortsangaben.
- Ein Kartentest, der auf eine lazy startende Karte wartet, braucht ein explizites Scrollen (Folge aus dem Pipeline-Fehler zuvor).

## Follow-ups / empfohlene Tickets
1. Aussehen der Karten und der Beitragsseite im Browser prüfen, axe- und Lighthouse-Lauf.
2. Entscheiden, ob die Karte später doch einen Ortslink bekommen soll.
3. Review-Skills anlegen.
