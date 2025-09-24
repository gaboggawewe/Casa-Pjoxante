export interface BlogPost {
  id: number
  title: string
  subtitle?: string
  content: string
  slug: string
  main_image_url?: string
  additional_images?: string[]
  author: string
  published: boolean
  created_at: string
  updated_at: string
}

export interface BlogData {
  posts: BlogPost[]
}