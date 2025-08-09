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
import { COMPONENT_SIZES } from "@/lib/constants"
import { cn } from "@/lib/utils"
import { ArrowLeft, Save, Plus, X, Image as ImageIcon, Users, Briefcase, TrendingUp } from "lucide-react"

export default function EditProjectsSection() {
  const router = useRouter()
  
  const [projectsData, setProjectsData] = useState({
    title: "Proyectos en Acción",
    subtitle: "Conoce algunos de los proyectos y actividades que desarrollamos junto a las comunidades para construir un futuro más justo y sostenible",
    projects: [
      {
        id: "1",
        src: "/FotosCasaPjoxante/IMG_2150.JPG",
        alt: "Taller de arte comunitario",
        title: "Taller de Arte Comunitario",
        description: "Fortaleciendo la identidad cultural a través del arte y la expresión creativa."
      },
      {
        id: "2",
        src: "/FotosCasaPjoxante/IMG_2163.JPG",
        alt: "Programa de educación ambiental",
        title: "Educación Ambiental",
        description: "Promoviendo prácticas sostenibles y cuidado del medio ambiente."
      },
      {
        id: "3",
        src: "/FotosCasaPjoxante/pjoxante_about.jpeg",
        alt: "Capacitación en salud comunitaria",
        title: "Salud Comunitaria",
        description: "Empoderando a las comunidades con conocimientos de salud preventiva."
      },
      {
        id: "4",
        src: "/FotosCasaPjoxante/WhatsApp Image 2024-08-19 at 22.07.34 (2).jpeg",
        alt: "Huerto urbano comunitario",
        title: "Huertos Urbanos",
        description: "Construyendo soberanía alimentaria y espacios de encuentro."
      },
      {
        id: "5",
        src: "/FotosCasaPjoxante/WhatsApp Image 2024-08-19 at 22.07.35 (1).jpeg",
        alt: "Biblioteca comunitaria",
        title: "Biblioteca Comunitaria",
        description: "Democratizando el acceso al conocimiento y la educación."
      }
    ],
    stats: {
      activeProjects: "25+",
      communities: "8",
      beneficiaries: "500+"
    }
  })

  const [newProject, setNewProject] = useState({
    src: "",
    alt: "",
    title: "",
    description: ""
  })

  const handleSave = () => {
    // Aquí se implementará la lógica para guardar en la base de datos
    alert("Cambios guardados correctamente (simulado)")
    router.push('/admin/dashboard')
  }

  const handleAddProject = () => {
    if (newProject.src && newProject.alt && newProject.title && newProject.description) {
      const newId = (projectsData.projects.length + 1).toString()
      setProjectsData({
        ...projectsData,
        projects: [...projectsData.projects, { ...newProject, id: newId }]
      })
      setNewProject({ src: "", alt: "", title: "", description: "" })
    }
  }

  const handleRemoveProject = (id: string) => {
    setProjectsData({
      ...projectsData,
      projects: projectsData.projects.filter(project => project.id !== id)
    })
  }

  const handleUpdateProject = (id: string, field: string, value: string) => {
    setProjectsData({
      ...projectsData,
      projects: projectsData.projects.map(project => 
        project.id === id ? { ...project, [field]: value } : project
      )
    })
  }

  const handleImageFileChange = (e: React.ChangeEvent<HTMLInputElement>, projectId?: string) => {
    const file = e.target.files?.[0]
    if (file) {
      const imageUrl = URL.createObjectURL(file)
      if (projectId) {
        // Actualizar proyecto existente
        handleUpdateProject(projectId, 'src', imageUrl)
      } else {
        // Nueva imagen
        setNewProject({ ...newProject, src: imageUrl })
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
                        value={projectsData.stats.activeProjects}
                        onChange={(e) => setProjectsData({
                          ...projectsData,
                          stats: { ...projectsData.stats, activeProjects: e.target.value }
                        })}
                        className="text-center font-bold text-pjoxante-green"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="font-century font-medium">Comunidades Atendidas</Label>
                      <Input
                        value={projectsData.stats.communities}
                        onChange={(e) => setProjectsData({
                          ...projectsData,
                          stats: { ...projectsData.stats, communities: e.target.value }
                        })}
                        className="text-center font-bold text-pjoxante-green"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="font-century font-medium">Personas Beneficiadas</Label>
                      <Input
                        value={projectsData.stats.beneficiaries}
                        onChange={(e) => setProjectsData({
                          ...projectsData,
                          stats: { ...projectsData.stats, beneficiaries: e.target.value }
                        })}
                        className="text-center font-bold text-pjoxante-green"
                      />
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

                  <div className="pt-2">
                    <PjoxanteButton
                      onClick={handleAddProject}
                      disabled={!newProject.src || !newProject.title || !newProject.description || !newProject.alt}
                      size="sm"
                      className="gap-2"
                    >
                      <Plus className="h-4 w-4" />
                      Agregar Proyecto
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