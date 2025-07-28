"use client"

import * as React from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { SectionContainer } from "@/components/ui/section-container"
import { COMPONENT_SIZES } from "@/lib/constants"

interface AboutSectionProps {
  className?: string
}

const AboutSection = React.forwardRef<HTMLElement, AboutSectionProps>(
  ({ className }, ref) => {
    return (
      <SectionContainer
        ref={ref}
        id="sobre-la-casa"
        className={cn(className)}
        padding="xl"
      >
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Content */}
          <div className="space-y-8 flex flex-col justify-center">
            <div className="space-y-4">
              <h2 className={cn(
                "font-bold text-pjoxante-green font-cerco",
                COMPONENT_SIZES.section.title
              )}>
                Sobre la Casa
              </h2>
              <p className={cn(
                "text-gray-700 font-century leading-relaxed",
                COMPONENT_SIZES.section.subtitle
              )}>
                Casa Pjoxante es una organización comprometida con la transformación social a través 
                de la educación, investigación y promoción del buen vivir. Trabajamos directamente 
                con comunidades marginadas para construir un futuro más justo y sostenible.
              </p>
              <p className={cn(
                "text-gray-700 font-century leading-relaxed",
                COMPONENT_SIZES.section.subtitle
              )}>
                Nuestra pedagogía del bienestar integra saberes comunitarios, arte, tecnología y salud 
                desde una perspectiva inclusiva, participativa y territorial. Creemos que el cambio 
                verdadero surge cuando las comunidades son protagonistas de su propio desarrollo.
              </p>
            </div>
          </div>

          {/* Right Column - Image */}
          <div className="relative">
            <div className="relative h-64 md:h-80 lg:h-96 rounded-lg overflow-hidden shadow-xl hover:shadow-2xl hover:-translate-y-0.5 transition-all duration-300">
              <Image
                src="/FotosCasaPjoxante/pjoxante_about.jpeg"
                alt="Casa Pjoxante Inauguración"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-pjoxante-green/20 to-transparent" />
            </div>
            {/* Decorative element */}
            <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-pjoxante-green rounded-full opacity-20 -z-10" />
            <div className="absolute -top-6 -left-6 w-16 h-16 bg-pjoxante-brown-light rounded-full opacity-30 -z-10" />
          </div>
        </div>
      </SectionContainer>
    )
  }
)
AboutSection.displayName = "AboutSection"

export { AboutSection }