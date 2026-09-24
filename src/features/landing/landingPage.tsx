import { AboutSection } from "./components/AboutSection";
import { BenefitsSection } from "./components/Benefits";
import { FeaturesSection } from "./components/FeatureSection";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { Reading } from "./components/Reading";


/** Página pública de presentación. La ve quien todavía no ha iniciado sesión. */
export function LandingPage() {
  return (
    <div className="flex flex-1 flex-col bg-teal-950">
      <Header />

      <main className="flex-1">
        <Hero />
        <AboutSection />
        <FeaturesSection />
        <BenefitsSection/>
        <Reading />
      </main>

      <Footer />
    </div>
  )
}