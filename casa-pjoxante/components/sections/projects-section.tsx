"use client"

import * as React from "react"
import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"
import { SectionContainer } from "@/components/ui/section-container"
import { PhotoCarousel, type CarouselImage } from "@/components/ui/photo-carousel"
import { COMPONENT_SIZES } from "@/lib/constants"
import { getProjectsData } from "@/services/projects/projects-service"
import type { ProjectsData } from "@/services/projects/projects-types"

interface ProjectsSectionProps {
  className?: string
}

const ProjectsSection = React.forwardRef<HTMLElement, ProjectsSectionProps>(
  ({ className }, ref) => {
    const [projectsData, setProjectsData] = useState<ProjectsData | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
      const loadProjectsData = async () => {
        try {
          const result = await getProjectsData()
          if (result.data) {
            setProjectsData(result.data)
          }
        } catch (error) {
          console.error('Error loading projects data:', error)
        } finally {
          setLoading(false)
        }
      }

      loadProjectsData()
    }, [])

    // Si está cargando o no hay datos, no mostrar nada
    if (loading || !projectsData?.section) {
      return null
    }

    const { section, projects } = projectsData

    // Convertir proyectos a formato CarouselImage
    const projectImages: CarouselImage[] = projects.map(project => ({
      src: project.image_url,
      alt: project.alt_text,
      title: project.title,
      description: project.description
    }))

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
            {section.title}
          </h2>
          <p className={cn(
            "text-gray-600 font-century max-w-3xl mx-auto",
            COMPONENT_SIZES.section.subtitle
          )}>
            {section.subtitle}
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
              <div className="text-2xl font-bold text-pjoxante-green">{section.active_projects}+</div>
              <div className="text-gray-600 text-sm">Proyectos activos</div>
            </div>
            <div className="space-y-2">  
              <div className="text-2xl font-bold text-pjoxante-green">{section.communities}</div>
              <div className="text-gray-600 text-sm">Comunidades atendidas</div>
            </div>
            <div className="space-y-2">
              <div className="text-2xl font-bold text-pjoxante-green">{section.beneficiaries}+</div>
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