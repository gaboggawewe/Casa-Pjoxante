"use client"

import * as React from "react"
import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { Calendar, User, ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { SectionContainer } from "@/components/ui/section-container"
import { PjoxanteButton } from "@/components/ui/pjoxante-button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { COMPONENT_SIZES } from "@/lib/constants"
import { useBlogCache } from "@/hooks/use-blog-cache"

interface BlogSectionProps {
  className?: string
  showHeader?: boolean
  maxPosts?: number
  id?: string
}

const BlogSection = React.forwardRef<HTMLElement, BlogSectionProps>(
  ({ className, showHeader = true, maxPosts = 6, id }, ref) => {
    const { blogPosts: allBlogPosts, loading, error, loadBlogPosts, hasCachedData } = useBlogCache()
    const router = useRouter()
    
    // Obtener solo los posts que necesitamos según maxPosts
    const blogPosts = allBlogPosts.slice(0, maxPosts)

    useEffect(() => {
      // Si ya tenemos datos en caché, no necesitamos cargar
      if (hasCachedData) {
        console.log('BlogSection: Using cached data')
        return
      }
      
      // Solo cargar si no hay datos en caché
      console.log('BlogSection: Loading blog posts...')
      loadBlogPosts()
    }, [loadBlogPosts, hasCachedData])

    const handleReadMore = (slug: string) => {
      router.push(`/blog/${slug}`)
    }

    // Función para truncar texto automáticamente
    const truncateText = (text: string, maxLength: number = 150) => {
      if (!text) return ""
      if (text.length <= maxLength) return text
      return text.slice(0, maxLength).trim() + "..."
    }

    // Función para formatear la fecha
    const formatDate = (dateString: string) => {
      try {
        return new Date(dateString).toLocaleDateString('es-ES', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        })
      } catch {
        return dateString
      }
    }

    // Si está cargando, mostrar estado de carga
    if (loading) {
      return (
        <SectionContainer
          ref={ref}
          id={id || "publicaciones"}
          className={cn(className)}
          padding="xl"
        >
          <div className="text-center">
            <p className="text-gray-500">Cargando publicaciones...</p>
          </div>
        </SectionContainer>
      )
    }

    // Si hay error, mostrar mensaje de error
    if (error) {
      return (
        <SectionContainer
          ref={ref}
          id={id || "publicaciones"}
          className={cn(className)}
          padding="xl"
        >
          <div className="text-center">
            <p className="text-red-500 mb-4">{error}</p>
            <button 
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-pjoxante-green text-white rounded-md hover:bg-pjoxante-green-dark transition-colors"
            >
              Reintentar
            </button>
          </div>
        </SectionContainer>
      )
    }

    // Si no hay posts pero no hay error
    if (!blogPosts.length) {
      return (
        <SectionContainer
          ref={ref}
          id={id || "publicaciones"}
          className={cn(className)}
          padding="xl"
        >
          <div className="text-center">
            <p className="text-gray-500">No hay publicaciones disponibles.</p>
          </div>
        </SectionContainer>
      )
    }

    return (
      <SectionContainer
        ref={ref}
        id="publicaciones"
        className={cn(className)}
        padding="xl"
      >
        {showHeader && (
          <div className="text-center mb-12">
            <h2 className={cn(
              "font-bold text-pjoxante-green font-cerco mb-4",
              COMPONENT_SIZES.section.title
            )}>
              Publicaciones de Casa Pjoxante
            </h2>
            <p className={cn(
              "text-black font-century max-w-3xl mx-auto",
              COMPONENT_SIZES.section.subtitle
            )}>
              Reflexiones, experiencias y conocimientos compartidos por nuestro equipo y colaboradores de la comunidad
            </p>
          </div>
        )}

        {/* Blog Posts Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {blogPosts.map((post) => (
            <Card 
              key={post.id} 
              className="group hover:shadow-lg transition-all duration-300 border-[#C1DCAB]/95 hover:border-[#3E8D35] hover:scale-100 hover:-translate-y-0.5 transform overflow-hidden p-0"
            >
              <div className="relative h-52 overflow-hidden rounded-t-xl">
                <img
                  src={post.main_image_url || '/FotosCasaPjoxante/pjoxante-alumnos.JPG'}
                  alt={post.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <CardHeader className="pb-3 px-6 pt-6">
                <h3 className={cn(
                  "font-semibold text-pjoxante-green font-cerco line-clamp-2",
                  COMPONENT_SIZES.card.title
                )}>
                  {post.title}
                </h3>
                {post.subtitle && (
                  <p className="text-sm text-gray-500 font-century line-clamp-1">
                    {post.subtitle}
                  </p>
                )}
              </CardHeader>

              <CardContent className="space-y-4 px-6 pb-6">
                <p className={cn(
                  "text-gray-600 font-century line-clamp-3",
                  COMPONENT_SIZES.card.description
                )}>
                  {truncateText(post.content)}
                </p>

                {/* Post Details */}
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {formatDate(post.created_at)}
                  </div>
                  <div className="flex items-center gap-1">
                    <User className="w-4 h-4" />
                    {post.author}
                  </div>
                </div>

                <div className="pt-2">
                  <button 
                    onClick={() => handleReadMore(post.slug)}
                    className="inline-flex items-center gap-2 text-pjoxante-green font-medium hover:text-pjoxante-green-dark transition-colors group/button"
                  >
                    <span>Leer más</span>
                    <ArrowRight className="w-4 h-4 group-hover/button:translate-x-1 transition-transform" />
                  </button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Call to Action */}
        {showHeader && (
          <div className="text-center mt-12">
            <div className="bg-pjoxante-green-light/20 rounded-2xl p-8 space-y-6 max-w-4xl mx-auto">
              <h3 className={cn(
                "font-bold text-pjoxante-green font-cerco",
                COMPONENT_SIZES.section.subtitle
              )}>
                ¿Quieres contribuir?
              </h3>
              <p className="text-gray-700 font-century leading-relaxed max-w-2xl mx-auto">
                Si tienes experiencias, reflexiones o conocimientos que puedan enriquecer 
                nuestra comunidad, nos encantaría conocer tu propuesta de colaboración.
              </p>
              <PjoxanteButton 
                onClick={() => router.push('/admin')}
                className="gap-2"
              >
                <span>Proponer artículo</span>
                <ArrowRight className="w-4 h-4" />
              </PjoxanteButton>
            </div>
          </div>
        )}
      </SectionContainer>
    )
  }
)

BlogSection.displayName = "BlogSection"

export { BlogSection }