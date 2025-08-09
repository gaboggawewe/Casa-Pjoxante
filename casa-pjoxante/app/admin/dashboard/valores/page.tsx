"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Navbar } from "@/components/ui/navbar"
import { Footer } from "@/components/ui/footer"
import { SectionContainer } from "@/components/ui/section-container"
import { PjoxanteButton } from "@/components/ui/pjoxante-button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { COMPONENT_SIZES } from "@/lib/constants"
import { cn } from "@/lib/utils"
import { ArrowLeft, Save, Plus, X, Users, Heart, Lightbulb, TreePine, Star, Target, Globe, Handshake } from "lucide-react"

// Iconos disponibles para seleccionar
const availableIcons = {
  Users,
  Heart,
  Lightbulb,
  TreePine,
  Star,
  Target,
  Globe,
  Handshake
}

export default function EditValuesSection() {
  const router = useRouter()
  
  const [valuesData, setValuesData] = useState({
    title: "Nuestros Valores",
    subtitle: "Los pilares que guían nuestro trabajo y compromiso con las comunidades",
    values: [
      {
        id: "1",
        icon: "Users",
        title: "Solidaridad",
        description: "Trabajamos unidos para fortalecer los lazos comunitarios y apoyar a quienes más lo necesitan."
      },
      {
        id: "2",
        icon: "Heart",
        title: "Unidad",
        description: "Creemos en la fuerza de la comunidad trabajando junta hacia objetivos comunes."
      },
      {
        id: "3",
        icon: "TreePine",
        title: "Ecología",
        description: "Promovemos prácticas sostenibles y el cuidado del medio ambiente en todas nuestras actividades."
      },
      {
        id: "4",
        icon: "Lightbulb",
        title: "Trabajo en Equipo",
        description: "Valoramos la colaboración y el intercambio de saberes para el desarrollo colectivo."
      }
    ]
  })

  const [newValue, setNewValue] = useState({
    icon: "Users",
    title: "",
    description: ""
  })

  const handleSave = () => {
    // Aquí se implementará la lógica para guardar en la base de datos
    alert("Cambios guardados correctamente (simulado)")
    router.push('/admin/dashboard')
  }

  const handleAddValue = () => {
    if (newValue.title && newValue.description) {
      const newId = (valuesData.values.length + 1).toString()
      setValuesData({
        ...valuesData,
        values: [...valuesData.values, { ...newValue, id: newId }]
      })
      setNewValue({ icon: "Users", title: "", description: "" })
    }
  }

  const handleRemoveValue = (id: string) => {
    setValuesData({
      ...valuesData,
      values: valuesData.values.filter(value => value.id !== id)
    })
  }

  const handleUpdateValue = (id: string, field: string, value: string) => {
    setValuesData({
      ...valuesData,
      values: valuesData.values.map(val => 
        val.id === id ? { ...val, [field]: value } : val
      )
    })
  }

  const getIconComponent = (iconName: string) => {
    return availableIcons[iconName as keyof typeof availableIcons] || Users
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
                  Editar: Nuestros Valores
                </h1>
                <p className="text-gray-600 font-century mt-1">
                  Gestiona los valores institucionales y su contenido
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
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Título */}
                    <div className="space-y-2">
                      <Label htmlFor="title" className="font-century font-medium">
                        Título de la Sección
                      </Label>
                      <Input
                        id="title"
                        value={valuesData.title}
                        onChange={(e) => setValuesData({ ...valuesData, title: e.target.value })}
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
                        value={valuesData.subtitle}
                        onChange={(e) => setValuesData({ ...valuesData, subtitle: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pjoxante-green focus:border-transparent resize-vertical font-century"
                      />
                    </div>
                  </div>

                </CardContent>
              </Card>

              {/* Valores Actuales */}
              <Card className="shadow-lg border-pjoxante-green-light/50">
                <CardHeader>
                  <CardTitle className="text-pjoxante-green font-cerco">
                    Valores Actuales
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {valuesData.values.map((value) => {
                      const IconComponent = getIconComponent(value.icon)
                      return (
                        <div key={value.id} className="p-4 border border-gray-200 rounded-lg bg-gray-50 relative">
                          <button
                            onClick={() => handleRemoveValue(value.id)}
                            className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                          >
                            <X className="h-4 w-4" />
                          </button>
                          
                          <div className="space-y-4">
                            {/* Vista previa del icono */}
                            <div className="flex items-center gap-3">
                              <div className="w-12 h-12 bg-pjoxante-green-light rounded-full flex items-center justify-center">
                                <IconComponent className="h-6 w-6 text-pjoxante-green" />
                              </div>
                              <div className="flex-1">
                                <select
                                  value={value.icon}
                                  onChange={(e) => handleUpdateValue(value.id, 'icon', e.target.value)}
                                  className="w-full px-3 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-pjoxante-green"
                                >
                                  {Object.keys(availableIcons).map(iconName => (
                                    <option key={iconName} value={iconName}>{iconName}</option>
                                  ))}
                                </select>
                              </div>
                            </div>

                            {/* Título */}
                            <Input
                              placeholder="Título del valor"
                              value={value.title}
                              onChange={(e) => handleUpdateValue(value.id, 'title', e.target.value)}
                              className="font-cerco font-semibold"
                            />

                            {/* Descripción */}
                            <textarea
                              rows={3}
                              placeholder="Descripción del valor"
                              value={value.description}
                              onChange={(e) => handleUpdateValue(value.id, 'description', e.target.value)}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pjoxante-green focus:border-transparent resize-vertical font-century text-sm"
                            />
                          </div>
                        </div>
                      )
                    })}
                  </div>

                </CardContent>
              </Card>

              {/* Agregar Nuevo Valor */}
              <Card className="shadow-lg border-pjoxante-green-light/50 border-dashed">
                <CardHeader>
                  <CardTitle className="text-pjoxante-green font-cerco flex items-center gap-2">
                    <Plus className="h-5 w-5" />
                    Agregar Nuevo Valor
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    
                    {/* Selección de icono */}
                    <div className="space-y-2">
                      <Label className="font-century font-medium">Icono</Label>
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-pjoxante-green-light rounded-full flex items-center justify-center">
                          {(() => {
                            const IconComponent = getIconComponent(newValue.icon)
                            return <IconComponent className="h-5 w-5 text-pjoxante-green" />
                          })()}
                        </div>
                        <select
                          value={newValue.icon}
                          onChange={(e) => setNewValue({ ...newValue, icon: e.target.value })}
                          className="flex-1 px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-pjoxante-green"
                        >
                          {Object.keys(availableIcons).map(iconName => (
                            <option key={iconName} value={iconName}>{iconName}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* Título */}
                    <div className="space-y-2">
                      <Label className="font-century font-medium">Título</Label>
                      <Input
                        placeholder="Nombre del valor"
                        value={newValue.title}
                        onChange={(e) => setNewValue({ ...newValue, title: e.target.value })}
                        className="font-cerco"
                      />
                    </div>

                    {/* Descripción */}
                    <div className="space-y-2">
                      <Label className="font-century font-medium">Descripción</Label>
                      <textarea
                        rows={3}
                        placeholder="Descripción detallada"
                        value={newValue.description}
                        onChange={(e) => setNewValue({ ...newValue, description: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pjoxante-green focus:border-transparent resize-vertical font-century text-sm"
                      />
                    </div>
                  </div>

                  <div className="pt-2">
                    <PjoxanteButton
                      onClick={handleAddValue}
                      disabled={!newValue.title || !newValue.description}
                      size="sm"
                      className="gap-2"
                    >
                      <Plus className="h-4 w-4" />
                      Agregar Valor
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