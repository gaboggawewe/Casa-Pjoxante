"use client"

import { useState, useEffect } from "react"
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
import { ArrowLeft, Save, Plus, X, GraduationCap, Calendar, Clock, Users, Loader2 } from "lucide-react"
import { getCoursesDataAdmin, saveCoursesSection, saveCourse, updateCourse, deleteCourse, uploadCourseImage } from "@/services/courses/courses-service"

interface Course {
  id?: string | number
  title: string
  description: string
  image: string
  duration: string
  startDate: string
  capacity: number
  category: string
  published: boolean
}

export default function EditCoursesSection() {
  const router = useRouter()
  
  const [coursesData, setCoursesData] = useState<{
    title: string
    subtitle: string
    published: boolean
    courses: Course[]
  }>({
    title: "",
    subtitle: "",
    published: true,
    courses: []
  })
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [uploading, setUploading] = useState(false)

  const [newCourse, setNewCourse] = useState({
    title: "",
    description: "",
    image: "",
    duration: "",
    startDate: "",
    capacity: 20,
    category: "",
    published: true
  })
  const [newCourseFile, setNewCourseFile] = useState<File | null>(null)

  // Cargar datos desde la base de datos
  useEffect(() => {
    loadCoursesData()
  }, [])

  const loadCoursesData = async () => {
    try {
      const result = await getCoursesDataAdmin()
      if (result.data) {
        const { section, courses } = result.data
        if (section) {
          setCoursesData({
            title: section.title,
            subtitle: section.subtitle,
            published: section.published,
            courses: courses.map(course => ({
              id: course.id,
              title: course.title,
              description: course.description,
              image: course.image_url,
              duration: course.duration,
              startDate: course.start_date ? new Date(course.start_date).toLocaleDateString('es-ES') : 'Próximamente',
              capacity: course.capacity || 20,
              category: course.category,
              published: course.published
            }))
          })
        }
      }
    } catch (error) {
      console.error('Error loading courses data:', error)
      alert('Error al cargar los datos')
    } finally {
      setLoading(false)
    }
  }

  const categories = ["Educación", "Arte", "Salud", "Tecnología", "Desarrollo", "Sostenibilidad", "Comunicación", "Liderazgo"]

  const handleSave = async () => {
    setSaving(true)
    try {
      // Guardar la sección
      const sectionResult = await saveCoursesSection({
        title: coursesData.title,
        subtitle: coursesData.subtitle,
        published: coursesData.published
      })

      if (sectionResult.error) {
        throw new Error(sectionResult.error)
      }

      alert("Cambios guardados correctamente")
      router.push('/admin/dashboard')
    } catch (error) {
      console.error('Error saving:', error)
      alert('Error al guardar los cambios')
    } finally {
      setSaving(false)
    }
  }

  const handleAddCourse = async () => {
    if (newCourseFile && newCourse.title && newCourse.description && newCourse.duration && newCourse.startDate && newCourse.category) {
      setUploading(true)
      try {
        // Generar nombre único para el archivo
        const timestamp = Date.now()
        const fileName = `course-image-${timestamp}.${newCourseFile.name.split('.').pop()}`
        
        // Subir imagen a Supabase Storage
        const uploadResult = await uploadCourseImage(newCourseFile, fileName)
        if (uploadResult.error) {
          throw new Error(uploadResult.error)
        }

        const result = await saveCourse({
          title: newCourse.title,
          description: newCourse.description,
          image_url: uploadResult.data!,
          duration: newCourse.duration,
          start_date: newCourse.startDate ? new Date(newCourse.startDate).toISOString().split('T')[0] : null,
          capacity: newCourse.capacity,
          category: newCourse.category,
          published: newCourse.published
        })

        if (result.error) {
          throw new Error(result.error)
        }

        // Actualizar estado local
        if (result.data) {
          setCoursesData({
            ...coursesData,
            courses: [...coursesData.courses, {
              id: result.data.id,
              title: result.data.title,
              description: result.data.description,
              image: result.data.image_url,
              duration: result.data.duration,
              startDate: result.data.start_date ? new Date(result.data.start_date).toLocaleDateString('es-ES') : 'Próximamente',
              capacity: result.data.capacity || 20,
              category: result.data.category,
              published: result.data.published
            }]
          })
        }
        setNewCourse({
          title: "",
          description: "",
          image: "",
          duration: "",
          startDate: "",
          capacity: 20,
          category: "",
          published: true
        })
        setNewCourseFile(null)
        alert('Curso agregado correctamente')
      } catch (error) {
        console.error('Error adding course:', error)
        alert('Error al agregar el curso')
      } finally {
        setUploading(false)
      }
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
        // Para curso existente, necesitaríamos implementar actualización de imagen
        // Por ahora solo mostraremos la nueva imagen
        handleUpdateCourse(courseId, 'image', imageUrl)
      } else {
        // Nuevo curso
        setNewCourseFile(file)
        setNewCourse({ ...newCourse, image: imageUrl })
      }
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto text-pjoxante-green" />
          <p className="mt-2 text-gray-600 font-century">Cargando datos...</p>
        </div>
      </div>
    )
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

                  </div>

                  {/* Estado de Publicación */}
                  <div className="space-y-2">
                    <Label className="font-century font-medium">
                      Estado de Publicación
                    </Label>
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="sectionPublished"
                        checked={coursesData.published}
                        onChange={(e) => setCoursesData({ ...coursesData, published: e.target.checked })}
                        className="w-4 h-4 text-pjoxante-green focus:ring-pjoxante-green border-gray-300 rounded"
                      />
                      <Label htmlFor="sectionPublished" className="font-century text-sm">
                        Publicar sección en la página principal
                      </Label>
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

                            {/* Estado de publicación del curso */}
                            <div className="flex items-center space-x-2">
                              <input
                                type="checkbox"
                                id={`course-published-${course.id}`}
                                checked={course.published}
                                onChange={(e) => handleUpdateCourse(course.id, 'published', e.target.checked)}
                                className="w-4 h-4 text-pjoxante-green focus:ring-pjoxante-green border-gray-300 rounded"
                              />
                              <Label htmlFor={`course-published-${course.id}`} className="font-century text-xs">
                                Publicar curso
                              </Label>
                            </div>
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

                      {/* Estado de publicación para nuevo curso */}
                      <div className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id="newCoursePublished"
                          checked={newCourse.published}
                          onChange={(e) => setNewCourse({ ...newCourse, published: e.target.checked })}
                          className="w-4 h-4 text-pjoxante-green focus:ring-pjoxante-green border-gray-300 rounded"
                        />
                        <Label htmlFor="newCoursePublished" className="font-century text-sm">
                          Publicar curso
                        </Label>
                      </div>
                    </div>
                  </div>

                  <div className="pt-2">
                    <PjoxanteButton
                      onClick={handleAddCourse}
                      disabled={!newCourseFile || !newCourse.title || !newCourse.description || !newCourse.duration || !newCourse.startDate || !newCourse.category || uploading}
                      size="sm"
                      className="gap-2"
                    >
                      {uploading ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <Plus className="h-4 w-4" />
                      )}
                      {uploading ? 'Subiendo...' : 'Agregar Curso'}
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
                  disabled={saving}
                  className="gap-2"
                >
                  {saving ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Save className="h-4 w-4" />
                  )}
                  {saving ? 'Guardando...' : 'Guardar Cambios'}
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