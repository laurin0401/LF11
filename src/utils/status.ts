// Diese Datei berechnet den Status eines Lebensmittels
// anhand des gespeicherten Datums. Reine Funktionen, kein React.

import type { Datumsart, Lebensmittel, Status } from '../types/food'

// Anzahl volle Tage zwischen heute und dem gegebenen Datum.
// Ergebnis kann negativ sein, wenn das Datum in der Vergangenheit liegt.
export function tageBisDatum(datum: string): number {
  const heute = new Date()
  heute.setHours(0, 0, 0, 0)

  const zielDatum = new Date(datum)
  zielDatum.setHours(0, 0, 0, 0)

  const millisekundenProTag = 1000 * 60 * 60 * 24
  const differenz = zielDatum.getTime() - heute.getTime()

  return Math.round(differenz / millisekundenProTag)
}

// Berechnet den Status eines Lebensmittels nach den Projekt-Regeln:
// > 5 Tage: Frisch
// 3 bis 5 Tage: Bald prüfen
// 0 bis 2 Tage (auch abgelaufen): Zeitnah verwenden oder prüfen
// Verbraucht überschreibt alles
export function berechneStatus(lebensmittel: Lebensmittel): Status {
  if (lebensmittel.verbraucht) {
    return 'Verbraucht'
  }

  const tage = tageBisDatum(lebensmittel.datum)

  if (tage > 5) {
    return 'Frisch'
  }
  if (tage >= 3 && tage <= 5) {
    return 'Bald prüfen'
  }
  // Das deckt auch bereits abgelaufene Datumswerte ab (negative Tage)
  return 'Zeitnah verwenden oder prüfen'
}

// Liefert den passenden Sicherheits-Hinweistext je Datumsart.
// Wichtig: Die App behauptet NIE, dass etwas sicher essbar ist.
export function hinweisFuerDatumsart(datumsart: Datumsart): string {
  if (datumsart === 'MHD') {
    return 'MHD ist kein automatisches Wegwerfdatum. Prüfe Aussehen, Geruch und Verpackung.'
  }
  return 'Verbrauchsdatum beachten.'
}

// CSS-Klassenname passend zum Status, für die Farbgebung
export function statusKlasse(status: Status): string {
  switch (status) {
    case 'Frisch':
      return 'status status--frisch'
    case 'Bald prüfen':
      return 'status status--bald'
    case 'Zeitnah verwenden oder prüfen':
      return 'status status--zeitnah'
    case 'Verbraucht':
      return 'status status--verbraucht'
  }
}
