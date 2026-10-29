# SERVICE-12-STORY-05-TASK-03 – Prüfwerkzeug und Test für die rechtlichen Seiten
- **Status:** Umgesetzt
- **Story:** STORY-05
- **EARS:** RCH-UB-1 bis RCH-UB-5, NAV-UB-7
- **Gherkin:** `web/rechtliches.feature` (alle); `web/navigation.feature` · Jede Adresse zeigt ihre Seite
- **Quality:** Q-USE-14, Q-SEO-2, Q-SEO-3, Q-USE-2
- **ADR:** ADR-002
- **Aufgabe:** `web/tools/quality/browser-check.mjs`: `/haftungsausschluss` und `/quellen` in die Seitenliste aufnehmen; übergreifender Test, dass alle vier rechtlichen Seiten genau eine `h1` haben, Abschnitte als `h2` und externe Links `rel="noopener"`.
- **Prüfkriterium:** Test grün; `npm run quality` (axe, SEO) läuft, soweit lokal möglich; sonst als „nicht geprüft“ vermerkt; Prüf-Gate grün.
