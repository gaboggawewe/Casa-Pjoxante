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
import { ArrowLeft, Save, Plus, X, Bot, Loader2, Trash2 } from "lucide-react"
import { 
  getContextosChatAdmin, 
  getContextoChatById, 
  saveContextoChat, 
  updateContextoChat, 
  deleteContextoChat 
} from "@/services/contexto-chat/contexto-chat-service"
import { ContextoChat } from "@/services/contexto-chat/contexto-chat-types"

export default function EditContextoChatSection() {
  const router = useRouter()
  
  const [contextos, setContextos] = useState<ContextoChat[]>([])
  const [selectedContextoId, setSelectedContextoId] = useState<string>("")
  const [selectedContexto, setSelectedContexto] = useState<ContextoChat | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [showNewForm, setShowNewForm] = useState(false)

  const [newContexto, setNewContexto] = useState({
    nombre: "",
    descripcion: ""
  })

  // Cargar todos los contextos
  useEffect(() => {
    loadContextos()
  }, [])

  const loadContextos = async () => {
    try {
      const result = await getContextosChatAdmin()
      if (result.data) {
        setContextos(result.data.contextos)
        if (result.data.contextos.length > 0 && !selectedContextoId) {
          setSelectedContextoId(result.data.contextos[0].id.toString())
        }
      }
    } catch (error) {
      console.error('Error loading contextos:', error)
      alert('Error al cargar los contextos')
    } finally {
      setLoading(false)
    }
  }

  // Cargar contexto específico cuando se selecciona
  useEffect(() => {
    if (selectedContextoId) {
      loadSelectedContexto(selectedContextoId)
    }
  }, [selectedContextoId])

  const loadSelectedContexto = async (id: string) => {
    try {
      const result = await getContextoChatById(id)
      if (result.data) {
        setSelectedContexto(result.data)
      }
    } catch (error) {
      console.error('Error loading selected contexto:', error)
      alert('Error al cargar el contexto seleccionado')
    }
  }

  const handleSaveContexto = async () => {
    if (!selectedContexto) return
    
    setSaving(true)
    try {
      const result = await updateContextoChat(selectedContexto.id.toString(), {
        nombre: selectedContexto.nombre,
        descripcion: selectedContexto.descripcion
      })

      if (result.error) {
        throw new Error(result.error)
      }

      // Actualizar la lista de contextos
      setContextos(contextos.map(c => 
        c.id === selectedContexto.id ? { ...c, ...selectedContexto } : c
      ))

      alert("Contexto actualizado correctamente")
    } catch (error) {
      console.error('Error saving:', error)
      alert('Error al guardar el contexto')
    } finally {
      setSaving(false)
    }
  }

  const handleAddContexto = async () => {
    if (!newContexto.nombre || !newContexto.descripcion) return

    try {
      const result = await saveContextoChat({
        nombre: newContexto.nombre,
        descripcion: newContexto.descripcion
      })

      if (result.error) {
        throw new Error(result.error)
      }

      if (result.data) {
        // Agregar a la lista y seleccionar el nuevo
        const newContextos = [...contextos, result.data]
        setContextos(newContextos)
        setSelectedContextoId(result.data.id.toString())
        setNewContexto({ nombre: "", descripcion: "" })
        setShowNewForm(false)
        alert('Contexto creado correctamente')
      }
    } catch (error) {
      console.error('Error adding contexto:', error)
      alert('Error al crear el contexto')
    }
  }

  const handleDeleteContexto = async (id: number) => {
    if (contextos.length <= 1) {
      alert('No puedes eliminar el último contexto')
      return
    }

    if (!confirm('¿Estás seguro de que quieres eliminar este contexto?')) {
      return
    }

    try {
      const result = await deleteContextoChat(id.toString())
      if (result.error) {
        throw new Error(result.error)
      }
      
      // Remover de la lista
      const newContextos = contextos.filter(c => c.id !== id)
      setContextos(newContextos)
      
      // Si era el seleccionado, seleccionar el primero disponible
      if (selectedContextoId === id.toString()) {
        setSelectedContextoId(newContextos.length > 0 ? newContextos[0].id.toString() : "")
        setSelectedContexto(null)
      }
      
      alert('Contexto eliminado correctamente')
    } catch (error) {
      console.error('Error deleting contexto:', error)
      alert('Error al eliminar el contexto')
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto text-pjoxante-green" />
          <p className="mt-2 text-gray-600 font-century">Cargando contextos...</p>
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
                  Contexto de chat IA
                </h1>
                <p className="text-gray-600 font-century mt-1">
                  Configura el comportamiento y contexto del asistente de IA
                </p>
              </div>
            </div>

            <div className="space-y-6">
              
              {/* Selector de Contexto */}
              <Card className="shadow-lg border-pjoxante-green-light/50">
                <CardHeader>
                  <CardTitle className="text-pjoxante-green font-cerco flex items-center gap-2">
                    <Bot className="h-5 w-5" />
                    Seleccionar Contexto
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  
                  <div className="flex items-center gap-4">
                    <div className="flex-1">
                      <Label className="font-century font-medium">
                        Contexto Activo
                      </Label>
                      <select
                        value={selectedContextoId}
                        onChange={(e) => setSelectedContextoId(e.target.value)}
                        className="w-full mt-2 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pjoxante-green focus:border-transparent font-century"
                      >
                        {contextos.map(contexto => (
                          <option key={contexto.id} value={contexto.id.toString()}>
                            {contexto.nombre}
                          </option>
                        ))}
                      </select>
                    </div>
                    
                    <div className="flex gap-2">
                      <PjoxanteButton
                        onClick={() => setShowNewForm(!showNewForm)}
                        size="sm"
                        variant="outline"
                        className="gap-2"
                      >
                        <Plus className="h-4 w-4" />
                        Nuevo
                      </PjoxanteButton>
                      
                      {contextos.length > 1 && selectedContexto && (
                        <PjoxanteButton
                          onClick={() => handleDeleteContexto(selectedContexto.id)}
                          size="sm"
                          variant="outline"
                          className="gap-2 text-red-600 border-red-600 hover:bg-red-50"
                        >
                          <Trash2 className="h-4 w-4" />
                          Eliminar
                        </PjoxanteButton>
                      )}
                    </div>
                  </div>

                </CardContent>
              </Card>

              {/* Formulario para Nuevo Contexto */}
              {showNewForm && (
                <Card className="shadow-lg border-pjoxante-green-light/50 border-dashed">
                  <CardHeader>
                    <CardTitle className="text-pjoxante-green font-cerco flex items-center gap-2">
                      <Plus className="h-5 w-5" />
                      Crear Nuevo Contexto
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    
                    <div className="space-y-2">
                      <Label className="font-century font-medium">
                        Nombre del Contexto
                      </Label>
                      <Input
                        placeholder="Ej: Contexto para Atención al Cliente"
                        value={newContexto.nombre}
                        onChange={(e) => setNewContexto({ ...newContexto, nombre: e.target.value })}
                        className="font-cerco"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label className="font-century font-medium">
                        Descripción/Prompt
                      </Label>
                      <textarea
                        rows={6}
                        placeholder="Describe aquí el comportamiento y contexto que debe seguir la IA..."
                        value={newContexto.descripcion}
                        onChange={(e) => setNewContexto({ ...newContexto, descripcion: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pjoxante-green focus:border-transparent resize-vertical font-century"
                      />
                    </div>

                    <div className="flex justify-end gap-2">
                      <PjoxanteButton
                        onClick={() => setShowNewForm(false)}
                        variant="outline"
                        size="sm"
                      >
                        Cancelar
                      </PjoxanteButton>
                      <PjoxanteButton
                        onClick={handleAddContexto}
                        disabled={!newContexto.nombre || !newContexto.descripcion}
                        size="sm"
                        className="gap-2"
                      >
                        <Plus className="h-4 w-4" />
                        Crear Contexto
                      </PjoxanteButton>
                    </div>

                  </CardContent>
                </Card>
              )}

              {/* Editor del Contexto Seleccionado */}
              {selectedContexto && (
                <Card className="shadow-lg border-pjoxante-green-light/50">
                  <CardHeader>
                    <CardTitle className="text-pjoxante-green font-cerco">
                      Editar Contexto: {selectedContexto.nombre}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    
                    <div className="space-y-2">
                      <Label htmlFor="contextName" className="font-century font-medium">
                        Nombre del Contexto
                      </Label>
                      <Input
                        id="contextName"
                        value={selectedContexto.nombre}
                        onChange={(e) => setSelectedContexto({ 
                          ...selectedContexto, 
                          nombre: e.target.value 
                        })}
                        className="font-cerco font-semibold"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="contextDescription" className="font-century font-medium">
                        Descripción/Prompt del Contexto
                      </Label>
                      <textarea
                        id="contextDescription"
                        rows={12}
                        value={selectedContexto.descripcion}
                        onChange={(e) => setSelectedContexto({ 
                          ...selectedContexto, 
                          descripcion: e.target.value 
                        })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pjoxante-green focus:border-transparent resize-vertical font-century"
                        placeholder="Describe aquí cómo debe comportarse la IA, qué información debe considerar, cuál es su propósito específico, etc."
                      />
                    </div>

                    {selectedContexto.created_at && (
                      <div className="text-xs text-gray-500 font-century">
                        Creado: {new Date(selectedContexto.created_at).toLocaleString('es-ES')}
                        {selectedContexto.updated_at && selectedContexto.updated_at !== selectedContexto.created_at && (
                          <span className="ml-4">
                            Actualizado: {new Date(selectedContexto.updated_at).toLocaleString('es-ES')}
                          </span>
                        )}
                      </div>
                    )}

                  </CardContent>
                </Card>
              )}

              {/* Botones de Acción */}
              <div className="flex justify-end gap-4">
                <PjoxanteButton
                  onClick={() => router.push('/admin/dashboard')}
                  variant="outline"
                >
                  Cancelar
                </PjoxanteButton>
                {selectedContexto && (
                  <PjoxanteButton
                    onClick={handleSaveContexto}
                    disabled={saving || !selectedContexto.nombre || !selectedContexto.descripcion}
                    className="gap-2"
                  >
                    {saving ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Save className="h-4 w-4" />
                    )}
                    {saving ? 'Guardando...' : 'Guardar Cambios'}
                  </PjoxanteButton>
                )}
              </div>

            </div>
          </div>
        </SectionContainer>
      </main>

      <Footer />
    </div>
  )
}