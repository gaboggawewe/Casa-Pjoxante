"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Calendar, User } from "lucide-react"
import { cn } from "@/lib/utils"
import { SectionContainer } from "@/components/ui/section-container"
import { PjoxanteButton } from "@/components/ui/pjoxante-button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { COMPONENT_SIZES } from "@/lib/constants"

interface BlogPost {
  id: string
  title: string
  excerpt: string
  image: string
  author: string
  publishDate: string
  category: string
}

interface BlogSectionProps {
  className?: string
}

const BlogSection = React.forwardRef<HTMLElement, BlogSectionProps>(
  ({ className }, ref) => {
    // Mock blog posts - replace with real data
    const latestPosts: BlogPost[] = [
      {
        id: "1",
        title: "La importancia de la educación comunitaria en tiempos de cambio",
        excerpt: "Reflexiones sobre cómo la educación popular se adapta a los desafíos contemporáneos y mantiene su relevancia...",
        image: "/api/placeholder/400/250",
        author: "María González",
        publishDate: "15 de Febrero, 2024",
        category: "Educación"
      },
      {
        id: "2",
        title: "Arte como herramienta de transformación social",
        excerpt: "Exploramos experiencias exitosas donde el arte ha sido catalizador de cambios positivos en comunidades...",
        image: "/api/placeholder/400/250", 
        author: "Carlos Mendoza",
        publishDate: "8 de Febrero, 2024",
        category: "Arte"
      },
      {
        id: "3",
        title: "Tecnologías apropiadas: soluciones locales para desafíos globales",
        excerpt: "Casos de estudio sobre implementación de tecnologías sostenibles en contextos comunitarios...",
        image: "/api/placeholder/400/250",
        author: "Ana Rodríguez",
        publishDate: "1 de Febrero, 2024",
        category: "Tecnología"
      }
    ]

    return (
      <SectionContainer
        ref={ref}
        className={cn("bg-gray-50", className)}
        padding="xl"
      >
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className={cn(
            "font-bold text-pjoxante-green font-cerco mb-4",
            COMPONENT_SIZES.section.title
          )}>
            Últimas Publicaciones
          </h2>
          <p className={cn(
            "text-gray-600 font-century max-w-3xl mx-auto",
            COMPONENT_SIZES.section.subtitle
          )}>
            Reflexiones, experiencias y conocimientos compartidos por nuestro equipo 
            y colaboradores de la comunidad
          </p>
        </div>

        {/* Blog Posts Carousel/Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {latestPosts.map((post) => (
            <Card key={post.id} className="group hover:shadow-xl transition-all duration-300 overflow-hidden border-pjoxante-green-light/50 hover:border-pjoxante-green bg-white">
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-pjoxante-green text-white px-3 py-1 rounded-full text-xs font-medium">
                    {post.category}
                  </span>
                </div>
              </div>

              <CardHeader className="pb-3">
                <h3 className={cn(
                  "font-semibold text-pjoxante-green font-cerco line-clamp-2 group-hover:text-pjoxante-green-dark",
                  COMPONENT_SIZES.card.title
                )}>
                  {post.title}
                </h3>
              </CardHeader>

              <CardContent className="space-y-4">
                <p className={cn(
                  "text-gray-600 font-century line-clamp-3",
                  COMPONENT_SIZES.card.description
                )}>
                  {post.excerpt}
                </p>

                {/* Meta Info */}
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <div className="flex items-center gap-1">
                    <User className="h-3 w-3" />
                    <span>{post.author}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    <span>{post.publishDate}</span>
                  </div>
                </div>

                {/* Read More Link */}
                <Link 
                  href={`/blog/${post.id}`}
                  className="inline-flex items-center gap-2 text-pjoxante-green hover:text-pjoxante-green-dark text-sm font-medium transition-colors"
                >
                  Leer más
                  <ArrowRight className="h-3 w-3" />
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12">
          <Link href="/blog">
            <PjoxanteButton size="lg" className="inline-flex items-center gap-2">
              Ver todos los artículos
              <ArrowRight className="h-4 w-4" />
            </PjoxanteButton>
          </Link>
        </div>
      </SectionContainer>
    )
  }
)
BlogSection.displayName = "BlogSection"

export { BlogSection }