import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { YStack } from 'tamagui'

import { PortfolioManager } from '~/features/admin/PortfolioManager'

export const PortfolioPage = () => {
  const insets = useSafeAreaInsets()

  return (
    <YStack flex={1} pt={insets.top}>
      <PortfolioManager />
    </YStack>
  )
}
