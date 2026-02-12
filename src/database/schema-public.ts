import { boolean, index, integer, pgTable, text, timestamp } from 'drizzle-orm/pg-core'

export const userPublic = pgTable('userPublic', {
  id: text('id').primaryKey(),
  name: text('name'),
  username: text('username'),
  image: text('image'),
  joinedAt: timestamp('joinedAt', { mode: 'string' }).defaultNow().notNull(),
  hasOnboarded: boolean('hasOnboarded').notNull().default(false),
  whitelisted: boolean('whitelisted').notNull().default(false),
  migrationVersion: integer('migrationVersion').notNull().default(0),
})

export const userState = pgTable('userState', {
  userId: text('userId').primaryKey(),
  darkMode: boolean('darkMode').notNull().default(false),
  locale: text('locale').notNull().default('es'),
  timeZone: text('timeZone').notNull().default('America/Mexico_City'),
  onlineStatus: text('onlineStatus').notNull().default('online'),
  lastNotificationReadAt: timestamp('lastNotificationReadAt', { mode: 'string' }),
})

export const portfolioProject = pgTable(
  'portfolioProject',
  {
    id: text('id').primaryKey(),
    title: text('title').notNull(),
    titleEs: text('titleEs'),
    description: text('description').notNull(),
    descriptionEs: text('descriptionEs'),
    image: text('image').notNull(),
    category: text('category').notNull(),
    tags: text('tags'),
    status: text('status').notNull().default('active'),
    wide: boolean('wide').notNull().default(false),
    sortOrder: integer('sortOrder').notNull().default(0),
    createdAt: timestamp('createdAt', { mode: 'string' }).defaultNow().notNull(),
    updatedAt: timestamp('updatedAt', { mode: 'string' }),
  },
  (table) => [
    index('portfolio_category_idx').on(table.category),
    index('portfolio_sortOrder_idx').on(table.sortOrder),
  ]
)

export const experienceType = pgTable(
  'experienceType',
  {
    id: text('id').primaryKey(),
    name: text('name').notNull(),
    nameEs: text('nameEs'),
    description: text('description'),
    descriptionEs: text('descriptionEs'),
    icon: text('icon'),
    category: text('category').notNull(),
    price: integer('price'),
    priceLabel: text('priceLabel'),
    duration: text('duration'),
    maxGuests: integer('maxGuests'),
    active: boolean('active').notNull().default(true),
    sortOrder: integer('sortOrder').notNull().default(0),
    createdAt: timestamp('createdAt', { mode: 'string' }).defaultNow().notNull(),
  },
  (table) => [
    index('experience_category_idx').on(table.category),
    index('experience_active_idx').on(table.active),
  ]
)

export const booking = pgTable(
  'booking',
  {
    id: text('id').primaryKey(),
    userId: text('userId'),
    name: text('name').notNull(),
    email: text('email').notNull(),
    phone: text('phone'),
    experienceTypeId: text('experienceTypeId').notNull(),
    date: text('date').notNull(),
    guests: integer('guests').notNull().default(1),
    notes: text('notes'),
    status: text('status').notNull().default('pending'),
    locale: text('locale').notNull().default('es'),
    createdAt: timestamp('createdAt', { mode: 'string' }).defaultNow().notNull(),
    updatedAt: timestamp('updatedAt', { mode: 'string' }),
  },
  (table) => [
    index('booking_email_idx').on(table.email),
    index('booking_date_idx').on(table.date),
    index('booking_status_idx').on(table.status),
    index('booking_userId_idx').on(table.userId),
    index('booking_experienceTypeId_idx').on(table.experienceTypeId),
  ]
)

export const contactMessage = pgTable(
  'contactMessage',
  {
    id: text('id').primaryKey(),
    name: text('name').notNull(),
    email: text('email').notNull(),
    interest: text('interest'),
    message: text('message').notNull(),
    status: text('status').notNull().default('unread'),
    repliedBy: text('repliedBy'),
    repliedAt: timestamp('repliedAt', { mode: 'string' }),
    createdAt: timestamp('createdAt', { mode: 'string' }).defaultNow().notNull(),
  },
  (table) => [
    index('contact_status_idx').on(table.status),
    index('contact_createdAt_idx').on(table.createdAt),
  ]
)

export const volunteerApplication = pgTable(
  'volunteerApplication',
  {
    id: text('id').primaryKey(),
    name: text('name').notNull(),
    email: text('email').notNull(),
    phone: text('phone'),
    startDate: text('startDate'),
    endDate: text('endDate'),
    experience: text('experience'),
    motivation: text('motivation').notNull(),
    skills: text('skills'),
    status: text('status').notNull().default('pending'),
    reviewedBy: text('reviewedBy'),
    createdAt: timestamp('createdAt', { mode: 'string' }).defaultNow().notNull(),
  },
  (table) => [
    index('volunteer_status_idx').on(table.status),
    index('volunteer_createdAt_idx').on(table.createdAt),
  ]
)

export const device = pgTable(
  'device',
  {
    id: text('id').primaryKey(),
    userId: text('userId').notNull(),
    name: text('name'),
    platform: text('platform').notNull(),
    platformVersion: text('platformVersion'),
    appVersion: text('appVersion'),
    pushToken: text('pushToken'),
    pushEnabled: boolean('pushEnabled').notNull().default(false),
    lastActiveAt: timestamp('lastActiveAt', { mode: 'string' }),
    createdAt: timestamp('createdAt', { mode: 'string' }).defaultNow().notNull(),
    updatedAt: timestamp('updatedAt', { mode: 'string' }),
  },
  (table) => [
    index('device_userId_idx').on(table.userId),
    index('device_pushToken_idx').on(table.pushToken),
  ]
)

export const notification = pgTable(
  'notification',
  {
    id: text('id').primaryKey(),
    userId: text('userId').notNull(),
    actorId: text('actorId'),
    type: text('type').notNull(),
    title: text('title'),
    body: text('body'),
    data: text('data'),
    read: boolean('read').notNull().default(false),
    createdAt: timestamp('createdAt', { mode: 'string' }).defaultNow().notNull(),
  },
  (table) => [
    index('notification_userId_idx').on(table.userId),
    index('notification_userId_read_idx').on(table.userId, table.read),
    index('notification_createdAt_idx').on(table.createdAt),
  ]
)
