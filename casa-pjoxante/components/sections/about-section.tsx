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
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Content */}
          <div className="space-y-8">
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
              <p className="text-gray-600 font-century">
                Nuestra pedagogía del bienestar integra saberes comunitarios, arte, tecnología y salud 
                desde una perspectiva inclusiva, participativa y territorial. Creemos que el cambio 
                verdadero surge cuando las comunidades son protagonistas de su propio desarrollo.
              </p>
            </div>

            <PjoxanteButton size="lg" className="w-fit">
              Conoce nuestra historia
            </PjoxanteButton>
          </div>

          {/* Right Column - Image */}
          <div className="relative">
            <div className="relative h-64 md:h-80 lg:h-96 rounded-lg overflow-hidden shadow-xl">
              <Image
                src="/api/placeholder/600/400"
                alt="Casa Pjoxante comunidad trabajando"
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

        {/* Values Section */}
        <div className="mt-20">
          <div className="text-center mb-12">
            <h3 className={cn(
              "font-bold text-pjoxante-green font-cerco mb-4",
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
                <Card key={index} className="group hover:shadow-lg transition-all duration-300 border-pjoxante-green-light/50 hover:border-pjoxante-green">
                  <CardContent className="p-6 text-center space-y-4">
                    <div className="mx-auto w-16 h-16 bg-pjoxante-green-light rounded-full flex items-center justify-center group-hover:bg-pjoxante-green group-hover:text-white transition-colors duration-300">
                      <IconComponent className="h-8 w-8 text-pjoxante-green group-hover:text-white" />
                    </div>
                    <h4 className="font-semibold text-lg text-pjoxante-green font-cerco">
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