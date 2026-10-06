import { Link } from 'react-router'

import bibliolinkIcon from '../../assets/bibliolink-icon.png'
import { PATHS } from '../../router'

export function Logo({ size = 'lg' }: { size?: 'lg' | 'sm' }) {
  return (
    <Link to={PATHS.landing} className="flex items-center gap-3 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-500">
      <img
        src={bibliolinkIcon}
        alt="BiblioLink"
        className={`object-contain ${size === 'lg' ? 'size-9' : 'size-6'}`}
      />
      <span className={`font-serif font-semibold tracking-wide text-stone-300 ${size === 'lg' ? 'text-4xl' : 'text-2xl'}`}>
        BiblioLink
      </span>
    </Link>
  )
}
