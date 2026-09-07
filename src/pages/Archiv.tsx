// Einfaches Archiv: zeigt alle Lebensmittel, die als "Verbraucht"
// markiert wurden. Rein informativ, keine Aktionen notwendig.

import type { Lebensmittel } from '../types/food'
import { StatusBadge } from '../components/StatusBadge'

interface Props {
  archivierteLebensmittel: Lebensmittel[]
}

export function Archiv({ archivierteLebensmittel }: Props) {
  const sortiert = [...archivierteLebensmittel].sort((a, b) =>
    b.datum.localeCompare(a.datum),
  )

  return (
    <section className="seite">
      <h1>Archiv (verbrauchte Lebensmittel)</h1>

      {sortiert.length === 0 ? (
        <p className="dashboard__leer">Noch keine verbrauchten Lebensmittel.</p>
      ) : (
        <div className="karten-liste">
          {sortiert.map((lebensmittel) => (
            <article key={lebensmittel.id} className="karte karte--archiv">
              <div className="karte__kopf">
                <h3 className="karte__titel">{lebensmittel.name}</h3>
                <StatusBadge status="Verbraucht" />
              </div>
              <dl className="karte__details">
                <div className="karte__zeile">
                  <dt>Menge</dt>
                  <dd>
                    {lebensmittel.menge} {lebensmittel.einheit}
                  </dd>
                </div>
                <div className="karte__zeile">
                  <dt>Lagerort</dt>
                  <dd>{lebensmittel.lagerort}</dd>
                </div>
                <div className="karte__zeile">
                  <dt>{lebensmittel.datumsart}</dt>
                  <dd>{lebensmittel.datum}</dd>
                </div>
              </dl>
            </article>
          ))}
        </div>
      )}
    </section>
  )
}
