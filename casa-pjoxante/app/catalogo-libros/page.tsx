import { Navbar } from "@/components/ui/navbar"
import { Footer } from "@/components/ui/footer"
import { DonationButton } from "@/components/ui/donation-button"
import { SectionContainer } from "@/components/ui/section-container"
import { PjoxanteButton } from "@/components/ui/pjoxante-button"
import { Input } from "@/components/ui/input"
import { COMPONENT_SIZES } from "@/lib/constants"
import { cn } from "@/lib/utils"
import { ArrowLeft, BookOpen, Search, Filter, Download } from "lucide-react"
import Link from "next/link"

export default function CatalogoLibrosPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <main>
        <SectionContainer padding="xl">
          <div className="max-w-6xl mx-auto space-y-8">
            {/* Header */}
            <div className="text-center space-y-4">
              <div className="mx-auto w-24 h-24 bg-pjoxante-green-light rounded-full flex items-center justify-center">
                <BookOpen className="h-12 w-12 text-pjoxante-green" />
              </div>
              
              <h1 className={cn(
                "font-bold text-pjoxante-green font-cerco",
                COMPONENT_SIZES.hero.title
              )}>
                Catálogo de Libros
              </h1>
              <p className={cn(
                "text-gray-600 font-century max-w-3xl mx-auto",
                COMPONENT_SIZES.hero.subtitle
              )}>
                Biblioteca digital especializada en educación popular, arte comunitario, 
                salud integral y desarrollo sostenible. Acceso libre a recursos educativos 
                para la transformación social.
              </p>
            </div>

            {/* Search and Filter Bar */}
            <div className="bg-gray-50 rounded-lg p-6 space-y-4">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input 
                    placeholder="Buscar por título, autor o tema..." 
                    className="pl-10"
                  />
                </div>
                <PjoxanteButton variant="outline" className="inline-flex items-center gap-2">
                  <Filter className="h-4 w-4" />
                  Filtrar por categoría
                </PjoxanteButton>
              </div>
              
              {/* Category Filters */}
              <div className="flex flex-wrap gap-2">
                {['Todos', 'Educación', 'Arte', 'Salud', 'Pedagogía', 'Tecnología', 'Sostenibilidad'].map((category) => (
                  <button
                    key={category}
                    className={cn(
                      "px-3 py-1 rounded-full text-sm transition-colors",
                      category === 'Todos' 
                        ? "bg-pjoxante-green text-white" 
                        : "bg-white text-gray-600 hover:bg-pjoxante-green-light hover:text-pjoxante-green"
                    )}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            {/* Coming Soon Message */}
            <div className="bg-gradient-to-r from-pjoxante-green-light/20 to-pjoxante-green-light/10 rounded-xl p-8 text-center space-y-6">
              <h2 className={cn(
                "font-semibold text-pjoxante-green font-cerco",
                COMPONENT_SIZES.section.title
              )}>
                ¡Estamos digitalizando nuestra biblioteca!
              </h2>
              <p className="text-gray-700 font-century leading-relaxed max-w-2xl mx-auto">
                Nuestro equipo está trabajando en digitalizar y catalogar una extensa 
                colección de recursos educativos. Próximamente podrás acceder a libros, 
                manuales, guías y materiales didácticos especializados en nuestras áreas de trabajo.
              </p>
            </div>

            {/* Preview of Coming Resources */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  title: "Manual de Educación Popular",
                  author: "Equipo Casa Pjoxante",
                  category: "Educación",
                  description: "Metodologías participativas para el aprendizaje comunitario",
                  pages: "120 páginas",
                },
                {
                  title: "Arte Comunitario: Herramientas de Transformación",
                  author: "María González",
                  category: "Arte",
                  description: "Experiencias y metodologías de arte para el desarrollo social",
                  pages: "95 páginas",
                },
                {
                  title: "Salud Integral en Comunidades",
                  author: "Dr. Carlos Mendoza",
                  category: "Salud",
                  description: "Enfoques holísticos para la promoción de la salud comunitaria",
                  pages: "150 páginas",
                },
                {
                  title: "Tecnologías Apropiadas",
                  author: "Ana Rodríguez",
                  category: "Tecnología",
                  description: "Soluciones tecnológicas sostenibles para contextos rurales",
                  pages: "85 páginas",
                },
                {
                  title: "Pedagogía del Bienestar",
                  author: "Colectivo Educativo",
                  category: "Pedagogía",
                  description: "Fundamentos teóricos y prácticos de nuestra metodología educativa",
                  pages: "200 páginas",
                },
                {
                  title: "Guía de Desarrollo Sostenible",
                  author: "Varios autores",
                  category: "Sostenibilidad",
                  description: "Estrategias locales para el desarrollo sustentable",
                  pages: "110 páginas",
                },
              ].map((book, index) => (
                <div key={index} className="bg-white border border-pjoxante-green-light/50 rounded-lg p-6 space-y-4 opacity-75">
                  <div className="h-32 bg-pjoxante-green-light/20 rounded flex items-center justify-center">
                    <BookOpen className="h-12 w-12 text-pjoxante-green/50" />
                  </div>
                  
                  <div className="space-y-2">
                    <span className="inline-block px-2 py-1 bg-pjoxante-green/10 text-pjoxante-green text-xs rounded">
                      {book.category}
                    </span>
                    <h3 className="font-semibold text-pjoxante-green font-cerco text-lg">
                      {book.title}
                    </h3>
                    <p className="text-sm text-gray-600">Por {book.author}</p>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {book.description}
                    </p>
                    <p className="text-xs text-gray-500">{book.pages}</p>
                  </div>
                  
                  <PjoxanteButton variant="outline" size="sm" className="w-full" disabled>
                    <Download className="h-4 w-4 mr-2" />
                    Próximamente
                  </PjoxanteButton>
                </div>
              ))}
            </div>

            {/* Actions */}
            <div className="text-center space-y-4">
              <p className="text-gray-600 font-century">
                ¿Tienes sugerencias de recursos que te gustaría ver en nuestro catálogo?
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <PjoxanteButton size="lg" className="inline-flex items-center gap-2">
                  <BookOpen className="h-4 w-4" />
                  Sugerir recursos
                </PjoxanteButton>
                <Link href="/">
                  <PjoxanteButton variant="outline" size="lg" className="inline-flex items-center gap-2">
                    <ArrowLeft className="h-4 w-4" />
                    Volver al inicio
                  </PjoxanteButton>
                </Link>
              </div>
            </div>
          </div>
        </SectionContainer>
      </main>

      <Footer />
      <DonationButton href="https://donorbox.org/casa-pjoxante" />
    </div>
  )
}