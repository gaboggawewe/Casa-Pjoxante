export interface BaseEntity {
  id?: string
  created_at?: string
  updated_at?: string
}

export interface PublishableEntity extends BaseEntity {
  published: boolean
}

export interface OrderableEntity {
  order_index: number
}

export interface ApiResponse<T> {
  data: T | null
  error?: string
}

export interface StorageBucket {
  name: string
  created_at: string
  updated_at: string
  public: boolean
}