import { zql } from 'on-zero'

export const allExperienceTypes = () => {
  return zql.experienceType.where('active', true).orderBy('sortOrder', 'asc')
}

export const experienceTypesByCategory = (props: { category: string }) => {
  return zql.experienceType
    .where('category', props.category)
    .where('active', true)
    .orderBy('sortOrder', 'asc')
}

export const experienceTypeById = (props: { id: string }) => {
  return zql.experienceType.where('id', props.id).one()
}
