# SERVICE-26-STORY-03-TASK-01 – Zeitangabe in Liste und Detailseite

- **Story:** SERVICE-26-STORY-03
- **Spezifikation:** EVT-UB-7, EVT-UB-8, Q-USE-21, ADR-027
- **Prüfkriterium:** Eine Hilfsfunktion `formatTimeRange` bildet „16:00–18:00 Uhr“, „ab 16:00 Uhr“, „Start …/Ende …“ und den Zonennamen bei Abweichung; Liste und Detailseite zeigen sie mit zugänglichem Namen „von … bis … Uhr“; ohne `startTime` und mehrtägig in der Liste keine Zeit; Komponententests grün.
- **Dateien:** `web/src/app/core/` (Hilfsfunktion + Spec), `web/src/app/pages/event-list/`, `web/src/app/pages/event-detail/`
- **Status:** Umgesetzt
