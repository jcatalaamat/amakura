import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { YStack } from 'tamagui'

import { MessageInbox } from '~/features/admin/MessageInbox'

export const MessagesPage = () => {
  const insets = useSafeAreaInsets()

  return (
    <YStack flex={1} pt={insets.top}>
      <MessageInbox />
    </YStack>
  )
}
