// Kleine Hinweisbox für die Sicherheits-Hinweise zu MHD / Verbrauchsdatum.
// Wird auf der Detail-/Formular-Ansicht und in den Karten genutzt.

interface Props {
  text: string
}

export function HinweisBox({ text }: Props) {
  return (
    <p className="hinweis-box">
      <strong>Hinweis: </strong>
      {text}
    </p>
  )
}
