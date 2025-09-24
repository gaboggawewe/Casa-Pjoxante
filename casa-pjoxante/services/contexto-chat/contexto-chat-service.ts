import { supabase, supabaseAdmin } from '../shared/supabase-client'
import { ApiResponse } from '../shared/types'
import { ContextoChat, ContextoChatData } from './contexto-chat-types'

// LECTURA - Para obtener todos los contextos (admin)
export async function getContextosChatAdmin(): Promise<ApiResponse<ContextoChatData>> {
  try {
    const { data: contextosData, error } = await supabaseAdmin
      .from('contexto_chat')
      .select('*')
      .order('created_at', { ascending: true })

    if (error) {
      return { data: null, error: error.message }
    }

    return {
      data: {
        contextos: contextosData || []
      }
    }
  } catch (error) {
    return { data: null, error: 'Error al obtener contextos de chat' }
  }
}

// OBTENER UN CONTEXTO ESPECÍFICO POR ID
export async function getContextoChatById(id: string): Promise<ApiResponse<ContextoChat>> {
  try {
    const { data, error } = await supabaseAdmin
      .from('contexto_chat')
      .select('*')
      .eq('id', id)
      .single()

    if (error) {
      return { data: null, error: error.message }
    }

    return { data }
  } catch (error) {
    return { data: null, error: 'Error al obtener contexto de chat' }
  }
}

// GUARDAR NUEVO CONTEXTO
export async function saveContextoChat(contexto: Omit<ContextoChat, 'id' | 'created_at' | 'updated_at'>): Promise<ApiResponse<ContextoChat>> {
  try {
    const { data, error } = await supabaseAdmin
      .from('contexto_chat')
      .insert([contexto])
      .select()
      .single()

    if (error) return { data: null, error: error.message }
    return { data }
  } catch (error) {
    return { data: null, error: 'Error al guardar contexto de chat' }
  }
}

// ACTUALIZAR CONTEXTO
export async function updateContextoChat(id: string, updates: Partial<ContextoChat>): Promise<ApiResponse<ContextoChat>> {
  try {
    const { data, error } = await supabaseAdmin
      .from('contexto_chat')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single()

    if (error) return { data: null, error: error.message }
    return { data }
  } catch (error) {
    return { data: null, error: 'Error al actualizar contexto de chat' }
  }
}

// ELIMINAR CONTEXTO
export async function deleteContextoChat(id: string): Promise<ApiResponse<boolean>> {
  try {
    const { error } = await supabaseAdmin
      .from('contexto_chat')
      .delete()
      .eq('id', id)

    if (error) return { data: null, error: error.message }
    return { data: true }
  } catch (error) {
    return { data: null, error: 'Error al eliminar contexto de chat' }
  }
}