# SERVICE-12-STORY-04-TASK-01 – Fußbereich nach Klangland, scrollt mit
- **Status:** Umgesetzt
- **Story:** STORY-04
- **EARS:** FRM-UB-3, FRM-UB-4, NAV-UB-8, MAP-UB-9 (unverändert)
- **Gherkin:** `web/seitenrahmen.feature` · Fußbereich scrollt mit dem Inhalt, Fußbereich bei kurzem Inhalt am Fensterrand, Fußbereich mit Linkzeile; `web/karte.feature` · Karte füllt die Fläche
- **Quality:** Q-USE-13 (nicht fixiert, Kontrast ≥ 4,5:1), Q-USE-4
- **ADR:** ADR-016, ADR-002
- **Aufgabe:** `app.html`: Fußbereich mit Container, Linkzeile „Rechtliches“ (Impressum, Haftungsausschluss, Datenschutz, Quellen & Lizenzen) und der Zeile „Zentrum für Praktische Fotografie · Fokus NRW“ darunter; CSS: helle Fläche, Trennlinie, gedämpfte kleine Schrift, Linkzeile mit Umbruch, Ausrichtung im Inhaltsbereich; `position` bleibt statisch.
- **Prüfkriterium:** Komponententests (Linkzeile mit vier Links in Reihenfolge, Zeile darunter, `position` ≠ `fixed`/`sticky`, Trennlinie, Fußbereich bei kurzem Inhalt am Fensterrand); bestehende MAP-UB-9-Tests grün; Kontrastberechnung der Textfarbe ≥ 4,5:1; Prüf-Gate grün.
