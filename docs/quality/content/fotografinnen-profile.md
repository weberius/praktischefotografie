# Qualität: Profile der Fotograf:innen (content)

**Stand:** 2026-10-28. Fortlaufend zu Q-DATA-1 bis Q-DATA-6.

| ID | Szenario | Maß | Prüfverfahren | EARS |
| --- | --- | --- | --- | --- |
| Q-DATA-7 | Redaktion übernimmt Profile; Portraits sollen vorhanden, klein und mit Nachweis versehen sein. | 100 % der Portraits haben Datei (≤ 200 kB, höchstens 400 px breit), Dateiseite auf `commons.wikimedia.org`, Urheber und Lizenz; 0 Portraits ohne freie Lizenz; von ≥ 8 ungültigen Fixtures (fehlende Datei, zu große Datei, ohne Urheber, ohne Lizenz, Lizenz unfrei, falscher Host, Lebensdaten, doppelter Name) werden 100 % erkannt. | Automatisierte Tests mit Fixtures (`npm test`); Breite in der Prüfung der Vorschläge | PRF-UB-1, PRF-UB-3, PRF-UN-1, PRF-UN-2, RSF-UB-4, RSF-UB-6 |
| Q-DATA-8 | Redaktion lässt Wikipedia-Zusammenfassungen schreiben; sie sollen eigenständig, belegt und nachvollziehbar sein. | 100 % der Zusammenfassungen haben 40–90 Wörter und mindestens eine Quelle auf `<lang>.wikipedia.org`; 0 Zusammenfassungen mit einer wörtlichen Wortfolge von ≥ 8 Wörtern aus dem Anfangstext; 100 % der Personen ohne passenden Eintrag stehen im Bericht. | Tests mit Fixtures (Kandidatendatei mit Anfangstexten) | PRF-UB-2, RSF-EV-1, RSF-UB-2, RSF-UN-1, RSF-UB-5, RSF-EV-2, RSF-UB-7 |
| Q-DATA-9 | Redaktion erfasst eine Ausstellung mit Fotograf:innen; alle genannten Namen sollen in `photographerIds` und in der `description` stehen. | 100 % der Ausstellungen mit `photographerIds` haben eine `description`, die jeden Namen nennt; im Bestand 0 Verstöße nach der Migration; von ≥ 4 ungültigen Fixtures (fehlende Beschreibung, ein Name fehlt, Groß-/Kleinschreibung abweichend ist zulässig) werden 100 % erkannt. | Validator-Tests und Bestandstest | PRF-UB-4, UPD-UB-9, SKL-UB-7 |
