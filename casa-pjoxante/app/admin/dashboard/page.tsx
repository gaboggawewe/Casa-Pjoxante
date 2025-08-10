"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Navbar } from "@/components/ui/navbar"
import { Footer } from "@/components/ui/footer"
import { SectionContainer } from "@/components/ui/section-container"
import { PjoxanteButton } from "@/components/ui/pjoxante-button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { COMPONENT_SIZES } from "@/lib/constants"
import { cn } from "@/lib/utils"
import { LogOut, Settings, Edit3, Image, FileText, Users, Briefcase, GraduationCap } from "lucide-react"

export default function AdminDashboard() {
  const router = useRouter()

  const handleLogout = () => {
    router.push('/admin')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main>
        <SectionContainer padding="xl">
          <div className="max-w-6xl mx-auto">
            {/* Header */}
            <div className="flex justify-between items-center mb-8">
              <div>
                <h1 className={cn(
                  "font-bold text-pjoxante-green font-cerco",
                  COMPONENT_SIZES.section.title
                )}>
                  Panel de Administración
                </h1>
                <p className="text-gray-600 font-century mt-2">
                  Gestiona el contenido de la página principal
                </p>
              </div>
              <PjoxanteButton 
                onClick={handleLogout}
                variant="outline"
                size="sm"
                className="gap-2"
              >
                <LogOut className="h-4 w-4" />
                Cerrar Sesión
              </PjoxanteButton>
            </div>

            {/* Dashboard Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Sobre la Casa Card */}
              <Card className="shadow-lg border-pjoxante-green-light/50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3 text-pjoxante-green font-cerco">
                    <FileText className="h-5 w-5" />
                    Sobre la Casa
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-gray-600 font-century">
                    Edita el contenido principal y las imágenes del carousel
                  </p>
                  <PjoxanteButton 
                    size="sm" 
                    className="w-full gap-2"
                    onClick={() => router.push('/admin/dashboard/sobre-la-casa')}
                  >
                    <Edit3 className="h-4 w-4" />
                    Editar Contenido
                  </PjoxanteButton>
                </CardContent>
              </Card>

              {/* Nuestros Valores Card */}
              <Card className="shadow-lg border-pjoxante-green-light/50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3 text-pjoxante-green font-cerco">
                    <Users className="h-5 w-5" />
                    Nuestros Valores
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-gray-600 font-century">
                    Gestiona los valores institucionales (Solidaridad, Unidad, Ecología, etc.)
                  </p>
                  <PjoxanteButton 
                    size="sm" 
                    className="w-full gap-2"
                    onClick={() => router.push('/admin/dashboard/valores')}
                  >
                    <Edit3 className="h-4 w-4" />
                    Editar Valores
                  </PjoxanteButton>
                </CardContent>
              </Card>

              {/* Proyectos en Acción Card */}
              <Card className="shadow-lg border-pjoxante-green-light/50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3 text-pjoxante-green font-cerco">
                    <Briefcase className="h-5 w-5" />
                    Proyectos en Acción
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-gray-600 font-century">
                    Administra los proyectos: imágenes, títulos y descripciones
                  </p>
                  <PjoxanteButton 
                    size="sm" 
                    className="w-full gap-2"
                    onClick={() => router.push('/admin/dashboard/proyectos')}
                  >
                    <Edit3 className="h-4 w-4" />
                    Editar Proyectos
                  </PjoxanteButton>
                </CardContent>
              </Card>

              {/* Nuestros Cursos Card */}
              <Card className="shadow-lg border-pjoxante-green-light/50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3 text-pjoxante-green font-cerco">
                    <GraduationCap className="h-5 w-5" />
                    Nuestros Cursos
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-gray-600 font-century">
                    Gestiona la información completa de cursos y capacitaciones
                  </p>
                  <PjoxanteButton 
                    size="sm" 
                    className="w-full gap-2"
                    onClick={() => router.push('/admin/dashboard/cursos')}
                  >
                    <Edit3 className="h-4 w-4" />
                    Editar Cursos
                  </PjoxanteButton>
                </CardContent>
              </Card>

            </div>

            {/* Quick Stats */}
            <div className="mt-8 p-6 bg-pjoxante-green-light/10 rounded-xl border border-pjoxante-green-light/20">
              <h3 className="font-medium text-pjoxante-green font-cerco mb-4 flex items-center gap-2">
                <Settings className="h-5 w-5" />
                Estado del Sistema
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-pjoxante-green font-cerco">4</div>
                  <div className="text-sm text-gray-600">Secciones Editables</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-pjoxante-green font-cerco">-</div>
                  <div className="text-sm text-gray-600">Última Edición</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-pjoxante-green font-cerco">✓</div>
                  <div className="text-sm text-gray-600">Sistema Activo</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-pjoxante-green font-cerco">Frontend</div>
                  <div className="text-sm text-gray-600">Modo Actual</div>
                </div>
              </div>
            </div>

          </div>
        </SectionContainer>
      </main>

      <Footer />
    </div>
  )
}