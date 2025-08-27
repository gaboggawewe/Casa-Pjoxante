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
import { ArrowLeft, Save, Image as ImageIcon, TrendingUp, Users, Calendar, Loader2 } from "lucide-react"
import { getHeroDataAdmin, saveHeroSection, uploadHeroLogo, uploadHeroBackground } from "@/services/hero/hero-service"

export default function EditHeroSection() {
  const router = useRouter()
  
  const [heroData, setHeroData] = useState<{
    title: string
    subtitle: string
    logoUrl: string
    backgroundImageUrl: string
    beneficiaries: number
    events: number
    activeProjects: number
    published: boolean
  }>({
    title: "",
    subtitle: "",
    logoUrl: "",
    backgroundImageUrl: "",
    beneficiaries: 0,
    events: 0,
    activeProjects: 0,
    published: true
  })
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [uploadingLogo, setUploadingLogo] = useState(false)
  const [uploadingBackground, setUploadingBackground] = useState(false)

  // Cargar datos desde la base de datos
  useEffect(() => {
    loadHeroData()
  }, [])

  const loadHeroData = async () => {
    try {
      const result = await getHeroDataAdmin()
      if (result.data?.section) {
        const section = result.data.section
        setHeroData({
          title: section.title,
          subtitle: section.subtitle,
          logoUrl: section.logo_url,
          backgroundImageUrl: section.background_image_url,
          beneficiaries: section.beneficiaries,
          events: section.events,
          activeProjects: section.active_projects,
          published: section.published
        })
      }
    } catch (error) {
      console.error('Error loading hero data:', error)
      alert('Error al cargar los datos')
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async () => {
    setSaving(true)
    try {
      // Guardar la sección
      const sectionResult = await saveHeroSection({
        title: heroData.title,
        subtitle: heroData.subtitle,
        logo_url: heroData.logoUrl,
        background_image_url: heroData.backgroundImageUrl,
        beneficiaries: heroData.beneficiaries,
        events: heroData.events,
        active_projects: heroData.activeProjects,
        published: heroData.published
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

  const handleLogoFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setUploadingLogo(true)
      try {
        const timestamp = Date.now()
        const fileName = `logo-${timestamp}.${file.name.split('.').pop()}`
        
        const uploadResult = await uploadHeroLogo(file, fileName)
        if (uploadResult.error) {
          throw new Error(uploadResult.error)
        }

        setHeroData({ ...heroData, logoUrl: uploadResult.data! })
        alert('Logo actualizado correctamente')
      } catch (error) {
        console.error('Error uploading logo:', error)
        alert('Error al subir el logo')
      } finally {
        setUploadingLogo(false)
      }
    }
  }

  const handleBackgroundFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setUploadingBackground(true)
      try {
        const timestamp = Date.now()
        const fileName = `background-${timestamp}.${file.name.split('.').pop()}`
        
        const uploadResult = await uploadHeroBackground(file, fileName)
        if (uploadResult.error) {
          throw new Error(uploadResult.error)
        }

        setHeroData({ ...heroData, backgroundImageUrl: uploadResult.data! })
        alert('Imagen de fondo actualizada correctamente')
      } catch (error) {
        console.error('Error uploading background:', error)
        alert('Error al subir la imagen de fondo')
      } finally {
        setUploadingBackground(false)
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
          <div className="max-w-4xl mx-auto">
            
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
                  Editar: Sección Principal
                </h1>
                <p className="text-gray-600 font-century mt-1">
                  Modifica el contenido de la portada y las estadísticas principales
                </p>
              </div>
            </div>

            <div className="space-y-6">
              
              {/* Contenido Principal */}
              <Card className="shadow-lg border-pjoxante-green-light/50">
                <CardHeader>
                  <CardTitle className="text-pjoxante-green font-cerco">
                    Contenido Principal
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  
                  {/* Título */}
                  <div className="space-y-2">
                    <Label htmlFor="title" className="font-century font-medium">
                      Título Principal
                    </Label>
                    <Input
                      id="title"
                      value={heroData.title}
                      onChange={(e) => setHeroData({ ...heroData, title: e.target.value })}
                      className="font-cerco text-lg"
                    />
                  </div>

                  {/* Subtítulo */}
                  <div className="space-y-2">
                    <Label htmlFor="subtitle" className="font-century font-medium">
                      Subtítulo (opcional)
                    </Label>
                    <textarea
                      id="subtitle"
                      rows={2}
                      value={heroData.subtitle}
                      onChange={(e) => setHeroData({ ...heroData, subtitle: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pjoxante-green focus:border-transparent resize-vertical font-century"
                    />
                  </div>

                  {/* Estado de Publicación */}
                  <div className="space-y-2">
                    <Label className="font-century font-medium">
                      Estado de Publicación
                    </Label>
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="published"
                        checked={heroData.published}
                        onChange={(e) => setHeroData({ ...heroData, published: e.target.checked })}
                        className="w-4 h-4 text-pjoxante-green focus:ring-pjoxante-green border-gray-300 rounded"
                      />
                      <Label htmlFor="published" className="font-century text-sm">
                        Publicar sección en la página principal
                      </Label>
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
                      <Label className="font-century font-medium flex items-center gap-2">
                        <Users className="h-4 w-4" />
                        Beneficiarios
                      </Label>
                      <Input
                        type="number"
                        value={heroData.beneficiaries}
                        onChange={(e) => setHeroData({ ...heroData, beneficiaries: parseInt(e.target.value) || 0 })}
                        className="text-center font-bold text-pjoxante-green"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="font-century font-medium flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        Eventos Realizados
                      </Label>
                      <Input
                        type="number"
                        value={heroData.events}
                        onChange={(e) => setHeroData({ ...heroData, events: parseInt(e.target.value) || 0 })}
                        className="text-center font-bold text-pjoxante-green"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="font-century font-medium flex items-center gap-2">
                        <TrendingUp className="h-4 w-4" />
                        Proyectos Activos
                      </Label>
                      <Input
                        type="number"
                        value={heroData.activeProjects}
                        onChange={(e) => setHeroData({ ...heroData, activeProjects: parseInt(e.target.value) || 0 })}
                        className="text-center font-bold text-pjoxante-green"
                      />
                    </div>
                  </div>

                </CardContent>
              </Card>

              {/* Imágenes */}
              <Card className="shadow-lg border-pjoxante-green-light/50">
                <CardHeader>
                  <CardTitle className="text-pjoxante-green font-cerco flex items-center gap-2">
                    <ImageIcon className="h-5 w-5" />
                    Imágenes
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  
                  {/* Logo */}
                  <div className="space-y-4">
                    <Label className="font-century font-medium text-base">
                      Logo Principal
                    </Label>
                    
                    {heroData.logoUrl && (
                      <div className="flex justify-center">
                        <Image
                          src={heroData.logoUrl}
                          alt="Logo actual"
                          width={300}
                          height={200}
                          className="max-w-sm object-contain border rounded-lg p-4 bg-white"
                        />
                      </div>
                    )}
                    
                    <div className="space-y-2">
                      <Label className="text-sm font-century">Cambiar Logo</Label>
                      <Input
                        type="file"
                        accept="image/*"
                        onChange={handleLogoFileChange}
                        disabled={uploadingLogo}
                        className="text-sm"
                      />
                      {uploadingLogo && (
                        <p className="text-sm text-gray-500 flex items-center gap-2">
                          <Loader2 className="h-4 w-4 animate-spin" />
                          Subiendo logo...
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Imagen de Fondo */}
                  <div className="space-y-4">
                    <Label className="font-century font-medium text-base">
                      Imagen de Fondo
                    </Label>
                    
                    {heroData.backgroundImageUrl && (
                      <div className="relative">
                        <Image
                          src={heroData.backgroundImageUrl}
                          alt="Imagen de fondo actual"
                          width={600}
                          height={300}
                          className="w-full h-48 object-cover rounded-lg border"
                        />
                      </div>
                    )}
                    
                    <div className="space-y-2">
                      <Label className="text-sm font-century">Cambiar Imagen de Fondo</Label>
                      <Input
                        type="file"
                        accept="image/*"
                        onChange={handleBackgroundFileChange}
                        disabled={uploadingBackground}
                        className="text-sm"
                      />
                      {uploadingBackground && (
                        <p className="text-sm text-gray-500 flex items-center gap-2">
                          <Loader2 className="h-4 w-4 animate-spin" />
                          Subiendo imagen de fondo...
                        </p>
                      )}
                    </div>
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