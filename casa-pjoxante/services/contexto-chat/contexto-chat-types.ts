export interface ContextoChat {
  id: number
  nombre: string
  descripcion: string
  created_at?: string
  updated_at?: string
}

export interface ContextoChatData {
  contextos: ContextoChat[]
}