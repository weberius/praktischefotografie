# Qualität: Datenschutz (content, setup)

**Stand:** 2026-10-27

| ID | Szenario | Maß | Prüfverfahren | EARS |
| --- | --- | --- | --- | --- |
| Q-SEC-1 | Redaktion validiert lokal; das Projekt erhebt keine Nutzungsdaten und sendet nichts ins Netz. | 0 Netzwerkaufrufe der Validierung; keine Telemetrie- oder Tracking-Abhängigkeit in `package.json`; `photographers.json` enthält nur öffentlich dokumentierte Angaben (Name, Bio, Website). | Test mit gesperrtem `fetch`/`net`; Review von `package.json` | VAL-UB-1 |
