import { AboutSection } from "./components/AboutSection";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { Reading } from "./components/Reading";


/** Página pública de presentación. La ve quien todavía no ha iniciado sesión. */
export function LandingPage() {
  return (
    // El mismo fondo que el login y el panel, para que la marca se sienta una sola.
    <div className="bg-linear-to-b from-mist-700 to-teal-950 flex flex-1 flex-col">
      <Header />

      <main className="flex-1">
        <Hero />
        <AboutSection />
        <Reading />
      </main>

      <Footer />
    </div>
  )
}
