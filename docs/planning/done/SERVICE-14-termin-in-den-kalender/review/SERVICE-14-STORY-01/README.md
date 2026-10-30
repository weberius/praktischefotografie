# Review SERVICE-14-STORY-01

| Analyse | Status |
|---|---|
| [analyse-architecture.md](analyse-architecture.md) | Score 8/10, keine kritischen Befunde |
| [analyse-code.md](analyse-code.md) | kein Korrektheitsfehler, Schwächen in Tests und Download |
| [analyse-security.md](analyse-security.md) | Risiko niedrig bis mittel |

Alle drei Läufe schrieben in getrennte Dateien (Nummernbereiche TASK-01–09 Architektur, TASK-11–14 Code, TASK-21–23 Security); `README.md` und `CHANGELOG.md` schreibt der Aufrufer.

| Task | Titel | Schwere | Befund | Status |
|---|---|---|---|---|
| TASK-01 | Mapping nach `core` auslagern | mittel | ARCH-01 | siehe Task-Datei |
| TASK-02 | Download-Hilfsfunktion | niedrig | ARCH-02 | siehe Task-Datei |
| TASK-03 | `METHOD:PUBLISH` entscheiden | mittel | ARCH-04 | siehe Task-Datei |
| TASK-04 | `TRANSP` und `SEQUENCE` | mittel | ARCH-04 | siehe Task-Datei |
| TASK-05 | Download-Robustheit (Blob-URL) | mittel | ARCH-03 | siehe Task-Datei (deckt sich mit TASK-12) |
| TASK-06 | Basis-URL entscheiden | niedrig | ARCH-05 | siehe Task-Datei |
| TASK-07 | Qualitätsnachweise (axe auf aktuellem Event, Fixtures) | mittel | ARCH-06 | siehe Task-Datei |
| TASK-08 | Eingaben robust machen | niedrig | ARCH-07 | siehe Task-Datei |
| TASK-09 | ADR-018 ergänzen | niedrig | ARCH-08 | siehe Task-Datei |
| TASK-11 | Tests für Randfälle härten | mittel | CODE-01 | siehe Task-Datei |
| TASK-12 | Blob-URL verzögert freigeben | mittel | CODE-02 | siehe Task-Datei |
| TASK-13 | Event-URL: Test und Pfad | niedrig | CODE-03 | siehe Task-Datei |
| TASK-14 | Download-Helfer und Kleinigkeiten | niedrig | CODE-04 | siehe Task-Datei |
| TASK-21 | Zeilenumbrüche und Steuerzeichen neutralisieren | mittel | SEC-01 | siehe Task-Datei |
| TASK-22 | Injection-Tests | mittel | SEC-01, SEC-03 | siehe Task-Datei |
| TASK-23 | UID, URL und Dateiname absichern | niedrig | SEC-02 | siehe Task-Datei |
