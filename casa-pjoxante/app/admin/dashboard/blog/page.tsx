"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Navbar } from "@/components/ui/navbar"
import { Footer } from "@/components/ui/footer"
import { SectionContainer } from "@/components/ui/section-container"
import { PjoxanteButton } from "@/components/ui/pjoxante-button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { COMPONENT_SIZES } from "@/lib/constants"
import { cn } from "@/lib/utils"
import { ArrowLeft, Plus, Edit3, Trash2, Eye, Calendar, User, MoreHorizontal } from "lucide-react"
import { getBlogPostsDataAdmin, deleteBlogPost } from "@/services/blog/blog-service"
import type { BlogPost } from "@/services/blog/blog-types"

export default function BlogManagementPage() {
  const router = useRouter()
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)
  const [deleteLoading, setDeleteLoading] = useState<number | null>(null)

  useEffect(() => {
    loadBlogPosts()
  }, [])

  const loadBlogPosts = async () => {
    try {
      const result = await getBlogPostsDataAdmin()
      if (result.data) {
        setBlogPosts(result.data)
      }
    } catch (error) {
      console.error('Error loading blog posts:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: number) => {
    if (!confirm('¿Estás seguro de que quieres eliminar esta publicación?')) {
      return
    }

    setDeleteLoading(id)
    try {
      const result = await deleteBlogPost(id)
      if (result.data) {
        setBlogPosts(blogPosts.filter(post => post.id !== id))
      } else {
        alert('Error al eliminar la publicación: ' + result.error)
      }
    } catch (error) {
      alert('Error al eliminar la publicación')
    } finally {
      setDeleteLoading(null)
    }
  }

  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      })
    } catch {
      return dateString
    }
  }

  const truncateText = (text: string, maxLength: number = 100) => {
    if (!text) return ""
    if (text.length <= maxLength) return text
    return text.slice(0, maxLength).trim() + "..."
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main>
        <SectionContainer padding="xl">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="flex justify-between items-center mb-8">
              <div className="flex items-center gap-4">
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
                    Gestión del Blog
                  </h1>
                  <p className="text-gray-600 font-century mt-2">
                    Administra todas las publicaciones del blog
                  </p>
                </div>
              </div>
              <PjoxanteButton 
                onClick={() => router.push('/admin/dashboard/blog/new')}
                className="gap-2"
              >
                <Plus className="h-4 w-4" />
                Nueva Publicación
              </PjoxanteButton>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <Card>
                <CardContent className="p-6 text-center">
                  <div className="text-2xl font-bold text-pjoxante-green font-cerco">
                    {blogPosts.length}
                  </div>
                  <div className="text-sm text-gray-600">Total Publicaciones</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 text-center">
                  <div className="text-2xl font-bold text-pjoxante-green font-cerco">
                    {blogPosts.filter(post => post.published).length}
                  </div>
                  <div className="text-sm text-gray-600">Publicadas</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 text-center">
                  <div className="text-2xl font-bold text-orange-600 font-cerco">
                    {blogPosts.filter(post => !post.published).length}
                  </div>
                  <div className="text-sm text-gray-600">Borradores</div>
                </CardContent>
              </Card>
            </div>

            {/* Posts List */}
            <Card>
              <CardHeader>
                <CardTitle className="text-pjoxante-green font-cerco">
                  Todas las Publicaciones
                </CardTitle>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <div className="text-center py-8">
                    <p className="text-gray-500">Cargando publicaciones...</p>
                  </div>
                ) : blogPosts.length === 0 ? (
                  <div className="text-center py-12">
                    <p className="text-gray-500 mb-4">No hay publicaciones creadas</p>
                    <PjoxanteButton 
                      onClick={() => router.push('/admin/dashboard/blog/new')}
                      className="gap-2"
                    >
                      <Plus className="h-4 w-4" />
                      Crear Primera Publicación
                    </PjoxanteButton>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {blogPosts.map((post) => (
                      <Card key={post.id} className="border-l-4 border-l-pjoxante-green">
                        <CardContent className="p-6">
                          <div className="flex items-start justify-between">
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-3 mb-2">
                                <h3 className="font-semibold text-lg text-pjoxante-green font-cerco line-clamp-1">
                                  {post.title}
                                </h3>
                                <Badge 
                                  variant={post.published ? "default" : "secondary"}
                                  className={post.published ? "bg-pjoxante-green text-white" : "bg-gray-100 text-gray-700"}
                                >
                                  {post.published ? "Publicado" : "Borrador"}
                                </Badge>
                              </div>
                              
                              {post.subtitle && (
                                <p className="text-sm text-gray-600 mb-2 line-clamp-1">
                                  {post.subtitle}
                                </p>
                              )}
                              
                              <p className="text-gray-700 mb-3 line-clamp-2 font-century">
                                {truncateText(post.content)}
                              </p>
                              
                              <div className="flex items-center gap-4 text-xs text-gray-500">
                                <div className="flex items-center gap-1">
                                  <Calendar className="w-3 h-3" />
                                  <span>{formatDate(post.created_at)}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <User className="w-3 h-3" />
                                  <span>{post.author}</span>
                                </div>
                              </div>
                            </div>
                            
                            <div className="flex items-center gap-2 ml-4">
                              {post.published && (
                                <PjoxanteButton
                                  onClick={() => router.push(`/blog/${post.slug}`)}
                                  variant="outline"
                                  size="sm"
                                  className="gap-2"
                                >
                                  <Eye className="h-3 w-3" />
                                  Ver
                                </PjoxanteButton>
                              )}
                              <PjoxanteButton
                                onClick={() => router.push(`/admin/dashboard/blog/edit/${post.id}`)}
                                variant="outline"
                                size="sm"
                                className="gap-2"
                              >
                                <Edit3 className="h-3 w-3" />
                                Editar
                              </PjoxanteButton>
                              <PjoxanteButton
                                onClick={() => handleDelete(post.id)}
                                variant="outline"
                                size="sm"
                                className="gap-2 text-red-600 hover:text-red-800 hover:border-red-300"
                                disabled={deleteLoading === post.id}
                              >
                                <Trash2 className="h-3 w-3" />
                                {deleteLoading === post.id ? 'Eliminando...' : 'Eliminar'}
                              </PjoxanteButton>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </SectionContainer>
      </main>

      <Footer />
    </div>
  )
}