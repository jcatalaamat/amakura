import { zql } from 'on-zero'

export const allApplications = (props: { status?: string; pageSize: number }) => {
  let query = zql.volunteerApplication.orderBy('createdAt', 'desc').limit(props.pageSize)
  if (props.status) query = query.where('status', props.status)
  return query
}

export const pendingApplications = () => {
  return zql.volunteerApplication.where('status', 'pending').orderBy('createdAt', 'desc')
}
