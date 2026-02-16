import { Navbar } from "@/components/navbar"
import { Hero } from "@/components/hero"
import { MarqueeBanner } from "@/components/marquee-banner"
import { MenuSection } from "@/components/menu-section"
import { ExperienceSection } from "@/components/experience-section"
import { AboutSection } from "@/components/about-section"
import { LocationsSection } from "@/components/locations-section"
import { TestimonialsSection } from "@/components/testimonials-section"
import { CtaSection } from "@/components/cta-section"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <MarqueeBanner />
      <MenuSection />
      <ExperienceSection />
      <AboutSection />
      <LocationsSection />
      <TestimonialsSection />
      <CtaSection />
      <Footer />
    </main>
  )
}
