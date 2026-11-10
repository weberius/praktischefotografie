# SERVICE-24 – Closure

**Erreicht:** `/events` und `/exhibitions` zeigen nur aktuelle Einträge; Statusfilter ohne „Beendet“; Personenseite, Ortsseite, Kalender und Magazin bestätigt unverändert. Gate grün (Build, 265 + 333 Tests, Lint).

**Abweichungen / Rückläufe:** keine. H2 akzeptiert; Annahmen bestätigt.

**Review:** Architektur, Code, Security ausgeführt; Compliance nicht verfügbar. Keine Befunde oberhalb der Schwelle.

**Follow-ups (zurückgestellt, siehe `review/SERVICE-24-STORY-01/`):**
- Gemeinsames Prädikat „aktuell“ in `core/` (Q-REL-4 „keine zweite Berechnung“), Reste (Meta-Beschreibung Ausstellungsliste, `protected today`).
- Testlücken: ACT-ST-1 und Grenzfälle gestern/heute/morgen für Ausstellungen; veralteter Kopfkommentar der Event-Spec.
- ARCH-02: Stichtag bei vorab erzeugten Seiten (Build-Datum vs. Hydration) – ADR-Entscheidung.
- `aktualitaet.feature`: Tabellen ausrichten.
