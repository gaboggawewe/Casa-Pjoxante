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
import { COMPONENT_SIZES } from "@/lib/constants"
import { cn } from "@/lib/utils"
import { ArrowLeft, Save, Plus, X, Image as ImageIcon, Users, Briefcase, TrendingUp, Loader2 } from "lucide-react"
import { getProjectsDataAdmin, saveProjectsSection, saveProject, updateProject, deleteProject, uploadProjectImage } from "@/services/projects/projects-service"

interface ProjectData {
  id?: string | number
  src: string
  alt: string
  title: string
  description: string
  orderIndex: number
  published: boolean
}

export default function EditProjectsSection() {
  const router = useRouter()
  
  const [projectsData, setProjectsData] = useState<{
    title: string
    subtitle: string
    activeProjects: number
    communities: number
    beneficiaries: number
    published: boolean
    projects: ProjectData[]
  }>({
    title: "",
    subtitle: "",
    activeProjects: 0,
    communities: 0,
    beneficiaries: 0,
    published: true,
    projects: []
  })
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [uploading, setUploading] = useState(false)

  const [newProject, setNewProject] = useState({
    src: "",
    alt: "",
    title: "",
    description: "",
    orderIndex: 0,
    published: true
  })
  const [newProjectFile, setNewProjectFile] = useState<File | null>(null)

  // Cargar datos desde la base de datos
  useEffect(() => {
    loadProjectsData()
  }, [])

  const loadProjectsData = async () => {
    try {
      const result = await getProjectsDataAdmin()
      if (result.data) {
        const { section, projects } = result.data
        if (section) {
          setProjectsData({
            title: section.title,
            subtitle: section.subtitle,
            activeProjects: section.active_projects,
            communities: section.communities,
            beneficiaries: section.beneficiaries,
            published: section.published,
            projects: projects.map(proj => ({
              id: proj.id,
              src: proj.image_url,
              alt: proj.alt_text,
              title: proj.title,
              description: proj.description,
              orderIndex: proj.order_index,
              published: proj.published
            }))
          })
        }
      }
    } catch (error) {
      console.error('Error loading projects data:', error)
      alert('Error al cargar los datos')
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async () => {
    setSaving(true)
    try {
      // Guardar la sección
      const sectionResult = await saveProjectsSection({
        title: projectsData.title,
        subtitle: projectsData.subtitle,
        active_projects: projectsData.activeProjects,
        communities: projectsData.communities,
        beneficiaries: projectsData.beneficiaries,
        published: projectsData.published
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

  const handleAddProject = async () => {
    if (newProjectFile && newProject.alt && newProject.title && newProject.description) {
      setUploading(true)
      try {
        // Generar nombre único para el archivo
        const timestamp = Date.now()
        const fileName = `project-image-${timestamp}.${newProjectFile.name.split('.').pop()}`
        
        // Subir imagen a Supabase Storage
        const uploadResult = await uploadProjectImage(newProjectFile, fileName)
        if (uploadResult.error) {
          throw new Error(uploadResult.error)
        }

        const newOrderIndex = Math.max(...projectsData.projects.map(p => p.orderIndex), 0) + 1
        const result = await saveProject({
          image_url: uploadResult.data!,
          alt_text: newProject.alt,
          title: newProject.title,
          description: newProject.description,
          order_index: newOrderIndex,
          published: newProject.published
        })

        if (result.error) {
          throw new Error(result.error)
        }

        // Actualizar estado local
        if (result.data) {
          setProjectsData({
            ...projectsData,
            projects: [...projectsData.projects, {
              id: result.data.id,
              src: result.data.image_url,
              alt: result.data.alt_text,
              title: result.data.title,
              description: result.data.description,
              orderIndex: result.data.order_index,
              published: result.data.published
            }]
          })
        }
        setNewProject({ src: "", alt: "", title: "", description: "", orderIndex: 0, published: true })
        setNewProjectFile(null)
        alert('Proyecto agregado correctamente')
      } catch (error) {
        console.error('Error adding project:', error)
        alert('Error al agregar el proyecto')
      } finally {
        setUploading(false)
      }
    }
  }

  const handleRemoveProject = async (id: string | number) => {
    try {
      const result = await deleteProject(id.toString())
      if (result.error) {
        throw new Error(result.error)
      }
      
      setProjectsData({
        ...projectsData,
        projects: projectsData.projects.filter(project => project.id !== id)
      })
      alert('Proyecto eliminado correctamente')
    } catch (error) {
      console.error('Error removing project:', error)
      alert('Error al eliminar el proyecto')
    }
  }

  const handleUpdateProject = async (id: string | number, field: string, value: string | boolean) => {
    try {
      const updateData: Record<string, any> = {}
      if (field === 'src') updateData.image_url = value
      if (field === 'alt') updateData.alt_text = value
      if (field === 'title') updateData.title = value
      if (field === 'description') updateData.description = value
      if (field === 'published') updateData.published = value

      const result = await updateProject(id.toString(), updateData)
      if (result.error) {
        console.error('Error updating project:', result.error)
      }
      
      setProjectsData({
        ...projectsData,
        projects: projectsData.projects.map(project => 
          project.id === id ? { ...project, [field]: value } : project
        )
      })
    } catch (error) {
      console.error('Error updating project:', error)
    }
  }

  const handleImageFileChange = (e: React.ChangeEvent<HTMLInputElement>, projectId?: string) => {
    const file = e.target.files?.[0]
    if (file) {
      const imageUrl = URL.createObjectURL(file)
      if (projectId) {
        // Para proyecto existente, necesitaríamos implementar actualización de imagen
        // Por ahora solo mostraremos la nueva imagen
        handleUpdateProject(projectId, 'src', imageUrl)
      } else {
        // Nueva imagen
        setNewProjectFile(file)
        setNewProject({ ...newProject, src: imageUrl })
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
                  Editar: Proyectos en Acción
                </h1>
                <p className="text-gray-600 font-century mt-1">
                  Administra los proyectos: imágenes, títulos y descripciones
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
                        value={projectsData.title}
                        onChange={(e) => setProjectsData({ ...projectsData, title: e.target.value })}
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
                        value={projectsData.subtitle}
                        onChange={(e) => setProjectsData({ ...projectsData, subtitle: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pjoxante-green focus:border-transparent resize-vertical font-century"
                      />
                    </div>
                  </div>

                </CardContent>
              </Card>

              {/* Estadísticas */}
              <Card className="shadow-lg border-pjoxante-green-light/50">
                <CardHeader>
                  <CardTitle className="text-pjoxante-green font-cerco flex items-center gap-2">
                    <TrendingUp className="h-5 w-5" />
                    Estadísticas
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label className="font-century font-medium">Proyectos Activos</Label>
                      <Input
                        value={projectsData.activeProjects}
                        onChange={(e) => setProjectsData({ ...projectsData, activeProjects: e.target.value })}
                        className="text-center font-bold text-pjoxante-green"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="font-century font-medium">Comunidades Atendidas</Label>
                      <Input
                        value={projectsData.communities}
                        onChange={(e) => setProjectsData({ ...projectsData, communities: e.target.value })}
                        className="text-center font-bold text-pjoxante-green"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="font-century font-medium">Personas Beneficiadas</Label>
                      <Input
                        value={projectsData.beneficiaries}
                        onChange={(e) => setProjectsData({ ...projectsData, beneficiaries: e.target.value })}
                        className="text-center font-bold text-pjoxante-green"
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
                        checked={projectsData.published}
                        onChange={(e) => setProjectsData({ ...projectsData, published: e.target.checked })}
                        className="w-4 h-4 text-pjoxante-green focus:ring-pjoxante-green border-gray-300 rounded"
                      />
                      <Label htmlFor="sectionPublished" className="font-century text-sm">
                        Publicar sección en la página principal
                      </Label>
                    </div>
                  </div>

                </CardContent>
              </Card>

              {/* Proyectos Actuales */}
              <Card className="shadow-lg border-pjoxante-green-light/50">
                <CardHeader>
                  <CardTitle className="text-pjoxante-green font-cerco">
                    Proyectos del Carousel
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    {projectsData.projects.map((project) => (
                      <div key={project.id} className="p-4 border border-gray-200 rounded-lg bg-gray-50 relative">
                        <button
                          onClick={() => handleRemoveProject(project.id)}
                          className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors z-10"
                        >
                          <X className="h-4 w-4" />
                        </button>
                        
                        <div className="space-y-4">
                          {/* Imagen */}
                          <div className="relative">
                            <Image
                              src={project.src}
                              alt={project.alt}
                              width={300}
                              height={200}
                              className="w-full h-40 object-cover rounded-lg"
                            />
                          </div>

                          {/* Campos de edición */}
                          <div className="space-y-3">
                            {/* Título */}
                            <Input
                              placeholder="Título del proyecto"
                              value={project.title}
                              onChange={(e) => handleUpdateProject(project.id, 'title', e.target.value)}
                              className="font-cerco font-semibold"
                            />

                            {/* Descripción */}
                            <textarea
                              rows={3}
                              placeholder="Descripción del proyecto"
                              value={project.description}
                              onChange={(e) => handleUpdateProject(project.id, 'description', e.target.value)}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pjoxante-green focus:border-transparent resize-vertical font-century text-sm"
                            />

                            {/* Texto alternativo */}
                            <Input
                              placeholder="Texto alternativo de la imagen"
                              value={project.alt}
                              onChange={(e) => handleUpdateProject(project.id, 'alt', e.target.value)}
                              className="text-sm"
                            />

                            {/* Cambiar imagen */}
                            <Input
                              type="file"
                              accept="image/*"
                              onChange={(e) => handleImageFileChange(e, project.id)}
                              className="text-sm"
                            />

                            {/* Estado de publicación del proyecto */}
                            <div className="flex items-center space-x-2">
                              <input
                                type="checkbox"
                                id={`project-published-${project.id}`}
                                checked={project.published}
                                onChange={(e) => handleUpdateProject(project.id, 'published', e.target.checked)}
                                className="w-4 h-4 text-pjoxante-green focus:ring-pjoxante-green border-gray-300 rounded"
                              />
                              <Label htmlFor={`project-published-${project.id}`} className="font-century text-xs">
                                Publicar proyecto
                              </Label>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                </CardContent>
              </Card>

              {/* Agregar Nuevo Proyecto */}
              <Card className="shadow-lg border-pjoxante-green-light/50 border-dashed">
                <CardHeader>
                  <CardTitle className="text-pjoxante-green font-cerco flex items-center gap-2">
                    <Plus className="h-5 w-5" />
                    Agregar Nuevo Proyecto
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    
                    {/* Columna izquierda - Imagen */}
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label className="font-century font-medium">Imagen del Proyecto</Label>
                        <Input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleImageFileChange(e)}
                          className="text-sm"
                        />
                      </div>
                      
                      {newProject.src && (
                        <div className="relative">
                          <Image
                            src={newProject.src}
                            alt="Vista previa"
                            width={300}
                            height={200}
                            className="w-full h-40 object-cover rounded-lg border"
                          />
                        </div>
                      )}
                    </div>

                    {/* Columna derecha - Información */}
                    <div className="space-y-4">
                      {/* Título */}
                      <div className="space-y-2">
                        <Label className="font-century font-medium">Título</Label>
                        <Input
                          placeholder="Nombre del proyecto"
                          value={newProject.title}
                          onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
                          className="font-cerco"
                        />
                      </div>

                      {/* Descripción */}
                      <div className="space-y-2">
                        <Label className="font-century font-medium">Descripción</Label>
                        <textarea
                          rows={4}
                          placeholder="Descripción detallada del proyecto"
                          value={newProject.description}
                          onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pjoxante-green focus:border-transparent resize-vertical font-century text-sm"
                        />
                      </div>

                      {/* Texto alternativo */}
                      <div className="space-y-2">
                        <Label className="font-century font-medium">Texto Alternativo</Label>
                        <Input
                          placeholder="Descripción de la imagen"
                          value={newProject.alt}
                          onChange={(e) => setNewProject({ ...newProject, alt: e.target.value })}
                          className="text-sm"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Estado de publicación para nuevo proyecto */}
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="newProjectPublished"
                      checked={newProject.published}
                      onChange={(e) => setNewProject({ ...newProject, published: e.target.checked })}
                      className="w-4 h-4 text-pjoxante-green focus:ring-pjoxante-green border-gray-300 rounded"
                    />
                    <Label htmlFor="newProjectPublished" className="font-century text-sm">
                      Publicar proyecto
                    </Label>
                  </div>

                  <div className="pt-2">
                    <PjoxanteButton
                      onClick={handleAddProject}
                      disabled={!newProjectFile || !newProject.title || !newProject.description || !newProject.alt || uploading}
                      size="sm"
                      className="gap-2"
                    >
                      {uploading ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <Plus className="h-4 w-4" />
                      )}
                      {uploading ? 'Subiendo...' : 'Agregar Proyecto'}
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