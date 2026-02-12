import { Slot, Stack } from 'one'

import { HeaderBackButton } from '~/interface/buttons/HeaderBackButton'

export const MessagesLayout = () => {
  if (process.env.VITE_NATIVE) {
    return (
      <Stack
        screenOptions={{
          headerTransparent: true,
        }}
      >
        <Stack.Screen
          name="index"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen name="[messageId]">
          <Stack.Header>
            <Stack.Header.Title>Mensaje</Stack.Header.Title>
            <Stack.Header.Left asChild>
              <HeaderBackButton />
            </Stack.Header.Left>
          </Stack.Header>
        </Stack.Screen>
      </Stack>
    )
  }

  return <Slot />
}
