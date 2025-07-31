"use client"

import * as React from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { SectionContainer } from "@/components/ui/section-container"
import { PjoxanteButton } from "@/components/ui/pjoxante-button"
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
        
        {/* Título y párrafo centrados fuera del grid */}
        <div className="w-full max-w-4xl mx-auto text-center my-12 px-4">
          <h2 className={cn(
            "font-bold text-black font-cerco mb-2 text-2xl",
            COMPONENT_SIZES.section.title
          )}>
            Sobre la Casa
          </h2>
          <p className={cn(
            "text-xl text-black font-century leading-relaxed mx-auto max-w-3xl",
            COMPONENT_SIZES.section.subtitle
          )}>
            La palabra <strong className="text-black font-semibold">“pjoxante”</strong> proviene del mazahua y significa 
            <strong className="text-black font-semibold"> “ayuda mutua”</strong> o 
            <strong className="text-black font-semibold"> “te ayudo”</strong>, refiriéndose a la persona que se solidariza contigo para realizar 
            acciones mutuamente beneficiosas.
          </p>
        </div>


        <div className="grid lg:grid-cols-2 gap-12 items-start">
        {/* Left Column - Content */}
        <div className="space-y-8">
          <div className="space-y-6">
            
            <div className="bg-pjoxante-green-light/10 bg-layout-gradient p-6 rounded-lg shadow border border-[#C1DCAB]/95 
            hover:shadow-lg hover:border-[#3E8D35] hover:scale-100 hover:-translate-y-2 transition-all duration-300 transform group">
              <h3 className="text-pjoxante-green font-bold text-xl flex items-center space-x-3 mb-3 font-century">
                <span className="w-1.5 h-6 bg-pjoxante-green rounded-full"></span>
                <span>¿Qué hacemos?</span>
              </h3>
              <p className="text-black-700 font-century leading-relaxed">
                Desarrollamos proyectos, cursos e investigaciones a partir 
                del diálogo horizontal con las comunidades, hilando saberes, filosofías y estrategias 
                diversas para construir soluciones colectivas a problemáticas reales.
              </p>
            </div>

            <div className="bg-pjoxante-green-light/10 bg-layout-gradient p-6 rounded-lg shadow border border-[#C1DCAB]/95 
                            hover:shadow-lg hover:border-[#3E8D35] hover:scale-100 hover:-translate-y-2 transition-all duration-300 transform group">
              <h3 className="text-pjoxante-green font-bold text-xl flex items-center space-x-3 mb-3 font-century">
                <span className="w-1.5 h-6 bg-pjoxante-green rounded-full"></span>
                <span>¿Cómo lo hacemos?</span>
              </h3>
              <p className="text-black-700 font-century leading-relaxed">
                Nos basamos en el trabajo colaborativo, 
                inclusivo e intercultural. Priorizamos la escucha activa, la solidaridad, el diálogo, 
                el pensamiento crítico y el valor de la vida, creando procesos organizativos que 
                transformen nuestras realidades desde el territorio y el acompañamiento mutuo.
              </p>
            </div>
          </div>
        </div>

          {/* Right Column - Image */}
          <div className="relative">
            <div className="relative h-64 md:h-80 lg:h-96 rounded-lg overflow-hidden shadow-xl hover:shadow-2xl hover:-translate-y-0.5 transition-all duration-300">
              <Image
                src="/FotosCasaPjoxante/pjoxante_about.jpeg"
                alt="Casa Pjoxante Inauguración"
                fill
                className="object-cover transform group-hover:scale-105 transition-transform duration-500 ease-in-out"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-pjoxante-green/30 to-transparent" />
            </div>
          </div>
        </div>
      </SectionContainer>
    )
  }
)
AboutSection.displayName = "AboutSection"

export { AboutSection }