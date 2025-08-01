"use client"

import * as React from "react"
import Image from "next/image"
import { Calendar, Clock, Users } from "lucide-react"
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
        image: "/FotosCasaPjoxante/pjoxante-curso.JPG",
        duration: "8 semanas",
        startDate: "15 de Marzo",
        capacity: 25,
        category: "Educación"
      },
      {
        id: "2", 
        title: "Arte y Transformación Social",
        description: "Explora herramientas artísticas como medios de expresión, sanación y construcción de identidad comunitaria.",
        image: "/FotosCasaPjoxante/pjoxante-arte.jpg",
        duration: "6 semanas",
        startDate: "22 de Marzo",
        capacity: 20,
        category: "Arte"
      },
      {
        id: "3",
        title: "Salud Comunitaria Integral",
        description: "Desarrolla competencias para promover la salud desde una perspectiva holística e intercultural.",
        image: "/FotosCasaPjoxante/pojoxante-curso-2.JPG",
        duration: "10 semanas",
        startDate: "5 de Abril",
        capacity: 30,
        category: "Salud"
      },
      {
        id: "4",
        title: "Tecnologías Apropiadas para el Desarrollo",
        description: "Conoce y crea soluciones tecnológicas sostenibles adaptadas a contextos comunitarios.",
        image: "/FotosCasaPjoxante/pjoxante-alumnos.JPG",
        duration: "12 semanas",
        startDate: "Próximamente",
        capacity: 15,
        category: "Tecnología"
      }
    ]


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
            "text-gray-600 font-century max-w-3xl mx-auto",
            COMPONENT_SIZES.section.subtitle
          )}>
            Programas de formación diseñados para fortalecer capacidades comunitarias 
            y promover el desarrollo integral de las personas
          </p>
        </div>

        {/* Courses Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {courses.map((course) => (
            <Card key={course.id} className="group hover:shadow-xl transition-all duration-300 overflow-hidden border-pjoxante-green-light/50 hover:border-pjoxante-green">
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
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4" />
                    <span>Capacidad: {course.capacity} participantes</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
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