import type * as schema from './tables'
import type { TableInsertRow, TableUpdateRow } from 'on-zero'

export type Booking = TableInsertRow<typeof schema.booking>
export type BookingUpdate = TableUpdateRow<typeof schema.booking>

export type ContactMessage = TableInsertRow<typeof schema.contactMessage>
export type ContactMessageUpdate = TableUpdateRow<typeof schema.contactMessage>

export type Device = TableInsertRow<typeof schema.device>
export type DeviceUpdate = TableUpdateRow<typeof schema.device>

export type ExperienceType = TableInsertRow<typeof schema.experienceType>
export type ExperienceTypeUpdate = TableUpdateRow<typeof schema.experienceType>

export type Notification = TableInsertRow<typeof schema.notification>
export type NotificationUpdate = TableUpdateRow<typeof schema.notification>

export type PortfolioProject = TableInsertRow<typeof schema.portfolioProject>
export type PortfolioProjectUpdate = TableUpdateRow<typeof schema.portfolioProject>

export type User = TableInsertRow<typeof schema.userPublic>
export type UserUpdate = TableUpdateRow<typeof schema.userPublic>

export type UserState = TableInsertRow<typeof schema.userState>
export type UserStateUpdate = TableUpdateRow<typeof schema.userState>

export type VolunteerApplication = TableInsertRow<typeof schema.volunteerApplication>
export type VolunteerApplicationUpdate = TableUpdateRow<
  typeof schema.volunteerApplication
>
