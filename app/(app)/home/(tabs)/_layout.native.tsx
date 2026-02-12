import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { withLayoutContext } from 'one'

import { TabBar } from '~/features/app/TabBar'

const Tab = createBottomTabNavigator()
const Tabs = withLayoutContext(Tab.Navigator)

export function TabsLayout() {
  return (
    <Tabs
      initialRouteName="bookings"
      tabBar={(props) => <TabBar {...props} />}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tabs.Screen name="bookings" />
      <Tabs.Screen name="portfolio" />
      <Tabs.Screen name="messages" />
    </Tabs>
  )
}
