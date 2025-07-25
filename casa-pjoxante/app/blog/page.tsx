import { Navbar } from "@/components/ui/navbar"
import { Footer } from "@/components/ui/footer"
import { DonationButton } from "@/components/ui/donation-button"
import { SectionContainer } from "@/components/ui/section-container"
import { PjoxanteButton } from "@/components/ui/pjoxante-button"
import { COMPONENT_SIZES } from "@/lib/constants"
import { cn } from "@/lib/utils"
import { ArrowLeft, Construction } from "lucide-react"
import Link from "next/link"

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <main>
        <SectionContainer padding="xl">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            {/* Construction Icon */}
            <div className="mx-auto w-24 h-24 bg-pjoxante-green-light rounded-full flex items-center justify-center">
              <Construction className="h-12 w-12 text-pjoxante-green" />
            </div>

            {/* Page Title */}
            <div className="space-y-4">
              <h1 className={cn(
                "font-bold text-pjoxante-green font-cerco",
                COMPONENT_SIZES.hero.title
              )}>
                Blog Casa Pjoxante
              </h1>
              <p className={cn(
                "text-gray-600 font-century max-w-2xl mx-auto",
                COMPONENT_SIZES.hero.subtitle
              )}>
                Próximamente encontrarás aquí reflexiones, experiencias y conocimientos 
                compartidos por nuestro equipo y colaboradores de la comunidad.
              </p>
            </div>

            {/* Coming Soon Message */}
            <div className="bg-pjoxante-green-light/20 rounded-lg p-8 space-y-4">
              <h2 className={cn(
                "font-semibold text-pjoxante-green font-cerco",
                COMPONENT_SIZES.section.title
              )}>
                ¡Estamos preparando contenido increíble!
              </h2>
              <p className="text-gray-700 font-century leading-relaxed">
                Nuestro equipo está trabajando en crear un espacio donde podrás encontrar 
                artículos sobre educación comunitaria, transformación social, arte, tecnología 
                apropiada y mucho más. Mientras tanto, puedes conocer más sobre nuestros proyectos 
                y actividades en la página principal.
              </p>
            </div>

            {/* Features Coming Soon */}
            <div className="grid md:grid-cols-3 gap-6 mt-12">
              <div className="text-center space-y-2">
                <div className="w-12 h-12 bg-pjoxante-green rounded-full mx-auto flex items-center justify-center">
                  <span className="text-white font-bold">📚</span>
                </div>
                <h3 className="font-semibold text-pjoxante-green">Artículos educativos</h3>
                <p className="text-sm text-gray-600">Contenido sobre pedagogía del bienestar</p>
              </div>
              <div className="text-center space-y-2">
                <div className="w-12 h-12 bg-pjoxante-green rounded-full mx-auto flex items-center justify-center">
                  <span className="text-white font-bold">🎨</span>
                </div>
                <h3 className="font-semibold text-pjoxante-green">Experiencias artísticas</h3>
                <p className="text-sm text-gray-600">Relatos sobre arte comunitario</p>
              </div>
              <div className="text-center space-y-2">
                <div className="w-12 h-12 bg-pjoxante-green rounded-full mx-auto flex items-center justify-center">
                  <span className="text-white font-bold">🌱</span>
                </div>
                <h3 className="font-semibold text-pjoxante-green">Sostenibilidad</h3>
                <p className="text-sm text-gray-600">Iniciativas de desarrollo sustentable</p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
              <Link href="/">
                <PjoxanteButton size="lg" className="inline-flex items-center gap-2">
                  <ArrowLeft className="h-4 w-4" />
                  Volver al inicio
                </PjoxanteButton>
              </Link>
              <PjoxanteButton variant="outline" size="lg">
                Suscribirse para actualizaciones
              </PjoxanteButton>
            </div>
          </div>
        </SectionContainer>
      </main>

      <Footer />
      <DonationButton href="https://donorbox.org/casa-pjoxante" />
    </div>
  )
}