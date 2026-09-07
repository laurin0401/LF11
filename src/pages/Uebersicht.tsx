// Seite mit allen aktiven Lebensmitteln: Suche, Filter, Sortierung
// und die Karten mit den Aktions-Buttons.
// Kümmert sich auch um die Bestätigungs-Dialoge (verbraucht / löschen)
// und schaltet bei "Bearbeiten" auf das Formular um.

import { useMemo, useState } from 'react'
import type { Lagerort, Lebensmittel, LebensmittelFormDaten } from '../types/food'
import { LebensmittelKarte } from '../components/LebensmittelKarte'
import { BestaetigungsDialog } from '../components/BestaetigungsDialog'
import { LebensmittelFormular } from '../components/LebensmittelFormular'

interface Props {
  aktiveLebensmittel: Lebensmittel[]
  onBearbeiten: (id: string, daten: LebensmittelFormDaten) => void
  onVerbraucht: (id: string) => void
  onLoeschen: (id: string) => void
}

type AusstehendeAktion =
  | { typ: 'verbraucht'; lebensmittel: Lebensmittel }
  | { typ: 'loeschen'; lebensmittel: Lebensmittel }
  | null

export function Uebersicht({
  aktiveLebensmittel,
  onBearbeiten,
  onVerbraucht,
  onLoeschen,
}: Props) {
  const [suchtext, setSuchtext] = useState('')
  const [lagerortFilter, setLagerortFilter] = useState<Lagerort | 'Alle'>('Alle')
  const [bearbeitetesLebensmittel, setBearbeitetesLebensmittel] =
    useState<Lebensmittel | null>(null)
  const [ausstehendeAktion, setAusstehendeAktion] = useState<AusstehendeAktion>(null)

  const gefilterteListe = useMemo(() => {
    return aktiveLebensmittel
      .filter((lebensmittel) =>
        lebensmittel.name.toLowerCase().includes(suchtext.toLowerCase()),
      )
      .filter((lebensmittel) =>
        lagerortFilter === 'Alle' ? true : lebensmittel.lagerort === lagerortFilter,
      )
      .sort((a, b) => a.datum.localeCompare(b.datum))
  }, [aktiveLebensmittel, suchtext, lagerortFilter])

  function bestaetigeAktion() {
    if (!ausstehendeAktion) return

    if (ausstehendeAktion.typ === 'verbraucht') {
      onVerbraucht(ausstehendeAktion.lebensmittel.id)
    } else {
      onLoeschen(ausstehendeAktion.lebensmittel.id)
    }
    setAusstehendeAktion(null)
  }

  // Wenn ein Lebensmittel bearbeitet wird, zeigen wir statt der Liste
  // das Formular mit den vorausgefüllten Daten an.
  if (bearbeitetesLebensmittel) {
    return (
      <section className="seite">
        <h1>Lebensmittel bearbeiten</h1>
        <LebensmittelFormular
          bestehendesLebensmittel={bearbeitetesLebensmittel}
          onSpeichern={(daten) => {
            onBearbeiten(bearbeitetesLebensmittel.id, daten)
            setBearbeitetesLebensmittel(null)
          }}
          onAbbrechen={() => setBearbeitetesLebensmittel(null)}
        />
      </section>
    )
  }

  return (
    <section className="seite">
      <h1>Lebensmittelübersicht</h1>

      <div className="filterleiste">
        <input
          type="text"
          className="filterleiste__suche"
          placeholder="Nach Name suchen..."
          value={suchtext}
          onChange={(e) => setSuchtext(e.target.value)}
          aria-label="Nach Name suchen"
        />
        <select
          className="filterleiste__auswahl"
          value={lagerortFilter}
          onChange={(e) => setLagerortFilter(e.target.value as Lagerort | 'Alle')}
          aria-label="Nach Lagerort filtern"
        >
          <option value="Alle">Alle Lagerorte</option>
          <option value="Kühlschrank">Kühlschrank</option>
          <option value="Gefrierfach">Gefrierfach</option>
          <option value="Vorratsschrank">Vorratsschrank</option>
        </select>
      </div>

      {gefilterteListe.length === 0 ? (
        <p className="dashboard__leer">Keine Lebensmittel gefunden.</p>
      ) : (
        <div className="karten-liste">
          {gefilterteListe.map((lebensmittel) => (
            <LebensmittelKarte
              key={lebensmittel.id}
              lebensmittel={lebensmittel}
              onBearbeiten={setBearbeitetesLebensmittel}
              onVerbraucht={(lm) =>
                setAusstehendeAktion({ typ: 'verbraucht', lebensmittel: lm })
              }
              onLoeschen={(lm) =>
                setAusstehendeAktion({ typ: 'loeschen', lebensmittel: lm })
              }
            />
          ))}
        </div>
      )}

      {ausstehendeAktion && (
        <BestaetigungsDialog
          titel={
            ausstehendeAktion.typ === 'verbraucht'
              ? 'Als verbraucht markieren?'
              : 'Lebensmittel löschen?'
          }
          text={
            ausstehendeAktion.typ === 'verbraucht'
              ? `"${ausstehendeAktion.lebensmittel.name}" wird ins Archiv verschoben und nicht mehr in der aktiven Liste angezeigt.`
              : `"${ausstehendeAktion.lebensmittel.name}" wird unwiderruflich gelöscht.`
          }
          onBestaetigen={bestaetigeAktion}
          onAbbrechen={() => setAusstehendeAktion(null)}
        />
      )}
    </section>
  )
}
