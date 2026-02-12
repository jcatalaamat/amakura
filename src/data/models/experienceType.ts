import { boolean, number, string, table } from '@rocicorp/zero'
import { mutations, serverWhere } from 'on-zero'

export const schema = table('experienceType')
  .columns({
    id: string(),
    name: string(),
    nameEs: string().optional(),
    description: string().optional(),
    descriptionEs: string().optional(),
    icon: string().optional(),
    category: string(),
    price: number().optional(),
    priceLabel: string().optional(),
    duration: string().optional(),
    maxGuests: number().optional(),
    active: boolean(),
    sortOrder: number(),
    createdAt: number(),
  })
  .primaryKey('id')

const permissions = serverWhere('experienceType', () => undefined)

export const mutate = mutations(schema, permissions, {
  insert: async ({ tx }, data: any) => {
    await tx.mutate.experienceType.insert(data)
  },
  update: async ({ tx }, data: any) => {
    await tx.mutate.experienceType.update(data)
  },
  delete: async ({ tx }, obj: { id: string }) => {
    await tx.mutate.experienceType.delete(obj)
  },
})
