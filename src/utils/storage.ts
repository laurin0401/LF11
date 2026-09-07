// Diese Datei kapselt den Zugriff auf den localStorage.
// So greift der Rest der App nie direkt auf localStorage zu,
// sondern nur über diese zwei Funktionen.

import type { Lebensmittel } from '../types/food'

const STORAGE_KEY = 'freshtrack_lebensmittel'

// Lädt alle Lebensmittel aus dem localStorage.
// Gibt ein leeres Array zurück, falls noch nichts gespeichert ist
// oder die Daten beschädigt sind.
export function ladeLebensmittel(): Lebensmittel[] {
  try {
    const rohdaten = localStorage.getItem(STORAGE_KEY)
    if (!rohdaten) {
      return []
    }
    const daten = JSON.parse(rohdaten) as Lebensmittel[]
    return Array.isArray(daten) ? daten : []
  } catch (fehler) {
    console.error('Fehler beim Laden aus localStorage:', fehler)
    return []
  }
}

// Speichert die komplette Liste der Lebensmittel im localStorage.
export function speichereLebensmittel(liste: Lebensmittel[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(liste))
  } catch (fehler) {
    console.error('Fehler beim Speichern in localStorage:', fehler)
  }
}
