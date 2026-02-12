import { zql } from 'on-zero'

export const allBookings = (props: { status?: string; pageSize: number }) => {
  let query = zql.booking.orderBy('createdAt', 'desc').limit(props.pageSize)
  if (props.status) query = query.where('status', props.status)
  return query
}

export const bookingsByDate = (props: { date: string }) => {
  return zql.booking.where('date', props.date).orderBy('createdAt', 'asc')
}

export const bookingById = (props: { id: string }) => {
  return zql.booking.where('id', props.id).one()
}
