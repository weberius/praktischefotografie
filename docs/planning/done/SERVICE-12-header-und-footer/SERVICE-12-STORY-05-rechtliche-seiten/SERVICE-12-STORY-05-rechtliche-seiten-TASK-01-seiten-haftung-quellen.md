# SERVICE-12-STORY-05-TASK-01 – Seiten Haftungsausschluss und Quellen & Lizenzen
- **Status:** Umgesetzt
- **Story:** STORY-05
- **EARS:** RCH-UB-2, RCH-UB-4, RCH-UB-5, NAV-UB-7, NAV-UB-3
- **Gherkin:** `web/rechtliches.feature` · Haftungsausschluss mit drei Abschnitten, Quellen und Lizenzen, Keine Reste von Klangland; `web/navigation.feature` · Jede Adresse zeigt ihre Seite
- **Quality:** Q-USE-14, Q-SEO-2, Q-SEO-3
- **ADR:** ADR-002, ADR-011, ADR-012
- **Aufgabe:** Komponenten `haftungsausschluss` und `quellen` mit Route, Titel, Meta-Beschreibung; Texte aus Klangland auf diese Anwendung zugeschnitten, Quellenliste mit `data/` und `web/package.json` abgleichen (Wikimedia, Wikidata, OpenStreetMap, Leaflet, Orts- und Veranstalter-Webseiten); Hinweis aus dem bisherigen Impressum in den Haftungsausschluss; Prerender über `**` und Sitemap prüfen.
- **Prüfkriterium:** Komponententests (Abschnitte, Quellen genannt, keine Klangland-Begriffe, Titel eindeutig); Adresse in `ADDRESSES` von `app.spec.ts`; Build enthält `haftungsausschluss/index.html` und `quellen/index.html` und die Sitemap nennt sie; Prüf-Gate grün.
