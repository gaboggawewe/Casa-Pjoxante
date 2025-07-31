import { Navbar } from "@/components/ui/navbar"
import { HeroSection } from "@/components/sections/hero-section"
import { ChatSection } from "@/components/sections/chat-section"
import { ProjectsSection } from "@/components/sections/projects-section"
import { AboutSection } from "@/components/sections/about-section"
import { ValoresSection } from "@/components/sections/values-section"
import { CoursesSection } from "@/components/sections/courses-section"
import { BlogSection } from "@/components/sections/blog-section"
import { ServicesSection } from "@/components/sections/services-section"
import { Footer } from "@/components/ui/footer"
import { DonationButton } from "@/components/ui/donation-button"
import { AnimatedSection } from "@/components/ui/animated-section"

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="-mt-16">
        <AnimatedSection direction="up">
          <div id="inicio">
            <HeroSection />
          </div>
        </AnimatedSection>
        <AnimatedSection direction="up">
          <div id="chat">
            <ChatSection />
          </div>
        </AnimatedSection>
        <AnimatedSection direction="up">
          <div id="sobre-la-casa">
            <AboutSection />
          </div>
        </AnimatedSection>
        <AnimatedSection direction="up">
          <div id="valores">
            <ValoresSection />
          </div>
        </AnimatedSection>
        <AnimatedSection direction="up">
          <div id="pack">
            <ProjectsSection />
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

      <AnimatedSection>
        <div id="contacto">
          <Footer />
        </div>
      </AnimatedSection>
      
      {/* Fixed Elements */}
      <DonationButton href="https://donorbox.org/casa-pjoxante" />
    </div>
  )
}
