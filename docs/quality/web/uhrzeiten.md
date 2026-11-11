# Qualität: Uhrzeiten in der Webanwendung (web)

**Stand:** 2026-11-11. Fortlaufend zu Q-USE-2, Q-USE-4 und Q-PERF-3.

| ID | Szenario | Maß | Prüfverfahren | EARS |
| --- | --- | --- | --- | --- |
| Q-USE-21 | Besucher:in liest die Uhrzeit eines Events in Liste, Detailseite und Agenda, auch mit Screenreader; die Angabe soll eindeutig und überall gleich sein. | 100 % der angezeigten Zeitangaben folgen dem Format „HH:MM–HH:MM Uhr“, „ab HH:MM Uhr“ bzw. „Start/Ende HH:MM Uhr“ (EVT-UB-7, EVT-UB-8); der zugängliche Name der Zeitangabe nennt „von … bis … Uhr“ statt des Gedankenstrichs; 0 Zeitangaben bei Events ohne `startTime` und bei mehrtägigen Events in Liste und Agenda; Kontrast und Größe wie Q-USE-2; 0 axe-Verstöße (kritisch, schwerwiegend) auf `/events`, `/events/:id` und `/calendar`; Rendering der Agenda bleibt im Maß von Q-PERF-3. | Komponententests (Chrome Headless) auf Text und zugänglichen Namen, axe in den Tests wie in Q-USE-4 | EVT-UB-7, EVT-UB-8, CAL-UB-8 |
