import { analyticsActions } from './actions/analyticsActions'
import { bookingActions } from './actions/bookingActions'
import { contactActions } from './actions/contactActions'
import { pushNotificationActions } from './actions/pushNotificationActions'
import { userActions } from './actions/userActions'

export const createServerActions = () => {
  return {
    analyticsActions,
    bookingActions: () => bookingActions,
    contactActions: () => contactActions,
    pushNotificationActions,
    userActions,
  }
}

export type ServerActions = ReturnType<typeof createServerActions>
