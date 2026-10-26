# Klärung vager Tickets (Haltepunkt H1)

Der Wertbeitrag des Skills entsteht hier: ein vages MSCO-Ticket wird durch **gezieltes Nachfragen**
so weit nachgeschärft, dass klare, eindeutige UserStories entstehen. Lieber einmal zu viel fragen
als eine falsche Annahme zementieren.

**H1 ist die einzige Fragerunde vor H2.** Danach laufen Story, Spezifikation, Tasks und
Implementierung autonom; alles, was hier offen bleibt, wird dort als `ANNAHME:` entschieden. Fragen
deshalb so stellen, dass sie die folgenden Phasen tragen – insbesondere zu Wert, Abgrenzung,
messbarer Qualität und harten Leitplanken.

## Haltung

- **Nicht raten.** Jede Unklarheit wird entweder geklärt (Frage) oder als `ANNAHME:` markiert.
- **Fragen bündeln.** An H1 mehrere zusammenhängende Fragen per `AskUserQuestion`,
  nicht einzeln nachhaken.
- **Entscheidbar fragen.** Optionen mit Default/Empfehlung anbieten, nicht offene Essayfragen.
- **Bestehendes zuerst prüfen.** Vieles steht schon in PRD, ADRs, bestehenden EARS/Gherkin –
  erst lesen, dann fragen. Was dort steht, nicht erneut erfragen.

## Checkliste für Mehrdeutigkeiten

Systematisch gegen das Ticket halten:

- **Akteur/Rolle:** Für welche Rolle(n) (Lernende:r als Entwickler:in / Requirements Engineer, später
  PO/QA/Support; Content-Maintainer)? Rollen- oder niveauabhängiges Verhalten?
- **Nutzen/Ziel:** Was ist der konkrete Nutzen? Woran wird Erfolg gemessen?
- **Scope/Abgrenzung:** Was ist ausdrücklich **nicht** Teil? Betroffene Bereiche (chat/studio/wiki/content/setup/server/…)?
- **Auslöser & Vorbedingungen:** Wann/unter welchen Zuständen greift das Verhalten? (→ EARS-Pattern)
- **Daten:** Quelle, Pflicht/optional, Format, Grenzfälle (leer/fehlend/sehr groß)?
- **Fehler-/Grenzverhalten:** Was passiert bei ungültiger Eingabe, Fehler, fehlender Berechtigung?
  (→ EARS `UN` / Gherkin-Edge-Cases)
- **Qualität:** Performance, Zuverlässigkeit, A11y (REWE DSA), Sicherheit/Datenschutz (nur lokal,
  keine Telemetrie), LLM-Kosten und Quellentreue der Antworten, Wartbarkeit –
  welche Merkmale sind relevant, und woran wäre „gut genug" **messbar**? (→ Quality-Sicht, Phase 3)
- **Leitplanken:** Gibt es technische Vorgaben oder bestehende ADRs, die den Lösungsraum begrenzen? (→ ADR-Sicht)
- **Konsistenz:** Widerspricht das Ticket bestehenden EARS/Gherkin/Quality/ADR? Muss etwas per Supersede
  geändert werden?
- **Iteration:** Ändert dieses Ticket etwas bereits Umgesetztes? Dann ist die Änderung selbst die Story.

## Von der Klärung zur Story

Eine Unklarheit ist ausreichend geklärt, wenn sich daraus eine Story im Format
„**Als** <Rolle> **möchte ich** <Fähigkeit> **damit** <Nutzen>" mit **prüfbaren**,
**lösungsneutralen** Akzeptanzkriterien formulieren lässt – und jedes Akzeptanzkriterium sich
später als EARS-Anforderung (ein Pattern, ein Systemname) mit Gherkin-Szenario **oder** als
Qualitätsszenario mit messbarem Maß ausdrücken lässt.

Die Story beschreibt den **Wert**, nicht die Lösung. Lösungsdetails, die im Gespräch auftauchen,
werden notiert und in Phase 3 (EARS/ADR) eingeordnet, nicht in die Story geschrieben.

## Dokumentation offener Punkte

Was nicht abschließend geklärt wurde:

- als `ANNAHME: <Aussage>` in `PIPELINE.md` unter „Offene Annahmen / Entscheidungen",
- und – falls es eine Anforderung betrifft – zusätzlich als `REVIEW REQUIRED` in der EARS-Datei
  (siehe `templates/ears.md`) bzw. in der Quality-Datei.
