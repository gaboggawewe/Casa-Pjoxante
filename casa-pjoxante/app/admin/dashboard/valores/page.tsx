"use client"

import { useState, useEffect } from "react"
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
import { ArrowLeft, Save, Plus, X, Users, Heart, Lightbulb, TreePine, Star, Target, Globe, Handshake, Loader2 } from "lucide-react"
import { getValuesDataAdmin, saveValuesSection, saveValue, updateValue, deleteValue } from "@/services/values/values-service"

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

interface ValueData {
  id?: string | number
  icon: string
  title: string
  description: string
  orderIndex: number
  published: boolean
}

export default function EditValuesSection() {
  const router = useRouter()
  
  const [valuesData, setValuesData] = useState<{
    title: string
    subtitle: string
    published: boolean
    values: ValueData[]
  }>({
    title: "",
    subtitle: "",
    published: true,
    values: []
  })
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  const [newValue, setNewValue] = useState({
    icon: "Users",
    title: "",
    description: "",
    orderIndex: 0,
    published: true
  })

  // Cargar datos desde la base de datos
  useEffect(() => {
    loadValuesData()
  }, [])

  const loadValuesData = async () => {
    try {
      const result = await getValuesDataAdmin()
      if (result.data) {
        const { section, values } = result.data
        if (section) {
          setValuesData({
            title: section.title,
            subtitle: section.subtitle,
            published: section.published,
            values: values.map(val => ({
              id: val.id,
              icon: val.icon,
              title: val.title,
              description: val.description,
              orderIndex: val.order_index,
              published: val.published
            }))
          })
        }
      }
    } catch (error) {
      console.error('Error loading values data:', error)
      alert('Error al cargar los datos')
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async () => {
    setSaving(true)
    try {
      // Guardar la sección
      const sectionResult = await saveValuesSection({
        title: valuesData.title,
        subtitle: valuesData.subtitle,
        published: valuesData.published
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

  const handleAddValue = async () => {
    if (newValue.title && newValue.description) {
      try {
        const newOrderIndex = Math.max(...valuesData.values.map(val => val.orderIndex), 0) + 1
        const result = await saveValue({
          icon: newValue.icon,
          title: newValue.title,
          description: newValue.description,
          order_index: newOrderIndex,
          published: newValue.published
        })

        if (result.error) {
          throw new Error(result.error)
        }

        // Actualizar estado local
        if (result.data) {
          setValuesData({
            ...valuesData,
            values: [...valuesData.values, {
              id: result.data.id,
              icon: result.data.icon,
              title: result.data.title,
              description: result.data.description,
              orderIndex: result.data.order_index,
              published: result.data.published
            }]
          })
        }
        setNewValue({ icon: "Users", title: "", description: "", orderIndex: 0, published: true })
        alert('Valor agregado correctamente')
      } catch (error) {
        console.error('Error adding value:', error)
        alert('Error al agregar el valor')
      }
    }
  }

  const handleRemoveValue = async (id: string | number) => {
    try {
      const result = await deleteValue(id.toString())
      if (result.error) {
        throw new Error(result.error)
      }
      
      setValuesData({
        ...valuesData,
        values: valuesData.values.filter(value => value.id !== id)
      })
      alert('Valor eliminado correctamente')
    } catch (error) {
      console.error('Error removing value:', error)
      alert('Error al eliminar el valor')
    }
  }

  const handleUpdateValue = async (id: string | number, field: string, value: string | boolean) => {
    try {
      const updateData: Record<string, any> = {}
      if (field === 'icon') updateData.icon = value
      if (field === 'title') updateData.title = value
      if (field === 'description') updateData.description = value
      if (field === 'published') updateData.published = value

      const result = await updateValue(id.toString(), updateData)
      if (result.error) {
        console.error('Error updating value:', result.error)
      }
      
      setValuesData({
        ...valuesData,
        values: valuesData.values.map(val => 
          val.id === id ? { ...val, [field]: value } : val
        )
      })
    } catch (error) {
      console.error('Error updating value:', error)
    }
  }

  const getIconComponent = (iconName: string) => {
    return availableIcons[iconName as keyof typeof availableIcons] || Users
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

                  {/* Estado de Publicación */}
                  <div className="space-y-2">
                    <Label className="font-century font-medium">
                      Estado de Publicación
                    </Label>
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="sectionPublished"
                        checked={valuesData.published}
                        onChange={(e) => setValuesData({ ...valuesData, published: e.target.checked })}
                        className="w-4 h-4 text-pjoxante-green focus:ring-pjoxante-green border-gray-300 rounded"
                      />
                      <Label htmlFor="sectionPublished" className="font-century text-sm">
                        Publicar sección en la página principal
                      </Label>
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

                            {/* Estado de publicación del valor */}
                            <div className="flex items-center space-x-2">
                              <input
                                type="checkbox"
                                id={`value-published-${value.id}`}
                                checked={value.published}
                                onChange={(e) => handleUpdateValue(value.id, 'published', e.target.checked)}
                                className="w-4 h-4 text-pjoxante-green focus:ring-pjoxante-green border-gray-300 rounded"
                              />
                              <Label htmlFor={`value-published-${value.id}`} className="font-century text-xs">
                                Publicar valor
                              </Label>
                            </div>
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

                  {/* Estado de publicación para nuevo valor */}
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="newValuePublished"
                      checked={newValue.published}
                      onChange={(e) => setNewValue({ ...newValue, published: e.target.checked })}
                      className="w-4 h-4 text-pjoxante-green focus:ring-pjoxante-green border-gray-300 rounded"
                    />
                    <Label htmlFor="newValuePublished" className="font-century text-sm">
                      Publicar valor
                    </Label>
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