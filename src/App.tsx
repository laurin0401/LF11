// Hauptkomponente der App. Steuert die einfache Navigation
// zwischen den vier "Seiten" (Dashboard, Hinzufügen, Übersicht, Archiv).
// Es wird bewusst KEIN Router verwendet, um den Prototyp einfach zu halten.

import { useState } from 'react'
import { useLebensmittel } from './hooks/useLebensmittel'
import { Dashboard } from './pages/Dashboard'
import { LebensmittelHinzufuegen } from './pages/LebensmittelHinzufuegen'
import { Uebersicht } from './pages/Uebersicht'
import { Archiv } from './pages/Archiv'

type Seite = 'dashboard' | 'hinzufuegen' | 'uebersicht' | 'archiv'

function App() {
  const [aktiveSeite, setAktiveSeite] = useState<Seite>('dashboard')

  const {
    liste,
    istGeladen,
    lebensmittelHinzufuegen,
    lebensmittelBearbeiten,
    lebensmittelAlsVerbrauchtMarkieren,
    lebensmittelLoeschen,
  } = useLebensmittel()

  const aktiveLebensmittel = liste.filter((lm) => !lm.verbraucht)
  const archivierteLebensmittel = liste.filter((lm) => lm.verbraucht)

  if (!istGeladen) {
    return <p className="app__laedt">Lade Daten...</p>
  }

  return (
    <div className="app">
      <header className="app__kopf">
        <h1 className="app__logo">FreshTrack</h1>
        <p className="app__slogan">Weniger wegwerfen. Weniger doppelt kaufen.</p>
      </header>

      <main className="app__inhalt">
        {aktiveSeite === 'dashboard' && (
          <Dashboard
            aktiveLebensmittel={aktiveLebensmittel}
            onLebensmittelHinzufuegen={() => setAktiveSeite('hinzufuegen')}
          />
        )}

        {aktiveSeite === 'hinzufuegen' && (
          <LebensmittelHinzufuegen
            onSpeichern={(daten) => {
              lebensmittelHinzufuegen(daten)
              setAktiveSeite('uebersicht')
            }}
            onAbbrechen={() => setAktiveSeite('dashboard')}
          />
        )}

        {aktiveSeite === 'uebersicht' && (
          <Uebersicht
            aktiveLebensmittel={aktiveLebensmittel}
            onBearbeiten={lebensmittelBearbeiten}
            onVerbraucht={lebensmittelAlsVerbrauchtMarkieren}
            onLoeschen={lebensmittelLoeschen}
          />
        )}

        {aktiveSeite === 'archiv' && (
          <Archiv archivierteLebensmittel={archivierteLebensmittel} />
        )}
      </main>

      <nav className="app__navigation">
        <button
          className={aktiveSeite === 'dashboard' ? 'nav-btn nav-btn--aktiv' : 'nav-btn'}
          onClick={() => setAktiveSeite('dashboard')}
        >
          Übersicht heute
        </button>
        <button
          className={aktiveSeite === 'uebersicht' ? 'nav-btn nav-btn--aktiv' : 'nav-btn'}
          onClick={() => setAktiveSeite('uebersicht')}
        >
          Lebensmittel
        </button>
        <button
          className={aktiveSeite === 'hinzufuegen' ? 'nav-btn nav-btn--aktiv' : 'nav-btn'}
          onClick={() => setAktiveSeite('hinzufuegen')}
        >
          Hinzufügen
        </button>
        <button
          className={aktiveSeite === 'archiv' ? 'nav-btn nav-btn--aktiv' : 'nav-btn'}
          onClick={() => setAktiveSeite('archiv')}
        >
          Archiv
        </button>
      </nav>
    </div>
  )
}

export default App
