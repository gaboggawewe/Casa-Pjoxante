import { PublishableEntity, OrderableEntity } from '../shared/types'

export interface ProjectsSection extends PublishableEntity {
  title: string
  subtitle: string
  active_projects: string
  communities: string
  beneficiaries: string
}

export interface Project extends PublishableEntity, OrderableEntity {
  image_url: string
  alt_text: string
  title: string
  description: string
}

export interface ProjectsData {
  section: ProjectsSection | null
  projects: Project[]
}