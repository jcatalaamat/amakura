import { memo, useEffect, useState } from 'react'
import { isWeb } from 'tamagui'

import { allBookings } from '~/data/queries/booking'
import { useAuth } from '~/features/auth/client/authClient'
import { useQuery } from '~/zero/client'

// hidden panel toggled by ctrl+shift+alt+p, surfaces permission/query state for e2e tests
// only works on web since native doesn't have window
export const ZeroTestUI = memo(() => {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (!isWeb) return

    const handler = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.altKey && e.key.toLowerCase() === 'p') {
        e.preventDefault()
        setOpen((v) => !v)
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [])

  if (!open) return null

  return <ZeroTestUIContent />
})

const ZeroTestUIContent = memo(() => {
  const { user } = useAuth()

  // fetch all bookings
  const [bookings] = useQuery(allBookings, { pageSize: 50 })

  const bookingIds = bookings?.map((b) => b.id).join(',') ?? ''
  const pendingCount = bookings?.filter((b) => b.status === 'pending').length ?? 0

  return (
    <div
      data-testid="zero-test-ui"
      style={{
        position: 'fixed',
        bottom: 10,
        right: 10,
        zIndex: 99999,
        background: '#1a1a2e',
        border: '1px solid #444',
        borderRadius: 8,
        padding: 12,
        minWidth: 320,
        maxHeight: 500,
        overflow: 'auto',
        boxShadow: '0 4px 16px rgba(0,0,0,0.4)',
        fontFamily: 'monospace',
        fontSize: 11,
        color: '#eee',
      }}
    >
      <div style={{ fontWeight: 700, marginBottom: 8 }}>zero test ui</div>

      <Row label="user-id" value={user?.id} />
      <Row label="user-name" value={user?.name} />
      <Row label="booking-count" value={String(bookings?.length ?? 0)} />
      <Row label="pending-bookings" value={String(pendingCount)} />
      <Row label="booking-ids" value={bookingIds} />
    </div>
  )
})

const Row = memo(({ label, value }: { label: string; value?: string | null }) => (
  <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 2 }}>
    <span style={{ minWidth: 150, opacity: 0.6 }}>{label}</span>
    <span data-testid={`zt-${label}`} style={{ wordBreak: 'break-all' }}>
      {value || '—'}
    </span>
  </div>
))
