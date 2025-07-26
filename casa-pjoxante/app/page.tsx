import { Navbar } from "@/components/ui/navbar"
import { HeroSection } from "@/components/sections/hero-section"
import { ProjectsSection } from "@/components/sections/projects-section"
import { AboutSection } from "@/components/sections/about-section"
import { CoursesSection } from "@/components/sections/courses-section"
import { BlogSection } from "@/components/sections/blog-section"
import { ServicesSection } from "@/components/sections/services-section"
import { Footer } from "@/components/ui/footer"
import { DonationButton } from "@/components/ui/donation-button"
import { ChatWidget } from "@/components/ui/chat-widget"
import { AnimatedSection } from "@/components/ui/animated-section"

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navbar />
      
      <main>
        <div id="inicio">
          <HeroSection />
        </div>
        <AnimatedSection direction="up">
          <div id="pack">
            <ProjectsSection />
          </div>
        </AnimatedSection>
        <AnimatedSection direction="up">
          <div id="sobre-la-casa">
            <AboutSection />
          </div>
        </AnimatedSection>
        <AnimatedSection direction="up">
          <div id="cursos">
            <CoursesSection />
          </div>
        </AnimatedSection>
        <AnimatedSection direction="up">
          <BlogSection />
        </AnimatedSection>
        <AnimatedSection direction="up">
          <div id="servicios">
            <ServicesSection />
          </div>
        </AnimatedSection>
      </main>

      <AnimatedSection delay={0.5}>
        <div id="contacto">
          <Footer />
        </div>
      </AnimatedSection>
      
      {/* Fixed Elements */}
      <DonationButton href="https://donorbox.org/casa-pjoxante" />
    </div>
  )
}
