# ADR-011: Profile der Fotograf:innen mit Wikipedia-Zusammenfassung und lokalen Portraits

**Status:** Accepted (an H2 am 2026-10-28 bestätigt)  ·  **Datum:** 2026-10-28

## Kontext
Die Personenseiten zeigen bisher Name, Kurzbiografie und Ausstellungen. Sie sollen sich an der Darstellung der Komponist:innen in klangland orientieren: Lebensdaten, Portrait mit Bildnachweis, Wikipedia-Zusammenfassung mit Quellenlink und Attribution, Liste der Ausstellungen. Bilder sollen von Wikimedia Commons stammen, verkleinert vorliegen und mit Attribution angezeigt werden. Daten liegen als JSON im Repository (ADR-001); die Webanwendung ist eine statische SPA (ADR-002).

## Entscheidung
- **Datenmodell** (optional je Person in `photographers.json`): `occupation` (Berufsbezeichnung nach Wikipedia), `life { from, to|null }`, `wikipedia { summary, sources[{ lang, url }] }`, `portrait { file, width, height, source, credit, license, licenseUrl? }` (Breite und Höhe verhindern Layoutsprünge). klangland nutzt `wikipedia { summary, url }` und `portrait { file, source, credit }`; die Erweiterung um `sources` (mehrere Sprachversionen) und `license` ist nötig, weil mehrere Sprachen genutzt werden und die Lizenz bei der Anzeige genannt werden muss.
- **Zusammenfassung in eigener Formulierung**, 40 bis 90 Wörter, Deutsch, mit Quellenlinks auf die genutzten Artikel und dem Hinweis „auf Basis der Wikipedia (CC BY-SA)“ bei der Anzeige. Keine wörtlichen Übernahmen größerer Passagen.
- **Portraits lokal** unter `data/portraits/<id>.<ext>`, höchstens 400 px breit und 200 kB groß; der Build kopiert sie nach `portraits/`. Nur frei lizenzierte Bilder (CC0, CC BY, CC BY-SA, gemeinfrei) mit Urheber und Dateiseite auf Commons; ohne Nachweis kein Bild.
- **Attribution bei der Anzeige:** Bildnachweis (Urheber, Lizenz, Link zur Dateiseite) als sichtbarer Text unter dem Bild; Quellenlinks und CC-BY-SA-Hinweis im Abschnitt „Aus der Wikipedia“.
- **Namen in Ausstellungsbeschreibungen:** Der Validator verlangt, dass die `description` einer Ausstellung die Namen aller verknüpften Personen nennt (PRF-UB-4). Bestehende Daten werden migriert.
- **Eindeutigkeit:** Personennamen sind (normalisiert) eindeutig.
- **Wer erfasst wird:** Personen, deren Bilder in der Ausstellung gezeigt werden; Kurator:innen, Sammler:innen und Musiker:innen nicht (Redaktionsregel, vom Skill beachtet und bei der Freigabe geprüft).

## Alternativen
- **Hotlinking der Commons-Bilder:** Kein Speicherbedarf, aber Abhängigkeit von Wikimedia zur Laufzeit, Datenschutz (fremde Hosts, Q-SEC-2) und fehlende Verkleinerung.
- **Wikipedia-Text direkt übernehmen:** Weniger Aufwand, aber lange Fremdtexte (CC BY-SA) und keine einheitliche Länge.
- **Nur deutsche Wikipedia (wie klangland):** Viele internationale Fotograf:innen haben dort keinen Artikel.
- **Profile in eigener Datei `profiles.json`:** Trennt Stammdaten und Profil, verdoppelt aber IDs und Referenzprüfungen.

## Konsequenzen
- Schema, Validator (Portraitdateien, Größe, Namen, Beschreibung), Sync (Portraits kopieren), Webanwendung und Tests sind betroffen.
- Das Repository wächst um Bilddateien (bei 100 Personen höchstens ca. 20 MB); GitHub Pages liefert sie mit aus.
- Die Lizenzpflicht (Namensnennung, Lizenzangabe, Link) ist Teil der Qualitätsanforderungen (Q-DATA-7, Q-USE-5).
- Bestehende Ausstellungen mit Personen müssen ihre Beschreibung anpassen (sechs im Bestand).

## Auswirkungen
- EARS: PRF-UB-1 bis PRF-UB-5, PRF-UN-1, PRF-UN-2, PHO-UB-5 bis PHO-UB-9, PHO-ST-2, PHO-UN-1, UPD-UB-9, SKL-UB-7; Supersede PHO-UB-2
- Features: `content/fotografinnen-profile.feature`, `web/fotografinnen.feature`, `setup/datenaktualisierung.feature`, `setup/update-skill.feature`
- Quality: Q-DATA-7, Q-DATA-8, Q-DATA-9, Q-PERF-6, Q-USE-5, Q-SEC-2
