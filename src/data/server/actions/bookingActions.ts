import { eq } from 'drizzle-orm'

import { getDb } from '~/database'
import { booking } from '~/database/schema-public'

export const bookingActions = {
  async updateStatus(bookingId: string, status: string) {
    const db = getDb()
    await db
      .update(booking)
      .set({ status, updatedAt: new Date().toISOString() })
      .where(eq(booking.id, bookingId))
  },
}
