# EARS: Marken-Icon der Webanwendung (Kürzel `ICO`)

**Bereich:** web  ·  **Systemname:** Webanwendung  ·  **Stand:** 2026-10-29

Begriffe: „Icon“ ist das quadratische Marken-Icon mit abgerundeten Ecken (Bildcollage mit Blende). „Basispfad“ ist der Pfad, unter dem die Anwendung ausgeliefert wird (z. B. `/praktischefotografie/` auf GitHub Pages, ADR-003).

| ID | Anforderung | Gherkin | Quality | ADR |
| --- | --- | --- | --- | --- |
| ICO-UB-1 | Die Webanwendung soll das Icon als Favicon bereitstellen: als `favicon.ico` (16, 32 und 48 Pixel) und als PNG mit 96 × 96 Pixeln, jeweils im Kopf jeder Seite verlinkt. | `web/markenicon.feature` · „Favicon in jeder Seite“ | Q-PERF-7 | ADR-017 |
| ICO-UB-2 | Die Webanwendung soll das Icon für Startbildschirme bereitstellen: als Apple-Touch-Icon mit 180 × 180 Pixeln und über ein Web-App-Manifest mit Name, Kurzname, Farben und den Icons 192 × 192 und 512 × 512 Pixel. | `web/markenicon.feature` · „Icon für Startbildschirme“ | Q-PERF-7 | ADR-017 |
| ICO-UB-3 | Die Webanwendung soll im Kopfbereich jeder Seite das Icon innerhalb des Links zur Startseite unmittelbar vor dem Namen „Praktische Fotografie“ anzeigen. | `web/markenicon.feature` · „Icon im Kopfbereich“ | Q-USE-11 | ADR-017 |
| ICO-UB-4 | Die Webanwendung soll das Icon im Kopfbereich als dekoratives Bild ohne Alternativtext auszeichnen, sodass der Link zur Startseite den zugänglichen Namen „Praktische Fotografie“ behält. | `web/markenicon.feature` · „Icon im Kopfbereich“ | Q-USE-11 | ADR-017 |
| ICO-UB-5 | Die Webanwendung soll alle Pfade zu Icon-Dateien relativ zum Basispfad angeben, sodass sie unter jedem Basispfad gefunden werden. | `web/markenicon.feature` · „Pfade relativ zum Basispfad“ | Q-USE-11 | ADR-003, ADR-017 |
| ICO-UB-6 | Die Webanwendung soll das Icon im Kopfbereich mit fester Breite und Höhe darstellen, sodass die Kopfzeile beim Laden des Bildes nicht springt. | `web/markenicon.feature` · „Icon im Kopfbereich“ | Q-PERF-7 | ADR-017 |
