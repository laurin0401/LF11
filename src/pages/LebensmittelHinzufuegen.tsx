// Seite zum Hinzufügen eines neuen Lebensmittels.
// Nutzt das gemeinsame Formular-Component.

import type { LebensmittelFormDaten } from '../types/food'
import { LebensmittelFormular } from '../components/LebensmittelFormular'

interface Props {
  onSpeichern: (daten: LebensmittelFormDaten) => void
  onAbbrechen: () => void
}

export function LebensmittelHinzufuegen({ onSpeichern, onAbbrechen }: Props) {
  return (
    <section className="seite">
      <h1>Lebensmittel hinzufügen</h1>
      <LebensmittelFormular onSpeichern={onSpeichern} onAbbrechen={onAbbrechen} />
    </section>
  )
}
