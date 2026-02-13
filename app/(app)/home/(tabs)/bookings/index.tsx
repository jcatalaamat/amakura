import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { YStack } from 'tamagui'

import { BookingList } from '~/features/admin/BookingList'

export const BookingsPage = () => {
  const insets = useSafeAreaInsets()

  return (
    <YStack flex={1} pt={insets.top}>
      <BookingList />
    </YStack>
  )
}
