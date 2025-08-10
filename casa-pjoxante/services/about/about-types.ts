import { PublishableEntity, OrderableEntity } from '../shared/types'

export interface AboutSection extends PublishableEntity {
  title: string
  intro_text: string
  what_we_do_text: string
  how_we_do_text: string
}

export interface AboutImage extends PublishableEntity, OrderableEntity {
  image_url: string
  alt_text: string
}

export interface AboutData {
  section: AboutSection | null
  images: AboutImage[]
}