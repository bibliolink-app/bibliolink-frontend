import logo from '../../../assets/bibliolink.jpeg'
import data from '../data.json'

/** Primera pantalla: presenta la marca. El acceso al login vive en la cabecera. */
export function Hero() {
  return (
    <section className="mx-auto grid w-full max-w-6xl items-center gap-10 px-4 py-20 sm:py-28 md:grid-cols-2">
      <div>
        <h1 className="font-serif text-4xl font-bold tracking-wide text-stone-100 sm:text-6xl">
          {data.hero.title}
        </h1>

        <p className="mt-4 font-serif text-xl text-yellow-500 sm:text-2xl">{data.hero.subtitle}</p>

        <p className="mt-6 max-w-prose text-lg text-stone-300">{data.hero.description}</p>
      </div>

      {/* Logotipo decorativo: el nombre de la marca ya aparece en el título. */}
      <div className="hidden place-items-center md:grid">
        <img
          src={logo}
          alt=""
          aria-hidden
          className="aspect-square w-full max-w-xs rounded-full object-cover shadow-2xl shadow-black/40 ring-4 ring-yellow-600/30"
        />
      </div>
    </section>
  )
}
