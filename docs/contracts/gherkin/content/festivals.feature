# language: de
Funktionalität: Veranstalter und Festivals

  # EARS: FES-UB-1
  Szenario: Veranstalter mit Kurzbeschreibung
    Angenommen ein Veranstalter "photoszene-koeln" mit Beschreibung und Instagram-Name "photoszene_koeln"
    Wenn die Daten validiert werden
    Dann besteht die Validierung

  # EARS: FES-UB-2
  Szenario: Festival ist vollständig
    Angenommen ein Festival "photoszene-festival-2027" des Veranstalters "photoszene-koeln" mit Titel, Zeitraum und Stadt
    Wenn die Daten validiert werden
    Dann besteht die Validierung
    Aber ohne "title" meldet die Validierung einen Fehler für das Festival

  # EARS: FES-UN-1
  Szenario: Festival mit ungültigem Zeitraum
    Angenommen ein Festival mit Enddatum vor dem Startdatum
    Wenn die Daten validiert werden
    Dann meldet die Validierung einen Fehler für "endDate"

  # EARS: FES-UN-1
  Szenario: Festival mit unbekanntem Veranstalter
    Angenommen ein Festival mit "organizerId" "gibt-es-nicht"
    Wenn die Daten validiert werden
    Dann meldet die Validierung eine unbekannte Referenz "gibt-es-nicht"

  # EARS: FES-UB-3
  Szenario: Ausstellung gehört zu einem Festival
    Angenommen eine Ausstellung im Ort "michael-horbach-stiftung" mit "festivalId" "photoszene-festival-2027"
    Wenn die Daten validiert werden
    Dann besteht die Validierung

  # EARS: FES-UN-2
  Szenario: Ausstellung mit unbekanntem Festival
    Angenommen eine Ausstellung mit "festivalId" "gibt-es-nicht"
    Wenn die Daten validiert werden
    Dann meldet die Validierung eine unbekannte Referenz "gibt-es-nicht"

  # EARS: FES-OP-1
  Szenario: Offizieller Partner ohne Festival
    Angenommen eine Ausstellung mit "isOfficialFestivalPartner" "true" ohne "festivalId"
    Wenn die Daten validiert werden
    Dann meldet die Validierung einen Fehler für "isOfficialFestivalPartner"

  # EARS: FES-UB-4
  Szenario: Festivals im Build
    Angenommen ein Datenbestand mit einem Festival
    Wenn die Daten für die Webanwendung zusammengeführt werden
    Dann enthält "data/festivals.json" das Festival
    Und das zusammengeführte Ergebnis ist valide

  # EARS: FES-UN-3
  Szenario: Gleiche ID bei Ort und Veranstalter
    Angenommen ein Venue und ein Veranstalter mit der id "photoszene-koeln"
    Wenn die Daten validiert werden
    Dann meldet die Validierung eine doppelte id "photoszene-koeln"
