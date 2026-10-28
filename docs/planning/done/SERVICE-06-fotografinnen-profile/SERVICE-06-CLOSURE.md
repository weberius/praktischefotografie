# Closure: SERVICE-06 – Profile der Fotograf:innen mit Wikipedia und Portraits

**Datum:** 2026-10-28

## Erreichtes
- Alle genannten Personen erfasst: „Mysterium der Paare“ mit 57 Namen, „HIER UND JETZT“ mit Marie Watt und Jackson; die Datenprüfung verlangt künftig, dass die `description` jeder Ausstellung mit Personen alle Namen nennt (Validierungsfehler); Prüfregel für Vorschläge und Skill-Regeln im `update-venue-data`.
- Profil im Datenmodell: `occupation`, `life`, `wikipedia` (mehrere Quellen und Sprachen), `portrait` (Datei, Maße, Urheber, Lizenz, Dateiseite); Validierung, Größenlimit, Build kopiert Portraits nach `portraits/`.
- Skill `/research-photographers` mit Node-Skripten (Wikidata-Auflösung, Wikipedia in mehreren Sprachen, Commons-Bilder mit freier Lizenz als 400-px-Vorschau, Prüfung, Freigabe, Übernahme mit Rollback, Bericht), höflicher Abruf nur an Wikimedia, offline testbar.
- Webanwendung nach dem Vorbild von klangland: Kartenliste mit Portrait, Personenseite mit Bildnachweis, „Aus der Wikipedia“ mit Quellenlinks und CC-BY-SA-Hinweis, „Ausstellungen (n)“.
- Probelauf mit Wikimedia für fünf Personen; Profile für August Sander, Candida Höfer, Tina Barney, Man Ray und Duane Michals nach Freigabe übernommen (drei Portraits).
- Spezifikation: 33 neue Anforderungen (PRF 7, RSF 13, UPD 1, SKL 1, PHO 8, plus Ergänzungen), 1 ersetzt (PHO-UB-2), 24 Szenarien, Q-DATA-7 bis Q-DATA-9, Q-SEC-5, Q-MAIN-4, Q-PERF-6, Q-USE-5, ADR-011 und ADR-012 accepted.
- Prüfung: 180 Tests im Repo-Root (offline) und 178 Web-Tests grün, Lint und Datenvalidierung grün, Build prerendert 159 Adressen.

## Abweichungen
- Phase 7 (Review) nicht durchgeführt: keine `review-*`-Skills vorhanden.
- Nicht geprüft: Aussehen im Browser, axe- und Lighthouse-Läufe, ein Lauf des Skills als Slash-Kommando, Sachrichtigkeit der Zusammenfassungen.
- Zwei Funde im Probelauf (Host `thumb.wikimedia.org`, Titelbild des Artikels als Bildersatz) wurden vor H2 behoben und in Spezifikation und ADR nachgezogen; `portrait.width` und `portrait.height` wurden gegenüber dem Entwurf als Pflichtfelder ergänzt.

## Rückläufe
Keine.

## Erkenntnisse
- Wikidata trennt Identifikation (Beruf, Namensgleichheit) von der Textquelle und liefert die Sprachversionen über Sitelinks; das ersetzt den blinden ersten Suchtreffer von klangland.
- Commons liefert die Verkleinerung (Vorschaubild) und die Lizenzdaten selbst; eine Bildbibliothek ist nicht nötig.
- Ein Testserver für Wikidata, Wikipedia und Commons mit Endpunkt-Überschreibung macht den Abruf vollständig offline testbar; der Livelauf deckte trotzdem Hosts und Weiterleitungen auf, die das Testmodell nicht kannte.
- Namensregeln für Ausstellungsbeschreibungen machen Lücken sichtbar (sechs Verstöße im Bestand).

## Follow-ups / empfohlene Tickets
1. Skill `/research-photographers` für die übrigen 70 Personen laufen lassen (viele Studios und historische Fotograf:innen werden „nicht gefunden“ bleiben).
2. Portraits für Sander und Barney manuell prüfen (kein Commons-Bild automatisch gefunden).
3. Prüfen, ob alle 57 Personen von „Mysterium der Paare“ gezeigte Bilder haben, und die Schreibweise „Göttfried“ klären.
4. Wikidata-Berufsliste erweitern (z. B. Medienkünstler, Konzeptkünstler), wenn Personen nicht gefunden werden.
5. Browser-, axe- und Lighthouse-Prüfung der neuen Seiten.
6. Review-Skills anlegen.
