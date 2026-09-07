// Ein einfacher, wiederverwendbarer Button mit einheitlichem Stil.
// "variante" steuert nur die Farbe/Optik, keine Logik.

import type { ButtonHTMLAttributes } from 'react'

type Variante = 'primaer' | 'sekundaer' | 'gefahr'

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variante?: Variante
}

export function Button({ variante = 'sekundaer', className = '', ...rest }: Props) {
  return (
    <button
      className={`btn btn--${variante} ${className}`.trim()}
      {...rest}
    />
  )
}
