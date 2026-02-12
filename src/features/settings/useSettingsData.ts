import { useLogout } from '~/features/auth/useLogout'
import { useNotificationStatus } from '~/features/notification/useNotificationsStatus'
import { BellIcon } from '~/interface/icons/phosphor/BellIcon'
import { DoorIcon } from '~/interface/icons/phosphor/DoorIcon'
import { FileIcon } from '~/interface/icons/phosphor/FileIcon'
import { LockIcon } from '~/interface/icons/phosphor/LockIcon'
import { UserIcon } from '~/interface/icons/phosphor/UserIcon'
import { useToggleTheme } from '~/interface/theme/ThemeSwitch'

import type { Href } from 'one'
import type { IconComponent } from '~/interface/icons/types'

export interface SettingItem {
  id: string
  title: string
  icon?: IconComponent
  onPress?: () => void
  href?: Href
  external?: boolean
  toggle?: {
    value: boolean
    onValueChange: () => void
  }
}

export interface SettingSection {
  title: string
  items: SettingItem[]
}

export function useSettingsData() {
  const { logout } = useLogout()
  const {
    onPress: toggleTheme,
    Icon: ThemeIcon,
    setting: themeSetting,
  } = useToggleTheme()
  const { isToggleActive: notificationsEnabled, handleToggle: toggleNotifications } =
    useNotificationStatus()
  const themeLabel = themeSetting[0]?.toUpperCase() + themeSetting.slice(1)

  const sections: SettingSection[] = [
    {
      title: 'Cuenta',
      items: [
        {
          id: 'theme',
          title: `Tema: ${themeLabel}`,
          icon: ThemeIcon,
          onPress: toggleTheme,
        },
        {
          id: 'notifications',
          title: 'Notificaciones',
          icon: BellIcon,
          toggle: {
            value: notificationsEnabled,
            onValueChange: toggleNotifications,
          },
        },
        {
          id: 'profile',
          title: 'Editar Perfil',
          icon: UserIcon,
          href: '/home/settings/edit-profile',
        },
      ],
    },
    {
      title: 'Legal',
      items: [
        {
          id: 'terms',
          title: 'Términos de Servicio',
          icon: FileIcon,
          href: '/terms-of-service',
          external: true,
        },
        {
          id: 'privacy',
          title: 'Política de Privacidad',
          icon: LockIcon,
          href: '/privacy-policy',
          external: true,
        },
      ],
    },
    {
      title: 'Sesión',
      items: [
        {
          id: 'logout',
          title: 'Cerrar Sesión',
          icon: DoorIcon,
          onPress: logout,
        },
      ],
    },
  ]

  return { sections, themeLabel }
}
