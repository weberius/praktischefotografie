# Analyse Security: SERVICE-20-STORY-01

Keine Schwachstellen gefunden.

- Q-SEC-11: Zustand nur in Signals; kein `localStorage`, `sessionStorage`, Cookie oder IndexedDB in `web/src/app`.
- URL: nur `organizer` und `festival`, nur als Gleichheitsvergleich gegen vorhandene IDs.
- XSS: Ortsnamen per Interpolation (escaped); kein `innerHTML` oder `bypassSecurityTrust*` im geänderten Code.
- Nicht geprüft: Detailprüfung von `calendar`, `event-list`, `exhibition-list` (Senkensuche über `web/src/app` ohne Treffer).
