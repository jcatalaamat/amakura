import { boolean, number, string, table } from '@rocicorp/zero'
import { mutations, serverWhere } from 'on-zero'

export const schema = table('portfolioProject')
  .columns({
    id: string(),
    title: string(),
    titleEs: string().optional(),
    description: string(),
    descriptionEs: string().optional(),
    image: string(),
    category: string(),
    tags: string().optional(),
    status: string(),
    wide: boolean(),
    sortOrder: number(),
    createdAt: number(),
    updatedAt: number().optional(),
  })
  .primaryKey('id')

const permissions = serverWhere('portfolioProject', () => undefined)

export const mutate = mutations(schema, permissions, {
  insert: async ({ tx }, project: any) => {
    await tx.mutate.portfolioProject.insert(project)
  },
  update: async ({ tx }, project: any) => {
    await tx.mutate.portfolioProject.update(project)
  },
  delete: async ({ tx }, obj: { id: string }) => {
    await tx.mutate.portfolioProject.delete(obj)
  },
})
