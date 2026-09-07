// Einfacher Bestätigungs-Dialog (als Overlay), z.B. bevor ein
// Lebensmittel als "Verbraucht" markiert oder gelöscht wird.

import { Button } from './Button'

interface Props {
  titel: string
  text: string
  onBestaetigen: () => void
  onAbbrechen: () => void
}

export function BestaetigungsDialog({ titel, text, onBestaetigen, onAbbrechen }: Props) {
  return (
    <div className="dialog-overlay" role="dialog" aria-modal="true">
      <div className="dialog">
        <h3>{titel}</h3>
        <p>{text}</p>
        <div className="dialog__aktionen">
          <Button variante="sekundaer" onClick={onAbbrechen}>
            Abbrechen
          </Button>
          <Button variante="primaer" onClick={onBestaetigen}>
            Bestätigen
          </Button>
        </div>
      </div>
    </div>
  )
}
