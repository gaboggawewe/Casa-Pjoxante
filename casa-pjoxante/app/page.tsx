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

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <main>
        <HeroSection />
        <ProjectsSection />
        <AboutSection />
        <CoursesSection />
        <BlogSection />
        <ServicesSection />
      </main>

      <Footer />
      
      {/* Fixed Elements */}
      <DonationButton href="https://donorbox.org/casa-pjoxante" />
      <ChatWidget />
    </div>
  )
}
