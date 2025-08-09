import { Navbar } from "@/components/ui/navbar"
import { Footer } from "@/components/ui/footer"
import { DonationButton } from "@/components/ui/donation-button"
import { SectionContainer } from "@/components/ui/section-container"
import { AnimatedSection } from "@/components/ui/animated-section"
import { Card, CardContent } from "@/components/ui/card"
import { COMPONENT_SIZES } from "@/lib/constants"
import { cn } from "@/lib/utils"
import { Calendar, User, ArrowRight, BookOpen, Heart, Lightbulb } from "lucide-react"

interface BlogPost {
  id: string
  title: string
  excerpt: string
  author: string
  date: string
  category: string
  image: string
  readTime: string
}

const mockBlogPosts: BlogPost[] = [
  {
    id: "1",
    title: "La Pedagogía del Bienestar: Transformando la Educación Comunitaria",
    excerpt: "Exploramos cómo nuestra metodología pedagógica centrada en el bienestar integral está revolucionando la forma de enseñar y aprender en las comunidades.",
    author: "Equipo Casa Pjoxante",
    date: "2024-07-15",
    category: "Educación",
    image: "/FotosCasaPjoxante/pjoxante-alumnos.JPG",
    readTime: "8 min"
  },
  {
    id: "2", 
    title: "Arte Comunitario: Fortaleciendo Identidades Culturales",
    excerpt: "Descubre cómo el arte se convierte en una herramienta poderosa para fortalecer la identidad cultural y crear vínculos comunitarios más profundos.",
    author: "Sara Mendoza",
    date: "2024-07-08",
    category: "Arte y Cultura",
    image: "/FotosCasaPjoxante/pjoxante-saxo.JPG",
    readTime: "6 min"
  },
  {
    id: "3",
    title: "Huertos Urbanos: Sembrando Soberanía Alimentaria",
    excerpt: "Los huertos urbanos comunitarios no solo producen alimentos frescos, sino que cultivan conocimiento, cooperación y autonomía alimentaria.",
    author: "Miguel Torres",
    date: "2024-06-28",
    category: "Sostenibilidad",
    image: "/FotosCasaPjoxante/WhatsApp Image 2024-08-19 at 22.07.34 (2).jpeg",
    readTime: "10 min"
  },
  {
    id: "4",
    title: "Tecnología Apropiada: Innovación al Servicio de la Comunidad",
    excerpt: "Reflexionamos sobre cómo la tecnología apropiada puede ser una aliada en el desarrollo sustentable y el fortalecimiento comunitario.",
    author: "Ana Ruiz",
    date: "2024-06-20",
    category: "Tecnología",
    image: "/FotosCasaPjoxante/pjoxante-jardin.jpg",
    readTime: "7 min"
  },
  {
    id: "5",
    title: "Salud Comunitaria: Empoderando el Autocuidado Colectivo",
    excerpt: "La salud comunitaria va más allá de la medicina tradicional. Exploramos enfoques integrales que empoderan a las comunidades en su propio cuidado.",
    author: "Dr. Carlos Vega",
    date: "2024-06-12",
    category: "Salud",
    image: "/FotosCasaPjoxante/pjoxante-curso.JPG",
    readTime: "12 min"
  },
  {
    id: "6",
    title: "Construyendo Futuro: Testimonios de Transformación Social",
    excerpt: "Historias reales de personas y comunidades que han encontrado en Casa Pjoxante un espacio para crecer, aprender y transformar su realidad.",
    author: "Comunidad Casa Pjoxante",
    date: "2024-06-05",
    category: "Testimonios",
    image: "/FotosCasaPjoxante/pjoxante-alumnos.JPG",
    readTime: "9 min"
  }
]

const categoryIcons: Record<string, React.ReactNode> = {
  "Educación": <BookOpen className="w-4 h-4" />,
  "Arte y Cultura": <Heart className="w-4 h-4" />,
  "Sostenibilidad": <Lightbulb className="w-4 h-4" />,
  "Tecnología": <Lightbulb className="w-4 h-4" />,
  "Salud": <Heart className="w-4 h-4" />,
  "Testimonios": <User className="w-4 h-4" />
}

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <main className="-mt-16">
        <AnimatedSection direction="up">
          <SectionContainer padding="xl" className="pt-16 pb-8">
            <div className="max-w-4xl mx-auto text-center space-y-8">
              <div className="space-y-8">
                <h1 className={cn(
                  "font-bold text-black font-cerco mb-2 text-7xl lg:text-8xl",

                  COMPONENT_SIZES.section.title
                )}>
                  Publicaciones de Casa Pjoxante
                </h1>
                <p className={cn(
                  "text-xl text-black font-century leading-relaxed mx-auto max-w-3xl",
                  COMPONENT_SIZES.section.subtitle
                )}>
                  Reflexiones, experiencias y conocimientos compartidos por nuestro equipo y colaboradores de la comunidad
                </p>
              </div>
            </div>
          </SectionContainer>
        </AnimatedSection>

        <AnimatedSection direction="up">
          <SectionContainer padding="xl" className="pt-32">
            <div className="max-w-6xl mx-auto">
              <div className="grid lg:grid-cols-2 gap-8">
                {mockBlogPosts.map((post) => (
                  <Card key={post.id} className="group hover:shadow-lg transition-all duration-300 border-[#C1DCAB]/95 hover:border-[#3E8D35] hover:-translate-y-0.5 transform overflow-hidden p-0">
                    <div className="relative overflow-hidden">
                      <img 
                        src={post.image} 
                        alt={post.title}
                        className="w-full h-64 object-cover"
                      />
                      <div className="absolute top-4 left-4">
                        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-pjoxante-green text-white">
                          {categoryIcons[post.category]}
                          {post.category}
                        </span>
                      </div>
                    </div>
                    
                    <CardContent className="space-y-4">
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {new Date(post.date).toLocaleDateString('es-ES', { 
                            year: 'numeric', 
                            month: 'long', 
                            day: 'numeric' 
                          })}
                        </div>
                        <div className="flex items-center gap-1">
                          <User className="w-4 h-4" />
                          {post.author}
                        </div>
                      </div>
                      
                      <h2 className={cn(
                        "font-bold text-pjoxante-green font-cerco",
                        COMPONENT_SIZES.card.title
                      )}>
                        {post.title}
                      </h2>
                      
                      <p className={cn(
                        "text-gray-600 font-century leading-relaxed",
                        COMPONENT_SIZES.card.description
                      )}>
                        {post.excerpt}
                      </p>
                      
                      <div className="pt-6 pb-4">
                        <button className="inline-flex items-center gap-2 text-pjoxante-green font-medium hover:text-pjoxante-green-dark transition-colors group/button">
                          <span>Leer más</span>
                          <ArrowRight className="w-4 h-4 group-hover/button:translate-x-1 transition-transform" />
                        </button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </SectionContainer>
        </AnimatedSection>

        <AnimatedSection direction="up">
          <SectionContainer padding="xl">
            <div className="max-w-4xl mx-auto text-center">
              <div className="bg-pjoxante-green-light/20 rounded-2xl p-8 space-y-6">
                <h2 className={cn(
                  "font-bold text-pjoxante-green font-cerco",
                  COMPONENT_SIZES.section.title
                )}>
                  ¿Quieres contribuir?
                </h2>
                <p className="text-gray-700 font-century leading-relaxed max-w-2xl mx-auto">
                  Si tienes experiencias, reflexiones o conocimientos que puedan enriquecer 
                  nuestra comunidad, nos encantaría conocer tu propuesta de colaboración.
                </p>
                <button className="inline-flex items-center gap-2 px-6 py-3 bg-pjoxante-green text-white rounded-full hover:bg-pjoxante-green-dark transition-colors font-medium">
                  <span>Proponer artículo</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </SectionContainer>
        </AnimatedSection>
      </main>

      <AnimatedSection>
        <Footer />
      </AnimatedSection>
      <DonationButton href="https://donorbox.org/casa-pjoxante" />
    </div>
  )
}