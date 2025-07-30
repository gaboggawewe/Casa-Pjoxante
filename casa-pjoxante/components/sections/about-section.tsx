"use client"

import * as React from "react"
import Image from "next/image"
import { Users, Heart, Lightbulb, TreePine } from "lucide-react"
import { cn } from "@/lib/utils"
import { SectionContainer } from "@/components/ui/section-container"
import { PjoxanteButton } from "@/components/ui/pjoxante-button"
import { Card, CardContent } from "@/components/ui/card"
import { COMPONENT_SIZES } from "@/lib/constants"

interface AboutSectionProps {
  className?: string
}

const AboutSection = React.forwardRef<HTMLElement, AboutSectionProps>(
  ({ className }, ref) => {
    const values = [
      {
        icon: Users,
        title: "Solidaridad",
        description: "Trabajamos unidos para fortalecer los lazos comunitarios y apoyar a quienes más lo necesitan."
      },
      {
        icon: Heart,
        title: "Unidad",
        description: "Creemos en la fuerza de la comunidad trabajando junta hacia objetivos comunes."
      },
      {
        icon: TreePine,
        title: "Ecología",
        description: "Promovemos prácticas sostenibles y el cuidado del medio ambiente en todas nuestras actividades."
      },
      {
        icon: Lightbulb,
        title: "Trabajo en Equipo",
        description: "Valoramos la colaboración y el intercambio de saberes para el desarrollo colectivo."
      }
    ]

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
          <div className="space-y-4">
            
            <div className="bg-[#49B59E]/20 p-4 rounded-lg shadow-md border border-[#49B59E] 
            hover:shadow-lg transition-shadow duration-300">
              <h3 className="text-[#49B59E] font-bold text-xl flex items-center space-x-3 mb-3 font-century">
                <span className="w-1.5 h-6 bg-[#49B59E] rounded-full"></span>
                <span>¿Qué hacemos?</span>
              </h3>
              <p className="text-black-700 font-century leading-relaxed">
                Desarrollamos proyectos, cursos e investigaciones a partir 
                del diálogo horizontal con las comunidades, hilando saberes, filosofías y estrategias 
                diversas para construir soluciones colectivas a problemáticas reales.
              </p>
            </div>

            <div className="bg-[#49B59E]/20  p-4 rounded-lg shadow-md border border-[#49B59E] 
                            hover:shadow-lg transition-shadow duration-300">
              <h3 className="text-[#49B59E] font-bold text-xl flex items-center space-x-3 mb-3 font-century">
                <span className="w-1.5 h-6 bg-[#49B59E] rounded-full"></span>
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
          
          <PjoxanteButton variant="outline" size="lg" className="w-fit">
            Conoce nuestra historia ➜
          </PjoxanteButton>
        </div>

          {/* Right Column - Image */}
          <div className="group relative h-64 md:h-80 lg:h-96 rounded-lg overflow-hidden shadow-xl ">
            <div className="relative h-64 md:h-80 lg:h-96 rounded-lg overflow-hidden shadow-xl">
              <Image
                src="/Extras/SobreLaCasa.jpeg"
                alt="Casa Pjoxante comunidad trabajando"
                fill
                className="object-cover transform group-hover:scale-105 transition-transform duration-500 ease-in-out"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#49B59E]/30 to-transparent" />
            </div>
            {/* Decorative element */}
            <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-[#49B59E] rounded-full opacity-20 -z-10" />
            <div className="absolute -top-6 -left-6 w-16 h-16 bg-[#8C6853] rounded-full opacity-30 -z-10" />
          </div>
        </div>

        {/* Values Section */}
        <div className="mt-20">
          <div className="text-center mb-12">
            <h3 className={cn(
              "font-bold text-pjoxante-primary font-cerco mb-4",
              COMPONENT_SIZES.section.title
            )}>
              Nuestros Valores
            </h3>
            <p className={cn(
              "text-gray-600 font-century max-w-2xl mx-auto",
              COMPONENT_SIZES.section.subtitle
            )}>
              Los pilares que guían nuestro trabajo y compromiso con las comunidades
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => {
              const IconComponent = value.icon
              return (
                <Card key={index} className="group hover:shadow-lg transition-all duration-300 border-[#C1DCAB]/50 
                                            hover:border-[#3E8D35] hover:scale-100 
                                            hover:-translate-y-2
                                            transform" 
                >
                  <CardContent className="p-6 text-center space-y-4">
                    <div className="mx-auto w-16 h-16 bg-[#C1DCAB] rounded-full flex items-center justify-center transition-all duration-300 transform group-hover:scale-110  
                                    group-hover:bg-[#3E8D35] group-hover:text-white">
                      <IconComponent className="h-8 w-8 text-[#3E8D35] group-hover:text-white" />
                    </div>
                    <h4 className="font-semibold text-lg text-pjoxante-primary font-cerco">
                      {value.title}
                    </h4>
                    <p className="text-gray-600 text-sm font-century leading-relaxed">
                      {value.description}
                    </p>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </SectionContainer>
    )
  }
)
AboutSection.displayName = "AboutSection"

export { AboutSection }