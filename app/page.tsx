import { Header } from "@/components/header"
import { HeroSection } from "@/components/sections/hero"
import { ServicesSection } from "@/components/sections/services"
import { AboutSection } from "@/components/sections/about"
import { FeaturedProductsSection } from "@/components/sections/featured-products"
import { TestimonialsSection } from "@/components/sections/testimonials"
import { ContactSection } from "@/components/sections/contact"
import { Footer } from "@/components/footer"
import { siteConfig } from "@/lib/data"

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        {siteConfig.homepageSections.hero.enabled && <HeroSection />}
        {siteConfig.homepageSections.services.enabled && <ServicesSection />}
        {siteConfig.homepageSections.about.enabled && <AboutSection />}
        {siteConfig.homepageSections.featuredProducts.enabled && <FeaturedProductsSection />}
        {siteConfig.homepageSections.testimonials.enabled && <TestimonialsSection />}
        {siteConfig.homepageSections.contact.enabled && <ContactSection />}
      </main>
      <Footer />
    </>
  )
}
