"use client"

import * as React from "react"
import { Users, Heart, Lightbulb, TreePine } from "lucide-react"
import { cn } from "@/lib/utils"
import { SectionContainer } from "@/components/ui/section-container"
import { Card, CardContent } from "@/components/ui/card"
import { COMPONENT_SIZES } from "@/lib/constants"

interface ValoresSectionProps {
  className?: string
}

const ValoresSection = React.forwardRef<HTMLElement, ValoresSectionProps>(
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
        id="valores"
        className={cn(className)}
        padding="xl"
      >
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
              <Card key={index} className="group hover:shadow-lg transition-all duration-300 border-[#C1DCAB]/95 
                                          hover:border-[#3E8D35] hover:scale-100 
                                          hover:-translate-y-0.5
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
      </SectionContainer>
    )
  }
)
ValoresSection.displayName = "ValoresSection"

export { ValoresSection }