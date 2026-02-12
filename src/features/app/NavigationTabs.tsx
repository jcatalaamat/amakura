import { usePathname } from 'one'
import { useMedia } from 'tamagui'

import { Link } from '~/interface/app/Link'
import { ArchiveIcon } from '~/interface/icons/phosphor/ArchiveIcon'
import { EnvelopeIcon } from '~/interface/icons/phosphor/EnvelopeIcon'
import { GearIcon } from '~/interface/icons/phosphor/GearIcon'
import { ImageIcon } from '~/interface/icons/phosphor/ImageIcon'
import { RovingTabs } from '~/interface/tabs/RovingTabs'

import type { Href } from 'one'
import type { TabsTabProps } from 'tamagui'

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

export function NavigationTabs() {
  const pathname = usePathname()
  const media = useMedia()
  const iconSize = media.sm ? 24 : 20

  const currentTab =
    routes.find((r) => r.href && pathname.startsWith(r.href as string))?.name ??
    'bookings'

  return (
    <RovingTabs value={currentTab} indicatorStyle="underline">
      {({
        handleOnInteraction,
      }: {
        handleOnInteraction: TabsTabProps['onInteraction']
      }) =>
        routes.map((route) => {
          const Icon = route.icon

          return (
            <RovingTabs.Tab
              key={route.name}
              value={route.name}
              onInteraction={handleOnInteraction}
            >
              <Link href={route.href} items="center" px="$3" py="$2" $md={{ px: '$4' }}>
                <Icon size={iconSize} color="$color" />
              </Link>
            </RovingTabs.Tab>
          )
        })
      }
    </RovingTabs>
  )
}
