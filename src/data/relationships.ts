import { relationships } from '@rocicorp/zero'

import * as tables from './generated/tables'

export const userRelationships = relationships(tables.userPublic, ({ many, one }) => ({
  state: one({
    sourceField: ['id'],
    destSchema: tables.userState,
    destField: ['userId'],
  }),
  bookings: many({
    sourceField: ['id'],
    destSchema: tables.booking,
    destField: ['userId'],
  }),
  devices: many({
    sourceField: ['id'],
    destSchema: tables.device,
    destField: ['userId'],
  }),
}))

export const bookingRelationships = relationships(tables.booking, ({ one }) => ({
  user: one({
    sourceField: ['userId'],
    destSchema: tables.userPublic,
    destField: ['id'],
  }),
}))

export const deviceRelationships = relationships(tables.device, ({ one }) => ({
  user: one({
    sourceField: ['userId'],
    destSchema: tables.userPublic,
    destField: ['id'],
  }),
}))

export const userStateRelationships = relationships(tables.userState, ({ one }) => ({
  user: one({
    sourceField: ['userId'],
    destSchema: tables.userPublic,
    destField: ['id'],
  }),
}))

export const notificationRelationships = relationships(
  tables.notification,
  ({ one }) => ({
    user: one({
      sourceField: ['userId'],
      destSchema: tables.userPublic,
      destField: ['id'],
    }),
    actor: one({
      sourceField: ['actorId'],
      destSchema: tables.userPublic,
      destField: ['id'],
    }),
  })
)

export const allRelationships = [
  userRelationships,
  bookingRelationships,
  deviceRelationships,
  userStateRelationships,
  notificationRelationships,
]
