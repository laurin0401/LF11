// Dieser Hook ist die zentrale Stelle für alle Änderungen an den
// Lebensmittel-Daten. Er lädt beim Start aus dem localStorage,
// legt beim allerersten Start Beispieldaten an und speichert
// bei jeder Änderung automatisch zurück in den localStorage.

import { useEffect, useState } from 'react'
import type { Lebensmittel, LebensmittelFormDaten } from '../types/food'
import { ladeLebensmittel, speichereLebensmittel } from '../utils/storage'
import { erstelleBeispielDaten } from '../utils/beispielDaten'

export function useLebensmittel() {
  const [liste, setListe] = useState<Lebensmittel[]>([])
  const [istGeladen, setIstGeladen] = useState(false)

  // Beim ersten Rendern: aus localStorage laden.
  // Ist nichts gespeichert, werden Beispieldaten angelegt.
  useEffect(() => {
    const gespeicherteDaten = ladeLebensmittel()
    if (gespeicherteDaten.length === 0) {
      const beispiele = erstelleBeispielDaten()
      setListe(beispiele)
      speichereLebensmittel(beispiele)
    } else {
      setListe(gespeicherteDaten)
    }
    setIstGeladen(true)
  }, [])

  // Bei jeder Änderung der Liste automatisch speichern
  // (aber nicht beim allerersten leeren Zustand vor dem Laden).
  useEffect(() => {
    if (istGeladen) {
      speichereLebensmittel(liste)
    }
  }, [liste, istGeladen])

  function lebensmittelHinzufuegen(daten: LebensmittelFormDaten) {
    const neuesLebensmittel: Lebensmittel = {
      ...daten,
      id: crypto.randomUUID(),
      verbraucht: false,
      erstelltAm: new Date().toISOString(),
    }
    setListe((vorherigeListe) => [...vorherigeListe, neuesLebensmittel])
  }

  function lebensmittelBearbeiten(id: string, daten: LebensmittelFormDaten) {
    setListe((vorherigeListe) =>
      vorherigeListe.map((eintrag) =>
        eintrag.id === id ? { ...eintrag, ...daten } : eintrag,
      ),
    )
  }

  function lebensmittelAlsVerbrauchtMarkieren(id: string) {
    setListe((vorherigeListe) =>
      vorherigeListe.map((eintrag) =>
        eintrag.id === id ? { ...eintrag, verbraucht: true } : eintrag,
      ),
    )
  }

  function lebensmittelLoeschen(id: string) {
    setListe((vorherigeListe) =>
      vorherigeListe.filter((eintrag) => eintrag.id !== id),
    )
  }

  return {
    liste,
    istGeladen,
    lebensmittelHinzufuegen,
    lebensmittelBearbeiten,
    lebensmittelAlsVerbrauchtMarkieren,
    lebensmittelLoeschen,
  }
}
