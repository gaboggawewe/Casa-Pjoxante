"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { SectionContainer } from "@/components/ui/section-container"
import { PhotoCarousel, type CarouselImage } from "@/components/ui/photo-carousel"
import { COMPONENT_SIZES } from "@/lib/constants"

interface ProjectsSectionProps {
  className?: string
}

const ProjectsSection = React.forwardRef<HTMLElement, ProjectsSectionProps>(
  ({ className }, ref) => {
    // Mock project images - replace with real data
    const projectImages: CarouselImage[] = [
      {
        src: "/FotosCasaPjoxante/IMG_2150.JPG",
        alt: "Taller de arte comunitario",
        title: "Taller de Arte Comunitario",
        description: "Fortaleciendo la identidad cultural a través del arte y la expresión creativa."
      },
      {
        src: "/FotosCasaPjoxante/IMG_2163.JPG",
        alt: "Programa de educación ambiental",
        title: "Educación Ambiental",
        description: "Promoviendo prácticas sostenibles y cuidado del medio ambiente."
      },
      {
        src: "/FotosCasaPjoxante/pjoxante_about.jpeg", 
        alt: "Capacitación en salud comunitaria",
        title: "Salud Comunitaria",
        description: "Empoderando a las comunidades con conocimientos de salud preventiva."
      },
      {
        src: "/FotosCasaPjoxante/WhatsApp Image 2024-08-19 at 22.07.34 (2).jpeg",
        alt: "Huerto urbano comunitario",
        title: "Huertos Urbanos",
        description: "Construyendo soberanía alimentaria y espacios de encuentro."
      },
      {
        src: "/FotosCasaPjoxante/WhatsApp Image 2024-08-19 at 22.07.35 (1).jpeg",
        alt: "Biblioteca comunitaria",
        title: "Biblioteca Comunitaria",
        description: "Democratizando el acceso al conocimiento y la educación."
      }
    ]

    return (
      <SectionContainer
        ref={ref}
        className={cn(className)}
        padding="xl"
      >
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className={cn(
            "font-bold text-pjoxante-green font-cerco mb-4",
            COMPONENT_SIZES.section.title
          )}>
            Proyectos en Acción
          </h2>
          <p className={cn(
            "text-gray-600 font-century max-w-3xl mx-auto",
            COMPONENT_SIZES.section.subtitle
          )}>
            Conoce algunos de los proyectos y actividades que desarrollamos junto a las comunidades 
            para construir un futuro más justo y sostenible
          </p>
        </div>

        {/* Carousel */}
        <div className="max-w-4xl mx-auto">
          <PhotoCarousel
            images={projectImages}
            autoPlay={true}
            autoPlayInterval={5000}
            showIndicators={true}
            showArrows={false}
            className="shadow-xl hover:shadow-2xl hover:-translate-y-0.5 transition-all duration-300"
          />
        </div>

        {/* Additional Info */}
        <div className="mt-12 text-center">
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="space-y-2">
              <div className="text-2xl font-bold text-pjoxante-green">25+</div>
              <div className="text-gray-600 text-sm">Proyectos activos</div>
            </div>
            <div className="space-y-2">  
              <div className="text-2xl font-bold text-pjoxante-green">8</div>
              <div className="text-gray-600 text-sm">Comunidades atendidas</div>
            </div>
            <div className="space-y-2">
              <div className="text-2xl font-bold text-pjoxante-green">500+</div>
              <div className="text-gray-600 text-sm">Personas beneficiadas</div>
            </div>
          </div>
        </div>
      </SectionContainer>
    )
  }
)
ProjectsSection.displayName = "ProjectsSection"

export { ProjectsSection }