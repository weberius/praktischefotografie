# Changelog: SERVICE-09-STORY-02 – Mehr Abstand um die Badge-Zeile

## 2026-10-28 – TASK-01: Vertikaler Abstand in der Komponente

- **Status:** Umgesetzt
- **Änderungen:** `app-exhibition-badges` hat 0,75 rem Außenabstand oben und unten (das Dreifache der 0,25 rem der Karten-Absätze), am Anfang eines Blocks entfällt der obere Abstand. Der Abstand gilt dadurch automatisch für Kalender, Magazin, Ausstellungsseiten, Beitragsseite und die vier neuen Seiten.
- **Dateien:** `web/src/app/shared/exhibition-badges/exhibition-badges.ts`, `exhibition-badges.spec.ts`
- **Prüfung:** Karma-Tests grün (208 von 208, Chromium 130 und Chrome 127), `ng lint` grün, Build prerendert die Seiten. **Nicht geprüft:** Aussehen im Browser, axe- und Lighthouse-Läufe; der Abstand ist nur an der Komponente und an den Seiten mit einem Bezug zu Karten geprüft.
