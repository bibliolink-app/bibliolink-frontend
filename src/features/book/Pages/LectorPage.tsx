import { useState } from 'react'
import { Link, useParams } from 'react-router'
import { ArrowLeft, ChevronLeft, ChevronRight, CircleAlert, Crown, Heart } from 'lucide-react'

import { PATHS, rutaLibro } from '../../../router'
import { LoadingScreen } from '../../../components/ui/LoadingScreen'
import { useBook } from '../Hook/BookHook'
import { useGuardarProgreso, useReadingAccess, useReadingPage } from '../Hook/ReadingHook'
import { readingErrorMessage } from '../lib/readingErrorMessage'

const BOTON =
  'inline-flex items-center gap-1.5 rounded-md border border-yellow-600 px-4 py-2 text-sm font-semibold text-stone-300 hover:border-rose-900 hover:bg-rose-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-500 disabled:cursor-not-allowed disabled:opacity-40 motion-safe:transition-colors'

export function LectorPage() {
  const bookId = Number(useParams().bookId)
  const [paginaElegida, setPaginaElegida] = useState<number | null>(null)

  const libro = useBook(bookId)
  const acceso = useReadingAccess(bookId)
  const guardarProgreso = useGuardarProgreso(bookId)

  const estado = acceso.data?.readingState ?? null
  // `readingState` es `null` justo cuando el libro no está en favoritos,
  // que es donde vive el progreso.
  const puedeGuardar = estado !== null

  // Mientras no se navegue, se abre donde quedó la última vez.
  const paginaGuardada = Number(estado?.readingLocation) || 1
  const pagina = paginaElegida ?? paginaGuardada

  const puedeLeer = acceso.data?.canRead === true
  const contenido = useReadingPage(bookId, pagina, puedeLeer)

  const irAPagina = (nueva: number) => {
    setPaginaElegida(nueva)

    if (estado !== null) {
      guardarProgreso.mutate({
        progressPercent: estado.progressPercent,
        readingLocation: String(nueva),
      })
    }
  }

  return (
    <div className="mx-auto max-w-3xl">
      <Link
        to={bookId > 0 ? rutaLibro(bookId) : PATHS.home}
        className="mb-6 inline-flex items-center gap-1.5 text-sm font-semibold text-stone-300 hover:text-yellow-500 motion-safe:transition-colors"
      >
        <ArrowLeft className="size-4" />
        Volver al libro
      </Link>

      {libro.data && (
        <header className="mb-6">
          <h1 className="font-serif text-2xl font-semibold text-stone-100 sm:text-3xl">
            {libro.data.title}
          </h1>
          {libro.data.authors.length > 0 && (
            <p className="mt-1 text-stone-400">{libro.data.authors.join(', ')}</p>
          )}
        </header>
      )}

      {acceso.isPending && <LoadingScreen />}

      {acceso.isError && (
        <div
          role="alert"
          className="flex items-start gap-2.5 rounded-xl border border-rose-300 bg-rose-100 px-4 py-3.5 text-rose-900"
        >
          <CircleAlert className="mt-0.5 size-5 shrink-0" />
          <p>{readingErrorMessage(acceso.error)}</p>
        </div>
      )}

      {acceso.data && !acceso.data.canRead && (
        <div className="rounded-2xl border border-yellow-600/40 bg-yellow-600/10 px-5 py-8 text-center">
          <Crown className="mx-auto size-8 text-yellow-500" />
          <p className="mt-3 font-serif text-xl font-semibold text-stone-100">
            {acceso.data.requiresReward
              ? 'Se agotó tu tiempo de lectura gratuito'
              : 'No puedes leer este libro ahora'}
          </p>
          <p className="mt-2 text-stone-300">
            {acceso.data.requiresReward
              ? 'Vuelve más tarde o hazte Premium para leer sin interrupciones.'
              : 'Revisa tu plan o inténtalo de nuevo más tarde.'}
          </p>

          <Link
            to={PATHS.subscribe}
            className="mt-6 inline-flex items-center gap-2 rounded-md bg-yellow-600 px-5 py-2.5 font-serif font-bold tracking-wide text-stone-900 shadow-md shadow-black/25 hover:bg-yellow-800 hover:text-stone-300 motion-safe:transition-colors"
          >
            <Crown className="size-5" />
            Ver Premium
          </Link>
        </div>
      )}

      {puedeLeer && (
        <>
          {!puedeGuardar && (
            <p className="mb-5 flex items-start gap-2.5 rounded-xl border border-yellow-600/40 bg-yellow-600/10 px-4 py-3 text-sm text-stone-300">
              <Heart className="mt-0.5 size-4 shrink-0 text-yellow-500" />
              Guarda este libro en favoritos para retomar la lectura donde la dejaste.
            </p>
          )}

          {contenido.isPending && <LoadingScreen />}

          {contenido.isError && (
            <div
              role="alert"
              className="flex items-start gap-2.5 rounded-xl border border-rose-300 bg-rose-100 px-4 py-3.5 text-rose-900"
            >
              <CircleAlert className="mt-0.5 size-5 shrink-0" />
              <p>{readingErrorMessage(contenido.error)}</p>
            </div>
          )}

          {contenido.data && (
            <>
              {/* El backend saneó este HTML con lista blanca: solo etiquetas de
                  texto y ningún atributo. Por eso se puede insertar tal cual. */}
              <article
                className="rounded-2xl bg-stone-100 px-6 py-8 text-stone-900 shadow-lg shadow-black/25 sm:px-10 sm:py-12 [&_blockquote]:my-4 [&_blockquote]:border-l-4 [&_blockquote]:border-yellow-600/50 [&_blockquote]:pl-4 [&_blockquote]:italic [&_h1]:mt-8 [&_h1]:mb-4 [&_h1]:font-serif [&_h1]:text-2xl [&_h1]:font-bold [&_h2]:mt-8 [&_h2]:mb-3 [&_h2]:font-serif [&_h2]:text-xl [&_h2]:font-bold [&_h3]:mt-6 [&_h3]:mb-2 [&_h3]:font-serif [&_h3]:text-lg [&_h3]:font-semibold [&_hr]:my-8 [&_hr]:border-stone-300 [&_li]:mb-1 [&_ol]:mb-4 [&_ol]:list-decimal [&_ol]:pl-6 [&_p]:mb-4 [&_p]:leading-relaxed [&_ul]:mb-4 [&_ul]:list-disc [&_ul]:pl-6"
                dangerouslySetInnerHTML={{ __html: contenido.data.content }}
              />

              <nav
                aria-label="Páginas del libro"
                className="mt-8 flex items-center justify-center gap-5"
              >
                <button
                  type="button"
                  onClick={() => irAPagina(Math.max(1, pagina - 1))}
                  disabled={pagina === 1}
                  className={BOTON}
                >
                  <ChevronLeft className="size-4" />
                  Anterior
                </button>

                <p className="text-sm text-stone-400">Página {contenido.data.pageNumber}</p>

                <button
                  type="button"
                  onClick={() => irAPagina(pagina + 1)}
                  disabled={!contenido.data.hasNextPage}
                  className={BOTON}
                >
                  Siguiente
                  <ChevronRight className="size-4" />
                </button>
              </nav>
            </>
          )}
        </>
      )}
    </div>
  )
}