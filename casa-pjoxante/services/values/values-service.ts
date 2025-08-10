import { supabase, supabaseAdmin } from '../shared/supabase-client'
import { ApiResponse } from '../shared/types'
import { ValuesSection, Value, ValuesData } from './values-types'

// LECTURA - Para el frontend público
export async function getValuesData(): Promise<ApiResponse<ValuesData>> {
  try {
    // Obtener sección (solo publicada)
    const { data: sectionData, error: sectionError } = await supabase
      .from('values_section')
      .select('*')
      .eq('published', true)
      .single()

    if (sectionError && sectionError.code !== 'PGRST116') {
      return { data: null, error: sectionError.message }
    }

    // Obtener valores (solo publicados y ordenados)
    const { data: valuesData, error: valuesError } = await supabase
      .from('values')
      .select('*')
      .eq('published', true)
      .order('order_index', { ascending: true })

    if (valuesError) {
      return { data: null, error: valuesError.message }
    }

    return {
      data: {
        section: sectionData,
        values: valuesData || []
      }
    }
  } catch (error) {
    return { data: null, error: 'Error al obtener datos de Values' }
  }
}

// ADMINISTRACIÓN - Para el dashboard (incluye no publicados)
export async function getValuesDataAdmin(): Promise<ApiResponse<ValuesData>> {
  try {
    // Obtener sección (incluyendo no publicada)
    const { data: sectionData, error: sectionError } = await supabaseAdmin
      .from('values_section')
      .select('*')
      .limit(1)
      .single()

    if (sectionError && sectionError.code !== 'PGRST116') {
      return { data: null, error: sectionError.message }
    }

    // Obtener todos los valores ordenados
    const { data: valuesData, error: valuesError } = await supabaseAdmin
      .from('values')
      .select('*')
      .order('order_index', { ascending: true })

    if (valuesError) {
      return { data: null, error: valuesError.message }
    }

    return {
      data: {
        section: sectionData,
        values: valuesData || []
      }
    }
  } catch (error) {
    return { data: null, error: 'Error al obtener datos de Values para admin' }
  }
}

// GUARDAR SECCIÓN
export async function saveValuesSection(section: Omit<ValuesSection, 'id' | 'created_at' | 'updated_at'>): Promise<ApiResponse<ValuesSection>> {
  try {
    // Verificar si ya existe una sección
    const { data: existing } = await supabaseAdmin
      .from('values_section')
      .select('id')
      .limit(1)
      .single()

    if (existing) {
      // Actualizar existente
      const { data, error } = await supabaseAdmin
        .from('values_section')
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
        .from('values_section')
        .insert([section])
        .select()
        .single()

      if (error) return { data: null, error: error.message }
      return { data }
    }
  } catch (error) {
    return { data: null, error: 'Error al guardar sección Values' }
  }
}

// GUARDAR VALOR
export async function saveValue(value: Omit<Value, 'id' | 'created_at' | 'updated_at'>): Promise<ApiResponse<Value>> {
  try {
    const { data, error } = await supabaseAdmin
      .from('values')
      .insert([value])
      .select()
      .single()

    if (error) return { data: null, error: error.message }
    return { data }
  } catch (error) {
    return { data: null, error: 'Error al guardar valor' }
  }
}

// ACTUALIZAR VALOR
export async function updateValue(id: string, updates: Partial<Value>): Promise<ApiResponse<Value>> {
  try {
    const { data, error } = await supabaseAdmin
      .from('values')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single()

    if (error) return { data: null, error: error.message }
    return { data }
  } catch (error) {
    return { data: null, error: 'Error al actualizar valor' }
  }
}

// ELIMINAR VALOR
export async function deleteValue(id: string): Promise<ApiResponse<boolean>> {
  try {
    const { error } = await supabaseAdmin
      .from('values')
      .delete()
      .eq('id', id)

    if (error) return { data: null, error: error.message }
    return { data: true }
  } catch (error) {
    return { data: null, error: 'Error al eliminar valor' }
  }
}

// REORDENAR VALORES
export async function reorderValues(valueIds: string[]): Promise<ApiResponse<boolean>> {
  try {
    const updates = valueIds.map((id, index) => ({
      id,
      order_index: index + 1
    }))

    for (const update of updates) {
      await supabaseAdmin
        .from('values')
        .update({ order_index: update.order_index })
        .eq('id', update.id)
    }

    return { data: true }
  } catch (error) {
    return { data: null, error: 'Error al reordenar valores' }
  }
}