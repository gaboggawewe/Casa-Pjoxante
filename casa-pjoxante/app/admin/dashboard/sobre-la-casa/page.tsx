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
import { ArrowLeft, Save, Image as ImageIcon, Plus, X, Loader2 } from "lucide-react"
import { getAboutDataAdmin, saveAboutSection, saveAboutImage, updateAboutImage, deleteAboutImage, uploadAboutImage } from "@/services/about/about-service"

interface ImageData {
  id?: string | number
  src: string
  alt: string
  orderIndex: number
  published: boolean
}

export default function EditAboutSection() {
  const router = useRouter()
  
  const [aboutContent, setAboutContent] = useState<{
    title: string
    introText: string
    whatWeDoText: string
    howWeDoText: string
    published: boolean
    images: ImageData[]
  }>({
    title: "",
    introText: "",
    whatWeDoText: "",
    howWeDoText: "",
    published: true,
    images: []
  })
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [uploading, setUploading] = useState(false)

  const [newImage, setNewImage] = useState({ src: "", alt: "", orderIndex: 0, published: true })
  const [newImageFile, setNewImageFile] = useState<File | null>(null)

  // Cargar datos desde la base de datos
  useEffect(() => {
    loadAboutData()
  }, [])

  const loadAboutData = async () => {
    try {
      const result = await getAboutDataAdmin()
      if (result.data) {
        const { section, images } = result.data
        if (section) {
          setAboutContent({
            title: section.title,
            introText: section.intro_text,
            whatWeDoText: section.what_we_do_text,
            howWeDoText: section.how_we_do_text,
            published: section.published,
            images: images.map(img => ({
              id: img.id,
              src: img.image_url,
              alt: img.alt_text,
              orderIndex: img.order_index,
              published: img.published
            }))
          })
        }
      }
    } catch (error) {
      console.error('Error loading about data:', error)
      alert('Error al cargar los datos')
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async () => {
    setSaving(true)
    try {
      // Guardar la sección
      const sectionResult = await saveAboutSection({
        title: aboutContent.title,
        intro_text: aboutContent.introText,
        what_we_do_text: aboutContent.whatWeDoText,
        how_we_do_text: aboutContent.howWeDoText,
        published: aboutContent.published
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

  const handleAddImage = async () => {
    if (newImageFile && newImage.alt) {
      setUploading(true)
      try {
        // Generar nombre único para el archivo
        const timestamp = Date.now()
        const fileName = `about-image-${timestamp}.${newImageFile.name.split('.').pop()}`
        
        // Subir imagen a Supabase Storage
        const uploadResult = await uploadAboutImage(newImageFile, fileName)
        if (uploadResult.error) {
          throw new Error(uploadResult.error)
        }

        const newOrderIndex = Math.max(...aboutContent.images.map(img => img.orderIndex), 0) + 1
        const result = await saveAboutImage({
          image_url: uploadResult.data!,
          alt_text: newImage.alt,
          order_index: newOrderIndex,
          published: newImage.published
        })

        if (result.error) {
          throw new Error(result.error)
        }

        // Actualizar estado local
        if (result.data) {
          setAboutContent({
            ...aboutContent,
            images: [...aboutContent.images, {
              id: result.data.id,
              src: result.data.image_url,
              alt: result.data.alt_text,
              orderIndex: result.data.order_index,
              published: result.data.published
            }]
          })
        }
        setNewImage({ src: "", alt: "", orderIndex: 0, published: true })
        setNewImageFile(null)
        alert('Imagen agregada correctamente')
      } catch (error) {
        console.error('Error adding image:', error)
        alert('Error al agregar la imagen')
      } finally {
        setUploading(false)
      }
    }
  }

  const handleRemoveImage = async (index: number) => {
    const imageToRemove = aboutContent.images[index]
    if (imageToRemove.id) {
      try {
        const result = await deleteAboutImage(imageToRemove.id.toString())
        if (result.error) {
          throw new Error(result.error)
        }
        
        const newImages = aboutContent.images.filter((_, i) => i !== index)
        setAboutContent({ ...aboutContent, images: newImages })
        alert('Imagen eliminada correctamente')
      } catch (error) {
        console.error('Error removing image:', error)
        alert('Error al eliminar la imagen')
      }
    } else {
      const newImages = aboutContent.images.filter((_, i) => i !== index)
      setAboutContent({ ...aboutContent, images: newImages })
    }
  }

  const handleImageFileChange = (e: React.ChangeEvent<HTMLInputElement>, index?: number) => {
    const file = e.target.files?.[0]
    if (file) {
      const imageUrl = URL.createObjectURL(file)
      if (index !== undefined) {
        // Para imagen existente, necesitaríamos implementar actualización de imagen
        // Por ahora solo mostraremos la nueva imagen
        const newImages = [...aboutContent.images]
        newImages[index].src = imageUrl
        setAboutContent({ ...aboutContent, images: newImages })
      } else {
        // Nueva imagen
        setNewImageFile(file)
        setNewImage({ ...newImage, src: imageUrl })
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
                  Editar: Sobre la Casa
                </h1>
                <p className="text-gray-600 font-century mt-1">
                  Modifica el contenido principal y las imágenes del carousel
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
                      Título de la Sección
                    </Label>
                    <Input
                      id="title"
                      value={aboutContent.title}
                      onChange={(e) => setAboutContent({ ...aboutContent, title: e.target.value })}
                      className="font-cerco text-lg"
                    />
                  </div>

                  {/* Texto de Introducción */}
                  <div className="space-y-2">
                    <Label htmlFor="introText" className="font-century font-medium">
                      Texto de Introducción (Significado de "pjoxante")
                    </Label>
                    <textarea
                      id="introText"
                      rows={3}
                      value={aboutContent.introText}
                      onChange={(e) => setAboutContent({ ...aboutContent, introText: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pjoxante-green focus:border-transparent resize-vertical font-century"
                    />
                  </div>

                  {/* ¿Qué hacemos? */}
                  <div className="space-y-2">
                    <Label htmlFor="whatWeDoText" className="font-century font-medium">
                      ¿Qué hacemos?
                    </Label>
                    <textarea
                      id="whatWeDoText"
                      rows={4}
                      value={aboutContent.whatWeDoText}
                      onChange={(e) => setAboutContent({ ...aboutContent, whatWeDoText: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pjoxante-green focus:border-transparent resize-vertical font-century"
                    />
                  </div>

                  {/* ¿Cómo lo hacemos? */}
                  <div className="space-y-2">
                    <Label htmlFor="howWeDoText" className="font-century font-medium">
                      ¿Cómo lo hacemos?
                    </Label>
                    <textarea
                      id="howWeDoText"
                      rows={4}
                      value={aboutContent.howWeDoText}
                      onChange={(e) => setAboutContent({ ...aboutContent, howWeDoText: e.target.value })}
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
                        checked={aboutContent.published}
                        onChange={(e) => setAboutContent({ ...aboutContent, published: e.target.checked })}
                        className="w-4 h-4 text-pjoxante-green focus:ring-pjoxante-green border-gray-300 rounded"
                      />
                      <Label htmlFor="published" className="font-century text-sm">
                        Publicar sección en la página principal
                      </Label>
                    </div>
                  </div>

                </CardContent>
              </Card>

              {/* Gestión de Imágenes */}
              <Card className="shadow-lg border-pjoxante-green-light/50">
                <CardHeader>
                  <CardTitle className="text-pjoxante-green font-cerco flex items-center gap-2">
                    <ImageIcon className="h-5 w-5" />
                    Carousel de Imágenes
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  
                  {/* Imágenes Existentes */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {aboutContent.images.map((image, index) => (
                      <div key={index} className="space-y-3 p-4 border border-gray-200 rounded-lg bg-gray-50">
                        <div className="relative">
                          <Image
                            src={image.src}
                            alt={image.alt}
                            width={300}
                            height={200}
                            className="w-full h-40 object-cover rounded-lg"
                          />
                          <button
                            onClick={() => handleRemoveImage(index)}
                            className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </div>
                        
                        <div className="space-y-2">
                          <Input
                            placeholder="Texto alternativo de la imagen"
                            value={image.alt}
                            onChange={(e) => {
                              const newImages = [...aboutContent.images]
                              newImages[index].alt = e.target.value
                              setAboutContent({ ...aboutContent, images: newImages })
                            }}
                            className="text-sm"
                          />
                          <Input
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleImageFileChange(e, index)}
                            className="text-sm"
                          />
                          <div className="flex items-center space-x-2">
                            <input
                              type="checkbox"
                              id={`published-${index}`}
                              checked={image.published}
                              onChange={(e) => {
                                const newImages = [...aboutContent.images]
                                newImages[index].published = e.target.checked
                                setAboutContent({ ...aboutContent, images: newImages })
                              }}
                              className="w-4 h-4 text-pjoxante-green focus:ring-pjoxante-green border-gray-300 rounded"
                            />
                            <Label htmlFor={`published-${index}`} className="font-century text-xs">
                              Publicar imagen
                            </Label>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Agregar Nueva Imagen */}
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 bg-gray-50">
                    <h4 className="font-medium text-gray-700 font-century mb-4 flex items-center gap-2">
                      <Plus className="h-4 w-4" />
                      Agregar Nueva Imagen
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label className="text-sm font-century">Seleccionar Imagen</Label>
                        <Input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleImageFileChange(e)}
                          className="text-sm"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-sm font-century">Texto Alternativo</Label>
                        <Input
                          placeholder="Descripción de la imagen"
                          value={newImage.alt}
                          onChange={(e) => setNewImage({ ...newImage, alt: e.target.value })}
                          className="text-sm"
                        />
                      </div>
                    </div>
                    <div className="col-span-2">
                      <div className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id="newImagePublished"
                          checked={newImage.published}
                          onChange={(e) => setNewImage({ ...newImage, published: e.target.checked })}
                          className="w-4 h-4 text-pjoxante-green focus:ring-pjoxante-green border-gray-300 rounded"
                        />
                        <Label htmlFor="newImagePublished" className="font-century text-sm">
                          Publicar imagen
                        </Label>
                      </div>
                    </div>
                    {newImage.src && (
                      <div className="mt-4">
                        <Image
                          src={newImage.src}
                          alt="Vista previa"
                          width={200}
                          height={130}
                          className="h-32 w-48 object-cover rounded-lg border"
                        />
                      </div>
                    )}
                    <PjoxanteButton
                      onClick={handleAddImage}
                      disabled={!newImageFile || !newImage.alt || uploading}
                      size="sm"
                      className="mt-4 gap-2"
                    >
                      {uploading ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <Plus className="h-4 w-4" />
                      )}
                      {uploading ? 'Subiendo...' : 'Agregar Imagen'}
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