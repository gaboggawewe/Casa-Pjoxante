import { supabase, supabaseAdmin } from '../shared/supabase-client'
import { ApiResponse } from '../shared/types'
import { ProjectsSection, Project, ProjectsData } from './projects-types'

// LECTURA - Para el frontend público
export async function getProjectsData(): Promise<ApiResponse<ProjectsData>> {
  try {
    // Obtener sección (solo publicada)
    const { data: sectionData, error: sectionError } = await supabase
      .from('projects_section')
      .select('*')
      .eq('published', true)
      .single()

    if (sectionError && sectionError.code !== 'PGRST116') {
      return { data: null, error: sectionError.message }
    }

    // Obtener proyectos (solo publicados y ordenados)
    const { data: projectsData, error: projectsError } = await supabase
      .from('projects')
      .select('*')
      .eq('published', true)
      .order('order_index', { ascending: true })

    if (projectsError) {
      return { data: null, error: projectsError.message }
    }

    return {
      data: {
        section: sectionData,
        projects: projectsData || []
      }
    }
  } catch (error) {
    return { data: null, error: 'Error al obtener datos de Projects' }
  }
}

// ADMINISTRACIÓN - Para el dashboard (incluye no publicados)
export async function getProjectsDataAdmin(): Promise<ApiResponse<ProjectsData>> {
  try {
    // Obtener sección (incluyendo no publicada)
    const { data: sectionData, error: sectionError } = await supabaseAdmin
      .from('projects_section')
      .select('*')
      .limit(1)
      .single()

    if (sectionError && sectionError.code !== 'PGRST116') {
      return { data: null, error: sectionError.message }
    }

    // Obtener todos los proyectos ordenados
    const { data: projectsData, error: projectsError } = await supabaseAdmin
      .from('projects')
      .select('*')
      .order('order_index', { ascending: true })

    if (projectsError) {
      return { data: null, error: projectsError.message }
    }

    return {
      data: {
        section: sectionData,
        projects: projectsData || []
      }
    }
  } catch (error) {
    return { data: null, error: 'Error al obtener datos de Projects para admin' }
  }
}

// GUARDAR SECCIÓN
export async function saveProjectsSection(section: Omit<ProjectsSection, 'id' | 'created_at' | 'updated_at'>): Promise<ApiResponse<ProjectsSection>> {
  try {
    // Verificar si ya existe una sección
    const { data: existing } = await supabaseAdmin
      .from('projects_section')
      .select('id')
      .limit(1)
      .single()

    if (existing) {
      // Actualizar existente
      const { data, error } = await supabaseAdmin
        .from('projects_section')
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
        .from('projects_section')
        .insert([section])
        .select()
        .single()

      if (error) return { data: null, error: error.message }
      return { data }
    }
  } catch (error) {
    return { data: null, error: 'Error al guardar sección Projects' }
  }
}

// GUARDAR PROYECTO
export async function saveProject(project: Omit<Project, 'id' | 'created_at' | 'updated_at'>): Promise<ApiResponse<Project>> {
  try {
    const { data, error } = await supabaseAdmin
      .from('projects')
      .insert([project])
      .select()
      .single()

    if (error) return { data: null, error: error.message }
    return { data }
  } catch (error) {
    return { data: null, error: 'Error al guardar proyecto' }
  }
}

// ACTUALIZAR PROYECTO
export async function updateProject(id: string, updates: Partial<Project>): Promise<ApiResponse<Project>> {
  try {
    const { data, error } = await supabaseAdmin
      .from('projects')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single()

    if (error) return { data: null, error: error.message }
    return { data }
  } catch (error) {
    return { data: null, error: 'Error al actualizar proyecto' }
  }
}

// ELIMINAR PROYECTO
export async function deleteProject(id: string): Promise<ApiResponse<boolean>> {
  try {
    const { error } = await supabaseAdmin
      .from('projects')
      .delete()
      .eq('id', id)

    if (error) return { data: null, error: error.message }
    return { data: true }
  } catch (error) {
    return { data: null, error: 'Error al eliminar proyecto' }
  }
}

// SUBIR IMAGEN DE PROYECTO
export async function uploadProjectImage(file: File, fileName: string): Promise<ApiResponse<string>> {
  try {
    const { data, error } = await supabaseAdmin.storage
      .from('projects-images')
      .upload(fileName, file, {
        cacheControl: '3600',
        upsert: false
      })

    if (error) return { data: null, error: error.message }

    // Obtener URL pública
    const { data: publicUrlData } = supabaseAdmin.storage
      .from('projects-images')
      .getPublicUrl(data.path)

    return { data: publicUrlData.publicUrl }
  } catch (error) {
    return { data: null, error: 'Error al subir imagen de proyecto' }
  }
}

// REORDENAR PROYECTOS
export async function reorderProjects(projectIds: string[]): Promise<ApiResponse<boolean>> {
  try {
    const updates = projectIds.map((id, index) => ({
      id,
      order_index: index + 1
    }))

    for (const update of updates) {
      await supabaseAdmin
        .from('projects')
        .update({ order_index: update.order_index })
        .eq('id', update.id)
    }

    return { data: true }
  } catch (error) {
    return { data: null, error: 'Error al reordenar proyectos' }
  }
}