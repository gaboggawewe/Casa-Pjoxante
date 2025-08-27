import { PublishableEntity } from '../shared/types'

export interface HeroSection extends PublishableEntity {
  title: string
  subtitle: string
  logo_url: string
  background_image_url: string
  beneficiaries: number
  events: number
  active_projects: number
}

export interface HeroData {
  section: HeroSection | null
}