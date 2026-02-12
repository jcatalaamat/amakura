import { eq, ne, and } from 'drizzle-orm'

import { getDb } from '~/database'
import { user as userTable } from '~/database/schema-private'
import { userPublic, userState } from '~/database/schema-public'
import { getIsAdmin } from '~/server/getIsAdmin'

import type { AuthData } from '~/features/auth/types'

export const userActions = {
  onboardUser,
  validateUsername,
  deleteAccount,
}

async function onboardUser(authData: AuthData, userId: string) {
  if (!authData) return

  const isAdmin = getIsAdmin(authData)
  const db = getDb()

  const existingUser = await db
    .select()
    .from(userPublic)
    .where(eq(userPublic.id, userId))
    .limit(1)

  const [userPrivate] = await db
    .select({
      name: userTable.name,
      username: userTable.username,
      email: userTable.email,
      image: userTable.image,
      createdAt: userTable.createdAt,
    })
    .from(userTable)
    .where(eq(userTable.id, userId))

  if (existingUser.length === 1) {
    return userPrivate
  }

  if (!userPrivate) {
    return
  }

  const existingUserState = await db
    .select()
    .from(userState)
    .where(eq(userState.userId, userId))
    .limit(1)

  if (existingUserState.length === 0) {
    await db.insert(userState).values({
      userId,
      darkMode: false,
      locale: 'es',
      timeZone: 'America/Mexico_City',
      onlineStatus: 'online',
    })
  }

  const { name, username, image, createdAt } = userPrivate

  const userRow = {
    id: userId,
    name: name || '',
    username: username || '',
    image: image || '',
    joinedAt: createdAt ? new Date(createdAt).toISOString() : new Date().toISOString(),
    hasOnboarded: false,
    whitelisted: true,
    migrationVersion: 0,
  }

  await db.insert(userPublic).values(userRow)

  if (isAdmin) {
    await db.update(userTable).set({ role: 'admin' }).where(eq(userTable.id, userId))
  }

  return userPrivate
}

async function deleteAccount(userId: string) {
  const db = getDb()

  try {
    await db.delete(userState).where(eq(userState.userId, userId))
    await db.delete(userTable).where(eq(userTable.id, userId))
    await db.delete(userPublic).where(eq(userPublic.id, userId))
  } catch (error) {
    console.error(`Failed to delete account for user ${userId}:`, error)
    throw new Error('Failed to delete account')
  }
}

async function validateUsername(username?: string, excludeUserId?: string) {
  if (!username) return

  if (username.length < 3) {
    throw new Error('Username must be at least 3 characters')
  }

  if (username.length > 30) {
    throw new Error('Username must be less than 30 characters')
  }

  if (!/^[a-zA-Z0-9_-]+$/.test(username)) {
    throw new Error(
      'Username can only contain letters, numbers, underscores, and hyphens'
    )
  }

  const db = getDb()

  const whereCondition = excludeUserId
    ? and(eq(userPublic.username, username), ne(userPublic.id, excludeUserId))
    : eq(userPublic.username, username)

  const existingUser = await db.select().from(userPublic).where(whereCondition).limit(1)

  if (existingUser.length > 0) {
    throw new Error('Username is already taken')
  }

  return true
}
