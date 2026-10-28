import { Link } from 'react-router'

import bibliolinkIcon from '../../assets/bibliolink-icon.png'
import { PATHS } from '../../router'

interface LogoProps {
  size?: 'lg' | 'sm'
  asLink?: boolean
  /** `claro` para fondos oscuros, `oscuro` para fondos claros. */
  tono?: 'claro' | 'oscuro'
  /** En pantallas angostas deja solo el icono: el nombre no cabe junto al resto de la barra. */
  soloIconoEnMovil?: boolean
}

export function Logo({
  size = 'lg',
  asLink = true,
  tono = 'claro',
  soloIconoEnMovil = false,
}: LogoProps) {
  const content = (
    <>
      <img
        src={bibliolinkIcon}
        alt="BiblioLink"
        className={`object-contain ${size === 'lg' ? 'size-9' : 'size-6'}`}
      />
      <span
        className={`font-serif font-semibold tracking-wide ${
          tono === 'claro' ? 'text-stone-300' : 'text-teal-950'
        } ${size === 'lg' ? 'text-4xl' : 'text-2xl'} ${soloIconoEnMovil ? 'hidden sm:inline' : ''}`}
      >
        BiblioLink
      </span>
    </>
  )

  if (!asLink) {
    return <div className="flex items-center gap-3">{content}</div>
  }

  return (
    <Link to={PATHS.landing} className="flex items-center gap-3 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-500">
      {content}
    </Link>
  )
}
