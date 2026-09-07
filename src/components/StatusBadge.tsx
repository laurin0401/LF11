// Zeigt den Status als farbiges Badge MIT Text an.
// Wichtig laut Vorgabe: Status nie nur über Farbe zeigen, immer auch als Text.

import type { Status } from '../types/food'
import { statusKlasse } from '../utils/status'

interface Props {
  status: Status
}

export function StatusBadge({ status }: Props) {
  return <span className={statusKlasse(status)}>{status}</span>
}
