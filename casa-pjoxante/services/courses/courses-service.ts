import { supabase, supabaseAdmin } from '../shared/supabase-client'
import { ApiResponse } from '../shared/types'
import { CoursesSection, Course, CoursesData } from './courses-types'

// LECTURA - Para el frontend público
export async function getCoursesData(): Promise<ApiResponse<CoursesData>> {
  try {
    // Obtener sección (solo publicada)
    const { data: sectionData, error: sectionError } = await supabase
      .from('courses_section')
      .select('*')
      .eq('published', true)
      .single()

    if (sectionError && sectionError.code !== 'PGRST116') {
      return { data: null, error: sectionError.message }
    }

    // Obtener cursos (solo publicados)
    const { data: coursesData, error: coursesError } = await supabase
      .from('courses')
      .select('*')
      .eq('published', true)
      .order('created_at', { ascending: false })

    if (coursesError) {
      return { data: null, error: coursesError.message }
    }

    return {
      data: {
        section: sectionData,
        courses: coursesData || []
      }
    }
  } catch (error) {
    return { data: null, error: 'Error al obtener datos de Courses' }
  }
}

// ADMINISTRACIÓN - Para el dashboard (incluye no publicados)
export async function getCoursesDataAdmin(): Promise<ApiResponse<CoursesData>> {
  try {
    // Obtener sección (incluyendo no publicada)
    const { data: sectionData, error: sectionError } = await supabaseAdmin
      .from('courses_section')
      .select('*')
      .limit(1)
      .single()

    if (sectionError && sectionError.code !== 'PGRST116') {
      return { data: null, error: sectionError.message }
    }

    // Obtener todos los cursos
    const { data: coursesData, error: coursesError } = await supabaseAdmin
      .from('courses')
      .select('*')
      .order('created_at', { ascending: false })

    if (coursesError) {
      return { data: null, error: coursesError.message }
    }

    return {
      data: {
        section: sectionData,
        courses: coursesData || []
      }
    }
  } catch (error) {
    return { data: null, error: 'Error al obtener datos de Courses para admin' }
  }
}

// GUARDAR SECCIÓN
export async function saveCoursesSection(section: Omit<CoursesSection, 'id' | 'created_at' | 'updated_at'>): Promise<ApiResponse<CoursesSection>> {
  try {
    // Verificar si ya existe una sección
    const { data: existing } = await supabaseAdmin
      .from('courses_section')
      .select('id')
      .limit(1)
      .single()

    if (existing) {
      // Actualizar existente
      const { data, error } = await supabaseAdmin
        .from('courses_section')
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
        .from('courses_section')
        .insert([section])
        .select()
        .single()

      if (error) return { data: null, error: error.message }
      return { data }
    }
  } catch (error) {
    return { data: null, error: 'Error al guardar sección Courses' }
  }
}

// GUARDAR CURSO
export async function saveCourse(course: Omit<Course, 'id' | 'created_at' | 'updated_at'>): Promise<ApiResponse<Course>> {
  try {
    const { data, error } = await supabaseAdmin
      .from('courses')
      .insert([course])
      .select()
      .single()

    if (error) return { data: null, error: error.message }
    return { data }
  } catch (error) {
    return { data: null, error: 'Error al guardar curso' }
  }
}

// ACTUALIZAR CURSO
export async function updateCourse(id: string, updates: Partial<Course>): Promise<ApiResponse<Course>> {
  try {
    const { data, error } = await supabaseAdmin
      .from('courses')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single()

    if (error) return { data: null, error: error.message }
    return { data }
  } catch (error) {
    return { data: null, error: 'Error al actualizar curso' }
  }
}

// ELIMINAR CURSO
export async function deleteCourse(id: string): Promise<ApiResponse<boolean>> {
  try {
    const { error } = await supabaseAdmin
      .from('courses')
      .delete()
      .eq('id', id)

    if (error) return { data: null, error: error.message }
    return { data: true }
  } catch (error) {
    return { data: null, error: 'Error al eliminar curso' }
  }
}

// SUBIR IMAGEN DE CURSO
export async function uploadCourseImage(file: File, fileName: string): Promise<ApiResponse<string>> {
  try {
    const { data, error } = await supabaseAdmin.storage
      .from('courses-images')
      .upload(fileName, file, {
        cacheControl: '3600',
        upsert: false
      })

    if (error) return { data: null, error: error.message }

    // Obtener URL pública
    const { data: publicUrlData } = supabaseAdmin.storage
      .from('courses-images')
      .getPublicUrl(data.path)

    return { data: publicUrlData.publicUrl }
  } catch (error) {
    return { data: null, error: 'Error al subir imagen de curso' }
  }
}

// OBTENER CURSOS POR CATEGORÍA
export async function getCoursesByCategory(category: string): Promise<ApiResponse<Course[]>> {
  try {
    const { data, error } = await supabase
      .from('courses')
      .select('*')
      .eq('category', category)
      .eq('published', true)
      .order('created_at', { ascending: false })

    if (error) return { data: null, error: error.message }
    return { data: data || [] }
  } catch (error) {
    return { data: null, error: 'Error al obtener cursos por categoría' }
  }
}