# EARS: Bildmaterial für Icon und Postkarte (Kürzel `IMG`)

**Bereich:** setup  ·  **Systemname:** Repository  ·  **Stand:** 2026-10-29

Begriffe: „Quellbild“ ist `docs/resources/zfpf.png` (ein Bild mit dem Icon links und dem Postkartenmotiv rechts). „Postkartenmotiv“ ist die rechte Bildhälfte.

| ID | Anforderung | Gherkin | Quality | ADR |
| --- | --- | --- | --- | --- |
| IMG-UB-1 | Das Repository soll aus dem Quellbild das Icon und das Postkartenmotiv als zwei getrennte PNG-Dateien in `docs/resources/` bereitstellen, jeweils auf den Rand des Motivs zugeschnitten und ohne Teile des jeweils anderen Motivs. | `setup/bildmaterial.feature` · „Icon und Postkartenmotiv getrennt“ | Q-MAIN-5 | ADR-017 |
| IMG-UB-2 | Das Repository soll aus dem Icon-Master alle Icon-Dateien der Webanwendung (ICO-UB-1, ICO-UB-2) ableiten und in `web/public/` bereitstellen. | `setup/bildmaterial.feature` · „Icon-Dateien aus dem Master“ | Q-MAIN-5 | ADR-017 |
| IMG-UB-3 | Das Repository soll einen dokumentierten Befehl bereitstellen, der die Dateien aus IMG-UB-1 und IMG-UB-2 aus dem Quellbild neu erzeugt. | `setup/bildmaterial.feature` · „Befehl erzeugt alle Dateien“ | Q-MAIN-5 | ADR-017 |
| IMG-UB-4 | Das Repository soll das Postkartenmotiv nicht in `web/public/` ausliefern. | `setup/bildmaterial.feature` · „Postkarte nicht im Build“ | Q-PERF-4 | ADR-017 |
