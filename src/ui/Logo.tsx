import { BookOpen } from 'lucide-react'

export function Logo({ size = 'lg' }: { size?: 'lg' | 'sm' }) {
  return (
    <div className="flex items-center gap-3">
      <BookOpen className={`text-yellow-600 ${size === 'lg' ? 'size-9' : 'size-6'}`} />
      <span className={`font-serif font-semibold tracking-wide text-stone-300 ${size === 'lg' ? 'text-4xl' : 'text-2xl'}`}>
        BiblioLink
      </span>
    </div>
  )
}
