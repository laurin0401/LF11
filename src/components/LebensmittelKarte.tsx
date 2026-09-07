// Zeigt ein einzelnes Lebensmittel als Karte an, inklusive
// Status, Hinweistext und den Aktions-Buttons.

import type { Lebensmittel } from '../types/food'
import { berechneStatus, hinweisFuerDatumsart, tageBisDatum } from '../utils/status'
import { StatusBadge } from './StatusBadge'
import { HinweisBox } from './HinweisBox'
import { Button } from './Button'

interface Props {
  lebensmittel: Lebensmittel
  onBearbeiten: (lebensmittel: Lebensmittel) => void
  onVerbraucht: (lebensmittel: Lebensmittel) => void
  onLoeschen: (lebensmittel: Lebensmittel) => void
}

const lagerortText: Record<Lebensmittel['lagerort'], string> = {
  Kühlschrank: 'Kühlschrank',
  Gefrierfach: 'Gefrierfach',
  Vorratsschrank: 'Vorratsschrank',
}

export function LebensmittelKarte({
  lebensmittel,
  onBearbeiten,
  onVerbraucht,
  onLoeschen,
}: Props) {
  const status = berechneStatus(lebensmittel)
  const tage = tageBisDatum(lebensmittel.datum)
  const hinweis = hinweisFuerDatumsart(lebensmittel.datumsart)

  return (
    <article className="karte">
      <div className="karte__kopf">
        <h3 className="karte__titel">{lebensmittel.name}</h3>
        <StatusBadge status={status} />
      </div>

      <dl className="karte__details">
        <div className="karte__zeile">
          <dt>Menge</dt>
          <dd>
            {lebensmittel.menge} {lebensmittel.einheit}
          </dd>
        </div>
        <div className="karte__zeile">
          <dt>Kategorie</dt>
          <dd>{lebensmittel.kategorie}</dd>
        </div>
        <div className="karte__zeile">
          <dt>Lagerort</dt>
          <dd>{lagerortText[lebensmittel.lagerort]}</dd>
        </div>
        <div className="karte__zeile">
          <dt>{lebensmittel.datumsart}</dt>
          <dd>
            {lebensmittel.datum}
            {!lebensmittel.verbraucht && (
              <span className="karte__tage">
                {' '}
                ({tage >= 0 ? `noch ${tage} Tag(e)` : `${Math.abs(tage)} Tag(e) überfällig`})
              </span>
            )}
          </dd>
        </div>
        {lebensmittel.notiz && (
          <div className="karte__zeile">
            <dt>Notiz</dt>
            <dd>{lebensmittel.notiz}</dd>
          </div>
        )}
      </dl>

      {!lebensmittel.verbraucht && <HinweisBox text={hinweis} />}

      {!lebensmittel.verbraucht && (
        <div className="karte__aktionen">
          <Button variante="primaer" onClick={() => onVerbraucht(lebensmittel)}>
            Verbraucht
          </Button>
          <Button variante="sekundaer" onClick={() => onBearbeiten(lebensmittel)}>
            Bearbeiten
          </Button>
          <Button variante="gefahr" onClick={() => onLoeschen(lebensmittel)}>
            Löschen
          </Button>
        </div>
      )}
    </article>
  )
}
