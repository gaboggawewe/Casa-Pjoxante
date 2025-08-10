import { PublishableEntity, OrderableEntity } from '../shared/types'

export interface ValuesSection extends PublishableEntity {
  title: string
  subtitle: string
}

export interface Value extends PublishableEntity, OrderableEntity {
  icon: string
  title: string
  description: string
}

export interface ValuesData {
  section: ValuesSection | null
  values: Value[]
}