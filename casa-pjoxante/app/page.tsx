"use client"

import { useEffect } from "react"
import { usePathname } from "next/navigation"
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
import { useSmoothScroll } from "@/hooks/use-smooth-scroll"
import { useBlogCache } from "@/hooks/use-blog-cache"

export default function Home() {
  const { scrollToSection } = useSmoothScroll()
  const { preloadBlogData } = useBlogCache()
  const pathname = usePathname()
  
  useEffect(() => {
    // Solo ejecutar en la página principal
    if (pathname !== '/') return
    
    // Precargar datos del blog después de 1 segundo para navegación instantánea
    const preloadTimer = setTimeout(() => {
      preloadBlogData()
    }, 1000)
    
    // Verificar si hay un hash en la URL al cargar la página
    const hash = window.location.hash
    if (hash) {
      const sectionId = hash.substring(1)
      // Hacer scroll después de que la página se haya cargado completamente
      setTimeout(() => {
        scrollToSection(sectionId)
      }, 500)
    }
    
    return () => clearTimeout(preloadTimer)
  }, [scrollToSection, pathname, preloadBlogData])
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
          <div id="publicaciones">
            <BlogSection showHeader={true} maxPosts={4} />
          </div>
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
