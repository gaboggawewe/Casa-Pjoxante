import { PublishableEntity } from '../shared/types'

export interface CoursesSection extends PublishableEntity {
  title: string
  subtitle: string
}

export interface Course extends PublishableEntity {
  title: string
  description: string
  image_url: string
  duration: string
  start_date: string
  capacity: number
  category: string
}

export interface CoursesData {
  section: CoursesSection | null
  courses: Course[]
}