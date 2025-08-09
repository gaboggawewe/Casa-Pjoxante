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
import { ArrowLeft, Save, Image as ImageIcon, Plus, X } from "lucide-react"

export default function EditAboutSection() {
  const router = useRouter()
  
  // Estado inicial basado en el contenido actual
  const [aboutContent, setAboutContent] = useState({
    title: "Sobre la Casa",
    mainText: `Casa Pjoxante es un espacio de encuentro, aprendizaje y transformación social ubicado en el corazón de Caracas. Nacimos con la misión de fortalecer los lazos comunitarios y promover el desarrollo integral de las personas a través de la educación, la cultura y la solidaridad.

Nuestro trabajo se centra en crear puentes entre diferentes sectores de la sociedad, fomentando la participación ciudadana y la construcción de una comunidad más justa y equitativa. Creemos en el poder transformador de la educación y la importancia de preservar nuestros valores culturales.`,
    images: [
      { src: "/FotosCasaPjoxante/pjoxante_about.jpeg", alt: "Interior de Casa Pjoxante" },
      { src: "/FotosCasaPjoxante/pjoxante-jardin.jpg", alt: "Jardín comunitario" },
      { src: "/FotosCasaPjoxante/pjoxante-alumnos.JPG", alt: "Estudiantes en actividad" }
    ]
  })

  const [newImage, setNewImage] = useState({ src: "", alt: "" })

  const handleSave = () => {
    // Aquí se implementará la lógica para guardar en la base de datos
    alert("Cambios guardados correctamente (simulado)")
    router.push('/admin/dashboard')
  }

  const handleAddImage = () => {
    if (newImage.src && newImage.alt) {
      setAboutContent({
        ...aboutContent,
        images: [...aboutContent.images, { ...newImage }]
      })
      setNewImage({ src: "", alt: "" })
    }
  }

  const handleRemoveImage = (index: number) => {
    const newImages = aboutContent.images.filter((_, i) => i !== index)
    setAboutContent({ ...aboutContent, images: newImages })
  }

  const handleImageFileChange = (e: React.ChangeEvent<HTMLInputElement>, index?: number) => {
    const file = e.target.files?.[0]
    if (file) {
      const imageUrl = URL.createObjectURL(file)
      if (index !== undefined) {
        // Actualizar imagen existente
        const newImages = [...aboutContent.images]
        newImages[index].src = imageUrl
        setAboutContent({ ...aboutContent, images: newImages })
      } else {
        // Nueva imagen
        setNewImage({ ...newImage, src: imageUrl })
      }
    }
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

                  {/* Texto Principal */}
                  <div className="space-y-2">
                    <Label htmlFor="mainText" className="font-century font-medium">
                      Texto Principal
                    </Label>
                    <textarea
                      id="mainText"
                      rows={8}
                      value={aboutContent.mainText}
                      onChange={(e) => setAboutContent({ ...aboutContent, mainText: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pjoxante-green focus:border-transparent resize-vertical font-century"
                    />
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
                      disabled={!newImage.src || !newImage.alt}
                      size="sm"
                      className="mt-4 gap-2"
                    >
                      <Plus className="h-4 w-4" />
                      Agregar Imagen
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