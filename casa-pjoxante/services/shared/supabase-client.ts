import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Faltan variables de entorno de Supabase. Revisa tu archivo .env.local')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Para el cliente, usamos el mismo cliente anónimo ya que las políticas RLS están configuradas como públicas
export const supabaseAdmin = supabase