import { supabase, supabaseAdmin } from '../shared/supabase-client'
import { ApiResponse } from '../shared/types'
import { BlogPost } from './blog-types'

// LECTURA - Para el frontend público (solo posts publicados)
export async function getBlogPostsData(): Promise<ApiResponse<BlogPost[]>> {
  try {
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('published', true)
      .order('created_at', { ascending: false })

    if (error) {
      return { data: null, error: error.message }
    }

    return { data }
  } catch (error) {
    return { data: null, error: 'Error al obtener publicaciones del blog' }
  }
}

// OBTENER UN POST POR SLUG - Para páginas individuales
export async function getBlogPostBySlug(slug: string): Promise<ApiResponse<BlogPost>> {
  try {
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('slug', slug)
      .eq('published', true)
      .single()

    if (error) {
      return { data: null, error: error.message }
    }

    return { data }
  } catch (error) {
    return { data: null, error: 'Error al obtener la publicación' }
  }
}

// ADMINISTRACIÓN - Para el dashboard (incluye no publicados)
export async function getBlogPostsDataAdmin(): Promise<ApiResponse<BlogPost[]>> {
  try {
    const { data, error } = await supabaseAdmin
      .from('blog_posts')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      return { data: null, error: error.message }
    }

    return { data }
  } catch (error) {
    return { data: null, error: 'Error al obtener publicaciones para admin' }
  }
}

// OBTENER POST POR ID - Para administración
export async function getBlogPostById(id: number): Promise<ApiResponse<BlogPost>> {
  try {
    const { data, error } = await supabaseAdmin
      .from('blog_posts')
      .select('*')
      .eq('id', id)
      .single()

    if (error) {
      return { data: null, error: error.message }
    }

    return { data }
  } catch (error) {
    return { data: null, error: 'Error al obtener la publicación por ID' }
  }
}

// CREAR POST
export async function createBlogPost(post: Omit<BlogPost, 'id' | 'created_at' | 'updated_at'>): Promise<ApiResponse<BlogPost>> {
  try {
    const { data, error } = await supabaseAdmin
      .from('blog_posts')
      .insert([post])
      .select()
      .single()

    if (error) return { data: null, error: error.message }
    return { data }
  } catch (error) {
    return { data: null, error: 'Error al crear la publicación' }
  }
}

// ACTUALIZAR POST
export async function updateBlogPost(id: number, post: Partial<Omit<BlogPost, 'id' | 'created_at' | 'updated_at'>>): Promise<ApiResponse<BlogPost>> {
  try {
    const { data, error } = await supabaseAdmin
      .from('blog_posts')
      .update({ ...post, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single()

    if (error) return { data: null, error: error.message }
    return { data }
  } catch (error) {
    return { data: null, error: 'Error al actualizar la publicación' }
  }
}

// ELIMINAR POST
export async function deleteBlogPost(id: number): Promise<ApiResponse<boolean>> {
  try {
    const { error } = await supabaseAdmin
      .from('blog_posts')
      .delete()
      .eq('id', id)

    if (error) return { data: null, error: error.message }
    return { data: true }
  } catch (error) {
    return { data: null, error: 'Error al eliminar la publicación' }
  }
}

// SUBIR IMAGEN PRINCIPAL
export async function uploadBlogMainImage(file: File, fileName: string): Promise<ApiResponse<string>> {
  try {
    const { data, error } = await supabaseAdmin.storage
      .from('blog-images')
      .upload(`main-images/${fileName}`, file, {
        cacheControl: '3600',
        upsert: false
      })

    if (error) return { data: null, error: error.message }

    // Obtener URL pública
    const { data: publicUrlData } = supabaseAdmin.storage
      .from('blog-images')
      .getPublicUrl(data.path)

    return { data: publicUrlData.publicUrl }
  } catch (error) {
    return { data: null, error: 'Error al subir imagen principal' }
  }
}

// SUBIR IMÁGENES ADICIONALES
export async function uploadBlogAdditionalImages(files: File[], postId: number): Promise<ApiResponse<string[]>> {
  try {
    const uploadPromises = files.map(async (file, index) => {
      const fileName = `${postId}-additional-${index + 1}-${Date.now()}.${file.name.split('.').pop()}`
      const { data, error } = await supabaseAdmin.storage
        .from('blog-images')
        .upload(`additional-images/${fileName}`, file, {
          cacheControl: '3600',
          upsert: false
        })

      if (error) throw error

      const { data: publicUrlData } = supabaseAdmin.storage
        .from('blog-images')
        .getPublicUrl(data.path)

      return publicUrlData.publicUrl
    })

    const uploadedUrls = await Promise.all(uploadPromises)
    return { data: uploadedUrls }
  } catch (error) {
    return { data: null, error: 'Error al subir imágenes adicionales' }
  }
}