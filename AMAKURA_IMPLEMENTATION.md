# Amakura: Full Implementation Plan with Code

Convert the Takeout starter template into **Amakura** — an eco-regenerative living center app in Mazunte, Oaxaca. Replace all social features with booking, portfolio, contact, and admin functionality.

## Decisions Made
- **Replace entirely** — Remove Takeout social features, rebuild as Amakura admin panel
- **Full database** — Store bookings in PostgreSQL, sync via Zero, build admin UI
- **Tamagui** — Rewrite using Tamagui styled components, theme tokens, responsive props

---

## Phase 1: Foundation

### 1.1 `package.json` — change name
```json
"name": "amakura"
```

### 1.2 `src/constants/app.ts` — replace branding
```typescript
// Brand
export const APP_NAME = 'Amakura'
export const APP_NAME_LOWERCASE = 'amakura'

// Domain
export const DOMAIN = 'amakura.mx'

// Paths
export const TERMS_OF_SERVICE_PATH = '/terms-of-service'
export const PRIVACY_POLICY_PATH = '/privacy-policy'
export const EULA_PATH = '/eula'

// URLs (constructed from domains + paths)
export const TERMS_OF_SERVICE_URL = `https://${DOMAIN}${TERMS_OF_SERVICE_PATH}`
export const PRIVACY_POLICY_URL = `https://${DOMAIN}${PRIVACY_POLICY_PATH}`
export const EULA_URL = `https://${DOMAIN}${EULA_PATH}`

// Social
export const INSTAGRAM_URL = 'https://instagram.com/amakura'
export const WHATSAPP_URL = 'https://wa.me/52958XXXXXXX'

// Email
export const ADMIN_EMAIL = `hola@${DOMAIN}`

// Location
export const LOCATION = 'Zapotal, Mazunte, Oaxaca, Mexico'
export const HOURS = 'Friday–Sunday, 2:00–8:00 PM'
```

### 1.3 CREATE `src/constants/colors.ts`
```typescript
export const amakuraColors = {
  earth: '#3D2B1F',
  clay: '#B5651D',
  sand: '#D4A574',
  sage: '#7A8B6F',
  deepGreen: '#2C3E2D',
  forest: '#4A6741',
  cream: '#F5F0E8',
  warm: '#FAF8F3',
  ochre: '#C17817',
  terra: '#C75B39',
  char: '#2A2A2A',
  stone: '#8B8178',
  bark: '#5C4033',
  moss: '#6B7F5E',
  linen: '#EDE8DF',
} as const

export type AmakuraColor = keyof typeof amakuraColors
```

### 1.4 REWRITE `src/tamagui/themes.ts`
```typescript
import { createTheme } from 'tamagui'

const lightPalette = [
  '#FAF8F3', // color1 - warm (background)
  '#F5F0E8', // color2 - cream
  '#EDE8DF', // color3 - linen
  '#D4A574', // color4 - sand
  '#C17817', // color5 - ochre
  '#8B8178', // color6 - stone
  '#7A8B6F', // color7 - sage
  '#6B7F5E', // color8 - moss
  '#5C4033', // color9 - bark
  '#4A6741', // color10 - forest
  '#2C3E2D', // color11 - deepGreen
  '#3D2B1F', // color12 - earth (foreground)
]

const darkPalette = [
  '#1a1512', // color1 - deep earth (background)
  '#2A2A2A', // color2 - char
  '#3D2B1F', // color3 - earth
  '#5C4033', // color4 - bark
  '#8B8178', // color5 - stone
  '#6B7F5E', // color6 - moss
  '#7A8B6F', // color7 - sage
  '#C17817', // color8 - ochre
  '#D4A574', // color9 - sand
  '#B5651D', // color10 - clay
  '#EDE8DF', // color11 - linen
  '#F5F0E8', // color12 - cream (foreground)
]

function paletteToTheme(palette: string[]) {
  return {
    background: palette[0],
    backgroundHover: palette[1],
    backgroundPress: palette[2],
    backgroundFocus: palette[1],
    backgroundStrong: palette[0],
    backgroundTransparent: 'transparent',
    color: palette[11],
    colorHover: palette[10],
    colorPress: palette[11],
    colorFocus: palette[10],
    colorTransparent: 'transparent',
    borderColor: palette[3],
    borderColorHover: palette[4],
    borderColorPress: palette[5],
    borderColorFocus: palette[4],
    shadowColor: 'rgba(61,43,31,0.08)',
    shadowColorHover: 'rgba(61,43,31,0.12)',
    shadowColorPress: 'rgba(61,43,31,0.06)',
    shadowColorFocus: 'rgba(61,43,31,0.12)',
    placeholderColor: palette[5],
    color1: palette[0],
    color2: palette[1],
    color3: palette[2],
    color4: palette[3],
    color5: palette[4],
    color6: palette[5],
    color7: palette[6],
    color8: palette[7],
    color9: palette[8],
    color10: palette[9],
    color11: palette[10],
    color12: palette[11],
  }
}

const light = createTheme(paletteToTheme(lightPalette))
const dark = createTheme(paletteToTheme(darkPalette))

const accentTokens = {
  background: '#C17817',
  backgroundHover: '#B5651D',
  backgroundPress: '#a85a1a',
  backgroundFocus: '#B5651D',
  color: '#FFFFFF',
  colorHover: '#F5F0E8',
  colorPress: '#FFFFFF',
  borderColor: '#C17817',
  borderColorHover: '#B5651D',
}

const light_accent = createTheme({ ...light, ...accentTokens })
const dark_accent = createTheme({ ...dark, ...accentTokens })

const greenTokens = {
  background: '#2C3E2D',
  backgroundHover: '#4A6741',
  backgroundPress: '#243326',
  color: '#F5F0E8',
  colorHover: '#EDE8DF',
  borderColor: '#4A6741',
}

const light_green = createTheme({ ...light, ...greenTokens })
const dark_green = createTheme({ ...dark, ...greenTokens })

export const themes = {
  light,
  dark,
  light_accent,
  dark_accent,
  light_green,
  dark_green,
}
```

### 1.5 REWRITE `src/tamagui/fonts.ts`
```typescript
import { createFont, createSystemFont, fonts as baseFonts } from '@tamagui/config/v5'
import { isWeb } from 'tamagui'

const heading = createFont({
  family: isWeb ? '"Playfair Display", serif' : 'Playfair Display',
  size: {
    1: 12, 2: 14, 3: 16, 4: 18, 5: 20, 6: 24, 7: 28, 8: 32,
    9: 40, 10: 48, 11: 56, 12: 72, 13: 88, true: 20,
  },
  lineHeight: {
    1: 18, 2: 20, 3: 22, 4: 24, 5: 26, 6: 30, 7: 34, 8: 38,
    9: 46, 10: 54, 11: 62, 12: 78, 13: 94, true: 26,
  },
  weight: { 4: '400', 5: '500', 6: '600', 7: '700', 8: '800', true: '400' },
  letterSpacing: {
    4: -0.5, 5: -0.5, 6: -0.5, 7: -1, 8: -1, 9: -1.5,
    10: -2, 11: -2, 12: -3, 13: -3, true: -0.5,
  },
})

const body = createFont({
  family: isWeb ? '"DM Sans", sans-serif' : 'DM Sans',
  size: { ...baseFonts.body.size, true: 15 },
  lineHeight: { ...baseFonts.body.lineHeight, true: 24 },
  weight: { 3: '300', 4: '400', 5: '500', 6: '600', 7: '700', true: '400' },
  letterSpacing: { ...baseFonts.body.letterSpacing, true: 0 },
})

const mono = createSystemFont({
  sizeLineHeight: (size) => (size >= 16 ? size * 1.2 + 8 : size * 1.15 + 5),
  font: {
    family: isWeb ? '"JetBrains Mono", monospace' : 'JetBrains Mono',
    weight: { 0: '400' },
  },
})

export const fonts = { ...baseFonts, heading, body, mono }
```

### 1.6 `app/_layout.tsx` — add Google Fonts link tags
Add inside `<head>`, before the closing `</head>`:
```html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400&family=DM+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300&display=swap" rel="stylesheet" />
```

### 1.7 `app/root.css` — update fonts and replace terminal CSS
Replace the `:root` font vars:
```css
:root {
  --font-heading: 'Playfair Display', serif;
  --font-body: 'DM Sans', sans-serif;
}
```

Replace the terminal CSS block (`.terminal-content`, `.terminal-cursor`, `@keyframes cursor-blink`) with:
```css
/* scroll snap for landing page sections */
.scroll-snap-container {
  scroll-snap-type: y mandatory;
  overflow-y: auto;
  height: 100vh;
  scrollbar-width: none;
  -ms-overflow-style: none;
}
.scroll-snap-container::-webkit-scrollbar { display: none; }
.scroll-snap-section {
  scroll-snap-align: start;
  min-height: 100vh;
}
@keyframes scroll-pulse {
  0%, 100% { opacity: 0.3; }
  50% { opacity: 0.8; }
}
.scroll-indicator { animation: scroll-pulse 2.5s ease infinite; }
```

---

## Phase 2: Database

### 2.1 REWRITE `src/database/schema-public.ts`

**Remove tables:** `post`, `comment`, `block`, `report`, `invite`
**Remove `unique` import** (no longer needed)
**Keep:** `userPublic` (remove `postsCount`), `userState` (change locale default to `'es'`), `device`, `notification`

**Add these new tables:**

```typescript
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
```

### 2.2 `src/data/server/actions/userActions.ts`
- Remove `import { post } from '~/database/schema-public'` (keep userPublic, userState)
- Remove `whitelistUsers` from exports and function
- In `deleteAccount`: remove `await db.delete(post).where(eq(post.userId, userId))`
- In `onboardUser`: remove `postsCount: 0` from userRow, change locale default to `'es'`

### 2.3 DELETE old model/query files
```
src/data/models/post.ts
src/data/models/comment.ts
src/data/models/block.ts
src/data/models/report.ts
src/data/queries/post.ts
src/data/queries/comment.ts
src/data/queries/block.ts
src/data/where/notBlockedByViewer.ts
```

### 2.4 CREATE `src/data/models/portfolioProject.ts`
```typescript
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
```

### 2.5 CREATE `src/data/models/experienceType.ts`
```typescript
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
```

### 2.6 CREATE `src/data/models/booking.ts`
```typescript
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
```

### 2.7 CREATE `src/data/models/contactMessage.ts`
```typescript
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
```

### 2.8 CREATE `src/data/models/volunteerApplication.ts`
```typescript
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
```

### 2.9 REWRITE `src/data/relationships.ts`
```typescript
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
```

### 2.10 CREATE query files

**`src/data/queries/booking.ts`**
```typescript
import { zql } from 'on-zero'

export const allBookings = (props: { status?: string; pageSize: number }) => {
  let query = zql.booking.orderBy('createdAt', 'desc').limit(props.pageSize)
  if (props.status) query = query.where('status', props.status)
  return query
}

export const bookingsByDate = (props: { date: string }) => {
  return zql.booking.where('date', props.date).orderBy('createdAt', 'asc')
}
```

**`src/data/queries/portfolio.ts`**
```typescript
import { zql } from 'on-zero'

export const allProjects = () => {
  return zql.portfolioProject.where('status', '!=', 'archived').orderBy('sortOrder', 'asc')
}

export const projectsByCategory = (props: { category: string }) => {
  return zql.portfolioProject
    .where('category', props.category)
    .where('status', '!=', 'archived')
    .orderBy('sortOrder', 'asc')
}
```

**`src/data/queries/contactMessage.ts`**
```typescript
import { zql } from 'on-zero'

export const allMessages = (props: { status?: string; pageSize: number }) => {
  let query = zql.contactMessage.orderBy('createdAt', 'desc').limit(props.pageSize)
  if (props.status) query = query.where('status', props.status)
  return query
}
```

**`src/data/queries/volunteer.ts`**
```typescript
import { zql } from 'on-zero'

export const allApplications = (props: { status?: string; pageSize: number }) => {
  let query = zql.volunteerApplication.orderBy('createdAt', 'desc').limit(props.pageSize)
  if (props.status) query = query.where('status', props.status)
  return query
}
```

**`src/data/queries/experienceType.ts`**
```typescript
import { zql } from 'on-zero'

export const allExperienceTypes = () => {
  return zql.experienceType.where('active', true).orderBy('sortOrder', 'asc')
}

export const experienceTypesByCategory = (props: { category: string }) => {
  return zql.experienceType
    .where('category', props.category)
    .where('active', true)
    .orderBy('sortOrder', 'asc')
}
```

### 2.11 CREATE `src/data/server/actions/bookingActions.ts`
```typescript
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
```

### 2.12 CREATE `src/data/server/actions/contactActions.ts`
```typescript
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
}
```

### 2.13 `src/data/server/createServerActions.ts` — add new actions
Add imports:
```typescript
import { bookingActions } from './actions/bookingActions'
import { contactActions } from './actions/contactActions'
```
Add to the returned object:
```typescript
bookingActions: () => bookingActions,
contactActions: () => contactActions,
```

### 2.14 Run after schema changes
```bash
bun db:migrate
bun zero:generate
```

---

## Phase 3: Landing Page (6 Tamagui sections)

### 3.1 CREATE `src/interface/landing/AmakuraSection.tsx`
```tsx
import { styled, YStack } from 'tamagui'

export const AmakuraSection = styled(YStack, {
  minHeight: '100vh',
  width: '100%',
  justifyContent: 'center',
  alignItems: 'center',
  position: 'relative',
  className: 'scroll-snap-section',
  paddingHorizontal: '$4',
  $md: { paddingHorizontal: '$8' },
})
```

### 3.2 CREATE `src/interface/landing/SectionNav.tsx`
```tsx
import { useState, useEffect } from 'react'
import { YStack, XStack, Text, styled } from 'tamagui'
import { amakuraColors } from '~/constants/colors'

const sections = ['Origin', 'Portfolio', 'Visit', 'Build', 'Learn', 'Connect']

const Dot = styled(YStack, {
  borderRadius: 100,
  transition: 'all 0.4s',
  variants: {
    active: {
      true: { width: 10, height: 10, backgroundColor: amakuraColors.ochre },
      false: { width: 6, height: 6, backgroundColor: 'rgba(255,255,255,0.25)' },
    },
  } as const,
})

export function SectionNav() {
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    const container = document.querySelector('.scroll-snap-container')
    if (!container) return
    const fn = () => {
      const idx = Math.round(container.scrollTop / container.clientHeight)
      setCurrent(Math.min(idx, sections.length - 1))
    }
    container.addEventListener('scroll', fn, { passive: true })
    return () => container.removeEventListener('scroll', fn)
  }, [])

  const scrollTo = (i: number) => {
    const container = document.querySelector('.scroll-snap-container')
    container?.scrollTo({ top: i * container.clientHeight, behavior: 'smooth' })
  }

  return (
    <YStack
      position="fixed"
      left={20}
      top="50%"
      transform="translateY(-50%)"
      zIndex={100}
      gap="$1"
    >
      {sections.map((s, i) => (
        <XStack
          key={s}
          alignItems="center"
          gap="$2"
          cursor="pointer"
          paddingVertical="$1"
          onPress={() => scrollTo(i)}
        >
          <Dot active={current === i} />
          <Text
            fontFamily="$body"
            fontSize={10}
            letterSpacing={2}
            textTransform="uppercase"
            color={current === i ? amakuraColors.sand : 'rgba(255,255,255,0.3)'}
          >
            {s}
          </Text>
        </XStack>
      ))}
    </YStack>
  )
}
```

### 3.3 REWRITE `src/interface/landing/HeroSection.tsx`
```tsx
import { useState, useEffect } from 'react'
import { YStack, XStack, Text, Button, styled } from 'tamagui'
import { amakuraColors as C } from '~/constants/colors'

const HeroTitle = styled(Text, {
  fontFamily: '$heading',
  fontSize: 88,
  fontWeight: '400',
  color: C.cream,
  lineHeight: 84,
  letterSpacing: -3,
  textAlign: 'center',
  $md: { fontSize: 72, lineHeight: 68 },
  $sm: { fontSize: 52, lineHeight: 50 },
})

const HeroTagline = styled(Text, {
  fontFamily: '$heading',
  fontSize: 20,
  fontStyle: 'italic',
  color: C.sand,
  textAlign: 'center',
  marginBottom: '$8',
})

const HeroBody = styled(Text, {
  fontFamily: '$body',
  fontSize: 14,
  lineHeight: 27,
  color: 'rgba(255,255,255,0.42)',
  maxWidth: 440,
  textAlign: 'center',
  marginBottom: '$8',
})

const HeroLabel = styled(Text, {
  fontFamily: '$body',
  fontSize: 10,
  letterSpacing: 6,
  textTransform: 'uppercase',
  color: C.sand,
  marginBottom: '$6',
  textAlign: 'center',
})

export function HeroSection() {
  const [loaded, setLoaded] = useState(false)
  useEffect(() => { setTimeout(() => setLoaded(true), 100) }, [])

  return (
    <YStack
      minHeight="100vh"
      className="scroll-snap-section"
      alignItems="center"
      justifyContent="center"
      position="relative"
      overflow="hidden"
      style={{
        background: `linear-gradient(160deg, ${C.earth} 0%, #130d06 35%, ${C.deepGreen} 100%)`,
      }}
    >
      {/* Decorative circles */}
      <YStack
        position="absolute"
        right={-80}
        top={-80}
        width={500}
        height={500}
        borderRadius={250}
        style={{ background: `radial-gradient(circle, ${C.forest}18 0%, transparent 70%)` }}
      />
      <YStack
        position="absolute"
        left={-150}
        bottom={-150}
        width={400}
        height={400}
        borderRadius={200}
        style={{ background: `radial-gradient(circle, ${C.ochre}12 0%, transparent 70%)` }}
      />

      <YStack
        zIndex={2}
        alignItems="center"
        maxWidth={760}
        paddingHorizontal="$8"
        opacity={loaded ? 1 : 0}
        transform={loaded ? 'none' : 'translateY(30px)'}
        style={{ transition: 'all 1.2s cubic-bezier(0.25,0.46,0.45,0.94)' }}
      >
        <HeroLabel>Eco-Regenerative Living · Mazunte, Oaxaca</HeroLabel>
        <HeroTitle>Amakura</HeroTitle>
        <HeroTagline>Where the earth teaches us to build</HeroTagline>
        <HeroBody>
          A living project of bioconstruction, permaculture & regenerative design
          on Oaxaca's Pacific coast. Every structure handcrafted. Every detail
          intentional. Every visit transformative.
        </HeroBody>

        <XStack gap="$3" justifyContent="center">
          <Button
            fontFamily="$body"
            fontSize={12}
            letterSpacing={2.5}
            textTransform="uppercase"
            backgroundColor={C.ochre}
            color="#fff"
            paddingHorizontal="$6"
            paddingVertical="$3"
            borderRadius={0}
            hoverStyle={{ backgroundColor: C.clay }}
          >
            Book a Visit
          </Button>
          <Button
            fontFamily="$body"
            fontSize={12}
            letterSpacing={2.5}
            textTransform="uppercase"
            backgroundColor="transparent"
            color={C.sand}
            borderWidth={1}
            borderColor={C.sand}
            paddingHorizontal="$6"
            paddingVertical="$3"
            borderRadius={0}
            hoverStyle={{ backgroundColor: 'rgba(255,255,255,0.06)' }}
          >
            See Our Work
          </Button>
        </XStack>
      </YStack>

      {/* Scroll indicator */}
      <YStack
        position="absolute"
        bottom={36}
        left="50%"
        transform="translateX(-50%)"
        alignItems="center"
        gap="$1"
        className="scroll-indicator"
      >
        <YStack
          width={1}
          height={32}
          style={{ background: 'linear-gradient(180deg, transparent, rgba(255,255,255,0.25))' }}
        />
        <Text fontFamily="$body" fontSize={9} letterSpacing={3} color="rgba(255,255,255,0.25)" textTransform="uppercase">
          Scroll
        </Text>
      </YStack>
    </YStack>
  )
}
```

### 3.4 CREATE `src/interface/landing/PortfolioSection.tsx`
```tsx
import { YStack, XStack, Text, Button, styled } from 'tamagui'
import { amakuraColors as C } from '~/constants/colors'

const projects = [
  { title: 'The Main Pavilion', desc: 'Super Adobe dome with natural plaster finish. Central gathering and dining space.', tags: ['Super Adobe', 'Natural Plaster'], color: C.bark, wide: true },
  { title: 'Composting Bathhouse', desc: 'Dry composting toilet system integrated into a sculpted earth structure.', tags: ['Cob', 'Composting'], color: C.sage },
  { title: 'The Natural Pool', desc: 'Spring-fed pool with bio-filtered water, stone edges, living plant walls.', tags: ['Water Systems', 'Stone'], color: C.moss },
  { title: 'Forest Cabanas', desc: 'Guest sleeping quarters nestled in wild forest, bamboo frame with earth walls.', tags: ['Bamboo', 'Earth Walls'], color: C.forest },
  { title: 'The Kitchen Garden', desc: 'Integrated permaculture beds supplying the restaurant with seasonal produce.', tags: ['Permaculture', 'Food Forest'], color: C.terra, wide: true },
]

const Tag = styled(Text, {
  fontFamily: '$body',
  fontSize: 10,
  letterSpacing: 1.5,
  textTransform: 'uppercase',
  paddingHorizontal: '$2',
  paddingVertical: '$1',
  color: '#fff',
  style: { background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(4px)' },
})

export function PortfolioSection() {
  return (
    <YStack
      minHeight="100vh"
      className="scroll-snap-section"
      paddingVertical={100}
      paddingHorizontal="$8"
      paddingLeft={150}
      style={{ background: `linear-gradient(180deg, #0f0a05 0%, ${C.earth} 5%, #1a120a 100%)` }}
    >
      <YStack maxWidth={1000} width="100%">
        <Text fontFamily="$body" fontSize={11} letterSpacing={4} textTransform="uppercase" color={C.sand} marginBottom="$4">
          Our Work
        </Text>

        <XStack justifyContent="space-between" alignItems="flex-end" marginBottom="$8">
          <YStack>
            <Text fontFamily="$heading" fontSize={44} color={C.cream} lineHeight={48}>
              Built by hand,
            </Text>
            <Text fontFamily="$heading" fontSize={44} fontStyle="italic" color={C.sand} lineHeight={48}>
              from the land
            </Text>
          </YStack>
          <Text
            fontFamily="$body"
            fontSize={15}
            lineHeight={27}
            color="rgba(255,255,255,0.65)"
            maxWidth={340}
            textAlign="right"
          >
            Every structure at Amakura is a demonstration of what's possible when you
            build with the earth instead of against it.
          </Text>
        </XStack>

        <XStack flexWrap="wrap" gap="$3">
          {projects.map((p, i) => (
            <YStack
              key={i}
              position="relative"
              overflow="hidden"
              cursor="pointer"
              backgroundColor={p.color}
              width={p.wide ? '66%' : '32%'}
              aspectRatio={p.wide ? 16 / 10 : 4 / 5}
              $md={{ width: '100%' }}
              hoverStyle={{ opacity: 0.95 }}
            >
              <YStack
                position="absolute"
                inset={0}
                style={{ background: 'linear-gradient(180deg, transparent 40%, rgba(0,0,0,0.5) 100%)' }}
              />
              <XStack position="absolute" top={16} left={16} gap="$1">
                {p.tags.map((t) => <Tag key={t}>{t}</Tag>)}
              </XStack>
              <YStack position="absolute" bottom={0} left={0} right={0} padding="$5">
                <Text fontFamily="$heading" fontSize={22} color="#fff" marginBottom="$1">{p.title}</Text>
                <Text fontFamily="$body" fontSize={12} color="rgba(255,255,255,0.7)" lineHeight={19}>{p.desc}</Text>
              </YStack>
            </YStack>
          ))}
        </XStack>

        <XStack marginTop="$8" justifyContent="center">
          <Button
            fontFamily="$body"
            fontSize={12}
            letterSpacing={2.5}
            textTransform="uppercase"
            backgroundColor="transparent"
            color={C.sand}
            borderWidth={1}
            borderColor={C.sand}
            paddingHorizontal="$6"
            paddingVertical="$3"
            borderRadius={0}
          >
            View Full Portfolio
          </Button>
        </XStack>
      </YStack>
    </YStack>
  )
}
```

### 3.5 CREATE `src/interface/landing/VisitSection.tsx`
```tsx
import { YStack, XStack, Text, Button, styled } from 'tamagui'
import { amakuraColors as C } from '~/constants/colors'

const experiences = [
  { t: 'Natural Pool', d: 'Spring-fed, bio-filtered', bg: C.sage, icon: '🌊' },
  { t: 'Restaurant', d: 'Farm-to-table cuisine', bg: C.clay, icon: '🍽' },
  { t: 'Guided Tour', d: 'Walk the land, learn the craft', bg: C.forest, icon: '🏛' },
  { t: 'Sunset Terrace', d: 'Pacific views from the hill', bg: C.terra, icon: '🌅' },
]

const stats = [
  { n: 'Fri–Sun', l: 'Open Days' },
  { n: '2–8 PM', l: 'Hours' },
  { n: '5.0 ★', l: 'Rating' },
]

export function VisitSection() {
  return (
    <YStack
      minHeight="100vh"
      className="scroll-snap-section"
      backgroundColor={C.cream}
      alignItems="center"
      justifyContent="center"
      paddingHorizontal="$8"
      paddingLeft={150}
    >
      <XStack maxWidth={1050} width="100%" gap={72} $md={{ flexDirection: 'column' }}>
        <YStack flex={1}>
          <Text fontFamily="$body" fontSize={11} letterSpacing={4} textTransform="uppercase" color={C.stone} marginBottom="$4">
            01 — Visitar
          </Text>
          <Text fontFamily="$heading" fontSize={42} color={C.earth} lineHeight={46}>
            Come, sit, taste,
          </Text>
          <Text fontFamily="$heading" fontSize={42} fontStyle="italic" color={C.ochre} lineHeight={46}>
            breathe it in
          </Text>
          <Text fontFamily="$body" fontSize={15} lineHeight={27} color={C.stone} marginTop="$5" maxWidth={500}>
            Every weekend, Amakura opens its gates. Swim in the natural pool surrounded by
            handcrafted bioconstruction. Eat food grown steps from your table. Let the land
            show you what regenerative living feels like.
          </Text>

          <XStack gap="$8" marginTop="$8">
            {stats.map((s) => (
              <YStack key={s.l} alignItems="center">
                <Text fontFamily="$heading" fontSize={32} color={C.ochre}>{s.n}</Text>
                <Text fontFamily="$body" fontSize={10} letterSpacing={2} textTransform="uppercase" color={C.stone} marginTop="$1">
                  {s.l}
                </Text>
              </YStack>
            ))}
          </XStack>

          <XStack gap="$3" marginTop="$7">
            <Button fontFamily="$body" fontSize={12} letterSpacing={2.5} textTransform="uppercase" backgroundColor={C.ochre} color="#fff" paddingHorizontal="$6" paddingVertical="$3" borderRadius={0} hoverStyle={{ backgroundColor: C.clay }}>
              Reserve Your Visit
            </Button>
            <Button fontFamily="$body" fontSize={12} color={C.stone} backgroundColor="transparent" borderWidth={0} borderBottomWidth={1} borderColor="transparent" paddingHorizontal={0} paddingVertical="$3" borderRadius={0} hoverStyle={{ borderColor: C.ochre, color: C.ochre }}>
              How to Get Here →
            </Button>
          </XStack>
        </YStack>

        <XStack flexWrap="wrap" gap="$3" maxWidth={380}>
          {experiences.map((item, i) => (
            <YStack
              key={i}
              backgroundColor={item.bg}
              padding="$5"
              justifyContent="space-between"
              minHeight={170}
              width="48%"
              $sm={{ width: '100%' }}
            >
              <Text fontSize={28}>{item.icon}</Text>
              <YStack>
                <Text fontFamily="$heading" fontSize={18} color="#fff">{item.t}</Text>
                <Text fontFamily="$body" fontSize={11} color="rgba(255,255,255,0.7)" marginTop="$0.5">{item.d}</Text>
              </YStack>
            </YStack>
          ))}
        </XStack>
      </XStack>
    </YStack>
  )
}
```

### 3.6 CREATE `src/interface/landing/BuildSection.tsx`
```tsx
import { YStack, XStack, Text, Button, styled } from 'tamagui'
import { amakuraColors as C } from '~/constants/colors'

const services = [
  {
    n: '01', t: 'Bioconstruction Design & Build',
    d: 'Full-service design and construction using Super Adobe, cob, bamboo, and natural plasters. Every project is site-specific, built from the land itself.',
    tags: ['Super Adobe', 'Cob', 'Bamboo', 'Plaster'],
  },
  {
    n: '02', t: 'Regenerative Site Planning',
    d: 'Permaculture-based site analysis. Water harvesting, composting infrastructure, food forests, and ecological integration — designed to make your land more alive.',
    tags: ['Permaculture', 'Water', 'Food Forest', 'Composting'],
  },
  {
    n: '03', t: 'Consultation & Advisory',
    d: 'On-site assessments, remote design guidance, material sourcing, and technical support for builders exploring natural construction.',
    tags: ['Remote', 'On-Site', 'Technical', 'Sourcing'],
  },
]

const ServiceTag = styled(Text, {
  fontFamily: '$body',
  fontSize: 10,
  letterSpacing: 1,
  textTransform: 'uppercase',
  paddingHorizontal: '$2',
  paddingVertical: '$1',
  backgroundColor: C.linen,
  color: C.stone,
})

export function BuildSection() {
  return (
    <YStack
      minHeight="100vh"
      className="scroll-snap-section"
      backgroundColor={C.warm}
      alignItems="center"
      justifyContent="center"
      paddingHorizontal="$8"
      paddingLeft={150}
    >
      <YStack maxWidth={880} width="100%">
        <Text fontFamily="$body" fontSize={11} letterSpacing={4} textTransform="uppercase" color={C.stone} marginBottom="$4">
          02 — Construir
        </Text>
        <Text fontFamily="$heading" fontSize={42} color={C.earth} lineHeight={46}>
          Construction as
        </Text>
        <Text fontFamily="$heading" fontSize={42} fontStyle="italic" color={C.ochre} lineHeight={46}>
          regeneration
        </Text>
        <Text fontFamily="$body" fontSize={15} lineHeight={27} color={C.stone} marginTop="$5" marginBottom="$8" maxWidth={500}>
          Amakura designs and builds structures that heal the land instead of depleting it.
          Using ancestral techniques refined with modern understanding, we create spaces that
          are artful, resilient, and alive.
        </Text>

        {services.map((s) => (
          <XStack
            key={s.n}
            paddingVertical="$6"
            borderBottomWidth={1}
            borderColor={C.linen}
            gap="$6"
            cursor="default"
            hoverStyle={{ borderColor: C.ochre }}
          >
            <Text fontFamily="$heading" fontSize={38} color={C.linen} fontWeight="300" minWidth={52} hoverStyle={{ color: C.ochre }}>
              {s.n}
            </Text>
            <YStack flex={1}>
              <Text fontFamily="$heading" fontSize={22} color={C.earth} marginBottom="$2">{s.t}</Text>
              <Text fontFamily="$body" fontSize={13} color={C.stone} lineHeight={22} marginBottom="$3" maxWidth={550}>{s.d}</Text>
              <XStack gap="$1.5" flexWrap="wrap">
                {s.tags.map((t) => <ServiceTag key={t}>{t}</ServiceTag>)}
              </XStack>
            </YStack>
          </XStack>
        ))}

        <XStack marginTop="$8" gap="$3">
          <Button fontFamily="$body" fontSize={12} letterSpacing={2.5} textTransform="uppercase" backgroundColor={C.earth} color={C.cream} paddingHorizontal="$6" paddingVertical="$3" borderRadius={0} hoverStyle={{ backgroundColor: C.char }}>
            Start a Project
          </Button>
          <Button fontFamily="$body" fontSize={12} letterSpacing={2.5} textTransform="uppercase" backgroundColor="transparent" color={C.earth} borderWidth={1} borderColor={C.earth} paddingHorizontal="$6" paddingVertical="$3" borderRadius={0} hoverStyle={{ backgroundColor: 'rgba(0,0,0,0.04)' }}>
            View Portfolio
          </Button>
        </XStack>
      </YStack>
    </YStack>
  )
}
```

### 3.7 CREATE `src/interface/landing/LearnSection.tsx`
```tsx
import { YStack, XStack, Text, Button, styled } from 'tamagui'
import { amakuraColors as C } from '~/constants/colors'

const programs = [
  { icon: '🧱', t: 'Bioconstruction Workshops', d: '3-5 day intensive hands-on workshops. Learn Super Adobe, cob, and natural plaster techniques by building real structures.', dur: '3-5 days', price: 'From $280' },
  { icon: '🌱', t: 'Permaculture Immersion', d: '2-4 week volunteer stays. Live on the land, integrate permaculture into daily life, contribute to the ongoing build.', dur: '2-4 weeks', price: 'Exchange' },
  { icon: '🔥', t: 'Regenerative Retreat', d: 'Weekend experiences combining bioconstruction demos, ecological cooking, natural products, and coastal connection.', dur: 'Weekend', price: 'From $180' },
]

export function LearnSection() {
  return (
    <YStack
      minHeight="100vh"
      className="scroll-snap-section"
      alignItems="center"
      justifyContent="center"
      paddingHorizontal="$8"
      paddingLeft={150}
      style={{ background: `linear-gradient(180deg, ${C.deepGreen} 0%, #1a2e1c 100%)` }}
    >
      <YStack maxWidth={1050} width="100%">
        <Text fontFamily="$body" fontSize={11} letterSpacing={4} textTransform="uppercase" color={C.sand} marginBottom="$4">
          03 — Aprender
        </Text>
        <Text fontFamily="$heading" fontSize={42} color={C.cream} lineHeight={46}>
          The land is the
        </Text>
        <Text fontFamily="$heading" fontSize={42} fontStyle="italic" color={C.sand} lineHeight={46}>
          classroom
        </Text>
        <Text fontFamily="$body" fontSize={15} lineHeight={27} color="rgba(255,255,255,0.65)" marginTop="$5" marginBottom="$8" maxWidth={500}>
          Whether you come for a weekend workshop or a month-long immersion, Amakura transmits
          knowledge through practice. Hands in the earth. Feet on the ground.
        </Text>

        <XStack gap="$4" $md={{ flexDirection: 'column' }}>
          {programs.map((c, i) => (
            <YStack
              key={i}
              flex={1}
              padding="$6"
              borderLeftWidth={3}
              borderColor="transparent"
              style={{ background: 'rgba(255,255,255,0.04)' }}
              hoverStyle={{ borderColor: C.ochre, transform: 'translateX(4px)' }}
              cursor="default"
            >
              <Text fontSize={28} marginBottom="$4">{c.icon}</Text>
              <Text fontFamily="$heading" fontSize={20} color={C.cream} marginBottom="$2">{c.t}</Text>
              <Text fontFamily="$body" fontSize={13} color="rgba(255,255,255,0.5)" lineHeight={22} marginBottom="$5">{c.d}</Text>
              <XStack justifyContent="space-between" borderTopWidth={1} borderColor="rgba(255,255,255,0.08)" paddingTop="$3">
                <Text fontFamily="$body" fontSize={11} color="rgba(255,255,255,0.35)" letterSpacing={1}>{c.dur}</Text>
                <Text fontFamily="$body" fontSize={13} color={C.ochre} fontWeight="500">{c.price}</Text>
              </XStack>
            </YStack>
          ))}
        </XStack>

        <XStack
          marginTop="$8"
          padding="$7"
          justifyContent="space-between"
          alignItems="center"
          style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}
          $md={{ flexDirection: 'column', gap: '$4' }}
        >
          <YStack>
            <Text fontFamily="$heading" fontSize={22} color={C.cream} marginBottom="$1">Volunteer Program</Text>
            <Text fontFamily="$body" fontSize={13} color="rgba(255,255,255,0.4)" maxWidth={380}>
              Join a community of builders, growers, and seekers. Exchange your energy for knowledge, food, and a place in the forest.
            </Text>
          </YStack>
          <Button fontFamily="$body" fontSize={12} letterSpacing={2.5} textTransform="uppercase" backgroundColor={C.ochre} color="#fff" paddingHorizontal="$6" paddingVertical="$3" borderRadius={0} hoverStyle={{ backgroundColor: C.clay }}>
            Apply Now
          </Button>
        </XStack>
      </YStack>
    </YStack>
  )
}
```

### 3.8 CREATE `src/interface/landing/ContactSection.tsx`
```tsx
import { YStack, XStack, Text, Input, TextArea, Button } from 'tamagui'
import { amakuraColors as C } from '~/constants/colors'

const interests = ['Visit', 'Build', 'Workshop', 'Volunteer', 'Other']
const contactInfo = [
  ['Location', 'Zapotal, Mazunte\nOaxaca, Mexico'],
  ['Hours', 'Friday–Sunday\n2:00–8:00 PM'],
  ['Contact', 'hola@amakura.mx\n+52 958 XXX XXXX'],
]

export function ContactSection() {
  return (
    <YStack
      minHeight="100vh"
      className="scroll-snap-section"
      alignItems="center"
      justifyContent="center"
      paddingHorizontal="$8"
      position="relative"
      style={{ background: `linear-gradient(180deg, ${C.earth} 0%, #0a0704 100%)` }}
    >
      <YStack
        position="absolute"
        inset={0}
        style={{
          background: 'radial-gradient(ellipse at 30% 50%, rgba(122,139,111,0.06) 0%, transparent 60%), radial-gradient(ellipse at 70% 30%, rgba(193,120,23,0.04) 0%, transparent 50%)',
        }}
      />

      <YStack zIndex={1} alignItems="center" maxWidth={650}>
        <Text fontFamily="$body" fontSize={11} letterSpacing={4} textTransform="uppercase" color={C.sand} marginBottom="$4">
          04 — Contacto
        </Text>
        <Text fontFamily="$heading" fontSize={48} color={C.cream} lineHeight={52} textAlign="center">
          The door is open.
        </Text>
        <Text fontFamily="$heading" fontSize={48} fontStyle="italic" color={C.sand} lineHeight={52} textAlign="center">
          Come build with us.
        </Text>
        <Text fontFamily="$body" fontSize={15} lineHeight={27} color="rgba(255,255,255,0.65)" marginTop="$5" marginBottom="$8" textAlign="center" maxWidth={420}>
          Whether you want to visit for an afternoon, commission a build, or spend a season
          learning — every conversation starts the same way.
        </Text>

        <YStack maxWidth={460} width="100%" gap="$3">
          <XStack gap="$3">
            <Input flex={1} placeholder="Your name" backgroundColor="rgba(255,255,255,0.04)" borderColor="rgba(255,255,255,0.08)" color={C.cream} fontFamily="$body" fontSize={13} borderRadius={0} />
            <Input flex={1} placeholder="Email" backgroundColor="rgba(255,255,255,0.04)" borderColor="rgba(255,255,255,0.08)" color={C.cream} fontFamily="$body" fontSize={13} borderRadius={0} />
          </XStack>

          <XStack gap="$2" flexWrap="wrap">
            {interests.map((o) => (
              <Text
                key={o}
                paddingHorizontal="$3"
                paddingVertical="$1.5"
                borderWidth={1}
                borderColor="rgba(255,255,255,0.1)"
                fontFamily="$body"
                fontSize={11}
                color="rgba(255,255,255,0.4)"
                cursor="pointer"
                letterSpacing={1}
                hoverStyle={{ borderColor: C.ochre, color: C.ochre }}
              >
                {o}
              </Text>
            ))}
          </XStack>

          <TextArea
            placeholder="Tell us what draws you here..."
            rows={3}
            backgroundColor="rgba(255,255,255,0.04)"
            borderColor="rgba(255,255,255,0.08)"
            color={C.cream}
            fontFamily="$body"
            fontSize={13}
            borderRadius={0}
          />

          <Button
            width="100%"
            fontFamily="$body"
            fontSize={12}
            letterSpacing={2.5}
            textTransform="uppercase"
            backgroundColor={C.ochre}
            color="#fff"
            paddingVertical="$3"
            borderRadius={0}
            hoverStyle={{ backgroundColor: C.clay }}
          >
            Send Message
          </Button>
        </YStack>

        <XStack marginTop="$10" justifyContent="center" gap="$10" borderTopWidth={1} borderColor="rgba(255,255,255,0.05)" paddingTop="$7" $md={{ flexDirection: 'column', gap: '$6' }}>
          {contactInfo.map(([k, v]) => (
            <YStack key={k} alignItems="center">
              <Text fontFamily="$body" fontSize={9} letterSpacing={3} textTransform="uppercase" color="rgba(255,255,255,0.2)" marginBottom="$2">{k}</Text>
              <Text fontFamily="$body" fontSize={12} color="rgba(255,255,255,0.4)" textAlign="center" whiteSpace="pre-line" lineHeight={19}>{v}</Text>
            </YStack>
          ))}
        </XStack>

        <Text fontFamily="$body" fontSize={10} color="rgba(255,255,255,0.1)" letterSpacing={1} marginTop="$8">
          © 2026 Amakura · Built from the earth, for the earth
        </Text>
      </YStack>
    </YStack>
  )
}
```

### 3.9 DELETE old landing components
```
src/interface/landing/ContentSection.tsx
src/interface/landing/PromoLinksRow.tsx
src/interface/landing/SectionTitle.tsx
```

### 3.10 REWRITE `app/index+ssg.tsx`
```tsx
import { YStack } from 'tamagui'
import { HeadInfo } from '~/interface/app/HeadInfo'
import { HeroSection } from '~/interface/landing/HeroSection'
import { PortfolioSection } from '~/interface/landing/PortfolioSection'
import { VisitSection } from '~/interface/landing/VisitSection'
import { BuildSection } from '~/interface/landing/BuildSection'
import { LearnSection } from '~/interface/landing/LearnSection'
import { ContactSection } from '~/interface/landing/ContactSection'
import { SectionNav } from '~/interface/landing/SectionNav'

export function IndexPage() {
  return (
    <YStack className="scroll-snap-container">
      <HeadInfo
        title="Amakura — Centro de Vida Eco-Regenerativa"
        description="Where the earth teaches us to build. Bioconstruction, permaculture, and regenerative living in Mazunte, Oaxaca."
      />
      <SectionNav />
      <HeroSection />
      <PortfolioSection />
      <VisitSection />
      <BuildSection />
      <LearnSection />
      <ContactSection />
    </YStack>
  )
}
```

### 3.11 Rewrite `src/features/site/ui/SiteHeader.tsx`
Replace nav links with: Portfolio, Visitar, Construir, Aprender, Contacto
Replace logo text with "Amakura" + "Mazunte" subtitle
Replace CTA button with "Reservar" (ochre/accent theme)
Remove docs link, social links, theme switch

### 3.12 Rewrite `src/features/site/ui/SiteFooter.tsx`
- Amakura branding
- Location: Zapotal, Mazunte, Oaxaca
- Contact: hola@amakura.mx
- Social: Instagram link
- Copyright

### 3.13 Rewrite `src/interface/landing/HomeBackground.tsx`
Replace gradient orbs with earth-tone palette (sand, sage green circles)

---

## Phase 4: Booking System

### 4.1 CREATE `src/features/booking/useBooking.ts`
```typescript
import { useState } from 'react'

export type BookingFormData = {
  name: string
  email: string
  phone?: string
  experienceTypeId: string
  date: string
  guests: number
  notes?: string
}

export function useBooking() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const createBooking = async (data: BookingFormData) => {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch('/api/booking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (!res.ok) throw new Error('Booking failed')
      setSuccess(true)
    } catch (e: any) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  return { createBooking, loading, error, success }
}
```

### 4.2 CREATE `src/features/booking/BookingModal.tsx`
3-step wizard using Tamagui Dialog/Sheet pattern:
- Step 1: Choose experience type (grid of cards)
- Step 2: Choose date + guests
- Step 3: Summary + contact info form + confirm button
(Full component ~200 lines, follows prototype's BookingModal structure using Tamagui components)

### 4.3 CREATE `app/api/booking+api.ts`
```typescript
import { getDb } from '~/database'
import { booking } from '~/database/schema-public'

export const POST = async (req: Request) => {
  const body = await req.json()

  if (!body.name || !body.email || !body.experienceTypeId || !body.date) {
    return Response.json({ error: 'Missing required fields' }, { status: 400 })
  }

  const db = getDb()
  const id = crypto.randomUUID()

  await db.insert(booking).values({
    id,
    name: body.name,
    email: body.email,
    phone: body.phone || null,
    experienceTypeId: body.experienceTypeId,
    date: body.date,
    guests: body.guests || 1,
    notes: body.notes || null,
    status: 'pending',
    locale: body.locale || 'es',
  })

  return Response.json({ success: true, bookingId: id })
}
```

---

## Phase 5: Contact & Volunteer

### 5.1 CREATE `app/api/contact+api.ts`
```typescript
import { getDb } from '~/database'
import { contactMessage } from '~/database/schema-public'

export const POST = async (req: Request) => {
  const body = await req.json()
  if (!body.name || !body.email || !body.message) {
    return Response.json({ error: 'Missing required fields' }, { status: 400 })
  }
  const db = getDb()
  const id = crypto.randomUUID()
  await db.insert(contactMessage).values({
    id,
    name: body.name,
    email: body.email,
    interest: body.interest || null,
    message: body.message,
    status: 'unread',
  })
  return Response.json({ success: true })
}
```

### 5.2 CREATE `app/api/volunteer+api.ts`
```typescript
import { getDb } from '~/database'
import { volunteerApplication } from '~/database/schema-public'

export const POST = async (req: Request) => {
  const body = await req.json()
  if (!body.name || !body.email || !body.motivation) {
    return Response.json({ error: 'Missing required fields' }, { status: 400 })
  }
  const db = getDb()
  const id = crypto.randomUUID()
  await db.insert(volunteerApplication).values({
    id,
    name: body.name,
    email: body.email,
    phone: body.phone || null,
    startDate: body.startDate || null,
    endDate: body.endDate || null,
    experience: body.experience || null,
    motivation: body.motivation,
    skills: body.skills || null,
    status: 'pending',
  })
  return Response.json({ success: true })
}
```

### 5.3 CREATE `app/volunteer+ssg.tsx`
Standalone volunteer page with form (name, email, phone, dates, motivation, skills)

---

## Phase 6: Admin Panel

### 6.1 `app/(app)/_layout.tsx` — update redirects
Change `"/home/feed"` to `"/home/bookings"` in the redirect logic.
Remove `DragDropFile` and `Gallery` imports.

### 6.2 REWRITE `app/(app)/home/(tabs)/_layout.tsx`
Replace feed/search/ai/profile tabs with: Bookings, Portfolio, Messages, Settings

### 6.3 CREATE admin route directories
```
app/(app)/home/(tabs)/bookings/_layout.tsx
app/(app)/home/(tabs)/bookings/index.tsx
app/(app)/home/(tabs)/portfolio/_layout.tsx
app/(app)/home/(tabs)/portfolio/index.tsx
app/(app)/home/(tabs)/messages/_layout.tsx
app/(app)/home/(tabs)/messages/index.tsx
```
(settings/ already exists)

### 6.4 CREATE admin feature components
```
src/features/admin/BookingList.tsx   — list with status filter, search
src/features/admin/BookingDetail.tsx — detail view with status actions
src/features/admin/PortfolioEditor.tsx — CRUD for portfolio projects
src/features/admin/MessageInbox.tsx  — contact + volunteer message tabs
```

### 6.5 DELETE old social routes
```
app/(app)/home/(tabs)/feed/    (entire directory)
app/(app)/home/(tabs)/search/  (entire directory)
app/(app)/home/(tabs)/ai/      (entire directory)
app/(app)/home/(tabs)/profile/ (entire directory)
```

---

## Phase 7: Cleanup

### 7.1 DELETE social feature code
```
src/features/feed/        (entire directory)
src/features/moderation/  (entire directory)
```

### 7.2 Update remaining references
- `app/api/og+api.tsx` — Amakura branding
- `app/api/stats+api.ts` — track bookings/messages instead of posts
- `app/(legal)/*.tsx` — company name → Amakura
- `app/help+ssg.tsx` — update content

### 7.3 Verify
```bash
bun lint:fix && bun tko check types
bun check:all
bun ops release --dry-run
```

---

## Implementation Order
```
Phase 1 (Foundation) → Phase 2 (Database) → Phase 3 (Landing) + Phase 4 (Booking) + Phase 5 (Contact)
                                                          ↓
                                                   Phase 6 (Admin)
                                                          ↓
                                                   Phase 7 (Cleanup)
```
