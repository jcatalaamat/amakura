import { number, string, table } from '@rocicorp/zero'
import { mutations, serverWhere } from 'on-zero'

export const schema = table('volunteerApplication')
  .columns({
    id: string(),
    name: string(),
    email: string(),
    phone: string().optional(),
    startDate: string().optional(),
    endDate: string().optional(),
    experience: string().optional(),
    motivation: string(),
    skills: string().optional(),
    status: string(),
    reviewedBy: string().optional(),
    createdAt: number(),
  })
  .primaryKey('id')

const permissions = serverWhere('volunteerApplication', () => undefined)

export const mutate = mutations(schema, permissions, {
  insert: async ({ tx }, app: any) => {
    await tx.mutate.volunteerApplication.insert(app)
  },
  update: async ({ tx }, data: any) => {
    await tx.mutate.volunteerApplication.update(data)
  },
})
