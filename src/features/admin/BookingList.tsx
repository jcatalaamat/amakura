import { memo, useState } from 'react'
import {
  H3,
  Paragraph,
  ScrollView,
  SizableText,
  styled,
  View,
  XStack,
  YStack,
} from 'tamagui'

import { allBookings } from '~/data/queries/booking'
import { useQuery } from '~/zero/client'

import type { Booking } from '~/database/schema-public'

const statusColors = {
  pending: '$yellow10',
  confirmed: '$green10',
  cancelled: '$red10',
  completed: '$color8',
} as const

const StatusBadge = styled(View, {
  px: '$2',
  py: '$1',
  rounded: '$2',
  variants: {
    status: {
      pending: { bg: '$yellow4' },
      confirmed: { bg: '$green4' },
      cancelled: { bg: '$red4' },
      completed: { bg: '$color4' },
    },
  } as const,
})

const BookingCard = memo(({ booking }: { booking: Booking }) => {
  const statusColor =
    statusColors[booking.status as keyof typeof statusColors] || '$color10'

  return (
    <YStack
      p="$4"
      bg="$color2"
      rounded="$4"
      borderWidth={1}
      borderColor="$color4"
      gap="$2"
      hoverStyle={{ bg: '$color3' }}
      cursor="pointer"
    >
      <XStack justify="space-between" items="center">
        <H3 size="$4" fontWeight="600">
          {booking.name}
        </H3>
        <StatusBadge
          status={booking.status as 'pending' | 'confirmed' | 'cancelled' | 'completed'}
        >
          <SizableText
            size="$2"
            color={statusColor}
            fontWeight="600"
            textTransform="capitalize"
          >
            {booking.status}
          </SizableText>
        </StatusBadge>
      </XStack>

      <XStack gap="$4" flexWrap="wrap">
        <YStack>
          <SizableText size="$2" color="$color8">
            Fecha
          </SizableText>
          <SizableText size="$3">
            {new Date(booking.date).toLocaleDateString('es-MX', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </SizableText>
        </YStack>

        <YStack>
          <SizableText size="$2" color="$color8">
            Personas
          </SizableText>
          <SizableText size="$3">{booking.guests}</SizableText>
        </YStack>

        <YStack>
          <SizableText size="$2" color="$color8">
            Contacto
          </SizableText>
          <SizableText size="$3">{booking.email}</SizableText>
        </YStack>
      </XStack>

      {booking.notes && (
        <YStack>
          <SizableText size="$2" color="$color8">
            Notas
          </SizableText>
          <Paragraph size="$3" color="$color11">
            {booking.notes}
          </Paragraph>
        </YStack>
      )}
    </YStack>
  )
})

export function BookingList() {
  const [bookings] = useQuery(allBookings, { pageSize: 100 })
  const [filter, setFilter] = useState<string>('all')

  const filteredBookings = bookings.filter((b) => {
    if (filter === 'all') return true
    return b.status === filter
  })

  return (
    <YStack flex={1} gap="$4">
      <XStack justify="space-between" items="center" px="$4" pt="$4">
        <H3 size="$6" fontWeight="700">
          Reservaciones
        </H3>
        <SizableText size="$3" color="$color8">
          {filteredBookings.length} total
        </SizableText>
      </XStack>

      <XStack gap="$2" px="$4" flexWrap="wrap">
        {['all', 'pending', 'confirmed', 'cancelled', 'completed'].map((status) => (
          <View
            key={status}
            px="$3"
            py="$2"
            bg={filter === status ? '$color8' : '$color3'}
            rounded="$3"
            cursor="pointer"
            onPress={() => setFilter(status)}
            hoverStyle={{ bg: filter === status ? '$color9' : '$color4' }}
          >
            <SizableText
              size="$2"
              color={filter === status ? '$color1' : '$color11'}
              textTransform="capitalize"
            >
              {status === 'all' ? 'Todas' : status}
            </SizableText>
          </View>
        ))}
      </XStack>

      <ScrollView flex={1} showsVerticalScrollIndicator={false}>
        <YStack gap="$3" px="$4" pb="$10">
          {filteredBookings.length === 0 ? (
            <YStack items="center" py="$10">
              <SizableText size="$4" color="$color8">
                No hay reservaciones
              </SizableText>
            </YStack>
          ) : (
            filteredBookings.map((booking) => (
              <BookingCard key={booking.id} booking={booking} />
            ))
          )}
        </YStack>
      </ScrollView>
    </YStack>
  )
}
