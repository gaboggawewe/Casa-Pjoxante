import { supabase, supabaseAdmin } from '../shared/supabase-client'
import { ApiResponse } from '../shared/types'
import { AboutSection, AboutImage, AboutData } from './about-types'

// LECTURA - Para el frontend público
export async function getAboutData(): Promise<ApiResponse<AboutData>> {
  try {
    // Obtener sección (solo publicada)
    const { data: sectionData, error: sectionError } = await supabase
      .from('about_section')
      .select('*')
      .eq('published', true)
      .single()

    if (sectionError && sectionError.code !== 'PGRST116') {
      return { data: null, error: sectionError.message }
    }

    // Obtener imágenes (solo publicadas y ordenadas)
    const { data: imagesData, error: imagesError } = await supabase
      .from('about_images')
      .select('*')
      .eq('published', true)
      .order('order_index', { ascending: true })

    if (imagesError) {
      return { data: null, error: imagesError.message }
    }

    return {
      data: {
        section: sectionData,
        images: imagesData || []
      }
    }
  } catch (error) {
    return { data: null, error: 'Error al obtener datos de About' }
  }
}

// ADMINISTRACIÓN - Para el dashboard (incluye no publicados)
export async function getAboutDataAdmin(): Promise<ApiResponse<AboutData>> {
  try {
    // Obtener sección (incluyendo no publicada)
    const { data: sectionData, error: sectionError } = await supabaseAdmin
      .from('about_section')
      .select('*')
      .limit(1)
      .single()

    if (sectionError && sectionError.code !== 'PGRST116') {
      return { data: null, error: sectionError.message }
    }

    // Obtener todas las imágenes ordenadas
    const { data: imagesData, error: imagesError } = await supabaseAdmin
      .from('about_images')
      .select('*')
      .order('order_index', { ascending: true })

    if (imagesError) {
      return { data: null, error: imagesError.message }
    }

    return {
      data: {
        section: sectionData,
        images: imagesData || []
      }
    }
  } catch (error) {
    return { data: null, error: 'Error al obtener datos de About para admin' }
  }
}

// GUARDAR SECCIÓN
export async function saveAboutSection(section: Omit<AboutSection, 'id' | 'created_at' | 'updated_at'>): Promise<ApiResponse<AboutSection>> {
  try {
    // Verificar si ya existe una sección
    const { data: existing } = await supabaseAdmin
      .from('about_section')
      .select('id')
      .limit(1)
      .single()

    if (existing) {
      // Actualizar existente
      const { data, error } = await supabaseAdmin
        .from('about_section')
        .update({ 
          ...section, 
          updated_at: new Date().toISOString() 
        })
        .eq('id', existing.id)
        .select()
        .single()

      if (error) return { data: null, error: error.message }
      return { data }
    } else {
      // Crear nueva
      const { data, error } = await supabaseAdmin
        .from('about_section')
        .insert([section])
        .select()
        .single()

      if (error) return { data: null, error: error.message }
      return { data }
    }
  } catch (error) {
    return { data: null, error: 'Error al guardar sección About' }
  }
}

// GUARDAR IMAGEN
export async function saveAboutImage(image: Omit<AboutImage, 'id' | 'created_at'>): Promise<ApiResponse<AboutImage>> {
  try {
    const { data, error } = await supabaseAdmin
      .from('about_images')
      .insert([image])
      .select()
      .single()

    if (error) return { data: null, error: error.message }
    return { data }
  } catch (error) {
    return { data: null, error: 'Error al guardar imagen About' }
  }
}

// ACTUALIZAR IMAGEN
export async function updateAboutImage(id: string, updates: Partial<AboutImage>): Promise<ApiResponse<AboutImage>> {
  try {
    const { data, error } = await supabaseAdmin
      .from('about_images')
      .update(updates)
      .eq('id', id)
      .select()
      .single()

    if (error) return { data: null, error: error.message }
    return { data }
  } catch (error) {
    return { data: null, error: 'Error al actualizar imagen About' }
  }
}

// ELIMINAR IMAGEN
export async function deleteAboutImage(id: string): Promise<ApiResponse<boolean>> {
  try {
    const { error } = await supabaseAdmin
      .from('about_images')
      .delete()
      .eq('id', id)

    if (error) return { data: null, error: error.message }
    return { data: true }
  } catch (error) {
    return { data: null, error: 'Error al eliminar imagen About' }
  }
}

// SUBIR IMAGEN A STORAGE
export async function uploadAboutImage(file: File, fileName: string): Promise<ApiResponse<string>> {
  try {
    const { data, error } = await supabaseAdmin.storage
      .from('about-images')
      .upload(fileName, file, {
        cacheControl: '3600',
        upsert: false
      })

    if (error) return { data: null, error: error.message }

    // Obtener URL pública
    const { data: publicUrlData } = supabaseAdmin.storage
      .from('about-images')
      .getPublicUrl(data.path)

    return { data: publicUrlData.publicUrl }
  } catch (error) {
    return { data: null, error: 'Error al subir imagen' }
  }
}