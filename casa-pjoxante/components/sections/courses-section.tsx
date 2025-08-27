"use client"

import * as React from "react"
import { useState, useEffect } from "react"
import Image from "next/image"
import { Calendar, Clock, Users } from "lucide-react"
import { cn } from "@/lib/utils"
import { SectionContainer } from "@/components/ui/section-container"
import { PjoxanteButton } from "@/components/ui/pjoxante-button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { COMPONENT_SIZES } from "@/lib/constants"
import { getCoursesData } from "@/services/courses/courses-service"
import type { CoursesData } from "@/services/courses/courses-types"

interface CoursesSectionProps {
  className?: string
}

const CoursesSection = React.forwardRef<HTMLElement, CoursesSectionProps>(
  ({ className }, ref) => {
    const [coursesData, setCoursesData] = useState<CoursesData | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
      const loadCoursesData = async () => {
        try {
          const result = await getCoursesData()
          if (result.data) {
            setCoursesData(result.data)
          }
        } catch (error) {
          console.error('Error loading courses data:', error)
        } finally {
          setLoading(false)
        }
      }

      loadCoursesData()
    }, [])

    // Si está cargando o no hay datos, no mostrar nada
    if (loading || !coursesData?.section) {
      return null
    }

    const { section, courses } = coursesData

    // Función para formatear la fecha
    const formatDate = (dateString: string | null) => {
      if (!dateString) return 'Próximamente'
      try {
        return new Date(dateString).toLocaleDateString('es-ES', {
          day: 'numeric',
          month: 'long'
        })
      } catch {
        return dateString
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
            {section.title}
          </h2>
          <p className={cn(
            "text-black font-century max-w-3xl mx-auto",
            COMPONENT_SIZES.section.subtitle
          )}>
            {section.subtitle}
          </p>
        </div>

        {/* Courses Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {courses.map((course) => (
            <Card key={course.id} className="group hover:shadow-xl transition-all duration-300 overflow-hidden border-pjoxante-green-light/50 hover:border-pjoxante-green">
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={course.image_url}
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
                    <span>Inicio: {formatDate(course.start_date)}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4" />
                    <span>Capacidad: {course.capacity || 0} participantes</span>
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