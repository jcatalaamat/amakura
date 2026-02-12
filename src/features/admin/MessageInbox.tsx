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

import { allMessages } from '~/data/queries/contactMessage'
import { useQuery } from '~/zero/client'

import type { ContactMessage } from '~/database/schema-public'

const statusColors = {
  unread: '$blue10',
  read: '$color8',
  replied: '$green10',
  archived: '$color6',
} as const

const StatusDot = styled(View, {
  width: 8,
  height: 8,
  rounded: 100,
  variants: {
    status: {
      unread: { bg: '$blue10' },
      read: { bg: '$color8' },
      replied: { bg: '$green10' },
      archived: { bg: '$color6' },
    },
  } as const,
})

const MessageCard = memo(({ message }: { message: ContactMessage }) => {
  const isUnread = message.status === 'unread'

  return (
    <YStack
      p="$4"
      bg={isUnread ? '$color3' : '$color2'}
      rounded="$4"
      borderWidth={1}
      borderColor={isUnread ? '$blue6' : '$color4'}
      gap="$2"
      hoverStyle={{ bg: '$color4' }}
      cursor="pointer"
    >
      <XStack justify="space-between" items="center">
        <XStack gap="$2" items="center">
          <StatusDot
            status={message.status as 'unread' | 'read' | 'replied' | 'archived'}
          />
          <H3 size="$4" fontWeight={isUnread ? '700' : '500'}>
            {message.name}
          </H3>
        </XStack>
        <SizableText size="$2" color="$color8">
          {new Date(message.createdAt).toLocaleDateString('es-MX', {
            day: 'numeric',
            month: 'short',
          })}
        </SizableText>
      </XStack>

      <SizableText size="$3" color="$color10">
        {message.email}
      </SizableText>

      {message.interest && (
        <View alignSelf="flex-start" px="$2" py="$1" bg="$color4" rounded="$2">
          <SizableText size="$2" color="$color10" textTransform="capitalize">
            {message.interest}
          </SizableText>
        </View>
      )}

      <Paragraph size="$3" color={isUnread ? '$color12' : '$color11'} numberOfLines={3}>
        {message.message}
      </Paragraph>
    </YStack>
  )
})

export function MessageInbox() {
  const [messages] = useQuery(allMessages, { pageSize: 100 })
  const [filter, setFilter] = useState<string>('all')

  const filteredMessages = messages.filter((m) => {
    if (filter === 'all') return true
    return m.status === filter
  })

  const unreadCount = messages.filter((m) => m.status === 'unread').length

  return (
    <YStack flex={1} gap="$4">
      <XStack justify="space-between" items="center" px="$4" pt="$4">
        <XStack gap="$2" items="center">
          <H3 size="$6" fontWeight="700">
            Mensajes
          </H3>
          {unreadCount > 0 && (
            <View px="$2" py="$1" bg="$blue4" rounded="$2">
              <SizableText size="$2" color="$blue10" fontWeight="600">
                {unreadCount} nuevos
              </SizableText>
            </View>
          )}
        </XStack>
        <SizableText size="$3" color="$color8">
          {filteredMessages.length} total
        </SizableText>
      </XStack>

      <XStack gap="$2" px="$4" flexWrap="wrap">
        {['all', 'unread', 'read', 'replied', 'archived'].map((status) => (
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
              {status === 'all'
                ? 'Todos'
                : status === 'unread'
                  ? 'Sin leer'
                  : status === 'read'
                    ? 'Leídos'
                    : status === 'replied'
                      ? 'Respondidos'
                      : 'Archivados'}
            </SizableText>
          </View>
        ))}
      </XStack>

      <ScrollView flex={1} showsVerticalScrollIndicator={false}>
        <YStack gap="$3" px="$4" pb="$10">
          {filteredMessages.length === 0 ? (
            <YStack items="center" py="$10">
              <SizableText size="$4" color="$color8">
                No hay mensajes
              </SizableText>
            </YStack>
          ) : (
            filteredMessages.map((message) => (
              <MessageCard key={message.id} message={message} />
            ))
          )}
        </YStack>
      </ScrollView>
    </YStack>
  )
}
