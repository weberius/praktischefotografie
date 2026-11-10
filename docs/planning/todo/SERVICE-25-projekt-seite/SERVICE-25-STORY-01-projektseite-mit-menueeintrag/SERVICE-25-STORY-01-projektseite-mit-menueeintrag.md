# SERVICE-25-STORY-01 – Projektseite mit abgesetztem Menüeintrag

**Als** Besucher:in **möchte ich** auf einer Seite „Projekt“ lesen, wozu das Projekt dient, wer dahintersteht und wie ich es teilen oder unterstützen kann, **damit** ich das Projekt einordnen und weitergeben kann.

## Akzeptanzkriterien
1. Unter `/projekt` gibt es eine Seite mit der Überschrift „Projekt“; sie hat Titel und Beschreibung und steht in der Sitemap.
2. Unter der Überschrift steht der Motivationstext, darunter das Portrait des Betreibers mit Alternativtext.
3. Darunter folgt „Über das Projekt“ mit einer Zusammenfassung dessen, was die Webanwendung leistet; das OK Lab Köln ist hervorgehoben und verlinkt.
4. Darunter folgt „Teilen“ mit der Aufforderung zum Teilen und dem QR-Code.
5. Darunter folgt „Zentrum für praktische Fotografie unterstützen“ mit Erklärung, Hinweis auf das Verlassen der Webanwendung und Link zur freiwilligen Unterstützung.
6. Im Menü ist „Projekt“ der unterste Eintrag und durch eine Linie von den übrigen abgesetzt; er ist per Tastatur erreichbar.
7. Die Datenschutzerklärung nennt den Link zu PayPal.

## Abhängigkeiten
Keine.

## Trace
- **Req-IDs:** PRJ-UB-1 bis PRJ-UB-10, PRJ-ST-1; NAV-UB-10 (ersetzt NAV-UB-7); RCH-UB-6
- **Q-IDs:** Q-USE-20; ergänzend Q-USE-12, Q-USE-4, Q-SEC-2, Q-SEO-2, Q-SEO-3
- **Features:** `web/projekt.feature`; `web/navigation.feature` („Jede Adresse zeigt ihre Seite“); `web/rechtliches.feature` („Datenschutzerklärung nennt den PayPal-Link“)
- **ADRs:** keine neuen; geltend ADR-002, ADR-022

## Konsistenz
AK 1 → PRJ-UB-1, PRJ-UB-9, NAV-UB-10; AK 2 → PRJ-UB-2, -3, -7; AK 3 → PRJ-UB-4; AK 4 → PRJ-UB-5; AK 5 → PRJ-UB-6; AK 6 → PRJ-UB-8, PRJ-ST-1, Q-USE-12; AK 7 → RCH-UB-6. Jede Anforderung hat ein Szenario; Q-USE-20 hat Maß und Prüfverfahren.
