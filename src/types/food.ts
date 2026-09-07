// Alle Typen rund um ein Lebensmittel an einem zentralen Ort.
// So weiß jede Datei, wie ein Lebensmittel-Objekt aussieht.

// Lagerort: wo das Lebensmittel aufbewahrt wird
export type Lagerort = 'Kühlschrank' | 'Gefrierfach' | 'Vorratsschrank'

// Datumsart: MHD = Mindesthaltbarkeitsdatum, Verbrauchsdatum = muss eingehalten werden
export type Datumsart = 'MHD' | 'Verbrauchsdatum'

// Status wird automatisch aus dem Datum berechnet (siehe utils/status.ts)
export type Status =
  | 'Frisch'
  | 'Bald prüfen'
  | 'Zeitnah verwenden oder prüfen'
  | 'Verbraucht'

// Ein einzelnes Lebensmittel, wie es im localStorage gespeichert wird
export interface Lebensmittel {
  id: string
  name: string
  menge: number
  einheit: string
  kategorie: string
  lagerort: Lagerort
  datumsart: Datumsart
  datum: string // Format: YYYY-MM-DD
  notiz?: string
  verbraucht: boolean
  erstelltAm: string
}

// Werte, die im Formular eingegeben werden (id/verbraucht/erstelltAm kommen automatisch dazu)
export type LebensmittelFormDaten = Omit<
  Lebensmittel,
  'id' | 'verbraucht' | 'erstelltAm'
>
