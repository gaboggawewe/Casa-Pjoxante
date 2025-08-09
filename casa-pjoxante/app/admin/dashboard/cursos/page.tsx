"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Navbar } from "@/components/ui/navbar"
import { Footer } from "@/components/ui/footer"
import { SectionContainer } from "@/components/ui/section-container"
import { PjoxanteButton } from "@/components/ui/pjoxante-button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { COMPONENT_SIZES } from "@/lib/constants"
import { cn } from "@/lib/utils"
import { ArrowLeft, Save, Plus, X, GraduationCap, Calendar, Clock, Users } from "lucide-react"

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

export default function EditCoursesSection() {
  const router = useRouter()
  
  const [coursesData, setCoursesData] = useState({
    title: "Nuestros Cursos",
    subtitle: "Conoce nuestros programas de formación diseñados para fortalecer capacidades comunitarias y promover el desarrollo integral de las personas",
    callToAction: "¿Tienes alguna propuesta de curso o taller? ¡Nos encantaría escucharte!",
    courses: [
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
    ] as Course[]
  })

  const [newCourse, setNewCourse] = useState({
    title: "",
    description: "",
    image: "",
    duration: "",
    startDate: "",
    capacity: 20,
    category: ""
  })

  const categories = ["Educación", "Arte", "Salud", "Tecnología", "Desarrollo", "Sostenibilidad", "Comunicación", "Liderazgo"]

  const handleSave = () => {
    // Aquí se implementará la lógica para guardar en la base de datos
    alert("Cambios guardados correctamente (simulado)")
    router.push('/admin/dashboard')
  }

  const handleAddCourse = () => {
    if (newCourse.title && newCourse.description && newCourse.image && newCourse.duration && newCourse.startDate && newCourse.category) {
      const newId = (coursesData.courses.length + 1).toString()
      setCoursesData({
        ...coursesData,
        courses: [...coursesData.courses, { ...newCourse, id: newId }]
      })
      setNewCourse({
        title: "",
        description: "",
        image: "",
        duration: "",
        startDate: "",
        capacity: 20,
        category: ""
      })
    }
  }

  const handleRemoveCourse = (id: string) => {
    setCoursesData({
      ...coursesData,
      courses: coursesData.courses.filter(course => course.id !== id)
    })
  }

  const handleUpdateCourse = (id: string, field: keyof Course, value: string | number) => {
    setCoursesData({
      ...coursesData,
      courses: coursesData.courses.map(course => 
        course.id === id ? { ...course, [field]: value } : course
      )
    })
  }

  const handleImageFileChange = (e: React.ChangeEvent<HTMLInputElement>, courseId?: string) => {
    const file = e.target.files?.[0]
    if (file) {
      const imageUrl = URL.createObjectURL(file)
      if (courseId) {
        // Actualizar curso existente
        handleUpdateCourse(courseId, 'image', imageUrl)
      } else {
        // Nuevo curso
        setNewCourse({ ...newCourse, image: imageUrl })
      }
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main>
        <SectionContainer padding="xl">
          <div className="max-w-6xl mx-auto">
            
            {/* Header */}
            <div className="flex items-center gap-4 mb-8">
              <PjoxanteButton 
                onClick={() => router.push('/admin/dashboard')}
                variant="outline"
                size="sm"
                className="gap-2"
              >
                <ArrowLeft className="h-4 w-4" />
                Volver
              </PjoxanteButton>
              <div>
                <h1 className={cn(
                  "font-bold text-pjoxante-green font-cerco",
                  COMPONENT_SIZES.section.title
                )}>
                  Editar: Nuestros Cursos
                </h1>
                <p className="text-gray-600 font-century mt-1">
                  Gestiona la información completa de cursos y capacitaciones
                </p>
              </div>
            </div>

            <div className="space-y-6">
              
              {/* Información General */}
              <Card className="shadow-lg border-pjoxante-green-light/50">
                <CardHeader>
                  <CardTitle className="text-pjoxante-green font-cerco">
                    Información General
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  
                  <div className="grid grid-cols-1 gap-6">
                    {/* Título */}
                    <div className="space-y-2">
                      <Label htmlFor="title" className="font-century font-medium">
                        Título de la Sección
                      </Label>
                      <Input
                        id="title"
                        value={coursesData.title}
                        onChange={(e) => setCoursesData({ ...coursesData, title: e.target.value })}
                        className="font-cerco text-lg"
                      />
                    </div>

                    {/* Subtítulo */}
                    <div className="space-y-2">
                      <Label htmlFor="subtitle" className="font-century font-medium">
                        Subtítulo
                      </Label>
                      <textarea
                        id="subtitle"
                        rows={3}
                        value={coursesData.subtitle}
                        onChange={(e) => setCoursesData({ ...coursesData, subtitle: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pjoxante-green focus:border-transparent resize-vertical font-century"
                      />
                    </div>

                    {/* Call to Action */}
                    <div className="space-y-2">
                      <Label htmlFor="callToAction" className="font-century font-medium">
                        Texto de Llamado a la Acción
                      </Label>
                      <Input
                        id="callToAction"
                        value={coursesData.callToAction}
                        onChange={(e) => setCoursesData({ ...coursesData, callToAction: e.target.value })}
                        className="font-century"
                      />
                    </div>
                  </div>

                </CardContent>
              </Card>

              {/* Cursos Actuales */}
              <Card className="shadow-lg border-pjoxante-green-light/50">
                <CardHeader>
                  <CardTitle className="text-pjoxante-green font-cerco">
                    Cursos Disponibles
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  
                  <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                    {coursesData.courses.map((course) => (
                      <div key={course.id} className="p-4 border border-gray-200 rounded-lg bg-gray-50 relative">
                        <button
                          onClick={() => handleRemoveCourse(course.id)}
                          className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors z-10"
                        >
                          <X className="h-4 w-4" />
                        </button>
                        
                        <div className="space-y-4">
                          {/* Imagen y Categoría */}
                          <div className="relative">
                            <Image
                              src={course.image}
                              alt={course.title}
                              width={300}
                              height={200}
                              className="w-full h-40 object-cover rounded-lg"
                            />
                            <div className="absolute top-2 left-2">
                              <Badge className="bg-pjoxante-green text-white">
                                {course.category}
                              </Badge>
                            </div>
                          </div>

                          {/* Información del Curso */}
                          <div className="grid grid-cols-1 gap-4">
                            {/* Título */}
                            <Input
                              placeholder="Título del curso"
                              value={course.title}
                              onChange={(e) => handleUpdateCourse(course.id, 'title', e.target.value)}
                              className="font-cerco font-semibold"
                            />

                            {/* Descripción */}
                            <textarea
                              rows={3}
                              placeholder="Descripción del curso"
                              value={course.description}
                              onChange={(e) => handleUpdateCourse(course.id, 'description', e.target.value)}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pjoxante-green focus:border-transparent resize-vertical font-century text-sm"
                            />

                            {/* Detalles del curso */}
                            <div className="grid grid-cols-2 gap-3">
                              {/* Categoría */}
                              <select
                                value={course.category}
                                onChange={(e) => handleUpdateCourse(course.id, 'category', e.target.value)}
                                className="px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-pjoxante-green"
                              >
                                <option value="">Categoría</option>
                                {categories.map(cat => (
                                  <option key={cat} value={cat}>{cat}</option>
                                ))}
                              </select>

                              {/* Duración */}
                              <Input
                                placeholder="Duración"
                                value={course.duration}
                                onChange={(e) => handleUpdateCourse(course.id, 'duration', e.target.value)}
                                className="text-sm"
                              />

                              {/* Fecha de inicio */}
                              <Input
                                placeholder="Fecha de inicio"
                                value={course.startDate}
                                onChange={(e) => handleUpdateCourse(course.id, 'startDate', e.target.value)}
                                className="text-sm"
                              />

                              {/* Capacidad */}
                              <Input
                                type="number"
                                placeholder="Capacidad"
                                value={course.capacity}
                                onChange={(e) => handleUpdateCourse(course.id, 'capacity', parseInt(e.target.value) || 0)}
                                className="text-sm"
                              />
                            </div>

                            {/* Cambiar imagen */}
                            <Input
                              type="file"
                              accept="image/*"
                              onChange={(e) => handleImageFileChange(e, course.id)}
                              className="text-sm"
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                </CardContent>
              </Card>

              {/* Agregar Nuevo Curso */}
              <Card className="shadow-lg border-pjoxante-green-light/50 border-dashed">
                <CardHeader>
                  <CardTitle className="text-pjoxante-green font-cerco flex items-center gap-2">
                    <Plus className="h-5 w-5" />
                    Agregar Nuevo Curso
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    
                    {/* Columna izquierda - Imagen y categoría */}
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label className="font-century font-medium">Imagen del Curso</Label>
                        <Input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleImageFileChange(e)}
                          className="text-sm"
                        />
                      </div>
                      
                      {newCourse.image && (
                        <div className="relative">
                          <Image
                            src={newCourse.image}
                            alt="Vista previa"
                            width={300}
                            height={200}
                            className="w-full h-40 object-cover rounded-lg border"
                          />
                        </div>
                      )}

                      <div className="space-y-2">
                        <Label className="font-century font-medium">Categoría</Label>
                        <select
                          value={newCourse.category}
                          onChange={(e) => setNewCourse({ ...newCourse, category: e.target.value })}
                          className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-pjoxante-green"
                        >
                          <option value="">Seleccionar categoría</option>
                          {categories.map(cat => (
                            <option key={cat} value={cat}>{cat}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* Columna derecha - Información */}
                    <div className="space-y-4">
                      {/* Título */}
                      <div className="space-y-2">
                        <Label className="font-century font-medium">Título</Label>
                        <Input
                          placeholder="Nombre del curso"
                          value={newCourse.title}
                          onChange={(e) => setNewCourse({ ...newCourse, title: e.target.value })}
                          className="font-cerco"
                        />
                      </div>

                      {/* Descripción */}
                      <div className="space-y-2">
                        <Label className="font-century font-medium">Descripción</Label>
                        <textarea
                          rows={4}
                          placeholder="Descripción detallada del curso"
                          value={newCourse.description}
                          onChange={(e) => setNewCourse({ ...newCourse, description: e.target.value })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pjoxante-green focus:border-transparent resize-vertical font-century text-sm"
                        />
                      </div>

                      {/* Detalles */}
                      <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-2">
                          <Label className="text-sm font-century">Duración</Label>
                          <Input
                            placeholder="ej: 8 semanas"
                            value={newCourse.duration}
                            onChange={(e) => setNewCourse({ ...newCourse, duration: e.target.value })}
                            className="text-sm"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label className="text-sm font-century">Fecha de Inicio</Label>
                          <Input
                            placeholder="ej: 15 de Marzo"
                            value={newCourse.startDate}
                            onChange={(e) => setNewCourse({ ...newCourse, startDate: e.target.value })}
                            className="text-sm"
                          />
                        </div>

                        <div className="space-y-2 col-span-2">
                          <Label className="text-sm font-century">Capacidad</Label>
                          <Input
                            type="number"
                            placeholder="Número de participantes"
                            value={newCourse.capacity}
                            onChange={(e) => setNewCourse({ ...newCourse, capacity: parseInt(e.target.value) || 0 })}
                            className="text-sm"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="pt-2">
                    <PjoxanteButton
                      onClick={handleAddCourse}
                      disabled={!newCourse.title || !newCourse.description || !newCourse.image || !newCourse.duration || !newCourse.startDate || !newCourse.category}
                      size="sm"
                      className="gap-2"
                    >
                      <Plus className="h-4 w-4" />
                      Agregar Curso
                    </PjoxanteButton>
                  </div>

                </CardContent>
              </Card>

              {/* Botones de Acción */}
              <div className="flex justify-end gap-4">
                <PjoxanteButton
                  onClick={() => router.push('/admin/dashboard')}
                  variant="outline"
                >
                  Cancelar
                </PjoxanteButton>
                <PjoxanteButton
                  onClick={handleSave}
                  className="gap-2"
                >
                  <Save className="h-4 w-4" />
                  Guardar Cambios
                </PjoxanteButton>
              </div>

            </div>
          </div>
        </SectionContainer>
      </main>

      <Footer />
    </div>
  )
}