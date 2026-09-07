// Beispiel-Lebensmittel, die beim allerersten Start der App
// automatisch angelegt werden. Datumswerte sind relativ zu "heute",
// damit beim Testen sofort alle Status-Stufen sichtbar sind.

import type { Lebensmittel } from '../types/food'

// Hilfsfunktion: heutiges Datum + Tage, als String YYYY-MM-DD
function datumInTagen(tage: number): string {
  const datum = new Date()
  datum.setDate(datum.getDate() + tage)
  return datum.toISOString().split('T')[0]
}

export function erstelleBeispielDaten(): Lebensmittel[] {
  const jetzt = new Date().toISOString()

  return [
    {
      id: 'beispiel-1',
      name: 'Vollmilch',
      menge: 1,
      einheit: 'Liter',
      kategorie: 'Milchprodukte',
      lagerort: 'Kühlschrank',
      datumsart: 'MHD',
      datum: datumInTagen(1),
      notiz: 'Bereits angebrochen',
      verbraucht: false,
      erstelltAm: jetzt,
    },
    {
      id: 'beispiel-2',
      name: 'Hackfleisch',
      menge: 500,
      einheit: 'g',
      kategorie: 'Fleisch',
      lagerort: 'Kühlschrank',
      datumsart: 'Verbrauchsdatum',
      datum: datumInTagen(0),
      notiz: '',
      verbraucht: false,
      erstelltAm: jetzt,
    },
    {
      id: 'beispiel-3',
      name: 'Joghurt Natur',
      menge: 4,
      einheit: 'Stück',
      kategorie: 'Milchprodukte',
      lagerort: 'Kühlschrank',
      datumsart: 'MHD',
      datum: datumInTagen(4),
      notiz: '',
      verbraucht: false,
      erstelltAm: jetzt,
    },
    {
      id: 'beispiel-4',
      name: 'Karotten',
      menge: 1,
      einheit: 'kg',
      kategorie: 'Gemüse',
      lagerort: 'Kühlschrank',
      datumsart: 'MHD',
      datum: datumInTagen(9),
      notiz: '',
      verbraucht: false,
      erstelltAm: jetzt,
    },
    {
      id: 'beispiel-5',
      name: 'Tiefkühlpizza',
      menge: 2,
      einheit: 'Stück',
      kategorie: 'Fertiggerichte',
      lagerort: 'Gefrierfach',
      datumsart: 'MHD',
      datum: datumInTagen(60),
      notiz: '',
      verbraucht: false,
      erstelltAm: jetzt,
    },
    {
      id: 'beispiel-6',
      name: 'Erbsen (gefroren)',
      menge: 750,
      einheit: 'g',
      kategorie: 'Gemüse',
      lagerort: 'Gefrierfach',
      datumsart: 'MHD',
      datum: datumInTagen(120),
      notiz: '',
      verbraucht: false,
      erstelltAm: jetzt,
    },
    {
      id: 'beispiel-7',
      name: 'Reis',
      menge: 1,
      einheit: 'kg',
      kategorie: 'Trockenwaren',
      lagerort: 'Vorratsschrank',
      datumsart: 'MHD',
      datum: datumInTagen(200),
      notiz: 'Angebrochene Packung',
      verbraucht: false,
      erstelltAm: jetzt,
    },
    {
      id: 'beispiel-8',
      name: 'Kichererbsen (Dose)',
      menge: 2,
      einheit: 'Dosen',
      kategorie: 'Konserven',
      lagerort: 'Vorratsschrank',
      datumsart: 'MHD',
      datum: datumInTagen(300),
      notiz: '',
      verbraucht: false,
      erstelltAm: jetzt,
    },
    {
      id: 'beispiel-9',
      name: 'Frischkäse',
      menge: 1,
      einheit: 'Becher',
      kategorie: 'Milchprodukte',
      lagerort: 'Kühlschrank',
      datumsart: 'MHD',
      datum: datumInTagen(2),
      notiz: '',
      verbraucht: false,
      erstelltAm: jetzt,
    },
  ]
}
