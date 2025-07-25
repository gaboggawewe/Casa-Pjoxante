"use client"

import { Navbar } from "@/components/ui/navbar"
import { Footer } from "@/components/ui/footer"
import { SectionContainer } from "@/components/ui/section-container"
import { PjoxanteButton } from "@/components/ui/pjoxante-button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { COMPONENT_SIZES } from "@/lib/constants"
import { cn } from "@/lib/utils"
import { Lock, User, Eye, EyeOff } from "lucide-react"
import { useState } from "react"

export default function AdminPage() {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main>
        <SectionContainer padding="xl">
          <div className="max-w-md mx-auto">
            <Card className="shadow-xl border-pjoxante-green-light/50">
              <CardHeader className="text-center space-y-4 pb-8">
                <div className="mx-auto w-16 h-16 bg-pjoxante-green rounded-full flex items-center justify-center">
                  <Lock className="h-8 w-8 text-white" />
                </div>
                <div className="space-y-2">
                  <h1 className={cn(
                    "font-bold text-pjoxante-green font-cerco",
                    COMPONENT_SIZES.section.title
                  )}>
                    Acceso Administrativo
                  </h1>
                  <p className="text-gray-600 font-century text-sm">
                    Panel de administración para gestión de contenido
                  </p>
                </div>
              </CardHeader>

              <CardContent className="space-y-6">
                {/* Login Form */}
                <form className="space-y-4">
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium text-gray-700">
                      Email de administrador
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input 
                        id="email"
                        type="email" 
                        placeholder="admin@casapjoxante.org"
                        className="pl-10"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="password" className="text-sm font-medium text-gray-700">
                      Contraseña
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input 
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••"
                        className="pl-10 pr-10"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </button>
                    </div>
                  </div>

                  <PjoxanteButton type="submit" className="w-full" size="lg">
                    Iniciar Sesión
                  </PjoxanteButton>
                </form>

                {/* Features Info */}
                <div className="bg-pjoxante-green-light/10 rounded-lg p-4">
                  <h3 className="font-medium text-pjoxante-green font-cerco mb-3 text-sm">
                    Funciones del panel administrativo:
                  </h3>
                  <div className="space-y-2 text-xs text-gray-600">
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-pjoxante-green rounded-full" />
                      <span>Gestión de artículos del blog (CRUD)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-pjoxante-green rounded-full" />
                      <span>Editor de contenido con imágenes</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-pjoxante-green rounded-full" />
                      <span>Control de publicación (público/privado)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-pjoxante-green rounded-full" />
                      <span>Gestión de cursos y eventos</span>
                    </div>
                  </div>
                </div>

                {/* Development Note */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <p className="text-xs text-blue-700">
                    <strong>Nota de desarrollo:</strong> La funcionalidad de administración 
                    se implementará una vez que se configure la base de datos Supabase y 
                    el sistema de autenticación.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </SectionContainer>
      </main>

      <Footer />
    </div>
  )
}