import { eq } from 'drizzle-orm'

import { getDb } from '~/database'
import { contactMessage } from '~/database/schema-public'

export const contactActions = {
  async markRead(messageId: string) {
    const db = getDb()
    await db
      .update(contactMessage)
      .set({ status: 'read' })
      .where(eq(contactMessage.id, messageId))
  },

  async markReplied(messageId: string, repliedBy: string) {
    const db = getDb()
    await db
      .update(contactMessage)
      .set({
        status: 'replied',
        repliedBy,
        repliedAt: new Date().toISOString(),
      })
      .where(eq(contactMessage.id, messageId))
  },
}
