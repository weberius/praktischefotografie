# SERVICE-11-STORY-01 – Icon als Anwendungs-Icon

**Als** Besucher:in **möchte ich** die Anwendung im Browser-Tab, in Lesezeichen und auf dem Startbildschirm meines Geräts am Icon erkennen, **damit** ich sie unter vielen anderen Seiten schnell wiederfinde.

## Akzeptanzkriterien
1. Der Browser-Tab und Lesezeichen zeigen das Icon aus dem Quellbild statt des Standard-Symbols.
2. Auf Mobilgeräten zeigt eine Verknüpfung auf dem Startbildschirm das Icon und den Namen „Praktische Fotografie“.
3. Das Icon ist sauber zugeschnitten: quadratisch, ohne weißen Rand des Quellbildes und ohne Reste des Postkartenmotivs.
4. Alle Verweise funktionieren auch, wenn die Anwendung unter einem Basispfad ausgeliefert wird.
5. Wer das Quellbild austauscht, kann das Icon und alle Dateien mit einem Befehl neu erzeugen.

## Abhängigkeiten
Keine.

## Spezifikation (Phase 3, vorab erstellt)
- EARS: ICO-UB-1, ICO-UB-2, ICO-UB-5; IMG-UB-1 (Icon), IMG-UB-2, IMG-UB-3
- Gherkin: `web/markenicon.feature` (Favicon in jeder Seite, Icon-Dateien in der geforderten Größe, Favicon enthält drei Größen, Icon für Startbildschirme, Pfade relativ zum Basispfad), `setup/bildmaterial.feature` (Icon und Postkartenmotiv getrennt, Icon-Dateien aus dem Master, Befehl erzeugt alle Dateien)
- Quality: Q-USE-11, Q-PERF-7, Q-MAIN-5
- ADR: ADR-017, ADR-003

**INVEST:** I ✔ N ✔ V ✔ E ✔ S ✔ T ✔
