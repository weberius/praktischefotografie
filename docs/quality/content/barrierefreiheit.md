# Qualität: Barrierefreiheit (content)

**Stand:** 2026-10-27. WCAG-Prüfung der SPA erfolgt im Folgeticket; hier gilt nur, was die Daten dafür bereitstellen müssen.

| ID | Szenario | Maß | Prüfverfahren | EARS |
| --- | --- | --- | --- | --- |
| Q-USE-1 | Die SPA bietet später eine textuelle Listenalternative zur Karte; dafür liefern die Daten Adressen als Text. | 100 % der Venues haben nicht leere `address.street`, `address.zip` und `address.city`. | Schema (`minLength: 1`) und Test auf `data/venues.json` | DAT-UB-2 |
