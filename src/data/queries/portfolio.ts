import { zql } from 'on-zero'

export const allProjects = () => {
  return zql.portfolioProject
    .where('status', '!=', 'archived')
    .orderBy('sortOrder', 'asc')
}

export const projectsByCategory = (props: { category: string }) => {
  return zql.portfolioProject
    .where('category', props.category)
    .where('status', '!=', 'archived')
    .orderBy('sortOrder', 'asc')
}

export const projectById = (props: { id: string }) => {
  return zql.portfolioProject.where('id', props.id).one()
}
