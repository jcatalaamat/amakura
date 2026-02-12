# Takeout Starter Template - Comprehensive Analysis

> Deep-dive architectural analysis of the Takeout universal app template

---

## Table of Contents

1. [Architecture Overview](#1-architecture-overview)
2. [Framework Analysis: One](#2-framework-analysis-one)
3. [Real-Time Sync: Rocicorp Zero](#3-real-time-sync-rocicorp-zero)
4. [Authentication: Better Auth](#4-authentication-better-auth)
5. [Database Layer: Drizzle](#5-database-layer-drizzle)
6. [UI System: Tamagui](#6-ui-system-tamagui)
7. [State Management](#7-state-management)
8. [API Layer](#8-api-layer)
9. [Build & Deployment](#9-build--deployment)
10. [Developer Tooling](#10-developer-tooling)
11. [Notable Patterns](#11-notable-patterns)
12. [Strengths & Considerations](#12-strengths--considerations)

---

## 1. Architecture Overview

### Monorepo Structure

Takeout is organized as a **Bun-managed monorepo**:

```
takeout/
├── app/                      # File-based routes (One router)
├── src/                      # Main application code
│   ├── features/            # Feature modules (auth, feed, profile)
│   ├── interface/           # UI components (Tamagui)
│   ├── database/            # Drizzle schema & migrations
│   ├── data/                # Zero sync models & queries
│   ├── server/              # Server utilities
│   └── zero/                # Zero client/server setup
├── packages/                # Workspace packages
│   ├── on-zero/             # TypeScript layer over Rocicorp Zero
│   ├── better-auth-utils/   # Auth client utilities
│   ├── cli/                 # Takeout CLI (tko command)
│   ├── helpers/             # Shared utilities
│   ├── postgres/            # Postgres connection
│   └── scripts/             # Build scripts
└── docker-compose.yml       # Dev services (Postgres, Zero, MinIO)
```

### Universal App Approach

Takeout leverages **One framework** to share code across:
- **Web**: React + Vite + One
- **iOS**: React Native + Expo
- **Android**: React Native + Expo

Platform-specific code uses the `.native.ts/.tsx` file extension pattern.

### Data Flow Pattern

```
Client (Web/Native)
    ↓
Zero Client (IndexedDB/SQLite)
    ↓
Zero Server (CVR + Mutations)
    ↓
Rocicorp Zero Sync Engine
    ↓
PostgreSQL (Upstream DB)
    ↓
Authentication (Better Auth)
    ↓
Authorization (Row-level via serverWhere)
```

---

## 2. Framework Analysis: One

### What is One?

One is a **universal React framework** that allows:
- Single codebase for web + native
- File-based routing (`./app` directory)
- SSR/SSG capabilities for web
- React Navigation for native

### File-Based Routing

```typescript
// Route patterns:
app/_layout.tsx              // Root layout
app/(app)/_layout.tsx        // App group layout
app/(app)/home/_layout.tsx   // Tab navigation
app/(app)/auth/login.tsx     // Login page
app/index+ssg.tsx            // Static home (SSG)
app/api/health+api.ts        // API route
```

**Key patterns:**
- `+api` suffix → API routes
- `+ssg` suffix → Static site generation
- `(group)` → Route grouping
- `.native.tsx` → Native-specific components

### Web/Native Bridge

```typescript
// Platform-specific component selection
export default isWeb ? WebComponent : NativeComponent

// Using platform detection
import { isWeb } from 'tamagui'

// File naming convention
Component.tsx         // Used on both platforms
Component.native.tsx  // Native only override
```

---

## 3. Real-Time Sync: Rocicorp Zero

### How Zero Works

Zero provides **live, multi-user sync** with optimistic updates:

#### Schema Definition

```typescript
// src/data/schema.ts
export const schema = createSchema({
  tables: allTables,
  relationships: allRelationships,
  enableLegacyQueries: false,
})
```

#### Table Models

```typescript
// src/data/models/post.ts
export const schema = table('post')
  .columns({
    id: string(),
    userId: string(),
    image: string(),
    imageWidth: number().optional(),
    caption: string().optional(),
    commentCount: number(),
    createdAt: number(),
    updatedAt: number().optional(),
  })
  .primaryKey('id')
```

#### Relationships

```typescript
// src/data/relationships.ts
export const postRelationships = relationships(tables.post, ({ one, many }) => ({
  user: one({
    sourceField: ['userId'],
    destSchema: tables.userPublic,
    destField: ['id'],
  }),
  comments: many({
    sourceField: ['id'],
    destSchema: tables.comment,
    destField: ['postId'],
  }),
  // Enable filtering posts whose author is blocked
  authorBlockedBy: many({
    sourceField: ['userId'],
    destSchema: tables.block,
    destField: ['blockedId'],
  }),
}))
```

### Synced Queries

```typescript
// src/data/queries/post.ts
export const feedPosts = (props: {
  pageSize: number
  cursor?: { id: string; createdAt: number } | null
}) => {
  let query = zql.post
    .where(notBlockedByViewer)
    .orderBy('createdAt', 'desc')
    .limit(props.pageSize)
    .related('user', (q) => q.one())
    .related('comments', (q) =>
      q.orderBy('createdAt', 'desc').limit(1)
    )

  if (props.cursor) {
    query = query.start(props.cursor)
  }
  return query
}
```

### Permissions System

Row-level permissions via `serverWhere`:

```typescript
// User can only mutate their own data
const permissions = serverWhere('userPublic', (_, auth) => {
  return _.or(
    _.cmpLit(auth?.role || '', '=', 'admin'),
    _.cmp('id', auth?.id || '')
  )
})

// Only see posts from non-blocked users
const notBlockedByViewer = serverWhere('post', (_, auth) => {
  return _.not(
    _.exists(
      _.sub.block
        .where('blockerId', auth?.id || '')
        .where('blockedId', _.cmp('userId', '=', ''))
    )
  )
})
```

### Server Actions (Mutations)

```typescript
// src/data/models/user.ts
export const mutate = mutations(schema, permissions, {
  update: async ({ authData, can, tx, environment, server }, user: UserUpdate) => {
    ensure(authData)
    await can(permissions, authData.id)

    let updateData = { ...user }

    // Server-only logic (upload image)
    if (process.env.VITE_ENVIRONMENT === 'ssr' && server && updateData.image?.startsWith('data:')) {
      const { uploadDataUrlToR2 } = await import('~/features/upload/uploadDataUrl')
      updateData.image = await uploadDataUrlToR2(updateData.image)
    }

    await tx.mutate.userPublic.update(updateData)

    // Analytics tracking
    if (environment === 'server' && server) {
      server.asyncTasks.push(() =>
        server.actions.analyticsActions().logEvent(authData.id, 'profile_updated', {
          fieldsUpdated: Object.keys(user).filter((key) => key !== 'id'),
        })
      )
    }
  },
})
```

### Client-Side Storage

| Platform | Storage |
|----------|---------|
| Web | IndexedDB (via Zero's IDB adapter) |
| Native | SQLite (via op-sqlite + @rocicorp/zero-sqlite3) |

```typescript
// Client setup
const ProvideZero = ({ children }) => {
  const auth = useAuth()
  const kvStore = isBrowser && auth ? 'idb' : 'mem'

  return (
    <ProvideZeroWithoutAuth
      userID={auth.user?.id || 'anon'}
      kvStore={kvStore}
      authData={auth.authData}
      cacheURL={ZERO_SERVER_URL}
    >
      {children}
    </ProvideZeroWithoutAuth>
  )
}

// Usage in components
const [posts, status] = useQuery(feedPosts, { pageSize: 3 })
```

---

## 4. Authentication: Better Auth

### Configured Auth Methods

```typescript
// src/features/auth/server/authServer.ts
export const authServer = betterAuth({
  database,

  session: {
    freshAge: time.minute.days(2),
    storeSessionInDatabase: true,
  },

  emailAndPassword: {
    enabled: true,
  },

  plugins: [
    jwt({
      jwt: { expirationTime: '3y' },
      jwks: { keyPairConfig: { alg: 'EdDSA', crv: 'Ed25519' } },
    }),
    bearer(),
    expo(),
    magicLink({ sendMagicLink: async ({ email, url }) => { /* ... */ } }),
    admin(),
    emailOTP({ sendVerificationOTP: async ({ email, otp }) => { /* ... */ } }),
    phoneNumber({ sendOTP: async ({ phoneNumber, code }) => { /* ... */ } }),
  ],
})
```

### Session Management

- Sessions stored in database
- 2-day fresh age (auto-refresh)
- JWT tokens with 3-year expiration (offline access)
- Bearer token support for API access

### Rate Limiting

```typescript
rateLimit: {
  enabled: true,
  window: 60,           // 1 minute window
  max: 30,              // 30 requests per minute globally
  customRules: {
    '/sign-in/email': { window: 60, max: 5 },
    '/sign-up/email': { window: 60, max: 3 },
    '/email-otp/send-verification-otp': { window: 60, max: 3 },
  },
}
```

### Cross-Domain Auth

```typescript
advanced: {
  ...(BETTER_AUTH_URL.includes(DOMAIN) && {
    crossSubDomainCookies: {
      enabled: true,
      domain: '.tamagui.dev',
    },
  }),
}
```

---

## 5. Database Layer: Drizzle

### Public Tables (Synced via Zero)

```typescript
// src/database/schema-public.ts

export const userPublic = pgTable('userPublic', {
  id: text('id').primaryKey(),
  name: text('name'),
  username: text('username'),
  image: text('image'),
  joinedAt: timestamp('joinedAt').defaultNow(),
  hasOnboarded: boolean('hasOnboarded').default(false),
  postsCount: integer('postsCount').default(0),
})

export const post = pgTable('post', {
  id: text('id').primaryKey(),
  userId: text('userId').notNull(),
  image: text('image').notNull(),
  caption: text('caption'),
  commentCount: integer('commentCount').default(0),
  hiddenByAdmin: boolean('hiddenByAdmin').default(false),
  createdAt: timestamp('createdAt').defaultNow(),
}, (table) => [
  index('post_userId_idx').on(table.userId),
  index('post_createdAt_idx').on(table.createdAt),
])

export const block = pgTable('block', {
  id: text('id').primaryKey(),
  blockerId: text('blockerId').notNull(),
  blockedId: text('blockedId').notNull(),
  createdAt: timestamp('createdAt').defaultNow(),
}, (table) => [
  unique('block_blocker_blocked_unique').on(table.blockerId, table.blockedId),
])

export const notification = pgTable('notification', {
  id: text('id').primaryKey(),
  userId: text('userId').notNull(),
  actorId: text('actorId'),
  type: text('type').notNull(),
  read: boolean('read').default(false),
}, (table) => [
  index('notification_userId_idx').on(table.userId),
])
```

### Private Tables (Not Synced)

```typescript
// src/database/schema-private.ts

export const user = pgTable('user', (t) => ({
  id: t.varchar('id').primaryKey(),
  email: t.varchar('email').unique().notNull(),
  emailVerified: t.boolean('emailVerified').default(false),
  role: t.varchar('role').default('user'),
  banned: t.boolean('banned').default(false),
}))

export const account = pgTable('account', (t) => ({
  id: t.text('id').primaryKey(),
  userId: t.text('userId').references(() => user.id, { onDelete: 'cascade' }),
  providerId: t.text('providerId').notNull(),
  password: t.text('password'),
}))

export const session = pgTable('session', (t) => ({
  id: t.text('id').primaryKey(),
  userId: t.text('userId').references(() => user.id, { onDelete: 'cascade' }),
  expiresAt: t.timestamp('expiresAt').notNull(),
  token: t.text('token').notNull(),
}))
```

### Migrations

```bash
# Update schema, then run migrations
bun db:migrate

# Add custom migration
bun db:add-migration <name>
```

---

## 6. UI System: Tamagui

### Component Architecture

Tamagui provides:
- **Universal styling** - Works on web, iOS, Android
- **Typed components** - Full TypeScript support
- **Platform optimization** - Removes unused styles per platform

### Theme System

```typescript
// src/tamagui/TamaguiRootProvider.tsx
export const TamaguiRootProvider = ({ children }) => {
  return (
    <SchemeProvider>
      <TamaguiInnerProvider>{children}</TamaguiInnerProvider>
    </SchemeProvider>
  )
}

const TamaguiInnerProvider = ({ children }) => {
  const userScheme = useUserScheme()

  return (
    <TamaguiProvider
      config={config}
      defaultTheme={userScheme.value}
    >
      {children}
    </TamaguiProvider>
  )
}
```

### Platform-Specific Components

```
src/interface/
├── buttons/
│   ├── Button.tsx           # Both platforms
│   └── Button.native.tsx    # Native override
├── lists/
│   ├── FlatList.native.tsx  # Native-specific
│   └── VirtualizedList.tsx  # Web virtualization
```

---

## 7. State Management

### Three-Layer Approach

| Layer | Purpose | Technology |
|-------|---------|------------|
| **Zero** | Global sync state | Real-time database sync |
| **React Context** | UI state | Auth, User, Theme contexts |
| **Local Storage** | Persistent client state | MMKV (native), localStorage (web) |

### Zero as State Management

```typescript
// Automatic state syncing
const [posts, status] = useQuery(feedPosts, { pageSize: 3 })

// Status: 'unknown' | 'loading' | 'ready' | 'error'
if (status.type === 'unknown') return <Loading />

// Mutations automatically update UI
const { mutate } = useMutation()
await mutate.post.insert({ id, userId, image, caption })
```

### Local Storage Pattern

```typescript
// src/features/user/getUser.ts
const userCache = createStorageValue<User | null>('user-cache')

export const getUser = () => user === undefined ? userCache.get() : user
export const setUser = (next: User | null) => {
  userCache.set(next)
  user = next
}
```

---

## 8. API Layer

### API Route Structure

```typescript
// app/api/health+api.ts
export const GET = () => Response.json({ status: 'ok' })

// app/api/auth/[...sub]+api.ts
export const ALL = (req: Request) => authServer.handler(req)

// app/api/zero/pull+api.tsx
export const POST = (request: Request) => zeroServer.pull(request)

// app/api/zero/push+api.tsx
export const POST = (request: Request) => zeroServer.push(request)
```

### Server Actions

```typescript
// src/data/server/createServerActions.ts
export const createServerActions = () => ({
  analyticsActions,
  pushNotificationActions,
  userActions,
})

// Usage in mutations
if (environment === 'server' && server) {
  server.asyncTasks.push(() =>
    server.actions.analyticsActions().logEvent(authData.id, 'post_created', {})
  )
}
```

---

## 9. Build & Deployment

### Build System

| Platform | Build Tool |
|----------|------------|
| Web | Vite |
| Native | Metro (via One) |
| Dev Server | Port 8081 |

### Deployment Options

#### AWS (SST)

```bash
bun tko sst deploy production
```

Provisions:
- VPC with bastion host
- Aurora PostgreSQL (serverless)
- ECS cluster for Zero
- S3 for backups
- CloudFlare R2 integration

#### Self-Hosted (Uncloud)

```bash
bun tko uncloud deploy-prod
```

Features:
- Docker container deployment
- PostgreSQL via pg
- Zero sync server
- S3-compatible storage (MinIO/R2)

#### Mobile (EAS)

```bash
eas build --platform ios
eas build --platform android
```

### Docker Services

```yaml
services:
  pgdb:      # PostgreSQL with pgvector
  migrate:   # Drizzle migrations
  zero:      # Rocicorp Zero sync engine
  minio:     # S3-compatible storage (dev)
```

---

## 10. Developer Tooling

### CLI Commands (tko)

```bash
bun tko                      # List commands
bun tko docs list           # View documentation
bun tko check --all         # Lint + type check
bun tko run build           # Build web app
bun tko db migrate          # Run migrations
bun tko icon add-phosphor Heart  # Add icon
```

### Testing

| Type | Tool | Command |
|------|------|---------|
| Unit | Vitest | `bun test:unit` |
| Integration | Playwright | `bun test:integration` |
| Full Suite | - | `bun ops release --dry-run` |

### Code Quality

```bash
bun lint          # OxLint
bun lint:fix      # Auto-fix + OxFmt
bun check:all     # Full quality check
```

---

## 11. Notable Patterns

### Feature-Based Organization

```
src/features/feed/
├── ui/
│   ├── FeedContent.tsx
│   ├── PostCard.tsx
│   └── PostCard.native.tsx
├── usePosts.ts
├── usePostsPaginated.ts
└── index.ts
```

### Error Handling

```typescript
throw new AppError(
  'PROFANITY_DETECTED',
  'Content violates community guidelines',
  { flaggedWords: profanityCheck.flaggedWords }
)
```

### Feature Flags

```typescript
const FEATURE_FLAGS = {
  ENABLE_HOT_UPDATES: 'enable_hot_updates',
}

const isEnabled = useFeatureFlag(FEATURE_FLAGS.ENABLE_HOT_UPDATES, {
  defaultValue: false,
})
```

### Content Moderation

```typescript
// Profanity filter with leetspeak normalization
export function checkProfanity(text: string): ProfanityResult {
  const normalized = normalizeText(text)  // 1=i, 0=o, etc
  const flaggedWords: string[] = []

  for (const word of BLOCKED_WORDS) {
    if (normalized.includes(normalizeText(word))) {
      flaggedWords.push(word)
    }
  }
  return { clean: flaggedWords.length === 0, flaggedWords }
}
```

### Import Alias

```typescript
// Use ~ for src imports
import { feedPosts } from '~/data/queries/post'
```

---

## 12. Strengths & Considerations

### Strengths

| Strength | Description |
|----------|-------------|
| **True Universal Development** | Single React codebase for web + iOS + Android |
| **Real-Time Sync** | Built-in live sync with Zero, optimistic updates |
| **Complete Starter Kit** | Auth, database, deployment, testing included |
| **Modern Tooling** | TypeScript, Bun, OxLint, Expo |
| **Scalable Architecture** | Workspace packages, feature-based organization |

### Considerations

| Consideration | Description |
|---------------|-------------|
| **Learning Curve** | Three frameworks: One, Zero, Tamagui |
| **Zero Dependencies** | Opinionated sync may not fit all use cases |
| **Mobile Complexity** | Expo builds, OTA updates, native modules |
| **Deployment Learning** | AWS SST/CDK concepts, Uncloud VPS setup |

### Best Use Cases

**Excellent for:**
- Multi-platform apps with real-time collaboration
- Social features (feeds, posts, comments)
- Apps with complex permission models
- Rapid prototyping with full stack

**Less ideal for:**
- Simple CRUD apps (overkill)
- AI-heavy applications
- Games
- Legacy system integration

---

## Architecture Diagram

```
┌─────────────────────────────────────────────────────────┐
│                 TAKEOUT ARCHITECTURE                     │
├─────────────────────────────────────────────────────────┤
│                                                          │
│  CLIENT TIER (Web/iOS/Android)                          │
│  ┌────────────────────────────────────────────────┐    │
│  │  React Components (One Framework)              │    │
│  │  ├─ Web: Browser (Vite)                        │    │
│  │  ├─ iOS: Expo (React Native)                   │    │
│  │  └─ Android: Expo (React Native)               │    │
│  │                                                │    │
│  │  UI Layer: Tamagui (Universal Components)      │    │
│  │  Auth: Better Auth Client                      │    │
│  └────────────────────────────────────────────────┘    │
│           ↓                                             │
│  ┌────────────────────────────────────────────────┐    │
│  │  Local Storage                                 │    │
│  │  ├─ Web: IndexedDB                             │    │
│  │  └─ Native: SQLite                             │    │
│  └────────────────────────────────────────────────┘    │
│                        ↓                                │
├─────────────────────────────────────────────────────────┤
│                                                          │
│  ZERO SYNC ENGINE                                       │
│  ├─ Mutation handling & validation                     │
│  ├─ Permission enforcement (serverWhere)              │
│  ├─ Change tracking & sync                            │
│  └─ Optimistic updates                                │
│                                                         │
├─────────────────────────────────────────────────────────┤
│                                                          │
│  SERVER TIER                                            │
│  ┌────────────────────────────────────────────────┐    │
│  │  One Server          │  Zero Server            │    │
│  │  ├─ File routes      │  ├─ Pull endpoint       │    │
│  │  ├─ API endpoints    │  ├─ Push endpoint       │    │
│  │  └─ SSR/SSG          │  └─ Query processing    │    │
│  └────────────────────────────────────────────────┘    │
│           ↓                                             │
│  ┌────────────────────────────────────────────────┐    │
│  │  Authentication (Better Auth)                  │    │
│  │  ├─ Email/password  ├─ Magic links            │    │
│  │  ├─ Phone OTP       └─ JWT/Bearer tokens      │    │
│  └────────────────────────────────────────────────┘    │
│                                                         │
├─────────────────────────────────────────────────────────┤
│                                                          │
│  DATA TIER                                              │
│  ┌────────────────────────────────────────────────┐    │
│  │  PostgreSQL (Drizzle ORM)                      │    │
│  │  ├─ Public tables (synced via Zero)            │    │
│  │  └─ Private tables (auth, sessions)            │    │
│  └────────────────────────────────────────────────┘    │
│           ↓                                             │
│  ┌────────────────────────────────────────────────┐    │
│  │  Zero Sync Databases                           │    │
│  │  ├─ CVR (Current Version Repository)           │    │
│  │  └─ CDB (Change Database)                      │    │
│  └────────────────────────────────────────────────┘    │
│                                                         │
├─────────────────────────────────────────────────────────┤
│  EXTERNAL SERVICES                                      │
│  ├─ S3/Cloudflare R2 (file uploads)                   │
│  ├─ PostHog (analytics & feature flags)               │
│  ├─ AWS SES/Postmark (emails)                         │
│  └─ APNS/FCM (push notifications)                     │
└─────────────────────────────────────────────────────────┘
```

---

## Summary

Takeout is a **sophisticated, production-ready starter template** that provides:

- **Universal development** across web, iOS, and Android
- **Real-time sync** with Rocicorp Zero
- **Modern authentication** with Better Auth
- **Type-safe database** with Drizzle ORM
- **Cross-platform UI** with Tamagui
- **Multiple deployment options** (AWS SST, Uncloud, EAS)
- **Comprehensive tooling** (CLI, testing, CI/CD)

It's an excellent choice for teams building collaborative, real-time applications that need to run seamlessly across multiple platforms.
