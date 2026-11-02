# Analyse Code: SERVICE-20-STORY-01

Kein kritischer oder hoher Befund. Logik von `GlobalFilter.allows` und Anwendung auf den fünf Seiten stimmen mit EARS und Gherkin überein. Tests liefen im Review nicht (kein `CHROME_BIN`); im Gate grün.

| # | Schwere | Befund | Vorschlag |
| --- | --- | --- | --- |
| C1 | mittel | Neustart-Test (FLT-UB-6) ist trivial; IndexedDB und Cookie nicht geprüft. | Test über die Bedienung, Cookie vorher/nachher, IndexedDB. |
| C2 | mittel | Seitenwechsel-Test setzt den Filter über den Dienst, prüft die Anzeige auf der Zielseite nicht. | Checkbox `checked` und Statustext prüfen. |
| C3 | mittel | Q-USE-18: axe, Tastatur, 100 ms, Zielgröße nicht automatisiert. | Nachziehen oder als offen führen. |
| C4 | niedrig | Zwei Zurücksetzen-Schaltflächen auf der Karte (siehe A1). | mit A1. |
| C5 | niedrig | Schaltfläche liegt in der Live-Region. | herausnehmen. |
| C6 | niedrig | Mehrere `role=status` je Seite. | gemeinsame Trefferzahl. |
| C7 | niedrig | Unvereinbare Typ-/Ort-Kombination möglich (spezkonform, FLT-ST-1). | optional. |
