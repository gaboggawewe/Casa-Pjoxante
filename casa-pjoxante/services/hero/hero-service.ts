import { supabase, supabaseAdmin } from '../shared/supabase-client'
import { ApiResponse } from '../shared/types'
import { HeroSection, HeroData } from './hero-types'

// LECTURA - Para el frontend público
export async function getHeroData(): Promise<ApiResponse<HeroData>> {
  try {
    // Obtener sección (solo publicada)
    const { data: sectionData, error: sectionError } = await supabase
      .from('hero_section')
      .select('*')
      .eq('published', true)
      .single()

    if (sectionError && sectionError.code !== 'PGRST116') {
      return { data: null, error: sectionError.message }
    }

    return {
      data: {
        section: sectionData
      }
    }
  } catch (error) {
    return { data: null, error: 'Error al obtener datos de Hero' }
  }
}

// ADMINISTRACIÓN - Para el dashboard (incluye no publicados)
export async function getHeroDataAdmin(): Promise<ApiResponse<HeroData>> {
  try {
    // Obtener sección (incluyendo no publicada)
    const { data: sectionData, error: sectionError } = await supabaseAdmin
      .from('hero_section')
      .select('*')
      .limit(1)
      .single()

    if (sectionError && sectionError.code !== 'PGRST116') {
      return { data: null, error: sectionError.message }
    }

    return {
      data: {
        section: sectionData
      }
    }
  } catch (error) {
    return { data: null, error: 'Error al obtener datos de Hero para admin' }
  }
}

// GUARDAR SECCIÓN
export async function saveHeroSection(section: Omit<HeroSection, 'id' | 'created_at' | 'updated_at'>): Promise<ApiResponse<HeroSection>> {
  try {
    // Verificar si ya existe una sección
    const { data: existing } = await supabaseAdmin
      .from('hero_section')
      .select('id')
      .limit(1)
      .single()

    if (existing) {
      // Actualizar existente
      const { data, error } = await supabaseAdmin
        .from('hero_section')
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
        .from('hero_section')
        .insert([section])
        .select()
        .single()

      if (error) return { data: null, error: error.message }
      return { data }
    }
  } catch (error) {
    return { data: null, error: 'Error al guardar sección Hero' }
  }
}

// SUBIR IMAGEN DE LOGO
export async function uploadHeroLogo(file: File, fileName: string): Promise<ApiResponse<string>> {
  try {
    const { data, error } = await supabaseAdmin.storage
      .from('hero-images')
      .upload(`logos/${fileName}`, file, {
        cacheControl: '3600',
        upsert: false
      })

    if (error) return { data: null, error: error.message }

    // Obtener URL pública
    const { data: publicUrlData } = supabaseAdmin.storage
      .from('hero-images')
      .getPublicUrl(data.path)

    return { data: publicUrlData.publicUrl }
  } catch (error) {
    return { data: null, error: 'Error al subir logo' }
  }
}

// SUBIR IMAGEN DE FONDO
export async function uploadHeroBackground(file: File, fileName: string): Promise<ApiResponse<string>> {
  try {
    const { data, error } = await supabaseAdmin.storage
      .from('hero-images')
      .upload(`backgrounds/${fileName}`, file, {
        cacheControl: '3600',
        upsert: false
      })

    if (error) return { data: null, error: error.message }

    // Obtener URL pública
    const { data: publicUrlData } = supabaseAdmin.storage
      .from('hero-images')
      .getPublicUrl(data.path)

    return { data: publicUrlData.publicUrl }
  } catch (error) {
    return { data: null, error: 'Error al subir imagen de fondo' }
  }
}