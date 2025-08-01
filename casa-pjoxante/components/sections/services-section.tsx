"use client"

import * as React from "react"
import Link from "next/link"
import { ArrowRight, BookOpen, MessageSquare, Users } from "lucide-react"
import { cn } from "@/lib/utils"
import { SectionContainer } from "@/components/ui/section-container"
import { PjoxanteButton } from "@/components/ui/pjoxante-button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { COMPONENT_SIZES } from "@/lib/constants"

interface ServicesSectionProps {
  className?: string
}

const ServicesSection = React.forwardRef<HTMLElement, ServicesSectionProps>(
  ({ className }, ref) => {
    const services = [
      {
        id: "consultorias",
        title: "Consultorías",
        description: "Acompañamiento especializado para organizaciones que buscan implementar proyectos de desarrollo comunitario sostenible.",
        icon: MessageSquare,
        link: "/consultorias",
        features: ["Diagnóstico participativo", "Diseño de estrategias", "Evaluación de impacto"]
      },
      {
        id: "catalogo",
        title: "Catálogo de Libros",
        description: "Acceso a nuestra biblioteca digital con recursos especializados en educación popular, arte comunitario y desarrollo social.",
        icon: BookOpen,
        link: "/catalogo-libros",
        features: ["Biblioteca digital", "Recursos educativos", "Materiales descargables"]
      }
    ]

    return (
      <SectionContainer
        ref={ref}
        id="servicios"
        className={cn(className)}
        padding="xl"
      >
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className={cn(
            "font-bold text-pjoxante-green font-cerco mb-4",
            COMPONENT_SIZES.section.title
          )}>
            Nuestros Servicios
          </h2>
          <p className={cn(
            "text-gray-600 font-century max-w-3xl mx-auto",
            COMPONENT_SIZES.section.subtitle
          )}>
            Acompañamos a organizaciones y comunidades en sus procesos de transformación 
            social a través de servicios especializados
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid lg:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {services.map((service) => {
            const IconComponent = service.icon
            
            return (
              <Card key={service.id} className="group hover:shadow-xl transition-all duration-300 border-pjoxante-green-light/50 hover:border-pjoxante-green bg-gradient-to-br from-white to-pjoxante-green-light/10">
                <CardHeader className="text-center pb-4">
                  <div className="mx-auto w-16 h-16 bg-pjoxante-green-light rounded-full flex items-center justify-center group-hover:bg-pjoxante-green group-hover:text-white transition-colors duration-300 mb-4">
                    <IconComponent className="h-8 w-8 text-pjoxante-green group-hover:text-white" />
                  </div>
                  <h3 className={cn(
                    "font-semibold text-pjoxante-green font-cerco",
                    COMPONENT_SIZES.card.title
                  )}>
                    {service.title}
                  </h3>
                </CardHeader>

                <CardContent className="space-y-6 text-center">
                  <p className={cn(
                    "text-gray-600 font-century leading-relaxed",
                    COMPONENT_SIZES.card.description
                  )}>
                    {service.description}
                  </p>

                  {/* Features List */}
                  <div className="space-y-2">
                    {service.features.map((feature, index) => (
                      <div key={index} className="flex items-center justify-center gap-2 text-sm text-gray-600">
                        <div className="w-1.5 h-1.5 bg-pjoxante-green rounded-full" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* Action Button */}
                  <Link href={service.link}>
                    <PjoxanteButton variant="outline" size="lg" className="w-full inline-flex items-center gap-2 group-hover:shadow-lg">
                      Conocer más
                      <ArrowRight className="h-4 w-4" />
                    </PjoxanteButton>
                  </Link>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Additional Services Preview */}
        <div className="mt-16 bg-gradient-to-r from-pjoxante-green-light/20 to-pjoxante-green-light/10 rounded-xl p-8 text-center">
          <div className="max-w-3xl mx-auto">
            <div className="flex justify-center mb-4">
              <div className="w-12 h-12 bg-pjoxante-green rounded-full flex items-center justify-center">
                <Users className="h-6 w-6 text-black" />
              </div>
            </div>
            <h3 className={cn(
              "font-semibold text-pjoxante-green font-cerco mb-4",
              COMPONENT_SIZES.section.title
            )}>
              ¿Necesitas algo específico?
            </h3>
            <p className={cn(
              "text-gray-600 font-century mb-6",
              COMPONENT_SIZES.section.subtitle
            )}>
              También ofrecemos talleres personalizados, asesorías especializadas y 
              acompañamiento en procesos organizacionales. Cuéntanos tu proyecto y 
              encontraremos la mejor forma de apoyarte.
            </p>
            <PjoxanteButton variant="outline" size="lg" className="inline-flex items-center gap-2">
              <MessageSquare className="h-4 w-4" />
              Contáctanos
            </PjoxanteButton>
          </div>
        </div>
      </SectionContainer>
    )
  }
)
ServicesSection.displayName = "ServicesSection"

export { ServicesSection }