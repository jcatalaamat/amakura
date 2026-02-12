import { usePathname, type Href } from 'one'
import { View, XStack } from 'tamagui'

import { Link } from '~/interface/app/Link'
import { ArchiveIcon } from '~/interface/icons/phosphor/ArchiveIcon'
import { EnvelopeIcon } from '~/interface/icons/phosphor/EnvelopeIcon'
import { GearIcon } from '~/interface/icons/phosphor/GearIcon'
import { ImageIcon } from '~/interface/icons/phosphor/ImageIcon'

type TabRoute = {
  name: string
  href: Href
  icon: any
}

const routes: TabRoute[] = [
  { name: 'bookings', href: '/home/bookings', icon: ArchiveIcon },
  { name: 'portfolio', href: '/home/portfolio', icon: ImageIcon },
  { name: 'messages', href: '/home/messages', icon: EnvelopeIcon },
  { name: 'settings', href: '/home/settings', icon: GearIcon },
]

export function BottomTabBar() {
  const pathname = usePathname()
  const currentTab =
    routes.find((r) => r.href && pathname.startsWith(r.href as string))?.name ??
    'bookings'

  return (
    <View
      position="fixed"
      b={0}
      l={0}
      r={0}
      bg="$background08"
      boxShadow="0 0 10px $shadow4"
      display="flex"
      $lg={{ display: 'none' }}
      z={100}
      style={{
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
      }}
    >
      <XStack justify="space-around" height={60} items="center" px="$4">
        {routes.map((route) => {
          const Icon = route.icon
          const isActive = currentTab === route.name

          return (
            <Link key={route.name} href={route.href} items="center" p="$2" rounded="$4">
              <Icon size={24} />
            </Link>
          )
        })}
      </XStack>
    </View>
  )
}
