"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { SectionContainer } from "@/components/ui/section-container"
import { PjoxanteButton } from "@/components/ui/pjoxante-button"
import { ChatInterface } from "@/components/ui/chat-interface"
import { COMPONENT_SIZES } from "@/lib/constants"

interface HeroSectionProps {
  className?: string
}

const HeroSection = React.forwardRef<HTMLElement, HeroSectionProps>(
  ({ className }, ref) => {

    return (
      <SectionContainer
        ref={ref} 
        as="section"
        className={cn(className)}
        padding="xl"
      >
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Hero Content */}
          <div className="space-y-8">
            <div className="space-y-8">
              <h1 className={cn(
                "font-bold text-pjoxante-green font-cerco leading-tight",
                COMPONENT_SIZES.hero.title
              )}>
                Casa Pjoxante
              </h1>
              <p className="pjoxante-bg-primary-light pjoxante-primary rounded-md px-3 py-1 font-bold text-lg md:text-md">
              <span className="font-bold">Casa de Estudios, Investigación y Promoción del Buen Vivir</span> 
              </p>
              <p className={cn(
                "text-black font-century max-w-2xl",
                COMPONENT_SIZES.hero.subtitle
              )}>
                <span className="font-normal ">Construímos un futuro mejor junto con las comunidades a través de la </span>
                <span className="font-bold pjoxante-primary">solidaridad, 
                unidad, trabajo y ecología en equipo. </span>
                <span className="font-normal ">Promovemos un futuro sostenible y en armonía con la naturaleza. </span>

              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <PjoxanteButton size="lg" className="text-lg pjoxante-bg-primary font-bold text-white transition duration-300 transform hover:-translate-y-0.5 hover:shadow-xl">
                Conoce Más ➜
              </PjoxanteButton>
              <PjoxanteButton variant="outline" size="lg" className="text-lg pjoxante-bg-primary font-bold text-white transition duration-300 transform hover:-translate-y-0.5 hover:shadow-xl">
                ¡Únete a la Comunidad!
              </PjoxanteButton>
            </div>

            {/* Statistics */}
            <div className="grid grid-cols-3 gap-8 pt-8 border-t border-pjoxante-green-light">
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-pjoxante-green">15+</div>
                <div className="text-sm text-gray-600">Años de experiencia</div>
              </div>
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-pjoxante-green">500+</div>
                <div className="text-sm text-gray-600">Familias beneficiadas</div>
              </div>
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-pjoxante-green">25+</div>
                <div className="text-sm text-gray-600">Proyectos activos</div>
              </div>
            </div>
          </div>

          {/* Right Column - Chat Interface */}
          <div className="lg:pl-8">
            <ChatInterface className="mx-auto" />
          </div>
        </div>
      </SectionContainer>
    )
  }
)
HeroSection.displayName = "HeroSection"

export { HeroSection }