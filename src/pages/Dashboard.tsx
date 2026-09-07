// Startseite der App: zeigt eine kurze Zusammenfassung
// und die nächsten fünf Lebensmittel, die geprüft/verwendet werden sollten.

import type { Lebensmittel } from '../types/food'
import { berechneStatus, tageBisDatum } from '../utils/status'
import { StatusBadge } from '../components/StatusBadge'
import { Button } from '../components/Button'

interface Props {
  aktiveLebensmittel: Lebensmittel[]
  onLebensmittelHinzufuegen: () => void
}

export function Dashboard({ aktiveLebensmittel, onLebensmittelHinzufuegen }: Props) {
  // Sortiere nach Datum aufsteigend und nimm die ersten 5
  const dringendeListe = [...aktiveLebensmittel]
    .sort((a, b) => a.datum.localeCompare(b.datum))
    .slice(0, 5)

  return (
    <section className="dashboard">
      <h1>Dein Überblick für heute</h1>

      <div className="dashboard__stat">
        <span className="dashboard__stat-zahl">{aktiveLebensmittel.length}</span>
        <span className="dashboard__stat-text">aktive Lebensmittel</span>
      </div>

      <h2>Zuerst verwenden oder prüfen</h2>

      {dringendeListe.length === 0 ? (
        <p className="dashboard__leer">
          Aktuell keine aktiven Lebensmittel vorhanden.
        </p>
      ) : (
        <ul className="dashboard__liste">
          {dringendeListe.map((lebensmittel) => {
            const status = berechneStatus(lebensmittel)
            const tage = tageBisDatum(lebensmittel.datum)
            return (
              <li key={lebensmittel.id} className="dashboard__eintrag">
                <div className="dashboard__eintrag-info">
                  <strong>{lebensmittel.name}</strong>
                  <span className="dashboard__eintrag-datum">
                    {lebensmittel.datumsart}: {lebensmittel.datum} (
                    {tage >= 0 ? `noch ${tage} Tag(e)` : `${Math.abs(tage)} Tag(e) überfällig`}
                    )
                  </span>
                </div>
                <StatusBadge status={status} />
              </li>
            )
          })}
        </ul>
      )}

      <Button variante="primaer" onClick={onLebensmittelHinzufuegen} className="dashboard__cta">
        Lebensmittel hinzufügen
      </Button>
    </section>
  )
}
