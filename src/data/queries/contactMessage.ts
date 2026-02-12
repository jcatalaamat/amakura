import { zql } from 'on-zero'

export const allMessages = (props: { status?: string; pageSize: number }) => {
  let query = zql.contactMessage.orderBy('createdAt', 'desc').limit(props.pageSize)
  if (props.status) query = query.where('status', props.status)
  return query
}

export const unreadMessages = () => {
  return zql.contactMessage.where('status', 'unread').orderBy('createdAt', 'desc')
}
