"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Navbar } from "@/components/ui/navbar"
import { Footer } from "@/components/ui/footer"
import { SectionContainer } from "@/components/ui/section-container"
import { PjoxanteButton } from "@/components/ui/pjoxante-button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { COMPONENT_SIZES } from "@/lib/constants"
import { cn } from "@/lib/utils"
import { ArrowLeft, Save, Eye, Upload, X, Plus } from "lucide-react"
import { createBlogPost, uploadBlogMainImage, uploadBlogAdditionalImages, updateBlogPost } from "@/services/blog/blog-service"
import type { BlogPost } from "@/services/blog/blog-types"

export default function NewBlogPostPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [mainImageUploading, setMainImageUploading] = useState(false)
  const [additionalImagesUploading, setAdditionalImagesUploading] = useState(false)
  
  const [formData, setFormData] = useState({
    title: '',
    subtitle: '',
    content: '',
    slug: '',
    author: '',
    main_image_url: '',
    additional_images: [] as string[],
    published: false
  })

  const [mainImageFile, setMainImageFile] = useState<File | null>(null)
  const [additionalImageFiles, setAdditionalImageFiles] = useState<File[]>([])

  const handleInputChange = (field: keyof typeof formData, value: string | boolean | string[]) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleMainImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setMainImageFile(file)
      // Crear preview
      const reader = new FileReader()
      reader.onload = () => {
        setFormData(prev => ({
          ...prev,
          main_image_url: reader.result as string // Temporal para preview
        }))
      }
      reader.readAsDataURL(file)
    }
  }

  const handleAdditionalImagesSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    setAdditionalImageFiles(prev => [...prev, ...files])
    
    // Crear previews
    files.forEach(file => {
      const reader = new FileReader()
      reader.onload = () => {
        setFormData(prev => ({
          ...prev,
          additional_images: [...prev.additional_images, reader.result as string]
        }))
      }
      reader.readAsDataURL(file)
    })
  }

  const removeAdditionalImage = (index: number) => {
    setFormData(prev => ({
      ...prev,
      additional_images: prev.additional_images.filter((_, i) => i !== index)
    }))
    setAdditionalImageFiles(prev => prev.filter((_, i) => i !== index))
  }

  const handleSave = async (publish: boolean = false) => {
    if (!formData.title.trim() || !formData.content.trim() || !formData.author.trim()) {
      alert('Por favor completa los campos obligatorios: título, contenido y autor')
      return
    }

    setLoading(true)
    try {
      // Crear el post primero
      const postData = {
        ...formData,
        published: publish,
        main_image_url: '', // Se actualizará después
        additional_images: []  // Se actualizará después
      }

      const result = await createBlogPost(postData)
      if (!result.data) {
        alert('Error al crear la publicación: ' + result.error)
        return
      }

      const createdPost = result.data
      let needsUpdate = false
      const updatedData: Partial<BlogPost> = {}

      // Subir imagen principal si existe
      if (mainImageFile) {
        setMainImageUploading(true)
        const fileName = `${createdPost.id}-main-${Date.now()}.${mainImageFile.name.split('.').pop()}`
        const imageResult = await uploadBlogMainImage(mainImageFile, fileName)
        
        if (imageResult.data) {
          updatedData.main_image_url = imageResult.data
          needsUpdate = true
        }
        setMainImageUploading(false)
      }

      // Subir imágenes adicionales si existen
      if (additionalImageFiles.length > 0) {
        setAdditionalImagesUploading(true)
        const imagesResult = await uploadBlogAdditionalImages(additionalImageFiles, createdPost.id)
        
        if (imagesResult.data) {
          updatedData.additional_images = imagesResult.data
          needsUpdate = true
        }
        setAdditionalImagesUploading(false)
      }

      // Actualizar el post en la base de datos con las URLs de las imágenes
      if (needsUpdate) {
        const updateResult = await updateBlogPost(createdPost.id, updatedData)
        if (!updateResult.data) {
          alert('Post creado pero error al guardar las imágenes: ' + updateResult.error)
          return
        }
      }

      alert(`Publicación ${publish ? 'creada y publicada' : 'guardada como borrador'} exitosamente`)
      router.push('/admin/dashboard/blog')
    } catch (error) {
      alert('Error al guardar la publicación')
    } finally {
      setLoading(false)
      setMainImageUploading(false)
      setAdditionalImagesUploading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main>
        <SectionContainer padding="xl">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="flex justify-between items-center mb-8">
              <div className="flex items-center gap-4">
                <PjoxanteButton 
                  onClick={() => router.push('/admin/dashboard/blog')}
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
                    Nueva Publicación
                  </h1>
                  <p className="text-gray-600 font-century mt-2">
                    Crea una nueva publicación para el blog
                  </p>
                </div>
              </div>
              <div className="flex gap-2">
                <PjoxanteButton 
                  onClick={() => handleSave(false)}
                  variant="outline"
                  className="gap-2"
                  disabled={loading}
                >
                  <Save className="h-4 w-4" />
                  Guardar Borrador
                </PjoxanteButton>
                <PjoxanteButton 
                  onClick={() => handleSave(true)}
                  className="gap-2"
                  disabled={loading}
                >
                  <Eye className="h-4 w-4" />
                  Publicar
                </PjoxanteButton>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-6">
                {/* Basic Info */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-pjoxante-green font-cerco">
                      Información Básica
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Título *
                      </label>
                      <Input
                        value={formData.title}
                        onChange={(e) => handleInputChange('title', e.target.value)}
                        placeholder="Título de la publicación"
                        className="w-full"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Subtítulo
                      </label>
                      <Input
                        value={formData.subtitle}
                        onChange={(e) => handleInputChange('subtitle', e.target.value)}
                        placeholder="Subtítulo opcional"
                        className="w-full"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Autor *
                      </label>
                      <Input
                        value={formData.author}
                        onChange={(e) => handleInputChange('author', e.target.value)}
                        placeholder="Nombre del autor"
                        className="w-full"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Slug (URL)
                      </label>
                      <Input
                        value={formData.slug}
                        onChange={(e) => handleInputChange('slug', e.target.value)}
                        placeholder="se-generara-automaticamente-del-titulo"
                        className="w-full"
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        Se generará automáticamente del título si se deja vacío
                      </p>
                    </div>
                  </CardContent>
                </Card>

                {/* Content */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-pjoxante-green font-cerco">
                      Contenido *
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Textarea
                      value={formData.content}
                      onChange={(e) => handleInputChange('content', e.target.value)}
                      placeholder="Escribe el contenido completo de la publicación aquí..."
                      className="w-full min-h-[300px] resize-y"
                    />
                  </CardContent>
                </Card>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Main Image */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-pjoxante-green font-cerco">
                      Imagen Principal
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {formData.main_image_url ? (
                      <div className="relative">
                        <img
                          src={formData.main_image_url}
                          alt="Vista previa"
                          className="w-full h-32 object-cover rounded-lg"
                        />
                        <button
                          onClick={() => {
                            setFormData(prev => ({ ...prev, main_image_url: '' }))
                            setMainImageFile(null)
                          }}
                          className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    ) : (
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                        <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                        <p className="text-sm text-gray-600">
                          Seleccionar imagen principal
                        </p>
                      </div>
                    )}
                    
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleMainImageSelect}
                      className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-pjoxante-green-light file:text-pjoxante-green hover:file:bg-pjoxante-green hover:file:text-white"
                    />
                    {mainImageUploading && (
                      <p className="text-sm text-blue-600">Subiendo imagen principal...</p>
                    )}
                  </CardContent>
                </Card>

                {/* Additional Images */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-pjoxante-green font-cerco">
                      Imágenes Adicionales
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {formData.additional_images.length > 0 && (
                      <div className="space-y-2">
                        {formData.additional_images.map((imageUrl, index) => (
                          <div key={index} className="relative">
                            <img
                              src={imageUrl}
                              alt={`Adicional ${index + 1}`}
                              className="w-full h-20 object-cover rounded-lg"
                            />
                            <button
                              onClick={() => removeAdditionalImage(index)}
                              className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                            >
                              <X className="w-2 h-2" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                    
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handleAdditionalImagesSelect}
                      className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-pjoxante-green-light file:text-pjoxante-green hover:file:bg-pjoxante-green hover:file:text-white"
                    />
                    {additionalImagesUploading && (
                      <p className="text-sm text-blue-600">Subiendo imágenes adicionales...</p>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </SectionContainer>
      </main>

      <Footer />
    </div>
  )
}