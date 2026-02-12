import { number, string, table } from '@rocicorp/zero'
import { mutations, serverWhere } from 'on-zero'

export const schema = table('contactMessage')
  .columns({
    id: string(),
    name: string(),
    email: string(),
    interest: string().optional(),
    message: string(),
    status: string(),
    repliedBy: string().optional(),
    repliedAt: number().optional(),
    createdAt: number(),
  })
  .primaryKey('id')

const permissions = serverWhere('contactMessage', () => undefined)

export const mutate = mutations(schema, permissions, {
  insert: async ({ tx }, msg: any) => {
    await tx.mutate.contactMessage.insert(msg)
  },
  update: async ({ tx }, data: any) => {
    await tx.mutate.contactMessage.update(data)
  },
})
