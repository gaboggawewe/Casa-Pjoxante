"use client"

import * as React from "react"
import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"
import { SectionContainer } from "@/components/ui/section-container"
import { PhotoCarousel } from "@/components/ui/photo-carousel"
import { COMPONENT_SIZES } from "@/lib/constants"
import { getAboutData } from "@/services/about/about-service"
import type { AboutData } from "@/services/about/about-types"

interface AboutSectionProps {
  className?: string
}

const AboutSection = React.forwardRef<HTMLElement, AboutSectionProps>(
  ({ className }, ref) => {
    const [aboutData, setAboutData] = useState<AboutData | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
      const loadAboutData = async () => {
        try {
          const result = await getAboutData()
          if (result.data) {
            setAboutData(result.data)
          }
        } catch (error) {
          console.error('Error loading about data:', error)
        } finally {
          setLoading(false)
        }
      }

      loadAboutData()
    }, [])

    // Si está cargando o no hay datos, no mostrar nada
    if (loading || !aboutData?.section) {
      return null
    }

    const { section, images } = aboutData

    return (
      <SectionContainer
        ref={ref}
        id="sobre-la-casa"
        className={cn(className)}
        padding="xl"
      >
        {/* Título y párrafo centrados fuera del grid */}
        <div className="w-full max-w-4xl mx-auto text-center my-12 px-4">
          <h2
            className={cn(
              "font-bold text-black font-cerco mb-2 text-2xl",
              COMPONENT_SIZES.section.title
            )}
          >
            {section.title}
          </h2>
          <p
            className={cn(
              "text-xl text-black font-century leading-relaxed mx-auto max-w-3xl",
              COMPONENT_SIZES.section.subtitle
            )}
          >
            {section.intro_text}
          </p>

          {/* NUEVO RECUADRO CENTRADO */}
          <div className="mt-8 bg-pjoxante-green-light/10 bg-layout-gradient p-6 rounded-lg shadow border border-[#C1DCAB]/95 hover:shadow-lg hover:border-[#3E8D35] hover:scale-100 hover:-translate-y-0.5 transition-all duration-300 transform group max-w-2xl mx-auto">
            <h3 className="text-pjoxante-green font-bold text-xl flex items-center justify-center space-x-3 mb-3 font-century">
              <span className="w-1.5 h-6 bg-pjoxante-green rounded-full"></span>
              <span>¿Quiénes somos?</span>
              <span className="w-1.5 h-6 bg-pjoxante-green rounded-full"></span>
            </h3>
            <p className="text-black-700 font-century leading-relaxed text-center">
              Somos una Asociación Civil que promueve diversos procesos
              pedagógicos, de investigación y de bienestar personal y colectivo
              para mejorar la calidad de vida de las personas que viven en los
              barrios, colonias, comunidades y pueblos de la Ciudad de México y
              más allá de sus fronteras.
            </p>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left Column - Content */}
          <div className="space-y-8">
            <div className="space-y-6">
              <div className="bg-pjoxante-green-light/10 bg-layout-gradient p-6 rounded-lg shadow border border-[#C1DCAB]/95 hover:shadow-lg hover:border-[#3E8D35] hover:scale-100 hover:-translate-y-0.5 transition-all duration-300 transform group">
                <h3 className="text-pjoxante-green font-bold text-xl flex items-center space-x-3 mb-3 font-century">
                  <span className="w-1.5 h-6 bg-pjoxante-green rounded-full"></span>
                  <span>¿Qué hacemos?</span>
                </h3>
                <p className="text-black-700 font-century leading-relaxed">
                  {section.what_we_do_text}
                </p>
              </div>

              <div className="bg-pjoxante-green-light/10 bg-layout-gradient p-6 rounded-lg shadow border border-[#C1DCAB]/95 hover:shadow-lg hover:border-[#3E8D35] hover:scale-100 hover:-translate-y-0.5 transition-all duration-300 transform group">
                <h3 className="text-pjoxante-green font-bold text-xl flex items-center space-x-3 mb-3 font-century">
                  <span className="w-1.5 h-6 bg-pjoxante-green rounded-full"></span>
                  <span>¿Cómo lo hacemos?</span>
                </h3>
                <p className="text-black-700 font-century leading-relaxed">
                  {section.how_we_do_text}
                </p>
              </div>
            </div>
          </div>

          {/* Right Column - Photo Carousel */}
          <div className="relative">
            <PhotoCarousel
              images={images.map(image => ({
                src: image.image_url,
                alt: image.alt_text,
              }))}
              className="shadow-xl hover:shadow-2xl hover:-translate-y-0.5 transition-all duration-300"
              autoPlay={true}
              showIndicators={true}
              showArrows={false}
            />
          </div>
        </div>
      </SectionContainer>
    )
  }
)
AboutSection.displayName = "AboutSection"

export { AboutSection }
