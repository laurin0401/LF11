// Formular zum Hinzufügen ODER Bearbeiten eines Lebensmittels.
// Wird sowohl auf der "Hinzufügen"-Seite als auch beim Bearbeiten
// aus der Übersicht verwendet (per Prop "bestehendesLebensmittel").

import { useState } from 'react'
import type { FormEvent } from 'react'
import type {
  Datumsart,
  Lagerort,
  Lebensmittel,
  LebensmittelFormDaten,
} from '../types/food'
import { hinweisFuerDatumsart } from '../utils/status'
import { HinweisBox } from './HinweisBox'
import { Button } from './Button'

interface Props {
  bestehendesLebensmittel?: Lebensmittel
  onSpeichern: (daten: LebensmittelFormDaten) => void
  onAbbrechen: () => void
}

// Fehlermeldungen pro Feldname, leer = kein Fehler
interface Fehler {
  name?: string
  menge?: string
  datum?: string
}

const leeresFormular: LebensmittelFormDaten = {
  name: '',
  menge: 1,
  einheit: 'Stück',
  kategorie: '',
  lagerort: 'Kühlschrank',
  datumsart: 'MHD',
  datum: '',
  notiz: '',
}

export function LebensmittelFormular({
  bestehendesLebensmittel,
  onSpeichern,
  onAbbrechen,
}: Props) {
  const [formular, setFormular] = useState<LebensmittelFormDaten>(
    bestehendesLebensmittel
      ? {
          name: bestehendesLebensmittel.name,
          menge: bestehendesLebensmittel.menge,
          einheit: bestehendesLebensmittel.einheit,
          kategorie: bestehendesLebensmittel.kategorie,
          lagerort: bestehendesLebensmittel.lagerort,
          datumsart: bestehendesLebensmittel.datumsart,
          datum: bestehendesLebensmittel.datum,
          notiz: bestehendesLebensmittel.notiz ?? '',
        }
      : leeresFormular,
  )
  const [fehler, setFehler] = useState<Fehler>({})

  function pruefeFormular(): Fehler {
    const neueFehler: Fehler = {}

    if (formular.name.trim() === '') {
      neueFehler.name = 'Bitte gib einen Namen ein.'
    }
    if (!(formular.menge > 0)) {
      neueFehler.menge = 'Die Menge muss größer als 0 sein.'
    }
    if (formular.datum.trim() === '') {
      neueFehler.datum = 'Bitte wähle ein Datum aus.'
    }

    return neueFehler
  }

  function handleSubmit(event: FormEvent) {
    event.preventDefault()
    const neueFehler = pruefeFormular()
    setFehler(neueFehler)

    if (Object.keys(neueFehler).length === 0) {
      onSpeichern(formular)
    }
  }

  return (
    <form className="formular" onSubmit={handleSubmit}>
      <div className="formular__feld">
        <label htmlFor="name">Name *</label>
        <input
          id="name"
          type="text"
          value={formular.name}
          onChange={(e) => setFormular({ ...formular, name: e.target.value })}
          placeholder="z. B. Vollmilch"
        />
        {fehler.name && <p className="formular__fehler">{fehler.name}</p>}
      </div>

      <div className="formular__reihe">
        <div className="formular__feld">
          <label htmlFor="menge">Menge *</label>
          <input
            id="menge"
            type="number"
            min={0}
            step="any"
            value={formular.menge}
            onChange={(e) =>
              setFormular({ ...formular, menge: Number(e.target.value) })
            }
          />
          {fehler.menge && <p className="formular__fehler">{fehler.menge}</p>}
        </div>

        <div className="formular__feld">
          <label htmlFor="einheit">Einheit</label>
          <input
            id="einheit"
            type="text"
            value={formular.einheit}
            onChange={(e) => setFormular({ ...formular, einheit: e.target.value })}
            placeholder="z. B. g, kg, Stück, Liter"
          />
        </div>
      </div>

      <div className="formular__feld">
        <label htmlFor="kategorie">Kategorie</label>
        <input
          id="kategorie"
          type="text"
          value={formular.kategorie}
          onChange={(e) => setFormular({ ...formular, kategorie: e.target.value })}
          placeholder="z. B. Gemüse, Milchprodukte"
        />
      </div>

      <div className="formular__feld">
        <label htmlFor="lagerort">Lagerort</label>
        <select
          id="lagerort"
          value={formular.lagerort}
          onChange={(e) =>
            setFormular({ ...formular, lagerort: e.target.value as Lagerort })
          }
        >
          <option value="Kühlschrank">Kühlschrank</option>
          <option value="Gefrierfach">Gefrierfach</option>
          <option value="Vorratsschrank">Vorratsschrank</option>
        </select>
      </div>

      <div className="formular__reihe">
        <div className="formular__feld">
          <label htmlFor="datumsart">Datumsart</label>
          <select
            id="datumsart"
            value={formular.datumsart}
            onChange={(e) =>
              setFormular({ ...formular, datumsart: e.target.value as Datumsart })
            }
          >
            <option value="MHD">MHD (Mindesthaltbarkeitsdatum)</option>
            <option value="Verbrauchsdatum">Verbrauchsdatum</option>
          </select>
        </div>

        <div className="formular__feld">
          <label htmlFor="datum">Datum *</label>
          <input
            id="datum"
            type="date"
            value={formular.datum}
            onChange={(e) => setFormular({ ...formular, datum: e.target.value })}
          />
          {fehler.datum && <p className="formular__fehler">{fehler.datum}</p>}
        </div>
      </div>

      <HinweisBox text={hinweisFuerDatumsart(formular.datumsart)} />

      <div className="formular__feld">
        <label htmlFor="notiz">Notiz (optional)</label>
        <textarea
          id="notiz"
          value={formular.notiz}
          onChange={(e) => setFormular({ ...formular, notiz: e.target.value })}
          placeholder="z. B. bereits angebrochen"
        />
      </div>

      <div className="formular__aktionen">
        <Button type="button" variante="sekundaer" onClick={onAbbrechen}>
          Abbrechen
        </Button>
        <Button type="submit" variante="primaer">
          Speichern
        </Button>
      </div>
    </form>
  )
}
