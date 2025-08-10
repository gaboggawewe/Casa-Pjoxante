export interface HeroSection {
  id: string
  tagline: string
  beneficiaries: number
  events: number
  active_projects: number
  logo_url: string
  background_image_url: string
  published: boolean
  created_at: string
  updated_at: string
}

export interface HeroData {
  section: HeroSection | null
}