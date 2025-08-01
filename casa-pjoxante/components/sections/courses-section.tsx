"use client"

import * as React from "react"
import Image from "next/image"
import { Calendar, Clock, Users, CheckCircle, XCircle } from "lucide-react"
import { cn } from "@/lib/utils"
import { SectionContainer } from "@/components/ui/section-container"
import { PjoxanteButton } from "@/components/ui/pjoxante-button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { COMPONENT_SIZES } from "@/lib/constants"

interface Course {
  id: string
  title: string
  description: string
  image: string
  duration: string
  startDate: string
  capacity: number
  enrolled: number
  status: "open" | "closed" | "coming-soon"
  category: string
}

interface CoursesSectionProps {
  className?: string
}

const CoursesSection = React.forwardRef<HTMLElement, CoursesSectionProps>(
  ({ className }, ref) => {
    // Mock courses data - replace with real data
    const courses: Course[] = [
      {
        id: "1",
        title: "Pedagogía del Bienestar Comunitario",
        description: "Aprende metodologías participativas para el desarrollo de programas educativos centrados en el bienestar colectivo.",
        image: "/api/placeholder/400/250",
        duration: "8 semanas",
        startDate: "15 de Marzo",
        capacity: 25,
        enrolled: 18,
        status: "open",
        category: "Educación"
      },
      {
        id: "2", 
        title: "Arte y Transformación Social",
        description: "Explora herramientas artísticas como medios de expresión, sanación y construcción de identidad comunitaria.",
        image: "/FotosCursos/curso_ceramica2.jpeg",
        duration: "6 semanas",
        startDate: "22 de Marzo",
        capacity: 20,
        enrolled: 20,
        status: "closed",
        category: "Arte"
      },
      {
        id: "3",
        title: "Salud Comunitaria Integral",
        description: "Desarrolla competencias para promover la salud desde una perspectiva holística e intercultural.",
        image: "/FotosCursos/curso_yoga.jpg ",
        duration: "10 semanas",
        startDate: "5 de Abril",
        capacity: 30,
        enrolled: 8,
        status: "open",
        category: "Salud"
      },
      {
        id: "4",
        title: "Tecnologías Apropiadas para el Desarrollo",
        description: "Conoce y crea soluciones tecnológicas sostenibles adaptadas a contextos comunitarios.",
        image: "/api/placeholder/400/250",
        duration: "12 semanas",
        startDate: "Próximamente",
        capacity: 15,
        enrolled: 0,
        status: "coming-soon",
        category: "Tecnología"
      }
    ]

    const getStatusInfo = (status: Course['status']) => {
      switch (status) {
        case 'open':
          return { 
            label: 'Inscripciones Abiertas', 
            color: 'bg-green-100 text-green-800',
            icon: CheckCircle
          }
        case 'closed':
          return { 
            label: 'Cupo Lleno', 
            color: 'bg-red-100 text-red-800',
            icon: XCircle
          }
        case 'coming-soon':
          return { 
            label: 'Próximamente', 
            color: 'bg-blue-100 text-blue-800',
            icon: Clock
          }
      }
    }

    return (
      <SectionContainer
        ref={ref}
        id="cursos"
        className={cn(className)}
        padding="xl"
      >
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className={cn(
            "font-bold text-pjoxante-green font-cerco mb-4",
            COMPONENT_SIZES.section.title
          )}>
            Nuestros Cursos
          </h2>
          <p className={cn(
            "text-black font-century max-w-3xl mx-auto",
            COMPONENT_SIZES.section.subtitle
          )}>
            Conoce nuestros programas de formación diseñados para fortalecer capacidades comunitarias 
            y promover el desarrollo integral de las personas
          </p>
        </div>

        {/* Courses Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {courses.map((course) => {
            const statusInfo = getStatusInfo(course.status)
            const StatusIcon = statusInfo.icon

            return (
              <Card key={course.id} className="group hover:shadow-xl transition-all duration-300 overflow-hidden border-[#C1DCAB]/50 hover:border-[#3E8D35]">
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={course.image}
                    alt={course.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="absolute top-4 left-4">
                    <Badge variant="secondary" className="bg-pjoxante-green text-white">
                      {course.category}
                    </Badge>
                  </div>
                  <div className="absolute top-4 right-4">
                    <Badge className={statusInfo.color}>
                      <StatusIcon className="h-3 w-3 mr-1" />
                      {statusInfo.label}
                    </Badge>
                  </div>
                </div>

                <CardHeader className="pb-3">
                  <h3 className={cn(
                    "font-semibold text-pjoxante-green font-cerco line-clamp-2",
                    COMPONENT_SIZES.card.title
                  )}>
                    {course.title}
                  </h3>
                </CardHeader>

                <CardContent className="space-y-4">
                  <p className={cn(
                    "text-gray-600 font-century line-clamp-3",
                    COMPONENT_SIZES.card.description
                  )}>
                    {course.description}
                  </p>

                  {/* Course Details */}
                  <div className="space-y-2 text-sm text-gray-500">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      <span>Duración: {course.duration}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      <span>Inicio: {course.startDate}</span>
                    </div>
                    {course.status !== 'coming-soon' && (
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4" />
                        <span>{course.enrolled}/{course.capacity} participantes</span>
                      </div>
                    )}
                  </div>

                  {/* Action Button */}
                  <div className="pt-2">
                    {course.status === 'open' && (
                      <PjoxanteButton className="w-full">
                        Inscribirse
                      </PjoxanteButton>
                    )}
                    {course.status === 'closed' && (
                      <PjoxanteButton variant="outline" className="w-full" disabled>
                        Cupo Lleno
                      </PjoxanteButton>
                    )}
                    {course.status === 'coming-soon' && (
                      <PjoxanteButton variant="outline" className="w-full">
                        Más Información
                      </PjoxanteButton>
                    )}
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12">
          <p className="text-gray-600 font-century mb-6">
            ¿Tienes alguna propuesta de curso o taller? ¡Nos encantaría escucharte!
          </p>
          <PjoxanteButton variant="outline" size="lg">
            Proponer un Curso
          </PjoxanteButton>
        </div>
      </SectionContainer>
    )
  }
)
CoursesSection.displayName = "CoursesSection"

export { CoursesSection }