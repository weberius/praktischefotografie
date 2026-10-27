# Qualität: Wartbarkeit (web)

**Stand:** 2026-10-27. 

| ID | Szenario | Maß | Prüfverfahren | EARS |
| --- | --- | --- | --- | --- |
| Q-MAIN-1 | Entwickler:in prüft eine Änderung lokal. | `ng test` (Karma, headless) grün; `ng lint` ohne Fehler; `ng build --configuration production` fehlerfrei; Zeilenabdeckung der Logik unter `web/src/app/core/` ≥ 80 %. | Karma mit Coverage, ESLint, Build | BLD-EV-1 |
