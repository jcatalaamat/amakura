import { number, string, table } from '@rocicorp/zero'
import { mutations, serverWhere } from 'on-zero'

export const schema = table('booking')
  .columns({
    id: string(),
    userId: string().optional(),
    name: string(),
    email: string(),
    phone: string().optional(),
    experienceTypeId: string(),
    date: string(),
    guests: number(),
    notes: string().optional(),
    status: string(),
    locale: string(),
    createdAt: number(),
    updatedAt: number().optional(),
  })
  .primaryKey('id')

const permissions = serverWhere('booking', (_, auth) => {
  return _.cmp('userId', auth?.id || '')
})

export const mutate = mutations(schema, permissions, {
  insert: async ({ tx, server, authData }, booking: any) => {
    await tx.mutate.booking.insert(booking)

    if (process.env.VITE_ENVIRONMENT === 'ssr' && server && authData) {
      server.asyncTasks.push(() =>
        server.actions.analyticsActions().logEvent(authData.id, 'booking_created', {
          bookingId: booking.id,
          experienceTypeId: booking.experienceTypeId,
        })
      )
    }
  },
  update: async ({ tx }, data: any) => {
    await tx.mutate.booking.update(data)
  },
})
