import { Navbar } from "@/components/ui/navbar"
import { Footer } from "@/components/ui/footer"
import { DonationButton } from "@/components/ui/donation-button"
import { SectionContainer } from "@/components/ui/section-container"
import { PjoxanteButton } from "@/components/ui/pjoxante-button"
import { COMPONENT_SIZES } from "@/lib/constants"
import { cn } from "@/lib/utils"
import { ArrowLeft, MessageSquare, Users, Target, CheckCircle } from "lucide-react"
import Link from "next/link"

export default function ConsultoriasPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <main>
        <SectionContainer padding="xl">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            {/* Header Icon */}
            <div className="mx-auto w-24 h-24 bg-pjoxante-green-light rounded-full flex items-center justify-center">
              <MessageSquare className="h-12 w-12 text-pjoxante-green" />
            </div>

            {/* Page Title */}
            <div className="space-y-4">
              <h1 className={cn(
                "font-bold text-pjoxante-green font-cerco",
                COMPONENT_SIZES.hero.title
              )}>
                Consultorías Casa Pjoxante
              </h1>
              <p className={cn(
                "text-gray-600 font-century max-w-2xl mx-auto",
                COMPONENT_SIZES.hero.subtitle
              )}>
                Acompañamiento especializado para organizaciones que buscan implementar 
                proyectos de desarrollo comunitario sostenible y transformación social.
              </p>
            </div>

            {/* Services Overview */}
            <div className="grid md:grid-cols-3 gap-8 mt-12">
              <div className="bg-white border border-pjoxante-green-light rounded-lg p-6 space-y-4">
                <div className="w-16 h-16 bg-pjoxante-green-light rounded-full mx-auto flex items-center justify-center">
                  <Target className="h-8 w-8 text-pjoxante-green" />
                </div>
                <h3 className="font-semibold text-pjoxante-green font-cerco text-lg">
                  Diagnóstico Participativo
                </h3>
                <p className="text-gray-600 text-sm font-century">
                  Análisis integral de necesidades y potencialidades comunitarias 
                  con metodologías participativas.
                </p>
              </div>

              <div className="bg-white border border-pjoxante-green-light rounded-lg p-6 space-y-4">
                <div className="w-16 h-16 bg-pjoxante-green-light rounded-full mx-auto flex items-center justify-center">
                  <Users className="h-8 w-8 text-pjoxante-green" />
                </div>
                <h3 className="font-semibold text-pjoxante-green font-cerco text-lg">
                  Diseño de Estrategias
                </h3>
                <p className="text-gray-600 text-sm font-century">
                  Desarrollo de planes de acción contextualizados y culturalmente 
                  apropiados para cada comunidad.
                </p>
              </div>

              <div className="bg-white border border-pjoxante-green-light rounded-lg p-6 space-y-4">
                <div className="w-16 h-16 bg-pjoxante-green-light rounded-full mx-auto flex items-center justify-center">
                  <CheckCircle className="h-8 w-8 text-pjoxante-green" />
                </div>
                <h3 className="font-semibold text-pjoxante-green font-cerco text-lg">
                  Evaluación de Impacto
                </h3>
                <p className="text-gray-600 text-sm font-century">
                  Sistemas de monitoreo y evaluación para medir el impacto 
                  social de los proyectos implementados.
                </p>
              </div>
            </div>

            {/* Contact Information */}
            <div className="bg-gradient-to-r from-pjoxante-green-light/20 to-pjoxante-green-light/10 rounded-xl p-8 space-y-6">
              <h2 className={cn(
                "font-semibold text-pjoxante-green font-cerco",
                COMPONENT_SIZES.section.title
              )}>
                ¿Tienes un proyecto en mente?
              </h2>
              <p className="text-gray-700 font-century leading-relaxed max-w-2xl mx-auto">
                Nos especializamos en acompañar organizaciones civiles, instituciones 
                educativas y grupos comunitarios en el diseño e implementación de 
                proyectos de transformación social desde una perspectiva participativa 
                y territorial.
              </p>
              
              <div className="space-y-4">
                <h3 className="font-medium text-pjoxante-green">Áreas de especialización:</h3>
                <div className="grid md:grid-cols-2 gap-3 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-pjoxante-green rounded-full" />
                    <span>Educación popular y comunitaria</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-pjoxante-green rounded-full" />
                    <span>Arte y cultura para el desarrollo</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-pjoxante-green rounded-full" />
                    <span>Salud comunitaria integral</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-pjoxante-green rounded-full" />
                    <span>Tecnologías apropiadas</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-pjoxante-green rounded-full" />
                    <span>Desarrollo organizacional</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-pjoxante-green rounded-full" />
                    <span>Gestión de proyectos sociales</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
              <PjoxanteButton size="lg" className="inline-flex items-center gap-2">
                <MessageSquare className="h-4 w-4" />
                Solicitar consulta
              </PjoxanteButton>
              <Link href="/">
                <PjoxanteButton variant="outline" size="lg" className="inline-flex items-center gap-2">
                  <ArrowLeft className="h-4 w-4" />
                  Volver al inicio
                </PjoxanteButton>
              </Link>
            </div>
          </div>
        </SectionContainer>
      </main>

      <Footer />
      <DonationButton href="https://donorbox.org/casa-pjoxante" />
    </div>
  )
}