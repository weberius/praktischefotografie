# ADR-014: Einheitliche Badge-Zeile für Ausstellungen

**Status:** Accepted (an H2 am 2026-10-28 bestätigt)  ·  **Datum:** 2026-10-28

## Kontext
Badges von Ausstellungen erscheinen im Kalender („Ausstellung“, „Endet bald“), im Magazin (Anlass und Art, SERVICE-07), in der Ausstellungsliste (nur Status unter dem Datum) und im Ausstellungsdetail (Status, dann gespeicherter Typ). Reihenfolge, Genauigkeit der Art und Abstand sind uneinheitlich; benachbarte Badges berühren sich. Die Art „Gruppen-/Einzelausstellung“ soll aus der Zahl der beteiligten Fotograf:innen folgen.

## Entscheidung
- **Art aus den Personen.** Eine Funktion `exhibitionKind(exhibition)` in der Webanwendung bestimmt die Art: mehr als eine Person „Gruppenausstellung“, genau eine „Einzelausstellung“; `retrospective` und `permanent` bleiben „Retrospektive“ und „Dauerausstellung“; ohne Person gilt die gespeicherte Art (BDG-UB-1). Das Datenfeld `type` bleibt bestehen.
- **Datenkonsistenz.** Der Validator meldet `solo` bei mehr als einer und `group` bei weniger als zwei Personen (PRF-UN-3), damit gespeicherte und angezeigte Art nicht auseinanderlaufen.
- **Eine Komponente.** Eine gemeinsame Komponente `app-exhibition-badges` zeigt Art und danach Status bzw. Anlass und legt den Abstand fest (Flex-Zeile mit `gap: 0.25em`, BDG-UB-3). Kalender, Magazin (Karte und Beitragsseite), Ausstellungsliste und Ausstellungsdetail nutzen sie; `app-news-badges` (ADR-013) setzt darauf auf.
- **Reihenfolge:** Art zuerst, dann Status bzw. Anlass (BDG-UB-2); in der Ausstellungsliste steht die Badge-Zeile über der Überschrift (EXH-UB-8). Im Kalender bleibt die Auswahl des Status wie in CAL-UB-3 und CAL-UB-6 (nur „Endet bald“ und „Beendet“).

## Alternativen
- **Gespeicherten Typ unverändert anzeigen:** Keine Änderung, aber „Ausstellung“ im Kalender bleibt unspezifisch und `type` könnte der Personenzahl widersprechen.
- **`type` beim Anlegen automatisch aus den Personen setzen (kein Validator):** Ändert den Datenfluss der Skripte; die Ableitung zur Laufzeit ist einfacher und unabhängig von der Datenpflege.
- **Abstand per CSS an jeder Stelle einzeln:** Fehleranfällig; eine Komponente verhindert Abweichungen.

## Konsequenzen
- Die Webanwendung verändert die Anzeige von Ausstellungen auf fünf Seiten; Tests und Spezifikation (CAL-UB-4, BLG-UB-6, EXH-UB-4 ersetzt) werden angepasst.
- Weitere Listen mit Status-Badges (Ort, Fotograf:in, Veranstalter, Festival) bleiben zunächst unverändert und können dieselbe Komponente später übernehmen.
- Dauer- und Retrospektiv-Ausstellungen behalten ihre eigene Art.

## Auswirkungen
- EARS: BDG-UB-1 bis BDG-UB-4, CAL-UB-7, BLG-UB-9, EXH-UB-8, EXH-UB-9, PRF-UN-3; Supersede CAL-UB-4, BLG-UB-6, EXH-UB-4
- Features: `web/badges.feature`, `web/kalender.feature`, `web/blog.feature`, `web/ausstellungen.feature`, `content/fotografinnen-profile.feature`
- Quality: Q-USE-4, Q-USE-7, Q-DATA-11
