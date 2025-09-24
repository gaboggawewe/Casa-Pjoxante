"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { Navbar } from "@/components/ui/navbar"
import { Footer } from "@/components/ui/footer"
import { DonationButton } from "@/components/ui/donation-button"
import { SectionContainer } from "@/components/ui/section-container"
import { AnimatedSection } from "@/components/ui/animated-section"
import { PjoxanteButton } from "@/components/ui/pjoxante-button"
import { COMPONENT_SIZES } from "@/lib/constants"
import { cn } from "@/lib/utils"
import { Calendar, User, ArrowLeft, Image as ImageIcon } from "lucide-react"
import { getBlogPostBySlug } from "@/services/blog/blog-service"
import type { BlogPost } from "@/services/blog/blog-types"

export default function BlogPostPage() {
  const params = useParams()
  const router = useRouter()
  const slug = params?.slug as string
  const [post, setPost] = useState<BlogPost | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadPost = async () => {
      if (!slug) return
      
      try {
        const result = await getBlogPostBySlug(slug)
        if (result.data) {
          setPost(result.data)
        } else {
          setError(result.error || 'Post no encontrado')
        }
      } catch (err) {
        setError('Error al cargar la publicación')
      } finally {
        setLoading(false)
      }
    }

    loadPost()
  }, [slug])

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

  const formatContent = (content: string) => {
    return content.split('\n').map((paragraph, index) => (
      <p key={index} className="mb-4 text-gray-700 leading-relaxed">
        {paragraph}
      </p>
    ))
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <Navbar />
        <main className="-mt-16">
          <SectionContainer padding="xl" className="pt-32">
            <div className="max-w-4xl mx-auto text-center">
              <p className="text-gray-500 font-century">Cargando publicación...</p>
            </div>
          </SectionContainer>
        </main>
        <Footer />
        <DonationButton href="https://donorbox.org/casa-pjoxante" />
      </div>
    )
  }

  if (error || !post) {
    return (
      <div className="min-h-screen bg-white">
        <Navbar />
        <main className="-mt-16">
          <SectionContainer padding="xl" className="pt-32">
            <div className="max-w-4xl mx-auto text-center space-y-8">
              <h1 className={cn(
                "font-bold text-red-600 font-cerco",
                COMPONENT_SIZES.section.title
              )}>
                Publicación no encontrada
              </h1>
              <p className="text-gray-600 font-century">
                {error || 'La publicación que buscas no existe o ha sido eliminada.'}
              </p>
              <PjoxanteButton 
                onClick={() => router.push('/blog')}
                className="gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Volver al Blog
              </PjoxanteButton>
            </div>
          </SectionContainer>
        </main>
        <Footer />
        <DonationButton href="https://donorbox.org/casa-pjoxante" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <main className="-mt-16">
        {/* Header Section */}
        <AnimatedSection direction="up">
          <SectionContainer padding="xl" className="pt-32 pb-8">
            <div className="max-w-4xl mx-auto">
              {/* Back Button */}
              <div className="mb-8">
                <PjoxanteButton 
                  onClick={() => router.push('/blog')}
                  variant="outline"
                  size="sm"
                  className="gap-2"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Volver al Blog
                </PjoxanteButton>
              </div>

              {/* Post Header */}
              <div className="space-y-6">
                <h1 className={cn(
                  "font-bold text-black font-cerco leading-tight",
                  COMPONENT_SIZES.section.title
                )}>
                  {post.title}
                </h1>
                
                {post.subtitle && (
                  <h2 className={cn(
                    "text-gray-600 font-century leading-relaxed",
                    COMPONENT_SIZES.section.subtitle
                  )}>
                    {post.subtitle}
                  </h2>
                )}

                {/* Meta Information */}
                <div className="flex items-center gap-6 text-sm text-gray-500 border-t border-gray-200 pt-6">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span className="font-century">{formatDate(post.created_at)}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4" />
                    <span className="font-century">{post.author}</span>
                  </div>
                </div>
              </div>
            </div>
          </SectionContainer>
        </AnimatedSection>

        {/* Main Image */}
        {post.main_image_url && (
          <AnimatedSection direction="up">
            <SectionContainer padding="lg">
              <div className="max-w-4xl mx-auto">
                <div className="relative rounded-xl overflow-hidden shadow-lg">
                  <img
                    src={post.main_image_url}
                    alt={post.title}
                    className="w-full h-64 md:h-96 object-cover"
                  />
                </div>
              </div>
            </SectionContainer>
          </AnimatedSection>
        )}

        {/* Content Section */}
        <AnimatedSection direction="up">
          <SectionContainer padding="xl">
            <div className="max-w-4xl mx-auto">
              <article className="prose prose-lg max-w-none">
                <div className={cn(
                  "font-century text-lg leading-relaxed",
                  COMPONENT_SIZES.card.description
                )}>
                  {formatContent(post.content)}
                </div>
              </article>
            </div>
          </SectionContainer>
        </AnimatedSection>

        {/* Additional Images */}
        {post.additional_images && post.additional_images.length > 0 && (
          <AnimatedSection direction="up">
            <SectionContainer padding="xl">
              <div className="max-w-4xl mx-auto">
                <h3 className={cn(
                  "font-bold text-pjoxante-green font-cerco mb-8 flex items-center gap-2",
                  COMPONENT_SIZES.section.subtitle
                )}>
                  <ImageIcon className="w-5 h-5" />
                  Galería de imágenes
                </h3>
                <div className="grid md:grid-cols-2 gap-6">
                  {post.additional_images.map((imageUrl, index) => (
                    <div key={index} className="relative rounded-lg overflow-hidden shadow-md">
                      <img
                        src={imageUrl}
                        alt={`Imagen adicional ${index + 1} - ${post.title}`}
                        className="w-full h-64 object-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </SectionContainer>
          </AnimatedSection>
        )}

        {/* Call to Action */}
        <AnimatedSection direction="up">
          <SectionContainer padding="xl">
            <div className="max-w-4xl mx-auto text-center">
              <div className="bg-pjoxante-green-light/20 rounded-2xl p-8 space-y-6">
                <h3 className={cn(
                  "font-bold text-pjoxante-green font-cerco",
                  COMPONENT_SIZES.section.subtitle
                )}>
                  ¿Te gustó esta publicación?
                </h3>
                <p className="text-gray-700 font-century leading-relaxed max-w-2xl mx-auto">
                  Explora más contenido de nuestra comunidad y descubre otras reflexiones 
                  y experiencias que pueden enriquecer tu perspectiva.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <PjoxanteButton 
                    onClick={() => router.push('/blog')}
                    className="gap-2"
                  >
                    Ver más publicaciones
                  </PjoxanteButton>
                  <PjoxanteButton 
                    onClick={() => router.push('/admin')}
                    variant="outline"
                    className="gap-2"
                  >
                    Proponer artículo
                  </PjoxanteButton>
                </div>
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